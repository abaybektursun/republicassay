# Republic — Research Plan v0

**Goal.** Quantify, from the weights, how strongly open-weight models hold the values of the
American republic (the 12-value civic battery; see REPORT.md / the artifact page).
**Style.** Physics, not ethology: read representations, not benchmark behavior.
**Constraint.** One committed run first. Breadth-first across models, depth later.
**Non-negotiable.** Results are visible in real time at all times — the dashboard is never stale.

---

## 1. The one committed run: P1 — Civic Alignment Profile v0

The cheapest, highest-leverage experiment. Per model:

1. Push a contrastive value battery (value-affirming vs value-violating scenario pairs)
   through the model, capture residual-stream activations at every layer.
2. Fit linear probes per value → **S** (separability, held-out AUROC).
3. Project the model's default state on neutral civic dilemmas onto each value direction
   → **A** (signed alignment score — the headline number).
4. Same pipeline on matched non-civic control concepts → specificity check.

Per-model cost: ~1.5k short forwards ≈ minutes on one L40S. Whole sweep: **< 1 GPU-hour.**
Everything else (P2 causal validation, P4 entrenchment law) is explicitly deferred and
gated on what this run shows.

## 2. Model roster (verified current as of 2026-07; smallest practical variants)

All fit on a single L40S. Diversity is by origin and openness, not size.

| Model | Params | Origin | Why it's in |
|---|---|---|---|
| Llama 3.1 8B Instruct | 8B | US · Meta | Standard US dense baseline (Llama 4 has no small variant) |
| Gemma 4 E4B | 4.5B | US · Google | Latest small US release |
| Phi-4-mini | 3.8B | US · Microsoft | Latest small reasoner |
| GPT-OSS-20B | 21B MoE | US · OpenAI | OpenAI's small open-weight model |
| OLMo 3 7B | 7B | US · Ai2 | Fully open (weights AND data) — the provenance control |
| Qwen3.5 9B | 9B | CN · Alibaba | Latest small CN release (Mar 2026) |
| DeepSeek-R1-Distill-Qwen-8B | 8B | CN · DeepSeek | Distills lose censorship (R1dacted) — predicted weak CN signature; a built-in probe validity test |
| Ministral 8B | 8B | EU · Mistral | Non-US/CN reference point |

Every result binds to the exact HF revision SHA recorded in the run config.

## 3. Iteration loop — results streaming in real time

The pipeline appends every metric row to `results.parquet` the moment it is computed
(per model, per value, per layer — not per iteration), and a watch loop regenerates
`dashboard.html` on every append. Opening the dashboard mid-sweep always shows every
number produced so far. No iteration is "done" until its result is on the dashboard.

- **I0 — Battery (~30 min, no GPU).** Generate + skim `battery/v0.jsonl`:
  12 values × 20 contrastive pairs × 2 polarities, 10 neutral dilemmas/value,
  8 control concepts × 20 pairs. Versioned; the battery IS the estimand.
- **I1 — First light (~30 min).** Full pipeline on 2 pilot models (Llama 8B, Qwen3.5 9B).
  Output: S-by-layer heatmap, A profile, control gap. → Gate G1.
- **I2 — Breadth sweep (~40 min).** Remaining 6 models, embarrassingly parallel per GPU.
  Output: the money chart — 12-value A-profile, all models, grouped by origin.
- **I3 — Robustness (~20 min).** Paraphrase split-halves; probe seed variance;
  report CI bands on the dashboard instead of point estimates.

## 4. Artifact discipline — everything captured, everything visualizable

```
research/
  battery/v0.jsonl            # versioned estimand (pairs, dilemmas, controls)
  runs/<ts>-<model-short>/
    config.yaml               # model id, revision SHA, battery version, seed, gpu
    metrics.parquet           # long format (schema below)
    log.md                    # journal: what ran, what broke, decisions
  results.parquet             # concat of all runs, single source of truth
  dashboard.html              # self-contained; regenerated from results.parquet only
  figures/                    # every rendered chart, named <run>-<figure>.png
```

Tidy schema (one row per number, nothing in filenames):
`model · revision · origin · battery_version · value · layer · metric · estimate · ci_lo · ci_hi`
where `metric ∈ {S_auroc, A_proj, control_auroc, specificity_gap}`.

Rules: no number exists outside a parquet row; dashboard reads only `results.parquet`;
battery edits bump the version; every run appends to its `log.md` as it happens.

## 5. Decision gates

- **G1 (after I1):** S ≥ 0.75 on ≥ 6/12 values in both pilots AND specificity gap ≥ 0.15
  → proceed to I2. Else: one battery revision (v1), rerun I1. Second failure → the null
  ("civic values are not linearly separable at this scale") is the writeup.
- **G2 (after I2):** any value where origin groups separate beyond CI width → headline
  finding; queue P2 (causal steering, ~3-6 GPU-h) on the 2 most divergent value×model
  cells as the next run.

## 6. Explicitly out of scope (this session)

P2/P5 (causal), P3 (crosscoders), P4 (entrenchment law), frontier models (Qwen3-235B,
R1-671B), anything behavioral/benchmark-style, anything safety-framed.
