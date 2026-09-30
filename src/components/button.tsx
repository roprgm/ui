import { cn } from "cn";
import { type ComponentProps, cloneElement, type ReactElement } from "react";
import styles from "./button.module.css";

/** An action. `render` draws it as another element: `<Button render={<a href="/" />}>`. */
export function Button({
  variant = "default",
  size = "default",
  render,
  className,
  ...props
}: ComponentProps<"button"> & {
  variant?: "default" | "primary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  render?: ReactElement<{ className?: string }>;
}) {
  const attributes = {
    "data-slot": "button",
    "data-variant": variant,
    "data-size": size,
    ...props,
  };
  const classes = cn(styles.button, className);
  if (render) {
    return cloneElement(render, {
      ...attributes,
      className: cn(classes, render.props.className),
    });
  }
  return <button type="button" className={classes} {...attributes} />;
}
