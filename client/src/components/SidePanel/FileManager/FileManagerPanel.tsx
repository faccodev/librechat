import { useMemo, useState, useCallback } from 'react';
import { matchSorter } from 'match-sorter';
import { RefreshCw, Search, X } from 'lucide-react';
import type { WorkspaceNode } from 'librechat-data-provider';
import { Button, FilterInput, TooltipAnchor } from '@librechat/client';
import { useWorkspaceTree } from '~/data-provider';
import { useLocalize } from '~/hooks';
import { useFileManagerPath } from './hooks/useFileManagerPath';
import Breadcrumb from './Breadcrumb';
import NodeList from './NodeList';

const FileManagerPanel = () => {
  const localize = useLocalize();
  const { path, setPath } = useFileManagerPath();
  const [filter, setFilter] = useState('');
  const tree = useWorkspaceTree(path);
  const { data, isLoading, isError, isFetching, refetch } = tree;

  const allNodes = data?.nodes ?? [];
  const truncated = data?.truncated ?? false;
  const workspacePath = data?.workspacePath;

  const visibleNodes = useMemo(() => {
    if (!filter.trim()) return allNodes;
    return matchSorter(allNodes, filter, { keys: ['name'] });
  }, [allNodes, filter]);

  const handleEnterDir = useCallback(
    (node: WorkspaceNode) => {
      if (node.type !== 'dir') return;
      setPath(node.path);
    },
    [setPath],
  );

  const handleSelect = useCallback((_node: WorkspaceNode) => {
    /* Etapa 2 will render the preview pane here. For now selection is a
     * no-op so the row's onActivate wiring stays intact and the type
     * signature doesn't have to change when the pane lands. */
  }, []);

  const handleGoUp = useCallback(() => {
    if (!path) return;
    const segments = path.split('/').filter(Boolean);
    segments.pop();
    setPath(segments.join('/'));
  }, [path, setPath]);

  const handleClearFilter = useCallback(() => setFilter(''), []);

  return (
    <div
      role="region"
      aria-label={localize('com_sidepanel_file_manager')}
      className="flex h-full w-full flex-col px-3 pb-3 pt-2"
    >
      <div className="flex items-center gap-2 pb-2">
        <div className="relative flex-1">
          <FilterInput
            inputId="fm-filter"
            label={localize('com_fm_filter_placeholder')}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          {filter ? (
            <button
              type="button"
              onClick={handleClearFilter}
              aria-label={localize('com_ui_clear')}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          ) : (
            <Search
              className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
          )}
        </div>
        <TooltipAnchor
          description={localize('com_ui_refresh')}
          side="bottom"
          render={
            <Button
              variant="outline"
              size="icon"
              className="size-9 shrink-0 bg-transparent"
              aria-label={localize('com_ui_refresh')}
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw
                className={isFetching ? 'size-4 animate-spin' : 'size-4'}
                aria-hidden="true"
              />
            </Button>
          }
        />
      </div>

      <div className="min-w-0 pb-2">
        <Breadcrumb path={path} onNavigate={setPath} />
      </div>

      <NodeList
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        path={path}
        nodes={visibleNodes}
        truncated={truncated}
        onEnterDir={handleEnterDir}
        onSelect={handleSelect}
        onGoUp={handleGoUp}
        onRetry={() => refetch()}
      />

      {workspacePath && (
        <p
          className="mt-1 truncate border-t border-border-light pt-2 font-mono text-[10px] text-text-secondary"
          title={workspacePath}
        >
          {workspacePath}
        </p>
      )}
    </div>
  );
};

export default FileManagerPanel;
