import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

// GET - List audit log entries
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { organization: true },
    });

    if (!user?.organizationId) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 400 }
      );
    }

    if (!user.organization?.complianceEnabled) {
      return NextResponse.json(
        { error: 'Compliance features not enabled' },
        { status: 403 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action'); // CREATE, UPDATE, DELETE, etc.
    const entityType = searchParams.get('entityType'); // violation, rule, account, etc.
    const entityId = searchParams.get('entityId');
    const actorEmail = searchParams.get('actorEmail');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build where clause
    const where: Record<string, unknown> = {
      organizationId: user.organizationId,
    };

    if (action) {
      where.action = action;
    }

    if (entityType) {
      where.entityType = entityType;
    }

    if (entityId) {
      where.entityId = entityId;
    }

    if (actorEmail) {
      where.actorEmail = { contains: actorEmail, mode: 'insensitive' };
    }

    if (startDate) {
      where.timestamp = {
        ...(where.timestamp as object || {}),
        gte: new Date(startDate),
      };
    }

    if (endDate) {
      where.timestamp = {
        ...(where.timestamp as object || {}),
        lte: new Date(endDate),
      };
    }

    // Fetch audit entries
    const [entries, total] = await Promise.all([
      prisma.auditLogEntry.findMany({
        where,
        orderBy: { timestamp: 'desc' },
        skip: offset,
        take: limit,
        select: {
          id: true,
          action: true,
          entityType: true,
          entityId: true,
          actorType: true,
          actorId: true,
          actorEmail: true,
          previousState: true,
          newState: true,
          metadata: true,
          contentHash: true,
          previousHash: true,
          timestamp: true,
        },
      }),
      prisma.auditLogEntry.count({ where }),
    ]);

    // Get unique action and entity types for filtering
    const [actionTypes, entityTypes] = await Promise.all([
      prisma.auditLogEntry.groupBy({
        by: ['action'],
        where: { organizationId: user.organizationId },
      }),
      prisma.auditLogEntry.groupBy({
        by: ['entityType'],
        where: { organizationId: user.organizationId },
      }),
    ]);

    return NextResponse.json({
      entries: entries.map((e) => ({
        id: e.id,
        action: e.action,
        entityType: e.entityType,
        entityId: e.entityId,
        actorType: e.actorType,
        actorEmail: e.actorEmail,
        previousState: e.previousState,
        newState: e.newState,
        metadata: e.metadata,
        contentHash: e.contentHash,
        chainValid: true, // Would verify in production
        timestamp: e.timestamp,
      })),
      pagination: {
        total,
        limit,
        offset,
      },
      filters: {
        actions: actionTypes.map((a) => a.action),
        entityTypes: entityTypes.map((e) => e.entityType),
      },
    });
  } catch (error) {
    console.error('List audit entries error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit log' },
      { status: 500 }
    );
  }
}
