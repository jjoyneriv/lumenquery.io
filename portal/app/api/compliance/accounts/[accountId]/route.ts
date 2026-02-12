import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { createAuditLog } from '@/lib/compliance/audit';

interface RouteContext {
  params: Promise<{ accountId: string }>;
}

// GET - Get monitored account details
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

    const { accountId } = await context.params;

    const account = await prisma.monitoredAccount.findFirst({
      where: {
        id: accountId,
        organizationId: user.organizationId,
      },
    });

    if (!account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    // Get recent violations for this account
    const violations = await prisma.complianceViolation.findMany({
      where: {
        organizationId: user.organizationId,
        accountId: account.accountId,
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        rule: {
          select: {
            name: true,
            ruleType: true,
          },
        },
      },
    });

    return NextResponse.json({
      id: account.id,
      accountId: account.accountId,
      label: account.label,
      monitoringLevel: account.monitoringLevel,
      riskScore: account.riskScore,
      riskFactors: account.riskFactors,
      customThresholds: account.customThresholds,
      lastAssessed: account.lastAssessed,
      lastActivity: account.lastActivity,
      totalVolume30d: account.totalVolume30d.toString(),
      txCount30d: account.txCount30d,
      addedAt: account.addedAt,
      recentViolations: violations.map((v) => ({
        id: v.id,
        severity: v.severity,
        status: v.status,
        ruleName: v.rule.name,
        ruleType: v.rule.ruleType,
        createdAt: v.createdAt,
      })),
    });
  } catch (error) {
    console.error('Get account error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch account' },
      { status: 500 }
    );
  }
}

// PUT - Update monitored account
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

    const { accountId } = await context.params;

    const existing = await prisma.monitoredAccount.findFirst({
      where: {
        id: accountId,
        organizationId: user.organizationId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { label, monitoringLevel, customThresholds } = body;

    const updated = await prisma.monitoredAccount.update({
      where: { id: accountId },
      data: {
        ...(label !== undefined && { label }),
        ...(monitoringLevel && { monitoringLevel }),
        ...(customThresholds !== undefined && { customThresholds }),
      },
    });

    // Audit log
    await createAuditLog({
      organizationId: user.organizationId,
      action: 'UPDATE',
      entityType: 'monitored_account',
      entityId: accountId,
      actorType: 'USER',
      actorId: user.id,
      actorEmail: user.email,
      previousState: {
        label: existing.label,
        monitoringLevel: existing.monitoringLevel,
        customThresholds: existing.customThresholds,
      },
      newState: {
        label: updated.label,
        monitoringLevel: updated.monitoringLevel,
        customThresholds: updated.customThresholds,
      },
    });

    return NextResponse.json({
      id: updated.id,
      accountId: updated.accountId,
      label: updated.label,
      monitoringLevel: updated.monitoringLevel,
      customThresholds: updated.customThresholds,
      riskScore: updated.riskScore,
    });
  } catch (error) {
    console.error('Update account error:', error);
    return NextResponse.json(
      { error: 'Failed to update account' },
      { status: 500 }
    );
  }
}

// DELETE - Remove monitored account
export async function DELETE(req: Request, context: RouteContext) {
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

    const { accountId } = await context.params;

    const existing = await prisma.monitoredAccount.findFirst({
      where: {
        id: accountId,
        organizationId: user.organizationId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    await prisma.monitoredAccount.delete({
      where: { id: accountId },
    });

    // Audit log
    await createAuditLog({
      organizationId: user.organizationId,
      action: 'DELETE',
      entityType: 'monitored_account',
      entityId: accountId,
      actorType: 'USER',
      actorId: user.id,
      actorEmail: user.email,
      previousState: {
        accountId: existing.accountId,
        label: existing.label,
        monitoringLevel: existing.monitoringLevel,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete account error:', error);
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    );
  }
}
