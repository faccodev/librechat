/**
 * Structured error schema for the `edit_file` tool.
 *
 * Every failure returns `isError: true` with a JSON body matching one of
 * the variants in the `EditError` discriminated union. The shape is
 * stable so clients (and the LLM itself) can switch on `error` to render
 * the right UX / retry the right way.
 *
 * Modeled on Aider's `SearchReplaceNoExactMatch` feedback: the failure
 * payload includes the expected text plus top-3 candidate matches with
 * similarity scores, so the LLM can self-correct without re-reading the
 * entire file.
 */

export type EditError =
  | {
      error: "EMPTY_EDITS";
      hint: string;
    }
  | {
      error: "SEARCH_NOT_FOUND";
      failedEditIndex: number;
      expected: string;
      suggestions: Array<{ offset: number; text: string; similarity: number }>;
      hint: string;
    }
  | {
      error: "AMBIGUOUS_MATCH";
      failedEditIndex: number;
      expected: string;
      occurrences: number;
      hint: string;
    }
  | {
      error: "FILE_NOT_FOUND";
      path: string;
    }
  | {
      error: "FILE_TOO_LARGE";
      path: string;
      sizeBytes: number;
      limitBytes: number;
      hint: string;
    }
  | {
      error: "INVALID_PATH";
      path: string;
      reason: string;
    }
  | {
      error: "READ_ERROR";
      underlying: string;
    }
  | {
      error: "ATOMIC_WRITE_FAILED";
      underlying: string;
    }
  | {
      error: "EDIT_INDEX_OUT_OF_RANGE";
      failedEditIndex: number;
      totalEdits: number;
    };

/**
 * Build a `SEARCH_NOT_FOUND` error with default hint text.
 */
export function searchNotFound(
  failedEditIndex: number,
  expected: string,
  suggestions: Array<{ offset: number; text: string; similarity: number }>,
): EditError {
  return {
    error: "SEARCH_NOT_FOUND",
    failedEditIndex,
    expected,
    suggestions,
    hint: "Did you mean one of the suggestions above? Re-read the file with read_file and resend only the failed block — the previously-applied edits in this batch are still in the buffer but were NOT written to disk, so they will be re-applied automatically when you retry the whole batch.",
  };
}

/**
 * Build an `AMBIGUOUS_MATCH` error (more than one match found and
 * `replaceGlobally` was false).
 */
export function ambiguousMatch(
  failedEditIndex: number,
  expected: string,
  occurrences: number,
): EditError {
  return {
    error: "AMBIGUOUS_MATCH",
    failedEditIndex,
    expected,
    occurrences,
    hint: `Your oldText matched ${occurrences} different places in the file. Either include more surrounding lines to make the match unique, or set replaceGlobally: true if you want all occurrences replaced.`,
  };
}