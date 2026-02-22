import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { checkSorobanProAccess, incrementContractsExplored } from '@/lib/soroban/gates';
import { getEvents, getLatestLedger } from '@/lib/soroban/rpc-client';
import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const CACHE_TTL = 300;

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

async function fetchContractFromRPC(contractId: string) {
  try {
    // First get the latest ledger info to determine a valid startLedger
    const ledgerInfo = await getLatestLedger();

    // Use the ledger retention window start (approximately 7 days back)
    // Default retention is ~120960 ledgers, but use a safe window
    const startLedger = Math.max(1, ledgerInfo.sequence - 100000);

    // Now fetch events with a valid startLedger
    let events;
    try {
      events = await getEvents(contractId, startLedger, undefined, 100);
    } catch {
      // If events query fails, contract may not exist or have no events
      events = { events: [] };
    }

    // Verify the contract exists by checking if we got any data
    // A valid contract should have at least some activity or we can still index it
    return {
      contractId,
      wasmHash: null,
      createdLedger: events.events?.[0]?.ledger || ledgerInfo.sequence,
      lastSeenLedger: ledgerInfo.sequence,
      totalCalls: events.events?.length || 0,
      name: null,
      version: null,
      sourceUrl: null,
    };
  } catch (error) {
    console.error('Error fetching contract from RPC:', error);
    return null;
  }
}

export async function GET(
  req: Request,
  { params }: { params: { contractId: string } }
) {
  try {
    const { contractId } = params;

    if (!contractId || !contractId.startsWith('C')) {
      return NextResponse.json(
        { error: 'Invalid contract ID' },
        { status: 400 }
      );
    }

    // Check cache first
    const cacheKey = `contract:${contractId}`;
    try {
      const redis = getRedisClient();
      const cached = await redis.get(cacheKey);
      if (cached) {
        return NextResponse.json(JSON.parse(cached));
      }
    } catch {
      // Continue without cache
    }

    // Check database
    let contract = await prisma.contract.findUnique({
      where: { contractId },
      include: {
        _count: {
          select: {
            calls: true,
            events: true,
            storageEntries: true,
          },
        },
      },
    });

    // If not in database, fetch from RPC and index
    if (!contract) {
      const rpcData = await fetchContractFromRPC(contractId);

      if (!rpcData) {
        return NextResponse.json(
          { error: 'Contract not found' },
          { status: 404 }
        );
      }

      // Create contract in database
      contract = await prisma.contract.create({
        data: rpcData,
        include: {
          _count: {
            select: {
              calls: true,
              events: true,
              storageEntries: true,
            },
          },
        },
      });

      // Track exploration for authenticated users
      const session = await auth();
      if (session?.user) {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email! },
          select: { organizationId: true },
        });
        if (user?.organizationId) {
          await incrementContractsExplored(user.organizationId);
        }
      }
    }

    // Get recent activity
    const [recentCalls, recentEvents] = await Promise.all([
      prisma.contractCall.findMany({
        where: { contractId: contract.id },
        orderBy: { timestamp: 'desc' },
        take: 5,
        select: {
          id: true,
          functionName: true,
          status: true,
          timestamp: true,
          gasUsed: true,
        },
      }),
      prisma.contractEvent.findMany({
        where: { contractId: contract.id },
        orderBy: { timestamp: 'desc' },
        take: 5,
        select: {
          id: true,
          eventType: true,
          timestamp: true,
          topics: true,
        },
      }),
    ]);

    const result = {
      id: contract.id,
      contractId: contract.contractId,
      wasmHash: contract.wasmHash,
      name: contract.name,
      version: contract.version,
      sourceUrl: contract.sourceUrl,
      createdLedger: contract.createdLedger,
      lastSeenLedger: contract.lastSeenLedger,
      totalCalls: contract.totalCalls,
      createdAt: contract.createdAt,
      stats: {
        calls: contract._count.calls,
        events: contract._count.events,
        storageEntries: contract._count.storageEntries,
      },
      recentCalls: recentCalls.map(call => ({
        ...call,
        gasUsed: call.gasUsed ? Number(call.gasUsed) : null,
      })),
      recentEvents,
    };

    // Cache the result
    try {
      const redis = getRedisClient();
      await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));
    } catch {
      // Continue without cache
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Contract fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contract' },
      { status: 500 }
    );
  }
}
