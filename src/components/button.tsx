import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { type ComponentProps, cloneElement, type ReactElement } from "react";

const button = cva(
  // Colors ease over 200ms; the 1px press moves faster, since the last entry for a property wins.
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md px-3 whitespace-nowrap [transition:all_200ms_var(--default-transition-timing-function),translate_100ms_var(--default-transition-timing-function)] focus-ring active:not-aria-[haspopup]:translate-y-px dim-disabled",
  {
    variants: {
      variant: {
        default:
          "surface-raised text-foreground hover:bg-raised-hover data-popup-open:bg-raised-hover",
        primary:
          "surface-raised bg-primary! text-on-primary text-shadow-(--text-shadow-subtle) hover:bg-primary-hover!",
        ghost:
          "text-muted hover:bg-hover hover:text-foreground active:bg-pressed data-popup-open:bg-hover data-popup-open:text-foreground",
      },
      // The three control heights, each at least as wide as it is tall, so an icon alone makes a
      // square. Labels sit 10px, 12px, and 14px in, set by eye: a label needs more room at its
      // sides than a field's text to look balanced in its box. A leading icon sits 2px closer to
      // the edge, since its box has air of its own around the stroke.
      size: {
        default: "h-control min-w-control has-[>svg:first-child]:pl-2.5",
        sm: "h-control-sm min-w-control-sm px-2.5 has-[>svg:first-child]:pl-2",
        /** With large fields and selects. */
        lg: "h-control-lg min-w-control-lg px-3.5 has-[>svg:first-child]:pl-3",
        icon: "h-control min-w-control px-0",
        /** For a card header's actions, ghost actions inside a field, and close buttons. */
        "icon-sm": "h-control-sm min-w-control-sm px-0",
        "icon-lg": "h-control-lg min-w-control-lg px-0",
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
