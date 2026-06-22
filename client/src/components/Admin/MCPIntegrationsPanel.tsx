import React, { useEffect, useState } from 'react';
import { KeyRound, Save, Trash2, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { Button, Spinner, useToastContext } from '@librechat/client';
import {
  useListMCPIntegrations,
  useMCPIntegration,
  useUpsertMCPIntegration,
  useRemoveMCPIntegration,
} from '~/data-provider';
import { useLocalize } from '~/hooks';
import type {
  MCPIntegrationDetail,
  MCPIntegrationSummary,
  MCPIntegrationUpsertPayload,
} from 'librechat-data-provider';

const REDACTED = '••••••••';

/**
 * Admin section: manage the global MCP integrations (the same set
 * declared in `librechat.yaml` `mcpServers`, but stored in MongoDB
 * and editable from the browser). Sensitive fields (apiKey.key,
 * oauth.client_secret, literal env values) are decrypted when the
 * admin opens an item and re-encrypted on save.
 */
export default function MCPIntegrationsPanel() {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const listQuery = useListMCPIntegrations();
  const removeMutation = useRemoveMCPIntegration();

  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [confirmDeleteName, setConfirmDeleteName] = useState<string | null>(null);

  const handleDelete = (name: string) => {
    removeMutation.mutate(name, {
      onSuccess: () => {
        showToast({
          message: localize('com_ui_delete_success') || 'Deleted',
          status: 'success',
        });
        setConfirmDeleteName(null);
        if (selectedName === name) {
          setSelectedName(null);
        }
      },
      onError: (err: unknown) => {
        showToast({
          message: err instanceof Error ? err.message : String(err),
          status: 'error',
        });
      },
    });
  };

  return (
    <div className="flex h-full flex-1 overflow-hidden">
      {/* ── List pane ── */}
      <div className="flex w-72 flex-shrink-0 flex-col border-r border-border-light">
        <div className="flex flex-shrink-0 items-center justify-between border-b border-border-light px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold text-text-primary">
              {localize('com_admin_mcp_integrations') || 'MCP Integrations'}
            </h2>
            <p className="text-xs text-text-secondary">
              {localize('com_admin_mcp_integrations_subtitle') ||
                'Chaves globais dos MCP servers'}
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {listQuery.isLoading && (
            <div className="flex items-center justify-center p-6 text-text-secondary">
              <Spinner className="size-4" />
            </div>
          )}
          {listQuery.isError && (
            <div className="p-4 text-sm text-red-500">
              {(listQuery.error as Error)?.message}
            </div>
          )}
          {listQuery.data?.items.length === 0 && (
            <div className="p-4 text-sm text-text-secondary">
              {localize('com_admin_mcp_integrations_empty') ||
                'No MCP integrations yet.'}
            </div>
          )}
          <ul className="divide-y divide-border-light">
            {listQuery.data?.items.map((item) => (
              <li
                key={item.name}
                className={`flex cursor-pointer items-center justify-between gap-2 px-4 py-3 transition-colors ${
                  selectedName === item.name
                    ? 'bg-surface-tertiary'
                    : 'hover:bg-surface-secondary'
                }`}
                onClick={() => setSelectedName(item.name)}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <KeyRound className="size-3.5 flex-shrink-0 text-text-secondary" />
                    <span className="truncate text-sm font-medium text-text-primary">
                      {item.title || item.name}
                    </span>
                    {!item.enabled && (
                      <span className="rounded-full bg-surface-tertiary px-1.5 py-0.5 text-[10px] font-medium uppercase text-text-secondary">
                        off
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-text-secondary">
                    {item.name}
                    {item.type ? ` · ${item.type}` : ''}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Detail pane ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {selectedName == null ? (
          <div className="flex flex-1 items-center justify-center p-6 text-sm text-text-secondary">
            {localize('com_admin_mcp_integrations_select_prompt') ||
              'Selecione uma integração para editar.'}
          </div>
        ) : (
          <MCPIntegrationEditor
            key={selectedName}
            name={selectedName}
            onDeleted={() => {
              setSelectedName(null);
              setConfirmDeleteName(null);
            }}
            onConfirmDelete={() => setConfirmDeleteName(selectedName)}
            isConfirmingDelete={confirmDeleteName === selectedName}
            onCancelDelete={() => setConfirmDeleteName(null)}
            onDelete={() => handleDelete(selectedName)}
            isDeleting={removeMutation.isLoading}
          />
        )}
      </div>
    </div>
  );
}

interface MCPIntegrationEditorProps {
  name: string;
  onDeleted: () => void;
  onConfirmDelete: () => void;
  isConfirmingDelete: boolean;
  onCancelDelete: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

function MCPIntegrationEditor({
  name,
  onConfirmDelete,
  isConfirmingDelete,
  onCancelDelete,
  onDelete,
  isDeleting,
}: MCPIntegrationEditorProps) {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const detailQuery = useMCPIntegration(name);
  const upsertMutation = useUpsertMCPIntegration();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [configJson, setConfigJson] = useState('');
  const [configError, setConfigError] = useState<string | null>(null);
  const [showSensitive, setShowSensitive] = useState(false);

  useEffect(() => {
    if (detailQuery.data) {
      setTitle(detailQuery.data.title ?? '');
      setDescription(detailQuery.data.description ?? '');
      setEnabled(detailQuery.data.enabled);
      // Pretty-print the JSON so the admin can scan it.
      setConfigJson(JSON.stringify(detailQuery.data.config, null, 2));
      setConfigError(null);
      setShowSensitive(false);
    }
  }, [detailQuery.data]);

  const handleSave = () => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(configJson);
    } catch (e) {
      setConfigError((e as Error).message);
      return;
    }
    setConfigError(null);
    const payload: MCPIntegrationUpsertPayload = {
      title: title.trim() || undefined,
      description: description.trim() || undefined,
      enabled,
      config: parsed as MCPIntegrationUpsertPayload['config'],
    };
    upsertMutation.mutate(
      { name, payload },
      {
        onSuccess: () => {
          showToast({
            message: localize('com_ui_saved') || 'Saved',
            status: 'success',
          });
        },
        onError: (err: unknown) => {
          showToast({
            message: err instanceof Error ? err.message : String(err),
            status: 'error',
          });
        },
      },
    );
  };

  const handleReset = () => {
    if (detailQuery.data) {
      setConfigJson(JSON.stringify(detailQuery.data.config, null, 2));
      setConfigError(null);
    }
  };

  if (detailQuery.isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner className="size-5" />
      </div>
    );
  }

  if (detailQuery.isError) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-red-500">
        {(detailQuery.error as Error)?.message}
      </div>
    );
  }

  // Mask sensitive leaves in the rendered JSON for visual hint of
  // which fields will be encrypted on save.
  const displayJson = showSensitive
    ? configJson
    : configJson.replace(/"(key|client_secret)":\s*"[^"]+"/g, `"$1": "${REDACTED}"`);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-shrink-0 items-start justify-between gap-3 border-b border-border-light px-5 py-3">
        <div>
          <h3 className="text-base font-semibold text-text-primary">{name}</h3>
          <p className="text-xs text-text-secondary">
            {detailQuery.data?.type || 'mcp'} · updated{' '}
            {detailQuery.data?.updatedAt
              ? new Date(detailQuery.data.updatedAt).toLocaleString()
              : '—'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isConfirmingDelete ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onCancelDelete}
                disabled={isDeleting}
              >
                {localize('com_ui_cancel') || 'Cancel'}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={onDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Spinner className="size-3" />
                ) : (
                  <Trash2 className="size-3" />
                )}
                <span className="ml-1">
                  {localize('com_ui_confirm') || 'Confirmar'}
                </span>
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onConfirmDelete}
              className="text-red-500 hover:bg-red-500/10"
            >
              <Trash2 className="size-3" />
              <span className="ml-1">{localize('com_ui_delete') || 'Remover'}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Form body */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-medium text-text-secondary">
              {localize('com_admin_mcp_integration_title') || 'Título'}
            </span>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-border-light bg-surface-primary px-2.5 py-1.5 text-sm text-text-primary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Higgsfield"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-text-secondary">
              {localize('com_admin_mcp_integration_enabled') || 'Habilitado'}
            </span>
            <div className="mt-1 flex h-[34px] items-center">
              <input
                type="checkbox"
                className="size-4"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
              />
            </div>
          </label>
        </div>
        <label className="mt-4 block">
          <span className="text-xs font-medium text-text-secondary">
            {localize('com_admin_mcp_integration_description') || 'Descrição'}
          </span>
          <textarea
            className="mt-1 w-full rounded-md border border-border-light bg-surface-primary px-2.5 py-1.5 text-sm text-text-primary"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Internal note for the admin team"
          />
        </label>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-medium text-text-secondary">
            {localize('com_admin_mcp_integration_config') || 'Config (JSON)'}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowSensitive((v) => !v)}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-text-secondary hover:bg-surface-secondary"
              title={
                showSensitive
                  ? 'Hide sensitive values'
                  : 'Reveal sensitive values (use with care)'
              }
            >
              {showSensitive ? (
                <EyeOff className="size-3" />
              ) : (
                <Eye className="size-3" />
              )}
              <span>
                {showSensitive
                  ? localize('com_admin_mcp_integration_hide_secrets') || 'Ocultar'
                  : localize('com_admin_mcp_integration_show_secrets') || 'Mostrar'}
              </span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-text-secondary hover:bg-surface-secondary"
            >
              <RefreshCw className="size-3" />
              <span>{localize('com_ui_reset') || 'Reset'}</span>
            </button>
          </div>
        </div>
        <textarea
          className={`mt-1 w-full rounded-md border bg-surface-primary px-3 py-2 font-mono text-xs text-text-primary ${
            configError ? 'border-red-500' : 'border-border-light'
          }`}
          rows={20}
          value={displayJson}
          onChange={(e) => setConfigJson(e.target.value)}
          spellCheck={false}
        />
        {configError && (
          <p className="mt-1 text-xs text-red-500">{configError}</p>
        )}
        <p className="mt-1 text-[11px] text-text-secondary">
          {localize('com_admin_mcp_integration_config_hint') ||
            'apiKey.key, oauth.client_secret e valores literais de env.* são criptografados. Referências ${VAR} são preservadas como estão.'}
        </p>
      </div>

      {/* Footer */}
      <div className="flex flex-shrink-0 items-center justify-end gap-2 border-t border-border-light px-5 py-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          disabled={upsertMutation.isLoading}
        >
              {localize('com_ui_reset') || 'Restaurar'}
        </Button>
        <Button
          variant="submit"
          size="sm"
          onClick={handleSave}
          disabled={upsertMutation.isLoading}
        >
          {upsertMutation.isLoading ? (
            <Spinner className="size-3" />
          ) : (
            <Save className="size-3" />
          )}
          <span className="ml-1">
            {localize('com_ui_save_changes') || 'Salvar'}
          </span>
        </Button>
      </div>
    </div>
  );
}
