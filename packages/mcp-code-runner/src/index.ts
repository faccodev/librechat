import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import express from "express";
import { randomUUID } from "crypto";
import { TOOLS, handleCallTool } from "./tools.js";

const PORT = process.env.PORT || 8932;

// Create the MCP server
const server = new Server(
  {
    name: "mcp-code-runner",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// Register list tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS
  };
});

// Register call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  return handleCallTool(request);
});

const sessions = new Map<string, StreamableHTTPServerTransport>();

const app = express();

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "mcp-code-runner" });
});

// Capture all other routes for MCP streamable-http transport
app.all("*", async (req, res) => {
  try {
    const sid = req.headers["mcp-session-id"] as string | undefined;
    let transport = sid ? sessions.get(sid) : undefined;

    if (!transport) {
      transport = new StreamableHTTPServerTransport({ sessionIdGenerator: () => randomUUID() });
      await server.connect(transport);
    }

    await transport.handleRequest(req, res);

    if (transport.sessionId && !sessions.has(transport.sessionId)) {
      sessions.set(transport.sessionId, transport);
      transport.onclose = () => {
        console.log(`Session closed: ${transport.sessionId}`);
        sessions.delete(transport.sessionId!);
      };
    }
  } catch (error) {
    console.error("Error handling request in streamable-http handler:", error);
    if (!res.headersSent) {
      res.status(500).send("Internal Server Error");
    }
  }
});

app.listen(PORT, () => {
  console.log(`MCP Code Runner Server is listening on port ${PORT}`);
  console.log(`Streamable-HTTP endpoint available at http://localhost:${PORT}/sse`);
});
