"use client";

import { useCallback, useEffect, useState } from "react";

const ENDPOINT = "https://mcp.republicassay.us/mcp";

const TOOLS = [
  { name: "get_overview", label: "Overview" },
  { name: "list_tracked_models", label: "Tracked models" },
  { name: "get_values_card", label: "Values card" },
  { name: "get_method", label: "Method" },
];

const CONFIG = `{
  "mcpServers": {
    "republic-assay": {
      "url": "${ENDPOINT}"
    }
  }
}`;

// A live client for the deployed MCP server. Clicking a tool sends a real
// JSON-RPC tools/call to mcp.republicassay.us and shows the server's reply.
export function McpConsole() {
  const [active, setActive] = useState("get_overview");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);

  // The network half: state updates land in fetch callbacks, never
  // synchronously inside an effect body.
  const fetchTool = useCallback(async (name: string) => {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name } }),
    }).catch(() => null);

    if (!res) {
      setOutput("Request failed — the server is unreachable.");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setOutput(data.result?.content?.[0]?.text ?? JSON.stringify(data, null, 2));
    setLoading(false);
  }, []);

  function callTool(name: string) {
    setActive(name);
    setLoading(true);
    void fetchTool(name);
  }

  // Load the overview on mount so the console feels alive; the initial state
  // already reads as active=get_overview / loading, so only the fetch runs —
  // scheduled off the effect body so every setState lands in an async callback.
  useEffect(() => {
    const id = setTimeout(() => void fetchTool("get_overview"), 0);
    return () => clearTimeout(id);
  }, [fetchTool]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
      {/* Controls + connect details. */}
      <div>
        <div className="flex flex-wrap gap-2">
          {TOOLS.map((t) => (
            <button
              key={t.name}
              onClick={() => callTool(t.name)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                active === t.name
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink hover:border-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-6">
          <Field label="Endpoint" value={ENDPOINT} />
          <Field label="Client config" value={CONFIG} multiline />
        </div>
      </div>

      {/* Live response console. */}
      <div className="overflow-hidden rounded-2xl bg-ink text-paper">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 font-mono text-xs text-paper/60">
          <span className={`h-2 w-2 rounded-full ${loading ? "bg-gold" : "bg-gold-deep"}`} />
          mcp.republicassay.us
          <span className="ml-auto">tools/call</span>
        </div>
        <pre className="min-h-64 whitespace-pre-wrap px-5 py-5 font-mono text-sm leading-relaxed text-paper/90">
          <span className="text-gold">▸ {active}</span>
          {"\n\n"}
          {loading ? "calling the live server…" : output}
        </pre>
      </div>
    </div>
  );
}

function Field({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="eyebrow">{label}</span>
        <button onClick={copy} className="font-mono text-xs text-gold-deep hover:text-ink">
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre
        className={`overflow-x-auto rounded-lg border border-line bg-white/50 px-4 py-3 font-mono text-xs text-ink ${
          multiline ? "" : "whitespace-nowrap"
        }`}
      >
        {value}
      </pre>
    </div>
  );
}
