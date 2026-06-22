import { useRef, useEffect } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import type { SandpackPreviewRef } from '@codesandbox/sandpack-react/unstyled';
import type { editor } from 'monaco-editor';
import type { Artifact } from '~/common';
import { useCodeState } from '~/Providers/EditorContext';
import useArtifactProps from '~/hooks/Artifacts/useArtifactProps';
import { ArtifactCodeEditor } from './ArtifactCodeEditor';
import ArtifactMedia from './ArtifactMedia';
import { useGetStartupConfig } from '~/data-provider';
import { ArtifactPreview } from './ArtifactPreview';
import { TOOL_ARTIFACT_TYPES } from '~/utils/artifacts';

export default function ArtifactTabs({
  artifact,
  previewRef,
  isSharedConvo,
}: {
  artifact: Artifact;
  previewRef: React.MutableRefObject<SandpackPreviewRef>;
  isSharedConvo?: boolean;
}) {
  const { currentCode, setCurrentCode } = useCodeState();
  const { data: startupConfig } = useGetStartupConfig();
  const monacoRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const lastIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (artifact.id !== lastIdRef.current) {
      setCurrentCode(undefined);
    }
    lastIdRef.current = artifact.id;
  }, [setCurrentCode, artifact.id]);

  /* Media buckets bypass Sandpack entirely. They're already
   * preview-only (see `isPreviewOnlyArtifact` / `PREVIEW_ONLY_ARTIFACT_TYPES`),
   * so the only tab that ever mounts for them is `preview`, and
   * rendering it via the native media element gives codec support +
   * fullscreen + native download attributes without an iframe in
   * between. The Sandpack deps for media would still be pulled into
   * the bundle; routing around them here keeps the lazy chunks smaller
   * and the click-to-open snappier. */
  const isMedia =
    artifact.type === TOOL_ARTIFACT_TYPES.IMAGE ||
    artifact.type === TOOL_ARTIFACT_TYPES.VIDEO ||
    artifact.type === TOOL_ARTIFACT_TYPES.AUDIO;

  const { files, fileKey, template, sharedProps } = useArtifactProps({ artifact });

  if (isMedia) {
    return (
      <div className="flex h-full w-full flex-col">
        <Tabs.Content
          value="preview"
          className="h-full w-full flex-grow overflow-hidden"
          tabIndex={-1}
        >
          <ArtifactMedia artifact={artifact} />
        </Tabs.Content>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <Tabs.Content
        value="code"
        id="artifacts-code"
        className="h-full w-full flex-grow overflow-auto"
        tabIndex={-1}
      >
        <ArtifactCodeEditor artifact={artifact} monacoRef={monacoRef} readOnly={isSharedConvo} />
      </Tabs.Content>

      <Tabs.Content
        value="preview"
        className="h-full w-full flex-grow overflow-hidden"
        tabIndex={-1}
      >
        <ArtifactPreview
          files={files}
          fileKey={fileKey}
          template={template}
          previewRef={previewRef}
          sharedProps={sharedProps}
          currentCode={currentCode}
          startupConfig={startupConfig}
        />
      </Tabs.Content>
    </div>
  );
}
