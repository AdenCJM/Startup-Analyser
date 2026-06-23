# Showcase — password-gated private idea presenter

A small Next.js app that renders a **curated, privacy-scrubbed** subset of your
idea knowledge base for sharing with a small private audience (a collaborator,
an advisor, a prospective partner). It reads the idea markdown from `../ideas`
at **build time**, strips every piece of private founder framing, and serves the
result behind a single shared password.

It exists so a reader can see the *outward* case for an idea — pitch, buyer,
problem, offer, price, market opportunity — without ever seeing the private
scoring layer this repo also holds (founder-fit scores, runway and income-bridge
analysis, kill post-mortems, plus any private names or employers you've
configured).

---

## Status

This is a reference implementation. Point it at your own `../ideas` corpus,
curate which ideas to publish in `content.config.mjs`, set the two auth env
vars, and deploy. The content build and the post-build leak gate run
automatically, so a misconfiguration fails closed rather than leaking.

---

## What gets published (and what never does)

The build is **allowlist-first and fail-closed**. Two files control it:

- **`content.config.mjs`** — the *only* file you edit to curate. `FEATURED` and
  `EXPLORED` are arrays of idea folder slugs (folder names under `../ideas`).
  Nothing outside those slugs is ever read or published. `FOUNDER` is the
  byline.
- **`scripts/build-content.mjs`** — the parser + scrub. For each curated idea it
  reads only an **allowlisted set of README sections** (`elevator pitch`, `the
  buyer`, `the problem`, `the offer`, `price point`, `first ten customers`,
  `revenue model`) plus the structured Market Opportunity table. The founder-fit
  "Fit" column in `_overview.md` is dropped by construction. Everything else
  (founder constraints, runway and income-bridge tables, post-mortems, the
  framework-analysis sections) is simply never allowlisted, so it cannot reach
  the output.

### The privacy scrub (two tiers + a post-build gate)

Every outward string passes through `scrub()` in `scripts/build-content.mjs`:

1. **REDACT** (Tier 2, runs first) — soft rewrites for things you can mention
   obliquely, for example a former employer name rewritten to `a prior company`,
   or a personal domain stripped out. These are commented examples you fill in
   with your own tokens.
2. **HARD_FAIL** — if any private token survives, the build **exits non-zero**
   and writes nothing. The shipped list keeps the framework / private-scoring
   vocabulary (the founder-fit score pattern `x/6`, `founder-fit`, `side-hustle`,
   `day-job`, `moonlight`, `wealth vs status`, the runway verdicts
   `SWING`/`STRETCH`/`WAIT`, `post-mortem`, `constraint flip`) so your private
   scoring layer can never reach public prose. Below that sits an **ADD YOUR
   OWN** block where you add your own private names, employers, and codenames
   (see "Adding your own tokens" below).
3. **WARN_ONLY** — incidental framing (e.g. `bootstrap`, `runway`, `income
   bridge`) is logged to `src/content/REVIEW.md` for a human to eyeball; it does
   not fail the build.

After `next build`, **`scripts/build-content.mjs` is mirrored by
`scripts/verify-no-leak.mjs`**, a post-build gate that:
- asserts `src/content/dataset.ts` imports `server-only` (so the corpus can
  never be bundled into a client chunk),
- greps the generated `ideas.json` for the same hard tokens, and
- advisory-greps the built client chunks for idea prose.

A failure here is non-zero and **fails the deploy**. The two hard-token lists
(`build-content.mjs` HARD_FAIL and `verify-no-leak.mjs` HARD) are deliberately
kept in sync — edit both together.

### Adding your own tokens

Out of the box the scrub catches the framework vocabulary only. To make it catch
*your* private material, add your own private names, employers, partner
companies, and internal codenames to the **ADD YOUR OWN** block in
`scripts/build-content.mjs` HARD_FAIL, then mirror every token you add into the
HARD array in `scripts/verify-no-leak.mjs`. Both files ship with commented
examples showing the shape.

