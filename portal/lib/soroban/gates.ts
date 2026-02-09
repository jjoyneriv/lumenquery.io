// ===========================================
// Soroban Pro - Feature Gating
// ===========================================

import { prisma } from '../prisma';
import { FeatureAccessResult, TIER_CONFIGS, TierConfig } from './types';

export type SorobanFeature =
  | 'explore'
  | 'history'
  | 'storage'
  | 'events'
  | 'ai'
  | 'export'
  | 'stream'
  | 'versions'
  | 'api';

// Get tier configuration
export function getTierConfig(tier: string): TierConfig {
  return TIER_CONFIGS[tier] || TIER_CONFIGS.FREE;
}

// Check if a feature is allowed for the organization
export async function checkSorobanProAccess(
  organizationId: string | null | undefined,
  feature: SorobanFeature
): Promise<FeatureAccessResult> {
  // No org = no access (except basic exploration)
  if (!organizationId) {
    if (feature === 'explore') {
      return { allowed: true, limit: 10, used: 0 };
    }
    return { allowed: false, reason: 'Authentication required' };
  }

  try {
    const org = await prisma.organization.findUnique({
      where: { id: organizationId },
    });

    if (!org) {
      return { allowed: false, reason: 'Organization not found' };
    }

    const tierConfig = getTierConfig(org.tier);

    switch (feature) {
      case 'explore': {
        // Check contracts explored this month
        const limit = tierConfig.contractsMonthlyLimit;
        const used = org.contractsExploredThisMonth;

        if (limit === -1) {
          return { allowed: true };
        }

        if (used >= limit) {
          return {
            allowed: false,
            reason: `Monthly contract limit reached (${used}/${limit})`,
            limit,
            used,
          };
        }

        return { allowed: true, limit, used };
      }

      case 'history': {
        // Call history access based on tier
        const days = tierConfig.callHistoryDays;
        return {
          allowed: true,
          limit: days,
        };
      }

      case 'storage':
      case 'events': {
        // Basic storage and events are available to all
        return { allowed: true };
      }

      case 'ai': {
        const limit = tierConfig.aiExplanationsMonthly;
        const used = org.aiExplanationsUsed;

        if (limit === 0) {
          return {
            allowed: false,
            reason: 'AI explanations require Developer tier or higher',
            limit,
            used,
          };
        }

        if (limit === -1) {
          return { allowed: true };
        }

        if (used >= limit) {
          return {
            allowed: false,
            reason: `Monthly AI explanation limit reached (${used}/${limit})`,
            limit,
            used,
          };
        }

        return { allowed: true, limit, used };
      }

      case 'export': {
        if (!tierConfig.exportEnabled) {
          return {
            allowed: false,
            reason: 'Export requires Developer tier or higher',
          };
        }
        return { allowed: true };
      }

      case 'stream': {
        if (!tierConfig.realtimeStreamEnabled) {
          return {
            allowed: false,
            reason: 'Real-time streaming requires Team tier or higher',
          };
        }
        return { allowed: true };
      }

      case 'versions': {
        if (!tierConfig.versionComparisonEnabled) {
          return {
            allowed: false,
            reason: 'Version comparison requires Developer tier or higher',
          };
        }
        return { allowed: true };
      }

      case 'api': {
        if (!tierConfig.apiAccessEnabled) {
          return {
            allowed: false,
            reason: 'API access requires Developer tier or higher',
          };
        }
        return { allowed: true };
      }

      default:
        return { allowed: false, reason: 'Unknown feature' };
    }
  } catch (error) {
    console.error('Error checking Soroban Pro access:', error);
    return { allowed: false, reason: 'Error checking access' };
  }
}

// Increment contract exploration count
export async function incrementContractsExplored(
  organizationId: string
): Promise<void> {
  try {
    await prisma.organization.update({
      where: { id: organizationId },
      data: {
        contractsExploredThisMonth: { increment: 1 },
      },
    });
  } catch (error) {
    console.error('Error incrementing contracts explored:', error);
  }
}

// Increment AI explanation usage
export async function incrementAIUsage(organizationId: string): Promise<void> {
  try {
    await prisma.organization.update({
      where: { id: organizationId },
      data: {
        aiExplanationsUsed: { increment: 1 },
      },
    });
  } catch (error) {
    console.error('Error incrementing AI usage:', error);
  }
}

// Reset monthly usage counters (call this in a cron job on the 1st of each month)
export async function resetMonthlyUsage(): Promise<void> {
  try {
    await prisma.organization.updateMany({
      data: {
        contractsExploredThisMonth: 0,
        aiExplanationsUsed: 0,
      },
    });
  } catch (error) {
    console.error('Error resetting monthly usage:', error);
  }
}

// Get remaining usage for a feature
export async function getRemainingUsage(
  organizationId: string,
  feature: 'explore' | 'ai'
): Promise<{ used: number; limit: number; remaining: number } | null> {
  try {
    const org = await prisma.organization.findUnique({
      where: { id: organizationId },
    });

    if (!org) return null;

    const tierConfig = getTierConfig(org.tier);

    if (feature === 'explore') {
      const limit = tierConfig.contractsMonthlyLimit;
      const used = org.contractsExploredThisMonth;
      return {
        used,
        limit: limit === -1 ? Infinity : limit,
        remaining: limit === -1 ? Infinity : Math.max(0, limit - used),
      };
    }

    if (feature === 'ai') {
      const limit = tierConfig.aiExplanationsMonthly;
      const used = org.aiExplanationsUsed;
      return {
        used,
        limit: limit === -1 ? Infinity : limit,
        remaining: limit === -1 ? Infinity : Math.max(0, limit - used),
      };
    }

    return null;
  } catch (error) {
    console.error('Error getting remaining usage:', error);
    return null;
  }
}

// Get call history date limit based on tier
export function getHistoryDateLimit(tier: string): Date | null {
  const config = getTierConfig(tier);
  const days = config.callHistoryDays;

  if (days === -1) {
    return null; // No limit
  }

  const limit = new Date();
  limit.setDate(limit.getDate() - days);
  return limit;
}

// Check if user can access premium features
export function isPremiumTier(tier: string): boolean {
  return ['DEVELOPER', 'TEAM', 'AUDITOR', 'ENTERPRISE'].includes(tier);
}

// Get feature availability for tier (for UI display)
export function getFeatureAvailability(tier: string): Record<SorobanFeature, boolean> {
  const config = getTierConfig(tier);
  return {
    explore: true,
    history: true,
    storage: true,
    events: true,
    ai: config.aiExplanationsMonthly > 0 || config.aiExplanationsMonthly === -1,
    export: config.exportEnabled,
    stream: config.realtimeStreamEnabled,
    versions: config.versionComparisonEnabled,
    api: config.apiAccessEnabled,
  };
}
