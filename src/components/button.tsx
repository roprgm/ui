import { cn } from "cn";
import { type ComponentProps, cloneElement, type ReactElement } from "react";
import "./tokens.css";
import "./button.css";

/** An action. `render` draws it as another element: `<Button render={<a href="/" />}>`. */
export function Button({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: ComponentProps<"button"> & {
  variant?: "default" | "primary" | "ghost" | null;
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null;
  render?: ReactElement<{ className?: string }>;
}) {
  const classes = cn("button", className);
  const attributes = {
    "data-slot": "button",
    "data-variant": variant ?? undefined,
    "data-size": size ?? undefined,
    ...props,
  };
  if (render) {
    return cloneElement(render, {
      ...attributes,
      className: cn(classes, render.props.className),
    });
  }
  return <button type="button" className={classes} {...attributes} />;
}
