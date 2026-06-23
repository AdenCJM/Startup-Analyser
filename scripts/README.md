# scripts

Tooling for the Startup Analyser knowledge base. Everything here is stdlib-only Python 3, so there is nothing to install.

## check_integrity.py

A mechanical integrity checker for the idea knowledge base. It walks both tracks (solo ideas under `ideas/`, venture ideas under `ventures/ideas/`), reads the master overview tables and the shared logs, and exits non-zero if anything has drifted out of sync. It is a guardrail against the kind of quiet rot a manually maintained knowledge base accumulates: an overview row that no longer matches its README, a Killed idea missing its post-mortem, an idea folder named in the wrong case.

### Running it

From anywhere in the repo:

```
python3 scripts/check_integrity.py
```

It prints a section per check, then a summary line. Exit code 0 means the repo is consistent (warnings are allowed). Exit code 1 means at least one check failed; the failing lines are prefixed `FAIL`.

You can wire it into a pre-commit hook or CI step. It needs no arguments and no network.

### What it checks

The checks run in this order. Check 0 prints first because evidence freshness is the signal you most want to see at a glance.

- **0. Evidence freshness.** Reads the most recent dated row in `evidence.md` and reports how old it is, measured against today. If the newest entry is more than 30 days old, it emits a `WARN` (not a `FAIL`), so a quiet repo still passes. It also flags any idea in `Validating` that has no evidence entry mentioning it within the last 14 days, as an overdue-validation `WARN`. If `evidence.md` has no dated rows at all, that is a `FAIL`, because the log is meant to be append-only and never empty.
- **1. Folders, READMEs, status validity.** Every idea folder must contain a `README.md` with a `**Status:**` field, and that status must be a recognised lifecycle word.
- **2. Overview row counts.** The number of rows in each master overview table must equal the number of idea folders in that track. A mismatch lists the folders with no row and the rows with no folder.
- **3. Overview status matches README status.** For each idea, the status word in the overview table must equal the status in the idea's README.
- **4. Post-mortem and flip conditions.** Every `Killed` idea must carry a `Post-Mortem` section. Every `Watching` or `Shaping` idea must carry a `Constraint Flip Conditions` section (the conditions under which a failing constraint would flip to pass).
- **5. Market-opportunity override.** No solo idea with a Market Opportunity composite of 4.0 or higher may be `Killed`. A high-market idea that fails the founder fit belongs in `Watching` (an opportunity gap), not the bin.
- **6. Folder naming.** Idea folder names must be lowercase-hyphenated (`my-idea`, not `My_Idea`).
- **7. Log track tagging.** In `decisions.md` and `signals.md`, any row that declares itself a venture row inline (`Track: venture`) must also carry a trailing `venture` value in its Track column. Untagged rows default to `solo` by convention and are left alone, so the checker does not guess a track from a name collision.
- **8. Per-README section presence (grandfathered).** Solo ideas created on or after the repo epoch (see `GRANDFATHER` below) must include both a `Runway & Sequencing` section and an `Income-Bridge Viability` section. Ideas created before the epoch are exempt, so an older idea captured under an earlier template is not retroactively failed.

The venture track is validated through the same generic checks (folder and README presence, status validity, overview-vs-README status match, post-mortem on Killed, flip conditions on Watching and Shaping). The checker never parses lens-specific columns, so you can rename or restructure the venture scorecard columns without touching this script.

### The two settings you can edit

Both live at the top of the file as named constants.

- **`TODAY`** is the freshness baseline. It defaults to `datetime.date.today()`, the real current date, so there is no frozen date for the repo to rot against. The 30-day staleness `WARN` and the 14-day validation `WARN` both measure from here. Override it only if you want deterministic output in a test harness.
- **`GRANDFATHER`** is the repo epoch, a fixed date (default `2026-01-01`). Check 8 applies only to ideas created on or after it. Keep it a fixed date, not `today()`: a moving grandfather would silently exempt every idea, and the section check would never run. Set it to the date your own knowledge base adopted the four-lens template. Anything captured before that date is exempt from the section requirement, since the earlier template did not have those sections.

### Expected warnings on an example or seed repo

The repo ships with fictional example ideas and seeded logs so the structure is self-documenting from day one. The seeded `evidence.md` rows carry fixed dates, so once those dates are more than 30 days behind the current date, check 0 will report a stale-evidence `WARN`. That is expected and by design on a static example repo: a `WARN` does not fail the run, and the checker still exits 0. When you start logging your own evidence, the warning clears on its own. The example ideas are all dated after the grandfather epoch, so check 8 actively runs on them rather than being skipped, which keeps the check itself exercised.
