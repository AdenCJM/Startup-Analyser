# How to Run the Integrity Checker

The integrity checker (`scripts/check_integrity.py`) is a automated guard that catches structural problems in your idea repo: missing README files, overview rows out of sync with folders, ideas without required sections, and more.

## Prerequisites

- Python 3 (no external packages needed; it uses only the standard library)
- A Startup Analyser repository

## Run the checker

From the repo root:

```bash
python3 scripts/check_integrity.py
```

It will print a report showing each check, then an overall summary.

## Expected output (passing repo)

A passing repo will print:

```
[CHECK 0] Evidence freshness
  Latest evidence entry: 2 days old (2025-02-19)
  Validating ideas with evidence < 14 days old: OK

[CHECK 1] Folders, READMEs, and status validity
  OK (3 ideas found)

[CHECK 2] Overview row counts
  Solo: 3 folders, 3 overview rows. OK
  Ventures: 0 folders, 0 overview rows. OK

[CHECK 3] Overview status vs README status match
  OK

[CHECK 4] Post-mortems and flip conditions
  OK

[CHECK 5] Market Opportunity override (no ideas with Mkt ≥ 4.0 should be Killed)
  OK

[CHECK 6] Folder naming conventions
  OK

[CHECK 7] Log track tagging
  OK

[CHECK 8] Runway & Sequencing and Income-Bridge section presence
  OK

───
Exit code: 0. All checks passed.
```

## Understanding the checks

### Check 0: Evidence freshness

Reports how recently you logged evidence. On a quiet repo (no recent conversations), this will warn if the last evidence entry is more than 30 days old. That's expected and not a failure.

Also warns if any idea in `Validating` status has no evidence mentioning it inside the last 14 days. This is how the system enforces the rule: if you're not gathering evidence for an idea, it should not stay `Validating`.

**Failure condition:** `evidence.md` has no dated entries at all (the log is supposed to be append-only and never empty).

### Check 1: Folders, READMEs, and status validity

Verifies:
- Every idea folder contains a `README.md`
- Each README has a `**Status:**` field
- The status is one of the valid lifecycle words (Backlog, Validating, Active, Built, Parked, Watching, Killed for solo; add Shaping for ventures)
- Folder names are lowercase-hyphenated (`my-idea`, not `My_Idea` or `my_idea`)

**Failure condition:** a folder without a README, or a status that is not a recognised word.

### Check 2: Overview row counts

The overview table (`ideas/_overview.md` and `ventures/_overview.md`) is the source of truth. It must have exactly one row per idea folder.

**Failure condition:** the number of rows doesn't match the number of folders. The output will list which folders have no row and which rows have no folder.

### Check 3: Overview status vs README status match

For each idea, the status in the overview table must match the status in the idea's README.

**Failure condition:** a mismatch (e.g., the README says `Validating` but the overview says `Backlog`).

### Check 4: Post-mortems and flip conditions

- Every `Killed` idea must have a `## Post-Mortem` section in its README (explaining what failed)
- Every `Watching` or `Shaping` idea must have a `## Constraint Flip Conditions` section (the conditions under which failing constraints would pass, and you'd reconsider)

**Failure condition:** a Killed idea without a post-mortem, or a Watching/Shaping idea without flip conditions.

### Check 5: Market Opportunity override

If an idea's Market Opportunity composite is 4.0 or higher, it cannot be `Killed`. High-market ideas belong in `Watching` (with a post-mortem explaining the constraint failure and flip conditions explaining how to fix it), not in the bin.

This is a deliberate protection: a bad fit + good market is a watching brief, not a kill.

**Failure condition:** a solo idea with Market ≥ 4.0 that is `Killed` (should be `Watching`). On the venture track, the same rule applies, but also requires Ethics / Legal to PASS.

### Check 6: Folder naming conventions

Idea folders must be lowercase-hyphenated: `my-idea`, not `MyIdea` or `my_idea`.

**Failure condition:** a folder named in any other case format.

### Check 7: Log track tagging

On the venture track, ideas are tracked via a `Track: venture` tag in decision and signal logs. The checker verifies that the tags are present and consistent.

**Failure condition:** a venture row in `decisions.md` or `signals.md` that is missing its `Track: venture` tag, or an inconsistent tag.

### Check 8: Per-README section presence (grandfathered)

Solo ideas created on or after a configurable "grandfather epoch" (default: 2026-01-01) must include both a `Runway & Sequencing` section and an `Income-Bridge Viability` section in the README. Ideas created before the epoch are exempt.

This allows older ideas to skip these sections if they were captured under an earlier template. You can adjust the grandfather date in `scripts/check_integrity.py` if your repo predates the four-lens framework.

**Failure condition:** a modern idea (created after the epoch) missing one of the required sections.

## Fixing failures

When a check fails, the output tells you exactly which items or rules failed. Fix them by:

1. Reading the failure message carefully. It names the specific idea, folder, or row.
2. Opening the relevant file and correcting the issue.
3. Re-running the checker to confirm the fix.

**Common fixes:**

| Failure | Fix |
|---|---|
| Folder naming (e.g., `MyIdea`) | Rename the folder: `mv ideas/MyIdea ideas/my-idea` |
| Missing README | Create `ideas/<name>/README.md` from the template |
| Status not recognised | Edit the README's `**Status:**` field to a valid word |
| Overview row missing | Add a row to the table in `ideas/_overview.md` |
| Overview status mismatch | Ensure the overview row's Status matches the README's |
| Killed idea with Market ≥ 4.0 | Change status to `Watching` and add a Post-Mortem (or move to Parked) |
| Folder / row count mismatch | List folders with `ls ideas/` and rows in the overview; add or delete as needed |

## Using the checker in CI or pre-commit

You can wire the checker into a Git hook or CI pipeline to prevent commits that violate the schema.

### Pre-commit hook

Create `.git/hooks/pre-commit` (make it executable):

```bash
#!/bin/bash
python3 scripts/check_integrity.py
if [ $? -ne 0 ]; then
  echo "Integrity check failed. Commit blocked."
  exit 1
fi
```

Then:

```bash
chmod +x .git/hooks/pre-commit
```

Now any `git commit` will run the checker first. If it fails, the commit is rejected.

### GitHub Actions

In `.github/workflows/integrity.yml`:

```yaml
name: Integrity Check

on: [push, pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run integrity checker
        run: python3 scripts/check_integrity.py
```

This runs the checker on every push and PR. If it fails, the check blocks the PR from merging.

## Exit codes

- **Exit code 0:** All checks passed (warnings are allowed)
- **Exit code 1:** At least one check failed

## Customisation

You can edit two parameters in `scripts/check_integrity.py` at the top of the file:

- **`TODAY`** — the baseline for evidence freshness. Defaults to `datetime.date.today()`. Override only for deterministic testing.
- **`GRANDFATHER`** — the repo epoch date (default `2026-01-01`). Ideas created before this date are exempt from Check 8 (the Runway & Sequencing and Income-Bridge section requirement). Change this to match when your repo adopted the four-lens template.

## Tips

- **Run it after every major change.** Add it to your workflow: new idea → fill README → run checker → commit.
- **Read warnings, don't ignore them.** Stale evidence (> 30 days) or validating ideas past their 14-day decay window are signals that your portfolio needs attention, not just mechanical errors.
- **Use it as a linting tool.** Like code linting, structural integrity keeps the repo maintainable over time.

## Related

- [Understanding the repo structure](../reference/repo-structure.md)
- [Understanding status decay](../explanation/evidence-freshness.md)
