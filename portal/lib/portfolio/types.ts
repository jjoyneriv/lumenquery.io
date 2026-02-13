// ===========================================
// Portfolio + Yield Intelligence Types
// ===========================================

export interface Portfolio {
  id: string;
  name: string;
  description?: string;
  currency: string;
  totalValueUsd: number;
  totalValueXlm: number;
  totalPnlUsd: number;
  totalPnlPercent: number;
  lastSyncedAt?: Date;
  accounts: PortfolioAccountSummary[];
}

export interface PortfolioAccountSummary {
  id: string;
  accountId: string;
  label?: string;
  xlmBalance: number;
  totalValueUsd: number;
}

export interface PortfolioAccount {
  id: string;
  accountId: string;
  label?: string;
  addedAt: Date;
  sequence?: bigint;
  lastActivity?: Date;
  numSubentries: number;
  xlmBalance: number;
  totalValueUsd: number;
  positions: AssetPosition[];
  contractPositions: ContractPosition[];
}

export interface AssetPosition {
  id: string;
  assetCode: string;
  assetIssuer?: string;
  assetType: AssetType;
  balance: number;
  limit?: number;
  avgCostBasis: number;
  totalCostUsd: number;
  currentPrice: number;
  currentValueUsd: number;
  unrealizedPnl: number;
  realizedPnl: number;
  pnlPercent: number;
  riskLevel: RiskLevel;
  issuerTrustScore?: number;
  liquidityScore?: number;
  firstAcquired?: Date;
}

export type AssetType = 'NATIVE' | 'CREDIT_ALPHANUM4' | 'CREDIT_ALPHANUM12' | 'LIQUIDITY_POOL_SHARES';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface TradeRecord {
  id: string;
  txHash: string;
  ledger: number;
  timestamp: Date;
  tradeType: TradeType;
  baseAssetCode: string;
  baseAssetIssuer?: string;
  baseAmount: number;
  counterAssetCode: string;
  counterAssetIssuer?: string;
  counterAmount: number;
  price: number;
  priceUsd?: number;
  feeXlm: number;
  feeUsd: number;
  realizedPnlUsd: number;
  costBasisUsed: number;
  source: string;
}

export type TradeType = 'BUY' | 'SELL' | 'SWAP' | 'LIQUIDITY_ADD' | 'LIQUIDITY_REMOVE';

export interface ContractPosition {
  id: string;
  contractId: string;
  contractName?: string;
  positionType: PositionType;
  depositedAmount: number;
  depositedAsset: string;
  currentValue: number;
  currentValueUsd: number;
  shareBalance?: number;
  rewardsEarned: number;
  rewardsAsset?: string;
  status: PositionStatus;
  lockedUntil?: Date;
  apy?: number;
  enteredAt: Date;
  exitedAt?: Date;
}

export type PositionType = 'STAKING' | 'LIQUIDITY_POOL' | 'LENDING' | 'BORROWING' | 'VAULT' | 'OTHER';

export type PositionStatus = 'ACTIVE' | 'LOCKED' | 'WITHDRAWING' | 'CLOSED';

export interface YieldSource {
  id: string;
  name: string;
  sourceType: YieldSourceType;
  contractId?: string;
  assetCode: string;
  assetIssuer?: string;
  currentApy: number;
  compoundingFreq?: string;
  minDeposit?: number;
  isActive: boolean;
  riskLevel: RiskLevel;
}

export type YieldSourceType = 'STAKING_NATIVE' | 'STAKING_CONTRACT' | 'LIQUIDITY_POOL' | 'LENDING' | 'REWARDS' | 'OTHER';

export interface YieldReward {
  id: string;
  timestamp: Date;
  txHash?: string;
  rewardAsset: string;
  rewardIssuer?: string;
  amount: number;
  valueUsd?: number;
  epochNumber?: number;
  periodStart?: Date;
  periodEnd?: Date;
  sourceName?: string;
}

export interface PerformanceSnapshot {
  id: string;
  timestamp: Date;
  snapshotType: SnapshotType;
  totalValueUsd: number;
  totalValueXlm: number;
  totalPnlUsd: number;
  totalPnlPercent: number;
  periodChangeUsd: number;
  periodChangePercent: number;
  assetAllocation: Record<string, number>;
  topPositions: TopPosition[];
  yieldEarnedPeriod: number;
  totalYieldEarned: number;
  diversificationScore?: number;
  avgTrustlineRisk?: number;
}

