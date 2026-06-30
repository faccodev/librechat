import { execFile } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { getWorkspaceRoots, validateWorkspacePathAgainstRoots } from './projectContext.js';
import { getCurrentProjectContext, type ProjectContext } from './context.js';

const CONTAINER_WORKSPACES_BASE = process.env.WORKSPACES_BASE || '/workspaces';
const HOST_WORKSPACES_BASE = process.env.HOST_WORKSPACES_BASE || '/workspaces';
const MAX_TIMEOUT = parseInt(process.env.MAX_TIMEOUT || '120', 10);
const RUNNER_MEMORY = process.env.RUNNER_MEMORY || '256m';
const RUNNER_CPUS = process.env.RUNNER_CPUS || '0.5';

// Per-language executor images. Defaults are local images built from
// `packages/mcp-workspace/executors/Dockerfile.*`, which extend the upstream
// base images with `git` pre-installed. Override any of these to plug in your
// own image (e.g. one with extra tools baked in).
//
// Why a local image instead of `git clone && git install` at runtime:
//   - The runner spawns a FRESH executor container per `run_code` / `run_file`
//     call. Installing git on every call would add seconds of apt/apk time
//     and dozens of MB of repeated network traffic.
//   - The executor containers are ephemeral (`--rm`), so runtime `apk add`
//     does not persist between calls.
const RUNNER_IMAGE_DEFAULT = process.env.RUNNER_IMAGE_DEFAULT || 'mcp-runner-alpine:latest';
const RUNNER_IMAGE_NODE = process.env.RUNNER_IMAGE_NODE || 'mcp-runner-node:latest';
const RUNNER_IMAGE_PYTHON = process.env.RUNNER_IMAGE_PYTHON || 'mcp-runner-python:latest';

/**
 * Allow only safe characters in workspace subdirectories.
 *
 * The previous regex `/^[a-zA-Z0-9_\-\/]+$/` rejected spaces, accented
 * characters (á, ã, ç, ...), CJK ideographs, and emoji — so a user with
 * a folder like `Minha Pasta 文档` could not run code from inside it.
 *
 * What's still rejected here:
 *  - empty / whitespace-only
 *  - any path segment that is exactly `.` or `..`
 *  - control characters (NUL, newline, etc.) which would let an
 *    attacker split the path into multiple arguments
 *  - characters that the shell would interpret as redirection or
 *    quoting (`\0`, `\n`, `\r`, `|`, `&`, `;`, `>`, `<`, `$`, `` ` ``,
 *    `\`, `"`, `'`)
 *
 * Forward slash and backslash are allowed so that nested subdirs work.
 * The cross-platform check below also enforces that the resolved path
 * stays inside `CONTAINER_WORKSPACES_BASE`.
 */
