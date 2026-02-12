import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

// GET - List compliance violations
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
    const status = searchParams.get('status'); // PENDING, UNDER_REVIEW, etc.
    const severity = searchParams.get('severity'); // INFO, WARNING, CRITICAL
    const ruleType = searchParams.get('ruleType');
    const accountId = searchParams.get('accountId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build where clause
    const where: Record<string, unknown> = {
      organizationId: user.organizationId,
    };

    if (status) {
      where.status = status;
    }

    if (severity) {
      where.severity = severity;
    }

    if (ruleType) {
      where.rule = { ruleType };
    }

    if (accountId) {
      where.accountId = { contains: accountId, mode: 'insensitive' };
    }

    if (startDate) {
      where.createdAt = {
        ...(where.createdAt as object || {}),
        gte: new Date(startDate),
      };
    }

    if (endDate) {
      where.createdAt = {
        ...(where.createdAt as object || {}),
        lte: new Date(endDate),
      };
    }

    // Fetch violations
    const [violations, total, statusCounts] = await Promise.all([
      prisma.complianceViolation.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: offset,
        take: limit,
        include: {
          rule: {
            select: {
              name: true,
              ruleType: true,
            },
          },
        },
      }),
      prisma.complianceViolation.count({ where }),
      prisma.complianceViolation.groupBy({
        by: ['status'],
        where: { organizationId: user.organizationId },
        _count: true,
      }),
    ]);

    return NextResponse.json({
      violations: violations.map((v) => ({
        id: v.id,
        severity: v.severity,
        status: v.status,
        score: v.score,
        accountId: v.accountId,
        counterpartyId: v.counterpartyId,
        transactionHash: v.transactionHash,
        ruleName: v.rule.name,
        ruleType: v.rule.ruleType,
        matchDetails: v.matchDetails,
        reviewedBy: v.reviewedBy,
        reviewedAt: v.reviewedAt,
        resolution: v.resolution,
        createdAt: v.createdAt,
      })),
      pagination: {
        total,
        limit,
        offset,
      },
      statusCounts: statusCounts.reduce(
        (acc, s) => ({ ...acc, [s.status]: s._count }),
        {} as Record<string, number>
      ),
    });
  } catch (error) {
    console.error('List violations error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch violations' },
      { status: 500 }
    );
  }
}
