import { NextResponse } from 'next/server';
import Redis from 'ioredis';

const HORIZON_URL = process.env.HORIZON_API_URL || 'http://127.0.0.1:8000';
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const CACHE_TTL = 30; // 30 seconds

let redisClient: Redis | null = null;

function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });
    redisClient.on('error', (err) => console.error('Redis error:', err));
  }
  return redisClient;
}

async function getCachedOrFetch<T>(
  cacheKey: string,
  ttl: number,
  fetchFn: () => Promise<T>
): Promise<T> {
  try {
    const redis = getRedisClient();
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
    const data = await fetchFn();
    await redis.setex(cacheKey, ttl, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Cache error, fetching directly:', error);
    return fetchFn();
  }
}

interface HorizonLedger {
  sequence: number;
  closed_at: string;
  protocol_version: number;
  transaction_count: number;
  successful_transaction_count: number;
  failed_transaction_count: number;
  operation_count: number;
  base_fee_in_stroops: number;
}

interface HorizonFeeStats {
  last_ledger: string;
  last_ledger_base_fee: string;
  fee_charged: {
    min: string;
    max: string;
    mode: string;
    p10: string;
    p50: string;
    p95: string;
    p99: string;
  };
}

async function fetchLedgers(limit: number = 10): Promise<HorizonLedger[]> {
  const res = await fetch(`${HORIZON_URL}/ledgers?order=desc&limit=${limit}`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) throw new Error('Failed to fetch ledgers');
  const data = await res.json();
  return data._embedded?.records || [];
}

async function fetchFeeStats(): Promise<HorizonFeeStats> {
  const res = await fetch(`${HORIZON_URL}/fee_stats`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) throw new Error('Failed to fetch fee stats');
  return res.json();
}

async function fetchLedgerHistory(hours: number): Promise<HorizonLedger[]> {
  // Fetch ledgers with sequential pagination using HAL links
  const targetTime = Date.now() - (hours * 60 * 60 * 1000);

  // Limit pages based on time range
  // Each page = 200 ledgers = ~17 minutes of data
  // 24h needs ~84 pages, 7d needs ~605 pages
  // 30d: Our Horizon history only goes back ~19 days, so cap at 1600 pages
  // These requests are cached (5min for 7d, 10min for 30d) to avoid slow responses
  const maxPages = hours <= 24 ? 100 : hours <= 168 ? 700 : 1600;

  const allLedgers: HorizonLedger[] = [];
  let nextUrl: string | null = `${HORIZON_URL}/ledgers?order=desc&limit=200`;

  for (let page = 0; page < maxPages && nextUrl; page++) {
    try {
      const res: Response = await fetch(nextUrl, { next: { revalidate: 60 } });
      if (!res.ok) break;

      const data = await res.json();
      const records: HorizonLedger[] = data._embedded?.records || [];

      if (records.length === 0) break;

      allLedgers.push(...records);

      // Check if we've gone back far enough in time
      const oldestLedger = records[records.length - 1];
      const oldestTime = new Date(oldestLedger.closed_at).getTime();
      if (oldestTime <= targetTime) break;

      // Get next page URL from HAL links
      nextUrl = data._links?.next?.href || null;
      if (nextUrl && !nextUrl.startsWith('http')) {
        nextUrl = `${HORIZON_URL}${nextUrl}`;
      }
    } catch (error) {
      console.error('Error fetching ledger page:', error);
      break;
    }
  }

  return allLedgers;
}

function calculateMetrics(ledgers: HorizonLedger[], feeStats: HorizonFeeStats) {
  if (ledgers.length === 0) {
    return null;
  }

  const latestLedger = ledgers[0];

  // Helper to get total transactions (transaction_count can be null in some Horizon versions)
  const getTxCount = (ledger: HorizonLedger) =>
    ledger.transaction_count ?? (ledger.successful_transaction_count + ledger.failed_transaction_count);

  // Calculate TPS from recent ledgers (last 10)
  const recentLedgers = ledgers.slice(0, 10);
  let totalTxs = 0;
  let totalTime = 0;

  for (let i = 0; i < recentLedgers.length - 1; i++) {
    totalTxs += getTxCount(recentLedgers[i]);
    const time1 = new Date(recentLedgers[i].closed_at).getTime();
    const time2 = new Date(recentLedgers[i + 1].closed_at).getTime();
    totalTime += (time1 - time2) / 1000;
  }

  const tps = totalTime > 0 ? totalTxs / totalTime : 0;

  // Calculate 24h transaction count (estimate from available data)
  const totalTransactions = ledgers.reduce((sum, l) => sum + getTxCount(l), 0);
  const successfulTxs = ledgers.reduce((sum, l) => sum + l.successful_transaction_count, 0);
  const failedTxs = ledgers.reduce((sum, l) => sum + l.failed_transaction_count, 0);

  // Extrapolate to 24h based on sample
  const sampleTimeSpan = ledgers.length > 1
    ? (new Date(ledgers[0].closed_at).getTime() - new Date(ledgers[ledgers.length - 1].closed_at).getTime()) / 1000
    : 0;
  const scaleFactor = sampleTimeSpan > 0 ? (24 * 3600) / sampleTimeSpan : 1;
  const estimated24hTxs = Math.round(totalTransactions * scaleFactor);

  const successRate = totalTransactions > 0
    ? (successfulTxs / totalTransactions) * 100
    : 100;

  // Fee stats
  const avgFee = Math.round(
    ledgers.reduce((sum, l) => sum + l.base_fee_in_stroops, 0) / ledgers.length
  );

  return {
    ledger: {
      sequence: latestLedger.sequence,
      closedAt: latestLedger.closed_at,
      protocolVersion: latestLedger.protocol_version,
    },
    transactions: {
      last24h: estimated24hTxs,
      tps: Math.round(tps * 100) / 100,
      successRate: Math.round(successRate * 10) / 10,
    },
    fees: {
      current: parseInt(feeStats.last_ledger_base_fee),
      avg24h: avgFee,
      percentile95: parseInt(feeStats.fee_charged.p95),
    },
  };
}

function aggregateHistory(ledgers: HorizonLedger[], hours: number): Array<{
  timestamp: string;
  transactions: number;
  successRate: number;
}> {
  if (ledgers.length === 0) return [];

  // Helper to get total transactions (transaction_count can be null in some Horizon versions)
  const getTxCount = (ledger: HorizonLedger) =>
    ledger.transaction_count ?? (ledger.successful_transaction_count + ledger.failed_transaction_count);

  // Determine bucket size based on time range
  // 24h: hourly buckets (24 data points)
  // 7d: 4-hour buckets (42 data points)
  // 30d: daily buckets (30 data points)
  const bucketHours = hours <= 24 ? 1 : hours <= 168 ? 4 : 24;

  const bucketData = new Map<string, { txs: number; success: number; total: number }>();

  for (const ledger of ledgers) {
    const date = new Date(ledger.closed_at);

    // Round to bucket boundary
    if (bucketHours === 1) {
      date.setMinutes(0, 0, 0);
    } else if (bucketHours === 4) {
      const bucketHour = Math.floor(date.getHours() / 4) * 4;
      date.setHours(bucketHour, 0, 0, 0);
    } else {
      date.setHours(0, 0, 0, 0);
    }

    const bucketKey = date.toISOString();

    const txCount = getTxCount(ledger);
    const existing = bucketData.get(bucketKey) || { txs: 0, success: 0, total: 0 };
    existing.txs += txCount;
    existing.success += ledger.successful_transaction_count;
    existing.total += txCount;
    bucketData.set(bucketKey, existing);
  }

  return Array.from(bucketData.entries())
    .map(([timestamp, data]) => ({
      timestamp,
      transactions: data.txs,
      successRate: data.total > 0 ? (data.success / data.total) * 100 : 100,
    }))
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const range = searchParams.get('range') || '24h';

    const hoursMap: Record<string, number> = {
      '24h': 24,
      '7d': 168,
      '30d': 720,
    };
    const hours = hoursMap[range] || 24;
    const cacheKey = `analytics:network:${range}`;

    // Longer cache TTL for longer time ranges
    const cacheTtl = hours <= 24 ? CACHE_TTL : hours <= 168 ? 300 : 600;

    const data = await getCachedOrFetch(cacheKey, cacheTtl, async () => {
      const [ledgers, feeStats, historyLedgers] = await Promise.all([
        fetchLedgers(100),
        fetchFeeStats(),
        fetchLedgerHistory(hours),
      ]);

      const metrics = calculateMetrics(ledgers, feeStats);
      const history = aggregateHistory(historyLedgers, hours);

      return {
        ...metrics,
        history,
        updatedAt: new Date().toISOString(),
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch network analytics' },
      { status: 500 }
    );
  }
}
