# Startup Analyser — Operating Spec

A living knowledge base for evaluating startup ideas. Every standalone solo idea is scored on four axes: 6 founder constraints (can I build this?), 5 market opportunity dimensions (is this worth building?), 3 runway and sequencing filters (can I start it now, does it use my edge, can it pay inside my runway?), and 3 income-bridge dimensions (what best extends runway alongside the primary bet?). The intersection of the first two produces a 2x2 quadrant (BUILD / OPPORTUNITY GAP / KILL / PASS). Runway and Sequencing orders viable ideas into a swing from one vine to the next: SWING (start now) / STRETCH (plan around gaps) / WAIT (not yet). Income-Bridge Viability produces a separate priority stack for runway-extending income. Every kill produces a pattern. Every customer conversation is logged. The system gets smarter over time.

This file is the operating spec for an AI coding agent working in this repo. The commands below ALWAYS take precedence over generic agent skills: match a request against these commands first, and only fall through to a generic skill when no command applies.

**Two tracks.** The above is the **solo track** (`ideas/`): bootstrapped, founder-funded ideas. A parallel **venture track** (`ventures/`) evaluates VC-backed, co-founder, full-time ideas under inverted assumptions: capital is *required*, the leap is *full-time*, the target is a *fund-returning exit*, and the specific partnership is scored. The venture track has its own four lenses (7 Venture Constraints, 5 Market dimensions with venture-scale anchors, 6 Partnership Fit dimensions, 4 Venture Feasibility filters) combining into one master verdict (PURSUE / SHAPE / WATCH / PASS / NO-GO). The two tracks share the four logs (each row tagged `solo` or `venture`) but score on separate frameworks. See `ventures/README.md`.

## Allocation rule

Run at most **one primary bet** plus **at most one active income-bridge slot** at any time. The income-bridge slot is named explicitly in `decisions.md` and revisited each quarterly review. Anything else stays Backlog. The Income-Bridge Trap warns that comfortable bridge income must not cannibalise focus from the primary bet: if you removed the bridge income tomorrow, would you still build the primary bet? Yes means it is additive; no means it has become a crutch.

**Framework discipline.** Resist adding new scoring frameworks, overlays, or full-portfolio re-scores. Set a threshold for yourself (for example, accumulate N new `evidence.md` entries before you are allowed to add a lens) and record it here. When you are tempted to add a lens, run the cheapest falsifiable test of an existing idea instead.

## Lifecycle states

`Backlog -> Validating -> Active -> Built` (solo); `Parked`, `Watching`, `Killed` are off-ramps. **Built** = a working implementation exists (MVP or further) but it is not yet validated by a real user or paid signal; the next step is to dogfood it or land one user to reach `Validating`. The venture track adds `Shaping` (verdict SHAPE, no validation evidence yet).

**Status decay:** a `Validating` idea with no evidence in `evidence.md` mentioning it within **14 days** auto-demotes to `Backlog` (or fires its written kill-trigger, if one is recorded). **WIP cap:** at most **1-2 ideas** may hold `Validating` at once.

## File structure

- `ideas/` — one folder per idea, lowercase-hyphenated names; `ideas/_overview.md` is the master comparison table (source of truth for statuses and scorecards).
- `ventures/` — parallel VC-backed venture track: its own reference frameworks (`ventures/reference/`), ideas (`ventures/ideas/`), `ventures/_overview.md`, and `ventures/README.md` (the charter). Shares the four logs via a `Track` tag.
- `decisions.md` — append-only decision journal (every status change has an entry).
- `evidence.md` — centralised evidence log (customer and co-founder conversations, observations).
- `patterns.md` — recurring lessons from killed and parked ideas.
- `signals.md` — market signals and external observations.
- `reference/` — `founder-constraints.md`, `market-opportunity-framework.md`, `runway-and-sequencing.md`, `income-bridge-viability.md`, `capability-profile.md`, `business-model-canvas.md`.
- `templates/` — `idea-template.md` (solo README), `quarterly-review.md`, `business-model-canvas.html` (the shared single-page canvas, both tracks). Venture templates live under `ventures/templates/` (`venture-idea.md`, `venture-readiness-review.md`).
- `scripts/check_integrity.py` — the mechanical integrity checker (run it; see Integrity Checks).
- per-idea `business-model-canvas.html` — the Strategyzer canvas (export to PDF or PNG via the browser).

