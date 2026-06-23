import Link from "next/link";

export function RelatedChips({ related }: { related: { slug: string; name: string }[] }) {
  if (!related.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {related.map((r) => (
        <Link
          key={r.slug}
          href={`/idea/${r.slug}`}
          className="rounded-full border border-border px-3 py-1 text-xs text-muted transition hover:border-foreground/30 hover:text-foreground"
        >
          {r.name}
        </Link>
      ))}
    </div>
  );
}
