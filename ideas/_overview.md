# Ideas Overview

The master comparison table for the solo (bootstrapped) track. One row per idea folder under `ideas/`. The showcase build and the integrity checker both read the `## Ideas` table below, so its header and column order are a contract: keep them exactly as shown.

## Lifecycle Stages

- **Backlog** -- captured and scored against the 6 constraints plus market opportunity, not yet validating
- **Validating** -- customer conversations or evidence gathering in progress
- **Built** -- implementation exists but is not yet deployed or dogfooded; advances to Validating on first real usage or evidence
- **Active** -- validated and actively building or launching
- **Parked** -- viable but deprioritised; can return to a prior stage
- **Watching** -- high market opportunity (>= 4.0 / 5) but fails a founder constraint today; reviewed quarterly against constraint flip conditions
- **Killed** -- fails constraints or evidence disproves the thesis; triggers a post-mortem

## Idea Types

- **Standalone** -- a full startup hypothesis with the four-lens scoring
- **Positioning variant** -- a different framing of an existing idea (inherits the parent's scores)
- **Distribution** -- a channel or method serving one or more ideas

## Ideas

| Idea | Type | One-liner | Stage | Fit | Mkt Opp | Quadrant |
|---|---|---|---|---|---|---|
| [OrderFlow](order-flow/) | Standalone | A purchase-order tool that turns supplier email and PDF chaos into one clean, approvable order queue for small wholesale distributors. | **Validating** | 6/6 | 3.8 | BUILD |
| [PermitPilot](permit-pilot/) | Standalone | A guided assistant that walks small builders through council building-permit applications and assembles the submission pack for them. | **Watching** | 4/6 | **4.2** | OPPORTUNITY GAP |
| [HabitMirror](habit-mirror/) | Standalone | A consumer habit-tracking app that reflects your daily routines back as a weekly "mirror" summary. | **Killed** | 3/6 | 3.0 | KILL |

## Quadrant Summary

The 2x2 maps Founder Fit (the 6-constraint tally) against Market Opportunity (the 5-dimension composite). The quadrant is a verdict, not an override: a High-fit idea can sit in a Medium market and still be a BUILD, because the constraints are the binding test.

- **BUILD** -- High fit (5+/6) in a viable-or-better market. Build it. (OrderFlow: High fit, Medium 3.8 market.)
- **OPPORTUNITY GAP** -- High market (>= 4.0) but a constraint fails today. Status is Watching, not Killed; record the constraint flip conditions and review quarterly. (PermitPilot.)
- **LIFESTYLE** -- High fit but a small or weak market. Fine as a lifestyle business, not an asset to build the plan around.
- **KILL** -- Low fit and a sub-4.0 market, with no flip condition in sight. (HabitMirror.)

## Market Opportunity Scorecard

Each idea's Market Opportunity composite is the simple average of five dimensions (Problem Severity, Market Size, Defensibility, Timing, Value Capture), each scored 1 to 5. Bands: >= 4.0 High, 2.5 to 3.9 Medium, < 2.5 Low.

| Idea | Severity | Mkt Size | Defens. | Timing | Value Capt. | Composite | Band |
|---|---|---|---|---|---|---|---|
| PermitPilot | 5 | 4 | 4 | 4 | 4 | **4.2** | High |
| OrderFlow | 4 | 3 | 3 | 5 | 4 | **3.8** | Medium |
| HabitMirror | 2 | 3 | 2 | 4 | 3 | **3.0** | Medium |

## Runway & Sequencing Scorecard

Three filters (Startable Now, Capability Leverage, Runway Fit), each PASS / Mixed / FAIL. The verdict (SWING / STRETCH / WAIT) reads how ready the idea is to be picked up now, and the sequence position orders it against the others (Current Vine, Next Vine, Not Sequenceable). The Tarzan principle: do not let go of the current vine until the next one is in hand.

| Idea | Startable Now | Capability Leverage | Runway Fit | Verdict | Sequence |
|---|---|---|---|---|---|
| OrderFlow | PASS | PASS | PASS | SWING | Current Vine |
| PermitPilot | Mixed | Mixed | Mixed | STRETCH | Next Vine |
| HabitMirror | PASS | FAIL | FAIL | WAIT | Not Sequenceable |

### Income-Bridge Viability Scorecard

A second, independent lens on whether an idea can carry income while you build. Weights: Time to Revenue 0.30 / Income Ceiling 0.40 / Revenue Predictability 0.30. Bands: >= 4.0 Excellent, 3.0 to 3.9 Viable, 2.0 to 2.9 Marginal, < 2.0 Not Viable. An idea can be a KILL as a build and still score as a bridge (and vice versa); the two verdicts answer different questions.

| Idea | TTR | Ceiling | Predict. | Composite | Verdict |
|---|---|---|---|---|---|
| OrderFlow | 4 | 3 | 4 | **3.6** | Viable |
| PermitPilot | 2 | 4 | 3 | **3.1** | Viable |
| HabitMirror | 3 | 2 | 2 | **2.3** | Marginal |

### Income-Bridge Trap warning

A high Income-Bridge score is not a reason to build a poor company. The trap is letting a bridge that pays the bills quietly become the plan, so the bridge work crowds out the idea that was actually worth building. Treat the bridge as a means to extend runway, re-check it each quarter, and kill it the moment it competes with the BUILD.

## Patterns

See [patterns.md](../patterns.md) for the full pattern library. HabitMirror matched **Pattern 1: Feature, Not a Company**, which is why it was killed at creation rather than carried as a Backlog idea.
