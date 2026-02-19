import { NextResponse } from 'next/server';
import Redis from 'ioredis';

// Use public Stellar Horizon API as default/fallback
const HORIZON_URL = process.env.HORIZON_API_URL || 'https://horizon.stellar.org';
const PUBLIC_HORIZON_URL = 'https://horizon.stellar.org';
const SOROBAN_RPC_URL = process.env.SOROBAN_RPC_URL || 'http://127.0.0.1:8001';
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
const ACTIVITY_CACHE_TTL = 60;   // 60 seconds
const EVENTS_CACHE_TTL = 120;    // 2 minutes
const FEE_CACHE_TTL = 60;        // 60 seconds

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

// Soroban RPC call helper
async function sorobanRpc<T>(method: string, params: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(SOROBAN_RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params,
    }),
  });

  if (!res.ok) {
    throw new Error(`Soroban RPC error: ${res.status}`);
  }

  const data = await res.json();
  if (data.error) {
    throw new Error(data.error.message || 'Soroban RPC error');
  }

  return data.result;
}

// Horizon API interfaces
interface HorizonOperation {
  id: string;
  type: string;
  type_i: number;
  created_at: string;
  transaction_hash: string;
  transaction_successful: boolean;
  source_account: string;
  function?: string;
  parameters?: Array<{ type: string; value: unknown }>;
}

// Soroban RPC interfaces
interface SorobanFeeStats {
  sorobanInclusionFee: {
    max: string;
    min: string;
    mode: string;
    p10: string;
    p20: string;
    p30: string;
    p40: string;
    p50: string;
    p60: string;
    p70: string;
    p80: string;
    p90: string;
    p95: string;
    p99: string;
  };
  inclusionFee: {
    max: string;
    min: string;
    mode: string;
    p10: string;
    p20: string;
    p30: string;
    p40: string;
    p50: string;
    p60: string;
    p70: string;
    p80: string;
    p90: string;
    p95: string;
    p99: string;
  };
  latestLedger: number;
}

interface SorobanLatestLedger {
  id: string;
  protocolVersion: number;
  sequence: number;
}

interface SorobanEvent {
  type: string;
  ledger: number;
  ledgerClosedAt: string;
  contractId: string;
  id: string;
  pagingToken: string;
  topic: string[];
  value: string;
  inSuccessfulContractCall: boolean;
  txHash: string;
}

interface SorobanEventsResponse {
  events: SorobanEvent[];
  latestLedger: number;
}

// Response interfaces
interface ContractActivity {
  totalInvocations24h: number;
  successRate: number;
  hourlyActivity: Array<{
    timestamp: string;
    invocations: number;
  }>;
  topContracts: Array<{
    contractId: string;
    invocations: number;
    lastActivity: string;
  }>;
}

interface GasUsage {
  currentFee: number;
  avgFee: number;
  p50Fee: number;
  p95Fee: number;
  p99Fee: number;
}

interface EventData {
  totalEvents: number;
  recentEvents: Array<{
    contractId: string;
    type: string;
    ledger: number;
    timestamp: string;
    txHash: string;
  }>;
}

