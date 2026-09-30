"use client";

import { cn } from "cn";
import { type ComponentProps, useState } from "react";
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
      data-copied={copied}
      className={cn("group", className)}
      {...props}
    >
      <span className="grid *:[grid-area:1/1]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 transition delay-150 duration-150 group-data-[copied=true]:scale-50 group-data-[copied=true]:opacity-0 group-data-[copied=true]:delay-0"
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
          className="size-4"
          aria-hidden
        >
          <path
            d="m5 13 4 4L19 7"
            pathLength={1}
            className="draw transition-[stroke-dashoffset] duration-150 ease-in group-data-[copied=true]:drawn group-data-[copied=true]:delay-100 group-data-[copied=true]:duration-300 group-data-[copied=true]:ease-out"
          />
        </svg>
      </span>
    </IconButton>
  );
}
