import { Module, Callout, Pill, Table, Code } from "../ui";

export function BuildingBlocks() {
  return (
    <>
      {/* ===================== MODULE 11 ===================== */}
      <Module
        id="m11"
        num="11"
        kind="Building blocks"
        title={<>Server Actions &amp; Mutations <Pill variant="app">app</Pill> <Pill variant="modern">modern</Pill></>}
      >
        <p>
          A <strong>Server Action</strong> is an <code>async</code> function marked{" "}
          <code>&quot;use server&quot;</code> that runs on the server but can be called from the
          client. It&apos;s how you mutate data in the App Router without hand-writing an API endpoint
          and a fetch call. Behind the scenes Next.js does a single <code>POST</code> round-trip and
          can return updated UI and data together.
        </p>

        <h3>Define an action</h3>
        <Code
          filename="app/actions.ts"
          code={`'use server'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')   // always re-check auth

  const title = formData.get('title') as string
  await db.post.create({ data: { title, authorId: session.user.id } })

  revalidatePath('/posts')   // refresh cached data
  redirect('/posts')         // navigate after the mutation
}`}
        />

        <h3>Call it from a form (progressive enhancement)</h3>
        <Code
          code={`import { createPost } from './actions'

// Works even before JS loads — the form posts to the action.
export function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  )
}`}
        />

        <h3>React 19 hooks for actions</h3>
        <Table
          head={["Hook", "Gives you"]}
          rows={[
            [<code>useActionState</code>, "Wire an action to state + pending flag; return validation errors from the action."],
            [<code>useFormStatus</code>, <>Read the parent form&apos;s <code>pending</code> state (for a submit button spinner).</>],
            [<code>useOptimistic</code>, "Show an optimistic UI update instantly, reconcile when the action resolves."],
          ]}
        />
        <Code
          filename="app/like.tsx"
          code={`'use client'
import { useActionState } from 'react'
import { save } from './actions'

export function Form() {
  const [state, formAction, pending] = useActionState(save, { error: null })
  return (
    <form action={formAction}>
      <input name="email" />
      {state.error && <p role="alert">{state.error}</p>}
      <button disabled={pending}>{pending ? 'Saving…' : 'Save'}</button>
    </form>
  )
}`}
        />
        <Callout variant="warn" label="Security">
          Server Actions are reachable by a direct <code>POST</code> — not just through your UI.{" "}
          <strong>Authenticate and authorize inside every action</strong>, and validate input. Never
          rely on the client to have hidden a button.
        </Callout>
        <Callout variant="iv" label="Interview">
          <p>
            <em>&quot;Server Action vs Route Handler for a mutation?&quot;</em> Server Actions are the
            ergonomic default for form/mutation flows inside your own app (progressive enhancement,
            typed, single round-trip). Reach for a Route Handler when you need a stable public HTTP
            endpoint (webhooks, third-party clients, non-form verbs).
          </p>
        </Callout>
      </Module>

      {/* ===================== MODULE 12 ===================== */}
      <Module id="m12" num="12" kind="Building blocks" title="Route Handlers & API Routes">
        <p>
          Both routers can expose HTTP endpoints. The App Router calls them{" "}
          <strong>Route Handlers</strong> (<code>route.ts</code>); the Pages Router calls them{" "}
          <strong>API Routes</strong> (<code>pages/api/*</code>). You don&apos;t need both — pick per
          route.
        </p>

        <h3>App Router — Route Handlers <Pill variant="app">app</Pill></h3>
        <Code
          filename="app/api/products/route.ts"
          code={`import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')
  const products = await db.product.search(q)
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()
  const created = await db.product.create({ data: body })
  return NextResponse.json(created, { status: 201 })
}`}
        />
        <ul>
          <li>Export functions named for the HTTP method: <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>PATCH</code>, <code>DELETE</code>, <code>HEAD</code>, <code>OPTIONS</code>.</li>
          <li>Built on the Web <code>Request</code>/<code>Response</code> APIs, extended by <code>NextRequest</code>/<code>NextResponse</code>.</li>
          <li><strong>Not cached by default.</strong> Opt a <code>GET</code> into static caching with <code>export const dynamic = &apos;force-static&apos;</code>.</li>
          <li>A <code>route.ts</code> and a <code>page.tsx</code> <strong>cannot</strong> live in the same segment.</li>
        </ul>

        <h3>Pages Router — API Routes <Pill variant="pages">pages</Pill></h3>
        <Code
          filename="pages/api/products.ts"
          code={`import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const products = await db.product.findMany()
    return res.status(200).json(products)
  }
  res.setHeader('Allow', ['GET'])
  res.status(405).end('Method Not Allowed')
}`}
        />
        <Table
          head={["", "Route Handler (app)", "API Route (pages)"]}
          rows={[
            ["Location", <code>app/**/route.ts</code>, <code>pages/api/*.ts</code>],
            ["Signature", "one function per HTTP method", <>single <code>handler(req, res)</code></>],
            ["Primitives", "Web Request / Response", "Node req / res"],
            ["Runtime", <>Node or <code>edge</code></>, "Node (or edge config)"],
          ]}
        />
        <Callout variant="tip" label="When do you even need one?">
          In the App Router, a lot of what used to be API routes is now just Server Components
          (reads) and Server Actions (writes). Use Route Handlers for <em>public</em> APIs,
          webhooks, OAuth callbacks, streaming responses, and anything a non-browser client calls.
        </Callout>
      </Module>

      {/* ===================== MODULE 13 ===================== */}
      <Module
        id="m13"
        num="13"
        kind="Building blocks"
        title={<>Metadata, SEO &amp; Layouts <Pill variant="app">app</Pill></>}
      >
        <p>
          Next.js manages <code>&lt;head&gt;</code> for you. In the App Router you export a metadata
          object (or a function); in the Pages Router you render <code>&lt;Head&gt;</code>.
        </p>

        <h3>Static &amp; dynamic metadata</h3>
        <Code
          filename="app/blog/[slug]/page.tsx"
          code={`import type { Metadata } from 'next'

// Static:
export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest posts',
}

// Dynamic — build the metadata from data (and route params):
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const post = await getPost((await params).slug)
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.cover] },
    alternates: { canonical: \`/blog/\${post.slug}\` },
  }
}`}
        />
        <p>
          A <code>title.template</code> in a parent layout (e.g. <code>&quot;%s · Site&quot;</code>)
          wraps child titles — this handbook&apos;s root layout does exactly that.
        </p>

        <h3>File-based metadata</h3>
        <Table
          head={["File in app/", "Produces"]}
          rows={[
            [<code>favicon.ico</code> , "The favicon"],
            [<code>opengraph-image.tsx</code>, <>A generated OG image (via <code>ImageResponse</code>)</>],
            [<code>sitemap.ts</code>, <code>/sitemap.xml</code>],
            [<code>robots.ts</code>, <code>/robots.txt</code>],
            [<code>manifest.ts</code>, "PWA web manifest"],
          ]}
        />

        <h3>Pages Router head <Pill variant="pages">pages</Pill></h3>
        <Code
          code={`import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Latest posts" />
      </Head>
      <main>…</main>
    </>
  )
}`}
        />

        <h3>Layouts persist</h3>
        <p>
          An App Router <code>layout.tsx</code> wraps its segment and <strong>does not re-render or
          lose state</strong> when you navigate between its children — a nav bar, sidebar, or audio
          player keeps running. Nest layouts to build a shell; use <code>template.tsx</code> instead
          when you <em>want</em> a fresh mount each navigation.
        </p>
        <Table
          head={["Concern", "App Router", "Pages Router"]}
          rows={[
            ["Head tags", <>metadata / <code>generateMetadata</code></>, <><code>next/head</code></>],
            ["Shared shell", <>nested <code>layout.tsx</code> (persists)</>, <><code>_app.tsx</code> + per-page layout fn</>],
            ["OG images", "file convention / ImageResponse", "static file or 3rd-party"],
          ]}
        />
      </Module>

      {/* ===================== MODULE 14 ===================== */}
      <Module id="m14" num="14" kind="Building blocks" title="Styling & Fonts">
        <p>Next.js supports every common styling approach out of the box.</p>
        <Table
          head={["Approach", "How", "Notes"]}
          rows={[
            ["CSS Modules", <code>Button.module.css</code>, "Locally scoped by default; works in Server Components."],
            ["Global CSS", <>import in <code>app/layout.tsx</code> (or <code>_app.tsx</code>)</>, "Only allowed at the root — this file's globals.css."],
            ["Tailwind CSS", "PostCSS plugin", "Very common; utility classes, zero runtime."],
            ["Sass", <><code>.scss</code> + <code>sass</code></>, "Built-in support."],
            ["CSS-in-JS", "styled-components, etc.", <>Needs a client boundary / config in RSC — prefer zero-runtime.</>],
          ]}
        />
        <Code
          filename="CSS Modules"
          code={`/* button.module.css */
.primary { background: #0070f3; color: white; }

// button.tsx
import styles from './button.module.css'
export function Button() {
  return <button className={styles.primary}>Go</button>
}`}
        />

        <h3>Fonts with <code>next/font</code> <Pill variant="modern">modern</Pill></h3>
        <p>
          <code>next/font</code> self-hosts fonts at build time: no request to Google at runtime, no
          layout shift (it reserves space), and it exposes a CSS variable. This handbook loads Geist
          this way.
        </p>
        <Code
          filename="app/layout.tsx"
          code={`import { Geist } from 'next/font/google'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export default function RootLayout({ children }) {
  return <html className={geist.variable}><body>{children}</body></html>
}
// then in CSS:  font-family: var(--font-geist-sans);`}
        />
        <Callout label="Global CSS rule">
          Global stylesheets can only be imported from the <strong>root layout</strong> (App Router)
          or <strong><code>_app.tsx</code></strong> (Pages Router). Everywhere else, use CSS Modules
          or Tailwind so styles stay scoped.
        </Callout>
      </Module>
    </>
  );
}
