# Evidence Freshness and Status Decay

This document explains why the system decays `Validating` ideas back to `Backlog` if you stop gathering evidence, and how to use this as a forcing function for discipline.

## The problem: "I'm still thinking about it"

Every founder has experienced this: an idea sits in a `Validating` status indefinitely while you *think* about it or *plan* to talk to customers. Months pass. The status never changes. It's not dead, and it's not moving forward either—it's limbo.

This creates a hidden sunk-cost trap:

1. You capture the idea and score it (the work feels like progress)
2. You move it to `Validating` (now it's official)
3. You don't gather any evidence for 8 weeks
4. The idea never advances, but it feels like it might any day
5. 6 months later, the idea is still `Validating` with no movement
6. You're now emotionally invested in it, even though you've done nothing to validate or kill it

The system prevents this with **status decay**: a `Validating` idea with no evidence inside 14 days should demote back to `Backlog` (or fire its kill-trigger if one was recorded).

## How decay works

**Rule:** A `Validating` idea with no evidence in `evidence.md` mentioning it within the last 14 days auto-demotes to `Backlog`.

**Exception:** You can record a written kill-trigger in the README. If the decay condition triggers and a kill-trigger exists, the idea is killed (not demoted) and a post-mortem is required.

**Enforcement:** The integrity checker (`scripts/check_integrity.py`) reports a `WARN` for any `Validating` idea overdue for evidence. It doesn't automatically demote (the system can't commit git changes), but it flags it so you can act.

## Why 14 days?

14 days is short enough that it forces weekly action, long enough to accommodate:
- A single customer conversation (typically 2–3 weeks to schedule and complete)
- A small experiment (3–4 days to run, a few more days to analyze)
- An observation or metric (same-day or next-day)

If you're validating a serious idea, you should have at least one evidence entry every 14 days. If you don't, the idea isn't actually active—it's on your mind but not in your hands.

## Why decay at all?

**Without decay:** Ideas accumulate in `Validating` indefinitely. Your portfolio becomes a graveyard of stalled ideas.

**With decay:** You're forced to make a choice:
1. **Move it to Backlog.** "I'm interested but not prioritizing this now." Clear. Low friction.
2. **Log evidence.** "I actually did work on this; here's what I learned." Honest.
3. **Kill it.** "I've realised this doesn't fit me; moving on." Clean closure.

Decay removes the comfort of "still thinking about it." It forces an active decision.

## Handling the decay warning

The integrity checker reports:

```
[CHECK 0] Evidence freshness
  Validating ideas with no evidence inside 14 days:
    - expense-reporter: 18 days since last entry (#E002, 2025-02-02)
```

You have three options:

### Option 1: Log new evidence

If you've actually done work on the idea but just haven't logged it:

```markdown
## 2025-02-20

**#E003** | Ideas: [expense-reporter](ideas/expense-reporter)
**Source:** Freelancer (UI designer, Toronto)

Had a 25-minute call exploring their expense pain. They use three different 
tools today (Wave, QuickBooks, Expensify). Key question: are they willing 
to consolidate? Initial answer: only if it saves 5+ hours/month.
```

This resets the clock. The idea stays `Validating`.

### Option 2: Demote to Backlog

If you've realised the idea isn't getting your attention right now:

1. Create a decision log entry:
   ```markdown
   ## 2025-02-20
   
   **Demoted** [expense-reporter](ideas/expense-reporter) (Validating → Backlog).
   Reason: Other priorities consuming time. No evidence gathered in 18 days.
   Revisit when bandwidth frees up or customer signal becomes urgent.
   ```

2. Edit the README: change `**Status:** Validating` to `**Status:** Backlog`

3. Update `ideas/_overview.md`

4. Commit: `git add ... && git commit -m "demote: expense-reporter to Backlog"`

The idea stays in the system; you've just been honest about its priority. This is healthy. Low-friction. Revisit it anytime you want.

### Option 3: Kill it

If the 14-day silence revealed that you're not actually interested:

1. Write a post-mortem in the README:
   ```markdown
   ## Post-Mortem
   
   **What failed:** The Income-Bridge Viability was a mirage. Talked to 
   3 freelancers, and none were willing to switch expense tools for less 
   than 10 hours/month saved. Technical implementation is feasible, but 
   customer acquisition would require a sales motion I don't enjoy.
   
   **Pattern matched:** [Pattern 2: Revenue Tied to Sales Effort](../../patterns.md#pattern-2)
   ```

2. Create a decision entry and update the overview (status → Killed)

3. Add a pattern if the post-mortem revealed a recurring lesson

4. Commit and move on

## The psychology: Why decay helps

Decay exploits a useful pattern: **if you're not gathering evidence, you're not validating the idea.** Thinking about it, planning to call customers, or waiting for the right moment don't count.

The 14-day window is a forcing function. It asks: "In the last two weeks, did you take a concrete action to learn about this idea?" If no, it's time to decide: are you validating it, or not?

This prevents a common founder failure mode: having 15 ideas in your portfolio that you *might* work on someday, all of which feel important but none of which are moving. Decay forces ruthless prioritization.

## Evidence freshness on the whole repo

The integrity checker also reports overall evidence freshness:

```
[CHECK 0] Evidence freshness
  Latest evidence entry: 3 days old (2025-02-17)
  Validating ideas with stale evidence: none
```

This is a health signal for your entire system. If the latest entry is 60+ days old, your whole portfolio is quiet. That might be fine (you're between projects), or it might be a warning (you're not learning).

## Related concepts

- **Status decay only applies to `Validating`.** Other statuses are stable:
  - `Backlog` can sit indefinitely without evidence
  - `Active` ideas stay active as long as you're building them (this is your primary bet)
  - `Built` ideas don't decay; they advance to `Validating` when you get real usage
  - `Watching` ideas are long-term observations; they don't decay
  - `Killed` ideas are final (though you can resurrect one by moving it to Backlog if the post-mortem conditions change)

- **Venture track:** The venture track doesn't have an evidence-decay rule (ventures are usually full-time, so evidence is continuous). But the quarterly readiness review serves the same function: it forces a decision on whether to pursue, shape, watch, or pass.

## Quick reference: Decay rules

| Status | Decay rule | What to do if it decays |
|---|---|---|
| Backlog | None | (No decay) |
| Validating | 14 days no evidence → Backlog or Kill | Log evidence, demote, or kill |
| Active | None | (No decay; this is your primary bet) |
| Built | None | (No decay; await real evidence to move to Validating) |
| Parked | None | (No decay) |
| Watching | None | (No decay; review quarterly) |
| Killed | None | (Final; resurrect only via explicit decision) |

## Quarterly reviews and decay

At your quarterly review (see [Quarterly Reviews](../how-to/03-quarterly-reviews.md)), you check for any ideas past the decay window, gather evidence, and make decisions. This is when you batch-process decay scenarios rather than handling them one at a time.

## Related documentation

- [Logging evidence](../how-to/01-logging-evidence.md)
- [Quarterly reviews](../how-to/03-quarterly-reviews.md)
- [Understanding the quadrant](./01-why-the-quadrant.md)
