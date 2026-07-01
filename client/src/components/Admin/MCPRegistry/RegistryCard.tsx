import React from 'react';
import { PlugZap, Lock, ExternalLink } from 'lucide-react';
import type { RegistryListItem } from 'librechat-data-provider';
import { useLocalize } from '~/hooks';

interface RegistryCardProps {
  item: RegistryListItem;
  onSelect: (item: RegistryListItem) => void;
}

const TRANSPORT_LABEL_KEY: Record<string, string> = {
  'streamable-http': 'com_admin_mcp_registry_transport_streamable_http',
  sse: 'com_admin_mcp_registry_transport_sse',
  websocket: 'com_admin_mcp_registry_transport_websocket',
};

/**
 * One card in the Browse Registry grid. Renders the title, version,
 * transport badges, OAuth indicator, and a "Preview" button that
 * delegates to the parent (which opens the drawer).
 *
 * Pure presentation — no data fetching, no side effects.
 */
export default function RegistryCard({ item, onSelect }: RegistryCardProps) {
  const localize = useLocalize();
  const transportLabel = (transport: string) => {
    const key = TRANSPORT_LABEL_KEY[transport];
    return key
      ? localize(key as 'com_admin_mcp_registry_transport_streamable_http' | 'com_admin_mcp_registry_transport_sse' | 'com_admin_mcp_registry_transport_websocket')
      : transport;
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group flex h-full flex-col items-start gap-2 rounded-lg border border-border-light bg-surface-primary p-3 text-left transition-colors hover:border-border-medium hover:bg-surface-secondary"
    >
      <div className="flex w-full items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-semibold text-text-primary">{item.title}</h4>
          <p className="truncate font-mono text-[11px] text-text-secondary">{item.name}</p>
        </div>
        <PlugZap className="size-4 flex-shrink-0 text-text-secondary group-hover:text-text-primary" />
      </div>
      <p className="line-clamp-3 min-h-[3rem] text-xs text-text-secondary">{item.description}</p>
      <div className="mt-auto flex w-full flex-wrap items-center gap-1.5 pt-1">
        <span className="rounded-full bg-surface-tertiary px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-text-secondary">
          v{item.version}
        </span>
        {item.transports.map((transport) => (
          <span
            key={transport}
            className="rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-blue-600 dark:text-blue-300"
          >
            {transportLabel(transport)}
          </span>
        ))}
        {item.oauthHint && (
          <span
            className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-600 dark:text-amber-300"
            title={localize('com_admin_mcp_registry_oauth_required')}
          >
            <Lock className="size-2.5" />
            {localize('com_admin_mcp_registry_oauth_required')}
          </span>
        )}
        {item.repositoryUrl && (
          <a
            href={item.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="ml-auto inline-flex items-center gap-1 text-[11px] text-text-secondary hover:text-text-primary"
          >
            <ExternalLink className="size-3" />
          </a>
        )}
      </div>
    </button>
  );
}