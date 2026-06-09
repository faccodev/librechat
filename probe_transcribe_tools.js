const http = require("http");

function call(opts, body, sid) {
  return new Promise((resolve, reject) => {
    const headers = { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body),
                      Accept: "application/json, text/event-stream" };
    if (sid) headers["mcp-session-id"] = sid;
    const req = http.request({ ...opts, method: "POST", headers }, (res) => {
      let b = ""; res.on("data", (c) => (b += c));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: b }));
    });
    req.on("error", reject); req.write(body); req.end();
  });
}

(async () => {
  const init = await call(
    { host: "mcp-transcribe", port: 8934, path: "/mcp" },
    JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize",
      params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "p", version: "0" } } })
  );
  const sid = init.headers["mcp-session-id"];
  console.log("init:", init.status, "sid:", sid?.slice(0, 8));

  const list = await call(
    { host: "mcp-transcribe", port: 8934, path: "/mcp" },
    JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list", params: {} }),
    sid
  );
  console.log("tools/list:", list.status);
  console.log("body:", list.body.slice(0, 600));

  // Send the initialized notification
  const notif = await call(
    { host: "mcp-transcribe", port: 8934, path: "/mcp" },
    JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }),
    sid
  );
  console.log("initialized notification:", notif.status);

  // Call list_models tool
  const lm = await call(
    { host: "mcp-transcribe", port: 8934, path: "/mcp" },
    JSON.stringify({ jsonrpc: "2.0", id: 3, method: "tools/call",
      params: { name: "list_models", arguments: {} } }),
    sid
  );
  console.log("list_models:", lm.status);
  console.log("body:", lm.body.slice(0, 800));
})();
