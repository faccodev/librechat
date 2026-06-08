import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@librechat/client';
import { useLocalize } from '~/hooks';
import { formatBytes } from '../utils/format';
import type { WorkspaceNode } from 'librechat-data-provider';

type DeleteConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodes: WorkspaceNode[];
  onConfirm: () => void;
  isSubmitting?: boolean;
};

const DeleteConfirmDialog = ({
  open,
  onOpenChange,
  nodes,
  onConfirm,
  isSubmitting = false,
}: DeleteConfirmDialogProps) => {
  const localize = useLocalize();
  const hasDir = nodes.some((n) => n.type === 'dir');
  const total = nodes.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {total === 1
              ? localize('com_fm_dialog_delete_title_one')
              : localize('com_fm_dialog_delete_title_many', { count: total })}
          </DialogTitle>
          <DialogDescription>
            {hasDir
              ? localize('com_fm_dialog_delete_description_with_dir')
              : localize('com_fm_dialog_delete_description')}
          </DialogDescription>
        </DialogHeader>
        <ul className="max-h-60 space-y-1 overflow-auto px-6 py-2 text-sm">
          {nodes.map((node) => (
            <li
              key={node.path}
              className="flex items-center gap-2 rounded border border-border-light bg-surface-secondary px-2 py-1"
            >
              <span className="truncate font-medium text-text-primary">{node.name}</span>
              <span className="ml-auto text-xs text-text-secondary">
                {node.type === 'dir'
                  ? localize('com_fm_kind_dir')
                  : formatBytes(node.size)}
              </span>
            </li>
          ))}
        </ul>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            {localize('com_ui_cancel')}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {localize('com_ui_delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
