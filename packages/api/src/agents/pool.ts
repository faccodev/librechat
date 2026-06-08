/**
 * Round-robin provider/model pool.
 *
 * Goals:
 * 1. Per-request counter that advances atomically (multiple Node workers
 *    on the same process share the same counter, so plain BigInt / modulo
 *    is enough — no need for an external lock).
 * 2. Retryable-error classification (5xx, 429, 401, network) so the caller
 *    can decide whether to swap to the next tuple.
 * 3. Pure functions, no I/O — easy to unit test in isolation.
 */

export type ModelPoolEntry = { provider: string; model: string };

/** A counter for one agent's pool. Persists across requests on the
 *  same Node process. Reset on process restart (acceptable — the
 *  ordering is best-effort, not strict). */
const counters = new Map<string, number>();

/**
 * Return the current index for this agent, then atomically advance
 * the counter for the next call. The first call against a fresh agent
 * returns 0, the next returns 1, etc. — and wraps at poolLength.
 *
 * Returns 0 for an empty or single-entry pool (no movement needed).
 */
export function nextPoolIndex(agentId: string, poolLength: number): number {
  if (poolLength <= 0) return 0;
  if (poolLength === 1) return 0;
  const current = counters.get(agentId) ?? 0;
  counters.set(agentId, (current + 1) % poolLength);
  return current;
}

/** Test-only: reset the in-memory counter for an agent. */
export function _resetPoolCounterForTests(agentId?: string): void {
  if (agentId === undefined) {
    counters.clear();
  } else {
    counters.delete(agentId);
  }
}

/**
 * Resolve the (provider, model) pair to use for this request.
 *
 * - If `pool` is non-empty, use the counter (per-request advance) and
 *   return the entry at that index. Each call advances the counter
 *   exactly once, so two back-to-back requests with the same pool get
 *   different entries.
 * - If `pool` is empty, fall back to the singular `provider`/`model`
 *   pair (legacy behavior). The counter is NOT advanced in that case
 *   so the legacy flow remains a no-op.
 */
export function selectNextEntry(
  agentId: string,
  pool: ReadonlyArray<ModelPoolEntry> | undefined,
  fallback: { provider: string; model: string },
): ModelPoolEntry {
  if (pool && pool.length > 0) {
    const idx = nextPoolIndex(agentId, pool.length);
    return pool[idx];
  }
  return { provider: fallback.provider, model: fallback.model };
}

/**
 * Classify an error as retryable for the purposes of advancing the
 * round-robin pool. Returns true for:
 *   - HTTP 5xx (server error)
 *   - HTTP 429 (rate limit / quota)
 *   - HTTP 401 (auth — usually a per-key failure, retry with next)
 *   - Network-level errors (ECONNRESET, ECONNREFUSED, ETIMEDOUT, ENOTFOUND,
 *     EAI_AGAIN, fetch failures, AbortError)
 *
 * Returns false for:
 *   - Other 4xx (400 bad request, 403 forbidden, 404, 422 — these are
 *     prompt/config issues that won't fix themselves by switching models).
 *   - Any error not matching a known shape (thrown by user code, schema
 *     validation, etc.).
 *
 * Intentionally permissive about the input shape — the function looks
 * for the most common markers used across axios, undici (Node fetch),
 * and LangChain's own error wrappers.
 */
export function isRetryablePoolError(err: unknown): boolean {
  if (err == null) return false;

  // Network errors from Node have a `code` like ECONNRESET, ETIMEDOUT, etc.
  // Match the "E" prefix plus a known set of full suffixes (no partial
  // alternation, which would consume the prefix and miss compound names
  // like ECONNRESET = ECONN + RESET).
  const code = (err as { code?: unknown })?.code;
  if (typeof code === 'string' && /^(ECONNRESET|ECONNREFUSED|ETIMEDOUT|ENOTFOUND|EAI_AGAIN|EHOSTUNREACH|EPIPE|ENETDOWN|ENETUNREACH|EHOSTDOWN|ENETRESET)$/.test(code)) {
    return true;
  }

  // undici / Node fetch — TypeError("fetch failed") with a `.cause`
  if (err instanceof TypeError && err.message === 'fetch failed') {
    return true;
  }

  // AbortError from AbortController — only retry if the controller
  // wasn't the user's own. We can't tell here, so we treat it as
  // NOT retryable (avoids burning the pool on a user-cancelled req).
  if (err instanceof DOMException && err.name === 'AbortError') {
    return false;
  }

  // HTTP status from axios, undici, or LangChain chat-model errors.
  // The shapes vary: { status }, { response: { status } },
  // { statusCode }, or the error itself carries a numeric `status`.
  const status = readStatus(err);
  if (status != null) {
    if (status >= 500 && status < 600) return true;
    if (status === 429) return true;
    if (status === 401) return true;
    return false;
  }

  return false;
}

function readStatus(err: unknown): number | null {
  if (err == null || typeof err !== 'object') return null;
  const e = err as Record<string, unknown>;
  for (const key of ['status', 'statusCode']) {
    const v = e[key];
    if (typeof v === 'number' && v >= 100 && v < 600) return v;
  }
  const response = e.response;
  if (response != null && typeof response === 'object') {
    const r = response as Record<string, unknown>;
    for (const key of ['status', 'statusCode']) {
      const v = r[key];
      if (typeof v === 'number' && v >= 100 && v < 600) return v;
    }
  }
  const error = e.error;
  if (error != null && typeof error === 'object') {
    const r = error as Record<string, unknown>;
    for (const key of ['status', 'statusCode']) {
      const v = r[key];
      if (typeof v === 'number' && v >= 100 && v < 600) return v;
    }
  }
  return null;
}
