import Head from "next/head";
import Link from "next/link";

const DEMOS = [
  { href: "/pages-demos/ssr", title: "SSR — getServerSideProps", desc: "Data fetched per request on the server." },
  { href: "/pages-demos/ssg", title: "SSG — getStaticProps", desc: "Data fetched once at build time." },
  { href: "/pages-demos/isr", title: "ISR — revalidate", desc: "getStaticProps + revalidate: 10." },
  { href: "/pages-demos/demo-item", title: "Dynamic — getStaticPaths", desc: "Prerendered [slug] route." },
];

export default function PagesDemosIndex() {
  return (
    <main className="demo-shell">
      <Head>
        <title>Pages Router demos · Next.js Handbook</title>
      </Head>
      <Link href="/demos" className="demo-back">
        ← All demos
      </Link>
      <h1>
        Pages Router demos <span className="demo-badge pages">pages</span>
      </h1>
      <p className="demo-lede">
        The classic <code>pages/</code> router, running in the same app as the App Router handbook.
        Data comes from the exported <code>getServerSideProps</code> / <code>getStaticProps</code>{" "}
        functions — the Pages Router equivalents of everything in Modules 6–8.
      </p>
      <div className="demo-grid">
        {DEMOS.map((d) => (
          <Link key={d.href} href={d.href} className="demo-card">
            <div className="dc-title">
              <span className="demo-badge pages">pages</span> {d.title}
            </div>
            <div className="dc-desc">{d.desc}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
