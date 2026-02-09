import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const CACHE_TTL = 30;

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
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200);
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

    // Check cache
    const cacheKey = `contract:${contractId}:storage:${page}:${limit}`;
    try {
      const redis = getRedisClient();
      const cached = await redis.get(cacheKey);
      if (cached) {
        return NextResponse.json(JSON.parse(cached));
      }
    } catch {
      // Continue without cache
    }

    // Fetch storage entries (latest version of each key)
    const [entries, total, snapshot] = await Promise.all([
      prisma.$queryRaw`
        SELECT DISTINCT ON ("storageKey") *
        FROM "ContractStorage"
        WHERE "contractId" = ${contract.id}
        ORDER BY "storageKey", "ledger" DESC
        LIMIT ${limit}
        OFFSET ${skip}
      ` as Promise<Array<{
        id: string;
        storageKey: string;
        storageKeyDecoded: string | null;
        storageValue: string;
        storageValueDecoded: unknown | null;
        ledger: number;
        timestamp: Date;
      }>>,
      prisma.contractStorage.groupBy({
        by: ['storageKey'],
        where: { contractId: contract.id },
        _count: true,
      }).then(groups => groups.length),
      prisma.storageSnapshot.findFirst({
        where: { contractId: contract.id },
        orderBy: { timestamp: 'desc' },
      }),
    ]);

    const result = {
      entries: entries.map(entry => ({
        id: entry.id,
        key: entry.storageKey,
        keyDecoded: entry.storageKeyDecoded,
        value: entry.storageValue,
        valueDecoded: entry.storageValueDecoded,
        ledger: entry.ledger,
        timestamp: entry.timestamp,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      snapshot: snapshot ? {
        totalEntries: snapshot.totalEntries,
        totalSizeBytes: Number(snapshot.totalSizeBytes),
        ledger: snapshot.ledger,
        timestamp: snapshot.timestamp,
      } : null,
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
    console.error('Contract storage fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contract storage' },
      { status: 500 }
    );
  }
}
