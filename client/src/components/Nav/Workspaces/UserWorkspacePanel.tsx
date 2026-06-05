import React, { useState, useEffect } from 'react';
import { Folder, Save, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button, useToastContext } from '@librechat/client';
import { useUserWorkspace, useSetUserWorkspace } from '~/data-provider';
import { useLocalize } from '~/hooks';

interface UserWorkspacePanelProps {
  userId: string;
}

export default function UserWorkspacePanel({ userId }: UserWorkspacePanelProps) {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const { data, isLoading, error } = useUserWorkspace(userId);
  const setWorkspaceMutation = useSetUserWorkspace(userId);
  const [subdir, setSubdir] = useState<string>('');

  useEffect(() => {
    if (data) {
      setSubdir(data.workspaceSubdir ?? '');
    }
  }, [data]);

  const handleSave = () => {
    const value = subdir.trim() || null;
    setWorkspaceMutation.mutate(value, {
      onSuccess: () => {
        showToast({ status: 'success', message: localize('com_ui_saved') });
      },
      onError: (err: any) => {
        showToast({
          status: 'error',
          message: err?.message || 'Failed to save workspace configuration',
        });
      },
    });
  };

  if (isLoading) {
    return <div className="text-sm text-text-secondary">{localize('com_ui_loading')}</div>;
  }

  if (error) {
    return <div className="text-sm text-red-500">Failed to load workspace info</div>;
  }

  const resolvedPath = data?.resolvedPath || (subdir.trim() ? `/workspaces/${subdir.trim()}` : null);
  const enabled = data?.enabled ?? false;

  return (
    <div className="rounded-xl border border-border-light bg-surface-primary p-4 text-text-primary">
      <div className="mb-4 flex items-center gap-2 font-medium">
        <Folder className="size-5 text-text-secondary" aria-hidden="true" />
        <h3>{localize('com_ui_workspace_admin_label')}</h3>
        <span className="ml-auto text-xs text-text-secondary font-normal">[Admin Only]</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            {localize('com_ui_workspace_subdir')}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex h-9 w-full rounded-lg border border-border-light bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g. alice"
              value={subdir}
              onChange={(e) => setSubdir(e.target.value)}
              disabled={setWorkspaceMutation.isLoading}
            />
            <Button
              variant="submit"
              size="sm"
              disabled={setWorkspaceMutation.isLoading}
              onClick={handleSave}
            >
              <Save className="mr-1.5 size-4" aria-hidden="true" />
              {localize('com_ui_workspace_save')}
            </Button>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            {localize('com_ui_workspace_admin_hint')}
          </p>
        </div>

        {subdir.trim() && (
          <div className="rounded-lg bg-surface-secondary p-3 text-xs space-y-1.5">
            <div>
              <span className="font-semibold text-text-secondary">
                {localize('com_ui_workspace_path_preview')}:
              </span>{' '}
              <code className="text-text-primary bg-surface-tertiary px-1 rounded">{resolvedPath}</code>
            </div>
            {enabled ? (
              <div className="flex items-center gap-1 text-green-600 dark:text-green-500 font-medium">
                <CheckCircle className="size-4" aria-hidden="true" />
                <span>Workspace system active</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-500 font-medium">
                <AlertTriangle className="size-4" aria-hidden="true" />
                <span>Workspaces are disabled (check librechat.yaml)</span>
              </div>
            )}
          </div>
        )}

        {!subdir.trim() && (
          <div className="text-xs text-text-secondary italic">
            {localize('com_ui_workspace_none')}
          </div>
        )}

        <div className="text-xs text-yellow-600 dark:text-yellow-500 mt-2 font-medium">
          ⚠️ {localize('com_ui_workspace_readonly')}
        </div>
      </div>
    </div>
  );
}
