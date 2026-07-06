# How to Configure and Publish the Showcase

This guide shows you how to set up the Startup Analyser showcase app, configure which ideas to publish, and deploy it so a private audience can see your ideas (without ever seeing your private scoring layer).

## What the showcase does

The showcase is a Next.js app that:

1. **Reads your ideas** from the `ideas/` and `ventures/ideas/` folders
2. **Extracts only outward-facing sections** (the pitch, buyer, problem, offer, market table — hides founder constraints, runway analysis, scores)
3. **Scrubs private tokens** (your names, employers, internal codenames) from every string
4. **Publishes behind a single shared password** so you control access
5. **Fails closed:** if a private token slips through, the build hard-fails and writes nothing

---

## Before you start

You need:

- Node.js 18+ (`node --version`)
- The `ideas/` folder populated with at least one idea
- Idea READMEs written with the standard sections (you can use the template)
- A list of ideas you want to publish (by folder name, e.g., `order-flow`, `permit-pilot`)
- Private tokens (names, employers, codenames) you want scrubbed

---

## Step 1: Install dependencies

```bash
cd showcase
npm install
```

This installs Next.js, React, and the build-time scrubbing toolchain.

---

## Step 2: Configure which ideas to publish

Open `showcase/content.config.mjs`:

```javascript
export const FOUNDER = {
  name: 'Your Name',
  email: 'you@example.com',
  website: 'https://yourwebsite.com',
}

export const FEATURED = [
  'order-flow',     // These ideas appear first, in this order
  'permit-pilot',
]

export const EXPLORED = [
  'habit-mirror',   // These appear below FEATURED, in order
  'another-idea',
]
```

### What each field means

- **FOUNDER:** Your name and contact info, shown on the showcase header. Edit this to match your byline.
- **FEATURED:** Ideas to display prominently at the top. Limit to 2-3 for visual impact.
- **EXPLORED:** Ideas below featured, shown as additional exploration. No hard limit, but 10+ becomes a long page.

### Rules

- Idea names must match folder names under `ideas/` and `ventures/ideas/` (exact case and hyphens).
- If a folder does not exist, the build will error. Check folder names.
- Only folders listed in FEATURED + EXPLORED are published. Everything else is invisible.
- Idea order in the config determines display order.

### Example

```javascript
export const FOUNDER = {
  name: 'Alice Chen',
  email: 'alice@hypotheticals.com',
  website: 'https://hypotheticals.com',
}

export const FEATURED = [
  'ai-supply-chain',
  'biomarker-prediction',
]

export const EXPLORED = [
  'real-estate-analytics',
  'permit-streamline',
  'habit-coach',
]
```

---

## Step 3: Add your private tokens to the scrub list

Private tokens are names, employers, codenames, and other identifiers you do not want published.

Open `showcase/scripts/build-content.mjs` and find the `HARD_FAIL` array:

```javascript
const HARD_FAIL = [
  // Framework vocabulary (always scrub)
  'founder-fit',
  'founder constraints',
  'runway and sequencing',
  // ... more framework terms ...

  // ADD YOUR OWN TOKENS BELOW
  // Examples:
  // 'Alice', 'Bob', 'sarah@acme.com',
  // 'Acme Inc',
  // 'Project Codename',
]
```

**Add every private token that should never appear in published content:**

```javascript
const HARD_FAIL = [
  // Framework vocabulary
  'founder-fit',
  'founder constraints',
  'runway and sequencing',
  'runway and income-bridge',
  'income-bridge',
  'revenue decoupled from time',
  'bootstrap',
  'side-hustle',
  'moonlight',
  'day-job',
  'wealth vs status',
  'post-mortem',
  'constraint flip',

  // YOUR PRIVATE TOKENS
  'Aden Mann',
  'acjmann@gmail.com',
  'My Company Inc',
  'my-current-employer',
  'Project X',
  'Codename Y',
]
```

### Critical: mirror your tokens to the verifier

After adding tokens to `build-content.mjs`, **also add them to `verify-no-leak.mjs`:**

