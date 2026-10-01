"use client";

import type { ComponentProps } from "react";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

/** A ghost icon button; `label` names it and shows as its tooltip. */
export function IconButton({
  label,
  shortcut,
  side,
  ...props
}: ComponentProps<typeof Button> & {
  label: string;
  shortcut?: string;
  side?: ComponentProps<typeof TooltipContent>["side"];
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            data-slot="icon-button"
            variant="ghost"
            size="icon"
            aria-label={label}
            {...props}
          />
        }
      />
      <TooltipContent side={side} shortcut={shortcut}>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
