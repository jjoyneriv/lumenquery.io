import { prisma } from '@/lib/prisma';
import { createHash } from 'crypto';
import type { AuditLogData, AuditAction, AuditActorType } from './types';

interface CreateAuditLogParams extends AuditLogData {
  organizationId: string;
}

/**
 * Create an immutable audit log entry with hash chain
 */
export async function createAuditLog(data: CreateAuditLogParams): Promise<string> {
  // Get the previous hash for chain integrity
  const previousEntry = await prisma.auditLogEntry.findFirst({
    where: { organizationId: data.organizationId },
    orderBy: { timestamp: 'desc' },
    select: { contentHash: true },
  });

  // Calculate content hash
  const contentToHash = JSON.stringify({
    action: data.action,
    entityType: data.entityType,
    entityId: data.entityId,
    actorType: data.actorType,
    actorId: data.actorId,
    previousState: data.previousState,
    newState: data.newState,
    timestamp: new Date().toISOString(),
    previousHash: previousEntry?.contentHash,
  });

  const contentHash = createHash('sha256').update(contentToHash).digest('hex');

  const entry = await prisma.auditLogEntry.create({
    data: {
      action: data.action,
      entityType: data.entityType,
      entityId: data.entityId,
      actorType: data.actorType,
      actorId: data.actorId,
      actorEmail: data.actorEmail,
      previousState: data.previousState ? JSON.parse(JSON.stringify(data.previousState)) : undefined,
      newState: data.newState ? JSON.parse(JSON.stringify(data.newState)) : undefined,
      metadata: data.metadata ? JSON.parse(JSON.stringify(data.metadata)) : undefined,
      contentHash,
      previousHash: previousEntry?.contentHash,
      organizationId: data.organizationId,
      violationId: data.metadata?.violationId as string | undefined,
    },
  });

  return entry.id;
}

/**
 * Verify audit log chain integrity
 */
export async function verifyAuditChain(
  organizationId: string,
  startDate?: Date,
  endDate?: Date
): Promise<{
  valid: boolean;
  entriesChecked: number;
  brokenAt?: string;
}> {
  const entries = await prisma.auditLogEntry.findMany({
    where: {
      organizationId,
      ...(startDate && { timestamp: { gte: startDate } }),
      ...(endDate && { timestamp: { lte: endDate } }),
    },
    orderBy: { timestamp: 'asc' },
    select: {
      id: true,
      action: true,
      entityType: true,
      entityId: true,
      actorType: true,
      actorId: true,
      previousState: true,
      newState: true,
      timestamp: true,
      contentHash: true,
      previousHash: true,
    },
  });

  let previousHash: string | null = null;

  for (const entry of entries) {
    // Check hash chain continuity
    if (entry.previousHash !== previousHash) {
      return {
        valid: false,
        entriesChecked: entries.indexOf(entry),
        brokenAt: entry.id,
      };
    }

    // Verify content hash
    const verifyObj = {
      action: entry.action,
      entityType: entry.entityType,
      entityId: entry.entityId,
      actorType: entry.actorType,
      actorId: entry.actorId,
      previousState: entry.previousState as unknown,
      newState: entry.newState as unknown,
      timestamp: entry.timestamp.toISOString(),
      previousHash: entry.previousHash,
    };
    const verifyContent: string = JSON.stringify(verifyObj);

    const expectedHash = createHash('sha256').update(verifyContent).digest('hex');

    if (entry.contentHash !== expectedHash) {
      return {
        valid: false,
        entriesChecked: entries.indexOf(entry),
        brokenAt: entry.id,
      };
    }

    previousHash = entry.contentHash;
  }

  return {
    valid: true,
    entriesChecked: entries.length,
  };
}

/**
 * Get audit trail for an entity
 */
export async function getEntityAuditTrail(
  organizationId: string,
  entityType: string,
  entityId: string,
  options?: {
    limit?: number;
    offset?: number;
  }
): Promise<{
  entries: Array<{
    id: string;
    timestamp: Date;
    action: string;
    actorType: string;
    actorEmail?: string;
    summary: string;
  }>;
  total: number;
}> {
  const [entries, total] = await Promise.all([
    prisma.auditLogEntry.findMany({
      where: {
        organizationId,
        entityType,
        entityId,
      },
      orderBy: { timestamp: 'desc' },
      take: options?.limit ?? 50,
      skip: options?.offset ?? 0,
      select: {
        id: true,
        timestamp: true,
        action: true,
        actorType: true,
        actorEmail: true,
        previousState: true,
        newState: true,
      },
    }),
    prisma.auditLogEntry.count({
      where: {
        organizationId,
        entityType,
        entityId,
      },
    }),
  ]);

  return {
    entries: entries.map((e) => ({
      id: e.id,
      timestamp: e.timestamp,
      action: e.action,
      actorType: e.actorType,
      actorEmail: e.actorEmail ?? undefined,
      summary: formatAuditSummary(e.action, e.previousState, e.newState),
    })),
    total,
  };
}

/**
 * Format audit entry for display
 */
function formatAuditSummary(
  action: string,
  previousState: unknown,
  newState: unknown
): string {
  switch (action) {
    case 'CREATE':
      return 'Created';
    case 'UPDATE':
      return formatUpdateSummary(previousState, newState);
    case 'DELETE':
      return 'Deleted';
    case 'REVIEW':
      return `Reviewed: ${(newState as { status?: string })?.status ?? 'unknown'}`;
    case 'ESCALATE':
      return 'Escalated for review';
    case 'CLEAR':
      return 'Cleared - no action required';
    case 'CONFIRM':
      return 'Confirmed as violation';
    case 'REPORT':
      return 'Included in compliance report';
    case 'EXPORT':
      return 'Exported for external review';
    default:
      return action;
  }
}

function formatUpdateSummary(previousState: unknown, newState: unknown): string {
  if (!previousState || !newState) return 'Updated';

  const prev = previousState as Record<string, unknown>;
  const next = newState as Record<string, unknown>;

  const changes: string[] = [];

  for (const key of Object.keys(next)) {
    if (prev[key] !== next[key]) {
      changes.push(key);
    }
  }

  if (changes.length === 0) return 'Updated';
  if (changes.length === 1) return `Updated ${changes[0]}`;
  if (changes.length <= 3) return `Updated ${changes.join(', ')}`;
  return `Updated ${changes.length} fields`;
}

/**
 * Export audit log for a date range
 */
export async function exportAuditLog(
  organizationId: string,
  startDate: Date,
  endDate: Date,
  format: 'json' | 'csv' = 'json'
): Promise<string> {
  const entries = await prisma.auditLogEntry.findMany({
    where: {
      organizationId,
      timestamp: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: { timestamp: 'asc' },
  });

  if (format === 'csv') {
    const headers = [
      'timestamp',
      'action',
      'entityType',
      'entityId',
      'actorType',
      'actorEmail',
      'contentHash',
    ].join(',');

    const rows = entries.map((e) =>
      [
        e.timestamp.toISOString(),
        e.action,
        e.entityType,
        e.entityId,
        e.actorType,
        e.actorEmail ?? '',
        e.contentHash,
      ].join(',')
    );

    return [headers, ...rows].join('\n');
  }

  return JSON.stringify(entries, null, 2);
}
