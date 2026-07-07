import Head from "next/head";
import Link from "next/link";
import type { GetStaticProps } from "next";

type Props = { builtAt: string };

// This demo is *about* getServerSideProps (per-request SSR). But GitHub Pages is
// static-only and export does not support getServerSideProps at all, so on this
// hosted site it uses getStaticProps instead. The real gSSP code is shown below.
export const getStaticProps: GetStaticProps<Props> = async () => {
  return { props: { builtAt: new Date().toISOString() } };
};

const GSSP_CODE = `export async function getServerSideProps(context) {
  const session = await getSession(context.req)   // runs on EVERY request
  if (!session) return { redirect: { destination: '/login', permanent: false } }
  return { props: { user: session.user } }
}`;

export default function PagesSsr({ builtAt }: Props) {
  return (
    <main className="demo-shell">
      <Head>
        <title>SSR (Pages Router)</title>
      </Head>
      <Link href="/pages-demos" className="demo-back">
        ← Pages demos
      </Link>
      <h1>
        SSR — getServerSideProps <span className="demo-badge pages">pages</span>
      </h1>
      <p className="demo-lede">
        On a server, <code>getServerSideProps</code> runs on every request. Static export
        can&apos;t run it, so this page falls back to <code>getStaticProps</code> (built once). Deploy
        to a Node host to see true per-request SSR.
      </p>
      <div className="stat">
        <span className="stat-label">Built at (static fallback)</span>
        <span className="stat-value">{builtAt}</span>
      </div>
      <pre style={{ marginTop: 18 }}>
        <span className="filename">the real getServerSideProps (needs a server)</span>
        <code>{GSSP_CODE}</code>
      </pre>
    </main>
  );
}
