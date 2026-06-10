import {
  CheckSquare,
  Download,
  Edit3,
  Eye,
  FileEdit,
  FolderInput,
  FolderOpen,
  Link as LinkIcon,
  MoreVertical,
  Trash2,
  Paperclip,
} from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@librechat/client';
import { previewKindFromNode } from '~/data-provider';
import { useLocalize } from '~/hooks';
import { downloadWorkspaceFile } from './utils/download';
import { useToastContext } from '@librechat/client';
import type { WorkspaceNode } from 'librechat-data-provider';
import { useCallback } from 'react';

export type NodeActionsProps = {
  node: WorkspaceNode;
  onView?: (node: WorkspaceNode) => void;
  onEdit?: (node: WorkspaceNode) => void;
  onRename?: (node: WorkspaceNode) => void;
  onDelete?: (node: WorkspaceNode) => void;
  onAttach?: (node: WorkspaceNode) => void;
  onCopyPath?: (node: WorkspaceNode) => void;
  onMove?: (node: WorkspaceNode) => void;
  onEnterSelectMode?: (node: WorkspaceNode) => void;
  selectMode?: boolean;
};

/**
 * Three-dots menu surfaced on every row. The set of available
 * actions depends on the node kind (e.g. Edit is only offered for
 * text/code files; View is offered for everything that has a
 * preview).
 */
const NodeActions = ({
  node,
  onView,
  onEdit,
  onRename,
  onDelete,
  onAttach,
  onCopyPath,
  onMove,
  onEnterSelectMode,
  selectMode,
}: NodeActionsProps) => {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const kind = previewKindFromNode(node);
  const canEdit = node.type === 'file' && kind === 'text';

  const handleDownload = useCallback(async () => {
    try {
      await downloadWorkspaceFile(node.path, node.name);
    } catch (err) {
      console.error('[FileManager] download failed:', err);
      showToast({ message: localize('com_fm_download_failed'), status: 'error' });
    }
  }, [node, showToast, localize]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 shrink-0 bg-transparent"
          aria-label={localize('com_fm_action_more_aria', { name: node.name })}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="size-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {onView && (
          <DropdownMenuItem
            onSelect={(e) => {
              /** Prevent the underlying row from interpreting this as an
               * activation click. Radix renders the menu content in a
               * portal, but the original click still bubbles through React
               * unless we stop it. */
              e.preventDefault();
              onView(node);
            }}
          >
            <Eye className="mr-2 size-4" aria-hidden="true" />
            {localize('com_fm_action_view')}
          </DropdownMenuItem>
        )}
        {onEdit && canEdit && (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              onEdit(node);
            }}
          >
            <Edit3 className="mr-2 size-4" aria-hidden="true" />
            {localize('com_fm_action_edit')}
          </DropdownMenuItem>
        )}
        {node.type === 'file' && onAttach && (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              onAttach(node);
            }}
          >
            <Paperclip className="mr-2 size-4" aria-hidden="true" />
            {localize('com_ui_attach')}
          </DropdownMenuItem>
        )}
        {onCopyPath && (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              onCopyPath(node);
            }}
          >
            <LinkIcon className="mr-2 size-4" aria-hidden="true" />
            {localize('com_fm_action_copy_path')}
          </DropdownMenuItem>
        )}
        {node.type === 'dir' && onEdit && (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              onEdit(node);
            }}
          >
            <FolderOpen className="mr-2 size-4" aria-hidden="true" />
            {localize('com_fm_action_open')}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            void handleDownload();
          }}
        >
          <Download className="mr-2 size-4" aria-hidden="true" />
          {localize('com_fm_action_download')}
        </DropdownMenuItem>
        {(onRename || onDelete) && <DropdownMenuSeparator />}
        {onRename && (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              onRename(node);
            }}
          >
            <FileEdit className="mr-2 size-4" aria-hidden="true" />
            {localize('com_fm_action_rename')}
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              onDelete(node);
            }}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 size-4" aria-hidden="true" />
            {localize('com_fm_action_delete')}
          </DropdownMenuItem>
        )}
        {onMove && (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              onMove(node);
            }}
          >
            <FolderInput className="mr-2 size-4" aria-hidden="true" />
            {localize('com_fm_action_move')}
          </DropdownMenuItem>
        )}
        {onEnterSelectMode && !selectMode && (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              onEnterSelectMode(node);
            }}
          >
            <CheckSquare className="mr-2 size-4" aria-hidden="true" />
            {localize('com_fm_action_select')}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NodeActions;
