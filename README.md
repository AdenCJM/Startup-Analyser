# Startup Analyser

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A living knowledge base and scoring framework for capturing, evaluating, logging and acting on startup ideas. You keep every idea as a plain Markdown file, score it under a consistent set of lenses, and let the repo accumulate evidence and patterns over time so the next decision is better than the last. An optional Next.js showcase lets you publish a curated, password-gated subset of your ideas without exposing the private scoring layer.

Ideas live as folders. Decisions, evidence, market signals and recurring patterns live as append-only logs. A stdlib-only Python script checks the whole thing for structural integrity. You can drive all of it by hand from the templates, or pair with an AI coding agent and use the natural-language commands in `CLAUDE.md` (for example, `new idea: a tool that does X for Y`).

## Two tracks

The framework runs two parallel tracks. Pick the one that matches how you intend to build, or keep ideas on both.

- **Solo (bootstrapped).** Founder-funded, permissionless leverage, revenue that decouples from your time, an outcome you can sell or run hands-off inside a few years. Ideas live under `ideas/` and score on four solo lenses.
- **Venture (generic VC).** The inversion of the solo track: capital is required not avoided, the leap is full-time, the target is a fund-returning exit, and the co-founding partnership is a first-class scored axis. Ideas live under `ventures/ideas/` and score on four venture lenses. See `ventures/README.md`.

The two tracks never cross-contaminate scoring. They share only the four logs, each row tagged `solo` or `venture`.

## Documentation

**New to Startup Analyser?** Start here:

- **[Complete documentation index](docs/INDEX.md)** — navigate all tutorials, how-to guides, references, and explanations
- **[Getting Started](docs/tutorials/01-getting-started.md)** (15 min) — set up the repo and create your first idea
- **[Creating and Scoring Your First Idea](docs/tutorials/02-creating-and-scoring-your-first-idea.md)** (25 min) — deep walk-through of the four lenses and quadrant
- **[Frameworks Quick Reference](docs/reference/01-frameworks-quick-reference.md)** (one-page cheat sheet) — all scoring rules and decision tables

**How-to guides:**
- [Logging evidence](docs/how-to/01-logging-evidence.md) — record customer conversations and experiments
- [Running the integrity checker](docs/how-to/02-running-the-integrity-checker.md) — validate your repo
- [Quarterly reviews](docs/how-to/03-quarterly-reviews.md) — re-score ideas and plan next quarter

**Understanding the system:**
- [Why the quadrant](docs/explanation/01-why-the-quadrant.md) — how founder fit and market opportunity combine
- [Evidence freshness and status decay](docs/explanation/02-evidence-freshness-and-status-decay.md) — why ideas decay without evidence

## The solo four-lens spine

Every standalone solo idea is scored on four axes. The first two combine into a 2x2 quadrant; the second two order and fund the work.

1. **Founder Constraints** (6 filters, PASS / Mixed / FAIL, conjunctive). Can you build this? Each constraint is a default you fork to your own situation: energy versus drainage, building for the model curve, win-and-exit, bootstrap by default, revenue decoupled from time, wealth games over status games. Result line: `X/6 PASS`. Five or more PASS sets Founder Fit to High.

2. **Market Opportunity** (5 dimensions, 1 to 5, simple average). Is it worth building? Problem Severity, Market Size, Defensibility, Timing, Value Capture. The composite is a plain unweighted average. Bands: 4.0 and above High, 2.5 to 3.9 Medium, below 2.5 Low.

   The intersection of Founder Fit and the Market band gives a **quadrant**:

   |                  | High Market (>= 4.0) | Medium Market (2.5 to 3.9) | Low Market (< 2.5) |
   |------------------|----------------------|-----------------------------|--------------------|
   | **High Fit** (5+ PASS) | BUILD | BUILD | PASS |
   | **Low Fit** (< 5 PASS) | OPPORTUNITY GAP | KILL | KILL |

   A BUILD idea can sit at a Medium market. The quadrant adds a second dimension, it does not override the constraints. An OPPORTUNITY GAP (high market, weak fit) is worth watching: you record Constraint Flip Conditions describing exactly what would have to change for the failing constraints to pass, and review them each quarter. Any idea with a Market composite of 4.0 or more is held as **Watching** rather than killed.

3. **Runway & Sequencing** (3 filters, PASS / Mixed / FAIL). Can you start it now, does it use your edge, can it pay inside your runway? Startable Now, Capability Leverage, Runway Fit. Verdict: SWING (all three PASS), STRETCH (two PASS and one Mixed), WAIT (any FAIL). A separate Sequence Position orders the BUILD ideas into a swing from one vine to the next (Current Vine, Next Vine, Career Capital Builder, Not Sequenceable).

4. **Income-Bridge Viability** (3 dimensions, 1 to 5, weighted). What best extends your runway alongside the primary bet? Time to Revenue (weight 30%), Income Ceiling (weight 40%), Revenue Predictability (weight 30%). Formula: `(Time to Revenue x 0.30) + (Income Ceiling x 0.40) + (Revenue Predictability x 0.30)`. Bands: 4.0 and above Excellent, 3.0 to 3.9 Viable, 2.0 to 2.9 Marginal, below 2.0 Not Viable. Any single dimension scoring 1 is flagged regardless of the composite.

## The venture track

The venture track scores VC-backed, full-time, co-founder ideas under inverted assumptions. It has its own four lenses:

