import { Html, Head, Main, NextScript } from "next/document";

// Custom Document: customize the server-rendered <html>/<body> for Pages Router
// routes. Runs only on the server. We add the same no-FOUC theme script the App
// Router uses so a theme chosen on the handbook carries into the pages demos.
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

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
