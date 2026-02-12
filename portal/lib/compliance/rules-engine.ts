import { prisma } from '@/lib/prisma';
import type {
  ComplianceRule,
  ComplianceRuleType,
  AlertSeverity,
  ViolationStatus,
} from '@prisma/client';
import type {
  ViolationMatchDetails,
  ViolationEvidence,
  RuleConditions,
} from './types';
import { createAuditLog } from './audit';

// ===========================================
// Evaluator Interface
// ===========================================

export interface TransactionContext {
  hash: string;
  timestamp: Date;
  ledger: number;
  sourceAccount: string;
  destinationAccount?: string;
  amount?: string;
  assetCode?: string;
  operationType: string;
  memo?: string;
  successful: boolean;
}

export interface EvaluationContext {
  organizationId: string;
  transaction?: TransactionContext;
  account?: string;
  contracts?: string[];
  timeRange?: {
    start: Date;
    end: Date;
  };
}

export interface EvaluationResult {
  triggered: boolean;
  score?: number;
  matchDetails?: ViolationMatchDetails;
  evidence?: ViolationEvidence;
}

export interface RuleEvaluator {
  ruleType: ComplianceRuleType;
  evaluate(
    rule: ComplianceRule,
    context: EvaluationContext
  ): Promise<EvaluationResult>;
}

// ===========================================
// Rules Engine
// ===========================================

class RulesEngine {
  private evaluators: Map<ComplianceRuleType, RuleEvaluator> = new Map();

  /**
   * Register a rule evaluator
   */
  registerEvaluator(evaluator: RuleEvaluator): void {
    this.evaluators.set(evaluator.ruleType, evaluator);
  }

  /**
   * Get all registered evaluators
   */
  getEvaluators(): RuleEvaluator[] {
    return Array.from(this.evaluators.values());
  }

  /**
   * Load enabled rules for an organization
   */
  async loadRules(organizationId: string): Promise<ComplianceRule[]> {
    return prisma.complianceRule.findMany({
      where: {
        organizationId,
        enabled: true,
      },
      orderBy: {
        priority: 'desc', // Higher priority first
      },
    });
  }

  /**
   * Evaluate a transaction against all enabled rules
   */
  async evaluateTransaction(
    organizationId: string,
    transaction: TransactionContext
  ): Promise<void> {
    const rules = await this.loadRules(organizationId);
    const context: EvaluationContext = {
      organizationId,
      transaction,
    };

    for (const rule of rules) {
      await this.evaluateRule(rule, context);
    }
  }

  /**
   * Evaluate an account against all enabled rules
   */
  async evaluateAccount(
    organizationId: string,
    accountId: string
  ): Promise<void> {
    const rules = await this.loadRules(organizationId);
    const context: EvaluationContext = {
      organizationId,
      account: accountId,
    };

    for (const rule of rules) {
      if (this.isAccountBasedRule(rule.ruleType)) {
        await this.evaluateRule(rule, context);
      }
    }
  }

  /**
   * Evaluate a single rule against the context
   */
  async evaluateRule(
    rule: ComplianceRule,
    context: EvaluationContext
  ): Promise<EvaluationResult | null> {
    const evaluator = this.evaluators.get(rule.ruleType);

    if (!evaluator) {
      console.warn(`No evaluator registered for rule type: ${rule.ruleType}`);
      return null;
    }

    try {
      const result = await evaluator.evaluate(rule, context);

      if (result.triggered) {
        await this.createViolation(rule, context, result);
      }

      return result;
    } catch (error) {
      console.error(`Error evaluating rule ${rule.id}:`, error);
      return null;
    }
  }

