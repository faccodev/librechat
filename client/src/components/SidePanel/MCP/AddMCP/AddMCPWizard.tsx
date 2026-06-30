import React, { useEffect, useMemo, useState } from 'react';
import {
  OGDialog,
  OGDialogContent,
  Button,
  useToastContext,
  Spinner,
} from '@librechat/client';
import { PlugZap, FileEdit, Eye, EyeOff } from 'lucide-react';
import { RegistryTab } from '~/components/Admin/MCPRegistry';
import { useCreateMCPServerMutation } from '~/data-provider';
import { useLocalize } from '~/hooks';
import type {
  RegistryPreviewResponse,
  MCPServerUserInput,
} from 'librechat-data-provider';

type Step = 'source' | 'config' | 'review';

type Transport = 'streamable-http' | 'sse' | 'websocket';

interface ManualConfig {
  serverName: string;
  title?: string;
  description?: string;
  config: Record<string, unknown>;
}

type WizardDraft =
  | { fromRegistry: RegistryPreviewResponse; manual?: undefined }
  | { manual: ManualConfig; fromRegistry?: undefined };

interface AddMCPWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional pre-selected server name (e.g. from chat intent "install MCP X"). */
  initialServerName?: string;
}

/**
 * User-facing wizard to install a new MCP server.
 *
 * Three steps:
 *   1. Source — Browse Registry (reuses `RegistryTab`) or Manual URL.
 *   2. Configure — server name, transport, required env vars, optional
 *      OAuth fields.
 *   3. Review — final JSON preview + Save via `useCreateMCPServerMutation`.
 *
 * On save success the existing `MCPConfigDialog` takes over the OAuth
 * flow for servers that declared `oauthRequired`.
 */
export default function AddMCPWizard({
  open,
  onOpenChange,
  initialServerName,
}: AddMCPWizardProps) {
  const localize = useLocalize();
  const [step, setStep] = useState<Step>('source');
  const [draft, setDraft] = useState<WizardDraft | null>(null);

  const reset = () => {
    setStep('source');
    setDraft(null);
  };

  const handleCancel = () => {
    onOpenChange(false);
    reset();
  };

  const handleBack = () => {
    if (step === 'review') setStep('config');
    else if (step === 'config') setStep('source');
  };

  return (
    <OGDialog open={open} onOpenChange={onOpenChange}>
      <OGDialogContent
        title={localize('com_user_mcp_wizard_title') || 'Add MCP'}
        className="max-h-[85vh] w-full max-w-4xl overflow-y-auto"
      >
        <div className="flex flex-col gap-4 p-5">
          <ol className="flex items-center gap-2 text-xs">
            <StepDot
              label={localize('com_user_mcp_wizard_step_source') || 'Source'}
              active={step === 'source'}
              done={step !== 'source'}
            />
            <span className="text-text-secondary">→</span>
            <StepDot
              label={localize('com_user_mcp_wizard_step_config') || 'Configure'}
              active={step === 'config'}
              done={step === 'review'}
            />
            <span className="text-text-secondary">→</span>
            <StepDot
              label={localize('com_user_mcp_wizard_step_review') || 'Review'}
              active={step === 'review'}
              done={false}
            />
          </ol>

          {step === 'source' && (
            <SourcePicker
              initialServerName={initialServerName}
              onPicked={(selection) => {
                setDraft(selection);
                setStep('config');
              }}
              onCancel={handleCancel}
            />
          )}

          {step === 'config' && draft && (
            <ConfigStep
              draft={draft}
              onBack={handleBack}
              onReady={(manual) => {
                setDraft({ manual });
                setStep('review');
              }}
            />
          )}

          {step === 'review' && draft && (
            <ReviewStep
              draft={draft}
              onBack={handleBack}
              onSaved={() => {
                onOpenChange(false);
                reset();
              }}
            />
          )}
        </div>
      </OGDialogContent>
    </OGDialog>
  );
}

