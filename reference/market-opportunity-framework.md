# Market Opportunity Framework

**Purpose:** evaluate a business opportunity on its own merits, independent of who you are. This framework answers "how valuable is this as a business?" not "can I build it?"

It sits alongside the [Founder Constraints](founder-constraints.md) framework. Together they form a dual-lens system:

- **Founder Constraints** answers "can I build this, given who I am and where I am?"
- **Market Opportunity** answers "is this worth building, regardless of founder?"

The intersection produces a 2x2 quadrant that drives the decision.

---

## The five dimensions

Score each 1-5. No half points. Justify in one line.

### 1. Problem Severity

How painful is this problem, and for how many people?

| Score | Definition |
|---|---|
| 5 | Hair-on-fire problem. People are actively spending money on bad solutions. Regulatory or existential pressure. |
| 4 | Significant pain. People know they have the problem and want it solved. Quantifiable cost. |
| 3 | Real problem but tolerable. People work around it. Nice-to-have territory. |
| 2 | Mild inconvenience. People do not think about it until prompted. |
| 1 | A solution looking for a problem. |

**Ask:** would someone describe this problem, unprompted, to a stranger?

### 2. Market Size

Realistic total addressable market. The dollar bands below are a sensible default; localise them to your currency and category if the ranges do not fit your market.

| Score | Definition |
|---|---|
| 5 | $10B+ TAM. Global, cross-industry, growing. |
| 4 | $1-10B TAM. Large vertical or multi-geography horizontal. |
| 3 | $100M-$1B TAM. Single vertical or single geography. |
| 2 | $10-100M TAM. Niche market with a clear ceiling. |
| 1 | Under $10M TAM. Micro-niche or hobby market. |

**Ask:** if this company captured 10% of addressable customers, what is the revenue?

### 3. Defensibility

Can you build a moat that survives five years?

| Score | Definition |
|---|---|
| 5 | Network effects plus switching costs plus a data flywheel. Incumbents cannot replicate without rebuilding from scratch. |
| 4 | Deep integration stickiness or a proprietary data advantage. Hard to switch away. |
| 3 | Brand plus workflow lock-in. Switchable but painful. |
| 2 | First-mover advantage only. Features can be copied by incumbents within 12 months. |
| 1 | No moat. Platform incumbents are already building this as a feature. |

**Ask:** if a large incumbent decided to build this tomorrow, would existing customers stay?

### 4. Timing

Is the market ready now?

| Score | Definition |
|---|---|
| 5 | The market is buying now. Demand exists. Early movers are already growing fast. |
| 4 | The market is emerging. Early adopters exist. A clear catalyst within 12 months. |
| 3 | The market is early. The thesis is sound but buyers are not actively looking yet. |
| 2 | The market is speculative. It depends on regulatory or technology shifts that may not happen. |
| 1 | Too early or too late. Either the trigger has not happened or incumbents already own the space. |

**Ask:** if you launched tomorrow, would 10 people pay within 30 days?

### 5. Value Capture

Can you extract revenue proportional to the value you deliver?

| Score | Definition |
|---|---|
| 5 | Clear ROI story. Customers save or make multiples of what they pay. Pricing power is strong. |
| 4 | Good value exchange. Customers can justify the spend. Competitive pricing pressure is manageable. |
| 3 | Value is real but hard to quantify. Customers buy on belief, not measurement. |
| 2 | Race to the bottom. Commoditised space, margins under pressure. |
| 1 | Customers expect this for free. Monetisation is an afterthought. |

**Ask:** can the customer calculate their ROI on a napkin?

---

## Composite score

Take the **simple average of all five dimensions. No weighting.** This is a deliberate design choice: at the "is this a good business?" altitude, all five dimensions matter roughly equally, and weighting them invites false precision. If you later find one dimension consistently dominates your decisions, that is a signal to revisit your constraints, not to bolt weights onto this lens.

**Bands:**

| Composite | Label | Meaning |
|---|---|---|
| >= 4.0 | **High** | A genuinely large opportunity. If it fails your founder constraints, it becomes Watching rather than Killed. |
| 2.5 - 3.9 | **Medium** | A solid opportunity, but with real ceilings or risks. |
| < 2.5 | **Low** | Structurally weak. Not worth building regardless of founder fit. |

