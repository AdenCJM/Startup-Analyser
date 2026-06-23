#!/usr/bin/env python3
"""Mechanical integrity checker for the Startup Analyser knowledge base.

Validates the intended final state of the repo (both tracks) and exits
non-zero on any violation. Stdlib only, no third-party packages. Run from
anywhere:

    python3 scripts/check_integrity.py

The checker covers two tracks:
  - solo ideas under `ideas/`
  - venture ideas under `ventures/ideas/`

Checks (in order):
  0. Evidence freshness (printed first, prominent). A stale evidence log is a
     WARN, not a FAIL, so a quiet/example repo still passes.
  1. Folder / README / Status validity (solo + venture)
  2. Overview row counts match folder counts (per track)
  3. Overview status matches README status
  4. Post-Mortem on Killed; Constraint Flip Conditions on Watching/Shaping
  5. No solo idea with Market Opportunity >= 4.0 is Killed
  6. Folder names lowercase-hyphenated
  7. Rows in decisions.md / signals.md that declare a venture track inline
     also carry a trailing Track value
  8. Per-README Runway & Sequencing + Income-Bridge Viability sections present
     (only for solo ideas created on/after the GRANDFATHER epoch)

Parsing is deliberately lenient (regex over the markdown tables); the goal is
to catch real drift, not to be a strict markdown parser.

Two settings are yours to edit (see the constants just below):
  - TODAY    : the freshness baseline. Defaults to the real current date, so
               the repo never silently "rots" against a frozen date.
  - GRANDFATHER : the repo epoch. Section-presence checks (check 8) apply only
               to ideas created on/after this date, so older ideas captured
               under an earlier template are not retroactively failed.
"""

from __future__ import annotations

import datetime
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

# Freshness baseline. Uses the real current date so the checker stays
# self-maintaining: there is no frozen date to go stale. Override only if you
# want deterministic output in a test harness.
TODAY = datetime.date.today()

# Repo epoch. Section-presence checks (check 8) apply only to ideas created
# on/after this date. Keep it a FIXED date (not today()): a moving grandfather
# would silently exempt every idea and the check would never run. The shipped
# example ideas are all created after this epoch, so check 8 actively runs on
# them. Edit this to the date your own knowledge base adopted the four-lens
# template; ideas captured before it are exempt from the section requirement.
GRANDFATHER = datetime.date(2026, 1, 1)

# Valid lifecycle states. "Built" means a working implementation exists but is
# not yet validated by a real user or paid signal. "Shaping" is a venture-only
# state (a real opportunity with a named blocker to resolve).
SOLO_STATES = {
    "Backlog", "Validating", "Active", "Parked", "Watching", "Killed", "Built",
}
VENTURE_STATES = SOLO_STATES | {"Shaping"}

FOLDER_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
STATUS_RE = re.compile(r"\*\*Status:\*\*\s*([A-Za-z][A-Za-z-]*)")
CREATED_RE = re.compile(r"\*\*Created:\*\*\s*(\d{4}-\d{2}-\d{2})")
DATE_ROW_RE = re.compile(r"^\|\s*(\d{4}-\d{2}-\d{2})\s*\|")

passes = 0
warns = 0
fails = 0


def ok(msg: str) -> None:
    global passes
    passes += 1
    print(f"  PASS  {msg}")


def warn(msg: str) -> None:
    global warns
    warns += 1
    print(f"  WARN  {msg}")


def fail(msg: str) -> None:
    global fails
    fails += 1
    print(f"  FAIL  {msg}")


def header(title: str) -> None:
    print(f"\n=== {title} ===")


