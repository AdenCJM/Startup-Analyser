// Server-only access to the generated, scrubbed dataset.
//
// The `server-only` import is the AUTHORITATIVE client-bundle leak guard
// (Eng E2): if any "use client" component imports this module (transitively),
// `next build` fails. That keeps the full idea corpus out of /_next/static
// chunks, which is the one hole that would defeat the password gate.

import "server-only";
import data from "./ideas.json";
import type { Dataset, Idea } from "./types";

export const dataset = data as Dataset;

export function allIdeas(): Idea[] {
  return [...dataset.featured, ...dataset.explored];
}

export function findIdea(slug: string): Idea | undefined {
  return allIdeas().find((i) => i.slug === slug);
}
