import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/handbook/ui";

export const metadata: Metadata = { title: "ISR (App Router)" };

// On a server you'd add `export const revalidate = 10` for Incremental Static
// Regeneration. ISR needs a server to regenerate in the background, so it can't
// run on GitHub Pages — this page is plain static. Concept in Modules 8–9.

export default function IsrDemo() {
  const generatedAt = new Date().toISOString();

  return (
    <main className="demo-shell">
      <Link href="/demos" className="demo-back">
        ← All demos
      </Link>
      <h1>
        ISR — revalidate <span className="demo-badge app">app</span>
      </h1>
      <p className="demo-lede">
        <code>export const revalidate = 10</code> gives static speed with periodic freshness: the
        cached HTML is regenerated in the background at most once every 10 seconds. Equivalent to{" "}
        <code>getStaticProps</code> + <code>revalidate</code> in the Pages Router.
      </p>
      <div className="stat">
        <span className="stat-label">Generated at</span>
        <span className="stat-value">{generatedAt}</span>
      </div>
      <Callout variant="warn" label="Static hosting note">
        <p>
          ISR requires a server to regenerate pages, so it can&apos;t run on GitHub Pages — this
          value is frozen at build. Deploy to a Node host to see it refresh on a schedule.
        </p>
      </Callout>
    </main>
  );
}
