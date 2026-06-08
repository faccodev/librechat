import {
  selectNextEntry,
  nextPoolIndex,
  isRetryablePoolError,
  _resetPoolCounterForTests,
  type ModelPoolEntry,
} from './pool';

const pool: ModelPoolEntry[] = [
  { provider: 'openAI', model: 'gpt-4o' },
  { provider: 'anthropic', model: 'claude-3-5-sonnet' },
  { provider: 'google', model: 'gemini-1.5-pro' },
];

describe('nextPoolIndex', () => {
  beforeEach(() => _resetPoolCounterForTests());

  it('returns 0 for an empty pool (caller should fall back)', () => {
    expect(nextPoolIndex('agent-x', 0)).toBe(0);
  });

  it('returns 0 for a single-entry pool (no movement needed)', () => {
    expect(nextPoolIndex('agent-x', 1)).toBe(0);
  });

  it('walks 0 -> 1 -> 2 -> 0 in a 3-entry pool', () => {
    expect(nextPoolIndex('agent-x', 3)).toBe(0);
    expect(nextPoolIndex('agent-x', 3)).toBe(1);
    expect(nextPoolIndex('agent-x', 3)).toBe(2);
    expect(nextPoolIndex('agent-x', 3)).toBe(0);
  });

  it('keeps separate counters per agent id', () => {
    expect(nextPoolIndex('agent-a', 3)).toBe(0);
    expect(nextPoolIndex('agent-a', 3)).toBe(1);
    expect(nextPoolIndex('agent-b', 3)).toBe(0);
    expect(nextPoolIndex('agent-b', 3)).toBe(1);
    expect(nextPoolIndex('agent-a', 3)).toBe(2);
  });
});

describe('selectNextEntry', () => {
  beforeEach(() => _resetPoolCounterForTests());

  it('returns the pool entry at the next index, advancing the counter', () => {
    const fallback = { provider: 'openAI', model: 'gpt-4o' };
    const a = selectNextEntry('agent-x', pool, fallback);
    const b = selectNextEntry('agent-x', pool, fallback);
    const c = selectNextEntry('agent-x', pool, fallback);
    expect(a).toEqual({ provider: 'openAI', model: 'gpt-4o' });
    expect(b).toEqual({ provider: 'anthropic', model: 'claude-3-5-sonnet' });
    expect(c).toEqual({ provider: 'google', model: 'gemini-1.5-pro' });
  });

  it('wraps around after the last entry', () => {
    const fallback = { provider: 'openAI', model: 'gpt-4o' };
    selectNextEntry('agent-x', pool, fallback); // 0
    selectNextEntry('agent-x', pool, fallback); // 1
    selectNextEntry('agent-x', pool, fallback); // 2
    const fourth = selectNextEntry('agent-x', pool, fallback);
    expect(fourth).toEqual(pool[0]);
  });

  it('falls back to the singular pair when the pool is empty', () => {
    const fallback = { provider: 'openAI', model: 'gpt-4o' };
    const a = selectNextEntry('agent-x', undefined, fallback);
    const b = selectNextEntry('agent-x', [], fallback);
    expect(a).toEqual(fallback);
    expect(b).toEqual(fallback);
  });

  it('does NOT advance the counter when the pool is empty (legacy no-op)', () => {
    const fallback = { provider: 'openAI', model: 'gpt-4o' };
    selectNextEntry('agent-x', undefined, fallback);
    selectNextEntry('agent-x', undefined, fallback);
    selectNextEntry('agent-x', pool, fallback); // first call with pool — should be 0
    expect(selectNextEntry('agent-x', pool, fallback)).toEqual(pool[1]);
  });
});

describe('isRetryablePoolError', () => {
  it('returns true for HTTP 5xx in common shapes', () => {
    expect(isRetryablePoolError({ status: 500 })).toBe(true);
    expect(isRetryablePoolError({ status: 502 })).toBe(true);
    expect(isRetryablePoolError({ status: 503 })).toBe(true);
    expect(isRetryablePoolError({ status: 504 })).toBe(true);
    expect(isRetryablePoolError({ response: { status: 500 } })).toBe(true);
    expect(isRetryablePoolError({ error: { statusCode: 500 } })).toBe(true);
  });

  it('returns true for HTTP 429 (rate limit / quota)', () => {
    expect(isRetryablePoolError({ status: 429 })).toBe(true);
    expect(isRetryablePoolError({ response: { status: 429 } })).toBe(true);
  });

  it('returns true for HTTP 401 (auth — usually a per-key issue)', () => {
    expect(isRetryablePoolError({ status: 401 })).toBe(true);
    expect(isRetryablePoolError({ response: { status: 401 } })).toBe(true);
  });

  it('returns false for other 4xx (400, 403, 404, 422)', () => {
    expect(isRetryablePoolError({ status: 400 })).toBe(false);
    expect(isRetryablePoolError({ status: 403 })).toBe(false);
    expect(isRetryablePoolError({ status: 404 })).toBe(false);
    expect(isRetryablePoolError({ status: 422 })).toBe(false);
  });

  it('returns true for Node network error codes', () => {
    expect(isRetryablePoolError({ code: 'ECONNRESET' })).toBe(true);
    expect(isRetryablePoolError({ code: 'ETIMEDOUT' })).toBe(true);
    expect(isRetryablePoolError({ code: 'ECONNREFUSED' })).toBe(true);
    expect(isRetryablePoolError({ code: 'ENOTFOUND' })).toBe(true);
    expect(isRetryablePoolError({ code: 'EAI_AGAIN' })).toBe(true);
  });

  it('returns true for undici/fetch "fetch failed" TypeError', () => {
    const err = new TypeError('fetch failed');
    expect(isRetryablePoolError(err)).toBe(true);
  });

  it('returns false for AbortError (user-cancelled, do not burn the pool)', () => {
    const err = new DOMException('aborted', 'AbortError');
    expect(isRetryablePoolError(err)).toBe(false);
  });

  it('returns false for null/undefined and unknown shapes', () => {
    expect(isRetryablePoolError(null)).toBe(false);
    expect(isRetryablePoolError(undefined)).toBe(false);
    expect(isRetryablePoolError('string error')).toBe(false);
    expect(isRetryablePoolError(new Error('plain error'))).toBe(false);
  });
});
