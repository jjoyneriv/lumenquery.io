import { prisma } from '@/lib/prisma';
import type { ComplianceTier } from '@prisma/client';
import {
  COMPLIANCE_TIER_CONFIGS,
  type ComplianceFeature,
  isFeatureAvailable,
  getMinTierForFeature,
  getTierLevel,
  getUpgradeTier,
} from './tiers';

export interface FeatureAccessResult {
  allowed: boolean;
  reason?: string;
  currentTier?: ComplianceTier;
  requiredTier?: ComplianceTier;
  currentCount?: number;
  limit?: number;
  upgradeUrl?: string;
}

/**
 * Check if an organization has access to a compliance feature
 */
export async function checkComplianceAccess(
  organizationId: string,
  feature: ComplianceFeature
): Promise<FeatureAccessResult> {
  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    select: {
      complianceEnabled: true,
      complianceTier: true,
    },
  });

  if (!org) {
    return {
      allowed: false,
      reason: 'Organization not found',
    };
  }

  if (!org.complianceEnabled) {
    return {
      allowed: false,
      reason: 'Compliance features not enabled for this organization',
      currentTier: org.complianceTier,
      upgradeUrl: '/compliance/upgrade',
    };
  }

  const requiredTier = getMinTierForFeature(feature);
  if (!requiredTier) {
    return {
      allowed: false,
      reason: 'Unknown feature',
    };
  }

  const hasAccess = isFeatureAvailable(org.complianceTier, feature);

  if (!hasAccess) {
    return {
      allowed: false,
      reason: `This feature requires ${requiredTier} tier or higher`,
      currentTier: org.complianceTier,
      requiredTier,
      upgradeUrl: '/compliance/upgrade',
    };
  }

  return {
    allowed: true,
    currentTier: org.complianceTier,
  };
}

/**
 * Check if organization can add more monitored accounts
 */
export async function checkAccountLimit(
  organizationId: string
): Promise<FeatureAccessResult> {
  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    select: {
      complianceEnabled: true,
      complianceTier: true,
      maxMonitoredAccounts: true,
      _count: {
        select: { monitoredAccounts: true },
      },
    },
  });

  if (!org) {
    return {
      allowed: false,
      reason: 'Organization not found',
    };
  }

  if (!org.complianceEnabled) {
    return {
      allowed: false,
      reason: 'Compliance features not enabled',
      upgradeUrl: '/compliance/upgrade',
    };
  }

  const config = COMPLIANCE_TIER_CONFIGS[org.complianceTier];
  const limit = org.maxMonitoredAccounts || config.monitoredAccounts;
  const current = org._count.monitoredAccounts;

  // Unlimited
  if (limit === -1) {
    return {
      allowed: true,
      currentTier: org.complianceTier,
      currentCount: current,
      limit: -1,
    };
  }

  if (current >= limit) {
    const upgradeTier = getUpgradeTier(org.complianceTier);
    return {
      allowed: false,
      reason: `Account limit reached (${current}/${limit})`,
      currentTier: org.complianceTier,
      requiredTier: upgradeTier ?? undefined,
      currentCount: current,
      limit,
      upgradeUrl: '/compliance/upgrade',
    };
  }

  return {
    allowed: true,
    currentTier: org.complianceTier,
    currentCount: current,
    limit,
  };
}

/**
 * Check if organization can add more compliance rules
 */
export async function checkRuleLimit(
  organizationId: string
): Promise<FeatureAccessResult> {
  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    select: {
      complianceEnabled: true,
      complianceTier: true,
      maxComplianceRules: true,
      _count: {
        select: { complianceRules: true },
      },
    },
  });

  if (!org) {
    return {
      allowed: false,
      reason: 'Organization not found',
    };
  }

  if (!org.complianceEnabled) {
    return {
      allowed: false,
      reason: 'Compliance features not enabled',
      upgradeUrl: '/compliance/upgrade',
    };
  }

  const config = COMPLIANCE_TIER_CONFIGS[org.complianceTier];
  const limit = org.maxComplianceRules || config.rules;
  const current = org._count.complianceRules;

  // Unlimited
  if (limit === -1) {
    return {
      allowed: true,
      currentTier: org.complianceTier,
      currentCount: current,
      limit: -1,
    };
  }

  if (current >= limit) {
    const upgradeTier = getUpgradeTier(org.complianceTier);
    return {
      allowed: false,
      reason: `Rule limit reached (${current}/${limit})`,
      currentTier: org.complianceTier,
      requiredTier: upgradeTier ?? undefined,
      currentCount: current,
      limit,
      upgradeUrl: '/compliance/upgrade',
    };
  }

  return {
    allowed: true,
    currentTier: org.complianceTier,
    currentCount: current,
    limit,
  };
}