def read(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except OSError:
        return ""


def first_status(text: str) -> str | None:
    m = STATUS_RE.search(text)
    return m.group(1) if m else None


def created_date(text: str) -> datetime.date | None:
    m = CREATED_RE.search(text)
    if not m:
        return None
    try:
        return datetime.date.fromisoformat(m.group(1))
    except ValueError:
        return None


def idea_folders(base: Path) -> list[Path]:
    if not base.is_dir():
        return []
    return sorted(p for p in base.iterdir() if p.is_dir())


def overview_rows(text: str) -> dict[str, str]:
    """Map slug -> Status word from an _overview.md ideas table.

    Rows look like: | [Name](slug/) | Type | one-liner | **Status** | ... |
    Returns lowercased slug -> first status word (parentheticals stripped).
    """
    rows: dict[str, str] = {}
    link_re = re.compile(r"\[[^\]]+\]\(([^)]+?)/?\)")
    # First alphabetic token of a cell, ignoring leading ** bold / whitespace.
    # The solo overview bolds the status (**Validating**); the venture overview
    # leaves it plain (Shaping) -- accept both.
    word_re = re.compile(r"^\**\s*([A-Za-z][A-Za-z-]*)")
    for line in text.splitlines():
        if not line.lstrip().startswith("|"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 4:
            continue
        m = link_re.search(cells[0])
        if not m:
            continue
        slug = m.group(1).strip("/").split("/")[-1].lower()
        # Status is the first cell whose leading word is a lifecycle state.
        # (Verdict cells like **PURSUE** are not lifecycle states, so skipped.)
        status = None
        for c in cells[1:]:
            wm = word_re.match(c)
            if wm and wm.group(1) in VENTURE_STATES:
                status = wm.group(1)
                break
        if status:
            rows[slug] = status
    return rows


# ---------------------------------------------------------------------------
# CHECK 0 - Evidence freshness (FIRST, prominent)
# ---------------------------------------------------------------------------
header("EVIDENCE FRESHNESS")
evidence = read(REPO / "evidence.md")
ev_dates = sorted(
    datetime.date.fromisoformat(m)
    for m in re.findall(r"^\|\s*(\d{4}-\d{2}-\d{2})\s*\|", evidence, re.MULTILINE)
)
if ev_dates:
    last = ev_dates[-1]
    age = (TODAY - last).days
    line = f"Last evidence.md entry: {last.isoformat()} ({age} days ago, as of {TODAY.isoformat()})"
    if age > 30:
        warn(line + " -- evidence log is going stale")
    else:
        ok(line)
else:
    fail("No dated entries found in evidence.md")
    last = None

# Validating ideas with no evidence entry within 14 days.
evidence_lower = evidence.lower()
for base, _ in ((REPO / "ideas", "solo"), (REPO / "ventures/ideas", "venture")):
    for folder in idea_folders(base):
        readme = folder / "README.md"
        if not readme.is_file():
            continue
        status = first_status(read(readme))
        if status != "Validating":
            continue
        slug = folder.name
        # crude per-idea freshness: look for the slug or a spaced variant in
        # evidence entries dated within the last 14 days.
        name_variants = {slug, slug.replace("-", " "), slug.replace("-", "")}
        recent_hit = False
        for line in evidence.splitlines():
            dm = DATE_ROW_RE.match(line)
            if not dm:
                continue
            d = datetime.date.fromisoformat(dm.group(1))
            if (TODAY - d).days <= 14 and any(v in line.lower() for v in name_variants):
                recent_hit = True
                break
        if not recent_hit:
            warn(
                f"Validating idea '{slug}' has no evidence.md entry within 14 days "
                "(overdue validation)"
            )
        else:
            ok(f"Validating idea '{slug}' has recent evidence")


# ---------------------------------------------------------------------------
# CHECK 1 + 6 - Folders, READMEs, Status validity, folder naming
# ---------------------------------------------------------------------------
header("FOLDERS / README / STATUS")
solo_status: dict[str, str] = {}
venture_status: dict[str, str] = {}

for base, valid, store, track in (
    (REPO / "ideas", SOLO_STATES, solo_status, "solo"),
    (REPO / "ventures/ideas", VENTURE_STATES, venture_status, "venture"),
):
    for folder in idea_folders(base):
        slug = folder.name
        if not FOLDER_RE.match(slug):
            fail(f"[{track}] folder name not lowercase-hyphenated: {slug}")
        readme = folder / "README.md"
        if not readme.is_file():
            fail(f"[{track}] {slug} has no README.md")
            continue
        text = read(readme)
        status = first_status(text)
        if status is None:
            fail(f"[{track}] {slug} README has no **Status:** field")
        elif status not in valid:
            fail(f"[{track}] {slug} has invalid Status '{status}'")
        else:
            store[slug] = status
            ok(f"[{track}] {slug}: Status {status}")


# ---------------------------------------------------------------------------
# CHECK 2 - Overview row counts match folder counts
# ---------------------------------------------------------------------------
header("OVERVIEW ROW COUNT vs FOLDER COUNT")
solo_ov = overview_rows(read(REPO / "ideas/_overview.md"))
venture_ov = overview_rows(read(REPO / "ventures/_overview.md"))

solo_folders = {f.name for f in idea_folders(REPO / "ideas")}
venture_folders = {f.name for f in idea_folders(REPO / "ventures/ideas")}

for label, ov, folders in (
    ("ideas/_overview.md", solo_ov, solo_folders),
    ("ventures/_overview.md", venture_ov, venture_folders),
):
    if len(ov) == len(folders):
        ok(f"{label}: {len(ov)} rows == {len(folders)} folders")
    else:
        fail(f"{label}: {len(ov)} overview rows != {len(folders)} folders")
        missing = folders - set(ov)
        extra = set(ov) - folders
        if missing:
            fail(f"  folders with no overview row: {', '.join(sorted(missing))}")
        if extra:
            fail(f"  overview rows with no folder: {', '.join(sorted(extra))}")


# ---------------------------------------------------------------------------
# CHECK 3 - Overview status matches README status
# ---------------------------------------------------------------------------
header("OVERVIEW STATUS vs README STATUS")
for store, ov, track in (
    (solo_status, solo_ov, "solo"),
    (venture_status, venture_ov, "venture"),
):
    for slug, rstatus in sorted(store.items()):
        ostatus = ov.get(slug)
        if ostatus is None:
            warn(f"[{track}] {slug}: README says {rstatus} but no overview row found")
        elif ostatus != rstatus:
            fail(f"[{track}] {slug}: overview says {ostatus}, README says {rstatus}")
        else:
            ok(f"[{track}] {slug}: {rstatus} (match)")


# ---------------------------------------------------------------------------
# CHECK 4 - Post-Mortem on Killed; Flip Conditions on Watching/Shaping
# ---------------------------------------------------------------------------
header("POST-MORTEM / CONSTRAINT FLIP CONDITIONS")
for base, store, track in (
    (REPO / "ideas", solo_status, "solo"),
    (REPO / "ventures/ideas", venture_status, "venture"),
):
    for slug, status in sorted(store.items()):
        text = read(base / slug / "README.md")
        low = text.lower()
        if status == "Killed":
            if "post-mortem" in low:
                ok(f"[{track}] {slug}: Killed has Post-Mortem")
            else:
                fail(f"[{track}] {slug}: Killed but no Post-Mortem section")
        if status in ("Watching", "Shaping"):
            if "constraint flip condition" in low:
                ok(f"[{track}] {slug}: {status} has Constraint Flip Conditions")
            else:
                fail(f"[{track}] {slug}: {status} but no Constraint Flip Conditions")


# ---------------------------------------------------------------------------
# CHECK 5 - No solo idea with Market Opportunity >= 4.0 is Killed
# ---------------------------------------------------------------------------
header("MARKET OPPORTUNITY >= 4.0 NOT KILLED (solo)")
mkt_re = re.compile(r"Composite[:\s\*]*?(\d\.\d)", re.IGNORECASE)
for slug, status in sorted(solo_status.items()):
    if status != "Killed":
        continue
    text = read(REPO / "ideas" / slug / "README.md")
    m = mkt_re.search(text)
    if m and float(m.group(1)) >= 4.0:
        fail(
            f"[solo] {slug}: Killed but Market Opportunity {m.group(1)} >= 4.0 "
            "(should be Watching)"
        )
    else:
        ok(f"[solo] {slug}: Killed, market opp < 4.0 (or unscored)")


# ---------------------------------------------------------------------------
# CHECK 7 - Rows in decisions.md / signals.md carry a Track value
# ---------------------------------------------------------------------------
header("LOG TRACK TAGGING (decisions.md / signals.md)")
# An untagged row defaults to solo by repo convention, so we do NOT guess the
# track from slug-name overlap (that yields false positives -- an idea may be
# named in a solo decision before it ever migrates to the venture track). We
# only flag a row that EXPLICITLY declares itself venture in its body
# ("Track: venture") yet lacks a trailing `venture` cell -- an internal
# contradiction that is unambiguously real drift.
for fname in ("decisions.md", "signals.md"):
    text = read(REPO / fname)
    untagged = []
    for line in text.splitlines():
        if not DATE_ROW_RE.match(line):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        last_cell = cells[-1].lower() if cells else ""
        if last_cell in ("solo", "venture"):
            continue  # explicitly tagged -- fine
        if "track: venture" in line.lower():
            untagged.append(DATE_ROW_RE.match(line).group(1))
    if untagged:
        for d in untagged:
            fail(f"{fname}: row dated {d} declares 'Track: venture' inline but has no Track column value")
    else:
        ok(f"{fname}: no venture rows missing a Track value")


# ---------------------------------------------------------------------------
# CHECK 8 - Runway & Income-Bridge sections present (grandfathered)
# ---------------------------------------------------------------------------
header(f"RUNWAY / INCOME-BRIDGE SECTIONS (ideas created >= {GRANDFATHER.isoformat()})")
runway_titles = ("runway & sequencing", "runway and sequencing", "transition readiness")
bridge_titles = ("income-bridge viability", "income bridge viability", "side-hustle viability")
for slug, status in sorted(solo_status.items()):
    text = read(REPO / "ideas" / slug / "README.md")
    created = created_date(text)
    if created is None or created < GRANDFATHER:
        continue  # created before the repo epoch: exempt from the section check
    low = text.lower()
    if not any(t in low for t in runway_titles):
        fail(f"[solo] {slug} (created {created}): missing Runway & Sequencing section")
    elif not any(t in low for t in bridge_titles):
        fail(f"[solo] {slug} (created {created}): missing Income-Bridge Viability section")
    else:
        ok(f"[solo] {slug} (created {created}): has Runway + Income-Bridge sections")
print("  (READMEs created before the grandfather epoch are exempt by design)")


# ---------------------------------------------------------------------------
# SUMMARY
# ---------------------------------------------------------------------------
header("SUMMARY")
print(f"  PASS: {passes}   WARN: {warns}   FAIL: {fails}")
if fails:
    print(f"\nINTEGRITY CHECK FAILED -- {fails} violation(s). See FAIL lines above.")
    sys.exit(1)
print("\nINTEGRITY CHECK PASSED" + (f" with {warns} warning(s)." if warns else "."))
sys.exit(0)
