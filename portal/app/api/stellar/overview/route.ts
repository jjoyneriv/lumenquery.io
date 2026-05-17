import { NextResponse } from 'next/server';
import Redis from 'ioredis';

const HORIZON_URL = 'https://horizon.stellar.org';
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const CACHE_TTL = 30; // 30 seconds

let redisClient: Redis | null = null;

function getRedis(): Redis {
  if (!redisClient) {
    redisClient = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });
    redisClient.on('error', (err) => console.error('Redis error:', err));
  }
  return redisClient;
}

async function cached<T>(key: string, ttl: number, fn: () => Promise<T>): Promise<T> {
  try {
    const redis = getRedis();
    const hit = await redis.get(key);
    if (hit) return JSON.parse(hit);
    const data = await fn();
    await redis.setex(key, ttl, JSON.stringify(data));
    return data;
  } catch {
    return fn();
  }
}

// ─── Horizon Data Fetchers ─────────────────────────────────────────

async function fetchJSON(url: string) {
  const res = await fetch(url, { next: { revalidate: 30 } });
  if (!res.ok) throw new Error(`Failed: ${url} (${res.status})`);
  return res.json();
}

async function getNetworkStats() {
  const [root, ledgers, feeStats] = await Promise.all([
    fetchJSON(HORIZON_URL),
    fetchJSON(`${HORIZON_URL}/ledgers?order=desc&limit=20`),
    fetchJSON(`${HORIZON_URL}/fee_stats`),
  ]);

  const records = ledgers._embedded?.records || [];
  const latest = records[0];

  // TPS calculation
  let totalTxs = 0;
  let totalTime = 0;
  for (let i = 0; i < Math.min(records.length - 1, 10); i++) {
    const txCount = records[i].successful_transaction_count + records[i].failed_transaction_count;
    totalTxs += txCount;
    const t1 = new Date(records[i].closed_at).getTime();
    const t2 = new Date(records[i + 1].closed_at).getTime();
    totalTime += (t1 - t2) / 1000;
  }
  const tps = totalTime > 0 ? totalTxs / totalTime : 0;

  // OPS calculation
  const totalOps = records.slice(0, 10).reduce((s: number, l: any) => s + l.operation_count, 0);
  const ops = totalTime > 0 ? totalOps / totalTime : 0;

  // Success rate
  const successTxs = records.reduce((s: number, l: any) => s + l.successful_transaction_count, 0);
  const allTxs = records.reduce((s: number, l: any) => s + l.successful_transaction_count + l.failed_transaction_count, 0);
  const successRate = allTxs > 0 ? (successTxs / allTxs) * 100 : 100;

  // Avg close time
  let closeTimeSum = 0;
  let closeTimeN = 0;
  for (let i = 0; i < Math.min(records.length - 1, 10); i++) {
    const t1 = new Date(records[i].closed_at).getTime();
    const t2 = new Date(records[i + 1].closed_at).getTime();
    closeTimeSum += (t1 - t2) / 1000;
    closeTimeN++;
  }

  // Estimated 24h txs
  const sampleSpan = records.length > 1
    ? (new Date(records[0].closed_at).getTime() - new Date(records[records.length - 1].closed_at).getTime()) / 1000
    : 1;
  const scale24h = (24 * 3600) / sampleSpan;

  return {
    ledgerSequence: latest?.sequence || 0,
    closedAt: latest?.closed_at || '',
    protocolVersion: root.current_protocol_version,
    coreVersion: root.core_version,
    totalCoins: Math.round(parseFloat(latest?.total_coins || '0')),
    tps: Math.round(tps * 100) / 100,
    ops: Math.round(ops * 100) / 100,
    successRate: Math.round(successRate * 10) / 10,
    avgCloseTime: closeTimeN > 0 ? Math.round((closeTimeSum / closeTimeN) * 10) / 10 : 5,
    baseFee: parseInt(feeStats.last_ledger_base_fee) || 100,
    feeP95: parseInt(feeStats.fee_charged?.p95) || 200,
    estimated24hTxs: Math.round(allTxs * scale24h),
    estimated24hOps: Math.round(totalOps * scale24h),
    baseReserve: (latest?.base_reserve_in_stroops || 5000000) / 10000000,
  };
}

