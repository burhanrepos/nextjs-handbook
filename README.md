# Next.js Handbook — Zero to Interview-Ready

A complete Next.js study handbook, built **as a real Next.js app**. The home page renders a
16-module handbook + 100+ interview questions (styled after a print handbook), and the project
itself demonstrates the concepts: the content is Server Components, the sidebar/theme toggle are
Client Components, and **both routers run side by side** with live demos.

- **Framework:** Next.js 16 (App Router primary) · React 19 · TypeScript
- **Covers:** Pages Router **and** App Router, Server/Client Components, all rendering strategies
  (CSR/SSR/SSG/ISR/PPR), the caching model (incl. Cache Components / `use cache`), streaming,
  Server Actions, Route Handlers, metadata/SEO, styling, optimization, and Proxy/auth/deploy.

## Run it

```bash
npm run dev          # dev server at http://localhost:3000 (Turbopack)
npm run build        # production (server) build — note the ○/ƒ/● render labels
npm run start        # serve the production build

npm run build:pages  # static export → ./out (what GitHub Pages gets)
npm run serve:pages  # preview the exported ./out locally
```

## What's where

| Path | What it is |
| --- | --- |
| `app/page.tsx` | The handbook home page (a Server Component composing the modules) |
| `app/layout.tsx` | Root layout: `next/font`, Metadata API, no-FOUC theme script |
| `app/globals.css` | The design system (Vercel-blue palette, light/dark) |
| `components/handbook/ui.tsx` | Server Component primitives (Code, Callout, Table, QA…) |
| `components/handbook/Sidebar.tsx`, `ThemeToggle.tsx` | Client Components (`"use client"`) |
| `components/handbook/content/*` | The 16 modules + the Q&A bank |
| `app/demos/*` | **App Router** demos |
| `pages/pages-demos/*` | **Pages Router** demos |
| `next.config.ts` | Static-export config, gated by `BUILD_STATIC` (base path from the workflow) |
| `.github/workflows/deploy.yml` | Auto-deploy the static export to GitHub Pages on push |

## Live demos (`/demos`)

App Router: SSR (`force-dynamic`), SSG (`force-static`), ISR (`revalidate`), Streaming
(`<Suspense>` + `loading.tsx`), dynamic params (`generateStaticParams`), a Server Action
(`useActionState` + `useFormStatus`), and a Route Handler. Pages Router: `getServerSideProps`,
`getStaticProps`, ISR, `getStaticPaths`.

> **Static export caveat.** GitHub Pages has no Node server, so the export can't run per-request
> features. On the hosted site the server-only demos (SSR/ISR/streaming/Server Action/Pages SSR)
> render as static pages that **show the real server code and explain it** rather than executing
> it. The full handbook (16 modules + Q&A) is unaffected. To run the demos live, deploy to a Node
> host (e.g. Vercel).

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source = "GitHub Actions".**
3. Push to `main`/`master` (or run the workflow from the Actions tab).

The [workflow](.github/workflows/deploy.yml) runs `BUILD_STATIC=true next build`, auto-computes the
`basePath` from the repo name (`/<repo>`, or empty for a `<user>.github.io` repo), adds `.nojekyll`,
and publishes `./out`. Your site lands at `https://<user>.github.io/<repo>/`.
