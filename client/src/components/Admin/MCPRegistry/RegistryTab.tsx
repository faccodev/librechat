import React, { useEffect, useMemo, useState } from 'react';
import { Spinner } from '@librechat/client';
import { PlugZap, AlertTriangle, RefreshCw } from 'lucide-react';
import type {
  RegistryListItem,
  RegistryPreviewResponse,
} from 'librechat-data-provider';
import {
  useSearchExternalCatalog,
  useExternalCatalogHealth,
} from '~/data-provider';
import { useLocalize } from '~/hooks';
import RegistrySearchInput from './RegistrySearchInput';
import RegistryCard from './RegistryCard';
import RegistryDrawer from './RegistryDrawer';

interface RegistryTabProps {
  /**
   * Called with the converted preview after the admin clicks Install.
   * The parent typically navigates to the Custom tab pre-filled with
   * the preview config, or (in user mode) hands it to the wizard.
   */
  onPreview?: (preview: RegistryPreviewResponse) => void;
}

/**
 * Browse Registry tab body for the admin MCP Integrations panel.
 *
 * - Renders a debounced search input.
 * - Shows a responsive card grid.
 * - Pagination via "Load more" cursor.
 * - Opens the right-side drawer on card click.
 *
 * When `MCP_REGISTRY_ENABLED` is off the backend returns 404 on every
 * call; we surface that as the "Catalog unavailable" toast + empty
 * state instead of mounting the queries.
 */
export default function RegistryTab({ onPreview }: RegistryTabProps) {
  const localize = useLocalize();
  const [rawSearch, setRawSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [cursor, setCursor] = useState<string | null>(null);
  const [accumulated, setAccumulated] = useState<RegistryListItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<RegistryListItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Debounce: 300ms is the same window the rest of the admin UI uses.
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(rawSearch.trim());
      setCursor(null);
      setAccumulated([]);
    }, 300);
    return () => clearTimeout(t);
  }, [rawSearch]);

  const healthQuery = useExternalCatalogHealth();

  const listQuery = useSearchExternalCatalog(
    {
      search: debouncedSearch || undefined,
      cursor: cursor ?? undefined,
      limit: 30,
    },
    {
      enabled: healthQuery.data?.enabled === true,
    },
  );

  // Append new pages to the accumulated list (cursor pagination).
  useEffect(() => {
    if (listQuery.data?.items) {
      if (cursor === null) {
        setAccumulated(listQuery.data.items);
      } else {
        setAccumulated((prev) => {
          const seen = new Set(prev.map((p) => p.name));
          const fresh = listQuery.data!.items.filter((i) => !seen.has(i.name));
          return [...prev, ...fresh];
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listQuery.data]);

  const isCatalogDisabled = healthQuery.data && healthQuery.data.enabled === false;
  const isHealthLoading = healthQuery.isLoading;

  const handleSelect = (item: RegistryListItem) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleInstall = (preview: RegistryPreviewResponse) => {
    if (onPreview) {
      onPreview(preview);
    }
  };

  const handleLoadMore = () => {
    if (listQuery.data?.nextCursor) {
      setCursor(listQuery.data.nextCursor);
    }
  };

  const items = useMemo(() => accumulated, [accumulated]);

  return (
    <div className="flex h-full flex-1 flex-col gap-3 overflow-hidden p-4">
      <div className="flex items-center justify-between gap-3">
        <RegistrySearchInput value={rawSearch} onChange={setRawSearch} />
        <button
          type="button"
          onClick={() => listQuery.refetch()}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-text-secondary hover:bg-surface-secondary"
          aria-label={localize('com_ui_refresh') || 'Refresh'}
        >
          <RefreshCw className={`size-3 ${listQuery.isFetching ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {isHealthLoading ? (
        <div className="flex flex-1 items-center justify-center text-text-secondary">
          <Spinner className="size-4" />
        </div>
      ) : isCatalogDisabled ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-text-secondary">
          <AlertTriangle className="size-5 text-amber-500" />
          <p className="text-sm">{localize('com_admin_mcp_registry_disabled_hint')}</p>
        </div>
      ) : listQuery.isError ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-red-500">
          <AlertTriangle className="size-5" />
          <p className="text-sm">{(listQuery.error as Error)?.message}</p>
        </div>
      ) : items.length === 0 && !listQuery.isLoading ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-text-secondary">
          <PlugZap className="size-5" />
          <p className="text-sm">{localize('com_admin_mcp_registry_empty')}</p>
        </div>
      ) : (
        <>
          <div className="grid flex-1 auto-rows-min grid-cols-1 gap-2 overflow-y-auto pb-2 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <RegistryCard key={item.name} item={item} onSelect={handleSelect} />
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-border-light pt-2 text-xs text-text-secondary">
            <span>
              {items.length}{' '}
              {localize('com_admin_mcp_registry_items_count') || 'items'}
            </span>
            {listQuery.data?.nextCursor && (
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={listQuery.isFetching}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-surface-secondary disabled:opacity-50"
              >
                {listQuery.isFetching && <Spinner className="size-3" />}
                {localize('com_admin_mcp_registry_load_more')}
              </button>
            )}
          </div>
        </>
      )}

      <RegistryDrawer
        item={selectedItem}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onInstall={handleInstall}
      />
    </div>
  );
}