async function getTopAssets() {
  // Fetch popular assets from Horizon
  const data = await fetchJSON(`${HORIZON_URL}/assets?order=desc&limit=50`);
  const records = data._embedded?.records || [];

  // Known important Stellar assets (issuers verified against Horizon by highest num_accounts)
  const knownAssets = [
    { code: 'USDC', issuer: 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN', type: 'Stablecoin' },
    { code: 'AQUA', issuer: 'GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA', type: 'DeFi' },
    { code: 'SHX', issuer: 'GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH', type: 'Utility' },
    { code: 'yXLM', issuer: 'GARDNV3Q7YGT4AKSDF25LT32YSCCW4EV22Y2TV3I2PU2MMXJTEDL5T55', type: 'Yield' },
    { code: 'EURC', issuer: 'GDHU6WRG4IEQXM5NZ4BMPKOXHW76MZM4Y2IEMFDVXBSDP6SJY4ITNPP2', type: 'Stablecoin' },
    { code: 'RIO', issuer: 'GBNLJIYH34UWO5YZFA3A3HD3N76R6DOI33N4JONUOHEEYZYCAYTEJ5AK', type: 'RWA' },
    { code: 'BTC', issuer: 'GAUTUYY2THLF7SGITDFMXJVYH3LHDSMGEAKSBU267M2K7A3W543CKUEF', type: 'Wrapped' },
    { code: 'ETH', issuer: 'GBFXOHVAS43OIWNIO7XLRJAHT3BICFEIKOJLZVXNT572MISM4CMGSOCC', type: 'Wrapped' },
    { code: 'NUNA', issuer: 'GCX2ENOVSSOOH6G4HIOBMPCBFXHDVDGA546NK3ZFX3NP3QS25BKZBWOW', type: 'Utility' },
    { code: 'VELO', issuer: 'GBKKYBY4H2H3XXWWRV75Z6DJHSCBGYDTTCVBHFVY2UWAZQTASZ4WXX5W', type: 'DeFi' },
  ];

  // Fetch account counts for known assets
  const assetData = await Promise.allSettled(
    knownAssets.map(async (a) => {
      try {
        const res = await fetch(
          `${HORIZON_URL}/assets?asset_code=${a.code}&asset_issuer=${a.issuer}&limit=1`,
          { next: { revalidate: 120 } }
        );
        if (!res.ok) return { ...a, accounts: 0, amount: '0' };
        const d = await res.json();
        const rec = d._embedded?.records?.[0];
        const accounts = rec?.num_accounts || rec?.accounts?.authorized || 0;
        const amount = rec?.balances?.authorized || rec?.amount || '0';
        return {
          code: a.code,
          issuer: a.issuer,
          type: a.type,
          accounts,
          amount,
          flags: rec?.flags || {},
        };
      } catch {
        return { ...a, accounts: 0, amount: '0' };
      }
    })
  );

  const issuedAssets = assetData
    .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
    .map((r) => r.value)
    .sort((a: any, b: any) => (parseInt(b.accounts) || 0) - (parseInt(a.accounts) || 0));

  // Fetch XLM native stats from Horizon + Stellar Expert (for total account count)
  let xlmEntry;
  try {
    const [statsRes, expertRes] = await Promise.all([
      fetchJSON(`${HORIZON_URL}/ledgers?order=desc&limit=1`),
      fetch('https://api.stellar.expert/explorer/public/ledger/ledger-stats?limit=1&order=desc', {
        next: { revalidate: 300 },
      }).then(r => r.ok ? r.json() : null).catch(() => null),
    ]);
    const latestLedger = statsRes._embedded?.records?.[0];
    const totalCoins = latestLedger?.total_coins || '0';
    const totalAccounts = Array.isArray(expertRes) && expertRes.length > 0
      ? expertRes[expertRes.length - 1].accounts
      : 0;
    xlmEntry = {
      code: 'XLM',
      issuer: 'native',
      type: 'Native',
      accounts: totalAccounts,
      amount: totalCoins,
      flags: {},
      isNative: true,
    };
  } catch {
    xlmEntry = {
      code: 'XLM',
      issuer: 'native',
      type: 'Native',
      accounts: 0,
      amount: '0',
      flags: {},
      isNative: true,
    };
  }

  return [xlmEntry, ...issuedAssets];
}

async function getRecentTransactions() {
  const data = await fetchJSON(`${HORIZON_URL}/transactions?order=desc&limit=10&include_failed=false`);
  const records = data._embedded?.records || [];

  return Promise.all(
    records.map(async (tx: any) => {
      // Fetch operations for this transaction
      let operations: any[] = [];
      try {
        const opsRes = await fetch(`${HORIZON_URL}/transactions/${tx.hash}/operations?limit=3`, {
          next: { revalidate: 30 },
        });
        if (opsRes.ok) {
          const opsData = await opsRes.json();
          operations = (opsData._embedded?.records || []).map((op: any) => ({
            type: op.type,
            amount: op.amount,
            asset_code: op.asset_code || 'XLM',
            asset_type: op.asset_type,
            from: op.from || op.source_account,
            to: op.to || op.account,
          }));
        }
      } catch {
        // skip
      }

      return {
        hash: tx.hash,
        ledger: tx.ledger,
        createdAt: tx.created_at,
        sourceAccount: tx.source_account,
        operationCount: tx.operation_count,
        feeCharged: parseInt(tx.fee_charged) || 100,
        successful: tx.successful,
        memoType: tx.memo_type,
        memo: tx.memo,
        operations,
      };
    })
  );
}

async function getXLMPrice() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true',
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.stellar) return null;
    return {
      price: data.stellar.usd,
      marketCap: data.stellar.usd_market_cap,
      volume24h: data.stellar.usd_24h_vol,
      change24h: data.stellar.usd_24h_change,
    };
  } catch {
    return null;
  }
}

async function getRecentLedgers() {
  const data = await fetchJSON(`${HORIZON_URL}/ledgers?order=desc&limit=10`);
  const records = data._embedded?.records || [];
  return records.map((l: any) => ({
    sequence: l.sequence,
    closedAt: l.closed_at,
    txCount: l.successful_transaction_count + l.failed_transaction_count,
    successfulTxCount: l.successful_transaction_count,
    failedTxCount: l.failed_transaction_count,
    operationCount: l.operation_count,
    baseFee: l.base_fee_in_stroops,
  }));
}

// ─── Route Handler ──────────────────────────────────────────────────

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const data = await cached('stellar:overview:v1', CACHE_TTL, async () => {
      const [network, assets, transactions, price, ledgers] = await Promise.all([
        getNetworkStats(),
        getTopAssets(),
        getRecentTransactions(),
        getXLMPrice(),
        getRecentLedgers(),
      ]);

      return {
        network,
        assets,
        transactions,
        price,
        ledgers,
        updatedAt: new Date().toISOString(),
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Stellar overview API error:', error);
    return NextResponse.json({ error: 'Failed to fetch Stellar overview' }, { status: 500 });
  }
}
