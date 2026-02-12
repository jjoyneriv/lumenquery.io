// ===========================================
// Transaction Intelligence - Feature Gating
// ===========================================

import { prisma } from '../prisma';
import {
  FeatureAccessResult,
  IntelligenceFeature,
  IntelligenceTierConfig,
  INTELLIGENCE_TIER_CONFIGS,
} from './types';

// Get tier configuration
export function getIntelligenceTierConfig(tier: string): IntelligenceTierConfig {
  return INTELLIGENCE_TIER_CONFIGS[tier] || INTELLIGENCE_TIER_CONFIGS.NONE;
}

// Check if a feature is allowed for the organization
export async function checkIntelligenceAccess(
  organizationId: string | null | undefined,
  feature: IntelligenceFeature
): Promise<FeatureAccessResult> {
  // No org = no access
  if (!organizationId) {
    return { allowed: false, reason: 'Authentication required' };
  }

  try {
    const org = await prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        watchlists: {
          include: { accounts: true },
        },
        alertConfigurations: true,
      },
    });

    if (!org) {
      return { allowed: false, reason: 'Organization not found' };
    }

    // Check if intelligence is enabled
    if (!org.intelligenceEnabled) {
      return {
        allowed: false,
        reason: 'Transaction Intelligence requires a subscription. Upgrade to access.',
      };
    }

    const tierConfig = getIntelligenceTierConfig(org.intelligenceTier);

    switch (feature) {
      case 'stream': {
        const limit = tierConfig.concurrentStreams;
        if (limit === 0) {
          return {
            allowed: false,
            reason: 'Live streams require an Intelligence subscription',
          };
        }
        return { allowed: true, limit: limit === -1 ? undefined : limit };
      }

      case 'accountProfile': {
        return { allowed: true };
      }

      case 'watchlist': {
        const limit = tierConfig.watchlistAccounts;
        const totalAccounts = org.watchlists.reduce(
          (sum, w) => sum + w.accounts.length,
          0
        );

        if (limit === 0) {
          return {
            allowed: false,
            reason: 'Watchlists require an Intelligence subscription',
          };
        }

        if (limit !== -1 && totalAccounts >= limit) {
          return {
            allowed: false,
            reason: `Watchlist account limit reached (${totalAccounts}/${limit})`,
            limit,
            used: totalAccounts,
          };
        }

        return { allowed: true, limit: limit === -1 ? undefined : limit, used: totalAccounts };
      }

      case 'alerts': {
        const limit = tierConfig.alertConfigurations;
        const used = org.alertConfigurations.length;

        if (limit === 0) {
          return {
            allowed: false,
            reason: 'Alerts require an Intelligence subscription',
          };
        }

        if (limit !== -1 && used >= limit) {
          return {
            allowed: false,
            reason: `Alert configuration limit reached (${used}/${limit})`,
            limit,
            used,
          };
        }

        return { allowed: true, limit: limit === -1 ? undefined : limit, used };
      }

      case 'webhooks': {
        if (!tierConfig.webhookEnabled) {
          return {
            allowed: false,
            reason: 'Webhook notifications require TEAMS tier or higher',
          };
        }
        return { allowed: true };
      }

      case 'anomalyDetection': {
        if (!tierConfig.anomalyDetectionEnabled) {
          return {
            allowed: false,
            reason: 'Anomaly detection requires TEAMS tier or higher',
          };
        }
        return { allowed: true };
      }

      case 'export': {
        return { allowed: true };
      }

      case 'api': {
        const limit = tierConfig.apiRateLimit;
        if (limit === 0) {
          return {
            allowed: false,
            reason: 'API access requires an Intelligence subscription',
          };
        }
        return { allowed: true, limit: limit === -1 ? undefined : limit };
      }

      default:
        return { allowed: false, reason: 'Unknown feature' };
    }
  } catch (error) {
    console.error('Error checking Intelligence access:', error);
    return { allowed: false, reason: 'Error checking access' };
  }
}

// Get whale threshold for organization
export async function getWhaleThreshold(
  organizationId: string
): Promise<number> {
  try {
    const org = await prisma.organization.findUnique({
      where: { id: organizationId },
      select: { intelligenceTier: true },
    });

    if (!org) return 100000; // Default to 100K

    const config = getIntelligenceTierConfig(org.intelligenceTier);
    return config.whaleThreshold || 100000;
  } catch {
    return 100000;
  }
}

// Get historical data limit for organization
export function getHistoricalDataLimit(tier: string): Date | null {
  const config = getIntelligenceTierConfig(tier);
  const days = config.historicalDataDays;

  if (days === -1 || days === 0) {
    return null;
  }

  const limit = new Date();
  limit.setDate(limit.getDate() - days);
  return limit;
}

// Check if organization has premium intelligence tier
export function isPremiumIntelligenceTier(tier: string): boolean {
  return ['SOLO', 'TEAMS', 'ENTERPRISE'].includes(tier);
}

// Get feature availability for UI display
export function getIntelligenceFeatureAvailability(
  tier: string
): Record<IntelligenceFeature, boolean> {
  const config = getIntelligenceTierConfig(tier);
  return {
    stream: config.concurrentStreams > 0 || config.concurrentStreams === -1,
    accountProfile: true,
    watchlist: config.watchlistAccounts > 0 || config.watchlistAccounts === -1,
    alerts: config.alertConfigurations > 0 || config.alertConfigurations === -1,
    webhooks: config.webhookEnabled,
    anomalyDetection: config.anomalyDetectionEnabled,
    export: true,
    api: config.apiRateLimit > 0 || config.apiRateLimit === -1,
  };
}

// Get tier limits summary for display
export function getTierLimitsSummary(tier: string): {
  streams: string;
  watchlistAccounts: string;
  alertConfigs: string;
  retention: string;
  whaleThreshold: string;
} {
  const config = getIntelligenceTierConfig(tier);

  const formatLimit = (n: number) => (n === -1 ? 'Unlimited' : n.toString());
  const formatXLM = (n: number) =>
    n >= 1000000 ? `${(n / 1000000).toFixed(0)}M` : `${(n / 1000).toFixed(0)}K`;

  return {
    streams: formatLimit(config.concurrentStreams),
    watchlistAccounts: formatLimit(config.watchlistAccounts),
    alertConfigs: formatLimit(config.alertConfigurations),
    retention: config.alertRetentionDays === 365 ? '1 year' : `${config.alertRetentionDays} days`,
    whaleThreshold: `${formatXLM(config.whaleThreshold)} XLM`,
  };
}
