import { mergeProps } from "@base-ui/react/merge-props";
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
          "material-control text-foreground hover:bg-control-hover data-popup-open:bg-control-hover",
        primary:
          "material-control bg-primary text-on-primary hover:bg-primary-hover",
        // A control's fill without its edge, as a selected row is drawn.
        flat: "bg-control text-foreground hover:bg-control-hover data-popup-open:bg-control-hover",
        ghost:
          "text-secondary hover:bg-hover hover:text-foreground active:bg-pressed data-popup-open:bg-hover data-popup-open:text-foreground",
      },
      // Labels are at least as wide as tall, and icons square. A leading icon sits 4px closer to
      // the edge, since its box has air around the stroke.
      size: {
        default:
          "h-(--spacing-control) min-w-(--spacing-control) has-[>svg:first-child]:pl-2",
        sm: "h-(--spacing-control-sm) min-w-(--spacing-control-sm) px-2.5 has-[>svg:first-child]:pl-1.5",
        lg: "h-(--spacing-control-lg) min-w-(--spacing-control-lg) px-3.5 has-[>svg:first-child]:pl-2.5",
        icon: "size-(--spacing-control) px-0",
        "icon-sm": "size-(--spacing-control-sm) px-0",
        "icon-lg": "size-(--spacing-control-lg) px-0",
      },
    },
  },
);

/** An action. `render` draws it as another element: `<Button render={<a href="/" />}>`. */
export function Button({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof button> & {
    render?: ReactElement<{ className?: string; "data-slot"?: string }>;
  }) {
  const classes = cn(button({ variant, size }), className);
  const attributes = {
    "data-slot": render?.props["data-slot"] ?? "button",
    "data-variant": variant,
    "data-size": size,
  };
  if (render) {
    return cloneElement(render, {
      ...mergeProps(render.props, { ...attributes, ...props }),
      className: cn(classes, render.props.className),
    });
  }
  return (
    <button type="button" {...attributes} className={classes} {...props} />
  );
}
