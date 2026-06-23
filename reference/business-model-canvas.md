# Business Model Canvas Reference

How to produce a clean, professional Business Model Canvas (BMC) for any idea, on either track. The visual is a single-page HTML artifact authored from `templates/business-model-canvas.html` and exported to PDF or PNG via your browser. This document is the source of truth for *what goes in each block* and *how to keep canvases consistent*.

The format follows Strategyzer's Business Model Canvas (CC BY-SA 3.0). A neutral worked example ships at `ideas/order-flow/business-model-canvas.html`.

## The nine blocks

| Block | Question it answers |
|---|---|
| **Key Partners** | Who do we rely on? (suppliers, channel or embed partners, funders, co-founder or investors) |
| **Key Activities** | What must we do to deliver the value proposition? |
| **Key Resources** | What assets are required? (the gating ones especially) |
| **Value Propositions** | What value do we deliver, to whom, and why is it believed? *(load-bearing cell)* |
| **Customer Relationships** | What relationship does each segment expect? (self-serve, embedded, long-term contract) |
| **Channels** | How do we reach and sell to each segment? |
| **Customer Segments** | Who are we creating value for? |
| **Cost Structure** | What are the dominant costs? (flag the real cost centre) |
| **Revenue Streams** | How do we earn, and how does revenue recur? |

## Auto-derive, then refine

Draft each block from the idea's existing README, then refine, especially the blocks the README does not cover (flagged **MANUAL FILL**). The goal is a fast, faithful first pass, not a verbatim copy. Compress to bullets and bold the load-bearing phrase.

### Solo `ideas/` README to blocks

| Block | Source section(s) |
|---|---|
| Value Propositions | *The Offer* (plus any *Insight* section) |
| Customer Segments | *The Buyer* |
| Customer Relationships | *The Offer* / *Revenue Model* (relationship type) |
| Channels | *First Ten Customers* / *The Playbook* |
| Revenue Streams | *Revenue Model and Path to Scale* plus *Price Point* |
| Key Resources | *Leverage Profile* |
| Key Activities | *The Playbook* / *The Offer* |
| Key Partners | **MANUAL FILL** |
| Cost Structure | **MANUAL FILL** (partly inferable from *Revenue Model*) |

### Venture `ventures/ideas/` README to blocks

| Block | Source section(s) |
|---|---|
| Value Propositions | *The Offer* / *Capability* |
| Customer Segments | *The Buyer* (wedge buyer plus the broader segment) |
| Channels | *The Buyer* go-to-market path / *Capital Plan* |
| Revenue Streams | *Revenue Model* plus contract types (milestones, subscription, licensing) |
| Key Resources | *Partnership Fit* (right-to-win) plus founder edge |
| Key Partners | *Partnership Fit* (channel partners, co-founder, investors) |
| Key Activities | *The Offer* plus *Capital Plan* (use of funds) |
| Cost Structure | *Capital Plan* (use of funds, capital intensity) |
| Customer Relationships | **MANUAL FILL** |

## Authoring rules

- **Three to six bullets per cell.** A canvas is a glance-able map, not the brief. Cut anything that does not earn its row height.
- **Bold the load-bearing phrase** in each bullet.
- **Name the gating item.** In Key Resources and Cost Structure, call out the one asset or cost that dominates everything else. This is usually the thing that decides whether the model works.
- **Group genuinely distinct segments (mostly ventures).** When an idea serves two real segments at once, head sub-lists inside a cell rather than blending them. Solo ideas normally omit this.
- **Version and date** in the header metabox. Bump the version when you revise.

## Export

1. Open the per-idea `business-model-canvas.html` in a browser.
2. **PDF:** print to PDF (Cmd-P or Ctrl-P, then Save as PDF). The template's print stylesheet sets A3 landscape so the whole canvas lands on one page with no clipping.
3. **PNG one-pager:** screenshot at the body width for a companion one-pager.
