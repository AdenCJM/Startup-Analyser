// ──────────────────────────────────────────────────────────────────────────
// CURATION CONFIG — this is the one file you edit to control the showcase.
// The build reads ONLY these slugs from ../ideas; nothing else is published.
// Slugs are the folder names under ../ideas (e.g. "order-flow").
// ──────────────────────────────────────────────────────────────────────────

// Who is presenting these ideas. Edit freely.
export const FOUNDER = {
  name: "Your Name",
  positioning: "What I'm exploring right now",
  contact: "you@example.com",
};

// FEATURED: your strongest ideas, shown in the main grid. Order = display order.
// Keep this tight (5–8). Lead with the ones you'd actually build.
// These slugs must match folder names under ../ideas.
export const FEATURED = ["order-flow", "permit-pilot"];

// EXPLORED: a hand-picked few killed/parked ideas for the collapsed
// "Explored & rejected" section. Signals rigour (you kill bad ideas).
// Leave [] to hide the section entirely.
export const EXPLORED = ["habit-mirror"];
