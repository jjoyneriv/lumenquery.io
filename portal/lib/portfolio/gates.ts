// ===========================================
// Portfolio Feature Gates
// ===========================================

import { PortfolioTier, PORTFOLIO_TIERS, PortfolioTierConfig } from './types';

export interface PortfolioOrganization {
  portfolioEnabled: boolean;
  portfolioTier: PortfolioTier;
  maxPortfolioAccounts: number;
  maxPortfolios: number;
  yieldTrackingEnabled: boolean;
  pnlTrackingEnabled: boolean;
  contractPositionsEnabled: boolean;
  snapshotRetentionDays: number;
}

/**
 * Get tier configuration for an organization
 */
export function getTierConfig(org: PortfolioOrganization): PortfolioTierConfig {
  if (!org.portfolioEnabled) {
    return PORTFOLIO_TIERS.NONE;
  }
  return PORTFOLIO_TIERS[org.portfolioTier] || PORTFOLIO_TIERS.FREE;
}

/**
 * Check if organization can access portfolio features
 */
export function canAccessPortfolio(org: PortfolioOrganization): boolean {
  return org.portfolioEnabled && org.portfolioTier !== 'NONE';
}

/**
 * Check if organization can add more accounts
 */
export function canAddAccount(org: PortfolioOrganization, currentCount: number): boolean {
  if (!canAccessPortfolio(org)) return false;
  return currentCount < org.maxPortfolioAccounts;
}

/**
 * Check if organization can create more portfolios
 */
export function canCreatePortfolio(org: PortfolioOrganization, currentCount: number): boolean {
  if (!canAccessPortfolio(org)) return false;
  return currentCount < org.maxPortfolios;
}

/**
 * Check if P&L tracking is available
 */
export function canTrackPnL(org: PortfolioOrganization): boolean {
  return canAccessPortfolio(org) && org.pnlTrackingEnabled;
}

/**
 * Check if yield tracking is available
 */
export function canTrackYield(org: PortfolioOrganization): boolean {
  return canAccessPortfolio(org) && org.yieldTrackingEnabled;
}

/**
 * Check if contract positions are available
 */
export function canTrackContractPositions(org: PortfolioOrganization): boolean {
  return canAccessPortfolio(org) && org.contractPositionsEnabled;
}

/**
 * Get snapshot retention days
 */
export function getSnapshotRetention(org: PortfolioOrganization): number {
  if (!canAccessPortfolio(org)) return 0;
  return org.snapshotRetentionDays;
}

/**
 * Check feature access and return error message if not allowed
 */
export function checkFeatureAccess(
  org: PortfolioOrganization,
  feature: 'portfolio' | 'pnl' | 'yield' | 'contracts'
): { allowed: boolean; reason?: string } {
  if (!org.portfolioEnabled) {
    return { allowed: false, reason: 'Portfolio feature is not enabled for your organization' };
  }

  if (org.portfolioTier === 'NONE') {
    return { allowed: false, reason: 'No portfolio subscription active' };
  }

  switch (feature) {
    case 'portfolio':
      return { allowed: true };

    case 'pnl':
      if (!org.pnlTrackingEnabled) {
        return {
          allowed: false,
          reason: 'P&L tracking requires Pro tier or higher. Upgrade to unlock this feature.'
        };
      }
      return { allowed: true };

    case 'yield':
      if (!org.yieldTrackingEnabled) {
        return {
          allowed: false,
          reason: 'Yield tracking requires Pro tier or higher. Upgrade to unlock this feature.'
        };
      }
      return { allowed: true };

    case 'contracts':
      if (!org.contractPositionsEnabled) {
        return {
          allowed: false,
          reason: 'Contract position tracking requires Pro tier or higher. Upgrade to unlock this feature.'
        };
      }
      return { allowed: true };

    default:
      return { allowed: false, reason: 'Unknown feature' };
  }
}

/**
 * Get upgrade message for a feature
 */
export function getUpgradeMessage(currentTier: PortfolioTier, feature: string): string {
  const messages: Record<string, Record<PortfolioTier, string>> = {
    pnl: {
      NONE: 'Subscribe to Pro ($10/mo) to unlock P&L tracking',
      FREE: 'Upgrade to Pro ($10/mo) to unlock P&L tracking',
      PRO: 'P&L tracking is available on your plan',
      DAO: 'P&L tracking is available on your plan',
    },
    yield: {
      NONE: 'Subscribe to Pro ($10/mo) to unlock yield tracking',
      FREE: 'Upgrade to Pro ($10/mo) to unlock yield tracking',
      PRO: 'Yield tracking is available on your plan',
      DAO: 'Yield tracking is available on your plan',
    },
    contracts: {
      NONE: 'Subscribe to Pro ($10/mo) to unlock contract position tracking',
      FREE: 'Upgrade to Pro ($10/mo) to unlock contract position tracking',
      PRO: 'Contract position tracking is available on your plan',
      DAO: 'Contract position tracking is available on your plan',
    },
    accounts: {
      NONE: 'Subscribe to unlock portfolio tracking',
      FREE: 'Upgrade to Pro ($10/mo) to add more accounts (up to 10)',
      PRO: 'Upgrade to DAO ($50/mo) for unlimited accounts',
      DAO: 'You have unlimited accounts on your plan',
    },
  };

  return messages[feature]?.[currentTier] || 'Upgrade your plan to access this feature';
}
