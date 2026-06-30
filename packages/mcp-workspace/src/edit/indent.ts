/**
 * Relative indentation preservation for the `edit_file` tool.
 *
 * When the LLM sends a replacement whose indentation doesn't exactly match
 * the file's (because the layered matcher fell back to LINE_TRIM /
 * WHITESPACE_INSENSITIVE / FUZZY), we re-anchor the new text to the original
 * file's indentation:
 *
 *   1. Capture `baseIndent` from the first matched line in the file.
 *   2. Compute each line's `relativeIndent` in the new text (delta vs.
 *      the new text's minimum indent).
 *   3. Re-apply `baseIndent + relativeIndent` for every new-text line.
 *
 * Tabs vs spaces are preserved by detecting which style the file uses
 * (majority vote on leading whitespace).
 *
 * Stub for PR 1. Implementation lands in PR 3.
 */

export interface IndentStyle {
  /** A single tab or N spaces — whatever the file uses. */
  unit: string;
  /** Detected tab/space style for diagnostics. */
  style: "tabs" | "spaces";
}

/**
 * Re-anchor `newText`'s indentation to `baseIndent` while preserving the
 * relative structure inside `newText`.
 *
 * Stub: returns `newText` unchanged until PR 3.
 */
export function reindent(_newText: string, _baseIndent: string): string {
  return _newText;
}

/**
 * Detect the file's indentation style by sampling the first N non-empty
 * lines. Returns a unit (`\t` or `"  "`) the rest of the pipeline can reuse.
 *
 * Stub: returns 2 spaces until PR 3.
 */
export function detectIndentStyle(_content: string): IndentStyle {
  return { unit: "  ", style: "spaces" };
}