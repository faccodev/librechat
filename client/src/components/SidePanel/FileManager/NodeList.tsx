import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Loader2, RefreshCw } from 'lucide-react';
import type { WorkspaceNode } from 'librechat-data-provider';
import { useLocalize } from '~/hooks';
import NodeRow, { UpRow } from './NodeRow';
import { Skeleton } from '@librechat/client';

const ROW_HEIGHT = 40; // px; matches NodeRow's h-10 + gap accounting
const OVERSCAN = 6;

type NodeListProps = {
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  path: string;
  nodes: WorkspaceNode[];
  truncated: boolean;
  onEnterDir: (node: WorkspaceNode) => void;
  onSelect: (node: WorkspaceNode) => void;
  onGoUp: () => void;
  onRetry: () => void;
  onDropFiles?: (files: FileList) => void;
  onView?: (node: WorkspaceNode) => void;
  onEdit?: (node: WorkspaceNode) => void;
  onRename?: (node: WorkspaceNode) => void;
  onDelete?: (node: WorkspaceNode) => void;
};

const NodeList = ({
  isLoading,
  isError,
  isFetching,
  path,
  nodes,
  truncated,
  onEnterDir,
  onSelect,
  onGoUp,
  onRetry,
  onDropFiles,
  onView,
  onEdit,
  onRename,
  onDelete,
}: NodeListProps) => {
  const localize = useLocalize();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setContainerHeight(entry.contentRect.height);
    });
    observer.observe(el);
    setContainerHeight(el.clientHeight);
    return () => observer.disconnect();
  }, []);

  // Reset scroll on path change
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = 0;
    setScrollTop(0);
  }, [path]);

  if (isLoading) {
    return (
      <div
        ref={containerRef}
        className="flex-1 space-y-1 overflow-y-auto p-1"
        role="rowgroup"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center text-sm text-text-secondary">
        <p>{localize('com_fm_load_error')}</p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 rounded-md border border-border-light bg-transparent px-2.5 py-1 text-xs font-medium text-text-primary transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary"
        >
          <RefreshCw className="size-3" aria-hidden="true" />
          {localize('com_ui_retry')}
        </button>
      </div>
    );
  }

  if (nodes.length === 0) {
    return (
      <div
        ref={containerRef}
        className="flex flex-1 flex-col items-center justify-center gap-1 px-4 text-center text-sm text-text-secondary"
        onDragOver={(e) => {
          if (!onDropFiles) return;
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          if (!onDropFiles) return;
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files?.length) onDropFiles(e.dataTransfer.files);
        }}
      >
        <p className="font-medium text-text-primary">{localize('com_fm_empty_title')}</p>
        <p className="text-xs">
          {localize('com_fm_empty_description', { path: path || '/' })}
        </p>
        {onDropFiles && (
          <p className="mt-2 text-xs text-text-secondary">
            {localize('com_fm_drop_hint')}
          </p>
        )}
        {isDragging && (
          <div className="absolute inset-2 rounded-lg border-2 border-dashed border-text-primary/30 bg-text-primary/5" />
        )}
      </div>
    );
  }

  const showUpRow = path.length > 0;
  const totalRows = nodes.length + (showUpRow ? 1 : 0);
  const totalHeight = totalRows * ROW_HEIGHT;
  const firstVisibleIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const lastVisibleIndex = Math.min(
    totalRows - 1,
    Math.ceil((scrollTop + containerHeight) / ROW_HEIGHT) + OVERSCAN,
  );
  const offsetY = firstVisibleIndex * ROW_HEIGHT;

  return (
    <div
      ref={containerRef}
      role="grid"
      aria-busy={isFetching}
      onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
      onDragOver={(e) => {
        if (!onDropFiles) return;
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        if (!onDropFiles) return;
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.length) onDropFiles(e.dataTransfer.files);
      }}
      className="relative flex-1 overflow-y-auto p-1"
    >
      <div style={{ height: totalHeight, position: 'relative' }} role="rowgroup">
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {Array.from({ length: lastVisibleIndex - firstVisibleIndex + 1 }).map((_, i) => {
            const rowIndex = firstVisibleIndex + i;
            if (showUpRow && rowIndex === 0) {
              return (
                <div key="up" style={{ height: ROW_HEIGHT }} className="px-0.5">
                  <UpRow onClick={onGoUp} />
                </div>
              );
            }
            const node = nodes[rowIndex - (showUpRow ? 1 : 0)];
            if (!node) return null;
            return (
              <div
                key={node.path}
                style={{ height: ROW_HEIGHT }}
                className="px-0.5"
              >
                <NodeRow
                  node={node}
                  isActive={false}
                  onActivate={onSelect}
                  onOpen={onEnterDir}
                  onView={onView}
                  onEdit={onEdit}
                  onRename={onRename}
                  onDelete={onDelete}
                />
              </div>
            );
          })}
        </div>
      </div>
      {truncated && (
        <p className="mt-2 px-2 text-xs text-text-secondary">
          {localize('com_fm_truncated_notice')}
        </p>
      )}
      {isFetching && !isLoading && (
        <p className="mt-2 flex items-center gap-1 px-2 text-xs text-text-secondary">
          <Loader2 className="size-3 animate-spin" aria-hidden="true" />
          {localize('com_fm_refreshing')}
        </p>
      )}
      {isDragging && onDropFiles && (
        <div className="pointer-events-none absolute inset-2 rounded-lg border-2 border-dashed border-text-primary/30 bg-text-primary/5" />
      )}
    </div>
  );
};

export default NodeList;
