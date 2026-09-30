import { cn } from "cn";
import type { ComponentProps } from "react";
import styles from "./code-block.module.css";
import { CopyButton } from "./copy-button";

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
    <div
      data-slot="code-block"
      className={cn(styles.block, className)}
      {...props}
    >
      <pre
        tabIndex={-1}
        className={cn(styles.code, wrap ? styles.wrap : styles.scroll)}
        {...content}
      />
      <CopyButton value={code} />
    </div>
  );
}
