import type { NextConfig } from "next";

// The handbook deploys to GitHub Pages as a fully static site. That build is
// opted-in with BUILD_STATIC=true (see `npm run build:pages` and the deploy
// workflow). A normal `next build` / `next dev` keeps the full server app with
// all the live demos.
const isStatic = process.env.BUILD_STATIC === "true";

// GitHub project pages are served from https://<user>.github.io/<repo>/, so the
// static build needs a base path. The workflow computes it from the repo name.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = isStatic
  ? {
      output: "export",
      images: { unoptimized: true }, // no Image Optimization server on Pages
      basePath: basePath || undefined,
      assetPrefix: basePath || undefined,
      trailingSlash: true, // emit /route/index.html so paths resolve on Pages
    }
  : {};

export default nextConfig;
