let encryptMCPCredentials: typeof import('./mcpCredentials').encryptMCPCredentials;
let decryptMCPCredentials: typeof import('./mcpCredentials').decryptMCPCredentials;
let redactMCPCredentials: typeof import('./mcpCredentials').redactMCPCredentials;

beforeAll(async () => {
  // Set encryption keys BEFORE importing the module under test. The
  // `~/crypto/index` module reads CREDS_KEY / CREDS_IV at module load
  // time, so we reset the module cache and re-import dynamically to
  // pick up the test env values.
  process.env.CREDS_KEY = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
  process.env.CREDS_IV = '0123456789abcdef0123456789abcdef';
  jest.resetModules();
  const mod = await import('./mcpCredentials');
  encryptMCPCredentials = mod.encryptMCPCredentials;
  decryptMCPCredentials = mod.decryptMCPCredentials;
  redactMCPCredentials = mod.redactMCPCredentials;
});

describe('mcpCredentials', () => {
  describe('encryptMCPCredentials / decryptMCPCredentials roundtrip', () => {
    it('roundtrips apiKey.key', () => {
      const original = {
        type: 'streamable-http',
        url: 'https://example.com/mcp',
        apiKey: { key: 'gsk_super_secret_value', source: 'admin', authorization_type: 'bearer' },
      };
      const encrypted = encryptMCPCredentials(structuredClone(original));
      expect(encrypted.apiKey.key).not.toBe(original.apiKey.key);
      expect(encrypted.apiKey.key).toMatch(/^v3:/);
      const decrypted = decryptMCPCredentials(structuredClone(encrypted));
      expect(decrypted).toEqual(original);
    });

    it('roundtrips oauth.client_secret', () => {
      const original = {
        type: 'streamable-http',
        url: 'https://example.com/mcp',
        oauth: {
          client_id: 'public-client-id',
          client_secret: 'super-secret-client-secret',
          authorization_url: 'https://auth.example.com/authorize',
          token_url: 'https://auth.example.com/token',
        },
      };
      const encrypted = encryptMCPCredentials(structuredClone(original));
      expect(encrypted.oauth.client_secret).not.toBe(original.oauth.client_secret);
      expect(encrypted.oauth.client_secret).toMatch(/^v3:/);
      expect(encrypted.oauth.client_id).toBe(original.oauth.client_id);
      const decrypted = decryptMCPCredentials(structuredClone(encrypted));
      expect(decrypted).toEqual(original);
    });

    it('roundtrips literal env values and preserves env-var refs', () => {
      const original = {
        type: 'stdio',
        command: 'npx',
        args: ['-y', 'pkg'],
        env: {
          GITHUB_TOKEN: 'ghp_literal_value',
          AWS_ACCESS_KEY_ID: '${AWS_ACCESS_KEY_ID}',
        },
      };
      const encrypted = encryptMCPCredentials(structuredClone(original));
      expect(encrypted.env.GITHUB_TOKEN).not.toBe(original.env.GITHUB_TOKEN);
      expect(encrypted.env.GITHUB_TOKEN).toMatch(/^v3:/);
      expect(encrypted.env.AWS_ACCESS_KEY_ID).toBe('${AWS_ACCESS_KEY_ID}');
      const decrypted = decryptMCPCredentials(structuredClone(encrypted));
      expect(decrypted).toEqual(original);
    });

    it('is idempotent on already-encrypted values', () => {
      const once = encryptMCPCredentials({
        type: 'streamable-http',
        url: 'https://example.com/mcp',
        apiKey: { key: 'value', source: 'admin', authorization_type: 'bearer' },
      });
      const twice = encryptMCPCredentials(structuredClone(once));
      expect(twice.apiKey.key).toBe(once.apiKey.key);
      const decrypted = decryptMCPCredentials(structuredClone(twice));
      expect(decrypted.apiKey.key).toBe('value');
    });

    it('handles missing sensitive fields without throwing', () => {
      const original = { type: 'streamable-http', url: 'https://example.com/mcp' };
      const encrypted = encryptMCPCredentials(structuredClone(original));
      expect(encrypted).toEqual(original);
      const decrypted = decryptMCPCredentials(structuredClone(encrypted));
      expect(decrypted).toEqual(original);
    });

    it('does not mutate the input when no sensitive fields are present', () => {
      const input = { type: 'streamable-http', url: 'https://example.com/mcp' };
      const snapshot = JSON.stringify(input);
      encryptMCPCredentials(input);
      expect(JSON.stringify(input)).toBe(snapshot);
    });
  });

  describe('redactMCPCredentials', () => {
    it('masks apiKey.key, oauth.client_secret, and literal env values', () => {
      const input = {
        type: 'streamable-http',
        url: 'https://example.com/mcp',
        apiKey: { key: 'gsk_secret', source: 'admin', authorization_type: 'bearer' },
        oauth: {
          client_id: 'public',
          client_secret: 'super-secret',
          authorization_url: 'https://a.example/auth',
          token_url: 'https://a.example/token',
        },
        env: { TOKEN: 'ghp_literal', REFPTR: '${SOME_ENV}' },
      };
      const redacted = redactMCPCredentials(structuredClone(input));
      expect(redacted.apiKey.key).toBe('••••••••');
      expect(redacted.oauth.client_secret).toBe('••••••••');
      expect(redacted.oauth.client_id).toBe('public');
      expect(redacted.env.TOKEN).toBe('••••••••');
      expect(redacted.env.REFPTR).toBe('${SOME_ENV}');
    });

    it('preserves the rest of the config tree', () => {
      const input = {
        type: 'stdio',
        command: 'npx',
        args: ['-y', 'pkg'],
        timeout: 30000,
      };
      const redacted = redactMCPCredentials(input);
      expect(redacted).toEqual(input);
    });
  });
});
