// Primary sources for the case for open models. `quote` is verbatim from the
// linked work; `paraphrase` is an attributed summary and is never presented as
// a quotation. Links point to the original source.

export type Source = {
  name: string;
  role: string;
  work: string;
  url: string;
  quote?: string;
  paraphrase?: string;
  note?: string;
};

export const actionPlan: Source = {
  name: "The White House",
  role: "Kratsios · Sacks · Rubio",
  work: "America's AI Action Plan · July 2025",
  url: "https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf",
  quote: "We need to ensure America has leading open models founded on American values.",
  note: "This is not advocacy. It is the stated policy of the United States, being operationalized through the American AI Export Program under the Department of Commerce.",
};

export const champions: Source[] = [
  {
    name: "Mark Zuckerberg",
    role: "Meta",
    work: "Open Source AI Is the Path Forward · 2024",
    url: "https://about.fb.com/news/2024/07/open-source-ai-is-the-path-forward/",
    quote:
      "The United States' advantage is decentralized and open innovation … constraining American innovation to closed development increases the chance that we don't lead at all.",
    note: "Backed by action: Meta shipped Llama and made it available to U.S. defense and intelligence.",
  },
  {
    name: "David Sacks",
    role: "White House AI & Crypto Czar",
    work: "Public remarks · co-author, AI Action Plan",
    url: "https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf",
    paraphrase:
      "To win the AI race, America must win in open source too — the market will favor the cost, the customizability, and the control that open models hand to the buyer.",
    note: "No single canonical essay; the position now lives in the national policy he co-signed.",
  },
  {
    name: "Marc Andreessen",
    role: "a16z · American Dynamism",
    work: "American Dynamism",
    url: "https://a16z.com/american-dynamism/",
    paraphrase:
      "Open, decentralized technology is an American strength to be defended — and a16z's policy work helped write open-weight language into the Action Plan itself.",
    note: "American Dynamism turned the argument into policy: open-weight language now sits in the national plan.",
  },
];

export const distinction: Source = {
  name: "Nathan Lambert",
  role: "Allen Institute for AI (Ai2)",
  work: "The American DeepSeek Project · July 4, 2025",
  url: "https://www.interconnects.ai/p/the-american-deepseek-project",
  quote:
    "A fully open model, as opposed to just an 'open weights' model, comes with data, training code, logs, and decision making — on top of the weights to run inference.",
  note: "Lambert ships OLMo and Tülu at Ai2 — genuinely open American models, released with data, code, logs, and checkpoints, not weights alone. The rare patriotic-open voice backed by a shipped model, not a manifesto.",
};
