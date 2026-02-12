import type {
  ComplianceTier,
  ComplianceRuleType,
  ViolationStatus,
  MonitoringLevel,
  AlertSeverity,
} from '@prisma/client';

// Re-export Prisma enums for convenience
export type {
  ComplianceTier,
  ComplianceRuleType,
  ViolationStatus,
  MonitoringLevel,
  AlertSeverity,
};

// ===========================================
// Rule Conditions
// ===========================================

export interface VelocityConditions {
  maxTransactionsPerHour?: number;
  maxTransactionsPerDay?: number;
  maxTransactionsPerWeek?: number;
  windowMinutes?: number;
}

export interface VolumeConditions {
  maxAmountPerTransaction?: number;
  maxAmountPerHour?: number;
  maxAmountPerDay?: number;
  assetCode?: string; // XLM, USDC, etc.
}

export interface CircularPaymentConditions {
  minHops?: number; // Default 2
  maxHops?: number; // Default 5
  timeWindowMinutes?: number; // Default 60
  minAmount?: number; // Minimum amount to track
}

export interface MixerConditions {
  detectPeelChains?: boolean;
  detectEqualSplits?: boolean;
  detectTimeDelayed?: boolean;
  splitRatioTolerance?: number; // e.g., 0.1 for 10%
  knownMixerAddresses?: string[];
}

export interface SanctionsConditions {
  sources?: string[]; // OFAC, SDN, EU, UN
  checkCounterparties?: boolean;
  checkMultiHop?: boolean; // Check if funds came from sanctioned via intermediaries
}

export interface CounterpartyConditions {
  minRiskScore?: number;
  blacklistedTypes?: string[]; // EXCHANGE, MIXER, etc.
  maxExposure?: number; // Max transaction volume with high-risk counterparties
}

export interface ContractAbuseConditions {
  maxGasPerCall?: number;
  maxFailureRate?: number; // Percentage
  maxCallsPerHour?: number;
  monitoredContracts?: string[];
}

export interface StructuringConditions {
  reportingThreshold?: number; // e.g., 10000 USD equivalent
  windowHours?: number;
  minTransactionCount?: number;
  amountBelowThresholdPercent?: number; // Transactions just below threshold
}

export interface PatternConditions {
  anomalyThreshold?: number; // Standard deviations from normal
  baselineDays?: number; // Days to calculate baseline
  metrics?: ('velocity' | 'volume' | 'timing' | 'counterparties')[];
}

export type RuleConditions =
  | VelocityConditions
  | VolumeConditions
  | CircularPaymentConditions
  | MixerConditions
  | SanctionsConditions
  | CounterpartyConditions
  | ContractAbuseConditions
  | StructuringConditions
  | PatternConditions;

// ===========================================
// Violation & Evidence
// ===========================================

export interface ViolationMatchDetails {
  ruleType: ComplianceRuleType;
  matchedConditions: string[];
  values: Record<string, unknown>;
  timestamp: string;
}

export interface ViolationEvidence {
  transactions?: {
    hash: string;
    timestamp: string;
    amount: string;
    assetCode: string;
    from: string;
    to: string;
  }[];
  accounts?: {
    accountId: string;
    riskScore?: number;
    matchType?: string;
  }[];
  sanctions?: {
    source: string;
    listType: string;
    matchedEntity?: string;
  };
  cycle?: {
    path: string[];
    totalValue: string;
    timeSpan: number;
  };
  pattern?: {
    metric: string;
    baseline: number;
    actual: number;
    deviation: number;
  };
}

// ===========================================
// Risk Assessment
// ===========================================

export interface RiskFactor {
  factor: string;
  weight: number;
  value: number;
  contribution: number; // weight * value
  details?: string;
}

export interface RiskAssessment {
  accountId: string;
  assessedAt: string;
  totalScore: number;
  factors: RiskFactor[];
  recommendation: 'NORMAL' | 'ENHANCED' | 'RESTRICTED';
}

// ===========================================
// Reports
// ===========================================

