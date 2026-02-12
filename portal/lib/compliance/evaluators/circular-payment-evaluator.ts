import { prisma } from '@/lib/prisma';
import type { ComplianceRule } from '@prisma/client';
import type {
  RuleEvaluator,
  EvaluationContext,
  EvaluationResult,
} from '../rules-engine';
import type { CircularPaymentConditions } from '../types';

interface GraphEdge {
  from: string;
  to: string;
  amount: number;
  timestamp: Date;
  txHash: string;
}

interface DetectedCycle {
  path: string[];
  edges: GraphEdge[];
  totalValue: number;
  timeSpan: number; // seconds
}

export const circularPaymentEvaluator: RuleEvaluator = {
  ruleType: 'CIRCULAR_PAYMENT',

  async evaluate(
    rule: ComplianceRule,
    context: EvaluationContext
  ): Promise<EvaluationResult> {
    const conditions = rule.conditions as CircularPaymentConditions;
    const accountId = context.transaction?.sourceAccount ?? context.account;

    if (!accountId) {
      return { triggered: false };
    }

    const minHops = conditions.minHops ?? 2;
    const maxHops = conditions.maxHops ?? 5;
    const timeWindowMinutes = conditions.timeWindowMinutes ?? 60;
    const minAmount = conditions.minAmount ?? 1000;

    // Build payment graph from recent transactions
    const windowStart = new Date(Date.now() - timeWindowMinutes * 60 * 1000);

    const edges = await prisma.paymentGraphEdge.findMany({
      where: {
        timestamp: { gte: windowStart },
        amount: { gte: minAmount },
      },
      orderBy: { timestamp: 'asc' },
    });

    // Build adjacency list
    const graph = buildGraph(edges);

    // Run DFS to detect cycles starting from the account
    const cycles = detectCycles(graph, accountId, minHops, maxHops);

    if (cycles.length === 0) {
      return { triggered: false };
    }

    // Calculate risk score based on cycle characteristics
    const mostSuspicious = cycles.reduce((best, cycle) => {
      const cycleScore = calculateCycleScore(cycle);
      const bestScore = calculateCycleScore(best);
      return cycleScore > bestScore ? cycle : best;
    });

    const score = calculateCycleScore(mostSuspicious);

    // Store detected cycle in database
    await prisma.paymentCycle.create({
      data: {
        accounts: mostSuspicious.path,
        hopCount: mostSuspicious.path.length - 1,
        totalValue: mostSuspicious.totalValue,
        timeSpan: mostSuspicious.timeSpan,
        riskScore: score,
        patternType: categorizePattern(mostSuspicious),
        organizationId: context.organizationId,
      },
    });

    return {
      triggered: true,
      score,
      matchDetails: {
        ruleType: 'CIRCULAR_PAYMENT',
        matchedConditions: ['cycle_detected'],
        values: {
          cycleCount: cycles.length,
          primaryCycle: {
            path: mostSuspicious.path,
            hops: mostSuspicious.path.length - 1,
            totalValue: mostSuspicious.totalValue,
            timeSpanSeconds: mostSuspicious.timeSpan,
            pattern: categorizePattern(mostSuspicious),
          },
        },
        timestamp: new Date().toISOString(),
      },
      evidence: {
        cycle: {
          path: mostSuspicious.path,
          totalValue: mostSuspicious.totalValue.toString(),
          timeSpan: mostSuspicious.timeSpan,
        },
        transactions: mostSuspicious.edges.map((e) => ({
          hash: e.txHash,
          timestamp: e.timestamp.toISOString(),
          amount: e.amount.toString(),
          assetCode: 'XLM',
          from: e.from,
          to: e.to,
        })),
        accounts: mostSuspicious.path.map((id, i) => ({
          accountId: id,
          matchType: i === 0 ? 'cycle_origin' : `hop_${i}`,
        })),
      },
    };
  },
};

function buildGraph(edges: Array<{
  fromAccount: string;
  toAccount: string;
  amount: unknown;
  timestamp: Date;
  transactionHash: string;
}>): Map<string, GraphEdge[]> {
  const graph = new Map<string, GraphEdge[]>();

  for (const edge of edges) {
    const from = edge.fromAccount;
    if (!graph.has(from)) {
      graph.set(from, []);
    }
    graph.get(from)!.push({
      from: edge.fromAccount,
      to: edge.toAccount,
      amount: Number(edge.amount),
      timestamp: edge.timestamp,
      txHash: edge.transactionHash,
    });
  }

  return graph;
}

function detectCycles(
  graph: Map<string, GraphEdge[]>,
  startAccount: string,
  minHops: number,
  maxHops: number
): DetectedCycle[] {
  const cycles: DetectedCycle[] = [];
  const visited = new Set<string>();
  const path: string[] = [];
  const pathEdges: GraphEdge[] = [];

  function dfs(current: string, depth: number): void {
    if (depth > maxHops) return;

    // Found a cycle back to start
    if (current === startAccount && depth >= minHops) {
      const totalValue = pathEdges.reduce((sum, e) => sum + e.amount, 0);
      const timestamps = pathEdges.map((e) => e.timestamp.getTime());
      const timeSpan = (Math.max(...timestamps) - Math.min(...timestamps)) / 1000;

      cycles.push({
        path: [...path, current],
        edges: [...pathEdges],
        totalValue,
        timeSpan,
      });
      return;
    }

    // Avoid visiting same node twice in one path (except return to start)
    if (visited.has(current) && current !== startAccount) return;

    visited.add(current);
    path.push(current);

    const neighbors = graph.get(current) || [];
    for (const edge of neighbors) {
      pathEdges.push(edge);
      dfs(edge.to, depth + 1);
      pathEdges.pop();
    }

    path.pop();
    visited.delete(current);
  }

  dfs(startAccount, 0);
  return cycles;
}

function calculateCycleScore(cycle: DetectedCycle): number {
  let score = 50; // Base score

  // More hops = more suspicious
  if (cycle.path.length > 3) score += 10;
  if (cycle.path.length > 4) score += 10;

  // Faster cycle = more suspicious
  const minutesPerHop = cycle.timeSpan / 60 / (cycle.path.length - 1);
  if (minutesPerHop < 5) score += 20;
  else if (minutesPerHop < 15) score += 10;

  // Higher value = more significant
  if (cycle.totalValue > 100000) score += 15;
  else if (cycle.totalValue > 10000) score += 10;
  else if (cycle.totalValue > 1000) score += 5;

  return Math.min(100, score);
}

function categorizePattern(cycle: DetectedCycle): string {
  const hops = cycle.path.length - 1;
  const minutesPerHop = cycle.timeSpan / 60 / hops;

  if (hops === 2 && minutesPerHop < 5) {
    return 'RAPID_ROUND_TRIP';
  }
  if (hops >= 4 && minutesPerHop < 10) {
    return 'LAYERING';
  }
  if (minutesPerHop > 30) {
    return 'SLOW_CYCLE';
  }
  return 'CIRCULAR';
}

export default circularPaymentEvaluator;
