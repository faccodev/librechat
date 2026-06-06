import React from 'react';
import { Folder } from 'lucide-react';
import { TooltipAnchor } from '@librechat/client';
import { useUserWorkspace } from '~/data-provider';
import { useAuthContext, useLocalize } from '~/hooks';

export default function WorkspaceIndicator() {
  const { user } = useAuthContext();
  const localize = useLocalize();
  const { data } = useUserWorkspace(user?.id ?? '');

  if (!data?.enabled) {
    return null;
  }

  const isDefault = !user?.workspaceSubdir;
  const path = data.resolvedPath ?? '';
  const label = isDefault
    ? localize('com_ui_workspace_default_label')
    : user.workspaceSubdir;
  const tooltipKey = isDefault
    ? 'com_ui_workspace_default_tooltip'
    : 'com_ui_workspace_indicator_tooltip';

  return (
    <TooltipAnchor
      description={localize(tooltipKey, { path })}
      render={
        <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-text-secondary bg-surface-secondary/80 hover:bg-surface-secondary border border-border-light/50 rounded-lg font-normal select-none cursor-default h-9">
          <Folder className="size-4 text-text-secondary/70" aria-hidden="true" />
          <span className="max-w-[120px] truncate">{label}</span>
        </div>
      }
    />
  );
}
