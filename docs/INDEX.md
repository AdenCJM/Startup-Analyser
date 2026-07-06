# Startup Analyser Documentation Index

Complete documentation for the Startup Analyser knowledge base system. Choose your entry point below based on what you want to learn.

## Getting Started (First Time?)

Start here if you're new to Startup Analyser:

### Solo Track

1. **[Getting Started](./tutorials/01-getting-started.md)** (15 min)
   - Set up the repo, customise constraints, add your first idea, verify the integrity checker
   - End result: a working repository with one idea scored

2. **[Creating and Scoring Your First Idea](./tutorials/02-creating-and-scoring-your-first-idea.md)** (25 min)
   - Deep walk-through of scoring all four lenses
   - How the quadrant verdict emerges from the scores
   - End result: understand how to honestly evaluate ideas

### Venture Track

3. **[Getting Started with the Venture Track](./tutorials/03-getting-started-with-ventures.md)** (20 min)
   - Create your first venture idea and score it across four venture lenses
   - Understand when to use the venture track (capital required, co-founder, full-time)
   - End result: a fully scored venture idea with Master Verdict
   - **Prerequisites:** read the solo track tutorials first

## Workflows (How Do I...?)

Common tasks and how-to guides:

### Foundation
- **[Customizing Your Founder Constraints](./how-to/04-customizing-constraints.md)** — Fork the default constraints to match your situation (do this first)

### Solo Track
- **[Logging Evidence](./how-to/01-logging-evidence.md)** — How to record customer conversations, experiments, and observations
- **[Running the Integrity Checker](./how-to/02-running-the-integrity-checker.md)** — Validate the repo structure, fix issues
- **[Quarterly Reviews](./how-to/03-quarterly-reviews.md)** — Re-score ideas, update allocation, decide what to focus on next

### Publishing
- **[Configuring and Publishing the Showcase](./how-to/05-configuring-and-publishing-the-showcase.md)** — Set up the password-gated app to share a curated subset of ideas without exposing private scoring

## Reference (What's the Rule?)

Precise definitions and decision tables:

### Solo Track
- **[Frameworks Quick Reference](./reference/01-frameworks-quick-reference.md)** (one-page cheat sheet)
  - Founder Constraints, Market Opportunity, Runway & Sequencing, Income-Bridge Viability
  - Decision gates, lifecycle statuses, allocation rules

### Venture Track
- **[Venture Frameworks Quick Reference](./reference/03-venture-frameworks-quick-reference.md)** (one-page cheat sheet)
  - Venture Constraints (7), Market Opportunity, Partnership Fit (6), Venture Feasibility
  - The six-step Master Verdict cascade
  - Decision tables and lifecycle statuses

### Repository
- **[Repository Structure](./reference/02-repo-structure.md)** — Complete file and folder layout
  - Where everything lives, what to edit, what's read-only
  - Naming conventions, key files

## Understanding the System (Why Is It This Way?)

Deep dives into the philosophy and reasoning:

### Solo Track
- **[Why the Quadrant](./explanation/01-why-the-quadrant.md)**
  - How founder fit and market opportunity combine into one decision
  - What each quadrant verdict means (BUILD, OPPORTUNITY GAP, KILL, PASS)
  - Why two axes instead of one score

- **[Evidence Freshness and Status Decay](./explanation/02-evidence-freshness-and-status-decay.md)**
  - Why ideas decay from Validating to Backlog if you stop gathering evidence
  - The 14-day rule and how to handle decay
  - Why this prevents the "thinking about it indefinitely" trap

### Venture Track
- **[The Venture Cascade: Worked Example](./explanation/03-the-venture-cascade-worked-example.md)**
  - A complete, numeric walk-through from four lens scores to Master Verdict
  - How the six-step cascade combines Constraints, Market, Partnership, and Feasibility
  - Real decision gates, modulators, and vetos with a worked example (BioAlign)
  - Read this to understand how PURSUE, SHAPE, WATCH, PASS, and NO-GO emerge

