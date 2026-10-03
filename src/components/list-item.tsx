import { mergeProps } from "@base-ui/react/merge-props";
import { cn } from "cn";
import { type ComponentProps, cloneElement, type ReactElement } from "react";

/**
 * A row in a panel's list, such as a layer. `render` draws it as another element:
 * `<ListItem render={<a href="/layers/sky" />}>`.
 */
export function ListItem({
  selected = false,
  muted = false,
  render,
  className,
  ...props
}: ComponentProps<"div"> & {
  selected?: boolean;
  muted?: boolean;
  render?: ReactElement<{ className?: string }>;
}) {
  const attributes = {
    "data-slot": "list-item",
    "data-selected": selected,
    "data-muted": muted,
  };
  // Styled by its slot in rows.css, since a list repeats it; `group` lets what's inside react to it.
  const classes = cn("group", className);
  if (render) {
    return cloneElement(render, {
      ...mergeProps(render.props, { ...attributes, ...props }),
      className: cn(classes, render.props.className),
    });
  }
  return <div {...attributes} className={classes} {...props} />;
}

/** Ghost icon buttons at the row's end, reaching into its padding so each icon sits 12px in. */
export function ListItemAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="list-item-action"
      className={cn("-mr-2 flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  );
}
