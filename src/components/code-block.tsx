import { cn } from "cn";
import type { ComponentProps } from "react";
import { CopyButton } from "./copy-button";

// Sugar High's markup reads these; other highlighters color their own.
const syntax =
  "[--sh-class:var(--color-code-type)] [--sh-comment:var(--color-muted)] [--sh-entity:var(--color-code-type)] [--sh-identifier:var(--color-foreground)] [--sh-jsxliterals:var(--color-foreground)] [--sh-keyword:var(--color-code-keyword)] [--sh-property:var(--color-code-property)] [--sh-sign:var(--color-muted)] [--sh-string:var(--color-code-string)]";

/**
 * Code with a button that copies it; a line that doesn't fit scrolls, or with `wrap`, wraps.
 * `html` is its markup from a highlighter, such as Sugar High's `highlight(code)`.
 */
export function CodeBlock({
  code,
  html,
  wrap = false,
  className,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  code: string;
  html?: string;
  wrap?: boolean;
}) {
  const content = html
    ? { dangerouslySetInnerHTML: { __html: html } }
    : { children: code };
  return (
    // 6px around a 16px line centers it on the 28px copy button.
    <div
      data-slot="code-block"
      className={cn(
        "flex items-start gap-2 rounded-xl surface-sunken p-1.5 pl-3",
        syntax,
        className,
      )}
      {...props}
    >
      <pre
        tabIndex={-1}
        className={cn(
          "flex-1 py-1.5 font-mono text-xs text-foreground",
          wrap && "whitespace-pre-wrap",
          !wrap && "overflow-fade-x",
        )}
        {...content}
      />
      <CopyButton value={code} />
    </div>
  );
}
