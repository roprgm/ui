import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";

const field = cva(
  [
    "w-full min-w-0 rounded-md surface-field px-2.5 text-foreground transition focus-ring placeholder:text-secondary dim-disabled aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-danger/60",
    // The file picker's button, 3px into the field.
    "file:mt-0.75 file:mr-3 file:-ml-1.75 file:cursor-pointer file:rounded-sm file:border-0 file:surface-control file:px-2 file:text-foreground file:transition hover:file:bg-control-hover",
  ],
  {
    variants: {
      size: {
        default: "h-control file:h-[calc(var(--spacing-control)-6px)]",
        lg: "h-control-lg file:h-[calc(var(--spacing-control-lg)-6px)]",
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
