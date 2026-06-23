// Bespoke 5-segment market-opportunity meter (approved Variant B treatment).
// Each segment fills fractionally so 3.4/5 reads precisely. Accent green fill.

export function ScoreMeter({
  value,
  size = "sm",
}: {
  value: number;
  size?: "sm" | "lg";
}) {
  const segs = [0, 1, 2, 3, 4].map((i) => Math.max(0, Math.min(1, value - i)));
  const h = size === "lg" ? "h-2" : "h-1.5";
  const w = size === "lg" ? "w-7" : "w-5";
  return (
    <div
      className="flex items-center gap-2"
      role="img"
      aria-label={`Market opportunity ${value.toFixed(1)} of 5`}
    >
      <div className="flex gap-0.5" aria-hidden>
        {segs.map((f, i) => (
          <div key={i} className={`${h} ${w} overflow-hidden rounded-full bg-border`}>
            <div className="h-full rounded-full bg-accent" style={{ width: `${f * 100}%` }} />
          </div>
        ))}
      </div>
      <span className="font-mono text-xs tabular-nums text-foreground">
        {value.toFixed(1)}
      </span>
    </div>
  );
}
