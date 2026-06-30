/**
 * Tiny TTL LRU cache for external MCP registry responses.
 *
 * Why not just use a Map: a hot admin panel can issue dozens of
 * search/preview calls in a session; without an upper bound, memory
 * grows unbounded. The cap of 200 entries is intentionally generous
 * (covers all common search + preview combinations) while bounding
 * resident memory to a few MB.
 *
 * Why not node-lru-cache or similar: zero deps, no overhead, easy to
 * unit test. The cache is intentionally simple — if we ever need
 * LFU, persistence, or cluster-coherent behavior, swap the impl
 * behind the same interface.
 */

interface Entry<V> {
  value: V;
  expiresAt: number;
}

export interface CacheStats {
  size: number;
  hits: number;
  misses: number;
  evictions: number;
  expirations: number;
}

export class TTLCache<V> {
  private readonly store = new Map<string, Entry<V>>();

  private readonly maxEntries: number;

  private readonly ttlMs: number;

  private hits = 0;

  private misses = 0;

  private evictions = 0;

  private expirations = 0;

  constructor(options: { maxEntries: number; ttlMs: number }) {
    if (options.maxEntries <= 0) {
      throw new Error('TTLCache: maxEntries must be > 0');
    }
    if (options.ttlMs <= 0) {
      throw new Error('TTLCache: ttlMs must be > 0');
    }
    this.maxEntries = options.maxEntries;
    this.ttlMs = options.ttlMs;
  }

  /** Returns the cached value or `undefined` if missing/expired. */
  get(key: string): V | undefined {
    const entry = this.store.get(key);
    if (!entry) {
      this.misses += 1;
      return undefined;
    }
    if (entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      this.expirations += 1;
      this.misses += 1;
      return undefined;
    }
    // LRU touch — re-insert so Map iteration order reflects access order.
    this.store.delete(key);
    this.store.set(key, entry);
    this.hits += 1;
    return entry.value;
  }

  /** Stores a value with the configured TTL. Evicts the LRU entry if at capacity. */
  set(key: string, value: V): void {
    const existing = this.store.get(key);
    if (existing) {
      this.store.delete(key);
    } else if (this.store.size >= this.maxEntries) {
      // Evict oldest. Map iteration order is insertion order, and `get`
      // re-inserts on hit, so the first key here is the true LRU.
      const oldestKey = this.store.keys().next().value;
      if (oldestKey !== undefined) {
        this.store.delete(oldestKey);
        this.evictions += 1;
      }
    }
    this.store.set(key, {
      value,
      expiresAt: Date.now() + this.ttlMs,
    });
  }

  /** Removes a single entry. No-op if absent. */
  delete(key: string): void {
    this.store.delete(key);
  }

  /** Empties the cache. */
  clear(): void {
    this.store.clear();
  }

  /** Current entry count, including expired-but-not-yet-evicted entries. */
  size(): number {
    return this.store.size;
  }

  /** Snapshot of internal counters. Useful for tests and `/health` endpoints. */
  stats(): CacheStats {
    return {
      size: this.store.size,
      hits: this.hits,
      misses: this.misses,
      evictions: this.evictions,
      expirations: this.expirations,
    };
  }
}