import type { MDXComponents } from "mdx/types";
import { isValidElement, type ReactNode } from "react";
import { Code, type Language } from "@/ui/code";
import { Example } from "@/ui/example";
import { Install } from "@/ui/install";
import { slugify } from "@/ui/outline";

const text = (node: ReactNode): string =>
  typeof node === "string"
    ? node
    : Array.isArray(node)
      ? node.map(text).join("")
      : "";

/** A fenced block's code and language, from the `pre > code` MDX renders. */
function Pre({ children }: { children?: ReactNode }) {
  if (!isValidElement<{ children?: string; className?: string }>(children))
    return null;
  const lang = children.props.className?.replace("language-", "") as Language;
  return <Code lang={lang}>{(children.props.children ?? "").trim()}</Code>;
}

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2
      id={slugify(text(children))}
      className="mt-6 scroll-mt-20 text-lg font-medium tracking-tight"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      id={slugify(text(children))}
      className="mt-2 scroll-mt-20 text-sm font-medium"
    >
      {children}
    </h3>
  ),
  p: (props) => <p className="max-w-[70ch] text-secondary" {...props} />,
  a: (props) => (
    <a
      className="rounded-sm text-foreground underline decoration-muted underline-offset-4 transition focus-ring hover:decoration-foreground"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="flex max-w-[70ch] list-disc flex-col gap-1.5 pl-5 text-secondary marker:text-muted"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded-sm bg-hover px-1 py-px font-mono text-[0.9em] text-foreground"
      {...props}
    />
  ),
  pre: Pre,
  Example,
  Install,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
