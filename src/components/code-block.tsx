import { cn } from "cn";
import type { ComponentProps } from "react";
import { CopyButton } from "./copy-button";
import { ScrollArea } from "./scroll-area";

// Sugar High's markup reads these; other highlighters color their own. A theme sets them again
// on the code block's slot.
const syntax =
  "[--sh-class:oklch(81%_0.07_230)] [--sh-comment:var(--color-secondary)] [--sh-entity:oklch(81%_0.07_230)] [--sh-identifier:var(--color-foreground)] [--sh-jsxliterals:var(--color-foreground)] [--sh-keyword:oklch(77%_0.1_9)] [--sh-property:oklch(83%_0.08_76)] [--sh-sign:var(--color-secondary)] [--sh-string:oklch(81%_0.08_133)]";

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
      className={cn(
        // The focus ring, around the whole block while its code has focus, as focus-ring draws it.
        "relative rounded-xl material-field outline-2 outline-offset-1 outline-transparent has-[[data-slot=code-block-code]:focus-visible]:outline-focus",
        syntax,
        className,
      )}
      {...props}
    >
      <ScrollArea fade className="max-h-[inherit] rounded-[inherit]">
        {/* 12px around a 16px line centers it on the copy button, which the code stops short of. */}
        <pre
          data-slot="code-block-code"
          tabIndex={-1}
          className={cn(
            "mr-10.5 py-3 pl-3 font-mono text-xs text-foreground outline-none",
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
