# HabitMirror -- A consumer habit-tracking app that reflects your daily routines back as a weekly "mirror" summary.

**Status:** Killed  **Type:** Standalone idea  **Track:** solo  **Created:** 2026-01-15  **Evidence Confidence:** scored-from-priors

> Fictional example idea. It shows the Killed case: a Medium market and a low founder fit, scored and killed at creation, with a full Post-Mortem. Replace it with your own.

## Elevator Pitch

HabitMirror tracks your daily routines and reflects them back each week as a single readable summary so you can see your patterns at a glance.

## The Buyer

Individual consumers interested in self-improvement and routine-building.

## The Problem (In Their Words)

> "I track stuff for a week then forget the app exists."

## The Offer

A lightweight tracker plus a weekly auto-generated reflection of what you actually did.

## Price Point

$4.99/month consumer subscription.

## Revenue Model

Direct-to-consumer subscription with a free tier.

## Founder Constraints

| # | Constraint | Score | Justification |
|---|-----------|-------|---------------|
| 1 | Energy | PASS | Building a consumer app is energising work. |
| 2 | Model Curve | Mixed | A summarisation feature any platform can absorb; thin model-proof layer. |
| 3 | Win & Exit | FAIL | No clear acquirer or founder-independent path; another me-too habit app. |
| 4 | Bootstrap | PASS | Buildable solo on permissionless leverage. |
| 5 | Revenue Decoupled from Time | Mixed | Consumer subscriptions scale, but acquisition cost likely eats the margin. |
| 6 | Wealth vs Status | PASS | Positive-sum, just not a strong asset. |

**Result: 3/6 PASS**

## Market Opportunity

| Dimension | Score (1-5) | Justification |
|---|---|---|
| Problem Severity | 2 | Habit-tracking is a nice-to-have; few describe it as a burning problem. |
| Market Size | 3 | Consumer self-improvement apps are large but the trackable slice is crowded and small per app. |
| Defensibility | 2 | No moat; the core is a feature any incumbent ships in a sprint. |
| Timing | 4 | Cheap personalisation makes a nicer summary possible now. |
| Value Capture | 3 | Some pay for consumer wellness tools, but pricing power is weak. |

**Composite: 3.0/5.0**

**Quadrant: KILL**

> Medium market (3.0) plus Low fit (3/6) is a KILL. The composite is below 4.0, so the at-or-above-4.0 override does not apply and Killed is the correct status.

## Runway & Sequencing

| Filter | Score | Justification |
|---|---|---|
| Startable Now | PASS | A prototype could ship immediately. |
| Capability Leverage | FAIL | Consumer growth marketing is not an existing edge; starting from zero on distribution. |
| Runway Fit | FAIL | No realistic path to meaningful revenue inside a normal runway given acquisition costs. |

**Verdict: WAIT**
**Sequence: Not Sequenceable**

## Income-Bridge Viability

| Dimension | Weight | Score (1-5) | Weighted | Justification |
|---|---|---|---|---|
| Time to Revenue | 30% | 3 | 0.90 | Could charge within months, but conversion is the hard part. |
| Income Ceiling | 40% | 2 | 0.80 | $500-2K/month realistic; consumer churn caps it. |
| Revenue Predictability | 30% | 2 | 0.60 | High churn, lumpy; consumer subscriptions are volatile at small scale. |

**Income-Bridge Score: 2.3/5.0**
**Verdict: Marginal**

> This shows the dual-status idea: a KILL as a build can still be scored as a bridge. Here the bridge verdict is also weak (Marginal), so it is not a useful bridge either.

## Key Risks

- Consumer acquisition cost almost certainly exceeds lifetime value at this price.
- The reflective-summary feature is trivially copied by any incumbent tracker.
- Retention in the habit-tracking category is structurally poor.

## Post-Mortem

- **What was the thesis:** that a nicer weekly reflection would lift retention enough to make a small consumer subscription work.
- **Why it was killed:** Founder Fit 3/6 and a Medium-Low market. No moat (Defensibility 2), no distribution edge (Capability Leverage FAIL), and no founder-independent exit path (Win & Exit FAIL). The reflective summary is a feature, not a company.
- **What would have to be true to revisit:** a genuine distribution wedge (an owned audience or a channel partner) AND a defensible data layer. Absent both, this stays killed.
- **Pattern match:** matches the "Feature, Not a Company" pattern (see `patterns.md`). Triggered by HabitMirror.

## Related Ideas

- OrderFlow (`../order-flow`) - a workflow tool with a real data moat, shown as the contrast to this feature-not-a-company case.
