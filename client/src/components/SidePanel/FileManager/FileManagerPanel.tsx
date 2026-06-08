import { useMemo, useState, useCallback, useEffect } from 'react';
import { matchSorter } from 'match-sorter';
import { RefreshCw, Search, X } from 'lucide-react';
import type { WorkspaceNode } from 'librechat-data-provider';
import {
  Button,
  FilterInput,
  TooltipAnchor,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@librechat/client';
import { useWorkspaceTree } from '~/data-provider';
import { useLocalize } from '~/hooks';
import { useFileManagerPath } from './hooks/useFileManagerPath';
import Breadcrumb from './Breadcrumb';
import NodeList from './NodeList';
import PreviewPane from './PreviewPane';

const PANEL_LIST_DEFAULT = 60;
const PANEL_LIST_MIN = 35;
const PANEL_LIST_MAX = 80;
const LS_PANEL_SIZE_KEY = 'librechat:fm:listSize';

const FileManagerPanel = () => {
  const localize = useLocalize();
  const { path, setPath } = useFileManagerPath();
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState<WorkspaceNode | null>(null);
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
      setSelected(null);
      setPath(node.path);
    },
    [setPath],
  );

  const handleSelect = useCallback((node: WorkspaceNode) => {
    if (node.type === 'dir') {
      setSelected(null);
      setPath(node.path);
      return;
    }
    setSelected(node);
  }, [setPath]);

  const handleClosePreview = useCallback(() => setSelected(null), []);

  const handleGoUp = useCallback(() => {
    if (!path) return;
    const segments = path.split('/').filter(Boolean);
    segments.pop();
    setPath(segments.join('/'));
    setSelected(null);
  }, [path, setPath]);

  const handleClearFilter = useCallback(() => setFilter(''), []);

  // ESC closes the preview regardless of focus inside the panel.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selected) {
        e.stopPropagation();
        setSelected(null);
      }
    };
    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', onKeyDown, { capture: true });
  }, [selected]);

  // Clear selection when navigating to a different directory so the
  // preview pane doesn't keep showing a file that's no longer in view.
  useEffect(() => {
    setSelected(null);
  }, [path]);

  return (
    <div
      role="region"
      aria-label={localize('com_sidepanel_file_manager')}
      className="flex h-full w-full flex-col"
    >
      <ResizablePanelGroup orientation="horizontal" className="flex-1">
        <ResizablePanel
          defaultSize={PANEL_LIST_DEFAULT}
          minSize={PANEL_LIST_MIN}
          maxSize={PANEL_LIST_MAX}
          id="fm-list"
        >
          <div className="flex h-full w-full flex-col px-3 pb-3 pt-2">
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
              selected={selected}
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
        </ResizablePanel>

        {selected && (
          <>
            <ResizableHandle withHandle id="fm-resize" />
            <ResizablePanel id="fm-preview" minSize={20}>
              <PreviewPane node={selected} onClose={handleClosePreview} />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default FileManagerPanel;
