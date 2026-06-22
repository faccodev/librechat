import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
import {
  Button,
  Input,
  TextareaAutosize,
  Label,
  useToastContext,
} from '@librechat/client';
import {
  useCreateCronJobMutation,
  useUpdateCronJobMutation,
  useGetCronJobQuery,
  useListAgentsQuery,
} from '~/data-provider';
import { useLocalize } from '~/hooks';
import CronExpressionPicker from './CronExpressionPicker';
import type { TCreateCronJobPayload, TCronJob } from 'librechat-data-provider';

/**
 * Create / edit form for cronjobs.
 *
 * Shape:
 * - top: name + description
 * - middle: cron expression picker (visual + presets + raw)
 * - execution target: agent (select) OR provider + model (fallback)
 * - prompt textarea
 * - optional Discord webhook URL
 *
 * On submit we call `createCronJob` or `updateCronJob` depending on
 * whether the route has an `id`. Errors are surfaced via react-hook-form
 * `setError` so the per-field message renders inline.
 */
type FormValues = TCreateCronJobPayload & { discordWebhookUrl: string };

const DEFAULT_VALUES: FormValues = {
  name: '',
  description: '',
  schedule: '0 9 * * *',
  timezone: 'UTC',
  enabled: true,
  agent: null,
  provider: '',
  model: '',
  prompt: '',
  tools: [],
  discordWebhookUrl: '',
};

