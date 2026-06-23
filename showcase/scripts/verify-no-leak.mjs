#!/usr/bin/env node
// verify-no-leak.mjs — post-build leak gate (CEO F1 + Eng E2). Runs after
// `next build`; non-zero exit fails the deploy. Three checks:
//   1. STRUCTURAL (authoritative): dataset.ts imports `server-only`, so a
//      client import of the corpus breaks `next build` itself.
//   2. DATA: ideas.json must contain no hard private tokens.
//   3. ADVISORY: grep client chunks for idea prose (best-effort; minification
//      can hide leaks, so this is a warning, not the primary guard).

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
let failed = false;
const fail = (msg) => {
  console.error(`[verify-no-leak] FAIL: ${msg}`);
  failed = true;
};

// 1. Structural guard present.
const datasetTs = resolve(root, "src/content/dataset.ts");
if (!existsSync(datasetTs) || !readFileSync(datasetTs, "utf8").includes('import "server-only"')) {
  fail('src/content/dataset.ts must `import "server-only"` (client-bundle guard).');
}

// 2. Hard token grep on the generated dataset.
const idsPath = resolve(root, "src/content/ideas.json");
if (!existsSync(idsPath)) {
  fail("src/content/ideas.json not found — run the content build first.");
} else {
  const json = readFileSync(idsPath, "utf8");
  const HARD = [
    // ── KEEP: framework / private-scoring vocabulary (mirrors build-content.mjs) ──
    /\b\d(?:\.\d)?\s*\/\s*6\b/,
    /founder[- ]fit/i,
    /side[- ]?hustle/i,
    /\bmoonlight/i,
    /day[- ]job/i,
    /wealth\s+vs\.?\s+status/i,
    /\b(SWING|STRETCH|WAIT)\b/,
    /career capital builder/i,
    /constraint flip/i,
    /post[- ]mortem/i,
    // ── ADD YOUR OWN: mirror every personal token you added to
    //    build-content.mjs HARD_FAIL here (employer, real names, codenames).
    //    Belt-and-braces: caught here too in case the scrub list and this
    //    gate ever drift.
    //   /\bAcme Corp\b/,
    //   /\bJane Doe\b/i,
    //   /\bSam\b/,
    //   /\bGlobex\b/i,
  ];
  for (const re of HARD) {
    const m = json.match(re);
    if (m) fail(`ideas.json contains a private token: "${m[0]}"`);
  }
}

// 3. Advisory: scan client chunks for idea prose.
const staticDir = resolve(root, ".next/static");
if (existsSync(staticDir)) {
  const snippets = [];
  try {
    const d = JSON.parse(readFileSync(idsPath, "utf8"));
    for (const i of [...d.featured, ...d.explored]) {
      if (i.oneLiner && i.oneLiner.length > 24) snippets.push(i.oneLiner.slice(0, 24));
    }
  } catch {}
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.js$/.test(name)) {
        const txt = readFileSync(p, "utf8");
        for (const s of snippets) {
          if (txt.includes(s)) {
            console.warn(`[verify-no-leak] ADVISORY: idea prose may be in a client chunk (${name}): "${s}…"`);
          }
        }
      }
    }
  };
  try { walk(staticDir); } catch {}
} else {
  console.warn("[verify-no-leak] (no .next/static yet — skipping advisory bundle scan)");
}

if (failed) {
  console.error("[verify-no-leak] LEAK GATE FAILED — not safe to deploy.");
  process.exit(1);
}
console.log("[verify-no-leak] OK — structural guard present, dataset has no hard tokens.");