function StepDot({
  label,
  active,
  done,
}: {
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <li
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 ${
        active
          ? 'bg-blue-500/15 font-medium text-blue-700 dark:text-blue-300'
          : done
            ? 'bg-green-500/15 text-green-700 dark:text-green-300'
            : 'text-text-secondary'
      }`}
    >
      {label}
    </li>
  );
}

interface SourcePickerProps {
  initialServerName?: string;
  onPicked: (selection: WizardDraft) => void;
  onCancel: () => void;
}

function SourcePicker({ initialServerName, onPicked, onCancel }: SourcePickerProps) {
  const localize = useLocalize();
  const [mode, setMode] = useState<'browse' | 'manual'>('browse');
  const [manualName, setManualName] = useState('');
  const [manualUrl, setManualUrl] = useState('');

  useEffect(() => {
    if (initialServerName) {
      setManualName(initialServerName);
      setMode('manual');
    }
  }, [initialServerName]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = manualName.trim();
    const trimmedUrl = manualUrl.trim();
    if (!trimmedName || !trimmedUrl) return;
    onPicked({
      manual: {
        serverName: trimmedName,
        title: trimmedName,
        description: '',
        config: { type: 'streamable-http', url: trimmedUrl },
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1 self-start rounded-md bg-surface-tertiary p-0.5">
        <button
          type="button"
          onClick={() => setMode('browse')}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors ${
            mode === 'browse'
              ? 'bg-surface-primary text-text-primary shadow-sm'
              : 'text-text-secondary'
          }`}
        >
          <PlugZap className="size-3.5" />
          {localize('com_user_mcp_wizard_source_browse') || 'Browse Registry'}
        </button>
        <button
          type="button"
          onClick={() => setMode('manual')}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors ${
            mode === 'manual'
              ? 'bg-surface-primary text-text-primary shadow-sm'
              : 'text-text-secondary'
          }`}
        >
          <FileEdit className="size-3.5" />
          {localize('com_user_mcp_wizard_source_manual') || 'Manual config'}
        </button>
      </div>

      {mode === 'browse' ? (
        <div className="max-h-[50vh] overflow-y-auto rounded-md border border-border-light">
          <RegistryTab
            onPreview={(preview) => {
              onPicked({ fromRegistry: preview });
            }}
          />
        </div>
      ) : (
        <form
          onSubmit={handleManualSubmit}
          className="flex flex-col gap-3 rounded-md border border-border-light bg-surface-primary p-4"
        >
          <p className="text-xs text-text-secondary">
            {localize('com_user_mcp_wizard_manual_hint') ||
              'Connect to any MCP server by URL. Streamable-HTTP and SSE are supported.'}
          </p>
          <label className="block">
            <span className="text-xs font-medium text-text-secondary">
              {localize('com_user_mcp_wizard_field_name') || 'Server name'}
            </span>
            <input
              type="text"
              required
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}
              placeholder="my-server"
              pattern="^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"
              className="mt-1 w-full rounded-md border border-border-light bg-surface-primary px-2.5 py-1.5 text-sm text-text-primary"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-text-secondary">
              {localize('com_user_mcp_wizard_field_url') || 'Server URL'}
            </span>
            <input
              type="url"
              required
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              placeholder="https://example.com/mcp"
              className="mt-1 w-full rounded-md border border-border-light bg-surface-primary px-2.5 py-1.5 text-sm text-text-primary"
            />
          </label>
          <div className="flex items-center justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onCancel}>
              {localize('com_ui_cancel') || 'Cancel'}
            </Button>
            <Button type="submit" variant="submit" size="sm">
              {localize('com_ui_next') || 'Next'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

interface ConfigStepProps {
  draft: WizardDraft;
  onBack: () => void;
  onReady: (manual: ManualConfig) => void;
}

function ConfigStep({ draft, onBack, onReady }: ConfigStepProps) {
  const localize = useLocalize();

  const seed = useMemo<ManualConfig>(() => {
    if (draft.manual) return draft.manual;
    const preview = draft.fromRegistry;
    return {
      serverName: preview.name.replace(/[^A-Za-z0-9_-]/g, '-').slice(0, 64),
      title: preview.title,
      description: preview.description,
      config: preview.config as Record<string, unknown>,
    };
  }, [draft]);

  const preview = draft.fromRegistry;

  const [serverName, setServerName] = useState(seed.serverName);
  const [title, setTitle] = useState(seed.title ?? '');
  const [description, setDescription] = useState(seed.description ?? '');
  const [url, setUrl] = useState((seed.config.url as string | undefined) ?? '');
  const [transport, setTransport] = useState<Transport>(
    (seed.config.type as Transport) ?? 'streamable-http',
  );
  const [oauthRequired, setOauthRequired] = useState<boolean>(
    Boolean((seed.config as { oauth?: unknown }).oauth) ||
      preview?.oauthRequired === true,
  );
  const [oauthClientId, setOauthClientId] = useState<string>(
    ((seed.config as { oauth?: { client_id?: string } }).oauth?.client_id as string) ?? '',
  );
  const [oauthClientSecret, setOauthClientSecret] = useState<string>(
    ((seed.config as { oauth?: { client_secret?: string } }).oauth?.client_secret as string) ??
      '',
  );
  const [showOauthSecret, setShowOauthSecret] = useState(false);

  const requiredEnvVars = preview?.requiredEnvVars ?? [];
  const [envValues, setEnvValues] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config: Record<string, unknown> = { type: transport, url };
    if (oauthRequired) {
      config.oauth = { client_id: oauthClientId, client_secret: oauthClientSecret };
    }
    onReady({
      serverName: serverName.trim(),
      title: title.trim() || undefined,
      description: description.trim() || undefined,
      config,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {preview?.warnings && preview.warnings.length > 0 && (
        <ul className="space-y-1 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-xs text-amber-700 dark:text-amber-200">
          {preview.warnings.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      )}

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs font-medium text-text-secondary">
            {localize('com_user_mcp_wizard_field_name') || 'Server name'}
          </span>
          <input
            type="text"
            required
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            pattern="^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$"
            className="mt-1 w-full rounded-md border border-border-light bg-surface-primary px-2.5 py-1.5 text-sm text-text-primary"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-text-secondary">
            {localize('com_user_mcp_wizard_field_transport') || 'Transport'}
          </span>
          <select
            value={transport}
            onChange={(e) => setTransport(e.target.value as Transport)}
            className="mt-1 w-full rounded-md border border-border-light bg-surface-primary px-2.5 py-1.5 text-sm text-text-primary"
          >
            <option value="streamable-http">Streamable HTTP</option>
            <option value="sse">SSE</option>
            <option value="websocket">WebSocket</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-xs font-medium text-text-secondary">
          {localize('com_user_mcp_wizard_field_title') || 'Title'}
        </span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-md border border-border-light bg-surface-primary px-2.5 py-1.5 text-sm text-text-primary"
        />
      </label>

      <label className="block">
        <span className="text-xs font-medium text-text-secondary">
          {localize('com_user_mcp_wizard_field_url') || 'Server URL'}
        </span>
        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/mcp"
          className="mt-1 w-full rounded-md border border-border-light bg-surface-primary px-2.5 py-1.5 text-sm text-text-primary"
        />
      </label>

      {requiredEnvVars.length > 0 && (
        <div className="rounded-md border border-border-light bg-surface-secondary p-3">
          <p className="mb-2 text-xs font-medium text-text-secondary">
            {localize('com_user_mcp_wizard_required_env') ||
              'Required environment variables'}
          </p>
          <div className="flex flex-col gap-2">
            {requiredEnvVars.map((name) => (
              <label key={name} className="block">
                <span className="font-mono text-xs text-text-secondary">{name}</span>
                <input
                  type="text"
                  value={envValues[name] ?? ''}
                  onChange={(e) =>
                    setEnvValues((prev) => ({ ...prev, [name]: e.target.value }))
                  }
                  className="mt-1 w-full rounded-md border border-border-light bg-surface-primary px-2.5 py-1.5 text-sm text-text-primary"
                />
              </label>
            ))}
          </div>
        </div>
      )}

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={oauthRequired}
          onChange={(e) => setOauthRequired(e.target.checked)}
          className="size-4"
        />
        <span>
          {localize('com_user_mcp_wizard_oauth_required') || 'Requires OAuth'}
        </span>
      </label>

      {oauthRequired && (
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs font-medium text-text-secondary">client_id</span>
            <input
              type="text"
              value={oauthClientId}
              onChange={(e) => setOauthClientId(e.target.value)}
              className="mt-1 w-full rounded-md border border-border-light bg-surface-primary px-2.5 py-1.5 text-sm text-text-primary"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-text-secondary">client_secret</span>
            <div className="relative">
              <input
                type={showOauthSecret ? 'text' : 'password'}
                value={oauthClientSecret}
                onChange={(e) => setOauthClientSecret(e.target.value)}
                className="mt-1 w-full rounded-md border border-border-light bg-surface-primary px-2.5 py-1.5 pr-8 text-sm text-text-primary"
              />
              <button
                type="button"
                onClick={() => setShowOauthSecret((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary"
                aria-label={showOauthSecret ? 'Hide secret' : 'Show secret'}
              >
                {showOauthSecret ? (
                  <EyeOff className="size-3.5" />
                ) : (
                  <Eye className="size-3.5" />
                )}
              </button>
            </div>
          </label>
        </div>
      )}

      <label className="block">
        <span className="text-xs font-medium text-text-secondary">
          {localize('com_user_mcp_wizard_field_description') || 'Description'}
        </span>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded-md border border-border-light bg-surface-primary px-2.5 py-1.5 text-sm text-text-primary"
        />
      </label>

      <div className="flex items-center justify-end gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onBack}>
          {localize('com_ui_back') || 'Back'}
        </Button>
        <Button type="submit" variant="submit" size="sm">
          {localize('com_ui_next') || 'Next'}
        </Button>
      </div>
    </form>
  );
}

interface ReviewStepProps {
  draft: WizardDraft;
  onBack: () => void;
  onSaved: () => void;
}

function ReviewStep({ draft, onBack, onSaved }: ReviewStepProps) {
  const localize = useLocalize();
  const { showToast } = useToastContext();

  const entry: ManualConfig | null = useMemo(() => {
    if (draft.manual) return draft.manual;
    if (draft.fromRegistry) {
      const preview = draft.fromRegistry;
      return {
        serverName: preview.name.replace(/[^A-Za-z0-9_-]/g, '-').slice(0, 64),
        title: preview.title,
        description: preview.description,
        config: preview.config as Record<string, unknown>,
      };
    }
    return null;
  }, [draft]);

  const mutation = useCreateMCPServerMutation({
    onSuccess: () => {
      showToast({
        message: localize('com_user_mcp_wizard_save_success') || 'MCP installed',
        status: 'success',
      });
      onSaved();
    },
    onError: (err) => {
      showToast({
        message: err.message,
        status: 'error',
      });
    },
  });

  if (!entry) {
    return (
      <p className="text-sm text-red-500">
        {localize('com_user_mcp_wizard_missing_draft') ||
          'No draft available. Go back to the previous step.'}
      </p>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: MCPServerUserInput = {
      title: entry.title,
      description: entry.description,
      url: (entry.config.url as string) ?? '',
      ...(entry.config as Partial<MCPServerUserInput>),
    };
    mutation.mutate({ config: payload });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="rounded-md border border-border-light bg-surface-secondary p-3">
        <p className="mb-1 text-xs font-medium text-text-secondary">
          {localize('com_user_mcp_wizard_review_summary') || 'Summary'}
        </p>
        <dl className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <dt className="text-text-secondary">name</dt>
            <dd className="font-mono text-text-primary">{entry.serverName}</dd>
          </div>
          <div>
            <dt className="text-text-secondary">title</dt>
            <dd className="text-text-primary">{entry.title || '—'}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-text-secondary">description</dt>
            <dd className="text-text-primary">{entry.description || '—'}</dd>
          </div>
        </dl>
      </div>
      <div>
        <p className="mb-1 text-xs font-medium text-text-secondary">
          {localize('com_user_mcp_wizard_review_config') || 'Config (JSON)'}
        </p>
        <pre className="max-h-72 overflow-auto rounded-md border border-border-light bg-surface-primary p-3 font-mono text-xs text-text-primary">
          {JSON.stringify(entry.config, null, 2)}
        </pre>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onBack}
          disabled={mutation.isLoading}
        >
          {localize('com_ui_back') || 'Back'}
        </Button>
        <Button type="submit" variant="submit" size="sm" disabled={mutation.isLoading}>
          {mutation.isLoading ? <Spinner className="size-3" /> : null}
          <span className="ml-1">
            {localize('com_user_mcp_wizard_save') || 'Install'}
          </span>
        </Button>
      </div>
    </form>
  );
}