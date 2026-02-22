import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { getHistoryDateLimit } from '@/lib/soroban/gates';
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
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const status = searchParams.get('status'); // success, failed, or null for all
    const functionName = searchParams.get('function');
    const skip = (page - 1) * limit;

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

    // Determine history limit based on user tier
    let dateLimit: Date | null = null;
    const session = await auth();
    if (session?.user) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
        include: { organization: true },
      });
      if (user?.organization) {
        dateLimit = getHistoryDateLimit(user.organization.tier);
      }
    } else {
      // Non-authenticated users get 7 days
      dateLimit = new Date();
      dateLimit.setDate(dateLimit.getDate() - 7);
    }

    // Build where clause
    const where: Record<string, unknown> = {
      contractId: contract.id,
    };

    if (status) {
      where.status = status;
    }

    if (functionName) {
      where.functionName = functionName;
    }

    if (dateLimit) {
      where.timestamp = { gte: dateLimit };
    }

    // Check cache
    const cacheKey = `contract:${contractId}:calls:${page}:${limit}:${status || 'all'}:${functionName || 'all'}`;
    try {
      const redis = getRedisClient();
      const cached = await redis.get(cacheKey);
      if (cached) {
        return NextResponse.json(JSON.parse(cached));
      }
    } catch {
      // Continue without cache
    }

    // Fetch calls
    const [calls, total, functions] = await Promise.all([
      prisma.contractCall.findMany({
        where,
        orderBy: { timestamp: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          txHash: true,
          ledger: true,
          timestamp: true,
          functionName: true,
          inputsDecoded: true,
          outputsDecoded: true,
          status: true,
          errorCode: true,
          gasUsed: true,
        },
      }),
      prisma.contractCall.count({ where }),
      // Get unique function names for filter dropdown
      prisma.contractCall.groupBy({
        by: ['functionName'],
        where: { contractId: contract.id },
        _count: true,
      }),
    ]);

    const result = {
      calls: calls.map(call => ({
        ...call,
        gasUsed: call.gasUsed ? Number(call.gasUsed) : null,
      })),
      functions: functions.map(f => ({
        name: f.functionName,
        count: f._count,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      historyLimit: dateLimit ? dateLimit.toISOString() : null,
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
    console.error('Contract calls fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contract calls' },
      { status: 500 }
    );
  }
}
