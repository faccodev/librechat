import { execFile } from 'child_process';
import * as fsp from 'fs/promises';
import * as os from 'os';
import * as path from 'path';
import {
  validateWorkspaceSubdir,
  getSafePaths,
  selectExecutor,
  runCode,
  runFile,
} from './runner.js';
// Mock child_process.execFile so runner.ts calls our spy instead of
// spawning real `docker exec` processes during these tests. We replace
// the whole module â€” the alternative (jest.spyOn(require('child_process'),
// 'execFile')) is forbidden by @typescript-eslint/no-require-imports.
jest.mock('child_process', () => ({
  execFile: jest.fn(),
}));
import {
  parseProjectContextHeader,
  parseWorkspaceRoots,
  getWorkspaceRoots,
  resetWorkspaceRootsCache,
  validateWorkspacePathAgainstRoots,
  InvalidProjectContextError,
  PROJECT_CONTEXT_HEADER_DEFAULT,
} from './projectContext.js';
import { requestContextStore, getCurrentProjectContext } from './context.js';
import type { ProjectContext } from './context.js';

describe('validateWorkspaceSubdir', () => {
  it('accepts the empty subdir as the workspace root', () => {
    expect(validateWorkspaceSubdir('')).toBe(true);
  });

  it('accepts plain ASCII subdirs', () => {
    expect(validateWorkspaceSubdir('alice')).toBe(true);
    expect(validateWorkspaceSubdir('clients/bob-123_test')).toBe(true);
  });

  it('accepts subdirs with spaces and accented characters', () => {
    // The bug we are fixing: a user with a folder named
    // "Minha Pasta æ–‡æ¡£" could not run code from inside it.
    expect(validateWorkspaceSubdir('Minha Pasta')).toBe(true);
    expect(validateWorkspaceSubdir('Minha Pasta/2024')).toBe(true);
    expect(validateWorkspaceSubdir('Cliente AÃ§Ãµes')).toBe(true);
    expect(validateWorkspaceSubdir('æ–‡æ¡£/é¡¹ç›®')).toBe(true);
    expect(validateWorkspaceSubdir('emoji ðŸ“ folder')).toBe(true);
  });

  it('rejects `..` segments', () => {
    expect(validateWorkspaceSubdir('..')).toBe(false);
    expect(validateWorkspaceSubdir('../etc')).toBe(false);
    expect(validateWorkspaceSubdir('foo/../bar')).toBe(false);
    expect(validateWorkspaceSubdir('foo/..')).toBe(false);
  });

  it('rejects `.` segments', () => {
    expect(validateWorkspaceSubdir('.')).toBe(false);
    expect(validateWorkspaceSubdir('./foo')).toBe(false);
  });

  it('rejects shell metacharacters', () => {
    // The runner is invoked through child_process.execFile, but the
    // subdir is also used as a path segment in `path.join`, so we
    // conservatively reject anything that would let the agent split
    // the path or trigger a shell expansion.
    expect(validateWorkspaceSubdir('foo;rm -rf /')).toBe(false);
    expect(validateWorkspaceSubdir('foo|bar')).toBe(false);
    expect(validateWorkspaceSubdir('foo&bar')).toBe(false);
    expect(validateWorkspaceSubdir('foo$bar')).toBe(false);
    expect(validateWorkspaceSubdir('foo`bar`')).toBe(false);
    expect(validateWorkspaceSubdir('foo<bar')).toBe(false);
    expect(validateWorkspaceSubdir('foo>bar')).toBe(false);
    expect(validateWorkspaceSubdir('foo\\bar')).toBe(false);
    expect(validateWorkspaceSubdir("foo'bar")).toBe(false);
    expect(validateWorkspaceSubdir('foo"bar')).toBe(false);
  });

  it('rejects control characters', () => {
    expect(validateWorkspaceSubdir('foo\nbar')).toBe(false);
    expect(validateWorkspaceSubdir('foo\rbar')).toBe(false);
    expect(validateWorkspaceSubdir('foo\x00bar')).toBe(false);
    expect(validateWorkspaceSubdir('foo\tbar')).toBe(false);
  });
});

