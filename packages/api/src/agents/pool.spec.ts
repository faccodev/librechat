import {
  selectNextEntry,
  nextPoolIndex,
  peekNextEntry,
  peekPoolIndex,
  isRetryablePoolError,
  runAgentWithPoolRetry,
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

describe('peekPoolIndex / peekNextEntry', () => {
  beforeEach(() => _resetPoolCounterForTests());

  it('peekPoolIndex returns the current index without advancing', () => {
    expect(peekPoolIndex('agent-x', 3)).toBe(0);
    expect(peekPoolIndex('agent-x', 3)).toBe(0);
    expect(peekPoolIndex('agent-x', 3)).toBe(0);
  });

  it('peekNextEntry mirrors selectNextEntry without consuming a slot', () => {
    const fallback = { provider: 'openAI', model: 'gpt-4o' };
    const a = peekNextEntry('agent-x', pool, fallback);
    const b = peekNextEntry('agent-x', pool, fallback);
    const c = peekNextEntry('agent-x', pool, fallback);
    expect(a).toEqual(pool[0]);
    expect(b).toEqual(pool[0]);
    expect(c).toEqual(pool[0]);
  });

  it('after a peek, a real selectNextEntry lands on pool[0] (not pool[1])', () => {
    const fallback = { provider: 'openAI', model: 'gpt-4o' };
    peekNextEntry('agent-x', pool, fallback);
    peekNextEntry('agent-x', pool, fallback);
    const real = selectNextEntry('agent-x', pool, fallback);
    expect(real).toEqual(pool[0]);
  });

  it('peekNextEntry falls back to the singular pair when the pool is empty', () => {
    const fallback = { provider: 'openAI', model: 'gpt-4o' };
    expect(peekNextEntry('agent-x', undefined, fallback)).toEqual(fallback);
    expect(peekNextEntry('agent-x', [], fallback)).toEqual(fallback);
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

  it('returns true for null/undefined and unknown shapes', () => {
    expect(isRetryablePoolError(null)).toBe(false);
    expect(isRetryablePoolError(undefined)).toBe(false);
    expect(isRetryablePoolError('string error')).toBe(false);
    expect(isRetryablePoolError(new Error('plain error'))).toBe(true);
  });
});

describe('runAgentWithPoolRetry', () => {
  beforeEach(() => _resetPoolCounterForTests());

  it('runs the attempt exactly once when the agent has no pool', async () => {
    const calls: number[] = [];
    const { result, effectiveEntry } = await runAgentWithPoolRetry({
      primaryAgent: { id: 'agent-x', provider: 'openAI', model: 'gpt-4o' },
      attempt: async (info) => {
        calls.push(info.attempt);
        return 'ok';
      },
    });
    expect(result).toBe('ok');
    expect(effectiveEntry).toEqual({ provider: 'openAI', model: 'gpt-4o' });
    expect(calls).toEqual([1]);
  });

  it('reports a synthesized entry for legacy single-model runs', async () => {
    const entries: Array<ModelPoolEntry | null> = [];
    await runAgentWithPoolRetry({
      primaryAgent: { id: 'agent-x', provider: 'openAI', model: 'gpt-4o', models: [] },
      attempt: async (info) => {
        entries.push(info.entry);
        return 0;
      },
    });
    expect(entries).toEqual([{ provider: 'openAI', model: 'gpt-4o' }]);
  });

  it('defaults maxAttempts to 10 when the pool has more than 10 entries', async () => {
    const bigPool: Array<ModelPoolEntry> = Array.from({ length: 12 }, (_, i) => ({
      provider: `provider_${i}`,
      model: `model_${i}`,
    }));
    let invocations = 0;
    await expect(
      runAgentWithPoolRetry({
        primaryAgent: { id: 'agent-x', models: bigPool },
        attempt: async () => {
          invocations += 1;
          throw Object.assign(new Error('boom'), { status: 503 });
        },
      }),
    ).rejects.toMatchObject({ message: 'boom' });
    // Cap kicks in: 10 attempts, not 12.
    expect(invocations).toBe(10);
  });

  it('retries on 413 (TPM exceeded / payload too large)', async () => {
    const pool = [
      { provider: 'groq', model: 'qwen/qwen3-32b' },
      { provider: 'anthropic', model: 'claude-3-5-sonnet' },
    ];
    let invocations = 0;
    const { effectiveEntry } = await runAgentWithPoolRetry({
      primaryAgent: { id: 'agent-x', models: pool },
      attempt: async ({ attempt }) => {
        invocations += 1;
        selectNextEntry('agent-x', pool, { provider: 'groq', model: 'qwen/qwen3-32b' });
        if (attempt === 1) {
          throw Object.assign(new Error('Request too large for model'), {
            status: 413,
            message:
              '413 Request too large for model `qwen/qwen3-32b` in organization `org_01kgg46bk5eb0bt96h7sjaxgd9` service tier `on_demand` on tokens per minute (TPM): Limit 6000, Requested 27770',
          });
        }
        return 'ok';
      },
    });
    expect(invocations).toBe(2);
    expect(effectiveEntry).toEqual(pool[1]);
  });

  it('retries on 408 (request timeout)', async () => {
    const pool = [
      { provider: 'groq', model: 'qwen/qwen3-32b' },
      { provider: 'anthropic', model: 'claude-3-5-sonnet' },
    ];
    let invocations = 0;
    const { effectiveEntry } = await runAgentWithPoolRetry({
      primaryAgent: { id: 'agent-x', models: pool },
      attempt: async ({ attempt }) => {
        invocations += 1;
        selectNextEntry('agent-x', pool, { provider: 'groq', model: 'qwen/qwen3-32b' });
        if (attempt === 1) {
          throw Object.assign(new Error('Request Timeout'), { status: 408 });
        }
        return 'ok';
      },
    });
    expect(invocations).toBe(2);
    expect(effectiveEntry).toEqual(pool[1]);
  });
  it('invokes the attempt pool.length times when every attempt fails retryably', async () => {
    let invocations = 0;
    await expect(
      runAgentWithPoolRetry({
        primaryAgent: { id: 'agent-x', models: pool },
        attempt: async () => {
          invocations += 1;
          const err = Object.assign(new Error('boom'), { status: 503 });
          throw err;
        },
      }),
    ).rejects.toMatchObject({ message: 'boom' });
    expect(invocations).toBe(pool.length);
  });

  it('stops on the first successful attempt and returns its value + entry', async () => {
    let invocations = 0;
    const observedEntries: Array<ModelPoolEntry | null> = [];
    const { result, effectiveEntry } = await runAgentWithPoolRetry({
      primaryAgent: { id: 'agent-x', models: pool },
      attempt: async ({ attempt: a, entry }) => {
        invocations += 1;
        observedEntries.push(entry);
        /** Simulate `createRun` advancing the counter — mirrors the
         *  real flow where the runner calls `selectNextEntry` exactly
         *  once per attempt. */
        selectNextEntry('agent-x', pool, { provider: 'openAI', model: 'gpt-4o' });
        if (a < 2) {
          const err = Object.assign(new Error('transient'), { status: 502 });
          throw err;
        }
        return `ok-on-${a}`;
      },
    });
    expect(result).toBe('ok-on-2');
    expect(invocations).toBe(2);
    expect(effectiveEntry).toEqual(pool[1]);
    /** info.entry must match what the successful attempt saw — the
     *  counter and the peek must agree. */
    expect(observedEntries[0]).toEqual(pool[0]);
    expect(observedEntries[1]).toEqual(pool[1]);
  });

  it('does not retry on non-retryable errors (4xx other than 401/429)', async () => {
    let invocations = 0;
    await expect(
      runAgentWithPoolRetry({
        primaryAgent: { id: 'agent-x', models: pool },
        attempt: async () => {
          invocations += 1;
          throw Object.assign(new Error('bad request'), { status: 400 });
        },
      }),
    ).rejects.toMatchObject({ message: 'bad request' });
    expect(invocations).toBe(1);
  });

  it('does not retry on AbortError-shaped errors (treats them as user-cancel)', async () => {
    let invocations = 0;
    await expect(
      runAgentWithPoolRetry({
        primaryAgent: { id: 'agent-x', models: pool },
        attempt: async () => {
          invocations += 1;
          throw new DOMException('aborted', 'AbortError');
        },
      }),
    ).rejects.toBeInstanceOf(DOMException);
    expect(invocations).toBe(1);
  });

  it('retries on 429 and 401 (per-key failures often resolve with the next key)', async () => {
    let invocations = 0;
    const { result, effectiveEntry } = await runAgentWithPoolRetry({
      primaryAgent: { id: 'agent-x', models: pool },
      attempt: async ({ attempt: a }) => {
        invocations += 1;
        selectNextEntry('agent-x', pool, { provider: 'openAI', model: 'gpt-4o' });
        if (a === 1) {
          throw Object.assign(new Error('rate limited'), { status: 429 });
        }
        if (a === 2) {
          throw Object.assign(new Error('unauthorized'), { status: 401 });
        }
        return 'ok';
      },
    });
    expect(result).toBe('ok');
    expect(effectiveEntry).toEqual(pool[2]);
    expect(invocations).toBe(3);
  });

  it('retries on Node network error codes', async () => {
    let invocations = 0;
    const { result, effectiveEntry } = await runAgentWithPoolRetry({
      primaryAgent: { id: 'agent-x', models: pool },
      attempt: async ({ attempt: a }) => {
        invocations += 1;
        selectNextEntry('agent-x', pool, { provider: 'openAI', model: 'gpt-4o' });
        if (a === 1) {
          throw Object.assign(new Error('reset'), { code: 'ECONNRESET' });
        }
        return 'ok';
      },
    });
    expect(result).toBe('ok');
    expect(effectiveEntry).toEqual(pool[1]);
    expect(invocations).toBe(2);
  });

  it('aborts the loop when the signal is already aborted', async () => {
    const ac = new AbortController();
    ac.abort();
    let invocations = 0;
    await expect(
      runAgentWithPoolRetry({
        primaryAgent: { id: 'agent-x', models: pool },
        signal: ac.signal,
        attempt: async () => {
          invocations += 1;
          return 'ok';
        },
      }),
    ).rejects.toMatchObject({ name: 'AbortError' });
    expect(invocations).toBe(0);
  });

  it('respects maxAttempts when smaller than pool.length', async () => {
    let invocations = 0;
    await expect(
      runAgentWithPoolRetry({
        primaryAgent: { id: 'agent-x', models: pool },
        maxAttempts: 2,
        attempt: async () => {
          invocations += 1;
          throw Object.assign(new Error('boom'), { status: 503 });
        },
      }),
    ).rejects.toMatchObject({ message: 'boom' });
    expect(invocations).toBe(2);
  });

  it('emits a warn log between attempts with the next entry hint', async () => {
    const warnings: Array<{ msg: string; meta: unknown }> = [];
    const fakeLogger = {
      warn: (msg: string, meta?: unknown) => {
        warnings.push({ msg, meta });
      },
      error: () => {},
    };
    await expect(
      runAgentWithPoolRetry({
        primaryAgent: { id: 'agent-x', models: pool },
        logger: fakeLogger,
        logTag: '[test]',
        attempt: async () => {
          throw Object.assign(new Error('boom'), { status: 503 });
        },
      }),
    ).rejects.toBeDefined();
    // 3-entry pool, 3 attempts → 2 warn lines (between attempts), no warn
    // after the final throw.
    expect(warnings).toHaveLength(pool.length - 1);
    expect(warnings[0].msg).toContain('[test]');
    expect(warnings[0].msg).toContain('attempt 1/3');
    expect(warnings[0].msg).toContain('2 remaining');
    expect((warnings[0].meta as { nextEntry: ModelPoolEntry }).nextEntry).toEqual(pool[1]);
  });

  it('does not throw on its own when the logger is omitted (default no-op)', async () => {
    await expect(
      runAgentWithPoolRetry({
        primaryAgent: { id: 'agent-x', models: pool },
        attempt: async () => {
          throw Object.assign(new Error('boom'), { status: 503 });
        },
      }),
    ).rejects.toBeDefined();
  });

  /**
   * Round-robin semantics for the "regenerate" button.
   *
   * The frontend dispatches a normal `ask()` call with `isRegenerate:
   * true` — it is NOT a special backend path. The pool counter advances
   * once per `createRun`, so each regenerate lands on the next pool
   * entry, mirroring the per-request semantics of a fresh message.
   */
  it('cycles through the pool on consecutive regenerates (round-robin)', async () => {
    const sequence: string[] = [];
    /** Stand in for `buildAgentInput`'s call: returns the entry the
     *  runner will use, so we can observe the round-robin order. */
    for (let i = 0; i < 4; i++) {
      const entry = selectNextEntry('agent-x', pool, {
        provider: 'openAI',
        model: 'gpt-4o',
      });
      sequence.push(`${entry.provider}:${entry.model}`);
      /** No retry needed for this scenario — single successful attempt. */
      await runAgentWithPoolRetry({
        primaryAgent: { id: 'agent-x', models: pool },
        attempt: async () => 'ok',
      });
    }
    expect(sequence).toEqual([
      'openAI:gpt-4o',
      'anthropic:claude-3-5-sonnet',
      'google:gemini-1.5-pro',
      // Wraps back to the first entry on the 4th regenerate
      'openAI:gpt-4o',
    ]);
  });

  it('the counter survives across requests (no implicit reset between calls)', async () => {
    /** Simulates: msg nova → regenerate → regenerate. The counter should
     *  be at 2 after the first call and at 0 (wrap) after the third. */
    const idx1 = selectNextEntry('agent-x', pool, {
      provider: 'openAI',
      model: 'gpt-4o',
    });
    await runAgentWithPoolRetry({
      primaryAgent: { id: 'agent-x', models: pool },
      attempt: async () => 'ok',
    });

    const idx2 = selectNextEntry('agent-x', pool, {
      provider: 'openAI',
      model: 'gpt-4o',
    });
    await runAgentWithPoolRetry({
      primaryAgent: { id: 'agent-x', models: pool },
      attempt: async () => 'ok',
    });

    const idx3 = selectNextEntry('agent-x', pool, {
      provider: 'openAI',
      model: 'gpt-4o',
    });
    await runAgentWithPoolRetry({
      primaryAgent: { id: 'agent-x', models: pool },
      attempt: async () => 'ok',
    });

    expect(idx1).toEqual(pool[0]);
    expect(idx2).toEqual(pool[1]);
    expect(idx3).toEqual(pool[2]);
  });

  it('force-advances the counter if the attempt throws early (before selectNextEntry is called)', async () => {
    let selectCalled = false;
    await expect(
      runAgentWithPoolRetry({
        primaryAgent: { id: 'agent-x', models: pool },
        attempt: async ({ attempt }) => {
          if (attempt === 1) {
            // Throw early error, simulating a crash/pre-validation before selectNextEntry is ever hit
            throw new Error('early error');
          }
          selectCalled = true;
          selectNextEntry('agent-x', pool, { provider: 'openAI', model: 'gpt-4o' });
          return 'ok';
        },
      }),
    ).resolves.toBeDefined();

    expect(selectCalled).toBe(true);
    // Since attempt 1 failed early, the counter index before it was 0,
    // it got forced to 1. Then attempt 2 succeeded and called selectNextEntry,
    // so it returned 1 and set the counter to 2.
    // Let's verify the next select starts at index 2.
    const nextIdx = selectNextEntry('agent-x', pool, { provider: 'openAI', model: 'gpt-4o' });
    expect(nextIdx).toEqual(pool[2]);
  });
});
