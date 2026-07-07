import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/handbook/ui";

export const metadata: Metadata = { title: "SSR (App Router)" };

// On a Node server you'd add `export const dynamic = "force-dynamic"` (or read
// cookies()/headers()) to render this per request. GitHub Pages is static-only,
// so here the timestamp is frozen at build time. The concept is in Module 8.

export default function SsrDemo() {
  const renderedAt = new Date().toISOString();

  return (
    <main className="demo-shell">
      <Link href="/demos" className="demo-back">
        ← All demos
      </Link>
      <h1>
        SSR — dynamic rendering <span className="demo-badge app">app</span>
      </h1>
      <p className="demo-lede">
        On a server, <code>export const dynamic = &quot;force-dynamic&quot;</code> renders this page
        fresh on every request (equivalent to the Pages Router&apos;s{" "}
        <code>getServerSideProps</code>). Reading <code>cookies()</code>/<code>headers()</code>{" "}
        does the same.
      </p>
      <div className="stat">
        <span className="stat-label">Rendered at</span>
        <span className="stat-value">{renderedAt}</span>
      </div>
      <Callout variant="warn" label="Static hosting note">
        <p>
          This is a static export on GitHub Pages, so the value above is{" "}
          <strong>frozen at build time</strong>. Deploy to a Node host (Vercel / <code>next start</code>)
          with <code>dynamic = &quot;force-dynamic&quot;</code> to see it change on every reload.
        </p>
      </Callout>
    </main>
  );
}