---

## The 2x2 quadrant

Founder Fit (from the six constraints) crossed with Market Opportunity (from this framework):

```
                    High Founder Fit            Low Founder Fit
                    (5+ constraints PASS)       (<5 constraints PASS)
                +-----------------------+-----------------------+
High Market     |                       |                       |
Opportunity     |        BUILD          |    OPPORTUNITY GAP    |
(>= 4.0)        |                       |                       |
                |  Execute. This is     |  Watching status.     |
                |  the right bet.       |  Track flip           |
                |                       |  conditions.          |
                +-----------------------+-----------------------+
Medium Market   |                       |                       |
Opportunity     |       LIFESTYLE       |        KILL           |
(2.5 - 3.9)     |                       |                       |
                |  You can build it,    |  Wrong founder AND    |
                |  but the ceiling is   |  limited upside.      |
                |  real. Fine if it     |  Move on.             |
                |  fits the life you    |                       |
                |  want.                |                       |
                +-----------------------+-----------------------+
Low Market      |                       |                       |
Opportunity     |        PASS           |        KILL           |
(< 2.5)         |                       |                       |
                |  You could build it,  |  Dead on both axes.   |
                |  but why? Small       |                       |
                |  market, weak moat.   |                       |
                +-----------------------+-----------------------+
```

**BUILD ideas can have a Medium market.** An idea scoring a Medium 3.4 on this lens is still the right thing to build when Founder Fit is High. The quadrant adds a second dimension; it does not override your constraints. The most common mistake is killing a strong-fit idea because its market is "only" Medium. Do not. A High-fit, Medium-market idea is a BUILD.

**OPPORTUNITY GAP is the critical addition.** These are ideas where the market is real and large but you cannot execute today. They get **Watching** status instead of being killed.

---

## Constraint Flip Conditions

Every Opportunity Gap idea must document what specifically would need to change for the failing founder constraints to pass. Review these quarterly.

Flip conditions must be **specific and observable**, not "if the market gets bigger" but a named, watchable trigger. Good examples in shape:

- "Bootstrap FAIL flips if the idea reaches `$X recurring revenue` and generates enough cash flow to fund six months of a longer sales motion."
- "Energy FAIL flips if a co-founder joins who owns the part of the work that drains you."
- "Revenue-decoupled FAIL flips if a repeatable, low-touch onboarding process replaces the founder-hours currently needed per customer."

The test for a good flip condition is whether a third party could look at your evidence log and tell, without asking you, whether it has fired.

---

## Crown Jewel

If one Watching idea has dramatically higher market opportunity than all the others (a gap of **>= 1.0 point** above the next highest), flag it as **Crown Jewel** in your overview. This idea earns:

- Prominent visibility in your ideas overview.
- Active signal monitoring. Log signals that affect it even when you are not working on it.
- Priority in the quarterly Watching review.
- A running content clock. Publish work related to this space to build positioning for when the flip conditions are met.

---

## The Market Opportunity override

A high market score should not let a great market die just because the timing on you is wrong. So:

- Any idea with **Composite >= 4.0** that would otherwise be killed becomes **Watching** instead. The market is too good to forget.
- A Composite below 4.0 does not earn the override. A Medium-or-Low market with Low fit is a KILL, and should run the kill ceremony.

Market Opportunity does not override Founder Constraints for active decisions. You still build the High-fit idea before the High-market-but-Low-fit one. But you do not throw the big market away, you watch it, and you let the sequencing layer (`runway-and-sequencing.md`) order the BUILD ideas you do act on.

---

## How this lens interacts with the others

- **Founder Constraints** is the primary execution filter: what to build now.
- **Market Opportunity** is the opportunity ceiling: what is worth building at all.
- **Runway & Sequencing** is the sequencing layer: of the BUILD ideas, which one first. See `runway-and-sequencing.md`.
- **Income-Bridge Viability** scores how well an idea generates runway-extending income. See `income-bridge-viability.md`.

A useful sanity check: an idea with High fit and a Medium market beats an idea with Low fit and a High market for what you build *now*, but the second idea is not dead, it is Watching. The 2x2 keeps both moves visible without forcing a false choice between them.
