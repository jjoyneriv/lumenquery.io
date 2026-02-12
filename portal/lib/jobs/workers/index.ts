import { jobQueue } from '../queue';
import { accountScanWorker } from './account-scan-worker';
import { sanctionsSyncWorker } from './sanctions-sync-worker';
import { riskAssessmentWorker } from './risk-assessment-worker';

// Register all workers with the job queue
export function registerWorkers(): void {
  jobQueue.registerWorker(accountScanWorker);
  jobQueue.registerWorker(sanctionsSyncWorker);
  jobQueue.registerWorker(riskAssessmentWorker);
  // Additional workers can be added here
}

export {
  accountScanWorker,
  sanctionsSyncWorker,
  riskAssessmentWorker,
};
