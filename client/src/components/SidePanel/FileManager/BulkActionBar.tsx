import { FolderInput, Trash2, X, CheckSquare, Square } from 'lucide-react';
import { Button } from '@librechat/client';
import { useLocalize } from '~/hooks';

type BulkActionBarProps = {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onCancel: () => void;
  onMove: () => void;
  onDelete: () => void;
};

/**
 * Floating action bar that surfaces bulk operations while the FileManager
 * is in select mode. Rendered as a sticky footer above the bottom of the
 * panel so the user always sees how many items are selected and the
 * available actions (move, delete).
 */
const BulkActionBar = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onCancel,
  onMove,
  onDelete,
}: BulkActionBarProps) => {
  const localize = useLocalize();
  const allSelected = selectedCount > 0 && selectedCount === totalCount;
  return (
    <div
      role="toolbar"
      aria-label={localize('com_fm_bulk_bar_aria')}
      className="flex items-center gap-2 border-t border-border-light bg-surface-secondary px-3 py-2 text-sm"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-7 shrink-0"
        onClick={onCancel}
        aria-label={localize('com_fm_action_cancel_select')}
      >
        <X className="size-4" aria-hidden="true" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onSelectAll}
        aria-label={
          allSelected
            ? localize('com_fm_action_deselect_all')
            : localize('com_fm_action_select_all')
        }
        className="shrink-0"
      >
        {allSelected ? (
          <CheckSquare className="mr-1.5 size-3.5" aria-hidden="true" />
        ) : (
          <Square className="mr-1.5 size-3.5" aria-hidden="true" />
        )}
        {allSelected
          ? localize('com_fm_action_deselect_all')
          : localize('com_fm_action_select_all')}
      </Button>
      <span className="flex-1 truncate text-text-secondary" aria-live="polite">
        {localize('com_fm_bulk_selected_count', { count: selectedCount })}
      </span>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onMove}
        disabled={selectedCount === 0}
        aria-label={localize('com_fm_action_move')}
      >
        <FolderInput className="mr-1.5 size-3.5" aria-hidden="true" />
        {localize('com_fm_action_move')}
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onDelete}
        disabled={selectedCount === 0}
        aria-label={localize('com_fm_action_delete')}
        className="text-red-600 hover:text-red-600"
      >
        <Trash2 className="mr-1.5 size-3.5" aria-hidden="true" />
        {localize('com_fm_action_delete')}
      </Button>
    </div>
  );
};

export default BulkActionBar;
