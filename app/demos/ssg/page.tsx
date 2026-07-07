import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "SSG (App Router)" };

// force-static → rendered ONCE at build time. In a production build the timestamp
// below is frozen at the moment of `next build`. (In `next dev` it re-renders on
// each request, so you'll see it change — that's dev-only behavior.)
export const dynamic = "force-static";

export default function SsgDemo() {
  const builtAt = new Date().toISOString();

  return (
    <main className="demo-shell">
      <Link href="/demos" className="demo-back">
        ← All demos
      </Link>
      <h1>
        SSG — static rendering <span className="demo-badge app">app</span>
      </h1>
      <p className="demo-lede">
        <code>export const dynamic = &quot;force-static&quot;</code>. This page is prerendered to
        static HTML at build time and served from cache — the fastest, cheapest option.
      </p>
      <div className="stat">
        <span className="stat-label">Rendered at (build time in prod)</span>
        <span className="stat-value">{builtAt}</span>
      </div>
      <p className="note-inline">
        In production this value is frozen (run <code>next build &amp;&amp; next start</code> and
        reload — it won&apos;t change). In <code>next dev</code> it updates every reload because dev
        always re-renders. App Router equivalent of <code>getStaticProps</code>.
      </p>
    </main>
  );
}
