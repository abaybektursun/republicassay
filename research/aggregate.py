#!/usr/bin/env python3
"""Rebuild the canonical research/results.parquet and research/dashboard.html
from pulled run directories (research/runs/<name>/results.parquet).

Usage: <python-with-pandas> research/aggregate.py <run-name> [<run-name> ...]
Later-listed runs win on (model, value, layer, metric) collisions, so list
superseded runs first or omit them. The dashboard renderer is imported from the
job module in ntm-frozen-gemma — single source of truth, no copied code.
"""
import pathlib
import sys

import pandas as pd

sys.path.insert(0, str(pathlib.Path.home() / "projects/ntm-frozen-gemma"))
from infra.aws_pg.jobs.republic_p1 import render_dashboard

BASE = pathlib.Path(__file__).parent

frames = [pd.read_parquet(BASE / "runs" / r / "results.parquet").assign(run=r)
          for r in sys.argv[1:]]
df = (pd.concat(frames)
      .drop_duplicates(["model", "value", "layer", "metric"], keep="last")
      .reset_index(drop=True))
df.to_parquet(BASE / "results.parquet", index=False)
render_dashboard(df, BASE, df["battery_version"].iloc[0])
print(f"{len(df)} rows from {len(frames)} run(s) -> results.parquet + dashboard.html "
      f"(models: {', '.join(df['model'].unique())})")
