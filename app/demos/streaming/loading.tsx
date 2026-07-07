// loading.tsx: Next automatically wraps this segment's page in a <Suspense>
// boundary using this component as the fallback. Shown instantly on navigation.
export default function Loading() {
  return (
    <main className="demo-shell">
      <p className="note-inline">Loading the streaming demo… (this is loading.tsx)</p>
    </main>
  );
}
