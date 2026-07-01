/**
 * Adapter: convert `RegistryServer` → LibreChat `MCPOptions`-shaped
 * config, plus the metadata the UI needs (required env vars, OAuth
 * hint, warnings).
 *
 * The output is intentionally NOT typed as `MCPOptions` (a Zod-inferred
 * union from `data-provider`) because:
 *  1. Keeping the adapter free of `data-provider` imports makes it
 *     trivially unit-testable and avoids a rollup/build dependency
 *     loop while PR 1 is still being merged.
 *  2. The Express route validates the output against `MCPOptionsSchema`
 *     before returning it to the client. The adapter's job is to
 *     produce a candidate object; the validator's job is to police it.
 *
 * Conversion rules are documented per-section so behavior changes are
 * reviewable in PR.
 */

import { MCPOptionsSchema } from 'librechat-data-provider';
import type { z } from 'zod';
import type {
  RegistryRemote,
  RegistryRemoteType,
  RegistryServer,
  RegistryPreviewResponse,
} from './types';

/** The shape `MCPServerUserInputSchema` accepts in user-mode wizard (subset of MCPOptions). */
type ValidatedMCPOptions = z.infer<typeof MCPOptionsSchema>;

/**
 * Mode flag controls the validator used and which transports are
 * accepted. `user` mode is strict: stdio is rejected because running
 * arbitrary server-side processes for end-users is a security boundary
 * we don't want to cross in v1. `admin` mode allows stdio.
 */
export type AdapterMode = 'admin' | 'user';

export interface AdapterOptions {
  mode: AdapterMode;
  /** When multiple remotes are present, pick this index; defaults to "best". */
  preferredRemoteIndex?: number;
}

export interface AdapterSuccess {
  ok: true;
  preview: RegistryPreviewResponse;
}

export interface AdapterFailure {
  ok: false;
  error: string;
  /** HTTP status the route should return. 400 for client-fixable, 422 for upstream. */
  status: 400 | 422;
}

export type AdapterResult = AdapterSuccess | AdapterFailure;

const MAX_WARNING_LEN = 200;

function trimWarning(message: string): string {
  return message.length > MAX_WARNING_LEN ? `${message.slice(0, MAX_WARNING_LEN)}…` : message;
}

/**
 * Detect OAuth requirement from the registry entry. v0.1 of the
 * upstream schema does NOT carry an explicit OAuth metadata field, so
 * we apply the documented heuristic: a case-insensitive match of
 * "oauth", "authorize", or "auth flow" in the description.
 *
 * When the upstream schema grows an explicit field, replace this with
 * a check on that field. The function is exported so the client can
 * re-display the same badge from a cached preview response.
 */
export function detectOAuth(description: string | undefined): boolean {
  if (!description) return false;
  return /\boauth\b|\bauthorize\b|\bauth flow\b/i.test(description);
}

/**
 * Pick the "best" remote from a server entry. Priority:
 *   1. The index passed in `preferredRemoteIndex`, if valid.
 *   2. First `streamable-http` remote.
 *   3. First `sse` remote.
 *   4. First `websocket` remote.
 *   5. Fall back to remote[0] only if user explicitly asked for it.
 */
export function pickRemote(
  remotes: RegistryRemote[],
  preferredIndex?: number,
): RegistryRemote | null {
  if (remotes.length === 0) return null;
  if (
    typeof preferredIndex === 'number' &&
    preferredIndex >= 0 &&
    preferredIndex < remotes.length
  ) {
    return remotes[preferredIndex];
  }
  const byPriority: RegistryRemoteType[] = ['streamable-http', 'sse', 'websocket'];
  for (const want of byPriority) {
    const found = remotes.find((r) => r.type === want);
    if (found) return found;
  }
  // Last resort: any remote at all (might be a type we don't recognize).
  return remotes[0] ?? null;
}

