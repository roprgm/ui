import { cn } from "cn";
import type { ComponentProps } from "react";
import { CopyButton } from "./copy-button";
import { ScrollArea } from "./scroll-area";

// Sugar High's markup reads these; other highlighters color their own.
const syntax =
  "[--sh-class:var(--color-code-type)] [--sh-comment:var(--color-secondary)] [--sh-entity:var(--color-code-type)] [--sh-identifier:var(--color-foreground)] [--sh-jsxliterals:var(--color-foreground)] [--sh-keyword:var(--color-code-keyword)] [--sh-property:var(--color-code-property)] [--sh-sign:var(--color-secondary)] [--sh-string:var(--color-code-string)]";

/**
 * Code with a button that copies it; a line that doesn't fit scrolls, or with `wrap`, wraps, and
 * with a max height, such as `max-h-96`, the code scrolls down under the button.
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
    <div
      data-slot="code-block"
      className={cn("relative rounded-xl material-field", syntax, className)}
      {...props}
    >
      <ScrollArea fade className="max-h-[inherit] rounded-[inherit]">
        {/* 12px around a 16px line centers it on the copy button, which the code stops short of. */}
        <pre
          data-slot="code-block-code"
          tabIndex={-1}
          className={cn(
            "mr-10.5 py-3 pl-3 font-mono text-xs text-foreground",
            wrap && "whitespace-pre-wrap",
            !wrap && "overflow-fade-x",
          )}
          {...content}
        />
      </ScrollArea>
      <CopyButton value={code} className="absolute top-1.5 right-1.5" />
    </div>
  );
}
