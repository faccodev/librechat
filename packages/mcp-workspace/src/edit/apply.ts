/**
 * Multi-edit transaction for the `edit_file` tool.
 *
 * Flow:
 *   1. Load the file content once into a buffer.
 *   2. For each edit (in array order):
 *        - Run layered matching against the CURRENT buffer state.
 *        - On success: update the buffer and record the position.
 *        - On failure: ABORT — discard the buffer, return the failing
 *          edit index and the structured error from `./errors`.
 *   3. When all edits succeed:
 *        - `dryRun: true`  -> return the diff between buffer and original
 *                            without touching disk.
 *        - `dryRun: false` -> atomic write via tmp + rename.
 *
 * Atomicity:
 *   - `tmpfile.writeFile()` + `fs.rename(tmp, target)` is atomic on POSIX
 *     and "atomic enough" on NTFS within a single volume.
 *   - If `rename` fails, the original file is unchanged (the tmp file
 *     gets cleaned up by the OS).
 *
 * Stub for PR 1. Implementation lands in PR 3.
 */

export interface ApplyRequest {
  path: string;
  edits: Array<{
    oldText: string;
    newText: string;
    replaceGlobally?: boolean;
  }>;
  dryRun: boolean;
}

export interface ApplyResult {
  applied: number;
  /** Unified diff (git-style) describing what was — or would have been — applied. */
  diff: string;
  matchInfo: Array<{
    index: number;
    matchOffset: number;
    matchLength: number;
    strategy: string;
    indentAdjusted: boolean;
  }>;
}

/**
 * Apply a multi-edit transaction to the file at `path`.
 *
 * Stub: throws "not implemented" until PR 3.
 */
export async function applyEdits(_req: ApplyRequest): Promise<ApplyResult> {
  throw new Error("applyEdits not implemented yet — landing in PR 3");
}