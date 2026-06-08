import {
  Download,
  Edit3,
  Eye,
  FileEdit,
  FolderOpen,
  MoreVertical,
  Trash2,
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
};

/**
 * Three-dots menu surfaced on every row. The set of available
 * actions depends on the node kind (e.g. Edit is only offered for
 * text/code files; View is offered for everything that has a
 * preview).
 */
const NodeActions = ({ node, onView, onEdit, onRename, onDelete }: NodeActionsProps) => {
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
          <DropdownMenuItem onSelect={() => onView(node)}>
            <Eye className="mr-2 size-4" aria-hidden="true" />
            {localize('com_fm_action_view')}
          </DropdownMenuItem>
        )}
        {onEdit && canEdit && (
          <DropdownMenuItem onSelect={() => onEdit(node)}>
            <Edit3 className="mr-2 size-4" aria-hidden="true" />
            {localize('com_fm_action_edit')}
          </DropdownMenuItem>
        )}
        {node.type === 'dir' && onEdit && (
          <DropdownMenuItem onSelect={() => onEdit(node)}>
            <FolderOpen className="mr-2 size-4" aria-hidden="true" />
            {localize('com_fm_action_open')}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={handleDownload}>
          <Download className="mr-2 size-4" aria-hidden="true" />
          {localize('com_fm_action_download')}
        </DropdownMenuItem>
        {(onRename || onDelete) && <DropdownMenuSeparator />}
        {onRename && (
          <DropdownMenuItem onSelect={() => onRename(node)}>
            <FileEdit className="mr-2 size-4" aria-hidden="true" />
            {localize('com_fm_action_rename')}
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem
            onSelect={() => onDelete(node)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 size-4" aria-hidden="true" />
            {localize('com_fm_action_delete')}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NodeActions;
