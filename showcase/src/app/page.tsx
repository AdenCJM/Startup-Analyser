import { redirect } from "next/navigation";
import Link from "next/link";
import { dataset } from "@/content/dataset";
import { hasValidSession } from "@/lib/session";
import { SiteHeader } from "@/components/site-header";
import { StatStrip } from "@/components/stat-strip";
import { FilterBar, type FilterValues } from "@/components/filter-bar";
import { IdeaCard } from "@/components/idea-card";
import { RejectedAccordion } from "@/components/rejected-accordion";
import type { Idea } from "@/content/types";

// Never statically rendered or cached — always behind the auth gate.
export const dynamic = "force-dynamic";

function applyFilters(ideas: Idea[], f: FilterValues): Idea[] {
  let out = ideas;
  if (f.stage) out = out.filter((i) => i.stage === f.stage);
  if (f.quadrant) out = out.filter((i) => i.market?.quadrant === f.quadrant);
  if (f.q) {
    const q = f.q.toLowerCase();
    out = out.filter((i) => `${i.name} ${i.tagline} ${i.oneLiner}`.toLowerCase().includes(q));
  }
  out = [...out];
  if (f.sort === "name") out.sort((a, b) => a.name.localeCompare(b.name));
  else out.sort((a, b) => (b.market?.composite ?? 0) - (a.market?.composite ?? 0));
  return out;
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<FilterValues>;
}) {
  // Belt and braces: re-verify the session here, not just in the proxy.
  if (!(await hasValidSession())) redirect("/login");

  const sp = await searchParams;
  const featured = applyFilters(dataset.featured, sp);

  return (
    <>
      <SiteHeader founder={dataset.founder} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <StatStrip data={dataset} />

        <div className="mt-6">
          <FilterBar current={sp} />
        </div>

        {featured.length === 0 ? (
          <div className="mt-12 rounded-lg border border-dashed border-border px-6 py-16 text-center">
            <p className="font-serif text-lg text-foreground">No ideas match those filters.</p>
            <p className="mt-1 text-sm text-muted">Try widening the search, or</p>
            <Link href="/" className="mt-3 inline-block text-sm font-medium text-accent hover:underline">
              clear the filters
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((idea) => (
              <IdeaCard key={idea.slug} idea={idea} />
            ))}
          </div>
        )}

        <RejectedAccordion ideas={dataset.explored} />
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-4 text-xs text-muted">
          Private preview — please don’t share without asking.
        </div>
      </footer>
    </>
  );
}
