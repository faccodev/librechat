import { validateWorkspaceSubdir, getSafePaths } from "./runner";

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
