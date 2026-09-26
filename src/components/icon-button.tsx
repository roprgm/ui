"use client";

import type { ComponentProps } from "react";
import { Button } from "./button";
import { Tooltip } from "./tooltip";

/** A ghost icon button; `label` names it for assistive technology and shows as its tooltip. */
export function IconButton({
  label,
  shortcut,
  side,
  ...props
}: ComponentProps<typeof Button> & {
  label: string;
  shortcut?: string;
  side?: ComponentProps<typeof Tooltip>["side"];
}) {
  return (
    <Tooltip content={label} shortcut={shortcut} side={side}>
      <Button variant="ghost" size="icon" aria-label={label} {...props} />
    </Tooltip>
  );
}
