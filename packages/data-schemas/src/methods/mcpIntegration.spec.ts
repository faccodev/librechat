let mongoose: typeof import('mongoose');
let MongoMemoryServer: typeof import('mongodb-memory-server').MongoMemoryServer;
let createMCPIntegrationMethods: typeof import('./mcpIntegration').createMCPIntegrationMethods;
let mcpIntegrationSchema: typeof import('~/schema/mcpIntegration').default;

let mongoServer: InstanceType<typeof MongoMemoryServer>;
let methods: ReturnType<typeof createMCPIntegrationMethods>;

beforeAll(async () => {
  // crypto module reads env at load time — set keys before importing it
  // (transitively pulled in by the methods module).
  process.env.CREDS_KEY = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
  process.env.CREDS_IV = '0123456789abcdef0123456789abcdef';
  jest.resetModules();

  const mongoMemory = await import('mongodb-memory-server');
  const mod = await import('./mcpIntegration');
  const schemaMod = await import('~/schema/mcpIntegration');
  const mongooseMod = await import('mongoose');

  mongoose = mongooseMod.default ?? mongooseMod;
  MongoMemoryServer = mongoMemory.MongoMemoryServer;
  createMCPIntegrationMethods = mod.createMCPIntegrationMethods;
  mcpIntegrationSchema = schemaMod.default;

  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  if (!mongoose.models.MCPIntegration) {
    mongoose.model('MCPIntegration', mcpIntegrationSchema);
  }
  methods = createMCPIntegrationMethods(mongoose);
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

const sampleSSEConfig = {
  type: 'sse',
  url: 'https://example.com/mcp',
  apiKey: { key: 'gsk_super_secret', source: 'admin', authorization_type: 'bearer' },
};

const sampleOAuthConfig = {
  type: 'streamable-http',
  url: 'https://example.com/mcp',
  oauth: {
    client_id: 'public-client',
    client_secret: 'super-secret',
    authorization_url: 'https://auth.example.com/authorize',
    token_url: 'https://auth.example.com/token',
  },
};

const sampleStdioConfig = {
  type: 'stdio',
  command: 'npx',
  args: ['-y', 'pkg'],
  env: {
    TOKEN: 'literal-secret-value',
    REFPTR: '${SOME_ENV}',
  },
};

describe('createMCPIntegrationMethods', () => {
  describe('upsertMCPIntegration', () => {
    it('creates a new integration with encrypted credentials', async () => {
      const saved = await methods.upsertMCPIntegration({
        name: 'higgsfield',
        config: sampleSSEConfig,
      });
      expect(saved.name).toBe('higgsfield');
      expect(saved.config.apiKey.key).toBe('gsk_super_secret');

      const raw = await mongoose.models.MCPIntegration.findOne({ name: 'higgsfield' }).lean();
      expect(raw.config.apiKey.key).toMatch(/^v3:/);
      expect(raw.config.apiKey.key).not.toBe('gsk_super_secret');
    });

    it('updates an existing integration and re-encrypts', async () => {
      await methods.upsertMCPIntegration({ name: 'drive', config: sampleOAuthConfig });
      await methods.upsertMCPIntegration({
        name: 'drive',
        title: 'Drive v2',
        config: {
          ...sampleOAuthConfig,
          oauth: { ...sampleOAuthConfig.oauth, client_secret: 'new-secret' },
        },
      });

      const fetched = await methods.findMCPIntegrationByName('drive');
      expect(fetched.title).toBe('Drive v2');
      expect(fetched.config.oauth.client_secret).toBe('new-secret');

      const raw = await mongoose.models.MCPIntegration.findOne({ name: 'drive' }).lean();
      expect(raw.config.oauth.client_secret).toMatch(/^v3:/);
      expect(raw.config.oauth.client_secret).not.toBe('new-secret');
    });

    it('normalizes the name to lowercase trimmed', async () => {
      const saved = await methods.upsertMCPIntegration({
        name: '  Drive  ',
        config: sampleOAuthConfig,
      });
      expect(saved.name).toBe('drive');
    });

    it('rejects empty name', async () => {
      await expect(
        methods.upsertMCPIntegration({ name: '   ', config: sampleSSEConfig }),
      ).rejects.toThrow('name is required');
    });
  });

  describe('findMCPIntegrationByName', () => {
    it('returns null when missing', async () => {
      const fetched = await methods.findMCPIntegrationByName('does-not-exist');
      expect(fetched).toBeNull();
    });

    it('decrypts sensitive fields on read', async () => {
      await methods.upsertMCPIntegration({ name: 'github', config: sampleStdioConfig });
      const fetched = await methods.findMCPIntegrationByName('github');
      expect(fetched.config.env.TOKEN).toBe('literal-secret-value');
      expect(fetched.config.env.REFPTR).toBe('${SOME_ENV}');
    });
  });

  describe('listMCPIntegrations', () => {
    beforeEach(async () => {
      await methods.upsertMCPIntegration({ name: 'higgsfield', config: sampleSSEConfig });
      await methods.upsertMCPIntegration({ name: 'drive', config: sampleOAuthConfig });
    });

    it('returns redacted config by default', async () => {
      const items = await methods.listMCPIntegrations();
      expect(items).toHaveLength(2);
      const higgs = items.find((i) => i.name === 'higgsfield');
      const drive = items.find((i) => i.name === 'drive');
      expect(higgs.config.apiKey.key).toBe('••••••••');
      expect(drive.config.oauth.client_secret).toBe('••••••••');
    });

    it('returns decrypted config when redact: false', async () => {
      const items = await methods.listMCPIntegrations({ redact: false });
      const higgs = items.find((i) => i.name === 'higgsfield');
      const drive = items.find((i) => i.name === 'drive');
      expect(higgs.config.apiKey.key).toBe('gsk_super_secret');
      expect(drive.config.oauth.client_secret).toBe('super-secret');
    });
  });

  describe('removeMCPIntegration', () => {
    it('removes by name and returns the deleted document (decrypted)', async () => {
      await methods.upsertMCPIntegration({ name: 'higgsfield', config: sampleSSEConfig });
      const removed = await methods.removeMCPIntegration({ name: 'higgsfield' });
      expect(removed).not.toBeNull();
      expect(removed.config.apiKey.key).toBe('gsk_super_secret');
      const after = await methods.findMCPIntegrationByName('higgsfield');
      expect(after).toBeNull();
    });

    it('returns null when nothing matches', async () => {
      const removed = await methods.removeMCPIntegration({ name: 'never-existed' });
      expect(removed).toBeNull();
    });

    it('throws when no identifier is provided', async () => {
      await expect(methods.removeMCPIntegration({})).rejects.toThrow(
        'requires an id or name',
      );
    });
  });

  describe('setMCPIntegrationEnabled', () => {
    it('toggles the enabled flag without re-encrypting', async () => {
      await methods.upsertMCPIntegration({ name: 'higgsfield', config: sampleSSEConfig });
      const raw1 = await mongoose.models.MCPIntegration.findOne({ name: 'higgsfield' }).lean();
      const configBefore = JSON.stringify(raw1.config);

      const updated = await methods.setMCPIntegrationEnabled('higgsfield', false);
      expect(updated.enabled).toBe(false);

      const raw2 = await mongoose.models.MCPIntegration.findOne({ name: 'higgsfield' }).lean();
      expect(JSON.stringify(raw2.config)).toBe(configBefore);
    });

    it('returns null for unknown name', async () => {
      const updated = await methods.setMCPIntegrationEnabled('nope', false);
      expect(updated).toBeNull();
    });
  });
});
