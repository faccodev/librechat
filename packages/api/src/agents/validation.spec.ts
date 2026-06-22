import { MAX_SUBAGENTS } from 'librechat-data-provider';
import {
  agentCreateSchema,
  agentUpdateSchema,
  agentSubagentsSchema,
} from './validation';

describe('agentSubagentsSchema', () => {
  it('accepts enabled:true with a list within the cap', () => {
    const result = agentSubagentsSchema.safeParse({
      enabled: true,
      allowSelf: false,
      agent_ids: ['agent_1', 'agent_2'],
    });
    expect(result.success).toBe(true);
  });

  it('accepts the feature-off shape (enabled:false, no agents)', () => {
    const result = agentSubagentsSchema.safeParse({ enabled: false });
    expect(result.success).toBe(true);
  });

  it('rejects agent_ids longer than MAX_SUBAGENTS', () => {
    const oversized = Array.from({ length: MAX_SUBAGENTS + 1 }, (_, i) => `agent_${i}`);
    const result = agentSubagentsSchema.safeParse({
      enabled: true,
      agent_ids: oversized,
    });
    expect(result.success).toBe(false);
  });

  it('accepts exactly MAX_SUBAGENTS entries', () => {
    const atCap = Array.from({ length: MAX_SUBAGENTS }, (_, i) => `agent_${i}`);
    const result = agentSubagentsSchema.safeParse({
      enabled: true,
      agent_ids: atCap,
    });
    expect(result.success).toBe(true);
  });
});

describe('agentCreateSchema with subagents', () => {
  const base = {
    provider: 'openAI',
    model: 'gpt-4o-mini',
    tools: [],
  };

  it('passes with subagents omitted', () => {
    const result = agentCreateSchema.safeParse(base);
    expect(result.success).toBe(true);
  });

  it('passes with a valid subagents config', () => {
    const result = agentCreateSchema.safeParse({
      ...base,
      subagents: { enabled: true, allowSelf: true, agent_ids: [] },
    });
    expect(result.success).toBe(true);
  });

  it('rejects when subagents.agent_ids exceeds the cap', () => {
    const oversized = Array.from({ length: MAX_SUBAGENTS + 1 }, (_, i) => `agent_${i}`);
    const result = agentCreateSchema.safeParse({
      ...base,
      subagents: { enabled: true, agent_ids: oversized },
    });
    expect(result.success).toBe(false);
  });
});

describe('agentUpdateSchema with subagents', () => {
  it('accepts a partial update with only the disabled flag set', () => {
    const result = agentUpdateSchema.safeParse({
      subagents: { enabled: false, allowSelf: true, agent_ids: [] },
    });
    expect(result.success).toBe(true);
  });

  it('rejects oversized agent_ids on update', () => {
    const oversized = Array.from({ length: MAX_SUBAGENTS + 3 }, (_, i) => `agent_${i}`);
    const result = agentUpdateSchema.safeParse({
      subagents: { enabled: true, agent_ids: oversized },
    });
    expect(result.success).toBe(false);
  });
});

describe('agent schemas with model pool (round-robin)', () => {
  it('accepts a create payload with a models pool of 2+ entries', () => {
    const result = agentCreateSchema.safeParse({
      name: 'Pooled Agent',
      provider: 'openAI',
      model: 'gpt-4o',
      models: [
        { provider: 'openAI', model: 'gpt-4o' },
        { provider: 'anthropic', model: 'claude-3-5-sonnet' },
      ],
    });
    expect(result.success).toBe(true);
  });

  it('accepts an empty pool (legacy single-pair behavior)', () => {
    const result = agentCreateSchema.safeParse({
      name: 'Legacy Agent',
      provider: 'openAI',
      model: 'gpt-4o',
      models: [],
    });
    expect(result.success).toBe(true);
  });

  it('accepts a payload without the models field at all', () => {
    const result = agentCreateSchema.safeParse({
      name: 'No-Field Agent',
      provider: 'openAI',
      model: 'gpt-4o',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an entry with empty provider or model', () => {
    const result = agentCreateSchema.safeParse({
      name: 'Bad Pool',
      provider: 'openAI',
      model: 'gpt-4o',
      models: [{ provider: '', model: 'gpt-4o' }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects a pool larger than the 256-entry cap', () => {
    const oversized = Array.from({ length: 257 }, (_, i) => ({
      provider: 'openAI',
      model: `gpt-4o-${i}`,
    }));
    const result = agentCreateSchema.safeParse({
      name: 'Huge Pool',
      provider: 'openAI',
      model: 'gpt-4o',
      models: oversized,
    });
    expect(result.success).toBe(false);
  });

  it('accepts a pool at the 256-entry boundary', () => {
    const boundary = Array.from({ length: 256 }, (_, i) => ({
      provider: 'openAI',
      model: `gpt-4o-${i}`,
    }));
    const result = agentCreateSchema.safeParse({
      name: 'Boundary Pool',
      provider: 'openAI',
      model: 'gpt-4o',
      models: boundary,
    });
    expect(result.success).toBe(true);
  });

  it('rejects non-string fields in pool entries', () => {
    const result = agentCreateSchema.safeParse({
      name: 'Type-Bad Pool',
      provider: 'openAI',
      model: 'gpt-4o',
      models: [{ provider: 123, model: 'gpt-4o' }],
    });
    expect(result.success).toBe(false);
  });

  it('update schema accepts the same models shape', () => {
    const result = agentUpdateSchema.safeParse({
      models: [
        { provider: 'openAI', model: 'gpt-4o' },
        { provider: 'anthropic', model: 'claude-3-5-sonnet' },
      ],
    });
    expect(result.success).toBe(true);
  });
});
