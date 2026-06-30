import React, { useEffect, useState } from 'react';
import { OGDialog, OGDialogTitle, OGDialogContent, Spinner } from '@librechat/client';
import { KeyRound, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@librechat/client';
import type { RegistryListItem, RegistryPreviewResponse } from 'librechat-data-provider';
import {
  useExternalCatalogServer,
  usePreviewExternalCatalogInstall,
} from '~/data-provider';
import { useLocalize } from '~/hooks';

interface RegistryDrawerProps {
  item: RegistryListItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * Called with the converted preview after a successful install click.
   * The parent decides whether to write to admin integrations or user
   * MCPs (the latter is wired in PR 1 step 4 / wizard).
   */
  onInstall: (preview: RegistryPreviewResponse) => void;
}

/**
 * Right-side details drawer for a selected registry entry.
 *
 * Fetches the raw server entry for the "Details" block, then calls
 * `usePreviewExternalCatalogInstall` on Install to convert it to
 * MCPOptions. The conversion happens server-side so the
 * `MCPOptionsSchema` validator runs before we hand the config to the
 * caller.
 */
export default function RegistryDrawer({
  item,
  open,
  onOpenChange,
  onInstall,
}: RegistryDrawerProps) {
  const localize = useLocalize();

  const detailQuery = useExternalCatalogServer(item?.name, {
    enabled: open && !!item,
  });

  const previewMutation = usePreviewExternalCatalogInstall();
  const [preview, setPreview] = useState<RegistryPreviewResponse | null>(null);

  // Reset preview when the drawer closes or the selected item changes.
  useEffect(() => {
    if (!open) {
      setPreview(null);
    }
  }, [open, item?.name]);

  const handleInstall = async () => {
    if (!item) return;
    try {
      const result = await previewMutation.mutateAsync({
        name: item.name,
        payload: { mode: 'admin' },
      });
      setPreview(result);
      onInstall(result);
    } catch {
      // Toast handled at the data-provider layer; nothing more to do here.
    }
  };

  return (
    <OGDialog open={open} onOpenChange={onOpenChange}>
      <OGDialogContent
        title=""
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto"
      >
        <div className="flex flex-col gap-4 p-5">
          {!item ? (
            <p className="text-sm text-text-secondary">
              {localize('com_admin_mcp_registry_select_prompt') ||
                'Selecione um servidor para ver os detalhes.'}
            </p>
          ) : (
            <>
              <OGDialogTitle>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-text-primary">{item.title}</h3>
                    <p className="font-mono text-xs text-text-secondary">{item.name}</p>
                  </div>
                  {item.repositoryUrl && (
                    <a
                      href={item.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary"
                    >
                      <ExternalLink className="size-3" />
                      {localize('com_admin_mcp_registry_view_repo') || 'Repo'}
                    </a>
                  )}
                </div>
              </OGDialogTitle>

              <p className="text-sm text-text-primary">{item.description}</p>

              <dl className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <dt className="font-medium text-text-secondary">
                    {localize('com_admin_mcp_registry_version')}
                  </dt>
                  <dd className="text-text-primary">v{item.version}</dd>
                </div>
                <div>
                  <dt className="font-medium text-text-secondary">
                    {localize('com_admin_mcp_registry_transports')}
                  </dt>
                  <dd className="flex flex-wrap gap-1">
                    {item.transports.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-blue-500/10 px-1.5 py-0.5 font-medium uppercase tracking-wide text-blue-600 dark:text-blue-300"
                      >
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              {item.oauthHint && (
                <div className="flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-xs text-amber-700 dark:text-amber-200">
                  <KeyRound className="mt-0.5 size-3.5 flex-shrink-0" />
                  <span>{localize('com_admin_mcp_registry_oauth_required_hint')}</span>
                </div>
              )}

              {detailQuery.isLoading && (
                <div className="flex items-center justify-center py-4">
                  <Spinner className="size-4" />
                </div>
              )}

              {detailQuery.isError && (
                <div className="flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/5 p-2.5 text-xs text-red-600 dark:text-red-300">
                  <AlertTriangle className="mt-0.5 size-3.5 flex-shrink-0" />
                  <span>{(detailQuery.error as Error)?.message}</span>
                </div>
              )}

              {preview && (
                <div className="flex items-start gap-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-xs text-green-700 dark:text-green-200">
                  <CheckCircle2 className="mt-0.5 size-3.5 flex-shrink-0" />
                  <span>{localize('com_admin_mcp_registry_install_success_hint')}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 border-t border-border-light pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenChange(false)}
                >
                  {localize('com_ui_close')}
                </Button>
                <Button
                  variant="submit"
                  size="sm"
                  onClick={handleInstall}
                  disabled={previewMutation.isLoading}
                >
                  {previewMutation.isLoading ? (
                    <Spinner className="size-3" />
                  ) : (
                    <KeyRound className="size-3" />
                  )}
                  <span className="ml-1">
                    {localize('com_admin_mcp_registry_install_button')}
                  </span>
                </Button>
              </div>
            </>
          )}
        </div>
      </OGDialogContent>
    </OGDialog>
  );
}