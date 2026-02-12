import { prisma } from '@/lib/prisma';
import type { Job, JobWorker } from '../types';
import type { RiskFactor } from '@/lib/compliance/types';

export const riskAssessmentWorker: JobWorker<'RISK_ASSESSMENT'> = {
  type: 'RISK_ASSESSMENT',

  async process(job: Job<'RISK_ASSESSMENT'>): Promise<{
    assessed: number;
    highRisk: number;
    errors: number;
  }> {
    const { organizationId, accountIds, forceReassess } = job.payload;

    // Get accounts to assess
    let accounts;
    if (accountIds?.length) {
      accounts = await prisma.monitoredAccount.findMany({
        where: {
          organizationId,
          accountId: { in: accountIds },
        },
      });
    } else {
      // Assess accounts that need reassessment
      const cutoff = forceReassess
        ? new Date() // All accounts
        : new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours

      accounts = await prisma.monitoredAccount.findMany({
        where: {
          organizationId,
          OR: [
            { lastAssessed: null },
            { lastAssessed: { lt: cutoff } },
          ],
        },
        take: 100,
      });
    }

    let assessed = 0;
    let highRisk = 0;
    let errors = 0;

    for (const account of accounts) {
      try {
        const assessment = await assessAccountRisk(account.accountId, organizationId);

        await prisma.monitoredAccount.update({
          where: { id: account.id },
          data: {
            riskScore: assessment.score,
            riskFactors: assessment.factors as object,
            lastAssessed: new Date(),
          },
        });

        assessed++;
        if (assessment.score >= 70) highRisk++;
      } catch (error) {
        console.error(`Error assessing ${account.accountId}:`, error);
        errors++;
      }

      // Update progress
      const progress = Math.round((assessed / accounts.length) * 100);
      await prisma.backgroundJob.update({
        where: { id: job.id },
        data: { progress },
      });
    }

    return { assessed, highRisk, errors };
  },

  async onComplete(job, result) {
    const r = result as { assessed: number; highRisk: number; errors: number };
    console.log(
      `Risk assessment completed: ${r.assessed} assessed, ${r.highRisk} high-risk`
    );
  },
};

async function assessAccountRisk(
  accountId: string,
  organizationId: string
): Promise<{ score: number; factors: RiskFactor[] }> {
  const factors: RiskFactor[] = [];

  // Factor 1: Violation history
  const violationCount = await prisma.complianceViolation.count({
    where: {
      organizationId,
      accountId,
      status: { in: ['CONFIRMED', 'ESCALATED'] },
    },
  });

  factors.push({
    factor: 'violation_history',
    weight: 0.3,
    value: Math.min(violationCount * 20, 100),
    contribution: Math.min(violationCount * 20, 100) * 0.3,
    details: `${violationCount} confirmed violations`,
  });

  // Factor 2: Sanctions exposure
  const sanctionsMatch = await prisma.sanctionedAccount.findUnique({
    where: { accountId },
  });

  if (sanctionsMatch) {
    factors.push({
      factor: 'sanctions_match',
      weight: 0.5,
      value: 100,
      contribution: 50,
      details: `Listed in ${sanctionsMatch.source}`,
    });
  } else {
    // Check indirect exposure
    const recentEdges = await prisma.paymentGraphEdge.findMany({
      where: {
        OR: [{ fromAccount: accountId }, { toAccount: accountId }],
        timestamp: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
      take: 100,
    });

    const counterparties = new Set<string>();
    for (const edge of recentEdges) {
      if (edge.fromAccount !== accountId) counterparties.add(edge.fromAccount);
      if (edge.toAccount !== accountId) counterparties.add(edge.toAccount);
    }

    if (counterparties.size > 0) {
      const sanctionedCounterparties = await prisma.sanctionedAccount.count({
        where: { accountId: { in: Array.from(counterparties) } },
      });

      factors.push({
        factor: 'indirect_sanctions_exposure',
        weight: 0.2,
        value: Math.min(sanctionedCounterparties * 30, 100),
        contribution: Math.min(sanctionedCounterparties * 30, 100) * 0.2,
        details: `${sanctionedCounterparties} sanctioned counterparties`,
      });
    }
  }

  // Factor 3: Activity patterns
  const profile = await prisma.accountProfile.findUnique({
    where: { accountId },
  });

  if (profile) {
    // High velocity can be suspicious
    const velocityScore = Math.min(profile.avgTxPerDay * 2, 50);
    factors.push({
      factor: 'activity_velocity',
      weight: 0.15,
      value: velocityScore,
      contribution: velocityScore * 0.15,
      details: `${profile.avgTxPerDay.toFixed(1)} transactions/day`,
    });

    // Account age (newer = riskier)
    if (profile.firstSeen) {
      const ageInDays =
        (Date.now() - profile.firstSeen.getTime()) / (24 * 60 * 60 * 1000);
      const ageScore = ageInDays < 30 ? 50 : ageInDays < 90 ? 25 : 0;
      factors.push({
        factor: 'account_age',
        weight: 0.1,
        value: ageScore,
        contribution: ageScore * 0.1,
        details: `${Math.floor(ageInDays)} days old`,
      });
    }
  }

  // Factor 4: Cycle involvement
  const cycleInvolvement = await prisma.paymentCycle.count({
    where: {
      organizationId,
      accounts: { has: accountId },
      status: { in: ['PENDING', 'CONFIRMED'] },
    },
  });

  if (cycleInvolvement > 0) {
    factors.push({
      factor: 'cycle_involvement',
      weight: 0.25,
      value: Math.min(cycleInvolvement * 40, 100),
      contribution: Math.min(cycleInvolvement * 40, 100) * 0.25,
      details: `Involved in ${cycleInvolvement} detected cycles`,
    });
  }

  // Calculate total score
  const score = Math.min(
    100,
    Math.round(factors.reduce((sum, f) => sum + f.contribution, 0))
  );

  return { score, factors };
}

export default riskAssessmentWorker;
