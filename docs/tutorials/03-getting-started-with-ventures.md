# Getting Started with the Venture Track

In this tutorial, you'll create your first venture idea on the parallel VC-backed track, score it across the four venture lenses, and see how the master verdict emerges. By the end, you'll have a fully scored venture idea and understand when (and when not) to use the venture track.

## What you'll need

- A fork or clone of the Startup Analyser repo, already set up with customised constraints
- Python 3 (to run the integrity checker)
- 20–25 minutes
- A co-founder or a co-founder candidate you're evaluating

## Prerequisites: Is this a venture idea?

The venture track is not for every idea. Use it only if **all** of these are true:

1. You're raising institutional capital (a seed round or larger)
2. You're taking a full-time leap from day one
3. There's a co-founder you're evaluating alongside you
4. The target outcome is a fund-returning exit (roughly $300M–$1B+)
5. You need capital before reaching product-market fit

If even one is false, use the solo track instead. You can always move an idea from solo to venture later if the condition changes.

## Step 1: Choose an idea and co-founder to evaluate

For this tutorial, you'll either:

- **Use a real idea and co-founder** you're actively considering, or
- **Use a hypothetical** to get familiar with the framework (the worked example is a good model)

Write down:
- The one-liner: what problem does it solve, for whom?
- The co-founder's background: their role, their experience, their investor connections (if any)

You'll fill these in as you build the idea README.

## Step 2: Create the venture idea folder

Create a new folder under `ventures/ideas/`:

```bash
mkdir ventures/ideas/my-venture-name
cp ventures/templates/venture-idea.md ventures/ideas/my-venture-name/README.md
```

Use a lowercase-hyphenated name. Examples: `ai-data-audit`, `supply-chain-pilot`, `real-estate-ai-assistant`.

## Step 3: Fill in the pitch and customer sections

Open `ventures/ideas/my-venture-name/README.md` and start with the outward narrative:

### Pitch (2-3 sentences)

Write the venture-scale thesis: what gets built, for whom, why it can return a fund. Be specific and conviction-first, not hedged.

**Example (weak):** "An AI tool to help businesses with data."

**Better:** "A horizontal data-audit layer for enterprise AI pipelines. Audits training data for bias, drift, and regulatory risk. Sells to AI teams at fortune-500 enterprises at $500K-$2M annually. Path to $200M revenue."

### The Customer

Name the **wedge buyer** (who writes the first cheque) and the **scale buyer** (where the scale revenue lives). Distinguish them because they are often different.

**Example:**
- **Wedge buyer:** A VP of Analytics at a mid-size fintech under regulatory pressure to audit model inputs
- **Scale buyer:** Every Fortune-500 company's AI governance office

## Step 4: Fill in the co-founder's role and capital plan

### The Capital Plan table

Fill in the seed raise size, how you'll use it, the key milestones, and your runway target.

Example:
- **Raise size:** $1.5M SAFE with a 24-month post-money valuation cap
- **Use of funds:** $600K team (2 engineers), $400K vendor partnerships (data labelling), $300K runway
- **Key milestones:** MVP → first paying customer (3 mo) → 5-customer validation (6 mo) → Series A conversations (12 mo)
- **Runway:** The seed buys 24 months to a Series A close

### Partnership context

In the Lens 3 (Partnership Fit) section, you'll score the co-founder across six dimensions. Start by documenting:

- Role split: what do they own (commercial, product, technical)?
- Experience: what have they shipped before?
- Investor network: have they raised before? Who do they know?
- Prior working history: have you shipped together? Under what pressure?

You'll score these formally in Step 5, but writing them down now grounds the partnership judgment.

## Step 5: Score Lens 1 — Venture Constraints (you)

This lens scores **your half only**, not the co-founder's. It asks: given the role split, can you build this as a VC-backed, full-time, co-founded venture?

For each of the 7 constraints, decide: PASS / Mixed / FAIL.

### Example scoring walkthrough

Let's say you're building the data-audit venture. You're the technical founder (product and the core algorithm); your co-founder handles commercial and the raise.

