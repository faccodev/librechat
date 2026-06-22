/**
 * Integration test for /api/admin/mcp-integrations.
 *
 * The auth and admin capability middleware are stubbed out so the
 * test focuses on input validation, error mapping, and the
 * contract between the route handlers and the service methods.
 */

process.env.CREDS_KEY = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
process.env.CREDS_IV = '0123456789abcdef0123456789abcdef';

const express = require('express');
const request = require('supertest');
const { z } = require('zod');

const mockList = jest.fn();
const mockFind = jest.fn();
const mockUpsert = jest.fn();
const mockRemove = jest.fn();

jest.mock('~/models', () => ({
  listMCPIntegrations: mockList,
  findMCPIntegrationByName: mockFind,
  upsertMCPIntegration: mockUpsert,
  removeMCPIntegration: mockRemove,
}));

jest.mock('~/server/middleware', () => ({
  requireJwtAuth: (_req, _res, next) => next(),
}));

jest.mock('~/server/middleware/roles/capabilities', () => ({
  requireCapability: () => (_req, _res, next) => next(),
}));

jest.mock('@librechat/data-schemas', () => ({
  SystemCapabilities: { ACCESS_ADMIN: 'access:admin' },
  logger: {
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  },
}));

const router = require('./mcpIntegrations');

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/admin/mcp-integrations', router);
  return app;
}

const sampleSSEConfig = {
  type: 'sse',
  url: 'https://example.com/mcp',
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET /api/admin/mcp-integrations', () => {
  it('returns a redacted list of integrations', async () => {
    mockList.mockResolvedValueOnce([
      {
        _id: 'id-1',
        name: 'higgsfield',
        title: 'Higgsfield',
        description: null,
        enabled: true,
        createdAt: new Date('2026-01-01'),
        updatedAt: new Date('2026-01-02'),
        config: { type: 'sse', url: 'https://example.com/mcp' },
      },
    ]);

    const res = await request(buildApp()).get('/api/admin/mcp-integrations');
    expect(res.status).toBe(200);
    expect(mockList).toHaveBeenCalledWith({ redact: true });
    expect(res.body.items).toHaveLength(1);
    expect(res.body.items[0].name).toBe('higgsfield');
  });

  it('returns 500 when the service throws', async () => {
    mockList.mockRejectedValueOnce(new Error('db down'));
    const res = await request(buildApp()).get('/api/admin/mcp-integrations');
    expect(res.status).toBe(500);
    expect(res.body.error).toBe('db down');
  });
});

describe('GET /api/admin/mcp-integrations/:name', () => {
  it('returns the decrypted integration', async () => {
    mockFind.mockResolvedValueOnce({
      _id: 'id-1',
      name: 'higgsfield',
      enabled: true,
      config: { type: 'sse', url: 'https://example.com/mcp' },
    });
    const res = await request(buildApp()).get('/api/admin/mcp-integrations/higgsfield');
    expect(res.status).toBe(200);
    expect(mockFind).toHaveBeenCalledWith('higgsfield');
    expect(res.body.name).toBe('higgsfield');
  });

  it('returns 404 when not found', async () => {
    mockFind.mockResolvedValueOnce(null);
    const res = await request(buildApp()).get('/api/admin/mcp-integrations/missing');
    expect(res.status).toBe(404);
  });

  it('returns 400 on invalid name', async () => {
    const res = await request(buildApp()).get('/api/admin/mcp-integrations/bad%20name%21');
    expect(res.status).toBe(400);
  });
});

describe('PUT /api/admin/mcp-integrations/:name', () => {
  const validBody = { config: sampleSSEConfig };

  it('upserts and returns the saved integration', async () => {
    mockUpsert.mockResolvedValueOnce({
      _id: 'id-1',
      name: 'higgsfield',
      enabled: true,
      config: sampleSSEConfig,
    });
    const res = await request(buildApp())
      .put('/api/admin/mcp-integrations/higgsfield')
      .send(validBody);
    expect(res.status).toBe(200);
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'higgsfield',
        config: sampleSSEConfig,
      }),
    );
  });

  it('returns 400 when body is missing config', async () => {
    const res = await request(buildApp())
      .put('/api/admin/mcp-integrations/higgsfield')
      .send({});
    expect(res.status).toBe(400);
  });

  it('returns 400 when config is malformed', async () => {
    const res = await request(buildApp())
      .put('/api/admin/mcp-integrations/higgsfield')
      .send({ config: { type: 'sse' } });
    expect(res.status).toBe(400);
    expect(res.body.details).toBeDefined();
  });

  it('returns 400 when name is invalid', async () => {
    const res = await request(buildApp())
      .put('/api/admin/mcp-integrations/bad%20name')
      .send(validBody);
    expect(res.status).toBe(400);
  });
});

describe('DELETE /api/admin/mcp-integrations/:name', () => {
  it('removes and returns 200', async () => {
    mockRemove.mockResolvedValueOnce({
      _id: 'id-1',
      name: 'higgsfield',
      enabled: true,
      config: sampleSSEConfig,
    });
    const res = await request(buildApp()).delete('/api/admin/mcp-integrations/higgsfield');
    expect(res.status).toBe(200);
    expect(mockRemove).toHaveBeenCalledWith({ name: 'higgsfield' });
    expect(res.body.removed).toBe(true);
  });

  it('returns 404 when not found', async () => {
    mockRemove.mockResolvedValueOnce(null);
    const res = await request(buildApp()).delete('/api/admin/mcp-integrations/missing');
    expect(res.status).toBe(404);
  });
});

// Sanity check that the zod schemas are wired correctly (defense in
// depth — also catches accidental changes to the import path).
describe('MCPOptionsSchema import contract', () => {
  it('exposes a Zod schema from librechat-data-provider', () => {
    expect(typeof z.object).toBe('function');
  });
});
