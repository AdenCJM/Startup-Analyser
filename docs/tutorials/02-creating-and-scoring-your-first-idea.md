# Creating and Scoring Your First Idea

In this tutorial, you'll create a complete idea from scratch, score it against all four lenses, and understand how the quadrant verdict emerges from the scores.

## What you'll need

- A completed setup from [Getting Started](01-getting-started.md)
- A startup idea you want to evaluate (doesn't need to be perfect yet)
- 25–30 minutes

## Step 1: Create the idea folder structure

Let's say your idea is "a tool that simplifies expense reports for freelancers." Choose a short, lowercase-hyphenated name:

```bash
mkdir ideas/expense-reporter
cp templates/idea-template.md ideas/expense-reporter/README.md
```

Open the README and fill in the header:

```markdown
# Expense Reporter

A tool that turns receipt photos and bank transactions into expense reports 
for freelancers and contractors.

**Status:** Backlog
```

## Step 2: Write the problem and opportunity sections

Under the template's guided sections, describe:

**The Problem:**
- What specific pain does this solve?
- Who has it (a real person, not a persona)?
- How bad is the pain today? (1–10)

Example:
```markdown
Freelancers spend 2–3 hours per week hunting receipts, categorising 
expenses, and collating them into spreadsheets for tax time or invoice 
reimbursement. The process is manual, error-prone, and delays reimbursement.
```

**The Opportunity:**
- How much would solving this be worth to a customer? ($/month or €/month)
- How many customers are there?
- What is the defensibility? (Can competitors copy this easily?)

## Step 3: Score the Founder Constraints (6/6)

Read your six customised constraints from `reference/founder-constraints.md`. For each one, score PASS, Mixed, or FAIL and write a one-line justification.

Example constraints (adjust to your own):

```markdown
## Founder Constraints

1. **Energy, not drainage.** PASS — Building a tool that talks to APIs and 
   processes photos is the kind of shipping work that energises me.

2. **Build for the model curve.** PASS — Models are getting better at document 
   parsing and categorisation; this product gets better for free with each 
   release.

3. **Win the game, then exit.** Mixed — There's a path to recurring revenue 
   ($5–10/month per user), but the market is fragmented (freelancers, small 
   agencies). Harder to sell to enterprises.

4. **Bootstrap by default.** PASS — Can start with a simple MVP (receipt 
   upload + category automation) for under $5k.

5. **Revenue decouples from time.** PASS — Once trained, the model categorises 
   automatically. Revenue scales with users, not my time.

6. **Wealth games, not status games.** PASS — Building a tool I own and control, 
   not trying to land a job at a bigger company.

**Result: 5/6 PASS** → Founder Fit: High
```

## Step 4: Score Market Opportunity (5 dimensions, 1–5 each)

Each dimension is scored 1–5. Read the descriptions in `reference/market-opportunity-framework.md` and score honestly.

**Problem Severity** (1–5): How acute is the pain?
- 1 = "nice to have, people live with it"
- 5 = "people will pay to make it stop today"

Example: Freelancers lose money to poor expense tracking. Score: **4**

**Market Size** (1–5): How many people have this problem?
- 1 = "hundreds worldwide"
- 5 = "millions in your target region"

Example: ~30 million freelancers globally; US alone is ~10M. Score: **3** (large, but highly fragmented)

**Defensibility** (1–5): Can competitors copy this easily?
- 1 = "it's a commodity; anyone can build it"
- 5 = "there's a real moat (network, data, switching cost)"

Example: Competitors can build receipt parsing too. But if users trust you with tax data, switching cost rises. Score: **3**

**Timing** (1–5): Is the market ready?
- 1 = "technology doesn't exist yet"
- 5 = "customers are actively looking for this right now"

Example: OCR is mature; AI categorisation is proven. But expense reporting isn't a burning crisis for most freelancers yet. Score: **4**

**Value Capture** (1–5): Can you capture the value you create?
- 1 = "customers will use it but won't pay"
- 5 = "customers see the value and pay willingly"

Example: Accountants might use it, agencies might use it, but freelancers often cheap out. Score: **3**

**Composite:** (4 + 3 + 3 + 4 + 3) / 5 = **3.4** → Band: Medium (2.5–3.9)

## Step 5: Determine the quadrant

The quadrant maps Founder Fit (horizontal: High = 5+ PASS) against Market Opportunity (vertical: band).

Your idea scored:
- Founder Fit: **High** (5/6 PASS)
- Market Opportunity: **3.4** (Medium band)

Look at the 2x2:

|                  | High Market (≥4.0) | Medium (2.5–3.9) | Low (<2.5) |
|------------------|---|---|---|
| **High Fit (5+)** | BUILD | **BUILD** | PASS |
| **Low Fit (<5)** | OPPORTUNITY GAP | KILL | KILL |

Your verdict: **BUILD** — a strong fit in a Medium market. That's a green light to build.

## Step 6: Score Runway & Sequencing (3 filters)

Can you start this now? Does it use your edge? Can it pay inside your runway?

**Startable Now** (PASS / Mixed / FAIL):
- Can you build an MVP in 2–4 weeks?
- Do you have the core skills?
- Example: PASS — you can code, use an OCR API, and deploy to a web server.

**Capability Leverage** (PASS / Mixed / FAIL):
- Does this idea use skills you already have?
- Does it build toward a skill you want?
- Example: PASS — deepens your ML/API integration skills.

**Runway Fit** (PASS / Mixed / FAIL):
- Can this generate revenue inside your runway target (e.g., 6 months)?
- Or can it be sustained on side income?
- Example: Mixed — takes 2–3 months to build, 1–2 months to land first paying customers.

**Verdict:** If all three are PASS, the verdict is **SWING** (start now). If two are PASS and one is Mixed, it's **STRETCH** (plan around the gap). If any are FAIL, it's **WAIT**.

Your example: Mixed + PASS + Mixed = **STRETCH** — you could start now, but budget time for customer discovery.

## Step 7: Score Income-Bridge Viability (3 dimensions, weighted)

As you build the primary idea, can this idea generate bridge income?

The three dimensions are weighted:
- **Time to Revenue (30%):** How fast can you charge customers?
- **Income Ceiling (40%):** What's the realistic monthly revenue, max?
- **Revenue Predictability (30%):** How sure can you be of the revenue?

Each is scored 1–5.

Example:
- **Time to Revenue:** 3 (you can charge within 2–3 months of MVP)
- **Income Ceiling:** 4 ($5–10/month × 100 users = $500–1000/month reasonable)
- **Revenue Predictability:** 3 (depends on customer acquisition; churn unknown)

**Composite:** (3 × 0.30) + (4 × 0.40) + (3 × 0.30) = 0.9 + 1.6 + 0.9 = **3.4** → Viable

## Step 8: Add to the overview table

Edit `ideas/_overview.md` and add your idea to the `## Ideas` table:

```markdown
| [ExpenseReporter](expense-reporter/) | Standalone | A tool that turns receipt photos and bank transactions into expense reports for freelancers. | **Backlog** | 5/6 | 3.4 | BUILD |
```

Then add rows to the Market Opportunity, Runway & Sequencing, and Income-Bridge tables with your scores.

## Step 9: Log the decision

Open `decisions.md` and append:

```markdown
## 2025-02-15

**Created** [expense-reporter](ideas/expense-reporter/README.md) (Status: Backlog).
Quadrant: BUILD (High fit, Medium market 3.4). Runway verdict: STRETCH.
A strong founder fit and clear customer pain, but customer acquisition 
and churn are uncertain. Start when ready, prioritise customer validation 
before scaling.
```

## Step 10: Run the integrity checker

```bash
python3 scripts/check_integrity.py
```

Should pass cleanly. If it doesn't, the output tells you what to fix.

## What you built

You now understand:

1. ✅ How to score the Founder Constraints (honesty, not optimism)
2. ✅ How to assess Market Opportunity on five dimensions
3. ✅ How the quadrant emerges from the two primary lenses
4. ✅ How Runway & Sequencing orders ideas by readiness
5. ✅ How Income-Bridge Viability scores a side hustle
6. ✅ How to log decisions so you remember why you scored it this way

## Next steps

- **Create more ideas.** Repeat this tutorial for your next few ideas to build intuition.
- **Validate your scores.** Talk to 3–5 potential customers. Did they care as much as you scored? Adjust your Market Opportunity scores if evidence contradicts them.
- **Review quarterly.** See [Quarterly Reviews](../how-to/quarterly-reviews.md) to understand when and how to revisit your scores.
- **Understand the frameworks deeply.** See [The Four Lenses: A Deep Dive](../explanation/four-lenses.md) for the philosophy behind each dimension.
