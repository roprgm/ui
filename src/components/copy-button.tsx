"use client";

import { cn } from "cn";
import { type ComponentProps, useState } from "react";
import { Button } from "./button";
import { IconButton } from "./icon-button";

/**
 * Copies `value`, and a check draws itself in. With children it's a Button they label, such as
 * "Copy page", which reads Copied for a moment; without, a ghost icon button whose tooltip does.
 */
export function CopyButton({
  value,
  children,
  shortcut,
  side,
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
  const shared = {
    "data-slot": "copy-button",
    "data-copied": copied,
    onClick: copy,
    className: cn("group", className),
    ...props,
  };
  // One icon, so a Button sets it as a leading icon: the copy shape shrinks away as the check
  // strokes itself in.
  const icon = (
    <svg
      data-slot="copy-button-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden
    >
      <g
        data-slot="copy-button-copy"
        className="origin-center transition delay-150 duration-150 [transform-box:fill-box] group-data-[copied=true]:scale-50 group-data-[copied=true]:opacity-0 group-data-[copied=true]:delay-0"
      >
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </g>
      <path
        data-slot="copy-button-check"
        d="m5 13 4 4L19 7"
        pathLength={1}
        className="draw transition-[stroke-dashoffset] duration-150 ease-in group-data-[copied=true]:drawn group-data-[copied=true]:delay-100 group-data-[copied=true]:duration-300 group-data-[copied=true]:ease-out"
      />
    </svg>
  );
  if (children) {
    return (
      <Button {...shared}>
        {icon}
        {/* Both labels share one cell, so the width holds while they cross-fade. */}
        <span data-slot="copy-button-label" className="grid *:[grid-area:1/1]">
          <span
            data-slot="copy-button-text"
            className="transition-opacity duration-200 group-data-[copied=true]:opacity-0"
          >
            {children}
          </span>
          <span
            data-slot="copy-button-copied"
            aria-hidden
            className="justify-self-center opacity-0 transition-opacity duration-200 group-data-[copied=true]:opacity-100"
          >
            Copied
          </span>
        </span>
      </Button>
    );
  }
  return (
    <IconButton
      label={copied ? "Copied" : "Copy"}
      shortcut={shortcut}
      side={side}
      {...shared}
    >
      {icon}
    </IconButton>
  );
}