describe('getSafePaths (no project context)', () => {
  it('resolves the empty subdir to the workspaces root', async () => {
    const { containerPath, hostPath } = await getSafePaths('');
    expect(containerPath).toBe('/workspaces');
    expect(hostPath).toBe('/workspaces');
  });

  it('preserves spaces and accented characters in the path', async () => {
    const { containerPath, hostPath } = await getSafePaths('Minha Pasta');
    expect(containerPath).toBe('/workspaces/Minha Pasta');
    // hostPath uses forward slashes for docker mount compatibility.
    expect(hostPath).toBe('/workspaces/Minha Pasta');
  });

  it('preserves nested paths', async () => {
    const { containerPath, hostPath } = await getSafePaths('Minha Pasta/2024/docs');
    expect(containerPath).toBe('/workspaces/Minha Pasta/2024/docs');
    expect(hostPath).toBe('/workspaces/Minha Pasta/2024/docs');
  });

  it('throws on path traversal', async () => {
    await expect(getSafePaths('../etc')).rejects.toThrow();
    await expect(getSafePaths('foo/../bar')).rejects.toThrow();
  });

  it('throws on shell metacharacters', async () => {
    await expect(getSafePaths('foo;rm')).rejects.toThrow();
  });
});

describe('getSafePaths with explicitWorkspacePath (project context)', () => {
  let tmpRoot: string;

  beforeAll(async () => {
    // Create a real dir on disk so `validateWorkspacePathAgainstRoots`
    // can `realpath` it. Without an on-disk anchor, realpath fails and
    // we can't assert the strict-subdir check fires.
    tmpRoot = await fsp.mkdtemp(path.join(os.tmpdir(), 'mcp-runner-roots-'));
    await fsp.mkdir(path.join(tmpRoot, 'my-saas'), { recursive: true });
    resetWorkspaceRootsCache();
    process.env.WORKSPACE_ROOTS = tmpRoot;
  });

  afterAll(async () => {
    delete process.env.WORKSPACE_ROOTS;
    resetWorkspaceRootsCache();
    await fsp.rm(tmpRoot, { recursive: true, force: true });
  });

  it('overrides the subdir with the explicit path when inside WORKSPACE_ROOTS', async () => {
    const { containerPath, hostPath } = await getSafePaths(
      'anything-the-agent-passed',
      path.join(tmpRoot, 'my-saas'),
    );
    // The implementation converts backslashes to forward slashes for
    // docker-mount compatibility on the hostPath side, so we compare
    // against the POSIX-style form. The container side is always
    // POSIX (Linux container), so it also uses forward slashes.
    expect(containerPath).toBe(`${tmpRoot.replace(/\\/g, '/')}/my-saas`);
    expect(hostPath).toBe(tmpRoot.replace(/\\/g, '/') + '/my-saas');
  });

  it('rejects an explicit path that escapes WORKSPACE_ROOTS', async () => {
    await expect(getSafePaths('', '/etc/passwd')).rejects.toThrow(/Path escapes workspace sandbox/);
  });

  it('rejects `..` that resolves outside WORKSPACE_ROOTS', async () => {
    await expect(getSafePaths('', path.join(tmpRoot, '..', '..', 'etc'))).rejects.toThrow(
      /Path escapes workspace sandbox/,
    );
  });

  it('accepts a path under the second root when WORKSPACE_ROOTS has multiple', async () => {
    const secondRoot = await fsp.mkdtemp(path.join(os.tmpdir(), 'mcp-runner-second-'));
    await fsp.mkdir(path.join(secondRoot, 'project'), { recursive: true });
    try {
      resetWorkspaceRootsCache();
      process.env.WORKSPACE_ROOTS = `${tmpRoot},${secondRoot}`;
      const { containerPath } = await getSafePaths('', path.join(secondRoot, 'project'));
      // Container side is always POSIX-style, so compare against the
      // slash-normalised form â€” the runner converts backslashes for
      // docker-mount compatibility.
      expect(containerPath).toBe(`${secondRoot.replace(/\\/g, '/')}/project`);
    } finally {
      delete process.env.WORKSPACE_ROOTS;
      resetWorkspaceRootsCache();
      await fsp.rm(secondRoot, { recursive: true, force: true });
    }
  });

  it('rejects the explicit path being a subdir of a different root that shares a prefix', async () => {
    // Defence against the `/workspaces-evil` matching `/workspaces` class of
    // attack. `parseWorkspaceRoots` resolves both roots; the strict-subdir
    // check inside `validateWorkspacePathAgainstRoots` uses a trailing
    // separator, so a sibling dir with a shared prefix is rejected.
    const evil = await fsp.mkdtemp(path.join(os.tmpdir(), 'mcp-runner-evil-'));
    // Name the evil root so it shares the prefix `${tmpRoot}-evil`. The
    // host's tmp dir already gives us that shape (e.g. /tmp/mcp-runner-roots-xyz
    // vs /tmp/mcp-runner-roots-xyz-evil).
    try {
      resetWorkspaceRootsCache();
      process.env.WORKSPACE_ROOTS = tmpRoot;
      // The `evil` dir sits next to `tmpRoot` in /tmp with a shared prefix.
      // A naive `startsWith` would let it pass; the trailing-separator
      // check must not.
      await expect(getSafePaths('', evil)).rejects.toThrow(/Path escapes workspace sandbox/);
    } finally {
      delete process.env.WORKSPACE_ROOTS;
      resetWorkspaceRootsCache();
      await fsp.rm(evil, { recursive: true, force: true });
    }
  });

  it('allows a path that does not exist yet (project pinned to a future dir)', async () => {
    // Validate ENOENT fallback: the admin pinned a workspace that the
    // runner hasn't materialised yet. The first `run_code` will create
    // it; the layer-3 check accepts the resolved-but-not-real path.
    //
    // Set up WORKSPACE_ROOTS explicitly here â€” the previous tests in
    // this describe block delete the env in their `finally` blocks
    // (the "evil" sibling test in particular), so we cannot rely on
    // the describe-level beforeAll env to still be in effect.
    resetWorkspaceRootsCache();
    process.env.WORKSPACE_ROOTS = tmpRoot;
    try {
      const futurePath = path.join(tmpRoot, 'not-yet-created');
      const { containerPath } = await getSafePaths('', futurePath);
      expect(containerPath).toBe(`${tmpRoot.replace(/\\/g, '/')}/not-yet-created`);
    } finally {
      delete process.env.WORKSPACE_ROOTS;
      resetWorkspaceRootsCache();
    }
  });
});