export interface ReportSummary {
  totalViolations: number;
  violationsByType: Record<ComplianceRuleType, number>;
  violationsBySeverity: Record<AlertSeverity, number>;
  violationsByStatus: Record<ViolationStatus, number>;
  accountsWithViolations: number;
  newAccountsMonitored: number;
  riskScoreDistribution: {
    low: number; // 0-30
    medium: number; // 31-60
    high: number; // 61-100
  };
}

export interface ReportViolation {
  id: string;
  createdAt: string;
  severity: AlertSeverity;
  status: ViolationStatus;
  ruleType: ComplianceRuleType;
  accountId: string;
  transactionHash?: string;
  matchDetails: ViolationMatchDetails;
  resolution?: string;
}

export interface ReportAccount {
  accountId: string;
  label?: string;
  riskScore: number;
  violationCount: number;
  totalVolume30d: string;
  monitoringLevel: MonitoringLevel;
}

export interface ReportMetrics {
  period: {
    start: string;
    end: string;
  };
  transactionsScanned: number;
  accountsScanned: number;
  rulesEvaluated: number;
  avgProcessingTimeMs: number;
  sanctionsChecks: number;
  cyclesDetected: number;
}

export interface ComplianceReportData {
  reportType: string;
  title: string;
  period: string;
  generatedAt: string;
  summary: ReportSummary;
  violations: ReportViolation[];
  accounts: ReportAccount[];
  metrics: ReportMetrics;
}

// ===========================================
// Notifications
// ===========================================

export type NotificationChannel = 'EMAIL' | 'SLACK' | 'WEBHOOK';

export interface NotificationPayload {
  channel: NotificationChannel;
  recipient: string;
  subject?: string;
  body: string;
  metadata?: Record<string, unknown>;
}

export interface ViolationAlertPayload {
  violationId: string;
  severity: AlertSeverity;
  ruleType: ComplianceRuleType;
  accountId: string;
  summary: string;
  timestamp: string;
  dashboardUrl: string;
}

// ===========================================
// Background Jobs
// ===========================================

export type JobType =
  | 'SANCTIONS_SYNC'
  | 'ACCOUNT_SCAN'
  | 'CYCLE_DETECTION'
  | 'REPORT_GENERATION'
  | 'NOTIFICATION_DELIVERY'
  | 'RISK_ASSESSMENT';

export type JobStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';

export interface JobPayload {
  SANCTIONS_SYNC: {
    sources: string[];
    fullSync?: boolean;
  };
  ACCOUNT_SCAN: {
    organizationId: string;
    accountIds?: string[];
    scanAll?: boolean;
  };
  CYCLE_DETECTION: {
    organizationId: string;
    startAccount?: string;
    maxHops?: number;
  };
  REPORT_GENERATION: {
    organizationId: string;
    reportType: string;
    periodStart: string;
    periodEnd: string;
    format: 'json' | 'csv' | 'pdf';
  };
  NOTIFICATION_DELIVERY: {
    channel: NotificationChannel;
    recipient: string;
    templateId: string;
    data: Record<string, unknown>;
  };
  RISK_ASSESSMENT: {
    organizationId: string;
    accountIds?: string[];
    forceReassess?: boolean;
  };
}

// ===========================================
// API Responses
// ===========================================

export interface ComplianceStatusResponse {
  enabled: boolean;
  tier: ComplianceTier;
  limits: {
    monitoredAccounts: { current: number; max: number };
    rules: { current: number; max: number };
  };
  metrics: {
    activeViolations: number;
    pendingReview: number;
    accountsAtRisk: number;
    lastScanAt?: string;
  };
  features: {
    sanctions: boolean;
    cycleDetection: boolean;
    reports: boolean;
    webhooks: boolean;
    slackIntegration: boolean;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ===========================================
// Audit Log
// ===========================================

export type AuditAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'REVIEW'
  | 'ESCALATE'
  | 'CLEAR'
  | 'CONFIRM'
  | 'REPORT'
  | 'EXPORT';

export type AuditActorType = 'USER' | 'SYSTEM' | 'WORKER' | 'API';

export interface AuditLogData {
  action: AuditAction;
  entityType: string;
  entityId: string;
  actorType: AuditActorType;
  actorId?: string;
  actorEmail?: string;
  previousState?: unknown;
  newState?: unknown;
  metadata?: Record<string, unknown>;
}
