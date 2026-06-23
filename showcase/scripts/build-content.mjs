#!/usr/bin/env node
// ──────────────────────────────────────────────────────────────────────────
// build-content.mjs — parse ../ideas markdown into a curated, scrubbed
// dataset for the private idea showcase. Zero runtime deps.
//
// Pipeline:
//   1. read content.config.mjs (FOUNDER, FEATURED, EXPLORED)
//   2. parse ideas/_overview.md table -> base records (name/type/stage/
//      oneLiner/quadrant). The founder-fit "Fit" column is never read.
//   3. parse each featured/explored ideas/<slug>/README.md -> outward
//      sections (allowlist only) + structured Market Opportunity.
//   4. two-tier leak scrub: HARD FAIL on private/IP tokens; REDACT employer
//      mentions; WARN on transition framing for the human review gate.
//   5. emit src/content/ideas.json + src/content/REVIEW.md.
//
// Run directly to build. Exported functions are unit-tested in *.test.mjs.
// ──────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";

// ── paths (portable: resolve relative to this file, not cwd) ───────────────
export function ideasDir() {
  const here = dirname(fileURLToPath(import.meta.url)); // showcase/scripts
  return resolve(here, "..", "..", "ideas");
}
function contentOut() {
  const here = dirname(fileURLToPath(import.meta.url));
  return resolve(here, "..", "src", "content");
}

// ── normalization maps (fail-closed: unknown tokens throw) ─────────────────
export function normalizeType(raw) {
  const t = raw.replace(/\*/g, "").trim().toLowerCase();
  if (t.startsWith("standalone")) return "Standalone";
  if (t.startsWith("distribution")) return "Distribution";
  if (t.startsWith("pos") || t.startsWith("positioning")) return "PositioningVariant";
  throw new Error(`Unknown idea Type: "${raw}"`);
}

const STAGES = ["Backlog", "Validating", "Watching", "Parked", "Killed", "Active"];
export function normalizeStage(raw) {
  // strip bold, footnote daggers/asterisks, then take the first word
  const cleaned = raw.replace(/\*/g, "").replace(/[†*]/g, "").trim();
  const word = (cleaned.split(/\s+/)[0] || "").toLowerCase();
  const hit = STAGES.find((s) => s.toLowerCase() === word);
  if (!hit) throw new Error(`Unknown Stage: "${raw}"`);
  return hit;
}

export function normalizeQuadrant(raw) {
  const cleaned = raw
    .replace(/\*/g, "")
    .replace(/[^\x00-\x7F]/g, "") // strip emoji (⭐👑) and other non-ascii
    .trim();
  const lower = cleaned.toLowerCase();
  if (lower.includes("opportunity gap")) return "OPPORTUNITY_GAP";
  if (lower.includes("build") && lower.includes("borderline")) return "BUILD_BORDERLINE";
  const head = cleaned.split(/[(/]/)[0].trim().toLowerCase();
  if (head.startsWith("build")) return "BUILD";
  if (head.startsWith("kill")) return "KILL";
  if (head.startsWith("lifestyle")) return "LIFESTYLE";
  if (head.startsWith("strategy")) return "STRATEGY";
  throw new Error(`Unknown Quadrant: "${raw}"`);
}

// ── _overview.md table parsing ─────────────────────────────────────────────
// Returns Map<slug, {name, type, stage, oneLiner, quadrant, mktOpp}>.
// Drops the "Fit" (founder-fit) column entirely. Stops after the first table.
export function parseOverview(md) {
  const lines = md.split("\n");
  const start = lines.findIndex(
    (l) => l.includes("| Idea ") && l.toLowerCase().includes("one-liner"),
  );
  if (start === -1) throw new Error("Could not find the Ideas table header in _overview.md");
  const out = new Map();
  for (let i = start + 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim().startsWith("|")) break; // table ended
    const cells = line.split("|").slice(1, -1).map((c) => c.trim());
    if (cells.length < 7) continue;
    const [ideaCell, typeCell, oneLiner, stageCell, /* fit */, mktCell, quadCell] = cells;
    const m = ideaCell.match(/\[([^\]]+)\]\(([^)]+?)\/?\)/);
    if (!m) continue;
    const slug = m[2].replace(/\/$/, "").trim();
    out.set(slug, {
      slug,
      name: m[1].trim(),
      type: normalizeType(typeCell),
      stage: normalizeStage(stageCell),
      oneLiner: oneLiner.trim(),
      quadrant: normalizeQuadrant(quadCell),
      mktOpp: parseFloat(mktCell.replace(/\*/g, "")) || null,
    });
  }
  return out;
}

