import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Code } from "@/components/handbook/ui";

export const metadata: Metadata = { title: "Route Handler (App Router)" };

const CODE = `// app/api/app-hello/route.ts  →  GET /api/app-hello
import { NextResponse } from 'next/server'

export const dynamic = 'force-static'   // prerender to a static JSON file

export async function GET() {
  return NextResponse.json({ router: 'app', message: 'Hello, world!' })
}
// On a Node server, drop force-static and read request.nextUrl.searchParams
// to echo ?name=, making it dynamic.`;

export default function RouteHandlerDemo() {
  return (
    <main className="demo-shell">
      <Link href="/demos" className="demo-back">
        ← All demos
      </Link>
      <h1>
        Route Handler <span className="demo-badge app">app</span>
      </h1>
      <p className="demo-lede">
        A <code>route.ts</code> exports functions named for HTTP methods. Because this one is{" "}
        <code>force-static</code>, the static export bakes it into a JSON file that ships on GitHub
        Pages.
      </p>
      <Code filename="app/api/app-hello/route.ts" code={CODE} />
      <Callout label="It's really there">
        <p>
          The build generated a static <code>/api/app-hello</code> endpoint returning{" "}
          <code>{'{ "router": "app", "message": "Hello, world!", ... }'}</code>. On a Node server
          you&apos;d make it dynamic to read query params and run per request (Module 12).
        </p>
      </Callout>
    </main>
  );
}
