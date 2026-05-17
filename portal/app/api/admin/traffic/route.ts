import { NextResponse } from 'next/server';
import { requireSuperAdmin, unauthorizedResponse } from '@/lib/admin';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const adminSession = await requireSuperAdmin();
  if (!adminSession) return unauthorizedResponse();

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Total views by period
  const [views24h, views7d, views30d] = await Promise.all([
    prisma.pageView.count({ where: { createdAt: { gte: oneDayAgo } } }),
    prisma.pageView.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.pageView.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
  ]);

  // Unique sessions (visitors) by period
  const [visitors24hRaw, visitors7dRaw, visitors30dRaw] = await Promise.all([
    prisma.pageView.findMany({ where: { createdAt: { gte: oneDayAgo } }, select: { sessionId: true }, distinct: ['sessionId'] }),
    prisma.pageView.findMany({ where: { createdAt: { gte: sevenDaysAgo } }, select: { sessionId: true }, distinct: ['sessionId'] }),
    prisma.pageView.findMany({ where: { createdAt: { gte: thirtyDaysAgo } }, select: { sessionId: true }, distinct: ['sessionId'] }),
  ]);

  // Subscriber vs non-subscriber views (24h)
  const [subscriberViews, anonymousViews, freeViews] = await Promise.all([
    prisma.pageView.count({ where: { createdAt: { gte: oneDayAgo }, userTier: { in: ['DEVELOPER', 'TEAM', 'ENTERPRISE'] } } }),
    prisma.pageView.count({ where: { createdAt: { gte: oneDayAgo }, userId: null } }),
    prisma.pageView.count({ where: { createdAt: { gte: oneDayAgo }, userTier: 'FREE' } }),
  ]);

  // Views by tier (7d)
  const tierBreakdown = await prisma.pageView.groupBy({
    by: ['userTier'],
    where: { createdAt: { gte: sevenDaysAgo } },
    _count: true,
    orderBy: { _count: { userTier: 'desc' } },
  });

  // Top pages (7d)
  const topPages = await prisma.pageView.groupBy({
    by: ['path'],
    where: { createdAt: { gte: sevenDaysAgo } },
    _count: true,
    orderBy: { _count: { path: 'desc' } },
    take: 15,
  });

  // Top pages by subscribers only (7d)
  const topPagesSubscribers = await prisma.pageView.groupBy({
    by: ['path'],
    where: { createdAt: { gte: sevenDaysAgo }, userTier: { in: ['DEVELOPER', 'TEAM', 'ENTERPRISE'] } },
    _count: true,
    orderBy: { _count: { path: 'desc' } },
    take: 10,
  });

  // Hourly traffic (last 24h)
  const hourlyViews = await prisma.$queryRawUnsafe<Array<{ hour: string; count: bigint }>>(`
    SELECT date_trunc('hour', "createdAt") as hour, COUNT(*)::bigint as count
    FROM "PageView"
    WHERE "createdAt" >= $1
    GROUP BY hour
    ORDER BY hour ASC
  `, oneDayAgo);

  // Daily traffic (last 7d)
  const dailyViews = await prisma.$queryRawUnsafe<Array<{ day: string; count: bigint }>>(`
    SELECT date_trunc('day', "createdAt") as day, COUNT(*)::bigint as count
    FROM "PageView"
    WHERE "createdAt" >= $1
    GROUP BY day
    ORDER BY day ASC
  `, sevenDaysAgo);

  return NextResponse.json({
    summary: {
      views24h,
      views7d,
      views30d,
      visitors24h: visitors24hRaw.length,
      visitors7d: visitors7dRaw.length,
      visitors30d: visitors30dRaw.length,
    },
    breakdown24h: {
      subscribers: subscriberViews,
      freeUsers: freeViews,
      anonymous: anonymousViews,
      total: views24h,
    },
    tierBreakdown: tierBreakdown.map(t => ({
      tier: t.userTier || 'Anonymous',
      views: t._count,
    })),
    topPages: topPages.map(p => ({ path: p.path, views: p._count })),
    topPagesSubscribers: topPagesSubscribers.map(p => ({ path: p.path, views: p._count })),
    hourlyTraffic: hourlyViews.map(h => ({
      timestamp: h.hour,
      views: Number(h.count),
    })),
    dailyTraffic: dailyViews.map(d => ({
      date: d.day,
      views: Number(d.count),
    })),
  });
}
