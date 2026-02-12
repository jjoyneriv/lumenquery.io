import { prisma } from '@/lib/prisma';
import type { ComplianceRule } from '@prisma/client';
import type {
  RuleEvaluator,
  EvaluationContext,
  EvaluationResult,
} from '../rules-engine';
import type { SanctionsConditions } from '../types';

export const sanctionsEvaluator: RuleEvaluator = {
  ruleType: 'SANCTIONS_SCREENING',

  async evaluate(
    rule: ComplianceRule,
    context: EvaluationContext
  ): Promise<EvaluationResult> {
    const conditions = rule.conditions as SanctionsConditions;
    const accountsToCheck: string[] = [];

    // Add source account
    if (context.transaction?.sourceAccount) {
      accountsToCheck.push(context.transaction.sourceAccount);
    }

    // Add context account
    if (context.account) {
      accountsToCheck.push(context.account);
    }

    // Add counterparty if configured
    if (conditions.checkCounterparties && context.transaction?.destinationAccount) {
      accountsToCheck.push(context.transaction.destinationAccount);
    }

    if (accountsToCheck.length === 0) {
      return { triggered: false };
    }

    // Query sanctioned accounts database
    const sanctionedMatches = await prisma.sanctionedAccount.findMany({
      where: {
        accountId: {
          in: accountsToCheck,
        },
        ...(conditions.sources && {
          source: { in: conditions.sources },
        }),
      },
    });

    if (sanctionedMatches.length === 0) {
      // Check for multi-hop exposure if configured
      if (conditions.checkMultiHop) {
        const indirectMatch = await checkIndirectSanctionsExposure(
          accountsToCheck,
          conditions.sources
        );
        if (indirectMatch) {
          return indirectMatch;
        }
      }

      return { triggered: false };
    }

    // Direct sanctions match - high severity
    const primaryMatch = sanctionedMatches[0];
    const isSourceSanctioned = sanctionedMatches.some(
      (m) => m.accountId === context.transaction?.sourceAccount
    );

    const score = isSourceSanctioned ? 100 : 90; // Direct counterparty slightly lower

    return {
      triggered: true,
      score,
      matchDetails: {
        ruleType: 'SANCTIONS_SCREENING',
        matchedConditions: sanctionedMatches.map(
          (m) => `${m.source}_${m.listType}`
        ),
        values: {
          matches: sanctionedMatches.map((m) => ({
            accountId: m.accountId,
            source: m.source,
            listType: m.listType,
            name: m.name,
            country: m.country,
          })),
          evaluatedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      },
      evidence: {
        sanctions: {
          source: primaryMatch.source,
          listType: primaryMatch.listType,
          matchedEntity: primaryMatch.name ?? primaryMatch.accountId,
        },
        accounts: sanctionedMatches.map((m) => ({
          accountId: m.accountId,
          matchType: isSourceSanctioned ? 'direct_source' : 'direct_counterparty',
        })),
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

async function checkIndirectSanctionsExposure(
  accounts: string[],
  sources?: string[]
): Promise<EvaluationResult | null> {
  // Check if any of the accounts have recent transactions with sanctioned accounts
  // This is a 1-hop indirect check

  for (const accountId of accounts) {
    // Get recent counterparties
    const recentEdges = await prisma.paymentGraphEdge.findMany({
      where: {
        OR: [{ fromAccount: accountId }, { toAccount: accountId }],
        timestamp: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      },
      select: {
        fromAccount: true,
        toAccount: true,
        amount: true,
        timestamp: true,
        transactionHash: true,
      },
      take: 100,
    });

    // Extract unique counterparties
    const counterparties = new Set<string>();
    for (const edge of recentEdges) {
      if (edge.fromAccount !== accountId) counterparties.add(edge.fromAccount);
      if (edge.toAccount !== accountId) counterparties.add(edge.toAccount);
    }

    if (counterparties.size === 0) continue;

    // Check if any counterparties are sanctioned
    const sanctionedCounterparties = await prisma.sanctionedAccount.findMany({
      where: {
        accountId: { in: Array.from(counterparties) },
        ...(sources && { source: { in: sources } }),
      },
    });

    if (sanctionedCounterparties.length > 0) {
      const match = sanctionedCounterparties[0];

      return {
        triggered: true,
        score: 70, // Lower score for indirect exposure
        matchDetails: {
          ruleType: 'SANCTIONS_SCREENING',
          matchedConditions: ['indirect_exposure'],
          values: {
            accountId,
            exposureType: 'indirect_1_hop',
            sanctionedCounterparty: match.accountId,
            source: match.source,
          },
          timestamp: new Date().toISOString(),
        },
        evidence: {
          sanctions: {
            source: match.source,
            listType: match.listType,
            matchedEntity: match.name ?? match.accountId,
          },
          accounts: [
            { accountId, matchType: 'indirect_exposure' },
            { accountId: match.accountId, matchType: 'sanctioned_counterparty' },
          ],
        },
      };
    }
  }

  return null;
}

export default sanctionsEvaluator;
