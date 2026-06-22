import { CallToolRequest } from "@modelcontextprotocol/sdk/types.js";
import { getCurrentProjectContext } from "./context.js";
import { runCode, runFile } from "./runner.js";

/**
 * Description block appended to every code-runner tool. It tells the
 * agent how paths work so it stops guessing: the `workspaceSubdir` is
 * the per-user folder inside `/workspaces`, paths with spaces are
 * fine (passed verbatim to the container), and the runner enforces
 * sandboxing so the agent doesn't need to worry about quoting.
 */
const WORKSPACE_HINT =
  "Paths: every argument is a path *relative to* the user's workspaceSubdir " +
  "(which is mounted at /workspace inside the Docker container). " +
  "Spaces, accented characters, CJK, and emoji in path segments are all supported " +
  "and must be passed verbatim — do NOT url-encode, escape, or substitute them. " +
  "Empty workspaceSubdir means the workspace root (/workspaces itself). " +
  "Absolute paths and `..` traversal are rejected by the runner for safety.";

/**
 * Description block that tells the agent it can run `git` CLI directly
 * via `run_code`/`run_file` — no need to fall back to the `github` MCP
 * (which only exposes the REST API and cannot create a local working
 * copy). The executor image bakes git in via `apk add git`, so `git
 * clone`, `git pull`, `git checkout`, `git status`, `git log`, `git
 * diff`, `git add`, `git commit`, `git push` are all available. Auth
 * piggybacks on the user's `GITHUB_PERSONAL_ACCESS_TOKEN` env var when
 * the runner container inherits it from the api container; otherwise
 * embed the token in the clone URL using the
 * `https://x-access-token:<PAT>@github.com/owner/repo.git` form.
 */
const GIT_HINT =
  "Git CLI is pre-installed in the executor (apk add git in the alpine image). " +
  "Use language: \"sh\" + a single git invocation per call — e.g. " +
  "\"git clone https://github.com/owner/repo.git\", " +
  "\"git -C /workspace/repo pull\", \"git -C /workspace/repo checkout -b feat/x\", " +
  "\"git -C /workspace/repo status\", \"git -C /workspace/repo log --oneline -n 20\". " +
  "For HTTPS auth, embed a personal access token in the clone URL as " +
  "\"https://x-access-token:<PAT>@github.com/owner/repo.git\" — do NOT prompt the user " +
  "for credentials. Do NOT use the `github` MCP for clone/checkout/pull/commit/push; " +
  "that MCP only wraps the REST API and has no working-copy operations.";

export const TOOLS = [
  {
    name: "run_code",
    description:
      "Executes a block of Node.js, Python, or Shell code inside an isolated Docker container " +
      "scoped to the user's workspace directory. " +
      WORKSPACE_HINT +
      " " +
      GIT_HINT,
    inputSchema: {
      type: "object",
      properties: {
        language: {
          type: "string",
          enum: ["node", "python", "sh"],
          description: "The execution language environment to run the code in."
        },
        code: {
          type: "string",
          description: "The source code or script content to run."
        },
        workspaceSubdir: {
          type: "string",
          description:
            "The subdirectory of /workspaces where the code's file I/O will be scoped. " +
            "Pass the same value the user has configured in their profile (or empty string for the " +
            "workspace root). The runner mounts that folder at /workspace inside the container."
        },
        timeout: {
          type: "number",
          description: "Execution timeout in seconds. Defaults to 30, max 120.",
          minimum: 1,
          maximum: 120
        }
      },
      required: ["language", "code", "workspaceSubdir"]
    }
  },
  {
    name: "run_file",
    description:
      "Executes an existing script file in the user's workspace directory. " +
      WORKSPACE_HINT +
      " " +
      GIT_HINT,
    inputSchema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          description:
            "Path of the file to execute, relative to the workspaceSubdir. " +
            "Nested paths like 'scripts/run.sh' or 'Minha Pasta/main.py' are supported verbatim."
        },
        workspaceSubdir: {
          type: "string",
          description:
            "The subdirectory of /workspaces where the file is located. " +
            "Pass the same value the user has configured in their profile (or empty string for the " +
            "workspace root)."
        },
        language: {
          type: "string",
          enum: ["node", "python", "sh"],
          description: "Optional. The runtime environment. If not provided, it will be inferred from the file extension."
        },
        timeout: {
          type: "number",
          description: "Execution timeout in seconds. Defaults to 30, max 120.",
          minimum: 1,
          maximum: 120
        }
      },
      required: ["file", "workspaceSubdir"]
    }
  }
];

export async function handleCallTool(request: CallToolRequest) {
  const { name, arguments: args } = request.params;

  if (!args) {
    throw new Error("Missing tool arguments");
  }

  try {
    switch (name) {
      case "run_code": {
        const { language, code, workspaceSubdir, timeout } = args as {
          language: "node" | "python" | "sh";
          code: string;
          workspaceSubdir: string;
          timeout?: number;
        };

        // An empty / undefined workspaceSubdir is intentionally allowed: it
        // means "run in the default workspace root" (i.e. /workspaces itself).
        // Safety (no path traversal, no `..`) is enforced inside
        // runner.getSafePaths -> validateWorkspaceSubdir, which throws a
        // clear error if the value is malicious.

        const result = await runCode(
          language,
          code,
          workspaceSubdir,
          timeout,
          getCurrentProjectContext(),
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2)
            }
          ],
          isError: result.exitCode !== 0
        };
      }
      case "run_file": {
        const { file, workspaceSubdir, language, timeout } = args as {
          file: string;
          workspaceSubdir: string;
          language?: "node" | "python" | "sh";
          timeout?: number;
        };

        // See run_code above — empty workspaceSubdir means "default root".

        const result = await runFile(
          file,
          workspaceSubdir,
          language,
          timeout,
          getCurrentProjectContext(),
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2)
            }
          ],
          isError: result.exitCode !== 0
        };
      }

      default:
        throw new Error(`Tool not found: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [{ type: "text", text: `Error executing tool: ${error.message}` }],
      isError: true
    };
  }
}
