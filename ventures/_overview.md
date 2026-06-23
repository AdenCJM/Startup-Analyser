# Venture Track -- Master Scorecard

The master comparison table for the VC-backed track. One row per idea folder under `ventures/ideas/`. The venture track inverts the solo track's assumptions: capital is required rather than avoided, the founder takes a full-time leap, the target is a fund-returning exit, and the co-founder partnership is a first-class scored axis rather than an afterthought.

Each idea is scored on four lenses and resolved to a single Master Verdict through a six-step cascade (see `README.md` and the lens references under `reference/`). Status is a real lifecycle word; Verdict is the cascade output. Keep both: a `Shaping` idea with a `SHAPE` verdict is the normal early state.

> **Verdict vocabulary:** PURSUE (go now), SHAPE (a named blocker caps it; fix the blocker and re-derive), WATCH (high market, founder-fit or feasibility not there yet), PASS (does not clear the bar), NO-GO (an ethics or legal veto, terminal).

> **Lifecycle:** Backlog, Shaping, Validating, Active, Parked, Watching, Killed, Built. `Shaping` is venture-only and pairs with the SHAPE verdict.

## Scored ventures

| Venture Idea | Type | One-liner | Status | Constraints | Mkt Opp | Partnership | Feasibility | Ethics | Verdict | Co-founder |
|---|---|---|---|---|---|---|---|---|---|---|
| [LedgerGrid](ideas/ledger-grid/) | Standalone | A horizontal data-lineage and audit layer that sits under enterprise AI pipelines so teams can prove where any model output came from. | Shaping | 6/7 | 4.4 HIGH | 3.55 Workable | CONDITIONAL | PASS | **SHAPE** | Domain/product half identified; commercial/CEO half is the founder |

**Reading the LedgerGrid row.** High founder fit (6/7) crossed with a HIGH market (4.4) points at PURSUE, but two things cap it at SHAPE: the equity split is unresolved (Partnership dimension 3 scored 3) and the capital path is still Mixed on a gating feasibility filter. The named blocker is the cap table. Lock the founder agreement and validate the investor relationships, then re-derive (expected PURSUE).

## Candidate backlog (catalogue only -- no folder yet)

Ideas worth tracking but not yet scored into a folder. Promote a candidate to a scored `ventures/ideas/{slug}/README.md` when it warrants the full four-lens treatment.

| Candidate | One-liner | Lean | Ethics read |
|---|---|---|---|
| Model evaluation harness | A managed service that continuously red-teams and benchmarks a company's deployed models against their own policy. | SHAPE | Clean |
| Agent observability | A tracing and replay layer for autonomous agents in production, so failures can be reconstructed and audited. | WATCH | Clean |
| Consent and data-rights ledger | Infrastructure that records and enforces end-user data-usage consent across an enterprise's AI features. | WATCH | Clean (privacy-sensitive; keep a clear data-handling line) |

## Ethics register

Records every Ethics FAIL (a hard, un-flippable kill) and every *conditional* ethics line on record, so a killed-on-ethics idea is never silently re-surfaced and a conditional commitment is never relitigated under deal pressure. The ethics lens is a veto: a FAIL is terminal NO-GO, and it does not flip back later just because the market got more attractive.

| Idea | Ethics state | Line on record |
|---|---|---|
| LedgerGrid | PASS -- conditional | The lineage layer must record provenance only, with no capability to alter or suppress the audit trail it produces. PASS while that holds; if a future scope adds the ability to edit or hide lineage records, the idea reverts to an Ethics review before any pitch, recorded here and in `decisions.md`. |

_No Ethics-FAIL (NO-GO) ideas yet._
