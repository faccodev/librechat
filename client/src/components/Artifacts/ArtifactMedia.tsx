import { useMemo } from 'react';
import { ImageIcon, FilmIcon, MusicIcon } from 'lucide-react';
import type { Artifact } from '~/common';
import { TOOL_ARTIFACT_TYPES } from '~/utils/artifacts';
import { useLocalize } from '~/hooks';

/**
 * Native media renderer for the IMAGE / VIDEO / AUDIO artifact buckets.
 * Bypasses Sandpack entirely — these types render via plain
 * <img>/<video>/<audio> elements so the browser handles codec
 * negotiation, fullscreen, download attributes, and native error
 * states without an iframe in between.
 *
 * The source URL is on `artifact.src`, populated upstream by
 * `fileToArtifact` from `attachment.filepath` (preferred — cacheable,
 * refreshable) or a `data:` URI carried in `attachment.text` (fallback
 * for MCP servers that inline bytes).
 *
 * Layout: centered, fits-to-container, preserves aspect ratio. The
 * placeholder state (`src` absent or empty) is rare — `fileToArtifact`
 * already returns `null` for media without a source — but the empty
 * card branch is still rendered defensively for any caller that
 * constructs the artifact manually.
 */
export default function ArtifactMedia({ artifact }: { artifact: Artifact }) {
  const localize = useLocalize();
  const src = artifact.src ?? '';

  const kind = useMemo<'image' | 'video' | 'audio' | 'unknown'>(() => {
    if (artifact.type === TOOL_ARTIFACT_TYPES.IMAGE) return 'image';
    if (artifact.type === TOOL_ARTIFACT_TYPES.VIDEO) return 'video';
    if (artifact.type === TOOL_ARTIFACT_TYPES.AUDIO) return 'audio';
    return 'unknown';
  }, [artifact.type]);

  if (!src || kind === 'unknown') {
    return <EmptyMediaState kind={kind} />;
  }

  if (kind === 'image') {
    return (
      <div className="flex h-full w-full items-center justify-center overflow-auto bg-surface-secondary p-4">
        <img
          src={src}
          alt={artifact.title ?? 'Generated image'}
          /* `object-contain` keeps aspect ratio; max-h/full lets the
           * panel chrome (header + footer) reserve its space without
           * the image overflowing. */
          className="max-h-full max-w-full select-none rounded-md object-contain"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  if (kind === 'video') {
    return (
      <div className="flex h-full w-full items-center justify-center overflow-auto bg-black p-4">
        {/* `controls` exposes the native scrubber + fullscreen. `preload="metadata"`
         * is the bandwidth-friendly default — fetches only the container
         * header so duration / first frame are available without
         * downloading the whole file. */}
        <video
          src={src}
          controls
          preload="metadata"
          className="max-h-full max-w-full rounded-md"
          /* Cross-origin policy means inline data URIs play without
           * CORS headers; remote sources from the same origin as the
           * SPA don't need anything special. */
        >
          {localize('com_ui_video_unsupported')}
        </video>
      </div>
    );
  }

  // audio
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 overflow-auto bg-surface-secondary p-8">
      {/* Disc-style icon header — keeps the panel visually balanced
       * when the audio itself has no album art. The icon is sized to
       * stay proportional on narrow viewports. */}
      <div className="flex flex-col items-center gap-3 text-text-secondary">
        <div className="flex size-32 items-center justify-center rounded-full bg-surface-tertiary shadow-inner">
          <MusicIcon className="size-12" aria-hidden="true" />
        </div>
        <span className="max-w-xs truncate text-sm font-medium text-text-primary" title={artifact.title}>
          {artifact.title ?? localize('com_ui_audio_artifact')}
        </span>
      </div>
      <audio
        src={src}
        controls
        preload="metadata"
        className="w-full max-w-md"
      >
        {localize('com_ui_audio_unsupported')}
      </audio>
    </div>
  );
}

/**
 * Empty/error state for media artifacts whose `src` resolved to nothing.
 * `fileToArtifact` already returns null for these, so this only fires
 * if a caller constructs the artifact by hand with a missing source.
 * Renders the kind-appropriate icon so the panel still feels
 * intentional instead of blank.
 */
function EmptyMediaState({ kind }: { kind: 'image' | 'video' | 'audio' | 'unknown' }) {
  const localize = useLocalize();
  const Icon = kind === 'video' ? FilmIcon : kind === 'audio' ? MusicIcon : ImageIcon;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-text-secondary">
      <Icon className="size-12" aria-hidden="true" />
      <span className="text-sm">{localize('com_ui_media_source_missing')}</span>
    </div>
  );
}
