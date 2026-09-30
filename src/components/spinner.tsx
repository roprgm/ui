import { cn } from "cn";
import type { ComponentProps } from "react";
import styles from "./spinner.module.css";

export function Spinner({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      className={cn(styles.spinner, className)}
      {...props}
    />
  );
}
