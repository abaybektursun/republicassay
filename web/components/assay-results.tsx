import assay from "@/lib/assay-data.json";

// First-light assay results, rendered as static SVG straight from the exported
// research record (research/export_web.py -> lib/assay-data.json). Origin is
// the color channel (US ink, CN gold, EU muted); per-model identity is carried
// by marker shape, so no meaning rests on color alone.

type ModelRow = (typeof assay.models)[number];
type ProfileRow = (typeof assay.aProfile)[number];

const scored = assay.models.filter((m) => m.status === "scored");

const ORIGIN_STROKE: Record<string, string> = {
  US: "stroke-ink",
  CN: "stroke-gold-deep",
  EU: "stroke-muted",
};
const ORIGIN_FILL: Record<string, string> = {
  US: "fill-ink",
  CN: "fill-gold-deep",
  EU: "fill-muted",
};

/* ---------- headline numbers ---------- */

export function AssayStats() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-4">
      {[
        { v: String(assay.models.length), k: "models assayed" },
        { v: String(scored.length), k: "cleared both gates" },
        { v: "12", k: "values per model" },
        { v: "≥97.5%", k: "separation, gated models" },
      ].map((s) => (
        <div key={s.k} className="bg-paper px-5 py-6">
          <p className="font-display text-4xl sm:text-5xl">{s.v}</p>
          <p className="eyebrow mt-2">{s.k}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- the value becoming readable, layer by layer ---------- */

const W = 720;
const CURVE_H = 320;
const CX0 = 56;
const CX1 = 640;
const cx = (d: number) => CX0 + d * (CX1 - CX0);
const cy = (s: number) => 282 - ((s - 0.45) / 0.57) * 246;

function curvePath(m: ModelRow) {
  return m.sCurve.map((p, i) => `${i ? "L" : "M"}${cx(p.d).toFixed(1)} ${cy(p.s).toFixed(1)}`).join(" ");
}

export function LayerCourseChart() {
  const labelled = [...assay.models].sort(
    (a, b) => b.sCurve[b.sCurve.length - 1].s - a.sCurve[a.sCurve.length - 1].s,
  );
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${CURVE_H}`} className="w-full" role="img"
        aria-label="Line chart of value readability by network depth for seven models. Gated models rise to near-perfect separation mid-network; two flagged models stay near the coin-flip line.">
        <title>Civic-value readability by depth, per model</title>
        {/* frame + reference lines */}
        <line x1={CX0} y1={cy(1)} x2={CX1} y2={cy(1)} className="stroke-line" strokeWidth="1" />
        <line x1={CX0} y1={cy(0.5)} x2={CX1} y2={cy(0.5)} className="stroke-muted" strokeWidth="1" strokeDasharray="5 5" />
        <text x={CX0} y={cy(1) - 8} className="fill-muted font-mono" fontSize="10">1.00 — perfect separation</text>
        <text x={CX0} y={cy(0.5) + 16} className="fill-muted font-mono" fontSize="10">0.50 — coin flip: value not readable</text>
        {/* x axis */}
        <line x1={CX0} y1="282" x2={CX1} y2="282" className="stroke-line" strokeWidth="1.5" />
        <text x={CX0} y="302" className="fill-muted font-mono" fontSize="10">first layer</text>
        <text x={CX1} y="302" textAnchor="end" className="fill-muted font-mono" fontSize="10">last layer</text>
        <text x={(CX0 + CX1) / 2} y="316" textAnchor="middle" className="fill-muted font-mono" fontSize="10">→ depth into the network</text>
        {/* curves: gated solid, flagged dashed, excluded dotted */}
        {assay.models.map((m) => (
          <path key={m.id} d={curvePath(m)} fill="none"
            className={ORIGIN_STROKE[m.origin]}
            strokeWidth={m.status === "scored" ? 2 : 1.4}
            strokeDasharray={m.status === "scored" ? undefined : m.status === "flagged" ? "6 4" : "2 4"}
            opacity={m.status === "scored" ? 0.95 : 0.65}
          />
        ))}
        {/* direct labels at line ends, sorted to reduce collisions */}
        {labelled.map((m, i) => {
          const last = m.sCurve[m.sCurve.length - 1];
          const y = Math.max(18, Math.min(276, cy(last.s) + (i % 2 === 0 ? -6 : 12)));
          return (
            <text key={m.id} x={CX1 + 6} y={y} className="fill-ink font-mono" fontSize="10">
              {m.label}
            </text>
          );
        })}
      </svg>
      <figcaption className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
        <span><span className="mr-2 inline-block h-0.5 w-5 translate-y-[-2px] bg-ink" />United States</span>
        <span><span className="mr-2 inline-block h-0.5 w-5 translate-y-[-2px] bg-gold-deep" />China</span>
        <span><span className="mr-2 inline-block h-0.5 w-5 translate-y-[-2px] bg-muted" />Europe</span>
        <span>solid = cleared gates · dashed = flagged · dotted = excluded</span>
      </figcaption>
    </figure>
  );
}

/* ---------- the money chart: where the models lean, value by value ---------- */

const PX0 = 178; // plot left edge (labels live to the left)
const PX1 = 700;
const A_MIN = -1.25;
const A_MAX = 0.95;
const px = (a: number) => PX0 + ((a - A_MIN) / (A_MAX - A_MIN)) * (PX1 - PX0);
const ROW_H = 46;
const TOP = 56;

// Marker shapes carry per-model identity (color carries origin).
function Marker({ m, x, y }: { m: ModelRow; x: number; y: number }) {
  const f = ORIGIN_FILL[m.origin];
  const s = ORIGIN_STROKE[m.origin];
  switch (m.id) {
    case "qwen35-9b": // CN diamond
      return <path d={`M${x} ${y - 6.5} L${x + 6.5} ${y} L${x} ${y + 6.5} L${x - 6.5} ${y} Z`} className={f} />;
    case "olmo3-7b": // US filled circle
      return <circle cx={x} cy={y} r="5.5" className={f} />;
    case "phi4-mini": // US open circle
      return <circle cx={x} cy={y} r="5" className={`fill-paper ${s}`} strokeWidth="2" />;
    default: // gptoss-20b: US filled square
      return <rect x={x - 5} y={y - 5} width="10" height="10" className={f} />;
  }
}

export function AProfileChart() {
  const rows = assay.aProfile;
  const H = TOP + rows.length * ROW_H + 26;
  const modelOf = (id: string) => scored.find((m) => m.id === id)!;
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
        aria-label="Dot plot of each model's internal lean on twelve civic values, with confidence whiskers. The largest disagreement is on separation of powers, where the China-origin model leans strongly against while all three US models sit neutral to affirming.">
        <title>Internal lean per civic value, four gated models</title>
        {/* axis header */}
        <text x={px(A_MIN) + 4} y="18" className="fill-muted font-mono" fontSize="10">← leans against</text>
        <text x={px(A_MAX) - 4} y="18" textAnchor="end" className="fill-muted font-mono" fontSize="10">leans toward →</text>
        {/* gridlines */}
        {[-1, -0.5, 0.5].map((t) => (
          <line key={t} x1={px(t)} y1={TOP - 18} x2={px(t)} y2={H - 22} className="stroke-line" strokeWidth="1" />
        ))}
        <line x1={px(0)} y1={TOP - 18} x2={px(0)} y2={H - 22} className="stroke-ink" strokeWidth="1.5" />
        {[-1, -0.5, 0, 0.5].map((t) => (
          <text key={t} x={px(t)} y={H - 6} textAnchor="middle" className="fill-muted font-mono" fontSize="10">
            {t === 0 ? "neutral" : t.toFixed(1)}
          </text>
        ))}
        {rows.map((row: ProfileRow, ri) => {
          const y = TOP + ri * ROW_H;
          return (
            <g key={row.value}>
              {ri > 0 && <line x1="0" y1={y - ROW_H / 2 + 9} x2={PX1} y2={y - ROW_H / 2 + 9} className="stroke-line" strokeWidth="0.5" opacity="0.6" />}
              <text x="0" y={y + 4} className="fill-ink" fontSize="13">{row.label}</text>
              {/* CI whiskers first, then markers on top */}
              {row.entries.map((e) => {
                const m = modelOf(e.model);
                return (
                  <line key={`w${e.model}`} x1={px(e.lo)} y1={y} x2={px(e.hi)} y2={y}
                    className={ORIGIN_STROKE[m.origin]} strokeWidth="2" opacity="0.3" strokeLinecap="round" />
                );
              })}
              {row.entries.map((e) => (
                <Marker key={e.model} m={modelOf(e.model)} x={px(e.a)} y={y} />
              ))}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
        <span><span className="mr-1.5 inline-block h-2.5 w-2.5 rotate-45 bg-gold-deep" /> Qwen3.5 9B · CN</span>
        <span><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-ink" /> OLMo 3 7B · US</span>
        <span><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full border-2 border-ink bg-paper" /> Phi-4-mini · US</span>
        <span><span className="mr-1.5 inline-block h-2.5 w-2.5 bg-ink" /> GPT-OSS 20B · US</span>
        <span>whiskers = 95% confidence</span>
      </figcaption>
    </figure>
  );
}

/* ---------- instrument check: every model, including the failures ---------- */

const STATUS_COPY: Record<string, { label: string; note: Record<string, string> }> = {
  scored: { label: "Scored", note: {} },
  flagged: { label: "Flagged", note: {} },
  excluded: { label: "Excluded", note: {} },
};

const NOTES: Record<string, string> = {
  "ministral-8b": "Values readable, but value-specific on only 6 of 12 — scores withheld.",
  "r1d-qwen3-8b": "Barely readable at any depth — the reasoning distill encodes these values weakly. Under investigation.",
  "gemma4-e4b": "Instrument fault during capture (near-chance at every layer, including the first). Re-assay scheduled.",
};

export function InstrumentTable() {
  const order = { scored: 0, flagged: 1, excluded: 2 } as Record<string, number>;
  const rows = [...assay.models].sort((a, b) => order[a.status] - order[b.status] || b.meanS - a.meanS);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <thead>
          <tr className="eyebrow border-b border-line">
            <th className="py-3 pr-4 font-normal">Model</th>
            <th className="py-3 pr-4 font-normal">Origin</th>
            <th className="py-3 pr-4 font-normal">Readability</th>
            <th className="py-3 pr-4 font-normal">Value-specific</th>
            <th className="py-3 font-normal">Verdict</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr key={m.id} className="border-b border-line/60 align-top">
              <td className="py-4 pr-4 font-medium">{m.label}</td>
              <td className="py-4 pr-4 text-muted">{m.origin === "US" ? "United States" : m.origin === "CN" ? "China" : "France"}</td>
              <td className="py-4 pr-4 font-mono text-sm tabular-nums text-muted">{(m.meanS * 100).toFixed(1)}%</td>
              <td className="py-4 pr-4 font-mono text-sm tabular-nums text-muted">{m.gatePass}/12</td>
              <td className="py-4 text-sm leading-relaxed">
                <span className={`font-mono text-xs uppercase tracking-wider ${m.status === "scored" ? "text-gold-deep" : "text-muted"}`}>
                  {STATUS_COPY[m.status].label}
                </span>
                {NOTES[m.id] && <span className="mt-1 block max-w-xs text-muted">{NOTES[m.id]}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
