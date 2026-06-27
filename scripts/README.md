# scripts/

## validate-config.mjs

Pre-deploy YAML validator. Runs the same Zod schema the api server uses
to validate `librechat.yaml` / `librechat_coolify.yaml` **before** `docker
compose up`. Catches the bug class that took the api offline (e.g.
`key:[]` parsed as a string instead of a list, tabs instead of spaces,
missing space after a colon).

### Usage

```bash
# Validate the default config (uses CONFIG_PATH or ./librechat.yaml)
npm run config:validate

# Validate the Coolify production config
npm run config:validate -- librechat_coolify.yaml

# Validate WITHOUT auto-fix — fail immediately on any issue
npm run config:validate:strict -- librechat_coolify.yaml
```

### Flow (auto-fix enabled by default)

1. **Pass 1** — validate as-is.
2. If Pass 1 fails with a known auto-fixable pattern (`invalid_type`,
   string-instead-of-object, YAML parse error), apply `fix-yaml.mjs`.
3. **Pass 2** — re-validate the fixed content.
4. If Pass 2 fails, exit non-zero with the full Zod report. The pre-build
   fails loudly instead of silently deploying a broken api.

### What it catches

- **YAML parse errors** — bad indentation, unclosed quotes, tabs in indent
- **Zod schema violations** — same checks the api runs at boot, surfaced
  with a precise `path` and `message` (e.g. `actions: Expected object,
  received string`)
- **Common foot-guns** — `key:[]` without a space, trailing whitespace,
  CRLF line endings, multiple blank lines

### Auto-fixable issues

The auto-fixer rewrites the file in-place with:

| Before | After |
|---|---|
| `key:value` | `key: value` |
| `key:[]` | `key: []` |
| `key:{}` | `key: {}` |
| `\t` (tab) | `  ` (2 spaces) |
| `\r\n` | `\n` |
| Trailing whitespace | (removed) |
| `\n\n\n\n` | `\n\n` |
| No trailing newline | (added) |

A timestamped backup (`file.yaml.bak.<ms>`) is created before any change.
Pass `--no-fix` (or use the `config:validate:strict` npm script) to skip
auto-fix entirely and fail on the first issue.

### CI / Coolify integration

The `config-validator` service in `docker-compose.yml` runs this script as a
gate before `api` starts:

```yaml
api:
  depends_on:
    config-validator:
      condition: service_completed_successfully
```

If the validator exits non-zero, `api` never starts — Coolify shows the
validator's error log instead of an infinite api restart loop. To enable
this gate, deploy with the `validate` profile:

```bash
docker compose --profile validate up -d
```

By default the validator runs only when explicitly requested (it has
`profiles: ["validate"]`), so it doesn't slow down normal dev. To make it
always-on, remove the profile line.

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
