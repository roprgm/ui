import { cn } from "cn";
import type { ComponentProps } from "react";
import { CopyButton } from "./copy-button";
import "./core.css";
import "./code-block.css";
import "./overflow.css";

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
      data-wrap={wrap || undefined}
      className={cn("code-block", className)}
      {...props}
    >
      <pre
        data-slot="code-block-content"
        tabIndex={-1}
        className="code-block-content"
        {...content}
      />
      <CopyButton value={code} />
    </div>
  );
}
