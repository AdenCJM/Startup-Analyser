# Getting Started with Startup Analyser

In this tutorial, you'll set up the Startup Analyser knowledge base, customize it to your situation, capture your first idea, and verify everything works. You'll end with a working repository ready for ongoing use.

## What you'll need

- Git installed and configured
- Python 3 (for the integrity checker; it uses only the standard library)
- A text editor or IDE
- 15–20 minutes

## Step 1: Clone or initialise the repository

If you're starting fresh with your own repo:

```bash
git init startup-analyser
cd startup-analyser
git remote add origin <your-repo-url>
```

Or clone an existing fork:

```bash
git clone <your-fork-url> startup-analyser
cd startup-analyser
```

## Step 2: Customise the founder constraints

The heart of the system is your constraints. Open `reference/founder-constraints.md` and edit the six defaults to match your non-negotiables.

At the top of the file, you'll see three parameters to fill in:

```markdown
- **Your income-freedom target.** The recurring income that means you no longer 
  have to take work you do not want. Set a figure.
- **Your bootstrap ceiling.** The milestone you want to hit without outside capital, 
  stated as `$X recurring revenue within Y months on under $Z of your own money`.
- **Your exit horizon.** The window in which the asset should become sellable or 
  runnable without you. The default below uses five to seven years.
```

Then read each constraint (Energy, Model Curve, Win-and-Exit, Bootstrap, Decouple Revenue, Wealth Games) and decide: does this default match you? Edit the language and the test to be honest about what you will actually refuse to compromise on.

**Verification:** you should feel agreement when you read your constraints back. These are the frame through which every idea will be judged.

## Step 3: Add your first idea

Create a new idea folder under `ideas/`:

```bash
mkdir ideas/my-first-idea
cp templates/idea-template.md ideas/my-first-idea/README.md
```

Open `ideas/my-first-idea/README.md` and fill it in. Read the template comments carefully — they explain what each section is for.

Start simple: write a one-liner, a description of the problem you're solving, and rough scores for the six constraints (PASS, Mixed, or FAIL for each). Don't aim for perfection; aim for honesty.

**Expected output:** a filled README with a Status of `Backlog`, a Quadrant verdict (BUILD, OPPORTUNITY GAP, KILL, or PASS), and a Runway & Sequencing verdict.

## Step 4: Update the master overview table

Edit `ideas/_overview.md` and add a row for your idea to the `## Ideas` table. The columns are:

| Idea | Type | One-liner | Stage | Fit | Mkt Opp | Quadrant |
|---|---|---|---|---|---|---|

Fill in the Fit (count your PASS constraints, e.g., `5/6`), Mkt Opp (the Market Opportunity composite, e.g., `3.8`), and Quadrant verdict.

## Step 5: Run the integrity checker

From the repo root:

```bash
python3 scripts/check_integrity.py
```

You should see:

```
[CHECK 0] Evidence freshness
  (reports how old the most recent evidence entry is)
[CHECK 1] Folders, READMEs, status validity
  OK
[CHECK 2] Overview row counts
  OK
... (other checks)
```

Exit code 0 means the repo is structurally sound. (A stale-evidence warning is expected on a fresh repo.)

**If you see FAILs:** the output tells you exactly which check failed. Read the `scripts/README.md` section on that check to understand what to fix.

## Step 6: Add a decision entry

Open `decisions.md` and append a dated entry:

```markdown
## 2025-02-15

**Created** [my-first-idea](ideas/my-first-idea/README.md) (Status: Backlog).
Quadrant: BUILD. A strong fit with Medium market opportunity.
```

The log is append-only; each entry captures a decision or status change with the date and reasoning. Over time, this becomes a memory of why each idea was scored the way it was.

## What you built

You now have:

1. ✅ A customised constraint set that reflects your non-negotiables
2. ✅ Your first idea captured and scored against all four lenses
3. ✅ A decision log entry
4. ✅ A verified, structurally sound repository

## Next steps

- **Add more ideas.** Repeat Steps 3–5 for each idea you want to capture.
- **Start logging evidence.** When you have a customer conversation or market observation, add it to `evidence.md` (see [How to log evidence](../how-to/logging-evidence.md)).
- **Run the showcase** (optional). If you want to publish ideas publicly, see [How to run the showcase](../how-to/showcase.md).
- **Understand the frameworks.** Read [The Four Lenses: A Deep Dive](../explanation/four-lenses.md) to understand the scoring philosophy behind each dimension.
