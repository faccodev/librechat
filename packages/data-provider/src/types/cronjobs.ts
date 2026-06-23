/**
 * CronJob wire types.
 *
 * Mirrors the `ICronJob` schema in `@librechat/data-schemas` but uses
 * string ids / ISO date strings everywhere — Mongo `_id` and Date
 * instances don't survive the JSON boundary cleanly. The data-service
 * layer normalizes both sides so the panel never sees a `Types.ObjectId`
 * or a Date where a string is expected.
 *
 * The `runs` array is bounded to the last 50 entries by the server
 * (see `CRONJOB_RUNS_HISTORY_LIMIT`). The full history lives in logs /
 * Discord webhooks; the panel only renders the recent tail.
 */

export type CronJobRunStatus = 'running' | 'success' | 'error';
export type CronJobLastStatus = 'success' | 'error';

export interface CronJobFeedback {
  discordWebhookUrl?: string | null;
}

export interface CronJobRun {
  startedAt: string;
  finishedAt?: string | null;
  status: CronJobRunStatus;
  output: string;
  error?: string | null;
  provider?: string | null;
  model?: string | null;
  durationMs?: number | null;
}

export interface CronJob {
  _id: string;
  name: string;
  description?: string;
  /** 5-field standard cron expression. */
  schedule: string;
  timezone: string;
  enabled: boolean;
  /** Optional saved Agent id. When set, the executor uses the full agent. */
  agent?: string | null;
  /** Fallback provider when no agent is set. */
  provider?: string | null;
  model?: string | null;
  prompt: string;
  tools: string[];
  feedback: CronJobFeedback;
  lastRunAt?: string | null;
  lastRunStatus?: CronJobLastStatus | null;
  /** Hydrated by the server from the in-memory scheduler registry. */
  nextRunAt?: string | null;
  runs: CronJobRun[];
  author: string;
  authorName: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Payload accepted by `POST /api/cronjobs`. `agent` and `provider`/`model`
 * are mutually exclusive on the server (server returns 400 if both are
 * set or neither is set).
 */
export interface CreateCronJobPayload {
  name: string;
  description?: string;
  schedule: string;
  timezone?: string;
  enabled?: boolean;
  agent?: string | null;
  provider?: string | null;
  model?: string | null;
  prompt: string;
  tools?: string[];
  feedback?: CronJobFeedback;
}

export interface UpdateCronJobPayload {
  name?: string;
  description?: string;
  schedule?: string;
  timezone?: string;
  enabled?: boolean;
  agent?: string | null;
  provider?: string | null;
  model?: string | null;
  prompt?: string;
  tools?: string[];
  feedback?: CronJobFeedback;
}

export interface CronJobListResponse {
  jobs: CronJob[];
}

export interface CronJobSingleResponse {
  job: CronJob;
}

export interface CronJobTogglePayload {
  enabled: boolean;
}
