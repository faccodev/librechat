import { resolveGitImport } from '~/skills/gitImport/resolver';

describe('resolveGitImport', () => {
  it('detects GitHub and resolves a clean subpath', () => {
    const result = resolveGitImport({
      url: 'https://github.com/owner/repo',
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.resolved.host).toBe('github');
    expect(result.resolved.path).toBe('');
  });

  it('honors explicit subpath when provided', () => {
    const result = resolveGitImport({
      url: 'https://github.com/owner/repo',
      path: 'skills/example',
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.resolved.path).toBe('skills/example');
  });

  it('rejects invalid explicit subpaths', () => {
    const result = resolveGitImport({
      url: 'https://github.com/owner/repo',
      path: '../etc/passwd',
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe('Invalid subpath');
  });

  it('falls back to generic host for unknown hostnames', () => {
    const result = resolveGitImport({
      url: 'https://codeberg.org/owner/repo',
      path: 'skills/foo',
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.resolved.host).toBe('generic');
    expect(result.resolved.path).toBe('skills/foo');
  });
});