# P1 runbook — Civic Alignment Profile v0

Compute runs on ephemeral EC2 via the existing `pg` launcher in `~/projects/ntm-frozen-gemma`
(job module `infra/aws_pg/jobs/republic_p1.py` there — the one republic-specific file in that repo).
All AWS calls: profile `fuelos`, region `us-east-1`, bucket `pg-lineage-769063704696`.

## 1. Validate + publish the battery (once per battery version)
```sh
python3 research/battery/validate.py research/battery/v0.jsonl
aws s3 cp research/battery/v0.jsonl s3://pg-lineage-769063704696/republic/battery/v0.jsonl \
  --profile fuelos --region us-east-1
```

## 2. Launch (one job, one or more models, sequential on one GPU)
```sh
cd ~/projects/ntm-frozen-gemma
infra/aws_pg/pg run infra.aws_pg.jobs.republic_p1 \
  --args "--models qwen35-9b --battery s3://pg-lineage-769063704696/republic/battery/v0.jsonl" \
  --no-weights --budget-min 90 \
  --type "g6e.2xlarge,g6e.4xlarge,g6e.8xlarge,p5.4xlarge" \
  --s3-prefix republic/runs/<name>
```
`--no-weights` is required (the default weights URI is the old project's PaliGemma cache).
`--type` is smallest-capable-first BY POLICY: every g6e size carries the same 1xL40S-48GB,
big boxes are usually capacity-dry, and the launcher skips dry tiers in seconds (never waits).
All roster models fit 48GB in bf16; for gpt-oss-20b (~42GB dequantized) start the list at
g6e.4xlarge for CPU-RAM headroom.
`pg run` watches until the STATUS marker appears; exit 0 then check STATUS body for `exit=0`.
Model keys: llama31-8b gemma4-e4b phi4-mini gptoss-20b olmo3-7b qwen35-9b r1d-qwen3-8b ministral-8b
(llama31-8b is HF-gated — needs a token with accepted license; not wired up yet).

## 3. Watch it live (dashboard is synced to S3 every 30 s)
```sh
infra/aws_pg/pg logs republic/runs/<name>          # streamed job log
aws s3 presign s3://pg-lineage-769063704696/republic/runs/<name>/out/dashboard.html \
  --profile fuelos --region us-east-1               # shareable live dashboard URL
```

## 4. Pull results into the repo
```sh
aws s3 sync s3://pg-lineage-769063704696/republic/runs/<name>/out/ research/runs/<name>/ \
  --profile fuelos --region us-east-1
```
`research/runs/<name>/results.parquet` is the tidy frame
(model · revision · origin · battery_version · value · layer · metric · estimate · ci_lo · ci_hi;
metric ∈ S_auroc, A_proj, control_auroc, specificity_gap). `dashboard.html` reads only that frame.

## Gates (PLAN.md §5)
- G1: S ≥ 0.75 on ≥ 6/12 values in both pilots AND mean specificity gap ≥ 0.15 → breadth sweep.
- G2: origin groups separate beyond CI width on any value → headline; queue P2 causal steering.