## Idea types

- **Standalone idea** — full four-lens scoring (below).
- **Positioning variant** — references a parent idea, inherits its constraint scores, tracks its own validation.
- **Distribution strategy** — references the ideas it serves; scored on Feasibility and Energy only (Market Opportunity still applies).

## Commands

**Track routing:** a command containing the keyword **`venture`** operates on the `ventures/` subtree and its reference docs. A command without `venture` operates on the solo `ideas/` track. The two tracks never cross-contaminate scoring; they share only the four Track-tagged logs (`decisions.md`, `patterns.md`, `signals.md`, `evidence.md`). When an idea explicitly carries a `Track` field, route by that field.

### "new idea: [one-liner]"

1. Read the four solo frameworks: `reference/founder-constraints.md` (6 filters), `reference/market-opportunity-framework.md` (5 dimensions), `reference/runway-and-sequencing.md` (3 filters), `reference/income-bridge-viability.md` (3 dimensions).
2. Read `patterns.md` (anti-patterns) and `ideas/_overview.md` (existing ideas). Run a similarity check on 4 dimensions (market, business model, problem, capability); a match on 2 or more flags it prominently in the README.
3. Create `ideas/{name}/README.md` from `templates/idea-template.md`. Determine the idea type (standalone, positioning variant, or distribution strategy; see above).
4. Score all four lenses:
   - 6 **Founder Constraints** (PASS / Mixed / FAIL each); footer `Result: X/6 PASS`. Five or more PASS sets Founder Fit to High.
   - 5 **Market Opportunity** dimensions (1 to 5), simple-average composite, and the **Quadrant** (BUILD / OPPORTUNITY GAP / KILL / PASS).
   - 3 **Runway & Sequencing** filters (Startable Now / Capability Leverage / Runway Fit; PASS / Mixed / FAIL) producing **SWING / STRETCH / WAIT**, plus the Sequence Position (Current Vine / Next Vine / Career Capital Builder / Not Sequenceable).
   - 3 **Income-Bridge** dimensions (Time to Revenue 30% / Income Ceiling 40% / Revenue Predictability 30%; 1 to 5, weighted composite) producing **Excellent / Viable / Marginal / Not Viable**.
5. **Gates at creation:**
   - If Quadrant = OPPORTUNITY GAP, document Constraint Flip Conditions. If Market Opportunity composite is >= 4.0, status is **Watching** (not Killed or Parked).
   - If Quadrant = KILL **and Market Opportunity < 4.0**, run the kill ceremony at creation, unless a `Backlog-despite-KILL because <wedge/intent>` note is explicitly recorded in the README and `decisions.md`.
   - **Market Opportunity override:** any idea with a Market composite >= 4.0 is held **Watching** instead of Killed.
6. Append an entry to `decisions.md`; add a row plus scorecard columns to `ideas/_overview.md`.
7. Author `ideas/{name}/business-model-canvas.html` from `templates/business-model-canvas.html`, auto-deriving the 9 blocks per `reference/business-model-canvas.md`. Flag the MANUAL-FILL blocks (Key Partners, Cost Structure).

### "business model canvas: [idea]" / "venture business model canvas: [idea]"

Build or rebuild a single-page Business Model Canvas for an existing idea.

1. Read `reference/business-model-canvas.md` (the 9 blocks, the README-to-block mapping, the authoring rules) and the idea's `README.md`.
2. Copy `templates/business-model-canvas.html` into the idea folder; fill the header tokens; auto-derive the 9 cells from the mapped README sections.
3. Report the auto-derived blocks versus the MANUAL-FILL blocks (Key Partners and Cost Structure). Remind the user to export via the browser print dialog (A3 landscape PDF) or a PNG screenshot at body width.

### "kill [idea]" / "park [idea]" / "kill venture [idea]" / "park venture [idea]"

Kill or Park ceremony, producing 4 outputs on the matching subtree:

