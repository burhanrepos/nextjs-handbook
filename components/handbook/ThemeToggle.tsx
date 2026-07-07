"use client";

// A Client Component: "use client" opts this subtree into the browser so it can
// use state, effects, and event handlers. Everything else in the handbook stays
// a Server Component.
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Read the resolved theme after mount. Rendering `null` first keeps the
  // server HTML and the first client render identical (no hydration mismatch).
  useEffect(() => {
    const stored = localStorage.getItem("nh-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      );
    }
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("nh-theme", next);
    } catch {
      /* ignore private-mode storage errors */
    }
  }

  const label = theme === "dark" ? "Light mode" : theme === "light" ? "Dark mode" : "Theme";
  const icon = theme === "dark" ? "☀" : "☾";

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle color theme">
      <span aria-hidden>{icon}</span> {label}
    </button>
  );
}
