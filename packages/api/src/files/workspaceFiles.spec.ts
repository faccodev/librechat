import fs from 'fs';
import os from 'os';
import path from 'path';
import {
  listWorkspaceTree,
  searchWorkspaceTree,
  scanWorkspaceFiles,
  createWorkspaceDirectory,
  createWorkspaceFile,
  writeWorkspaceFile,
  writeWorkspaceContent,
  renameWorkspaceNode,
  moveWorkspaceNode,
  deleteWorkspaceNodes,
  sanitizeEntryName,
} from './workspaceFiles';
import type { TCustomConfig } from 'librechat-data-provider';

const makeAppConfig = (containerBasePath: string): TCustomConfig =>
  ({
    workspaces: { enabled: true, containerBasePath, sizeLimitMB: 2048 },
  }) as TCustomConfig;

const makeUser = (subdir: string | null) => ({ workspaceSubdir: subdir });

describe('workspaceFiles', () => {
  let workRoot: string;

  beforeAll(async () => {
    workRoot = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'librechat-ws-files-'));
  });

  afterAll(async () => {
    await fs.promises.rm(workRoot, { recursive: true, force: true });
  });

  beforeEach(async () => {
    await fs.promises.rm(workRoot, { recursive: true, force: true });
    await fs.promises.mkdir(workRoot, { recursive: true });
  });

  describe('listWorkspaceTree', () => {
    test('returns sorted entries for the workspace root', async () => {
      await fs.promises.writeFile(path.join(workRoot, 'zeta.txt'), 'z');
      await fs.promises.mkdir(path.join(workRoot, 'Alpha'));
      await fs.promises.writeFile(path.join(workRoot, 'beta.txt'), 'b');

      const result = await listWorkspaceTree({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
      });

      expect(result.path).toBe('');
      expect(result.workspacePath).toBe(workRoot);
      expect(result.nodes.map((n) => n.name)).toEqual(['Alpha', 'beta.txt', 'zeta.txt']);
      expect(result.nodes[0].type).toBe('dir');
      expect(result.nodes[1].type).toBe('file');
      expect(result.nodes[1].size).toBe(1);
      expect(result.truncated).toBe(false);
    });

    test('lists a subdirectory with workspace-relative paths', async () => {
      const sub = path.join(workRoot, 'docs');
      await fs.promises.mkdir(sub);
      await fs.promises.writeFile(path.join(sub, 'readme.md'), 'hello');

      const result = await listWorkspaceTree({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        relPath: 'docs',
      });

      expect(result.path).toBe('docs');
      expect(result.nodes).toHaveLength(1);
      expect(result.nodes[0]).toMatchObject({
        name: 'readme.md',
        path: 'docs/readme.md',
        type: 'file',
        size: 5,
      });
    });

    test('skips hidden entries', async () => {
      await fs.promises.mkdir(path.join(workRoot, '.git'));
      await fs.promises.writeFile(path.join(workRoot, '.env'), 'secret');
      await fs.promises.writeFile(path.join(workRoot, 'visible.txt'), 'ok');

      const result = await listWorkspaceTree({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
      });

      expect(result.nodes.map((n) => n.name)).toEqual(['visible.txt']);
    });

    test('rejects path traversal', async () => {
      await expect(
        listWorkspaceTree({
          appConfig: makeAppConfig(workRoot),
          user: makeUser(null),
          relPath: '../etc/passwd',
        }),
      ).rejects.toMatchObject({ status: 400 });
    });

    test('returns 404 when workspace is missing', async () => {
      await expect(
        listWorkspaceTree({
          appConfig: makeAppConfig(workRoot),
          user: makeUser(null),
          relPath: 'does-not-exist',
        }),
      ).rejects.toMatchObject({ status: 404 });
    });

    test('throws 404 when workspaces are disabled', async () => {
      await expect(
        listWorkspaceTree({
          appConfig: { workspaces: { enabled: false, containerBasePath: workRoot } } as TCustomConfig,
          user: makeUser(null),
        }),
      ).rejects.toMatchObject({ status: 404 });
    });

    test('marks truncated when entries exceed maxEntries', async () => {
      for (let i = 0; i < 5; i += 1) {
        await fs.promises.writeFile(path.join(workRoot, `f${i}.txt`), 'x');
      }
      const result = await listWorkspaceTree({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        maxEntries: 2,
      });
      expect(result.nodes).toHaveLength(2);
      expect(result.truncated).toBe(true);
    });

    test('scopes to a user-specific subdir under the container base', async () => {
      const alice = path.join(workRoot, 'alice');
      const bob = path.join(workRoot, 'bob');
      await fs.promises.mkdir(alice);
      await fs.promises.mkdir(bob);
      await fs.promises.writeFile(path.join(alice, 'note.txt'), 'a');
      await fs.promises.writeFile(path.join(bob, 'note.txt'), 'b');

      const aliceResult = await listWorkspaceTree({
        appConfig: makeAppConfig(workRoot),
        user: makeUser('alice'),
      });
      const bobResult = await listWorkspaceTree({
        appConfig: makeAppConfig(workRoot),
        user: makeUser('bob'),
      });

      expect(aliceResult.workspacePath).toBe(alice);
      expect(bobResult.workspacePath).toBe(bob);
      expect(aliceResult.nodes[0].path).toBe('note.txt');
      expect(bobResult.nodes[0].path).toBe('note.txt');
    });
  });

  describe('searchWorkspaceTree', () => {
    test('matches file and folder names recursively', async () => {
      const docs = path.join(workRoot, 'docs');
      const notes = path.join(workRoot, 'notes');
      await fs.promises.mkdir(docs);
      await fs.promises.mkdir(notes);
      await fs.promises.writeFile(path.join(docs, 'report.pdf'), 'x');
      await fs.promises.writeFile(path.join(notes, 'meeting-notes.md'), 'y');
      await fs.promises.writeFile(path.join(workRoot, 'unrelated.txt'), 'z');

      const result = await searchWorkspaceTree({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        query: 'note',
      });

      const names = result.matches.map((m) => m.name);
      expect(names).toEqual(
        expect.arrayContaining(['meeting-notes.md', 'notes']),
      );
      expect(names).not.toContain('unrelated.txt');
      expect(result.truncated).toBe(false);
    });

    test('is case-insensitive', async () => {
      await fs.promises.writeFile(path.join(workRoot, 'README.MD'), 'x');
      const result = await searchWorkspaceTree({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        query: 'readme',
      });
      expect(result.matches.map((m) => m.name)).toEqual(['README.MD']);
    });

    test('returns empty result for empty query', async () => {
      const result = await searchWorkspaceTree({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        query: '   ',
      });
      expect(result.matches).toEqual([]);
      expect(result.total).toBe(0);
    });

    test('honors maxResults and reports truncated', async () => {
      for (let i = 0; i < 6; i += 1) {
        await fs.promises.writeFile(path.join(workRoot, `match-${i}.txt`), 'x');
      }
      const result = await searchWorkspaceTree({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        query: 'match',
        maxResults: 3,
      });
      expect(result.matches).toHaveLength(3);
      expect(result.truncated).toBe(true);
    });

    test('ignores hidden entries during search', async () => {
      await fs.promises.writeFile(path.join(workRoot, '.secret-match.txt'), 'x');
      await fs.promises.writeFile(path.join(workRoot, 'public-match.txt'), 'x');
      const result = await searchWorkspaceTree({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        query: 'match',
      });
      expect(result.matches.map((m) => m.name)).toEqual(['public-match.txt']);
    });
  });

  describe('sanitizeEntryName', () => {
    test('accepts normal names', () => {
      expect(sanitizeEntryName('hello.txt')).toBe('hello.txt');
      expect(sanitizeEntryName('  spaced  ')).toBe('spaced');
      expect(sanitizeEntryName('with-dash_and.dots')).toBe('with-dash_and.dots');
    });

    test('rejects path separators and traversal', () => {
      expect(() => sanitizeEntryName('a/b')).toThrow();
      expect(() => sanitizeEntryName('a\\b')).toThrow();
      expect(() => sanitizeEntryName('..')).toThrow();
      expect(() => sanitizeEntryName('.')).toThrow();
    });

    test('rejects hidden and invalid characters', () => {
      expect(() => sanitizeEntryName('.hidden')).toThrow();
      expect(() => sanitizeEntryName('a$b')).toThrow();
      expect(() => sanitizeEntryName('a;b')).toThrow();
      expect(() => sanitizeEntryName('')).toThrow();
    });
  });

  describe('createWorkspaceDirectory', () => {
    test('creates a directory and returns its node', async () => {
      const result = await createWorkspaceDirectory({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        parentPath: '',
        name: 'new-folder',
      });
      expect(result.name).toBe('new-folder');
      expect(result.type).toBe('dir');
      const exists = await fs.promises.stat(path.join(workRoot, 'new-folder'));
      expect(exists.isDirectory()).toBe(true);
    });

    test('returns 409 when name already exists', async () => {
      await fs.promises.mkdir(path.join(workRoot, 'dup'));
      await expect(
        createWorkspaceDirectory({
          appConfig: makeAppConfig(workRoot),
          user: makeUser(null),
          parentPath: '',
          name: 'dup',
        }),
      ).rejects.toMatchObject({ status: 409 });
    });

    test('returns 400 on invalid name', async () => {
      await expect(
        createWorkspaceDirectory({
          appConfig: makeAppConfig(workRoot),
          user: makeUser(null),
          parentPath: '',
          name: '../escape',
        }),
      ).rejects.toMatchObject({ status: 400 });
    });

    test('returns 404 when parent does not exist', async () => {
      await expect(
        createWorkspaceDirectory({
          appConfig: makeAppConfig(workRoot),
          user: makeUser(null),
          parentPath: 'missing',
          name: 'child',
        }),
      ).rejects.toMatchObject({ status: 404 });
    });
  });

  describe('writeWorkspaceFile', () => {
    test('moves a temp file into the workspace', async () => {
      const tempPath = path.join(workRoot, '..', `upload-${Date.now()}.bin`);
      await fs.promises.writeFile(tempPath, 'hello');
      const result = await writeWorkspaceFile({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        parentPath: '',
        originalName: 'greeting.txt',
        tempPath,
        size: 5,
      });
      expect(result.name).toBe('greeting.txt');
      expect(result.size).toBe(5);
      const exists = await fs.promises.stat(path.join(workRoot, 'greeting.txt'));
      expect(exists.isFile()).toBe(true);
      // temp file should be moved (not copied)
      await expect(fs.promises.stat(tempPath)).rejects.toMatchObject({ code: 'ENOENT' });
    });

    test('rejects files larger than the workspace size limit', async () => {
      const tempPath = path.join(workRoot, '..', `big-${Date.now()}.bin`);
      await fs.promises.writeFile(tempPath, 'x');
      const config = {
        workspaces: { enabled: true, containerBasePath: workRoot, sizeLimitMB: 0 },
      } as TCustomConfig;
      await expect(
        writeWorkspaceFile({
          appConfig: config,
          user: makeUser(null),
          parentPath: '',
          originalName: 'big.bin',
          tempPath,
          size: 1,
        }),
      ).rejects.toMatchObject({ status: 413 });
      // temp should be cleaned up on rejection
      await expect(fs.promises.stat(tempPath)).rejects.toMatchObject({ code: 'ENOENT' });
    });

    test('returns 409 when destination already exists', async () => {
      await fs.promises.writeFile(path.join(workRoot, 'collision.txt'), 'old');
      const tempPath = path.join(workRoot, '..', `cl-${Date.now()}.bin`);
      await fs.promises.writeFile(tempPath, 'new');
      await expect(
        writeWorkspaceFile({
          appConfig: makeAppConfig(workRoot),
          user: makeUser(null),
          parentPath: '',
          originalName: 'collision.txt',
          tempPath,
          size: 3,
        }),
      ).rejects.toMatchObject({ status: 409 });
    });
  });

  describe('renameWorkspaceNode', () => {
    test('renames a file', async () => {
      await fs.promises.writeFile(path.join(workRoot, 'old.txt'), 'x');
      const result = await renameWorkspaceNode({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        relPath: 'old.txt',
        newName: 'new.txt',
      });
      expect(result.name).toBe('new.txt');
      expect(result.path).toBe('new.txt');
      const exists = await fs.promises.stat(path.join(workRoot, 'new.txt'));
      expect(exists.isFile()).toBe(true);
    });

    test('returns 404 for missing path', async () => {
      await expect(
        renameWorkspaceNode({
          appConfig: makeAppConfig(workRoot),
          user: makeUser(null),
          relPath: 'missing.txt',
          newName: 'whatever.txt',
        }),
      ).rejects.toMatchObject({ status: 404 });
    });

    test('returns 409 when target name is taken', async () => {
      await fs.promises.writeFile(path.join(workRoot, 'a.txt'), 'x');
      await fs.promises.writeFile(path.join(workRoot, 'b.txt'), 'x');
      await expect(
        renameWorkspaceNode({
          appConfig: makeAppConfig(workRoot),
          user: makeUser(null),
          relPath: 'a.txt',
          newName: 'b.txt',
        }),
      ).rejects.toMatchObject({ status: 409 });
    });
  });

  describe('moveWorkspaceNode', () => {
    test('moves a file into a subdirectory', async () => {
      const sub = path.join(workRoot, 'sub');
      await fs.promises.mkdir(sub);
      await fs.promises.writeFile(path.join(workRoot, 'm.txt'), 'x');
      const result = await moveWorkspaceNode({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        fromPath: 'm.txt',
        toParentPath: 'sub',
      });
      expect(result.path).toBe('sub/m.txt');
      const exists = await fs.promises.stat(path.join(sub, 'm.txt'));
      expect(exists.isFile()).toBe(true);
    });

    test('refuses to move a folder into itself', async () => {
      const a = path.join(workRoot, 'a');
      await fs.promises.mkdir(a);
      const b = path.join(a, 'b');
      await fs.promises.mkdir(b);
      await expect(
        moveWorkspaceNode({
          appConfig: makeAppConfig(workRoot),
          user: makeUser(null),
          fromPath: 'a',
          toParentPath: 'a/b',
        }),
      ).rejects.toMatchObject({ status: 400 });
    });
  });

  describe('deleteWorkspaceNodes', () => {
    test('deletes a single file', async () => {
      await fs.promises.writeFile(path.join(workRoot, 'doomed.txt'), 'x');
      const result = await deleteWorkspaceNodes({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        paths: ['doomed.txt'],
      });
      expect(result.deleted).toEqual(['doomed.txt']);
      expect(result.failed).toEqual([]);
      await expect(fs.promises.stat(path.join(workRoot, 'doomed.txt'))).rejects.toMatchObject({
        code: 'ENOENT',
      });
    });

    test('deletes a folder recursively', async () => {
      const d = path.join(workRoot, 'd');
      await fs.promises.mkdir(d);
      await fs.promises.writeFile(path.join(d, 'inner.txt'), 'x');
      const result = await deleteWorkspaceNodes({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        paths: ['d'],
      });
      expect(result.deleted).toEqual(['d']);
      await expect(fs.promises.stat(d)).rejects.toMatchObject({ code: 'ENOENT' });
    });

    test('reports per-path failure for missing entries without aborting the batch', async () => {
      await fs.promises.writeFile(path.join(workRoot, 'real.txt'), 'x');
      const result = await deleteWorkspaceNodes({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        paths: ['real.txt', 'missing.txt'],
      });
      expect(result.deleted).toEqual(['real.txt']);
      expect(result.failed).toHaveLength(1);
      expect(result.failed[0].path).toBe('missing.txt');
    });
  });

  describe('createWorkspaceFile', () => {
    test('creates an empty file by default', async () => {
      const result = await createWorkspaceFile({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        parentPath: '',
        name: 'note.txt',
      });
      expect(result.name).toBe('note.txt');
      expect(result.type).toBe('file');
      expect(result.size).toBe(0);
      const content = await fs.promises.readFile(path.join(workRoot, 'note.txt'), 'utf8');
      expect(content).toBe('');
    });

    test('seeds the file with content when provided', async () => {
      const result = await createWorkspaceFile({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        parentPath: '',
        name: 'README.md',
        content: '# hello',
      });
      expect(result.size).toBe(7);
      const content = await fs.promises.readFile(path.join(workRoot, 'README.md'), 'utf8');
      expect(content).toBe('# hello');
    });

    test('returns 409 when name already exists', async () => {
      await fs.promises.writeFile(path.join(workRoot, 'collision.txt'), 'x');
      await expect(
        createWorkspaceFile({
          appConfig: makeAppConfig(workRoot),
          user: makeUser(null),
          parentPath: '',
          name: 'collision.txt',
        }),
      ).rejects.toMatchObject({ status: 409 });
    });

    test('rejects path-separator in name', async () => {
      await expect(
        createWorkspaceFile({
          appConfig: makeAppConfig(workRoot),
          user: makeUser(null),
          parentPath: '',
          name: 'a/b',
        }),
      ).rejects.toMatchObject({ status: 400 });
    });
  });

  describe('writeWorkspaceContent', () => {
    test('overwrites an existing file', async () => {
      await fs.promises.writeFile(path.join(workRoot, 'target.txt'), 'old');
      const result = await writeWorkspaceContent({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        relPath: 'target.txt',
        content: 'new content',
      });
      expect(result.size).toBe(11);
      const content = await fs.promises.readFile(path.join(workRoot, 'target.txt'), 'utf8');
      expect(content).toBe('new content');
    });

    test('returns 404 for a missing file', async () => {
      await expect(
        writeWorkspaceContent({
          appConfig: makeAppConfig(workRoot),
          user: makeUser(null),
          relPath: 'missing.txt',
          content: 'x',
        }),
      ).rejects.toMatchObject({ status: 404 });
    });

    test('refuses to overwrite a directory', async () => {
      await fs.promises.mkdir(path.join(workRoot, 'a-dir'));
      await expect(
        writeWorkspaceContent({
          appConfig: makeAppConfig(workRoot),
          user: makeUser(null),
          relPath: 'a-dir',
          content: 'x',
        }),
      ).rejects.toMatchObject({ status: 400 });
    });
  });

  describe('scanWorkspaceFiles', () => {
    test('returns an empty result for a non-existent workspace path', async () => {
      const result = await scanWorkspaceFiles({
        appConfig: makeAppConfig(path.join(workRoot, 'does-not-exist')),
        user: makeUser(null),
      });
      expect(result.entries).toEqual([]);
      expect(result.truncated).toBe(false);
      expect(result.timedOut).toBe(false);
      expect(result.scannedDirs).toBe(0);
    });

    test('collects files at multiple depths with workspace-relative POSIX paths', async () => {
      await fs.promises.writeFile(path.join(workRoot, 'a.txt'), 'a');
      await fs.promises.mkdir(path.join(workRoot, 'sub'));
      await fs.promises.writeFile(path.join(workRoot, 'sub', 'b.txt'), 'b');
      await fs.promises.mkdir(path.join(workRoot, 'sub', 'deep'));
      await fs.promises.writeFile(path.join(workRoot, 'sub', 'deep', 'c.txt'), 'c');

      const result = await scanWorkspaceFiles({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
      });

      const names = result.entries.map((e) => e.name).sort();
      expect(names).toEqual(['a.txt', 'b.txt', 'c.txt']);
      expect(result.entries.find((e) => e.name === 'c.txt')?.relativePath).toBe(
        'sub/deep/c.txt',
      );
      expect(result.truncated).toBe(false);
      expect(result.timedOut).toBe(false);
    });

    test('skips node_modules, .git, and other heavy build dirs', async () => {
      await fs.promises.writeFile(path.join(workRoot, 'kept.txt'), 'keep');
      await fs.promises.mkdir(path.join(workRoot, 'node_modules', 'lodash'), {
        recursive: true,
      });
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

      const result = await scanWorkspaceFiles({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
      });

      const paths = result.entries.map((e) => e.relativePath);
      expect(paths).toEqual(['kept.txt']);
    });

    test('honors extraIgnoreDirnames in addition to the defaults', async () => {
      await fs.promises.writeFile(path.join(workRoot, 'kept.txt'), 'keep');
      await fs.promises.mkdir(path.join(workRoot, 'big-data'), { recursive: true });
      await fs.promises.writeFile(path.join(workRoot, 'big-data', 'blob.bin'), 'x');

      const result = await scanWorkspaceFiles({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        extraIgnoreDirnames: ['big-data'],
      });

      expect(result.entries.map((e) => e.relativePath)).toEqual(['kept.txt']);
    });

    test('truncates at maxEntries without ever going over the cap', async () => {
      for (let i = 0; i < 25; i += 1) {
        await fs.promises.writeFile(
          path.join(workRoot, `f-${i.toString().padStart(2, '0')}.txt`),
          'x',
        );
      }

      const result = await scanWorkspaceFiles({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        maxEntries: 10,
        maxDepth: 4,
        timeoutMs: 5_000,
      });

      expect(result.entries.length).toBe(10);
      expect(result.truncated).toBe(true);
      expect(result.timedOut).toBe(false);
    });

    test('respects maxDepth and does not descend past it', async () => {
      // depth 0: workRoot
      // depth 1: d1
      // depth 2: d1/d2
      // depth 3: d1/d2/d3  (file here should be missed with maxDepth=2)
      await fs.promises.mkdir(path.join(workRoot, 'd1', 'd2', 'd3'), { recursive: true });
      await fs.promises.writeFile(path.join(workRoot, 'd1', 'd2', 'd3', 'leaf.txt'), 'l');
      await fs.promises.writeFile(path.join(workRoot, 'd1', 'shallow.txt'), 's');

      const result = await scanWorkspaceFiles({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        maxDepth: 2,
      });

      const names = result.entries.map((e) => e.name).sort();
      expect(names).toEqual(['shallow.txt']);
    });

    test('honors timeoutMs and returns whatever was collected up to the deadline', async () => {
      // Build a tree with enough files + depth that the scan cannot
      // finish in 1ms on any reasonable host. Each call to `readdir`
      // is async and we stack up many of them so the BFS has to
      // yield a few times.
      const sub = path.join(workRoot, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');
      await fs.promises.mkdir(sub, { recursive: true });
      for (let i = 0; i < 500; i += 1) {
        await fs.promises.writeFile(path.join(workRoot, `file-${i.toString().padStart(3, '0')}.txt`), 'x');
      }

      const result = await scanWorkspaceFiles({
        appConfig: makeAppConfig(workRoot),
        user: makeUser(null),
        timeoutMs: 1,
        maxEntries: 10_000,
        maxDepth: 16,
      });

      expect(result.timedOut).toBe(true);
      // truncated stays false because we ran out of time, not of slots
      expect(result.truncated).toBe(false);
    });

    test('uses the user.workspaceSubdir as the scan root when provided', async () => {
      const sub = path.join(workRoot, 'alice');
      await fs.promises.mkdir(sub);
      await fs.promises.writeFile(path.join(sub, 'note.md'), 'hi');
      // A file at the root must NOT be picked up — the scan is rooted
      // at the user's subdir, not the container base path.
      await fs.promises.writeFile(path.join(workRoot, 'root-leak.txt'), 'no');

      const result = await scanWorkspaceFiles({
        appConfig: makeAppConfig(workRoot),
        user: makeUser('alice'),
      });

      expect(result.entries.map((e) => e.relativePath)).toEqual(['note.md']);
    });
  });
});
