import { prisma } from '@/lib/prisma';
import type { ComplianceRule, AccountType } from '@prisma/client';
import type {
  RuleEvaluator,
  EvaluationContext,
  EvaluationResult,
} from '../rules-engine';
import type { CounterpartyConditions } from '../types';

export const counterpartyEvaluator: RuleEvaluator = {
  ruleType: 'COUNTERPARTY_RISK',

  async evaluate(
    rule: ComplianceRule,
    context: EvaluationContext
  ): Promise<EvaluationResult> {
    const conditions = rule.conditions as CounterpartyConditions;
    const accountId = context.transaction?.sourceAccount ?? context.account;

    if (!accountId) {
      return { triggered: false };
    }

    const minRiskScore = conditions.minRiskScore ?? 70;
    const blacklistedTypes = conditions.blacklistedTypes ?? [];
    const maxExposure = conditions.maxExposure;

    // Get recent counterparties
    const recentTransactions = await prisma.paymentGraphEdge.findMany({
      where: {
        OR: [{ fromAccount: accountId }, { toAccount: accountId }],
        timestamp: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      },
      orderBy: { timestamp: 'desc' },
      take: 100,
    });

    if (recentTransactions.length === 0) {
      return { triggered: false };
    }

    // Extract unique counterparties
    const counterpartyIds = new Set<string>();
    const counterpartyVolume = new Map<string, number>();

    for (const tx of recentTransactions) {
      const counterparty =
        tx.fromAccount === accountId ? tx.toAccount : tx.fromAccount;
      counterpartyIds.add(counterparty);

      const current = counterpartyVolume.get(counterparty) ?? 0;
      counterpartyVolume.set(counterparty, current + Number(tx.amount));
    }

    // Get profiles for counterparties
    const profiles = await prisma.accountProfile.findMany({
      where: {
        accountId: { in: Array.from(counterpartyIds) },
      },
    });

    const profileMap = new Map(profiles.map((p) => [p.accountId, p]));

    // Identify high-risk counterparties
    const riskyCounterparties: Array<{
      accountId: string;
      riskScore: number;
      accountType: AccountType;
      volume: number;
      reason: string;
    }> = [];

    for (const counterpartyId of counterpartyIds) {
      const profile = profileMap.get(counterpartyId);
      const volume = counterpartyVolume.get(counterpartyId) ?? 0;

      if (!profile) {
        // Unknown counterparty - moderate risk
        if (volume > 10000) {
          riskyCounterparties.push({
            accountId: counterpartyId,
            riskScore: 50,
            accountType: 'UNKNOWN',
            volume,
            reason: 'Unknown counterparty with significant volume',
          });
        }
        continue;
      }

      // Check risk score
      if (profile.riskScore >= minRiskScore) {
        riskyCounterparties.push({
          accountId: counterpartyId,
          riskScore: profile.riskScore,
          accountType: profile.accountType,
          volume,
          reason: `High risk score (${profile.riskScore})`,
        });
        continue;
      }

      // Check blacklisted types
      if (blacklistedTypes.includes(profile.accountType)) {
        riskyCounterparties.push({
          accountId: counterpartyId,
          riskScore: Math.max(60, profile.riskScore),
          accountType: profile.accountType,
          volume,
          reason: `Blacklisted account type (${profile.accountType})`,
        });
        continue;
      }
    }

    if (riskyCounterparties.length === 0) {
      return { triggered: false };
    }

    // Calculate total exposure to risky counterparties
    const totalRiskyVolume = riskyCounterparties.reduce(
      (sum, c) => sum + c.volume,
      0
    );

    // Check if exposure exceeds limit
    if (maxExposure && totalRiskyVolume < maxExposure) {
      return { triggered: false };
    }

    // Calculate overall risk score
    const maxRisk = Math.max(...riskyCounterparties.map((c) => c.riskScore));
    const avgRisk =
      riskyCounterparties.reduce((sum, c) => sum + c.riskScore, 0) /
      riskyCounterparties.length;
    const score = Math.min(
      100,
      Math.round((maxRisk * 0.6 + avgRisk * 0.4) + riskyCounterparties.length * 2)
    );

    return {
      triggered: true,
      score,
      matchDetails: {
        ruleType: 'COUNTERPARTY_RISK',
        matchedConditions: riskyCounterparties.map(
          (c) => `high_risk_counterparty_${c.accountType.toLowerCase()}`
        ),
        values: {
          accountId,
          riskyCounterpartyCount: riskyCounterparties.length,
          totalRiskyVolume,
          counterparties: riskyCounterparties,
          evaluatedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      },
      evidence: {
        accounts: [
          {
            accountId,
            matchType: 'counterparty_exposure',
          },
          ...riskyCounterparties.map((c) => ({
            accountId: c.accountId,
            riskScore: c.riskScore,
            matchType: 'high_risk_counterparty',
          })),
        ],
      },
    };
  },
};

export default counterpartyEvaluator;
