# How to Run a Quarterly Review

A quarterly review is a structured conversation with yourself about which ideas are moving, which are stalled, and where to focus next. It re-confirms your primary bet and your income-bridge slot, checks evidence against assumptions, and surfaces emerging patterns.

## Prerequisites

- A repository with at least 3 ideas and 2–3 months of history
- Evidence logged in `evidence.md` for validating ideas
- 45 minutes to an hour (do this undistracted)

## When to run it

Run a quarterly review:
- After 3+ months of active idea work
- After you've created 5+ new ideas
- When you're about to shift focus or priorities
- When you notice a contradiction between your scores and your evidence

## Step 1: Read the template

Open `templates/quarterly-review.md`. It guides you through the review sections.

## Step 2: Gather the data

Before you score anything, assemble your raw material:

1. **Run the integrity checker:**
   ```bash
   python3 scripts/check_integrity.py
   ```
   Note any warnings about evidence freshness or validating ideas past their decay window.

2. **Read your decision log:**
   Open `decisions.md` and skim the last 3 months. Which ideas did you touch? Which ones did you move?

3. **Read your evidence log:**
   Open `evidence.md` and read all entries from the last 3 months. Which ideas have the strongest evidence? Which have none?

4. **Check your patterns:**
   Open `patterns.md`. Do any of the patterns explain why an idea failed?

5. **Skim your signals:**
   Open `signals.md`. Any recent market signals that affect your active ideas?

## Step 3: Review each active idea

For each idea currently in a "live" status (Validating, Active, Built), ask yourself:

**Evidence vs. score:**
- When you first scored this, what did you predict? (Check the original README)
- What evidence have you gathered?
- Did the evidence match your prediction?
- Would you rescore it the same way today?

**Example:** You scored a Market Opportunity of 3.8 based on assumed customer pain. But your first 5 customer conversations revealed the pain is less acute than you thought. Rescore to 3.0. Update the README.

**Status fit:**
- Is this idea in the right status?
- If `Validating`: do you have enough evidence to promote to `Active`, demote to `Backlog`, or kill it?
- If `Active`: is this still your primary bet, or should it move to `Parked`?
- If `Built`: have you dogfooded it or landed a real customer? If not, demote to `Validating`.

**Runway & sequencing:**
- If this is your `Current Vine` (primary bet): is it on track to hit your runway target?
- If this is a `Next Vine`: is the current vine stable enough to start planning the transition?

## Step 4: Review parked and killed ideas

For each idea in `Parked` or `Killed`:

**Parked ideas:**
- Has a constraint flip condition been met? (Check your notes in the README.)
- Has a market signal changed the opportunity?
- Would you resurrect this now, or leave it parked?

**Killed ideas:**
- Does the post-mortem still hold, or has something changed?
- Is there a related idea in Backlog that learned from this kill?

## Step 5: Set or reconfirm your allocation

Startup Analyser enforces a single allocation:

- **One primary bet** (Current Vine status, Validating or Active)
- **One income-bridge slot** (optional, but named explicitly)
- **Everything else in Backlog**

In your review, ask:

1. **Primary bet:** Which idea is your primary focus for the next quarter? Should it stay the same, or does another idea deserve the slot?
2. **Income-bridge slot:** Are you running bridge income right now? Should you be? Which idea is the strongest candidate? (Use the Income-Bridge Viability scores to rank them.)
3. **Everything else:** Are there any ideas in Validating that should drop back to Backlog? Any in Backlog that should move to Active or Validating?

**The Income-Bridge Trap warning:** If your bridge income is consuming more than 20–30% of your time, it's crowding out your primary bet. Audit it. If the math no longer works, kill the bridge and refocus.

## Step 6: Document your decisions

Create a new section in `decisions.md`:

```markdown
## Q1 2025 Review (2025-02-28)

**Primary bet:** [expense-reporter](ideas/expense-reporter) (Advanced from Backlog to Validating).
Rationale: Strongest evidence (5 customer conversations), best founder fit (5/6), 
market validation in progress. Plan to land first paying customer by end of Q1.

**Income-bridge slot:** None active. [time-tracking](ideas/time-tracking) is the 
backup if primary bet stalls. Would revisit if primary bet hits a dead end.

**Status changes:**
- [expense-reporter](ideas/expense-reporter): Backlog → Validating. Evidence justifies moving to validation phase.
- [feature-library](ideas/feature-library): Validating → Parked. No new evidence in 6 weeks; revisit when primary bet stabilises.
- [admin-toolkit](ideas/admin-toolkit): Backlog → Backlog (rescored). Market Opportunity reduced from 3.6 to 3.0 based on competitor analysis.

**Patterns observed:**
- Customer acquisition is harder than technical implementation for all three ideas. 
  Allocate more time to sales/discovery next quarter.
- "I'll build it when I have time" ideas consistently stall. Only progress happens 
  when there's a clear customer deadline.

**Next quarter focus:**
1. Validate expense-reporter with 10 real customers (demo + willingness to pay).
2. Build minimal MVP by end of Q2.
3. Launch waitlist and land first paying customer by end of Q2.
4. Decide on income bridge only if primary bet slows down.
```

## Step 7: Update your overview scores

If your evidence contradicted your original scores, update the scores in `ideas/_overview.md`.

**Example:** Your evidence showed that the market for expense-reporter is more fragmented than you thought (Time dimension is weaker). Update the Market Opportunity composite.

## Step 8: Commit your review

```bash
git add decisions.md ideas/_overview.md
git commit -m "quarterly review: Q1 2025. Advanced expense-reporter to Validating, parked feature-library."
```

## Step 9: Run the integrity checker one more time

```bash
python3 scripts/check_integrity.py
```

Verify that all status changes are reflected consistently in READMEs and overview tables.

## What the review reveals

A good quarterly review surfaces:

1. **Which ideas are gaining traction** (evidence is confirming scores)
2. **Which ideas are stalling** (no evidence, or evidence contradicts scores)
3. **Which constraints or assumptions are holding back a good idea** (opportunity gap candidates)
4. **Which patterns repeat** (customer acquisition is hard; this isn't unique to expense-reporter)
5. **Whether your primary bet is still the right bet** (or if evidence suggests a pivot)

## Red flags to watch for

- **A Validating idea with no evidence in 30+ days.** It's probably stalled. Demote to Backlog or kill it.
- **All five ideas in Backlog, none advancing.** You're capturing without validating. Pick one idea and push it to Validating for the next quarter.
- **Your income bridge consuming 40%+ of your time.** It's become the primary bet. Either kill the bridge or promote it to primary.
- **You've killed three ideas but haven't written patterns yet.** Do that now. Patterns are the intellectual capital of the system.

## After the review

- **Share your review with a peer or advisor** (optional). A second opinion on your allocation can catch blind spots.
- **Set one quarterly goal.** Example: "Land 10 customer conversations for expense-reporter and validate market fit by end of Q1."
- **Check your constraints again.** Did they change? Update `reference/founder-constraints.md` if your non-negotiables have shifted.

## Related

- [Understanding status decay](../explanation/evidence-freshness.md)
- [Understanding the quadrant](../explanation/quadrant-philosophy.md)
- [Managing the income-bridge trap](../explanation/income-bridge-trap.md)
