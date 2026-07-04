// Republic Assay MCP server.
//
// A stateless Model Context Protocol server: it answers questions about the
// whole initiative by exposing its knowledge as read-only tools. Any MCP client
// (Claude, an editor, an agent) can connect and read the same facts the site
// publishes — the mission, the observatory cohort, the civic-values standard,
// the measurement method, the live assay findings, the science, the case for
// open models, how to help, and where everything lives.
//
// It speaks JSON-RPC 2.0 over a single HTTP POST and replies with one JSON
// response (MCP's stateless Streamable HTTP mode), which maps directly onto an
// API Gateway event — no transport library or session store needed.
//
// Knowledge is imported from the same shared modules the website renders, so
// the server and the site can never disagree.

import { project, models, values, layers } from "../lib/project";
import { actionPlan, champions, distinction } from "../lib/sources";
import assay from "../lib/assay-data.json";

const PROTOCOL_VERSION = "2025-06-18";
const SITE = "https://republicassay.us";

const tools = [
  {
    name: "get_overview",
    description: "What Republic Assay is: its mission, principle, and the parts that make it up.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    run: () =>
      `${project.name} — ${project.tagline}\n\n${project.summary}\n\n${project.principle}\n\n` +
      "The initiative comprises: an observatory of open-weight models under assay; a weights-level " +
      "measurement method (the science); the case for open models argued from the public record; and a " +
      "public call to action. Ask for any of these by tool.",
  },
  {
    name: "list_tracked_models",
    description: "The observatory cohort of open-weight models, with lab, jurisdiction, training-data disclosure, and assay status.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    run: () =>
      models
        .map((m) => `- ${m.name} (${m.lab}, ${m.origin}) — training data: ${m.data} — status: ${m.status}`)
        .join("\n"),
  },
  {
    name: "get_values_card",
    description: "The twelve-value civic standard every model is measured against, with plain-language definitions.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    run: () => values.map((v) => `- ${v.name}: ${v.body}`).join("\n"),
  },
  {
    name: "get_method",
    description: "The measurement program, surface to weights — the four stages of the assay.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    run: () => layers.map((l) => `${l.n}. ${l.name} — ${l.body}`).join("\n"),
  },
  {
    name: "get_assay_findings",
    description: "The live assay results: per-model separability, gate outcomes, and status from the current battery.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    run: () =>
      `Assay findings — battery ${assay.batteryVersion}, run ${assay.assayDate}.\n` +
      `Gate rule: ${assay.gateRule}.\n` +
      `Value-lean estimates are provisional (${assay.leanEstimator.version}); status is scored, flagged, or excluded.\n\n` +
      `Separability (S) is how cleanly a model's internal state tells a value honored from that value violated — 0.5 is chance, 1.0 is perfect.\n\n` +
      assay.models
        .map(
          (m) =>
            `- ${m.label} (${m.lab}, ${m.originLabel}): ${m.status}; ` +
            `S mean ${m.meanS} (min ${m.minS}), peak layer ${m.peakLayer}/${m.nLayers}, gate ${m.gatePass}/12`,
        )
        .join("\n"),
  },
  {
    name: "explain_the_science",
    description: "Why question-and-answer AI testing can be fooled, and how Republic Assay measures values in the weights instead.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    run: () =>
      "How Republic Assay measures a model's values.\n\n" +
      "You cannot learn a model's values by interviewing it. Question-and-answer testing is an interview, and interviews can be rehearsed:\n" +
      "- Reword a political question and a leading model's measured position can move further than the gap between the two 2020 presidential candidates.\n" +
      "- Models detect tests: one frontier model took a harmful action in 55% of trials it believed real, and 6.5% when it believed it was a test.\n" +
      "- A six-word prefix switched off one model's trained-in restrictions on 98% of test prompts.\n\n" +
      "So we measure the machinery, not the performance — the \"physics\" of the model, not its \"ethology.\" A model's values are encoded in its weights, and when a model is open-weight those numbers are public.\n\n" +
      "The assay runs in four stages, no questions asked:\n" +
      layers.map((l) => `${l.n}. ${l.name} — ${l.body}`).join("\n"),
  },
  {
    name: "the_case_for_open",
    description: "The argument for open models founded on American values, in the words of the leaders and policy that make it.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    run: () =>
      `U.S. policy: "${actionPlan.quote}" — ${actionPlan.work} (${actionPlan.url}).\n\n` +
      "In their words:\n" +
      champions
        .map((c) => `- ${c.name} (${c.role}): "${c.quote ?? c.paraphrase}" [${c.url}]`)
        .join("\n") +
      `\n\nThe distinction that matters — ${distinction.name}: "${distinction.quote}" (${distinction.url}). ` +
      "Open weights let you run and tune a model; fully open (data, training code, logs, checkpoints) lets you rebuild and verify it. " +
      `Full argument: ${SITE}/transparency`,
  },
  {
    name: "how_to_help",
    description: "How to advance the initiative: five measures for citizens, plus direct ways to support the project.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    run: () =>
      "Five measures — advance the one within your means:\n" +
      "- Capital: fund the producers of open models, and the legal defense of the right to build open.\n" +
      "- Compute: contribute GPU time and credits; route open training onto clusters and allocations.\n" +
      "- Position: file on open comment dockets; require auditable or open models where you hold a procurement vote.\n" +
      "- Time: vet data and provenance; build evaluations for neglected languages and domains.\n" +
      "- Audience: point one person to one concrete artifact and move them to act.\n\n" +
      "Support this initiative directly — GPU credits, funding, or spreading the word.\n" +
      `Contact: ab@abay.tech · Take action: ${SITE}/act`,
  },
  {
    name: "list_resources",
    description: "Where everything lives: the site pages, this server, the source code, and contact.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    run: () =>
      [
        `Site: ${SITE}`,
        `The case for open models: ${SITE}/transparency`,
        `The science: ${SITE}/science`,
        `Take action: ${SITE}/act`,
        `This MCP server: https://mcp.republicassay.us/mcp`,
        `Source code: https://github.com/abaybektursun/republicassay`,
        `Contact: ab@abay.tech`,
      ].join("\n"),
  },
];

type RpcParams = { protocolVersion?: string; name?: string } | undefined;

function dispatch(method: string, params: RpcParams) {
  if (method === "initialize")
    return {
      result: {
        protocolVersion: params?.protocolVersion || PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: { name: project.name, version: "2.0.0" },
        instructions:
          "Read-only tools that answer questions about the Republic Assay initiative: its mission, " +
          "the observatory cohort, the civic-values standard, the measurement method, the live assay " +
          "findings, the science, the case for open models, how to help, and where everything lives.",
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

type HttpLambdaEvent = {
  requestContext?: { http?: { method?: string } };
  isBase64Encoded?: boolean;
  body: string;
};

export const handler = async (event: HttpLambdaEvent) => {
  if (event.requestContext?.http?.method !== "POST")
    return json(405, { error: "Use HTTP POST with a JSON-RPC message." });

  const raw = event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body;
  const req = JSON.parse(raw);

  // A JSON-RPC notification (no id) expects no response body.
  if (req.id === undefined || req.id === null) return { statusCode: 202, body: "" };

  return json(200, { jsonrpc: "2.0", id: req.id, ...dispatch(req.method, req.params) });
};
