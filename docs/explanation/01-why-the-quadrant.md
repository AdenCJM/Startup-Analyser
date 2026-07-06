# Why the Quadrant: Philosophy and Design

The 2x2 quadrant (BUILD / OPPORTUNITY GAP / KILL / PASS) is the beating heart of Startup Analyser. This document explains why it's structured this way and what problem it solves.

## The problem: Conflicting signals

When evaluating a startup idea, you face two independent questions:

1. **Can I build this?** (Founder Fit)
2. **Is it worth building?** (Market Opportunity)

These questions point in different directions. An idea can be:
- Easy for you to build but serving a tiny market
- Addressing a massive, urgent problem but requiring skills you don't have
- Medium on both axes
- Strong on one, weak on the other

A single score (e.g., "rate this idea 1–10") collapses both signals into noise. The quadrant keeps them separate.

## The design: Two independent axes

The quadrant maps:

- **Horizontal axis: Founder Fit** (can I build this?)
  - High: 5 or more constraints PASS
  - Low: fewer than 5 constraints PASS

- **Vertical axis: Market Opportunity** (is it worth building?)
  - High: composite ≥ 4.0 / 5
  - Medium: 2.5–3.9 / 5
  - Low: < 2.5 / 5

This produces a 2×3 grid (though Low market often collapses to a single verdict).

## The verdicts: Why each quadrant gets its verdict

### BUILD (High Fit, Medium-or-better market)

**You should build this.**

- You have the constraints to do it (energy, skills, bootstrap potential, exit strategy)
- The market is big enough to matter (Medium 2.5+ or High 4.0+)
- The combination is rare and valuable

**Why not just "do it if market is high?"** Because experience shows that founder fit is often the gating factor. A strong founder can bootstrap a Medium market into a good business through force of will and execution. But a weak founder can't execute a High-market idea into a winner; they get exhausted or sidetracked.

**Example:** Expense Reporter scores High fit (5/6) but Medium market (3.8). The verdict is still BUILD because your constraints are satisfied. The founder fit clears the gate; the medium market just means you have longer to find product-market fit.

### OPPORTUNITY GAP (High Market, Low Fit)

**Don't build this yet. Watch it.**

- The market is clearly valuable (≥ 4.0 composite)
- But one or more of your constraints fail
- Status: **Watching** (not Killed)

This is the most interesting quadrant. The market opportunity is real, but you're not the right person to build it today. The question is: can you flip the failing constraint?

**Examples of constraint flips:**
- You lack a co-founder for technical work → hire or partner
- Bootstrapping is hard because the product needs scale → raise capital once you have proof
- It requires moving to a new location → plan to move before starting

**Record the constraint flip conditions in the README.** At each quarterly review, check: have these conditions been met? If yes, the idea might move from Watching to Validating.

**Why not Kill it?** Because the market opportunity is real and valuable. Killing it means you're giving up on a good business opportunity; Watching means you're keeping it warm for when the constraint is solvable.

### KILL (Low Fit, Low or Medium Market)

**Reject this idea.**

