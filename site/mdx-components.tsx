import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { isValidElement, type ReactNode } from "react";
import { Code, isLanguage } from "@/ui/code";
import { Example } from "@/ui/example";
import { Install } from "@/ui/install";

/** A fenced block's code and language, from the `pre > code` MDX renders. */
function Pre({ children }: { children?: ReactNode }) {
  if (!isValidElement<{ children?: string; className?: string }>(children))
    return null;
  const lang = children.props.className?.replace("language-", "") ?? "";
  const language = isLanguage(lang) ? lang : undefined;
  return <Code lang={language}>{(children.props.children ?? "").trim()}</Code>;
}

const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-6 scroll-mt-20 text-lg font-medium tracking-tight first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-2 scroll-mt-20 text-sm font-medium" {...props} />
  ),
  p: (props) => <p className="max-w-[70ch] text-secondary" {...props} />,
  a: ({ href = "", ...props }) => (
    <Link
      href={href}
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
      className="rounded-sm bg-level-4 px-1 py-px font-mono text-[0.9em] text-foreground"
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
