import Head from "next/head";
import Link from "next/link";
import type { GetStaticProps } from "next";

type Props = { builtAt: string };

// getStaticProps runs at BUILD time (SSG). In production the returned value is
// baked into static HTML and never changes until the next build.
export const getStaticProps: GetStaticProps<Props> = async () => {
  return { props: { builtAt: new Date().toISOString() } };
};

export default function PagesSsg({ builtAt }: Props) {
  return (
    <main className="demo-shell">
      <Head>
        <title>SSG (Pages Router)</title>
      </Head>
      <Link href="/pages-demos" className="demo-back">
        ← Pages demos
      </Link>
      <h1>
        SSG — getStaticProps <span className="demo-badge pages">pages</span>
      </h1>
      <p className="demo-lede">
        Rendered once at build time and served static. The App Router counterpart is{" "}
        <code>force-static</code>.
      </p>
      <div className="stat">
        <span className="stat-label">Built at</span>
        <span className="stat-value">{builtAt}</span>
      </div>
      <p className="note-inline">
        Production: this is frozen at build time. Dev: it updates on reload because dev re-runs the
        data function.
      </p>
    </main>
  );
}
