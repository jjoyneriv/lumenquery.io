import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getEvents } from '@/lib/soroban/rpc-client';
import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const CACHE_TTL = 15;

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
    const eventType = searchParams.get('type'); // system, contract, diagnostic
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
    const cacheKey = `contract:${contractId}:events:${page}:${limit}:${eventType || 'all'}`;
    try {
      const redis = getRedisClient();
      const cached = await redis.get(cacheKey);
      if (cached) {
        return NextResponse.json(JSON.parse(cached));
      }
    } catch {
      // Continue without cache
    }

    // Build where clause
    const where: Record<string, unknown> = {
      contractId: contract.id,
    };

    if (eventType) {
      where.eventType = eventType;
    }

    // Fetch events from database
    const [events, total, typeCounts] = await Promise.all([
      prisma.contractEvent.findMany({
        where,
        orderBy: { timestamp: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          eventId: true,
          txHash: true,
          ledger: true,
          timestamp: true,
          eventType: true,
          topics: true,
          data: true,
        },
      }),
      prisma.contractEvent.count({ where }),
      prisma.contractEvent.groupBy({
        by: ['eventType'],
        where: { contractId: contract.id },
        _count: true,
      }),
    ]);

    // If no events in database, try to fetch from RPC
    if (events.length === 0 && page === 1) {
      try {
        const rpcEvents = await getEvents(contractId, undefined, undefined, limit);

        if (rpcEvents.events && rpcEvents.events.length > 0) {
          // Index events in database
          const eventsToCreate = rpcEvents.events.map(event => ({
            contractId: contract.id,
            eventId: event.id,
            txHash: event.txHash,
            ledger: event.ledger,
            timestamp: new Date(event.ledgerClosedAt),
            eventType: event.type,
            topics: event.topic as object,
            data: event.value ? { raw: event.value } : undefined,
          }));

          await prisma.contractEvent.createMany({
            data: eventsToCreate,
            skipDuplicates: true,
          });

          // Return the newly indexed events
          const result = {
            events: rpcEvents.events.map(event => ({
              id: event.id,
              eventId: event.id,
              txHash: event.txHash,
              ledger: event.ledger,
              timestamp: event.ledgerClosedAt,
              eventType: event.type,
              topics: event.topic,
              data: event.value ? { raw: event.value } : null,
            })),
            typeCounts: [],
            pagination: {
              page,
              limit,
              total: rpcEvents.events.length,
              totalPages: 1,
            },
            latestLedger: rpcEvents.latestLedger,
          };

          return NextResponse.json(result);
        }
      } catch (error) {
        console.error('Error fetching events from RPC:', error);
      }
    }

    const result = {
      events,
      typeCounts: typeCounts.map(tc => ({
        type: tc.eventType,
        count: tc._count,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
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
    console.error('Contract events fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contract events' },
      { status: 500 }
    );
  }
}
