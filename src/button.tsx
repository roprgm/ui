import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { type ComponentProps, cloneElement, type ReactElement } from "react";

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

/**
 * An action. `render` draws it as another element, such as a link:
 * `<Button render={<Link href="/" />}>Home</Button>`.
 */
export function Button({
  className,
  variant,
  size,
  render,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof button> & {
    render?: ReactElement<{ className?: string }>;
  }) {
  const classes = cn(button({ variant, size }), className);
  if (render) {
    return cloneElement(render, {
      ...props,
      className: cn(classes, render.props.className),
    });
  }
  return <button type="button" className={classes} {...props} />;
}
