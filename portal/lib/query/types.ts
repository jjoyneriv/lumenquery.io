// Query types and interfaces

export type QueryType =
  | 'top_holders'
  | 'account_info'
  | 'recent_payments'
  | 'large_payments'
  | 'recent_transactions'
  | 'assets'
  | 'account_transactions'
  | 'ledger_info'
  | 'operations'
  | 'unknown';

export interface ParsedQuery {
  type: QueryType;
  params: Record<string, string | number | boolean>;
  description: string;
  sql?: string;
}

export interface QueryResult {
  success: boolean;
  data?: Record<string, unknown>[];
  columns?: string[];
  sql?: string;
  executionTimeMs?: number;
  error?: string;
  suggestion?: string;
  totalCount?: number;
}

export interface HorizonAccount {
  id: string;
  account_id: string;
  sequence: string;
  balances: Array<{
    balance: string;
    asset_type: string;
    asset_code?: string;
    asset_issuer?: string;
  }>;
  last_modified_ledger: number;
  last_modified_time: string;
}

export interface HorizonPayment {
  id: string;
  type: string;
  created_at: string;
  transaction_hash: string;
  source_account: string;
  from?: string;
  to?: string;
  amount?: string;
  asset_type?: string;
  asset_code?: string;
  asset_issuer?: string;
}

export interface HorizonTransaction {
  id: string;
  hash: string;
  ledger: number;
  created_at: string;
  source_account: string;
  fee_charged: string;
  operation_count: number;
  successful: boolean;
  memo_type: string;
  memo?: string;
}

export interface HorizonAsset {
  asset_type: string;
  asset_code: string;
  asset_issuer: string;
  amount: string;
  num_accounts: number;
  flags: {
    auth_required: boolean;
    auth_revocable: boolean;
    auth_immutable: boolean;
    auth_clawback_enabled: boolean;
  };
}

export interface HorizonLedger {
  id: string;
  sequence: number;
  hash: string;
  closed_at: string;
  transaction_count: number;
  operation_count: number;
  successful_transaction_count: number;
  failed_transaction_count: number;
  base_fee_in_stroops: number;
  total_coins: string;
}
