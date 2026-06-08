const express = require('express');
const fs = require('fs');
const os = require('os');
const path = require('path');
const request = require('supertest');

jest.mock('~/config', () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
  },
}));

const router = require('./workspace');

const buildApp = ({ user, appConfig }) => {
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    req.user = user;
    req.config = appConfig;
    next();
  });
  app.use('/files/workspace', router);
  return app;
};

describe('GET /files/workspace/tree', () => {
  let workRoot;
  let user;

  beforeEach(async () => {
    workRoot = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'librechat-ws-route-'));
    user = { id: 'user-1', workspaceSubdir: null };
  });

  afterEach(async () => {
    await fs.promises.rm(workRoot, { recursive: true, force: true });
  });

  it('returns the workspace root listing', async () => {
    await fs.promises.writeFile(path.join(workRoot, 'a.txt'), 'a');
    await fs.promises.mkdir(path.join(workRoot, 'docs'));
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app).get('/files/workspace/tree');
    expect(res.status).toBe(200);
    expect(res.body.path).toBe('');
    expect(res.body.workspacePath).toBe(workRoot);
    expect(res.body.nodes.map((n) => n.name)).toEqual(['docs', 'a.txt']);
    expect(res.body.nodes[0]).toMatchObject({ type: 'dir', childCount: 0 });
    expect(res.body.nodes[1]).toMatchObject({ type: 'file', size: 1 });
  });

  it('lists a subdirectory', async () => {
    const sub = path.join(workRoot, 'sub');
    await fs.promises.mkdir(sub);
    await fs.promises.writeFile(path.join(sub, 'readme.md'), 'hi');
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app).get('/files/workspace/tree?path=sub');
    expect(res.status).toBe(200);
    expect(res.body.nodes).toHaveLength(1);
    expect(res.body.nodes[0]).toMatchObject({ name: 'readme.md', path: 'sub/readme.md' });
  });

  it('returns 400 on path traversal', async () => {
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app).get('/files/workspace/tree?path=../etc');
    expect(res.status).toBe(400);
  });

  it('returns 404 when workspaces are disabled', async () => {
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: false, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app).get('/files/workspace/tree');
    expect(res.status).toBe(404);
  });

  it('returns 404 for a missing path', async () => {
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app).get('/files/workspace/tree?path=does-not-exist');
    expect(res.status).toBe(404);
  });
});

describe('GET /files/workspace/search', () => {
  let workRoot;
  let user;

  beforeEach(async () => {
    workRoot = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'librechat-ws-search-'));
    user = { id: 'user-1', workspaceSubdir: null };
  });

  afterEach(async () => {
    await fs.promises.rm(workRoot, { recursive: true, force: true });
  });

  it('returns matching files and folders', async () => {
    await fs.promises.writeFile(path.join(workRoot, 'notes.md'), 'x');
    await fs.promises.mkdir(path.join(workRoot, 'notes-dir'));
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app).get('/files/workspace/search?q=notes');
    expect(res.status).toBe(200);
    expect(res.body.query).toBe('notes');
    const names = res.body.matches.map((m) => m.name);
    expect(names).toEqual(expect.arrayContaining(['notes.md', 'notes-dir']));
  });

  it('returns empty result for an empty query', async () => {
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app).get('/files/workspace/search?q=');
    expect(res.status).toBe(200);
    expect(res.body.matches).toEqual([]);
    expect(res.body.total).toBe(0);
  });
});