export type SnapshotType = 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface TopPosition {
  assetCode: string;
  assetIssuer?: string;
  valueUsd: number;
  percentage: number;
}

export interface TrustlineRisk {
  id: string;
  accountId: string;
  assetCode: string;
  assetIssuer: string;
  issuerName?: string;
  issuerDomain?: string;
  issuerVerified: boolean;
  riskScore: number;
  riskFactors: RiskFactor[];
  totalSupply?: number;
  holderCount?: number;
  tradingVolume24h?: number;
  priceVolatility?: number;
  authRequired: boolean;
  authRevocable: boolean;
  authImmutable: boolean;
  authClawback: boolean;
}

export interface RiskFactor {
  type: string;
  severity: RiskLevel;
  description: string;
  weight: number;
}

// Portfolio tier configuration
export interface PortfolioTierConfig {
  tier: PortfolioTier;
  maxAccounts: number;
  maxPortfolios: number;
  yieldTracking: boolean;
  pnlTracking: boolean;
  contractPositions: boolean;
  snapshotRetentionDays: number;
  pricePerMonth: number;
}

export type PortfolioTier = 'NONE' | 'FREE' | 'PRO' | 'DAO';

export const PORTFOLIO_TIERS: Record<PortfolioTier, PortfolioTierConfig> = {
  NONE: {
    tier: 'NONE',
    maxAccounts: 0,
    maxPortfolios: 0,
    yieldTracking: false,
    pnlTracking: false,
    contractPositions: false,
    snapshotRetentionDays: 0,
    pricePerMonth: 0,
  },
  FREE: {
    tier: 'FREE',
    maxAccounts: 1,
    maxPortfolios: 1,
    yieldTracking: false,
    pnlTracking: false,
    contractPositions: false,
    snapshotRetentionDays: 7,
    pricePerMonth: 0,
  },
  PRO: {
    tier: 'PRO',
    maxAccounts: 10,
    maxPortfolios: 5,
    yieldTracking: true,
    pnlTracking: true,
    contractPositions: true,
    snapshotRetentionDays: 90,
    pricePerMonth: 10,
  },
  DAO: {
    tier: 'DAO',
    maxAccounts: 1000, // Effectively unlimited
    maxPortfolios: 100,
    yieldTracking: true,
    pnlTracking: true,
    contractPositions: true,
    snapshotRetentionDays: 365,
    pricePerMonth: 50,
  },
};

// API response types
export interface PortfolioSummary {
  id: string;
  name: string;
  accountCount: number;
  totalValueUsd: number;
  totalPnlUsd: number;
  totalPnlPercent: number;
  topAssets: { code: string; valueUsd: number; percentage: number }[];
  performance24h: number;
  performance7d: number;
  performance30d: number;
}

export interface PnLSummary {
  totalUnrealizedPnl: number;
  totalRealizedPnl: number;
  totalPnl: number;
  pnlPercent: number;
  byAsset: AssetPnL[];
  byPeriod: PeriodPnL[];
}

export interface AssetPnL {
  assetCode: string;
  assetIssuer?: string;
  unrealizedPnl: number;
  realizedPnl: number;
  totalPnl: number;
  pnlPercent: number;
  currentValue: number;
  costBasis: number;
}

export interface PeriodPnL {
  period: string; // "24h", "7d", "30d", "YTD", "ALL"
  pnlUsd: number;
  pnlPercent: number;
  startValue: number;
  endValue: number;
}

export interface YieldSummary {
  totalYieldEarned: number;
  yieldLast24h: number;
  yieldLast7d: number;
  yieldLast30d: number;
  avgApy: number;
  activeSources: number;
  bySource: SourceYield[];
  recentRewards: YieldReward[];
}

export interface SourceYield {
  sourceId: string;
  sourceName: string;
  sourceType: YieldSourceType;
  totalEarned: number;
  currentApy: number;
  assetCode: string;
}

export interface TrustlineRiskSummary {
  averageRiskScore: number;
  highRiskCount: number;
  criticalRiskCount: number;
  byTrustline: TrustlineRisk[];
}
