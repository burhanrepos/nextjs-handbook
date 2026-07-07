import { Module, Callout, Pill, Table, Code, Ascii } from "../ui";

export function Foundations() {
  return (
    <>
      {/* ===================== MODULE 1 ===================== */}
      <Module id="m1" num="01" kind="Foundations" title="Fundamentals: what Next.js is">
        <p>
          Next.js is a <strong>React framework for full-stack web apps</strong>. React gives you
          components; Next.js adds everything around them — a router, server rendering, data
          fetching, bundling, image/font optimization, and a way to run server code. You write
          React components and Next.js decides where each one runs (server or browser) and how the
          HTML gets to the user.
        </p>

        <h3>The two routers</h3>
        <p>
          Next.js has <strong>two routers that can coexist in one project</strong>. Knowing both is
          the single most useful thing for interviews, because real codebases are mid-migration.
        </p>
        <Table
          head={["Router", "Folder", "Model", "Status"]}
          rows={[
            [
              <>App Router <Pill variant="app">app</Pill></>,
              <code>app/</code>,
              "React Server Components, layouts, streaming, Server Actions",
              <><Pill variant="modern">modern</Pill> default since v13.4</>,
            ],
            [
              <>Pages Router <Pill variant="pages">pages</Pill></>,
              <code>pages/</code>,
              "Client components + getStaticProps / getServerSideProps",
              <><Pill variant="legacy">legacy</Pill> still fully supported</>,
            ],
          ]}
        />
        <Callout label="How they mix">
          <p>
            When both exist, <code>app/</code> wins for any conflicting route. You can migrate one
            route at a time. This project ships <strong>both</strong> so you can compare them live —
            see <code>/demos</code>.
          </p>
        </Callout>

        <h3>Project anatomy</h3>
        <Code
          filename="project structure"
          code={`my-app/
├─ app/                # App Router (this project's primary router)
│  ├─ layout.tsx       # root layout — wraps every route, renders <html>/<body>
│  ├─ page.tsx         # the "/" route
│  └─ globals.css
├─ pages/              # Pages Router (coexists; used here for demos)
│  └─ api/             # Pages-style API routes
├─ public/             # static files served at / (images, robots.txt)
├─ proxy.ts            # runs before requests (was "middleware" pre-v16)
├─ next.config.ts      # framework config
└─ package.json        # scripts: dev / build / start / lint`}
        />
        <ul>
          <li>
            <strong>Files are routes.</strong> A file's path in <code>app/</code> or{" "}
            <code>pages/</code> becomes a URL. No route table to maintain.
          </li>
          <li>
            <strong>Server-first.</strong> In the App Router, components render on the server by
            default and ship zero JavaScript unless you opt into the client.
          </li>
          <li>
            <strong>Scripts:</strong> <code>next dev</code> (dev server, Turbopack by default in
            v16), <code>next build</code> (production build), <code>next start</code> (serve the
            build), <code>next lint</code>.
          </li>
        </ul>
        <Callout variant="tip" label="Mental model">
          The framework&apos;s job is to answer one question for every component: <em>when and where
          does this run — build time, request time on the server, or in the browser?</em> Almost
          every Next.js concept is a different answer to that question.
        </Callout>
      </Module>

      {/* ===================== MODULE 2 ===================== */}
      <Module
        id="m2"
        num="02"
        kind="Foundations"
        title={<>The Pages Router <Pill variant="pages">pages</Pill></>}
      >
        <p>
          The Pages Router is the original, file-based router. Every file in <code>pages/</code>{" "}
          exporting a React component becomes a route. It&apos;s simple, battle-tested, and still
          powers a huge number of production apps.
        </p>

        <h3>File-based routing</h3>
        <Table
          head={["File", "Route", "Kind"]}
          rows={[
            [<code>pages/index.tsx</code>, <code>/</code>, "static"],
            [<code>pages/about.tsx</code>, <code>/about</code>, "static"],
            [<code>pages/blog/[slug].tsx</code>, <code>/blog/:slug</code>, "dynamic segment"],
            [<code>pages/shop/[...all].tsx</code>, <code>/shop/a/b/c</code>, "catch-all"],
            [<code>pages/docs/[[...slug]].tsx</code>, <><code>/docs</code> and below</>, "optional catch-all"],
            [<code>pages/api/hello.ts</code>, <code>/api/hello</code>, "API route"],
          ]}
        />

        <h3>Special files</h3>
        <Table
          head={["File", "Purpose"]}
          rows={[
            [<code>_app.tsx</code>, "Wraps every page. The one place to import global CSS, keep a persistent layout, and add providers."],
            [<code>_document.tsx</code>, <>Customizes the server-rendered <code>&lt;html&gt;</code>/<code>&lt;body&gt;</code>. Runs only on the server, once.</>],
            [<><code>404.tsx</code> / <code>500.tsx</code></>, "Custom not-found and server-error pages."],
            [<code>_error.tsx</code>, "Fallback for runtime errors (advanced)."],
          ]}
        />
        <Code
          filename="pages/blog/[slug].tsx"
          code={`import { useRouter } from 'next/router'

export default function Post() {
  const router = useRouter()
  const { slug } = router.query   // read the dynamic segment on the client
  return <h1>Post: {slug}</h1>
}`}
        />
        <Code
          filename="pages/_app.tsx"
          code={`import type { AppProps } from 'next/app'
import '@/app/globals.css'          // global CSS is only allowed here in the Pages Router

export default function App({ Component, pageProps }: AppProps) {
  // Persist layout/providers across navigations by rendering them here
  return <Component {...pageProps} />
}`}
        />
        <Callout label="Where code runs">
          A page component in <code>pages/</code> runs on the <strong>server for the initial HTML</strong>{" "}
          and then <strong>hydrates and re-renders in the browser</strong>. Data functions like{" "}
          <code>getServerSideProps</code> (Module 6) run <em>only</em> on the server and are stripped
          from the client bundle.
        </Callout>
      </Module>

      {/* ===================== MODULE 3 ===================== */}
      <Module
        id="m3"
        num="03"
        kind="Foundations"
        title={<>The App Router <Pill variant="app">app</Pill> <Pill variant="modern">modern</Pill></>}
      >
        <p>
          In the App Router, <strong>folders define routes</strong> and a set of{" "}
          <strong>special filenames</strong> define what each segment renders. A folder only becomes
          a public URL when it contains a <code>page.tsx</code> (a page) or <code>route.ts</code> (an
          API handler) — so you can freely colocate components, tests, and helpers inside{" "}
          <code>app/</code> without exposing them.
        </p>

        <h3>Special files</h3>
        <Table
          head={["File", "Renders / does"]}
          rows={[
            [<code>page.tsx</code>, "The UI for a route, and what makes the segment publicly routable."],
            [<code>layout.tsx</code>, "Shared shell that wraps children and persists across navigation (state is kept)."],
            [<code>loading.tsx</code>, "Instant loading UI — Next auto-wraps the segment in a <Suspense> boundary."],
            [<code>error.tsx</code>, <>Error boundary for the segment (a Client Component; gets <code>reset()</code>).</>],
            [<code>not-found.tsx</code>, <>UI shown by <code>notFound()</code> or unmatched routes.</>],
            [<code>route.ts</code>, "An API endpoint for the segment (Route Handler)."],
            [<code>template.tsx</code>, "Like layout, but re-mounts on every navigation (fresh state)."],
            [<code>default.tsx</code>, "Fallback for unmatched parallel-route slots."],
          ]}
        />

        <h3>Folder = segment</h3>
        <Code
          filename="app/ structure"
          code={`app/
├─ layout.tsx              // root layout (required): <html> + <body>
├─ page.tsx                // "/"
├─ dashboard/
│  ├─ layout.tsx           // wraps everything under /dashboard
│  ├─ page.tsx             // "/dashboard"
│  └─ settings/page.tsx    // "/dashboard/settings"
├─ blog/[slug]/page.tsx    // "/blog/:slug" (dynamic)
├─ shop/[...all]/page.tsx  // catch-all
├─ (marketing)/about/page.tsx  // route group: (marketing) is NOT in the URL
└─ @modal/…                // parallel route slot`}
        />
        <p>Advanced segment conventions you should be able to name:</p>
        <ul>
          <li><strong>Dynamic</strong> <code>[id]</code>, <strong>catch-all</strong> <code>[...slug]</code>, <strong>optional catch-all</strong> <code>[[...slug]]</code>.</li>
          <li><strong>Route groups</strong> <code>(group)</code> — organize files or apply a shared layout without adding a URL segment.</li>
          <li><strong>Parallel routes</strong> <code>@slot</code> — render multiple pages into one layout (dashboards, modals).</li>
          <li><strong>Intercepting routes</strong> <code>(.)</code>, <code>(..)</code> — show a route&apos;s content in the current layout (e.g. a photo modal over a feed).</li>
        </ul>
        <Code
          filename="app/layout.tsx — the root layout"
          code={`export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>   {/* nested layouts and pages render here */}
    </html>
  )
}`}
        />
        <Callout variant="tip" label="Pages vs App, in one line">
          Pages Router = <em>one file per route</em>. App Router = <em>a folder per route with named
          slots</em> (page, layout, loading, error…) so shared UI and loading states are declarative
          and colocated.
        </Callout>
      </Module>

      {/* ===================== MODULE 4 ===================== */}
      <Module id="m4" num="04" kind="Foundations" title="Navigation & Route Params">
        <p>
          Client-side navigation swaps content without a full page reload while keeping shared
          layouts mounted. Use <code>&lt;Link&gt;</code> for links — it prefetches routes in the
          viewport so navigation feels instant.
        </p>
        <Code
          code={`import Link from 'next/link'

<Link href="/dashboard">Dashboard</Link>
<Link href={\`/blog/\${post.slug}\`} prefetch>Read</Link>
// Never use a plain <a href> for internal links — it triggers a full reload.`}
        />

        <h3>The APIs differ by router</h3>
        <Table
          head={["Need", "App Router", "Pages Router"]}
          rows={[
            [<>Router object</>, <><code>useRouter()</code> from <code>next/navigation</code></>, <><code>useRouter()</code> from <code>next/router</code></>],
            ["Current path", <code>usePathname()</code>, <code>router.pathname</code>],
            ["Query string", <code>useSearchParams()</code>, <code>router.query</code>],
            ["Dynamic params (client)", <code>useParams()</code>, <code>router.query</code>],
            ["Navigate", <code>router.push(&apos;/x&apos;)</code>, <code>router.push(&apos;/x&apos;)</code>],
            ["Redirect (server)", <><code>redirect()</code> / <code>permanentRedirect()</code></>, "return { redirect } from data fn"],
          ]}
        />

        <h3>Reading params on the server (App Router)</h3>
        <p>
          In the App Router, <code>params</code> and <code>searchParams</code> are{" "}
          <strong>Promises</strong> — you <code>await</code> them. This changed in Next.js 15 and is a
          very common gotcha.
        </p>
        <Code
          filename="app/blog/[slug]/page.tsx"
          code={`export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = await params            // await — it's a Promise now
  const { sort } = await searchParams
  return <h1>{slug} (sorted by {sort ?? 'newest'})</h1>
}`}
        />
        <Callout variant="warn" label="Gotcha">
          <code>params</code>/<code>searchParams</code>, and also <code>cookies()</code>,{" "}
          <code>headers()</code>, and <code>draftMode()</code>, are <strong>async</strong> in the App
          Router. Forgetting <code>await</code> is the most common Next 15/16 migration error.
        </Callout>
      </Module>

      {/* ===================== MODULE 5 ===================== */}
      <Module
        id="m5"
        num="05"
        kind="Foundations"
        title={<>Server &amp; Client Components <Pill variant="app">app</Pill></>}
      >
        <p>
          The App Router&apos;s headline feature is <strong>React Server Components (RSC)</strong>.
          Every component is a <strong>Server Component by default</strong>. You opt individual
          subtrees into the browser with the <code>&quot;use client&quot;</code> directive.
        </p>

        <Table
          head={["", "Server Component (default)", "Client Component (\"use client\")"]}
          rows={[
            ["Runs", "On the server (build or request)", "On the server for HTML, then in the browser"],
            ["Ships JS to browser", "No", "Yes (it hydrates)"],
            ["Can be async / await data", "Yes", "No (use hooks/libraries)"],
            ["State, effects, events", "No", <>Yes — <code>useState</code>, <code>useEffect</code>, <code>onClick</code></>],
            ["Browser APIs (window, localStorage)", "No", "Yes"],
            ["Access secrets / DB directly", "Yes", "No — never ship secrets to the client"],
          ]}
        />

        <h3>The composition rules</h3>
        <ul>
          <li>A <strong>Server Component can render a Client Component</strong>, and pass it serializable props.</li>
          <li>A <strong>Client Component cannot import a Server Component</strong> — but it can receive one as <code>children</code> (or any prop). This &quot;pass server down as children&quot; pattern keeps client bundles small.</li>
          <li><code>&quot;use client&quot;</code> marks a <strong>boundary</strong>: everything imported by that file (and below) becomes part of the client bundle.</li>
          <li>Props crossing the server→client boundary must be <strong>serializable</strong> (no functions except Server Actions, no class instances).</li>
        </ul>
        <Code
          code={`// app/page.tsx — Server Component (no directive)
import Counter from './counter'        // a Client Component
import { db } from '@/lib/db'

export default async function Page() {
  const items = await db.items.findMany()   // runs on the server; safe
  return (
    <section>
      <h1>{items.length} items</h1>
      <Counter start={items.length} />      {/* island of interactivity */}
    </section>
  )
}`}
        />
        <Code
          filename="app/counter.tsx"
          code={`'use client'
import { useState } from 'react'

export default function Counter({ start }: { start: number }) {
  const [n, setN] = useState(start)
  return <button onClick={() => setN(n + 1)}>Clicked {n}</button>
}`}
        />
        <Callout variant="iv" label="Interview">
          <p>
            <em>&quot;Why keep <code>&quot;use client&quot;</code> at the leaves?&quot;</em> Because
            the directive is a boundary — everything below it hydrates. Pushing it down to small
            interactive &quot;islands&quot; (a counter, a menu, this handbook&apos;s theme toggle)
            keeps most of the tree server-rendered and off the client, shrinking JS and speeding up
            load. This handbook does exactly that: the content is all Server Components; only the
            sidebar/theme toggle are client.
          </p>
        </Callout>
      </Module>
    </>
  );
}