## Key Concepts

### The Four Lenses (Solo Track)

Every idea is scored on four independent axes:

1. **Founder Constraints** (6 filters) — Can you build this?
   - Energy, model curve, win-and-exit, bootstrap, decouple revenue, wealth games
   - Count the PASS results. Founder Fit = High if ≥5 PASS

2. **Market Opportunity** (5 dimensions) — Is it worth building?
   - Problem Severity, Market Size, Defensibility, Timing, Value Capture
   - Simple average. Bands: ≥4.0 High, 2.5–3.9 Medium, <2.5 Low

3. **Runway & Sequencing** (3 filters) — Can you start it now?
   - Startable Now, Capability Leverage, Runway Fit
   - Verdict: SWING (all PASS), STRETCH (two PASS + one Mixed), WAIT (any FAIL)

4. **Income-Bridge Viability** (3 dimensions) — What extends your runway?
   - Time to Revenue (30%), Income Ceiling (40%), Revenue Predictability (30%)
   - Weighted composite. Bands: ≥4.0 Excellent, 3.0–3.9 Viable, 2.0–2.9 Marginal, <2.0 Not Viable

### The Quadrant

Maps Founder Fit (horizontal: High/Low) against Market Opportunity (vertical: High/Medium/Low).

|                  | High Market | Medium | Low |
|---|---|---|---|
| **High Fit** | **BUILD** | **BUILD** | PASS |
| **Low Fit** | **OPPORTUNITY GAP** | **KILL** | KILL |

- **BUILD:** High fit + Medium-or-better market. Build this.
- **OPPORTUNITY GAP:** High market + failing constraint. Watch it; record flip conditions.
- **KILL:** Low fit + low/medium market. Reject it.
- **PASS:** High fit + low market. Could build it, but ceiling too small.

### Lifecycle Statuses

Ideas flow through a lifecycle:

```
Backlog → Validating → Active → Built
              ↓
           Parked, Watching, Killed (off-ramps)
```

- **Backlog:** Scored, not yet validating
- **Validating:** Gathering evidence (customer conversations, experiments)
- **Active:** Validated; building or launching (your primary bet)
- **Built:** Implementation complete; awaits real-user validation or paid signal
- **Parked:** Viable but deprioritised
- **Watching:** High market (≥4.0) but a constraint fails today; review quarterly
- **Killed:** Rejected; requires a post-mortem

**Status decay:** Validating ideas with no evidence inside 14 days demote to Backlog (or fire their kill-trigger).

### The Logs

Four append-only logs form the memory of your system:

1. **`decisions.md`** — Every status change and significant decision
2. **`evidence.md`** — Customer conversations, experiments, observations, paid signals
3. **`patterns.md`** — Recurring lessons from killed/parked ideas
4. **`signals.md`** — Market signals and external observations

Each entry is dated and tagged with the idea(s) it affects.

### The Allocation Rule

At any time, run:

- **One primary bet** (Validating or Active) — your focus
- **One income-bridge slot** (optional) — side income to extend runway
- **Everything else in Backlog** — captured but not active

## Venture Track

The system supports a parallel VC-backed venture track (`ventures/`) alongside the solo track (`ideas/`).

**Key difference:** The venture track inverts assumptions — capital is required, full-time is expected, exit is fund-returning, and partnership is scored.

**Four venture lenses:**
1. Venture Constraints (7 filters; hard gates on motivation and personal runway)
2. Market Opportunity (same 5 dimensions, venture-scale anchors)
3. Partnership Fit (6 weighted dimensions; co-founder is scored)
4. Venture Feasibility (4 filters + Ethics/Legal veto)

These combine through a **six-step cascade** into a **Master Verdict:** PURSUE / SHAPE / WATCH / PASS / NO-GO.

See `ventures/README.md` for the venture charter.

## The Showcase (Optional)

