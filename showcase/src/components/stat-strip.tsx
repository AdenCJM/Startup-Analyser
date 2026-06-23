import type { Dataset } from "@/content/types";

export function StatStrip({ data }: { data: Dataset }) {
  const all = data.featured;
  const builds = all.filter(
    (i) => i.market && (i.market.quadrant === "BUILD" || i.market.quadrant === "BUILD_BORDERLINE"),
  ).length;
  const watching = all.filter((i) => i.stage === "Watching").length;
  const scores = all.filter((i) => i.market).map((i) => i.market!.composite);
  const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

  const stats: [string, string][] = [
    [String(all.length), "ideas featured"],
    [String(builds), "in the build quadrant"],
    [String(watching), "high-market watch"],
    [avg.toFixed(1), "avg market score"],
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-muted">
      {stats.map(([n, l], i) => (
        <span key={l} className="flex items-center gap-3">
          <span>
            <span className="font-serif text-base font-semibold text-foreground">{n}</span> {l}
          </span>
          {i < stats.length - 1 && (
            <span className="text-border" aria-hidden>
              ·
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
