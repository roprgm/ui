"use client";

import { cn } from "cn";
import { type ComponentProps, useState } from "react";
import styles from "./copy-button.module.css";
import { IconButton } from "./icon-button";

/** Copies `value`, and a check draws itself in. */
export function CopyButton({
  value,
  className,
  ...props
}: Omit<ComponentProps<typeof IconButton>, "label" | "onClick"> & {
  value: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <IconButton
      label={copied ? "Copied" : "Copy"}
      onClick={copy}
      data-copied={copied || undefined}
      className={cn(styles.button, className)}
      {...props}
    >
      <span className={styles.icons}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(styles.icon, styles.copy)}
          aria-hidden
        >
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.icon}
          aria-hidden
        >
          <path d="m5 13 4 4L19 7" pathLength={1} className={styles.check} />
        </svg>
      </span>
    </IconButton>
  );
}
