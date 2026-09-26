import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { type ComponentProps, cloneElement, type ReactElement } from "react";

const button = cva(
  // Colors ease over 200ms; the 1px press moves faster, since the last entry for a property wins.
  "inline-flex h-control cursor-pointer items-center justify-center gap-1.5 rounded-md px-3 whitespace-nowrap [transition:all_200ms_var(--default-transition-timing-function),translate_100ms_var(--default-transition-timing-function)] focus-ring active:not-aria-[haspopup]:translate-y-px dim-disabled",
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
      // The three control heights. Labels sit 10px, 12px, and 14px in, set by eye: a label needs
      // more room at its sides than a field's text to look balanced in its box. A leading icon
      // sits 2px closer to the edge, since its box has air of its own around the stroke.
      size: {
        default: "has-[>svg:first-child]:pl-2.5",
        sm: "h-control-sm px-2.5 has-[>svg:first-child]:pl-2",
        /** With large fields and selects. */
        lg: "h-control-lg px-3.5 has-[>svg:first-child]:pl-3",
        icon: "w-control px-0",
        /** For ghost actions inside a field, where it sits 4px in, and close buttons. */
        "icon-sm": "size-control-sm px-0",
        "icon-lg": "size-control-lg px-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

// Inline, a button lays out as its content, as text does: its margins take back its side padding
// and whatever makes it taller than a line, and its box shows past them on hover.
const inlineMargins = {
  default: "-mx-3 -my-1",
  sm: "-mx-2.5 -my-0.5",
  lg: "-mx-3.5 -my-1.5",
  icon: "-mx-1.5 -my-1",
  "icon-sm": "-mx-1 -my-0.5",
  "icon-lg": "-mx-2 -my-1.5",
};

/**
 * An action. `render` draws it as another element, such as a link:
 * `<Button render={<Link href="/" />}>Home</Button>`. `inline` lays a ghost out as its content, so
 * it lines up with text beside it or with a container's edge, as a card header's icon buttons do.
 */
export function Button({
  className,
  variant,
  size,
  inline = false,
  render,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof button> & {
    inline?: boolean;
    render?: ReactElement<{ className?: string }>;
  }) {
  const classes = cn(
    button({ variant, size }),
    inline && inlineMargins[size ?? "default"],
    className,
  );
  if (render) {
    return cloneElement(render, {
      ...props,
      className: cn(classes, render.props.className),
    });
  }
  return <button type="button" className={classes} {...props} />;
}
