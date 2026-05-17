// ===========================================
// Transaction Intelligence - Horizon Client
// ===========================================

import { StreamTransaction, StreamOperation, TransactionType } from './types';

// Always use public Horizon - local stellar-horizon is on a different Docker network
const HORIZON_URL = 'https://horizon.stellar.org';

// Horizon API response types
interface HorizonTransaction {
  id: string;
  hash: string;
  ledger: number;
  created_at: string;
  source_account: string;
  successful: boolean;
  operation_count: number;
  fee_charged: string;
  memo_type: string;
  memo?: string;
  _links?: {
    operations: { href: string };
  };
}

interface HorizonOperation {
  id: string;
  type: string;
  type_i: number;
  source_account: string;
  created_at: string;
  transaction_hash: string;
  transaction_successful: boolean;
  // Payment fields
  from?: string;
  to?: string;
  amount?: string;
  asset_type?: string;
  asset_code?: string;
  asset_issuer?: string;
  // Trustline fields
  trustor?: string;
  trustee?: string;
  limit?: string;
  // Offer fields
  offer_id?: string;
  buying_asset_type?: string;
  buying_asset_code?: string;
  buying_asset_issuer?: string;
  selling_asset_type?: string;
  selling_asset_code?: string;
  selling_asset_issuer?: string;
  price?: string;
}

interface HorizonEffect {
  id: string;
  type: string;
  type_i: number;
  account: string;
  created_at: string;
  // Trustline effects
  asset_type?: string;
  asset_code?: string;
  asset_issuer?: string;
  limit?: string;
}

interface HorizonAccount {
  id: string;
  account_id: string;
  sequence: string;
  balances: Array<{
    balance: string;
    asset_type: string;
    asset_code?: string;
    asset_issuer?: string;
    limit?: string;
  }>;
  last_modified_ledger: number;
  last_modified_time: string;
  thresholds: {
    low_threshold: number;
    med_threshold: number;
    high_threshold: number;
  };
  signers: Array<{
    key: string;
    weight: number;
  }>;
  data: Record<string, string>;
}

// Fetch recent transactions
export async function fetchTransactions(
  limit: number = 100,
  cursor?: string
): Promise<{ transactions: HorizonTransaction[]; nextCursor?: string }> {
  let url = `${HORIZON_URL}/transactions?order=desc&limit=${limit}`;
  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch transactions');

  const data = await res.json();
  const transactions = data._embedded?.records || [];
  const nextCursor = transactions.length > 0 ? transactions[transactions.length - 1].paging_token : undefined;

  return { transactions, nextCursor };
}

// Fetch operations for filtering
export async function fetchOperations(
  limit: number = 200,
  cursor?: string,
  includeFailed: boolean = false
): Promise<{ operations: HorizonOperation[]; nextCursor?: string }> {
  let url = `${HORIZON_URL}/operations?order=desc&limit=${limit}&include_failed=${includeFailed}`;
  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch operations');

  const data = await res.json();
  const operations = data._embedded?.records || [];
  const nextCursor = operations.length > 0 ? operations[operations.length - 1].paging_token : undefined;

  return { operations, nextCursor };
}

// Fetch payments specifically
export async function fetchPayments(
  limit: number = 200,
  cursor?: string
): Promise<{ payments: HorizonOperation[]; nextCursor?: string }> {
  let url = `${HORIZON_URL}/payments?order=desc&limit=${limit}&include_failed=false`;
  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch payments');

  const data = await res.json();
  const payments = data._embedded?.records || [];
  const nextCursor = payments.length > 0 ? payments[payments.length - 1].paging_token : undefined;

  return { payments, nextCursor };
}

// Fetch effects for trustline changes
export async function fetchEffects(
  limit: number = 200,
  cursor?: string
): Promise<{ effects: HorizonEffect[]; nextCursor?: string }> {
  let url = `${HORIZON_URL}/effects?order=desc&limit=${limit}`;
  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch effects');

  const data = await res.json();
  const effects = data._embedded?.records || [];
  const nextCursor = effects.length > 0 ? effects[effects.length - 1].paging_token : undefined;

  return { effects, nextCursor };
}