1. **Idea README** — append a `## Post-Mortem` section: which constraints or lenses failed (on the venture track, name which of the four lenses, and record any partnership-driven outcome explicitly), what was learned, related ideas, and the pattern matched.
2. **decisions.md** — append a dated entry (date, idea, old status to new status, reasoning; venture rows carry `Track: venture`).
3. **patterns.md** — match an existing pattern or create one; venture instances are tagged `(venture)`.
4. **_overview.md** — update the status.

**Market Opportunity override:** a Market composite >= 4.0 means status becomes **Watching** instead of Killed (document Constraint Flip Conditions; review them quarterly). On the venture track this requires Market >= 4.0 **and** an Ethics PASS; an Ethics or Legal FAIL is always a hard NO-GO (a veto cannot be flipped) and is recorded in the Ethics register.

### "what should I work on?"

Read the full repo (run `python3 scripts/check_integrity.py` for the mechanical pass first) and recommend using this priority stack:

1. **Evidence freshness:** any `Validating` idea past its 14-day decay window (auto-demote it or fire its kill-trigger); fewest conversations held this fortnight.
2. The highest-scored idea with the lowest evidence.
3. Parked ideas affected by recent signals.
4. **Watching brief:** any Watching idea whose Constraint Flip Conditions have been met or are close. Check `signals.md`.
5. **Pattern gaps:** three or more kills without a pattern entry.
6. **Opportunity scan:** any market signals that affect Watching ideas.

### "what should I work on for income?" (Income-Bridge stack)

Read the full repo and recommend using the income-bridge priority stack:

1. Rank all ideas by **Income-Bridge composite** (weighted; Time to Revenue 30% / Income Ceiling 40% / Predictability 30%), filtered to Viable or above. (This lens scores all ideas, including killed ones: an idea can be a poor venture and a good bridge.)
2. Flag any idea where a single dimension scores 1.
3. Respect the allocation rule: this recommendation fills the **single** active income-bridge slot (named in `decisions.md`) alongside the primary bet; it occupies the Career Capital Builder slot in the Runway and Sequencing sequence.
4. Check Income-Bridge Trap risk: is a current bridge consuming time that should go to the primary bet?

### "new venture idea: [one-liner]"

Venture track. Mirrors `new idea` against the venture reference docs and four scoring blocks. Validate any load-bearing co-founder claim (investor readiness, reputation) from primary sources before recording final Partnership scores; until validated, mark those scores provisional.

1. Read `ventures/reference/`: `venture-constraints.md` (7), `market-opportunity-framework.md` (5), `partnership-fit.md` (6), `venture-feasibility.md` (4 filters and the master-verdict cascade). Read `ventures/README.md` for the cascade detail.
2. Read `patterns.md` and `ventures/_overview.md`. Run a similarity check against existing venture ideas and any migrated solo ideas (a match on 2 or more flags it).
3. Create `ventures/ideas/{name}/README.md` from `ventures/templates/venture-idea.md`.
4. Score all four lenses: 7 **Venture Constraints** (PASS / Mixed / FAIL); 5 **Market** dimensions (1 to 5, composite, band); **Partnership Fit** (6 dimensions, weighted composite, gate Strong / Workable / Fragile / Misaligned); **Venture Feasibility** (4 filters including the binary Ethics / Legal veto, composite CLEARED / CONDITIONAL / BLOCKED).
5. Derive the **Master Verdict** via the six-step cascade (PURSUE / SHAPE / WATCH / PASS / NO-GO). Set the status: Backlog by default; **Shaping** if SHAPE; **Watching** if Market >= 4.0 and Ethics PASS but a non-ethics lens fails.
6. Append a `Track: venture` row to `decisions.md`; add a row to `ventures/_overview.md`; if a pattern matched, note it in the README and tag the instance `(venture)` in `patterns.md`.
7. Author `ventures/ideas/{name}/business-model-canvas.html` (see the BMC command above).

### "what venture should I pursue?"

Read the full `ventures/` subtree plus the Track-tagged logs and recommend using this stack:

