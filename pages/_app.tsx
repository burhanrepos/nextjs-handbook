import type { AppProps } from "next/app";
// In the Pages Router, global CSS may ONLY be imported here in the custom App.
// We reuse the same design system the App Router handbook uses.
import "@/app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  // The one place to add app-wide providers or a persistent layout for
  // Pages Router routes. Here we just render the active page.
  return <Component {...pageProps} />;
}
