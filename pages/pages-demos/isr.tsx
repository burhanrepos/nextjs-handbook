import Head from "next/head";
import Link from "next/link";
import type { GetStaticProps } from "next";

type Props = { generatedAt: string };

// ISR in the Pages Router = getStaticProps + `revalidate`. ISR needs a server to
// regenerate, so it's dropped for the static export (GitHub Pages) and this is
// plain SSG. On a Node host you'd add `revalidate: 10` to the return below.
export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: { generatedAt: new Date().toISOString() },
    // revalidate: 10,  // ← add this on a Node server for ISR (unsupported by export)
  };
};

export default function PagesIsr({ generatedAt }: Props) {
  return (
    <main className="demo-shell">
      <Head>
        <title>ISR (Pages Router)</title>
      </Head>
      <Link href="/pages-demos" className="demo-back">
        ← Pages demos
      </Link>
      <h1>
        ISR — revalidate <span className="demo-badge pages">pages</span>
      </h1>
      <p className="demo-lede">
        <code>getStaticProps</code> returning <code>revalidate: 10</code>. Static speed, refreshed
        every 10s in production.
      </p>
      <div className="stat">
        <span className="stat-label">Generated at</span>
        <span className="stat-value">{generatedAt}</span>
      </div>
    </main>
  );
}
