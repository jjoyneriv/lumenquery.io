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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const skip = (page - 1) * limit;

    if (!query) {
      // Return recent contracts if no query
      const cacheKey = `contracts:recent:${page}:${limit}`;

      try {
        const redis = getRedisClient();
        const cached = await redis.get(cacheKey);
        if (cached) {
          return NextResponse.json(JSON.parse(cached));
        }
      } catch {
        // Continue without cache
      }

      const [contracts, total] = await Promise.all([
        prisma.contract.findMany({
          orderBy: { lastSeenLedger: 'desc' },
          skip,
          take: limit,
          select: {
            id: true,
            contractId: true,
            name: true,
            totalCalls: true,
            lastSeenLedger: true,
            createdAt: true,
          },
        }),
        prisma.contract.count(),
      ]);

      const result = {
        contracts,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };

      try {
        const redis = getRedisClient();
        await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));
      } catch {
        // Continue without cache
      }

      return NextResponse.json(result);
    }

    // Search by contract ID or name
    const contracts = await prisma.contract.findMany({
      where: {
        OR: [
          { contractId: { contains: query, mode: 'insensitive' } },
          { name: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: { totalCalls: 'desc' },
      skip,
      take: limit,
      select: {
        id: true,
        contractId: true,
        name: true,
        totalCalls: true,
        lastSeenLedger: true,
        createdAt: true,
      },
    });

    const total = await prisma.contract.count({
      where: {
        OR: [
          { contractId: { contains: query, mode: 'insensitive' } },
          { name: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    return NextResponse.json({
      contracts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Contract search error:', error);
    return NextResponse.json(
      { error: 'Failed to search contracts' },
      { status: 500 }
    );
  }
}
