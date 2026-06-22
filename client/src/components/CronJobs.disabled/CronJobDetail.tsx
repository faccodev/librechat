import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Trash2, Pencil, Power } from 'lucide-react';
import { Button, Spinner, useToastContext } from '@librechat/client';
import {
  useGetCronJobQuery,
  useToggleCronJobMutation,
  useDeleteCronJobMutation,
  useRunCronJobNowMutation,
} from '~/data-provider';
import { useLocalize } from '~/hooks';
import RunHistory from './RunHistory';
import type { TCronJob } from 'librechat-data-provider';

/**
 * Detail view for a single cronjob. Header shows name + status badges;
 * body has two columns — metadata (left) and recent runs (right).
 *
 * `id` comes from the route — kept as a prop so test harnesses can
 * mount the component with a synthetic id.
 */
export default function CronJobDetail({ id: idProp }: { id?: string }) {
  const params = useParams();
  const navigate = useNavigate();
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const id = idProp ?? params.id;
  const query = useGetCronJobQuery(id);
  const toggle = useToggleCronJobMutation();
  const remove = useDeleteCronJobMutation();
  const runNow = useRunCronJobNowMutation();

  if (query.isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-presentation">
        <Spinner className="text-text-secondary" aria-label={localize('com_ui_loading')} />
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-presentation text-text-secondary">
        <p className="text-sm font-medium">{localize('com_ui_cronjobs_not_found')}</p>
        <Button variant="outline" onClick={() => navigate('/cronjobs')}>
          <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
          {localize('com_ui_back')}
        </Button>
      </div>
    );
  }

  const job = query.data.job as TCronJob;

  const onToggle = async () => {
    try {
      await toggle.mutateAsync({ id: job._id, enabled: !job.enabled });
    } catch (err) {
      showToast({ message: extractErrorMessage(err), status: 'error' });
    }
  };

  const onRun = async () => {
    try {
      await runNow.mutateAsync(job._id);
      showToast({ message: localize('com_ui_cronjobs_run_started'), status: 'success' });
    } catch (err) {
      showToast({ message: extractErrorMessage(err), status: 'error' });
    }
  };

  const onDelete = async () => {
    if (!window.confirm(localize('com_ui_cronjobs_delete_confirm'))) {
      return;
    }
    try {
      await remove.mutateAsync(job._id);
      showToast({ message: localize('com_ui_cronjobs_deleted'), status: 'success' });
      navigate('/cronjobs');
    } catch (err) {
      showToast({ message: extractErrorMessage(err), status: 'error' });
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <header className="flex items-center justify-between border-b border-border-light px-6 py-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label={localize('com_ui_back')}
            onClick={() => navigate('/cronjobs')}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold text-text-primary">{job.name}</h1>
              {!job.enabled && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium uppercase text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                  {localize('com_ui_cronjobs_paused_badge')}
                </span>
              )}
            </div>
            {job.description && (
              <p className="mt-0.5 text-xs text-text-secondary">{job.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onRun}>
            <Play className="mr-2 size-4" aria-hidden="true" />
            {localize('com_ui_cronjobs_run_now')}
          </Button>
          <Button variant="outline" onClick={onToggle}>
            {job.enabled ? (
              <>
                <Pause className="mr-2 size-4" aria-hidden="true" />
                {localize('com_ui_cronjobs_pause')}
              </>
            ) : (
              <>
                <Play className="mr-2 size-4" aria-hidden="true" />
                {localize('com_ui_cronjobs_resume')}
              </>
            )}
          </Button>
          <Button variant="outline" onClick={() => navigate(`/cronjobs/${job._id}?edit=1`)}>
            <Pencil className="mr-2 size-4" aria-hidden="true" />
            {localize('com_ui_edit')}
          </Button>
          <Button variant="ghost" onClick={onDelete}>
            <Trash2 className="mr-2 size-4 text-red-500" aria-hidden="true" />
            {localize('com_ui_delete')}
          </Button>
        </div>
      </header>

      <div className="grid flex-1 gap-6 p-6 lg:grid-cols-2">
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-text-primary">
            {localize('com_ui_cronjobs_details')}
          </h2>
          <dl className="grid grid-cols-1 gap-3 rounded-xl border border-border-light bg-surface-primary p-4 text-sm sm:grid-cols-2">
            <DetailRow label={localize('com_ui_cronjobs_field_schedule')} value={
              <code className="rounded bg-surface-tertiary px-1.5 py-0.5 font-mono text-xs">
                {job.schedule}
              </code>
            } />
            <DetailRow label={localize('com_ui_cronjobs_field_timezone')} value={job.timezone} />
            <DetailRow
              label={localize('com_ui_cronjobs_field_agent')}
              value={
                job.agent
                  ? typeof job.agent === 'string'
                    ? job.agent
                    : job.agent.name ?? job.agent.id
                  : '—'
              }
            />
            <DetailRow
              label={localize('com_ui_cronjobs_field_provider_model')}
              value={
                job.agent
                  ? '—'
                  : `${job.provider ?? '—'} / ${job.model ?? '—'}`
              }
            />
            <DetailRow
              label={localize('com_ui_cronjobs_field_tools')}
              value={
                job.tools.length === 0
                  ? '—'
                  : (
                    <div className="flex flex-wrap gap-1">
                      {job.tools.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-surface-tertiary px-1.5 py-0.5 text-[11px] font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )
              }
            />
            <DetailRow
              label={localize('com_ui_cronjobs_field_feedback')}
              value={job.feedback?.discordWebhookUrl ? 'Discord' : '—'}
            />
            <DetailRow
              label={localize('com_ui_cronjobs_field_next_run')}
              value={job.nextRunAt ? new Date(job.nextRunAt).toLocaleString() : '—'}
            />
            <DetailRow
              label={localize('com_ui_cronjobs_field_last_run')}
              value={job.lastRunAt ? new Date(job.lastRunAt).toLocaleString() : '—'}
            />
          </dl>
          <div className="rounded-xl border border-border-light bg-surface-primary p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
              {localize('com_ui_cronjobs_prompt')}
            </h3>
            <pre className="mt-2 whitespace-pre-wrap break-words text-xs text-text-primary">
              {job.prompt}
            </pre>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-text-primary">
            {localize('com_ui_cronjobs_run_history')}
          </h2>
          <RunHistory runs={job.runs ?? []} />
        </section>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
        {label}
      </dt>
      <dd className="text-sm text-text-primary">{value}</dd>
    </div>
  );
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
