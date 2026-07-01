import React from 'react';
import { Search, X } from 'lucide-react';
import { useLocalize } from '~/hooks';

interface RegistrySearchInputProps {
  value: string;
  onChange: (next: string) => void;
  /** Optional placeholder override; falls back to i18n key. */
  placeholder?: string;
}

/**
 * Compact search bar for the Browse Registry tab.
 *
 * Pure controlled component — debouncing is the parent's job (the
 * parent wraps `onChange` with a debounce to avoid firing one
 * upstream query per keystroke).
 */
export default function RegistrySearchInput({
  value,
  onChange,
  placeholder,
}: RegistrySearchInputProps) {
  const localize = useLocalize();
  const computedPlaceholder =
    placeholder ?? localize('com_admin_mcp_registry_search_placeholder');

  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-text-secondary" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={computedPlaceholder}
        className="w-full rounded-md border border-border-light bg-surface-primary py-1.5 pl-8 pr-8 text-sm text-text-primary placeholder:text-text-secondary"
        aria-label={computedPlaceholder}
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-text-secondary hover:bg-surface-secondary"
          aria-label={localize('com_ui_clear') || 'Clear'}
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}