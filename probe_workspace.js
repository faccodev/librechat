const fs = require("fs").promises;
const path = require("path");

(async () => {
  const relPath = "workspace";
  const workspacePath = "/workspaces";
  const abs = path.resolve(workspacePath, relPath);
  console.log("abs:", abs);
  try {
    const stat = await fs.stat(abs);
    console.log("stat:", stat.isDirectory(), "size:", stat.size);
  } catch (e) {
    console.log("stat ERR:", e.code, e.message);
  }
  try {
    const items = await fs.readdir(abs, { withFileTypes: true });
    console.log("readdir ok:", items.length, "items");
  } catch (e) {
    console.log("readdir ERR:", e.code, e.message);
  }
})();
