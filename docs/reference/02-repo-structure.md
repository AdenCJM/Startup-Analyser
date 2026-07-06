# Repository Structure Reference

This reference describes the file and folder layout of a Startup Analyser repository.

## Root-level files

| File | Purpose |
|---|---|
| `README.md` | Project overview, quick start, links to documentation |
| `CLAUDE.md` | If using with an AI agent: natural-language commands for the agent (e.g., `new idea: ...`) |
| `CONTRIBUTING.md` | Guidelines for contributing (if shared) |
| `LICENSE` | License text (MIT recommended) |
| `.gitignore` | Files to exclude from version control |

## Core directories

### `ideas/`

Contains the solo (bootstrapped) track ideas. Each idea is a folder with a lowercase-hyphenated name.

```
ideas/
  expense-reporter/
    README.md                      # Idea full specification; scored on 4 lenses
    business-model-canvas.html     # Optional: visual canvas (Strategyzer format)
  time-tracking/
    README.md
    business-model-canvas.html
  _overview.md                      # Master comparison table (source of truth for statuses)
```

**`ideas/_overview.md` structure:**

Contains tables for:
1. **Ideas table:** all ideas, their type, one-liner, status, fit, market opportunity, quadrant
2. **Quadrant summary:** mapping of verdicts to ideas
3. **Market Opportunity scorecard:** all five dimensions + composite for each idea
4. **Runway & Sequencing scorecard:** the three filters, verdict, and sequence position
5. **Income-Bridge Viability scorecard:** three dimensions, composite, and verdict

The overview is the source of truth for status and scorecard data. If an idea's README and overview disagree, the integrity checker fails.

### `ventures/`

Parallel VC-backed venture track. Structure mirrors the solo track but with venture-specific frameworks.

```
ventures/
  README.md                         # Venture track charter (explains the four venture lenses)
  _overview.md                      # Venture ideas overview table
  reference/
    venture-constraints.md          # 7 venture constraints
    market-opportunity-framework.md # Same 5 dimensions as solo, venture-scale anchors
    partnership-fit.md              # 6 partnership dimensions
    venture-feasibility.md          # 4 filters + Ethics/Legal veto
  templates/
    venture-idea.md                 # Template for a new venture idea README
    venture-readiness-review.md     # Template for venture-specific quarterly review
  ideas/
    ledger-grid/
      README.md                     # Venture idea specification
      business-model-canvas.html
```

**Note:** Venture ideas are tagged `Track: venture` in shared logs (`decisions.md`, `evidence.md`, `signals.md`).

### `reference/`

Reference frameworks for the solo track. These are the scoring definitions and constraints; edit them to make them yours.

```
reference/
  founder-constraints.md              # 6 solo constraints (edit to your non-negotiables)
  market-opportunity-framework.md     # 5 market dimensions (edit to localise bands)
  runway-and-sequencing.md            # 3 filters for sequencing
  income-bridge-viability.md          # 3 dimensions for bridge income
  capability-profile.md               # Your skills and edges (optional; reference for constraints)
  business-model-canvas.md            # Guide to the 9-block canvas structure
```

**Edit these to make them yours:**
- Change constraint language and test if they don't fit your situation
- Adjust dollar bands in market and income dimensions to your region
- Add or remove dimensions if you have a strong reason

### `templates/`

Templates for new ideas, reviews, and canvases.

```
templates/
  idea-template.md                  # Template README for a new solo idea (4 lenses, sections)
  quarterly-review.md               # Template for solo quarterly review
  business-model-canvas.html        # HTML template for Strategyzer 9-block canvas
```

Copy these into new idea folders and fill them in.

### `scripts/`

Tooling for integrity and validation.

```
scripts/
  README.md                         # Documentation for the scripts
  check_integrity.py                # Mechanical integrity checker (stdlib-only Python 3)
```

Run `python3 scripts/check_integrity.py` from the repo root to validate the entire structure.

### `showcase/` (optional)

Next.js app for publishing curated ideas publicly (password-gated).

```
showcase/
  README.md                         # Showcase app documentation
  package.json                      # Dependencies (Next.js, React, etc.)
  next.config.ts                    # Next.js configuration
  content.config.mjs                # Which ideas to feature/explore
  scripts/
    build-content.mjs               # Generates showcase content from ideas/ and ventures/
    verify-no-leak.mjs              # Ensures private content doesn't leak into the build
  pages/                            # Next.js pages
  components/                       # React components
```

The showcase reads from `ideas/` and `ventures/` but publishes only the outward narrative (Market Opportunity table, problem description, outcomes), hiding constraint scores and private reasoning.

## Shared logs

Append-only logs shared across both tracks. Each row is tagged with `Track: solo` or `Track: venture`.

### `decisions.md`

Every status change and significant decision. Dated, append-only.

Format:

```markdown
## 2025-02-15

**Created** [expense-reporter](ideas/expense-reporter/README.md) (Status: Backlog).
Quadrant: BUILD.
Rationale: High founder fit (5/6 PASS), moderate market (3.8). Medium market 
is acceptable because founder fit is strong.

**Advanced** [permit-pilot](ideas/permit-pilot/README.md) (Backlog → Validating).
Track: solo

Rationale: Strong market signal (4.2 composite). Constraint flip condition 
for "Founder Constraints" check: hire a technical co-founder. Starting customer 
discovery this week.
```

