#!/usr/bin/env node
/**
 * LibreChat YAML config validator — pre-deploy gate.
 *
 * Runs the SAME Zod schema the api server uses to validate
 * librechat.yaml / librerechat_coolify.yaml BEFORE docker compose up.
 *
 * Flow:
 *   1. Validate the file as-is (Zod schema).
 *   2. If validation fails AND the failure looks auto-fixable
 *      (string-typed-instead-of-object, trailing garbage, etc.),
 *      run fix-yaml.mjs and re-validate.
 *   3. If the second pass still fails, exit non-zero with the full
 *      Zod report so the deploy fails loudly.
 *   4. If both passes succeed, exit 0 with a green summary.
 *
 * Usage:
 *   node scripts/validate-config.mjs                 # uses CONFIG_PATH or ./librechat.yaml
 *   node scripts/validate-config.mjs path/to/file.yaml
 *   node scripts/validate-config.mjs --no-fix        # never auto-fix, fail on first error
 *
 * Exit codes:
 *   0 = valid (possibly after auto-fix)
 *   1 = invalid after auto-fix attempt
 *   2 = file not found
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

// --- args ----------------------------------------------------------------
const args = process.argv.slice(2);
const NO_FIX = args.includes('--no-fix');
const fileArg = args.find((a) => !a.startsWith('--'));
const CONFIG_PATH =
  fileArg || process.env.CONFIG_PATH || path.join(repoRoot, 'librechat.yaml');

// --- colors (graceful fallback if no TTY) -------------------------------
const c = (code) => (process.stdout.isTTY ? `\x1b[${code}m` : '');
const red = (s) => `${c('31')}${s}${c('0')}`;
const green = (s) => `${c('32')}${s}${c('0')}`;
const yellow = (s) => `${c('33')}${s}${c('0')}`;
const bold = (s) => `${c('1')}${s}${c('0')}`;

// --- file presence ------------------------------------------------------
if (!fs.existsSync(CONFIG_PATH)) {
  console.error(`${red('✗')} Config file not found: ${CONFIG_PATH}`);
  console.error(`  Set CONFIG_PATH or pass the file path as an argument.`);
  process.exit(2);
}

console.log(`${bold('Validating:')} ${CONFIG_PATH}`);

// --- load Zod schema once -----------------------------------------------
let configSchema = null;
const distCandidates = [
  path.join(repoRoot, 'packages/data-provider/dist/index.js'),
  path.join(repoRoot, 'packages/data-provider/dist/index.cjs'),
  path.join(repoRoot, 'packages/data-provider/dist/config.cjs'),
];
for (const distPath of distCandidates) {
  if (!fs.existsSync(distPath)) continue;
  try {
    const mod = await import(pathToFileURL(distPath).href);
    configSchema = mod?.configSchema ?? null;
    if (configSchema) break;
  } catch {
    // try next candidate
  }
}

if (!configSchema) {
  console.error(
    `${yellow('⚠')} Could not load librechat Zod schema from packages/data-provider/dist.`,
  );
  console.error(`  Build it once with:  npm run build:data-provider`);
  console.log(`${green('✓')} Skipping deep schema validation.`);
  process.exit(0);
}

// --- load js-yaml once --------------------------------------------------
const yaml = await import('js-yaml').catch(() => null);
if (!yaml) {
  console.error(
    `${red('✗')} js-yaml not available — install with: npm i js-yaml`,
  );
  process.exit(1);
}

// --- attempt auto-fix if the failure looks "fixable" --------------------
// Pattern: `invalid_type` with expected=object, received=string, on a
// nested path. This is exactly the bug class that took the api offline
// (e.g. `actions` parsed as a string because the user wrote
// `allowedDomains:[]` instead of `allowedDomains: []`). Tabs and trailing
// whitespace also get auto-fixed via the same gate.
function isAutoFixable(issues) {
  return issues.some(
    (i) =>
      i.code === 'invalid_type' &&
      i.expected === 'object' &&
      i.received === 'string',
  );
}

// --- auto-fix runner ----------------------------------------------------
async function tryAutoFixAsync(currentPath) {
  const mod = await import('./fix-yaml.mjs');
  const raw = fs.readFileSync(currentPath, 'utf8');
  const result = mod.fixCommonYamlIssues(raw);
  if (!result.changed) return { fixed: false, content: raw };
  const backup = `${currentPath}.bak.${Date.now()}`;
  fs.writeFileSync(backup, raw);
  fs.writeFileSync(currentPath, result.content);
  return { fixed: true, content: result.content, changes: result.changes, backup };
}

// --- single validation pass --------------------------------------------
function validate(raw) {
  let parsed;
  try {
    parsed = yaml.load(raw);
  } catch (parseErr) {
    return {
      ok: false,
      stage: 'yaml-parse',
      error: parseErr.message,
    };
  }
  if (typeof parsed === 'string') {
    return {
      ok: false,
      stage: 'yaml-type',
      error: 'YAML parsed as a string (likely `key:value` without space, or `key:[]`/`key:{}` inline)',
    };
  }
  const result = configSchema.strict().safeParse(parsed);
  if (!result.success) {
    return {
      ok: false,
      stage: 'zod-schema',
      issues: result.error.issues,
    };
  }
  return { ok: true, parsed };
}

function reportZodIssues(issues) {
  console.error(`${red('✗')} Schema validation failed:\n`);
  for (const issue of issues) {
    const p = issue.path.join('.') || '(root)';
    console.error(`  ${red('•')} ${p}: ${issue.message}`);
    if (
      issue.code === 'invalid_type' &&
      issue.expected === 'object' &&
      issue.received === 'string'
    ) {
      console.error(
        `    ${yellow('Hint:')} "${p}" parsed as a string. Check for missing space after \`:\` or inline list like \`key:[]\` (should be \`key: []\`).`,
      );
    }
  }
}

// --- pass 1: validate as-is --------------------------------------------
let raw = fs.readFileSync(CONFIG_PATH, 'utf8');
let pass = validate(raw);

if (pass.ok) {
  console.log(`${green('✓')} Config is valid (pass 1/1).\n`);
  printSummary(pass.parsed);
  process.exit(0);
}

// --- handle parse-stage failures (auto-fix applies) --------------------
if (!pass.ok && (pass.stage === 'yaml-parse' || pass.stage === 'yaml-type')) {
  console.error(`${red('✗')} ${pass.stage === 'yaml-parse' ? 'YAML parse error' : pass.error}`);
  if (!NO_FIX) {
    console.log(`${yellow('→')} Attempting auto-fix...`);
    const fix = await tryAutoFixAsync(CONFIG_PATH);
    if (fix.fixed) {
      console.log(
        `${green('✓')} Auto-fixed ${fix.changes.length} issue(s). Backup: ${path.basename(fix.backup)}`,
      );
      console.log(`    Changes: ${fix.changes.join(', ')}`);
      raw = fix.content;
      pass = validate(raw);
      if (pass.ok) {
        console.log(`${green('✓')} Config is valid (after auto-fix).\n`);
        printSummary(pass.parsed);
        process.exit(0);
      }
      // fall through to zod report below
    } else {
      console.error(`${red('✗')} No auto-fixable issues found.`);
      process.exit(1);
    }
  } else {
    console.error(`  ${yellow('Re-run without --no-fix to auto-correct, or fix manually.')}`);
    process.exit(1);
  }
}

// --- handle zod-stage failures (auto-fix applies if pattern matches) ---
if (!pass.ok && pass.stage === 'zod-schema') {
  reportZodIssues(pass.issues);
  if (!NO_FIX && isAutoFixable(pass.issues)) {
    console.log(`\n${yellow('→')} Auto-fixable pattern detected — attempting auto-fix...`);
    const fix = await tryAutoFixAsync(CONFIG_PATH);
    if (fix.fixed) {
      console.log(
        `${green('✓')} Auto-fixed ${fix.changes.length} issue(s). Backup: ${path.basename(fix.backup)}`,
      );
      console.log(`    Changes: ${fix.changes.join(', ')}`);
      raw = fix.content;
      pass = validate(raw);
      if (pass.ok) {
        console.log(`${green('✓')} Config is valid (after auto-fix).\n`);
        printSummary(pass.parsed);
        process.exit(0);
      }
      // second pass also failed — fall through to fail
    } else {
      console.log(`${yellow('⚠')} No auto-fixable issues detected in raw text.`);
    }
  } else if (!NO_FIX) {
    console.log(`\n  ${yellow('Issues do not match known auto-fixable patterns.')} Manual fix required.`);
  } else {
    console.log(`\n  ${yellow('--no-fix set, skipping auto-fix.')}`);
  }

  // final failure — re-validate so the user sees the CURRENT state of issues
  // (which may differ from the first pass if partial fixes were applied).
  if (!pass.ok) {
    console.error(`\n${red('✗')} Config still invalid after auto-fix attempt.`);
    if (pass.stage === 'zod-schema') {
      console.error(`\nRemaining issues:\n`);
      reportZodIssues(pass.issues);
    } else if (pass.stage === 'yaml-parse' || pass.stage === 'yaml-type') {
      console.error(`  ${pass.error}`);
    }
    process.exit(1);
  }
}

// --- unreachable, but TS-style fallback --------------------------------
process.exit(1);

// --- helpers ------------------------------------------------------------
function printSummary(parsed) {
  console.log(`  File: ${CONFIG_PATH}`);
  console.log(`  Top-level keys: ${Object.keys(parsed).join(', ')}`);
  if (parsed.endpoints?.custom) {
    console.log(`  Custom endpoints: ${parsed.endpoints.custom.map((e) => e.name).join(', ')}`);
  }
  if (parsed.mcpServers) {
    console.log(`  MCP servers: ${Object.keys(parsed.mcpServers).join(', ')}`);
  }
}