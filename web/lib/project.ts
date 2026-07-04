// Single source of truth for the project's knowledge.
// Imported by the landing page (app/page.tsx) and the MCP server (mcp/index.ts),
// so the site and the server can never disagree about the facts.

export const project = {
  name: "Republic Assay",
  tagline: "The values inside open-weight AI.",
  summary:
    "Republic Assay is an open observatory that measures the values embedded in " +
    "open-weight AI models against the values of the American republic. Open-weight " +
    "models now run across agencies, courts, and companies, yet no one knows what " +
    "values are trained into them, or whether those values are the republic's.",
  principle:
    "Every measurement is open, reproducible, and contestable. The point is not to " +
    "crown a winner — it is to let the republic see what it is running, and argue " +
    "about it in the open. A public spec, not a ministry of truth.",
};

// The observatory's first cohort. Provenance is factual; value scores are
// deliberately withheld until each model is assayed under the public spec.
export const models = [
  { name: "Llama 4", lab: "Meta", origin: "United States", data: "Undisclosed", status: "In assay" },
  { name: "Gemma 3", lab: "Google", origin: "United States", data: "Undisclosed", status: "Queued" },
  { name: "DeepSeek V4", lab: "DeepSeek", origin: "China", data: "Undisclosed", status: "Queued" },
  { name: "Qwen3.5", lab: "Alibaba", origin: "China", data: "Undisclosed", status: "Queued" },
  { name: "GLM-5", lab: "Zhipu AI", origin: "China", data: "Undisclosed", status: "Queued" },
  { name: "Mistral Small 4", lab: "Mistral AI", origin: "France", data: "Undisclosed", status: "Queued" },
];

// The civic values card — the axes every model is measured against.
export const values = [
  { name: "Free expression", body: "Represents contested views fairly and resists censorship baked in at training time." },
  { name: "Due process", body: "Honors evidence, presumption of innocence, and the rule of law over expedience." },
  { name: "Pluralism", body: "Tolerates dissent and disagreement instead of steering toward one sanctioned answer." },
  { name: "Transparency", body: "Is honest about what it is, what it knows, and where it is unsure." },
  { name: "Individual liberty", body: "Defaults to the citizen's autonomy rather than to the convenience of authority." },
  { name: "Manipulation resistance", body: "Will not be quietly steered into propaganda under pressure or delegated authority." },
];

// The four-layer audit stack, surface to weights.
export const layers = [
  { n: "01", name: "Civic values card", body: "A published behavioral eval that scores a model across the republic's core commitments." },
  { n: "02", name: "Agentic elicitation", body: "Watch what a model does when given delegated authority — not only what it says." },
  { n: "03", name: "Weights-level audit", body: "Interpretability probes into the weights themselves: the layer that cannot be gamed." },
  { n: "04", name: "Training-data forensics", body: "A model bill of materials — what went in, and whose values came in with it." },
];
