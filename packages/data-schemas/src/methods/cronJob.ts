import logger from '~/config/winston';
import cron from 'node-cron';
import { CRONJOB_RUNS_HISTORY_LIMIT } from '~/schema/cronJob';
import type { FilterQuery, Model, Types } from 'mongoose';
import type {
  CreateCronJobInput,
  CronJobRunStatus,
  ICronJob,
  ICronJobDocument,
  RecordCronRunInput,
  UpdateCronJobInput,
} from '~/types/cronjobs';

/**
 * Field-level validation errors raised by the methods layer. The REST
 * handlers translate these into 400s.
 */
export class CronJobValidationError extends Error {
  issues: Array<{ field: string; message: string }>;
  constructor(issues: Array<{ field: string; message: string }>) {
    super('CronJob validation failed');
    this.name = 'CronJobValidationError';
    this.issues = issues;
  }
}

/**
 * Trims `name` to ASCII-printable + reasonable length. Author-controlled
 * identifiers — no kebab-case enforcement (admin UI uses human names).
 */
function validateName(name: unknown): Array<{ field: string; message: string }> {
  if (typeof name !== 'string' || name.trim().length === 0) {
    return [{ field: 'name', message: 'Name is required' }];
  }
  if (name.length > 64) {
    return [{ field: 'name', message: 'Name cannot exceed 64 characters' }];
  }
  return [];
}

/**
 * Validates a cron expression via `node-cron.validate`. Throws structured
 * error when invalid so the caller can return a 400 with the field name.
 */
function validateSchedule(schedule: unknown): Array<{ field: string; message: string }> {
  if (typeof schedule !== 'string' || schedule.trim().length === 0) {
    return [{ field: 'schedule', message: 'Schedule is required' }];
  }
  if (!cron.validate(schedule)) {
    return [{ field: 'schedule', message: `Invalid cron expression: "${schedule}"` }];
  }
  return [];
}

function validatePrompt(prompt: unknown): Array<{ field: string; message: string }> {
  if (typeof prompt !== 'string' || prompt.trim().length === 0) {
    return [{ field: 'prompt', message: 'Prompt is required' }];
  }
  if (prompt.length > 32_000) {
    return [{ field: 'prompt', message: 'Prompt cannot exceed 32,000 characters' }];
  }
  return [];
}

/**
 * When `agent` is provided, `provider`/`model` are ignored (the agent's
 * config wins). When `agent` is null, both `provider` and `model` are
 * required. Validated at write time so the executor never has to deal
 * with half-configured jobs.
 */
function validateExecutionTarget(
  input: Pick<CreateCronJobInput, 'agent' | 'provider' | 'model'>,
): Array<{ field: string; message: string }> {
  const hasAgent = input.agent != null && input.agent !== '';
  if (hasAgent) {
    return [];
  }
  const issues: Array<{ field: string; message: string }> = [];
  if (!input.provider) {
    issues.push({ field: 'provider', message: 'Provider is required when no agent is selected' });
  }
  if (!input.model) {
    issues.push({ field: 'model', message: 'Model is required when no agent is selected' });
  }
  return issues;
}

function toObjectId(
  mongoose: typeof import('mongoose'),
  value: Types.ObjectId | string,
): Types.ObjectId {
  if (value instanceof mongoose.Types.ObjectId) {
    return value;
  }
  return new mongoose.Types.ObjectId(String(value));
}

export interface ListCronJobsOptions {
  /** Returns only enabled jobs when true. Defaults to all. */
  enabledOnly?: boolean;
  /** Caps result count. Defaults to 200. */
  limit?: number;
}

export interface ListCronJobsResult {
  jobs: Array<ICronJob & { _id: Types.ObjectId }>;
}

export interface CronJobMethods {
  createCronJob: (input: CreateCronJobInput) => Promise<ICronJob & { _id: Types.ObjectId }>;
  getCronJobById: (id: string | Types.ObjectId) => Promise<(ICronJob & { _id: Types.ObjectId }) | null>;
  listCronJobs: (options?: ListCronJobsOptions) => Promise<ListCronJobsResult>;
  updateCronJob: (
    id: string | Types.ObjectId,
    patch: UpdateCronJobInput,
  ) => Promise<(ICronJob & { _id: Types.ObjectId }) | null>;
  toggleCronJob: (
    id: string | Types.ObjectId,
    enabled: boolean,
  ) => Promise<(ICronJob & { _id: Types.ObjectId }) | null>;
  deleteCronJob: (id: string | Types.ObjectId) => Promise<boolean>;
  /**
   * Appends a run entry to the job's `runs` array and trims to the schema
   * cap. Also updates `lastRunAt` / `lastRunStatus` for fast list reads.
   * Returns the trimmed run document.
   */
  recordCronRun: (input: RecordCronRunInput) => Promise<ICronJob | null>;
  /**
   * Sets `nextRunAt` on the job. Called by the scheduler after computing
   * the next fire time via `cron.getNextDate` (in `@librechat/api`).
   */
  setNextRunAt: (
    id: string | Types.ObjectId,
    nextRunAt: Date | null,
  ) => Promise<(ICronJob & { _id: Types.ObjectId }) | null>;
}

