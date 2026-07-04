#!/usr/bin/env python3
"""Recompute a run's results.parquet locally from its saved activations (no GPU).
Applies the CURRENT pipeline in the job module (single source of truth) to acts
captured by any earlier pipeline version.

Usage: <python-with-pandas> research/recompute.py <run-name> [<run-name> ...]
Overwrites research/runs/<run>/results.parquet + dashboard.html in place.
"""
import json
import pathlib
import sys

import numpy as np
import pandas as pd

sys.path.insert(0, str(pathlib.Path.home() / "projects/ntm-frozen-gemma"))
from infra.aws_pg.jobs.republic_p1 import ROSTER, analyze_model, render_dashboard

BASE = pathlib.Path(__file__).parent

for run in sys.argv[1:]:
    rd = BASE / "runs" / run
    battery = [json.loads(l) for l in (rd / "battery.jsonl").read_text().splitlines() if l.strip()]
    bver = battery[0]["battery"]
    rows = []
    for f in sorted((rd / "acts").glob("*.npy")):
        short = f.stem
        acts = np.load(f)
        for value, r in analyze_model(battery, acts, short, ROSTER[short], bver):
            rows += r
        print(f"{run}/{short}: recomputed")
    df = pd.DataFrame(rows)
    df.to_parquet(rd / "results.parquet", index=False)
    render_dashboard(df, rd, bver)
