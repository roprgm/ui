"use client";

import { Separator as Primitive } from "@base-ui/react/separator";
import { cn } from "cn";

/** A line between groups: across, or upright with `orientation="vertical"`. */
export function Separator({ className, ...props }: Primitive.Props) {
  return (
    <Primitive
      data-slot="separator"
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
        className,
      )}
      {...props}
    />
  );
}
