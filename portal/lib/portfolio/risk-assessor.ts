// ===========================================
// Trustline Risk Assessment
// ===========================================

import { getAsset, HorizonAsset, HorizonBalance } from './horizon-client';
import { TrustlineRisk, RiskFactor, RiskLevel } from './types';
import { scoreToRiskLevel } from './calculator';

/**
 * Assess risk for a single trustline
 */
export async function assessTrustlineRisk(
  accountId: string,
  balance: HorizonBalance
): Promise<TrustlineRisk | null> {
  if (balance.asset_type === 'native') {
    return null; // Native XLM has no trustline risk
  }

  if (!balance.asset_code || !balance.asset_issuer) {
    return null;
  }

  const asset = await getAsset(balance.asset_code, balance.asset_issuer);
  const riskFactors: RiskFactor[] = [];
  let totalRiskScore = 0;

  // 1. Check authorization flags
  if (asset?.flags.auth_required) {
    riskFactors.push({
      type: 'AUTH_REQUIRED',
      severity: 'MEDIUM',
      description: 'Issuer requires authorization for transactions',
      weight: 10,
    });
    totalRiskScore += 10;
  }

  if (asset?.flags.auth_revocable) {
    riskFactors.push({
      type: 'AUTH_REVOCABLE',
      severity: 'HIGH',
      description: 'Issuer can revoke authorization at any time',
      weight: 25,
    });
    totalRiskScore += 25;
  }

  if (asset?.flags.auth_clawback_enabled) {
    riskFactors.push({
      type: 'CLAWBACK_ENABLED',
      severity: 'CRITICAL',
      description: 'Issuer can clawback tokens from your account',
      weight: 35,
    });
    totalRiskScore += 35;
  }

  // 2. Check holder count (low holder count = higher risk)
  if (asset?.num_accounts !== undefined) {
    if (asset.num_accounts < 10) {
      riskFactors.push({
        type: 'LOW_HOLDER_COUNT',
        severity: 'CRITICAL',
        description: `Only ${asset.num_accounts} accounts hold this asset`,
        weight: 30,
      });
      totalRiskScore += 30;
    } else if (asset.num_accounts < 100) {
      riskFactors.push({
        type: 'LOW_HOLDER_COUNT',
        severity: 'HIGH',
        description: `Only ${asset.num_accounts} accounts hold this asset`,
        weight: 15,
      });
      totalRiskScore += 15;
    } else if (asset.num_accounts < 1000) {
      riskFactors.push({
        type: 'MODERATE_HOLDER_COUNT',
        severity: 'MEDIUM',
        description: `${asset.num_accounts} accounts hold this asset`,
        weight: 5,
      });
      totalRiskScore += 5;
    }
  }

  // 3. Check if immutable (positive factor, reduces risk)
  if (asset?.flags.auth_immutable) {
    // Immutable flag means issuer can't change settings - this is good
    const reduction = Math.min(totalRiskScore, 20);
    totalRiskScore -= reduction;
    riskFactors.push({
      type: 'IMMUTABLE',
      severity: 'LOW',
      description: 'Issuer account settings are locked (immutable)',
      weight: -reduction,
    });
  }

  // 4. Check total supply concentration
  const totalSupply = asset ? parseFloat(asset.amount) : 0;
  const holderBalance = parseFloat(balance.balance);
  if (totalSupply > 0 && holderBalance > 0) {
    const concentration = (holderBalance / totalSupply) * 100;
    if (concentration > 50) {
      riskFactors.push({
        type: 'HIGH_CONCENTRATION',
        severity: 'HIGH',
        description: `You hold ${concentration.toFixed(1)}% of total supply`,
        weight: 20,
      });
      totalRiskScore += 20;
    } else if (concentration > 10) {
      riskFactors.push({
        type: 'MODERATE_CONCENTRATION',
        severity: 'MEDIUM',
        description: `You hold ${concentration.toFixed(1)}% of total supply`,
        weight: 10,
      });
      totalRiskScore += 10;
    }
  }

  // 5. Check for known scam patterns (simplified)
  const suspiciousPatterns = [
    'FREE',
    'AIRDROP',
    'GIFT',
    'BONUS',
    'WIN',
    'PRIZE',
  ];
  if (suspiciousPatterns.some((p) => balance.asset_code!.toUpperCase().includes(p))) {
    riskFactors.push({
      type: 'SUSPICIOUS_NAME',
      severity: 'HIGH',
      description: 'Asset name matches common scam patterns',
      weight: 25,
    });
    totalRiskScore += 25;
  }

  // Cap risk score at 100
  totalRiskScore = Math.min(100, Math.max(0, totalRiskScore));

  return {
    id: `${accountId}-${balance.asset_code}-${balance.asset_issuer}`,
    accountId,
    assetCode: balance.asset_code,
    assetIssuer: balance.asset_issuer,
    issuerVerified: false, // Would require external verification
    riskScore: totalRiskScore,
    riskFactors,
    totalSupply: totalSupply || undefined,
    holderCount: asset?.num_accounts,
    authRequired: asset?.flags.auth_required || false,
    authRevocable: asset?.flags.auth_revocable || false,
    authImmutable: asset?.flags.auth_immutable || false,
    authClawback: asset?.flags.auth_clawback_enabled || false,
  };
}

