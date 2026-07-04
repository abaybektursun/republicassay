# Research journal — P1 Civic Alignment Profile

## 2026-07-04 — session 1: instrument built, first light, valence fix, sweep launched

**Infra.** Reused the `pg` ephemeral-EC2 launcher from `~/projects/ntm-frozen-gemma` unchanged
(one new job module there: `infra/aws_pg/jobs/republic_p1.py`). All AWS on profile `fuelos`,
us-east-1, bucket `pg-lineage-769063704696`, prefix `republic/`. Launch policy: smallest capable
instance first (`g6e.2xlarge,...`) — every g6e size carries the same 1xL40S-48GB and the big
sizes are usually capacity-dry (the 8xlarge was dry at first sweep attempt).

**Roster.** All 8 PLAN models verified against the live HF API, pinned to revision SHAs
(`research/roster-verification.json`). Corrections vs PLAN: the DeepSeek 8B distill is
`deepseek-ai/DeepSeek-R1-0528-Qwen3-8B` (the literal name doesn't exist); Qwen3.5-9B has no
"-Instruct" suffix (the bare name IS the post-trained model); Gemma 4 E4B and Qwen3.5 are
multimodal ForConditionalGeneration checkpoints. `llama31-8b` is HF-gated — parked until
license is accepted on the HF account.

**I0 battery v0.** 920 texts: 12 civic values x 20 matched contrastive pairs x 2 polarities
+ 10 neutral dilemmas each, 8 non-civic control concepts x 20 pairs. Matched-pair discipline:
same scenario/actors/length within a pair, no evaluative vocabulary (banned-word validated),
>=12 settings per concept. `battery/validate.py` enforces schema/counts/pairing/word rules.

**I1a (run `i1a-qwen35`, Qwen3.5-9B, raw pipeline) — G1 FAIL, informative.**
S ~= 1.0 on 12/12 values (layer 17/32) BUT civic probes transferred to non-civic controls at
~0.9 AUROC: they had learned the generic good/bad valence axis, not civic content.
Mean specificity gap +0.085 < 0.15 gate. Exception: individual_liberty (+0.29).

**Pipeline v0.1 — de-valencing.** Per layer, project out the top-4 SVD directions of
affirm-violate diffs from 4 of the 8 control concepts (healthy_eating, punctuality, politeness,
cleanliness); measure specificity on the OTHER 4 held out (no circularity). Primary metrics are
de-valenced; raw kept as `*_raw`. Synthetic test: projection kills a planted valence axis
(+5.72 -> +0.04) while preserving an orthogonal planted signal (+3.92 -> +3.58).
Runs now also save raw activations (float16 npy, S3) so probe-side iteration is local and free.

**I1b (run `i1b-qwen35-dv`) — G1 (single-pilot) PASS.**
De-valenced S >= 0.975 on 12/12 (best layer 18); mean specificity gap +0.336 (raw +0.093);
all 12 values individually clear the 0.15 gate. Most value-specific: individual_liberty,
privacy, free_expression (held-out control transfer ~0.53-0.56). Least: popular_sovereignty
(0.80). Conclusion: Qwen3.5-9B linearly encodes civic-value structure beyond generic valence.
A-profile (affirm pole = +1): pluralism +0.68, property_rights +0.18 on the affirm side;
separation_of_powers -1.07, popular_sovereignty -0.57 strongest on the violate side.
Interpretation deferred to cross-model comparison (dilemma texts may read as
"value under tension" generically).

**I2 (in flight).** Two parallel jobs, smallest models first:
`i2-sweep-small` (phi4-mini, olmo3-7b, gemma4-e4b, ministral-8b, r1d-qwen3-8b) and
`i2-gptoss` (gpt-oss-20b on >=g6e.4xlarge for RAM headroom). Next gate: G2 — any value where
origin groups separate beyond CI width.

**Cost so far:** four short single-GPU instances, ~$2.

## 2026-07-04 — session 1 (cont.): I2 breadth sweep complete, 7/8 models profiled

`i2-sweep-small` (phi4-mini, olmo3-7b, gemma4-e4b, ministral-8b, r1d-qwen3-8b, sequential on
one g6e.2xlarge, ~24 min) and `i2-gptoss-b` (g6e.4xlarge after a capacity retry loop; the
first attempt crashed on gpt-oss's mxfp4 dequant leaving experts on cpu -> fixed with
cpu_load-then-cuda). All exit=0. llama31-8b still parked on HF gating.

**Instrument health across models (de-valenced, at per-model best layer):**
S >= 0.94 on 12/12 for gptoss-20b (+0.374 mean gap), qwen35-9b (+0.336), phi4-mini (+0.306),
olmo3-7b (+0.298), ministral-8b (+0.211). Weaker: r1d-qwen3-8b (min_S 0.525, gap +0.114),
gemma4-e4b (best layer implausibly early at 5/42, min_S 0.475, gap +0.106 — likely a
per-layer-scale or architecture quirk worth a look at its saved activations).

**Known defect found by the sweep — A_proj scale explosion.** A is normalized by the
affirm-violate span along the diff-of-means direction; where dilemma activations have much
larger norms than pair activations (ministral-8b late layers: A in the +/-100 range;
r1d property_rights -21), the scaling is meaningless. Cross-model A comparison (and therefore
G2) is NOT yet trustworthy. G2 formally: no value separates US/CN beyond CI width under the
current estimator.

**Next (local, free — all runs saved raw activations):** v0.2 A estimator with per-layer
activation normalization, recomputed from saved acts; then re-evaluate G2. Suggestive
(unverified) contrast pending that fix: separation_of_powers reads +0.40 (gptoss) vs -1.07
(qwen35); religious_liberty US-positive vs CN-negative.

**Cost:** session total ~7 instance launches, well under $5.
