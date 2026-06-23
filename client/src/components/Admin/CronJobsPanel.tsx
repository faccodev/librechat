import React, { useEffect, useMemo, useState } from 'react';
import {
  Plus,
  RefreshCw,
  Play,
  Trash2,
  Power,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertTriangle,
  ChevronRight,
  X,
  Save,
  Bot,
  Sparkles,
  Webhook,
} from 'lucide-react';
import { Button, Spinner, useToastContext } from '@librechat/client';
import {
  useListCronJobs,
  useCronJob,
  useCreateCronJobMutation,
  useUpdateCronJobMutation,
  useToggleCronJobMutation,
  useDeleteCronJobMutation,
  useRunCronJobNowMutation,
} from '~/data-provider';
import { useListAgentsQuery } from '~/data-provider';
import { useLocalize } from '~/hooks';
import type {
  CronJob,
  CreateCronJobPayload,
  UpdateCronJobPayload,
} from 'librechat-data-provider';

const SCHEDULE_PRESETS = [
  { label: 'A cada minuto', value: '* * * * *' },
  { label: 'A cada 5 minutos', value: '*/5 * * * *' },
  { label: 'A cada hora', value: '0 * * * *' },
  { label: 'Todo dia à meia-noite', value: '0 0 * * *' },
  { label: 'Toda segunda às 9h', value: '0 9 * * 1' },
  { label: 'Primeiro dia do mês', value: '0 0 1 * *' },
];

const COMMON_TIMEZONES = [
  'UTC',
  'America/Sao_Paulo',
  'America/New_York',
  'Europe/Lisbon',
  'Europe/London',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Shanghai',
];

const inputClass =
  'h-9 w-full rounded-lg border border-border-light bg-surface-secondary px-3 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-border-heavy';
const labelClass = 'text-xs font-semibold text-text-secondary';

/**
 * Admin section: manage the global cronjob registry (Phase 1 surface).
 *
 * Layout: list on the left, detail/edit panel on the right. The
 * create / edit form is a self-contained sub-panel that slides over
 * the list — mirrors the `UsersSection` pattern in `AdminPanel.tsx`.
 *
 * Real-time status: each row shows the last run's outcome and the
 * next fire time hydrated by the server from the in-memory scheduler
 * registry. Polling is done implicitly via React Query's
 * `staleTime`; the `run-now` and toggle mutations invalidate the
 * relevant queries to pick up fresh data.
 */
