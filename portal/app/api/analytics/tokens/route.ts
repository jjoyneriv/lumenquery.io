import { NextResponse } from 'next/server';
import Redis from 'ioredis';

// Use public Stellar Horizon API as default/fallback
const HORIZON_URL = process.env.HORIZON_API_URL || 'https://horizon.stellar.org';
const PUBLIC_HORIZON_URL = 'https://horizon.stellar.org';
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// Helper to fetch with fallback to public Horizon
async function fetchWithFallback(path: string, options?: RequestInit): Promise<Response> {
  try {
    const res = await fetch(`${HORIZON_URL}${path}`, options);
    if (res.ok) return res;
    // If local Horizon fails, try public
    if (HORIZON_URL !== PUBLIC_HORIZON_URL) {
      console.log(`Local Horizon failed for ${path}, falling back to public`);
      return fetch(`${PUBLIC_HORIZON_URL}${path}`, options);
    }
    return res;
  } catch (error) {
    // Network error - try public Horizon
    if (HORIZON_URL !== PUBLIC_HORIZON_URL) {
      console.log(`Local Horizon unreachable for ${path}, falling back to public`);
      return fetch(`${PUBLIC_HORIZON_URL}${path}`, options);
    }
    throw error;
  }
}

// Cache TTLs
const VELOCITY_CACHE_TTL = 60;    // 60 seconds
const WHALE_CACHE_TTL = 120;      // 2 minutes
const RISK_CACHE_TTL = 300;       // 5 minutes

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

// Horizon API interfaces
interface HorizonPayment {
  id: string;
  type: string;
  created_at: string;
  transaction_successful: boolean;
  source_account: string;
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  from: string;
  to: string;
  amount: string;
}

interface HorizonAsset {
  asset_type: string;
  asset_code: string;
  asset_issuer: string;
  paging_token: string;
  num_accounts: number;
  num_claimable_balances: number;
  num_liquidity_pools: number;
  amount: string;
  accounts: {
    authorized: number;
    authorized_to_maintain_liabilities: number;
    unauthorized: number;
  };
  claimable_balances_amount: string;
  liquidity_pools_amount: string;
  flags: {
    auth_required: boolean;
    auth_revocable: boolean;
    auth_immutable: boolean;
    auth_clawback_enabled: boolean;
  };
}

interface HorizonAccount {
  id: string;
  account_id: string;
  balances: Array<{
    balance: string;
    asset_type: string;
    asset_code?: string;
    asset_issuer?: string;
  }>;
  last_modified_time: string;
}

// Response interfaces
interface TokenVelocity {
  totalPayments24h: number;
  totalVolumeXLM: string;
  avgPaymentSize: string;
  topTokensByVolume: Array<{
    code: string;
    issuer: string;
    volume24h: string;
    paymentCount: number;
  }>;
  hourlyActivity: Array<{
    timestamp: string;
    payments: number;
    volume: string;
  }>;
}

interface WhaleData {
  xlmWhales: Array<{
    address: string;
    balance: string;
    lastActivity: string;
  }>;
  recentLargeMovements: Array<{
    from: string;
    to: string;
    amount: string;
    timestamp: string;
    type: string;
  }>;
}

interface IssuerRiskData {
  topTokens: Array<{
    code: string;
    issuer: string;
    totalSupply: string;
    holderCount: number;
    riskFactors: {
      authRequired: boolean;
      authRevocable: boolean;
      authClawback: boolean;
      authImmutable: boolean;
    };
    riskScore: 'low' | 'medium' | 'high';
  }>;
}

