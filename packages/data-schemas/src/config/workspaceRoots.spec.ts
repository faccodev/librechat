import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  getWorkspaceRoots,
  parseWorkspaceRoots,
  resetWorkspaceRootsCache,
} from './workspaceRoots';

describe('parseWorkspaceRoots', () => {
  it('returns [] for null / undefined / empty', () => {
    expect(parseWorkspaceRoots(null)).toEqual([]);
    expect(parseWorkspaceRoots(undefined)).toEqual([]);
    expect(parseWorkspaceRoots('')).toEqual([]);
  });

  it('splits on commas and trims whitespace', () => {
    expect(parseWorkspaceRoots('/a, /b ,/c')).toEqual([
      path.resolve('/a'),
      path.resolve('/b'),
      path.resolve('/c'),
    ]);
  });

  it('skips empty entries (trailing or doubled commas)', () => {
    expect(parseWorkspaceRoots('/a,,/b,')).toEqual([path.resolve('/a'), path.resolve('/b')]);
  });

  it('resolves relative entries against process.cwd()', () => {
    const result = parseWorkspaceRoots('relative/root');
    expect(result).toHaveLength(1);
    expect(path.isAbsolute(result[0])).toBe(true);
  });
});

describe('getWorkspaceRoots', () => {
  const ORIGINAL_ENV = process.env.WORKSPACE_ROOTS;

  beforeEach(() => {
    resetWorkspaceRootsCache();
  });

  afterAll(() => {
    if (ORIGINAL_ENV === undefined) {
      delete process.env.WORKSPACE_ROOTS;
    } else {
      process.env.WORKSPACE_ROOTS = ORIGINAL_ENV;
    }
    resetWorkspaceRootsCache();
  });

  it('returns the default when WORKSPACE_ROOTS is unset', () => {
    delete process.env.WORKSPACE_ROOTS;
    expect(getWorkspaceRoots()).toEqual(['/workspaces']);
  });

  it('returns parsed value when WORKSPACE_ROOTS is set', () => {
    process.env.WORKSPACE_ROOTS = '/srv/a,/srv/b';
    expect(getWorkspaceRoots()).toEqual([path.resolve('/srv/a'), path.resolve('/srv/b')]);
  });

  it('caches the result until reset', () => {
    process.env.WORKSPACE_ROOTS = '/first';
    expect(getWorkspaceRoots()).toEqual([path.resolve('/first')]);

    process.env.WORKSPACE_ROOTS = '/second';
    // Cached — still the first value.
    expect(getWorkspaceRoots()).toEqual([path.resolve('/first')]);

    resetWorkspaceRootsCache();
    expect(getWorkspaceRoots()).toEqual([path.resolve('/second')]);
  });
});

describe('getWorkspaceRoots (filesystem sanity)', () => {
  // These tests create a real temp dir and use it as the root, so they
  // exercise the actual fs-based callers end-to-end on whatever platform the
  // suite runs on (Linux CI + Windows/macOS dev). We don't use Jest's `it.skip`
  // for platform guards — we just make the roots real and platform-agnostic.

  let tmpRoot: string;

  beforeEach(async () => {
    tmpRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'workspace-roots-'));
    resetWorkspaceRootsCache();
  });

  afterEach(async () => {
    delete process.env.WORKSPACE_ROOTS;
    resetWorkspaceRootsCache();
    await fs.rm(tmpRoot, { recursive: true, force: true });
  });

  it('reads tmp dir as workspace root via env', () => {
    process.env.WORKSPACE_ROOTS = tmpRoot;
    expect(getWorkspaceRoots()).toEqual([path.resolve(tmpRoot)]);
  });
});