// Fetch account details
export async function fetchAccount(accountId: string): Promise<HorizonAccount | null> {
  try {
    const res = await fetch(`${HORIZON_URL}/accounts/${accountId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch account');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching account:', error);
    return null;
  }
}

// Fetch account operations
export async function fetchAccountOperations(
  accountId: string,
  limit: number = 100,
  cursor?: string
): Promise<{ operations: HorizonOperation[]; nextCursor?: string }> {
  let url = `${HORIZON_URL}/accounts/${accountId}/operations?order=desc&limit=${limit}`;
  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch account operations');

  const data = await res.json();
  const operations = data._embedded?.records || [];
  const nextCursor = operations.length > 0 ? operations[operations.length - 1].paging_token : undefined;

  return { operations, nextCursor };
}

// Fetch account effects
export async function fetchAccountEffects(
  accountId: string,
  limit: number = 100,
  cursor?: string
): Promise<{ effects: HorizonEffect[]; nextCursor?: string }> {
  let url = `${HORIZON_URL}/accounts/${accountId}/effects?order=desc&limit=${limit}`;
  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch account effects');

  const data = await res.json();
  const effects = data._embedded?.records || [];
  const nextCursor = effects.length > 0 ? effects[effects.length - 1].paging_token : undefined;

  return { effects, nextCursor };
}

// Transform Horizon operation to StreamOperation
export function transformOperation(op: HorizonOperation): StreamOperation {
  return {
    id: op.id,
    type: op.type,
    typeI: op.type_i,
    sourceAccount: op.source_account,
    from: op.from,
    to: op.to,
    amount: op.amount,
    assetType: op.asset_type,
    assetCode: op.asset_code,
    assetIssuer: op.asset_issuer,
    trustor: op.trustor,
    trustee: op.trustee,
    limit: op.limit,
    offerId: op.offer_id,
    buying: op.buying_asset_type
      ? {
          type: op.buying_asset_type,
          code: op.buying_asset_code,
          issuer: op.buying_asset_issuer,
        }
      : undefined,
    selling: op.selling_asset_type
      ? {
          type: op.selling_asset_type,
          code: op.selling_asset_code,
          issuer: op.selling_asset_issuer,
        }
      : undefined,
    price: op.price,
  };
}

// Map operation type to TransactionType
export function mapOperationType(type: string): TransactionType {
  const typeMap: Record<string, TransactionType> = {
    payment: 'payment',
    create_account: 'create_account',
    path_payment_strict_send: 'path_payment_strict_send',
    path_payment_strict_receive: 'path_payment_strict_receive',
    manage_sell_offer: 'manage_sell_offer',
    manage_buy_offer: 'manage_buy_offer',
    create_passive_sell_offer: 'create_passive_sell_offer',
    change_trust: 'change_trust',
    set_options: 'set_options',
    account_merge: 'account_merge',
    inflation: 'inflation',
    manage_data: 'manage_data',
    bump_sequence: 'bump_sequence',
    create_claimable_balance: 'create_claimable_balance',
    claim_claimable_balance: 'claim_claimable_balance',
    invoke_host_function: 'invoke_host_function',
    extend_footprint_ttl: 'extend_footprint_ttl',
    restore_footprint: 'restore_footprint',
  };

  return typeMap[type] || 'other';
}

// Filter whale movements (large XLM transfers)
export function filterWhaleMovements(
  operations: HorizonOperation[],
  threshold: number
): HorizonOperation[] {
  return operations.filter((op) => {
    if (op.type !== 'payment' && op.type !== 'create_account') return false;
    if (op.asset_type !== 'native') return false;
    const amount = parseFloat(op.amount || '0');
    return amount >= threshold;
  });
}

// Filter trustline changes
export function filterTrustlineChanges(effects: HorizonEffect[]): HorizonEffect[] {
  return effects.filter(
    (e) =>
      e.type === 'trustline_created' ||
      e.type === 'trustline_removed' ||
      e.type === 'trustline_updated'
  );
}

// Truncate address for display
export function truncateAddress(address: string): string {
  if (!address || address.length < 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

// Format XLM amount
export function formatXLM(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M XLM`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(2)}K XLM`;
  }
  return `${num.toFixed(2)} XLM`;
}
