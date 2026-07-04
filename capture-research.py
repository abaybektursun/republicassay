#!/usr/bin/env python3
"""Regenerate research-intermediate.md from the deep-research workflow journal.

Usage: python3 capture-research.py
Re-run any time; the journal grows as the workflow (wf_f858f20a-b0c) progresses.
"""
import json

SRC = "/Users/abaybektursun/.claude/projects/-Users-abaybektursun-projects-republic/d27ddfd6-64d0-427f-8170-c321f1c74253/subagents/workflows/wf_f858f20a-b0c/journal.jsonl"
OUT = "/Users/abaybektursun/projects/republic/research-intermediate.md"

scope, searches, claims, verdicts, other = None, [], [], [], []
for line in open(SRC):
    d = json.loads(line)
    if d["type"] != "result":
        continue
    r = d["result"]
    if not isinstance(r, dict):
        other.append(r)
        continue
    if "question" in r or "angles" in r:
        scope = r
    elif "results" in r:
        searches.append(r)
    elif "claims" in r:
        claims.append(r)
    elif "refuted" in r:
        verdicts.append(r)
    else:
        other.append(r)

with open(OUT, "w") as f:
    w = f.write
    w("# Intermediate research capture — auditing hidden values in open-weight LLMs\n\n")
    w("Raw dump from deep-research workflow `wf_f858f20a-b0c` (run 2026-07-03).\n")
    w("Structure: scope -> search results per angle -> extracted claims per source -> adversarial verification verdicts.\n\n")

    if scope:
        w("## Scope\n\n```json\n" + json.dumps(scope, indent=2) + "\n```\n\n")

    w("## Search results\n\n")
    for s in searches:
        for item in s.get("results", []):
            w(f"- **{item.get('title','?')}**\n  {item.get('url','?')}\n")
            if item.get("relevance") or item.get("snippet") or item.get("why"):
                w(f"  {item.get('relevance') or item.get('snippet') or item.get('why')}\n")
    w("\n")

    w("## Extracted claims (per source)\n\n")
    for c in claims:
        meta = {k: v for k, v in c.items() if k != "claims"}
        if meta:
            w(f"### Source: {json.dumps(meta, ensure_ascii=False)[:300]}\n\n")
        for cl in c.get("claims", []):
            if isinstance(cl, dict):
                w(f"- **Claim:** {cl.get('claim','?')}\n")
                for k, v in cl.items():
                    if k != "claim":
                        w(f"  - {k}: {v}\n")
            else:
                w(f"- {cl}\n")
        w("\n")

    w("## Verification verdicts\n\n")
    kept = sum(1 for v in verdicts if not v.get("refuted"))
    w(f"{len(verdicts)} verdicts: {kept} upheld, {len(verdicts)-kept} refuted.\n\n")
    for v in verdicts:
        status = "REFUTED" if v.get("refuted") else "UPHELD"
        w(f"### [{status}]\n")
        for k, val in v.items():
            if k != "refuted":
                w(f"- **{k}:** {val}\n")
        w("\n")

    if other:
        w("## Other entries (likely final synthesis)\n\n```json\n" + json.dumps(other, indent=2) + "\n```\n")

print(f"scope={'yes' if scope else 'no'} searches={len(searches)} claim-batches={len(claims)} verdicts={len(verdicts)} other={len(other)}")
