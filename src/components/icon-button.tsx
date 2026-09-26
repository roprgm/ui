"use client";

import { cn } from "cn";
import type { ComponentProps } from "react";
import { Button } from "./button";
import { Tooltip } from "./tooltip";

// A ghost shows only its icon. At a padded container's side it reaches in so the icon lands 12px
// from the edge, and above and below by what makes it taller than a line of text.
const flush = {
  icon: "flush-x-2 flush-y-1",
  "icon-sm": "flush-x-1.5 flush-y-0.5",
  "icon-lg": "flush-x-2.5 flush-y-1.5",
};

/** A ghost icon button; `label` names it for assistive technology and shows as its tooltip. */
export function IconButton({
  label,
  shortcut,
  side,
  size = "icon",
  className,
  ...props
}: Omit<ComponentProps<typeof Button>, "size"> & {
  label: string;
  shortcut?: string;
  side?: ComponentProps<typeof Tooltip>["side"];
  size?: keyof typeof flush;
}) {
  return (
    <Tooltip content={label} shortcut={shortcut} side={side}>
      <Button
        variant="ghost"
        size={size}
        aria-label={label}
        className={cn(flush[size], className)}
        {...props}
      />
    </Tooltip>
  );
}
