import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";

const field = cva(
  [
    "w-full min-w-0 rounded-md material-field px-2.5 text-foreground transition focus-ring placeholder:text-secondary dim-disabled aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-danger/60",
    // The file picker's button, 3px into the field.
    "file:mt-0.75 file:mr-3 file:-ml-1.75 file:cursor-pointer file:rounded-sm file:border-0 file:material-control file:px-2 file:text-foreground file:transition hover:file:bg-control-hover",
  ],
  {
    variants: {
      size: {
        default:
          "h-(--spacing-control) file:h-[calc(var(--spacing-control)-6px)]",
        lg: "h-(--spacing-control-lg) file:h-[calc(var(--spacing-control-lg)-6px)]",
      },
    },
  },
);

/** A text field. `aria-invalid` rings it red. */
export function Input({
  size = "default",
  className,
  ...props
}: Omit<ComponentProps<"input">, "size"> & VariantProps<typeof field>) {
  return (
    <input
      data-slot="input"
      data-size={size}
      className={cn(field({ size }), className)}
      {...props}
    />
  );
}

/** An Input with addons over its edges; pad the Input clear of them, as `pl-(--spacing-control)`. */
export function InputGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn("relative", className)}
      {...props}
    />
  );
}

/**
 * An icon, a short text, or an icon button over the Input's `start` or `end`, centered in a column
 * at least as wide as a control; a button's is square. Only a button takes the pointer.
 */
export function InputGroupAddon({
  align = "start",
  className,
  ...props
}: ComponentProps<"div"> & { align?: "start" | "end" }) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        "pointer-events-none absolute inset-y-0 flex min-w-(--spacing-control) items-center justify-center px-1.5 text-secondary has-[button]:aspect-square [&_button]:pointer-events-auto has-[button]:px-0",
        align === "start" ? "left-0" : "right-0",
        className,
      )}
      {...props}
    />
  );
}
