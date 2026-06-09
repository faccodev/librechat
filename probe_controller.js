// Reproduce what the controller does, but without auth
const { listWorkspaceTree } = require("/app/node_modules/@librechat/api/dist/files/workspaceFiles.js");
const path = require("path");
process.chdir("/app");

(async () => {
  try {
    const result = await listWorkspaceTree({
      appConfig: { paths: { uploads: "/app/uploads" } },
      user: { workspaceSubdir: null },
      relPath: "workspace",
    });
    console.log("result:", JSON.stringify(result, null, 2).slice(0, 500));
  } catch (e) {
    console.log("ERR:", e.code, e.message, e.status);
    console.log("cause:", e.cause?.code, e.cause?.message);
  }
})();
