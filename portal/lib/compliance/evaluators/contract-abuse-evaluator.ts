import { prisma } from '@/lib/prisma';
import type { ComplianceRule } from '@prisma/client';
import type {
  RuleEvaluator,
  EvaluationContext,
  EvaluationResult,
} from '../rules-engine';
import type { ContractAbuseConditions } from '../types';

interface ContractAnalysis {
  contractId: string;
  totalCalls: number;
  failedCalls: number;
  failureRate: number;
  avgGas: number;
  maxGas: number;
  uniqueCallers: number;
  callsLastHour: number;
}

export const contractAbuseEvaluator: RuleEvaluator = {
  ruleType: 'CONTRACT_ABUSE',

  async evaluate(
    rule: ComplianceRule,
    context: EvaluationContext
  ): Promise<EvaluationResult> {
    const conditions = rule.conditions as ContractAbuseConditions;

    // Get contracts to analyze
    let contractIds: string[] = [];

    if (context.contracts?.length) {
      contractIds = context.contracts;
    } else if (conditions.monitoredContracts?.length) {
      contractIds = conditions.monitoredContracts;
    } else {
      return { triggered: false };
    }

    const maxGasPerCall = conditions.maxGasPerCall ?? 10000000;
    const maxFailureRate = conditions.maxFailureRate ?? 50;
    const maxCallsPerHour = conditions.maxCallsPerHour ?? 1000;

    const abusiveContracts: ContractAnalysis[] = [];

    for (const contractId of contractIds) {
      const analysis = await analyzeContract(contractId);

      if (!analysis) continue;

      const issues: string[] = [];

      // Check gas abuse
      if (analysis.maxGas > maxGasPerCall) {
        issues.push(`High gas usage (${analysis.maxGas})`);
      }

      // Check failure rate
      if (analysis.failureRate > maxFailureRate) {
        issues.push(`High failure rate (${analysis.failureRate.toFixed(1)}%)`);
      }

      // Check call frequency
      if (analysis.callsLastHour > maxCallsPerHour) {
        issues.push(`High call frequency (${analysis.callsLastHour}/hour)`);
      }

      if (issues.length > 0) {
        abusiveContracts.push(analysis);
      }
    }

    if (abusiveContracts.length === 0) {
      return { triggered: false };
    }

    // Calculate severity score
    const mostAbusive = abusiveContracts.reduce((worst, current) => {
      const currentScore =
        (current.failureRate / maxFailureRate) * 30 +
        (current.callsLastHour / maxCallsPerHour) * 40 +
        (current.maxGas / maxGasPerCall) * 30;
      const worstScore =
        (worst.failureRate / maxFailureRate) * 30 +
        (worst.callsLastHour / maxCallsPerHour) * 40 +
        (worst.maxGas / maxGasPerCall) * 30;
      return currentScore > worstScore ? current : worst;
    });

    const score = Math.min(
      100,
      Math.round(
        40 +
          (mostAbusive.failureRate / maxFailureRate) * 20 +
          (mostAbusive.callsLastHour / maxCallsPerHour) * 20 +
          abusiveContracts.length * 5
      )
    );

    return {
      triggered: true,
      score,
      matchDetails: {
        ruleType: 'CONTRACT_ABUSE',
        matchedConditions: abusiveContracts.map(
          (c) => `contract_${c.contractId.slice(0, 8)}_abuse`
        ),
        values: {
          abusiveContractCount: abusiveContracts.length,
          contracts: abusiveContracts,
          thresholds: {
            maxGasPerCall,
            maxFailureRate,
            maxCallsPerHour,
          },
          evaluatedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      },
      evidence: {
        accounts: abusiveContracts.map((c) => ({
          accountId: c.contractId,
          matchType: 'contract_abuse',
          riskScore: Math.round(
            (c.failureRate / maxFailureRate +
              c.callsLastHour / maxCallsPerHour) *
              50
          ),
        })),
      },
    };
  },
};

async function analyzeContract(
  contractId: string
): Promise<ContractAnalysis | null> {
  const contract = await prisma.contract.findUnique({
    where: { contractId },
    include: {
      calls: {
        where: {
          timestamp: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24h
          },
        },
        orderBy: { timestamp: 'desc' },
        take: 1000,
      },
    },
  });

  if (!contract || contract.calls.length === 0) {
    return null;
  }

  const calls = contract.calls;
  const totalCalls = calls.length;
  const failedCalls = calls.filter((c) => c.status === 'failed').length;
  const failureRate = (failedCalls / totalCalls) * 100;

  const gasValues = calls
    .map((c) => (c.gasUsed ? Number(c.gasUsed) : 0))
    .filter((g) => g > 0);
  const avgGas =
    gasValues.length > 0
      ? gasValues.reduce((a, b) => a + b, 0) / gasValues.length
      : 0;
  const maxGas = gasValues.length > 0 ? Math.max(...gasValues) : 0;

  // Unique callers (from transaction hashes, need to look up)
  const uniqueTxHashes = new Set(calls.map((c) => c.txHash));

  // Calls in last hour
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const callsLastHour = calls.filter((c) => c.timestamp >= hourAgo).length;

  return {
    contractId,
    totalCalls,
    failedCalls,
    failureRate,
    avgGas,
    maxGas,
    uniqueCallers: uniqueTxHashes.size, // Approximation
    callsLastHour,
  };
}

export default contractAbuseEvaluator;
