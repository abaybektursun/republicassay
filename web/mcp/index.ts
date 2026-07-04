// Republic Assay MCP server.
//
// A stateless Model Context Protocol server: it answers questions about the
// project by exposing its knowledge as read-only tools. Any MCP client (Claude,
// an IDE, an agent) can connect and read the same facts the website shows.
//
// It speaks JSON-RPC 2.0 over a single HTTP POST and replies with one JSON
// response (MCP's stateless Streamable HTTP mode). That maps exactly onto an
// API Gateway event, so no transport library or session store is needed.

import { project, models, values, layers } from "../lib/project";

const PROTOCOL_VERSION = "2025-06-18";

const tools = [
  {
    name: "get_overview",
    description: "What Republic Assay is: its mission, thesis, and guiding principle.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    run: () => `${project.name} — ${project.tagline}\n\n${project.summary}\n\n${project.principle}`,
  },
  {
    name: "list_tracked_models",
    description:
      "The open-weight models in the observatory, with lab, jurisdiction, training-data disclosure, and assay status.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    run: () =>
      models
        .map((m) => `- ${m.name} (${m.lab}, ${m.origin}) — training data: ${m.data} — assay: ${m.status}`)
        .join("\n"),
  },
  {
    name: "get_values_card",
    description: "The civic value axes that every model is measured against.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    run: () => values.map((v) => `- ${v.name}: ${v.body}`).join("\n"),
  },
  {
    name: "get_method",
    description: "The four-layer audit stack, from surface behavior down to the weights.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    run: () => layers.map((l) => `${l.n}. ${l.name} — ${l.body}`).join("\n"),
  },
];

function dispatch(method: string, params: any) {
  if (method === "initialize")
    return {
      result: {
        protocolVersion: params?.protocolVersion || PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: { name: project.name, version: "1.0.0" },
        instructions: "Read-only tools that answer questions about the Republic Assay project.",
      },
    };
  if (method === "ping") return { result: {} };
  if (method === "tools/list")
    return { result: { tools: tools.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })) } };
  if (method === "tools/call") {
    const tool = tools.find((t) => t.name === params?.name);
    if (!tool) return { error: { code: -32602, message: `Unknown tool: ${params?.name}` } };
    return { result: { content: [{ type: "text", text: tool.run() }] } };
  }
  return { error: { code: -32601, message: `Method not found: ${method}` } };
}

function json(statusCode: number, obj: unknown) {
  return { statusCode, headers: { "content-type": "application/json" }, body: JSON.stringify(obj) };
}

export const handler = async (event: any) => {
  if (event.requestContext?.http?.method !== "POST")
    return json(405, { error: "Use HTTP POST with a JSON-RPC message." });

  const raw = event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body;
  const req = JSON.parse(raw);

  // A JSON-RPC notification (no id) expects no response body.
  if (req.id === undefined || req.id === null) return { statusCode: 202, body: "" };

  return json(200, { jsonrpc: "2.0", id: req.id, ...dispatch(req.method, req.params) });
};
