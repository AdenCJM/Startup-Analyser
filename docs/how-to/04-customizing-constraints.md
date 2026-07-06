# How to Customize Your Founder Constraints

This guide shows you how to fork the default founder constraints to match your own non-negotiables, without breaking the scoring system.

## Why customise

The six default constraints in `reference/founder-constraints.md` encode one founder's situation. You likely have different trade-offs. Customising them turns the framework from "a tool I'm using" into "a tool built for me."

## What you can safely change

**Yes, change these:**
- The language and framing of each constraint (make them honest to your situation)
- The tie-break order (reorder by what you'd actually refuse to compromise on)
- The parameters at the top: your income-freedom target, your bootstrap ceiling, your exit horizon
- The anchors within each constraint (what a PASS or FAIL means for you)

**No, do not change these:**
- The **count**: the system expects 6 constraints. If you remove one and add one, keep the count at 6.
- The **scoring range**: PASS / Mixed / FAIL. This must stay consistent.

The integrity checker and the overview tables key off these invariants.

## Step-by-step: Fork the default constraints

### Step 1: Read the defaults and identify what resonates

Open `reference/founder-constraints.md` and read all six defaults end to end.

Mark the ones that feel true to you (already part of your decision-making) and the ones that do not (either because you disagree or because your situation is different).

### Step 2: Customise one constraint at a time

For each constraint, decide:

1. **Does the spirit match me?** (e.g., "I do care about energy, not drainage" → keep the spirit)
2. **Do the anchors match?** (e.g., "My energy comes from customer relationships, not shipping code" → adjust the anchor)
3. **Does the test make sense?** (e.g., "Would I feel trapped on the average Tuesday?" → reword to your situation)

### Step 3: Customise your parameters

At the top of the file, fill in your three parameters:

```markdown
- **Your income-freedom target.** Example: "$150K/year recurring + healthcare"
- **Your bootstrap ceiling.** Example: "$20K MRR within 18 months on under $50K of your own money"
- **Your exit horizon.** Example: "4-6 years" (shorten or lengthen per your runway)
```

These numbers ground the constraint judgments. When you later score an idea, they become the concrete tests: "Would this reach my bootstrap ceiling?" "Would I still have energy for the work?"

### Step 4: Test your constraints by rescoring an existing idea

Pick one of the worked examples (order-flow, permit-pilot, or habit-mirror) and re-score it against your new constraints.

Does the verdict feel right? If your customised constraints produce a wildly different PASS/FAIL count or energy assessment than the default, either you've found a genuine blind spot or the constraints need refinement.

### Step 5: Commit and move forward

Once your constraints feel honest:

```bash
git add reference/founder-constraints.md
git commit -m "chore: customise founder constraints to my situation"
```

That's it. The rest of the framework reads from this file and will work immediately.

## Examples of useful customisations

### "I value capital ownership more than the defaults suggest"

Edit constraint 4 (Bootstrap by default) to make capital ownership vs borrowed leverage the explicit gate:

**Default anchor:** Can you reach your first milestone without outside capital?

**Your anchor:** Are you building an asset you own outright, not a partnership where control is shared?

Add a sub-check: "If capital is required, does it come with a clause that protects your control?"

### "I don't care about exiting; I want passive income forever"

Edit constraint 3 (Win and exit) to drop the exit requirement:

**Default anchor:** Can this business exist without you in 5-7 years?

**Your anchor:** Can this business throw off enough passive income that I never have to work again?

Adjust the tie-break order to rank this higher if it matters to you.

### "I work best on X, not Y"

Edit constraint 1 (Energy, not drainage) to name your specific work:

**Default anchor:** Feedback loops, shipping, customer interaction.

**Your anchor:** Research, design, or teaching. Whatever you actually do on weekends.

### "My exit horizon is much longer/shorter"

Edit the parameter at the top:

```markdown
- **Your exit horizon.** 10 years. I want to build for the long term.
```

This cascades into constraint 3's anchor: "Can this business be sellable or runnable without me in 10 years?"

## If you want to add or remove a constraint

The system expects exactly 6. If you genuinely need a 7th, add it, but you **must**:

1. Update `scripts/check_integrity.py` to expect 7 instead of 6 (the FOUNDER_CONSTRAINTS_COUNT constant)
2. Update `ideas/_overview.md` header from `6 PASS` to `7 PASS`
3. Update `templates/idea-template.md` to show 7 rows instead of 6
4. Retally your worked examples (order-flow, permit-pilot, habit-mirror) and ensure their overview rows still match their READMEs

The change is mechanical and fully reversible, but the discipline is to change all the places at once so they stay in sync. If you remove a constraint instead, do the opposite: change the count down and update every tally.

## Validating your constraints

After customising, run the integrity checker:

```bash
python3 scripts/check_integrity.py
```

It should exit 0 (with no warnings about founder-fit tallies). If it fails, check:

- Did you accidentally change the count away from 6?
- Did you change PASS / Mixed / FAIL to something else?
- Do your existing idea READMEs still show 6 constraint rows?

## What changes, what stays the same

After you customise:

| What changes | What stays the same |
|---|---|
| Language, anchors, the tie-break order | The count (always 6); the scoring range (always PASS / Mixed / FAIL) |
| Your parameters (income-freedom, bootstrap ceiling, exit horizon) | The framework structure, the 2x2 quadrant, the overview table schema |
| How you interpret "energy" or "bootstrap" | The fact that Founder Fit = High when you hit 5+ PASS |

The framework remains intact; only the content of each constraint becomes yours.

---

## Next steps

Once your constraints are customised:

1. **Rescore your existing ideas** against the new constraints. The Founder Fit and Quadrant may shift.
2. **Use them for new ideas.** When you create a new idea, score it against your constraints, not the defaults.
3. **Revisit annually.** Your constraints can evolve as your situation changes. A quarterly review is a good time to revisit.
