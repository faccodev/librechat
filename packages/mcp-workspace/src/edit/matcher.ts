/**
 * Layered matching engine for the `edit_file` tool.
 *
 * Five strategies tried in order — first hit wins:
 *
 *   1. EXACT                  — byte-for-byte match
 *   2. WHITESPACE_TRIM        — trim trailing whitespace per line
 *   3. LINE_TRIM              — trim leading whitespace per line
 *   4. WHITESPACE_INSENSITIVE — collapse all whitespace runs
 *   5. FUZZY                  — Levenshtein over sliding windows
 *
 * Each strategy reports which one matched via `MatchInfo.strategy` so
 * tests and debugging can tell *why* a match landed.
 *
 * Stub for PR 1 (rename + structure only). Implementation lands in PR 3.
 */

export type MatchStrategy =
  | "exact"
  | "whitespace-trim"
  | "line-trim"
  | "whitespace-insensitive"
  | "fuzzy";

export interface MatchInfo {
  /** 0-based index into the `edits` array that produced this match. */
  editIndex: number;
  /** Byte offset into the file content where the match starts. */
  offset: number;
  /** Length of the match in bytes. */
  length: number;
  /** Which layered strategy actually matched. */
  strategy: MatchStrategy;
  /** True when the original file's indentation was re-applied to the new text. */
  indentAdjusted: boolean;
}

export interface MatchRequest {
  content: string;
  oldText: string;
  replaceGlobally: boolean;
}

/**
 * Find every occurrence of `oldText` inside `content` using the layered
 * matching strategy. Returns all match positions (used by both single-match
 * and `replaceGlobally` paths).
 *
 * Stub: returns `[]` until PR 3 implements the real matcher.
 */
export function findMatches(_req: MatchRequest): MatchInfo[] {
  return [];
}