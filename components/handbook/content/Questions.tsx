import { QA, QGroup, Pill } from "../ui";

export function Questions() {
  return (
    <section className="module" id="questions">
      <div className="module-tag">
        <span className="mnum">Appendix</span>
        <span className="mkind">Interview Prep</span>
      </div>
      <h2>Popular Interview Questions &amp; Answers</h2>
      <p>
        Grouped by topic and ordered roughly junior → senior. Read the question, answer it aloud,
        then expand to check. Anything marked <Pill variant="modern">modern</Pill> is the current
        best practice; interviewers love when you can contrast it with the{" "}
        <Pill variant="legacy">legacy</Pill> or Pages Router approach.
      </p>

      {/* ---------------- Core concepts ---------------- */}
      <QGroup>Core concepts</QGroup>

      <QA q="What is Next.js and what does it add over React?">
        <p>
          Next.js is a full-stack <strong>React framework</strong>. React renders components; Next
          adds file-based routing, server rendering (SSR/SSG/ISR/PPR), data fetching, API endpoints,
          bundling, and built-in optimization for images, fonts, and scripts — so you focus on the
          product, not the plumbing.
        </p>
      </QA>
      <QA q="What are the two routers and how do they differ?">
        <p>
          The <strong>App Router</strong> (<code>app/</code>, modern default) is built on React
          Server Components with layouts, streaming, and Server Actions. The{" "}
          <strong>Pages Router</strong> (<code>pages/</code>, original) uses client components plus{" "}
          <code>getStaticProps</code>/<code>getServerSideProps</code>. They can coexist; the App
          Router wins on conflicting routes.
        </p>
      </QA>
      <QA q="Is Next.js a library or a framework?">
        <p>
          A <strong>framework</strong> — it&apos;s opinionated and provides routing, rendering, data,
          and API layers out of the box, unlike React (a UI library).
        </p>
      </QA>
      <QA q="How does file-based routing work?">
        <p>
          The file/folder path <em>is</em> the URL. In Pages, <code>pages/about.tsx</code> →{" "}
          <code>/about</code>. In App, a folder with a <code>page.tsx</code> becomes a route;{" "}
          <code>[param]</code> is dynamic, <code>[...all]</code> catch-all, <code>[[...all]]</code>{" "}
          optional catch-all.
        </p>
      </QA>
      <QA q="What does next dev, next build, next start do?">
        <p>
          <code>next dev</code> runs the dev server with hot reload (Turbopack by default in v16);{" "}
          <code>next build</code> produces the optimized production build (and reports per-route
          sizes/rendering); <code>next start</code> serves that build with a Node server.
        </p>
      </QA>
      <QA q="What is the public/ folder?">
        <p>
          Static assets served from the root. <code>public/robots.txt</code> is available at{" "}
          <code>/robots.txt</code>. Files here are served as-is (no processing) — good for favicons,
          static images, and verification files.
        </p>
      </QA>

      {/* ---------------- Routing: Pages vs App ---------------- */}
      <QGroup>Routing — Pages vs App</QGroup>

      <QA q="Compare the special files of each router.">
        <p>
          <strong>Pages:</strong> <code>_app.tsx</code> (wrap all pages, global CSS),{" "}
          <code>_document.tsx</code> (customize html/body), <code>404/500</code>.{" "}
          <strong>App:</strong> <code>layout.tsx</code>, <code>page.tsx</code>,{" "}
          <code>loading.tsx</code>, <code>error.tsx</code>, <code>not-found.tsx</code>,{" "}
          <code>route.ts</code>, <code>template.tsx</code>.
        </p>
      </QA>
      <QA q="What is a layout, and how is it different from a page?">
        <p>
          A <code>layout.tsx</code> is shared UI that wraps its segment&apos;s children and{" "}
          <strong>persists across navigation</strong> (state preserved, no re-render). A{" "}
          <code>page.tsx</code> is the unique UI for one route and is what makes the segment publicly
          routable.
        </p>
      </QA>
      <QA q="layout.tsx vs template.tsx?">
        <p>
          Both wrap children, but a <strong>layout persists</strong> across navigations (keeps
          state/DOM) while a <strong>template re-mounts</strong> on every navigation (fresh state,
          re-runs effects). Use a template when you need per-navigation resets or enter animations.
        </p>
      </QA>
      <QA q="What are route groups and when do you use them?">
        <p>
          A folder in parentheses like <code>(marketing)</code> organizes routes or applies a shared
          layout <strong>without adding a URL segment</strong>. Great for grouping{" "}
          <code>(auth)</code> pages under one layout, or splitting the app into multiple root
          layouts.
        </p>
      </QA>
      <QA q="What are parallel and intercepting routes?">
        <p>
          <strong>Parallel routes</strong> (<code>@slot</code>) render multiple pages into named
          slots of one layout (dashboards, modals shown alongside content).{" "}
          <strong>Intercepting routes</strong> (<code>(.)</code>, <code>(..)</code>) render another
          route&apos;s content within the current layout — the classic &quot;click a photo → modal,
          but the URL is shareable&quot; pattern.
        </p>
      </QA>
      <QA q="How do you create a dynamic route in each router?">
        <p>
          Pages: <code>pages/blog/[slug].tsx</code> + read <code>router.query.slug</code> (and{" "}
          <code>getStaticPaths</code> to prerender). App:{" "}
          <code>app/blog/[slug]/page.tsx</code> + <code>await params</code> (and{" "}
          <code>generateStaticParams</code>).
        </p>
      </QA>
      <QA q="How do you do a catch-all vs optional catch-all route?">
        <p>
          <code>[...slug]</code> matches <code>/a/b/c</code> (one or more segments).{" "}
          <code>[[...slug]]</code> also matches the <em>base</em> path with no segments (optional).
        </p>
      </QA>
      <QA q="Why use <Link> instead of <a> for internal navigation?">
        <p>
          <code>&lt;Link&gt;</code> does client-side navigation (no full reload), keeps shared
          layouts mounted, and <strong>prefetches</strong> routes in the viewport so transitions feel
          instant. A plain <code>&lt;a&gt;</code> triggers a full document reload.
        </p>
      </QA>
      <QA q="Which navigation hooks come from which package?">
        <p>
          App Router: <code>useRouter</code>, <code>usePathname</code>,{" "}
          <code>useSearchParams</code>, <code>useParams</code> from{" "}
          <code>next/navigation</code>. Pages Router: <code>useRouter</code> from{" "}
          <code>next/router</code> (with <code>router.query</code>, <code>router.pathname</code>).
          Mixing them up is a common error.
        </p>
      </QA>
      <QA q="How do you redirect from server code?">
        <p>
          App Router: call <code>redirect(&apos;/login&apos;)</code> or{" "}
          <code>permanentRedirect()</code> from <code>next/navigation</code> in a Server Component,
          Action, or Route Handler. Pages Router: return{" "}
          <code>{"{ redirect: { destination, permanent } }"}</code> from a data function. You can also
          configure static redirects in <code>next.config</code>.
        </p>
      </QA>
      <QA q="How do you show a 404 programmatically?">
        <p>
          App Router: call <code>notFound()</code> — it renders the nearest{" "}
          <code>not-found.tsx</code>. Pages Router: return <code>{"{ notFound: true }"}</code> from{" "}
          <code>getStaticProps</code>/<code>getServerSideProps</code>.
        </p>
      </QA>

      {/* ---------------- Server & Client Components ---------------- */}
      <QGroup>Server &amp; Client Components</QGroup>

      <QA q="What is a React Server Component?">
        <p>
          A component that runs <strong>only on the server</strong>, renders to HTML + an RSC
          payload, and ships <strong>no JavaScript</strong> to the browser. It can be{" "}
          <code>async</code>, fetch data, and access the database/secrets directly. It&apos;s the
          default in the App Router.
        </p>
      </QA>
      <QA q="What can't a Server Component do?">
        <p>
          Use state or effects (<code>useState</code>/<code>useEffect</code>), attach event handlers,
          or touch browser APIs (<code>window</code>, <code>localStorage</code>). Those require a
          Client Component.
        </p>
      </QA>
      <QA q={<>What does <code>&quot;use client&quot;</code> actually do?</>}>
        <p>
          It marks a <strong>boundary</strong>: that module and everything it imports become part of
          the client bundle and hydrate in the browser. It doesn&apos;t mean &quot;runs only on the
          client&quot; — client components still render to HTML on the server first.
        </p>
      </QA>
      <QA q="Can a Client Component import a Server Component?">
        <p>
          Not directly. But it can receive one as <code>children</code> (or any prop). The pattern
          &quot;render the Server Component in a parent and pass it down as{" "}
          <code>children</code>&quot; keeps server-only code out of the client bundle.
        </p>
      </QA>
      <QA q="What are the constraints on props across the server→client boundary?">
        <p>
          They must be <strong>serializable</strong> — plain objects, arrays, primitives, Dates,
          etc. You can&apos;t pass functions (except Server Actions), class instances, or symbols.
        </p>
      </QA>
      <QA q="Where should you put the 'use client' boundary?">
        <p>
          <strong>As low (leaf-ward) as possible.</strong> Wrap the small interactive island (a
          button, menu, chart), not the whole page — so most of the tree stays server-rendered and
          the JS bundle stays small.
        </p>
      </QA>
      <QA q="How do you use a Context provider with Server Components?">
        <p>
          Context needs a Client Component. Make a small <code>&quot;use client&quot;</code> provider
          component and render it in your root layout, passing Server-rendered{" "}
          <code>children</code> through it. The children stay server components.
        </p>
      </QA>
      <QA q="Do Server Components replace the need for an API layer?">
        <p>
          For your own app&apos;s reads, largely yes — a Server Component queries the DB directly. For
          writes, use Server Actions. You still want Route Handlers for public/third-party APIs,
          webhooks, and non-browser clients.
        </p>
      </QA>

      {/* ---------------- Data fetching ---------------- */}
      <QGroup>Data fetching</QGroup>

      <QA q={<>Explain <code>getStaticProps</code>, <code>getServerSideProps</code>, <code>getStaticPaths</code>.</>}>
        <p>
          Pages Router server-only functions. <code>getStaticProps</code> → build-time data (SSG),
          add <code>revalidate</code> for ISR. <code>getServerSideProps</code> → per-request data
          (SSR). <code>getStaticPaths</code> → which dynamic paths to prerender, with a{" "}
          <code>fallback</code> strategy.
        </p>
      </QA>
      <QA q="How do you fetch data in the App Router?">
        <p>
          Make the Server Component <code>async</code> and <code>await</code> your data (via{" "}
          <code>fetch</code> or an ORM) right where you use it. No special functions; identical
          fetches are deduped within a render.
        </p>
      </QA>
      <QA q="Is fetch cached by default in the App Router?">
        <p>
          <strong>No</strong> (since Next 15). Each <code>fetch</code> hits the network at request
          time unless you opt in with <code>cache: &apos;force-cache&apos;</code>,{" "}
          <code>next: {"{ revalidate }"}</code>, or the <code>&apos;use cache&apos;</code> directive.
          This reversed the old default and is a top migration gotcha.
        </p>
      </QA>
      <QA q="What is request memoization?">
        <p>
          Within a single render pass, Next automatically dedupes identical <code>fetch</code>{" "}
          calls, so calling <code>getUser()</code> in several components runs it once. It lets you
          fetch where you need data instead of prop-drilling.
        </p>
      </QA>
      <QA q="How do you avoid a data-fetching waterfall?">
        <p>
          Start independent requests in parallel with <code>Promise.all</code> instead of awaiting
          sequentially. Only chain when one request truly depends on another&apos;s result.
        </p>
      </QA>
      <QA q={<>How do you map <code>getStaticPaths</code> to the App Router?</>}>
        <p>
          Use <code>generateStaticParams</code> — it returns the list of param objects to prerender.{" "}
          <code>dynamicParams</code> controls whether unknown params render on-demand (default) or
          404.
        </p>
      </QA>
      <QA q="How do you fetch data in a Client Component?">
        <p>
          Client components can&apos;t be <code>async</code>. Either fetch on the server and stream a
          promise down with React&apos;s <code>use()</code>, or use a client data library like SWR or
          TanStack Query for caching/revalidation.
        </p>
      </QA>
      <QA q="How do you fetch on the client the old way, and why avoid it?">
        <p>
          <code>useEffect</code> + <code>fetch</code> works but causes waterfalls, no SSR data, manual
          loading/error/caching, and race conditions. Prefer server fetching or SWR/React Query which
          handle caching, dedupe, and revalidation.
        </p>
      </QA>
      <QA q="How do you pass data from a Server Component to a Client Component?">
        <p>
          As serializable props. For streaming, pass an unresolved <strong>promise</strong> and read
          it with <code>use()</code> inside a <code>&lt;Suspense&gt;</code> boundary on the client.
        </p>
      </QA>
      <QA q="How do you read cookies/headers when fetching?">
        <p>
          In the App Router, <code>await cookies()</code> and <code>await headers()</code> from{" "}
          <code>next/headers</code> (both async since Next 15). Reading them makes the route render
          dynamically.
        </p>
      </QA>

      {/* ---------------- Rendering & caching ---------------- */}
      <QGroup>Rendering &amp; caching</QGroup>

      <QA q="Explain CSR, SSR, SSG, ISR.">
        <p>
          <strong>CSR</strong>: HTML built in the browser. <strong>SSR</strong>: HTML built on the
          server per request. <strong>SSG</strong>: HTML built once at build time.{" "}
          <strong>ISR</strong>: SSG that regenerates on a schedule (<code>revalidate</code>) or
          on-demand, giving static speed with periodic freshness.
        </p>
      </QA>
      <QA q="How does the App Router decide static vs dynamic rendering?">
        <p>
          It renders statically until the code needs the request: reading{" "}
          <code>cookies()</code>/<code>headers()</code>/<code>searchParams</code>, an uncached{" "}
          <code>fetch</code>, <code>connection()</code>, or <code>dynamic = &apos;force-dynamic&apos;</code>{" "}
          flips it to dynamic (per-request) rendering.
        </p>
      </QA>
      <QA q="What is Partial Prerendering (PPR)?">
        <p>
          A single route serves a <strong>static shell instantly</strong> and{" "}
          <strong>streams the dynamic holes</strong> at request time. With Cache Components (Next 16)
          it&apos;s the default: static/<code>&apos;use cache&apos;</code> content is in the shell,{" "}
          <code>&lt;Suspense&gt;</code>-wrapped content streams in.
        </p>
      </QA>
      <QA q="Name the four caches in the previous caching model.">
        <p>
          <strong>Request Memoization</strong> (dedupe within a render),{" "}
          <strong>Data Cache</strong> (persistent fetch results),{" "}
          <strong>Full Route Cache</strong> (rendered HTML/RSC of static routes), and the client{" "}
          <strong>Router Cache</strong> (visited segments for soft navigation).
        </p>
      </QA>
      <QA q="How do you revalidate cached data on demand?">
        <p>
          <code>revalidateTag(&apos;products&apos;)</code> invalidates every fetch tagged{" "}
          <code>products</code>; <code>revalidatePath(&apos;/products&apos;)</code> re-renders a
          route. Call them after a mutation (e.g. inside a Server Action). In the Cache Components
          model, <code>updateTag()</code> plays this role.
        </p>
      </QA>
      <QA q={<>What is the <code>&apos;use cache&apos;</code> directive? <Pill variant="modern">Next 16</Pill></>}>
        <p>
          Part of Cache Components: mark a function, component, or whole file as cacheable. Its
          arguments and closed-over values form the cache key. Pair it with{" "}
          <code>cacheLife()</code> (how long) and <code>cacheTag()</code> (for targeted
          invalidation).
        </p>
      </QA>
      <QA q="What does the revalidate route segment config do?">
        <p>
          <code>export const revalidate = 60</code> makes the route (or its cached data) refresh at
          most every 60s — ISR. <code>0</code> means always dynamic; <code>false</code> means cache
          indefinitely.
        </p>
      </QA>
      <QA q="dynamic = 'force-static' vs 'force-dynamic'?">
        <p>
          <code>force-static</code> forces static rendering (dynamic APIs return empty/defaults);{" "}
          <code>force-dynamic</code> forces per-request rendering and disables caching for the route.
          Default is <code>auto</code> (Next decides).
        </p>
      </QA>
      <QA q="What is the Router Cache and how do you clear it?">
        <p>
          A client-side, in-memory cache of visited route segments that makes back/forward and
          repeat navigation instant. Clear or refresh it with <code>router.refresh()</code>, or it
          expires by time; mutations via Server Actions also refresh affected data.
        </p>
      </QA>
      <QA q="Why did Next.js change fetch to uncached-by-default?">
        <p>
          The old &quot;cached by default&quot; produced surprising stale data and confusing bugs.
          Uncached-by-default is predictable — you see fresh data and{" "}
          <strong>opt in</strong> to caching where it measurably helps.
        </p>
      </QA>
      <QA q="What is unstable_cache / unstable_noStore?">
        <p>
          Previous-model helpers: <code>unstable_cache</code> caches a non-<code>fetch</code> async
          function (e.g. an ORM query) with tags/revalidate; <code>unstable_noStore</code> opts a
          scope out of caching. The Cache Components model supersedes these with{" "}
          <code>&apos;use cache&apos;</code> and <code>connection()</code>.
        </p>
      </QA>
      <QA q="How do you cache a GET Route Handler?">
        <p>
          Route Handlers aren&apos;t cached by default. Add{" "}
          <code>export const dynamic = &apos;force-static&apos;</code> (or set{" "}
          <code>revalidate</code>) to cache a <code>GET</code>. Other methods are never cached.
        </p>
      </QA>

      {/* ---------------- Streaming & Suspense ---------------- */}
      <QGroup>Streaming &amp; Suspense</QGroup>

      <QA q="What does loading.tsx do?">
        <p>
          Next automatically wraps the segment&apos;s <code>page</code> in a{" "}
          <code>&lt;Suspense&gt;</code> boundary whose fallback is your <code>loading.tsx</code>. You
          get an instant loading state on navigation with zero wiring.
        </p>
      </QA>
      <QA q="loading.tsx vs a manual <Suspense>?">
        <p>
          <code>loading.tsx</code> covers the <strong>whole segment</strong>. A manual{" "}
          <code>&lt;Suspense&gt;</code> is <strong>granular</strong> — ship the rest of the page
          immediately and stream only the slow component inside the boundary.
        </p>
      </QA>
      <QA q="How does streaming improve performance?">
        <p>
          The server sends the shell (and RSC payload) in chunks as they&apos;re ready instead of
          blocking on the slowest query. Users get a fast first paint; slow regions fill in
          progressively.
        </p>
      </QA>
      <QA q={<>What is the React <code>use()</code> API for here?</>}>
        <p>
          It lets a Client Component read a <strong>promise</strong> passed from the server; it
          suspends until the promise resolves, working with a <code>&lt;Suspense&gt;</code> fallback
          — the client-side counterpart to server streaming.
        </p>
      </QA>
      <QA q="Why doesn't a layout fall back to loading.tsx sometimes?">
        <p>
          If a <em>layout</em> itself accesses uncached/runtime data, it blocks navigation rather
          than showing the same-segment <code>loading.tsx</code>. Fix by wrapping that access in its
          own <code>&lt;Suspense&gt;</code>, or move the fetch into the page. Cache Components flags
          this at build time.
        </p>
      </QA>

      {/* ---------------- Server Actions ---------------- */}
      <QGroup>Server Actions &amp; mutations</QGroup>

      <QA q={<>What is a Server Action? <Pill variant="modern">modern</Pill></>}>
        <p>
          An <code>async</code> function marked <code>&quot;use server&quot;</code> that runs on the
          server but is callable from the client. Used for mutations — Next does a single{" "}
          <code>POST</code> round-trip and can return updated UI + data together.
        </p>
      </QA>
      <QA q="How do you invoke a Server Action?">
        <p>
          Pass it to a <code>&lt;form action={"{fn}"}&gt;</code>, a{" "}
          <code>&lt;button formAction={"{fn}"}&gt;</code>, or call it from an event handler in a
          Client Component. Forms give progressive enhancement — they work before JS loads.
        </p>
      </QA>
      <QA q="Where must Server Actions live?">
        <p>
          In a file/function marked <code>&quot;use server&quot;</code>. They can be inlined in a
          Server Component, or exported from a <code>&quot;use server&quot;</code> module and imported
          into Client Components. You cannot define one inside a Client Component.
        </p>
      </QA>
      <QA q="What React 19 hooks help with actions?">
        <p>
          <code>useActionState</code> (wire an action to state + pending, return validation errors),{" "}
          <code>useFormStatus</code> (read the form&apos;s pending state in a child), and{" "}
          <code>useOptimistic</code> (instant optimistic UI, reconciled on resolve).
        </p>
      </QA>
      <QA q="Why must you re-check auth inside a Server Action?">
        <p>
          Because it&apos;s a real endpoint reachable by a direct <code>POST</code>, not just via your
          UI. Hiding a button client-side is not security — authenticate, authorize, and validate
          input <strong>inside the action</strong>.
        </p>
      </QA>
      <QA q="How do you refresh the UI after a mutation?">
        <p>
          Call <code>revalidatePath</code>/<code>revalidateTag</code> (or{" "}
          <code>updateTag</code>) to invalidate cached data, and optionally{" "}
          <code>redirect()</code>. The updated server UI streams back in the same action response.
        </p>
      </QA>
      <QA q="Server Action vs Route Handler — when each?">
        <p>
          Server Action for form/mutation flows inside your own app (ergonomic, typed, progressive
          enhancement). Route Handler for stable public HTTP endpoints, webhooks, third-party/OAuth
          callbacks, and non-form verbs.
        </p>
      </QA>
      <QA q="Do Server Actions support progressive enhancement?">
        <p>
          Yes — a <code>&lt;form&gt;</code> that posts to a Server Action submits even without
          JavaScript. Once hydrated, submissions are handled client-side without a full reload.
        </p>
      </QA>

      {/* ---------------- Route Handlers & APIs ---------------- */}
      <QGroup>Route Handlers &amp; APIs</QGroup>

      <QA q="What is a Route Handler?">
        <p>
          A <code>route.ts</code> in the App Router exporting functions named by HTTP method (
          <code>GET</code>, <code>POST</code>…), built on the Web <code>Request</code>/
          <code>Response</code> APIs. It&apos;s the App Router equivalent of a{" "}
          <code>pages/api</code> route.
        </p>
      </QA>
      <QA q="Can page.tsx and route.ts share a segment?">
        <p>
          No — a segment can have a page <em>or</em> a route handler, not both, since they&apos;d both
          own the same URL.
        </p>
      </QA>
      <QA q={<>What are <code>NextRequest</code>/<code>NextResponse</code>?</>}>
        <p>
          Next&apos;s extensions of the Web <code>Request</code>/<code>Response</code> with helpers
          like <code>request.nextUrl</code>, <code>request.cookies</code>, and{" "}
          <code>NextResponse.json()</code>/<code>redirect()</code>/<code>rewrite()</code>.
        </p>
      </QA>
      <QA q="How do you handle different HTTP methods?">
        <p>
          App Router: export one function per method. Pages Router: branch on{" "}
          <code>req.method</code> inside the single <code>handler(req, res)</code> and return{" "}
          <code>405</code> for unsupported methods.
        </p>
      </QA>
      <QA q="How do you read a JSON body and query params in a handler?">
        <p>
          Body: <code>await request.json()</code>. Query:{" "}
          <code>request.nextUrl.searchParams.get(&apos;q&apos;)</code>. Dynamic segments arrive via
          the second arg&apos;s <code>params</code> (a Promise in the App Router).
        </p>
      </QA>
      <QA q="How do you stream a response from a Route Handler?">
        <p>
          Return a <code>Response</code> backed by a <code>ReadableStream</code> (e.g. for SSE or LLM
          token streaming). The Web streaming APIs work directly.
        </p>
      </QA>

      {/* ---------------- Metadata & SEO ---------------- */}
      <QGroup>Metadata &amp; SEO</QGroup>

      <QA q="How do you set page metadata in the App Router?">
        <p>
          Export a static <code>metadata</code> object, or an async{" "}
          <code>generateMetadata()</code> when it depends on data/params. Next injects the tags into{" "}
          <code>&lt;head&gt;</code>. The Pages Router uses <code>next/head</code>.
        </p>
      </QA>
      <QA q="What is a title template?">
        <p>
          In a layout, <code>title: {"{ template: '%s · Site', default: 'Site' }"}</code> wraps every
          child page&apos;s title. This handbook&apos;s root layout uses one.
        </p>
      </QA>
      <QA q="How do you generate Open Graph images?">
        <p>
          Add an <code>opengraph-image.tsx</code> that returns an <code>ImageResponse</code> (JSX
          rendered to an image at the edge), or point <code>openGraph.images</code> at a static file.
        </p>
      </QA>
      <QA q="How do you add a sitemap and robots.txt?">
        <p>
          Add <code>app/sitemap.ts</code> (export a function returning URL entries →{" "}
          <code>/sitemap.xml</code>) and <code>app/robots.ts</code> (→ <code>/robots.txt</code>).
          Both are file conventions.
        </p>
      </QA>
      <QA q="Why is SSR/SSG good for SEO?">
        <p>
          Crawlers get fully-rendered HTML with real content and metadata immediately, instead of an
          empty shell that needs JS to populate. Faster, more reliable indexing and better social
          previews.
        </p>
      </QA>

      {/* ---------------- Styling & fonts ---------------- */}
      <QGroup>Styling &amp; fonts</QGroup>

      <QA q="Where can you import global CSS?">
        <p>
          Only from the <strong>root layout</strong> (App Router) or{" "}
          <strong><code>_app.tsx</code></strong> (Pages Router). Everywhere else use CSS Modules or
          Tailwind so styles are scoped.
        </p>
      </QA>
      <QA q="What are CSS Modules?">
        <p>
          <code>*.module.css</code> files whose class names are locally scoped (hashed) to the
          importing component — no global collisions. They work in Server Components with no runtime.
        </p>
      </QA>
      <QA q="Why is next/font recommended?">
        <p>
          It self-hosts fonts at build time (no runtime request to Google), eliminates layout shift
          by reserving space, and exposes a CSS variable. Better privacy, performance, and CLS.
        </p>
      </QA>
      <QA q="Any caveat with CSS-in-JS in the App Router?">
        <p>
          Runtime CSS-in-JS needs a client boundary and special SSR config because Server Components
          don&apos;t run client JS. Prefer zero-runtime options (CSS Modules, Tailwind, or
          compile-time libraries) in RSC apps.
        </p>
      </QA>
      <QA q="How do you use Tailwind with Next.js?">
        <p>
          Install Tailwind + PostCSS, add the directives to your global stylesheet, and use utility
          classes anywhere. It&apos;s purely build-time, ships no runtime, and works in Server
          Components.
        </p>
      </QA>

      {/* ---------------- Optimization ---------------- */}
      <QGroup>Optimization &amp; performance</QGroup>

      <QA q="What does next/image give you?">
        <p>
          Automatic resizing/optimization, modern formats (AVIF/WebP), lazy loading, and reserved
          space to prevent layout shift. Mark the LCP image <code>priority</code>; use{" "}
          <code>fill</code> + <code>sizes</code> for responsive images.
        </p>
      </QA>
      <QA q="When do you use next/dynamic?">
        <p>
          To code-split a heavy client component and load it on demand — optionally with{" "}
          <code>ssr: false</code> to skip server rendering (browser-only libs) and a{" "}
          <code>loading</code> placeholder.
        </p>
      </QA>
      <QA q="What are the next/script strategies?">
        <p>
          <code>beforeInteractive</code> (critical, before hydration),{" "}
          <code>afterInteractive</code> (default), <code>lazyOnload</code> (idle), and{" "}
          <code>worker</code> (offload to a web worker). Choose based on how critical the script is.
        </p>
      </QA>
      <QA q="Name five ways to speed up a Next.js app.">
        <p>
          Server Components (less JS) with <code>&quot;use client&quot;</code> at the leaves;{" "}
          <code>next/image</code>/<code>next/font</code>; caching &amp; ISR/PPR; streaming with{" "}
          <code>&lt;Suspense&gt;</code>; code-splitting via <code>next/dynamic</code>;{" "}
          <code>&lt;Link&gt;</code> prefetch; and <code>optimizePackageImports</code> for big deps.
        </p>
      </QA>
      <QA q="How do you find what's bloating your bundle?">
        <p>
          Read <code>next build</code>&apos;s per-route size table, run the bundle analyzer, and check
          for accidental <code>&quot;use client&quot;</code> high in the tree pulling server-only code
          into the browser.
        </p>
      </QA>
      <QA q="What Core Web Vitals matter and how do you measure them?">
        <p>
          <strong>LCP</strong> (largest paint), <strong>CLS</strong> (layout shift),{" "}
          <strong>INP</strong> (interaction latency). Measure with Lighthouse, the field data in
          Vercel/Search Console, and <code>useReportWebVitals</code> for real-user metrics.
        </p>
      </QA>
      <QA q="How does prefetching work?">
        <p>
          <code>&lt;Link&gt;</code> prefetches the route (and its data/RSC payload) when it enters the
          viewport, so a click swaps in already-loaded content. Combined with the Router Cache,
          repeat navigations are instant.
        </p>
      </QA>
      <QA q="What is optimizePackageImports?">
        <p>
          A <code>next.config</code> option that tree-shakes large barrel-file libraries (icon packs,
          UI kits) so you only bundle the parts you import — cutting bundle size and build time.
        </p>
      </QA>

      {/* ---------------- Proxy, auth, config, deploy ---------------- */}
      <QGroup>Proxy, auth, config &amp; deployment</QGroup>

      <QA q={<>What is Proxy, and what changed in Next 16? <Pill variant="modern">renamed</Pill></>}>
        <p>
          Code that runs before a request completes (rewrite, redirect, headers, cookies), at the
          edge. In Next.js 16 the <code>middleware</code> file convention was{" "}
          <strong>renamed to <code>proxy</code></strong> — same functionality, clearer intent. One{" "}
          <code>proxy.ts</code> per project, at the root.
        </p>
      </QA>
      <QA q="What should Proxy NOT be used for?">
        <p>
          Slow data fetching or as your only authorization gate. It&apos;s for fast optimistic checks
          and routing. Do the authoritative session check in the layout/Server Action/Data Access
          Layer that returns protected data.
        </p>
      </QA>
      <QA q="How do you structure auth in the App Router?">
        <p>
          Optimistic redirect in <code>proxy.ts</code>; store the session in an{" "}
          <strong>HttpOnly cookie</strong>; and centralize the real check in a{" "}
          <strong>Data Access Layer</strong> that every read/write calls, reading the session via{" "}
          <code>await cookies()</code>.
        </p>
      </QA>
      <QA q="How do environment variables work, and what's the NEXT_PUBLIC_ rule?">
        <p>
          Server code reads any <code>process.env.*</code>. Only variables prefixed{" "}
          <code>NEXT_PUBLIC_</code> are inlined into the client bundle — and anything in the client is
          public. Keep secrets unprefixed and server-only.
        </p>
      </QA>
      <QA q="What can next.config.ts do?">
        <p>
          Configure <code>images</code> remote patterns, <code>redirects</code>/<code>rewrites</code>
          /<code>headers</code>, experimental/opt-in features like{" "}
          <code>cacheComponents</code>, <code>output: &apos;standalone&apos;</code> for Docker,{" "}
          <code>output: &apos;export&apos;</code> for static export, and more.
        </p>
      </QA>
      <QA q="Edge runtime vs Node runtime?">
        <p>
          Edge: fast cold starts, globally distributed, but a limited API (no native Node modules).
          Node: full platform, default for pages/handlers. Proxy runs on the edge by default; opt a
          handler in with <code>runtime = &apos;edge&apos;</code>.
        </p>
      </QA>
      <QA q="How do you deploy a Next.js app?">
        <p>
          Vercel (zero-config, all features), a Node server (<code>next build</code> +{" "}
          <code>next start</code>, or Docker with <code>output: &apos;standalone&apos;</code>), static
          export (<code>output: &apos;export&apos;</code>, no SSR/ISR/handlers), or other platforms via
          adapters.
        </p>
      </QA>
      <QA q="What is static export and its limits?">
        <p>
          <code>output: &apos;export&apos;</code> emits pure static HTML/CSS/JS for any static host.
          You lose SSR, ISR, Route Handlers, Server Actions, and image optimization (unless
          configured) — only fully static content works.
        </p>
      </QA>
      <QA q="What is instrumentation.ts?">
        <p>
          A root file whose <code>register()</code> runs once when the server boots — the place to
          initialize observability (tracing, metrics, error reporting) before the app handles
          requests.
        </p>
      </QA>
      <QA q="How does error handling work in the App Router?">
        <p>
          <code>error.tsx</code> is a Client Component error boundary for a segment (with a{" "}
          <code>reset()</code> to retry); <code>global-error.tsx</code> catches errors in the root
          layout; <code>not-found.tsx</code> handles <code>notFound()</code>. Errors in Server
          Components are caught by the nearest boundary.
        </p>
      </QA>

      {/* ---------------- Architecture / senior ---------------- */}
      <QGroup>Architecture &amp; senior-level</QGroup>

      <QA q="How would you migrate from Pages Router to App Router?">
        <p>
          Incrementally — the two coexist. Stand up <code>app/</code> alongside{" "}
          <code>pages/</code>, move routes one at a time (converting data functions to async Server
          Components + <code>generateStaticParams</code>, and <code>next/head</code> to metadata),
          and delete each page from <code>pages/</code> once ported. A hybrid app is normal
          mid-migration.
        </p>
      </QA>
      <QA q="When do you choose Server Components vs Client Components vs a client data library?">
        <p>
          Default to Server Components for data + rendering. Use Client Components for interactivity
          at the leaves. Reach for SWR/TanStack Query when you need rich client-side caching,
          polling, or optimistic flows beyond what actions cover.
        </p>
      </QA>
      <QA q="How do you decide SSG vs ISR vs SSR vs PPR for a page?">
        <p>
          Content never changes → SSG. Changes periodically and is shared → ISR. Personalized or
          always-fresh → SSR (dynamic). Mostly static with a few dynamic bits → PPR (static shell +
          streamed holes). Pick the most static option that still meets freshness needs.
        </p>
      </QA>
      <QA q="What is a Data Access Layer and why use one?">
        <p>
          A single server-only module that owns data access and enforces authz/validation, called by
          Server Components and Actions. It centralizes security (no scattered ad-hoc queries) and
          keeps the &quot;can this user see this?&quot; check in one auditable place.
        </p>
      </QA>
      <QA q="How do you prevent leaking secrets to the client?">
        <p>
          Keep secret-touching code in Server Components/Actions/DAL; never prefix secrets with{" "}
          <code>NEXT_PUBLIC_</code>; be careful what props cross the client boundary; and consider{" "}
          the <code>server-only</code> package to make a server module fail the build if imported
          into client code.
        </p>
      </QA>
      <QA q="Explain the OnPush-like relationship between caching, immutability, and rendering.">
        <p>
          Next&apos;s caching and PPR rely on knowing what&apos;s static vs dynamic. Explicit caching
          (<code>&apos;use cache&apos;</code>/tags) and explicit dynamic markers (<code>Suspense</code>,{" "}
          <code>connection()</code>, dynamic APIs) let Next build a correct static shell and stream
          the rest — predictable output, cheap invalidation.
        </p>
      </QA>
      <QA q="How do you keep the client JS bundle small in a large app?">
        <p>
          Server Components by default; <code>&quot;use client&quot;</code> only at interactive
          leaves; <code>next/dynamic</code> for heavy widgets; avoid pulling server-only libs across
          the client boundary; and use <code>optimizePackageImports</code>. Watch the build size
          report per route.
        </p>
      </QA>
      <QA q="What's your mental checklist when a page renders dynamically but you expected static?">
        <p>
          Look for an uncached <code>fetch</code>, a read of{" "}
          <code>cookies()</code>/<code>headers()</code>/<code>searchParams</code>, a{" "}
          <code>connection()</code> call, or <code>dynamic = &apos;force-dynamic&apos;</code>/
          <code>revalidate = 0</code>. Any one of those opts the route into per-request rendering.
        </p>
      </QA>
    </section>
  );
}
