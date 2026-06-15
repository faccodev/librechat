const fs = require('fs');
const os = require('os');
const path = require('path');

jest.mock('@librechat/data-schemas', () => ({
  logger: { warn: jest.fn(), error: jest.fn(), info: jest.fn(), debug: jest.fn() },
}));

const { scanWorkspaceFiles } = require('./scanWorkspace');

describe('scanWorkspaceFiles', () => {
  let workRoot;

  beforeAll(async () => {
    workRoot = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'librechat-scan-'));
  });

  afterAll(async () => {
    await fs.promises.rm(workRoot, { recursive: true, force: true });
  });

  beforeEach(async () => {
    await fs.promises.rm(workRoot, { recursive: true, force: true });
    await fs.promises.mkdir(workRoot, { recursive: true });
  });

  it('returns an empty result for a non-existent workspace path', async () => {
    const result = await scanWorkspaceFiles({
      workspacePath: path.join(workRoot, 'does-not-exist'),
    });
    expect(result.entries).toEqual([]);
    expect(result.truncated).toBe(false);
    expect(result.timedOut).toBe(false);
    expect(result.scannedDirs).toBe(0);
  });

  it('returns an empty result when workspacePath is falsy', async () => {
    const result = await scanWorkspaceFiles({ workspacePath: '' });
    expect(result.entries).toEqual([]);
    expect(result.scannedDirs).toBe(0);
  });

  it('collects files at multiple depths with workspace-relative POSIX paths', async () => {
    await fs.promises.writeFile(path.join(workRoot, 'a.txt'), 'a');
    await fs.promises.mkdir(path.join(workRoot, 'sub'), { recursive: true });
    await fs.promises.writeFile(path.join(workRoot, 'sub', 'b.txt'), 'b');
    await fs.promises.mkdir(path.join(workRoot, 'sub', 'deep'), { recursive: true });
    await fs.promises.writeFile(path.join(workRoot, 'sub', 'deep', 'c.txt'), 'c');

    const result = await scanWorkspaceFiles({ workspacePath: workRoot });

    const names = result.entries.map((e) => e.name).sort();
    expect(names).toEqual(['a.txt', 'b.txt', 'c.txt']);
    const c = result.entries.find((e) => e.name === 'c.txt');
    expect(c.relativePath).toBe('sub/deep/c.txt');
    expect(result.truncated).toBe(false);
    expect(result.timedOut).toBe(false);
  });

  it('skips node_modules, .git, and other heavy build dirs', async () => {
    await fs.promises.writeFile(path.join(workRoot, 'kept.txt'), 'keep');
    await fs.promises.mkdir(path.join(workRoot, 'node_modules', 'lodash'), { recursive: true });
    await fs.promises.writeFile(
      path.join(workRoot, 'node_modules', 'lodash', 'index.js'),
      'module.exports = {};',
    );
    await fs.promises.mkdir(path.join(workRoot, '.git', 'objects'), { recursive: true });
    await fs.promises.writeFile(path.join(workRoot, '.git', 'objects', 'abc'), 'blob');
    await fs.promises.mkdir(path.join(workRoot, 'dist'), { recursive: true });
    await fs.promises.writeFile(path.join(workRoot, 'dist', 'bundle.js'), 'minified');
    await fs.promises.mkdir(path.join(workRoot, '.hidden-dir'), { recursive: true });
    await fs.promises.writeFile(path.join(workRoot, '.hidden-dir', 'secret.txt'), 'no');

    const result = await scanWorkspaceFiles({ workspacePath: workRoot });

    const paths = result.entries.map((e) => e.relativePath);
    expect(paths).toEqual(['kept.txt']);
  });

  it('truncates at maxEntries without ever going over the cap', async () => {
    for (let i = 0; i < 25; i += 1) {
      await fs.promises.writeFile(
        path.join(workRoot, `f-${i.toString().padStart(2, '0')}.txt`),
        'x',
      );
    }

    const result = await scanWorkspaceFiles({
      workspacePath: workRoot,
      maxEntries: 10,
    });

    expect(result.entries.length).toBe(10);
    expect(result.truncated).toBe(true);
    expect(result.timedOut).toBe(false);
  });

  it('respects maxDepth and does not descend past it', async () => {
    await fs.promises.mkdir(path.join(workRoot, 'd1', 'd2', 'd3'), { recursive: true });
    await fs.promises.writeFile(path.join(workRoot, 'd1', 'd2', 'd3', 'leaf.txt'), 'l');
    await fs.promises.writeFile(path.join(workRoot, 'd1', 'shallow.txt'), 's');

    const result = await scanWorkspaceFiles({
      workspacePath: workRoot,
      maxDepth: 2,
    });

    const names = result.entries.map((e) => e.name).sort();
    expect(names).toEqual(['shallow.txt']);
  });

  it('honors timeoutMs and returns whatever was collected up to the deadline', async () => {
    // Build a tree with enough files + depth that the scan cannot
    // finish in 1ms on any reasonable host.
    for (let i = 0; i < 500; i += 1) {
      await fs.promises.writeFile(
        path.join(workRoot, `file-${i.toString().padStart(3, '0')}.txt`),
        'x',
      );
    }

    const result = await scanWorkspaceFiles({
      workspacePath: workRoot,
      timeoutMs: 1,
      maxEntries: 10_000,
      maxDepth: 16,
    });

    expect(result.timedOut).toBe(true);
    // truncated stays false because we ran out of time, not of slots
    expect(result.truncated).toBe(false);
  });

  it('returns POSIX-style relative paths even on Windows', async () => {
    const sub = path.join(workRoot, 'sub');
    await fs.promises.mkdir(sub, { recursive: true });
    await fs.promises.writeFile(path.join(sub, 'note.md'), 'hi');

    const result = await scanWorkspaceFiles({ workspacePath: workRoot });
    const entry = result.entries[0];
    expect(entry.relativePath).toBe('sub/note.md');
    expect(entry.relativePath).not.toContain('\\');
  });
});
