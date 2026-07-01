import { Types } from 'mongoose';
import type { Response } from 'express';
import type {
  CreateSkillResult,
  ISkill,
  ISkillFile,
} from '@librechat/data-schemas';

import type { GitImportSkillDeps } from '~/skills/gitImport/handler';

type SaveRequest = Parameters<
  ReturnType<typeof import('~/skills/gitImport/handler').createGitImportHandler>['save']
>[0];
type PreviewRequest = Parameters<
  ReturnType<typeof import('~/skills/gitImport/handler').createGitImportHandler>['preview']
>[0];

// Mock the resolver so the handler tests don't hit the network. The resolver
// itself is exercised end-to-end in resolver.test.ts.
jest.mock('~/skills/gitImport/resolver', () => ({
  resolveGitImport: jest.fn(),
  fetchGitImportPreview: jest.fn(),
}));

import { createGitImportHandler } from '~/skills/gitImport/handler';
import { resolveGitImport, fetchGitImportPreview } from '~/skills/gitImport/resolver';

const mockedResolve = resolveGitImport as jest.MockedFunction<typeof resolveGitImport>;
const mockedFetch = fetchGitImportPreview as jest.MockedFunction<
  typeof fetchGitImportPreview
>;

interface MockResponse extends Response {
  body?: unknown;
  statusCode?: number;
}

function mockResponse(): MockResponse {
  const res = {} as MockResponse;
  res.status = jest.fn((statusCode: number) => {
    res.statusCode = statusCode;
    return res;
  }) as MockResponse['status'];
  res.json = jest.fn((body: unknown) => {
    res.body = body;
    return res;
  }) as MockResponse['json'];
  return res;
}

function mockDeps(): GitImportSkillDeps {
  const skillId = new Types.ObjectId();
  const skill = {
    _id: skillId,
    name: 'imported-skill',
    description: 'Imported from git URL',
    body: '---\nname: imported-skill\ndescription: Imported from git URL\n---\n\nBody',
  } as ISkill & { _id: Types.ObjectId };
  const skillFile = { _id: new Types.ObjectId() } as ISkillFile & { _id: Types.ObjectId };

  return {
    createSkill: jest.fn(async () => ({ skill }) as unknown as CreateSkillResult),
    getSkillById: jest.fn(async () => skill),
    deleteSkill: jest.fn(async () => ({ deleted: true })),
    upsertSkillFile: jest.fn(async () => skillFile),
    saveBuffer: jest.fn(async () => ({ filepath: '/tmp/never-written', source: 'local' })),
    grantPermission: jest.fn(async () => undefined),
  };
}

function mockRequest(overrides: Partial<SaveRequest> = {}): SaveRequest {
  return {
    user: {
      id: 'user-1',
      _id: new Types.ObjectId(),
      name: 'Tester',
      username: 'tester',
    },
    body: { url: 'https://github.com/owner/repo' },
    ...overrides,
  } as unknown as SaveRequest;
}

const FRONTMATTER = `---
name: my-skill
description: Imported skill
always-apply: true
---

# My skill
`;

const baseResolved = {
  url: 'https://github.com/owner/repo',
  ref: 'main',
  path: '',
  effectivePath: '',
  host: 'github' as const,
};

