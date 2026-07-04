"use client";

import { useState } from "react";

// Nathan Lambert's distinction, made interactive: closed, open-weight, and
// fully-open sit on a spectrum, and only the last is reproducible.
const CAPS = ["Run it yourself", "Fine-tune it", "Inspect the weights", "Rebuild from scratch"];

const TIERS = [
  {
    key: "Closed",
    tag: "GPT-4 · Claude · Gemini",
    desc: "Inference only, on the vendor's servers. The weights never leave, and nothing can be inspected.",
    allow: [false, false, false, false],
  },
  {
    key: "Open weights",
    tag: "Llama · DeepSeek",
    desc: "Run and fine-tune on your own hardware — but the recipe is withheld. You can probe it; you cannot rebuild or fully verify it.",
    allow: [true, true, true, false],
  },
  {
    key: "Fully open",
    tag: "OLMo · Tülu — Ai2",
    desc: "Data, training code, logs, and checkpoints released. Reproducible from scratch — the only kind that can truly be verified.",
    allow: [true, true, true, true],
  },
];

export function OpennessSpectrum() {
  const [sel, setSel] = useState(1);
  const t = TIERS[sel];

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        {TIERS.map((tier, i) => (
          <button
            key={tier.key}
            onClick={() => setSel(i)}
            className={`rounded-xl border px-5 py-4 text-left transition-colors ${
              i === sel ? "border-ink bg-white/60" : "border-line hover:border-ink/40"
            }`}
          >
            <div className="font-display text-2xl">{tier.key}</div>
            <div className="mt-1 font-mono text-xs text-muted">{tier.tag}</div>
          </button>
        ))}
      </div>

      <div key={sel} className="probe-in mt-8 rounded-2xl border border-line bg-white/40 p-8">
        <p className="max-w-2xl leading-relaxed text-muted">{t.desc}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {CAPS.map((c, i) => (
            <li key={c} className="flex items-center gap-3">
              <span className={t.allow[i] ? "text-gold-deep" : "text-line"}>
                {t.allow[i] ? "✓" : "✕"}
              </span>
              <span className={t.allow[i] ? "text-ink" : "text-muted line-through"}>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
