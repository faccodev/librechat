import React, { useState, useEffect, useMemo } from 'react';
import {
  OGDialog,
  OGDialogContent,
  OGDialogHeader,
  OGDialogTitle,
  OGDialogClose,
  Button,
} from '@librechat/client';
import WorkspacePathPicker from '~/components/Projects/WorkspacePathPicker';
import { useAvailableProjectWorkspaces } from '~/data-provider';
import { useLocalize } from '~/hooks';

interface AdminWorkspaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialSubdir: string | null;
  onSelect: (subdir: string | null) => void;
}

export default function AdminWorkspaceDialog({
  open,
  onOpenChange,
  initialSubdir,
  onSelect,
}: AdminWorkspaceDialogProps) {
  const localize = useLocalize();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  // Fetch roots (browsePath = null)
  const { data: rootData } = useAvailableProjectWorkspaces(null, { enabled: open });
  const roots = useMemo(() => rootData?.workspaces ?? [], [rootData]);

  // When opening, resolve initialSubdir to an absolute path if possible
  useEffect(() => {
    if (open) {
      if (!initialSubdir) {
        setSelectedPath(null);
        return;
      }
      // If initialSubdir is already absolute-looking (e.g. starts with / or has drive letter), use it
      if (initialSubdir.startsWith('/') || initialSubdir.includes(':/') || initialSubdir.includes(':\\')) {
        setSelectedPath(initialSubdir);
        return;
      }
      // Try to find a root prefix from the loaded roots
      if (roots.length > 0) {
        const root = roots[0];
        let rootPrefix = root.path;
        if (rootPrefix.endsWith(root.label)) {
          rootPrefix = rootPrefix.slice(0, -root.label.length);
        }
        if (rootPrefix.endsWith('/')) {
          rootPrefix = rootPrefix.slice(0, -1);
        }
        setSelectedPath(`${rootPrefix}/${initialSubdir}`);
      } else {
        setSelectedPath(null);
      }
    }
  }, [open, initialSubdir, roots]);

  const handleSave = () => {
    if (!selectedPath) {
      onSelect(null);
      onOpenChange(false);
      return;
    }

    // Try to strip the root prefix from selectedPath to get relative subdir
    let relative = selectedPath;
    for (const ws of roots) {
      let rootPrefix = ws.path;
      if (rootPrefix.endsWith(ws.label)) {
        rootPrefix = rootPrefix.slice(0, -ws.label.length);
      }
      const normalizedPath = selectedPath.replace(/\\/g, '/');
      const normalizedPrefix = rootPrefix.replace(/\\/g, '/');

      if (normalizedPath.startsWith(normalizedPrefix)) {
        relative = normalizedPath.slice(normalizedPrefix.length);
        break;
      }
    }

    // Clean relative path (remove leading/trailing slashes)
    let cleaned = relative.replace(/\\/g, '/');
    if (cleaned.startsWith('/')) {
      cleaned = cleaned.slice(1);
    }
    if (cleaned.endsWith('/')) {
      cleaned = cleaned.slice(0, -1);
    }

    onSelect(cleaned || null);
    onOpenChange(false);
  };

  return (
    <OGDialog open={open} onOpenChange={onOpenChange}>
      <OGDialogContent className="w-11/12 max-w-lg" showCloseButton={false}>
        <OGDialogHeader>
          <OGDialogTitle>{localize('com_ui_project_workspace_path')}</OGDialogTitle>
        </OGDialogHeader>
        <div className="py-2">
          <WorkspacePathPicker
            value={selectedPath}
            onChange={setSelectedPath}
          />
        </div>
        <div className="flex justify-end gap-4 pt-4 border-t border-border-light">
          <OGDialogClose asChild>
            <Button aria-label="cancel" variant="outline">
              {localize('com_ui_cancel')}
            </Button>
          </OGDialogClose>
          <Button
            variant="submit"
            onClick={handleSave}
          >
            {localize('com_ui_select') ?? 'Select'}
          </Button>
        </div>
      </OGDialogContent>
    </OGDialog>
  );
}
