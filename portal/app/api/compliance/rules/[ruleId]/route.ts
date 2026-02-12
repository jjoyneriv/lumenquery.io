import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { isRuleTypeAvailable } from '@/lib/compliance/gates';
import { createAuditLog } from '@/lib/compliance/audit';
import type { AlertSeverity } from '@prisma/client';

interface RouteContext {
  params: Promise<{ ruleId: string }>;
}

// GET - Get rule details
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

    const { ruleId } = await context.params;

    const rule = await prisma.complianceRule.findFirst({
      where: {
        id: ruleId,
        organizationId: user.organizationId,
      },
      include: {
        _count: {
          select: { violations: true },
        },
        violations: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: {
            id: true,
            severity: true,
            status: true,
            accountId: true,
            createdAt: true,
          },
        },
      },
    });

    if (!rule) {
      return NextResponse.json(
        { error: 'Rule not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: rule.id,
      name: rule.name,
      description: rule.description,
      ruleType: rule.ruleType,
      enabled: rule.enabled,
      priority: rule.priority,
      conditions: rule.conditions,
      thresholds: rule.thresholds,
      severity: rule.severity,
      autoBlock: rule.autoBlock,
      requireReview: rule.requireReview,
      violationCount: rule._count.violations,
      recentViolations: rule.violations,
      createdAt: rule.createdAt,
      updatedAt: rule.updatedAt,
    });
  } catch (error) {
    console.error('Get rule error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rule' },
      { status: 500 }
    );
  }
}

// PUT - Update rule
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
      include: { organization: true },
    });

    if (!user?.organizationId) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 400 }
      );
    }

    const { ruleId } = await context.params;

    const existing = await prisma.complianceRule.findFirst({
      where: {
        id: ruleId,
        organizationId: user.organizationId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Rule not found' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const {
      name,
      description,
      ruleType,
      conditions,
      thresholds,
      severity,
      priority,
      autoBlock,
      requireReview,
      enabled,
    } = body;

    // Check if changing rule type and if new type is available
    if (ruleType && ruleType !== existing.ruleType) {
      if (!isRuleTypeAvailable(user.organization!.complianceTier, ruleType)) {
        return NextResponse.json(
          { error: `Rule type ${ruleType} is not available for your tier` },
          { status: 403 }
        );
      }
    }

    const updated = await prisma.complianceRule.update({
      where: { id: ruleId },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(ruleType !== undefined && { ruleType }),
        ...(conditions !== undefined && { conditions }),
        ...(thresholds !== undefined && { thresholds }),
        ...(severity !== undefined && { severity: severity as AlertSeverity }),
        ...(priority !== undefined && { priority }),
        ...(autoBlock !== undefined && { autoBlock }),
        ...(requireReview !== undefined && { requireReview }),
        ...(enabled !== undefined && { enabled }),
      },
    });

    // Audit log
    await createAuditLog({
      organizationId: user.organizationId,
      action: 'UPDATE',
      entityType: 'compliance_rule',
      entityId: ruleId,
      actorType: 'USER',
      actorId: user.id,
      actorEmail: user.email,
      previousState: {
        name: existing.name,
        enabled: existing.enabled,
        priority: existing.priority,
        severity: existing.severity,
      },
      newState: {
        name: updated.name,
        enabled: updated.enabled,
        priority: updated.priority,
        severity: updated.severity,
      },
    });

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      description: updated.description,
      ruleType: updated.ruleType,
      enabled: updated.enabled,
      priority: updated.priority,
      conditions: updated.conditions,
      thresholds: updated.thresholds,
      severity: updated.severity,
      autoBlock: updated.autoBlock,
      requireReview: updated.requireReview,
      updatedAt: updated.updatedAt,
    });
  } catch (error) {
    console.error('Update rule error:', error);
    return NextResponse.json(
      { error: 'Failed to update rule' },
      { status: 500 }
    );
  }
}

// DELETE - Delete rule
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

    const { ruleId } = await context.params;

    const existing = await prisma.complianceRule.findFirst({
      where: {
        id: ruleId,
        organizationId: user.organizationId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Rule not found' },
        { status: 404 }
      );
    }

    // Check if rule has violations - require confirmation
    const violationCount = await prisma.complianceViolation.count({
      where: { ruleId },
    });

    const { searchParams } = new URL(req.url);
    const confirm = searchParams.get('confirm') === 'true';

    if (violationCount > 0 && !confirm) {
      return NextResponse.json({
        error: 'Rule has violations',
        violationCount,
        message: 'Add ?confirm=true to delete the rule and its violations',
      }, { status: 400 });
    }

    await prisma.complianceRule.delete({
      where: { id: ruleId },
    });

    // Audit log
    await createAuditLog({
      organizationId: user.organizationId,
      action: 'DELETE',
      entityType: 'compliance_rule',
      entityId: ruleId,
      actorType: 'USER',
      actorId: user.id,
      actorEmail: user.email,
      previousState: {
        name: existing.name,
        ruleType: existing.ruleType,
        enabled: existing.enabled,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete rule error:', error);
    return NextResponse.json(
      { error: 'Failed to delete rule' },
      { status: 500 }
    );
  }
}