```javascript
// scripts/verify-no-leak.mjs
const HARD = [
  // Framework vocabulary
  'founder-fit',
  // ... (same list as build-content.mjs) ...

  // YOUR PRIVATE TOKENS (must match build-content.mjs exactly)
  'Aden Mann',
  'acjmann@gmail.com',
  'My Company Inc',
  'my-current-employer',
  'Project X',
  'Codename Y',
]
```

**If the lists do not match, the post-build leak gate will fail.** Keep them in sync.

---

## Step 4: Add your ideas to the showcase (if not already present)

Make sure your ideas to be published are in `ideas/` or `ventures/ideas/` with README.md files.

The scaffold needs only the standard sections. Example structure:

```
ideas/
  order-flow/
    README.md       (required; uses the idea template)
    business-model-canvas.html (optional)
  permit-pilot/
    README.md
  ...
```

### Which sections get published?

The showcase publishes **only these sections** from each idea README (if present):

- `## Elevator Pitch`
- `## The Buyer` / `## The Customer`
- `## The Problem`
- `## The Offer`
- `## Price Point`
- `## First Ten Customers`
- `## Revenue Model`
- `## Market Opportunity` (the scored table, minus the Founder Fit column)

**Everything else is invisible:**
- Founder Constraints (the six or seven scored constraints)
- Runway & Sequencing
- Income-Bridge Viability
- Kill post-mortems
- Private reasoning

The allowlist is hard-coded in `scripts/build-content.mjs` and cannot be bypassed.

---

## Step 5: Set authentication environment variables

The showcase is password-protected. You need to set two environment variables.

Create a `.env.local` file in the `showcase/` directory:

```bash
cd showcase
cat > .env.local << 'EOF'
NEXTAUTH_SECRET=your-random-secret-here
AUTH_PASSWORD=your-password-here
EOF
```

**How to generate a random secret:**

```bash
openssl rand -base64 32
```

This outputs a 32-char string. Use it for `NEXTAUTH_SECRET`.

**Example `.env.local`:**

```
NEXTAUTH_SECRET=Z3d9K2mL1pQ8vX5nB6yJ4cF7rT0sH3w=
AUTH_PASSWORD=correct-horse-battery-staple
```

### Security notes

- **Do not commit `.env.local` to git.** Add it to `.gitignore` if it is not already there.
- **Use a strong password** (random words or a passphrase, not a dictionary word).
- **Share the password verbally or via a secure channel**, not email.
- The password is the only gate; anyone with it can view the showcase.

---

## Step 6: Build and test locally

```bash
npm run build
```

This:
1. Reads your ideas from `../ideas/` and `../ventures/ideas/`
2. Extracts the allowlisted sections
3. Scrubs every private token in HARD_FAIL (and checks that none slip through)
4. Generates `src/content/dataset.ts` (the published dataset)
5. Runs the post-build leak gate (`verify-no-leak.mjs`)

**Expected output:**

```
...
> build
> next build && npm run verify

▲ Next.js 15.0.0
  ✓ Compiled successfully

...
✓ All checks passed
```

If the build fails, check:
- **Missing idea folder?** The config references an idea that does not exist.
- **Token slipped through?** A private token from HARD_FAIL appears in the idea prose. Remove it from the README and rebuild.
- **Mismatched token lists?** HARD_FAIL and HARD in verify-no-leak.mjs do not match. Sync them.

### Test the app locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser. You'll see a login page.

Log in with your `AUTH_PASSWORD`. You should see the featured and explored ideas displayed as a grid.

**Check:**
- Ideas appear in the order you configured
- Idea content looks right (no garbled text, no private tokens)
- No private scoring tables are visible
- The contact / byline at the bottom matches your FOUNDER config

Once satisfied, stop the dev server (`Ctrl+C`).

---

## Step 7: Deploy

The showcase is designed to deploy on **Vercel** (a Next.js host) or any Node.js hosting that supports Next.js.

### Deploy to Vercel

1. Push your repo to GitHub (including `.gitignore` but not `.env.local`):

```bash
git add showcase/ docs/ ideas/ ventures/
git commit -m "chore: add showcase and documentation"
git push origin main
```

