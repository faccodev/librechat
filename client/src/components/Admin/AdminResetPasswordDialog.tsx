import React, { useEffect, useState } from 'react';
import { Check, Copy, KeyRound, RefreshCw } from 'lucide-react';
import {
  Button,
  Input,
  Label,
  Spinner,
  OGDialog,
  OGDialogContent,
  OGDialogDescription,
  OGDialogHeader,
  OGDialogTitle,
  useToastContext,
} from '@librechat/client';
import { useAdminSetUserPasswordMutation } from 'librechat-data-provider/react-query';
import { useLocalize } from '~/hooks';

type Mode = 'generate' | 'set';

const MIN_LENGTH = 8;

interface AdminResetPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  userName: string;
}

/**
 * Admin-initiated password reset.
 *
 * Two modes:
 * - "generate": the server returns a strong random password. The admin must
 *   copy it before closing the dialog — it is not retrievable later.
 * - "set": the admin types a password. The server still returns the
 *   plaintext on success so the admin can confirm and copy it.
 *
 * Either way the dialog only closes when the admin explicitly dismisses it
 * (after acknowledging the password was copied), so a refresh of the user
 * list happens once.
 */
const AdminResetPasswordDialog = ({
  open,
  onOpenChange,
  userId,
  userName,
}: AdminResetPasswordDialogProps) => {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const { mutate, isLoading, error, data, reset } = useAdminSetUserPasswordMutation();

  const [mode, setMode] = useState<Mode>('generate');
  const [typed, setTyped] = useState('');
  const [confirm, setConfirm] = useState('');
  const [copied, setCopied] = useState(false);

  // Reset local state whenever the dialog re-opens so the admin doesn't see
  // the previous user's password in the input.
  useEffect(() => {
    if (open) {
      setMode('generate');
      setTyped('');
      setConfirm('');
      setCopied(false);
      reset();
    }
  }, [open, reset]);

  const trimmed = typed.trim();
  const typedValid = trimmed.length >= MIN_LENGTH && trimmed === confirm.trim();

  const handleSubmit = () => {
    setCopied(false);
    mutate(
      {
        userId,
        body: mode === 'set' && trimmed ? { password: trimmed } : {},
      },
      {
        onSuccess: () => {
          showToast({ message: localize('com_ui_admin_password_reset_success') });
        },
        onError: (err: unknown) => {
          const axiosMessage =
            (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
          showToast({
            message: axiosMessage ?? localize('com_ui_admin_password_reset_failed'),
            status: 'error',
          });
        },
      },
    );
  };

  const handleCopy = async () => {
    if (!data?.password) return;
    try {
      await navigator.clipboard.writeText(data.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast({ message: localize('com_ui_copy_failed'), status: 'error' });
    }
  };

  const handleClose = () => {
    if (data?.password) {
      setTyped('');
      setConfirm('');
    }
    onOpenChange(false);
  };

  const canSubmit = !isLoading && (mode === 'generate' || typedValid);
  const errorMsg = error
    ? (error as { response?: { data?: { error?: string } } })?.response?.data?.error
    : null;

  return (
    <OGDialog open={open} onOpenChange={handleClose}>
      <OGDialogContent className="w-11/12 max-w-md">
        <OGDialogHeader>
          <OGDialogTitle className="text-lg font-medium leading-6 text-text-primary">
            <KeyRound className="mr-2 inline-block size-4" aria-hidden="true" />
            {localize('com_ui_admin_reset_password_title')}
          </OGDialogTitle>
          <OGDialogDescription className="text-sm text-text-secondary">
            {localize('com_ui_admin_reset_password_description', { 0: userName })}
          </OGDialogDescription>
        </OGDialogHeader>

        {data?.password ? (
          <ResultStep
            password={data.password}
            copied={copied}
            onCopy={handleCopy}
            onClose={handleClose}
            localize={localize}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="inline-flex w-full rounded-lg border border-border-light bg-surface-secondary p-0.5">
              <button
                type="button"
                onClick={() => setMode('generate')}
                className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  mode === 'generate'
                    ? 'bg-surface-primary text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                aria-pressed={mode === 'generate'}
              >
                <RefreshCw className="mr-1.5 inline-block size-3" aria-hidden="true" />
                {localize('com_ui_admin_reset_mode_generate')}
              </button>
              <button
                type="button"
                onClick={() => setMode('set')}
                className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  mode === 'set'
                    ? 'bg-surface-primary text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                aria-pressed={mode === 'set'}
              >
                <KeyRound className="mr-1.5 inline-block size-3" aria-hidden="true" />
                {localize('com_ui_admin_reset_mode_set')}
              </button>
            </div>

            {mode === 'generate' ? (
              <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-800/50 dark:bg-amber-900/20 dark:text-amber-200">
                {localize('com_ui_admin_reset_password_generate_hint')}
              </p>
            ) : (
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="admin-new-password"
                    className="mb-1.5 block text-sm font-medium text-text-primary"
                  >
                    {localize('com_ui_new_password')}
                  </label>
                  <Input
                    id="admin-new-password"
                    type="text"
                    value={typed}
                    onChange={(e) => setTyped(e.target.value)}
                    autoComplete="new-password"
                    disabled={isLoading}
                    spellCheck={false}
                    className="bg-surface-primary"
                  />
                  {typed.length > 0 && !typedValid && trimmed.length < MIN_LENGTH ? (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {localize('com_ui_password_min_length', { 0: MIN_LENGTH })}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="admin-confirm-password"
                    className="mb-1.5 block text-sm font-medium text-text-primary"
                  >
                    {localize('com_ui_confirm_new_password')}
                  </label>
                  <Input
                    id="admin-confirm-password"
                    type="text"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    disabled={isLoading}
                    spellCheck={false}
                    className="bg-surface-primary"
                  />
                  {confirm.length > 0 && trimmed !== confirm.trim() ? (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {localize('com_ui_passwords_dont_match')}
                    </p>
                  ) : null}
                </div>
              </div>
            )}

            {errorMsg ? (
              <p
                role="alert"
                className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-700/50 dark:bg-red-900/30 dark:text-red-300"
              >
                {errorMsg}
              </p>
            ) : null}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                {localize('com_ui_cancel')}
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                aria-busy={isLoading}
              >
                {isLoading ? <Spinner className="mr-2 size-4" /> : null}
                {localize('com_ui_admin_reset_password_action')}
              </Button>
            </div>
          </div>
        )}
      </OGDialogContent>
    </OGDialog>
  );
};

const ResultStep = ({
  password,
  copied,
  onCopy,
  onClose,
  localize,
}: {
  password: string;
  copied: boolean;
  onCopy: () => void;
  onClose: () => void;
  localize: ReturnType<typeof useLocalize>;
}) => (
  <div className="flex flex-col gap-4">
    <p className="rounded-md border border-green-300 bg-green-50 px-3 py-2 text-xs text-green-800 dark:border-green-700/50 dark:bg-green-900/20 dark:text-green-200">
      {localize('com_ui_admin_reset_password_result_hint')}
    </p>
    <div>
      <Label htmlFor="admin-generated-password">
        {localize('com_ui_new_password')}
      </Label>
      <div className="mt-1.5 flex gap-2">
        <Input
          id="admin-generated-password"
          value={password}
          readOnly
          className="bg-surface-primary font-mono"
          onFocus={(e) => e.currentTarget.select()}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onCopy}
          aria-label={localize('com_ui_copy_password')}
        >
          {copied ? (
            <Check className="size-4 text-green-600" aria-hidden="true" />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
        </Button>
      </div>
    </div>
    <div className="flex justify-end">
      <Button type="button" onClick={onClose}>
        {localize('com_ui_close')}
      </Button>
    </div>
  </div>
);

export default AdminResetPasswordDialog;
