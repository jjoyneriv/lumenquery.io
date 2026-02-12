import { prisma } from '@/lib/prisma';
import type { ComplianceRule } from '@prisma/client';
import type {
  RuleEvaluator,
  EvaluationContext,
  EvaluationResult,
} from '../rules-engine';
import type { MixerConditions } from '../types';

interface MixerPattern {
  type: 'PEEL_CHAIN' | 'EQUAL_SPLITS' | 'TIME_DELAYED' | 'KNOWN_MIXER';
  confidence: number;
  details: Record<string, unknown>;
}

export const mixerEvaluator: RuleEvaluator = {
  ruleType: 'MIXER_DETECTION',

  async evaluate(
    rule: ComplianceRule,
    context: EvaluationContext
  ): Promise<EvaluationResult> {
    const conditions = rule.conditions as MixerConditions;
    const accountId = context.transaction?.sourceAccount ?? context.account;

    if (!accountId) {
      return { triggered: false };
    }

    const detectedPatterns: MixerPattern[] = [];

    // Check against known mixer addresses
    if (conditions.knownMixerAddresses?.length) {
      const knownMatch = await checkKnownMixers(
        accountId,
        conditions.knownMixerAddresses
      );
      if (knownMatch) {
        detectedPatterns.push(knownMatch);
      }
    }

    // Detect peel chain pattern
    if (conditions.detectPeelChains !== false) {
      const peelChain = await detectPeelChain(accountId);
      if (peelChain) {
        detectedPatterns.push(peelChain);
      }
    }

    // Detect equal split pattern
    if (conditions.detectEqualSplits !== false) {
      const equalSplits = await detectEqualSplits(
        accountId,
        conditions.splitRatioTolerance ?? 0.1
      );
      if (equalSplits) {
        detectedPatterns.push(equalSplits);
      }
    }

    // Detect time-delayed forwarding
    if (conditions.detectTimeDelayed !== false) {
      const timeDelayed = await detectTimeDelayedForwarding(accountId);
      if (timeDelayed) {
        detectedPatterns.push(timeDelayed);
      }
    }

    if (detectedPatterns.length === 0) {
      return { triggered: false };
    }

    // Calculate score based on patterns detected
    const maxConfidence = Math.max(...detectedPatterns.map((p) => p.confidence));
    const score = Math.min(100, Math.round(maxConfidence));

    return {
      triggered: true,
      score,
      matchDetails: {
        ruleType: 'MIXER_DETECTION',
        matchedConditions: detectedPatterns.map((p) => p.type),
        values: {
          patterns: detectedPatterns,
          accountId,
          evaluatedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      },
      evidence: {
        accounts: [
          {
            accountId,
            matchType: 'mixer_pattern',
            riskScore: score,
          },
        ],
      },
    };
  },
};

async function checkKnownMixers(
  accountId: string,
  knownMixers: string[]
): Promise<MixerPattern | null> {
  // Check if account has interacted with known mixers
  const interactions = await prisma.paymentGraphEdge.findMany({
    where: {
      OR: [
        { fromAccount: accountId, toAccount: { in: knownMixers } },
        { fromAccount: { in: knownMixers }, toAccount: accountId },
      ],
      timestamp: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    },
  });

  if (interactions.length === 0) return null;

  return {
    type: 'KNOWN_MIXER',
    confidence: 95,
    details: {
      interactionCount: interactions.length,
      mixerAddresses: [...new Set(interactions.map((i) =>
        i.fromAccount === accountId ? i.toAccount : i.fromAccount
      ))],
      totalVolume: interactions.reduce(
        (sum, i) => sum + Number(i.amount),
        0
      ),
    },
  };
}

async function detectPeelChain(accountId: string): Promise<MixerPattern | null> {
  // Peel chain: Account receives large sum, then sends many smaller amounts
  // that together roughly equal the received amount

  const inbound = await prisma.paymentGraphEdge.findMany({
    where: {
      toAccount: accountId,
      timestamp: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours
      },
    },
    orderBy: { amount: 'desc' },
    take: 5,
  });

  if (inbound.length === 0) return null;

  const largestInbound = Number(inbound[0].amount);

  // Find outbound transactions after the large inbound
  const outbound = await prisma.paymentGraphEdge.findMany({
    where: {
      fromAccount: accountId,
      timestamp: {
        gte: inbound[0].timestamp,
      },
    },
    orderBy: { timestamp: 'asc' },
  });

  if (outbound.length < 3) return null;

  // Check if outbound sums to roughly the inbound amount
  const totalOutbound = outbound.reduce((sum, o) => sum + Number(o.amount), 0);
  const ratio = totalOutbound / largestInbound;

  if (ratio < 0.8 || ratio > 1.2) return null;

  // Check if outputs are going to unique destinations
  const uniqueDestinations = new Set(outbound.map((o) => o.toAccount));

  if (uniqueDestinations.size < 3) return null;

  const confidence = Math.min(
    90,
    50 + uniqueDestinations.size * 5 + (ratio > 0.9 && ratio < 1.1 ? 20 : 10)
  );

  return {
    type: 'PEEL_CHAIN',
    confidence,
    details: {
      inboundAmount: largestInbound,
      outboundTotal: totalOutbound,
      outputCount: outbound.length,
      uniqueDestinations: uniqueDestinations.size,
      timeSpanMinutes: (
        (outbound[outbound.length - 1].timestamp.getTime() -
          inbound[0].timestamp.getTime()) /
        60000
      ).toFixed(1),
    },
  };
}