describe('selectExecutor', () => {
  // Env-driven config is read once at module load. These tests use the
  // module's default behavior (no overrides set in jest env).
  const ORIGINAL_ENV = { ...process.env };

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('maps node -> node runner image + node command', () => {
    const spec = selectExecutor('node');
    expect(spec.image).toBe('mcp-runner-node:latest');
    expect(spec.command('/tmp/x.js')).toEqual(['node', '/tmp/x.js']);
  });

  it('maps python -> python runner image + python command', () => {
    const spec = selectExecutor('python');
    expect(spec.image).toBe('mcp-runner-python:latest');
    expect(spec.command('/tmp/x.py')).toEqual(['python', '/tmp/x.py']);
  });

  it('maps sh -> alpine runner image + sh command', () => {
    const spec = selectExecutor('sh');
    expect(spec.image).toBe('mcp-runner-alpine:latest');
    expect(spec.command('/tmp/x.sh')).toEqual(['sh', '/tmp/x.sh']);
  });

  it('falls back to sh when given an unknown language', () => {
    // Cast through unknown so TS doesn't reject the bad input at compile time â€”
    // the function is meant to be defensive at runtime.
    const spec = selectExecutor('ruby' as unknown as 'sh');
    expect(spec.image).toBe('mcp-runner-alpine:latest');
  });

  it('honours RUNNER_IMAGE_NODE override', () => {
    process.env.RUNNER_IMAGE_NODE = 'ghcr.io/me/custom-node:1.2.3';
    // Re-import the module so the top-level const picks up the new env.
    let spec;
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { selectExecutor: fresh } = require('./runner.js') as typeof import('./runner.js');
      spec = fresh('node');
    });
    expect(spec!.image).toBe('ghcr.io/me/custom-node:1.2.3');
  });
});