Names are matched word-bounded so they don't catch substrings of unrelated
words. If a name would false-fire on a common word (for example a token that
also appears inside `jacket` or `Samsung`), match it case-sensitively instead.
Regression tests for the scrub live in `scripts/build-content.test.mjs`; extend
them when you add tokens.

The generated artefacts are `src/content/ideas.json` (the served dataset) and
`src/content/REVIEW.md` (the human-review digest — read it before any deploy).

---

## Auth model

Single **shared password**, fail-closed, no user accounts.

- Two env vars: `SHOWCASE_PASSWORD` (min 20 chars) and `AUTH_SECRET` (HMAC key).
  If either is missing/blank, **every auth check returns false** — a
  misconfigured deploy locks everyone out, it never opens up (`src/lib/auth.ts`).
- Login (`POST /api/login`) does a constant-time password compare, then sets an
  HMAC-signed, `httpOnly`, `secure`, `sameSite=lax` session cookie (7-day TTL).
- **`src/proxy.ts`** (Next 16 "proxy", formerly middleware; Node runtime) is the
  network gate — every route except the login flow + static assets requires a
  valid cookie; API routes get `401`, pages redirect to `/login?next=…`. It also
  sets `noindex`/`no-referrer`/`no-store` headers.
- **Belt and braces:** server components re-verify the session via
  `src/lib/session.ts` (proxy auth is "optimistic" per Next docs).
- Login is rate-limited per-IP (`src/lib/ratelimit.ts`; 5 / 10 min). It's an
  in-memory speed bump, not a shared wall — swap in Upstash if it ever needs to
  be real.

There is no default password baked in, by design. You set one per deploy.

---

## Run locally

Requires Node and npm. The content build runs automatically before `dev` and
`build` (`predev` / `prebuild` hooks), reading `../ideas`.

```bash
npm install

# minimal env for local auth (see "Auth model")
cat > .env.local <<'EOF'
SHOWCASE_PASSWORD=use-a-long-random-string-at-least-20-chars
AUTH_SECRET=another-long-random-secret
EOF

npm run dev          # builds content, then next dev on http://localhost:3000
```

Other scripts:

```bash
npm run content      # regenerate src/content/{ideas.json,REVIEW.md} only
npm test             # node --test — scrub + parser regression tests
npm run build        # next build, then the verify-no-leak deploy gate
```

If `npm run content` exits non-zero it found a leak — fix the **source idea
markdown** in `../ideas` (or, if the section is genuinely outward, the parser
allowlist), then re-run. Do not weaken the scrub to make a build pass.

---

## Deploy to Vercel

1. **Root directory** — set the Vercel project root to `showcase/`.
2. **Include files outside the root** — the build reads `../ideas`, so in
   Project → Settings → Build, enable *"Include files outside the Root Directory
   in the Build Step."* Without this the build fails fast with a clear
   `ideas/ not found` error from `build-content.mjs`.
3. **Env vars** — set `SHOWCASE_PASSWORD` (≥20 chars) and `AUTH_SECRET` in
   Production (and Preview if you want gated previews). Missing either =
   locked-out, by design.
4. **Build command** — default (`npm run build`); it runs the content build and
   the `verify-no-leak` gate automatically. A leak hard-fails the deploy.
5. Share the URL + password out-of-band. The site is `noindex`/`nofollow` and
   sets `no-store`, so it won't be crawled or cached.

---

## File map

```
showcase/
  content.config.mjs            ← curation: FOUNDER, FEATURED[], EXPLORED[]
  scripts/
    build-content.mjs           ← parse ../ideas → scrub → ideas.json + REVIEW.md
    build-content.test.mjs      ← scrub + parser regression tests (npm test)
    verify-no-leak.mjs          ← post-build deploy gate (mirrors HARD_FAIL)
  src/
    content/{ideas.json,REVIEW.md}  ← generated; do not hand-edit
    content/dataset.ts          ← imports "server-only" (client-bundle guard)
    lib/{auth,session,ratelimit}.ts
    proxy.ts                    ← network auth gate + security headers
    app/…                       ← login + gated UI
```
