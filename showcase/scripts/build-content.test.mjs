// Adversarial unit tests for the content pipeline + leak scrub (Eng E1).
// Run: npm test  (node --test). Zero deps. The leak-scrub tests are the
// regression guard on the IP-protection logic — if a future tweak stops
// catching a planted token, these fail.

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  normalizeType,
  normalizeStage,
  normalizeQuadrant,
  parseOverview,
  parseTitle,
  parseStatus,
  splitSections,
  parseMarket,
  parseRelated,
  redact,
  scrub,
} from "./build-content.mjs";

test("normalizeType maps real variants, throws on unknown", () => {
  assert.equal(normalizeType("Standalone"), "Standalone");
  assert.equal(normalizeType("Distribution"), "Distribution");
  assert.equal(normalizeType("Pos. variant"), "PositioningVariant");
  assert.equal(normalizeType("Positioning variant"), "PositioningVariant");
  assert.throws(() => normalizeType("Widget"));
});

test("normalizeStage strips bold + dagger, throws on unknown", () => {
  assert.equal(normalizeStage("**Backlog**"), "Backlog");
  assert.equal(normalizeStage("**Validating** †"), "Validating");
  assert.equal(normalizeStage("Watching"), "Watching");
  assert.throws(() => normalizeStage("Shipping"));
});

test("normalizeQuadrant handles emoji, compound, borderline, throws on unknown", () => {
  assert.equal(normalizeQuadrant("BUILD"), "BUILD");
  assert.equal(normalizeQuadrant("**BUILD** ⭐"), "BUILD");
  assert.equal(normalizeQuadrant("BUILD (borderline)"), "BUILD_BORDERLINE");
  assert.equal(normalizeQuadrant("OPPORTUNITY GAP (Crown Jewel)"), "OPPORTUNITY_GAP");
  assert.equal(normalizeQuadrant("KILL (variant) / Career Capital Builder (income bridge)"), "KILL");
  assert.equal(normalizeQuadrant("LIFESTYLE"), "LIFESTYLE");
  assert.equal(normalizeQuadrant("Strategy"), "STRATEGY");
  assert.throws(() => normalizeQuadrant("FROBNICATE"));
});

test("parseOverview drops the Fit column and parses rows", () => {
  const md = [
    "## Ideas",
    "",
    "| Idea | Type | One-liner | Stage | Fit | Mkt Opp | Quadrant |",
    "|---|---|---|---|---|---|---|",
    "| [OrderFlow](order-flow/) | Standalone | order queue | **Backlog** | 6/6 | 3.8 | BUILD |",
    "| [Content](content-engine/) | Distribution | content | **Backlog** | N/A | 2.8 | LIFESTYLE |",
    "| [Growth](growth-loop/) | Standalone | growth | **Validating** † | 1/6 | 3.0 | KILL (variant) / Career Capital Builder |",
    "",
    "## Founder Constraint Scorecard",
    "| junk |",
  ].join("\n");
  const map = parseOverview(md);
  assert.equal(map.size, 3);
  const s = map.get("order-flow");
  assert.equal(s.name, "OrderFlow");
  assert.equal(s.stage, "Backlog");
  assert.equal(s.quadrant, "BUILD");
  // The Fit value ("6/6") must never appear on the record.
  assert.equal(JSON.stringify(s).includes("6/6"), false);
  assert.equal(map.get("growth-loop").quadrant, "KILL");
});

test("parseTitle accepts --, em dash, en dash", () => {
  assert.deepEqual(parseTitle("# OrderFlow -- order queue"), { name: "OrderFlow", tagline: "order queue" });
  assert.deepEqual(parseTitle("# Foo — bar baz"), { name: "Foo", tagline: "bar baz" });
  assert.deepEqual(parseTitle("# Foo – bar"), { name: "Foo", tagline: "bar" });
});

test("parseStatus canonicalizes and ignores trailing prose", () => {
  assert.equal(parseStatus("# X\n\n**Status:** Watching — Fails Bootstrap today\n"), "Watching");
});