describe('GET /files/workspace/raw', () => {
  let workRoot;
  let user;

  beforeEach(async () => {
    workRoot = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'librechat-ws-raw-'));
    user = { id: 'user-1', workspaceSubdir: null };
  });

  afterEach(async () => {
    await fs.promises.rm(workRoot, { recursive: true, force: true });
  });

  it('streams a file with Content-Type and Content-Disposition: inline', async () => {
    await fs.promises.writeFile(path.join(workRoot, 'note.txt'), 'hello world');
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app).get('/files/workspace/raw?path=note.txt');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(res.headers['content-disposition']).toMatch(/^inline;/);
    expect(res.headers['content-length']).toBe('11');
    expect(res.text).toBe('hello world');
  });

  it('forces attachment when ?download=true', async () => {
    await fs.promises.writeFile(path.join(workRoot, 'note.txt'), 'hi');
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app).get('/files/workspace/raw?path=note.txt&download=true');
    expect(res.status).toBe(200);
    expect(res.headers['content-disposition']).toMatch(/^attachment;/);
    expect(res.headers['content-disposition']).toMatch(/note\.txt/);
  });

  it('returns 400 when path is missing', async () => {
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app).get('/files/workspace/raw');
    expect(res.status).toBe(400);
  });

  it('returns 400 on path traversal', async () => {
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app).get('/files/workspace/raw?path=../etc/passwd');
    expect(res.status).toBe(400);
  });

  it('returns 404 for a missing file', async () => {
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app).get('/files/workspace/raw?path=missing.txt');
    expect(res.status).toBe(404);
  });

  it('returns 400 when target is a directory', async () => {
    await fs.promises.mkdir(path.join(workRoot, 'sub'));
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app).get('/files/workspace/raw?path=sub');
    expect(res.status).toBe(400);
  });

  it('returns 404 when workspaces are disabled', async () => {
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: false, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app).get('/files/workspace/raw?path=note.txt');
    expect(res.status).toBe(404);
  });
});

describe('CRUD: POST /files/workspace/mkdir', () => {
  let workRoot;
  let user;
  beforeEach(async () => {
    workRoot = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'librechat-ws-mkdir-'));
    user = { id: 'user-1', workspaceSubdir: null };
  });
  afterEach(async () => {
    await fs.promises.rm(workRoot, { recursive: true, force: true });
  });

  it('creates a directory', async () => {
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app)
      .post('/files/workspace/mkdir')
      .send({ parentPath: '', name: 'new-folder' });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('new-folder');
    expect(res.body.type).toBe('dir');
    const stat = await fs.promises.stat(path.join(workRoot, 'new-folder'));
    expect(stat.isDirectory()).toBe(true);
  });

  it('rejects invalid names', async () => {
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app)
      .post('/files/workspace/mkdir')
      .send({ parentPath: '', name: '../escape' });
    expect(res.status).toBe(400);
  });
});

describe('CRUD: POST /files/workspace/create', () => {
  let workRoot;
  let user;
  beforeEach(async () => {
    workRoot = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'librechat-ws-create-'));
    user = { id: 'user-1', workspaceSubdir: null };
  });
  afterEach(async () => {
    await fs.promises.rm(workRoot, { recursive: true, force: true });
  });

  it('creates an empty file by default', async () => {
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app)
      .post('/files/workspace/create')
      .send({ parentPath: '', name: 'note.txt' });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('note.txt');
    expect(res.body.size).toBe(0);
    const content = await fs.promises.readFile(path.join(workRoot, 'note.txt'), 'utf8');
    expect(content).toBe('');
  });

  it('seeds content when provided', async () => {
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app)
      .post('/files/workspace/create')
      .send({ parentPath: '', name: 'README.md', content: '# hi' });
    expect(res.status).toBe(201);
    expect(res.body.size).toBe(4);
    const content = await fs.promises.readFile(path.join(workRoot, 'README.md'), 'utf8');
    expect(content).toBe('# hi');
  });

  it('returns 409 on collision', async () => {
    await fs.promises.writeFile(path.join(workRoot, 'dup.txt'), 'x');
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app)
      .post('/files/workspace/create')
      .send({ parentPath: '', name: 'dup.txt' });
    expect(res.status).toBe(409);
  });
});

