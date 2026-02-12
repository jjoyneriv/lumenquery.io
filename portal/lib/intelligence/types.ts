// ===========================================
// Transaction Intelligence - TypeScript Types
// ===========================================

// Intelligence tier configuration
export interface IntelligenceTierConfig {
  concurrentStreams: number;      // Max SSE connections
  watchlistAccounts: number;      // Max accounts to watch
  alertConfigurations: number;    // Max alert rules
  alertRetentionDays: number;     // How long to keep alerts
  whaleThreshold: number;         // XLM amount for whale alerts
  historicalDataDays: number;     // Days of historical access
  apiRateLimit: number;           // Requests per minute
  webhookEnabled: boolean;        // Webhook notifications
  anomalyDetectionEnabled: boolean; // Anomaly detection feature
}

export const INTELLIGENCE_TIER_CONFIGS: Record<string, IntelligenceTierConfig> = {
  NONE: {
    concurrentStreams: 0,
    watchlistAccounts: 0,
    alertConfigurations: 0,
    alertRetentionDays: 0,
    whaleThreshold: 0,
    historicalDataDays: 0,
    apiRateLimit: 0,
    webhookEnabled: false,
    anomalyDetectionEnabled: false,
  },
  SOLO: {
    concurrentStreams: 2,
    watchlistAccounts: 50,
    alertConfigurations: 10,
    alertRetentionDays: 30,
    whaleThreshold: 100000,        // 100K XLM
    historicalDataDays: 30,
    apiRateLimit: 120,
    webhookEnabled: false,
    anomalyDetectionEnabled: false,
  },
  TEAMS: {
    concurrentStreams: 10,
    watchlistAccounts: 500,
    alertConfigurations: 50,
    alertRetentionDays: 90,
    whaleThreshold: 50000,         // 50K XLM
    historicalDataDays: 90,
    apiRateLimit: 300,
    webhookEnabled: true,
    anomalyDetectionEnabled: true,
  },
  ENTERPRISE: {
    concurrentStreams: -1,         // Unlimited
    watchlistAccounts: -1,
    alertConfigurations: -1,
    alertRetentionDays: 365,
    whaleThreshold: 10000,         // 10K XLM
    historicalDataDays: 365,
    apiRateLimit: -1,
    webhookEnabled: true,
    anomalyDetectionEnabled: true,
  },
};

// Feature access result
export interface FeatureAccessResult {
  allowed: boolean;
  reason?: string;
  limit?: number;
  used?: number;
}

// Intelligence features
export type IntelligenceFeature =
  | 'stream'
  | 'accountProfile'
  | 'watchlist'
  | 'alerts'
  | 'webhooks'
  | 'anomalyDetection'
  | 'export'
  | 'api';

// Transaction stream types
export interface StreamTransaction {
  id: string;
  hash: string;
  ledger: number;
  createdAt: string;
  sourceAccount: string;
  type: TransactionType;
  successful: boolean;
  operations: StreamOperation[];
}

export type TransactionType =
  | 'payment'
  | 'create_account'
  | 'path_payment_strict_send'
  | 'path_payment_strict_receive'
  | 'manage_sell_offer'
  | 'manage_buy_offer'
  | 'create_passive_sell_offer'
  | 'change_trust'
  | 'set_options'
  | 'account_merge'
  | 'inflation'
  | 'manage_data'
  | 'bump_sequence'
  | 'create_claimable_balance'
  | 'claim_claimable_balance'
  | 'invoke_host_function'
  | 'extend_footprint_ttl'
  | 'restore_footprint'
  | 'other';

export interface StreamOperation {
  id: string;
  type: string;
  typeI: number;
  sourceAccount: string;
  // Payment specific
  from?: string;
  to?: string;
  amount?: string;
  assetType?: string;
  assetCode?: string;
  assetIssuer?: string;
  // Trustline specific
  trustor?: string;
  trustee?: string;
  limit?: string;
  // Offer specific
  offerId?: string;
  buying?: AssetInfo;
  selling?: AssetInfo;
  price?: string;
}

export interface AssetInfo {
  type: string;
  code?: string;
  issuer?: string;
}

// Account profile types
export interface AccountBehavior {
  velocityScore: number;      // 0-100, transaction frequency
  volumeScore: number;        // 0-100, average transaction size
  diversityScore: number;     // 0-100, counterparty diversity
  regularityScore: number;    // 0-100, pattern consistency
}

export interface CounterpartyInfo {
  accountId: string;
  label?: string;
  transactionCount: number;
  totalVolume: number;
  lastTransaction: string;
}

export interface TrustlineInfo {
  assetCode: string;
  assetIssuer: string;
  balance: string;
  limit: string;
  createdAt?: string;
}

// Alert types
export interface WhaleAlertConditions {
  minAmount: number;
  assetCode?: string;
  assetIssuer?: string;
  accounts?: string[];       // Specific accounts to watch
}

export interface TrustlineAlertConditions {
  eventType: 'created' | 'removed' | 'both';
  assetCode?: string;
  assetIssuer?: string;
  accounts?: string[];
}

export interface AccountActivityConditions {
  watchlistId: string;
  minAmount?: number;
  operationTypes?: string[];
}

export interface ContractCallConditions {
  contractId: string;
  functionName?: string;
  minGas?: number;
}

export interface AnomalyConditions {
  sensitivity: 'low' | 'medium' | 'high';
  accounts?: string[];
}

// Stream filter types
export type StreamFilterType =
  | 'all'
  | 'payments'
  | 'offers'
  | 'path_payments'
  | 'trustlines'
  | 'account'
  | 'asset'
  | 'whale'
  | 'contracts';

// SSE event types
export interface StreamEvent {
  type: 'connected' | 'transaction' | 'heartbeat' | 'error' | 'rate_limit';
  data?: StreamTransaction | string;
  timestamp: string;
}
