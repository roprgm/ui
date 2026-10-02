import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Children, type ComponentProps, type ReactNode } from "react";

const badge = cva(
  // Flat, as a Chip is, and at least as wide as it is tall, so a one-digit count is round.
  "inline-flex shrink-0 items-center justify-center gap-1 rounded-full whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-pressed text-foreground",
        accent: "bg-accent text-on-accent",
        // A line in the text's color, so a state color sets both.
        outline: "text-secondary inset-ring inset-ring-current/40",
      },
      size: {
        default: "h-5.5 min-w-5.5 px-1.75",
        // A count beside a label, a step smaller than the text around it.
        sm: "h-5 min-w-5 px-1.5 text-[0.875em]",
        // A count in a short row, such as a tree's.
        xs: "h-4.5 min-w-4.5 px-1 text-[0.8125em]",
      },
    },
  },
);

/**
 * Each run of text as one label, trimmed to its capitals so it centers by its ink rather than
 * its line, as an icon beside it does.
 */
function labeled(children: ReactNode) {
  const parts: ReactNode[] = [];
  let text = "";
  const flush = () => {
    if (text) {
      parts.push(
        <span
          key={parts.length}
          data-slot="badge-label"
          className="[text-box:trim-both_cap_alphabetic]"
        >
          {text}
        </span>,
      );
    }
    text = "";
  };
  for (const child of Children.toArray(children)) {
    if (typeof child === "string" || typeof child === "number") {
      text += child;
    } else {
      flush();
      parts.push(child);
    }
  }
  flush();
  return parts;
}

/** A short label, such as a status or a count. */
export function Badge({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badge>) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={cn(badge({ variant, size }), className)}
      {...props}
    >
      {labeled(children)}
    </span>
  );
}
