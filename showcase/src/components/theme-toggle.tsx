"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribeToNothing = () => () => {};
const getMountedSnapshot = () => true;
const getServerMountedSnapshot = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeToNothing,
    getMountedSnapshot,
    getServerMountedSnapshot
  );
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
