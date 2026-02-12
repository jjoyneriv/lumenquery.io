import { prisma } from '@/lib/prisma';
import type { Job, JobWorker } from '../types';
import { rulesEngine } from '@/lib/compliance/rules-engine';
import { registerEvaluators } from '@/lib/compliance/evaluators';

// Ensure evaluators are registered
registerEvaluators();

export const accountScanWorker: JobWorker<'ACCOUNT_SCAN'> = {
  type: 'ACCOUNT_SCAN',

  async process(job: Job<'ACCOUNT_SCAN'>): Promise<{
    scanned: number;
    violations: number;
    errors: number;
  }> {
    const { organizationId, accountIds, scanAll } = job.payload;

    // Get accounts to scan
    let accounts;
    if (accountIds?.length) {
      accounts = await prisma.monitoredAccount.findMany({
        where: {
          organizationId,
          accountId: { in: accountIds },
        },
      });
    } else if (scanAll) {
      accounts = await prisma.monitoredAccount.findMany({
        where: { organizationId },
      });
    } else {
      // Scan accounts that haven't been scanned recently
      const cutoff = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes
      accounts = await prisma.monitoredAccount.findMany({
        where: {
          organizationId,
          OR: [
            { lastActivity: null },
            { lastActivity: { lt: cutoff } },
          ],
        },
        take: 100, // Batch size
      });
    }

    let scanned = 0;
    let violations = 0;
    let errors = 0;

    for (const account of accounts) {
      try {
        // Evaluate account against all enabled rules
        await rulesEngine.evaluateAccount(organizationId, account.accountId);

        // Update last activity
        await prisma.monitoredAccount.update({
          where: { id: account.id },
          data: { lastActivity: new Date() },
        });

        scanned++;
      } catch (error) {
        console.error(`Error scanning account ${account.accountId}:`, error);
        errors++;
      }

      // Update progress
      const progress = Math.round((scanned / accounts.length) * 100);
      await updateJobProgress(job.id, progress);
    }

    // Count new violations from this scan
    const newViolations = await prisma.complianceViolation.count({
      where: {
        organizationId,
        createdAt: { gte: job.startedAt },
      },
    });
    violations = newViolations;

    return { scanned, violations, errors };
  },

  async onComplete(job, result) {
    const r = result as { scanned: number; violations: number; errors: number };
    console.log(
      `Account scan completed: ${r.scanned} scanned, ${r.violations} violations, ${r.errors} errors`
    );
  },

  async onError(job, error) {
    console.error(`Account scan failed:`, error);
  },
};

async function updateJobProgress(jobId: string, progress: number): Promise<void> {
  await prisma.backgroundJob.update({
    where: { id: jobId },
    data: { progress: Math.min(100, Math.max(0, progress)) },
  });
}

export default accountScanWorker;
