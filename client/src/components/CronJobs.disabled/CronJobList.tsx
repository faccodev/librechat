import { useNavigate } from 'react-router-dom';
import { Plus, Play, Pause, Trash2, Pencil, Power } from 'lucide-react';
import { Button, useToastContext } from '@librechat/client';
import {
  useListCronJobsQuery,
  useToggleCronJobMutation,
  useDeleteCronJobMutation,
  useRunCronJobNowMutation,
} from '~/data-provider';
import { useLocalize } from '~/hooks';
import type { TCronJob } from 'librechat-data-provider';

/**
 * CronJob list panel. Single column showing each job as a card with
 * toggle / run-now / edit / delete actions.
 *
 * Phase 1 deliberately keeps this single-column — there's no need for
 * a tree or nested groups at this scale. Cursor-paginated infinite
 * query will arrive in phase 2 once the dataset grows.
 */
export default function CronJobList() {
  const localize = useLocalize();
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const list = useListCronJobsQuery();
  const toggle = useToggleCronJobMutation();
  const remove = useDeleteCronJobMutation();
  const runNow = useRunCronJobNowMutation();

  const jobs = (list.data?.jobs ?? []) as TCronJob[];

  const onToggle = async (job: TCronJob) => {
    try {
      await toggle.mutateAsync({ id: job._id, enabled: !job.enabled });
      showToast({
        message: job.enabled
          ? localize('com_ui_cronjobs_paused')
          : localize('com_ui_cronjobs_resumed'),
        status: 'success',
      });
    } catch (err) {
      showToast({ message: extractErrorMessage(err), status: 'error' });
    }
  };

  const onRunNow = async (job: TCronJob) => {
    try {
      await runNow.mutateAsync(job._id);
      showToast({ message: localize('com_ui_cronjobs_run_started'), status: 'success' });
    } catch (err) {
      showToast({ message: extractErrorMessage(err), status: 'error' });
    }
  };

  const onDelete = async (job: TCronJob) => {
    if (!window.confirm(localize('com_ui_cronjobs_delete_confirm'))) {
      return;
    }
    try {
      await remove.mutateAsync(job._id);
      showToast({ message: localize('com_ui_cronjobs_deleted'), status: 'success' });
    } catch (err) {
      showToast({ message: extractErrorMessage(err), status: 'error' });
    }
  };

  if (list.isLoading) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-text-secondary">
        {localize('com_ui_loading')}
      </div>
    );
  }

  if (list.isError) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-red-500">
        {extractErrorMessage(list.error)}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border-light py-16 text-text-secondary">
        <Power className="size-10 opacity-50" aria-hidden="true" />
        <p className="text-sm font-medium">{localize('com_ui_cronjobs_empty_title')}</p>
        <p className="text-xs">{localize('com_ui_cronjobs_empty_desc')}</p>
        <Button
          variant="default"
          onClick={() => navigate('/cronjobs?new=1')}
          className="mt-2"
        >
          <Plus className="mr-2 size-4" aria-hidden="true" />
          {localize('com_ui_cronjobs_create')}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">
          {jobs.length} {localize('com_ui_cronjobs_count_suffix')}
        </span>
        <Button variant="default" onClick={() => navigate('/cronjobs?new=1')}>
          <Plus className="mr-2 size-4" aria-hidden="true" />
          {localize('com_ui_cronjobs_create')}
        </Button>
      </div>
      <ul className="flex flex-col gap-2">
        {jobs.map((job) => (
          <li
            key={job._id}
            className="group flex items-start gap-3 rounded-xl border border-border-light bg-surface-primary p-4 transition-colors hover:border-border-heavy"
          >
            <button
              type="button"
              onClick={() => navigate(`/cronjobs/${job._id}`)}
              className="flex flex-1 flex-col gap-1 text-left"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-primary">{job.name}</span>
                {!job.enabled && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium uppercase text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                    {localize('com_ui_cronjobs_paused_badge')}
                  </span>
                )}
                {job.lastRunStatus === 'success' && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium uppercase text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                    {localize('com_ui_cronjobs_status_success')}
                  </span>
                )}
                {job.lastRunStatus === 'error' && (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium uppercase text-red-700 dark:bg-red-900/40 dark:text-red-300">
                    {localize('com_ui_cronjobs_status_error')}
                  </span>
                )}
              </div>
              {job.description && (
                <p className="text-xs text-text-secondary">{job.description}</p>
              )}
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-text-secondary">
                <code className="rounded bg-surface-tertiary px-1.5 py-0.5 font-mono">
                  {job.schedule}
                </code>
                <span>·</span>
                <span>{job.timezone}</span>
                {job.nextRunAt && (
                  <>
                    <span>·</span>
                    <span>{localize('com_ui_cronjobs_next_run')}: {formatDate(job.nextRunAt)}</span>
                  </>
                )}
              </div>
            </button>
            <div className="flex flex-shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                size="icon"
                variant="ghost"
                aria-label={localize('com_ui_cronjobs_run_now')}
                onClick={() => onRunNow(job)}
              >
                <Play className="size-4" aria-hidden="true" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                aria-label={job.enabled ? localize('com_ui_cronjobs_pause') : localize('com_ui_cronjobs_resume')}
                onClick={() => onToggle(job)}
              >
                {job.enabled ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                aria-label={localize('com_ui_edit')}
                onClick={() => navigate(`/cronjobs/${job._id}`)}
              >
                <Pencil className="size-4" aria-hidden="true" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                aria-label={localize('com_ui_delete')}
                onClick={() => onDelete(job)}
              >
                <Trash2 className="size-4 text-red-500" aria-hidden="true" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function extractErrorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const response = (err as { response?: { data?: { error?: string } } }).response;
    if (response?.data?.error) {
      return response.data.error;
    }
  }
  if (err instanceof Error) {
    return err.message;
  }
  return 'Unknown error';
}
