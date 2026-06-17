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

/**
 * Peek the next index WITHOUT advancing the counter. Useful when a
 * caller needs to know which entry the upcoming `selectNextEntry` call
 * will return (for logging, billing labels, or pre-configuring
 * downstream consumers like `clientOptions.model`) without
 * double-advancing the round-robin cursor.
 *
 * `nextPoolIndex(agentId, n) === peekPoolIndex(agentId, n)` is the
 * invariant — the difference is purely whether the side-effect
 * (counter advance) happens.
 */
export function peekPoolIndex(agentId: string, poolLength: number): number {
  if (poolLength <= 0) return 0;
  if (poolLength === 1) return 0;
  return counters.get(agentId) ?? 0;
}

/**
 * Peek the entry that `selectNextEntry(agentId, pool, fallback)` would
 * return right now, without advancing the counter. Mirrors the same
 * fallback semantics for empty pools.
 */
export function peekNextEntry(
  agentId: string,
  pool: ReadonlyArray<ModelPoolEntry> | undefined,
  fallback: { provider: string; model: string },
): ModelPoolEntry {
  if (pool && pool.length > 0) {
    const idx = peekPoolIndex(agentId, pool.length);
    return pool[idx];
  }
  return { provider: fallback.provider, model: fallback.model };
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

/**
 * Minimal agent shape this helper needs to decide whether a pool is
 * configured, to derive the per-agent id used as the counter key, and
 * to synthesize a fallback entry when the agent has no pool. The
 * `provider`/`model` fields are the legacy single-model values — they
 * are NOT consulted when a non-empty pool is present, but the helper
 * uses them to populate `effectiveEntry` for legacy runs so callers
 * always receive a non-null tuple.
 */
export interface PoolRetryAgent {
  id: string;
  provider?: string | null;
  model?: string | null;
  models?: ReadonlyArray<ModelPoolEntry> | undefined;
}

export interface PoolRetryAttemptInfo {
  /** 1-based index of the current attempt. */
  attempt: number;
  /** Total number of attempts the helper will make (== pool.length when a
   *  pool is configured, 1 otherwise). */
  total: number;
  /** The (provider, model) tuple the upcoming attempt will use. `null` for
   *  legacy single-model runs. */
  entry: ModelPoolEntry | null;
}

export interface PoolRetryLogger {
  warn: (message: string, meta?: unknown) => void;
  error: (message: string, meta?: unknown) => void;
}

export interface RunAgentWithPoolRetryParams<T> {
  /** Agent whose `models` pool defines the round-robin sequence. When
   *  `agent.models` is empty/undefined, the helper runs `attempt` exactly
   *  once with the legacy singular (provider, model). */
  primaryAgent: PoolRetryAgent;
  /** Performs one full `createRun` + `processStream` cycle and resolves
   *  with whatever the caller wants to return. May reject — rejections
   *  are classified by {@link isRetryablePoolError} and retried with the
   *  next pool entry when possible. */
  attempt: (info: PoolRetryAttemptInfo) => Promise<T>;
  /** Hard cap on attempts; defaults to `pool.length` (no point trying more
   *  times than there are models). */
  maxAttempts?: number;
  /** Aborts the retry loop early — typical use is the request's
   *  `AbortSignal` so a client disconnect stops further LLM calls. */
  signal?: AbortSignal;
  /** Optional structured logger; falls back to no-op. The helper always
   *  logs retry decisions at warn level so operators can see failover in
   *  the request log. */
  logger?: PoolRetryLogger;
  /** Tag prepended to log messages; defaults to `[pool-retry]`. */
  logTag?: string;
}

/**
 * Result of a successful `runAgentWithPoolRetry` invocation.
 * - `result` is whatever the successful `attempt` resolved to.
 * - `effectiveEntry` is the pool entry that was actually used by the
 *   successful attempt. `null` when the agent has no pool (legacy
 *   single-model run). Callers that need to label the response
 *   (e.g. record `clientOptions.model` for billing, or attach the
 *   chosen model to the saved `Message`) should read this field
 *   rather than guessing from the round-robin counter.
 */
export interface RunAgentWithPoolRetryResult<T> {
  result: T;
  effectiveEntry: ModelPoolEntry | null;
}

/**
 * Generic round-robin retry wrapper for agent runs.
 *
 * Behavior:
 * - When `primaryAgent.models` is non-empty, runs `attempt` up to
 *   `min(pool.length, maxAttempts)` times. Each call to `attempt` is
 *   expected to invoke `createRun`, which in turn calls
 *   `selectNextEntry` once per top-level agent — the counter advances
 *   automatically, so the caller does NOT need to know which entry is
 *   next. After the last entry, the counter wraps to index 0 (consistent
 *   with the standalone `selectNextEntry` semantics).
 * - When the pool is empty (legacy single-model agent), runs `attempt`
 *   exactly once. The counter is not touched.
 * - Between attempts, only `isRetryablePoolError(err) === true` triggers
 *   a retry. Non-retryable errors (4xx other than 401/429, validation,
 *   user abort, etc.) propagate immediately so the caller can surface
 *   them to the client.
 * - Honors `signal.aborted` between attempts — once aborted, the helper
 *   throws an `AbortError`-shaped error and stops.
 *
 * The helper is intentionally silent about what happens on the wire
 * during a retry: the caller (controller) decides whether to:
 *   (A) abort the response and surface the last error, or
 *   (B) keep the response open and let the next attempt's chunks
 *       stream on top of any partial output from the failed attempt.
 * The helper only reports which entry is being attempted and how many
 * remain via the `info` argument and the optional logger, so the caller
 * can correlate log lines and instrumentation.
 */
export async function runAgentWithPoolRetry<T>(
  params: RunAgentWithPoolRetryParams<T>,
): Promise<RunAgentWithPoolRetryResult<T>> {
  const { primaryAgent, attempt, maxAttempts, signal, logger, logTag } = params;
  const tag = logTag ?? '[pool-retry]';
  const noop = () => {};
  const log = {
    warn: logger?.warn ?? noop,
    error: logger?.error ?? noop,
  };

  const pool = primaryAgent?.models;
  const hasPool = Array.isArray(pool) && pool.length > 0;
  const total = hasPool
    ? Math.min(maxAttempts ?? pool.length, pool.length)
    : 1;

  let lastError: unknown;
  for (let i = 0; i < total; i++) {
    if (signal?.aborted) {
      const abortErr = new Error('Aborted before pool retry attempt');
      abortErr.name = 'AbortError';
      throw abortErr;
    }

    /**
     * Peek the entry the upcoming `attempt` will use, so `info.entry`
     * is exact (not a hint). The peek does NOT advance the counter —
     * the `createRun` inside `attempt` advances it normally via
     * `selectNextEntry`. Net effect: peek + createRun = one
     * counter advance, landing on the entry we already announced.
     */
    const entry: ModelPoolEntry | null = hasPool
      ? peekNextEntry(primaryAgent.id, pool, {
          provider: primaryAgent.provider ?? '',
          model: primaryAgent.model ?? '',
        })
      : null;
    /** Legacy fallback when the agent has no pool: synthesize a one-off
     *  entry from the agent's singular (provider, model). This lets
     *  `info.entry` always carry the tuple that will be used. */
    const effectiveForInfo: ModelPoolEntry | null = entry ?? (primaryAgent
      ? { provider: primaryAgent.provider ?? '', model: primaryAgent.model ?? '' }
      : null);

    try {
      const result = await attempt({
        attempt: i + 1,
        total,
        entry: effectiveForInfo,
      });
      return { result, effectiveEntry: effectiveForInfo };
    } catch (err) {
      lastError = err;
      const remaining = total - (i + 1);
      const canRetry = remaining > 0;
      if (!canRetry || !isRetryablePoolError(err)) {
        throw err;
      }
      const errMessage = err instanceof Error ? err.message : String(err);
      /** `hasPool` guarantees `pool` is non-empty here; copy the narrowed
       *  reference into a local so the closure body type-checks without
       *  TS having to re-prove the invariant. */
      const poolRef = hasPool ? pool : null;
      log.warn(
        `${tag} attempt ${i + 1}/${total} failed with retryable error; trying next model (${remaining} remaining)`,
        {
          agentId: primaryAgent?.id,
          error: errMessage,
          nextEntry: poolRef ? poolRef[(i + 1) % poolRef.length] : null,
        },
      );
    }
  }
  // Unreachable: the loop either returns or throws, but TypeScript needs
  // an explicit terminal statement when the return type is the result
  // tuple.
  throw lastError;
}
