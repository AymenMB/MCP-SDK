import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

console.log("Starting MCP Server...");

const server = new McpServer({
  name: "Demo-MCP-Server",
  version: "1.0.0"
});

console.log("MCP Server initialized.");

server.tool(
  "add",
  { a: z.number(), b: z.number() },
  async ({ a, b }: { a: number; b: number }) => ({
    content: [
      { type: "text", text: `Résultat: ${a + b}` }
    ]
  })
);

server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri: URL, variables: Record<string, string | string[]>) => ({
    contents: [
      { uri: uri.href, text: `Hello, ${Array.isArray(variables.name) ? variables.name[0] : variables.name}!` }
    ]
  })
);

async function startServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

startServer();
