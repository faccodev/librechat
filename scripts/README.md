# scripts/

## sync-providers.mjs

Regenerates the `endpoints.custom:` block in `librechat.yaml` from the
[opencode models.dev](https://models.dev/api.json) catalog. The script is the
canonical source for the default list of providers that ship with LibreChat.

### Usage

```bash
# Preview the generated block (does not write to disk)
npm run providers:sync:dry

# Apply the generated block to librechat.yaml
npm run providers:sync

# Custom target file
node scripts/sync-providers.mjs --config foo.yaml

# Help
node scripts/sync-providers.mjs --help
```

### What it does

Fetches `https://models.dev/api.json` and produces a YAML block in the
LibreChat `endpoints.custom:` format. The script:

- **Includes** any provider whose `npm` field is one of the openai-compatible
  or anthropic SDKs (e.g. `@ai-sdk/openai-compatible`, `@ai-sdk/anthropic`)
- **Excludes** providers that already ship as first-class LibreChat endpoints
  (groq, mistral, xai, perplexity, togetherai, deepinfra, cerebras, cohere,
  google, openai, anthropic) — adding them as custom would create duplicates
- **Excludes** multi-env providers (azure, bedrock, vertex, databricks,
  snowflake, gitlab, sap, github-copilot) — they need extra config beyond a
  single API key
- **Excludes** custom SDKs (aihubmix, venice, v0)
- **Skips silently** providers with no public `api` baseURL

After the catalog providers, the script appends a small set of locally-defined
providers that don't exist in the catalog: Ollama, LM Studio, and Ollama Cloud.

### After running

The block is replaced wholesale, so any manual edits you made to the
`endpoints.custom:` section of `librechat.yaml` will be lost. To customize:

- Add or remove providers in `localExtras()` at the bottom of the script
- Add new fields per provider (e.g. `dropParams`, `iconURL`, `titleConvo`)
  by editing `entryYaml()` in the script

Then restart the api container:

```bash
docker compose restart api
```

### When to re-run

Re-run when opencode updates the catalog and adds new providers, or when you
want to reset your `librechat.yaml` to the current canonical list.