test("parseMarket reads the 3-col table + composite, ignores the 5-col weighted table", () => {
  const readme = [
    "## Market Opportunity",
    "",
    "| Dimension | Score (1-5) | Justification |",
    "|---|---|---|",
    "| Problem Severity | 4 | painful |",
    "| Market Size | 3 | medium |",
    "| Defensibility | 2 | thin |",
    "| Timing | 4 | ready |",
    "| Value Capture | 4 | clear |",
    "",
    "**Composite: 3.4/5.0**",
    "",
    "## Income-Bridge Viability",
    "",
    "| Dimension | Weight | Score (1-5) | Weighted | Justification |",
    "|---|---|---|---|---|",
    "| Time to Revenue | 20% | 3 | 0.60 | slow |",
  ].join("\n");
  const m = parseMarket(splitSections(readme), "BUILD");
  assert.equal(m.dimensions.length, 5);
  assert.equal(m.composite, 3.4);
  assert.equal(m.quadrant, "BUILD");
  assert.equal(m.dimensions[0].dimension, "Problem Severity");
});

test("parseRelated keeps only allowed sibling slugs, rejects anchors/external", () => {
  const readme = [
    "## Related Ideas",
    "- [Anchor](# positioning-pivot) -- anchor, reject",
    "- [HabitMirror](../habit-mirror/) -- killed",
    "- [PermitPilot](../permit-pilot/) -- featured",
    "- [External](https://example.org) -- reject",
  ].join("\n");
  const rel = parseRelated(splitSections(readme), new Set(["permit-pilot", "habit-mirror"]), "order-flow");
  assert.deepEqual(rel.sort(), ["habit-mirror", "permit-pilot"]);
});

test("scrub HARD-FAILS on planted private tokens", () => {
  const planted = "This idea is 6/6 founder fit, a great side-hustle, verdict SWING, wealth vs status game.";
  const report = { leaks: [], warnings: [] };
  scrub(planted, { slug: "x", field: "test" }, report);
  const names = report.leaks.map((l) => l.pattern);
  assert.ok(names.includes("founder-fit-score"), "should catch 6/6");
  assert.ok(names.includes("side-hustle"), "should catch side-hustle");
  assert.ok(names.includes("transition-verdict"), "should catch SWING");
  assert.ok(names.includes("wealth-vs-status"), "should catch wealth vs status");
});

test("personal-name HARD_FAIL examples ship commented out (no false hits by default)", () => {
  // The HARD_FAIL "ADD YOUR OWN" block ships its name/company examples
  // commented out, so a fresh checkout does not fire on them. Once you add
  // your own tokens (and mirror them into verify-no-leak.mjs), re-enable this
  // test against YOUR tokens. Here we prove the defaults stay quiet.
  const report = { leaks: [], warnings: [] };
  scrub("Spoke to Jane Doe at Globex; Sam originated the concept.", { slug: "x", field: "t" }, report);
  assert.equal(report.leaks.length, 0, "no personal tokens are active by default");
});

test("scrub redacts the example employer name and does NOT hard-fail on it", () => {
  // redact() ships with "Acme Corp" -> "a prior company" as the worked
  // example. Swap it for your real employer name.
  const report = { leaks: [], warnings: [] };
  const out = scrub("Built at Acme Corp, an enterprise software company.", { slug: "x", field: "t" }, report);
  assert.equal(out.includes("Acme Corp"), false, "Acme Corp must be redacted");
  assert.ok(out.includes("a prior company"));
  assert.equal(report.leaks.length, 0, "redacted employer must not hard-fail");
});

test("clean outward prose produces no leaks or warnings", () => {
  const report = { leaks: [], warnings: [] };
  scrub("A purchase-order tool for small wholesale distributors. $79/seat/month.", { slug: "x", field: "t" }, report);
  assert.equal(report.leaks.length, 0);
  assert.equal(report.warnings.length, 0);
});

test("redact removes the example personal domain", () => {
  // redact() ships with example.com as the worked example. Swap it for your
  // own domain.
  assert.equal(redact("see example.com for more").includes("example.com"), false);
});