2. Go to [vercel.com](https://vercel.com) and connect your repo.

3. In the Vercel dashboard, add environment variables:
   - **NEXTAUTH_SECRET:** paste the value from your local `.env.local`
   - **AUTH_PASSWORD:** paste the password from your local `.env.local`

4. Deploy. Vercel will run `npm run build` and `npm start`, and your showcase goes live.

5. Share the URL with your audience (e.g., `https://your-project.vercel.app`). Visitors log in with `AUTH_PASSWORD`.

### Deploy elsewhere (Node.js hosting)

If you use a different host (AWS, DigitalOcean, etc.):

1. Follow the host's Next.js deployment guide.
2. Set environment variables via the host's UI or config:
   - `NEXTAUTH_SECRET` (random string)
   - `AUTH_PASSWORD` (your chosen password)
3. Ensure the host runs Node.js 18+.

---

## Step 8: Update the README link (optional)

Once the showcase is live, you can link to it from the root README:

```markdown
## The Showcase

A curated, password-gated subset of ideas is published at [your-showcase-url.vercel.app](https://your-showcase-url.vercel.app). 
Log in with the password to explore a few ideas.
```

---

## Maintenance and updates

### Updating ideas

When you update an idea's README in `ideas/my-idea/README.md`:

```bash
cd showcase
npm run build
npm run dev  # test locally
```

Once happy, push to your repo (if on Vercel, it redeploys automatically).

### Adding or removing ideas from the showcase

Edit `showcase/content.config.mjs`, update FEATURED or EXPLORED, and rebuild:

```bash
npm run build
npm run dev
# Test, then push
```

### Adding new private tokens

If you mention a new private name or company in an idea:

1. Add it to `HARD_FAIL` in `build-content.mjs`
2. Add it to `HARD` in `verify-no-leak.mjs` (must match exactly)
3. Rebuild: `npm run build`

If a token slips through, the build fails non-zero, and nothing is published.

---

## Troubleshooting

### Build fails: "Token X found in the output"

The scrub detected a private token that you did not mark for scrubbing.

**Fix:** Add the token to HARD_FAIL in `build-content.mjs` and HARD in `verify-no-leak.mjs`. Rebuild.

### Ideas do not appear in the showcase

**Cause 1:** Folder name does not match the config. Check folder names match FEATURED / EXPLORED exactly (case-sensitive, hyphens).

**Cause 2:** README is missing or malformed. Ensure each idea folder has a `README.md` in the template format.

**Fix:** Check the config, verify folders exist, and rebuild: `npm run build`.

### Password does not work

**Cause:** `.env.local` is not set, or `AUTH_PASSWORD` is not recognized.

**Fix:** Ensure `.env.local` exists in the `showcase/` directory and contains `AUTH_PASSWORD=your-password`. Restart the dev server or redeploy.

### Vercel deploy fails

**Cause:** Environment variables not set, or a build error (token slip-through, missing idea).

**Fix:**
1. Check Vercel dashboard → Settings → Environment Variables. Both NEXTAUTH_SECRET and AUTH_PASSWORD should be there.
2. Check build logs in Vercel. If a token slipped, the log shows which token was found.
3. Fix the issue locally, test with `npm run build`, and push again.

---

## Privacy and security summary

The showcase is **privacy-first by design:**

- ✓ Private scoring layer (Founder Constraints, Runway, Income-Bridge) is never allowlisted, so it cannot reach the output
- ✓ Every private token you list is scrubbed from every string in the published ideas
- ✓ Post-build leak gate fails the deploy if any token slips through
- ✓ Only ideas you explicitly add to FEATURED / EXPLORED are published (deny-by-default)
- ✓ Single-password gate; only people who have the password can see anything
- ✓ Founder name and email are visible, so people can reach you; everything else is scrubbed

This design means you can safely point advisors, partners, or collaborators to the showcase without worrying about your private reasoning or personal information leaking.

---

## Next steps

1. **Identify your audience.** Who will you share the password with? (Co-founders, advisors, potential partners, investors?)
2. **Choose which ideas to publish.** Pick 2-3 for FEATURED and 3-5 for EXPLORED.
3. **Scrub your token list.** Add every name, employer, and codename you want hidden.
4. **Build and test locally.** Run `npm run build`, then `npm run dev`, and verify the output.
5. **Deploy.** Push to GitHub and deploy to Vercel (or your host).
6. **Share the password.** Give people the URL and password, and let them explore.
