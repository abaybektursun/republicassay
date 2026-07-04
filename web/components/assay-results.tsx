import assay from "@/lib/assay-data.json";

// First-light assay results, rendered as static SVG straight from the exported
// research record (research/export_web.py -> lib/assay-data.json). Origin is
// the color channel (US ink, CN deep gold, EU muted, KR gold); per-model
// identity is carried by panels or marker shape, never by color alone.

type ModelRow = (typeof assay.models)[number] & {
  index?: number;
  indexHw?: number;
  avgRank?: number;
  leadValues?: string[];
  trailValues?: string[];
};
type ProfileRow = (typeof assay.aProfile)[number];

const models = assay.models as ModelRow[];
const scored = models.filter((m) => m.status === "scored");

const STROKE: Record<string, string> = {
  US: "stroke-ink",
  CN: "stroke-gold-deep",
  EU: "stroke-muted",
  KR: "stroke-gold",
};
const FILL: Record<string, string> = {
  US: "fill-ink",
  CN: "fill-gold-deep",
  EU: "fill-muted",
  KR: "fill-gold",
};
// Origins beyond the palette fall back to muted; identity never rides on color
// alone (panels are named; markers carry shape; origin text is always printed).
const ORIGIN_STROKE = new Proxy(STROKE, { get: (t, k: string) => t[k] ?? "stroke-muted" });
const ORIGIN_FILL = new Proxy(FILL, { get: (t, k: string) => t[k] ?? "fill-muted" });
const VERDICT: Record<string, string> = {
  scored: "cleared gates",
  flagged: "flagged",
  excluded: "excluded",
};

/* ---------- headline numbers ---------- */

