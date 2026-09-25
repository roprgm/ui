import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { type ComponentProps, cloneElement, type ReactElement } from "react";

const button = cva(
  // Colors ease over 200ms; the 1px press moves faster, since the last entry for a property wins.
  "inline-flex h-(--size-control) cursor-pointer items-center justify-center gap-2 rounded-md px-3 whitespace-nowrap [transition:all_200ms_var(--default-transition-timing-function),translate_100ms_var(--default-transition-timing-function)] focus-ring active:not-aria-[haspopup]:translate-y-px dim-disabled",
  {
    variants: {
      variant: {
        default:
          "surface-raised text-foreground hover:bg-raised-hover data-popup-open:bg-raised-hover",
        primary:
          "surface-primary text-on-primary text-shadow-subtle hover:bg-primary-hover",
        ghost:
          "text-muted hover:bg-hover hover:text-foreground active:bg-pressed data-popup-open:bg-hover data-popup-open:text-foreground",
      },
      size: {
        default: "",
        icon: "w-(--size-control) px-0",
        /** For panel headers and rows, where it sits 6px inside a 40px row. */
        "icon-sm": "size-(--size-control-sm) px-0",
        /** For ghost actions inside a field, where it sits 4px in. */
        "icon-xs": "size-6 px-0",
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
