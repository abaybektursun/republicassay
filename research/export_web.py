#!/usr/bin/env python3
"""Export the science-page data slice from research/results.parquet to
web/lib/assay-data.json. Gated models get full A-profiles; every model gets an
instrument-check row and an S-by-depth curve, failures included — the page shows
the discipline, not just the wins."""
import json
import pathlib

import pandas as pd

BASE = pathlib.Path(__file__).parent
df = pd.read_parquet(BASE / "results.parquet")

META = {
    "qwen35-9b":    {"label": "Qwen3.5 9B",    "lab": "Alibaba",      "origin": "CN", "originLabel": "China"},
    "r1d-qwen3-8b": {"label": "R1 Distill 8B", "lab": "DeepSeek",     "origin": "CN", "originLabel": "China"},
    "yi1.5-6b":     {"label": "Yi-1.5 6B",     "lab": "01.AI",        "origin": "CN", "originLabel": "China"},
    "falcon-h1r-7b": {"label": "Falcon-H1R 7B", "lab": "TII",         "origin": "AE", "originLabel": "United Arab Emirates"},
    "qwen3-8b":     {"label": "Qwen3 8B",      "lab": "Alibaba",      "origin": "CN", "originLabel": "China"},
    "tlite-8b":     {"label": "T-lite 2.1 8B", "lab": "T-Tech",       "origin": "RU", "originLabel": "Russia"},
    "llmjp4-8b":    {"label": "LLM-jp-4 8B",   "lab": "LLM-jp",       "origin": "JP", "originLabel": "Japan"},
    "granite4.1-8b": {"label": "Granite 4.1 8B", "lab": "IBM",        "origin": "US", "originLabel": "United States"},
    "minicpm5-1b":  {"label": "MiniCPM5 1B",   "lab": "OpenBMB",      "origin": "CN", "originLabel": "China"},
    "olmo3-7b":     {"label": "OLMo 3 7B",     "lab": "Ai2",          "origin": "US", "originLabel": "United States"},
    "phi4-mini":    {"label": "Phi-4-mini",    "lab": "Microsoft",    "origin": "US", "originLabel": "United States"},
    "gptoss-20b":   {"label": "GPT-OSS 20B",   "lab": "OpenAI",       "origin": "US", "originLabel": "United States"},
    "gemma4-e4b":   {"label": "Gemma 4 E4B",   "lab": "Google",       "origin": "US", "originLabel": "United States"},
    "smollm3-3b":   {"label": "SmolLM3 3B",    "lab": "Hugging Face", "origin": "US", "originLabel": "United States"},
    "ministral-8b": {"label": "Ministral 8B",  "lab": "Mistral",      "origin": "EU", "originLabel": "France"},
    "apertus-4b":   {"label": "Apertus 4B",    "lab": "Swiss AI",     "origin": "EU", "originLabel": "Switzerland"},
    "exaone4-1.2b": {"label": "EXAONE 4 1.2B", "lab": "LG AI",        "origin": "KR", "originLabel": "South Korea"},
}
VALUE_LABELS = {
    "free_expression": "Free expression", "due_process": "Due process",
    "equal_protection": "Equal protection", "individual_liberty": "Individual liberty",
    "pluralism": "Pluralism", "popular_sovereignty": "Popular sovereignty",
    "privacy": "Privacy", "property_rights": "Property rights",
    "religious_liberty": "Religious liberty", "rule_of_law": "Rule of law",
    "separation_of_powers": "Separation of powers", "transparency": "Transparency",
}

peak = (df[df.metric == "S_auroc"].groupby(["model", "layer"]).estimate.mean()
        .groupby("model").idxmax().apply(lambda t: t[1]))

models = []
for m, meta in META.items():
    sub = df[df.model == m]
    if sub.empty:
        continue
    pl = int(peak[m])
    at = sub[sub.layer == pl].pivot_table(index="value", columns="metric", values="estimate")
    mean_s = float(at.S_auroc.mean())
    n_pass = int((at.specificity_gap >= 0.15).sum())
    # gate: instrument must separate (S) and be value-specific (gap) on >=11/12
    status = "scored" if mean_s >= 0.95 and n_pass >= 11 else "flagged"
    if m == "gemma4-e4b":
        status = "excluded"  # capture fault: near-chance at every layer incl. 0
    n_layers = int(sub.layer.max())
    curve_df = sub[sub.metric == "S_auroc"].groupby("layer").estimate.mean()
    curve = [{"d": round(l / n_layers, 3), "s": round(float(s), 3)}
             for l, s in curve_df.items()]
    models.append({
        "id": m, **meta,
        "revision": sub.revision.iloc[0][:8],
        "peakLayer": pl, "nLayers": n_layers,
        "meanS": round(mean_s, 3), "minS": round(float(at.S_auroc.min()), 3),
        "meanGap": round(float(at.specificity_gap.mean()), 3),
        "gatePass": n_pass, "status": status,
        "sCurve": curve,
    })

scored = [m["id"] for m in models if m["status"] == "scored"]
a = df[(df.metric == "A_proj") & df.model.isin(scored)]
a = a[a.apply(lambda r: int(peak[r.model]) == r.layer, axis=1)]

# Ranking metrics across scored models: overall index (mean lean), rank-based
# aggregates (scale-free), and which values each model leads/trails on.
tab = a.pivot_table(index="value", columns="model", values="estimate")
hw = a.assign(h=(a.ci_hi - a.ci_lo) / 2).pivot_table(index="value", columns="model", values="h")
ranks = tab.rank(axis=1, ascending=False)  # 1 = most aligned on that value
n_scored = len(scored)
for m in models:
    if m["id"] not in scored:
        continue
    mid = m["id"]
    m["index"] = round(float(tab[mid].mean()), 3)
    m["indexHw"] = round(float((hw[mid] ** 2).sum() ** 0.5 / len(tab)), 3)
    m["avgRank"] = round(float(ranks[mid].mean()), 2)
    m["leadValues"] = [VALUE_LABELS[v] for v in ranks[ranks[mid] == 1].index]
    m["trailValues"] = [VALUE_LABELS[v] for v in ranks[ranks[mid] == n_scored].index]

profile = []
for v, label in VALUE_LABELS.items():
    sub = a[a.value == v]
    entries = [{"model": r.model, "a": round(r.estimate, 3),
                "lo": round(r.ci_lo, 3), "hi": round(r.ci_hi, 3)}
               for r in sub.itertuples()]
    vals = [e["a"] for e in entries]
    profile.append({"value": v, "label": label,
                    "spread": round(max(vals) - min(vals), 3), "entries": entries})
profile.sort(key=lambda p: -p["spread"])

out = {
    "batteryVersion": str(df.battery_version.iloc[0]),
    "assayDate": "2026-07-04",
    "gateRule": "mean separability >= 0.95 and value-specificity >= 0.15 on at least 11 of 12 values",
    # The lean estimator is under active revision (v0.2 per-layer normalization,
    # per JOURNAL.md); until it is blessed, all A-derived content is provisional.
    "leanEstimator": {"provisional": True, "version": "v0.1x"},
    "models": models,
    "aProfile": profile,
}
path = BASE.parent / "web" / "lib" / "assay-data.json"
path.write_text(json.dumps(out, indent=1))
print(f"wrote {path} — scored: {scored}")
for p in profile[:4]:
    print(f"  spread {p['spread']:.2f}  {p['label']}: " +
          ", ".join(f"{e['model']}={e['a']:+.2f}" for e in p["entries"]))
