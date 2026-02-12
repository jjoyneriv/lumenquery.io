import { prisma } from '@/lib/prisma';
import type { ComplianceRule } from '@prisma/client';
import type {
  RuleEvaluator,
  EvaluationContext,
  EvaluationResult,
} from '../rules-engine';
import type { PatternConditions } from '../types';

interface AnomalyResult {
  metric: string;
  baseline: number;
  actual: number;
  deviation: number; // Standard deviations from mean
  isAnomaly: boolean;
}

export const patternEvaluator: RuleEvaluator = {
  ruleType: 'UNUSUAL_PATTERN',

  async evaluate(
    rule: ComplianceRule,
    context: EvaluationContext
  ): Promise<EvaluationResult> {
    const conditions = rule.conditions as PatternConditions;
    const accountId = context.transaction?.sourceAccount ?? context.account;

    if (!accountId) {
      return { triggered: false };
    }

    const anomalyThreshold = conditions.anomalyThreshold ?? 2; // Standard deviations
    const baselineDays = conditions.baselineDays ?? 30;
    const metricsToCheck = conditions.metrics ?? [
      'velocity',
      'volume',
      'timing',
      'counterparties',
    ];

    // Get account profile for baseline
    const profile = await prisma.accountProfile.findUnique({
      where: { accountId },
    });

    if (!profile) {
      return { triggered: false };
    }

    const anomalies: AnomalyResult[] = [];

    // Check velocity anomaly
    if (metricsToCheck.includes('velocity')) {
      const velocityAnomaly = await checkVelocityAnomaly(
        accountId,
        profile.avgTxPerDay,
        anomalyThreshold,
        baselineDays
      );
      if (velocityAnomaly.isAnomaly) {
        anomalies.push(velocityAnomaly);
      }
    }

    // Check volume anomaly
    if (metricsToCheck.includes('volume')) {
      const volumeAnomaly = await checkVolumeAnomaly(
        accountId,
        Number(profile.avgTransactionSize),
        anomalyThreshold,
        baselineDays
      );
      if (volumeAnomaly.isAnomaly) {
        anomalies.push(volumeAnomaly);
      }
    }

    // Check timing anomaly
    if (metricsToCheck.includes('timing') && profile.peakHour !== null) {
      const timingAnomaly = await checkTimingAnomaly(
        accountId,
        profile.peakHour,
        anomalyThreshold
      );
      if (timingAnomaly.isAnomaly) {
        anomalies.push(timingAnomaly);
      }
    }

    // Check counterparty anomaly
    if (metricsToCheck.includes('counterparties')) {
      const counterpartyAnomaly = await checkCounterpartyAnomaly(
        accountId,
        profile.uniqueCounterparties,
        anomalyThreshold,
        baselineDays
      );
      if (counterpartyAnomaly.isAnomaly) {
        anomalies.push(counterpartyAnomaly);
      }
    }

    if (anomalies.length === 0) {
      return { triggered: false };
    }

    // Calculate score based on anomaly severity
    const maxDeviation = Math.max(...anomalies.map((a) => a.deviation));
    const score = Math.min(
      100,
      Math.round(40 + maxDeviation * 15 + anomalies.length * 10)
    );

    return {
      triggered: true,
      score,
      matchDetails: {
        ruleType: 'UNUSUAL_PATTERN',
        matchedConditions: anomalies.map((a) => `${a.metric}_anomaly`),
        values: {
          accountId,
          anomalies,
          threshold: anomalyThreshold,
          baselineDays,
          evaluatedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      },
      evidence: {
        pattern: anomalies[0]
          ? {
              metric: anomalies[0].metric,
              baseline: anomalies[0].baseline,
              actual: anomalies[0].actual,
              deviation: anomalies[0].deviation,
            }
          : undefined,
        accounts: [
          {
            accountId,
            riskScore: score,
            matchType: 'behavioral_anomaly',
          },
        ],
      },
    };
  },
};

async function checkVelocityAnomaly(
  accountId: string,
  baselineAvgPerDay: number,
  threshold: number,
  baselineDays: number
): Promise<AnomalyResult> {
  // Get today's transaction count
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayCount = await prisma.paymentGraphEdge.count({
    where: {
      OR: [{ fromAccount: accountId }, { toAccount: accountId }],
      timestamp: { gte: today },
    },
  });

  // Calculate historical standard deviation
  const historicalCounts: number[] = [];
  for (let i = 1; i <= baselineDays; i++) {
    const dayStart = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

    const count = await prisma.paymentGraphEdge.count({
      where: {
        OR: [{ fromAccount: accountId }, { toAccount: accountId }],
        timestamp: { gte: dayStart, lt: dayEnd },
      },
    });
    historicalCounts.push(count);
  }

  const mean =
    historicalCounts.reduce((a, b) => a + b, 0) / historicalCounts.length || baselineAvgPerDay;
  const variance =
    historicalCounts.reduce((sum, c) => sum + Math.pow(c - mean, 2), 0) /
    historicalCounts.length;
  const stdDev = Math.sqrt(variance) || 1;

  const deviation = (todayCount - mean) / stdDev;

  return {
    metric: 'velocity',
    baseline: mean,
    actual: todayCount,
    deviation: Math.abs(deviation),
    isAnomaly: Math.abs(deviation) > threshold,
  };
}

async function checkVolumeAnomaly(
  accountId: string,
  baselineAvgSize: number,
  threshold: number,
  baselineDays: number
): Promise<AnomalyResult> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get recent transactions
  const recentTx = await prisma.paymentGraphEdge.findMany({
    where: {
      fromAccount: accountId,
      timestamp: { gte: today },
    },
    select: { amount: true },
  });

  if (recentTx.length === 0) {
    return {
      metric: 'volume',
      baseline: baselineAvgSize,
      actual: 0,
      deviation: 0,
      isAnomaly: false,
    };
  }

  const todayAvg =
    recentTx.reduce((sum, t) => sum + Number(t.amount), 0) / recentTx.length;

  // Get historical averages for comparison
  const baselineStart = new Date(
    today.getTime() - baselineDays * 24 * 60 * 60 * 1000
  );
  const historicalTx = await prisma.paymentGraphEdge.findMany({
    where: {
      fromAccount: accountId,
      timestamp: { gte: baselineStart, lt: today },
    },
    select: { amount: true },
  });

  if (historicalTx.length === 0) {
    return {
      metric: 'volume',
      baseline: baselineAvgSize,
      actual: todayAvg,
      deviation: 0,
      isAnomaly: false,
    };
  }

  const historicalAmounts = historicalTx.map((t) => Number(t.amount));
  const mean =
    historicalAmounts.reduce((a, b) => a + b, 0) / historicalAmounts.length;
  const variance =
    historicalAmounts.reduce((sum, a) => sum + Math.pow(a - mean, 2), 0) /
    historicalAmounts.length;
  const stdDev = Math.sqrt(variance) || 1;

  const deviation = (todayAvg - mean) / stdDev;

  return {
    metric: 'volume',
    baseline: mean,
    actual: todayAvg,
    deviation: Math.abs(deviation),
    isAnomaly: Math.abs(deviation) > threshold,
  };
}

