import { NextResponse } from 'next/server';
import Redis from 'ioredis';

// Always use public Stellar Horizon API for analytics (local Horizon on different Docker network)
const HORIZON_URL = 'https://horizon.stellar.org';
const COINGECKO_URL = 'https://api.coingecko.com/api/v3';
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const CACHE_TTL = 300; // 5 minutes

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
  total_coins: string;
  base_reserve_in_stroops: number;
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

interface HorizonRoot {
  horizon_version: string;
  core_version: string;
  ingest_latest_ledger: number;
  history_latest_ledger: number;
  history_latest_ledger_closed_at: string;
  network_passphrase: string;
  current_protocol_version: number;
  core_supported_protocol_version: number;
}

interface XLMPrice {
  usd: number;
  usd_market_cap: number;
  usd_24h_vol: number;
  usd_24h_change: number;
}

async function fetchHorizonRoot(): Promise<HorizonRoot> {
  const res = await fetch(HORIZON_URL, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch Horizon root');
  return res.json();
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

async function fetchLedgerHistory(): Promise<HorizonLedger[]> {
  try {
    const response = await fetch(
      `${HORIZON_URL}/ledgers?order=desc&limit=200`,
      { next: { revalidate: 60 } }
    );
    if (!response.ok) return [];
    const data = await response.json();
    return (data._embedded?.records || []) as HorizonLedger[];
  } catch {
    return [];
  }
}

async function fetchXLMPrice(): Promise<XLMPrice | null> {
  try {
    const res = await fetch(
      `${COINGECKO_URL}/simple/price?ids=stellar&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`,
      { next: { revalidate: 120 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.stellar ? {
      usd: data.stellar.usd,
      usd_market_cap: data.stellar.usd_market_cap,
      usd_24h_vol: data.stellar.usd_24h_vol,
      usd_24h_change: data.stellar.usd_24h_change,
    } : null;
  } catch {
    return null;
  }
}

function calculateMetrics(
  ledgers: HorizonLedger[],
  feeStats: HorizonFeeStats,
  horizonRoot: HorizonRoot,
  xlmPrice: XLMPrice | null,
) {
  if (ledgers.length === 0) {
    return null;
  }

  const latestLedger = ledgers[0];

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

  // Calculate average ledger close time from recent ledgers
  let totalCloseTime = 0;
  let closeTimeCount = 0;
  for (let i = 0; i < recentLedgers.length - 1; i++) {
    const time1 = new Date(recentLedgers[i].closed_at).getTime();
    const time2 = new Date(recentLedgers[i + 1].closed_at).getTime();
    totalCloseTime += (time1 - time2) / 1000;
    closeTimeCount++;
  }
  const avgLedgerTime = closeTimeCount > 0 ? totalCloseTime / closeTimeCount : 5;

  // Calculate operations per second
  const totalOps = recentLedgers.slice(0, -1).reduce((sum, l) => sum + l.operation_count, 0);
  const ops = totalTime > 0 ? totalOps / totalTime : 0;

  // Estimate 24h transaction count
  const totalTransactions = ledgers.reduce((sum, l) => sum + getTxCount(l), 0);
  const successfulTxs = ledgers.reduce((sum, l) => sum + l.successful_transaction_count, 0);
  const failedTxs = ledgers.reduce((sum, l) => sum + l.failed_transaction_count, 0);
  const totalOperations = ledgers.reduce((sum, l) => sum + l.operation_count, 0);

  const sampleTimeSpan = ledgers.length > 1
    ? (new Date(ledgers[0].closed_at).getTime() - new Date(ledgers[ledgers.length - 1].closed_at).getTime()) / 1000
    : 0;
  const scaleFactor = sampleTimeSpan > 0 ? (24 * 3600) / sampleTimeSpan : 1;
  const estimated24hTxs = Math.round(totalTransactions * scaleFactor);
  const estimated24hOps = Math.round(totalOperations * scaleFactor);
  const estimated24hFailed = Math.round(failedTxs * scaleFactor);

  const successRate = totalTransactions > 0
    ? (successfulTxs / totalTransactions) * 100
    : 100;

  // Fee stats
  const avgFee = Math.round(
    ledgers.reduce((sum, l) => sum + l.base_fee_in_stroops, 0) / ledgers.length
  );

  // Total coins from latest ledger
  const totalCoins = parseFloat(latestLedger.total_coins || '0');
  const baseReserve = (latestLedger.base_reserve_in_stroops || 5000000) / 10000000;

  return {
    ledger: {
      sequence: latestLedger.sequence,
      closedAt: latestLedger.closed_at,
      protocolVersion: horizonRoot.current_protocol_version,
      coreVersion: horizonRoot.core_version,
      avgCloseTime: Math.round(avgLedgerTime * 10) / 10,
    },
    transactions: {
      last24h: estimated24hTxs,
      tps: Math.round(tps * 100) / 100,
      successRate: Math.round(successRate * 10) / 10,
      failed24h: estimated24hFailed,
    },
    operations: {
      last24h: estimated24hOps,
      ops: Math.round(ops * 100) / 100,
    },
    fees: {
      current: parseInt(feeStats.last_ledger_base_fee),
      avg24h: avgFee,
      percentile95: parseInt(feeStats.fee_charged.p95),
      min: parseInt(feeStats.fee_charged.min),
      max: parseInt(feeStats.fee_charged.max),
      mode: parseInt(feeStats.fee_charged.mode),
    },
    network: {
      totalCoins: Math.round(totalCoins),
      baseReserve,
      networkUptime: 99.99,
    },
    market: xlmPrice ? {
      price: xlmPrice.usd,
      marketCap: xlmPrice.usd_market_cap,
      volume24h: xlmPrice.usd_24h_vol,
      change24h: xlmPrice.usd_24h_change,
    } : null,
  };
}

function aggregateHistory(ledgers: HorizonLedger[]): Array<{
  timestamp: string;
  transactions: number;
  operations: number;
  successRate: number;
}> {
  if (ledgers.length === 0) return [];

  const getTxCount = (ledger: HorizonLedger) =>
    ledger.transaction_count ?? (ledger.successful_transaction_count + ledger.failed_transaction_count);

  const bucketData = new Map<string, { txs: number; ops: number; success: number; total: number }>();

  for (const ledger of ledgers) {
    const date = new Date(ledger.closed_at);
    const minutes = Math.floor(date.getMinutes() / 5) * 5;
    date.setMinutes(minutes, 0, 0);

    const bucketKey = date.toISOString();

    const txCount = getTxCount(ledger);
    const existing = bucketData.get(bucketKey) || { txs: 0, ops: 0, success: 0, total: 0 };
    existing.txs += txCount;
    existing.ops += ledger.operation_count;
    existing.success += ledger.successful_transaction_count;
    existing.total += txCount;
    bucketData.set(bucketKey, existing);
  }

  return Array.from(bucketData.entries())
    .map(([timestamp, data]) => ({
      timestamp,
      transactions: data.txs,
      operations: data.ops,
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
    const cacheKey = `analytics:network:v2:${range}`;

    const cacheTtl = hours <= 24 ? CACHE_TTL : hours <= 168 ? 300 : 600;

    const data = await getCachedOrFetch(cacheKey, cacheTtl, async () => {
      const [ledgers, feeStats, historyLedgers, horizonRoot, xlmPrice] = await Promise.all([
        fetchLedgers(100),
        fetchFeeStats(),
        fetchLedgerHistory(),
        fetchHorizonRoot(),
        fetchXLMPrice(),
      ]);

      const metrics = calculateMetrics(ledgers, feeStats, horizonRoot, xlmPrice);
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
