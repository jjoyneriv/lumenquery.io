// ===========================================
// Soroban Pro - TypeScript Interfaces
// ===========================================

// Soroban RPC Response Types
export interface SorobanRpcResponse<T> {
  jsonrpc: '2.0';
  id: number;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

// Soroban Event from getEvents
export interface SorobanEvent {
  type: 'system' | 'contract' | 'diagnostic';
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

export interface GetEventsResult {
  events: SorobanEvent[];
  latestLedger: number;
}

// Soroban Transaction from getTransaction
export interface SorobanTransaction {
  status: 'SUCCESS' | 'NOT_FOUND' | 'FAILED';
  latestLedger: number;
  latestLedgerCloseTime: string;
  oldestLedger: number;
  oldestLedgerCloseTime: string;
  applicationOrder?: number;
  feeBump?: boolean;
  envelopeXdr?: string;
  resultXdr?: string;
  resultMetaXdr?: string;
  ledger?: number;
  createdAt?: string;
}

// Ledger Entry from getLedgerEntries
export interface LedgerEntry {
  key: string;
  xdr: string;
  lastModifiedLedgerSeq: number;
  liveUntilLedgerSeq?: number;
}

export interface GetLedgerEntriesResult {
  entries: LedgerEntry[];
  latestLedger: number;
}

// Simulate Transaction Result
export interface SimulateTransactionResult {
  transactionData?: string;
  minResourceFee?: string;
  events?: string[];
  results?: Array<{
    auth?: string[];
    xdr: string;
  }>;
  cost?: {
    cpuInsns: string;
    memBytes: string;
  };
  latestLedger: number;
  error?: string;
}

// Decoded Contract Call for display
export interface ContractCallDecoded {
  id: string;
  contractId: string;
  txHash: string;
  ledger: number;
  timestamp: Date;
  functionName: string;
  inputs: DecodedValue[];
  outputs: DecodedValue[] | null;
  status: 'success' | 'failed';
  errorCode: string | null;
  gasUsed: bigint | null;
  aiExplanation: string | null;
}

// Decoded Soroban value
export interface DecodedValue {
  type: string;
  value: unknown;
  raw?: string;
}

// Storage entry for display
export interface StorageEntry {
  key: DecodedValue;
  value: DecodedValue;
  ledger: number;
  timestamp: Date;
}

// Contract metadata
export interface ContractMetadata {
  id: string;
  contractId: string;
  wasmHash: string | null;
  name: string | null;
  version: string | null;
  sourceUrl: string | null;
  createdLedger: number;
  lastSeenLedger: number;
  totalCalls: number;
  createdAt: Date;
}

// Contract analytics
export interface ContractAnalytics {
  gasUsage: {
    total24h: bigint;
    avgPerCall: number;
    trend: 'up' | 'down' | 'stable';
    history: Array<{
      timestamp: string;
      avgGas: number;
      callCount: number;
    }>;
  };
  errorAnalysis: {
    successRate: number;
    failedCalls24h: number;
    errorBreakdown: Array<{
      code: string;
      count: number;
      description: string;
    }>;
  };
  callVolume: {
    total24h: number;
    total7d: number;
    total30d: number;
    history: Array<{
      timestamp: string;
      calls: number;
    }>;
  };
}

// Soroban SCVal types for decoding
export type SCValType =
  | 'bool'
  | 'void'
  | 'error'
  | 'u32'
  | 'i32'
  | 'u64'
  | 'i64'
  | 'timepoint'
  | 'duration'
  | 'u128'
  | 'i128'
  | 'u256'
  | 'i256'
  | 'bytes'
  | 'string'
  | 'symbol'
  | 'vec'
  | 'map'
  | 'address'
  | 'contractInstance'
  | 'ledgerKeyContractInstance'
  | 'ledgerKeyNonce';

// Feature access result
export interface FeatureAccessResult {
  allowed: boolean;
  reason?: string;
  limit?: number;
  used?: number;
}

// Tier configuration
export interface TierConfig {
  contractsMonthlyLimit: number;
  callHistoryDays: number;
  aiExplanationsMonthly: number;
  exportEnabled: boolean;
  realtimeStreamEnabled: boolean;
  versionComparisonEnabled: boolean;
  apiAccessEnabled: boolean;
}

export const TIER_CONFIGS: Record<string, TierConfig> = {
  FREE: {
    contractsMonthlyLimit: 10,
    callHistoryDays: 7,
    aiExplanationsMonthly: 0,
    exportEnabled: false,
    realtimeStreamEnabled: false,
    versionComparisonEnabled: false,
    apiAccessEnabled: false,
  },
  DEVELOPER: {
    contractsMonthlyLimit: 50,
    callHistoryDays: 30,
    aiExplanationsMonthly: 50,
    exportEnabled: true,
    realtimeStreamEnabled: false,
    versionComparisonEnabled: true,
    apiAccessEnabled: true,
  },
  TEAM: {
    contractsMonthlyLimit: -1, // unlimited
    callHistoryDays: 90,
    aiExplanationsMonthly: 500,
    exportEnabled: true,
    realtimeStreamEnabled: true,
    versionComparisonEnabled: true,
    apiAccessEnabled: true,
  },
  AUDITOR: {
    contractsMonthlyLimit: -1,
    callHistoryDays: -1, // full history
    aiExplanationsMonthly: -1,
    exportEnabled: true,
    realtimeStreamEnabled: true,
    versionComparisonEnabled: true,
    apiAccessEnabled: true,
  },
  ENTERPRISE: {
    contractsMonthlyLimit: -1,
    callHistoryDays: -1,
    aiExplanationsMonthly: -1,
    exportEnabled: true,
    realtimeStreamEnabled: true,
    versionComparisonEnabled: true,
    apiAccessEnabled: true,
  },
};
