"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      aria-label="Toggle light or dark theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-md border border-border px-2 py-1 text-xs text-muted transition hover:text-foreground"
    >
      {mounted ? (isDark ? "Light" : "Dark") : "Theme"}
    </button>
  );
}
