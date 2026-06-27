/**
 * YAML auto-fixer — corrects common formatting issues that break
 * LibreChat's Zod schema validation.
 *
 * Fixes applied (in order):
 *   1. CRLF → LF (Windows line endings)
 *   2. Tab → 2 spaces (YAML forbids tabs)
 *   3. Trailing whitespace on each line
 *   4. Missing space after colon in `key:value` → `key: value`
 *   5. Inline empty list without space `key:[]` → `key: []`
 *   6. Inline empty object without space `key:{}` → `key: {}`
 *   7. Multiple blank lines collapsed to one
 *   8. Missing newline at EOF
 *
 * Pure function — never mutates input. Returns { content, changed, changes }.
 */

const FIXERS = [
  {
    name: 'CRLF → LF',
    test: (raw) => /\r\n/.test(raw),
    apply: (raw) => raw.replace(/\r\n/g, '\n'),
  },
  {
    name: 'Tabs → 2 spaces',
    test: (raw) => /\t/.test(raw),
    apply: (raw) => raw.replace(/\t/g, '  '),
  },
  {
    name: 'Trailing whitespace removed',
    test: (raw) => /[ \t]+$/m.test(raw),
    apply: (raw) => raw.replace(/[ \t]+$/gm, ''),
  },
  {
    // `key:value` (no space) → `key: value`. Negative lookbehind to skip
    // already-spaced keys, comments (`#`), and URLs (`https://`).
    name: 'Missing space after colon (key:value → key: value)',
    test: (raw) => /(^|\n)([ \t]*[a-zA-Z0-9_\-.]+):([^ \n#/:])/m.test(raw),
    apply: (raw) =>
      raw.replace(/(^|\n)([ \t]*[a-zA-Z0-9_\-.]+):([^ \n#/:])/g, '$1$2: $3'),
  },
  {
    name: 'Inline empty list without space (key:[] → key: [])',
    test: (raw) => /:\[\]/.test(raw),
    apply: (raw) => raw.replace(/:\[\]/g, ': []'),
  },
  {
    name: 'Inline empty object without space (key:{} → key: {})',
    test: (raw) => /:\{\}/.test(raw),
    apply: (raw) => raw.replace(/:\{\}/g, ': {}'),
  },
  {
    name: 'Multiple blank lines collapsed',
    test: (raw) => /\n{3,}/.test(raw),
    apply: (raw) => raw.replace(/\n{3,}/g, '\n\n'),
  },
  {
    name: 'Trailing newline added at EOF',
    test: (raw) => raw.length > 0 && !raw.endsWith('\n'),
    apply: (raw) => `${raw}\n`,
  },
];

export function fixCommonYamlIssues(raw) {
  let content = raw;
  const changes = [];

  for (const fixer of FIXERS) {
    if (fixer.test(content)) {
      content = fixer.apply(content);
      changes.push(fixer.name);
    }
  }

  return {
    content,
    changed: changes.length > 0,
    changes,
  };
}

// CLI entry: pipe/redirect-friendly
if (import.meta.url === `file://${process.argv[1]}`) {
  const fs = await import('node:fs');
  const path = await import('node:path');

  const arg = process.argv[2];
  if (!arg) {
    console.error('Usage: node fix-yaml.mjs <file.yaml>');
    process.exit(2);
  }
  const absPath = path.resolve(arg);
  const raw = fs.readFileSync(absPath, 'utf8');
  const { content, changed, changes } = fixCommonYamlIssues(raw);

  if (changed) {
    const backup = `${absPath}.bak.${Date.now()}`;
    fs.writeFileSync(backup, raw);
    fs.writeFileSync(absPath, content);
    console.log(`Fixed ${changes.length} issue(s):`);
    for (const c of changes) console.log(`  - ${c}`);
    console.log(`Backup: ${backup}`);
  } else {
    console.log('No issues found.');
  }
}