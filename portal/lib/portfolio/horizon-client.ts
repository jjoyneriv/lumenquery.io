// ===========================================
// Horizon API Client for Portfolio Data
// ===========================================

const HORIZON_URL = process.env.HORIZON_URL || 'http://stellar-horizon:8000';

export interface HorizonAccount {
  id: string;
  account_id: string;
  sequence: string;
  subentry_count: number;
  last_modified_ledger: number;
  last_modified_time: string;
  thresholds: {
    low_threshold: number;
    med_threshold: number;
    high_threshold: number;
  };
  balances: HorizonBalance[];
  signers: HorizonSigner[];
  data: Record<string, string>;
  flags: {
    auth_required: boolean;
    auth_revocable: boolean;
    auth_immutable: boolean;
    auth_clawback_enabled: boolean;
  };
}

export interface HorizonBalance {
  balance: string;
  limit?: string;
  buying_liabilities?: string;
  selling_liabilities?: string;
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  liquidity_pool_id?: string;
  is_authorized?: boolean;
  is_authorized_to_maintain_liabilities?: boolean;
  last_modified_ledger?: number;
}

export interface HorizonSigner {
  weight: number;
  key: string;
  type: string;
}

export interface HorizonTrade {
  id: string;
  paging_token: string;
  ledger_close_time: string;
  offer_id?: string;
  base_offer_id?: string;
  counter_offer_id?: string;
  base_account: string;
  base_amount: string;
  base_asset_type: string;
  base_asset_code?: string;
  base_asset_issuer?: string;
  counter_account: string;
  counter_amount: string;
  counter_asset_type: string;
  counter_asset_code?: string;
  counter_asset_issuer?: string;
  base_is_seller: boolean;
  price: {
    n: number;
    d: number;
  };
}

export interface HorizonTransaction {
  id: string;
  paging_token: string;
  successful: boolean;
  hash: string;
  ledger: number;
  created_at: string;
  source_account: string;
  fee_charged: string;
  max_fee: string;
  operation_count: number;
  memo_type: string;
  memo?: string;
}

export interface HorizonOperation {
  id: string;
  paging_token: string;
  transaction_successful: boolean;
  source_account: string;
  type: string;
  type_i: number;
  created_at: string;
  transaction_hash: string;
  // Type-specific fields
  [key: string]: unknown;
}

export interface HorizonAsset {
  asset_type: string;
  asset_code: string;
  asset_issuer: string;
  paging_token: string;
  amount: string;
  num_accounts: number;
  flags: {
    auth_required: boolean;
    auth_revocable: boolean;
    auth_immutable: boolean;
    auth_clawback_enabled: boolean;
  };
}

/**
 * Fetch account details from Horizon
 */
