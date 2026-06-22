export interface CodeBlock {
  id: string;
  language: string;
  content: string;
}

export interface Artifact {
  id: string;
  lastUpdateTime: number;
  index?: number;
  messageId?: string;
  identifier?: string;
  language?: string;
  content?: string;
  title?: string;
  type?: string;
  /**
   * Optional source URL for media artifacts (IMAGE / VIDEO / AUDIO
   * buckets). Holds either a backend-relative path (e.g.
   * `/api/files/...`) or a `data:` URI when the agent inlines the
   * bytes. `fileToArtifact` populates this from
   * `attachment.filepath` (preferred) or `attachment.text` (when the
   * text payload is itself a data URL).
   */
  src?: string;
}

export type ArtifactFiles =
  | {
      'App.tsx': string;
      'index.tsx': string;
      '/components/ui/MermaidDiagram.tsx': string;
    }
  | Partial<{
      [x: string]: string | undefined;
    }>;
