import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { checkIntelligenceAccess } from '@/lib/intelligence/gates';
import {
  fetchAccount,
  fetchAccountOperations,
  truncateAddress,
  formatXLM,
} from '@/lib/intelligence/horizon-client';
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
  { params }: { params: { accountId: string } }
) {
  try {
    const { accountId } = params;

    // Validate account ID format
    if (!accountId || (!accountId.startsWith('G') && !accountId.startsWith('C'))) {
      return NextResponse.json(
        { error: 'Invalid account ID format' },
        { status: 400 }
      );
    }

    // Check authentication (optional - public access with limited data)
    const session = await getServerSession(authOptions);
    let hasFullAccess = false;

    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { organization: true },
      });

      if (user?.organizationId) {
        const access = await checkIntelligenceAccess(
          user.organizationId,
          'accountProfile'
        );
        hasFullAccess = access.allowed;
      }
    }

    // Check cache
    const cacheKey = `intel:account:${accountId}:profile`;
    try {
      const redis = getRedisClient();
      const cached = await redis.get(cacheKey);
      if (cached) {
        const data = JSON.parse(cached);
        if (!hasFullAccess) {
          // Remove premium fields for non-subscribers
          delete data.behaviorMetrics;
          delete data.anomalies;
        }
        return NextResponse.json(data);
      }
    } catch {
      // Continue without cache
    }

    // Fetch account from Horizon
    const account = await fetchAccount(accountId);
    if (!account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    // Fetch recent operations
    const { operations } = await fetchAccountOperations(accountId, 100);

    // Calculate basic metrics
    const xlmBalance = account.balances.find((b) => b.asset_type === 'native');
    const trustlines = account.balances.filter((b) => b.asset_type !== 'native');

    // Analyze operations for behavior metrics
    const counterparties = new Map<string, number>();
    let totalVolume = 0;
    let paymentCount = 0;

    for (const op of operations) {
      if (op.type === 'payment' || op.type === 'create_account') {
        const counterparty = op.to === accountId ? op.from : op.to;
        if (counterparty) {
          counterparties.set(
            counterparty,
            (counterparties.get(counterparty) || 0) + 1
          );
        }
        if (op.asset_type === 'native' && op.amount) {
          totalVolume += parseFloat(op.amount);
          paymentCount++;
        }
      }
    }

    // Get top counterparties
    const topCounterparties = Array.from(counterparties.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([address, count]) => ({
        address: truncateAddress(address),
        fullAddress: address,
        transactionCount: count,
      }));

    // Determine account type heuristics
    let accountType = 'UNKNOWN';
    const balance = parseFloat(xlmBalance?.balance || '0');

    if (balance >= 10000000) {
      accountType = 'WHALE';
    } else if (counterparties.size > 50) {
      accountType = 'EXCHANGE';
    } else if (trustlines.length > 10) {
      accountType = 'MARKET_MAKER';
    } else if (paymentCount > 0) {
      accountType = 'RETAIL';
    }

    // Calculate behavior metrics (premium feature)
    const behaviorMetrics = {
      velocityScore: Math.min(100, (operations.length / 100) * 100),
      volumeScore: Math.min(100, (totalVolume / 1000000) * 100),
      diversityScore: Math.min(100, (counterparties.size / 50) * 100),
      regularityScore: 50, // Placeholder - would need more analysis
    };

    const result = {
      account: {
        id: account.account_id,
        displayId: truncateAddress(account.account_id),
        sequence: account.sequence,
        lastModified: account.last_modified_time,
      },
      balance: {
        xlm: xlmBalance?.balance || '0',
        xlmFormatted: formatXLM(xlmBalance?.balance || '0'),
      },
      trustlines: trustlines.map((t) => ({
        assetCode: t.asset_code || 'Unknown',
        assetIssuer: t.asset_issuer ? truncateAddress(t.asset_issuer) : '',
        balance: t.balance,
        limit: t.limit,
      })),
      classification: {
        type: accountType,
        riskScore: 0, // Would need more analysis
      },
      activity: {
        recentOperations: operations.length,
        totalVolume: formatXLM(totalVolume),
        uniqueCounterparties: counterparties.size,
      },
      topCounterparties,
      recentTransactions: operations.slice(0, 10).map((op) => ({
        id: op.id,
        type: op.type,
        createdAt: op.created_at,
        amount: op.amount,
        assetCode: op.asset_code || 'XLM',
        from: op.from ? truncateAddress(op.from) : undefined,
        to: op.to ? truncateAddress(op.to) : undefined,
        successful: op.transaction_successful,
      })),
      behaviorMetrics: hasFullAccess ? behaviorMetrics : undefined,
      anomalies: hasFullAccess ? [] : undefined,
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
    console.error('Account profile error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch account profile' },
      { status: 500 }
    );
  }
}
