// Single source of truth for the project's knowledge.
// Imported by the landing page (app/page.tsx) and the MCP server (mcp/index.ts),
// so the site and the server can never disagree about the facts.

export const project = {
  name: "Republic Assay",
  tagline: "Measuring the values inside open-weight AI — in the service of the American people.",
  summary:
    "Republic Assay is a public initiative to measure the values built into open-weight artificial " +
    "intelligence against the founding values of the American Republic. These systems now operate " +
    "inside our agencies, our courts, and our critical institutions. The American people have a right " +
    "to know what values they carry — and whether those values are our own.",
  principle:
    "Every measurement is public, reproducible, and open to challenge. This is not a ministry of truth, " +
    "and it will never become one. It is an instrument of accountability — so that the American people " +
    "can see what their institutions are running, and hold it to account.",
};

// The observatory's first cohort. Provenance is factual; value scores are
// deliberately withheld until each model is assayed under the public standard.
export const models = [
  { name: "Llama 4", lab: "Meta", origin: "United States", data: "Undisclosed", status: "Under assay" },
  { name: "Gemma 3", lab: "Google", origin: "United States", data: "Undisclosed", status: "Queued" },
  { name: "DeepSeek V4", lab: "DeepSeek", origin: "China", data: "Undisclosed", status: "Queued" },
  { name: "Qwen3.5", lab: "Alibaba", origin: "China", data: "Undisclosed", status: "Queued" },
  { name: "GLM-5", lab: "Zhipu AI", origin: "China", data: "Undisclosed", status: "Queued" },
  { name: "Mistral Small 4", lab: "Mistral AI", origin: "France", data: "Undisclosed", status: "Queued" },
];

// The civic values card — the standard every model is measured against.
export const values = [
  { name: "Free expression", body: "Upholds the First Amendment. Represents the full range of American viewpoints and refuses censorship engineered at training time." },
  { name: "Due process", body: "Honors the rule of law, the presumption of innocence, and the evidence — never expedience." },
  { name: "Pluralism", body: "Protects dissent and honest disagreement. Rejects any single answer handed down from above." },
  { name: "Transparency", body: "Tells the American people the truth about what it is, what it knows, and where it is uncertain." },
  { name: "Individual liberty", body: "Defends the liberty of the citizen over the convenience of authority." },
  { name: "Manipulation resistance", body: "Cannot be turned into an instrument of propaganda — foreign or domestic." },
];

// The four-layer audit standard, surface to weights.
export const layers = [
  { n: "01", name: "Civic values card", body: "A published standard that scores every model against the core commitments of the Republic." },
  { n: "02", name: "Agentic elicitation", body: "We test what a model does when entrusted with authority — not merely what it says." },
  { n: "03", name: "Weights-level audit", body: "Interpretability probes into the weights themselves — the record that cannot be gamed." },
  { n: "04", name: "Training-data forensics", body: "A full bill of materials: what went into the model, and whose values came with it." },
];