/**
 * Assess risk for all trustlines in an account
 */
export async function assessAllTrustlineRisks(
  accountId: string,
  balances: HorizonBalance[]
): Promise<TrustlineRisk[]> {
  const risks: TrustlineRisk[] = [];

  for (const balance of balances) {
    if (balance.asset_type !== 'native') {
      const risk = await assessTrustlineRisk(accountId, balance);
      if (risk) {
        risks.push(risk);
      }
    }
  }

  return risks.sort((a, b) => b.riskScore - a.riskScore);
}

/**
 * Get risk level color for UI
 */
export function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case 'LOW':
      return 'text-green-600 bg-green-100';
    case 'MEDIUM':
      return 'text-yellow-600 bg-yellow-100';
    case 'HIGH':
      return 'text-orange-600 bg-orange-100';
    case 'CRITICAL':
      return 'text-red-600 bg-red-100';
  }
}

/**
 * Get risk level badge
 */
export function getRiskBadge(score: number): { level: RiskLevel; label: string; color: string } {
  const level = scoreToRiskLevel(score);
  const colors = {
    LOW: 'bg-green-100 text-green-700',
    MEDIUM: 'bg-yellow-100 text-yellow-700',
    HIGH: 'bg-orange-100 text-orange-700',
    CRITICAL: 'bg-red-100 text-red-700',
  };

  return {
    level,
    label: level.charAt(0) + level.slice(1).toLowerCase(),
    color: colors[level],
  };
}

/**
 * Generate risk summary for portfolio
 */
export function generateRiskSummary(risks: TrustlineRisk[]): {
  averageRiskScore: number;
  highRiskCount: number;
  criticalRiskCount: number;
  topRiskFactors: { type: string; count: number }[];
} {
  if (risks.length === 0) {
    return {
      averageRiskScore: 0,
      highRiskCount: 0,
      criticalRiskCount: 0,
      topRiskFactors: [],
    };
  }

  const totalScore = risks.reduce((sum, r) => sum + r.riskScore, 0);
  const averageRiskScore = Math.round(totalScore / risks.length);

  const highRiskCount = risks.filter((r) => r.riskScore >= 50 && r.riskScore < 75).length;
  const criticalRiskCount = risks.filter((r) => r.riskScore >= 75).length;

  // Count risk factor occurrences
  const factorCounts: Record<string, number> = {};
  for (const risk of risks) {
    for (const factor of risk.riskFactors) {
      factorCounts[factor.type] = (factorCounts[factor.type] || 0) + 1;
    }
  }

  const topRiskFactors = Object.entries(factorCounts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    averageRiskScore,
    highRiskCount,
    criticalRiskCount,
    topRiskFactors,
  };
}

/**
 * Get human-readable risk factor description
 */
export function getRiskFactorDescription(type: string): string {
  const descriptions: Record<string, string> = {
    AUTH_REQUIRED: 'The issuer must authorize all transactions with this asset.',
    AUTH_REVOCABLE: 'The issuer can revoke your ability to transact this asset at any time.',
    CLAWBACK_ENABLED: 'The issuer can forcibly remove tokens from your account.',
    LOW_HOLDER_COUNT: 'Very few accounts hold this asset, indicating low adoption or potential abandonment.',
    MODERATE_HOLDER_COUNT: 'This asset has limited adoption.',
    IMMUTABLE: 'The issuer cannot change asset settings, providing stability.',
    HIGH_CONCENTRATION: 'You hold a significant portion of the total supply.',
    MODERATE_CONCENTRATION: 'You hold a notable portion of the total supply.',
    SUSPICIOUS_NAME: 'The asset name matches patterns commonly used in scams.',
  };

  return descriptions[type] || type;
}
