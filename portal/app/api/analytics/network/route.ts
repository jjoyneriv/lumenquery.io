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
  // Fetch more ledgers for historical data
  // Stellar closes ~1 ledger every 5 seconds, so:
  // 24h = ~17,280 ledgers, 7d = ~120,960 ledgers
  // We'll sample to get reasonable data points
  const samplesNeeded = hours <= 24 ? 24 : hours <= 168 ? 168 : 720;
  const limit = Math.min(200, samplesNeeded); // Horizon max is 200

  const res = await fetch(`${HORIZON_URL}/ledgers?order=desc&limit=${limit}`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error('Failed to fetch ledger history');
  const data = await res.json();
  return data._embedded?.records || [];
}

function calculateMetrics(ledgers: HorizonLedger[], feeStats: HorizonFeeStats) {
  if (ledgers.length === 0) {
    return null;
  }

  const latestLedger = ledgers[0];

  // Calculate TPS from recent ledgers (last 10)
  const recentLedgers = ledgers.slice(0, 10);
  let totalTxs = 0;
  let totalTime = 0;

  for (let i = 0; i < recentLedgers.length - 1; i++) {
    totalTxs += recentLedgers[i].transaction_count;
    const time1 = new Date(recentLedgers[i].closed_at).getTime();
    const time2 = new Date(recentLedgers[i + 1].closed_at).getTime();
    totalTime += (time1 - time2) / 1000;
  }

  const tps = totalTime > 0 ? totalTxs / totalTime : 0;

  // Calculate 24h transaction count (estimate from available data)
  const totalTransactions = ledgers.reduce((sum, l) => sum + l.transaction_count, 0);
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

function aggregateHistory(ledgers: HorizonLedger[]): Array<{
  timestamp: string;
  transactions: number;
  successRate: number;
}> {
  if (ledgers.length === 0) return [];

  // Group ledgers by hour for cleaner visualization
  const hourlyData = new Map<string, { txs: number; success: number; total: number }>();

  for (const ledger of ledgers) {
    const date = new Date(ledger.closed_at);
    date.setMinutes(0, 0, 0);
    const hourKey = date.toISOString();

    const existing = hourlyData.get(hourKey) || { txs: 0, success: 0, total: 0 };
    existing.txs += ledger.transaction_count;
    existing.success += ledger.successful_transaction_count;
    existing.total += ledger.transaction_count;
    hourlyData.set(hourKey, existing);
  }

  return Array.from(hourlyData.entries())
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

    const data = await getCachedOrFetch(cacheKey, CACHE_TTL, async () => {
      const [ledgers, feeStats, historyLedgers] = await Promise.all([
        fetchLedgers(100),
        fetchFeeStats(),
        fetchLedgerHistory(hours),
      ]);

      const metrics = calculateMetrics(ledgers, feeStats);
      const history = aggregateHistory(historyLedgers);

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
