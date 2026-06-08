import {
  changePassword,
  adminSetPassword,
  generatePassword,
  comparePassword,
} from './password';

jest.mock('@librechat/data-schemas', () => ({
  ...jest.requireActual('@librechat/data-schemas'),
  logger: { error: jest.fn(), warn: jest.fn(), info: jest.fn(), debug: jest.fn() },
}));

const baseUser = {
  _id: 'user-1',
  provider: 'local',
  password: '$2a$10$existingHashedPasswordValueNotUsedForAuthInThisTest',
};

function makeDeps(overrides: Partial<Parameters<typeof changePassword>[3]> = {}) {
  return {
    findUserById: jest.fn().mockResolvedValue(baseUser),
    updateUserPassword: jest.fn().mockResolvedValue({ ok: true }),
    compare: jest.fn().mockResolvedValue(true),
    hash: jest.fn().mockResolvedValue('$2a$10$newHashedPassword'),
    ...overrides,
  };
}

describe('comparePassword', () => {
  it('throws when the user has no stored password (e.g. social login)', async () => {
    await expect(
      comparePassword({ provider: 'google' }, 'whatever', {
        compare: jest.fn().mockResolvedValue(false),
      }),
    ).rejects.toThrow(/Social\/OIDC/i);
  });

  it('delegates to the supplied compare function when a hash is present', async () => {
    const compare = jest.fn().mockResolvedValue(true);
    const out = await comparePassword(baseUser, 'candidate', { compare });
    expect(compare).toHaveBeenCalledWith('candidate', baseUser.password);
    expect(out).toBe(true);
  });
});

describe('changePassword', () => {
  it('rejects when the user is not found', async () => {
    const deps = makeDeps({ findUserById: jest.fn().mockResolvedValue(null) });
    const result = await changePassword('u', 'old', 'newpw123', deps);
    expect(result).toEqual({ ok: false, code: 'user_not_found' });
    expect(deps.updateUserPassword).not.toHaveBeenCalled();
  });

  it('rejects non-local accounts (OAuth/SSO do not store a password)', async () => {
    const deps = makeDeps({
      findUserById: jest.fn().mockResolvedValue({ ...baseUser, provider: 'google' }),
    });
    const result = await changePassword('u', 'old', 'newpw123', deps);
    expect(result).toEqual({ ok: false, code: 'not_local' });
    expect(deps.updateUserPassword).not.toHaveBeenCalled();
  });

  it('rejects when the user has no stored password', async () => {
    const deps = makeDeps({
      findUserById: jest.fn().mockResolvedValue({ provider: 'local' }),
    });
    const result = await changePassword('u', 'old', 'newpw123', deps);
    expect(result).toEqual({ ok: false, code: 'no_password' });
  });

  it('rejects when the supplied current password does not match', async () => {
    const deps = makeDeps({ compare: jest.fn().mockResolvedValue(false) });
    const result = await changePassword('u', 'wrong-old', 'newpw123', deps);
    expect(result).toEqual({ ok: false, code: 'invalid_current_password' });
    expect(deps.updateUserPassword).not.toHaveBeenCalled();
  });

  it('hashes and persists the new password on a happy path', async () => {
    const deps = makeDeps();
    const result = await changePassword('u', 'old', 'newpw123', deps);
    expect(result).toEqual({ ok: true });
    expect(deps.hash).toHaveBeenCalledWith('newpw123');
    expect(deps.updateUserPassword).toHaveBeenCalledWith('u', '$2a$10$newHashedPassword');
  });
});

describe('adminSetPassword', () => {
  it('returns user_not_found when the target does not exist', async () => {
    const deps = {
      findUserById: jest.fn().mockResolvedValue(null),
      updateUserPassword: jest.fn(),
      hash: jest.fn(),
    };
    const result = await adminSetPassword('u', undefined, deps);
    expect(result).toEqual({ ok: false, code: 'user_not_found' });
  });

  it('rejects non-local accounts', async () => {
    const deps = {
      findUserById: jest.fn().mockResolvedValue({ provider: 'saml' }),
      updateUserPassword: jest.fn(),
      hash: jest.fn(),
    };
    const result = await adminSetPassword('u', undefined, deps);
    expect(result).toEqual({ ok: false, code: 'not_local' });
  });

  it('uses the admin-supplied password verbatim when provided', async () => {
    const deps = {
      findUserById: jest.fn().mockResolvedValue({ provider: 'local' }),
      updateUserPassword: jest.fn().mockResolvedValue({ ok: true }),
      hash: jest.fn().mockResolvedValue('$2a$10$hashedTyped'),
    };
    const result = await adminSetPassword('u', 'typedPass!', deps);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.generatedPassword).toBe('typedPass!');
    }
    expect(deps.hash).toHaveBeenCalledWith('typedPass!');
  });

  it('generates a strong random password when none is provided', async () => {
    const deps = {
      findUserById: jest.fn().mockResolvedValue({ provider: 'local' }),
      updateUserPassword: jest.fn().mockResolvedValue({ ok: true }),
      hash: jest.fn().mockResolvedValue('$2a$10$hashedGenerated'),
    };
    const result = await adminSetPassword('u', undefined, deps);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.generatedPassword).toMatch(/^.{20,}$/);
      expect(result.generatedPassword).not.toBe('');
    }
    expect(deps.hash).toHaveBeenCalledTimes(1);
    const [passedToHash] = deps.hash.mock.calls[0];
    expect(passedToHash).toMatch(/^.{20,}$/);
  });

  it('generates a new password when an empty string is provided', async () => {
    const deps = {
      findUserById: jest.fn().mockResolvedValue({ provider: 'local' }),
      updateUserPassword: jest.fn(),
      hash: jest.fn().mockResolvedValue('$2a$10$h'),
    };
    const result = await adminSetPassword('u', '', deps);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.generatedPassword.length).toBeGreaterThan(0);
    }
  });
});

describe('generatePassword', () => {
  it('returns a string of the requested length', () => {
    expect(generatePassword(8)).toHaveLength(8);
    expect(generatePassword(32)).toHaveLength(32);
    expect(generatePassword()).toHaveLength(20);
  });

  it('only uses characters from the unambiguous alphabet', () => {
    const ambiguous = /[0O1lI|]/;
    for (let i = 0; i < 50; i += 1) {
      const pwd = generatePassword(40);
      expect(ambiguous.test(pwd)).toBe(false);
    }
  });

  it('produces different outputs across calls', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 20; i += 1) {
      seen.add(generatePassword());
    }
    expect(seen.size).toBeGreaterThan(1);
  });
});
