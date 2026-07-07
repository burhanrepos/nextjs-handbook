// Server Components (no "use client"): these render on the server and ship zero
// JS to the browser. The whole handbook body is built from these primitives.
import type { ReactNode } from "react";

/* ---------- Code block with lightweight comment highlighting ---------- */
// Colors `// ...` line comments without a full syntax highlighter (keeps the
// bundle tiny and avoids any client JS). URLs like https:// are left intact.
function renderCode(code: string): ReactNode[] {
  const lines = code.replace(/\n$/, "").split("\n");
  return lines.map((line, i) => {
    let idx = -1;
    for (let j = 0; j < line.length - 1; j++) {
      if (line[j] === "/" && line[j + 1] === "/") {
        const prev = j > 0 ? line[j - 1] : "";
        if (prev !== ":" && prev !== "/") {
          idx = j;
          break;
        }
      }
    }
    const nl = i < lines.length - 1 ? "\n" : "";
    if (idx === -1) {
      return <span key={i}>{line + nl}</span>;
    }
    return (
      <span key={i}>
        {line.slice(0, idx)}
        <span className="cmt">{line.slice(idx)}</span>
        {nl}
      </span>
    );
  });
}

export function Code({ code, filename }: { code: string; filename?: string }) {
  return (
    <pre>
      {filename ? <span className="filename">{filename}</span> : null}
      <code>{renderCode(code)}</code>
    </pre>
  );
}

/* ---------- Module wrapper ---------- */
export function Module({
  id,
  num,
  kind,
  title,
  children,
}: {
  id: string;
  num: string;
  kind: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="module" id={id}>
      <div className="module-tag">
        <span className="mnum">Module {num}</span>
        <span className="mkind">{kind}</span>
      </div>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/* ---------- Callout ---------- */
type CalloutVariant = "note" | "tip" | "warn" | "iv";
export function Callout({
  variant = "note",
  label,
  children,
}: {
  variant?: CalloutVariant;
  label?: string;
  children: ReactNode;
}) {
  const cls = variant === "note" ? "callout" : `callout ${variant}`;
  return (
    <div className={cls}>
      {label ? <span className="label">{label}</span> : null}
      {typeof children === "string" ? <p>{children}</p> : children}
    </div>
  );
}

/* ---------- Pill ---------- */
type PillVariant = "modern" | "legacy" | "app" | "pages";
export function Pill({
  variant,
  children,
}: {
  variant?: PillVariant;
  children: ReactNode;
}) {
  return <span className={variant ? `pill ${variant}` : "pill"}>{children}</span>;
}

/* ---------- Table ---------- */
export function Table({
  head,
  rows,
}: {
  head: ReactNode[];
  rows: ReactNode[][];
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- ASCII diagram ---------- */
export function Ascii({ children }: { children: ReactNode }) {
  return <div className="ascii">{children}</div>;
}

/* ---------- Interview Q&A (collapsible, works without JS via <details>) ---------- */
export function QA({ q, children }: { q: ReactNode; children: ReactNode }) {
  return (
    <details className="qa">
      <summary>{q}</summary>
      <div className="ans">{children}</div>
    </details>
  );
}

export function QGroup({ children }: { children: ReactNode }) {
  return <div className="qgroup">{children}</div>;
}