1. **Ethics gate first.** Drop any idea failing the Ethics / Legal veto (report it, do not rank it).
2. **Partnership readiness.** Favour ideas where Partnership Fit is highest and the role, equity, and thesis with the co-founder are resolved.
3. **Fundability now.** The most fundable given the co-founder's investor network and the market's Timing.
4. **Go-to-market fit.** Prefer a credible path to first revenue inside the raise runway.
5. **Founder right-to-win.** Weight ideas where the founding team has a real, hard-won edge (scored in Partnership Fit, Combined Founder-Market Fit).
6. **Watching brief.** Any venture Watching idea whose Flip Conditions are met or close. Check `signals.md` (venture rows).
7. **Integrity and staleness.** Output: the single best "pursue now", the gating reason for anything below it, and the one open question for the co-founder.

### "log evidence: [description]" / "log signal: [description]" / "log co-founder conversation: [description]"

- **log evidence:** append to `evidence.md`, tag the relevant ideas. Use role plus location as the source, never a person's name in a shared artifact (see Anonymity).
- **log signal:** append to `signals.md`, tag the relevant ideas (venture rows carry `Track: venture`).
- **log co-founder conversation:** append to `evidence.md` with `**Track:** venture` and a co-founder tag (role or handle): date, topic, what was proposed or agreed, and open terms (role, equity, control, thesis). If it moves a status or a Partnership Fit score, also append a `Track: venture` row to `decisions.md`.

### "quarterly review" / "venture readiness review"

- **quarterly review:** use `templates/quarterly-review.md`. Run the first review after three or more months or five or more new ideas. Re-confirm the single primary bet and the single income-bridge slot.
- **venture readiness review:** re-score the lead venture candidate across the four lenses, confirm the raise status and co-founder terms, and check the Ethics register. Run the first review after the first co-founder term discussion or three or more logged co-founder conversations.

## Integrity checks

Run `python3 scripts/check_integrity.py` (stdlib-only; exits non-zero on any FAIL). It is the mechanical replacement for a manual pass. Checks, with **evidence freshness first**:

- **Evidence freshness (FIRST):** days since the last `evidence.md` entry; a WARN per `Validating` idea with no evidence inside 14 days; conversations held this fortnight surfaced before any paperwork check.
- Every idea folder has a `README.md` with a Status in the valid lifecycle set (solo: Backlog, Validating, Active, Built, Parked, Watching, Killed; venture adds Shaping). Folder names are lowercase-hyphenated.
- `_overview.md` row count matches the folder count (both tracks); each idea's overview Status matches its README Status.
- Standalone solo ideas have all 6 constraints, all 5 market dimensions, a Quadrant, and a Runway and Sequencing verdict. **Grandfather:** the per-README Runway and Sequencing plus Income-Bridge section-presence checks apply only to ideas Created on or after the configurable grandfather epoch; ideas created before it are exempt (their scores live in `_overview.md`). The epoch is set in `scripts/check_integrity.py` (`GRANDFATHER`); change it to suit your repo's history.
- Every Watching idea has Constraint Flip Conditions; every Killed idea has a Post-Mortem; every status change has a `decisions.md` entry.
- No idea with a Market Opportunity composite >= 4.0 is Killed (it should be Watching).

**Venture track (`ventures/`):** all four lenses scored (7 Venture Constraints, 5 Market, 6 Partnership, 4 Venture Feasibility) with the Ethics / Legal gate present; every idea has a Master Verdict; Watching and Shaping ideas have Constraint Flip Conditions; no idea with venture Market >= 4.0 **and** Ethics PASS is Killed; `ventures/_overview.md` row count matches the folder count and the Ethics register lists every Ethics FAIL; every Killed idea has a Post-Mortem; every venture row in `decisions.md` and `signals.md` carries `Track: venture`.

## Crown Jewel

If one Watching idea has a Market Opportunity composite at least 1.0 point above the next-highest Watching idea, flag it as the **Crown Jewel**: give it prominent visibility, monitor its signals actively, and prioritise it in the Watching review.

## Anonymity and shared artifacts

Keep personally identifiable information out of any exported artifact. The showcase app and any exported document or PDF must never carry a real person's name, real company names, or private reasoning. The showcase leak gate is the source of truth for forbidden tokens; treat a hard-fail there as a release blocker, not a warning.