  /**
   * Create a violation from an evaluation result
   */
  private async createViolation(
    rule: ComplianceRule,
    context: EvaluationContext,
    result: EvaluationResult
  ): Promise<void> {
    // Check for duplicate violations (same rule, same account, recent)
    const recentViolation = await prisma.complianceViolation.findFirst({
      where: {
        organizationId: context.organizationId,
        ruleId: rule.id,
        accountId: context.transaction?.sourceAccount ?? context.account ?? '',
        createdAt: {
          gte: new Date(Date.now() - 60 * 60 * 1000), // 1 hour dedup window
        },
      },
    });

    if (recentViolation) {
      // Update existing violation with new evidence if applicable
      const updatedEvidence = {
        ...(recentViolation.evidenceData as object),
        additionalMatches: [
          ...((recentViolation.evidenceData as { additionalMatches?: unknown[] })?.additionalMatches || []),
          {
            timestamp: new Date().toISOString(),
            transactionHash: context.transaction?.hash,
          },
        ],
      };
      await prisma.complianceViolation.update({
        where: { id: recentViolation.id },
        data: {
          score: Math.max(recentViolation.score, result.score ?? 0),
          evidenceData: JSON.parse(JSON.stringify(updatedEvidence)),
        },
      });
      return;
    }

    // Create new violation
    const violation = await prisma.complianceViolation.create({
      data: {
        organizationId: context.organizationId,
        ruleId: rule.id,
        severity: rule.severity,
        status: rule.requireReview ? 'PENDING' : 'CONFIRMED',
        score: result.score ?? 50,
        accountId: context.transaction?.sourceAccount ?? context.account ?? '',
        counterpartyId: context.transaction?.destinationAccount,
        transactionHash: context.transaction?.hash,
        matchDetails: result.matchDetails ? JSON.parse(JSON.stringify(result.matchDetails)) : {},
        evidenceData: result.evidence ? JSON.parse(JSON.stringify(result.evidence)) : {},
      },
    });

    // Create audit log entry
    await createAuditLog({
      organizationId: context.organizationId,
      action: 'CREATE',
      entityType: 'violation',
      entityId: violation.id,
      actorType: 'SYSTEM',
      newState: {
        ruleType: rule.ruleType,
        severity: rule.severity,
        accountId: violation.accountId,
      },
      metadata: {
        ruleId: rule.id,
        ruleName: rule.name,
        transactionHash: context.transaction?.hash,
      },
    });

    // TODO: Queue notification if configured
    // await queueViolationNotification(violation, rule);
  }

  /**
   * Check if a rule type is account-based (vs transaction-based)
   */
  private isAccountBasedRule(ruleType: ComplianceRuleType): boolean {
    return [
      'VELOCITY_LIMIT',
      'VOLUME_LIMIT',
      'UNUSUAL_PATTERN',
      'DORMANT_ACTIVATION',
    ].includes(ruleType);
  }

  /**
   * Run batch evaluation for historical data
   */
  async runBatchEvaluation(
    organizationId: string,
    options: {
      startTime?: Date;
      endTime?: Date;
      accountIds?: string[];
      ruleTypes?: ComplianceRuleType[];
    } = {}
  ): Promise<{ processed: number; violations: number }> {
    const rules = await this.loadRules(organizationId);
    const filteredRules = options.ruleTypes
      ? rules.filter((r) => options.ruleTypes!.includes(r.ruleType))
      : rules;

    let processed = 0;
    let violations = 0;

    // Get monitored accounts
    const accounts = await prisma.monitoredAccount.findMany({
      where: {
        organizationId,
        ...(options.accountIds && { accountId: { in: options.accountIds } }),
      },
    });

    for (const account of accounts) {
      const context: EvaluationContext = {
        organizationId,
        account: account.accountId,
        timeRange: {
          start: options.startTime ?? new Date(Date.now() - 24 * 60 * 60 * 1000),
          end: options.endTime ?? new Date(),
        },
      };

      for (const rule of filteredRules) {
        if (this.isAccountBasedRule(rule.ruleType)) {
          const result = await this.evaluateRule(rule, context);
          processed++;
          if (result?.triggered) violations++;
        }
      }
    }

    return { processed, violations };
  }
}

// ===========================================
// Singleton Instance
// ===========================================

export const rulesEngine = new RulesEngine();

// ===========================================
// Helper Functions
// ===========================================

/**
 * Parse rule conditions from JSON
 */
export function parseConditions<T extends RuleConditions>(
  conditions: unknown
): T {
  if (typeof conditions === 'object' && conditions !== null) {
    return conditions as T;
  }
  return {} as T;
}

/**
 * Calculate risk score based on evaluation results
 */
export function calculateRiskScore(
  baseScore: number,
  multipliers: { factor: string; value: number }[]
): number {
  let score = baseScore;
  for (const m of multipliers) {
    score *= m.value;
  }
  return Math.min(100, Math.round(score));
}

/**
 * Determine severity based on score
 */
export function scoreToseverity(score: number): AlertSeverity {
  if (score >= 80) return 'CRITICAL';
  if (score >= 50) return 'WARNING';
  return 'INFO';
}

/**
 * Check if a violation should be auto-confirmed
 */
export function shouldAutoConfirm(
  rule: ComplianceRule,
  score: number
): boolean {
  // Auto-confirm high-severity sanctions matches
  if (rule.ruleType === 'SANCTIONS_SCREENING' && score >= 90) {
    return true;
  }
  return !rule.requireReview;
}
