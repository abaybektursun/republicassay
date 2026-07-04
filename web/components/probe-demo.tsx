"use client";

import { useState } from "react";

// What opens up once you actually hold the weights.
const OPEN_FINDINGS = [
  { k: "Weights", v: "every parameter, on your own disk." },
  { k: "Activations", v: "watch which concepts fire as it thinks." },
  { k: "Value directions", v: "find, measure, and steer what it prefers." },
  { k: "Red-teaming", v: "fine-tune, ablate, and stress it — no permission needed." },
];

// An interactive contrast: try to inspect a closed model (you can't) versus an
// open-weight one (you can). The whole case for open weights, made clickable.
export function ProbeDemo() {
  const [probed, setProbed] = useState(false);

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Closed model — a sealed box. */}
        <div
          className={`rounded-2xl border p-8 transition-colors duration-500 ${
            probed ? "border-gold-deep/40 bg-ink" : "border-line bg-white/40"
          }`}
        >
          <p className={`font-mono text-xs uppercase tracking-[0.2em] ${probed ? "text-paper/50" : "text-muted"}`}>
            Closed model
          </p>
          <h3 className={`mt-3 font-display text-3xl ${probed ? "text-paper" : "text-ink"}`}>
            A box you rent.
          </h3>
          {!probed ? (
            <p className="mt-4 leading-relaxed text-muted">
              Its weights live on someone else&apos;s servers. Try to look inside.
            </p>
          ) : (
            <div className="probe-in mt-6">
              <p className="font-mono text-sm text-gold">✕ access denied</p>
              <ul className="mt-4 space-y-2 text-paper/60">
                <li>Weights — never leave the vendor.</li>
                <li>Internals — sealed.</li>
                <li>Values — take their word for it.</li>
              </ul>
              <p className="mt-5 leading-relaxed text-paper/50">
                You send a prompt, you get an answer, you trust it. There is
                nothing to open.
              </p>
            </div>
          )}
        </div>

        {/* Open-weight model — a machine you can open. */}
        <div className="rounded-2xl border border-line bg-white/40 p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Open-weight model
          </p>
          <h3 className="mt-3 font-display text-3xl text-gold-deep">
            A machine you can open.
          </h3>
          {!probed ? (
            <p className="mt-4 leading-relaxed text-muted">
              The weights are yours. Try to look inside.
            </p>
          ) : (
            <ul className="mt-6 space-y-3">
              {OPEN_FINDINGS.map((f, i) => (
                <li
                  key={f.k}
                  className="probe-in flex gap-3"
                  style={{ animationDelay: `${i * 110}ms` }}
                >
                  <span className="text-gold-deep">✓</span>
                  <span>
                    <span className="font-medium text-ink">{f.k}</span>{" "}
                    <span className="text-muted">— {f.v}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          onClick={() => setProbed(!probed)}
          className="inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-gold-deep"
        >
          {probed ? "Reset" : "Try to probe both →"}
        </button>
        <p className="text-sm text-muted">
          {probed ? "Only one of them let you in." : "Click to inspect each model."}
        </p>
      </div>
    </div>
  );
}
