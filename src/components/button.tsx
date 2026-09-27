import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { type ComponentProps, cloneElement, type ReactElement } from "react";

const button = cva(
  // The 1px press moves faster than the colors ease.
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md px-3 whitespace-nowrap [transition:all_200ms_var(--default-transition-timing-function),translate_100ms_var(--default-transition-timing-function)] focus-ring active:not-aria-[haspopup]:translate-y-px dim-disabled",
  {
    variants: {
      variant: {
        default:
          "surface-raised text-foreground hover:bg-raised-hover data-popup-open:bg-raised-hover",
        primary:
          "surface-primary text-on-primary text-shadow-(--text-shadow-subtle) hover:bg-primary-hover",
        ghost:
          "text-muted hover:bg-hover hover:text-foreground active:bg-pressed data-popup-open:bg-hover data-popup-open:text-foreground",
      },
      // Labels are at least as wide as tall, and icons square. A leading icon sits 4px closer to
      // the edge, since its box has air around the stroke.
      size: {
        default: "h-7 min-w-7 has-[>svg:first-child]:pl-2",
        sm: "h-6 min-w-6 px-2.5 has-[>svg:first-child]:pl-1.5",
        lg: "h-8 min-w-8 px-3.5 has-[>svg:first-child]:pl-2.5",
        icon: "size-7 px-0",
        "icon-sm": "size-6 px-0",
        "icon-lg": "size-8 px-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

/** An action. `render` draws it as another element: `<Button render={<a href="/" />}>`. */
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