// Helper functions
function truncateAddress(address: string): string {
  if (!address || address.length < 12) return address || '';
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

// Fetch functions
async function fetchSorobanOperations(limit: number = 200): Promise<HorizonOperation[]> {
  try {
    const res = await fetchWithFallback(
      `/operations?order=desc&limit=${limit}&include_failed=false`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) {
      console.error('Failed to fetch operations from Horizon');
      return [];
    }
    const data = await res.json();
    const records = data._embedded?.records || [];
    // Filter for invoke_host_function operations (type 24)
    return records.filter((op: HorizonOperation) => op.type === 'invoke_host_function' || op.type_i === 24);
  } catch (error) {
    console.error('Error fetching Soroban operations:', error);
    return [];
  }
}

async function fetchFeeStats(): Promise<SorobanFeeStats | null> {
  try {
    return await sorobanRpc<SorobanFeeStats>('getFeeStats');
  } catch (error) {
    console.error('Error fetching fee stats:', error);
    return null;
  }
}

async function fetchLatestLedger(): Promise<SorobanLatestLedger | null> {
  try {
    return await sorobanRpc<SorobanLatestLedger>('getLatestLedger');
  } catch (error) {
    console.error('Error fetching latest ledger:', error);
    return null;
  }
}

async function fetchEvents(startLedger: number, limit: number = 100): Promise<SorobanEventsResponse | null> {
  try {
    return await sorobanRpc<SorobanEventsResponse>('getEvents', {
      startLedger,
      pagination: { limit },
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return null;
  }
}

// Calculate contract activity
function calculateActivity(operations: HorizonOperation[]): ContractActivity {
  if (operations.length === 0) {
    return {
      totalInvocations24h: 0,
      successRate: 100,
      hourlyActivity: [],
      topContracts: [],
    };
  }

  // Calculate success rate
  const successful = operations.filter((op) => op.transaction_successful).length;
  const successRate = operations.length > 0 ? (successful / operations.length) * 100 : 100;

  // Calculate time span for extrapolation
  const firstOp = new Date(operations[operations.length - 1].created_at).getTime();
  const lastOp = new Date(operations[0].created_at).getTime();
  const sampleTimeSpan = (lastOp - firstOp) / 1000;
  const scaleFactor = sampleTimeSpan > 0 ? (24 * 3600) / sampleTimeSpan : 1;

  // Estimate 24h totals
  const estimated24hInvocations = Math.round(operations.length * scaleFactor);

  // Group by hour for chart
  const hourlyData = new Map<string, number>();
  for (const op of operations) {
    const date = new Date(op.created_at);
    date.setMinutes(0, 0, 0);
    const hourKey = date.toISOString();
    hourlyData.set(hourKey, (hourlyData.get(hourKey) || 0) + 1);
  }

  const hourlyActivity = Array.from(hourlyData.entries())
    .map(([timestamp, invocations]) => ({ timestamp, invocations }))
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  // Group by source account (as proxy for contract - Horizon doesn't expose contract ID directly)
  const contractCalls = new Map<string, { count: number; lastActivity: string }>();
  for (const op of operations) {
    const key = op.source_account;
    const existing = contractCalls.get(key);
    if (!existing || new Date(op.created_at) > new Date(existing.lastActivity)) {
      contractCalls.set(key, {
        count: (existing?.count || 0) + 1,
        lastActivity: op.created_at,
      });
    } else {
      contractCalls.set(key, {
        count: existing.count + 1,
        lastActivity: existing.lastActivity,
      });
    }
  }

  const topContracts = Array.from(contractCalls.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10)
    .map(([contractId, data]) => ({
      contractId: truncateAddress(contractId),
      invocations: Math.round(data.count * scaleFactor),
      lastActivity: formatTimeAgo(data.lastActivity),
    }));

  return {
    totalInvocations24h: estimated24hInvocations,
    successRate: Math.round(successRate * 10) / 10,
    hourlyActivity,
    topContracts,
  };
}

// Calculate gas usage from fee stats
function calculateGasUsage(feeStats: SorobanFeeStats | null): GasUsage {
  if (!feeStats || !feeStats.sorobanInclusionFee) {
    return {
      currentFee: 0,
      avgFee: 0,
      p50Fee: 0,
      p95Fee: 0,
      p99Fee: 0,
    };
  }

  const sorobanFees = feeStats.sorobanInclusionFee;

  return {
    currentFee: parseInt(sorobanFees.mode) || 0,
    avgFee: parseInt(sorobanFees.p50) || 0,
    p50Fee: parseInt(sorobanFees.p50) || 0,
    p95Fee: parseInt(sorobanFees.p95) || 0,
    p99Fee: parseInt(sorobanFees.p99) || 0,
  };
}

// Calculate event data
function calculateEvents(eventsResponse: SorobanEventsResponse | null): EventData {
  if (!eventsResponse || !eventsResponse.events) {
    return {
      totalEvents: 0,
      recentEvents: [],
    };
  }

  const events = eventsResponse.events;

  const recentEvents = events.slice(0, 20).map((event) => ({
    contractId: truncateAddress(event.contractId || ''),
    type: event.type || 'unknown',
    ledger: event.ledger,
    timestamp: event.ledgerClosedAt ? formatTimeAgo(event.ledgerClosedAt) : 'unknown',
    txHash: truncateAddress(event.txHash || ''),
  }));

  return {
    totalEvents: events.length,
    recentEvents,
  };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const range = searchParams.get('range') || '24h';

    // Determine sample size based on range
    const limitMap: Record<string, number> = {
      '24h': 200,
      '7d': 200,
      '30d': 200,
    };
    const limit = limitMap[range] || 200;

    // Fetch all data in parallel with caching
    const [activity, gasUsage, eventData] = await Promise.all([
      getCachedOrFetch(`analytics:contracts:activity:${range}`, ACTIVITY_CACHE_TTL, async () => {
        const operations = await fetchSorobanOperations(limit);
        return calculateActivity(operations);
      }),
      getCachedOrFetch(`analytics:contracts:gas:${range}`, FEE_CACHE_TTL, async () => {
        const feeStats = await fetchFeeStats();
        return calculateGasUsage(feeStats);
      }),
      getCachedOrFetch(`analytics:contracts:events:${range}`, EVENTS_CACHE_TTL, async () => {
        const latestLedger = await fetchLatestLedger();
        if (!latestLedger) {
          return { totalEvents: 0, recentEvents: [] };
        }
        // Fetch events from last ~1000 ledgers (~1.4 hours of activity)
        const startLedger = Math.max(1, latestLedger.sequence - 1000);
        const eventsResponse = await fetchEvents(startLedger, 100);
        return calculateEvents(eventsResponse);
      }),
    ]);

    return NextResponse.json({
      activity,
      gasUsage,
      events: eventData,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Contract Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contract analytics' },
      { status: 500 }
    );
  }
}
