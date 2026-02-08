import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { organization: true },
    });

    if (!user?.organizationId) {
      return NextResponse.json({ error: 'No organization found' }, { status: 400 });
    }

    const orgId = user.organizationId;

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get this month's start
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    // Fetch today's usage
    const todayUsage = await prisma.dailyUsage.findFirst({
      where: {
        organizationId: orgId,
        date: {
          gte: today,
        },
      },
    });

    // Fetch this month's usage (aggregate)
    const monthlyUsage = await prisma.dailyUsage.aggregate({
      where: {
        organizationId: orgId,
        date: {
          gte: monthStart,
        },
      },
      _sum: {
        totalRequests: true,
        successfulRequests: true,
        failedRequests: true,
        totalResponseTimeMs: true,
        totalDataTransferBytes: true,
      },
    });

    // Fetch last 30 days for chart
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyStats = await prisma.dailyUsage.findMany({
      where: {
        organizationId: orgId,
        date: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: { date: 'asc' },
      select: {
        date: true,
        totalRequests: true,
        successfulRequests: true,
        failedRequests: true,
      },
    });

    // Get organization tier and limits
    const org = user.organization;
    const monthlyLimit = org?.monthlyRequestLimit || 10000;
    const monthlyTotal = monthlyUsage._sum.totalRequests || 0;

    // Convert BigInt values to Number for JSON serialization
    const totalResponseTimeMs = Number(monthlyUsage._sum.totalResponseTimeMs ?? 0);
    const totalDataTransferBytes = Number(monthlyUsage._sum.totalDataTransferBytes ?? 0);
    const todayResponseTimeMs = Number(todayUsage?.totalResponseTimeMs ?? 0);

    return NextResponse.json({
      today: {
        requests: todayUsage?.totalRequests || 0,
        successful: todayUsage?.successfulRequests || 0,
        failed: todayUsage?.failedRequests || 0,
        avgResponseTime: todayUsage?.totalRequests
          ? Math.round(todayResponseTimeMs / todayUsage.totalRequests)
          : 0,
      },
      month: {
        requests: monthlyTotal,
        successful: monthlyUsage._sum.successfulRequests || 0,
        failed: monthlyUsage._sum.failedRequests || 0,
        dataTransfer: totalDataTransferBytes,
        limit: monthlyLimit,
        percentUsed: Math.round((monthlyTotal / monthlyLimit) * 100),
      },
      dailyStats,
      tier: org?.tier || 'FREE',
    });
  } catch (error) {
    console.error('Error fetching usage:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
