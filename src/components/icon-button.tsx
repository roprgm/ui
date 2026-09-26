"use client";

import { cn } from "cn";
import type { ComponentProps } from "react";
import { Button } from "./button";
import { Tooltip } from "./tooltip";

// A ghost has no box to show, so it lays out as what it shows: as wide as its 16px icon and as
// tall as a line of text. Its icon lines up with the text around it, and the box it highlights on
// hover reaches past those bounds.
const trim = {
  icon: "-mx-1.5 -my-1",
  "icon-sm": "-mx-1 -my-0.5",
  "icon-lg": "-mx-2 -my-1.5",
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
  size?: keyof typeof trim;
}) {
  return (
    <Tooltip content={label} shortcut={shortcut} side={side}>
      <Button
        variant="ghost"
        size={size}
        aria-label={label}
        className={cn(trim[size], className)}
        {...props}
      />
    </Tooltip>
  );
}