// Helper functions
function formatXLM(stroops: string | number | undefined | null): string {
  if (stroops === undefined || stroops === null) return '0';
  const amount = typeof stroops === 'string' ? parseFloat(stroops) : stroops;
  if (isNaN(amount)) return '0';
  return amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function truncateAddress(address: string): string {
  if (!address || address.length < 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

function calculateRiskScore(flags: {
  auth_required: boolean;
  auth_revocable: boolean;
  auth_immutable: boolean;
  auth_clawback_enabled: boolean;
}): 'low' | 'medium' | 'high' {
  // Immutable flags = low risk (can't change)
  if (flags.auth_immutable) return 'low';
  // Clawback enabled = high risk
  if (flags.auth_clawback_enabled) return 'high';
  // Revocable = high risk
  if (flags.auth_revocable) return 'high';
  // Auth required only = medium risk
  if (flags.auth_required) return 'medium';
  // No special flags = low risk
  return 'low';
}

// Fetch multiple pages of payments with proper pagination and error handling
async function fetchPayments(): Promise<HorizonPayment[]> {
  const allPayments: HorizonPayment[] = [];
  const maxPages = 5; // Fetch 5 pages (1000 payments) which should span several ledgers/minutes
  let nextUrl: string | null = `${PUBLIC_HORIZON_URL}/payments?order=desc&limit=200&include_failed=false`;

  for (let page = 0; page < maxPages && nextUrl; page++) {
    try {
      const res: Response = await fetch(nextUrl, { next: { revalidate: 30 } });
      if (!res.ok) break;

      const data = await res.json();
      const records = data._embedded?.records || [];
      if (records.length === 0) break;

      // Filter to payment and create_account operations
      const payments = records.filter(
        (p: HorizonPayment) => p.type === 'payment' || p.type === 'create_account'
      );
      allPayments.push(...payments);

      // Get next page URL from HAL links
      nextUrl = data._links?.next?.href || null;
    } catch (error) {
      console.error('Error fetching payments page:', error);
      break;
    }
  }

  return allPayments;
}

async function fetchTopAssets(limit: number = 15): Promise<HorizonAsset[]> {
  const res = await fetchWithFallback(
    `/assets?order=desc&limit=${limit}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Failed to fetch assets');
  const data = await res.json();
  return data._embedded?.records || [];
}

async function fetchTopXLMHolders(): Promise<HorizonAccount[]> {
  // Note: Horizon doesn't have a direct "top holders" endpoint
  // We'll use a known list of large accounts or fetch from accounts endpoint
  // For now, we'll fetch accounts with high balances from recent activity
  const res = await fetchWithFallback(
    '/accounts?order=desc&limit=50',
    { next: { revalidate: 120 } }
  );
  if (!res.ok) {
    console.error('Failed to fetch accounts, returning empty list');
    return [];
  }
  const data = await res.json();
  return data._embedded?.records || [];
}

// Calculate velocity metrics
function calculateVelocity(payments: HorizonPayment[]): TokenVelocity {
  if (payments.length === 0) {
    return {
      totalPayments24h: 0,
      totalVolumeXLM: '0',
      avgPaymentSize: '0',
      topTokensByVolume: [],
      hourlyActivity: [],
    };
  }

  // Filter to XLM payments (native asset)
  const xlmPayments = payments.filter((p) => p.asset_type === 'native');

  // Calculate totals
  let totalVolume = 0;
  for (const payment of xlmPayments) {
    totalVolume += parseFloat(payment.amount);
  }

  // Calculate time span for extrapolation
  const firstPayment = new Date(payments[payments.length - 1].created_at).getTime();
  const lastPayment = new Date(payments[0].created_at).getTime();
  const sampleTimeSpan = (lastPayment - firstPayment) / 1000; // in seconds
  const scaleFactor = sampleTimeSpan > 0 ? (24 * 3600) / sampleTimeSpan : 1;

  // Estimate 24h totals
  const estimated24hPayments = Math.round(xlmPayments.length * scaleFactor);
  const estimated24hVolume = totalVolume * scaleFactor;

  // Calculate average
  const avgPayment = xlmPayments.length > 0 ? totalVolume / xlmPayments.length : 0;

  // Group by token for top tokens
  const tokenVolumes = new Map<string, { volume: number; count: number }>();

  for (const payment of payments) {
    const key = payment.asset_type === 'native'
      ? 'XLM:native'
      : `${payment.asset_code}:${payment.asset_issuer}`;
    const existing = tokenVolumes.get(key) || { volume: 0, count: 0 };
    existing.volume += parseFloat(payment.amount);
    existing.count += 1;
    tokenVolumes.set(key, existing);
  }

  // Sort and get top tokens
  const topTokens = Array.from(tokenVolumes.entries())
    .sort((a, b) => b[1].volume - a[1].volume)
    .slice(0, 5)
    .map(([key, data]) => {
      const [code, issuer] = key.split(':');
      return {
        code,
        issuer: issuer === 'native' ? 'Native' : truncateAddress(issuer),
        volume24h: formatXLM(data.volume * scaleFactor),
        paymentCount: Math.round(data.count * scaleFactor),
      };
    });

  // Aggregate ALL payments by 30-second intervals for chart
  // Ledgers close every ~5 seconds, so 30-second buckets group ~6 ledgers
  const intervalData = new Map<string, { payments: number; volume: number }>();
  for (const payment of payments) {
    const date = new Date(payment.created_at);
    // Round to 30-second intervals
    const seconds = Math.floor(date.getSeconds() / 30) * 30;
    date.setSeconds(seconds, 0);
    const intervalKey = date.toISOString();
    const existing = intervalData.get(intervalKey) || { payments: 0, volume: 0 };
    existing.payments += 1;
    // Only add volume for payments with amount (not all operations have amount)
    if (payment.amount) {
      existing.volume += parseFloat(payment.amount);
    }
    intervalData.set(intervalKey, existing);
  }

  const hourlyActivity = Array.from(intervalData.entries())
    .map(([timestamp, data]) => ({
      timestamp,
      payments: data.payments,
      volume: formatXLM(data.volume),
    }))
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  // Also update total payments to use all payments, not just XLM
  const estimated24hAllPayments = Math.round(payments.length * scaleFactor);

  return {
    totalPayments24h: estimated24hAllPayments,
    totalVolumeXLM: formatXLM(estimated24hVolume),
    avgPaymentSize: formatXLM(avgPayment),
    topTokensByVolume: topTokens,
    hourlyActivity,
  };
}

// Calculate whale data
function calculateWhaleData(payments: HorizonPayment[], accounts: HorizonAccount[]): WhaleData {
  // Filter large movements (>100K XLM)
  const LARGE_MOVEMENT_THRESHOLD = 100000;
  const WHALE_THRESHOLD = 1000000;

  const largeMovements = payments
    .filter((p) => p.asset_type === 'native' && p.amount && parseFloat(p.amount) >= LARGE_MOVEMENT_THRESHOLD)
    .slice(0, 10)
    .map((p) => ({
      from: truncateAddress(p.from || ''),
      to: truncateAddress(p.to || ''),
      amount: formatXLM(p.amount),
      timestamp: p.created_at,
      type: p.type,
    }));

  // Find whales from accounts
  const whales = accounts
    .filter((account) => account && account.balances)
    .map((account) => {
      const xlmBalance = account.balances.find((b) => b.asset_type === 'native');
      return {
        address: truncateAddress(account.account_id || ''),
        balance: xlmBalance ? formatXLM(xlmBalance.balance) : '0',
        balanceNum: xlmBalance && xlmBalance.balance ? parseFloat(xlmBalance.balance) : 0,
        lastActivity: account.last_modified_time || new Date().toISOString(),
      };
    })
    .filter((w) => w.balanceNum >= WHALE_THRESHOLD)
    .sort((a, b) => b.balanceNum - a.balanceNum)
    .slice(0, 10)
    .map(({ balanceNum, ...rest }) => rest);

  return {
    xlmWhales: whales,
    recentLargeMovements: largeMovements,
  };
}

// Calculate issuer risk
function calculateIssuerRisk(assets: HorizonAsset[]): IssuerRiskData {
  const topTokens = assets
    .filter((a) => a.asset_type !== 'native' && a.asset_code && a.flags)
    .map((asset) => {
      const flags = asset.flags || {
        auth_required: false,
        auth_revocable: false,
        auth_immutable: false,
        auth_clawback_enabled: false,
      };
      return {
        code: asset.asset_code || 'Unknown',
        issuer: truncateAddress(asset.asset_issuer || ''),
        totalSupply: formatXLM(asset.amount),
        holderCount: asset.num_accounts || 0,
        riskFactors: {
          authRequired: flags.auth_required || false,
          authRevocable: flags.auth_revocable || false,
          authClawback: flags.auth_clawback_enabled || false,
          authImmutable: flags.auth_immutable || false,
        },
        riskScore: calculateRiskScore(flags),
      };
    })
    .sort((a, b) => b.holderCount - a.holderCount)
    .slice(0, 10);

  return { topTokens };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const range = searchParams.get('range') || '24h';

    // Fetch all data in parallel with caching
    const [velocity, whaleData, riskData] = await Promise.all([
      getCachedOrFetch(`analytics:tokens:velocity:${range}`, VELOCITY_CACHE_TTL, async () => {
        const payments = await fetchPayments();
        return calculateVelocity(payments);
      }),
      getCachedOrFetch(`analytics:tokens:whales:${range}`, WHALE_CACHE_TTL, async () => {
        const [payments, accounts] = await Promise.all([
          fetchPayments(),
          fetchTopXLMHolders(),
        ]);
        return calculateWhaleData(payments, accounts);
      }),
      getCachedOrFetch(`analytics:tokens:risk`, RISK_CACHE_TTL, async () => {
        const assets = await fetchTopAssets(20);
        return calculateIssuerRisk(assets);
      }),
    ]);

    return NextResponse.json({
      velocity,
      whales: whaleData,
      issuerRisk: riskData,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Token Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch token analytics' },
      { status: 500 }
    );
  }
}
