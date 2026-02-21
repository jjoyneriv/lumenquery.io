import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, unauthorizedResponse } from '@/lib/admin';

// GET /api/admin/usage - Get aggregated usage statistics
export async function GET(request: NextRequest) {
  const adminSession = await requireAdmin();
  if (!adminSession) {
    return unauthorizedResponse();
  }

  const searchParams = request.nextUrl.searchParams;
  const period = searchParams.get('period') || '7d'; // 24h, 7d, 30d

  // Calculate date range
  let startDate: Date;
  switch (period) {
    case '24h':
      startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      break;
    case '30d':
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      break;
    case '7d':
    default:
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      break;
  }

  // Get overall statistics
  const [
    totalUsers,
    activeUsers,
    totalOrganizations,
    totalApiKeys,
    recentUsage,
    tierDistribution,
    topEndpoints,
    dailyStats,
  ] = await Promise.all([
    // Total users
    prisma.user.count(),

    // Active users (logged in within 30 minutes)
    prisma.user.count({
      where: {
        lastActiveAt: {
          gte: new Date(Date.now() - 30 * 60 * 1000),
        },
      },
    }),

    // Total organizations
    prisma.organization.count(),

    // Total API keys (non-revoked)
    prisma.apiKey.count({
      where: { revokedAt: null },
    }),

    // Recent usage records count
    prisma.usageRecord.count({
      where: {
        timestamp: { gte: startDate },
      },
    }),

    // Tier distribution
    prisma.organization.groupBy({
      by: ['tier'],
      _count: true,
    }),

    // Top endpoints
    prisma.usageRecord.groupBy({
      by: ['endpoint'],
      where: {
        timestamp: { gte: startDate },
      },
      _count: true,
      _avg: { responseTimeMs: true },
      orderBy: { _count: { endpoint: 'desc' } },
      take: 10,
    }),

    // Daily usage stats (from aggregated table)
    prisma.dailyUsage.findMany({
      where: {
        date: { gte: startDate },
      },
      orderBy: { date: 'asc' },
    }),
  ]);

  // Calculate aggregate metrics from daily stats
  const totalRequests = dailyStats.reduce((sum, d) => sum + d.totalRequests, 0);
  const successfulRequests = dailyStats.reduce((sum, d) => sum + d.successfulRequests, 0);
  const failedRequests = dailyStats.reduce((sum, d) => sum + d.failedRequests, 0);
  const successRate = totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0;

  // Get feature usage (which products are being used)
  const featureUsage = await Promise.all([
    // Soroban Pro usage
    prisma.organization.count({
      where: { sorobanProEnabled: true },
    }),
    // Intelligence usage
    prisma.organization.count({
      where: { intelligenceEnabled: true },
    }),
    // Portfolio usage
    prisma.organization.count({
      where: { portfolioEnabled: true },
    }),
  ]);

  return NextResponse.json({
    overview: {
      totalUsers,
      activeUsers,
      totalOrganizations,
      totalApiKeys,
      recentRequests: recentUsage,
    },
    usage: {
      period,
      totalRequests,
      successfulRequests,
      failedRequests,
      successRate: Math.round(successRate * 100) / 100,
    },
    tierDistribution: tierDistribution.map(t => ({
      tier: t.tier,
      count: t._count,
    })),
    featureUsage: {
      sorobanPro: featureUsage[0],
      intelligence: featureUsage[1],
      portfolio: featureUsage[2],
    },
    topEndpoints: topEndpoints.map(e => ({
      endpoint: e.endpoint,
      requests: e._count,
      avgResponseTime: Math.round(e._avg.responseTimeMs || 0),
    })),
    dailyUsage: dailyStats.map(d => ({
      date: d.date,
      requests: d.totalRequests,
      successful: d.successfulRequests,
      failed: d.failedRequests,
    })),
  });
}
