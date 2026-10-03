import { mergeProps } from "@base-ui/react/merge-props";
import { cn } from "cn";
import { type ComponentProps, cloneElement, type ReactElement } from "react";

/** Where a page sits, as a row of links that scrolls where it doesn't fit. */
export function Breadcrumb({
  className,
  children,
  ...props
}: ComponentProps<"nav">) {
  return (
    <nav
      data-slot="breadcrumb"
      aria-label="Breadcrumb"
      className={cn("min-w-0", className)}
      {...props}
    >
      <ol
        data-slot="breadcrumb-list"
        className="flex items-center gap-1.5 overflow-fade-x whitespace-nowrap text-secondary"
      >
        {children}
      </ol>
    </nav>
  );
}

/** A step of the path, after a slash; the current page's takes `aria-current="page"`. */
export function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn(
        // The slash reads as nothing to a screen reader.
        "flex items-center gap-1.5 not-first:before:text-muted not-first:before:content-['/'_/_''] aria-[current=page]:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

/** A step's link. `render` draws it as another element: `<BreadcrumbLink render={<Link to="/" />}>`. */
export function BreadcrumbLink({
  render,
  className,
  ...props
}: ComponentProps<"a"> & {
  render?: ReactElement<{ className?: string }>;
}) {
  const classes = cn(
    "rounded-xs text-secondary transition-colors focus-ring hover:text-foreground",
    className,
  );
  if (render) {
    return cloneElement(render, {
      ...mergeProps(render.props, { "data-slot": "breadcrumb-link", ...props }),
      className: cn(classes, render.props.className),
    });
  }
  return <a data-slot="breadcrumb-link" className={classes} {...props} />;
}
