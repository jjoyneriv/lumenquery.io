import { prisma } from '@/lib/prisma';
import type { ComplianceRule } from '@prisma/client';
import type {
  RuleEvaluator,
  EvaluationContext,
  EvaluationResult,
} from '../rules-engine';
import type { VelocityConditions } from '../types';

export const velocityEvaluator: RuleEvaluator = {
  ruleType: 'VELOCITY_LIMIT',

  async evaluate(
    rule: ComplianceRule,
    context: EvaluationContext
  ): Promise<EvaluationResult> {
    const conditions = rule.conditions as VelocityConditions;
    const accountId = context.transaction?.sourceAccount ?? context.account;

    if (!accountId) {
      return { triggered: false };
    }

    const now = new Date();
    const results: { metric: string; count: number; limit: number }[] = [];

    // Check hourly velocity
    if (conditions.maxTransactionsPerHour) {
      const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const hourlyCount = await countTransactions(accountId, hourAgo, now);

      if (hourlyCount >= conditions.maxTransactionsPerHour) {
        results.push({
          metric: 'hourly',
          count: hourlyCount,
          limit: conditions.maxTransactionsPerHour,
        });
      }
    }

    // Check daily velocity
    if (conditions.maxTransactionsPerDay) {
      const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const dailyCount = await countTransactions(accountId, dayAgo, now);

      if (dailyCount >= conditions.maxTransactionsPerDay) {
        results.push({
          metric: 'daily',
          count: dailyCount,
          limit: conditions.maxTransactionsPerDay,
        });
      }
    }

    // Check weekly velocity
    if (conditions.maxTransactionsPerWeek) {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const weeklyCount = await countTransactions(accountId, weekAgo, now);

      if (weeklyCount >= conditions.maxTransactionsPerWeek) {
        results.push({
          metric: 'weekly',
          count: weeklyCount,
          limit: conditions.maxTransactionsPerWeek,
        });
      }
    }

    // Custom window
    if (conditions.windowMinutes) {
      const windowStart = new Date(
        now.getTime() - conditions.windowMinutes * 60 * 1000
      );
      const windowCount = await countTransactions(accountId, windowStart, now);

      // Estimate max based on daily rate scaled to window
      const estimatedMax = Math.ceil(
        (conditions.maxTransactionsPerDay ?? 100) *
          (conditions.windowMinutes / (24 * 60))
      );

      if (windowCount >= estimatedMax) {
        results.push({
          metric: `${conditions.windowMinutes}min`,
          count: windowCount,
          limit: estimatedMax,
        });
      }
    }

    if (results.length === 0) {
      return { triggered: false };
    }

    // Calculate severity score based on how much limits are exceeded
    const maxExcess = Math.max(
      ...results.map((r) => (r.count - r.limit) / r.limit)
    );
    const score = Math.min(100, Math.round(50 + maxExcess * 50));

    return {
      triggered: true,
      score,
      matchDetails: {
        ruleType: 'VELOCITY_LIMIT',
        matchedConditions: results.map((r) => `${r.metric}_limit_exceeded`),
        values: {
          violations: results,
          accountId,
          evaluatedAt: now.toISOString(),
        },
        timestamp: now.toISOString(),
      },
      evidence: {
        accounts: [
          {
            accountId,
            matchType: 'velocity_violation',
          },
        ],
      },
    };
  },
};

async function countTransactions(
  accountId: string,
  startTime: Date,
  endTime: Date
): Promise<number> {
  // Count from PaymentGraphEdge (populated by account scanner)
  const count = await prisma.paymentGraphEdge.count({
    where: {
      OR: [{ fromAccount: accountId }, { toAccount: accountId }],
      timestamp: {
        gte: startTime,
        lte: endTime,
      },
    },
  });

  return count;
}

export default velocityEvaluator;
