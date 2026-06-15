import { fuzzyMatch, fuzzyRank } from '../fuzzyMatch';

describe('fuzzyMatch', () => {
  it('returns 0 when the query is empty', () => {
    expect(fuzzyMatch('', 'oliver-chatbot-prompt.md').score).toBe(0);
  });

  it('returns 0 when the candidate is empty', () => {
    expect(fuzzyMatch('oliv', '').score).toBe(0);
  });

  it('returns 0 when the query is longer than the candidate', () => {
    expect(fuzzyMatch('olivchpro', 'oliver.md').score).toBe(0);
  });

  it('returns 0 when the query characters are not a subsequence of the candidate', () => {
    expect(fuzzyMatch('xyz', 'oliver-chatbot-prompt.md').score).toBe(0);
  });

  it('matches @olivchpro against oliver-chatbot-prompt.md', () => {
    const { score, matches } = fuzzyMatch('olivchpro', 'oliver-chatbot-prompt.md');
    expect(score).toBeGreaterThan(0);
    // Each query char finds the earliest leftmost occurrence:
    //   o(0) l(1) i(2) v(3) c(7) h(8) p(15) r(16) o(17)
    expect(matches).toEqual([0, 1, 2, 3, 7, 8, 15, 16, 17]);
  });

  it('matches case-insensitively', () => {
    const lower = fuzzyMatch('olivchpro', 'oliver-chatbot-prompt.md');
    const upper = fuzzyMatch('OLIVCHPRO', 'oliver-chatbot-prompt.md');
    expect(lower.score).toBeGreaterThan(0);
    expect(upper.score).toBeGreaterThan(0);
  });

  it('rewards exact-case matches over case-insensitive ones', () => {
    // The candidate here happens to share the case of the lowercase
    // query; the upper-case query is forced to fall back to the
    // case-insensitive score. We expect the case-exact query to
    // outscore the case-insensitive one.
    const exact = fuzzyMatch('olivchpro', 'oliver-chatbot-prompt.md');
    const insensitive = fuzzyMatch('OLIV', 'oliver-chatbot-prompt.md');
    expect(exact.score).toBeGreaterThan(insensitive.score);
  });

  it('prefers a contiguous run over a scattered match', () => {
    const contiguous = fuzzyMatch('chat', 'chatbot.md');
    const scattered = fuzzyMatch('chat', 'c-h-a-t.md');
    expect(contiguous.score).toBeGreaterThan(scattered.score);
  });

  it('rewards a contiguous run with a larger bonus than a single word-start bonus', () => {
    // 6 contiguous chars in `prepomptnt.md` beat 6 chars that start a
    // word in `oliver-chatbot-prompt.md` (where 20 chars of prefix
    // dilute the word-start advantage). This is the right trade-off
    // for fuzzy file search: long contiguous substrings are the
    // strongest signal that the user typed the right thing.
    const contiguous = fuzzyMatch('prompt', 'prepomptnt.md');
    const wordStart = fuzzyMatch('prompt', 'oliver-chatbot-prompt.md');
    expect(contiguous.score).toBeGreaterThan(wordStart.score);
  });

  it('prefers a match at index 0 over one buried in the middle', () => {
    const atStart = fuzzyMatch('oliv', 'oliver.md');
    const midFile = fuzzyMatch('oliv', 'doc-oliver.md');
    expect(atStart.score).toBeGreaterThan(midFile.score);
  });

  it('prefers a shorter candidate when scores would otherwise tie', () => {
    const short = fuzzyMatch('notes', 'notes.md');
    const long = fuzzyMatch('notes', 'a-really-long-prefix-notes.md');
    expect(short.score).toBeGreaterThan(long.score);
  });

  it('reports matched indices for highlighting', () => {
    const { matches } = fuzzyMatch('pro', 'prompt.md');
    expect(matches).toEqual([0, 1, 2]);
  });
});

describe('fuzzyRank', () => {
  type Row = { name: string };

  it('returns the input unchanged when the query is empty', () => {
    const rows: Row[] = [{ name: 'a.md' }, { name: 'b.md' }];
    expect(fuzzyRank('', rows, (r) => r.name)).toEqual(rows);
  });

  it('filters out non-matching candidates', () => {
    const rows: Row[] = [
      { name: 'oliver-chatbot-prompt.md' },
      { name: 'unrelated.txt' },
      { name: 'project.md' },
    ];
    const result = fuzzyRank('pro', rows, (r) => r.name);
    const names = result.map((r) => r.name);
    expect(names).toContain('oliver-chatbot-prompt.md');
    expect(names).toContain('project.md');
    expect(names).not.toContain('unrelated.txt');
  });

  it('ranks the most relevant candidate first', () => {
    const rows: Row[] = [
      { name: 'a-really-long-prefix-notes.md' },
      { name: 'notes.md' },
      { name: 'no_match.txt' },
    ];
    const result = fuzzyRank('notes', rows, (r) => r.name);
    expect(result[0]?.name).toBe('notes.md');
    expect(result).toHaveLength(2);
  });

  it('ranks @olivchpro → oliver-chatbot-prompt.md above other matches', () => {
    const rows: Row[] = [
      { name: 'other.txt' },
      { name: 'oliver.md' },
      { name: 'oliver-chatbot-prompt.md' },
    ];
    const result = fuzzyRank('olivchpro', rows, (r) => r.name);
    expect(result[0]?.name).toBe('oliver-chatbot-prompt.md');
  });
});