### `evidence.md`

Customer conversations, experiments, observations, and paid signals. Dated, numbered, idea-tagged.

Format:

```markdown
## 2025-02-20

**#E001** | Ideas: [expense-reporter](ideas/expense-reporter)
**Source:** Freelancer (tax accountant, Austin, TX)

30-minute conversation. Pain is real: 3 hours/week on expense categorisation. 
Willing to pay $15/month. Key insight: They need audit-friendly output, not 
just pretty reports. Integration with tax prep software is more valuable than 
UI polish.

**#E002** | Ideas: [expense-reporter](ideas/expense-reporter), [time-tracking](ideas/time-tracking)
**Source:** Small agency owner (5-person firm, London)

Tried expense automation in Wave; it misses invoice matching. For them, the 
key job is "turn raw financial data into reimbursement claims." Broader than 
just expenses. Would pay €20/month for a tool that does both.
```

### `patterns.md`

Recurring lessons from killed and parked ideas. These are the intellectual capital of your system.

Format:

```markdown
## Pattern 1: Feature, Not a Company

When an idea is valuable but addressable as a feature of another product, 
not a standalone business, it stalls when trying to reach customers 
(because customers don't know it exists, or they get the feature bundled 
elsewhere). Real example: HabitMirror was a consumer habit-tracking widget, 
not a reason to launch a new app. Killed.

## Pattern 2: Co-founder Skills Gap

When you lack a critical skill (sales, tech, domain) and no co-founder is 
committed, ideas take 3x longer to move forward. Even if you can eventually 
hire, the constraint flip takes time. Related idea: permit-pilot holds a 
Watching status pending a technical co-founder commitment.
```

### `signals.md`

Market signals and external observations. These inform quarterly reviews and watching briefs.

Format:

```markdown
## 2025-02-18

**Market signal** | Ideas affected: [expense-reporter](ideas/expense-reporter), [time-tracking](ideas/time-tracking)

DeductibleMe (competitor) announced partnership with Stripe. They now auto-import 
transactions. This raises the feature bar but also validates the market. Timing 
signal: positive.

**Competitive** | Ideas: [permit-pilot](ideas/permit-pilot)

BuildHelper launched a free tier for permit guidance (limited to 5 applications/month). 
This is a direct competitor to Permit Pilot's free offering. Need to differentiate 
on (a) specialisation (specific jurisdictions), or (b) accuracy (audit-trail focus).
```

## Ideas folder structure (detail)

Each idea folder contains:

```
ideas/expense-reporter/
  README.md
    # Sections:
    # - One-liner
    # - Problem & opportunity
    # - Founder Constraints (6 constraints, PASS/Mixed/FAIL each, footer Result: X/6 PASS)
    # - Market Opportunity (5 dimensions, composite, band, quadrant verdict)
    # - Runway & Sequencing (3 filters, verdict, sequence position)
    # - Income-Bridge Viability (3 dimensions, composite, verdict)
    # - Status
    # - [Optional] Constraint Flip Conditions (if Watching)
    # - [Optional] Post-Mortem (if Killed)
    
  business-model-canvas.html
    # Strategyzer 9-block canvas (optional but recommended)
    # Copy from templates/business-model-canvas.html and fill in
```

## Key files to edit

| File | When to edit |
|---|---|
| `reference/founder-constraints.md` | On first setup; edit the 6 defaults to your non-negotiables |
| `scripts/check_integrity.py` | When adopting the framework (change `GRANDFATHER` epoch); otherwise read-only |
| `showcase/content.config.mjs` | When publishing ideas publicly; choose which ones to feature |
| `ideas/_overview.md` | Only when you've already created the idea folder and README; this is updated, not edited directly |

## File naming conventions

- **Idea folders:** lowercase-hyphenated (`my-idea`, not `MyIdea` or `my_idea`)
- **Log files:** standard names (`decisions.md`, `evidence.md`, `patterns.md`, `signals.md`), never renamed
- **Markdown files:** `.md` extension
- **HTML canvas:** `business-model-canvas.html` (standard name)

## Read-only files (don't edit)

- `ideas/_overview.md` — auto-generated or manually maintained as source of truth; edit via the README or manually sync
- `ventures/_overview.md` — same
- `scripts/check_integrity.py` — edit only `GRANDFATHER` constant; leave logic alone (it's your guardrail)
- `templates/` — copy to new locations, don't edit in place

## Integrity expectations

The `scripts/check_integrity.py` script enforces:
- Every idea folder has a README with a valid Status
- Folder names are lowercase-hyphenated
- Overview row counts match folder counts
- Overview status matches README status
- Killed ideas have post-mortems
- Watching ideas have constraint flip conditions
- No idea with Market ≥ 4.0 is Killed
- Evidence log is never empty (at least one dated entry)

Run it regularly (before commits, or in a pre-commit hook).

## Related documentation

- [Running the integrity checker](../how-to/02-running-the-integrity-checker.md)
- [Frameworks quick reference](./01-frameworks-quick-reference.md)
