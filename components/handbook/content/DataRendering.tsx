import { Module, Callout, Pill, Table, Code, Ascii } from "../ui";

export function DataRendering() {
  return (
    <>
      {/* ===================== MODULE 6 ===================== */}
      <Module
        id="m6"
        num="06"
        kind="Data & rendering"
        title={<>Data Fetching — Pages Router <Pill variant="pages">pages</Pill></>}
      >
        <p>
          In the Pages Router you fetch data in special <strong>exported functions</strong> that run
          only on the server. Next.js calls them, then passes the result to your page as props. Which
          one you export decides how the page renders.
        </p>
        <Table
          head={["Function", "Runs", "Produces"]}
          rows={[
            [<code>getStaticProps</code>, "At build time (and on revalidate)", "SSG / ISR — static HTML"],
            [<code>getServerSideProps</code>, "On every request", "SSR — fresh HTML per request"],
            [<code>getStaticPaths</code>, "At build time", "Which dynamic paths to prerender"],
            [<>client fetch (SWR/effect)</>, "In the browser", "CSR — data after load"],
          ]}
        />

        <h4>getStaticProps — build once, serve static <Pill variant="modern">fast</Pill></h4>
        <Code
          filename="pages/products.tsx"
          code={`export async function getStaticProps() {
  const products = await fetch('https://api.shop.com/products').then(r => r.json())
  return {
    props: { products },
    revalidate: 60,   // ISR: rebuild this page at most once every 60s
  }
}

export default function Products({ products }) {
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}`}
        />

        <h4>getStaticPaths — prerender dynamic routes</h4>
        <Code
          filename="pages/blog/[slug].tsx"
          code={`export async function getStaticPaths() {
  const posts = await getPosts()
  return {
    paths: posts.map(p => ({ params: { slug: p.slug } })),
    fallback: 'blocking',  // paths not built yet are server-rendered on first hit
  }
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug)
  return post ? { props: { post } } : { notFound: true }
}`}
        />

        <h4>getServerSideProps — render per request</h4>
        <Code
          filename="pages/dashboard.tsx"
          code={`export async function getServerSideProps(context) {
  const { req, query } = context
  const session = await getSession(req)
  if (!session) return { redirect: { destination: '/login', permanent: false } }
  return { props: { user: session.user } }   // runs on the server every request
}`}
        />
        <Callout label="Return shapes">
          All three can return <code>notFound: true</code> (→ 404) or a{" "}
          <code>redirect</code> object. <code>getStaticProps</code> adds <code>revalidate</code> for
          ISR. These functions never reach the browser — safe for secrets and DB calls.
        </Callout>
        <Callout variant="warn" label="Legacy">
          <code>getInitialProps</code> (in a page or <code>_app</code>) is the old, pre-v9 data
          method. It disables automatic static optimization and runs on both server and client —
          avoid it in new code.
        </Callout>
      </Module>

      {/* ===================== MODULE 7 ===================== */}
      <Module
        id="m7"
        num="07"
        kind="Data & rendering"
        title={<>Data Fetching — App Router <Pill variant="app">app</Pill> <Pill variant="modern">modern</Pill></>}
      >
        <p>
          In the App Router there are <strong>no special data functions</strong>. A Server Component
          is just an <code>async</code> function — you <code>await</code> your data right where you
          need it, using <code>fetch</code>, an ORM, or any async I/O. No prop drilling, no separate
          lifecycle.
        </p>
        <Code
          filename="app/products/page.tsx"
          code={`export default async function Products() {
  const products = await fetch('https://api.shop.com/products').then(r => r.json())
  // or: const products = await db.product.findMany()
  return <ul>{products.map((p) => <li key={p.id}>{p.name}</li>)}</ul>
}`}
        />

        <Callout variant="warn" label="The #1 change from Next 14">
          Since Next 15, <code>fetch</code> is <strong>not cached by default</strong> (it used to be).
          Each call hits the network at request time unless you explicitly cache it. This surprises
          everyone migrating.
        </Callout>

        <h3>Caching options</h3>
        <p>Two models, depending on config (both covered in Module 9):</p>
        <Code
          code={`// Previous model — per-fetch options:
await fetch(url, { cache: 'force-cache' })              // cache indefinitely
await fetch(url, { next: { revalidate: 3600 } })        // time-based (ISR-like)
await fetch(url, { next: { tags: ['products'] } })      // tag for on-demand revalidation
await fetch(url, { cache: 'no-store' })                 // always fresh (explicit)

// Cache Components model (Next 16, opt-in) — 'use cache':
async function getProducts() {
  'use cache'
  cacheLife('hours')
  return db.product.findMany()
}`}
        />

        <h3>Request memoization</h3>
        <p>
          Identical <code>fetch</code> calls during a single render are automatically{" "}
          <strong>deduped</strong>. So you can call <code>getUser()</code> in three components and it
          runs once — fetch data where you need it instead of lifting it up.
        </p>

        <h3>Parallel vs sequential</h3>
        <Code
          code={`// Sequential (waterfall) — b waits for a:
const a = await getA()
const b = await getB(a.id)

// Parallel — kick both off, then await together:
const [x, y] = await Promise.all([getX(), getY()])`}
        />

        <h3>Fetching in Client Components</h3>
        <p>
          Client Components can&apos;t be <code>async</code>. Fetch data on the server and stream a
          promise down with React&apos;s <code>use()</code> (Module 10), or use a library like SWR /
          TanStack Query.
        </p>

        <h3>Mapping from the Pages Router</h3>
        <Table
          head={["Pages Router", "App Router equivalent"]}
          rows={[
            [<code>getStaticProps</code>, <>cached fetch / <code>&apos;use cache&apos;</code> in an async component</>],
            [<code>getServerSideProps</code>, <>uncached <code>fetch</code> / dynamic APIs (<code>cookies()</code>)</>],
            [<code>getStaticPaths</code>, <code>generateStaticParams</code>],
            ["client SWR/effect", <>same (SWR / TanStack) or <code>use()</code></>],
          ]}
        />
      </Module>

      {/* ===================== MODULE 8 ===================== */}
      <Module id="m8" num="08" kind="Data & rendering" title="Rendering Strategies">
        <p>
          &quot;How and when is the HTML built?&quot; is the question every rendering strategy
          answers. Next.js supports all of them, and in the App Router it often picks{" "}
          <strong>automatically</strong> based on what your code does.
        </p>
        <Table
          head={["Strategy", "HTML built", "Good for"]}
          rows={[
            ["CSR", "In the browser after JS loads", "Highly interactive, private dashboards"],
            ["SSR (dynamic)", "On the server, per request", "Personalized / always-fresh pages, SEO"],
            ["SSG (static)", "At build time", "Content that rarely changes; fastest + cheapest"],
            ["ISR", "At build, then re-generated on a schedule", "Mostly-static content that updates periodically"],
            ["PPR", "Static shell at build + dynamic holes streamed", "Pages that are mostly static with a few dynamic bits"],
          ]}
        />

        <h3>App Router: static vs dynamic is inferred</h3>
        <p>A route is rendered <strong>statically</strong> until it does something that needs the request. It becomes <strong>dynamic</strong> when it:</p>
        <ul>
          <li>reads <code>cookies()</code>, <code>headers()</code>, <code>draftMode()</code>, or <code>searchParams</code>;</li>
          <li>uses an uncached <code>fetch</code> / <code>connection()</code>;</li>
          <li>sets <code>export const dynamic = &apos;force-dynamic&apos;</code> or <code>revalidate = 0</code>.</li>
        </ul>
        <Code
          code={`// Force a rendering mode with route segment config:
export const dynamic = 'force-static'    // always static
export const dynamic = 'force-dynamic'   // always render per request
export const revalidate = 60             // ISR: revalidate every 60s`}
        />

        <h3>Dynamic SSG: generateStaticParams</h3>
        <Code
          filename="app/blog/[slug]/page.tsx"
          code={`export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((p) => ({ slug: p.slug }))   // prerender one page per slug
}

// dynamicParams = true (default) → unknown slugs render on-demand & cache.
// dynamicParams = false → unknown slugs 404.
export const dynamicParams = true`}
        />

        <h3>Partial Prerendering (PPR)</h3>
        <p>
          PPR serves a <strong>static shell instantly</strong> and streams in the dynamic parts. With{" "}
          <strong>Cache Components</strong> enabled (Next 16), this is the default: anything marked{" "}
          <code>&apos;use cache&apos;</code> or purely static goes in the shell; anything wrapped in{" "}
          <code>&lt;Suspense&gt;</code> streams at request time.
        </p>
        <Ascii>{`  ┌─────────────────────────────┐   static shell (build time)
  │  nav · header · footer      │   ← sent instantly
  │  ┌───────────────────────┐  │
  │  │  <Suspense> cart ...  │  │   ← streamed at request time
  │  └───────────────────────┘  │
  └─────────────────────────────┘`}</Ascii>
        <Table
          head={["Strategy", "App Router", "Pages Router"]}
          rows={[
            ["SSG", "default / force-static / generateStaticParams", <code>getStaticProps</code>],
            ["ISR", <code>revalidate = N</code>, <>getStaticProps + <code>revalidate</code></>],
            ["SSR", "dynamic APIs / force-dynamic", <code>getServerSideProps</code>],
            ["CSR", "Client Component + SWR", "useEffect / SWR"],
            ["PPR", "static shell + Suspense (Cache Components)", "— (not available)"],
          ]}
        />
      </Module>

      {/* ===================== MODULE 9 ===================== */}
      <Module id="m9" num="09" kind="Data & rendering" title="The Caching Model">
        <p>
          Caching is where Next.js is deepest — and where the defaults have changed the most. There
          are two models. Know both; interviewers probe this.
        </p>

        <h3>Previous model — four cache layers</h3>
        <Table
          head={["Cache", "Where", "What it stores", "Invalidate"]}
          rows={[
            ["Request Memoization", "Server, per render", "Duplicate fetches in one request", "Automatic (per request)"],
            ["Data Cache", "Server, persistent", "fetch/ORM results across requests", <><code>revalidate</code>, <code>revalidateTag</code>, <code>revalidatePath</code></>],
            ["Full Route Cache", "Server, build", "Rendered HTML + RSC payload of static routes", "Redeploy or data revalidation"],
            ["Router Cache", "Client, in-memory", "Visited route segments (soft nav)", <>time / <code>router.refresh()</code></>],
          ]}
        />
        <Code
          code={`import { revalidatePath, revalidateTag } from 'next/cache'

// On-demand revalidation (e.g. inside a Server Action after a write):
revalidateTag('products')      // any fetch tagged 'products' becomes stale
revalidatePath('/products')    // re-render this route

// Cache a non-fetch async function (previous model):
import { unstable_cache } from 'next/cache'
const getUser = unstable_cache(async (id) => db.user.find(id), ['user'], { revalidate: 60 })`}
        />

        <h3>Cache Components model <Pill variant="modern">Next 16</Pill></h3>
        <p>
          Opt in with <code>cacheComponents: true</code> in <code>next.config.ts</code>. Then caching
          is explicit and component-oriented:
        </p>
        <Code
          filename="next.config.ts + usage"
          code={`// next.config.ts
const nextConfig = { cacheComponents: true }

// mark a function or component cacheable:
import { cacheLife, cacheTag, updateTag } from 'next/cache'

async function getProducts() {
  'use cache'
  cacheLife('hours')          // named profile: seconds/minutes/hours/days/max
  cacheTag('products')        // tag for targeted invalidation
  return db.product.findMany()
}
// after a mutation: updateTag('products')`}
        />
        <ul>
          <li><strong><code>&apos;use cache&apos;</code></strong> — cache a function, component, or whole file&apos;s exports. Arguments become the cache key.</li>
          <li><strong><code>connection()</code></strong> — opt a component into request time for non-deterministic values (<code>Math.random</code>, <code>Date.now</code>).</li>
          <li>Uncached data must sit inside <code>&lt;Suspense&gt;</code>, or you get a build-time error — this is what makes PPR safe.</li>
        </ul>

        <h3>Route segment config (either model)</h3>
        <Code
          code={`export const dynamic = 'auto' | 'force-dynamic' | 'force-static' | 'error'
export const revalidate = false | 0 | number
export const fetchCache = 'auto' | 'force-cache' | 'force-no-store'
export const runtime = 'nodejs' | 'edge'`}
        />
        <Callout variant="iv" label="Interview">
          <p>
            <em>&quot;Why did Next make fetch uncached by default?&quot;</em> The old &quot;cached by
            default&quot; behavior surprised people with stale data and hard-to-debug caching.
            Uncached-by-default is predictable: you see fresh data, and you <em>opt in</em> to caching
            explicitly (<code>force-cache</code>, <code>revalidate</code>, or{" "}
            <code>&apos;use cache&apos;</code>) where it actually helps.
          </p>
        </Callout>
      </Module>

      {/* ===================== MODULE 10 ===================== */}
      <Module
        id="m10"
        num="10"
        kind="Data & rendering"
        title={<>Streaming &amp; Suspense <Pill variant="app">app</Pill></>}
      >
        <p>
          Streaming lets the server send HTML in <strong>chunks</strong> as it&apos;s ready, instead
          of blocking the whole page on the slowest query. The user sees the shell immediately, and
          slow parts fill in.
        </p>

        <h3>Two ways to stream</h3>
        <p>
          <strong>1. <code>loading.tsx</code></strong> — drop it in a segment folder and Next
          automatically wraps that segment&apos;s <code>page</code> in a <code>&lt;Suspense&gt;</code>{" "}
          with your loading UI as the fallback. Instant loading state on navigation, for free.
        </p>
        <Code
          filename="app/blog/loading.tsx"
          code={`export default function Loading() {
  return <PostsSkeleton />   // shown instantly while blog/page.tsx renders
}`}
        />
        <p>
          <strong>2. <code>&lt;Suspense&gt;</code></strong> — wrap just the slow component so the rest
          of the page ships immediately.
        </p>
        <Code
          filename="app/page.tsx"
          code={`import { Suspense } from 'react'

async function LatestPosts() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json())
  return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>
}

export default function Page() {
  return (
    <>
      <h1>Blog</h1>{/* in the shell, instant */}
      <Suspense fallback={<p>Loading posts…</p>}>
        <LatestPosts />{/* streams in when the fetch resolves */}
      </Suspense>
    </>
  )
}`}
        />

        <h3>Streaming a promise to a Client Component</h3>
        <p>
          Start the fetch on the server, <strong>don&apos;t await it</strong>, pass the promise down,
          and read it on the client with <code>use()</code>.
        </p>
        <Code
          code={`// Server Component
export default function Page() {
  const posts = getPosts()                 // no await — pass the promise
  return <Suspense fallback={<Spinner />}><Posts posts={posts} /></Suspense>
}

// 'use client'
import { use } from 'react'
function Posts({ posts }: { posts: Promise<Post[]> }) {
  const all = use(posts)                    // suspends until resolved
  return <ul>{all.map((p) => <li key={p.id}>{p.title}</li>)}</ul>
}`}
        />
        <Callout variant="tip" label="Design good loading states">
          Prefer skeletons that mirror the final layout over a bare spinner — they reduce perceived
          latency and layout shift. Streaming + PPR is how you get a fast first paint <em>and</em>{" "}
          fresh data. See the live <code>/demos/streaming</code> route.
        </Callout>
      </Module>
    </>
  );
}