Publish curated ideas publicly via a Next.js app in the `showcase/` directory.

The showcase reads from `ideas/` and `ventures/` but hides the private scoring layer:
- Published: problem description, Market Opportunity table, outcomes
- Hidden: Founder Constraints, Runway & Sequencing, private reasoning

A build-time scrubber and verifier ensure no secrets leak. See `showcase/README.md`.

## Quick Command Reference

If using with an AI agent (set up `CLAUDE.md` for agent access):

| Command | What it does |
|---|---|
| `new idea: [one-liner]` | Create an idea, score all four lenses, add to overview |
| `kill [idea]` | Kill ceremony: post-mortem, pattern, decision log |
| `park [idea]` | Park ceremony: reasoning, status update |
| `log evidence: [description]` | Append to evidence.md with tags |
| `log signal: [description]` | Append to signals.md with tags |
| `what should I work on?` | Recommend next idea based on evidence freshness and scores |
| `quarterly review` | Re-score ideas, update allocation |

See `AGENTS.md` for the full agent operating spec.

## Key Files to Know

| File | Purpose | Edit? |
|---|---|---|
| `reference/founder-constraints.md` | Your six non-negotiables | **Yes** (on first setup) |
| `reference/market-opportunity-framework.md` | Market dimensions | Yes (localise bands) |
| `scripts/check_integrity.py` | Mechanical repo validator | No (except `GRANDFATHER` constant) |
| `templates/idea-template.md` | Template for new ideas | No (copy to new folders) |
| `ideas/_overview.md` | Master status/scorecard table | Sync via README or manually |
| `decisions.md` | Decision log | Append-only |
| `evidence.md` | Evidence log | Append-only |
| `patterns.md` | Pattern library | Append-only |
| `signals.md` | Signals log | Append-only |

## Running the Integrity Checker

```bash
python3 scripts/check_integrity.py
```

This validates:
- Folder names (lowercase-hyphenated)
- README presence and valid status
- Overview row counts match folder counts
- Killed ideas have post-mortems
- Watching ideas have constraint flip conditions
- No High-market ideas are Killed
- Evidence log is never empty

Exit code 0 = all checks pass (warnings are OK).

## Tips for Success

1. **Customise your constraints first.** Edit `reference/founder-constraints.md` so the six defaults reflect what you actually care about.

2. **Score honestly.** Don't let optimism inflate your scores. Market Opportunity especially: if you think it's 4.0, but you've talked to zero customers, score it 2.5 and let evidence lift it.

3. **Log evidence ruthlessly.** Every customer conversation, observation, and experiment goes to `evidence.md`. This is the pulse of your system.

4. **Let ideas decay.** If a Validating idea has no evidence in 14 days, demote it to Backlog. This forces discipline.

5. **Run the integrity checker regularly.** Wire it into your pre-commit hook or CI pipeline. It catches quiet rot before it accumulates.

6. **Do quarterly reviews.** Block 45 minutes per quarter to revisit your scores, update your allocation, and plan what's next.

7. **Read patterns.** When you kill an idea, write a post-mortem and add a pattern. Over time, your pattern library becomes the intellectual capital of your system.

## Contributing

See `CONTRIBUTING.md` for guidelines on extending or forking this system.

## License

Released under the MIT licence. See `LICENSE`.

---

**Not sure where to start?** Read [Getting Started](./tutorials/01-getting-started.md) (15 min). Then try [Creating and Scoring Your First Idea](./tutorials/02-creating-and-scoring-your-first-idea.md) (25 min). After that, you'll have enough intuition to explore the rest on demand.

**Want the TL;DR?** Read [Frameworks Quick Reference](./reference/01-frameworks-quick-reference.md) (5 min).

**Want deep understanding?** Read [Why the Quadrant](./explanation/01-why-the-quadrant.md) and [Evidence Freshness and Status Decay](./explanation/02-evidence-freshness-and-status-decay.md).