async function detectEqualSplits(
  accountId: string,
  tolerance: number
): Promise<MixerPattern | null> {
  // Equal splits: Multiple outputs of nearly equal amounts

  const outbound = await prisma.paymentGraphEdge.findMany({
    where: {
      fromAccount: accountId,
      timestamp: {
        gte: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour
      },
    },
    orderBy: { timestamp: 'asc' },
  });

  if (outbound.length < 3) return null;

  // Group by approximate amounts
  const amounts = outbound.map((o) => Number(o.amount));
  const avgAmount = amounts.reduce((a, b) => a + b, 0) / amounts.length;

  // Count how many are within tolerance of average
  const withinTolerance = amounts.filter(
    (a) => Math.abs(a - avgAmount) / avgAmount <= tolerance
  ).length;

  const equalRatio = withinTolerance / amounts.length;

  if (equalRatio < 0.7) return null;

  const confidence = Math.min(85, 50 + equalRatio * 30 + (amounts.length > 5 ? 10 : 0));

  return {
    type: 'EQUAL_SPLITS',
    confidence,
    details: {
      outputCount: outbound.length,
      averageAmount: avgAmount,
      equalOutputs: withinTolerance,
      equalRatio: (equalRatio * 100).toFixed(1) + '%',
      uniqueDestinations: new Set(outbound.map((o) => o.toAccount)).size,
    },
  };
}

async function detectTimeDelayedForwarding(
  accountId: string
): Promise<MixerPattern | null> {
  // Time-delayed: Receives funds, holds briefly, then forwards to new address
  // Suspicious if pattern repeats

  const transactions = await prisma.paymentGraphEdge.findMany({
    where: {
      OR: [{ fromAccount: accountId }, { toAccount: accountId }],
      timestamp: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    },
    orderBy: { timestamp: 'asc' },
  });

  if (transactions.length < 4) return null;

  // Look for receive-then-send patterns
  const patterns: Array<{ delay: number; ratio: number }> = [];

  let lastReceive: { amount: number; timestamp: Date } | null = null;

  for (const tx of transactions) {
    if (tx.toAccount === accountId) {
      lastReceive = {
        amount: Number(tx.amount),
        timestamp: tx.timestamp,
      };
    } else if (tx.fromAccount === accountId && lastReceive) {
      const delay = tx.timestamp.getTime() - lastReceive.timestamp.getTime();
      const ratio = Number(tx.amount) / lastReceive.amount;

      // Suspicious: 5-60 min delay, forwards 80-100% of received
      if (delay > 5 * 60 * 1000 && delay < 60 * 60 * 1000 && ratio > 0.8 && ratio <= 1) {
        patterns.push({
          delay: delay / 60000,
          ratio,
        });
      }
      lastReceive = null;
    }
  }

  if (patterns.length < 2) return null;

  const confidence = Math.min(80, 40 + patterns.length * 15);

  return {
    type: 'TIME_DELAYED',
    confidence,
    details: {
      patternCount: patterns.length,
      avgDelayMinutes: (
        patterns.reduce((sum, p) => sum + p.delay, 0) / patterns.length
      ).toFixed(1),
      avgForwardRatio:
        (
          (patterns.reduce((sum, p) => sum + p.ratio, 0) / patterns.length) *
          100
        ).toFixed(1) + '%',
    },
  };
}

export default mixerEvaluator;
