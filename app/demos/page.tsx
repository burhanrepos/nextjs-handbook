import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Live Demos" };

const APP_DEMOS = [
  { href: "/demos/ssr", title: "SSR — dynamic rendering", desc: "force-dynamic; new HTML every request." },
  { href: "/demos/ssg", title: "SSG — static rendering", desc: "force-static; rendered once at build." },
  { href: "/demos/isr", title: "ISR — revalidate", desc: "revalidate = 10; refreshes on a schedule." },
  { href: "/demos/streaming", title: "Streaming + Suspense", desc: "Shell first, slow part streams in." },
  { href: "/demos/params/hello-world", title: "Dynamic params", desc: "await params + generateStaticParams." },
  { href: "/demos/actions", title: "Server Action", desc: "'use server' form with useActionState." },
  { href: "/demos/route-handler", title: "Route Handler", desc: "route.ts → a static /api/app-hello JSON file." },
];

const PAGES_DEMOS = [
  { href: "/pages-demos", title: "Pages Router overview", desc: "Index of the classic-router demos." },
  { href: "/pages-demos/ssr", title: "SSR — getServerSideProps", desc: "Per-request data function." },
  { href: "/pages-demos/ssg", title: "SSG — getStaticProps", desc: "Build-time data function." },
  { href: "/pages-demos/isr", title: "ISR — revalidate", desc: "getStaticProps + revalidate." },
  { href: "/pages-demos/demo-item", title: "Dynamic — getStaticPaths", desc: "Prerendered dynamic route." },
];

export default function DemosIndex() {
  return (
    <main className="demo-shell">
      <Link href="/" className="demo-back">
        ← Back to the handbook
      </Link>
      <h1>Live demos — both routers</h1>
      <p className="demo-lede">
        Every rendering strategy from the handbook, running for real in this one Next.js app. The{" "}
        <span className="demo-badge app">app router</span> demos live in <code>app/demos/*</code>;
        the <span className="demo-badge pages">pages router</span> demos live in{" "}
        <code>pages/pages-demos/*</code>. Reload a page and watch which timestamps change — that
        tells you when its HTML was built.
      </p>

      <h3>
        App Router <span className="demo-badge app">app</span>
      </h3>
      <div className="demo-grid">
        {APP_DEMOS.map((d) => (
          <Link key={d.href} href={d.href} className="demo-card">
            <div className="dc-title">
              <span className="demo-badge app">app</span> {d.title}
            </div>
            <div className="dc-desc">{d.desc}</div>
          </Link>
        ))}
      </div>

      <h3>
        Pages Router <span className="demo-badge pages">pages</span>
      </h3>
      <div className="demo-grid">
        {PAGES_DEMOS.map((d) => (
          <Link key={d.href} href={d.href} className="demo-card">
            <div className="dc-title">
              <span className="demo-badge pages">pages</span> {d.title}
            </div>
            <div className="dc-desc">{d.desc}</div>
          </Link>
        ))}
      </div>

      <p className="note-inline">
        Tip: run <code>next build</code> to see Next label each route as ○ (Static), ƒ (Dynamic), or
        ● (SSG/ISR) in the build output.
      </p>
    </main>
  );
}
