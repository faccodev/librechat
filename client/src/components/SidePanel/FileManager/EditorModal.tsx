import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Spinner,
  useToastContext,
} from '@librechat/client';
import { previewKindFromNode, useWorkspacePreview } from '~/data-provider';
import { useWriteWorkspaceContent } from '~/data-provider/Files/workspaceMutations';
import { useLocalize } from '~/hooks';
import { formatBytes, formatRelative } from './utils/format';
import type { WorkspaceNode } from 'librechat-data-provider';

type EditorModalProps = {
  node: WorkspaceNode | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Loads a text/code file from the workspace and lets the user edit
 * it in a `<textarea>`. Save calls the PUT /content endpoint, which
 * overwrites the file in place. The editor is intentionally simple
 * — line numbers / syntax highlighting are out of scope for step 3
 * and can be added later by swapping the textarea for a Monaco /
 * CodeMirror instance.
 */
const EditorModal = ({ node, open, onOpenChange }: EditorModalProps) => {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const [draft, setDraft] = useState('');
  const [savedDraft, setSavedDraft] = useState('');
  const [loadedPath, setLoadedPath] = useState<string | null>(null);

  const preview = useWorkspacePreview(node?.path ?? null, previewKindFromNode(node));
  const mutation = useWriteWorkspaceContent({
    onSuccess: (updated) => {
      showToast({ message: localize('com_fm_editor_saved'), status: 'success' });
      setSavedDraft(draft);
      setLoadedPath(node?.path ?? null);
      void updated;
      preview.refetch();
    },
    onError: (err) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        localize('com_fm_editor_save_failed');
      showToast({ message, status: 'error' });
    },
  });

  // Reset draft state whenever the file changes or the modal closes.
  // We do this in a single effect keyed on (path, open) so the two stay
  // synchronized — order of effects with separate deps is racy.
  useEffect(() => {
    if (open && node?.path) {
      setDraft('');
      setSavedDraft('');
      setLoadedPath(null);
    } else if (!open) {
      setDraft('');
      setSavedDraft('');
      setLoadedPath(null);
    }
  }, [open, node?.path]);

  // Seed the editor with the freshly fetched text. Runs only when the
  // preview's data cache key (path + kind) has changed since the last
  // time we seeded, so navigating between two files of the same kind
  // doesn't leak text from the previous file.
  useEffect(() => {
    if (!open || !node?.path) return;
    if (loadedPath === node?.path) return;
    if (preview.data?.text == null) return;
    setDraft(preview.data.text);
    setSavedDraft(preview.data.text);
    setLoadedPath(node.path);
  }, [open, node?.path, preview.data?.text, loadedPath]);

  if (!node) return null;

  const dirty = draft !== savedDraft;
  const isLoading = preview.isLoading;
  const isSaving = mutation.isLoading;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (dirty && next === false) {
          // confirm discard; keep the simple behavior for now
        }
        onOpenChange(next);
      }}
    >
      <DialogContent
        className="flex max-h-[90vh] w-full max-w-4xl flex-col gap-0 overflow-hidden p-0 sm:rounded-lg"
      >
        <DialogHeader className="border-b border-border-light p-4">
          <DialogTitle className="truncate text-base" title={node.name}>
            {node.name}
          </DialogTitle>
          <DialogDescription className="truncate text-xs">
            {localize('com_fm_editor_description', {
              size: formatBytes(node.size),
              modified: formatRelative(node.modifiedAt),
            })}
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-[60vh] flex-1 overflow-hidden bg-gray-50 p-4 dark:bg-gray-950">
          {isLoading ? (
            <div className="flex h-[60vh] items-center justify-center text-text-secondary">
              <Spinner className="mr-2" />
              <span className="text-sm">{localize('com_fm_preview_loading')}</span>
            </div>
          ) : (
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              spellCheck={false}
              className="block h-[60vh] w-full resize-none rounded border border-border-light bg-white p-3 font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-text-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          )}
        </div>
        <DialogFooter className="flex w-full items-center justify-between gap-2 border-t border-border-light p-3">
          <span className="text-xs text-text-secondary">
            {localize('com_fm_editor_chars', { count: draft.length })}
            {dirty ? ` · ${localize('com_fm_editor_unsaved')}` : ''}
          </span>
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={isSaving}
            >
              {localize('com_ui_cancel')}
            </Button>
            <Button
              size="sm"
              onClick={() => {
                mutation.mutate({ path: node.path, content: draft });
              }}
              disabled={isLoading || isSaving || !dirty}
              aria-busy={isSaving}
            >
              {isSaving ? <Spinner className="mr-1.5 size-3.5" /> : null}
              {localize('com_ui_save')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditorModal;
