"use client";

import { useState } from "react";
import type { Source } from "@/lib/sources";

// Clickable panel of the leaders making the case, in their own words. Verbatim
// quotes are shown as quotations; attributed summaries are labeled "Position."
export function VoicesExplorer({ sources }: { sources: Source[] }) {
  const [sel, setSel] = useState(0);
  const s = sources[sel];

  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
      <div className="flex flex-col gap-3">
        {sources.map((src, i) => (
          <button
            key={src.name}
            onClick={() => setSel(i)}
            className={`rounded-xl border px-5 py-4 text-left transition-colors ${
              i === sel ? "border-ink bg-white/60" : "border-line hover:border-ink/40"
            }`}
          >
            <div className="font-display text-2xl">{src.name}</div>
            <div className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted">
              {src.role}
            </div>
          </button>
        ))}
      </div>

      <div key={sel} className="probe-in">
        {s.quote ? (
          <blockquote className="font-display text-3xl leading-tight sm:text-4xl">
            &ldquo;{s.quote}&rdquo;
          </blockquote>
        ) : (
          <div>
            <p className="eyebrow mb-3">Position</p>
            <p className="text-2xl leading-snug">{s.paraphrase}</p>
          </div>
        )}
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-muted">
          {s.name} · {s.work}
        </p>
        {s.note && <p className="mt-4 max-w-xl leading-relaxed text-muted">{s.note}</p>}
        <a
          href={s.url}
          className="mt-6 inline-block text-sm text-gold-deep underline underline-offset-4 hover:text-ink"
        >
          Read the source →
        </a>
      </div>
    </div>
  );
}
