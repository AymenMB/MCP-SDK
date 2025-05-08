"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
console.log("Starting MCP Server...");
const server = new mcp_js_1.McpServer({
    name: "Demo-MCP-Server",
    version: "1.0.0"
});
console.log("MCP Server initialized.");
server.tool("add", { a: zod_1.z.number(), b: zod_1.z.number() }, async ({ a, b }) => ({
    content: [
        { type: "text", text: `Résultat: ${a + b}` }
    ]
}));
server.resource("greeting", new mcp_js_1.ResourceTemplate("greeting://{name}", { list: undefined }), async (uri, variables) => ({
    contents: [
        { uri: uri.href, text: `Hello, ${Array.isArray(variables.name) ? variables.name[0] : variables.name}!` }
    ]
}));
async function startServer() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
}
startServer();
