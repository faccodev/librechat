#!/usr/bin/env node
/**
 * Syncs the `endpoints.custom:` block in librechat.yaml with the opencode
 * models.dev catalog. Source of truth: https://models.dev/api.json
 *
 * Usage:
 *   node scripts/sync-providers.mjs                  # writes to librechat.yaml
 *   node scripts/sync-providers.mjs --stdout         # prints to stdout
 *   node scripts/sync-providers.mjs --config foo.yaml
 *   node scripts/sync-providers.mjs --dry-run        # alias of --stdout
 *
 * Provider filtering:
 *   - INCLUDED  : @ai-sdk/openai-compatible, @ai-sdk/openai, @ai-sdk/anthropic
 *   - INCLUDED  : @openrouter/ai-sdk-provider, @ai-sdk/gateway, merge-gateway-*
 *                 (these have a public baseURL and a single env-var key)
 *   - EXCLUDED  : first-class LibreChat endpoints (groq, mistral, xai, perplexity,
 *                 togetherai, deepinfra, cerebras, cohere, google) — they ship
 *                 with the backend
 *   - EXCLUDED  : multi-env providers (azure, bedrock, vertex, databricks,
 *                 snowflake, gitlab, sap, github-copilot) — they need extra
 *                 config beyond a single API key
 *   - EXCLUDED  : custom SDKs (aihubmix, venice, v0)
 *
 * Plus a small set of locally-defined providers appended at the end (Ollama,
 * LMStudio, Anthropic-format variants) that don't fit the opencode catalog.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const CATALOG_URL = 'https://models.dev/api.json';
const DEFAULT_CONFIG = 'librechat.yaml';

const FIRST_CLASS_LBRECHAT = new Set([
  'groq', 'mistral', 'xai', 'perplexity', 'togetherai', 'deepinfra',
  'cerebras', 'cohere', 'google', 'openai', 'anthropic',
]);
const EXCLUDED_NPM = new Set([
  '@ai-sdk/azure', '@ai-sdk/amazon-bedrock', '@ai-sdk/google-vertex',
  '@aihubmix/ai-sdk-provider', 'venice-ai-sdk-provider',
  '@jerome-benoit/sap-ai-provider-v2', 'gitlab-ai-provider',
  'ai-gateway-provider', // Cloudflare AI Gateway — needs account_id
  '@ai-sdk/google-vertex/anthropic',
]);
const INCLUDED_NPM = new Set([
  '@ai-sdk/openai-compatible', '@ai-sdk/openai', '@ai-sdk/anthropic',
  '@openrouter/ai-sdk-provider', '@ai-sdk/gateway',
  'merge-gateway-ai-sdk-provider',
]);

function parseArgs(argv) {
  const args = { stdout: false, dryRun: false, config: DEFAULT_CONFIG };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--stdout' || a === '--dry-run') args.stdout = true;
    else if (a === '--config') args.config = argv[++i];
    else if (a === '--help' || a === '-h') {
      console.log(SYNTAX);
      process.exit(0);
    }
  }
  return args;
}

const SYNTAX = `
sync-providers.mjs — regenerate the endpoints.custom: block in librechat.yaml
from the opencode models.dev catalog.

  --stdout, --dry-run   Print to stdout instead of writing the file
  --config <path>       Target config file (default: librechat.yaml)
  --help, -h            Show this help
`.trim();

function toYamlString(s) {
  // Always single-quote; escape any embedded single quotes by doubling them
  return `'${String(s).replace(/'/g, "''")}'`;
}

function indent(line, spaces) {
  return ' '.repeat(spaces) + line;
}

function entryYaml(p) {
  const lines = [];
  lines.push(`    - name: ${toYamlString(p.name)}`);
  lines.push(`      apiKey: 'user_provided'`);
  if (p.baseURL) {
    lines.push(`      baseURL: ${toYamlString(p.baseURL)}`);
  } else {
    lines.push(`      baseURL: ''`);
  }
  if (p.customParams) {
    lines.push(`      customParams:`);
    lines.push(`        defaultParamsEndpoint: ${toYamlString(p.customParams.defaultParamsEndpoint)}`);
  }
  lines.push(`      models:`);
  lines.push(`        default: ['placeholder']`);
  lines.push(`        fetch: true`);
  lines.push(`      modelDisplayLabel: ${toYamlString(p.modelDisplayLabel)}`);
  return lines.join('\n');
}

function categorize(provider) {
  const id = provider.id;
  if (FIRST_CLASS_LBRECHAT.has(id)) return 'first-class';
  if (EXCLUDED_NPM.has(provider.npm)) return 'excluded-npm';
  if (INCLUDED_NPM.has(provider.npm)) {
    if (!provider.api) return 'no-baseurl';
    return 'included';
  }
  return 'unknown';
}

function buildEntryFromCatalog(p) {
  const isAnthropic = p.npm === '@ai-sdk/anthropic';
  return {
    name: p.id,
    baseURL: p.api,
    modelDisplayLabel: p.name,
    customParams: isAnthropic ? { defaultParamsEndpoint: 'anthropic' } : undefined,
  };
}

function localExtras() {
  // These don't exist in the opencode catalog but are commonly useful.
  // They're appended after the catalog entries in a separate section.
  return [
    {
      name: 'ollama',
      baseURL: 'http://host.docker.internal:11434/v1',
      modelDisplayLabel: 'Ollama (local)',
      directEndpoint: true,
    },
    {
      name: 'lmstudio',
      baseURL: 'http://host.docker.internal:1234/v1',
      modelDisplayLabel: 'LM Studio (local)',
      directEndpoint: true,
    },
    {
      name: 'ollama-cloud',
      baseURL: 'https://ollama.com/v1',
      modelDisplayLabel: 'Ollama Cloud',
    },
  ];
}

function entryYamlWithDirect(p) {
  const base = entryYaml(p);
  if (!p.directEndpoint) return base;
  return base + '\n      directEndpoint: true';
}

function buildBlock(catalog) {
  const out = [];
  out.push('  custom:');
  out.push('    # =========================================================================');
  out.push('    # Pre-defined custom providers (synced from opencode models.dev).');
  out.push('    # All entries use apiKey: \'user_provided\' so each user enters their own key');
  out.push('    # via the SetKeyDialog (no env-var setup required).');
  out.push('    # Models auto-discover via fetch: true (GET /models on the provider).');
  out.push('    # Regenerate with: npm run providers:sync [-- --stdout]');
  out.push('    # =========================================================================');
  out.push('');

  const included = [];
  const skipped = [];
  for (const p of Object.values(catalog)) {
    const cat = categorize(p);
    if (cat === 'included') {
      included.push(buildEntryFromCatalog(p));
    } else if (cat === 'first-class' || cat === 'excluded-npm' || cat === 'no-baseurl') {
      skipped.push({ id: p.id, reason: cat });
    } else if (cat === 'unknown') {
      skipped.push({ id: p.id, reason: `unknown npm: ${p.npm}` });
    }
  }

  // Group catalog entries into sections (simple alphabetical + gateways first)
  // For now: keep alphabetical, but put "ollama" and "lmstudio" from localExtras
  // at the end under a separate header.
  const sorted = included.sort((a, b) => a.name.localeCompare(b.name));

  out.push('    # ----- Catalog providers (opencode models.dev) -----');
  out.push('');
  for (const entry of sorted) {
    out.push(entryYaml(entry));
    out.push('');
  }

  out.push('    # ----- Local providers (host.docker.internal) -----');
  out.push('');
  for (const entry of localExtras()) {
    out.push(entryYamlWithDirect(entry));
    out.push('');
  }

  // Skipped section (commented)
  out.push('    # ----- Skipped (require multi-env config or custom SDKs) -----');
  for (const s of skipped) {
    out.push(`    # - name: ${toYamlString(s.id)}${' '.repeat(Math.max(1, 28 - s.id.length))}# ${s.reason}`);
  }
  out.push('');

  return out.join('\n');
}

async function main() {
  const args = parseArgs(process.argv);
  console.error(`Fetching ${CATALOG_URL} ...`);
  const res = await fetch(CATALOG_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch catalog: ${res.status} ${res.statusText}`);
  }
  const catalog = await res.json();
  const providerCount = Object.keys(catalog).length;
  console.error(`Catalog has ${providerCount} providers`);

  const block = buildBlock(catalog);

  if (args.stdout) {
    process.stdout.write(block);
    console.error(`\nWrote ${block.split('\n').length} lines to stdout (--stdout mode)`);
    return;
  }

  const target = resolve(args.config);
  const original = readFileSync(target, 'utf8');

  // Replace the `endpoints.custom:` block. The block starts at a line that is
  // exactly "  custom:" (two spaces) under "endpoints:", and ends at the next
  // line whose first non-space character is NOT a space (top-level) AND is not
  // part of a `bedrock:` etc. comment block.
  //
  // Heuristic: find "  custom:" line, then find the next line that starts with
  // something other than " " or "# " at the same indent level (2 spaces).
  // In practice, the next top-level key after `custom:` is either empty, a
  // comment, or starts at column 0 (e.g. `# Example modelSpecs ...`).
  const lines = original.split('\n');
  const startIdx = lines.findIndex((l) => /^  custom:$/.test(l));
  if (startIdx === -1) {
    throw new Error(`Could not find "  custom:" block in ${target}`);
  }
  // Find the end: next line that is at indent 0 (column 0) and not a comment
  // about bedrock/modelSpecs. In librechat.yaml, after the custom block
  // comes either an empty line then "# Example modelSpecs ..." or the
  // `bedrock:` comment block.
  let endIdx = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    const l = lines[i];
    if (l.length === 0) continue;
    if (l[0] !== ' ' && l[0] !== '\t') {
      endIdx = i;
      break;
    }
  }

  const before = lines.slice(0, startIdx);
  const after = lines.slice(endIdx);
  const newBlockLines = block.split('\n');

  const updated = [...before, ...newBlockLines, ...after].join('\n');
  writeFileSync(target, updated, 'utf8');

  console.error(`Updated ${target}`);
  console.error(`  Replaced lines ${startIdx + 1}-${endIdx} with ${newBlockLines.length} new lines`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