export async function getAccount(accountId: string): Promise<HorizonAccount | null> {
  try {
    const response = await fetch(`${HORIZON_URL}/accounts/${accountId}`, {
      headers: { 'Accept': 'application/json' },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Horizon error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch account:', error);
    throw error;
  }
}

/**
 * Fetch account trades from Horizon
 */
export async function getAccountTrades(
  accountId: string,
  options: { limit?: number; cursor?: string; order?: 'asc' | 'desc' } = {}
): Promise<{ trades: HorizonTrade[]; nextCursor?: string }> {
  const { limit = 100, cursor, order = 'desc' } = options;

  const params = new URLSearchParams({
    limit: String(limit),
    order,
  });
  if (cursor) params.set('cursor', cursor);

  try {
    const response = await fetch(
      `${HORIZON_URL}/accounts/${accountId}/trades?${params}`,
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) {
      throw new Error(`Horizon error: ${response.status}`);
    }

    const data = await response.json();
    const trades = data._embedded?.records || [];
    const nextLink = data._links?.next?.href;
    const nextCursor = nextLink ? new URL(nextLink).searchParams.get('cursor') || undefined : undefined;

    return { trades, nextCursor };
  } catch (error) {
    console.error('Failed to fetch trades:', error);
    throw error;
  }
}

/**
 * Fetch account operations from Horizon
 */
export async function getAccountOperations(
  accountId: string,
  options: { limit?: number; cursor?: string; order?: 'asc' | 'desc' } = {}
): Promise<{ operations: HorizonOperation[]; nextCursor?: string }> {
  const { limit = 100, cursor, order = 'desc' } = options;

  const params = new URLSearchParams({
    limit: String(limit),
    order,
  });
  if (cursor) params.set('cursor', cursor);

  try {
    const response = await fetch(
      `${HORIZON_URL}/accounts/${accountId}/operations?${params}`,
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) {
      throw new Error(`Horizon error: ${response.status}`);
    }

    const data = await response.json();
    const operations = data._embedded?.records || [];
    const nextLink = data._links?.next?.href;
    const nextCursor = nextLink ? new URL(nextLink).searchParams.get('cursor') || undefined : undefined;

    return { operations, nextCursor };
  } catch (error) {
    console.error('Failed to fetch operations:', error);
    throw error;
  }
}

/**
 * Fetch asset details from Horizon
 */
export async function getAsset(assetCode: string, assetIssuer: string): Promise<HorizonAsset | null> {
  try {
    const params = new URLSearchParams({
      asset_code: assetCode,
      asset_issuer: assetIssuer,
      limit: '1',
    });

    const response = await fetch(
      `${HORIZON_URL}/assets?${params}`,
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) {
      throw new Error(`Horizon error: ${response.status}`);
    }

    const data = await response.json();
    const assets = data._embedded?.records || [];
    return assets[0] || null;
  } catch (error) {
    console.error('Failed to fetch asset:', error);
    return null;
  }
}

/**
 * Get XLM price from trade aggregations
 */
export async function getXlmPrice(counterAsset: { code: string; issuer: string } = { code: 'USDC', issuer: 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN' }): Promise<number> {
  try {
    const baseAsset = 'native';
    const counterAssetStr = `${counterAsset.code}:${counterAsset.issuer}`;

    const params = new URLSearchParams({
      base_asset_type: 'native',
      counter_asset_type: 'credit_alphanum4',
      counter_asset_code: counterAsset.code,
      counter_asset_issuer: counterAsset.issuer,
      resolution: '3600000', // 1 hour
      limit: '1',
      order: 'desc',
    });

    const response = await fetch(
      `${HORIZON_URL}/trade_aggregations?${params}`,
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) {
      // Fall back to a default price if aggregation fails
      return 0.10; // Default XLM price estimate
    }

    const data = await response.json();
    const records = data._embedded?.records || [];

    if (records.length === 0) {
      return 0.10;
    }

    // Close price from the most recent aggregation
    const closePrice = parseFloat(records[0].close);
    return closePrice || 0.10;
  } catch (error) {
    console.error('Failed to fetch XLM price:', error);
    return 0.10;
  }
}

/**
 * Get asset price in XLM
 */
export async function getAssetPriceInXlm(assetCode: string, assetIssuer: string): Promise<number> {
  try {
    const params = new URLSearchParams({
      base_asset_type: assetCode.length <= 4 ? 'credit_alphanum4' : 'credit_alphanum12',
      base_asset_code: assetCode,
      base_asset_issuer: assetIssuer,
      counter_asset_type: 'native',
      resolution: '3600000', // 1 hour
      limit: '1',
      order: 'desc',
    });

    const response = await fetch(
      `${HORIZON_URL}/trade_aggregations?${params}`,
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) {
      return 0;
    }

    const data = await response.json();
    const records = data._embedded?.records || [];

    if (records.length === 0) {
      return 0;
    }

    return parseFloat(records[0].close) || 0;
  } catch (error) {
    console.error('Failed to fetch asset price:', error);
    return 0;
  }
}

/**
 * Check if an account exists on the network
 */
export async function accountExists(accountId: string): Promise<boolean> {
  try {
    const response = await fetch(`${HORIZON_URL}/accounts/${accountId}`, {
      method: 'HEAD',
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Validate Stellar account ID format
 */
export function isValidStellarAddress(address: string): boolean {
  // G... addresses are 56 characters
  if (!address || address.length !== 56) return false;
  if (!address.startsWith('G')) return false;

  // Basic character validation (base32 alphabet)
  const base32Regex = /^G[A-Z2-7]{55}$/;
  return base32Regex.test(address);
}
