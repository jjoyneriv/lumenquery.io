import type { ComplianceTier } from '@prisma/client';

export interface ComplianceTierConfig {
  name: string;
  price: string;
  priceMonthly: number;
  description: string;
  monitoredAccounts: number; // -1 for unlimited
  rules: number; // -1 for unlimited
  sanctions: boolean;
  cycleDetection: boolean;
  reports: boolean;
  webhooks: boolean;
  slackIntegration: boolean;
  auditRetention: number; // days, -1 for unlimited
  features: string[];
}

export const COMPLIANCE_TIER_CONFIGS: Record<ComplianceTier, ComplianceTierConfig> = {
  NONE: {
    name: 'None',
    price: '$0',
    priceMonthly: 0,
    description: 'Compliance features not enabled',
    monitoredAccounts: 0,
    rules: 0,
    sanctions: false,
    cycleDetection: false,
    reports: false,
    webhooks: false,
    slackIntegration: false,
    auditRetention: 0,
    features: [],
  },
  BASIC: {
    name: 'Basic',
    price: '$49',
    priceMonthly: 49,
    description: 'For small teams starting with compliance',
    monitoredAccounts: 100, // $0.49/account
    rules: 10,
    sanctions: false,
    cycleDetection: false,
    reports: true, // Monthly only
    webhooks: false,
    slackIntegration: false,
    auditRetention: 90,
    features: [
      '100 monitored accounts',
      '10 custom rules',
      'Velocity & volume monitoring',
      'Monthly compliance reports',
      'Email notifications',
      '90-day audit retention',
    ],
  },
  STANDARD: {
    name: 'Standard',
    price: '$149',
    priceMonthly: 149,
    description: 'For growing compliance teams',
    monitoredAccounts: 500, // $0.30/account
    rules: 50,
    sanctions: true,
    cycleDetection: true,
    reports: true, // All reports
    webhooks: true,
    slackIntegration: false,
    auditRetention: 365,
    features: [
      '500 monitored accounts',
      '50 custom rules',
      'OFAC/SDN sanctions screening',
      'Circular payment detection',
      'Mixer pattern detection',
      'All compliance reports',
      'Email + webhook notifications',
      '1-year audit retention',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 'Custom',
    priceMonthly: -1, // Custom pricing
    description: 'For large organizations with advanced needs',
    monitoredAccounts: -1, // Unlimited
    rules: -1, // Unlimited
    sanctions: true,
    cycleDetection: true,
    reports: true,
    webhooks: true,
    slackIntegration: true,
    auditRetention: -1, // Unlimited
    features: [
      'Unlimited monitored accounts',
      'Unlimited custom rules',
      'Full sanctions screening',
      'Advanced cycle detection',
      'Contract abuse monitoring',
      'Anomaly detection',
      'All report formats (PDF/CSV)',
      'Slack integration',
      'Webhook notifications',
      'Unlimited audit retention',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantees',
    ],
  },
};

export type ComplianceFeature =
  | 'sanctions'
  | 'cycleDetection'
  | 'reports'
  | 'webhooks'
  | 'slackIntegration'
  | 'pdfReports'
  | 'csvExport'
  | 'anomalyDetection'
  | 'contractAbuse';

export interface FeatureTierRequirement {
  feature: ComplianceFeature;
  minTier: ComplianceTier;
  displayName: string;
}

export const FEATURE_TIER_REQUIREMENTS: FeatureTierRequirement[] = [
  { feature: 'reports', minTier: 'BASIC', displayName: 'Compliance Reports' },
  { feature: 'sanctions', minTier: 'STANDARD', displayName: 'Sanctions Screening' },
  { feature: 'cycleDetection', minTier: 'STANDARD', displayName: 'Circular Payment Detection' },
  { feature: 'webhooks', minTier: 'STANDARD', displayName: 'Webhook Notifications' },
  { feature: 'pdfReports', minTier: 'STANDARD', displayName: 'PDF Report Export' },
  { feature: 'csvExport', minTier: 'STANDARD', displayName: 'CSV Data Export' },
  { feature: 'slackIntegration', minTier: 'ENTERPRISE', displayName: 'Slack Integration' },
  { feature: 'anomalyDetection', minTier: 'ENTERPRISE', displayName: 'Anomaly Detection' },
  { feature: 'contractAbuse', minTier: 'ENTERPRISE', displayName: 'Contract Abuse Monitoring' },
];

const TIER_HIERARCHY: ComplianceTier[] = ['NONE', 'BASIC', 'STANDARD', 'ENTERPRISE'];

export function getTierLevel(tier: ComplianceTier): number {
  return TIER_HIERARCHY.indexOf(tier);
}

export function isFeatureAvailable(
  userTier: ComplianceTier,
  feature: ComplianceFeature
): boolean {
  const requirement = FEATURE_TIER_REQUIREMENTS.find((r) => r.feature === feature);
  if (!requirement) return false;

  const userLevel = getTierLevel(userTier);
  const requiredLevel = getTierLevel(requirement.minTier);

  return userLevel >= requiredLevel;
}

export function getMinTierForFeature(feature: ComplianceFeature): ComplianceTier | null {
  const requirement = FEATURE_TIER_REQUIREMENTS.find((r) => r.feature === feature);
  return requirement?.minTier ?? null;
}

export function isWithinAccountLimit(
  tier: ComplianceTier,
  currentCount: number,
  customLimit?: number
): boolean {
  const config = COMPLIANCE_TIER_CONFIGS[tier];
  const limit = customLimit ?? config.monitoredAccounts;

  if (limit === -1) return true; // Unlimited
  return currentCount < limit;
}

export function isWithinRuleLimit(
  tier: ComplianceTier,
  currentCount: number,
  customLimit?: number
): boolean {
  const config = COMPLIANCE_TIER_CONFIGS[tier];
  const limit = customLimit ?? config.rules;

  if (limit === -1) return true; // Unlimited
  return currentCount < limit;
}

export function getUpgradeTier(currentTier: ComplianceTier): ComplianceTier | null {
  const currentLevel = getTierLevel(currentTier);
  if (currentLevel >= TIER_HIERARCHY.length - 1) return null;
  return TIER_HIERARCHY[currentLevel + 1];
}

export function formatAccountLimit(tier: ComplianceTier): string {
  const limit = COMPLIANCE_TIER_CONFIGS[tier].monitoredAccounts;
  return limit === -1 ? 'Unlimited' : limit.toLocaleString();
}

export function formatRuleLimit(tier: ComplianceTier): string {
  const limit = COMPLIANCE_TIER_CONFIGS[tier].rules;
  return limit === -1 ? 'Unlimited' : limit.toLocaleString();
}

export function formatAuditRetention(tier: ComplianceTier): string {
  const days = COMPLIANCE_TIER_CONFIGS[tier].auditRetention;
  if (days === -1) return 'Unlimited';
  if (days === 0) return 'None';
  if (days >= 365) return `${Math.floor(days / 365)} year${days >= 730 ? 's' : ''}`;
  return `${days} days`;
}
