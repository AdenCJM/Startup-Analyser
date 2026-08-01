// Server-driven filters: a native GET form. Zero client JS, zero
// idea data on the client — only static enum options and the current query
// string reach the browser, so the dataset can never ship in a client chunk.

import Link from "next/link";

const QUADRANTS: [string, string][] = [
  ["BUILD", "Build"],
  ["BUILD_BORDERLINE", "Build (borderline)"],
  ["OPPORTUNITY_GAP", "Opportunity gap"],
  ["LIFESTYLE", "Lifestyle"],
  ["KILL", "Kill"],
  ["STRATEGY", "Strategy"],
];
const STAGES = ["Backlog", "Validating", "Watching", "Parked", "Active"];

export type FilterValues = {
  stage?: string;
  quadrant?: string;
  sort?: string;
  q?: string;
};

const selectCls =
  "rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm text-foreground outline-none focus:border-accent";

export function FilterBar({ current }: { current: FilterValues }) {
  const hasFilters = Boolean(current.stage || current.quadrant || current.q || current.sort);
  return (
    <form
      action="/"
      method="get"
      className="flex flex-wrap items-center gap-2 sm:justify-end"
      role="search"
      aria-label="Filter ideas"
    >
      <input
        type="search"
        name="q"
        defaultValue={current.q ?? ""}
        placeholder="Search ideas…"
        aria-label="Search ideas"
        className="min-w-0 flex-1 rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground outline-none focus:border-accent sm:flex-none sm:w-44"
      />
      <select name="stage" defaultValue={current.stage ?? ""} aria-label="Filter by stage" className={selectCls}>
        <option value="">All stages</option>
        {STAGES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select name="quadrant" defaultValue={current.quadrant ?? ""} aria-label="Filter by quadrant" className={selectCls}>
        <option value="">All quadrants</option>
        {QUADRANTS.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
      <select name="sort" defaultValue={current.sort ?? "market"} aria-label="Sort by" className={selectCls}>
        <option value="market">Market score</option>
        <option value="name">Name</option>
      </select>
      <button
        type="submit"
        className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg transition hover:opacity-90"
      >
        Apply
      </button>
      {hasFilters && (
        <Link href="/" className="px-2 py-1.5 text-sm text-muted hover:text-foreground">
          Reset
        </Link>
      )}
    </form>
  );
}
