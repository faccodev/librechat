import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const CONTAINER_WORKSPACES_BASE = process.env.WORKSPACES_BASE || "/workspaces";
const HOST_WORKSPACES_BASE = process.env.HOST_WORKSPACES_BASE || "/workspaces";
const MAX_TIMEOUT = parseInt(process.env.MAX_TIMEOUT || "120", 10);

export function validateWorkspaceSubdir(subdir: string): boolean {
  if (!subdir) return true;
  const parts = subdir.split(/[\\/]/);
  if (subdir.includes("..") || parts.includes(".") || parts.includes("..")) {
    return false;
  }
  const safeRegex = /^[a-zA-Z0-9_\-\/]+$/;
  return safeRegex.test(subdir);
}

export function getSafePaths(subdir: string) {
  if (!validateWorkspaceSubdir(subdir)) {
    throw new Error("Invalid or unsafe workspace subdirectory name");
  }

  // CONTAINER path for writing temp files
  const containerWorkspacePath = path.resolve(CONTAINER_WORKSPACES_BASE, subdir);
  // Ensure no directory traversal
  const normBase = CONTAINER_WORKSPACES_BASE.endsWith(path.sep) ? CONTAINER_WORKSPACES_BASE : CONTAINER_WORKSPACES_BASE + path.sep;
  const normResolved = containerWorkspacePath.endsWith(path.sep) ? containerWorkspacePath : containerWorkspacePath + path.sep;
  if (!normResolved.startsWith(normBase)) {
    throw new Error("Directory traversal detected in container path");
  }

  // HOST path for Docker volume mounting
  // Since HOST might be Windows or Linux, we use path.posix or path.win32 accordingly if needed,
  // but a simple join/replace for forward slashes works well in docker mounts.
  let hostWorkspacePath = path.join(HOST_WORKSPACES_BASE, subdir);
  // Convert backslashes to forward slashes for docker mount compatibility if host is Windows
  hostWorkspacePath = hostWorkspacePath.replace(/\\/g, "/");

  return {
    containerPath: containerWorkspacePath,
    hostPath: hostWorkspacePath
  };
}

export interface RunResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTimeMs: number;
}

export async function runCode(
  language: "node" | "python" | "sh",
  code: string,
  workspaceSubdir: string,
  timeoutSeconds: number = 30
): Promise<RunResult> {
  const finalTimeout = Math.min(timeoutSeconds, MAX_TIMEOUT);
  const { containerPath, hostPath } = getSafePaths(workspaceSubdir);

  // Ensure directory exists
  await fs.mkdir(containerPath, { recursive: true });

  const rand = crypto.randomBytes(8).toString("hex");
  const ext = language === "node" ? "js" : language === "python" ? "py" : "sh";
  const tempFileName = `.mcp_temp_${rand}.${ext}`;
  const tempFilePath = path.join(containerPath, tempFileName);

  // Write code to temp file
  await fs.writeFile(tempFilePath, code, "utf-8");

  let image = "alpine:latest";
  let cmd = `sh ${tempFileName}`;

  if (language === "node") {
    image = "node:20-alpine";
    cmd = `node ${tempFileName}`;
  } else if (language === "python") {
    image = "python:3.12-slim";
    cmd = `python ${tempFileName}`;
  }

  // Build the docker command
  // --rm: Remove container after run
  // --network=none: Disable internet access
  // --memory=256m: Limit memory
  // --cpus=0.5: Limit CPU
  // -v: Mount host workspace path to container's /workspace
  // -w: Set working directory to /workspace
  const dockerCmd = `docker run --rm --network=none --memory=256m --cpus=0.5 -v "${hostPath}":/workspace -w /workspace ${image} ${cmd}`;

  const startTime = Date.now();

  return new Promise<RunResult>((resolve) => {
    const process = exec(
      dockerCmd,
      { timeout: finalTimeout * 1000, killSignal: "SIGKILL" },
      async (error, stdout, stderr) => {
        const executionTimeMs = Date.now() - startTime;
        let exitCode = 0;

        if (error) {
          exitCode = error.code ?? 1;
          if (error.killed) {
            stderr += `\n[MCP Code Runner] Execution killed due to timeout (${finalTimeout}s)`;
          }
        }

        // Clean up temp file
        try {
          await fs.unlink(tempFilePath);
        } catch (cleanupErr) {
          // ignore clean up errors
        }

        resolve({
          stdout,
          stderr,
          exitCode,
          executionTimeMs
        });
      }
    );
  });
}

export async function runFile(
  fileName: string,
  workspaceSubdir: string,
  language?: "node" | "python" | "sh",
  timeoutSeconds: number = 30
): Promise<RunResult> {
  const finalTimeout = Math.min(timeoutSeconds, MAX_TIMEOUT);
  const { containerPath, hostPath } = getSafePaths(workspaceSubdir);

  // Validate filename to prevent escaping the workspace directory
  const safeFile = path.normalize(fileName).replace(/^(\.\.(\/|\\|$))+/, "");
  if (safeFile.includes("..")) {
    throw new Error("Invalid or unsafe filename path traversal");
  }

  // Detect language if not provided
  let lang = language;
  if (!lang) {
    if (fileName.endsWith(".js") || fileName.endsWith(".ts")) lang = "node";
    else if (fileName.endsWith(".py")) lang = "python";
    else if (fileName.endsWith(".sh")) lang = "sh";
    else lang = "sh"; // fallback
  }

  let image = "alpine:latest";
  let cmd = `sh "${safeFile}"`;

  if (lang === "node") {
    image = "node:20-alpine";
    cmd = `node "${safeFile}"`;
  } else if (lang === "python") {
    image = "python:3.12-slim";
    cmd = `python "${safeFile}"`;
  }

  const dockerCmd = `docker run --rm --network=none --memory=256m --cpus=0.5 -v "${hostPath}":/workspace -w /workspace ${image} ${cmd}`;

  const startTime = Date.now();

  return new Promise<RunResult>((resolve) => {
    const process = exec(
      dockerCmd,
      { timeout: finalTimeout * 1000, killSignal: "SIGKILL" },
      async (error, stdout, stderr) => {
        const executionTimeMs = Date.now() - startTime;
        let exitCode = 0;

        if (error) {
          exitCode = error.code ?? 1;
          if (error.killed) {
            stderr += `\n[MCP Code Runner] Execution killed due to timeout (${finalTimeout}s)`;
          }
        }

        resolve({
          stdout,
          stderr,
          exitCode,
          executionTimeMs
        });
      }
    );
  });
}