- Your constraints fail (too much drainage, can't bootstrap, etc.)
- AND the market isn't big enough to justify working through the constraint failure

This is the clear "no." The idea requires you to compromise on something non-negotiable, and the upside isn't so large that it's worth considering.

**Why not just "you don't fit it, so kill it?"** Because constraint fit is a **preference**, not an absolute rule. If the market is sufficiently large and valuable, it might be worth bending. That's the OPPORTUNITY GAP case (high market, low fit). But if the market is small AND you don't fit, there's no rationale for the compromise.

### PASS (High Fit, Low Market)

**You could build this, but should you?**

- You have the constraints (energy, skills, exit strategy, etc.)
- But the market is small (< 2.5 composite)
- Verdict: PASS (you could do it, but the ceiling is low)

This is the "you're overqualified" case. You're a strong founder solving a small problem. The founder fit is excellent, but the problem ceiling is too low to justify tying up a founder-constraint slot for years.

**Why not Build it?** Because founder time is finite. If you're a strong founder, the opportunity cost of building a small-market idea is too high. You're trading a Medium-or-better market opportunity (where you'd thrive) for a small one (where you'd succeed but be constrained).

**When to revisit:** If the market signal changes (unexpectedly large customer demand, new use case emerges), rescore and reconsider.

## Why two axes instead of one score

### Combining the axes into a single score

You could imagine a different system:

```
Score = (Founder Fit * weight1) + (Market Opportunity * weight2)
```

This would give you one number, easy to rank. But it breaks down immediately:

1. **You lose information.** Two ideas could have the same score but opposite strengths (one has strong founder fit but weak market; the other has weak founder fit but strong market). They need different strategies.

2. **Weighting is arbitrary.** Is founder fit worth 50% or 30%? Different weights lead to different verdicts, and there's no objective answer.

3. **You invite wishful thinking.** "This market is tiny, but I'm so passionate about it" becomes "well, I'll just give founder fit more weight." The quadrant doesn't let you hide trade-offs; it forces you to name them.

4. **You can't handle constraint flips.** An OPPORTUNITY GAP idea (high market, low fit) is interesting precisely *because* it might become buildable if you solve the constraint. A single score would just say "not ready yet" without telling you what to watch for.

### Why two axes, not three or four

You could add axes for:
- Capital required
- Timeline to first customer
- Team size needed
- Competitive intensity

But more axes don't improve the decision; they add noise. Constraints and market opportunity are the two things that predict success better than anything else. Everything else (capital, timeline, competition) is a detail that changes as you learn.

## The Market Opportunity override

One special rule: **any idea with a Market composite of 4.0 or higher cannot be Killed.**

Why?

Because high-market opportunities are rare and valuable. If you've scored a market at 4.0+, you're saying "thousands or millions of people have this problem, and they'd pay to solve it." That signal is strong enough to keep the idea in the system even if you don't fit it today.

The right status is **Watching**, not Killed. You record the constraint flip conditions, and at each quarterly review, you check: have these conditions been met? 

This rule prevents a common failure mode: rejecting a good market opportunity because you don't have the skills today. But you could acquire the skills, or partner with someone who has them. Watching keeps that door open.

## Example: How the quadrant resolves conflicts

You're evaluating three ideas:

### Idea A: AI-powered invoicing
- Founder Fit: 6/6 PASS (high)
- Market Opportunity: 3.2 (medium)
- Quadrant: **BUILD**

You should build this. Your fit is perfect, the market is decent. Go.

### Idea B: Permit automation for builders
- Founder Fit: 4/6 PASS (low; requires specialized domain knowledge)
- Market Opportunity: 4.2 (high)
- Quadrant: **OPPORTUNITY GAP** (Watching status)

Don't build this now. But watch it. The constraint flip is: hire a contractor or consultant who knows building permits. If you do that, reconsider.

### Idea C: Personal finance for Gen-Z
- Founder Fit: 5/6 PASS (high)
- Market Opportunity: 2.1 (low)
- Quadrant: **PASS**

You could build this, but should you? The founder fit is strong, but the market is tiny (probably captured by existing apps like YNAB or worse, by personal finance TikTok). The constraint slots you'd use (time, energy) are better spent on a medium or high market.

---

## Exceptions and edge cases

### When to ignore the quadrant

The quadrant is a framework, not a law. Ignore it if:

1. **You have overwhelming evidence that overrides the framework.** If you've talked to 50 customers and they're clearly desperate for this, but the framework says "small market," trust the evidence. Rescore.

2. **You have a strategic reason that's not captured by the framework.** Maybe an OPPORTUNITY GAP idea is worth investing in because it teaches you skills that unlock three other ideas. Document that reasoning in the decision log and move forward.

3. **The constraints are wrong.** If you realise that one of your six constraints doesn't actually matter to you, revise `reference/founder-constraints.md` and rescore. The framework should evolve as you learn about yourself.

### When two ideas tie

If two ideas have the same quadrant verdict, use the tie-break rules in `reference/founder-constraints.md`. These are your personal priorities for ranking ideas within the same quadrant.

## Related reading

- [Understanding status decay and evidence freshness](./02-evidence-freshness.md)
- [The four lenses: a deep dive](./03-four-lenses.md)
- [Frameworks quick reference](../reference/01-frameworks-quick-reference.md)
