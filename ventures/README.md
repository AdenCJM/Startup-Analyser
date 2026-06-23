# Ventures

A parallel evaluation track for one specific condition the solo knowledge base was never built for: a VC-backed, co-founded, full-time leap. The solo track evaluates SOLO, BOOTSTRAPPED ideas under part-time or runway constraints. This track evaluates ideas under a different condition entirely, and that condition inverts the solo frameworks.

This track does not replace the solo track. It runs alongside it, scoring a different shape of bet with its own lenses, its own verdict vocabulary, and its own lifecycle stage (Shaping).

## Why This Track Exists

The venture condition is concrete: co-founding a VC-backed company with a partner, raising institutional capital, and going full-time from the start. That changes the decision physics, and the change is the whole reason a second track exists. Every assumption baked into the solo frameworks flips:

- **Capital is required, not avoided.** A fund-returning company needs capital to reach escape velocity. Self-funding is the disqualifier here, not the goal. A shape no investor would back is a structural problem, not a virtue.
- **The leap is full-time, not side-built.** There is no "build it on the side" path. The question is whether you can go full-time and survive on a founder salary, not whether you can ship between other commitments.
- **The target is a fund-returning exit, not a steady income.** The company has to be plausibly worth venture scale, and your post-dilution slice (not gross revenue, not a salary) is what has to clear your personal threshold.
- **The partnership is decisive.** The idea matters, but the co-founder fit, the role split, and the partner's reputation and investor claims are first-class, scored variables, not assumptions you carry quietly in a README.

Because the condition inverts, this track uses its own four lenses. Do not run the solo six and the venture seven on the same idea. They encode opposite conditions and produce contradictory scores (a fundable company fails the solo Bootstrap constraint and passes the venture Fundability constraint for the same reason).

## The Four Lenses

Every venture idea is scored on four lenses. Each points at its reference doc.

| Lens | Question it answers | Scale | Reference |
|---|---|---|---|
| Venture Constraints (7) | Can you build this as a VC-backed, full-time, co-founded venture? | PASS / Mixed / FAIL per constraint; `X/7 PASS` tally sets the founder-fit axis | `reference/venture-constraints.md` |
| Market Opportunity (5, venture-scale) | Is this worth building, judged as a venture-scale market bet? | 1-5 per dimension, simple-average composite; >=4.0 HIGH / 2.5-3.9 MED / <2.5 LOW | `reference/market-opportunity-framework.md` |
| Partnership Fit (6) | Should you build this *with this co-founder*, and on what role split? | 1-5 weighted composite; gate band Strong / Workable / Fragile / Misaligned | `reference/partnership-fit.md` |
| Venture Feasibility (4) | Can this get funded, get legal, get sold, and get built, within the founders' ethical line? | PASS / Mixed / FAIL per filter (Ethics / Legal is a binary PASS / FAIL veto); composite CLEARED / CONDITIONAL / BLOCKED | `reference/venture-feasibility.md` |

The four lenses combine into a single **Master Verdict** through a six-step cascade defined in `reference/venture-feasibility.md`. Two deterministic rules govern how the scores resolve:

- **Gating-Mixed feasibility rule.** A Mixed-or-worse on *either* gating filter (Capital Path or Go-to-Market / Regulatory Pathway) forces **CONDITIONAL** regardless of the total Mixed count. CLEARED requires both gating filters at PASS.
- **Equity-protection modulator.** Where your post-dilution slice is unresolved or thin (Partnership Equity & Commitment Alignment unresolved AND your own Venture-Scale slice or personal runway is soft), the verdict is capped at SHAPE ("fix the cap table first"). It only ever holds or lowers the verdict, and it depends only on your own scores.

## Master Verdict

Every idea resolves to exactly one label.

| Verdict | Meaning |
|---|---|
| **PURSUE** | Strong across the lenses: right founders, real venture-scale market, feasible, partnership holds. Advance now. At most one venture is Active at a time. |
| **SHAPE** | A real opportunity with a named blocker to resolve before committing: founder-fit not yet there, a market that needs sharpening, a feasibility condition, an unresolved cap table, or a fragile partnership. Status: Shaping. The dominant early co-founding state. |
| **WATCH** | The market is real (Market >=4.0, Ethics PASS) but the venture conditions are not yet met. Document Flip Conditions and review on signal. The highest-Market WATCH idea is the Crown Jewel. |
| **PASS** | Does not clear the lenses under this condition, or it is a good-fit-but-sub-scale idea (route it back to the solo track). |
| **NO-GO** | Vetoed: fails the Ethics / Legal gate or a Venture Feasibility BLOCKED. A labelled sub-type of PASS so the reason stays visible. Terminal; never re-surfaced silently. |

## Lifecycle

```
Backlog  ->  Validating  ->  Active (at most one)
   |              |             |
   +---> Shaping <-+------------+      (named blocker being resolved)
   |
   +---> Parked / Watching
   |
   +---> Killed
```

Statuses: **Backlog, Validating, Active** (at most one venture is Active at a time), **Shaping** (a real opportunity actively being de-risked against a named blocker), **Parked, Watching, Killed**.

**Why Shaping is the new status.** On the venture track the SHAPE verdict is the dominant early co-founding state: the founders are working a real idea with a real market and fixing the one lens that is not ready yet (sharpening the market, resolving the cap table, closing a feasibility condition, or repairing the partnership). None of the other statuses captures this. It is not Backlog (it is being worked), not Validating (the work is shaping, not just gathering evidence), not Active (it is not yet the one being built), and not Parked or Watching (it is live, not set aside). Shaping fills that gap.

## File Map

```
ventures/
  README.md               This charter
  _overview.md            Master comparison table (four-lens scores + Master Verdict per idea)

  reference/              Persistent material that applies to any venture idea
    venture-constraints.md            The 7 venture constraints
    market-opportunity-framework.md   The 5 venture-scale market dimensions
    partnership-fit.md                The 6 partnership-fit dimensions
    venture-feasibility.md            The 4 venture feasibility filters + the Master Verdict cascade

  ideas/                  One subfolder per venture idea (each with its own README from the template)

  templates/              Templates for venture-track processes
    venture-idea.md                   The venture idea README scaffold (four lenses + Master Verdict)
    venture-readiness-review.md       The periodic readiness checklist for the lead candidate
```

## Shared Logs and Track Tagging

`decisions.md`, `patterns.md`, `signals.md`, and `evidence.md` live at the repo root and are **shared** across both tracks. Every entry carries a `Track:` tag, either `solo` or `venture`, so the two streams stay legible side by side. The logs are append-only: venture entries are added, never written over solo content, and solo content is never rewritten. Patterns and signals discovered on one track are visible to the other.

## Routing

Commands containing the keyword **venture** operate on this subtree (for example "new venture idea: ...", "kill venture ..."). Commands without it run the solo track. The two tracks share the logs but keep separate reference frameworks, overview tables, and idea folders. Two-track routing keys off the `Track:` field on each idea.

## A Note on Co-founder Claims

The whole track leans on the co-founder's contribution, and the load-bearing parts of that contribution (investor readiness, reputation, prior track record) are usually self-reported at the start. Validate the co-founder's load-bearing claims from primary sources before recording final Partnership Fit scores. Until a claim is validated, mark the affected scores provisional. This is ordinary scoring discipline, not a special-case rule: an unverified network or reputation can silently inflate the most important axis in the system, so treat any unconfirmed claim as provisional and surface it as such in the idea README.
