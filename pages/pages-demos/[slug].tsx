import Head from "next/head";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";

type Props = { slug: string; builtAt: string };

// getStaticPaths tells Next which dynamic paths to prerender at build time.
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: "demo-item" } }, { params: { slug: "another-item" } }],
    // Static export must prerender every path, so fallback is false here. On a
    // Node server, `fallback: 'blocking'` renders unknown slugs on first hit.
    fallback: false,
  };
};

// getStaticProps receives the matched params and returns props for the page.
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug ?? "");
  return { props: { slug, builtAt: new Date().toISOString() } };
};

export default function PagesDynamic({ slug, builtAt }: Props) {
  return (
    <main className="demo-shell">
      <Head>
        <title>{`Dynamic: ${slug} (Pages Router)`}</title>
      </Head>
      <Link href="/pages-demos" className="demo-back">
        ← Pages demos
      </Link>
      <h1>
        Dynamic route <span className="demo-badge pages">pages</span>
      </h1>
      <p className="demo-lede">
        This is <code>pages/pages-demos/[slug].tsx</code>, prerendered via{" "}
        <code>getStaticPaths</code>. The App Router equivalent is{" "}
        <code>generateStaticParams</code>.
      </p>
      <div className="stat">
        <span className="stat-label">params.slug</span>
        <span className="stat-value">{slug}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Built at</span>
        <span className="stat-value">{builtAt}</span>
      </div>
      <p className="note-inline">
        These slugs are prerendered at build time (<code>fallback: false</code> for static export).
        On a Node server, <code>fallback: &quot;blocking&quot;</code> would render unknown slugs like{" "}
        <code>/pages-demos/anything-else</code> on first request, then cache them.
      </p>
    </main>
  );
}
