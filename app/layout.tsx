import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// next/font self-hosts the fonts at build time — no network request at runtime,
// no layout shift, and it exposes a CSS variable we wire into globals.css.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Metadata API (App Router): Next renders these into <head> for you.
export const metadata: Metadata = {
  title: {
    default: "Next.js Handbook — Zero to Interview-Ready",
    template: "%s · Next.js Handbook",
  },
  description:
    "A complete Next.js study handbook (16 modules) covering both the Pages Router and the App Router, plus 100+ interview questions with answers. Written against Next.js 16 + React 19.",
  metadataBase: new URL("https://nextjs-handbook.local"),
  openGraph: {
    title: "Next.js Handbook — Zero to Interview-Ready",
    description:
      "16 modules across the Pages Router and App Router + 100+ interview questions. Next.js 16 / React 19.",
    type: "website",
  },
};

// Runs before React hydrates so the correct theme is applied on first paint
// (no flash of the wrong color scheme). This is a common, safe SSR pattern.
const themeScript = `
(function () {
  try {
    var t = localStorage.getItem('nh-theme');
    if (t === 'light' || t === 'dark') {
      document.documentElement.setAttribute('data-theme', t);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
