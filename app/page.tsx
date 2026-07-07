// This page is a Server Component — all of the handbook's content renders on the
// server and ships as HTML with zero client JS. Only the Sidebar (theme toggle +
// active-link tracking) is a Client Component. That is the RSC model in action.
import Link from "next/link";
import { Sidebar } from "@/components/handbook/Sidebar";
import { Callout, Pill } from "@/components/handbook/ui";
import { Foundations } from "@/components/handbook/content/Foundations";
import { DataRendering } from "@/components/handbook/content/DataRendering";
import { BuildingBlocks } from "@/components/handbook/content/BuildingBlocks";
import { Advanced } from "@/components/handbook/content/Advanced";
import { Questions } from "@/components/handbook/content/Questions";

export default function Home() {
  return (
    <div className="layout">
      <Sidebar />

      <main>
        <div className="wrap">
          <header className="hero" id="intro">
            <div className="eyebrow">Complete Study Handbook</div>
            <h1>Next.js, from first principles to interview-ready</h1>
            <p className="lede">
              Every core Next.js concept explained plainly, then reinforced with real code and the
              questions interviewers actually ask. Written against <strong>Next.js 16</strong> and{" "}
              <strong>React 19</strong> — Server Components, the App Router, Server Actions, Cache
              Components — with the <strong>Pages Router</strong> taught side by side, because real
              codebases (and interviewers) use both.
            </p>
          </header>

          <section>
            <h3>How to read this</h3>
            <p>
              The handbook runs in four arcs: <strong>Foundations</strong> (Modules 1–5) get you
              routing and rendering; <strong>Data &amp; rendering</strong> (6–10) cover fetching,
              caching, and streaming; <strong>Building blocks</strong> (11–14) add mutations, APIs,
              metadata, and styling; <strong>Advanced</strong> (15–16) close with optimization,
              proxy, auth, and deployment. The final section is a bank of{" "}
              <strong>100+ interview questions</strong> with collapsible answers — read the question,
              try to answer it, then expand to check.
            </p>
            <Callout label="Two routers, one guide">
              <p>
                Next.js is mid-transition. This guide teaches the <strong>App Router</strong> as the
                modern default <Pill variant="app">app</Pill> but shows the{" "}
                <strong>Pages Router</strong> <Pill variant="pages">pages</Pill> too — because
                knowing the difference is itself a strong interview signal. This very site is a
                Next.js app running <strong>both routers at once</strong>; open{" "}
                <Link className="inline" href="/demos">
                  the live demos
                </Link>{" "}
                to see each rendering strategy actually running.
              </p>
            </Callout>
          </section>

          <Foundations />
          <DataRendering />
          <BuildingBlocks />
          <Advanced />
          <Questions />

          <div className="footer">
            <p>
              Next.js Complete Handbook · built against Next.js 16 + React 19 · App Router as the
              modern default with the Pages Router taught alongside. Study by answering each question
              before expanding it, then open the{" "}
              <Link href="/demos">live demos</Link> to watch SSR, SSG, ISR, streaming, and Server
              Actions run in both routers.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
