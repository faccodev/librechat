import fs from 'fs';
import os from 'os';
import path from 'path';
import { listWorkspaceTree, searchWorkspaceTree } from './workspaceFiles';
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
});
