"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const NAV: { group: string; links: { id: string; num: string; label: string }[] }[] = [
  {
    group: "Foundations",
    links: [
      { id: "intro", num: "0", label: "How to use this" },
      { id: "m1", num: "1", label: "Fundamentals" },
      { id: "m2", num: "2", label: "Pages Router" },
      { id: "m3", num: "3", label: "App Router" },
      { id: "m4", num: "4", label: "Navigation & Params" },
      { id: "m5", num: "5", label: "Server vs Client Components" },
    ],
  },
  {
    group: "Data & rendering",
    links: [
      { id: "m6", num: "6", label: "Data Fetching — Pages" },
      { id: "m7", num: "7", label: "Data Fetching — App" },
      { id: "m8", num: "8", label: "Rendering Strategies" },
      { id: "m9", num: "9", label: "Caching Model" },
      { id: "m10", num: "10", label: "Streaming & Suspense" },
    ],
  },
  {
    group: "Building blocks",
    links: [
      { id: "m11", num: "11", label: "Server Actions" },
      { id: "m12", num: "12", label: "Route Handlers & API" },
      { id: "m13", num: "13", label: "Metadata & SEO" },
      { id: "m14", num: "14", label: "Styling & Fonts" },
    ],
  },
  {
    group: "Advanced & interview",
    links: [
      { id: "m15", num: "15", label: "Optimization" },
      { id: "m16", num: "16", label: "Proxy, Auth & Deploy" },
      { id: "questions", num: "", label: "Popular Q&A (100+)" },
    ],
  },
];

export function Sidebar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = NAV.flatMap((g) => g.links.map((l) => l.id));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "0px 0px -72% 0px", threshold: 0 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="toc" aria-label="Table of contents">
      <div className="toc-brand">
        <span className="tri" aria-hidden>
          ▲
        </span>
        Next.js Handbook
      </div>
      <div className="toc-sub">Zero → Interview-Ready</div>

      {NAV.map((g) => (
        <div key={g.group}>
          <h4>{g.group}</h4>
          {g.links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? "active" : undefined}
            >
              {l.num ? <span className="num">{l.num}</span> : null}
              {l.label}
            </a>
          ))}
        </div>
      ))}

      <div className="toc-tools">
        <ThemeToggle />
        <Link className="toc-demos" href="/demos">
          → Live demos (both routers)
        </Link>
      </div>
    </nav>
  );
}