describe('parseProjectContextHeader (AD-3 unified contract)', () => {
  const ctx: ProjectContext = {
    projectId: '64f0000000000000000000aa',
    workspacePath: '/workspaces/my-saas',
  };
  const valid = Buffer.from(JSON.stringify(ctx), 'utf8').toString('base64');

  it('returns null for null / undefined / empty input (normal no-project path)', () => {
    expect(parseProjectContextHeader(null)).toBeNull();
    expect(parseProjectContextHeader(undefined)).toBeNull();
    expect(parseProjectContextHeader('')).toBeNull();
    expect(parseProjectContextHeader('   ')).toBeNull();
  });

  it('parses a well-formed base64-JSON payload', () => {
    expect(parseProjectContextHeader(valid)).toEqual(ctx);
  });

  it('throws InvalidProjectContextError on non-base64 input', () => {
    expect(() => parseProjectContextHeader('not-base64!!!')).toThrow(InvalidProjectContextError);
  });

  it('throws on valid base64 but invalid JSON', () => {
    const bad = Buffer.from('{not json}', 'utf8').toString('base64');
    expect(() => parseProjectContextHeader(bad)).toThrow(InvalidProjectContextError);
  });

  it('throws on valid JSON that is not an object', () => {
    const bad = Buffer.from(JSON.stringify('a string'), 'utf8').toString('base64');
    expect(() => parseProjectContextHeader(bad)).toThrow(/payload must be a JSON object/);
  });

  it('throws when projectId is missing / non-string / empty', () => {
    const noId = Buffer.from(JSON.stringify({ workspacePath: '/x' }), 'utf8').toString('base64');
    const emptyId = Buffer.from(
      JSON.stringify({ projectId: '', workspacePath: '/x' }),
      'utf8',
    ).toString('base64');
    const numId = Buffer.from(
      JSON.stringify({ projectId: 42, workspacePath: '/x' }),
      'utf8',
    ).toString('base64');
    expect(() => parseProjectContextHeader(noId)).toThrow(/projectId/);
    expect(() => parseProjectContextHeader(emptyId)).toThrow(/projectId/);
    expect(() => parseProjectContextHeader(numId)).toThrow(/projectId/);
  });

  it('throws when workspacePath is missing / non-string / empty', () => {
    const noPath = Buffer.from(JSON.stringify({ projectId: 'a' }), 'utf8').toString('base64');
    const emptyPath = Buffer.from(
      JSON.stringify({ projectId: 'a', workspacePath: '' }),
      'utf8',
    ).toString('base64');
    expect(() => parseProjectContextHeader(noPath)).toThrow(/workspacePath/);
    expect(() => parseProjectContextHeader(emptyPath)).toThrow(/workspacePath/);
  });
});

describe('getProjectContextHeaderName', () => {
  it('defaults to X-Project-Context', () => {
    // The header name is captured at module load via a top-level
    // `const`, so changing the env after import has no effect on the
    // already-cached value. `jest.isolateModules` re-executes the
    // module from scratch so the fresh env is picked up.
    let name: string | undefined;
    jest.isolateModules(() => {
      delete process.env.RUNNER_PROJECT_CONTEXT_HEADER;
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mod = require('./projectContext.js') as typeof import('./projectContext.js');
      name = mod.getProjectContextHeaderName();
    });
    expect(name).toBe(PROJECT_CONTEXT_HEADER_DEFAULT);
  });

  it('honours RUNNER_PROJECT_CONTEXT_HEADER override', () => {
    let name: string | undefined;
    jest.isolateModules(() => {
      process.env.RUNNER_PROJECT_CONTEXT_HEADER = 'X-Custom-Project';
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mod = require('./projectContext.js') as typeof import('./projectContext.js');
      name = mod.getProjectContextHeaderName();
    });
    expect(name).toBe('X-Custom-Project');
  });
});

describe('parseWorkspaceRoots', () => {
  it('returns the default /workspaces when the env is empty or missing', () => {
    expect(parseWorkspaceRoots(undefined)).toEqual(['/workspaces']);
    expect(parseWorkspaceRoots('')).toEqual(['/workspaces']);
  });

  it('returns the default when the env has only commas / whitespace', () => {
    expect(parseWorkspaceRoots('  ,  , ')).toEqual(['/workspaces']);
  });

  it('splits multiple roots on comma and trims whitespace', () => {
    // `path.resolve` is platform-aware â€” on Linux it returns the
    // literal POSIX path, on Windows it prepends the current drive
    // letter. The test asserts the contract ("resolve to absolute
    // path") instead of a hardcoded string, so it stays portable.
    const [first, second] = parseWorkspaceRoots('/workspaces, /srv/projects');
    expect(first).toBe(path.resolve('/workspaces'));
    expect(second).toBe(path.resolve('/srv/projects'));
  });

  it('resolves each root to an absolute path', () => {
    const parsed = parseWorkspaceRoots('relative/path');
    expect(parsed[0]).toBe(path.resolve('relative/path'));
  });
});