const basePreview = {
  host: 'github' as const,
  repository: 'owner/repo',
  ref: 'main',
  path: '',
  skillMd: FRONTMATTER,
  files: [{ path: 'helper.md', bytes: 12 }],
  warnings: [],
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('createGitImportHandler.preview', () => {
  it('rejects invalid URLs with 400', async () => {
    const deps = mockDeps();
    const handler = createGitImportHandler(deps);
    const req = mockRequest({ body: { url: 'not-a-url' } });
    const res = mockResponse();

    await handler.preview(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid URL' });
    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it('rejects private/loopback hosts with 400', async () => {
    const deps = mockDeps();
    const handler = createGitImportHandler(deps);
    const req = mockRequest({ body: { url: 'https://127.0.0.1/owner/repo' } });
    const res = mockResponse();

    await handler.preview(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Private or loopback hosts are not allowed' });
  });

  it('rejects non-https schemes', async () => {
    const deps = mockDeps();
    const handler = createGitImportHandler(deps);
    const req = mockRequest({ body: { url: 'http://github.com/owner/repo' } });
    const res = mockResponse();

    await handler.preview(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Only https:// URLs are allowed' });
  });

  it('returns the preview on success', async () => {
    mockedResolve.mockReturnValue({ ok: true, resolved: baseResolved });
    mockedFetch.mockResolvedValue(basePreview);
    const deps = mockDeps();
    const handler = createGitImportHandler(deps);
    const req = mockRequest();
    const res = mockResponse();

    await handler.preview(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(basePreview);
  });

  it('returns 502 when the upstream fetch throws', async () => {
    mockedResolve.mockReturnValue({ ok: true, resolved: baseResolved });
    mockedFetch.mockRejectedValue(new Error('GitHub API 403: rate limit'));
    const deps = mockDeps();
    const handler = createGitImportHandler(deps);
    const req = mockRequest();
    const res = mockResponse();

    await handler.preview(req, res);

    expect(res.statusCode).toBe(502);
    expect(res.body).toEqual({
      error: 'Failed to fetch from upstream: GitHub API 403: rate limit',
    });
  });
});

describe('createGitImportHandler.save', () => {
  it('rejects when URL is invalid', async () => {
    const deps = mockDeps();
    const handler = createGitImportHandler(deps);
    const req = mockRequest({ body: { url: 'ftp://example.com/repo' } });
    const res = mockResponse();

    await handler.save(req, res);

    expect(res.statusCode).toBe(400);
    expect(deps.createSkill).not.toHaveBeenCalled();
  });

  it('rejects when no SKILL.md is found at the resolved path', async () => {
    mockedResolve.mockReturnValue({ ok: true, resolved: baseResolved });
    mockedFetch.mockResolvedValue({ ...basePreview, skillMd: '' });
    const deps = mockDeps();
    const handler = createGitImportHandler(deps);
    const req = mockRequest();
    const res = mockResponse();

    await handler.save(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: 'No SKILL.md found at github:/',
    });
    expect(deps.createSkill).not.toHaveBeenCalled();
  });

  it('creates the skill and grants ownership on success', async () => {
    mockedResolve.mockReturnValue({ ok: true, resolved: baseResolved });
    mockedFetch.mockResolvedValue(basePreview);
    const deps = mockDeps();
    const handler = createGitImportHandler(deps);
    const req = mockRequest();
    const res = mockResponse();

    await handler.save(req, res);

    expect(deps.createSkill).toHaveBeenCalledTimes(1);
    const createCall = (deps.createSkill as jest.Mock).mock.calls[0][0];
    expect(createCall.name).toBe('my-skill');
    expect(createCall.description).toBe('Imported skill');
    expect(createCall.alwaysApply).toBe(true);

    expect(deps.grantPermission).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toBe(201);
    expect((res.body as { source: { url: string } }).source.url).toBe(
      'https://github.com/owner/repo',
    );
  });

  it('uses the user-supplied name when provided (slugified)', async () => {
    mockedResolve.mockReturnValue({ ok: true, resolved: baseResolved });
    mockedFetch.mockResolvedValue(basePreview);
    const deps = mockDeps();
    const handler = createGitImportHandler(deps);
    const req = mockRequest({ body: { url: 'https://github.com/owner/repo', name: 'Camel Case!!' } });
    const res = mockResponse();

    await handler.save(req, res);

    const createCall = (deps.createSkill as jest.Mock).mock.calls[0][0];
    expect(createCall.name).toBe('camel-case');
  });

  it('uses the frontmatter description as the description when name is absent', async () => {
    mockedResolve.mockReturnValue({ ok: true, resolved: baseResolved });
    mockedFetch.mockResolvedValue({
      ...basePreview,
      skillMd: '---\ndescription: Frontmatter-only\n---\n\nBody',
    });
    const deps = mockDeps();
    const handler = createGitImportHandler(deps);
    const req = mockRequest();
    const res = mockResponse();

    // Without a name in frontmatter (and no explicit `name` argument),
    // the handler currently rejects the request. This test pins that
    // contract — relaxing it would require extending the slug strategy
    // to derive a name from the repository identifier.
    await handler.save(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: 'Could not determine skill name from frontmatter',
    });
    expect(deps.createSkill).not.toHaveBeenCalled();
  });

  it('returns 409 on duplicate skill name', async () => {
    mockedResolve.mockReturnValue({ ok: true, resolved: baseResolved });
    mockedFetch.mockResolvedValue(basePreview);
    const deps = mockDeps();
    (deps.createSkill as jest.Mock).mockRejectedValue({ code: 11000 });
    const handler = createGitImportHandler(deps);
    const req = mockRequest();
    const res = mockResponse();

    await handler.save(req, res);

    expect(res.statusCode).toBe(409);
    expect(res.body).toEqual({ error: 'A skill with this name already exists' });
  });

  it('rolls back the skill if granting ownership fails', async () => {
    mockedResolve.mockReturnValue({ ok: true, resolved: baseResolved });
    mockedFetch.mockResolvedValue(basePreview);
    const deps = mockDeps();
    (deps.grantPermission as jest.Mock).mockRejectedValue(new Error('perm denied'));
    const handler = createGitImportHandler(deps);
    const req = mockRequest();
    const res = mockResponse();

    await handler.save(req, res);

    expect(res.statusCode).toBe(500);
    expect(deps.deleteSkill).toHaveBeenCalled();
  });
});