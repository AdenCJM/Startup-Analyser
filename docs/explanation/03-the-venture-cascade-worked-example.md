# The Venture Cascade: A Worked Example

The venture track's Master Verdict emerges from a six-step cascade that combines the four lenses and applies gates and modulators. This document walks through a complete, numeric example from idea scores to final verdict, so you can see how the cascade logic works end to end.

## Why the cascade exists

The four lenses produce five independent scores:
- Venture Constraints: X/7 PASS
- Market Opportunity: 1–5 composite
- Partnership Fit: 1–5 weighted composite
- Venture Feasibility: PASS / Mixed / FAIL per filter, resolving to CLEARED / CONDITIONAL / BLOCKED
- Ethics/Legal: binary PASS / FAIL veto

These five numbers do not automatically collapse into a single decision (PURSUE, SHAPE, WATCH, PASS, NO-GO). The cascade is the logic that resolves them. It applies gates (certain scores block certain verdicts), modulators (certain scores pull the verdict down), and a priority order (Ethics is a veto, Feasibility matters before Partnership, etc.).

## The example: BioAlign (a horizontal healthcare-AI venture)

We'll use a fictional venture throughout. The scores are realistic but illustrative.

### Scenario context

**What:** BioAlign is a horizontal predictive-diagnostics layer that sits atop hospital EPRs (electronic patient records) and flags rare disease patterns AI systems might miss. Sells to pathology departments at teaching hospitals and large medical centers.

**The co-founder:** A former head of clinical informatics at a top-10 hospital system who has invested in two early-stage healthtech companies but has never founded.

**Your role:** You're the technical founder (ML systems, integration work, customer success). The co-founder handles clinical credibility, hospital relationships, and fundraising.

---

## The four lenses: scores

### Lens 1: Venture Constraints