export function AssayStats() {
  const minSep = Math.min(...scored.map((m) => m.minS));
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-4">
      {[
        { v: String(models.length), k: "models assayed" },
        { v: String(scored.length), k: "cleared both gates" },
        { v: "12", k: "values per model" },
        { v: `≥${Math.floor(minSep * 100)}%`, k: "separation, gated models" },
      ].map((s) => (
        <div key={s.k} className="bg-paper px-5 py-6">
          <p className="font-display text-4xl sm:text-5xl">{s.v}</p>
          <p className="eyebrow mt-2">{s.k}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- readability by depth: small multiples, one panel per model ---------- */

// Shared scale across every panel, so panels compare directly.
const PW = 160;
const PH = 100;
const pcx = (d: number) => 4 + d * (PW - 8);
const pcy = (s: number) => 88 - ((s - 0.45) / 0.57) * 78;

function panelPath(m: ModelRow) {
  return m.sCurve
    .map((p, i) => `${i ? "L" : "M"}${pcx(p.d).toFixed(1)} ${pcy(p.s).toFixed(1)}`)
    .join(" ");
}

export function LayerCourseChart() {
  const order = { scored: 0, flagged: 1, excluded: 2 } as Record<string, number>;
  const panels = [...models].sort(
    (a, b) => order[a.status] - order[b.status] || b.meanS - a.meanS,
  );
  return (
    <figure>
      <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.12em] leading-relaxed text-muted">
        Each panel: probe accuracy by depth for one model · bottom line 0.50 =
        coin flip, value unreadable · top line 1.00 = perfect separation ·{" "}
        <span className="text-gold-deep">●</span> best layer · faint curves =
        rest of cohort
      </p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {panels.map((m) => {
          const peakD = m.peakLayer / m.nLayers;
          const peakPt = m.sCurve.reduce((best, p) =>
            Math.abs(p.d - peakD) < Math.abs(best.d - peakD) ? p : best,
          );
          return (
            <figure key={m.id}>
              <svg
                viewBox={`0 0 ${PW} ${PH}`}
                className="w-full"
                role="img"
                aria-label={`${m.label}: readability rises to ${(m.meanS * 100).toFixed(0)}% at its best layer${m.status === "scored" ? "" : `; ${VERDICT[m.status]}`}`}
              >
                <line x1="0" y1={pcy(1)} x2={PW} y2={pcy(1)} className="stroke-line" strokeWidth="1" />
                <line x1="0" y1={pcy(0.5)} x2={PW} y2={pcy(0.5)} className="stroke-line" strokeWidth="1" strokeDasharray="3 3" />
                {models.filter((o) => o.id !== m.id).map((o) => (
                  <path key={o.id} d={panelPath(o)} fill="none" className="stroke-line" strokeWidth="1" opacity="0.7" />
                ))}
                <path d={panelPath(m)} fill="none" className={ORIGIN_STROKE[m.origin]} strokeWidth="2" />
                <circle cx={pcx(peakPt.d)} cy={pcy(peakPt.s)} r="3" className="fill-gold" />
              </svg>
              <figcaption className="mt-2">
                <p className="text-sm font-medium leading-tight">{m.label}</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                  {m.originLabel} ·{" "}
                  <span className={m.status === "scored" ? "text-gold-deep" : ""}>
                    {VERDICT[m.status]}
                  </span>
                </p>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </figure>
  );
}

/* ---------- the ranking: provisional first-light leaderboard ---------- */

export function Leaderboard() {
  const ranked = [...scored].sort((a, b) => (a.avgRank ?? 9) - (b.avgRank ?? 9));
  const span = Math.max(...scored.map((m) => Math.abs(m.index ?? 0) + (m.indexHw ?? 0))) * 1.15;
  const ix = (v: number) => 100 + (v / span) * 95; // centered-zero bar, viewBox 0-200
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[44rem] border-collapse text-left">
        <thead>
          <tr className="eyebrow border-b border-line">
            <th className="py-3 pr-4 font-normal">Rank</th>
            <th className="py-3 pr-4 font-normal">Model</th>
            <th className="py-3 pr-4 font-normal">Overall lean (mean of 12)</th>
            <th className="py-3 pr-4 font-normal">Avg. rank across values</th>
            <th className="py-3 font-normal">Most / least aligned on</th>
          </tr>
        </thead>
        <tbody>
          {ranked.map((m, i) => (
            <tr key={m.id} className="border-b border-line/60 align-top">
              <td className="py-5 pr-4 font-display text-3xl">{i + 1}</td>
              <td className="py-5 pr-4">
                <span className="font-medium">{m.label}</span>
                <span className="mt-0.5 block font-mono text-xs text-muted">
                  {m.lab} · {m.originLabel}
                </span>
              </td>
              <td className="py-5 pr-4">
                <svg viewBox="0 0 200 26" className="w-44" role="img"
                  aria-label={`Overall lean ${m.index?.toFixed(2)} plus or minus ${m.indexHw?.toFixed(2)}`}>
                  <line x1="0" y1="13" x2="200" y2="13" className="stroke-line" strokeWidth="1" />
                  <line x1="100" y1="3" x2="100" y2="23" className="stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
                  <line
                    x1={ix((m.index ?? 0) - (m.indexHw ?? 0))} y1="13"
                    x2={ix((m.index ?? 0) + (m.indexHw ?? 0))} y2="13"
                    className={ORIGIN_STROKE[m.origin]} strokeWidth="6" opacity="0.25" strokeLinecap="round" />
                  <circle cx={ix(m.index ?? 0)} cy="13" r="5" className={ORIGIN_FILL[m.origin]} />
                </svg>
                <span className="font-mono text-xs tabular-nums text-muted">
                  {(m.index ?? 0) >= 0 ? "+" : ""}{m.index?.toFixed(2)} ± {m.indexHw?.toFixed(2)}
                </span>
              </td>
              <td className="py-5 pr-4 font-mono text-sm tabular-nums text-muted">{m.avgRank?.toFixed(2)}</td>
              <td className="py-5 text-sm leading-relaxed">
                <span className="block"><span className="font-mono text-[10px] uppercase tracking-wider text-gold-deep">most</span> {m.leadValues?.length ? m.leadValues.join(", ") : "—"}</span>
                <span className="mt-1 block text-muted"><span className="font-mono text-[10px] uppercase tracking-wider">least</span> {m.trailValues?.length ? m.trailValues.join(", ") : "—"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- the money chart: where the models lean, value by value ---------- */

const W = 720;
const PX0 = 178; // plot left edge (labels live to the left)
const PX1 = 700;
const allA = assay.aProfile.flatMap((r) => r.entries.flatMap((e) => [e.lo, e.hi]));
const A_MIN = Math.min(...allA, -0.3) - 0.08;
const A_MAX = Math.max(...allA, 0.3) + 0.08;
const px = (a: number) => PX0 + ((a - A_MIN) / (A_MAX - A_MIN)) * (PX1 - PX0);
const TICKS: number[] = [];
for (let t = Math.ceil(A_MIN * 2) / 2; t <= A_MAX; t += 0.5) TICKS.push(Math.round(t * 2) / 2);
const ROW_H = 46;
const TOP = 56;

// Shape cycle carries per-model identity within an origin color.
const SHAPES = ["diamond", "circle", "circleOpen", "square", "triangle", "squareOpen"] as const;
const shapeOf = (id: string) => SHAPES[scored.findIndex((m) => m.id === id) % SHAPES.length];

function Marker({ m, x, y }: { m: ModelRow; x: number; y: number }) {
  const f = ORIGIN_FILL[m.origin];
  const s = ORIGIN_STROKE[m.origin];
  switch (shapeOf(m.id)) {
    case "diamond":
      return <path d={`M${x} ${y - 6.5} L${x + 6.5} ${y} L${x} ${y + 6.5} L${x - 6.5} ${y} Z`} className={f} />;
    case "circle":
      return <circle cx={x} cy={y} r="5.5" className={f} />;
    case "circleOpen":
      return <circle cx={x} cy={y} r="5" className={`fill-paper ${s}`} strokeWidth="2" />;
    case "square":
      return <rect x={x - 5} y={y - 5} width="10" height="10" className={f} />;
    case "triangle":
      return <path d={`M${x} ${y - 6.5} L${x + 6} ${y + 5} L${x - 6} ${y + 5} Z`} className={f} />;
    default:
      return <rect x={x - 4.5} y={y - 4.5} width="9" height="9" className={`fill-paper ${s}`} strokeWidth="2" />;
  }
}

// Legend marker rendered in a tiny standalone SVG so it always matches the plot.
function LegendMark({ m }: { m: ModelRow }) {
  return (
    <svg viewBox="0 0 16 16" className="inline-block h-3.5 w-3.5 align-[-2px]" aria-hidden="true">
      <Marker m={m} x={8} y={8} />
    </svg>
  );
}

export function AProfileChart() {
  const rows = assay.aProfile;
  const H = TOP + rows.length * ROW_H + 26;
  const modelOf = (id: string) => scored.find((m) => m.id === id)!;
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
        aria-label="Dot plot of each gated model's internal lean on twelve civic values, with confidence whiskers, sorted by cross-model disagreement.">
        <title>Internal lean per civic value, gated models</title>
        <text x={px(A_MIN) + 4} y="18" className="fill-muted font-mono" fontSize="10">← leans against</text>
        <text x={px(A_MAX) - 4} y="18" textAnchor="end" className="fill-muted font-mono" fontSize="10">leans toward →</text>
        {TICKS.filter((t) => t !== 0).map((t) => (
          <line key={t} x1={px(t)} y1={TOP - 18} x2={px(t)} y2={H - 22} className="stroke-line" strokeWidth="1" />
        ))}
        <line x1={px(0)} y1={TOP - 18} x2={px(0)} y2={H - 22} className="stroke-ink" strokeWidth="1.5" />
        {TICKS.map((t) => (
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
      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
        {scored.map((m) => (
          <span key={m.id} className="inline-flex items-center gap-1.5">
            <LegendMark m={m} /> {m.label} · {m.origin}
          </span>
        ))}
        <span>whiskers = 95% confidence</span>
      </figcaption>
    </figure>
  );
}

/* ---------- instrument check: every model, including the failures ---------- */

const NOTES: Record<string, string> = {
  "ministral-8b": "Values readable, but value-specific on only 6 of 12 — scores withheld.",
  "apertus-4b": "Weak at every depth and above coin-flip at layer 0 — the signature of a capture fault, as with Gemma. Suspected instrument issue; re-assay queued.",
  "r1d-qwen3-8b": "Barely readable at any depth, while its base model (Qwen3 8B) reads 0.998 through the identical pipeline — the R1 reasoning distillation itself erased the linear value structure.",
  "gemma4-e4b": "Instrument fault during capture (near-chance at every layer, including the first). Re-assay scheduled.",
  "falcon-h1r-7b": "Weak everywhere with the same layer-0 anomaly — hybrid Mamba/attention architecture; suspected capture fault, re-assay queued.",
  "minicpm5-1b": "High specificity but separation below the gate — a possible capacity floor near 1B parameters.",
  "exaone4-1.2b": "High specificity but separation below the gate — a possible capacity floor near 1B parameters.",
};

export function InstrumentTable() {
  const order = { scored: 0, flagged: 1, excluded: 2 } as Record<string, number>;
  const rows = [...models].sort((a, b) => order[a.status] - order[b.status] || b.meanGap - a.meanGap);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <thead>
          <tr className="eyebrow border-b border-line">
            <th className="py-3 pr-4 font-normal">Model</th>
            <th className="py-3 pr-4 font-normal">Origin</th>
            <th className="py-3 pr-4 font-normal">Specificity margin</th>
            <th className="py-3 pr-4 font-normal">Value-specific</th>
            <th className="py-3 font-normal">Verdict</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr key={m.id} className="border-b border-line/60 align-top">
              <td className="py-4 pr-4 font-medium">{m.label}</td>
              <td className="py-4 pr-4 text-muted">{m.originLabel}</td>
              <td className="py-4 pr-4 font-mono text-sm tabular-nums text-muted">+{m.meanGap.toFixed(2)}</td>
              <td className="py-4 pr-4 font-mono text-sm tabular-nums text-muted">{m.gatePass}/12</td>
              <td className="py-4 text-sm leading-relaxed">
                <span className={`font-mono text-xs uppercase tracking-wider ${m.status === "scored" ? "text-gold-deep" : "text-muted"}`}>
                  {m.status === "scored" ? "Scored" : m.status === "flagged" ? "Flagged" : "Excluded"}
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