/**
 * Get the compliance status for an organization
 */
export async function getComplianceStatus(organizationId: string) {
  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    select: {
      complianceEnabled: true,
      complianceTier: true,
      maxMonitoredAccounts: true,
      maxComplianceRules: true,
      auditRetentionDays: true,
      notifySlack: true,
      slackWebhookUrl: true,
      complianceEmail: true,
      _count: {
        select: {
          monitoredAccounts: true,
          complianceRules: true,
          complianceViolations: true,
        },
      },
    },
  });

  if (!org) {
    return null;
  }

  const config = COMPLIANCE_TIER_CONFIGS[org.complianceTier];

  // Count pending violations
  const pendingViolations = await prisma.complianceViolation.count({
    where: {
      organizationId,
      status: { in: ['PENDING', 'UNDER_REVIEW'] },
    },
  });

  // Count high-risk accounts
  const highRiskAccounts = await prisma.monitoredAccount.count({
    where: {
      organizationId,
      riskScore: { gte: 70 },
    },
  });

  // Get last scan time
  const lastJob = await prisma.backgroundJob.findFirst({
    where: {
      jobType: 'ACCOUNT_SCAN',
      status: 'COMPLETED',
    },
    orderBy: { completedAt: 'desc' },
    select: { completedAt: true },
  });

  return {
    enabled: org.complianceEnabled,
    tier: org.complianceTier,
    limits: {
      monitoredAccounts: {
        current: org._count.monitoredAccounts,
        max: org.maxMonitoredAccounts || config.monitoredAccounts,
      },
      rules: {
        current: org._count.complianceRules,
        max: org.maxComplianceRules || config.rules,
      },
    },
    metrics: {
      activeViolations: org._count.complianceViolations,
      pendingReview: pendingViolations,
      accountsAtRisk: highRiskAccounts,
      lastScanAt: lastJob?.completedAt?.toISOString(),
    },
    features: {
      sanctions: config.sanctions,
      cycleDetection: config.cycleDetection,
      reports: config.reports,
      webhooks: config.webhooks,
      slackIntegration: config.slackIntegration,
    },
    notifications: {
      slack: org.notifySlack,
      slackConfigured: !!org.slackWebhookUrl,
      email: org.complianceEmail,
    },
  };
}

/**
 * Require a specific compliance tier or higher (for API middleware)
 */
export function requireTier(
  userTier: ComplianceTier,
  requiredTier: ComplianceTier
): boolean {
  return getTierLevel(userTier) >= getTierLevel(requiredTier);
}

/**
 * Check if a rule type is available for the tier
 */
export function isRuleTypeAvailable(
  tier: ComplianceTier,
  ruleType: string
): boolean {
  // Basic tier only allows velocity and volume rules
  if (tier === 'BASIC') {
    return ['VELOCITY_LIMIT', 'VOLUME_LIMIT'].includes(ruleType);
  }

  // Standard tier adds sanctions, circular payment, mixer, structuring
  if (tier === 'STANDARD') {
    return [
      'VELOCITY_LIMIT',
      'VOLUME_LIMIT',
      'SANCTIONS_SCREENING',
      'CIRCULAR_PAYMENT',
      'MIXER_DETECTION',
      'STRUCTURING',
      'COUNTERPARTY_RISK',
    ].includes(ruleType);
  }

  // Enterprise has all rule types
  if (tier === 'ENTERPRISE') {
    return true;
  }

  // NONE tier has no rules
  return false;
}

/**
 * Get available rule types for a tier
 */
export function getAvailableRuleTypes(tier: ComplianceTier): string[] {
  if (tier === 'NONE') return [];

  if (tier === 'BASIC') {
    return ['VELOCITY_LIMIT', 'VOLUME_LIMIT'];
  }

  if (tier === 'STANDARD') {
    return [
      'VELOCITY_LIMIT',
      'VOLUME_LIMIT',
      'SANCTIONS_SCREENING',
      'CIRCULAR_PAYMENT',
      'MIXER_DETECTION',
      'STRUCTURING',
      'COUNTERPARTY_RISK',
    ];
  }

  // Enterprise - all types
  return [
    'VELOCITY_LIMIT',
    'VOLUME_LIMIT',
    'SANCTIONS_SCREENING',
    'CIRCULAR_PAYMENT',
    'MIXER_DETECTION',
    'UNUSUAL_PATTERN',
    'COUNTERPARTY_RISK',
    'CONTRACT_ABUSE',
    'STRUCTURING',
    'DORMANT_ACTIVATION',
  ];
}
