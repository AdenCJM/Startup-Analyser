import Link from "next/link";
import type { Founder } from "@/content/types";
import { ThemeToggle } from "./theme-toggle";
import { LogoutButton } from "./logout-button";

export function SiteHeader({ founder }: { founder: Founder }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="min-w-0">
          <p className="font-serif text-base font-semibold text-foreground">{founder.name}</p>
          <p className="truncate text-sm text-muted">{founder.positioning}</p>
        </Link>
        <div className="flex shrink-0 items-center gap-3">
          {founder.contact && (
            <a
              href={`mailto:${founder.contact}`}
              className="hidden text-xs text-muted transition hover:text-foreground sm:inline"
            >
              {founder.contact}
            </a>
          )}
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
