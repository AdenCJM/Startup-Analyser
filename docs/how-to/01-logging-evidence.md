# How to Log Evidence

Every customer conversation, market observation, and validation signal should be logged in `evidence.md`. This guide shows you how to structure evidence entries so they stay useful.

## Prerequisites

- A Startup Analyser repository set up (see [Getting Started](../tutorials/01-getting-started.md))
- At least one idea in your repo
- Evidence to log (a customer conversation, observation, or metric)

## What evidence looks like

Evidence entries are dated, tagged with the idea(s) they affect, and numbered for reference. They are append-only; you never delete or rewrite them. Over time, they become a memory of what you learned.

Example:

```markdown
## 2025-02-20

**#E001** | Ideas: [expense-reporter](ideas/expense-reporter)
**Source:** Freelancer (tax accountant, Austin, TX)

Had a 30-minute conversation about expense categorisation pain. They manually 
sort receipts weekly, ~2 hours per week. Willing to pay $15/month for automation.
Key insight: They want the report to be audit-friendly; tax prep software 
integration is more valuable than pretty visuals.
```

## Step 1: Identify the source

Source can be:
- A customer conversation (include role, location, not their name)
- A competitive observation (product name, what you learned)
- A metric or market signal (link to the source)
- An experiment result (what you tested, the outcome)

**Example sources:**
- "Freelancer (tax accountant, Austin, TX)"
- "Competitor DeductibleMe, pricing page"
- "10 cold emails, 3 replies, 1 conversation scheduled"
- "First paid signup; started 2025-02-20"

**Anonymity rule:** use role and location, never personal names. If you're sharing the repo or publishing anything later, names will have been stripped for privacy.

## Step 2: Write the core insight

Keep it factual and specific. Avoid interpretation; record what you heard or saw, not what you think it means.

**Good:**
"They spend 4 hours a week on expense reporting. They want the software to 
flag outliers (unusual categories or amounts) because they've caught fraud 
that way before."

**Not as useful:**
"There's definitely a market for expense automation."

**What to capture:**
- Specific numbers (hours, dollars, frequency)
- Direct quotes if striking
- Objections and hesitations (as useful as enthusiasm)
- Unexpected discoveries
- Jobs to be done (what are they really trying to accomplish?)

## Step 3: Tag the idea(s)

At the top of the entry, tag which idea(s) this evidence affects. Use markdown links:

```markdown
**Ideas:** [expense-reporter](ideas/expense-reporter), [time-tracking](ideas/time-tracking)
```

If one entry is evidence for multiple ideas, tag them all. The integrity checker and overview searches depend on these tags.

## Step 4: Decide on the source line

The source line tells readers who you talked to and where. Use a consistent format:

- **Customer:** Role / Location / (optional: company size, industry)
  - Examples: "Freelancer (tax accountant, Austin, TX)" or "Small business owner (5-person accounting firm, London)"
- **Experiment:** What you tested, sample size, outcome
  - Example: "5 cold emails sent to freelancers; 1 reply, 0 meetings"
- **Metric:** What was measured, where
  - Example: "First paid user signup (via Product Hunt)"
- **Competitor:** Product name, date, where observed
  - Example: "DeductibleMe pricing page, 2025-02-20"

## Step 5: Append to evidence.md

Open `evidence.md` and append your entry at the end. Each dated section can have multiple entries.

```markdown
## 2025-02-21

**#E001** | Ideas: [expense-reporter](ideas/expense-reporter)
**Source:** Freelancer (tax accountant, Austin, TX)
Had a 30-minute conversation...

**#E002** | Ideas: [expense-reporter](ideas/expense-reporter), [time-tracking](ideas/time-tracking)
**Source:** Small business owner (5-person firm, London)
Tried their bookkeeper use case...
```

## Step 6: Verify and commit

Run the integrity checker to confirm the links are valid:

```bash
python3 scripts/check_integrity.py
```

It should report "OK" on the log-tagging checks. If an idea link is broken, fix it.

Then commit:

```bash
git add evidence.md
git commit -m "log: freelancer conversation on expense categorisation, tax filing concerns"
```

## Examples of different evidence types

### Customer conversation

```markdown
**#E003** | Ideas: [expense-reporter](ideas/expense-reporter)
**Source:** Freelancer (translator, Berlin, Germany)

30-minute call. Currently uses Wave for invoicing; manually categorises 
expenses in a spreadsheet because Wave's categorisation doesn't match German 
tax codes. Spends 3 hours/month on this. Willing to pay €8/month for automation. 
Biggest hesitation: trusts Wave, would need to trust a new tool with financial 
data. "I'd need to see it used by other translators first."
```

### Metric / paid signal

```markdown
**#E004** | Ideas: [expense-reporter](ideas/expense-reporter)
**Source:** First paid user signup (2025-02-21, via Product Hunt)

User is a freelancer in Toronto. Signed up for $5/month plan. Uploaded 
12 receipts in first session, 4 categorised automatically, 8 required manual 
correction. Stayed 23 minutes in the app. No churn event logged yet (day 1).
```

### Experiment result

```markdown
**#E005** | Ideas: [expense-reporter](ideas/expense-reporter)
**Source:** Cold email outreach (20 emails sent, 2025-02-18 to 2025-02-20)

Targeted freelancers in freelancer communities (Slack, Reddit). 
20 emails sent. 1 reply (translator, positive). 1 auto-reply (out of office). 
Response rate: 5%. No meeting scheduled yet. Key learning: email subject lines 
emphasizing "audit-friendly" performed better than "expense automation."
```

### Competitor observation

```markdown
**#E006** | Ideas: [expense-reporter](ideas/expense-reporter)
**Source:** DeductibleMe pricing (observed 2025-02-20)

Competitor charges $7/month starter, $15/month pro. Pro tier includes API 
access and bulk expense management. Still no tax-code targeting. Their free 
tier has a 5-receipt limit. Their feature roadmap mentions "accountant 
collab tools" as coming Q2.
```

## Verification checklist

- [ ] Entry is dated (YYYY-MM-DD format)
- [ ] Source is described (role/location, not names)
- [ ] Idea tag(s) link correctly to existing idea folders
- [ ] Core insight is specific (numbers, quotes, or direct observation, not interpretation)
- [ ] Entry is appended to the end of the file (never edited into the past)
- [ ] `python3 scripts/check_integrity.py` passes
- [ ] Commit message is concise and describes the evidence type

## When to log evidence

You should log evidence:
- After every customer conversation
- When a competitor ships something new
- When you get a paid signup or cancellation
- When an experiment produces surprising results
- When a market signal contradicts or confirms your assumptions

You don't need to log:
- Internal conversations or meetings (those belong in `decisions.md` if they change a status)
- Duplicate evidence (if you've already logged "freelancers need tax code support" from 5 customers, the 6th customer saying the same thing is confirmation, not new evidence)
- Vague hunches or speculation (it goes in `signals.md` if it's external market info, or in a decision note if it's internal reasoning)

## Related

- [Understanding the evidence log](../reference/log-structure.md)
- [Quarterly Reviews](./quarterly-reviews.md)
- [Understanding status decay](../explanation/evidence-freshness.md)
