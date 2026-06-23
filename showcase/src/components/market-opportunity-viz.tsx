import type { MarketOpportunity } from "@/content/types";
import { QuadrantBadge } from "./badges";

function DimBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2" role="img" aria-label={`${score} of 5`}>
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-border">
        <div className="h-full rounded-full bg-accent" style={{ width: `${(score / 5) * 100}%` }} />
      </div>
      <span className="w-3 font-mono text-xs tabular-nums text-muted">{score}</span>
    </div>
  );
}

export function MarketOpportunityViz({ market }: { market: MarketOpportunity }) {
  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-base font-semibold text-foreground">Market opportunity</h2>
        <div className="flex items-center gap-3">
          <QuadrantBadge quadrant={market.quadrant} />
          <span className="font-mono text-sm tabular-nums text-foreground">
            {market.composite.toFixed(1)}/5
          </span>
        </div>
      </div>
      <ul className="mt-4 space-y-3">
        {market.dimensions.map((d) => (
          <li key={d.dimension} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-foreground">{d.dimension}</span>
              <DimBar score={d.score} />
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted">{d.justification}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
