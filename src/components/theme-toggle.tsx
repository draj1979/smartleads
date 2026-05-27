"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch — render a stable placeholder until mounted.
  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      data-event="theme_toggle"
      className="w-9 h-9 rounded-full border border-rule bg-paper-card text-ink-soft hover:text-cyan hover:border-cyan/40 transition flex items-center justify-center"
    >
      {/* Both rendered, CSS-toggled, so no flash + no layout shift */}
      <Sun className={`w-[15px] h-[15px] ${isDark ? "hidden" : "block"}`} />
      <Moon className={`w-[15px] h-[15px] ${isDark ? "block" : "hidden"}`} />
    </button>
  );
}