export default function CronJobForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const localize = useLocalize();
  const { showToast } = useToastContext();

  const isEdit = Boolean(id);
  const query = useGetCronJobQuery(isEdit ? id : null);
  const agentsQuery = useListAgentsQuery({ limit: 200 });
  const createMutation = useCreateCronJobMutation();
  const updateMutation = useUpdateCronJobMutation();

  const methods = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onSubmit',
  });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const agentValue = watch('agent');
  const useAgent = useMemo(() => Boolean(agentValue), [agentValue]);

  // Hydrate the form when editing.
  useEffect(() => {
    if (!query.data?.job) return;
    const job = query.data.job as TCronJob;
    reset({
      name: job.name,
      description: job.description ?? '',
      schedule: job.schedule,
      timezone: job.timezone ?? 'UTC',
      enabled: job.enabled,
      agent:
        typeof job.agent === 'string'
          ? job.agent
          : (job.agent as { _id?: string } | null)?._id ?? null,
      provider: job.provider ?? '',
      model: job.model ?? '',
      prompt: job.prompt,
      tools: job.tools ?? [],
      discordWebhookUrl: job.feedback?.discordWebhookUrl ?? '',
    });
  }, [query.data, reset]);

  const onSubmit = handleSubmit(async (values) => {
    const payload: TCreateCronJobPayload = {
      name: values.name.trim(),
      description: values.description?.trim() ?? '',
      schedule: values.schedule.trim(),
      timezone: values.timezone || 'UTC',
      enabled: values.enabled,
      agent: useAgent ? values.agent : null,
      provider: useAgent ? null : values.provider || null,
      model: useAgent ? null : values.model || null,
      prompt: values.prompt,
      tools: values.tools ?? [],
      feedback: {
        discordWebhookUrl: values.discordWebhookUrl?.trim() || null,
      },
    };
    try {
      if (isEdit && id) {
        await updateMutation.mutateAsync({ id, payload });
        showToast({ message: localize('com_ui_cronjobs_updated'), status: 'success' });
      } else {
        await createMutation.mutateAsync(payload);
        showToast({ message: localize('com_ui_cronjobs_created'), status: 'success' });
      }
      navigate('/cronjobs');
    } catch (err) {
      const issues = extractValidationIssues(err);
      if (issues) {
        issues.forEach((issue) => {
          methods.setError(issue.field as keyof FormValues, {
            type: 'server',
            message: issue.message,
          });
        });
      } else {
        showToast({ message: extractErrorMessage(err), status: 'error' });
      }
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex h-full w-full flex-col">
        <header className="flex items-center justify-between border-b border-border-light px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={localize('com_ui_back')}
              onClick={() => navigate(isEdit ? `/cronjobs/${id}` : '/cronjobs')}
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Button>
            <h1 className="text-base font-semibold text-text-primary">
              {isEdit
                ? localize('com_ui_cronjobs_edit_title')
                : localize('com_ui_cronjobs_create_title')}
            </h1>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2 size-4" aria-hidden="true" />
            {localize('com_ui_save')}
          </Button>
        </header>

        <div className="grid flex-1 gap-6 p-6 lg:grid-cols-3">
          {/* Left column — name/desc/schedule/prompt */}
          <section className="flex flex-col gap-4 lg:col-span-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                {localize('com_ui_name')}
              </Label>
              <Input
                id="name"
                {...register('name', { required: localize('com_ui_required') })}
                placeholder={localize('com_ui_cronjobs_name_placeholder')}
              />
              {errors.name && (
                <span className="text-xs text-red-500">{errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                {localize('com_ui_description')}
              </Label>
              <Input
                {...register('description')}
                placeholder={localize('com_ui_cronjobs_description_placeholder')}
              />
            </div>

            <CronExpressionPicker />

            <div className="flex flex-col gap-2">
              <Label className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                {localize('com_ui_timezone')}
              </Label>
              <Input {...register('timezone')} placeholder="UTC" />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                {localize('com_ui_cronjobs_prompt')}
              </Label>
              <TextareaAutosize
                {...register('prompt', { required: localize('com_ui_required') })}
                placeholder={localize('com_ui_cronjobs_prompt_placeholder')}
                minRows={6}
                maxRows={20}
                className="rounded-md border border-border-light bg-surface-primary px-3 py-2 text-sm text-text-primary focus:border-blue-500 focus:outline-none"
              />
              {errors.prompt && (
                <span className="text-xs text-red-500">{errors.prompt.message}</span>
              )}
            </div>
          </section>

          {/* Right column — execution target + tools + feedback */}
          <aside className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 rounded-xl border border-border-light bg-surface-primary p-4">
              <Label className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                {localize('com_ui_cronjobs_execution_target')}
              </Label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={useAgent}
                  onChange={() => setValue('agent', watch('agent') ?? '', { shouldDirty: true })}
                />
                {localize('com_ui_cronjobs_use_agent')}
              </label>
              <select
                disabled={!useAgent}
                className="rounded-md border border-border-light bg-surface-primary px-2 py-1 text-sm text-text-primary disabled:opacity-50"
                value={typeof watch('agent') === 'string' ? watch('agent') : ''}
                onChange={(e) => setValue('agent', e.target.value || null, { shouldDirty: true })}
              >
                <option value="">{localize('com_ui_cronjobs_select_agent')}</option>
                {(agentsQuery.data?.agents ?? []).map((agent: { _id: string; name?: string }) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.name ?? agent._id}
                  </option>
                ))}
              </select>

              <label className="mt-3 flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={!useAgent}
                  onChange={() => setValue('agent', null, { shouldDirty: true })}
                />
                {localize('com_ui_cronjobs_use_provider_model')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  disabled={useAgent}
                  placeholder="openAI"
                  {...register('provider')}
                />
                <Input
                  disabled={useAgent}
                  placeholder="gpt-4o-mini"
                  {...register('model')}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-xl border border-border-light bg-surface-primary p-4">
              <Label className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                {localize('com_ui_cronjobs_feedback_discord')}
              </Label>
              <Input
                {...register('discordWebhookUrl')}
                placeholder="https://discord.com/api/webhooks/..."
              />
              <p className="text-[10px] text-text-secondary">
                {localize('com_ui_cronjobs_feedback_discord_help')}
              </p>
            </div>

            <label className="flex items-center gap-2 rounded-xl border border-border-light bg-surface-primary p-4 text-sm">
              <input type="checkbox" {...register('enabled')} />
              {localize('com_ui_cronjobs_enabled')}
            </label>
          </aside>
        </div>
      </form>
    </FormProvider>
  );
}

function extractValidationIssues(err: unknown): Array<{ field: string; message: string }> | null {
  if (err && typeof err === 'object' && 'response' in err) {
    const response = (err as { response?: { data?: { issues?: Array<{ field: string; message: string }> } } }).response;
    const issues = response?.data?.issues;
    if (Array.isArray(issues) && issues.length > 0) {
      return issues;
    }
  }
  return null;
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
