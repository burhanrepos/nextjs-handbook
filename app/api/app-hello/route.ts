import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// App Router Route Handler — app/api/app-hello/route.ts → GET /api/app-hello
// force-static so it can be prerendered to a static JSON file for GitHub Pages.
// (On a Node server you'd drop this line and read request.nextUrl.searchParams
// to echo ?name=, making it dynamic — see the handbook, Module 12.)
export const dynamic = "force-static";

export async function GET(_request: NextRequest) {
  const name = "world";
  return NextResponse.json({
    router: "app",
    file: "app/api/app-hello/route.ts",
    message: `Hello, ${name}!`,
    at: new Date().toISOString(),
  });
}
