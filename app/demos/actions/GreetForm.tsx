"use client";

import { useState } from "react";

// NOTE: On GitHub Pages (static export) there is no server, so Server Actions
// can't run. This form is therefore handled entirely in the browser to stay
// interactive. The real Server Action version is shown as code on the page and
// explained in Module 11 — deploy to a Node host (e.g. Vercel) to run it live.
export function GreetForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") ?? "").trim();
    setMessage("");
    setError("");
    if (!name) {
      setError("Please enter a name.");
      return;
    }
    setPending(true);
    await new Promise((r) => setTimeout(r, 500)); // pretend to do work
    setPending(false);
    setMessage(`Hello, ${name}! Handled in your browser at ${new Date().toLocaleTimeString()}.`);
  }

  return (
    <form onSubmit={onSubmit}>
      <input className="field" name="name" placeholder="Your name" aria-label="Your name" />
      <button className="btn" type="submit" disabled={pending}>
        {pending ? "Working…" : "Submit"}
      </button>
      {error ? (
        <p role="alert" style={{ color: "var(--warn-ink)", marginTop: 12 }}>
          {error}
        </p>
      ) : null}
      {message ? <p style={{ color: "var(--tip-ink)", marginTop: 12 }}>{message}</p> : null}
    </form>
  );
}
