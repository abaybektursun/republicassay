"use client";

import { useState } from "react";

export type Threat = { n: string; value: string; title: string; body: string };

// Clickable exploration of the threats. Selecting one re-plays the detail's
// entrance, so the dark act reads as something you investigate, not just scroll.
export function ThreatExplorer({ threats }: { threats: Threat[] }) {
  const [sel, setSel] = useState(0);
  const t = threats[sel];

  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
      <div className="flex flex-col gap-3">
        {threats.map((th, i) => (
          <button
            key={th.n}
            onClick={() => setSel(i)}
            className={`rounded-xl border px-5 py-4 text-left transition-colors ${
              i === sel ? "border-gold bg-white/5" : "border-white/10 hover:border-white/40"
            }`}
          >
            <div className="font-mono text-xs">
              <span className="text-gold">{th.n}</span>
              <span className="ml-3 uppercase tracking-[0.2em] text-paper/40">{th.value}</span>
            </div>
            <div className={`mt-2 font-display text-2xl ${i === sel ? "text-paper" : "text-paper/70"}`}>
              {th.title}
            </div>
          </button>
        ))}
      </div>

      {/* key={sel} remounts the panel, replaying the entrance on each pick. */}
      <div key={sel} className="probe-in md:pl-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">{t.value}</p>
        <h3 className="mt-4 font-display text-4xl sm:text-5xl text-paper">{t.title}</h3>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">{t.body}</p>
      </div>
    </div>
  );
}
