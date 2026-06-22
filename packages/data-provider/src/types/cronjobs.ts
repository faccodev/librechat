import type { Agent } from './assistants';

/**
 * CronJob — global scheduled AI task.
 *
 * Mirrors `ICronJob` from `@librechat/data-schemas` but normalized for
 * the frontend payload shape (ObjectIds become plain strings). The
 * data-provider layer is the source of truth for what the React Query
 * hooks consume.
 *
 * Phase 1 keeps the surface intentionally small — just what the
 * panel needs to list / create / edit / delete and inspect runs.
 */

export type TCronJobRunStatus = 'running' | 'success' | 'error';
export type TCronJobLastStatus = 'success' | 'error';

export interface TCronJobRun {
  startedAt: string;
  finishedAt?: string | null;
  status: TCronJobRunStatus;
  output: string;
  error?: string | null;
  provider?: string | null;
  model?: string | null;
  durationMs?: number | null;
}

export interface TCronJobFeedback {
  discordWebhookUrl?: string | null;
}

export interface TCronJob {
  _id: string;
  name: string;
  description?: string;
  schedule: string;
  timezone: string;
  enabled: boolean;
  agent?: string | Agent | null;
  provider?: string | null;
  model?: string | null;
  prompt: string;
  tools: string[];
  feedback: TCronJobFeedback;
  lastRunAt?: string | null;
  lastRunStatus?: TCronJobLastStatus | null;
  nextRunAt?: string | null;
  runs: TCronJobRun[];
  author: string;
  authorName: string;
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TCreateCronJobPayload {
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
  feedback?: TCronJobFeedback;
}

export type TUpdateCronJobPayload = Partial<TCreateCronJobPayload>;

export interface TToggleCronJobPayload {
  enabled: boolean;
}

export interface TListCronJobsResponse {
  jobs: TCronJob[];
}

export interface TGetCronJobResponse {
  job: TCronJob;
}

export interface TCronJobValidationIssue {
  field: string;
  message: string;
}

export interface TCronJobValidationError {
  error: string;
  issues: TCronJobValidationIssue[];
}
