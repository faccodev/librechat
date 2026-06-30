import {
  validateGitUrl,
  validateSubpath,
  detectHost,
  isPrivateOrLoopbackHost,
  deriveSubpathFromUrlPath,
} from '~/skills/gitImport/validator';

describe('validateGitUrl', () => {
  it.each([
    ['https://github.com/owner/repo', true],
    ['https://gitlab.com/group/project', true],
    ['https://bitbucket.org/workspace/repo', true],
    ['https://codeberg.org/owner/repo', true],
    ['https://github.com/owner/repo/tree/main/skills/foo', true],
  ])('accepts %s', (input, expected) => {
    const result = validateGitUrl(input);
    expect(result.ok).toBe(expected);
  });

  it.each([
    ['http://github.com/owner/repo', 'Only https:// URLs are allowed'],
    ['ftp://github.com/owner/repo', 'Only https:// URLs are allowed'],
    ['not-a-url', 'Invalid URL'],
    ['https://user:pass@github.com/owner/repo', 'URLs with embedded credentials are not allowed'],
    ['https://localhost/owner/repo', 'Private or loopback hosts are not allowed'],
    ['https://127.0.0.1/owner/repo', 'Private or loopback hosts are not allowed'],
    ['https://10.0.0.1/owner/repo', 'Private or loopback hosts are not allowed'],
    ['https://192.168.1.1/owner/repo', 'Private or loopback hosts are not allowed'],
    ['https://172.16.0.1/owner/repo', 'Private or loopback hosts are not allowed'],
    ['https://169.254.169.254/latest/meta-data', 'Private or loopback hosts are not allowed'],
  ])('rejects %s with reason %s', (input, expectedReason) => {
    const result = validateGitUrl(input);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe(expectedReason);
  });

  it('cleans embedded query/fragment from the path', () => {
    const result = validateGitUrl('https://github.com/owner/repo?ref=main#readme');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.url.pathname).toBe('/owner/repo');
  });
});

describe('validateSubpath', () => {
  it.each([
    ['skills/foo', 'skills/foo'],
    ['nested/path/here', 'nested/path/here'],
    ['', ''],
    [undefined, ''],
    ['/leading-slash/', 'leading-slash'],
  ])('returns cleaned %j', (input, expected) => {
    expect(validateSubpath(input as string | undefined)).toBe(expected);
  });

  it.each([
    ['../escape'],
    ['with..dots'],
    ['/absolute'],
    ['with spaces'],
    ['with;semicolon'],
    ['a'.repeat(257)],
  ])('rejects %j', (input) => {
    expect(validateSubpath(input)).toBeNull();
  });
});

describe('detectHost', () => {
  it.each([
    ['github.com', 'github'],
    ['GITHUB.COM', 'github'],
    ['gitlab.com', 'gitlab'],
    ['bitbucket.org', 'bitbucket'],
    ['codeberg.org', 'generic'],
    ['example.com', 'generic'],
  ])('maps %s to %s', (input, expected) => {
    expect(detectHost(input)).toBe(expected);
  });
});

describe('isPrivateOrLoopbackHost', () => {
  it.each([
    ['github.com', false],
    ['127.0.0.1', true],
    ['10.0.0.5', true],
    ['192.168.1.1', true],
    ['172.20.0.1', true],
    ['172.15.0.1', false],
    ['169.254.169.254', true],
    ['localhost', true],
    ['metadata.google.internal', true],
    ['fc00::1', true],
    ['fe80::1', true],
    ['::1', true],
    ['8.8.8.8', false],
  ])('isPrivateOrLoopbackHost(%j) === %j', (input, expected) => {
    expect(isPrivateOrLoopbackHost(input)).toBe(expected);
  });
});

describe('deriveSubpathFromUrlPath', () => {
  it.each([
    ['/owner/repo', ''],
    ['/owner/repo/skills/foo', ''], // not deep enough to disambiguate
    ['/owner/repo/blob/main/skills/foo/SKILL.md', ''],
    ['/owner/repo/tree/main/skills/foo', 'skills/foo'],
    ['/owner/repo/tree/main/nested/path', 'nested/path'],
  ])('deriveSubpathFromUrlPath(%j) === %j', (input, expected) => {
    expect(deriveSubpathFromUrlPath(input)).toBe(expected);
  });
});