function buildRemoteConfig(remote: RegistryRemote): Record<string, unknown> {
  const base: Record<string, unknown> = { type: remote.type, url: remote.url };
  if (remote.headers && Object.keys(remote.headers).length > 0) {
    base.headers = remote.headers;
  }
  return base;
}

/**
 * Main adapter entrypoint.
 *
 * On success, returns `{ ok: true, preview }` where `preview.config`
 * is a plain object suitable for JSON serialization. The caller MUST
 * validate `preview.config` against `MCPOptionsSchema` (or
 * `MCPServerUserInputSchema`) before trusting it.
 *
 * On failure, returns `{ ok: false, error, status }` with a human-
 * readable message the UI can surface verbatim.
 */
export function adaptRegistryServer(
  server: RegistryServer,
  options: AdapterOptions,
): AdapterResult {
  const warnings: string[] = [];
  const requiredEnvVars: string[] = [];

  const remotes = server.remotes ?? [];
  const packages = server.packages ?? [];

  if (packages.length > 0 && remotes.length === 0) {
    // Stdio-only package. Admin may install; user cannot.
    if (options.mode === 'user') {
      return {
        ok: false,
        status: 400,
        error:
          'This server only exposes stdio/local transport. Manual install required (admin only).',
      };
    }
    // Admin path: surface the package info but do not auto-convert.
    // The admin still has to author the command + args themselves.
    return {
      ok: false,
      status: 422,
      error: `Server exposes a ${packages[0]?.registryName ?? 'package'} package but no remote transport. Manual install required — see repository: ${server.repository?.url ?? 'n/a'}.`,
    };
  }

  const remote = pickRemote(remotes, options.preferredRemoteIndex);
  if (!remote) {
    return {
      ok: false,
      status: 422,
      error: 'No usable remote transport found in registry entry.',
    };
  }

  if (!isKnownTransport(remote.type)) {
    return {
      ok: false,
      status: 422,
      error: `Unsupported transport type: ${remote.type}.`,
    };
  }

  const config: Record<string, unknown> = buildRemoteConfig(remote);

  // Header values often reference ${ENV_VAR} placeholders. Surface
  // their names so the wizard can prompt for them.
  const headers = remote.headers ?? {};
  for (const key of Object.keys(headers)) {
    const value = headers[key];
    const matches = value.match(/\$\{([A-Z_][A-Z0-9_]*)\}/g);
    if (matches) {
      for (const m of matches) {
        const name = m.slice(2, -1);
        if (!requiredEnvVars.includes(name)) {
          requiredEnvVars.push(name);
        }
      }
    }
  }

  const oauthRequired = detectOAuth(server.description);
  if (oauthRequired) {
    config.oauth = {
      client_id: '',
      client_secret: '',
    };
    warnings.push(
      trimWarning(
        'OAuth detected from description. Fill client_id and client_secret in the editor before saving.',
      ),
    );
  }

  if (packages.length > 0) {
    warnings.push(
      trimWarning(
        `Server also exposes ${packages[0]?.registryName ?? 'a package'} package — only the remote was converted.`,
      ),
    );
  }

  // Best-effort validation. If the upstream shape ever diverges from
  // our assumptions, this is the line that surfaces it as a parse error
  // instead of an opaque "install failed" downstream.
  const parsed = MCPOptionsSchema.safeParse(config);
  if (!parsed.success) {
    return {
      ok: false,
      status: 422,
      error: `Converted config failed validation: ${parsed.error.issues
        .slice(0, 3)
        .map((i) => i.message)
        .join('; ')}`,
    };
  }

  return {
    ok: true,
    preview: {
      name: server.name,
      title: server.title ?? server.name,
      description: server.description ?? '',
      config: parsed.data satisfies ValidatedMCPOptions,
      requiredEnvVars,
      oauthRequired,
      warnings,
    },
  };
}

function isKnownTransport(type: string): type is RegistryRemoteType {
  return type === 'streamable-http' || type === 'sse' || type === 'websocket';
}