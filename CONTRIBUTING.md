# Contributing

Thanks for your interest in improving Startup Analyser. This is a small, opinionated toolkit, so contributions that keep it simple and self-contained are the most welcome.

## How the repo is structured

- `reference/` — the solo four-lens framework definitions you score against (Founder Constraints, Market Opportunity, Runway & Sequencing, Income-Bridge Viability), plus the problem-spaces and business-model-canvas guides.
- `ventures/` — the parallel generic VC venture track: its charter, its four lenses under `ventures/reference/`, and its example idea.
- `templates/` — the blank scaffolds you copy to create a new idea, a new venture idea, a quarterly review, or a business model canvas.
- `ideas/` and `ventures/ideas/` — one folder per idea, lowercase-hyphenated, each with a `README.md` (and a `business-model-canvas.html` for solo ideas).
- `decisions.md`, `evidence.md`, `signals.md`, `patterns.md` — the four append-only logs, each row tagged `solo` or `venture`.
- `scripts/check_integrity.py` — the stdlib-only integrity checker.
- `showcase/` — the optional Next.js app that publishes a password-gated, curated subset of your ideas.

## Two kinds of contribution

**Using the framework for your own ideas** does not need a pull request. Fork the repo, edit the constraint defaults, add your ideas, and keep your fork private if you want. Nothing here phones home.

**Improving the framework or the tooling** is where pull requests help everyone. Good candidates: clearer scoring guidance, better integrity checks, showcase polish, documentation fixes, and new templates.

## Proposing changes to the scoring lenses

The scoring lenses are the heart of the system, so changes there get a closer look. When you propose a change to a lens (a new dimension, a reweighting, a different band cutoff):

1. State the problem the current lens gets wrong, with a concrete example idea where it produces the wrong verdict.
2. Keep the change minimal. Prefer adjusting an existing dimension over adding a new one. The Income-Bridge lens ships as three dimensions by design; if you want a fourth, make it an opt-in rather than the default.
3. Update every place the lens appears so they stay consistent: the `reference/` definition, the matching `templates/` table, and any check in `scripts/check_integrity.py` that counts rows or reads a footer.
4. Update the worked examples if the change alters their scores, and confirm the cross-artefact numbers still agree (README footer, overview row, logs).

Remember the design stance: the toolkit favours the smallest viable change that solves a real scoring miss. New lenses and overlays are a last resort, not a first reach.

## Before you open a pull request

Run both gates locally and make sure they pass.

**The integrity checker** must exit 0 on the repo:

```bash
python3 scripts/check_integrity.py
```

A stale-evidence warning is acceptable and does not fail the run. Any FAIL must be fixed before you submit.

**The showcase build and leak gate** must pass if you touched anything under `showcase/`:

```bash
cd showcase
npm install
npm run build       # runs the content build and the leak scrubber
npm test            # runs the leak-gate unit tests
```

The leak gate is deliberately strict: it hard-fails the build if a forbidden token reaches a published artifact. If you change the scrub token lists, change `build-content.mjs` and `verify-no-leak.mjs` together so they stay mirrored, and update `build-content.test.mjs` in lockstep.

## Style

Prose in this repo uses British and Commonwealth spelling (optimise, behaviour, licence, organisation). No em dashes. Write "section 5", never the section symbol. Keep guidance direct and second-person; this is a tool other people use for their own ideas, so write for a general audience and keep your own private content out of anything you commit.

## Reporting issues

Open an issue describing what you expected, what happened, and the smallest example that reproduces it. For scoring disagreements, include the idea's lens scores so the discussion has something concrete to work from.
