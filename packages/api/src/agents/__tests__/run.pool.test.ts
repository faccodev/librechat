/**
 * Regression tests for the round-robin pool → provider credential resolver.
 *
 * The original `buildAgentInput` only updated `scopedAgent.model` from the
 * pool entry but kept the legacy `model_parameters` intact, which meant
 * `apiKey` and `baseURL` for the LLM client still pointed at the legacy
 * provider even when the pool switched to a different one. For custom
 * endpoints it also called `getOpenAIConfig` without `modelOptions`, so
 * `llmConfig.model` came back as `''` and blanked the model entirely.
 *
 * These tests pin down the fixed behavior:
 *   - pool entry targeting a different provider re-runs `getOptions` (the
 *     same canonical initializer `initializeAgent` uses) so apiKey/baseURL
 *     come from the new provider
 *   - the pool entry's `model` always reaches `clientOptions.model`,
 *     including in the legacy (no req/db) fallback path
 *   - the legacy single-model flow is unchanged
 */
import { logger } from '@librechat/data-schemas';
import { Run } from '@librechat/agents';
import { createRun } from '~/agents/run';
import { _resetPoolCounterForTests } from '~/agents/pool';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

jest.mock('winston', () => ({
  createLogger: jest.fn(() => ({
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  })),
  format: Object.assign(
    jest.fn((fn) => () => ({ transform: fn })),
    {
      combine: jest.fn(),
      colorize: jest.fn(),
      simple: jest.fn(),
      label: jest.fn(),
      timestamp: jest.fn(),
      printf: jest.fn(),
      errors: jest.fn(),
      splat: jest.fn(),
      json: jest.fn(),
    },
  ),
  addColors: jest.fn(),
  transports: {
    Console: jest.fn(),
    DailyRotateFile: jest.fn(),
    File: jest.fn(),
  },
}));

jest.mock('~/utils/env', () => ({
  resolveHeaders: jest.fn((opts: { headers?: unknown } = { headers: {} }) => opts.headers ?? {}),
  createSafeUser: jest.fn(() => ({})),
}));

