import { TTLCache } from '~/mcp/externalCatalog/cache';

describe('TTLCache', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns undefined for missing keys', () => {
    const cache = new TTLCache<string>({ maxEntries: 10, ttlMs: 1000 });
    expect(cache.get('nope')).toBeUndefined();
    expect(cache.stats().misses).toBe(1);
    expect(cache.stats().hits).toBe(0);
  });

  it('returns the stored value before TTL expires', () => {
    const cache = new TTLCache<string>({ maxEntries: 10, ttlMs: 1000 });
    cache.set('k', 'v');
    jest.advanceTimersByTime(999);
    expect(cache.get('k')).toBe('v');
    expect(cache.stats().hits).toBe(1);
  });

  it('expires entries after TTL', () => {
    const cache = new TTLCache<string>({ maxEntries: 10, ttlMs: 1000 });
    cache.set('k', 'v');
    jest.advanceTimersByTime(1001);
    expect(cache.get('k')).toBeUndefined();
    expect(cache.stats().expirations).toBe(1);
  });

  it('evicts the LRU entry when capacity is reached', () => {
    const cache = new TTLCache<string>({ maxEntries: 2, ttlMs: 60_000 });
    cache.set('a', '1');
    cache.set('b', '2');
    // Touch `a` so `b` becomes the LRU.
    expect(cache.get('a')).toBe('1');
    cache.set('c', '3');
    expect(cache.get('b')).toBeUndefined();
    expect(cache.get('a')).toBe('1');
    expect(cache.get('c')).toBe('3');
    expect(cache.stats().evictions).toBe(1);
  });

  it('update of an existing key does not evict', () => {
    const cache = new TTLCache<string>({ maxEntries: 2, ttlMs: 60_000 });
    cache.set('a', '1');
    cache.set('b', '2');
    cache.set('a', '1-updated');
    cache.set('c', '3');
    expect(cache.get('a')).toBe('1-updated');
    expect(cache.get('b')).toBeUndefined();
    expect(cache.stats().evictions).toBe(1);
  });

  it('rejects invalid construction parameters', () => {
    expect(() => new TTLCache({ maxEntries: 0, ttlMs: 1000 })).toThrow();
    expect(() => new TTLCache({ maxEntries: 10, ttlMs: 0 })).toThrow();
  });

  it('clear empties the cache', () => {
    const cache = new TTLCache<string>({ maxEntries: 10, ttlMs: 1000 });
    cache.set('a', '1');
    cache.set('b', '2');
    cache.clear();
    expect(cache.size()).toBe(0);
    expect(cache.get('a')).toBeUndefined();
  });
});