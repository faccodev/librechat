import React, { useState, useCallback } from 'react';
import { Eye, EyeOff, KeyRound } from 'lucide-react';
import {
  Input,
  Label,
  Button,
  Spinner,
  OGDialog,
  OGDialogContent,
  OGDialogHeader,
  OGDialogTitle,
  OGDialogTrigger,
  useToastContext,
} from '@librechat/client';
import { useChangePasswordMutation } from 'librechat-data-provider/react-query';
import { useLocalize } from '~/hooks';

const MIN_LENGTH = 8;

const ChangePassword = () => {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const { mutate: changePassword, isLoading: isSubmitting } = useChangePasswordMutation();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const reset = useCallback(() => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMsg(null);
    setShowCurrent(false);
    setShowNew(false);
  }, []);

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) reset();
  };

  const trimmed = newPassword.trim();
  const newMatches = trimmed.length > 0 && trimmed === confirmPassword.trim();
  const newStrong = trimmed.length >= MIN_LENGTH;
  const canSubmit =
    currentPassword.length > 0 && newStrong && newMatches && !isSubmitting;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setErrorMsg(null);
    changePassword(
      { currentPassword, newPassword: trimmed },
      {
        onSuccess: () => {
          showToast({ message: localize('com_ui_password_changed') });
          handleOpenChange(false);
        },
        onError: (err: unknown) => {
          const axiosMessage =
            (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
          setErrorMsg(axiosMessage ?? localize('com_ui_password_change_failed'));
        },
      },
    );
  };

  return (
    <OGDialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <div className="flex items-center justify-between">
        <Label id="change-password-label">{localize('com_ui_change_password')}</Label>
        <OGDialogTrigger asChild>
          <Button
            aria-labelledby="change-password-label"
            variant="outline"
            onClick={() => setDialogOpen(true)}
          >
            <KeyRound className="mr-2 size-4" aria-hidden="true" />
            {localize('com_ui_change_password')}
          </Button>
        </OGDialogTrigger>
      </div>

      <OGDialogContent className="w-11/12 max-w-md">
        <OGDialogHeader>
          <OGDialogTitle className="text-lg font-medium leading-6 text-text-primary">
            {localize('com_ui_change_password_title')}
          </OGDialogTitle>
        </OGDialogHeader>

        <div className="flex flex-col gap-4">
          <PasswordField
            id="current-password"
            label={localize('com_ui_current_password')}
            value={currentPassword}
            onChange={setCurrentPassword}
            visible={showCurrent}
            onToggleVisibility={() => setShowCurrent((v) => !v)}
            autoComplete="current-password"
            disabled={isSubmitting}
          />
          <PasswordField
            id="new-password"
            label={localize('com_ui_new_password')}
            value={newPassword}
            onChange={setNewPassword}
            visible={showNew}
            onToggleVisibility={() => setShowNew((v) => !v)}
            autoComplete="new-password"
            disabled={isSubmitting}
            helper={
              trimmed.length > 0 && !newStrong
                ? localize('com_ui_password_min_length', { 0: MIN_LENGTH })
                : null
            }
          />
          <PasswordField
            id="confirm-new-password"
            label={localize('com_ui_confirm_new_password')}
            value={confirmPassword}
            onChange={setConfirmPassword}
            visible={showNew}
            onToggleVisibility={() => setShowNew((v) => !v)}
            autoComplete="new-password"
            disabled={isSubmitting}
            helper={
              confirmPassword.length > 0 && !newMatches
                ? localize('com_ui_passwords_dont_match')
                : null
            }
            error={confirmPassword.length > 0 && !newMatches ? true : false}
          />

          {errorMsg ? (
            <p
              role="alert"
              className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-700/50 dark:bg-red-900/30 dark:text-red-300"
            >
              {errorMsg}
            </p>
          ) : null}

          <div className="mt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              {localize('com_ui_cancel')}
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? <Spinner className="mr-2 size-4" /> : null}
              {localize('com_ui_save')}
            </Button>
          </div>
        </div>
      </OGDialogContent>
    </OGDialog>
  );
};

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  visible: boolean;
  onToggleVisibility: () => void;
  autoComplete?: string;
  disabled?: boolean;
  helper?: string | null;
  error?: boolean;
};

const PasswordField = ({
  id,
  label,
  value,
  onChange,
  visible,
  onToggleVisibility,
  autoComplete,
  disabled,
  helper,
  error,
}: PasswordFieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="mb-1.5 block text-sm font-medium text-text-primary"
    >
      {label}
    </label>
    <div className="relative">
      <Input
        id={id}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        disabled={disabled}
        spellCheck={false}
        className="bg-surface-primary pr-10"
        aria-invalid={error ? true : undefined}
      />
      <button
        type="button"
        onClick={onToggleVisibility}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-text-secondary hover:bg-surface-hover"
        aria-label={visible ? 'Hide password' : 'Show password'}
        tabIndex={-1}
      >
        {visible ? (
          <EyeOff className="size-4" aria-hidden="true" />
        ) : (
          <Eye className="size-4" aria-hidden="true" />
        )}
      </button>
    </div>
    {helper ? (
      <p
        className={`mt-1 text-xs ${
          error
            ? 'text-red-600 dark:text-red-400'
            : 'text-text-secondary'
        }`}
      >
        {helper}
      </p>
    ) : null}
  </div>
);

export default ChangePassword;
