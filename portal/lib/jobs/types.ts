export type JobType =
  | 'SANCTIONS_SYNC'
  | 'ACCOUNT_SCAN'
  | 'CYCLE_DETECTION'
  | 'REPORT_GENERATION'
  | 'NOTIFICATION_DELIVERY'
  | 'RISK_ASSESSMENT';

export type JobStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';

export interface JobPayload {
  SANCTIONS_SYNC: {
    sources?: string[];
    fullSync?: boolean;
  };
  ACCOUNT_SCAN: {
    organizationId: string;
    accountIds?: string[];
    scanAll?: boolean;
  };
  CYCLE_DETECTION: {
    organizationId: string;
    startAccount?: string;
    maxHops?: number;
    timeWindowMinutes?: number;
  };
  REPORT_GENERATION: {
    organizationId: string;
    reportType: 'DAILY_SUMMARY' | 'WEEKLY' | 'MONTHLY' | 'SAR' | 'AUDIT';
    periodStart: string;
    periodEnd: string;
    format: 'json' | 'csv' | 'pdf';
  };
  NOTIFICATION_DELIVERY: {
    channel: 'EMAIL' | 'SLACK' | 'WEBHOOK';
    recipient: string;
    templateId: string;
    data: Record<string, unknown>;
    violationId?: string;
  };
  RISK_ASSESSMENT: {
    organizationId: string;
    accountIds?: string[];
    forceReassess?: boolean;
  };
}

export interface Job<T extends JobType = JobType> {
  id: string;
  type: T;
  payload: JobPayload[T];
  priority: number;
  status: JobStatus;
  progress: number;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
  result?: unknown;
  retryCount: number;
  maxRetries: number;
}

export interface JobWorker<T extends JobType> {
  type: T;
  process(job: Job<T>): Promise<unknown>;
  onComplete?(job: Job<T>, result: unknown): Promise<void>;
  onError?(job: Job<T>, error: Error): Promise<void>;
}

export interface ScheduledJob {
  type: JobType;
  payload: JobPayload[JobType];
  schedule: string; // Cron expression
  enabled: boolean;
  lastRun?: Date;
  nextRun?: Date;
}

export const DEFAULT_MAX_RETRIES = 3;
export const DEFAULT_PRIORITY = 50;

export const JOB_PRIORITIES = {
  LOW: 25,
  NORMAL: 50,
  HIGH: 75,
  CRITICAL: 100,
} as const;
