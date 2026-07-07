import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Streaming (App Router)" };

// On a server, `export const dynamic = "force-dynamic"` makes the shell ship
// immediately while this slow part streams in at request time. On a static
// export the Suspense structure is identical, but the slow component simply
// resolves during the build (no request-time streaming). Concept: Module 10.

// A deliberately slow Server Component. On a server the rest of the page ships
// immediately and this streams in when its "data" resolves.
async function SlowData() {
  await new Promise((r) => setTimeout(r, 2000)); // pretend this is a slow query
  const finishedAt = new Date().toISOString();
  return (
    <div className="stat">
      <span className="stat-label">Slow data resolved at</span>
      <span className="stat-value">{finishedAt}</span>
    </div>
  );
}

export default function StreamingDemo() {
  return (
    <main className="demo-shell">
      <Link href="/demos" className="demo-back">
        ← All demos
      </Link>
      <h1>
        Streaming + Suspense <span className="demo-badge app">app</span>
      </h1>
      <p className="demo-lede">
        The shell (this text) is sent instantly. The slow component below is wrapped in a{" "}
        <code>&lt;Suspense&gt;</code> boundary, so its fallback shows first and the real content
        <strong> streams in after ~2s</strong> — no blank page while you wait.
      </p>

      <Suspense fallback={<p className="note-inline">⏳ Streaming the slow part…</p>}>
        <SlowData />
      </Suspense>

      <p className="note-inline">
        A <code>loading.tsx</code> in this folder also provides an instant, whole-segment loading
        state on navigation (Next wraps the page in a Suspense boundary for you).
      </p>
    </main>
  );
}