describe('getWorkspaceRoots (with env cache)', () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    resetWorkspaceRootsCache();
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    resetWorkspaceRootsCache();
  });

  it('caches the parsed roots on first call', () => {
    // `path.resolve("/a")` on Windows returns `E:\a`, so we assert
    // the resolved form to stay portable.
    process.env.WORKSPACE_ROOTS = '/a,/b';
    const first = getWorkspaceRoots();
    expect(first).toEqual([path.resolve('/a'), path.resolve('/b')]);
    // Mutate env + read again â€” should still be the cached value.
    process.env.WORKSPACE_ROOTS = '/c';
    expect(getWorkspaceRoots()).toEqual([path.resolve('/a'), path.resolve('/b')]);
  });

  it('picks up new env after resetWorkspaceRootsCache()', () => {
    process.env.WORKSPACE_ROOTS = '/a';
    expect(getWorkspaceRoots()).toEqual([path.resolve('/a')]);
    process.env.WORKSPACE_ROOTS = '/b';
    resetWorkspaceRootsCache();
    expect(getWorkspaceRoots()).toEqual([path.resolve('/b')]);
  });
});

describe('validateWorkspacePathAgainstRoots (realpath + strict-subdir)', () => {
  let tmpRoot: string;

  beforeAll(async () => {
    tmpRoot = await fsp.mkdtemp(path.join(os.tmpdir(), 'mcp-runner-vw-'));
    await fsp.mkdir(path.join(tmpRoot, 'app'), { recursive: true });
  });

  afterAll(async () => {
    await fsp.rm(tmpRoot, { recursive: true, force: true });
  });

  it('accepts a real path inside the root', async () => {
    const canonical = await validateWorkspacePathAgainstRoots(path.join(tmpRoot, 'app'), [tmpRoot]);
    expect(canonical).toBe(path.join(tmpRoot, 'app'));
  });

  it('rejects a path that escapes the root', async () => {
    await expect(validateWorkspacePathAgainstRoots('/etc/passwd', [tmpRoot])).rejects.toThrow(
      /Path escapes workspace sandbox/,
    );
  });

  it('rejects the root itself (must be a strict subdir)', async () => {
    await expect(validateWorkspacePathAgainstRoots(tmpRoot, [tmpRoot])).rejects.toThrow(
      /Path escapes workspace sandbox/,
    );
  });

  it('allows a non-existent path (project pinned to a future dir)', async () => {
    const canonical = await validateWorkspacePathAgainstRoots(path.join(tmpRoot, 'not-yet'), [
      tmpRoot,
    ]);
    expect(canonical).toBe(path.join(tmpRoot, 'not-yet'));
  });

  it('blocks a symlink that resolves outside the root', async () => {
    // Symlink creation on Windows requires either admin privileges
    // or developer mode to be enabled â€” without either, `fsp.symlink`
    // throws `EPERM: operation not permitted` before the function
    // we are trying to test is even reached. The symlink-escape
    // defence is platform-agnostic in the implementation, so we
    // exercise it on POSIX (Linux/macOS dev hosts, CI) and skip
    // the synthetic symlink on Windows. Production runs that need
    // the guarantee on Windows use the realpath-on-existing-paths
    // path of `validateWorkspacePathAgainstRoots`; the same
    // strict-subdir check fires regardless of how the path got
    // there.
    if (process.platform === 'win32') {
      return;
    }
    const linkPath = path.join(tmpRoot, 'escape');
    try {
      await fsp.symlink('/etc', linkPath, 'dir');
      await expect(validateWorkspacePathAgainstRoots(linkPath, [tmpRoot])).rejects.toThrow(
        /Path escapes workspace sandbox/,
      );
    } finally {
      await fsp.unlink(linkPath).catch(() => undefined);
    }
  });
});

