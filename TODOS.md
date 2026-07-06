# TODOS

Deferred work for the repo and the tooling around it, captured during reviews. This is a template: delete the example items and add your own as you go.

Format: each item is `### T-AREA-N — <title>` with five bold-label bullets. **What** describes the change, **Why** is the reason it earns a slot, **Effort** is a rough size (S / M / L), **Priority** is P1 to P3, and **Context** points at the files or decisions involved so the item can be picked up cold.

## Framework

### T-FW-1 — Make the constraint set forkable per founder
- **What:** Document a clear path for a user to replace the six default founder constraints in `reference/founder-constraints.md` with their own, without breaking the scoring tables or the integrity checker.
- **Why:** The constraints encode one founder's situation. The tool is only reusable if another founder can swap in their own constraints and keep the rest of the machinery working.
- **Effort:** M. **Priority:** P2.
- **Context:** Constraints flow into every idea README's Lens 1 table and the `Fit` column of `ideas/_overview.md`. Changing the count (currently X/6) would ripple through the templates and the checker's row expectations.

### T-FW-2 — Worked example for the venture cascade
- **What:** Add a short, fully worked numeric example to `ventures/README.md` showing the six-step verdict cascade resolving one idea end to end.
- **Why:** The cascade is the least obvious part of the venture track. A single worked example removes most of the ambiguity about how Status, the four lenses, and the Master Verdict relate.
- **Effort:** S. **Priority:** P2.
- **Context:** The LedgerGrid example README already derives a SHAPE verdict; lift the derivation into the charter as the canonical reference, or write a second, simpler one.

## Tooling

### T-TOOL-1 — Pre-commit hook for the integrity check
- **What:** Provide an optional git pre-commit hook that runs `scripts/check_integrity.py` and blocks the commit on a FAIL (WARN still passes).
- **Why:** The checker only helps if it runs. A hook catches a status mismatch or a missing required section before it lands rather than after.
- **Effort:** S. **Priority:** P3.
- **Context:** The checker exits non-zero on FAIL and zero on PASS/WARN, so it drops into a hook cleanly. Keep it opt-in via a documented `git config` or a setup script; do not assume the hook for forkers.

### T-TOOL-2 — Surface the integrity check in CI
- **What:** Add a minimal CI workflow that runs the integrity checker and the showcase leak gate on every push.
- **Why:** A green check on every push is the cheapest guarantee that the repo stays internally consistent and that no personal or out-of-scope token has leaked into the showcase content.
- **Effort:** S. **Priority:** P3.
- **Context:** The checker is stdlib-only Python; the leak gate lives in `showcase/scripts/verify-no-leak.mjs`. Both are fast enough to run on every push.

## Showcase

### T-SHOW-1 — Configurable hero / featured treatment
- **What:** Let the showcase config flag one idea as a hero, rendered above the grid, with the rest framed as directions explored.
- **Why:** A long flat grid of ideas can read as unfocused. A single hero signals conviction and depth while keeping the explored ideas visible for context.
- **Effort:** S. **Priority:** P2.
- **Context:** The featured and explored slug lists already live in `showcase/content.config.mjs`. Add an optional hero slug there and have the idea grid render it in a hero variant.

### T-SHOW-2 — Interest-capture call to action
- **What:** Add an optional contact or interest call to action to the showcase, starting with a simple mailto and leaving room for a logged form behind the existing auth.
- **Why:** Without a call to action the showcase is a read-only dead end. A light interest capture turns a viewer at peak interest into a conversation.
- **Effort:** S to M. **Priority:** P3.
- **Context:** Auth and serverless routes already exist in the showcase app, so a logged form is cheap if you outgrow the mailto. Keep all contact details in config, never hardcoded.

## README / positioning

### T-DOC-1 — Showcase screenshot for the README
- **What:** Capture a light-mode screenshot of the showcase dashboard (`cd showcase && npm run dev`, log in with the values in `.env.local`, screenshot the idea grid) and embed it in the root README as visual proof the app works.
- **Why:** Verified live during the 2026-07-06 CEO review that it renders cleanly with the shipped fictional worked examples (OrderFlow, PermitPilot). A screenshot is higher-signal proof of engineering quality than prose alone, per the outside-voice review. Caption it clearly as the template's sample data, not a live personal instance.
- **Effort:** S (~2 min manual capture; no tooling in this repo can save the image programmatically).
- **Priority:** P2.
- **Context:** `showcase/content.config.mjs` FOUNDER is still the placeholder (`Your Name` / `you@example.com`) — leave it as-is for the screenshot since it correctly demonstrates the template's out-of-box state to forkers.

### T-DOC-2 — Applied-AI positioning section in README
- **What:** Add a short "Why this exists" section near the top of the README (after the opening paragraph, before "Two tracks") naming the engineering decisions as evidence of applied-AI systems thinking: the agent operating spec (`CLAUDE.md`/`AGENTS.md`), the stdlib-only integrity checker, the two-stage showcase leak gate, and the evidence-logging discipline.
- **Why:** Outside-voice review (Codex, 2026-07-06) flagged that a bottom-of-page "About the author" byline doesn't reposition the repo — the framing needs to happen before a reader gets deep into scoring mechanics, not after. This is a content/voice decision, not mechanical polish, so it's deferred rather than drafted unreviewed.
- **Effort:** S (CC ~10 min to draft, but needs your voice/judgment on the final framing).
- **Priority:** P2.
- **Context:** Keep it to 3-4 sentences — the existing README structure and worked examples are already strong; this is a reframe, not a rewrite. Manual social-preview image (GitHub Settings → social preview, no public API for it) is a good companion action once this section exists, since the image needs to represent the same positioning.
