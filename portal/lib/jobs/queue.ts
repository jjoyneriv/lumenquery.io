import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import type { Job, JobType, JobPayload, JobStatus, JobWorker } from './types';
import { DEFAULT_MAX_RETRIES, DEFAULT_PRIORITY } from './types';

const QUEUE_KEY = 'compliance:job_queue';
const PROCESSING_KEY = 'compliance:processing';
const LOCK_TTL = 300; // 5 minutes

class JobQueue {
  private workers: Map<JobType, JobWorker<JobType>> = new Map();
  private isProcessing = false;
  private pollInterval: NodeJS.Timeout | null = null;

  /**
   * Register a worker for a job type
   */
  registerWorker<T extends JobType>(worker: JobWorker<T>): void {
    this.workers.set(worker.type, worker as JobWorker<JobType>);
  }

  /**
   * Enqueue a new job
   */
  async enqueue<T extends JobType>(
    type: T,
    payload: JobPayload[T],
    options: {
      priority?: number;
      maxRetries?: number;
      delay?: number; // milliseconds
    } = {}
  ): Promise<string> {
    const job = await prisma.backgroundJob.create({
      data: {
        jobType: type,
        payload: payload as object,
        priority: options.priority ?? DEFAULT_PRIORITY,
        status: 'PENDING',
        retryCount: 0,
      },
    });

    // Add to Redis queue with priority score
    const score = Date.now() + (options.delay ?? 0) - (options.priority ?? DEFAULT_PRIORITY) * 1000;
    await redis.zadd(QUEUE_KEY, score, job.id);

    return job.id;
  }

  /**
   * Enqueue multiple jobs
   */
  async enqueueBatch<T extends JobType>(
    jobs: Array<{ type: T; payload: JobPayload[T]; priority?: number }>
  ): Promise<string[]> {
    const ids: string[] = [];

    for (const job of jobs) {
      const id = await this.enqueue(job.type, job.payload, {
        priority: job.priority,
      });
      ids.push(id);
    }

    return ids;
  }

  /**
   * Get next job from queue
   */
  async dequeue(): Promise<Job | null> {
    // Get the highest priority job that's ready
    const now = Date.now();
    const jobIds = await redis.zrangebyscore(QUEUE_KEY, '-inf', now, 'LIMIT', 0, 1);

    if (!jobIds || jobIds.length === 0) {
      return null;
    }

    const jobId = jobIds[0];

    // Try to acquire lock
    const lockKey = `${PROCESSING_KEY}:${jobId}`;
    const acquired = await redis.set(lockKey, 'locked', 'EX', LOCK_TTL, 'NX');

    if (!acquired) {
      // Another worker got it
      return null;
    }

    // Remove from queue
    await redis.zrem(QUEUE_KEY, jobId);

    // Update status in database
    const dbJob = await prisma.backgroundJob.update({
      where: { id: jobId },
      data: {
        status: 'RUNNING',
        startedAt: new Date(),
      },
    });

    return {
      id: dbJob.id,
      type: dbJob.jobType as JobType,
      payload: dbJob.payload as JobPayload[JobType],
      priority: dbJob.priority,
      status: dbJob.status as JobStatus,
      progress: dbJob.progress,
      createdAt: dbJob.createdAt,
      startedAt: dbJob.startedAt ?? undefined,
      retryCount: dbJob.retryCount,
      maxRetries: DEFAULT_MAX_RETRIES,
    };
  }

  /**
   * Mark job as completed
   */
  async complete(jobId: string, result?: unknown): Promise<void> {
    await prisma.backgroundJob.update({
      where: { id: jobId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        progress: 100,
        result: result as object ?? undefined,
      },
    });

    // Release lock
    await redis.del(`${PROCESSING_KEY}:${jobId}`);
  }

  /**
   * Mark job as failed
   */
  async fail(jobId: string, error: string): Promise<void> {
    const job = await prisma.backgroundJob.findUnique({
      where: { id: jobId },
    });

    if (!job) return;

    if (job.retryCount < DEFAULT_MAX_RETRIES) {
      // Retry with exponential backoff
      const delay = Math.pow(2, job.retryCount) * 1000; // 1s, 2s, 4s, ...

      await prisma.backgroundJob.update({
        where: { id: jobId },
        data: {
          status: 'PENDING',
          error,
          retryCount: job.retryCount + 1,
        },
      });

      // Re-add to queue with delay
      const score = Date.now() + delay - job.priority * 1000;
      await redis.zadd(QUEUE_KEY, score, jobId);
    } else {
      // Max retries reached
      await prisma.backgroundJob.update({
        where: { id: jobId },
        data: {
          status: 'FAILED',
          completedAt: new Date(),
          error,
        },
      });
    }

    // Release lock
    await redis.del(`${PROCESSING_KEY}:${jobId}`);
  }

  /**
   * Update job progress
   */
  async updateProgress(jobId: string, progress: number): Promise<void> {
    await prisma.backgroundJob.update({
      where: { id: jobId },
      data: { progress: Math.min(100, Math.max(0, progress)) },
    });
  }

  /**
   * Start processing jobs
   */
  start(intervalMs = 1000): void {
    if (this.isProcessing) return;

    this.isProcessing = true;
    this.pollInterval = setInterval(() => this.processNext(), intervalMs);
  }

  /**
   * Stop processing jobs
   */
  stop(): void {
    this.isProcessing = false;
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  /**
   * Process the next job in queue
   */
  private async processNext(): Promise<void> {
    if (!this.isProcessing) return;

    const job = await this.dequeue();
    if (!job) return;

    const worker = this.workers.get(job.type);
    if (!worker) {
      await this.fail(job.id, `No worker registered for job type: ${job.type}`);
      return;
    }

    try {
      const result = await worker.process(job);
      await this.complete(job.id, result);

      if (worker.onComplete) {
        await worker.onComplete(job, result);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      await this.fail(job.id, errorMessage);

      if (worker.onError) {
        await worker.onError(job, error instanceof Error ? error : new Error(errorMessage));
      }
    }
  }

  /**
   * Get queue statistics
   */
  async getStats(): Promise<{
    pending: number;
    running: number;
    completed: number;
    failed: number;
    byType: Record<string, number>;
  }> {
    const [pending, running, completed, failed] = await Promise.all([
      prisma.backgroundJob.count({ where: { status: 'PENDING' } }),
      prisma.backgroundJob.count({ where: { status: 'RUNNING' } }),
      prisma.backgroundJob.count({ where: { status: 'COMPLETED' } }),
      prisma.backgroundJob.count({ where: { status: 'FAILED' } }),
    ]);

    const byTypeResult = await prisma.backgroundJob.groupBy({
      by: ['jobType'],
      where: { status: 'PENDING' },
      _count: { id: true },
    });

    const byType: Record<string, number> = {};
    for (const r of byTypeResult) {
      byType[r.jobType] = r._count.id;
    }

    return { pending, running, completed, failed, byType };
  }

  /**
   * Clean up old completed jobs
   */
  async cleanup(olderThanDays = 7): Promise<number> {
    const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);

    const result = await prisma.backgroundJob.deleteMany({
      where: {
        status: { in: ['COMPLETED', 'FAILED'] },
        completedAt: { lt: cutoff },
      },
    });

    return result.count;
  }
}

export const jobQueue = new JobQueue();