describe('runCode / runFile with projectContext', () => {
  const ORIGINAL_ENV = { ...process.env };
  const execFileMock = jest.mocked(execFile);
  let tmpRoot: string;

  beforeAll(async () => {
    tmpRoot = await fsp.mkdtemp(path.join(os.tmpdir(), 'mcp-runner-runcode-'));
  });

  afterAll(async () => {
    await fsp.rm(tmpRoot, { recursive: true, force: true });
  });

  beforeEach(() => {
    // Anchor WORKSPACES_BASE + WORKSPACE_ROOTS to a real on-disk path
    // so `realpath` and the strict-subdir check succeed on every host
    // (Windows: `path.resolve('/workspaces')` prepends a drive
    // letter, so we cannot rely on the literal POSIX path in tests).
    process.env.WORKSPACES_BASE = tmpRoot;
    process.env.HOST_WORKSPACES_BASE = tmpRoot;
    process.env.WORKSPACE_ROOTS = tmpRoot;
    resetWorkspaceRootsCache();
    execFileMock.mockReset();
    // Minimal mock: return a successful empty result.
    execFileMock.mockImplementation(
      (
        _cmd: unknown,
        _args: unknown,
        _opts: unknown,
        cb: (e: null, stdout: string, stderr: string) => void,
      ) => {
        if (typeof cb === 'function') {
          cb(null, '', '');
        }
        return { kill: () => undefined } as unknown as ReturnType<typeof execFile>;
      },
    );
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    resetWorkspaceRootsCache();
    execFileMock.mockReset();
  });

  it('runCode adds --label project=<id> when projectContext is provided', async () => {
    const projectDir = path.join(tmpRoot, 'my-saas');
    await fsp.mkdir(projectDir, { recursive: true });
    await runCode('sh', 'echo hi', '', 5, { projectId: 'abc-123', workspacePath: projectDir });
    expect(execFileMock).toHaveBeenCalledTimes(1);
    const args = (execFileMock.mock.calls[0] as unknown[])[1] as string[];
    const labelIdx = args.indexOf('--label');
    expect(labelIdx).toBeGreaterThanOrEqual(0);
    expect(args[labelIdx + 1]).toBe('project=abc-123');
  });

  it('runFile adds --label project=<id> when projectContext is provided', async () => {
    const projectDir = path.join(tmpRoot, 'p2');
    await fsp.mkdir(projectDir, { recursive: true });
    await runFile('main.sh', '', 'sh', 5, { projectId: 'p2', workspacePath: projectDir });
    expect(execFileMock).toHaveBeenCalledTimes(1);
    const args = (execFileMock.mock.calls[0] as unknown[])[1] as string[];
    const labelIdx = args.indexOf('--label');
    expect(labelIdx).toBeGreaterThanOrEqual(0);
    expect(args[labelIdx + 1]).toBe('project=p2');
  });

  it('runCode omits the --label when no projectContext is provided', async () => {
    await runCode('sh', 'echo hi', '', 5);
    const args = (execFileMock.mock.calls[0] as unknown[])[1] as string[];
    expect(args).not.toContain('--label');
  });

  it('runFile pulls projectContext from AsyncLocalStorage when not passed explicitly', async () => {
    const projectDir = path.join(tmpRoot, 'als');
    await fsp.mkdir(projectDir, { recursive: true });
    await requestContextStore.run(
      { projectContext: { projectId: 'als-1', workspacePath: projectDir } },
      async () => {
        await runFile('main.sh', '', 'sh', 5);
      },
    );
    const args = (execFileMock.mock.calls[0] as unknown[])[1] as string[];
    const labelIdx = args.indexOf('--label');
    expect(args[labelIdx + 1]).toBe('project=als-1');
  });

  it('strips shell-metacharacters from the projectId before emitting the label', async () => {
    const projectDir = path.join(tmpRoot, 'strip');
    await fsp.mkdir(projectDir, { recursive: true });
    await runCode('sh', 'echo hi', '', 5, {
      projectId: 'evil;rm -rf /',
      workspacePath: projectDir,
    });
    const args = (execFileMock.mock.calls[0] as unknown[])[1] as string[];
    const labelIdx = args.indexOf('--label');
    expect(args[labelIdx + 1]).toBe('project=evilrm-rf');
  });
});

describe('AsyncLocalStorage context (request -> tool handler)', () => {
  it('getCurrentProjectContext returns null outside a request', () => {
    expect(getCurrentProjectContext()).toBeNull();
  });

  it('getCurrentProjectContext reads the value set inside the store', () => {
    requestContextStore.run({ projectContext: { projectId: 'x', workspacePath: '/x' } }, () => {
      expect(getCurrentProjectContext()).toEqual({
        projectId: 'x',
        workspacePath: '/x',
      });
    });
  });

  it('the value does not leak across concurrent requests', async () => {
    // Two parallel ALS runs must each see their own context â€” this
    // is the property that lets the runner handle concurrent tool
    // calls from different projects without one poisoning the other.
    await Promise.all([
      requestContextStore.run(
        { projectContext: { projectId: 'A', workspacePath: '/a' } },
        async () => {
          await new Promise((r) => setTimeout(r, 10));
          expect(getCurrentProjectContext()?.projectId).toBe('A');
        },
      ),
      requestContextStore.run(
        { projectContext: { projectId: 'B', workspacePath: '/b' } },
        async () => {
          await new Promise((r) => setTimeout(r, 5));
          expect(getCurrentProjectContext()?.projectId).toBe('B');
        },
      ),
    ]);
    // Outside both contexts, the store is empty again.
    expect(getCurrentProjectContext()).toBeNull();
  });
});
