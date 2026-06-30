/**
 * Unified diff generator for the `edit_file` tool.
 *
 * Used both for `dryRun: true` (return what WOULD be applied) and for the
 * MCP tool result so the LibreChat UI can render a diff preview.
 *
 * Output format: git-style unified diff (`--- a/path\n+++ b/path\n@@ ... @@`)
 * — the same format `git diff` emits, so existing renderers in the UI
 * can highlight it without a custom parser.
 *
 * Stub for PR 1. Implementation lands in PR 3 (uses `diff` package or
 * custom line-level diff).
 */

export interface DiffInput {
  path: string;
  before: string;
  after: string;
}

/**
 * Generate a unified diff between `before` and `after` for the file at `path`.
 *
 * Stub: returns an empty string until PR 3.
 */
export function unifiedDiff(_input: DiffInput): string {
  return "";
}