| # | Constraint | Your score | Justification |
|---|---|---|---|
| 1 | Sustained Zone-of-Genius | PASS | Your half is building the audit algorithm and customer success. An average year-2 week is shipping and talking to design partners. Your co-founder owns the raise and board. |
| 2 | Model Curve (near-gate) | PASS | The moat is proprietary data (customer audit logs) and model-specific detection rules. Better models make edge-case detection free, and your data moat is untouched. |
| 3 | Venture-Scale Outcome (near-gate) | PASS | (a) Can return a fund: a $2B+ TAM (every F500's governance office), clear path to $200M revenue. (b) Your slice: if you're 50/50 at seed and the raise is $1.5M on a $6M post, you're 25% after dilution; a median $500M exit is $125M. |
| 4 | Fundability & Capital Strategy | PASS | A clean horizontal-infrastructure story that enterprise VCs actively back. Pre-seed conversations already warm. |
| 5 | Motivation & Conviction Fuel (hard gate) | PASS | You've lived the problem (you worked at a fintech that got audited). The mission is genuinely yours. |
| 6 | Conviction & Opportunity Cost | Mixed | Conviction in this idea beats walking away from your current CTO role. But it's partly amplified by the co-founder's fundraising track record. Test it: would you still want to build this idea with a different co-founder? Uncertain. |
| 7 | Full-Time Commitment & Personal Runway (hard gate) | PASS | You can go full-time now: $150K founder salary + $200K personal runway covers the dip and inter-round gaps. Dependants are provided for across 3 years. |

**Tally:** 5/6 PASS, 1 Mixed. **Founder Fit: High.** (≥5 PASS = High). Both hard gates (5, 7) pass.

### What to watch

- **Hard gates (5 & 7):** A FAIL here caps the verdict before anything else. If you're here for the status seat or you can't afford to go full-time, the idea does not proceed.
- **Near-gates (2 & 3):** A FAIL is near-fatal. A thin-wrapper business (constraint 2 FAIL) or no venture-scale exit (constraint 3(a) FAIL) almost always sinks it.

## Step 6: Score Lens 2 — Market Opportunity

Score the market the same way you would on the solo track: 1-5 per dimension, simple average.

**Reminder:** score the *market*, not whether this venture can capture it. Score the market in the abstract.

| Dimension | Score | Why |
|---|---|---|
| Problem Severity | 5 | Buyers lose money without this: regulatory fines, failed audits, model failures. Acute. |
| Market Size | 4 | TAM is roughly $2B (regulatory compliance budget of F500 + mid-market). Venture-scale but not a hyperscale category. |
| Defensibility | 4 | Defensibility: proprietary data (training logs), deep integration into ML pipelines, switching cost. Not a network effect, but strong data moat. |
| Timing | 3 | Timing is moderate: regulation is increasing, but the category is not yet red-hot. There is an open buying window but it is not urgent yet. |
| Value Capture | 4 | Customers see the value and will pay. $500K–$2M deals are realistic for the first customers because the alternative (hiring a compliance consultant) costs more. |

**Composite: (5 + 4 + 4 + 3 + 4) / 5 = 4.0**

**Band: HIGH.** (≥4.0 = HIGH market)

## Step 7: Score Lens 3 — Partnership Fit

This is where you score the co-founder. 6 dimensions, weighted. **This is critical:** if any score rests on the co-founder's unvalidated claims (investor readiness, reputation), mark it provisional and validate from primary sources before recording final scores.

| # | Dimension | Weight | Score | Why | Validated? |
|---|---|---|---|---|
| 1 | Roles & Complementarity | 20% | 4 | Product + Commercial covers the table. You have overlap on capital decisions (both understand funding), but it is not a gap. Asymmetry is clear. | ✓ Shipped 3 companies |
| 2 | Combined Founder-Market Fit | 20% | 4 | Right-to-win: your data-moat expertise + their enterprise-sales network. Strong but not undisputed (other teams have both skills). | Partial — need to validate investor claims |
| 3 | Equity & Commitment Alignment | 20% | 5 | 50/50 split is fair to equal contribution. Cliff, acceleration, and control terms are agreed. Signed founder agreement. | ✓ Signed |
| 4 | Investor Access as an Asset | 15% | Mixed | They claim warm relationships with two Tier-1 enterprise VCs. **Mark provisional**. Need warm intro calls to confirm VCs are actually warm. | ✗ Provisional — validate |
| 5 | Trust & Working History | 15% | 5 | You shipped the 2020 product relaunch together. Pressure-tested. Recent (last year). | ✓ Shipped together |
| 6 | Break Conditions | 10% | 4 | Vesting is standard (4-year cliff, 1-year). Control terms agreed. Walk-away terms if Series A raises a new lead VC. One edge case unresolved: what if one founder is forced out? Buildable. | ✓ Mostly agreed |

**Weighted calculation:**
- (4 × 0.20) + (4 × 0.20) + (5 × 0.20) + (3.5 × 0.15) + (5 × 0.15) + (4 × 0.10) = **4.23 / 5.0**

**Gate: Workable.** (3.5–4.4 = Workable)

**Action:** Validate the Investor Access claim before the venture moves further.

## Step 8: Score Lens 4 — Venture Feasibility

Four filters: Capital Path, Go-to-Market, Build & Operate, and Ethics/Legal (which is a veto).

| # | Filter | Result | Why | Type |
|---|---|---|---|---|
| 1 | Capital Path | PASS | Seed lead is warm (partner at Accel has committed to an intro call). 24-month runway to Series A is standard. Non-dilutive overlay: accelerators and data-labelling grants available. | Gating |
| 2 | Go-to-Market / Regulatory Pathway | PASS | GTM is clear: direct sales to Fortune-500 governance offices. No regulatory approval needed for the product itself (though customers are regulated). | Gating |
| 3 | Build & Operate | PASS | Realistically buildable in 3 months (MVP). The team has shipped similar systems. Operationally, this is a SaaS business (standard). | Non-gating |
| 4 | Ethics / Legal | PASS | Product does not cross ethical lines. It is a compliance tool. Legally clean. | Veto (binary) |

**Composite: CLEARED.** (All PASS or non-gating = CLEARED)

## Step 9: Run the cascade and determine the Master Verdict

Walk through the six-step cascade (detailed in the quick reference):

1. **Hard gates (Constraints 5 & 7):** Both PASS ✓
2. **Ethics/Legal veto:** PASS ✓
3. **Feasibility composite:** CLEARED ✓
4. **Market band:** HIGH (4.0) ✓
5. **Founder fit:** HIGH (5/7 PASS) ✓
6. **Partnership gate:** Workable (4.23/5), with one provisional score needing validation

**Result:** All green lights, with one caveat (Investor Access is provisional). **The verdict is PURSUE** (pending validation of the Investor Access claim).

**However:** Until you validate the co-founder's investor relationships from primary sources, mark the verdict conditional: **PURSUE once Partnership Fit dimension 4 is validated.**

## Step 10: Add to the overview and run the integrity checker

Edit `ventures/_overview.md` and add a row for your venture:

| Idea | Type | One-liner | Master Verdict | Status | Founder Fit | Market | Partnership |
|---|---|---|---|---|---|---|---|
| my-venture-name | Standalone | ... | PURSUE (provisional) | Validating | High (5/7) | HIGH (4.0) | Workable (4.23) |

Run the integrity checker:

```bash
python3 scripts/check_integrity.py
```

It should exit 0. If it fails, check:
- Is there a `ventures/ideas/my-venture-name/README.md`?
- Does the status (Validating) match the lifecycle set (Backlog, Validating, Shaping, Active, Watching, Parked, Killed)?
- Do the overview row and the README agree on Master Verdict?

## Step 11: Log the decision

Append a row to `decisions.md`:

```
2026-07-06 | my-venture-name | Backlog → Validating | New venture idea scored. Master Verdict PURSUE (provisional pending validation of Investor Access claim in Partnership Fit). Founder Fit High (5/7), Market HIGH (4.0), Partnership Workable (4.23). Next: validate co-founder's investor relationships from primary sources. | Track: venture
```

## What you've built

A fully scored venture idea with:

- ✓ All four lenses scored
- ✓ A Master Verdict (PURSUE, with a stated dependency)
- ✓ Clear next steps (validate partnership claims)
- ✓ An entry in the overview and decision log

You now have the foundation to move into **Shaping** (working the blocker) or **Validating** (gathering evidence) depending on whether the partnership validation is clean.

## Next steps

1. **Validate unconfirmed claims.** Schedule warm intro calls with the investors your co-founder claims to know. Update Partnership Fit dimension 4 with the result.
2. **Run customer conversations.** Talk to 3–5 potential early customers. Do they feel the pain acutely? How much would they pay?
3. **De-risk the near-gates.** If constraint 2 (Model Curve) or constraint 3 (Venture-Scale Outcome) are shaky, run a spike to validate the moat and the exit-economics math.
4. **Revisit status after validation.** Once the Partnership claim is validated, move the status to Shaping or Active depending on what blockers remain.

## Going deeper

- **Full constraint reference:** `ventures/reference/venture-constraints.md`
- **Partnership validation guide:** `ventures/reference/partnership-fit.md`
- **The cascade in detail:** `ventures/reference/venture-feasibility.md`
- **Worked example (LedgerGrid):** `ventures/ideas/ledger-grid/README.md`
- **Comparing venture vs solo:** `docs/reference/03-venture-frameworks-quick-reference.md`
