import { validateWorkspaceSubdir, getSafePaths, selectExecutor } from "./runner.js";

describe("validateWorkspaceSubdir", () => {
  it("accepts the empty subdir as the workspace root", () => {
    expect(validateWorkspaceSubdir("")).toBe(true);
  });

  it("accepts plain ASCII subdirs", () => {
    expect(validateWorkspaceSubdir("alice")).toBe(true);
    expect(validateWorkspaceSubdir("clients/bob-123_test")).toBe(true);
  });

  it("accepts subdirs with spaces and accented characters", () => {
    // The bug we are fixing: a user with a folder named
    // "Minha Pasta 文档" could not run code from inside it.
    expect(validateWorkspaceSubdir("Minha Pasta")).toBe(true);
    expect(validateWorkspaceSubdir("Minha Pasta/2024")).toBe(true);
    expect(validateWorkspaceSubdir("Cliente Ações")).toBe(true);
    expect(validateWorkspaceSubdir("文档/项目")).toBe(true);
    expect(validateWorkspaceSubdir("emoji 📁 folder")).toBe(true);
  });

  it("rejects `..` segments", () => {
    expect(validateWorkspaceSubdir("..")).toBe(false);
    expect(validateWorkspaceSubdir("../etc")).toBe(false);
    expect(validateWorkspaceSubdir("foo/../bar")).toBe(false);
    expect(validateWorkspaceSubdir("foo/..")).toBe(false);
  });

  it("rejects `.` segments", () => {
    expect(validateWorkspaceSubdir(".")).toBe(false);
    expect(validateWorkspaceSubdir("./foo")).toBe(false);
  });

  it("rejects shell metacharacters", () => {
    // The runner is invoked through child_process.execFile, but the
    // subdir is also used as a path segment in `path.join`, so we
    // conservatively reject anything that would let the agent split
    // the path or trigger a shell expansion.
    expect(validateWorkspaceSubdir("foo;rm -rf /")).toBe(false);
    expect(validateWorkspaceSubdir("foo|bar")).toBe(false);
    expect(validateWorkspaceSubdir("foo&bar")).toBe(false);
    expect(validateWorkspaceSubdir("foo$bar")).toBe(false);
    expect(validateWorkspaceSubdir("foo`bar`")).toBe(false);
    expect(validateWorkspaceSubdir("foo<bar")).toBe(false);
    expect(validateWorkspaceSubdir("foo>bar")).toBe(false);
    expect(validateWorkspaceSubdir("foo\\bar")).toBe(false);
    expect(validateWorkspaceSubdir("foo'bar")).toBe(false);
    expect(validateWorkspaceSubdir('foo"bar')).toBe(false);
  });

  it("rejects control characters", () => {
    expect(validateWorkspaceSubdir("foo\nbar")).toBe(false);
    expect(validateWorkspaceSubdir("foo\rbar")).toBe(false);
    expect(validateWorkspaceSubdir("foo\x00bar")).toBe(false);
    expect(validateWorkspaceSubdir("foo\tbar")).toBe(false);
  });
});

describe("getSafePaths", () => {
  it("resolves the empty subdir to the workspaces root", () => {
    const { containerPath, hostPath } = getSafePaths("");
    expect(containerPath).toBe("/workspaces");
    expect(hostPath).toBe("/workspaces");
  });

  it("preserves spaces and accented characters in the path", () => {
    const { containerPath, hostPath } = getSafePaths("Minha Pasta");
    expect(containerPath).toBe("/workspaces/Minha Pasta");
    // hostPath uses forward slashes for docker mount compatibility.
    expect(hostPath).toBe("/workspaces/Minha Pasta");
  });

  it("preserves nested paths", () => {
    const { containerPath, hostPath } = getSafePaths("Minha Pasta/2024/docs");
    expect(containerPath).toBe("/workspaces/Minha Pasta/2024/docs");
    expect(hostPath).toBe("/workspaces/Minha Pasta/2024/docs");
  });

  it("throws on path traversal", () => {
    expect(() => getSafePaths("../etc")).toThrow();
    expect(() => getSafePaths("foo/../bar")).toThrow();
  });

  it("throws on shell metacharacters", () => {
    expect(() => getSafePaths("foo;rm")).toThrow();
  });
});

describe("selectExecutor", () => {
  // Env-driven config is read once at module load. These tests use the
  // module's default behavior (no overrides set in jest env).
  const ORIGINAL_ENV = { ...process.env };

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("maps node -> node runner image + node command", () => {
    const spec = selectExecutor("node");
    expect(spec.image).toBe("mcp-runner-node:latest");
    expect(spec.command("/tmp/x.js")).toEqual(["node", "/tmp/x.js"]);
  });

  it("maps python -> python runner image + python command", () => {
    const spec = selectExecutor("python");
    expect(spec.image).toBe("mcp-runner-python:latest");
    expect(spec.command("/tmp/x.py")).toEqual(["python", "/tmp/x.py"]);
  });

  it("maps sh -> alpine runner image + sh command", () => {
    const spec = selectExecutor("sh");
    expect(spec.image).toBe("mcp-runner-alpine:latest");
    expect(spec.command("/tmp/x.sh")).toEqual(["sh", "/tmp/x.sh"]);
  });

  it("falls back to sh when given an unknown language", () => {
    // Cast through unknown so TS doesn't reject the bad input at compile time —
    // the function is meant to be defensive at runtime.
    const spec = selectExecutor("ruby" as unknown as "sh");
    expect(spec.image).toBe("mcp-runner-alpine:latest");
  });

  it("honours RUNNER_IMAGE_NODE override", () => {
    process.env.RUNNER_IMAGE_NODE = "ghcr.io/me/custom-node:1.2.3";
    // Re-import the module so the top-level const picks up the new env.
    let spec;
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { selectExecutor: fresh } = require("./runner.js") as typeof import("./runner.js");
      spec = fresh("node");
    });
    expect(spec!.image).toBe("ghcr.io/me/custom-node:1.2.3");
  });
});
