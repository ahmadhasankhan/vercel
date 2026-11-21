"use client";

import { useRef, useState } from "react";

/** Friendly names for the language badge shown above each code block. */
const LANG_LABELS: Record<string, string> = {
  bash: "Terminal", sh: "Terminal", shell: "Terminal", zsh: "Terminal", console: "Terminal",
  ruby: "Ruby", rb: "Ruby", erb: "ERB",
  js: "JavaScript", javascript: "JavaScript", jsx: "JSX", ts: "TypeScript", typescript: "TypeScript", tsx: "TSX",
  php: "PHP", python: "Python", py: "Python", go: "Go", rust: "Rust", java: "Java", sql: "SQL",
  yaml: "YAML", yml: "YAML", json: "JSON", toml: "TOML", hcl: "Terraform", tf: "Terraform",
  nginx: "Nginx", dockerfile: "Dockerfile", docker: "Dockerfile", html: "HTML", css: "CSS",
  diff: "Diff", plaintext: "Text", text: "Text", txt: "Text",
};

type PreProps = React.HTMLAttributes<HTMLPreElement> & { "data-language"?: string };

/**
 * Replaces the <pre> produced by rehype-pretty-code (server-side Shiki highlighting)
 * with a framed block: language badge + copy button. Highlighting itself ships as
 * static HTML — no syntax-highlighting JavaScript runs in the browser.
 */
export default function CodeBlock(props: PreProps) {
  const { children, ...rest } = props;
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const lang = props["data-language"] ?? "";
  const label = LANG_LABELS[lang] ?? lang.toUpperCase();

  const copy = async () => {
    const text = ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text.split("\n").map((l) => l.replace(/\s+$/, "")).join("\n").replace(/\n+$/, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — ignore */
    }
  };

  return (
    <div className="code-block group">
      <div className="code-block__bar">
        <span className="code-block__dots" aria-hidden="true"><i /><i /><i /></span>
        {label && <span className="code-block__lang">{label}</span>}
        <button
          type="button"
          onClick={copy}
          className="code-block__copy"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" /></svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M13 7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2" /></svg>
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre ref={ref} {...rest}>{children}</pre>
    </div>
  );
}
