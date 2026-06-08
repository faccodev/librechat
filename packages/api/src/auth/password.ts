interface UserWithPassword {
  password?: string;
  provider?: string;
  [key: string]: unknown;
}

export interface ComparePasswordDeps {
  compare: (candidatePassword: string, hash: string) => Promise<boolean>;
}

/** Compares a candidate password against a user's hashed password. */
export async function comparePassword(
  user: UserWithPassword,
  candidatePassword: string,
  deps: ComparePasswordDeps,
): Promise<boolean> {
  if (!user) {
    throw new Error('No user provided');
  }

  if (!user.password) {
    throw new Error('No password, likely an email first registered via Social/OIDC login');
  }

  return deps.compare(candidatePassword, user.password);
}

export interface ChangePasswordDeps {
  /** Look up a user by id; the returned object must include `password` and `provider`. */
  findUserById: (userId: string) => Promise<UserWithPassword | null>;
  /** Persist the new (already-hashed) password. */
  updateUserPassword: (userId: string, hashedPassword: string) => Promise<unknown>;
  /** Verify a candidate against the stored hash. */
  compare: (candidatePassword: string, hash: string) => Promise<boolean>;
  /** Hash a fresh password for storage. */
  hash: (plaintext: string) => Promise<string>;
}

export type ChangePasswordOutcome =
  | { ok: true }
  | { ok: false; code: 'invalid_current_password' }
  | { ok: false; code: 'no_password' }
  | { ok: false; code: 'not_local' }
  | { ok: false; code: 'user_not_found' };

/**
 * Self-service password change.
 *
 * - Requires the user to be present and stored with provider=local (the same
 *   gating used for 2FA setup in the UI). OAuth/SSO accounts don't have a
 *   password stored in LibreChat and must use the provider's reset flow.
 * - Verifies the candidate current password before persisting the new one
 *   (re-using the existing comparePassword helper to keep behavior consistent
 *   with the login path).
 *
 * @returns a tagged outcome. Callers translate codes to HTTP status codes.
 */
export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
  deps: ChangePasswordDeps,
): Promise<ChangePasswordOutcome> {
  const user = await deps.findUserById(userId);
  if (!user) {
    return { ok: false, code: 'user_not_found' };
  }
  if (user.provider !== 'local') {
    return { ok: false, code: 'not_local' };
  }
  if (!user.password) {
    return { ok: false, code: 'no_password' };
  }

  const matches = await deps.compare(currentPassword, user.password);
  if (!matches) {
    return { ok: false, code: 'invalid_current_password' };
  }

  const hashed = await deps.hash(newPassword);
  await deps.updateUserPassword(userId, hashed);
  return { ok: true };
}

export interface AdminSetPasswordDeps {
  /** Look up the target user; must include `provider`. */
  findUserById: (userId: string) => Promise<UserWithPassword | null>;
  /** Persist the new (already-hashed) password. */
  updateUserPassword: (userId: string, hashedPassword: string) => Promise<unknown>;
  /** Hash a fresh password for storage. */
  hash: (plaintext: string) => Promise<string>;
}

export type AdminSetPasswordOutcome =
  | { ok: true; generatedPassword: string }
  | { ok: false; code: 'not_local' }
  | { ok: false; code: 'user_not_found' };

/**
 * Admin-initiated password reset.
 *
 * - Provider must be `local`. Resetting the password of an OAuth account has
 *   no effect (the IdP owns the credential), so we refuse with a clear code
 *   that the UI can surface.
 * - When `newPassword` is omitted, generates a 20-char URL-safe random
 *   password. The plaintext is returned exactly once so the admin can pass
 *   it to the user through whatever channel they trust.
 */
export async function adminSetPassword(
  targetUserId: string,
  newPassword: string | undefined,
  deps: AdminSetPasswordDeps,
): Promise<AdminSetPasswordOutcome> {
  const user = await deps.findUserById(targetUserId);
  if (!user) {
    return { ok: false, code: 'user_not_found' };
  }
  if (user.provider !== 'local') {
    return { ok: false, code: 'not_local' };
  }

  const plaintext = newPassword && newPassword.length > 0 ? newPassword : generatePassword();
  const hashed = await deps.hash(plaintext);
  await deps.updateUserPassword(targetUserId, hashed);
  return { ok: true, generatedPassword: plaintext };
}

const PASSWORD_ALPHABET =
  'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789' +
  '!@#$%^&*?_+-=';

/**
 * 20-char URL-safe-ish password with a small bias toward unambiguous
 * characters (no `0/O`, no `1/l/I`) and a few symbols. Suitable for a
 * one-shot temporary credential the admin will hand to a user.
 */
export function generatePassword(length = 20): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += PASSWORD_ALPHABET[bytes[i] % PASSWORD_ALPHABET.length];
  }
  return out;
}