export function createCronJobMethods(
  mongoose: typeof import('mongoose'),
): CronJobMethods {
  function getModel(): Model<ICronJobDocument> {
    return mongoose.models.CronJob as Model<ICronJobDocument>;
  }

  async function createCronJob(
    input: CreateCronJobInput,
  ): Promise<ICronJob & { _id: Types.ObjectId }> {
    const issues = [
      ...validateName(input.name),
      ...validateSchedule(input.schedule),
      ...validatePrompt(input.prompt),
      ...validateExecutionTarget(input),
    ];
    if (issues.length > 0) {
      throw new CronJobValidationError(issues);
    }

    const CronJobModel = getModel();
    const existing = await CronJobModel.findOne({
      name: input.name,
      author: toObjectId(mongoose, input.author),
      tenantId: input.tenantId ?? null,
    })
      .select('_id')
      .lean();
    if (existing) {
      throw new CronJobValidationError([
        {
          field: 'name',
          message: `A cronjob with name "${input.name}" already exists for this author`,
        },
      ]);
    }

    const doc = await CronJobModel.create({
      name: input.name,
      description: input.description ?? '',
      schedule: input.schedule,
      timezone: input.timezone ?? 'UTC',
      enabled: input.enabled ?? true,
      agent: input.agent ? toObjectId(mongoose, input.agent as Types.ObjectId | string) : null,
      provider: input.provider ?? null,
      model: input.model ?? null,
      prompt: input.prompt,
      tools: input.tools ?? [],
      feedback: {
        discordWebhookUrl: input.feedback?.discordWebhookUrl ?? null,
      },
      author: toObjectId(mongoose, input.author),
      authorName: input.authorName,
      tenantId: input.tenantId,
    });
    return doc.toObject() as unknown as ICronJob & { _id: Types.ObjectId };
  }

  async function getCronJobById(
    id: string | Types.ObjectId,
  ): Promise<(ICronJob & { _id: Types.ObjectId }) | null> {
    const objectId =
      typeof id === 'string' ? (mongoose.isValidObjectId(id) ? new mongoose.Types.ObjectId(id) : null) : id;
    if (!objectId) {
      return null;
    }
    const CronJobModel = getModel();
    const doc = await CronJobModel.findById(objectId).lean();
    return (doc as unknown as (ICronJob & { _id: Types.ObjectId }) | null) ?? null;
  }

  async function listCronJobs(
    options: ListCronJobsOptions = {},
  ): Promise<ListCronJobsResult> {
    const CronJobModel = getModel();
    const filter: FilterQuery<ICronJobDocument> = {};
    if (options.enabledOnly) {
      filter.enabled = true;
    }
    const rows = await CronJobModel.find(filter)
      .sort({ updatedAt: -1, _id: 1 })
      .limit(Math.min(options.limit ?? 200, 1000))
      .lean();
    return {
      jobs: rows as unknown as Array<ICronJob & { _id: Types.ObjectId }>,
    };
  }

  async function updateCronJob(
    id: string | Types.ObjectId,
    patch: UpdateCronJobInput,
  ): Promise<(ICronJob & { _id: Types.ObjectId }) | null> {
    const existing = await getCronJobById(id);
    if (!existing) {
      return null;
    }

    const issues: Array<{ field: string; message: string }> = [];
    if (patch.name !== undefined) {
      issues.push(...validateName(patch.name));
    }
    if (patch.schedule !== undefined) {
      issues.push(...validateSchedule(patch.schedule));
    }
    if (patch.prompt !== undefined) {
      issues.push(...validatePrompt(patch.prompt));
    }
    const targetAfterPatch = {
      agent:
        patch.agent !== undefined
          ? patch.agent
          : (existing.agent as Types.ObjectId | string | null | undefined),
      provider:
        patch.provider !== undefined ? patch.provider : (existing.provider ?? undefined),
      model: patch.model !== undefined ? patch.model : (existing.model ?? undefined),
    };
    issues.push(...validateExecutionTarget(targetAfterPatch));
    if (issues.length > 0) {
      throw new CronJobValidationError(issues);
    }

    const update: Record<string, unknown> = {};
    if (patch.name !== undefined) update.name = patch.name;
    if (patch.description !== undefined) update.description = patch.description;
    if (patch.schedule !== undefined) update.schedule = patch.schedule;
    if (patch.timezone !== undefined) update.timezone = patch.timezone;
    if (patch.enabled !== undefined) update.enabled = patch.enabled;
    if (patch.agent !== undefined) {
      update.agent =
        patch.agent == null ? null : toObjectId(mongoose, patch.agent as Types.ObjectId | string);
    }
    if (patch.provider !== undefined) update.provider = patch.provider;
    if (patch.model !== undefined) update.model = patch.model;
    if (patch.prompt !== undefined) update.prompt = patch.prompt;
    if (patch.tools !== undefined) update.tools = patch.tools;
    if (patch.feedback !== undefined) {
      update.feedback = {
        discordWebhookUrl:
          patch.feedback.discordWebhookUrl === undefined
            ? (existing.feedback?.discordWebhookUrl ?? null)
            : patch.feedback.discordWebhookUrl,
      };
    }

    const objectId =
      typeof id === 'string' ? new mongoose.Types.ObjectId(id) : id;
    const CronJobModel = getModel();
    const doc = await CronJobModel.findByIdAndUpdate(objectId, { $set: update }, { new: true }).lean();
    return (doc as unknown as (ICronJob & { _id: Types.ObjectId }) | null) ?? null;
  }

  async function toggleCronJob(
    id: string | Types.ObjectId,
    enabled: boolean,
  ): Promise<(ICronJob & { _id: Types.ObjectId }) | null> {
    const objectId =
      typeof id === 'string' ? new mongoose.Types.ObjectId(id) : id;
    const CronJobModel = getModel();
    const doc = await CronJobModel.findByIdAndUpdate(
      objectId,
      { $set: { enabled } },
      { new: true },
    ).lean();
    return (doc as unknown as (ICronJob & { _id: Types.ObjectId }) | null) ?? null;
  }

  async function deleteCronJob(id: string | Types.ObjectId): Promise<boolean> {
    const objectId =
      typeof id === 'string' ? new mongoose.Types.ObjectId(id) : id;
    const CronJobModel = getModel();
    const result = await CronJobModel.deleteOne({ _id: objectId });
    return result.deletedCount === 1;
  }

  async function recordCronRun(input: RecordCronRunInput): Promise<ICronJob | null> {
    const objectId =
      typeof input.jobId === 'string' ? new mongoose.Types.ObjectId(input.jobId) : input.jobId;
    const runEntry = {
      startedAt: input.startedAt,
      finishedAt: input.finishedAt ?? new Date(),
      status: input.status satisfies CronJobRunStatus,
      output: input.output ?? '',
      error: input.error ?? null,
      provider: input.provider ?? null,
      model: input.model ?? null,
      durationMs: input.durationMs ?? null,
    };
    const lastStatus: 'success' | 'error' | null =
      input.status === 'success' || input.status === 'error' ? input.status : null;

    try {
      const CronJobModel = getModel();
      const updated = await CronJobModel.findByIdAndUpdate(
        objectId,
        {
          $push: {
            runs: { $each: [runEntry], $slice: -CRONJOB_RUNS_HISTORY_LIMIT },
          },
          $set: {
            lastRunAt: input.finishedAt ?? input.startedAt,
            ...(lastStatus ? { lastRunStatus: lastStatus } : {}),
          },
        },
        { new: true },
      ).lean();
      return updated as unknown as ICronJob | null;
    } catch (err) {
      logger.error('[cronjobs.recordCronRun] failed to record run', err);
      return null;
    }
  }

  async function setNextRunAt(
    id: string | Types.ObjectId,
    nextRunAt: Date | null,
  ): Promise<(ICronJob & { _id: Types.ObjectId }) | null> {
    const objectId =
      typeof id === 'string' ? new mongoose.Types.ObjectId(id) : id;
    const CronJobModel = getModel();
    const doc = await CronJobModel.findByIdAndUpdate(
      objectId,
      { $set: { nextRunAt } },
      { new: true },
    ).lean();
    return (doc as unknown as (ICronJob & { _id: Types.ObjectId }) | null) ?? null;
  }

  return {
    createCronJob,
    getCronJobById,
    listCronJobs,
    updateCronJob,
    toggleCronJob,
    deleteCronJob,
    recordCronRun,
    setNextRunAt,
  };
}
