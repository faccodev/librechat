import { memo } from 'react';
import {
  Folder as FolderIcon,
  ChevronUp,
  File as FileIcon,
} from 'lucide-react';
import type { WorkspaceNode } from 'librechat-data-provider';
import { useLocalize } from '~/hooks';
import { formatBytes, formatRelative } from './utils/format';
import { getCategoryIcon, getFileCategory } from './utils/mime';
import { cn } from '~/utils';
import NodeActions from './NodeActions';

type NodeRowProps = {
  node: WorkspaceNode;
  isActive: boolean;
  onActivate: (node: WorkspaceNode) => void;
  onOpen: (node: WorkspaceNode) => void;
  onView?: (node: WorkspaceNode) => void;
  onEdit?: (node: WorkspaceNode) => void;
  onRename?: (node: WorkspaceNode) => void;
  onDelete?: (node: WorkspaceNode) => void;
  onAttach?: (node: WorkspaceNode) => void;
};

const NodeRow = ({
  node,
  isActive,
  onActivate,
  onOpen,
  onView,
  onEdit,
  onRename,
  onDelete,
  onAttach,
}: NodeRowProps) => {
  const localize = useLocalize();
  const isDir = node.type === 'dir';
  const Icon = isDir
    ? FolderIcon
    : (getCategoryIcon(getFileCategory(node.name, node.mime)) ?? FileIcon);
  const ariaLabel = isDir
    ? localize('com_fm_row_folder_aria', { name: node.name })
    : localize('com_fm_row_file_aria', { name: node.name });

  return (
    <div
      role="row"
      aria-selected={isActive}
      aria-label={ariaLabel}
      tabIndex={0}
      onClick={() => onActivate(node)}
      onDoubleClick={() => isDir && onOpen(node)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          isDir ? onOpen(node) : onActivate(node);
        }
      }}
      className={cn(
        'group flex h-10 w-full items-center gap-2 rounded-md px-2 text-sm transition-colors',
        'hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary',
        isActive && 'bg-surface-active font-medium ring-1 ring-inset ring-text-primary/20',
      )}
    >
      <Icon
        className={cn(
          'size-4 shrink-0',
          isDir ? 'text-text-primary' : 'text-text-secondary',
        )}
        aria-hidden="true"
      />
      <span className="flex-1 truncate" title={node.name}>
        {node.name}
      </span>
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
      <span className="ml-1 shrink-0">
        <NodeActions
          node={node}
          onView={onView}
          onEdit={onEdit}
          onRename={onRename}
          onDelete={onDelete}
          onAttach={onAttach}
        />
      </span>
    </div>
  );
};

export const UpRow = memo(function UpRow({ onClick }: { onClick: () => void }) {
  const localize = useLocalize();
  return (
    <div
      role="row"
      aria-label={localize('com_fm_go_up_aria')}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="flex h-10 w-full cursor-pointer items-center gap-2 rounded-md px-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary"
    >
      <ChevronUp className="size-4 shrink-0" aria-hidden="true" />
      <span className="flex-1 truncate">..</span>
    </div>
  );
});

export default memo(NodeRow);
