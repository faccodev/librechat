import PQueue from 'p-queue';

/**
 * In-process queue for cronjob executions. Caps concurrency so a burst
 * of simultaneous triggers (e.g. after a long downtime + many
 * catch-up-friendly `* * * * *` jobs) can't overwhelm the LLM upstream.
 *
 * Phase 1 deliberately uses an in-process queue instead of BullMQ /
 * Redis — the product decision is single-Docker, so there's no second
 * worker process to coordinate with. If we ever scale to multi-instance
 * we'll need a distributed queue with leader election; that swap is
 * isolated to this file.
 *
 * `intervalCap` + `interval` is a soft rate limit (max 5 executions per
 * 10 seconds) — guards against jobs configured with very tight
 * schedules (`* * * * * *` is invalid for standard cron, but a tight
 * `* * * * *` across many jobs would otherwise fire dozens at once on
 * the minute boundary).
 */
const cronJobQueue = new PQueue({
  concurrency: 2,
  intervalCap: 5,
  interval: 10_000,
});

export function enqueueCronJob<T>(task: () => Promise<T>): Promise<T> {
  return cronJobQueue.add(task) as Promise<T>;
}

export function getCronJobQueueStats(): {
  size: number;
  pending: number;
  isPaused: boolean;
} {
  return {
    size: cronJobQueue.size,
    pending: cronJobQueue.pending,
    isPaused: cronJobQueue.isPaused,
  };
}