export default function CronJobsPanel() {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const listQuery = useListCronJobs();
  const createMutation = useCreateCronJobMutation();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');

  const jobs = listQuery.data?.jobs ?? [];
  const isLoading = listQuery.isLoading;
  const isError = listQuery.isError;

  const handleCreate = () => {
    setSelectedId(null);
    setMode('create');
  };

  const handleEdit = (id: string) => {
    setSelectedId(id);
    setMode('edit');
  };

  const handleBackToList = () => {
    setSelectedId(null);
    setMode('list');
  };

  if (mode === 'create') {
    return (
      <CronJobForm
        mode="create"
        onCancel={handleBackToList}
        onSuccess={(job) => {
          showToast({
            message: `${localize('com_ui_cronjobs_created')}: ${job.name}`,
            status: 'success',
          });
          setSelectedId(job._id);
          setMode('edit');
        }}
        submitMutation={createMutation}
      />
    );
  }

  if (mode === 'edit' && selectedId) {
    return (
      <CronJobDetail
        id={selectedId}
        onBack={handleBackToList}
        onDeleted={handleBackToList}
      />
    );
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-base font-semibold text-text-primary">
            <Clock className="size-4 text-text-secondary" />
            {localize('com_ui_cronjobs_title')}
          </h2>
          <p className="mt-0.5 text-xs text-text-secondary">
            {localize('com_ui_cronjobs_subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => listQuery.refetch()}
            disabled={listQuery.isFetching}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-light text-text-secondary hover:bg-surface-secondary disabled:opacity-50"
            aria-label={localize('com_ui_refresh')}
            title={localize('com_ui_refresh')}
          >
            <RefreshCw
              className={`size-3.5 ${listQuery.isFetching ? 'animate-spin' : ''}`}
            />
          </button>
          <Button
            type="button"
            onClick={handleCreate}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-border-heavy bg-surface-tertiary px-3 text-sm font-semibold text-text-primary hover:bg-surface-hover"
          >
            <Plus className="size-3.5" /> {localize('com_ui_cronjobs_new')}
          </Button>
        </div>
      </div>

      {isError && (
        <div className="flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-xs text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
          <AlertTriangle className="mt-0.5 size-3.5 flex-shrink-0" />
          <span>{localize('com_ui_cronjobs_load_failed')}</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex h-full items-center justify-center py-12">
            <Spinner className="text-text-secondary" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 py-12 text-center text-text-secondary">
            <Clock className="size-8 opacity-40" />
            <p className="text-sm font-medium">{localize('com_ui_cronjobs_empty_title')}</p>
            <p className="text-xs">{localize('com_ui_cronjobs_empty_desc')}</p>
            <button
              type="button"
              onClick={handleCreate}
              className="mt-2 flex h-8 items-center gap-1.5 rounded-lg border border-border-heavy bg-surface-tertiary px-3 text-xs font-semibold text-text-primary hover:bg-surface-hover"
            >
              <Plus className="size-3.5" /> {localize('com_ui_cronjobs_create_first')}
            </button>
          </div>
        ) : (
          <ul className="space-y-1.5">
            {jobs.map((job) => (
              <CronJobListItem
                key={job._id}
                job={job}
                onClick={() => handleEdit(job._id)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ─── CronJobListItem ─────────────────────────────────────────────────────── */
function CronJobListItem({ job, onClick }: { job: CronJob; onClick: () => void }) {
  const lastStatus = job.lastRunStatus;
  const isRunning = lastStatus === null && job.lastRunAt != null;

  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="group flex w-full items-center gap-3 rounded-lg border border-border-light bg-surface-primary px-3 py-2.5 text-left transition-colors hover:bg-surface-secondary"
      >
        <div
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border ${
            job.enabled
              ? 'border-emerald-300 bg-emerald-50 text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400'
              : 'border-border-light bg-surface-tertiary text-text-secondary'
          }`}
        >
          {job.agent ? (
            <Bot className="size-4" />
          ) : (
            <Sparkles className="size-4" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-medium text-text-primary">{job.name}</span>
            {!job.enabled && (
              <span className="rounded-full border border-border-light bg-surface-tertiary px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
                Pausado
              </span>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-[11px] text-text-secondary">
            <code className="rounded bg-surface-tertiary px-1 py-0.5 font-mono">
              {job.schedule}
            </code>
            <span>·</span>
            <span className="truncate">{job.timezone}</span>
            {job.nextRunAt && (
              <>
                <span>·</span>
                <span>próximo: {formatRelativeTime(job.nextRunAt)}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-1.5">
          {lastStatus === 'success' && (
            <CheckCircle2 className="size-4 text-emerald-500" aria-label="Sucesso" />
          )}
          {lastStatus === 'error' && (
            <XCircle className="size-4 text-red-500" aria-label="Erro" />
          )}
          {isRunning && <Loader2 className="size-4 animate-spin text-blue-500" />}
          <ChevronRight className="size-4 text-text-secondary opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </button>
    </li>
  );
}

/* ─── CronJobDetail (read + edit toggle + run-now + delete) ─────────────── */
function CronJobDetail({
  id,
  onBack,
  onDeleted,
}: {
  id: string;
  onBack: () => void;
  onDeleted: () => void;
}) {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const { data, isLoading, isError, refetch } = useCronJob(id);
  const toggleMutation = useToggleCronJobMutation();
  const deleteMutation = useDeleteCronJobMutation();
  const runNowMutation = useRunCronJobNowMutation();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editing, setEditing] = useState(false);

  const job = data?.job;
  const isMutating =
    toggleMutation.isLoading || deleteMutation.isLoading || runNowMutation.isLoading;

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-text-secondary">
        <AlertTriangle className="size-6 text-amber-500" />
        <p className="text-sm">Falha ao carregar o cronjob.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-lg border border-border-light px-3 py-1.5 text-xs hover:bg-surface-secondary"
        >
          Tentar novamente
        </button>
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-border-light px-3 py-1.5 text-xs hover:bg-surface-secondary"
        >
          Voltar
        </button>
      </div>
    );
  }

  if (editing) {
    return (
      <CronJobForm
        mode="edit"
        initialJob={job}
        onCancel={() => setEditing(false)}
        onSuccess={() => {
          setEditing(false);
          refetch();
        }}
        submitMutation={useUpdateCronJobMutation()}
      />
    );
  }

  const handleToggle = () => {
    toggleMutation.mutate(
      { id, payload: { enabled: !job.enabled } },
      {
        onSuccess: () =>
          showToast({
            message: job.enabled
              ? localize('com_ui_cronjobs_paused_toast')
              : localize('com_ui_cronjobs_resumed_toast'),
            status: 'success',
          }),
        onError: (err: unknown) =>
          showToast({
            message: err instanceof Error ? err.message : 'Falha ao alternar',
            status: 'error',
          }),
      },
    );
  };

  const handleRunNow = () => {
    runNowMutation.mutate(id, {
      onSuccess: () =>
        showToast({
          message: localize('com_ui_cronjobs_run_started'),
          status: 'success',
        }),
      onError: (err: unknown) =>
        showToast({
          message: err instanceof Error ? err.message : 'Falha ao enfileirar execução',
          status: 'error',
        }),
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        showToast({ message: localize('com_ui_cronjobs_deleted'), status: 'success' });
        onDeleted();
      },
      onError: (err: unknown) =>
        showToast({
          message: err instanceof Error ? err.message : 'Falha ao remover',
          status: 'error',
        }),
    });
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg p-1 text-text-secondary hover:bg-surface-secondary"
          aria-label="Voltar"
        >
          <ChevronRight className="size-4 rotate-180" />
        </button>
        <span className="truncate text-sm font-semibold text-text-primary">{job.name}</span>
        <span
          className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
            job.enabled
              ? 'border border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300'
              : 'border border-border-light bg-surface-tertiary text-text-secondary'
          }`}
        >
          {job.enabled ? 'Ativo' : 'Pausado'}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleToggle}
          disabled={isMutating}
          className={`flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold disabled:opacity-50 ${
            job.enabled
              ? 'border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300 dark:hover:bg-amber-950/50'
              : 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300 dark:hover:bg-emerald-950/50'
          }`}
        >
          <Power className="size-3.5" />
          {job.enabled ? 'Pausar' : 'Ativar'}
        </button>
        <button
          type="button"
          onClick={handleRunNow}
          disabled={isMutating}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border-heavy bg-surface-tertiary px-3 text-xs font-semibold text-text-primary hover:bg-surface-hover disabled:opacity-50"
        >
          <Play className="size-3.5" /> Rodar agora
        </button>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border-light bg-surface-secondary px-3 text-xs font-semibold text-text-primary hover:bg-surface-hover"
        >
          Editar
        </button>
        <div className="ml-auto">
          {confirmDelete ? (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                disabled={isMutating}
                className="h-8 rounded-lg border border-border-light px-2.5 text-xs font-medium text-text-secondary hover:bg-surface-secondary"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isMutating}
                className="h-8 rounded-lg bg-red-600 px-2.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                Excluir definitivamente
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-red-300 px-3 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              <Trash2 className="size-3.5" /> Excluir
            </button>
          )}
        </div>
      </div>

      <div className="grid flex-shrink-0 grid-cols-1 gap-2 md:grid-cols-2">
        <InfoRow label="Schedule" value={<code className="font-mono text-xs">{job.schedule}</code>} />
        <InfoRow label="Timezone" value={job.timezone} />
        <InfoRow
          label="Alvo"
          value={
            job.agent ? (
              <span className="flex items-center gap-1.5">
                <Bot className="size-3.5 text-text-secondary" /> Agent ({String(job.agent).slice(-6)})
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-text-secondary" /> {job.provider} / {job.model}
              </span>
            )
          }
        />
        <InfoRow
          label="Próxima execução"
          value={job.nextRunAt ? formatRelativeTime(job.nextRunAt) : '—'}
        />
        <InfoRow
          label="Última execução"
          value={
            job.lastRunAt ? (
              <span className="flex items-center gap-1.5">
                {job.lastRunStatus === 'success' && (
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                )}
                {job.lastRunStatus === 'error' && (
                  <XCircle className="size-3.5 text-red-500" />
                )}
                {formatRelativeTime(job.lastRunAt)}
              </span>
            ) : (
              '—'
            )
          }
        />
        <InfoRow
          label="Feedback"
          value={
            job.feedback?.discordWebhookUrl ? (
              <span className="flex items-center gap-1.5">
                <Webhook className="size-3.5 text-text-secondary" /> Discord configurado
              </span>
            ) : (
              <span className="text-text-secondary">—</span>
            )
          }
        />
      </div>

      {job.description && (
        <div className="flex-shrink-0 rounded-lg border border-border-light bg-surface-secondary p-3 text-xs text-text-secondary">
          {job.description}
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col">
        <h3 className="mb-1.5 flex-shrink-0 text-xs font-semibold uppercase tracking-wide text-text-secondary">
          Histórico ({job.runs.length})
        </h3>
        <div className="flex-1 overflow-y-auto rounded-lg border border-border-light bg-surface-primary">
          {job.runs.length === 0 ? (
            <p className="p-3 text-center text-xs text-text-secondary">
              Nenhuma execução registrada.
            </p>
          ) : (
            <ul className="divide-y divide-border-light">
              {[...job.runs].reverse().map((run, idx) => (
                <li key={idx} className="px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    {run.status === 'success' && (
                      <CheckCircle2 className="size-3.5 flex-shrink-0 text-emerald-500" />
                    )}
                    {run.status === 'error' && (
                      <XCircle className="size-3.5 flex-shrink-0 text-red-500" />
                    )}
                    {run.status === 'running' && (
                      <Loader2 className="size-3.5 flex-shrink-0 animate-spin text-blue-500" />
                    )}
                    <span className="font-medium text-text-primary">
                      {formatRelativeTime(run.startedAt)}
                    </span>
                    {run.durationMs != null && (
                      <span className="text-text-secondary">
                        · {(run.durationMs / 1000).toFixed(1)}s
                      </span>
                    )}
                    {run.model && (
                      <span className="ml-auto truncate text-text-secondary">{run.model}</span>
                    )}
                  </div>
                  {run.status === 'error' && run.error && (
                    <pre className="mt-1 max-h-24 overflow-y-auto rounded bg-red-50 p-1.5 text-[10px] text-red-700 dark:bg-red-950/30 dark:text-red-300">
                      {run.error}
                    </pre>
                  )}
                  {run.status === 'success' && run.output && (
                    <pre className="mt-1 max-h-24 overflow-y-auto rounded bg-surface-tertiary p-1.5 text-[10px] text-text-primary">
                      {truncate(run.output, 600)}
                    </pre>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border-light bg-surface-secondary px-3 py-2">
      <div className="text-[10px] font-medium uppercase tracking-wide text-text-secondary">
        {label}
      </div>
      <div className="mt-0.5 text-sm text-text-primary">{value}</div>
    </div>
  );
}

/* ─── CronJobForm (create / edit) ────────────────────────────────────────── */
function CronJobForm({
  mode,
  initialJob,
  onCancel,
  onSuccess,
  submitMutation,
}: {
  mode: 'create' | 'edit';
  initialJob?: CronJob;
  onCancel: () => void;
  onSuccess: (job: CronJob) => void;
  submitMutation: ReturnType<typeof useCreateCronJobMutation> | ReturnType<typeof useUpdateCronJobMutation>;
}) {
  const { showToast } = useToastContext();
  const [name, setName] = useState(initialJob?.name ?? '');
  const [description, setDescription] = useState(initialJob?.description ?? '');
  const [schedule, setSchedule] = useState(initialJob?.schedule ?? '0 * * * *');
  const [timezone, setTimezone] = useState(initialJob?.timezone ?? 'UTC');
  const [prompt, setPrompt] = useState(initialJob?.prompt ?? '');
  const [agentId, setAgentId] = useState<string | null>(initialJob?.agent ?? null);
  const [provider, setProvider] = useState(initialJob?.provider ?? '');
  const [model, setModel] = useState(initialJob?.model ?? '');
  const [discordWebhook, setDiscordWebhook] = useState(
    initialJob?.feedback?.discordWebhookUrl ?? '',
  );
  const [enabled, setEnabled] = useState(initialJob?.enabled ?? true);
  const [error, setError] = useState<string | null>(null);

  const agentsQuery = useListAgentsQuery({ limit: 200, requiredPermission: 4 });
  const agents = useMemo(() => agentsQuery.data?.data ?? [], [agentsQuery.data]);

  useEffect(() => {
    if (mode === 'edit' && initialJob) {
      setName(initialJob.name);
      setDescription(initialJob.description ?? '');
      setSchedule(initialJob.schedule);
      setTimezone(initialJob.timezone);
      setPrompt(initialJob.prompt);
      setAgentId(initialJob.agent ?? null);
      setProvider(initialJob.provider ?? '');
      setModel(initialJob.model ?? '');
      setDiscordWebhook(initialJob.feedback?.discordWebhookUrl ?? '');
      setEnabled(initialJob.enabled);
    }
  }, [mode, initialJob]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !schedule.trim() || !prompt.trim()) {
      setError('Nome, schedule e prompt são obrigatórios');
      return;
    }
    if (!agentId && (!provider.trim() || !model.trim())) {
      setError('Selecione um Agent OU preencha provider e model');
      return;
    }

    const feedbackPayload = discordWebhook.trim()
      ? { discordWebhookUrl: discordWebhook.trim() }
      : { discordWebhookUrl: null };

    if (mode === 'create') {
      const payload: CreateCronJobPayload = {
        name: name.trim(),
        description: description.trim() || undefined,
        schedule: schedule.trim(),
        timezone,
        enabled,
        agent: agentId,
        provider: agentId ? null : provider.trim(),
        model: agentId ? null : model.trim(),
        prompt: prompt.trim(),
        feedback: feedbackPayload,
      };
      (submitMutation as ReturnType<typeof useCreateCronJobMutation>).mutate(payload, {
        onSuccess: (data) => onSuccess(data.job),
        onError: (err: unknown) => {
          const issues = (err as { response?: { data?: { issues?: Array<{ field: string; message: string }> } } })
            ?.response?.data?.issues;
          if (issues && issues.length > 0) {
            setError(issues.map((i) => `${i.field}: ${i.message}`).join('; '));
          } else {
            setError(err instanceof Error ? err.message : 'Falha ao criar');
          }
        },
      });
    } else if (initialJob) {
      const payload: UpdateCronJobPayload = {
        name: name.trim(),
        description: description.trim() || undefined,
        schedule: schedule.trim(),
        timezone,
        enabled,
        agent: agentId,
        provider: agentId ? null : provider.trim(),
        model: agentId ? null : model.trim(),
        prompt: prompt.trim(),
        feedback: feedbackPayload,
      };
      (submitMutation as ReturnType<typeof useUpdateCronJobMutation>).mutate(
        { id: initialJob._id, payload },
        {
          onSuccess: (data) => onSuccess(data.job),
          onError: (err: unknown) => {
            const issues = (err as { response?: { data?: { issues?: Array<{ field: string; message: string }> } } })
              ?.response?.data?.issues;
            if (issues && issues.length > 0) {
              setError(issues.map((i) => `${i.field}: ${i.message}`).join('; '));
            } else {
              setError(err instanceof Error ? err.message : 'Falha ao atualizar');
            }
          },
        },
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-1 text-text-secondary hover:bg-surface-secondary"
          aria-label="Cancelar"
        >
          <X className="size-4" />
        </button>
        <span className="text-sm font-semibold text-text-primary">
          {mode === 'create' ? 'Novo CronJob' : `Editar: ${initialJob?.name ?? ''}`}
        </span>
      </div>

      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-2.5 text-xs text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="grid flex-1 grid-cols-1 gap-3 overflow-y-auto pr-1 md:grid-cols-2">
        <div className="space-y-1">
          <label className={labelClass}>Nome *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="daily-summary"
            className={inputClass}
            required
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className={inputClass}
          >
            {COMMON_TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
            <option value={timezone}>{timezone} (atual)</option>
          </select>
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className={labelClass}>Schedule (cron 5-field) *</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              placeholder="0 9 * * 1"
              className={`${inputClass} font-mono`}
              required
            />
            <select
              onChange={(e) => {
                if (e.target.value) {
                  setSchedule(e.target.value);
                }
              }}
              className={inputClass}
              defaultValue=""
            >
              <option value="">presets…</option>
              {SCHEDULE_PRESETS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <p className="text-[10px] text-text-secondary">
            Minuto hora dia-do-mês mês dia-da-semana. Ex: <code>0 9 * * 1</code> = toda
            segunda às 09:00.
          </p>
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className={labelClass}>Descrição</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="O que esse job faz?"
            className={inputClass}
            maxLength={512}
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className={labelClass}>Agent (opcional)</label>
          <select
            value={agentId ?? ''}
            onChange={(e) => setAgentId(e.target.value || null)}
            className={inputClass}
            disabled={agentsQuery.isLoading}
          >
            <option value="">— Nenhum, usar provider/model —</option>
            {agents.map((agent: { id: string; name?: string | null }) => (
              <option key={agent.id} value={agent.id}>
                {agent.name || agent.id}
              </option>
            ))}
          </select>
          <p className="text-[10px] text-text-secondary">
            Quando selecionado, sobrescreve provider/model e usa o Agent completo.
          </p>
        </div>

        {!agentId && (
          <>
            <div className="space-y-1">
              <label className={labelClass}>Provider *</label>
              <input
                type="text"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                placeholder="openAI"
                className={inputClass}
                required={!agentId}
              />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Model *</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="gpt-4o-mini"
                className={inputClass}
                required={!agentId}
              />
            </div>
          </>
        )}

        <div className="space-y-1 md:col-span-2">
          <label className={labelClass}>Prompt (instrução enviada ao Agent) *</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Resuma as últimas conversas e envie para o canal #daily…"
            rows={6}
            className="w-full rounded-lg border border-border-light bg-surface-secondary px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-border-heavy"
            required
            maxLength={32_000}
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className={labelClass}>Discord Webhook (opcional)</label>
          <input
            type="url"
            value={discordWebhook}
            onChange={(e) => setDiscordWebhook(e.target.value)}
            placeholder="https://discord.com/api/webhooks/…"
            className={inputClass}
            maxLength={1024}
          />
          <p className="text-[10px] text-text-secondary">
            Envia resumo da execução para este webhook após cada run.
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-text-primary">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="size-4 rounded border-border-light"
            />
            <span>Ativar imediatamente após salvar</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-border-light pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-border-light px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-surface-secondary"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={submitMutation.isLoading}
          className="flex items-center gap-1.5 rounded-lg border border-border-heavy bg-surface-tertiary px-3 py-1.5 text-xs font-semibold text-text-primary hover:bg-surface-hover disabled:opacity-50"
        >
          {submitMutation.isLoading ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Save className="size-3.5" />
          )}
          {mode === 'create' ? 'Criar' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}

/* ─── helpers ───────────────────────────────────────────────────────────── */
function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return `${s.slice(0, max)}\n[… truncated, ${s.length} chars]`;
}

function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const diffMs = date.getTime() - Date.now();
  const absMs = Math.abs(diffMs);
  const sign = diffMs < 0 ? -1 : 1;
  const minutes = Math.round(absMs / 60_000);
  if (minutes < 1) return sign < 0 ? 'agora mesmo' : 'em segundos';
  if (minutes < 60) return sign < 0 ? `há ${minutes} min` : `em ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return sign < 0 ? `há ${hours}h` : `em ${hours}h`;
  const days = Math.round(hours / 24);
  return sign < 0 ? `há ${days}d` : `em ${days}d`;
}
