import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { dataService, QueryKeys } from 'librechat-data-provider';
import type { WorkspaceSearchResult, WorkspaceNode } from 'librechat-data-provider';
import { matchSorter } from 'match-sorter';
import { ChevronRight, File as FileIcon, Folder as FolderIcon, Loader2, Search } from 'lucide-react';
import { useLocalize } from '~/hooks';
import { formatBytes, formatRelative } from './utils/format';
import { getCategoryIcon, getFileCategory } from './utils/mime';
import { cn } from '~/utils';

type SearchResultsViewProps = {
  /** Recursive search query string. Empty disables the hook. */
  query: string;
  onOpenDir: (path: string) => void;
  onOpenFile: (node: WorkspaceNode) => void;
};

/**
 * Debounced wrapper around `getWorkspaceSearch`. Activates only when
 * the query is at least 3 characters so casual filters stay local
 * (cheaper + zero round-trip). Returns the raw matches plus loading
 * state so the parent can render the appropriate indicator.
 */
const useDebouncedWorkspaceSearch = (query: string) => {
  const [debounced, setDebounced] = useState(query);
  useEffect(() => {
    const handle = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(handle);
  }, [query]);
  const trimmed = debounced.trim();
  return useQuery<WorkspaceSearchResult>({
    queryKey: [QueryKeys.workspaceSearch, trimmed],
    enabled: trimmed.length >= 3,
    queryFn: () => dataService.getWorkspaceSearch(trimmed),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60 * 1000,
  });
};

const SearchResultsView = ({ query, onOpenDir, onOpenFile }: SearchResultsViewProps) => {
  const localize = useLocalize();
  const search = useDebouncedWorkspaceSearch(query);
  const matches = search.data?.matches ?? [];
  const total = search.data?.total ?? 0;
  const truncated = search.data?.truncated ?? false;
  const isLoading = search.isLoading || search.isFetching;
  const isError = search.isError;

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 text-center text-sm text-text-secondary">
        {localize('com_fm_search_error')}
      </div>
    );
  }

  if (isLoading && matches.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center gap-2 text-text-secondary">
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        <span className="text-sm">{localize('com_fm_search_searching')}</span>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-1 px-4 text-center text-sm text-text-secondary">
        <Search className="size-8 opacity-40" aria-hidden="true" />
        <p className="font-medium text-text-primary">{localize('com_fm_search_no_results')}</p>
        <p className="text-xs">{localize('com_fm_search_no_results_description', { query })}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto" role="grid" aria-busy={isLoading}>
      <div className="flex items-center justify-between px-3 py-1.5 text-xs text-text-secondary">
        <span>
          {truncated
            ? localize('com_fm_search_truncated', { count: total })
            : localize('com_fm_search_match_count', { count: total })}
        </span>
        {isLoading && <Loader2 className="size-3 animate-spin" aria-hidden="true" />}
      </div>
      <ul className="space-y-0.5 px-1">
        {matches.map((node) => (
          <SearchResultRow
            key={node.path}
            node={node}
            onOpenDir={onOpenDir}
            onOpenFile={onOpenFile}
          />
        ))}
      </ul>
    </div>
  );
};

type SearchResultRowProps = {
  node: WorkspaceNode;
  onOpenDir: (path: string) => void;
  onOpenFile: (node: WorkspaceNode) => void;
};

const SearchResultRow = ({ node, onOpenDir, onOpenFile }: SearchResultRowProps) => {
  const localize = useLocalize();
  const isDir = node.type === 'dir';
  const Icon = isDir
    ? FolderIcon
    : (getCategoryIcon(getFileCategory(node.name, node.mime)) ?? FileIcon);
  const parentPath = node.path.includes('/')
    ? node.path.slice(0, node.path.lastIndexOf('/'))
    : '';

  const handleClick = () => {
    if (isDir) {
      onOpenDir(node.path);
    } else {
      onOpenFile(node);
    }
  };

  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        className={cn(
          'group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors',
          'hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary',
        )}
        aria-label={isDir ? `Folder ${node.path}` : `File ${node.path}`}
      >
        <Icon
          className={cn(
            'size-4 shrink-0',
            isDir ? 'text-text-primary' : 'text-text-secondary',
          )}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-text-primary" title={node.name}>
            {node.name}
          </div>
          <div
            className="flex items-center gap-1 truncate text-xs text-text-secondary"
            title={parentPath || '/'}
          >
            <span className="truncate">{parentPath || '/'}</span>
            {!isDir && parentPath && <ChevronRight className="size-3 shrink-0" aria-hidden="true" />}
          </div>
        </div>
        <span className="hidden w-20 shrink-0 text-right text-xs text-text-secondary sm:block">
          {isDir
            ? node.childCount != null
              ? localize('com_fm_items_count', { count: node.childCount })
              : '—'
            : formatBytes(node.size)}
        </span>
        <span className="hidden w-16 shrink-0 text-right text-xs text-text-secondary sm:block">
          {formatRelative(node.modifiedAt)}
        </span>
      </button>
    </li>
  );
};

export default SearchResultsView;