- **Venture Constraints** (7 filters, PASS / Mixed / FAIL): hard gates on Motivation and Personal Runway, near-gates on Model Curve and Venture-Scale Outcome, and three tolerance filters. Result line: `X/7 PASS`.
- **Market Opportunity** (the same 5-dimension instrument as the solo track, with venture-scale anchors).
- **Partnership Fit** (6 weighted dimensions): the only home of "right to win". A weak partnership demotes a strong idea, it never kills it.
- **Venture Feasibility** (4 filters): Capital Path and Go-to-Market are gating, Build & Operate is non-gating, and an Ethics / Legal line is a binary veto.

These combine through a six-step cascade into one master verdict: **PURSUE / SHAPE / WATCH / PASS / NO-GO**. At most one venture is Active at a time.

## The lifecycle

Solo ideas move `Backlog -> Validating -> Active -> Built`, with off-ramps `Parked`, `Watching`, `Killed`. Built means a working implementation exists but is not yet validated by a real user or paid signal; the next step is to dogfood it or land one user to reach Validating. The venture track adds `Shaping` (verdict SHAPE, no validation evidence yet).

A few discipline rules keep the portfolio honest: a Validating idea with no fresh evidence inside two weeks demotes back to Backlog (or fires its written kill-trigger); you hold a WIP cap of one or two ideas in Validating; you run at most one primary bet plus one active income-bridge slot at a time.

## The logs

Four append-only logs make the repo a memory rather than a snapshot.

- `decisions.md` — every status change, with the reasoning.
- `evidence.md` — customer and co-founder conversations, observations, paid signals.
- `signals.md` — market signals and external observations.
- `patterns.md` — recurring lessons distilled from killed and parked ideas, so the same mistake costs you once.

Every kill produces a pattern. Every customer conversation gets logged. The system gets sharper as the logs grow.

## The integrity checker

`scripts/check_integrity.py` is a stdlib-only Python script that mechanically verifies the repo's structure: every idea folder has a README with a valid status, folder names are lowercase-hyphenated, the overview tables match the folders, standalone ideas carry all of their lens scores, every Watching idea has Flip Conditions, every Killed idea has a Post-Mortem, every status change has a decisions entry, and no idea with a Market composite of 4.0 or more is sitting Killed. It puts evidence freshness first and exits non-zero on any real failure. A stale-evidence warning does not fail the run. See `scripts/README.md`.

## The showcase

`showcase/` is an optional Next.js app that publishes a curated subset of your ideas as a password-gated site. It is built so the private scoring layer never leaves the building: it publishes only the outward narrative sections plus the Market Opportunity table, and hides the founder-constraint scores, the runway and income-bridge numbers, and any private reasoning. A two-stage leak gate (a build-time scrubber and a separate verifier) hard-fails the build if a forbidden token slips through. You choose which ideas appear (featured and explored sets) in the config. See `showcase/README.md`.

## Quick start

```bash
git clone <your-fork-url> startup-analyser
cd startup-analyser
```

1. **Make the constraints yours.** Open `reference/founder-constraints.md` and edit the six defaults to your own situation. Set your income-freedom target, your bootstrap ceiling, and your exit horizon. These are starting points, not commandments; add, remove, or reweight as you see fit.
2. **Add an idea.** With an AI coding agent, type `new idea: a tool that turns X into Y for Z`. The agent reads the four frameworks, runs a similarity check against your existing ideas, scores all four lenses, applies the creation gates, and writes the idea folder, the decisions entry, the overview row, and the business model canvas. By hand, copy `templates/idea-template.md` into `ideas/<slug>/README.md` and fill it in.
3. **Check it.** Run `python3 scripts/check_integrity.py`. It should exit 0 (a stale-evidence warning is fine on a fresh repo).
4. **Optionally run the showcase.** `cd showcase && npm install && npm run dev`, then choose which ideas to publish in `showcase/content.config.mjs`.

The full set of agent commands (`new idea:`, `kill`, `park`, `log evidence:`, `log signal:`, `quarterly review`, `new venture idea:`, `what venture should I pursue?`, `what should I work on?`) lives in `CLAUDE.md`.

## Worked examples

The repo ships with four fictional examples so you can see each verdict in context. Treat them as illustrations, not advice.

- **order-flow** (solo, Validating) — a purchase-order tool for small wholesale distributors. A strong BUILD even at a Medium market, because Founder Fit is high. Shows the load-bearing "BUILD can have a Medium market" rule.
- **permit-pilot** (solo, Watching) — a guided building-permit assistant for small builders. High market, weak fit, so it lands as an OPPORTUNITY GAP held Watching with Constraint Flip Conditions.
- **habit-mirror** (solo, Killed) — a consumer habit-tracking app. Medium market, low fit, no moat. Carries a full Post-Mortem and shows the "Feature, Not a Company" pattern.
- **ledger-grid** (venture) — a horizontal data-lineage and audit layer under enterprise AI pipelines. Verdict SHAPE: a strong opportunity gated on an unresolved cap table and unvalidated investor relationships.

## Make it yours

Almost everything here is a default you are meant to edit:

- the **constraint set** and its tie-break order (`reference/founder-constraints.md`),
- the **dollar bands** in the market and income lenses (localise them to your market),
- the **grandfather epoch** the integrity checker uses to decide which ideas must carry the full scoring sections (`scripts/check_integrity.py`),
- the **leak-token lists** the showcase uses to fail a build if private content escapes (`showcase/scripts/build-content.mjs` and `verify-no-leak.mjs`).

## Licence and contributing

Released under the MIT licence (see `LICENSE`). Contributions are welcome; see `CONTRIBUTING.md`.

## About

Built by [Aden Mann](https://adenmann.com) — Applied AI.


## Public template boundary

This public repository contains a reusable system and fictional examples. Use a separate private instance for real founder constraints, customer evidence, idea scoring, decision logs, and any showcase secrets.
