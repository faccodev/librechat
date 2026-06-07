import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import express from "express";
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

// Setup Express application with SSE Transport
const app = express();

let transport: SSEServerTransport | null = null;

app.get("/sse", async (req, res) => {
  console.log("New client connecting via SSE");
  transport = new SSEServerTransport("/messages", res);
  await server.connect(transport);
});

app.post("/messages", express.json(), async (req, res) => {
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send("No active SSE session found");
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "mcp-code-runner" });
});

app.listen(PORT, () => {
  console.log(`MCP Code Runner Server is listening on port ${PORT}`);
  console.log(`SSE endpoint available at http://localhost:${PORT}/sse`);
  console.log(`Message endpoint available at http://localhost:${PORT}/messages`);
});