jest.mock('@librechat/data-schemas', () => ({
  ...jest.requireActual('@librechat/data-schemas'),
  logger: {
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

jest.mock('@librechat/agents', () => {
  const actual = jest.requireActual('@librechat/agents');
  return {
    ...actual,
    Run: {
      create: jest.fn().mockResolvedValue({
        processStream: jest.fn().mockResolvedValue(undefined),
      }),
    },
  };
});

// `getProviderConfig` is the boundary the pool re-resolver crosses to
// reach `getOptions`. The actual `initializeCustom`/`initializeOpenAI`
// implementations fetch credentials from `db`/env in ways that are
// expensive to set up in unit tests (token-config caching, model fetch
// side-effects, etc.). Mocking the whole module keeps the regression
// surface narrow: the only thing we want to verify here is that the
// pool re-resolver CALLS `getOptions` with the right arguments and
// integrates the returned `llmConfig`/`configOptions` into the final
// model_parameters. The canonical initializer itself is exercised
// separately by `initialize.test.ts`.
const PROVIDER_LLM_CONFIG: Record<string, { apiKey: string; baseURL: string; model: string }> = {
  openAI: {
    apiKey: 'openai-key-resolved',
    baseURL: 'https://api.openai.com/v1',
    model: 'gpt-4o',
  },
  anthropic: {
    apiKey: 'anthropic-key-resolved',
    baseURL: 'https://api.anthropic.com',
    model: 'claude-3-5-sonnet',
  },
};

const mockGetProviderConfig = jest.fn();
jest.mock('~/endpoints/config/providers', () => ({
  getProviderConfig: (...args: unknown[]) => mockGetProviderConfig(...args),
  providerConfigMap: {},
  resolveTitleTiming: jest.fn(() => 'immediate'),
}));

// ---------------------------------------------------------------------------
// Test fixtures
// ---------------------------------------------------------------------------

function makeAgentWithPool(
  legacyProvider: string,
  legacyModel: string,
  pool: Array<{ provider: string; model: string }>,
) {
  return {
    id: 'agent_pool_test',
    provider: legacyProvider,
    endpoint: legacyProvider,
    model: legacyModel,
    tools: [],
    model_parameters: {
      model: legacyModel,
      streamUsage: true,
    },
    maxContextTokens: 100_000,
    baseContextTokens: 100_000,
    toolContextMap: {},
    models: pool,
  };
}

function makeReq() {
  return {
    user: { id: 'user_1' },
    body: {},
    config: { endpoints: {} },
  } as never;
}

function makeDb() {
  return {
    getUserKey: jest.fn().mockResolvedValue(null),
    getUserKeyValues: jest.fn().mockResolvedValue({}),
  } as never;
}

function configureProviders() {
  mockGetProviderConfig.mockImplementation(({ provider }: { provider: string }) => {
    const providerCfg = PROVIDER_LLM_CONFIG[provider];
    if (!providerCfg) {
      return {
        getOptions: jest.fn().mockRejectedValue(new Error(`unknown test provider: ${provider}`)),
        overrideProvider: provider,
        customEndpointConfig: undefined,
      };
    }
    return {
      getOptions: jest.fn(
        async ({
          model_parameters,
        }: {
          endpoint: string;
          model_parameters?: Record<string, unknown>;
        }) => {
          const requestedModel = model_parameters?.model as string | undefined;
          return {
            llmConfig: {
              apiKey: providerCfg.apiKey,
              model: requestedModel ?? providerCfg.model,
              streamUsage: true,
              configuration: {
                baseURL: providerCfg.baseURL,
                defaultHeaders: { 'x-test-endpoint': provider },
              },
            },
            configOptions: {
              baseURL: providerCfg.baseURL,
              defaultHeaders: { 'x-test-endpoint': provider },
            },
            useLegacyContent: false,
          };
        },
      ),
      overrideProvider: provider,
      customEndpointConfig: undefined,
    };
  });
}

async function captureAgentInput(agents: Array<Record<string, unknown>>) {
  const signal = new AbortController().signal;
  // Reset only Run.create's call log — the mock implementation stays so
  // createRun resolves normally. Each capture only inspects its own call.
  (Run.create as jest.Mock).mockClear();
  await createRun({
    agents: agents as never,
    signal,
    streaming: true,
    streamUsage: true,
    req: makeReq(),
    db: makeDb(),
  });
  const callArgs = (Run.create as jest.Mock).mock.calls[0][0];
  return callArgs.graphConfig.agents as Array<Record<string, unknown>>;
}

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

beforeEach(() => {
  jest.clearAllMocks();
  _resetPoolCounterForTests();
  configureProviders();
});

describe('createRun round-robin pool — credential + model resolution', () => {
  it('legacy single-model agent (no pool) keeps the legacy model_parameters untouched', async () => {
    const agent = makeAgentWithPool('openAI', 'gpt-4o', []);
    const [captured] = await captureAgentInput([agent]);
    const clientOptions = captured.clientOptions as Record<string, unknown>;

    // The legacy path is short-circuited before any pool logic, so
    // `getOptions` was never called — only the legacy model_parameters
    // are forwarded as-is.
    expect(clientOptions.model).toBe('gpt-4o');
    expect(mockGetProviderConfig).not.toHaveBeenCalled();
  });

  it('pool entry equal to legacy: no provider re-resolution', async () => {
    const agent = makeAgentWithPool('openAI', 'gpt-4o', [{ provider: 'openAI', model: 'gpt-4o' }]);
    const [captured] = await captureAgentInput([agent]);
    const clientOptions = captured.clientOptions as Record<string, unknown>;

    expect(clientOptions.model).toBe('gpt-4o');
    // Single-entry pool where the entry matches the legacy (provider, model)
    // is a no-op — `getOptions` is never invoked.
    expect(mockGetProviderConfig).not.toHaveBeenCalled();
  });

  it('pool entry targeting a different provider re-runs getOptions and uses the new provider credentials', async () => {
    const agent = makeAgentWithPool('openAI', 'gpt-4o', [
      { provider: 'anthropic', model: 'claude-3-5-sonnet' },
    ]);
    const [captured] = await captureAgentInput([agent]);
    const clientOptions = captured.clientOptions as Record<string, unknown>;
    const configuration = clientOptions.configuration as Record<string, unknown>;

    // The pool entry's model wins, NOT the legacy openai model.
    expect(clientOptions.model).toBe('claude-3-5-sonnet');
    // The pool entry's provider's apiKey wins, NOT the legacy openai key.
    expect(clientOptions.apiKey).toBe('anthropic-key-resolved');
    // The pool entry's provider's baseURL wins, NOT the legacy openai url.
    expect(configuration.baseURL).toBe('https://api.anthropic.com');

    // `getOptions` was called for the pool entry's provider, not the legacy.
    expect(mockGetProviderConfig).toHaveBeenCalledWith(
      expect.objectContaining({ provider: 'anthropic' }),
    );
  });

  it('legacy model_parameters fall through alongside the re-resolved pool values', async () => {
    const agent = makeAgentWithPool('openAI', 'gpt-4o', [
      { provider: 'anthropic', model: 'claude-3-5-sonnet' },
    ]);
    (agent.model_parameters as Record<string, unknown>).temperature = 0.7;
    (agent.model_parameters as Record<string, unknown>).topP = 0.9;

    const [captured] = await captureAgentInput([agent]);
    const clientOptions = captured.clientOptions as Record<string, unknown>;

    expect(clientOptions.model).toBe('claude-3-5-sonnet');
    expect(clientOptions.apiKey).toBe('anthropic-key-resolved');
    // The legacy temperature/topP survive the spread because the resolver
    // does `{ ...agent.model_parameters, ...options.llmConfig }`.
    expect(clientOptions.temperature).toBe(0.7);
    expect(clientOptions.topP).toBe(0.9);
  });

  it('falls back to inline resolution when req/db are not provided — still overlays the pool model', async () => {
    const agent = makeAgentWithPool('openAI', 'gpt-4o', [
      { provider: 'anthropic', model: 'claude-3-5-sonnet' },
    ]);
    const signal = new AbortController().signal;
    (Run.create as jest.Mock).mockClear();
    await createRun({
      agents: [agent as never],
      signal,
      streaming: true,
      streamUsage: true,
      // No req/db — exercises the fallback path.
    });

    const callArgs = (Run.create as jest.Mock).mock.calls[0][0];
    const captured = callArgs.graphConfig.agents[0] as {
      clientOptions: Record<string, unknown>;
    };
    const clientOptions = captured.clientOptions;

    // The fallback must STILL overlay the pool entry's model — that's the
    // exact bug this test pins down. Even without req/db, the model
    // field must come from the pool entry, not the legacy.
    expect(clientOptions.model).toBe('claude-3-5-sonnet');
  });

  it('warns and falls through to the legacy parameters when getOptions throws', async () => {
    mockGetProviderConfig.mockImplementationOnce(() => ({
      getOptions: jest.fn().mockRejectedValue(new Error('provider down')),
      overrideProvider: 'anthropic',
      customEndpointConfig: undefined,
    }));
    const warnSpy = jest.spyOn(logger, 'warn').mockImplementation(() => logger);

    const agent = makeAgentWithPool('openAI', 'gpt-4o', [
      { provider: 'anthropic', model: 'claude-3-5-sonnet' },
    ]);
    const [captured] = await captureAgentInput([agent]);
    const clientOptions = captured.clientOptions as Record<string, unknown>;

    // Model is still the pool entry's model (the post-resolve overlay).
    expect(clientOptions.model).toBe('claude-3-5-sonnet');
    // A warn log was emitted with the provider name so operators can
    // trace why credentials weren't re-resolved.
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('anthropic'), expect.anything());
    warnSpy.mockRestore();
  });

  it('multi-entry pool: each request lands on a different entry, each with the right credentials', async () => {
    const pool = [
      { provider: 'openAI', model: 'gpt-4o' },
      { provider: 'anthropic', model: 'claude-3-5-sonnet' },
    ];
    const agent = makeAgentWithPool('openAI', 'gpt-4o', pool);
    (agent.model_parameters as Record<string, unknown>).apiKey = 'openai-key-legacy';

    const firstCapture = await captureAgentInput([agent]);
    const firstClient = firstCapture[0].clientOptions as Record<string, unknown>;
    console.log('FIRST model=', firstClient.model);
    expect(firstClient.model).toBe('gpt-4o');
    expect(firstClient.apiKey).toBe('openai-key-legacy');

    const secondCapture = await captureAgentInput([agent]);
    const secondClient = secondCapture[0].clientOptions as Record<string, unknown>;
    console.log('SECOND model=', secondClient.model);
    expect(secondClient.model).toBe('claude-3-5-sonnet');
    expect(secondClient.apiKey).toBe('anthropic-key-resolved');
  });
});
