import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { createAuditLog } from '@/lib/compliance/audit';
import type { AuditAction } from '@/lib/compliance/types';
import type { ViolationStatus } from '@prisma/client';

interface RouteContext {
  params: Promise<{ violationId: string }>;
}

// GET - Get violation details
export async function GET(req: Request, context: RouteContext) {
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
      select: { organizationId: true },
    });

    if (!user?.organizationId) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 400 }
      );
    }

    const { violationId } = await context.params;

    const violation = await prisma.complianceViolation.findFirst({
      where: {
        id: violationId,
        organizationId: user.organizationId,
      },
      include: {
        rule: true,
        auditTrail: {
          orderBy: { timestamp: 'desc' },
          take: 20,
          select: {
            id: true,
            action: true,
            actorType: true,
            actorEmail: true,
            previousState: true,
            newState: true,
            timestamp: true,
          },
        },
      },
    });

    if (!violation) {
      return NextResponse.json(
        { error: 'Violation not found' },
        { status: 404 }
      );
    }

    // Get account details if monitored
    const monitoredAccount = await prisma.monitoredAccount.findFirst({
      where: {
        organizationId: user.organizationId,
        accountId: violation.accountId,
      },
      select: {
        id: true,
        label: true,
        riskScore: true,
        monitoringLevel: true,
      },
    });

    return NextResponse.json({
      id: violation.id,
      severity: violation.severity,
      status: violation.status,
      score: violation.score,
      accountId: violation.accountId,
      counterpartyId: violation.counterpartyId,
      transactionHash: violation.transactionHash,
      contractId: violation.contractId,
      rule: {
        id: violation.rule.id,
        name: violation.rule.name,
        ruleType: violation.rule.ruleType,
        description: violation.rule.description,
        severity: violation.rule.severity,
      },
      matchDetails: violation.matchDetails,
      evidenceData: violation.evidenceData,
      reviewedBy: violation.reviewedBy,
      reviewedAt: violation.reviewedAt,
      resolution: violation.resolution,
      notes: violation.notes,
      createdAt: violation.createdAt,
      account: monitoredAccount ? {
        id: monitoredAccount.id,
        label: monitoredAccount.label,
        riskScore: monitoredAccount.riskScore,
        monitoringLevel: monitoredAccount.monitoringLevel,
      } : null,
      auditTrail: violation.auditTrail.map((entry) => ({
        id: entry.id,
        action: entry.action,
        actorType: entry.actorType,
        actorEmail: entry.actorEmail,
        previousState: entry.previousState,
        newState: entry.newState,
        timestamp: entry.timestamp,
      })),
    });
  } catch (error) {
    console.error('Get violation error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch violation' },
      { status: 500 }
    );
  }
}

// PUT - Update violation status/review
export async function PUT(req: Request, context: RouteContext) {
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
      select: { id: true, email: true, organizationId: true },
    });

    if (!user?.organizationId) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 400 }
      );
    }

    const { violationId } = await context.params;

    const existing = await prisma.complianceViolation.findFirst({
      where: {
        id: violationId,
        organizationId: user.organizationId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Violation not found' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { status, resolution, notes } = body;

    // Validate status transition
    const validTransitions: Record<ViolationStatus, ViolationStatus[]> = {
      PENDING: ['UNDER_REVIEW', 'CLEARED', 'CONFIRMED'],
      UNDER_REVIEW: ['CLEARED', 'CONFIRMED', 'ESCALATED'],
      CLEARED: [],
      CONFIRMED: ['ESCALATED', 'REPORTED'],
      ESCALATED: ['CONFIRMED', 'REPORTED'],
      REPORTED: [],
    };

    if (status && !validTransitions[existing.status].includes(status)) {
      return NextResponse.json({
        error: `Cannot transition from ${existing.status} to ${status}`,
        validTransitions: validTransitions[existing.status],
      }, { status: 400 });
    }

    // Determine audit action
    let action: AuditAction = 'UPDATE';
    if (status === 'UNDER_REVIEW') action = 'REVIEW';
    else if (status === 'CLEARED') action = 'CLEAR';
    else if (status === 'CONFIRMED') action = 'CONFIRM';
    else if (status === 'ESCALATED') action = 'ESCALATE';
    else if (status === 'REPORTED') action = 'REPORT';

    const updated = await prisma.complianceViolation.update({
      where: { id: violationId },
      data: {
        ...(status && { status: status as ViolationStatus }),
        ...(resolution !== undefined && { resolution }),
        ...(notes !== undefined && { notes }),
        ...(status && { reviewedBy: user.email, reviewedAt: new Date() }),
      },
    });

    // Audit log
    await createAuditLog({
      organizationId: user.organizationId,
      action,
      entityType: 'violation',
      entityId: violationId,
      actorType: 'USER',
      actorId: user.id,
      actorEmail: user.email,
      previousState: {
        status: existing.status,
        resolution: existing.resolution,
        notes: existing.notes,
      },
      newState: {
        status: updated.status,
        resolution: updated.resolution,
        notes: updated.notes,
      },
      metadata: {
        violationId,
      },
    });

    return NextResponse.json({
      id: updated.id,
      status: updated.status,
      resolution: updated.resolution,
      notes: updated.notes,
      reviewedBy: updated.reviewedBy,
      reviewedAt: updated.reviewedAt,
    });
  } catch (error) {
    console.error('Update violation error:', error);
    return NextResponse.json(
      { error: 'Failed to update violation' },
      { status: 500 }
    );
  }
}