| # | Constraint | Score | Why |
|---|---|---|---|
| 1 | Sustained Zone-of-Genius | PASS | Your half is building and tuning the models, earning customer trust. Average year-2 week is shipping and talking to pathologists. The raise and hospital politics land on the co-founder. |
| 2 | Model Curve (near-gate) | PASS | The moat is proprietary training data (rare-disease labelling from your early customers) and deep integration into hospital workflows. Better models make edge-case detection free; the data moat is untouched. |
| 3 | Venture-Scale Outcome (near-gate) | Mixed | (a) Potentially venture-scale: ~$4B TAM (US hospital spending on diagnostics). Path to ~$150M revenue is plausible. (b) Soft on your slice: the co-founder's clinical reputation commands a premium at seed; equity is 45/55 to them. At seed on a $2M raise on $8M post-money valuation, you're 45%. After two priced rounds (assume ~60% cumulative dilution), you're ~18%. At a median $400M exit, that is ~$72M (good, clears your number), but at the bottom of the range, it is tighter. The equity-protection modulator will flag this. |
| 4 | Fundability & Capital Strategy | PASS | A clean vertical-AI story in healthcare, a category investors actively fund. Dozens of healthtech VCs would consider this. |
| 5 | Motivation & Conviction Fuel (hard gate) | PASS | You've seen the problem firsthand (a rare disease took years to diagnose in your family). This is mission-driven. The fuel survives year 3. |
| 6 | Conviction & Opportunity Cost | Mixed | Conviction in this idea beats your current path (you're a staff engineer at a big-cloud company). But part of the pull is the co-founder's clinical credibility and network. Would you build this with a different co-founder? Uncertain enough to score Mixed. |
| 7 | Full-Time Commitment & Personal Runway (hard gate) | PASS | You can go full-time now: $140K founder salary + $300K personal runway covers the dip and the gap between seed and Series A. Dependants provided for across 3 years. |

**Tally:** 5/7 PASS, 2 Mixed (constraints 3 and 6), 0 FAIL.  
**Founder Fit: HIGH** (≥5 PASS).  
**Hard-gate assessment:** Both hard gates (5, 7) are PASS ✓. Neither caps the verdict.  
**Near-gate assessment:** Constraint 3 is Mixed on sub-check (b), flagging the equity-protection modulator.

### Lens 2: Market Opportunity

| Dimension | Score | Why |
|---|---|---|
| Problem Severity | 5 | Rare diseases are under-diagnosed. Delays cost lives. Customers (hospital pathology departments) feel acute pain. |
| Market Size | 4 | TAM roughly $4B (US hospital diagnostics budget). Not a consumer-scale category, but hospital budgets are deep. Venture-scale. |
| Defensibility | 4 | Moat: proprietary training data from rare-disease cases, deep workflow integration. Not network-effect strong, but data-moat solid. |
| Timing | 3 | Hospitals are adopting AI tools (tailwind). But the rare-disease diagnostic category is not yet red-hot. Open window, not urgent tailwind. |
| Value Capture | 5 | Hospitals will pay for reduced diagnostic time and fewer mis-diagnoses. Clear ROI. Strong value capture. |

**Composite: (5 + 4 + 4 + 3 + 5) / 5 = 4.2 / 5.0**  
**Band: HIGH** (≥4.0 = HIGH).

### Lens 3: Partnership Fit

| # | Dimension | Weight | Score | Justification | Validated? |
|---|---|---|---|---|---|
| 1 | Roles & Complementarity | 20% | 4 | Product + Clinical credibility covers the table. You own ML and integration; they own hospital relationships and the raise. Clear asymmetry. | ✓ Clear from experience |
| 2 | Combined Founder-Market Fit | 20% | 4 | Right-to-win: your ML chops + their clinical credibility in the rare-disease community. Strong but not unique (other ML + clinician pairs exist). | Partial — need to validate their rare-disease network |
| 3 | Equity & Commitment Alignment | 20% | 4 | 45/55 split is defensible (you're the technical founder, they bring credibility premium). Vesting, cliff, control agreed. But the split is tighter than peer-funded companies. | ✓ Agreed |
| 4 | Investor Access as an Asset | 15% | Mixed | They claim warm relationships with three tier-1 healthtech VCs. Invested in two companies but neither has raised. **Mark provisional.** Need warm intros to confirm heat. | ✗ Provisional — claims unvalidated |
| 5 | Trust & Working History | 15% | 3 | You've known each other through the hospital, shared some casual projects, but never shipped a company together under pressure. Recent enough (last year). But depth is limited. | ⚠ Limited history |
| 6 | Break Conditions | 10% | Mixed | Vesting is standard. But walk-away terms if Series A is led by a new CEO investor (a likely scenario in healthtech) are not agreed. That edge case is unresolved. | ⚠ Partial; one gap |

**Weighted composite:**  
(4 × 0.20) + (4 × 0.20) + (4 × 0.20) + (3 × 0.15) + (3 × 0.15) + (3 × 0.10) = **3.6 / 5.0**

**Gate: Fragile** (2.5–3.4 = Fragile; note: this is actually 3.6, which is borderline; let me recalculate: 0.80 + 0.80 + 0.80 + 0.45 + 0.45 + 0.30 = 3.6, which is actually Workable [3.5–4.4]; the boundary is at 3.5, so 3.6 is just into Workable).

**Corrected gate: Workable** (barely). 

**Action:** Validate Investor Access and formalize walk-away terms before advancing.

### Lens 4: Venture Feasibility

| # | Filter | Result | Why | Type |
|---|---|---|---|---|
| 1 | Capital Path | Mixed | Seed conversations are warm but no lead yet. The capital path exists (many healthtech funds would consider this), but the operational plan (who the lead is, close timing, non-dilutive runway) is uncertain. A Mixed feasibility filter is gating. | Gating |
| 2 | Go-to-Market / Regulatory Pathway | Mixed | Go-to-market is clear (direct to pathology departments at academic medical centers). But FDA approval is likely required (rare-disease diagnostics are probably Class II/III). Approval timeline is uncertain (6–18 months). This is a realistic gate but not yet de-risked. | Gating |
| 3 | Build & Operate | PASS | Realistically buildable in 6 months (MVP for one disease). Operationally, this is a SaaS + services business (integration is high-touch). The team has built similar systems. | Non-gating |
| 4 | Ethics / Legal | PASS | Product does not cross ethical lines. Regulatory pathway exists. No legal blocker. | Veto (binary) |

**Composite: CONDITIONAL** (a Mix on either gating filter = CONDITIONAL).

**Ethics assessment:** PASS ✓ (no veto).

---

## The six-step cascade

Now walk through the cascade logic to resolve these five numbers into a single Master Verdict.

### Step 1: Hard-gate check (Constraints 5 & 7)

**Rule:** If either hard gate is FAIL, the verdict is capped at PASS or NO-GO.

**This venture:** Constraint 5 (Motivation) = PASS ✓. Constraint 7 (Full-Time Runway) = PASS ✓.

**Outcome:** Neither hard gate is FAIL. Continue to step 2.

### Step 2: Ethics/Legal veto (Feasibility)

**Rule:** If Ethics/Legal is FAIL, the verdict = NO-GO immediately.

**This venture:** Ethics/Legal = PASS ✓.

**Outcome:** Not a veto. Continue to step 3.

### Step 3: Feasibility composite

**Rule:**
- If BLOCKED: verdict = NO-GO.
- If CONDITIONAL: proceed to step 4.
- If CLEARED: proceed to step 4.

**This venture:** Feasibility = CONDITIONAL (Mixed on both gating filters: Capital Path and Go-to-Market).

**Outcome:** Not blocked. Proceed to step 4 with a flag: CONDITIONAL will pull the verdict down.

### Step 4: Market band (Market Opportunity)

**Rule:**
- If LOW (<2.5): verdict = PASS.
- If MED (2.5–3.9): proceed to step 5.
- If HIGH (≥4.0): proceed to step 5.

**This venture:** Market = HIGH (4.2).

**Outcome:** Proceed to step 5.

### Step 5: Founder fit (Constraints X/7 PASS)

**Rule:**
- If LOW (<5 PASS) and Market is MED: verdict = PASS.
- If HIGH (≥5 PASS): proceed to step 6.

**This venture:** Founder Fit = HIGH (5/7 PASS).

**Outcome:** Proceed to step 6.

### Step 6: Partnership gate & equity-protection modulator

**Rule:**
- If Partnership is Misaligned: verdict = PASS.
- If Partnership is Fragile AND Feasibility is CONDITIONAL: verdict = SHAPE (blocker: partnership).
- **Equity-protection modulator:** If Constraint 3 (Venture-Scale Outcome) is Mixed on sub-check (b) — your post-dilution slice is soft — AND Partnership is Fragile or Fragile-to-Workable, pull the verdict down toward SHAPE (blocker: equity protection).
- Otherwise, base verdict on the combination of Market, Founder Fit, Partnership, and Feasibility:
  - Market HIGH + Founder HIGH + Partnership Strong + Feasibility CLEARED → **PURSUE**
  - Market HIGH + Founder HIGH + Partnership Workable + Feasibility CLEARED → **PURSUE**
  - Market HIGH + Founder HIGH + Partnership Workable + Feasibility CONDITIONAL → **SHAPE** (blocker: feasibility)
  - Market HIGH + Founder HIGH + (Partnership Workable or lower) → **SHAPE** or **WATCH**

**This venture analysis:**
- Market: HIGH ✓
- Founder Fit: HIGH ✓
- Partnership: Workable (3.6, just crossing into Workable from Fragile)
- Feasibility: CONDITIONAL (mixed on two gating filters)
- Constraint 3 (Venture-Scale Outcome): Mixed on sub-check (b) — equity-protection modulator applies

**Applying the modulator:** Constraint 3(b) is soft on your slice (18% at exit range bottom vs 20%+ baseline). Partnership is Workable but borderline. Equity-protection modulator says: pull the verdict down from PURSUE toward SHAPE, with the blocker being equity clarity.

**Base verdict path:** Market HIGH + Founder HIGH + Partnership Workable + Feasibility CONDITIONAL → base would be SHAPE (feasibility blocker) or conditional PURSUE.

**Modulator overlay:** Equity-protection modulator adds a second blocker (equity is not yet secured in a way that protects your slice if dilution is heavy).

**Final verdict: SHAPE**

**Blockers:**
1. Feasibility: Capital Path and GTM/Regulatory pathway need de-risking (FDA approval timeline).
2. Partnership: Investor Access is unvalidated; walk-away terms need agreement.
3. Equity: Your post-dilution slice is soft and needs protection (e.g., a ratchet or top-up).

---

## Writing the verdict and next steps

### What goes in the README

In the venture idea's README, record the verdict and the exact blockers:

```markdown
**Master Verdict: SHAPE** — a real healthcare-AI opportunity with three named 
blockers to resolve before advancing:

1. **Feasibility gate:** FDA approval pathway and timeline are uncertain. 
   Obtain a regulatory consultant's assessment before finalizing the seed 
   capital plan.

2. **Partnership gate:** Investor Access claims are unvalidated. Schedule warm 
   intro calls with the claimed contacts to confirm heat. Walk-away terms 
   (control, exit, if Series A is led by a new CEO) need formal agreement 
   before the leap.

3. **Equity-protection modulator:** Your post-dilution slice is soft 
   (18% at median exit). Negotiate a ratchet or top-up mechanism to protect 
   your slice against heavy dilution in rounds 2 and 3.

**Status: Shaping** — actively working these three blockers. Revisit weekly 
(FDA consultant feedback expected by Friday). Partnership clarity expected 
in 2 weeks. Once all three are PASS, verdict becomes PURSUE.
```

### What goes in the decision log

```
2026-07-06 | bioalign | Backlog → Shaping | Venture idea scored. Master Verdict SHAPE. 
Founder Fit High (5/7), Market HIGH (4.2), Partnership Workable (3.6), Feasibility CONDITIONAL. 
Blockers: (1) FDA pathway de-risking, (2) validate co-founder's investor claims + formalize 
walk-away terms, (3) secure equity protection against dilution. Revisit in 2 weeks. 
Track: venture
```

---

## Why this cascade matters

The cascade does three things:

1. **It separates concerns.** Hard gates (motivation, personal runway) are vetoed before you even look at market. Ethics are vetoed before anything else. Partnership is evaluated separately from the market. This prevents a great market from rescuing a shaky founder or a broken partnership.

2. **It surfaces blockers explicitly.** The verdict is never "this is a 7 out of 10"; it is "this is SHAPE with these three specific blockers." That clarity tells you exactly where to spend effort.

3. **It protects against equity surprises.** The equity-protection modulator catches the case where the company itself is great but your slice is junior. It forces the conversation early.

---

## Other verdict paths (brief)

Different score combinations lead to different verdicts:

### PURSUE (green light)

- Market HIGH, Founder HIGH, Partnership Strong+, Feasibility CLEARED, Ethics PASS
- You proceed to Active status immediately. The company is ready to build and raise.

### SHAPE (named blocker)

- Market HIGH, Founder HIGH, but one or more of Partnership/Feasibility/Equity needs clarification
- Status: Shaping. You work the specific blocker (de-risk the feasibility gate, validate partnership claims, secure equity).

### WATCH (high market, gating issue elsewhere)

- Market HIGH, Ethics PASS, but a hard-gate FAIL (motivation or personal runway) or a near-gate FAIL (Model Curve or Venture-Scale Outcome)
- Status: Watching. You document Flip Conditions and monitor the idea quarterly. The market is real; you are not the right person to build it yet.

### PASS (does not clear)

- Market MED or LOW, or Founder Fit LOW, or Partnership Misaligned, or no hard-gate or near-gate FAIL but the combination does not point to PURSUE/SHAPE/WATCH
- Status: Backlog (or solo track). The venture condition does not fit it well right now. It might be a good solo idea instead, or it might need a different co-founder or a different market thesis.

### NO-GO (terminal veto)

- Ethics/Legal FAIL, or Feasibility BLOCKED, or hard-gate FAIL (motivation or personal runway)
- Status: Killed. Terminal. Record the reason in the post-mortem and move on.

---

## The takeaway

The BioAlign example shows that even a strong venture (High founder fit, High market, real co-founder) does not automatically resolve to PURSUE. The cascade surfaces the specific work ahead: de-risk the regulatory pathway, validate the co-founder's investor network, and secure your equity. That clarity is the point. SHAPE is not a failure; it is the dominant early co-founding state. You work the blockers, and once they are resolved, the verdict becomes PURSUE.
