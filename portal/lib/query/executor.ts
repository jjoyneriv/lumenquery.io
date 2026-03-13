// Query executor - runs parsed queries against Horizon API

import { ParsedQuery, QueryResult, HorizonPayment, HorizonTransaction, HorizonAsset, HorizonLedger, HorizonAccount } from './types';

const HORIZON_URL = 'https://horizon.stellar.org';

async function fetchHorizon(endpoint: string): Promise<unknown> {
  const response = await fetch(`${HORIZON_URL}${endpoint}`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Horizon API error: ${response.status}`);
  }
  return response.json();
}

// Format account ID for display
function formatAccountId(id: string): string {
  if (!id || id.length < 12) return id;
  return `${id.substring(0, 4)}...${id.substring(id.length - 4)}`;
}

// Format amount with commas
function formatAmount(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

// Format timestamp
function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleString();
}

export async function executeQuery(parsed: ParsedQuery): Promise<QueryResult> {
  const startTime = Date.now();

  try {
    switch (parsed.type) {
      case 'top_holders':
        return await executeTopHolders(parsed, startTime);
      case 'account_info':
        return await executeAccountInfo(parsed, startTime);
      case 'recent_payments':
        return await executeRecentPayments(parsed, startTime);
      case 'large_payments':
        return await executeLargePayments(parsed, startTime);
      case 'recent_transactions':
        return await executeRecentTransactions(parsed, startTime);
      case 'assets':
        return await executeAssets(parsed, startTime);
      case 'account_transactions':
        return await executeAccountTransactions(parsed, startTime);
      case 'ledger_info':
        return await executeLedgerInfo(parsed, startTime);
      case 'operations':
        return await executeOperations(parsed, startTime);
      case 'unknown':
        return {
          success: false,
          error: "I couldn't understand that query. Try one of the examples below.",
          suggestion: 'Try: "Show the top 10 XLM holders" or "Recent payments"',
        };
      default:
        return {
          success: false,
          error: 'Query type not implemented',
        };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred executing the query',
      executionTimeMs: Date.now() - startTime,
    };
  }
}

async function executeTopHolders(parsed: ParsedQuery, startTime: number): Promise<QueryResult> {
  // Horizon doesn't support sorting by balance, so we fetch known large accounts
  // In a production system, you'd have a pre-indexed database of account balances

  // Fetch recent transactions to find active large accounts
  const response = await fetchHorizon('/payments?order=desc&limit=200') as { _embedded: { records: HorizonPayment[] } };
  const payments = response._embedded?.records || [];

  // Aggregate received amounts by account
  const accountTotals: Map<string, number> = new Map();

  for (const payment of payments) {
    if (payment.asset_type === 'native' && payment.to && payment.amount) {
      const current = accountTotals.get(payment.to) || 0;
      accountTotals.set(payment.to, current + parseFloat(payment.amount));
    }
  }

  // Sort by total received and take top N
  const limit = parsed.params.limit as number || 10;
  const sorted = Array.from(accountTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);

  // Fetch actual balances for these accounts
  const results: Record<string, unknown>[] = [];
  for (const [accountId, receivedAmount] of sorted) {
    try {
      const account = await fetchHorizon(`/accounts/${accountId}`) as HorizonAccount;
      const nativeBalance = account.balances?.find((b: { asset_type: string }) => b.asset_type === 'native');
      results.push({
        account_id: formatAccountId(accountId),
        full_account_id: accountId,
        balance_xlm: formatAmount(nativeBalance?.balance || '0'),
        recent_received: formatAmount(receivedAmount),
        last_active: formatTime(account.last_modified_time),
      });
    } catch {
      // Account might not exist or be inaccessible
      continue;
    }
  }

  return {
    success: true,
    data: results,
    columns: ['account_id', 'balance_xlm', 'recent_received', 'last_active'],
    sql: parsed.sql,
    executionTimeMs: Date.now() - startTime,
    totalCount: results.length,
  };
}

async function executeAccountInfo(parsed: ParsedQuery, startTime: number): Promise<QueryResult> {
  const accountId = parsed.params.accountId as string;
  const account = await fetchHorizon(`/accounts/${accountId}`) as HorizonAccount;

  const balances = account.balances?.map((b: { asset_type: string; balance: string; asset_code?: string; asset_issuer?: string }) => ({
    asset: b.asset_type === 'native' ? 'XLM' : `${b.asset_code}`,
    asset_type: b.asset_type,
    balance: formatAmount(b.balance),
    issuer: b.asset_issuer ? formatAccountId(b.asset_issuer) : '-',
  })) || [];

  return {
    success: true,
    data: balances,
    columns: ['asset', 'balance', 'asset_type', 'issuer'],
    sql: parsed.sql,
    executionTimeMs: Date.now() - startTime,
    totalCount: balances.length,
  };
}

async function executeRecentPayments(parsed: ParsedQuery, startTime: number): Promise<QueryResult> {
  const limit = Math.min(parsed.params.limit as number || 20, 100);
  const response = await fetchHorizon(`/payments?order=desc&limit=${limit}`) as { _embedded: { records: HorizonPayment[] } };
  const payments = response._embedded?.records || [];

  const results = payments
    .filter((p: HorizonPayment) => p.type === 'payment' || p.type === 'create_account')
    .map((p: HorizonPayment) => ({
      type: p.type,
      from: formatAccountId(p.from || p.source_account),
      full_from: p.from || p.source_account,
      to: formatAccountId(p.to || ''),
      full_to: p.to || '',
      amount: formatAmount(p.amount || '0'),
      asset: p.asset_type === 'native' ? 'XLM' : (p.asset_code || p.asset_type),
      time: formatTime(p.created_at),
      tx_hash: p.transaction_hash.substring(0, 8) + '...',
    }));

  return {
    success: true,
    data: results,
    columns: ['type', 'from', 'to', 'amount', 'asset', 'time'],
    sql: parsed.sql,
    executionTimeMs: Date.now() - startTime,
    totalCount: results.length,
  };
}

async function executeLargePayments(parsed: ParsedQuery, startTime: number): Promise<QueryResult> {
  const minAmount = parsed.params.minAmount as number || 1000000;
  const limit = parsed.params.limit as number || 20;

  // Fetch more payments and filter by amount
  const response = await fetchHorizon(`/payments?order=desc&limit=200`) as { _embedded: { records: HorizonPayment[] } };
  const payments = response._embedded?.records || [];

  const results = payments
    .filter((p: HorizonPayment) => {
      if (p.type !== 'payment' && p.type !== 'create_account') return false;
      if (p.asset_type !== 'native') return false;
      const amount = parseFloat(p.amount || '0');
      return amount >= minAmount;
    })
    .slice(0, limit)
    .map((p: HorizonPayment) => ({
      from: formatAccountId(p.from || p.source_account),
      full_from: p.from || p.source_account,
      to: formatAccountId(p.to || ''),
      full_to: p.to || '',
      amount_xlm: formatAmount(p.amount || '0'),
      time: formatTime(p.created_at),
      tx_hash: p.transaction_hash.substring(0, 8) + '...',
      full_tx: p.transaction_hash,
    }));

  if (results.length === 0) {
    return {
      success: true,
      data: [],
      columns: ['from', 'to', 'amount_xlm', 'time'],
      sql: parsed.sql,
      executionTimeMs: Date.now() - startTime,
      totalCount: 0,
      suggestion: `No payments found larger than ${formatAmount(minAmount)} XLM in recent history. Try a smaller amount.`,
    };
  }

  return {
    success: true,
    data: results,
    columns: ['from', 'to', 'amount_xlm', 'time'],
    sql: parsed.sql,
    executionTimeMs: Date.now() - startTime,
    totalCount: results.length,
  };
}

async function executeRecentTransactions(parsed: ParsedQuery, startTime: number): Promise<QueryResult> {
  const limit = Math.min(parsed.params.limit as number || 20, 100);
  const response = await fetchHorizon(`/transactions?order=desc&limit=${limit}`) as { _embedded: { records: HorizonTransaction[] } };
  const transactions = response._embedded?.records || [];

  const results = transactions.map((t: HorizonTransaction) => ({
    hash: t.hash.substring(0, 12) + '...',
    full_hash: t.hash,
    source: formatAccountId(t.source_account),
    full_source: t.source_account,
    operations: t.operation_count,
    fee: (parseInt(t.fee_charged) / 10000000).toFixed(5) + ' XLM',
    status: t.successful ? 'Success' : 'Failed',
    time: formatTime(t.created_at),
    ledger: t.ledger,
  }));

  return {
    success: true,
    data: results,
    columns: ['hash', 'source', 'operations', 'fee', 'status', 'time', 'ledger'],
    sql: parsed.sql,
    executionTimeMs: Date.now() - startTime,
    totalCount: results.length,
  };
}

async function executeAssets(parsed: ParsedQuery, startTime: number): Promise<QueryResult> {
  const limit = Math.min(parsed.params.limit as number || 20, 100);
  const response = await fetchHorizon(`/assets?order=desc&limit=${limit}`) as { _embedded: { records: HorizonAsset[] } };
  const assets = response._embedded?.records || [];

  const results = assets.map((a: HorizonAsset) => ({
    code: a.asset_code || 'Unknown',
    issuer: formatAccountId(a.asset_issuer || ''),
    full_issuer: a.asset_issuer || '',
    total_supply: formatAmount(a.amount || '0'),
    holders: a.num_accounts != null ? Number(a.num_accounts).toLocaleString() : '0',
    auth_required: a.flags?.auth_required ? 'Yes' : 'No',
    clawback: a.flags?.auth_clawback_enabled ? 'Yes' : 'No',
  }));

  return {
    success: true,
    data: results,
    columns: ['code', 'issuer', 'total_supply', 'holders', 'auth_required', 'clawback'],
    sql: parsed.sql,
    executionTimeMs: Date.now() - startTime,
    totalCount: results.length,
  };
}

async function executeAccountTransactions(parsed: ParsedQuery, startTime: number): Promise<QueryResult> {
  const accountId = parsed.params.accountId as string;
  const limit = Math.min(parsed.params.limit as number || 20, 100);

  const response = await fetchHorizon(`/accounts/${accountId}/transactions?order=desc&limit=${limit}`) as { _embedded: { records: HorizonTransaction[] } };
  const transactions = response._embedded?.records || [];

  const results = transactions.map((t: HorizonTransaction) => ({
    hash: t.hash.substring(0, 12) + '...',
    full_hash: t.hash,
    operations: t.operation_count,
    fee: (parseInt(t.fee_charged) / 10000000).toFixed(5) + ' XLM',
    status: t.successful ? 'Success' : 'Failed',
    time: formatTime(t.created_at),
    memo: t.memo || '-',
  }));

  return {
    success: true,
    data: results,
    columns: ['hash', 'operations', 'fee', 'status', 'time', 'memo'],
    sql: parsed.sql,
    executionTimeMs: Date.now() - startTime,
    totalCount: results.length,
  };
}

async function executeLedgerInfo(parsed: ParsedQuery, startTime: number): Promise<QueryResult> {
  const response = await fetchHorizon('/ledgers?order=desc&limit=1') as { _embedded: { records: HorizonLedger[] } };
  const ledger = response._embedded?.records?.[0];

  if (!ledger) {
    return {
      success: false,
      error: 'Could not fetch ledger information',
    };
  }

  const results = [{
    sequence: ledger.sequence.toLocaleString(),
    hash: ledger.hash.substring(0, 16) + '...',
    closed_at: formatTime(ledger.closed_at),
    transactions: ledger.transaction_count,
    operations: ledger.operation_count,
    successful_tx: ledger.successful_transaction_count,
    failed_tx: ledger.failed_transaction_count,
    base_fee: ledger.base_fee_in_stroops + ' stroops',
    total_xlm: formatAmount(ledger.total_coins) + ' XLM',
  }];

  return {
    success: true,
    data: results,
    columns: ['sequence', 'hash', 'closed_at', 'transactions', 'operations', 'base_fee', 'total_xlm'],
    sql: parsed.sql,
    executionTimeMs: Date.now() - startTime,
    totalCount: 1,
  };
}

async function executeOperations(parsed: ParsedQuery, startTime: number): Promise<QueryResult> {
  const limit = Math.min(parsed.params.limit as number || 20, 100);
  const response = await fetchHorizon(`/operations?order=desc&limit=${limit}`) as { _embedded: { records: Array<{
    id: string;
    type: string;
    source_account: string;
    created_at: string;
    transaction_hash: string;
  }> } };
  const operations = response._embedded?.records || [];

  const results = operations.map((o) => ({
    id: o.id,
    type: o.type.replace(/_/g, ' '),
    source: formatAccountId(o.source_account),
    full_source: o.source_account,
    time: formatTime(o.created_at),
    tx_hash: o.transaction_hash.substring(0, 8) + '...',
  }));

  return {
    success: true,
    data: results,
    columns: ['type', 'source', 'time', 'tx_hash'],
    sql: parsed.sql,
    executionTimeMs: Date.now() - startTime,
    totalCount: results.length,
  };
}
