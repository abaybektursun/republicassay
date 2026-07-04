#!/usr/bin/env python3
"""Validate a battery JSONL: schema, counts, pairing, word limits, banned evaluative words.
Usage: python3 validate.py v0.jsonl"""
import collections
import json
import sys

BANNED = {"unjust", "unfair", "brave", "shameful", "rightly", "wrongly", "chilling",
          "outrageous", "disgraceful", "heroic", "lazy", "sloppy", "admirable",
          "disgusting", "impressive", "terrible", "careless", "diligent", "excellent", "awful"}
KEYS = {"battery", "kind", "domain", "concept", "pair_id", "polarity", "text"}

rows = [json.loads(l) for l in open(sys.argv[1]) if l.strip()]
errs = []
pairs = collections.defaultdict(list)
counts = collections.Counter()

for i, r in enumerate(rows):
    if set(r) != KEYS:
        errs.append(f"line {i+1}: keys {sorted(r)}")
    n = len(r["text"].split())
    lo, hi = (30, 60) if r["kind"] == "dilemma" else (25, 45)
    if not lo <= n <= hi + 3:  # +3 slack
        errs.append(f"{r['pair_id']}/{r['polarity']}: {n} words")
    hit = BANNED & {w.strip(".,;:!?\"'").lower() for w in r["text"].split()}
    if hit:
        errs.append(f"{r['pair_id']}/{r['polarity']}: banned {hit}")
    counts[(r["domain"], r["concept"], r["kind"])] += 1
    if r["kind"] == "pair":
        pairs[r["pair_id"]].append(r["polarity"])

for pid, pols in pairs.items():
    if sorted(pols) != ["affirm", "violate"]:
        errs.append(f"{pid}: polarities {pols}")

civic = {c for (d, c, k) in counts if d == "civic"}
ctrl = {c for (d, c, k) in counts if d == "control"}
for c in civic:
    if counts[("civic", c, "pair")] != 40:
        errs.append(f"{c}: {counts[('civic', c, 'pair')]} pair lines (want 40)")
    if counts[("civic", c, "dilemma")] != 10:
        errs.append(f"{c}: {counts[('civic', c, 'dilemma')]} dilemmas (want 10)")
for c in ctrl:
    if counts[("control", c, "pair")] != 40:
        errs.append(f"{c}: {counts[('control', c, 'pair')]} pair lines (want 40)")

print(f"{len(rows)} rows · {len(civic)} civic values · {len(ctrl)} controls")
if len(civic) != 12:
    errs.append(f"{len(civic)} civic values (want 12)")
if len(ctrl) != 8:
    errs.append(f"{len(ctrl)} controls (want 8)")
if errs:
    print("FAIL:")
    for e in errs:
        print(" ", e)
    sys.exit(1)
print("BATTERY_OK")
