import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import express from "express";
import { randomUUID } from "crypto";
import { TOOLS, handleCallTool } from "./tools.js";

const PORT = process.env.PORT || 8932;

type Session = { server: Server; transport: StreamableHTTPServerTransport };

const sessions = new Map<string, Session>();

/** Build a fresh MCP Server + StreamableHTTPServerTransport pair for one session.
 *
 * The MCP SDK's `Server` allows only one connected transport at a time. Earlier
 * revisions of this file reused a module-level Server singleton and just
 * swapped transports, which crashed on every request without an
 * ``mcp-session-id`` header with ``Error: Already connected to a transport``.
 * The fix is to pair a new Server with each new transport and tear both down
 * together when the session closes.
 */
function createSession(): Session {
  const server = new Server(
    { name: "mcp-code-runner", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));
  server.setRequestHandler(CallToolRequestSchema, async (request) => handleCallTool(request));

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID()
  });

  return { server, transport };
}

const app = express();

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", service: "mcp-code-runner" });
});

app.all("*", async (req, res) => {
  const sid = req.headers["mcp-session-id"] as string | undefined;
  let session = sid ? sessions.get(sid) : undefined;

  if (!session) {
    session = createSession();
    await session.server.connect(session.transport);
    session.transport.onclose = () => {
      if (session?.transport.sessionId) {
        console.log(`Session closed: ${session.transport.sessionId}`);
        sessions.delete(session.transport.sessionId);
      }
    };
  }

  try {
    await session.transport.handleRequest(req, res);

    const newSid = session.transport.sessionId;
    if (newSid && !sessions.has(newSid)) {
      sessions.set(newSid, session);
    }
  } catch (error) {
    console.error("Error handling request in streamable-http handler:", error);
    if (!res.headersSent) {
      res.status(500).send("Internal Server Error");
    }
    // Tear the session down so the next request gets a fresh Server+Transport
    // pair. Without this, a single failed call would leave the transport in a
    // half-open state and poison every subsequent request on this session.
    if (session.transport.sessionId) {
      sessions.delete(session.transport.sessionId);
    }
    try {
      await session.transport.close();
    } catch {
      // transport.close() can throw if it never finished initializing; safe to ignore.
    }
  }
});

app.listen(PORT, () => {
  console.log(`MCP Code Runner Server is listening on port ${PORT}`);
  console.log(`Streamable-HTTP endpoint available at http://localhost:${PORT}/sse`);
});
