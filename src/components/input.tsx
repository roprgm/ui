import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";

/** A recipe for what you type into: sunken, with a muted placeholder, ringed red when invalid. */
export const field =
  "w-full min-w-0 rounded-md surface-sunken px-2.5 text-foreground transition focus-ring placeholder:text-muted dim-disabled aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-danger/60";

const input = cva(
  [
    field,
    // The file picker's button, 3px into the field.
    "file:mt-0.75 file:mr-3 file:-ml-1.75 file:cursor-pointer file:rounded-sm file:border-0 file:surface-raised file:px-2 file:text-foreground file:transition hover:file:bg-raised-hover",
  ],
  {
    variants: {
      size: {
        default: "h-7 file:h-5.5",
        lg: "h-8 file:h-6.5",
      },
    },
  },
);

/** A text field. `aria-invalid` rings it red. */
export function Input({
  size = "default",
  className,
  ...props
}: Omit<ComponentProps<"input">, "size"> & VariantProps<typeof input>) {
  return (
    <input
      data-slot="input"
      data-size={size}
      className={cn(input({ size }), className)}
      {...props}
    />
  );
}
