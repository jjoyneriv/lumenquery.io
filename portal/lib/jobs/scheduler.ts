import { prisma } from '@/lib/prisma';
import { jobQueue } from './queue';
import type { JobType, JobPayload, ScheduledJob } from './types';

// Simple cron parser for common patterns
function parseCron(expression: string): { next: (from: Date) => Date } {
  const parts = expression.split(' ');

  if (parts.length !== 5) {
    throw new Error('Invalid cron expression');
  }

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

  return {
    next: (from: Date) => {
      const next = new Date(from);
      next.setSeconds(0);
      next.setMilliseconds(0);

      // Simple implementation for common patterns
      if (minute === '*' && hour === '*') {
        // Every minute
        next.setMinutes(next.getMinutes() + 1);
        return next;
      }

      if (minute !== '*' && hour === '*') {
        // Every hour at specific minute
        const targetMinute = parseInt(minute);
        if (next.getMinutes() >= targetMinute) {
          next.setHours(next.getHours() + 1);
        }
        next.setMinutes(targetMinute);
        return next;
      }

      if (minute !== '*' && hour !== '*') {
        // Specific time every day
        const targetMinute = parseInt(minute);
        const targetHour = parseInt(hour);

        if (
          next.getHours() > targetHour ||
          (next.getHours() === targetHour && next.getMinutes() >= targetMinute)
        ) {
          next.setDate(next.getDate() + 1);
        }
        next.setHours(targetHour);
        next.setMinutes(targetMinute);
        return next;
      }

      // Default: next minute
      next.setMinutes(next.getMinutes() + 1);
      return next;
    },
  };
}

const DEFAULT_SCHEDULES: ScheduledJob[] = [
  {
    type: 'SANCTIONS_SYNC',
    payload: { sources: ['OFAC', 'SDN'], fullSync: false },
    schedule: '0 0 * * *', // Daily at midnight UTC
    enabled: true,
  },
  {
    type: 'ACCOUNT_SCAN',
    payload: { organizationId: '', scanAll: true }, // Will be filled per org
    schedule: '*/5 * * * *', // Every 5 minutes
    enabled: true,
  },
  {
    type: 'CYCLE_DETECTION',
    payload: { organizationId: '', maxHops: 5, timeWindowMinutes: 60 },
    schedule: '*/15 * * * *', // Every 15 minutes
    enabled: true,
  },
  {
    type: 'REPORT_GENERATION',
    payload: {
      organizationId: '',
      reportType: 'DAILY_SUMMARY',
      periodStart: '',
      periodEnd: '',
      format: 'json',
    },
    schedule: '0 6 * * *', // Daily at 6 AM UTC
    enabled: true,
  },
  {
    type: 'RISK_ASSESSMENT',
    payload: { organizationId: '', forceReassess: false },
    schedule: '0 * * * *', // Hourly
    enabled: true,
  },
];

class JobScheduler {
  private schedules: Map<string, ScheduledJob & { parsed: ReturnType<typeof parseCron> }> =
    new Map();
  private isRunning = false;
  private checkInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Load default schedules
    for (const schedule of DEFAULT_SCHEDULES) {
      this.addSchedule(`default:${schedule.type}`, schedule);
    }
  }

  /**
   * Add a scheduled job
   */
  addSchedule(id: string, schedule: ScheduledJob): void {
    try {
      const parsed = parseCron(schedule.schedule);
      this.schedules.set(id, {
        ...schedule,
        parsed,
        nextRun: parsed.next(new Date()),
      });
    } catch (error) {
      console.error(`Invalid cron expression for ${id}: ${schedule.schedule}`);
    }
  }

  /**
   * Remove a scheduled job
   */
  removeSchedule(id: string): void {
    this.schedules.delete(id);
  }

  /**
   * Enable/disable a schedule
   */
  setEnabled(id: string, enabled: boolean): void {
    const schedule = this.schedules.get(id);
    if (schedule) {
      schedule.enabled = enabled;
    }
  }

  /**
   * Start the scheduler
   */
  start(intervalMs = 60000): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.checkInterval = setInterval(() => this.checkSchedules(), intervalMs);

    // Run initial check
    this.checkSchedules();
  }

  /**
   * Stop the scheduler
   */
  stop(): void {
    this.isRunning = false;
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  /**
   * Check and execute due schedules
   */
  private async checkSchedules(): Promise<void> {
    const now = new Date();

    for (const [id, schedule] of this.schedules) {
      if (!schedule.enabled) continue;
      if (!schedule.nextRun || schedule.nextRun > now) continue;

      // Schedule is due
      try {
        await this.executeSchedule(id, schedule);
      } catch (error) {
        console.error(`Error executing schedule ${id}:`, error);
      }

      // Update next run time
      schedule.lastRun = now;
      schedule.nextRun = schedule.parsed.next(now);
    }
  }

  /**
   * Execute a scheduled job
   */
  private async executeSchedule(
    id: string,
    schedule: ScheduledJob
  ): Promise<void> {
    // For organization-specific jobs, enqueue for all enabled organizations
    if (schedule.type === 'ACCOUNT_SCAN' || schedule.type === 'CYCLE_DETECTION') {
      const orgs = await prisma.organization.findMany({
        where: { complianceEnabled: true },
        select: { id: true },
      });

      for (const org of orgs) {
        await jobQueue.enqueue(schedule.type, {
          ...schedule.payload,
          organizationId: org.id,
        } as JobPayload[typeof schedule.type]);
      }
    } else if (schedule.type === 'REPORT_GENERATION' || schedule.type === 'RISK_ASSESSMENT') {
      const orgs = await prisma.organization.findMany({
        where: { complianceEnabled: true },
        select: { id: true },
      });

      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const today = new Date();

      for (const org of orgs) {
        await jobQueue.enqueue(schedule.type, {
          ...schedule.payload,
          organizationId: org.id,
          ...(schedule.type === 'REPORT_GENERATION' && {
            periodStart: yesterday.toISOString(),
            periodEnd: today.toISOString(),
          }),
        } as JobPayload[typeof schedule.type]);
      }
    } else {
      // Global jobs (like sanctions sync)
      await jobQueue.enqueue(schedule.type, schedule.payload as JobPayload[typeof schedule.type]);
    }
  }

  /**
   * Get all schedules
   */
  getSchedules(): Array<{ id: string; schedule: ScheduledJob }> {
    return Array.from(this.schedules.entries()).map(([id, s]) => ({
      id,
      schedule: {
        type: s.type,
        payload: s.payload,
        schedule: s.schedule,
        enabled: s.enabled,
        lastRun: s.lastRun,
        nextRun: s.nextRun,
      },
    }));
  }

  /**
   * Manually trigger a schedule
   */
  async triggerSchedule(id: string): Promise<void> {
    const schedule = this.schedules.get(id);
    if (!schedule) {
      throw new Error(`Schedule not found: ${id}`);
    }
    await this.executeSchedule(id, schedule);
  }
}

export const jobScheduler = new JobScheduler();
