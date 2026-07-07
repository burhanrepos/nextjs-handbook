import type { Metadata } from "next";
import Link from "next/link";
import { GreetForm } from "./GreetForm";
import { Callout, Code } from "@/components/handbook/ui";

export const metadata: Metadata = { title: "Server Action (App Router)" };

const ACTION_CODE = `// app/actions.ts
'use server'
import { revalidatePath } from 'next/cache'

export async function greet(_prev: State, formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  if (!name) return { error: 'Please enter a name.' }
  // ...authenticate, validate, then mutate the database here...
  revalidatePath('/greetings')
  return { message: \`Hello, \${name}!\` }
}

// app/greet-form.tsx  ('use client')
const [state, formAction, pending] = useActionState(greet, {})
return <form action={formAction}>…</form>`;

export default function ActionsDemo() {
  return (
    <main className="demo-shell">
      <Link href="/demos" className="demo-back">
        ← All demos
      </Link>
      <h1>
        Server Action <span className="demo-badge app">app</span>
      </h1>
      <p className="demo-lede">
        The form below is interactive. On a Node server it would post to a{" "}
        <code>&quot;use server&quot;</code> function in a single round-trip.
      </p>

      <GreetForm />

      <Callout variant="warn" label="Static hosting note">
        <p>
          This site is a <strong>static export</strong> on GitHub Pages, which has no server — so
          Server Actions can&apos;t run here and this form is handled in your browser instead. The
          real Server Action code is shown below; run it on a Node host (e.g. Vercel) to see the
          single-round-trip mutation live. Full explanation in Module 11.
        </p>
      </Callout>

      <Code filename="the real Server Action (needs a server)" code={ACTION_CODE} />
    </main>
  );
}