// eslint-disable-next-line no-control-regex -- intentional: NUL/C0/C1 + DEL are rejected as path chars
const FORBIDDEN_CHARS = /[\x00-\x1f\x7f|;&><$`\\"']/;

export function validateWorkspaceSubdir(subdir: string): boolean {
  if (!subdir) return true;
  const parts = subdir.split(/[\\/]/);
  if (subdir.includes('..') || parts.includes('.') || parts.includes('..')) {
    return false;
  }
  if (FORBIDDEN_CHARS.test(subdir)) {
    return false;
  }
  return true;
}

/**
 * Resolve the workspace subdir (or, when a project context supplies an
 * explicit canonical path, that path) into the (container, host) pair
 * the runner mounts. `explicitWorkspacePath` is the layer-3 input
 * from the server-validated `X-Project-Context.workspacePath` — when
 * present, it bypasses the per-user `workspaceSubdir` entirely so the
 * runner operates on the project root the admin approved, not on a
 * subdir picked by the agent at call time.
 *
 * Defence in depth (AD-2 layer 3): the explicit path is re-validated
 * against the current `WORKSPACE_ROOTS` here, in the runner process,
 * not just on the API server. The two layers can disagree if the admin
 * narrows the allowlist mid-conversation — the runner's view wins
 * because that's the host path the docker `--rm` mount is about to
 * bind.
 *
 * Asynchronous because `validateWorkspacePathAgainstRoots` calls
 * `fs.realpath` (kills symlink escape). The previous sync version of
 * this function was already a one-shot call per `run_code`, so the
 * added `await` does not change the throughput profile.
 */
export async function getSafePaths(
  subdir: string,
  explicitWorkspacePath?: string,
): Promise<{ containerPath: string; hostPath: string }> {
  if (explicitWorkspacePath) {
    const canonical = await validateWorkspacePathAgainstRoots(
      explicitWorkspacePath,
      getWorkspaceRoots(),
    );

    // CONTAINER side — the docker container is always Linux, so use
    // POSIX-style composition regardless of the host OS. Convert
    // backslashes from a Windows host so the comparison stays clean.
    const containerWorkspacePath = canonical.replace(/\\/g, '/');

    // HOST side — also convert to forward slashes for docker-mount
    // compatibility. Without this, a Windows host would emit a
    // `docker -v C:\path\:/workspace` flag and Docker Desktop
    // (which expects forward slashes) would fail to bind. Keeping
    // both sides identical also makes downstream code (label
    // matching, log formatting) simpler — callers can compare
    // `containerPath === hostPath` to detect a "no override"
    // situation.
    const hostWorkspacePath = canonical.replace(/\\/g, '/');

    return { containerPath: containerWorkspacePath, hostPath: hostWorkspacePath };
  }

  if (!validateWorkspaceSubdir(subdir)) {
    throw new Error('Invalid or unsafe workspace subdirectory name');
  }

  // CONTAINER path for writing temp files. Container path is always
  // POSIX-style regardless of host OS, because the docker container
  // runs Linux. We compose it manually with forward slashes so a
  // Windows host (where `path.resolve('/workspaces', 'Minha Pasta')`
  // would prepend a drive letter and break the comparison) still
  // produces a clean `/workspaces/Minha Pasta` string.
  const containerWorkspacePath = posixResolve(CONTAINER_WORKSPACES_BASE, subdir);
  // Ensure no directory traversal past the workspace root.
  const normBase = posixNormalizeTrailingSlash(CONTAINER_WORKSPACES_BASE);
  const normResolved = posixNormalizeTrailingSlash(containerWorkspacePath);
  if (!normResolved.startsWith(normBase)) {
    throw new Error('Directory traversal detected in container path');
  }

  // HOST path for Docker volume mounting. Use the host's path module
  // (so the docker -v flag sees the right separator on Windows), then
  // convert backslashes to forward slashes for docker-mount
  // compatibility.
  let hostWorkspacePath = path.join(HOST_WORKSPACES_BASE, subdir);
  hostWorkspacePath = hostWorkspacePath.replace(/\\/g, '/');

  return {
    containerPath: containerWorkspacePath,
    hostPath: hostWorkspacePath,
  };
}

/** POSIX-style path resolution, ignoring the host OS. */
function posixResolve(base: string, subdir: string): string {
  const trimmedBase = base.replace(/\/+$/, '') || '/';
  const trimmedSub = subdir.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!trimmedSub) {
    return trimmedBase;
  }
  return `${trimmedBase}/${trimmedSub}`;
}

function posixNormalizeTrailingSlash(p: string): string {
  return p.endsWith('/') ? p : p + '/';
}

/**
 * Resolve a user-supplied filename into a path that is guaranteed to
 * stay inside the workspace. Throws on path traversal, embedded NULs,
 * or absolute paths that escape the workspace.
 *
 * The check happens *after* a single normalization pass so the result
 * is the canonical form the runner will actually use — different from
 * the old "replace leading `..` then check for `..` anywhere" two-step
 * which let some Unicode-normalized paths slip through.
 *
 * Cross-platform note: `workspaceContainerPath` may arrive in POSIX
 * form (when the `explicitWorkspacePath` branch in `getSafePaths`
 * composes the container-side path with forward slashes regardless
 * of host OS) while `path.resolve` on Windows returns the host's
 * native backslash form. Normalise both to a single separator
 * before the startsWith check so the comparison survives a
 * `/workspaces/foo` (POSIX) vs `\workspaces\foo` (Windows) pair
 * — otherwise a host-Windows runner rejects every file inside a
 * project-bound workspace.
 */
function resolveSafeFilePath(workspaceContainerPath: string, fileName: string): string {
  if (typeof fileName !== 'string' || fileName.length === 0) {
    throw new Error('Filename is required');
  }
  if (fileName.includes('\0')) {
    throw new Error('Filename contains a NUL byte');
  }
  // Reject absolute paths. The runner is meant to operate on files
  // inside the user's workspace; absolute paths would let the agent
  // escape into the runner container's filesystem.
  if (path.isAbsolute(fileName)) {
    throw new Error('Absolute paths are not allowed; use a path relative to the workspace');
  }
  const resolved = path.resolve(workspaceContainerPath, fileName);
  const baseForCompare = workspaceContainerPath.replace(/[\\/]+/g, '/');
  const resolvedForCompare = resolved.replace(/[\\/]+/g, '/');
  const normBase = baseForCompare.endsWith('/') ? baseForCompare : baseForCompare + '/';
  const normResolved = resolvedForCompare.endsWith('/')
    ? resolvedForCompare
    : resolvedForCompare + '/';
  if (!normResolved.startsWith(normBase)) {
    throw new Error('Path traversal detected: file escapes the workspace directory');
  }
  return resolved;
}

export interface RunResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTimeMs: number;
}

type ExecutorSpec = {
  image: string;
  command: (tempFile: string) => string[];
};

/**
 * Map a requested language to the (image, command) pair used to run it inside
 * the ephemeral executor container. Single source of truth — both `runCode` and
 * `runFile` go through this so the image/command wiring can never drift.
 */
export function selectExecutor(language: 'node' | 'python' | 'sh'): ExecutorSpec {
  switch (language) {
    case 'node':
      return {
        image: RUNNER_IMAGE_NODE,
        command: (f) => ['node', f],
      };
    case 'python':
      return {
        image: RUNNER_IMAGE_PYTHON,
        command: (f) => ['python', f],
      };
    case 'sh':
    default:
      return {
        image: RUNNER_IMAGE_DEFAULT,
        command: (f) => ['sh', f],
      };
  }
}

/**
 * Build the docker argv. Returns an array of strings (no shell) so
 * paths with spaces, quotes, or `$`-variables are passed verbatim to
 * the `docker` binary. The caller is responsible for invoking
 * `execFile` (not `exec`).
 *
 * `projectId` adds `--label project=<id>` to the spawned container so
 * an admin can audit a project's executions with
 * `docker ps --filter label=project=<id>` or clean them up with
 * `docker rm -f $(docker ps -aq --filter label=project=<id>)`. The
 * label is the only audit signal per-container the runner emits —
 * keeping it opt-in (only when a project context exists) avoids
 * polluting `docker ps` with empty-label rows for the no-project
 * case, which is the common state outside a project-bound chat.
 */
function buildDockerArgs(opts: {
  hostPath: string;
  image: string;
  commandArgs: string[];
  projectId?: string;
}): string[] {
  const args: string[] = [
    'run',
    '--rm',
    '--network=none',
    `--memory=${RUNNER_MEMORY}`,
    `--cpus=${RUNNER_CPUS}`,
    '-v',
    `${opts.hostPath}:/workspace`,
    '-w',
    '/workspace',
  ];
  if (opts.projectId) {
    // Defense-in-depth: the id has already been through
    // `parseProjectContextHeader` shape-validation on the wire, but
    // we still guard against shell-metacharacter smuggling here
    // because the docker CLI parses the value as a label. A label
    // value can contain anything except whitespace; an id is a
    // Mongo ObjectId by convention, so the safe subset is enough.
    const safeId = opts.projectId.replace(/[^\w.-]/g, '');
    if (safeId) {
      args.push('--label', `project=${safeId}`);
    }
  }
  args.push(opts.image, ...opts.commandArgs);
  return args;
}

export async function runCode(
  language: 'node' | 'python' | 'sh',
  code: string,
  workspaceSubdir: string,
  timeoutSeconds: number = 30,
  projectContext?: ProjectContext | null,
): Promise<RunResult> {
  const finalTimeout = Math.min(timeoutSeconds, MAX_TIMEOUT);
  /** Fall back to the per-request ALS-bound context when the caller
   *  didn't pass one explicitly — keeps the legacy 4-arg call sites
   *  (e.g. direct CLI invocations and unit tests) working without
   *  threading the context through every helper. */
  const ctx = projectContext ?? getCurrentProjectContext();
  const { containerPath, hostPath } = await getSafePaths(workspaceSubdir, ctx?.workspacePath);

  // Ensure directory exists
  await fs.mkdir(containerPath, { recursive: true });

  const rand = crypto.randomBytes(8).toString('hex');
  const languageExtensions: Record<string, string> = {
    node: 'js',
    python: 'py',
    sh: 'sh',
  };
  const ext = languageExtensions[language] ?? 'sh';
  const tempFileName = `.mcp_temp_${rand}.${ext}`;
  const tempFilePath = path.join(containerPath, tempFileName);

  // Write code to temp file
  await fs.writeFile(tempFilePath, code, 'utf-8');

  const { image, command } = selectExecutor(language);
  const dockerArgs = buildDockerArgs({
    hostPath,
    image,
    commandArgs: command(tempFileName),
    projectId: ctx?.projectId,
  });
  const startTime = Date.now();

  return new Promise<RunResult>((resolve) => {
    const _process = execFile(
      'docker',
      dockerArgs,
      { timeout: finalTimeout * 1000, killSignal: 'SIGKILL' },
      async (error, stdout, stderr) => {
        const executionTimeMs = Date.now() - startTime;
        let exitCode = 0;

        if (error) {
          exitCode = typeof error.code === 'number' ? error.code : 1;
          if (error.killed) {
            stderr += `\n[MCP Code Runner] Execution killed due to timeout (${finalTimeout}s)`;
          }
        }

        // Clean up temp file
        try {
          await fs.unlink(tempFilePath);
        } catch (_cleanupErr) {
          // ignore clean up errors
        }

        resolve({
          stdout,
          stderr,
          exitCode,
          executionTimeMs,
        });
      },
    );
  });
}

export async function runFile(
  fileName: string,
  workspaceSubdir: string,
  language?: 'node' | 'python' | 'sh',
  timeoutSeconds: number = 30,
  projectContext?: ProjectContext | null,
): Promise<RunResult> {
  const finalTimeout = Math.min(timeoutSeconds, MAX_TIMEOUT);
  const ctx = projectContext ?? getCurrentProjectContext();
  const { containerPath, hostPath } = await getSafePaths(workspaceSubdir, ctx?.workspacePath);

  // Validate filename to prevent escaping the workspace directory.
  // `resolveSafeFilePath` is the single source of truth — it normalizes
  // once and then checks the resolved path stays inside the workspace.
  const safeFile = resolveSafeFilePath(containerPath, fileName);

  // Detect language if not provided
  let lang = language;
  if (!lang) {
    if (fileName.endsWith('.js') || fileName.endsWith('.ts')) lang = 'node';
    else if (fileName.endsWith('.py')) lang = 'python';
    else if (fileName.endsWith('.sh')) lang = 'sh';
    else lang = 'sh'; // fallback
  }

  const { image, command } = selectExecutor(lang);
  const dockerArgs = buildDockerArgs({
    hostPath,
    image,
    commandArgs: command(safeFile),
    projectId: ctx?.projectId,
  });
  const startTime = Date.now();

  return new Promise<RunResult>((resolve) => {
    const _process = execFile(
      'docker',
      dockerArgs,
      { timeout: finalTimeout * 1000, killSignal: 'SIGKILL' },
      async (error, stdout, stderr) => {
        const executionTimeMs = Date.now() - startTime;
        let exitCode = 0;

        if (error) {
          exitCode = typeof error.code === 'number' ? error.code : 1;
          if (error.killed) {
            stderr += `\n[MCP Code Runner] Execution killed due to timeout (${finalTimeout}s)`;
          }
        }

        resolve({
          stdout,
          stderr,
          exitCode,
          executionTimeMs,
        });
      },
    );
  });
}
