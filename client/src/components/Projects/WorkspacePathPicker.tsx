import { useState, useCallback } from 'react';
import { ChevronRight, Folder, FolderOpen, ArrowLeft, Check, X } from 'lucide-react';
import { Label, Spinner } from '@librechat/client';
import { useAvailableProjectWorkspaces } from '~/data-provider';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

type WorkspacePathPickerProps = {
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
};

/** Split a path into breadcrumb segments, including a "root" entry. */
function parseBreadcrumbs(currentPath: string | null): Array<{ label: string; path: string | null }> {
  if (!currentPath) {
    return [{ label: '/', path: null }];
  }
  const parts = currentPath.split('/').filter(Boolean);
  const crumbs: Array<{ label: string; path: string | null }> = [{ label: '/', path: null }];
  parts.forEach((part, i) => {
    crumbs.push({ label: part, path: '/' + parts.slice(0, i + 1).join('/') });
  });
  return crumbs;
}

export default function WorkspacePathPicker({ value, onChange, disabled }: WorkspacePathPickerProps) {
  const localize = useLocalize();
  // browsePath = the directory currently being browsed (null = roots)
  const [browsePath, setBrowsePath] = useState<string | null>(null);

  const { data, isLoading } = useAvailableProjectWorkspaces(browsePath);

  const workspaces = data?.workspaces ?? [];
  const breadcrumbs = parseBreadcrumbs(browsePath);

  const handleNavigate = useCallback((path: string) => {
    setBrowsePath(path);
  }, []);

  const handleSelect = useCallback(
    (path: string) => {
      onChange(path === value ? null : path);
    },
    [onChange, value],
  );

  const handleClear = useCallback(() => {
    onChange(null);
  }, [onChange]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-text-primary">
          {localize('com_ui_project_workspace_path')}
        </Label>
        {isLoading && <Spinner className="size-4" />}
      </div>

      {/* Selected value badge */}
      {value && (
        <div className="flex items-center gap-1.5 rounded-md border border-border-medium bg-surface-secondary px-2.5 py-1.5 text-xs">
          <Folder className="h-3.5 w-3.5 shrink-0 text-text-secondary" />
          <span className="min-w-0 flex-1 truncate font-mono text-text-primary" title={value}>
            {value}
          </span>
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className="shrink-0 rounded p-0.5 text-text-secondary transition-colors hover:text-text-primary disabled:opacity-50"
            aria-label={localize('com_ui_project_workspace_path_clear')}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* File browser panel */}
      <div className="rounded-lg border border-border-medium bg-surface-secondary overflow-hidden">
        {/* Breadcrumb navigation bar */}
        <div className="flex items-center gap-0.5 border-b border-border-medium bg-surface-primary px-2 py-1.5 overflow-x-auto">
          {breadcrumbs.map((crumb, i) => (
            <div key={crumb.path ?? '__root__'} className="flex items-center gap-0.5 shrink-0">
              {i > 0 && <ChevronRight className="h-3 w-3 text-text-tertiary" aria-hidden />}
              <button
                type="button"
                onClick={() => setBrowsePath(crumb.path)}
                disabled={disabled}
                className={cn(
                  'rounded px-1.5 py-0.5 text-xs transition-colors hover:bg-surface-hover disabled:opacity-50',
                  i === breadcrumbs.length - 1
                    ? 'font-medium text-text-primary'
                    : 'text-text-secondary hover:text-text-primary',
                )}
              >
                {crumb.label}
              </button>
            </div>
          ))}
        </div>

        {/* Directory listing */}
        <div className="max-h-48 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <Spinner className="size-5 text-text-secondary" />
            </div>
          ) : workspaces.length === 0 ? (
            <div className="py-6 text-center text-xs text-text-secondary italic">
              {localize('com_ui_project_workspace_path_none')}
            </div>
          ) : (
            <ul className="divide-y divide-border-light">
              {/* "Back" row when browsing inside a directory */}
              {browsePath && (
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      const parent = breadcrumbs[breadcrumbs.length - 2]?.path ?? null;
                      setBrowsePath(parent);
                    }}
                    disabled={disabled}
                    className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text-secondary transition-colors hover:bg-surface-hover disabled:opacity-50"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span className="italic">{localize('com_ui_back') ?? '..'}</span>
                  </button>
                </li>
              )}
              {workspaces.map((ws) => {
                const isSelected = value === ws.path;
                return (
                  <li key={ws.path} className="flex items-center">
                    {/* Select this folder as workspace */}
                    <button
                      type="button"
                      onClick={() => handleSelect(ws.path)}
                      disabled={disabled}
                      className={cn(
                        'flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-xs transition-colors hover:bg-surface-hover disabled:opacity-50',
                        isSelected
                          ? 'bg-surface-active text-text-primary font-medium'
                          : 'text-text-primary',
                      )}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? (
                        <FolderOpen className="h-4 w-4 shrink-0 text-blue-500" />
                      ) : (
                        <Folder className="h-4 w-4 shrink-0 text-text-secondary" />
                      )}
                      <span className="min-w-0 flex-1 truncate text-left font-mono">{ws.label}</span>
                      {isSelected && (
                        <Check className="h-3.5 w-3.5 shrink-0 text-blue-500" aria-hidden />
                      )}
                    </button>
                    {/* Navigate into this folder */}
                    <button
                      type="button"
                      onClick={() => handleNavigate(ws.path)}
                      disabled={disabled}
                      className="shrink-0 px-2 py-2 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-secondary disabled:opacity-50"
                      aria-label={`${localize('com_ui_open_project') ?? 'Browse'} ${ws.label}`}
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <p className="text-xs text-text-secondary">{localize('com_ui_project_workspace_path_help')}</p>
    </div>
  );
}
