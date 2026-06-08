import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from '@librechat/client';
import { useLocalize } from '~/hooks';

type NewNameDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 'file' | 'folder' | 'rename' — controls title/placeholder/CTA. */
  mode: 'file' | 'folder' | 'rename';
  initialValue?: string;
  onSubmit: (name: string) => void;
  isSubmitting?: boolean;
};

const NewNameDialog = ({
  open,
  onOpenChange,
  mode,
  initialValue = '',
  onSubmit,
  isSubmitting = false,
}: NewNameDialogProps) => {
  const localize = useLocalize();
  const [name, setName] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setName(initialValue);
      // focus + select on open for fast keyboard entry / rename
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        if (initialValue) {
          // strip extension in rename mode so the user only edits the stem
          const dot = initialValue.lastIndexOf('.');
          const end = mode === 'rename' && dot > 0 ? dot : initialValue.length;
          inputRef.current?.setSelectionRange(0, end);
        }
      });
    }
  }, [open, initialValue, mode]);

  const titleKey =
    mode === 'folder'
      ? 'com_fm_dialog_new_folder_title'
      : mode === 'rename'
        ? 'com_fm_dialog_rename_title'
        : 'com_fm_dialog_new_file_title';
  const placeholderKey =
    mode === 'folder'
      ? 'com_fm_dialog_new_folder_placeholder'
      : mode === 'rename'
        ? 'com_fm_dialog_rename_placeholder'
        : 'com_fm_dialog_new_file_placeholder';
  const submitKey = mode === 'rename' ? 'com_ui_save' : 'com_ui_create';
  const descriptionKey =
    mode === 'folder'
      ? 'com_fm_dialog_new_folder_description'
      : 'com_fm_dialog_new_file_description';

  const trimmed = name.trim();
  const isValid = trimmed.length > 0 && trimmed.length <= 255 && !trimmed.startsWith('.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit(trimmed);
  };

  const inputId = `nm-dialog-${mode}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{localize(titleKey)}</DialogTitle>
            <DialogDescription>{localize(descriptionKey)}</DialogDescription>
          </DialogHeader>
          <div className="px-6 py-3">
            <label
              htmlFor={inputId}
              className="mb-1.5 block text-sm font-medium text-text-primary"
            >
              {localize('com_fm_dialog_name_label')}
            </label>
            <Input
              id={inputId}
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={localize(placeholderKey)}
              disabled={isSubmitting}
              maxLength={255}
              autoComplete="off"
              spellCheck={false}
              className="bg-surface-primary"
            />
            {trimmed.startsWith('.') ? (
              <p className="mt-1.5 text-xs text-red-600">
                {localize('com_fm_dialog_name_hidden_error')}
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
            <Button type="submit" disabled={!isValid || isSubmitting} aria-busy={isSubmitting}>
              {localize(submitKey)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewNameDialog;
