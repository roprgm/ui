import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";
import { Tooltip } from "./tooltip";

const button = cva(
  "inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md px-3 whitespace-nowrap transition focus-ring active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-700 text-neutral-100 shadow-raised hover:bg-neutral-600",
        primary:
          "bg-neutral-100 text-neutral-900 shadow-raised text-shadow-subtle hover:bg-white",
        ghost:
          "text-neutral-400 hover:bg-white/8 hover:text-neutral-100 active:bg-white/12 data-popup-open:bg-white/8 data-popup-open:text-neutral-100",
      },
      size: {
        default: "",
        icon: "w-8 px-0",
        /** For panel headers and rows, where it sits 6px inside a 40px row. */
        "icon-sm": "size-7 px-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof button>) {
  return (
    <button
      type="button"
      className={cn(button({ variant, size }), className)}
      {...props}
    />
  );
}

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