async function checkTimingAnomaly(
  accountId: string,
  normalPeakHour: number,
  threshold: number
): Promise<AnomalyResult> {
  const now = new Date();
  const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  const recentTx = await prisma.paymentGraphEdge.count({
    where: {
      fromAccount: accountId,
      timestamp: { gte: hourAgo },
    },
  });

  // If there's activity in the current hour
  const currentHour = now.getHours();
  const hourDiff = Math.min(
    Math.abs(currentHour - normalPeakHour),
    24 - Math.abs(currentHour - normalPeakHour)
  );

  // Activity far from peak hour is anomalous
  const deviation = recentTx > 0 ? hourDiff / 4 : 0; // Normalize to ~0-3 range

  return {
    metric: 'timing',
    baseline: normalPeakHour,
    actual: currentHour,
    deviation,
    isAnomaly: recentTx > 2 && deviation > threshold,
  };
}

async function checkCounterpartyAnomaly(
  accountId: string,
  baselineUniqueCount: number,
  threshold: number,
  baselineDays: number
): Promise<AnomalyResult> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get today's unique counterparties
  const todayTx = await prisma.paymentGraphEdge.findMany({
    where: {
      OR: [{ fromAccount: accountId }, { toAccount: accountId }],
      timestamp: { gte: today },
    },
    select: { fromAccount: true, toAccount: true },
  });

  const todayCounterparties = new Set<string>();
  for (const tx of todayTx) {
    if (tx.fromAccount !== accountId) todayCounterparties.add(tx.fromAccount);
    if (tx.toAccount !== accountId) todayCounterparties.add(tx.toAccount);
  }

  const todayCount = todayCounterparties.size;

  // Estimate daily baseline
  const avgPerDay = baselineUniqueCount / baselineDays;
  const stdDev = avgPerDay * 0.5; // Assume 50% variance

  const deviation = stdDev > 0 ? (todayCount - avgPerDay) / stdDev : 0;

  return {
    metric: 'counterparties',
    baseline: avgPerDay,
    actual: todayCount,
    deviation: Math.abs(deviation),
    isAnomaly: Math.abs(deviation) > threshold,
  };
}

export default patternEvaluator;
