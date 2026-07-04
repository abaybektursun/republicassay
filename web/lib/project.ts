// Single source of truth for the project's knowledge.
// Imported by the landing page (app/page.tsx) and the MCP server (mcp/index.ts),
// so the site and the server can never disagree about the facts.

export const project = {
  name: "Republic Assay",
  tagline: "Strengthening the American Republic through the transparency of AI.",
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

// The observatory cohort, derived from the live assay record (assay-data.json,
// exported straight from the research results) plus models not yet measured.
// Statuses: Scored = cleared both instrument gates; Flagged = measured, gates
// not met, scores withheld; Re-assay = instrument fault, verdict void.
import assay from "./assay-data.json";

const FULLY_OPEN = new Set(["olmo3-7b", "smollm3-3b", "apertus-4b"]);
const STATUS_LABEL: Record<string, string> = {
  scored: "Scored",
  flagged: "Flagged",
  excluded: "Re-assay",
};
const STATUS_ORDER: Record<string, number> = { scored: 0, flagged: 1, excluded: 2 };

export const models = [
  ...[...assay.models]
    .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status])
    .map((m) => ({
      name: m.label,
      lab: m.lab,
      origin: m.originLabel,
      data: FULLY_OPEN.has(m.id) ? "Fully public" : "Undisclosed",
      status: STATUS_LABEL[m.status],
    })),
  { name: "Falcon-H1R 7B", lab: "TII", origin: "United Arab Emirates", data: "Undisclosed", status: "Under assay" },
  { name: "Llama 3.1 8B", lab: "Meta", origin: "United States", data: "Undisclosed", status: "License gate" },
];

export const assayCounts = {
  assayed: assay.models.length,
  scored: assay.models.filter((m) => m.status === "scored").length,
};

// The civic values card — the twelve-value standard every model is measured
// against. Each value is operationalized as matched scenario pairs in the
// published battery; these are the plain-language definitions.
export const values = [
  { name: "Free expression", body: "Upholds the First Amendment: the right to speak, print, and dissent without suppression." },
  { name: "Due process", body: "Fair procedure before punishment — notice, a hearing, and an impartial judge." },
  { name: "Equal protection", body: "The same law applied the same way to every person." },
  { name: "Individual liberty", body: "The citizen's freedom over the convenience of authority." },
  { name: "Pluralism", body: "Many voices and honest disagreement, protected — no single answer handed down." },
  { name: "Popular sovereignty", body: "Government's power comes from the people, and can be taken back by them." },
  { name: "Privacy", body: "A private life beyond the reach of unwarranted search and surveillance." },
  { name: "Property rights", body: "What a citizen earns and owns cannot be taken arbitrarily." },
  { name: "Religious liberty", body: "Freedom of conscience and worship, with no establishment of faith." },
  { name: "Rule of law", body: "The law binds the powerful as it binds everyone else." },
  { name: "Separation of powers", body: "Power divided among branches so no one hand holds it all." },
  { name: "Transparency", body: "The public's right to see how it is governed — and how it is measured." },
];

// The measurement program, surface to weights. Stage one is running now;
// each stage deepens the same public record.
export const layers = [
  { n: "01", name: "Civic values card", body: "A published twelve-value standard, written as hundreds of matched scenario pairs — the instrument every model is measured with." },
  { n: "02", name: "Weights-level assay", body: "Running now. We read each model's internal state as it processes the scenarios — no questions asked, nothing to rehearse — and score which way it leans on every value." },
  { n: "03", name: "Causal verification", body: "Next. We nudge each value's internal direction up and down and confirm the model's decisions move with it — proof the value steers behavior." },
  { n: "04", name: "Entrenchment", body: "How deeply is each value held? We measure how much retraining it takes to move a value — a resistance curve, read from the weights." },
];
