import { prisma } from '@/lib/prisma';
import type { ComplianceRule } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import type {
  RuleEvaluator,
  EvaluationContext,
  EvaluationResult,
} from '../rules-engine';
import type { VolumeConditions } from '../types';

export const volumeEvaluator: RuleEvaluator = {
  ruleType: 'VOLUME_LIMIT',

  async evaluate(
    rule: ComplianceRule,
    context: EvaluationContext
  ): Promise<EvaluationResult> {
    const conditions = rule.conditions as VolumeConditions;
    const accountId = context.transaction?.sourceAccount ?? context.account;

    if (!accountId) {
      return { triggered: false };
    }

    const now = new Date();
    const results: { metric: string; amount: number; limit: number }[] = [];

    // Check single transaction amount
    if (conditions.maxAmountPerTransaction && context.transaction?.amount) {
      const txAmount = parseFloat(context.transaction.amount);

      // Filter by asset if specified
      if (
        !conditions.assetCode ||
        conditions.assetCode === context.transaction.assetCode
      ) {
        if (txAmount >= conditions.maxAmountPerTransaction) {
          results.push({
            metric: 'single_transaction',
            amount: txAmount,
            limit: conditions.maxAmountPerTransaction,
          });
        }
      }
    }

    // Check hourly volume
    if (conditions.maxAmountPerHour) {
      const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const hourlyVolume = await sumVolume(
        accountId,
        hourAgo,
        now,
        conditions.assetCode
      );

      if (hourlyVolume >= conditions.maxAmountPerHour) {
        results.push({
          metric: 'hourly',
          amount: hourlyVolume,
          limit: conditions.maxAmountPerHour,
        });
      }
    }

    // Check daily volume
    if (conditions.maxAmountPerDay) {
      const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const dailyVolume = await sumVolume(
        accountId,
        dayAgo,
        now,
        conditions.assetCode
      );

      if (dailyVolume >= conditions.maxAmountPerDay) {
        results.push({
          metric: 'daily',
          amount: dailyVolume,
          limit: conditions.maxAmountPerDay,
        });
      }
    }

    if (results.length === 0) {
      return { triggered: false };
    }

    // Calculate severity score
    const maxExcess = Math.max(
      ...results.map((r) => (r.amount - r.limit) / r.limit)
    );
    const score = Math.min(100, Math.round(50 + maxExcess * 50));

    return {
      triggered: true,
      score,
      matchDetails: {
        ruleType: 'VOLUME_LIMIT',
        matchedConditions: results.map((r) => `${r.metric}_volume_exceeded`),
        values: {
          violations: results,
          accountId,
          assetCode: conditions.assetCode ?? 'ALL',
          evaluatedAt: now.toISOString(),
        },
        timestamp: now.toISOString(),
      },
      evidence: {
        accounts: [
          {
            accountId,
            matchType: 'volume_violation',
          },
        ],
        transactions: context.transaction
          ? [
              {
                hash: context.transaction.hash,
                timestamp: context.transaction.timestamp.toISOString(),
                amount: context.transaction.amount ?? '0',
                assetCode: context.transaction.assetCode ?? 'XLM',
                from: context.transaction.sourceAccount,
                to: context.transaction.destinationAccount ?? '',
              },
            ]
          : [],
      },
    };
  },
};

async function sumVolume(
  accountId: string,
  startTime: Date,
  endTime: Date,
  assetCode?: string
): Promise<number> {
  const result = await prisma.paymentGraphEdge.aggregate({
    where: {
      OR: [{ fromAccount: accountId }, { toAccount: accountId }],
      timestamp: {
        gte: startTime,
        lte: endTime,
      },
      ...(assetCode && { assetCode }),
    },
    _sum: {
      amount: true,
    },
  });

  return result._sum.amount
    ? Number(result._sum.amount)
    : 0;
}

export default volumeEvaluator;
