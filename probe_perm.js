try {
  const fs = require("fs");
  const items = fs.readdirSync("/workspaces/workspace");
  console.log("ok", items);
} catch (e) {
  console.log("ERR code:", e.code, "message:", e.message);
}
