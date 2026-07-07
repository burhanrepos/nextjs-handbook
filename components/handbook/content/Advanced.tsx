import { Module, Callout, Pill, Table, Code } from "../ui";

export function Advanced() {
  return (
    <>
      {/* ===================== MODULE 15 ===================== */}
      <Module id="m15" num="15" kind="Advanced" title="Optimization & Assets">
        <p>
          Next.js ships built-in components and tools for the things that usually wreck Core Web
          Vitals: images, fonts, scripts, and oversized bundles.
        </p>

        <h3><code>next/image</code></h3>
        <p>
          Automatic resizing, modern formats (AVIF/WebP), lazy loading, and reserved space to prevent
          layout shift.
        </p>
        <Code
          code={`import Image from 'next/image'

<Image src="/hero.jpg" alt="Hero" width={1200} height={630} priority />
// 'priority' = eager-load the LCP image; omit it and images lazy-load.
// Use 'fill' + a sized parent for responsive images, and 'sizes' to hint widths.`}
        />

        <h3><code>next/dynamic</code> — lazy load client components</h3>
        <Code
          code={`import dynamic from 'next/dynamic'

// Code-split a heavy, client-only widget and skip it during SSR:
const Chart = dynamic(() => import('./Chart'), {
  ssr: false,
  loading: () => <Skeleton />,
})`}
        />

        <h3><code>next/script</code></h3>
        <Code
          code={`import Script from 'next/script'

<Script src="https://example.com/a.js" strategy="afterInteractive" />
// strategies: beforeInteractive · afterInteractive (default) · lazyOnload · worker`}
        />

        <Table
          head={["Lever", "Tool"]}
          rows={[
            ["Images", <><code>next/image</code> — resize, lazy, AVIF/WebP</>],
            ["Fonts", <><code>next/font</code> — self-host, no layout shift</>],
            ["Third-party scripts", <><code>next/script</code> strategies</>],
            ["Code splitting", <><code>next/dynamic</code>, route-level automatic splitting</>],
            ["Less JS", "Server Components, keep 'use client' at the leaves"],
            ["Faster nav", <><code>&lt;Link&gt;</code> prefetch, Router Cache</>],
            ["Big deps", <><code>optimizePackageImports</code> in <code>next.config</code></>],
            ["Fewer round-trips", "PPR / streaming (Module 10)"],
          ]}
        />
        <Callout variant="tip" label="Measure, don't guess">
          Use <code>next build</code>&apos;s per-route size report, the bundle analyzer, and Core Web
          Vitals (LCP, CLS, INP). <code>useReportWebVitals</code> streams the real numbers from real
          users.
        </Callout>
      </Module>

      {/* ===================== MODULE 16 ===================== */}
      <Module id="m16" num="16" kind="Advanced" title="Proxy, Auth, Config & Deployment">
        <h3>Proxy (formerly Middleware) <Pill variant="modern">renamed in v16</Pill></h3>
        <p>
          Code that runs <strong>before a request is completed</strong>, at the edge — rewrite,
          redirect, or tweak headers/cookies based on the incoming request. In Next.js 16 the{" "}
          <code>middleware</code> file convention was <strong>renamed to <code>proxy</code></strong>{" "}
          (same functionality, clearer name). One <code>proxy.ts</code> per project, at the root.
        </p>
        <Code
          filename="proxy.ts"
          code={`import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const isLoggedIn = request.cookies.has('session')
  if (!isLoggedIn && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*'] }`}
        />
        <Callout variant="warn" label="Not a security boundary on its own">
          Proxy is for fast <em>optimistic</em> checks and routing, not full auth. It shouldn&apos;t
          do slow data fetching or be your only gate. Verify the session again in the layout / Server
          Action / Data Access Layer that actually returns protected data.
        </Callout>

        <h3>Auth pattern</h3>
        <ul>
          <li><strong>Optimistic check</strong> in <code>proxy.ts</code> — cheap redirect for obviously-unauthed requests.</li>
          <li><strong>Authoritative check</strong> in a <strong>Data Access Layer</strong> — one module that verifies the session before every read/write, called from Server Components and Actions.</li>
          <li>Store sessions in <strong>HttpOnly cookies</strong>; read them server-side with <code>await cookies()</code>.</li>
        </ul>

        <h3>Environment variables</h3>
        <Code
          code={`// .env.local
DATABASE_URL=postgres://…        // server-only, never sent to the browser
NEXT_PUBLIC_ANALYTICS_ID=abc     // inlined into the client bundle (public!)

// server code: process.env.DATABASE_URL
// client code: process.env.NEXT_PUBLIC_ANALYTICS_ID`}
        />
        <Callout variant="warn" label="Secrets">
          Only variables prefixed <code>NEXT_PUBLIC_</code> reach the browser — and anything that
          reaches the browser is public. Keep real secrets unprefixed and read them only in server
          code.
        </Callout>

        <h3><code>next.config.ts</code> highlights</h3>
        <Code
          code={`const nextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.shop.com' }] },
  async redirects() { return [{ source: '/old', destination: '/new', permanent: true }] },
  async rewrites() { return [{ source: '/api/:p*', destination: 'https://api.x.com/:p*' }] },
  async headers()  { return [{ source: '/(.*)', headers: [{ key: 'X-Frame-Options', value: 'DENY' }] }] },
  cacheComponents: true,        // opt into the Cache Components model (Module 9)
  output: 'standalone',         // self-contained server build for Docker
}`}
        />

        <h3>Deployment</h3>
        <Table
          head={["Target", "How", "Notes"]}
          rows={[
            ["Vercel", "git push", "Zero-config; SSR, ISR, image/edge all supported."],
            ["Node server", <><code>next build</code> + <code>next start</code></>, "Any host that runs Node; or Docker with output: 'standalone'."],
            ["Static export", <code>output: &apos;export&apos;</code>, "Pure static hosting. No SSR / ISR / Route Handlers."],
            ["Other platforms", "adapters", "Netlify, Cloudflare, etc. via adapters."],
          ]}
        />
        <Callout variant="iv" label="Interview">
          <p>
            <em>&quot;What runs at the edge vs. Node?&quot;</em> Proxy runs on the edge runtime by
            default (fast, but a limited API — no native Node modules). Route Handlers and pages
            default to the Node runtime and can opt into <code>runtime = &apos;edge&apos;</code>.
            Choose edge for latency-sensitive, lightweight logic; Node when you need the full
            platform.
          </p>
        </Callout>
      </Module>
    </>
  );
}
