import Link from "next/link";
import type { Idea } from "@/content/types";
import { StageBadge, QuadrantBadge } from "./badges";
import { ScoreMeter } from "./score-meter";

export function IdeaCard({ idea, muted = false }: { idea: Idea; muted?: boolean }) {
  return (
    <Link
      href={`/idea/${idea.slug}`}
      className={`group flex flex-col rounded-lg border border-border bg-surface p-5 transition hover:border-foreground/30 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
        muted ? "opacity-80 hover:opacity-100" : ""
      }`}
    >
      <h3 className="font-serif text-lg font-semibold leading-snug text-foreground">
        {idea.name}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-muted">{idea.oneLiner}</p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <StageBadge stage={idea.stage} />
        {idea.market && <QuadrantBadge quadrant={idea.market.quadrant} />}
      </div>

      {idea.market && (
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="text-[11px] uppercase tracking-wide text-muted">
            Market opportunity
          </span>
          <ScoreMeter value={idea.market.composite} />
        </div>
      )}
    </Link>
  );
}
