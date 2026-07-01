import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitBranch, ExternalLink, AlertTriangle, FileText } from 'lucide-react';
import { Button, OGDialog, OGDialogContent, Spinner, useToastContext } from '@librechat/client';
import {
  useImportSkillFromGitMutation,
  useImportSkillFromGitPreviewMutation,
} from '~/data-provider';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

interface GitImportDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

type Step = 'input' | 'review';

/**
 * Dialog that lets the user paste any https git URL pointing at a public
 * repo (GitHub / GitLab / Bitbucket / Codeberg / self-hosted Gitea) and
 * imports its `SKILL.md` as a new skill. Two steps:
 *
 *   1. **Input** — user pastes the URL + optional ref/path. On submit
 *      we hit `POST /api/skills/import/git/preview` and show the
 *      resolved host + SKILL.md preview + auxiliary file metadata.
 *   2. **Review** — user confirms. On submit we hit
 *      `POST /api/skills/import/git` and navigate to the new skill.
 *
 * Only SKILL.md content is persisted in v1 (matches the server contract);
 * auxiliary files are surfaced in the preview list for transparency but
 * not downloaded. The bulk-upload path remains the zip import.
 */
export default function GitImportDialog({ isOpen, setIsOpen }: GitImportDialogProps) {
  const localize = useLocalize();
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  const [step, setStep] = useState<Step>('input');
  const [url, setUrl] = useState('');
  const [ref, setRef] = useState('');
  const [path, setPath] = useState('');

  const previewMutation = useImportSkillFromGitPreviewMutation({
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { error?: string } } })?.response?.data?.error ??
        localize('com_ui_skill_git_preview_error');
      showToast({ status: 'error', message });
    },
  });

  const importMutation = useImportSkillFromGitMutation({
    onSuccess: (response) => {
      showToast({ status: 'success', message: localize('com_ui_skill_created') });
      setIsOpen(false);
      resetState();
      navigate(`/skills/${response.skill._id}`);
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { error?: string } } })?.response?.data?.error ??
        localize('com_ui_skill_git_import_error');
      showToast({ status: 'error', message });
    },
  });

  const resetState = useCallback(() => {
    setStep('input');
    setUrl('');
    setRef('');
    setPath('');
    previewMutation.reset();
    importMutation.reset();
  }, [previewMutation, importMutation]);

  const handleClose = useCallback(() => {
    if (importMutation.isLoading || previewMutation.isLoading) {
      return;
    }
    setIsOpen(false);
    resetState();
  }, [
    importMutation.isLoading,
    previewMutation.isLoading,
    resetState,
    setIsOpen,
  ]);

  const handleFetchPreview = useCallback(() => {
    const trimmed = url.trim();
    if (!trimmed) {
      showToast({
        status: 'error',
        message: localize('com_ui_skill_git_url_required'),
      });
      return;
    }
    previewMutation.mutate(
      {
        url: trimmed,
        ref: ref.trim() || undefined,
        path: path.trim() || undefined,
      },
      {
        onSuccess: () => setStep('review'),
      },
    );
  }, [url, ref, path, previewMutation, showToast, localize]);

  const handleImport = useCallback(() => {
    const trimmed = url.trim();
    importMutation.mutate({
      url: trimmed,
      ref: ref.trim() || undefined,
      path: path.trim() || undefined,
    });
  }, [url, ref, path, importMutation]);

  const preview = previewMutation.data;

  const hostLabel = useMemo(() => {
    if (!preview) return '';
    if (preview.host === 'github') return 'GitHub';
    if (preview.host === 'gitlab') return 'GitLab';
    if (preview.host === 'bitbucket') return 'Bitbucket';
    return localize('com_ui_skill_git_host_generic');
  }, [preview, localize]);

  const isInputBusy = previewMutation.isLoading;
  const isImporting = importMutation.isLoading;

  return (
    <OGDialog open={isOpen} onOpenChange={handleClose}>
      <OGDialogContent className="w-11/12 max-w-2xl overflow-hidden">
        <div className="flex flex-col gap-4 p-1 sm:p-2">
          <div className="flex items-center gap-2">
            <GitBranch className="size-5 text-text-primary" aria-hidden="true" />
            <h2 className="text-lg font-bold text-text-primary">
              {localize('com_ui_skill_git_import_title')}
            </h2>
          </div>

          {step === 'input' && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="git-import-url"
                  className="text-sm font-medium text-text-secondary"
                >
                  {localize('com_ui_skill_git_url_label')}
                </label>
                <input
                  id="git-import-url"
                  type="url"
                  inputMode="url"
                  autoComplete="off"
                  autoFocus
                  placeholder={localize('com_ui_skill_git_url_placeholder')}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isInputBusy}
                  className="flex h-10 w-full rounded-xl border border-border-medium bg-transparent px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="git-import-ref"
                    className="text-sm font-medium text-text-secondary"
                  >
                    {localize('com_ui_skill_git_ref_label')}
                  </label>
                  <input
                    id="git-import-ref"
                    type="text"
                    autoComplete="off"
                    placeholder={localize('com_ui_skill_git_ref_placeholder')}
                    value={ref}
                    onChange={(e) => setRef(e.target.value)}
                    disabled={isInputBusy}
                    className="flex h-10 w-full rounded-xl border border-border-medium bg-transparent px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="git-import-path"
                    className="text-sm font-medium text-text-secondary"
                  >
                    {localize('com_ui_skill_git_path_label')}
                  </label>
                  <input
                    id="git-import-path"
                    type="text"
                    autoComplete="off"
                    placeholder={localize('com_ui_skill_git_path_placeholder')}
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    disabled={isInputBusy}
                    className="flex h-10 w-full rounded-xl border border-border-medium bg-transparent px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <p className="text-xs text-text-secondary">
                {localize('com_ui_skill_git_help_text')}
              </p>

              <div className="flex items-center justify-end gap-2 pt-1">
                <Button type="button" variant="outline" onClick={handleClose}>
                  {localize('com_ui_cancel')}
                </Button>
                <Button
                  type="button"
                  onClick={handleFetchPreview}
                  disabled={isInputBusy || !url.trim()}
                  className={cn((isInputBusy || !url.trim()) && 'opacity-50')}
                >
                  {isInputBusy ? (
                    <>
                      <Spinner className="size-4" />
                      <span>{localize('com_ui_skill_git_fetching')}</span>
                    </>
                  ) : (
                    localize('com_ui_skill_git_fetch_preview')
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === 'review' && preview && (
            <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto">
              <div className="flex flex-col gap-1 rounded-lg border border-border-medium bg-surface-primary p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-text-primary">{hostLabel}</span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary"
                  >
                    {localize('com_ui_skill_git_view_source')}
                    <ExternalLink className="size-3" aria-hidden="true" />
                  </a>
                </div>
                <div className="grid grid-cols-1 gap-1 text-xs text-text-secondary sm:grid-cols-2">
                  <span>
                    {localize('com_ui_skill_git_repository')}: {preview.repository}
                  </span>
                  <span>
                    {localize('com_ui_skill_git_ref')}: {preview.ref}
                  </span>
                  <span className="sm:col-span-2">
                    {localize('com_ui_skill_git_path')}: {preview.path || '/'}
                  </span>
                </div>
              </div>

              {preview.warnings.length > 0 && (
                <div className="flex flex-col gap-1 rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-3 text-xs text-yellow-700 dark:text-yellow-300">
                  <div className="flex items-center gap-2 font-medium">
                    <AlertTriangle className="size-4" aria-hidden="true" />
                    {localize('com_ui_skill_git_warnings')}
                  </div>
                  <ul className="list-inside list-disc">
                    {preview.warnings.map((warning, i) => (
                      <li key={i}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                  <FileText className="size-4" aria-hidden="true" />
                  SKILL.md
                </div>
                {preview.skillMd ? (
                  <pre className="max-h-60 overflow-auto rounded-lg border border-border-medium bg-surface-primary p-3 text-xs text-text-primary">
                    {preview.skillMd}
                  </pre>
                ) : (
                  <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-700 dark:text-red-300">
                    {localize('com_ui_skill_git_no_skill_md')}
                  </div>
                )}
              </div>

              {preview.files.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <div className="text-sm font-medium text-text-secondary">
                    {localize('com_ui_skill_git_aux_files', { 0: preview.files.length })}
                  </div>
                  <ul className="flex flex-col gap-1 rounded-lg border border-border-medium bg-surface-primary p-3 text-xs">
                    {preview.files.map((file) => (
                      <li
                        key={file.path}
                        className="flex items-center justify-between gap-2 text-text-secondary"
                      >
                        <span className="truncate">{file.path}</span>
                        <span className="shrink-0 text-text-tertiary">
                          {formatBytes(file.bytes)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-text-tertiary">
                    {localize('com_ui_skill_git_aux_files_note')}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('input')}
                  disabled={isImporting}
                >
                  {localize('com_ui_back')}
                </Button>
                <Button
                  type="button"
                  onClick={handleImport}
                  disabled={isImporting || !preview.skillMd}
                  className={cn((isImporting || !preview.skillMd) && 'opacity-50')}
                >
                  {isImporting ? (
                    <>
                      <Spinner className="size-4" />
                      <span>{localize('com_ui_skill_git_importing')}</span>
                    </>
                  ) : (
                    localize('com_ui_skill_git_import_button')
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </OGDialogContent>
    </OGDialog>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}