describe('CRUD: PUT /files/workspace/content', () => {
  let workRoot;
  let user;
  beforeEach(async () => {
    workRoot = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'librechat-ws-write-'));
    user = { id: 'user-1', workspaceSubdir: null };
  });
  afterEach(async () => {
    await fs.promises.rm(workRoot, { recursive: true, force: true });
  });

  it('overwrites the content of an existing file', async () => {
    await fs.promises.writeFile(path.join(workRoot, 'target.txt'), 'old');
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app)
      .put('/files/workspace/content')
      .send({ path: 'target.txt', content: 'new' });
    expect(res.status).toBe(200);
    const content = await fs.promises.readFile(path.join(workRoot, 'target.txt'), 'utf8');
    expect(content).toBe('new');
  });

  it('returns 404 for a missing file', async () => {
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app)
      .put('/files/workspace/content')
      .send({ path: 'missing.txt', content: 'x' });
    expect(res.status).toBe(404);
  });
});

describe('CRUD: PATCH /files/workspace/rename', () => {
  let workRoot;
  let user;
  beforeEach(async () => {
    workRoot = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'librechat-ws-rename-'));
    user = { id: 'user-1', workspaceSubdir: null };
  });
  afterEach(async () => {
    await fs.promises.rm(workRoot, { recursive: true, force: true });
  });

  it('renames a file', async () => {
    await fs.promises.writeFile(path.join(workRoot, 'a.txt'), 'x');
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app)
      .patch('/files/workspace/rename')
      .send({ path: 'a.txt', newName: 'b.txt' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('b.txt');
    await expect(fs.promises.stat(path.join(workRoot, 'b.txt'))).resolves.toBeDefined();
    await expect(fs.promises.stat(path.join(workRoot, 'a.txt'))).rejects.toMatchObject({
      code: 'ENOENT',
    });
  });

  it('rejects when name already exists', async () => {
    await fs.promises.writeFile(path.join(workRoot, 'a.txt'), 'x');
    await fs.promises.writeFile(path.join(workRoot, 'b.txt'), 'x');
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app)
      .patch('/files/workspace/rename')
      .send({ path: 'a.txt', newName: 'b.txt' });
    expect(res.status).toBe(409);
  });
});

describe('CRUD: PATCH /files/workspace/move', () => {
  let workRoot;
  let user;
  beforeEach(async () => {
    workRoot = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'librechat-ws-move-'));
    user = { id: 'user-1', workspaceSubdir: null };
  });
  afterEach(async () => {
    await fs.promises.rm(workRoot, { recursive: true, force: true });
  });

  it('moves a file into a subdirectory', async () => {
    const sub = path.join(workRoot, 'sub');
    await fs.promises.mkdir(sub);
    await fs.promises.writeFile(path.join(workRoot, 'm.txt'), 'x');
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app)
      .patch('/files/workspace/move')
      .send({ from: 'm.txt', toParent: 'sub' });
    expect(res.status).toBe(200);
    expect(res.body.path).toBe('sub/m.txt');
  });
});

describe('CRUD: DELETE /files/workspace', () => {
  let workRoot;
  let user;
  beforeEach(async () => {
    workRoot = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'librechat-ws-del-'));
    user = { id: 'user-1', workspaceSubdir: null };
  });
  afterEach(async () => {
    await fs.promises.rm(workRoot, { recursive: true, force: true });
  });

  it('deletes a file', async () => {
    await fs.promises.writeFile(path.join(workRoot, 'doomed.txt'), 'x');
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app)
      .delete('/files/workspace')
      .send({ paths: ['doomed.txt'] });
    expect(res.status).toBe(200);
    expect(res.body.deleted).toEqual(['doomed.txt']);
    expect(res.body.failed).toEqual([]);
  });

  it('reports per-path failure for missing entries', async () => {
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app)
      .delete('/files/workspace')
      .send({ paths: ['missing.txt'] });
    expect(res.status).toBe(200);
    expect(res.body.deleted).toEqual([]);
    expect(res.body.failed).toHaveLength(1);
  });

  it('rejects an empty paths array', async () => {
    const app = buildApp({
      user,
      appConfig: { workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 2048 } },
    });
    const res = await request(app)
      .delete('/files/workspace')
      .send({ paths: [] });
    expect(res.status).toBe(400);
  });
});
