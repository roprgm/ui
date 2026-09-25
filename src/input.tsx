import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";

const field = cva(
  [
    "h-(--size-field) w-full min-w-0 rounded-md surface-sunken bg-field px-2.5 text-foreground transition focus-ring placeholder:text-faint dim-disabled aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-danger/60",
    // The picker button is set `--padding-xs` into the field, as a toggle is into its group.
    "file:mt-(--padding-xs) file:mr-3 file:-ml-[calc(10px-var(--padding-xs))] file:h-[calc(var(--size-field)-2*var(--padding-xs))] file:cursor-pointer file:rounded-sm file:border-0 file:surface-raised file:bg-raised file:px-2 file:text-foreground file:transition hover:file:bg-raised-hover",
  ],
  {
    variants: {
      /** A Button's heights, so a field lines up with the buttons and selects beside it. */
      size: {
        default: "[--size-field:var(--size-control)]",
        lg: "[--size-field:var(--size-control-lg)]",
      },
    },
    defaultVariants: { size: "default" },
  },
);

/** A sunken text field. `aria-invalid` rings it red; `type="file"` styles the picker button. */
export function Input({
  size,
  className,
  ...props
}: Omit<ComponentProps<"input">, "size"> & VariantProps<typeof field>) {
  return <input className={cn(field({ size }), className)} {...props} />;
}
