import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { dataset, findIdea } from "@/content/dataset";
import { hasValidSession } from "@/lib/session";
import { SiteHeader } from "@/components/site-header";
import { StageBadge } from "@/components/badges";
import { MarketOpportunityViz } from "@/components/market-opportunity-viz";
import { SectionRenderer } from "@/components/section-renderer";
import { RelatedChips } from "@/components/related-chips";

export const dynamic = "force-dynamic";

export default async function IdeaDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!(await hasValidSession())) redirect("/login");
  const { slug } = await params;
  const idea = findIdea(slug);
  if (!idea) notFound();

  const related = idea.relatedSlugs
    .map((s) => findIdea(s))
    .filter((i): i is NonNullable<typeof i> => Boolean(i))
    .map((i) => ({ slug: i.slug, name: i.name }));

  return (
    <>
      <SiteHeader founder={dataset.founder} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-8">
        <Link href="/" className="text-sm text-muted transition hover:text-foreground">
          ← All ideas
        </Link>

        <header className="mt-4">
          <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground">
            {idea.name}
          </h1>
          <p className="mt-1.5 text-lg leading-relaxed text-muted">{idea.tagline}</p>
          <div className="mt-3">
            <StageBadge stage={idea.stage} />
          </div>
        </header>

        {idea.market && (
          <div className="mt-8">
            <MarketOpportunityViz market={idea.market} />
          </div>
        )}

        <div className="mt-8 space-y-8">
          {idea.sections.map((s) => (
            <section key={s.key}>
              <h2 className="font-serif text-lg font-semibold text-foreground">{s.heading}</h2>
              <div className="mt-2">
                <SectionRenderer markdown={s.markdown} />
              </div>
            </section>
          ))}
        </div>

        {related.length > 0 && (
          <section className="mt-10 border-t border-border pt-6">
            <h2 className="text-sm font-medium text-muted">Related ideas</h2>
            <RelatedChips related={related} />
          </section>
        )}
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-4 text-xs text-muted">
          Private preview — please don’t share without asking.
        </div>
      </footer>
    </>
  );
}
