/**
 * Subsequence-based fuzzy match scoring, tuned for filename search in the
 * chat `@` file picker. Inspiration: VS Code's file quick-open, Cursor,
 * and the classic fzy/fzf algorithm.
 *
 * Rules (in order of importance):
 *  - All characters of `query` must appear in `candidate` in order
 *    (case-insensitive). If any are missing the candidate is rejected
 *    (returns 0).
 *  - Consecutive matches in the candidate are worth more than scattered
 *    ones (`@oliv` prefers `oliv` to `o_l_i_v`).
 *  - A match at the start of the candidate is worth more than a match
 *    in the middle, and a match at the start of a word (after a
 *    separator like `-`, `_`, `.`, `/`, or whitespace) is worth more
 *    than a match mid-word.
 *  - Exact case matches score higher than case-insensitive matches.
 *  - Shorter candidates rank higher when scores tie (favors precise hits
 *    over long descriptive names).
 *
 * The score is unbounded (higher is better). Returns 0 when the query is
 * not a subsequence of the candidate, or when either argument is empty.
 *
 * Examples (with these weights):
 *   fuzzyMatch('olivchpro', 'oliver-chatbot-prompt.md')  > 0   (good)
 *   fuzzyMatch('olivchpro', 'docs/notes.md')             === 0 (no match)
 *   fuzzyMatch('pro',       'prompt.md')                 > 0
 */
export type FuzzyMatchResult = {
  /** Numeric score, higher is better. 0 means "no match". */
  score: number;
  /** Indices into `candidate` that were matched, in order. */
  matches: number[];
};

const WORD_SEPARATORS = new Set(['-', '_', '.', '/', ' ', '+']);

const isWordStart = (candidate: string, index: number): boolean => {
  if (index === 0) {
    return true;
  }
  return WORD_SEPARATORS.has(candidate[index - 1] ?? '');
};

const scoreCase = (candidateChar: string, queryChar: string): number =>
  candidateChar === queryChar ? 2 : 1;

export function fuzzyMatch(query: string, candidate: string): FuzzyMatchResult {
  if (!query || !candidate) {
    return { score: 0, matches: [] };
  }
  const q = query.toLowerCase();
  const c = candidate.toLowerCase();
  const qlen = q.length;
  const clen = c.length;
  if (qlen > clen) {
    return { score: 0, matches: [] };
  }

  // Greedy forward pass: pick the earliest leftmost match for each
  // query character. This is fast (O(n)) and produces a deterministic
  // highlight set; the proper DP variant (Smith-Waterman-style) would
  // be more accurate but is overkill for sub-kilobyte filenames.
  const matchedIndices: number[] = [];
  let qi = 0;
  let ci = 0;
  while (qi < qlen && ci < clen) {
    if (q[qi] === c[ci]) {
      matchedIndices.push(ci);
      qi += 1;
    }
    ci += 1;
  }
  if (qi < qlen) {
    return { score: 0, matches: [] };
  }

  // Score the matched indices.
  let score = 0;
  for (let i = 0; i < matchedIndices.length; i += 1) {
    const idx = matchedIndices[i];
    const candidateChar = candidate[idx] ?? '';
    const queryChar = query[i] ?? '';
    score += scoreCase(candidateChar, queryChar);
    if (isWordStart(candidate, idx)) {
      score += 8;
    }
    if (i > 0 && matchedIndices[i - 1] === idx - 1) {
      // Consecutive match: bonus that scales with run length. Weighted
      // high enough to overcome the per-word-start bonus so that
      // `chat` against `chatbot.md` outranks `chat` against
      // `c-h-a-t.md` (where every match is "at a word start" but
      // nothing is contiguous).
      score += 8 + i;
    }
  }

  // Length penalty: prefer shorter candidates when other factors tie.
  // Subtracting 1 per non-matching character keeps the score strictly
  // positive for any successful match while still ranking "prompt.md"
  // above "very-long-prefix-prompt.md" for the query "prompt".
  score += -(candidate.length - matchedIndices.length);

  return { score, matches: matchedIndices };
}

/**
 * Convenience: filter and rank `candidates` by `fuzzyMatch(query, name)`.
 * Returns candidates sorted by descending score, dropping any with a
 * score of 0 (no subsequence match).
 */
export function fuzzyRank<T>(query: string, candidates: T[], getName: (c: T) => string): T[] {
  if (!query.trim()) {
    return candidates;
  }
  const ranked: Array<{ item: T; score: number }> = [];
  for (const item of candidates) {
    const { score } = fuzzyMatch(query, getName(item));
    if (score > 0) {
      ranked.push({ item, score });
    }
  }
  ranked.sort((a, b) => b.score - a.score);
  return ranked.map((r) => r.item);
}
