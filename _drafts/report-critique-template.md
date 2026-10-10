---
# HOW TO PUBLISH: copy this file into the _posts/ folder and rename it
# YYYY-MM-DD-short-title.md (e.g. 2026-10-12-abc-ltd-initiation.md).
# Files in _drafts/ are never published.

title: "Broker's initiation on Company Ltd: what holds up and what doesn't"
company: Company Ltd
ticker: "NSE: TICKER"
sector: Capital Goods            # used for the filter buttons on /blog/
verdict: Too optimistic          # Fair | Too optimistic | Too conservative | Mixed
summary: >-
  One or two sentences: your overall take, shown on cards and at the top of the post.

report:
  broker: Broker Name
  date: 2026-09-15
  rating: Buy
  target: 1250                   # numbers only, no ₹ or commas
  price: 1020                    # share price when the report came out
  currency: "₹"                  # optional, defaults to ₹
  link: https://example.com/report.pdf   # optional; only link to public reports

scores:                          # 1 (weak) to 5 (strong)
  Assumptions: 2
  Valuation method: 3
  Risk disclosure: 2
  Clarity: 4

tags: [DCF, margins, working capital]
---

## The report in brief

What the broker argues, in three or four sentences: thesis, rating, target, and the method behind it.

## What holds up

- Point one
- Point two

## Where I disagree

### 1. Assumption you challenge

Explain the gap. Compare to history, peers, or management guidance.

| Metric | Broker | History (5-yr) | My view |
|---|---|---|---|
| Revenue CAGR FY26–30 | 22% | 14% | 15–17% |
| EBITDA margin FY30 | 19% | 13% | 14–15% |

### 2. Valuation mechanics

WACC, terminal growth, multiple choice, net debt bridge, etc.

## Re-running the numbers

Show how the target moves when you change the contested inputs.

> Holding everything else constant, a 2-point lower margin takes the target from ₹1,250 to about ₹1,040.

## Bottom line

Your conclusion on the quality of the report, not a buy/sell call.
