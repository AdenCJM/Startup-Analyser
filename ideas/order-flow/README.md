# OrderFlow -- A purchase-order tool that turns supplier email and PDF chaos into one clean, approvable order queue for small wholesale distributors.

**Status:** Validating  **Type:** Standalone idea  **Track:** solo  **Created:** 2026-01-15  **Evidence Confidence:** 1+ buyer conversation

> Fictional example idea. It exists to show what a fully scored solo README looks like. Replace it with your own.

## Elevator Pitch

Small wholesale distributors still run purchasing through inboxes and spreadsheets. OrderFlow reads supplier emails and PDFs, drops every line item into one approvable order queue, and flags price and quantity mismatches before they become wrong deliveries.

## The Buyer

The operations lead or owner-operator at a 5-50 person wholesale distributor who personally chases purchase orders.

## The Problem (In Their Words)

> "Half my week is copying numbers off supplier PDFs into a spreadsheet and praying I didn't fat-finger a quantity."

## The Offer

A shared order queue that ingests supplier documents, auto-extracts line items, surfaces mismatches, and pushes approved orders to the buyer's accounting tool.

## Price Point

$79 per seat per month, billed annually. Most distributors start with two to four seats.

## Revenue Model

Per-seat SaaS subscription. Path to scale: land owner-operators, expand seat count as the ops team adopts it, then add a supplier-portal upsell.

## Founder Constraints

| # | Constraint | Score | Justification |
|---|-----------|-------|---------------|
| 1 | Energy | PASS | The work is shipping product and talking to operators, not selling up an org chart. |
| 2 | Model Curve | PASS | Value sits in the supplier workflow and the parsed-order data flywheel, a layer better models improve, not replace. |
| 3 | Win & Exit | PASS | A vertical SaaS with sticky data is a sellable asset inside five to seven years. |
| 4 | Bootstrap | PASS | Buildable on permissionless leverage (code, content); no capital or approvals gate it. |
| 5 | Revenue Decoupled from Time | PASS | Per-seat recurring revenue, near-zero marginal cost per added distributor. |
| 6 | Wealth vs Status | PASS | A positive-sum tool for an underserved niche, not a seat in someone else's hierarchy. |

**Result: 6/6 PASS**

## Market Opportunity

| Dimension | Score (1-5) | Justification |
|---|---|---|
| Problem Severity | 4 | Manual PO reconciliation is a daily, error-prone grind operators describe unprompted. |
| Market Size | 3 | Small-distributor purchasing tooling is a $100M-$1B niche, not a category. |
| Defensibility | 3 | Workflow lock-in and accumulated supplier-parsing data, but no network effect yet. |
| Timing | 5 | Reliable document parsing is newly cheap; buyers are actively replacing spreadsheets now. |
| Value Capture | 4 | Clear ROI (hours saved, fewer mis-orders); customers can calculate it on a napkin. |

**Composite: 3.8/5.0**

**Quadrant: BUILD**

> BUILD is correct even at a Medium (3.8) market because Founder Fit is High (6/6). The quadrant adds a second dimension; it does not override constraints. A BUILD idea can sit on a Medium market when the founder fit is strong.

## Runway & Sequencing

| Filter | Score | Justification |
|---|---|---|
| Startable Now | PASS | A first version can ship this week against one real distributor; nothing is blocked. |
| Capability Leverage | PASS | Deploys existing product and workflow-automation skill directly; not starting from zero. |
| Runway Fit | PASS | A realistic path to first paid seats sits comfortably inside a normal bootstrap runway. |

**Verdict: SWING**
**Sequence: Current Vine**

## Income-Bridge Viability

| Dimension | Weight | Score (1-5) | Weighted | Justification |
|---|---|---|---|---|
| Time to Revenue | 30% | 4 | 1.20 | First paying distributor realistically inside two to three months. |
| Income Ceiling | 40% | 3 | 1.20 | $2-5K/month at part-attention; meaningful but the niche caps it. |
| Revenue Predictability | 30% | 4 | 1.20 | Per-seat MRR with low churn once a distributor is embedded. |

**Income-Bridge Score: 3.6/5.0**
**Verdict: Viable**

## Key Risks

- Document-parsing accuracy on messy supplier formats is the make-or-break; a bad extraction erodes trust fast.
- Accounting-tool integrations are a long tail; covering the top three covers most of the market but the rest is drag.
- The niche is real but bounded, so growth depends on adjacent verticals, not depth alone.

## Build Status

Not yet built. Validating with one design-partner distributor; the next step is a paid pilot to reach a real paid signal.

## Related Ideas

- PermitPilot (`../permit-pilot`) - another small-business workflow tool, scored as an Opportunity Gap rather than a clean BUILD.
