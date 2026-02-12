import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { checkRuleLimit, isRuleTypeAvailable, getAvailableRuleTypes } from '@/lib/compliance/gates';
import { createAuditLog } from '@/lib/compliance/audit';
import type { ComplianceRuleType, AlertSeverity } from '@prisma/client';

// GET - List compliance rules
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
    const enabled = searchParams.get('enabled');
    const ruleType = searchParams.get('type');
    const sortBy = searchParams.get('sortBy') || 'priority';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build where clause
    const where: Record<string, unknown> = {
      organizationId: user.organizationId,
    };

    if (enabled !== null) {
      where.enabled = enabled === 'true';
    }

    if (ruleType) {
      where.ruleType = ruleType;
    }

    // Fetch rules
    const rules = await prisma.complianceRule.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      include: {
        _count: {
          select: { violations: true },
        },
      },
    });

    // Get rule limits and available types
    const limitCheck = await checkRuleLimit(user.organizationId);
    const availableTypes = getAvailableRuleTypes(user.organization.complianceTier);

    return NextResponse.json({
      rules: rules.map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        ruleType: r.ruleType,
        enabled: r.enabled,
        priority: r.priority,
        conditions: r.conditions,
        thresholds: r.thresholds,
        severity: r.severity,
        autoBlock: r.autoBlock,
        requireReview: r.requireReview,
        violationCount: r._count.violations,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      })),
      limits: {
        current: limitCheck.currentCount,
        max: limitCheck.limit,
      },
      availableTypes,
    });
  } catch (error) {
    console.error('List rules error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rules' },
      { status: 500 }
    );
  }
}

// POST - Create a new compliance rule
export async function POST(req: Request) {
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

    // Check rule limit
    const limitCheck = await checkRuleLimit(user.organizationId);
    if (!limitCheck.allowed) {
      return NextResponse.json(
        { error: limitCheck.reason, upgradeUrl: limitCheck.upgradeUrl },
        { status: 403 }
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

    // Validate required fields
    if (!name || !ruleType || !conditions) {
      return NextResponse.json(
        { error: 'Name, ruleType, and conditions are required' },
        { status: 400 }
      );
    }

    // Check if rule type is available for this tier
    if (!isRuleTypeAvailable(user.organization!.complianceTier, ruleType)) {
      return NextResponse.json(
        { error: `Rule type ${ruleType} is not available for your tier` },
        { status: 403 }
      );
    }

    // Create rule
    const rule = await prisma.complianceRule.create({
      data: {
        organizationId: user.organizationId,
        name,
        description: description || null,
        ruleType: ruleType as ComplianceRuleType,
        conditions,
        thresholds: thresholds || null,
        severity: (severity as AlertSeverity) || 'WARNING',
        priority: priority ?? 50,
        autoBlock: autoBlock ?? false,
        requireReview: requireReview ?? true,
        enabled: enabled ?? true,
      },
    });

    // Audit log
    await createAuditLog({
      organizationId: user.organizationId,
      action: 'CREATE',
      entityType: 'compliance_rule',
      entityId: rule.id,
      actorType: 'USER',
      actorId: user.id,
      actorEmail: user.email,
      newState: {
        name,
        ruleType,
        severity: rule.severity,
        enabled: rule.enabled,
      },
    });

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
      createdAt: rule.createdAt,
    }, { status: 201 });
  } catch (error) {
    console.error('Create rule error:', error);
    return NextResponse.json(
      { error: 'Failed to create rule' },
      { status: 500 }
    );
  }
}
