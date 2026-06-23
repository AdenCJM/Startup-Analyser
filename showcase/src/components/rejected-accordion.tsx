import type { Idea } from "@/content/types";
import { IdeaCard } from "./idea-card";

export function RejectedAccordion({ ideas }: { ideas: Idea[] }) {
  if (!ideas.length) return null;
  return (
    <details className="group mt-12 rounded-lg border border-border">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3 text-sm font-medium text-muted transition hover:text-foreground [&::-webkit-details-marker]:hidden">
        <span>
          Explored &amp; rejected{" "}
          <span className="text-muted/70">({ideas.length})</span> — ideas I evaluated and set
          aside
        </span>
        <span className="ml-3 text-xs text-muted transition group-open:rotate-180" aria-hidden>
          ▾
        </span>
      </summary>
      <div className="grid gap-4 px-5 pb-5 sm:grid-cols-2 lg:grid-cols-3">
        {ideas.map((i) => (
          <IdeaCard key={i.slug} idea={i} muted />
        ))}
      </div>
    </details>
  );
}
