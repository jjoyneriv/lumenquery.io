import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { checkIntelligenceAccess } from '@/lib/intelligence/gates';
import { fetchEffects, filterTrustlineChanges, truncateAddress } from '@/lib/intelligence/horizon-client';
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

export async function GET(req: Request) {
  try {
    // Check authentication (optional - public access with limited data)
    const session = await auth();
    let hasFullAccess = false;

    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { organization: true },
      });

      if (user?.organizationId) {
        const access = await checkIntelligenceAccess(user.organizationId, 'alerts');
        hasFullAccess = access.allowed;
      }
    }

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'all'; // created, removed, all
    const assetCode = searchParams.get('asset');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);

    // Check cache
    const cacheKey = `intel:trustlines:${type}:${assetCode || 'all'}:${limit}`;
    try {
      const redis = getRedisClient();
      const cached = await redis.get(cacheKey);
      if (cached) {
        return NextResponse.json(JSON.parse(cached));
      }
    } catch {
      // Continue without cache
    }

    // Fetch effects from Horizon
    const { effects } = await fetchEffects(200);

    // Filter for trustline changes
    let trustlineEffects = filterTrustlineChanges(effects);

    // Apply filters
    if (type === 'created') {
      trustlineEffects = trustlineEffects.filter((e) => e.type === 'trustline_created');
    } else if (type === 'removed') {
      trustlineEffects = trustlineEffects.filter((e) => e.type === 'trustline_removed');
    }

    if (assetCode) {
      trustlineEffects = trustlineEffects.filter(
        (e) => e.asset_code?.toLowerCase() === assetCode.toLowerCase()
      );
    }

    // Limit results
    trustlineEffects = trustlineEffects.slice(0, limit);

    // Transform data
    const trustlines = trustlineEffects.map((e) => ({
      id: e.id,
      type: e.type.replace('trustline_', ''),
      account: truncateAddress(e.account),
      fullAccount: hasFullAccess ? e.account : undefined,
      assetCode: e.asset_code || 'Unknown',
      assetIssuer: e.asset_issuer ? truncateAddress(e.asset_issuer) : undefined,
      fullIssuer: hasFullAccess ? e.asset_issuer : undefined,
      limit: e.limit,
      createdAt: e.created_at,
    }));

    // Calculate summary
    const summary = {
      total: trustlines.length,
      created: trustlines.filter((t) => t.type === 'created').length,
      removed: trustlines.filter((t) => t.type === 'removed').length,
      updated: trustlines.filter((t) => t.type === 'updated').length,
    };

    // Get unique assets
    const assetCounts = new Map<string, number>();
    for (const t of trustlines) {
      const count = assetCounts.get(t.assetCode) || 0;
      assetCounts.set(t.assetCode, count + 1);
    }

    const topAssets = Array.from(assetCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([code, count]) => ({ code, count }));

    const result = {
      trustlines,
      summary,
      topAssets,
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
    console.error('Trustlines fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trustline changes' },
      { status: 500 }
    );
  }
}
