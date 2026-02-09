import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const CACHE_TTL = 60;

let redisClient: Redis | null = null;

function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });
  }
  return redisClient;
}

export async function GET(
  req: Request,
  { params }: { params: { contractId: string } }
) {
  try {
    const { contractId } = params;
    const { searchParams } = new URL(req.url);
    const range = searchParams.get('range') || '24h';

    // Get contract from database
    const contract = await prisma.contract.findUnique({
      where: { contractId },
      select: { id: true },
    });

    if (!contract) {
      return NextResponse.json(
        { error: 'Contract not found' },
        { status: 404 }
      );
    }

    // Calculate date range
    const hoursMap: Record<string, number> = {
      '24h': 24,
      '7d': 168,
      '30d': 720,
    };
    const hours = hoursMap[range] || 24;
    const startDate = new Date();
    startDate.setHours(startDate.getHours() - hours);

    // Check cache
    const cacheKey = `contract:${contractId}:analytics:${range}`;
    try {
      const redis = getRedisClient();
      const cached = await redis.get(cacheKey);
      if (cached) {
        return NextResponse.json(JSON.parse(cached));
      }
    } catch {
      // Continue without cache
    }

    // Fetch analytics data
    const [
      callStats,
      gasStats,
      errorBreakdown,
      hourlyHistory,
      storageGrowth,
    ] = await Promise.all([
      // Call statistics
      prisma.contractCall.aggregate({
        where: {
          contractId: contract.id,
          timestamp: { gte: startDate },
        },
        _count: true,
        _sum: { gasUsed: true },
        _avg: { gasUsed: true },
      }),
      // Success/failure counts
      prisma.contractCall.groupBy({
        by: ['status'],
        where: {
          contractId: contract.id,
          timestamp: { gte: startDate },
        },
        _count: true,
      }),
      // Error breakdown
      prisma.contractCall.groupBy({
        by: ['errorCode'],
        where: {
          contractId: contract.id,
          status: 'failed',
          timestamp: { gte: startDate },
          errorCode: { not: null },
        },
        _count: true,
      }),
      // Hourly call history
      prisma.$queryRaw`
        SELECT
          DATE_TRUNC('hour', "timestamp") as hour,
          COUNT(*) as calls,
          AVG(CAST("gasUsed" AS FLOAT)) as avg_gas,
          SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as successful
        FROM "ContractCall"
        WHERE "contractId" = ${contract.id}
          AND "timestamp" >= ${startDate}
        GROUP BY DATE_TRUNC('hour', "timestamp")
        ORDER BY hour ASC
      ` as Promise<Array<{
        hour: Date;
        calls: bigint;
        avg_gas: number | null;
        successful: bigint;
      }>>,
      // Storage snapshots
      prisma.storageSnapshot.findMany({
        where: {
          contractId: contract.id,
          timestamp: { gte: startDate },
        },
        orderBy: { timestamp: 'asc' },
        select: {
          timestamp: true,
          totalEntries: true,
          totalSizeBytes: true,
        },
      }),
    ]);

    // Calculate metrics
    const successCount = gasStats.find(s => s.status === 'success')?._count || 0;
    const failedCount = gasStats.find(s => s.status === 'failed')?._count || 0;
    const totalCalls = successCount + failedCount;
    const successRate = totalCalls > 0 ? (successCount / totalCalls) * 100 : 100;

    // Determine gas trend
    let gasTrend: 'up' | 'down' | 'stable' = 'stable';
    if (hourlyHistory.length >= 2) {
      const recentAvg = hourlyHistory.slice(-Math.ceil(hourlyHistory.length / 2))
        .reduce((sum, h) => sum + (h.avg_gas || 0), 0) / Math.ceil(hourlyHistory.length / 2);
      const olderAvg = hourlyHistory.slice(0, Math.ceil(hourlyHistory.length / 2))
        .reduce((sum, h) => sum + (h.avg_gas || 0), 0) / Math.ceil(hourlyHistory.length / 2);

      if (recentAvg > olderAvg * 1.1) gasTrend = 'up';
      else if (recentAvg < olderAvg * 0.9) gasTrend = 'down';
    }

    const result = {
      summary: {
        totalCalls: callStats._count,
        successRate: Math.round(successRate * 10) / 10,
        failedCalls: failedCount,
        totalGasUsed: callStats._sum.gasUsed ? Number(callStats._sum.gasUsed) : 0,
        avgGasPerCall: callStats._avg.gasUsed ? Math.round(Number(callStats._avg.gasUsed)) : 0,
      },
      gasUsage: {
        total: callStats._sum.gasUsed ? Number(callStats._sum.gasUsed) : 0,
        avgPerCall: callStats._avg.gasUsed ? Math.round(Number(callStats._avg.gasUsed)) : 0,
        trend: gasTrend,
      },
      errorAnalysis: {
        successRate: Math.round(successRate * 10) / 10,
        failedCalls: failedCount,
        errorBreakdown: errorBreakdown.map(e => ({
          code: e.errorCode || 'Unknown',
          count: e._count,
        })),
      },
      callVolume: {
        total: totalCalls,
        history: hourlyHistory.map(h => ({
          timestamp: h.hour.toISOString(),
          calls: Number(h.calls),
          avgGas: h.avg_gas ? Math.round(h.avg_gas) : 0,
          successRate: Number(h.calls) > 0
            ? Math.round((Number(h.successful) / Number(h.calls)) * 100)
            : 100,
        })),
      },
      storageGrowth: storageGrowth.map(s => ({
        timestamp: s.timestamp.toISOString(),
        entries: s.totalEntries,
        sizeBytes: Number(s.totalSizeBytes),
      })),
      range,
      updatedAt: new Date().toISOString(),
    };

    // Cache result
    try {
      const redis = getRedisClient();
      await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));
    } catch {
      // Continue without cache
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Contract analytics fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contract analytics' },
      { status: 500 }
    );
  }
}
