const http = require("http");
const data = JSON.stringify({
  jsonrpc: "2.0", id: 1, method: "initialize",
  params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "p", version: "0" } }
});
const req = http.request(
  { host: "mcp-transcribe", port: 8934, path: "/mcp", method: "POST",
    headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data),
               Accept: "application/json, text/event-stream" } },
  (res) => { let b = ""; res.on("data", (c) => (b += c));
    res.on("end", () => { console.log("STATUS", res.statusCode);
      console.log("HEADERS", JSON.stringify(res.headers));
      console.log("BODY", b.slice(0, 500)); process.exit(0); }); });
req.on("error", (e) => { console.error("ERR", e.message); process.exit(1); });
req.write(data); req.end();
