import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, unauthorizedResponse } from '@/lib/admin';

// GET /api/admin/usage/[userId] - Get per-user feature usage
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const adminSession = await requireAdmin();
  if (!adminSession) {
    return unauthorizedResponse();
  }

  const { userId } = await params;
  const searchParams = request.nextUrl.searchParams;
  const period = searchParams.get('period') || '30d';

  // Calculate date range
  let startDate: Date;
  switch (period) {
    case '7d':
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '90d':
      startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
      break;
    case '30d':
    default:
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      break;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      organization: {
        select: {
          id: true,
          name: true,
          tier: true,
          monthlyRequestLimit: true,
          sorobanProEnabled: true,
          intelligenceEnabled: true,
          complianceEnabled: true,
          portfolioEnabled: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (!user.organization) {
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      organization: null,
      usage: null,
      features: null,
    });
  }

  // Get usage records grouped by endpoint
  const endpointUsage = await prisma.usageRecord.groupBy({
    by: ['endpoint'],
    where: {
      organizationId: user.organization.id,
      timestamp: { gte: startDate },
    },
    _count: true,
    _avg: { responseTimeMs: true },
    orderBy: { _count: { endpoint: 'desc' } },
  });

  // Get daily usage
  const dailyUsage = await prisma.dailyUsage.findMany({
    where: {
      organizationId: user.organization.id,
      date: { gte: startDate },
    },
    orderBy: { date: 'asc' },
  });

  // Calculate totals
  const totalRequests = dailyUsage.reduce((sum, d) => sum + d.totalRequests, 0);
  const successfulRequests = dailyUsage.reduce((sum, d) => sum + d.successfulRequests, 0);
  const failedRequests = dailyUsage.reduce((sum, d) => sum + d.failedRequests, 0);

  // Get feature-specific usage
  const featureUsage: Record<string, any> = {};

  // Soroban Pro usage
  if (user.organization.sorobanProEnabled) {
    const contractsExplored = await prisma.usageRecord.count({
      where: {
        organizationId: user.organization.id,
        endpoint: { startsWith: '/api/contracts' },
        timestamp: { gte: startDate },
      },
    });
    featureUsage.sorobanPro = {
      enabled: true,
      contractsExplored,
    };
  }

  // Intelligence usage
  if (user.organization.intelligenceEnabled) {
    const [watchlistCount, alertCount] = await Promise.all([
      prisma.watchlist.count({
        where: { organizationId: user.organization.id },
      }),
      prisma.alert.count({
        where: {
          organizationId: user.organization.id,
          createdAt: { gte: startDate },
        },
      }),
    ]);
    featureUsage.intelligence = {
      enabled: true,
      watchlists: watchlistCount,
      alertsReceived: alertCount,
    };
  }

  // Compliance usage
  if (user.organization.complianceEnabled) {
    const [accountCount, ruleCount, violationCount] = await Promise.all([
      prisma.monitoredAccount.count({
        where: { organizationId: user.organization.id },
      }),
      prisma.complianceRule.count({
        where: { organizationId: user.organization.id },
      }),
      prisma.complianceViolation.count({
        where: {
          organizationId: user.organization.id,
          createdAt: { gte: startDate },
        },
      }),
    ]);
    featureUsage.compliance = {
      enabled: true,
      monitoredAccounts: accountCount,
      activeRules: ruleCount,
      violations: violationCount,
    };
  }

  // Portfolio usage
  if (user.organization.portfolioEnabled) {
    const [portfolioCount, accountCount] = await Promise.all([
      prisma.portfolio.count({
        where: { organizationId: user.organization.id },
      }),
      prisma.portfolioAccount.count({
        where: {
          portfolio: {
            organizationId: user.organization.id,
          },
        },
      }),
    ]);
    featureUsage.portfolio = {
      enabled: true,
      portfolios: portfolioCount,
      linkedAccounts: accountCount,
    };
  }

  // Categorize endpoints by feature
  const categorizedUsage = {
    analytics: endpointUsage.filter(e => e.endpoint.startsWith('/api/analytics')),
    contracts: endpointUsage.filter(e => e.endpoint.startsWith('/api/contracts')),
    compliance: endpointUsage.filter(e => e.endpoint.startsWith('/api/compliance')),
    intelligence: endpointUsage.filter(e => e.endpoint.startsWith('/api/intelligence')),
    portfolio: endpointUsage.filter(e => e.endpoint.startsWith('/api/portfolio')),
    other: endpointUsage.filter(e =>
      !e.endpoint.startsWith('/api/analytics') &&
      !e.endpoint.startsWith('/api/contracts') &&
      !e.endpoint.startsWith('/api/compliance') &&
      !e.endpoint.startsWith('/api/intelligence') &&
      !e.endpoint.startsWith('/api/portfolio')
    ),
  };

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    organization: {
      id: user.organization.id,
      name: user.organization.name,
      tier: user.organization.tier,
      monthlyRequestLimit: user.organization.monthlyRequestLimit,
    },
    period,
    usage: {
      totalRequests,
      successfulRequests,
      failedRequests,
      successRate: totalRequests > 0
        ? Math.round((successfulRequests / totalRequests) * 10000) / 100
        : 0,
      usagePercent: Math.round(
        (totalRequests / user.organization.monthlyRequestLimit) * 10000
      ) / 100,
    },
    features: featureUsage,
    endpointUsage: categorizedUsage,
    dailyUsage: dailyUsage.map(d => ({
      date: d.date,
      requests: d.totalRequests,
      successful: d.successfulRequests,
      failed: d.failedRequests,
    })),
  });
}
