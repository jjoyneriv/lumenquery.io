import { prisma } from '@/lib/prisma';
import type { ComplianceRule } from '@prisma/client';
import type {
  RuleEvaluator,
  EvaluationContext,
  EvaluationResult,
} from '../rules-engine';
import type { StructuringConditions } from '../types';

export const structuringEvaluator: RuleEvaluator = {
  ruleType: 'STRUCTURING',

  async evaluate(
    rule: ComplianceRule,
    context: EvaluationContext
  ): Promise<EvaluationResult> {
    const conditions = rule.conditions as StructuringConditions;
    const accountId = context.transaction?.sourceAccount ?? context.account;

    if (!accountId) {
      return { triggered: false };
    }

    const threshold = conditions.reportingThreshold ?? 10000;
    const windowHours = conditions.windowHours ?? 24;
    const minTxCount = conditions.minTransactionCount ?? 3;
    const belowThresholdPercent = conditions.amountBelowThresholdPercent ?? 90;

    const windowStart = new Date(Date.now() - windowHours * 60 * 60 * 1000);

    // Get all transactions in window
    const transactions = await prisma.paymentGraphEdge.findMany({
      where: {
        fromAccount: accountId,
        timestamp: { gte: windowStart },
      },
      orderBy: { timestamp: 'asc' },
    });

    if (transactions.length < minTxCount) {
      return { triggered: false };
    }

    // Analyze structuring patterns
    const amounts = transactions.map((t) => Number(t.amount));
    const totalAmount = amounts.reduce((sum, a) => sum + a, 0);

    // Check if total would exceed threshold
    if (totalAmount < threshold) {
      return { triggered: false };
    }

    // Check how many transactions are just below threshold
    const thresholdCeiling = threshold * (belowThresholdPercent / 100);
    const justBelowThreshold = amounts.filter(
      (a) => a >= thresholdCeiling * 0.8 && a < thresholdCeiling
    ).length;

    // Calculate structuring indicators
    const indicators = {
      multipleTxJustBelowThreshold: justBelowThreshold >= 2,
      totalExceedsThreshold: totalAmount >= threshold,
      shortTimeWindow:
        transactions.length > 1 &&
        (transactions[transactions.length - 1].timestamp.getTime() -
          transactions[0].timestamp.getTime()) /
          3600000 <
          windowHours / 2,
      similarAmounts: checkSimilarAmounts(amounts),
      uniqueDestinations: new Set(transactions.map((t) => t.toAccount)).size < transactions.length * 0.5,
    };

    const indicatorCount = Object.values(indicators).filter(Boolean).length;

    if (indicatorCount < 2) {
      return { triggered: false };
    }

    // Calculate score based on indicators
    const score = Math.min(100, 30 + indicatorCount * 15);

    return {
      triggered: true,
      score,
      matchDetails: {
        ruleType: 'STRUCTURING',
        matchedConditions: Object.entries(indicators)
          .filter(([, v]) => v)
          .map(([k]) => k),
        values: {
          accountId,
          threshold,
          transactionCount: transactions.length,
          totalAmount,
          justBelowThresholdCount: justBelowThreshold,
          indicators,
          windowHours,
          evaluatedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      },
      evidence: {
        accounts: [
          {
            accountId,
            matchType: 'structuring_suspect',
            riskScore: score,
          },
        ],
        transactions: transactions.map((t) => ({
          hash: t.transactionHash,
          timestamp: t.timestamp.toISOString(),
          amount: t.amount.toString(),
          assetCode: t.assetCode,
          from: t.fromAccount,
          to: t.toAccount,
        })),
      },
    };
  },
};

function checkSimilarAmounts(amounts: number[]): boolean {
  if (amounts.length < 2) return false;

  const avg = amounts.reduce((a, b) => a + b, 0) / amounts.length;
  const variance =
    amounts.reduce((sum, a) => sum + Math.pow(a - avg, 2), 0) / amounts.length;
  const stdDev = Math.sqrt(variance);
  const coefficientOfVariation = stdDev / avg;

  // Low variation suggests intentionally similar amounts
  return coefficientOfVariation < 0.2;
}

export default structuringEvaluator;
