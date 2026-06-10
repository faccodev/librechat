import { useEffect, useState } from 'react';
import { Folder as FolderIcon, ChevronRight, Loader2 } from 'lucide-react';
import type { WorkspaceNode } from 'librechat-data-provider';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Spinner,
} from '@librechat/client';
import { useLocalize } from '~/hooks';
import { useWorkspaceTree } from '~/data-provider';

type MoveDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Either a single node (single-item move) or several nodes (bulk move). */
  node?: WorkspaceNode | null;
  nodes?: WorkspaceNode[];
  onSubmit: (toParent: string) => void;
  isSubmitting?: boolean;
};

/**
 * Folder-picker dialog used to relocate a workspace file or folder.
 *
 * Renders a breadcrumb-style path editor + a tree of subfolders at the
 * current path. The user clicks folders to drill in, then confirms the
 * destination shown in the breadcrumb.
 *
 * Backend already rejects: moving a folder into itself, into a non-existent
 * parent, and collisions with same-named entries (see
 * packages/api/src/files/workspaceFiles.ts:moveWorkspaceNode).
 */
const MoveDialog = ({
  open,
  onOpenChange,
  node,
  nodes,
  onSubmit,
  isSubmitting,
}: MoveDialogProps) => {
  const localize = useLocalize();
  /** Working copy of the destination path so the user can drill in and
   * back out before committing. */
  const [draftPath, setDraftPath] = useState('');
  const currentPath = draftPath;

  const isBulk = Array.isArray(nodes) && nodes.length > 0;
  const sourceNodes = isBulk ? (nodes as WorkspaceNode[]) : node ? [node] : [];

  /** When the dialog opens, start the picker at the first source's parent
   * (not the source itself — moving into the same parent is a no-op). */
  useEffect(() => {
    if (open && sourceNodes[0]) {
      const segments = sourceNodes[0].path.split('/').filter(Boolean);
      segments.pop();
      setDraftPath(segments.join('/'));
    }
  }, [open, sourceNodes]);

  const { data: treeData, isLoading: isTreeLoading } = useWorkspaceTree(currentPath, {
    enabled: open,
  });

  const segments = currentPath.split('/').filter(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !node) return;
    onSubmit(currentPath);
  };

  if (sourceNodes.length === 0) {
    return null;
  }

  /** Forbid picking the source itself or any of its descendants — backend
   * would reject, so we just disable the submit button and grey out the
   * tree to make the rule visible. For bulk mode, the rule applies to
   * every source. */
  const sourceIsAncestor = sourceNodes.some(
    (src) => currentPath === src.path || currentPath.startsWith(src.path + '/'),
  );
  const canSubmit = !isSubmitting && !sourceIsAncestor;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{localize('com_fm_dialog_move_title')}</DialogTitle>
            <DialogDescription>
              {isBulk
                ? localize('com_fm_dialog_move_bulk_description', {
                    count: sourceNodes.length,
                  })
                : localize('com_fm_dialog_move_description', { name: sourceNodes[0].name })}
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-3">
            <label className="mb-1.5 block text-sm font-medium text-text-primary">
              {localize('com_fm_dialog_move_destination_label')}
            </label>

            {/* Breadcrumb of the current draft path with back/up segments */}
            <div className="flex flex-wrap items-center gap-1 rounded border border-border-light bg-surface-primary px-2 py-1.5 text-sm">
              <button
                type="button"
                className="text-text-secondary hover:text-text-primary disabled:opacity-50"
                onClick={() => setDraftPath('')}
                disabled={segments.length === 0}
                aria-label={localize('com_fm_go_up_aria')}
              >
                /
              </button>
              {segments.map((segment, index) => {
                const partialPath = segments.slice(0, index + 1).join('/');
                return (
                  <span key={partialPath} className="flex items-center gap-1">
                    <ChevronRight className="size-3 text-text-secondary" aria-hidden="true" />
                    <button
                      type="button"
                      className="hover:text-text-primary"
                      onClick={() => setDraftPath(partialPath)}
                    >
                      {segment}
                    </button>
                  </span>
                );
              })}
            </div>

            {/* Tree of subfolders at the current draft path */}
            <div className="mt-3 max-h-56 overflow-y-auto rounded border border-border-light bg-surface-primary">
              {isTreeLoading ? (
                <div className="flex items-center gap-2 px-3 py-4 text-sm text-text-secondary">
                  <Spinner className="size-3.5" />
                  <span>{localize('com_fm_dialog_move_loading')}</span>
                </div>
              ) : !treeData || treeData.nodes.filter((n) => n.type === 'dir').length === 0 ? (
                <p className="px-3 py-4 text-sm text-text-secondary">
                  {localize('com_fm_dialog_move_empty')}
                </p>
              ) : (
                <ul className="py-1">
                  {treeData.nodes
                    .filter((n) => n.type === 'dir')
                    .map((folder) => (
                      <li key={folder.path}>
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-surface-hover"
                          onClick={() => setDraftPath(folder.path)}
                        >
                          <FolderIcon className="size-4 shrink-0 text-text-primary" aria-hidden="true" />
                          <span className="flex-1 truncate text-text-primary">{folder.name}</span>
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {sourceIsAncestor ? (
              <p className="mt-2 text-xs text-red-600">
                {localize('com_fm_dialog_move_in_self_error')}
              </p>
            ) : null}
          </div>

          <DialogFooter className="justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {localize('com_ui_cancel')}
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="mr-1.5 size-3.5 animate-spin" /> : null}
              {localize('com_fm_action_move')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MoveDialog;
