import type { Metadata } from "next";
import Link from "next/link";

// generateStaticParams prerenders these slugs at build time (SSG for dynamic
// routes). Other slugs still work — they render on demand (dynamicParams = true,
// the default) and then get cached.
export async function generateStaticParams() {
  return [{ slug: "hello-world" }, { slug: "app-router" }, { slug: "server-components" }];
}

// params is a Promise in the App Router (Next 15+) — you must await it.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Param: ${slug}` };
}

export default async function ParamsDemo({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="demo-shell">
      <Link href="/demos" className="demo-back">
        ← All demos
      </Link>
      <h1>
        Dynamic route params <span className="demo-badge app">app</span>
      </h1>
      <p className="demo-lede">
        This is <code>app/demos/params/[slug]/page.tsx</code>. The <code>[slug]</code> segment is
        read with <code>await params</code>.
      </p>
      <div className="stat">
        <span className="stat-label">params.slug</span>
        <span className="stat-value">{slug}</span>
      </div>
      <p className="note-inline">
        Try another value in the URL, e.g. <code>/demos/params/anything-you-type</code>. The three
        slugs returned by <code>generateStaticParams</code> are prerendered; the rest render on
        demand.
      </p>
    </main>
  );
}