// ── README parsing ─────────────────────────────────────────────────────────
const SECTION_ALLOW = [
  { key: "elevatorPitch", match: "elevator pitch" },
  { key: "buyer", match: "the buyer" },
  { key: "problem", match: "the problem" },
  { key: "offer", match: "the offer" },
  { key: "price", match: "price point" },
  { key: "firstTen", match: "first ten customers" },
  { key: "revenue", match: "revenue model" },
];

// Split a README body into { heading, body } blocks on `## ` headings.
// Content before the first `## ` (title, status block, ⚠ preamble) is ignored.
export function splitSections(md) {
  const blocks = [];
  const re = /^##\s+(.+)$/gm;
  let match;
  const marks = [];
  while ((match = re.exec(md)) !== null) marks.push({ heading: match[1].trim(), index: match.index, end: re.lastIndex });
  for (let i = 0; i < marks.length; i++) {
    const body = md.slice(marks[i].end, i + 1 < marks.length ? marks[i + 1].index : md.length).trim();
    blocks.push({ heading: marks[i].heading, body });
  }
  return blocks;
}

export function parseTitle(md) {
  const m = md.match(/^#\s+(.+?)\s+(?:--|—|–)\s+(.+?)\s*$/m);
  if (m) return { name: m[1].trim(), tagline: m[2].trim() };
  const only = md.match(/^#\s+(.+?)\s*$/m);
  return { name: only ? only[1].trim() : "", tagline: "" };
}

export function parseStatus(md) {
  const m = md.match(/\*\*Status:\*\*\s*([A-Za-z]+)/);
  return m ? normalizeStage(m[1]) : null;
}

// Parse the Market Opportunity section: the 3-col dimension table + composite.
export function parseMarket(sections, quadrant) {
  const sec = sections.find((s) => s.heading.toLowerCase().startsWith("market opportunity"));
  if (!sec) return null;
  const dims = [];
  for (const line of sec.body.split("\n")) {
    const t = line.trim();
    if (!t.startsWith("|")) continue;
    const cells = t.split("|").slice(1, -1).map((c) => c.trim());
    if (cells.length !== 3) continue; // skip the header/separator and any 5-col table
    const [dim, scoreCell] = cells;
    const score = parseInt(scoreCell.replace(/\*/g, ""), 10);
    if (!Number.isFinite(score)) continue; // header row ("Score (1-5)")
    dims.push({ dimension: dim, score, justification: cells[2] });
  }
  const cm = sec.body.match(/Composite:\s*([\d.]+)\s*\/\s*5/i);
  const composite = cm ? parseFloat(cm[1]) : null;
  if (dims.length === 0 || composite == null) return null;
  return { dimensions: dims, composite, quadrant };
}

// Related ideas: structured slug extraction only (never the leaky prose).
// Keep only links to sibling idea folders that are themselves featured.
export function parseRelated(sections, allowedSlugs, selfSlug) {
  const sec = sections.find((s) => s.heading.toLowerCase().startsWith("related ideas"));
  if (!sec) return [];
  const slugs = new Set();
  const re = /\(\.\.\/([a-z0-9-]+)\/?\)/g;
  let m;
  while ((m = re.exec(sec.body)) !== null) {
    const slug = m[1];
    if (slug !== selfSlug && allowedSlugs.has(slug)) slugs.add(slug);
  }
  return [...slugs];
}

// ── leak scrub ──────────────────────────────────────────────────────────────
const HARD_FAIL = [
  // ── KEEP: framework / private-scoring vocabulary ──────────────────────────
  // The showcase publishes only outward sections + the Market Opportunity
  // table. These tokens are the names of your PRIVATE scoring framework and
  // must never reach public prose. Leave them in even if you rename your
  // sections — they are cheap insurance.
  { name: "founder-fit-score", re: /\b\d(?:\.\d)?\s*\/\s*6\b/ }, // an "X/6" fit score
  { name: "founder-fit", re: /founder[- ]fit/i },
  { name: "side-hustle", re: /side[- ]?hustle/i },
  { name: "moonlight", re: /\bmoonlight/i },
  { name: "day-job", re: /day[- ]job/i },
  { name: "wealth-vs-status", re: /wealth\s+vs\.?\s+status/i },
  { name: "transition-verdict", re: /\b(SWING|STRETCH|WAIT)\b/ },
  { name: "career-capital-builder", re: /career capital builder/i },
  { name: "post-mortem", re: /post[- ]mortem/i },
  { name: "constraint-flip", re: /constraint flip/i },

  // ── ADD YOUR OWN: private names / companies / employers ───────────────────
  // Replace the examples below with the real private tokens from YOUR repo:
  // current/former employers, the real names of people you spoke to, internal
  // codenames, partner companies — anything that should never surface in the
  // outward showcase. Case-insensitive unless you need to avoid false hits on
  // common words (see the case-sensitive example).
  //
  //   { name: "employer-acme", re: /\bAcme Corp\b/ },     // your employer; also redacted in redact() below
  //   { name: "name-jane", re: /\bJane Doe\b/i },         // a real person you interviewed
  //   { name: "name-sam", re: /\bSam\b/ },                // case-sensitive so it won't hit "Samsung"/"sample"
  //   { name: "company-globex", re: /\bGlobex\b/i },      // a partner/customer company name
  //
  // Delete the examples once you've added your own. Mirror EVERY token you add
  // here into scripts/verify-no-leak.mjs HARD (the two lists must stay in sync).
];

const WARN_ONLY = [
  // ── KEEP: framing that usually signals a hidden private section leaked ─────
  // The analysis sections these describe are already dropped (not allowlisted),
  // so a hit here is an incidental mention worth eyeballing, not a hard fail.
  { name: "income-bridge", re: /income[- ]bridge/i },
  { name: "primary-venture", re: /primary venture/i },
  { name: "bootstrap", re: /\bbootstrap/i },
  { name: "model-curve", re: /model curve/i },
  { name: "framework-subscore", re: /\b\d\s*\/\s*(?:4|10)\b/ }, // stray "X/4" or "X/10" sub-score
  { name: "transition-runway", re: /\brunway\b/i },

  // ── ADD YOUR OWN: soft tokens to eyeball (does not fail the build) ─────────
  // Names of frameworks/products/tools you reference privately that you'd want
  // flagged in REVIEW.md but not auto-failed. Example:
  //   { name: "framework-mention", re: /\b(myframework|othertool)\b/i },
];

// Redact employer / personal-domain mentions (run before HARD_FAIL). Replace
// the examples with YOUR employer name and personal domain. These are SOFT
// scrubs: the text is rewritten rather than failing the build, which is right
// for a former employer you can mention obliquely. Keep any token you redact
// here ALSO in HARD_FAIL as a tripwire (so a typo'd variant still fails).
export function redact(text) {
  return text
    .replace(/\bAcme Corp\b/g, "a prior company")        // <- your employer name
    .replace(/(https?:\/\/)?(www\.)?example\.com\/?/gi, ""); // <- your personal domain
}

// Scan one string; push leaks/warnings into report. Returns redacted text.
export function scrub(text, ctx, report) {
  const cleaned = redact(text);
  for (const p of WARN_ONLY) {
    if (p.re.test(cleaned)) report.warnings.push({ ...ctx, pattern: p.name });
  }
  for (const p of HARD_FAIL) {
    const m = cleaned.match(p.re);
    if (m) {
      const idx = Math.max(0, m.index - 40);
      report.leaks.push({ ...ctx, pattern: p.name, match: m[0], snippet: cleaned.slice(idx, m.index + 60).replace(/\n/g, " ") });
    }
  }
  return cleaned;
}

// ── assemble one Idea (scrubs every outward string) ─────────────────────────
export function buildIdea(slug, base, readme, allowedSlugs, report) {
  const ctx = (field) => ({ slug, field });
  const sections = [];
  const blocks = splitSections(readme);
  for (const block of blocks) {
    const h = block.heading.toLowerCase();
    const allow = SECTION_ALLOW.find((a) => h.startsWith(a.match));
    if (!allow) continue;
    const markdown = scrub(block.body.trim(), ctx(`section:${allow.key}`), report);
    if (markdown) sections.push({ key: allow.key, heading: block.heading.trim(), markdown });
  }
  const market = parseMarket(blocks, base.quadrant);
  if (market) {
    market.dimensions = market.dimensions.map((d) => ({
      ...d,
      justification: scrub(d.justification, ctx(`market:${d.dimension}`), report),
    }));
  }
  const title = parseTitle(readme);
  return {
    slug,
    name: base.name,
    tagline: scrub(title.tagline || base.name, ctx("tagline"), report),
    type: base.type,
    stage: parseStatus(readme) || base.stage,
    oneLiner: scrub(base.oneLiner, ctx("oneLiner"), report),
    market,
    sections,
    relatedSlugs: parseRelated(blocks, allowedSlugs, slug),
  };
}

// ── main ────────────────────────────────────────────────────────────────────
async function main() {
  const dir = ideasDir();
  if (!existsSync(dir)) {
    console.error(
      `\n[build-content] FATAL: ideas/ not found at ${dir}\n` +
        `On Vercel, enable "Include files outside the Root Directory in the Build Step".\n`,
    );
    process.exit(1);
  }
  const { FOUNDER, FEATURED, EXPLORED } = await import("../content.config.mjs");
  const overview = parseOverview(readFileSync(resolve(dir, "_overview.md"), "utf8"));
  const allowed = new Set([...FEATURED, ...EXPLORED]);
  const report = { leaks: [], warnings: [] };

  const build = (slugs) =>
    slugs.map((slug) => {
      const base = overview.get(slug);
      if (!base) throw new Error(`Slug "${slug}" in content.config.mjs not found in _overview.md`);
      const readmePath = resolve(dir, slug, "README.md");
      if (!existsSync(readmePath)) throw new Error(`README not found for "${slug}"`);
      return buildIdea(slug, base, readmePath ? readFileSync(readmePath, "utf8") : "", allowed, report);
    });

  const featured = build(FEATURED);
  const explored = build(EXPLORED);

  // Human-review digest (always written, even on success).
  writeReview(featured, explored, report, FOUNDER);

  if (report.leaks.length > 0) {
    console.error(`\n[build-content] LEAK SCRUB FAILED — ${report.leaks.length} hard-fail hit(s):`);
    for (const l of report.leaks) {
      console.error(`  • ${l.slug} [${l.field}] ${l.pattern}: "${l.match}"  …${l.snippet}…`);
    }
    console.error(`\nFix the source idea markdown (or the parser allowlist) and re-run.\n`);
    process.exit(1);
  }

  const dataset = { generatedAt: new Date().toISOString(), founder: FOUNDER, featured, explored };
  writeFileSync(resolve(contentOut(), "ideas.json"), JSON.stringify(dataset, null, 2) + "\n");
  console.log(
    `[build-content] OK — ${featured.length} featured + ${explored.length} explored ideas, ` +
      `0 leaks, ${report.warnings.length} warning(s). Review src/content/REVIEW.md before deploy.`,
  );
}

function writeReview(featured, explored, report, founder) {
  const lines = [];
  lines.push(`# Showcase content — human review gate`, "");
  lines.push(`Generated ${new Date().toISOString()}. **Read this before every deploy.**`, "");
  lines.push(`Founder: ${founder.name} — ${founder.positioning} (${founder.contact || "no contact"})`, "");
  if (report.warnings.length) {
    lines.push(`## ⚠ Warnings (${report.warnings.length}) — eyeball these, regex can't judge context`, "");
    for (const w of report.warnings) lines.push(`- \`${w.slug}\` [${w.field}] — possible "${w.pattern}" framing`);
    lines.push("");
  } else {
    lines.push(`## ⚠ Warnings: none`, "");
  }
  const dump = (title, ideas) => {
    lines.push(`## ${title}`, "");
    for (const idea of ideas) {
      lines.push(`### ${idea.name} (${idea.slug}) — ${idea.stage}`, "");
      lines.push(`> ${idea.oneLiner}`, "");
      if (idea.market) lines.push(`Market: ${idea.market.composite}/5 (${idea.market.quadrant})`, "");
      for (const s of idea.sections) {
        lines.push(`**${s.heading}**`, "", s.markdown, "");
      }
      lines.push("---", "");
    }
  };
  dump("Featured", featured);
  dump("Explored & rejected", explored);
  writeFileSync(resolve(contentOut(), "REVIEW.md"), lines.join("\n"));
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch((e) => {
    console.error(`[build-content] ERROR: ${e.message}`);
    process.exit(1);
  });
}
