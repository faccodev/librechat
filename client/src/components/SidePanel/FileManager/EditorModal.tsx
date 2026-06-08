import { useEffect, useState, useContext } from 'react';
import { Maximize2, Minimize2, X } from 'lucide-react';
import MonacoEditor from '@monaco-editor/react';
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
  ThemeContext,
  isDark,
} from '@librechat/client';
import { useWorkspacePreview } from '~/data-provider';
import { useWriteWorkspaceContent } from '~/data-provider/Files/workspaceMutations';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';
import { formatBytes, formatRelative } from './utils/format';
import { getLanguageFromFilename } from './PreviewModal';
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
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { theme } = useContext(ThemeContext);
  const isDarkMode = isDark(theme);

  const preview = useWorkspacePreview(node?.path ?? null, 'text');
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
      setIsFullscreen(false);
    } else if (!open) {
      setDraft('');
      setSavedDraft('');
      setLoadedPath(null);
      setIsFullscreen(false);
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
        showCloseButton={false}
        className={cn(
          isFullscreen
            ? 'fixed inset-0 z-[999] flex h-screen w-screen max-w-none max-h-none flex-col gap-0 overflow-hidden p-0 rounded-none sm:rounded-none left-0 top-0 -translate-x-0 -translate-y-0 transform-none border-0'
            : 'flex max-h-[90vh] w-full max-w-4xl flex-col gap-0 overflow-hidden p-0 sm:rounded-lg'
        )}
      >
        <DialogHeader className="relative border-b border-border-light p-4 pr-24">
          <DialogTitle className="truncate text-base" title={node.name}>
            {node.name}
          </DialogTitle>
          <DialogDescription className="truncate text-xs">
            {localize('com_fm_editor_description', {
              size: formatBytes(node.size),
              modified: formatRelative(node.modifiedAt),
            })}
          </DialogDescription>
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="rounded p-1 text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
              title={isFullscreen ? localize('com_ui_minimize') : localize('com_ui_fullscreen')}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded p-1 text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
              title={localize('com_ui_close')}
            >
              <X size={16} />
            </button>
          </div>
        </DialogHeader>
        <div className={cn(
          "flex-1 overflow-hidden bg-gray-50 p-4 dark:bg-gray-950",
          isFullscreen ? "h-[calc(100vh-130px)]" : "min-h-[60vh]"
        )}>
          {isLoading ? (
            <div className={cn("flex items-center justify-center text-text-secondary", isFullscreen ? "h-[calc(100vh-160px)]" : "h-[60vh]")}>
              <Spinner className="mr-2" />
              <span className="text-sm">{localize('com_fm_preview_loading')}</span>
            </div>
          ) : (
            <div className="rounded border border-border-light dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
              <MonacoEditor
                height={isFullscreen ? "calc(100vh - 175px)" : "60vh"}
                language={getLanguageFromFilename(node.name)}
                theme={isDarkMode ? 'vs-dark' : 'light'}
                value={draft}
                onChange={(val) => setDraft(val ?? '')}
                options={{
                  minimap: { enabled: !isFullscreen ? false : true },
                  scrollBeyondLastLine: false,
                  fontSize: 12,
                  lineNumbers: 'on',
                  automaticLayout: true,
                }}
              />
            </div>
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
