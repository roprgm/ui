"use client";

import { cn } from "cn";
import { type ComponentProps, useState } from "react";
import { IconButton } from "./icon-button";
import "./core.css";
import "./copy-button.css";

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
      data-slot="copy-button"
      label={copied ? "Copied" : "Copy"}
      onClick={copy}
      data-copied={copied}
      className={cn("copy-button", className)}
      {...props}
    >
      <span data-slot="copy-button-icons" className="copy-button-icons">
        <svg
          data-slot="copy-button-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="copy-button-icon"
          aria-hidden
        >
          <rect
            data-slot="copy-button-rect"
            x="8"
            y="8"
            width="12"
            height="12"
            rx="2"
          />
          <path
            data-slot="copy-button-path"
            d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
          />
        </svg>
        <svg
          data-slot="copy-button-check"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="copy-button-check"
          aria-hidden
        >
          {/* One dash the length of the stroke; its gap of 2 hides the round cap. */}
          <path
            data-slot="copy-button-check-path"
            d="m5 13 4 4L19 7"
            pathLength={1}
            className="copy-button-check-path"
          />
        </svg>
      </span>
    </IconButton>
  );
}
