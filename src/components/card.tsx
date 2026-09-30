import { cn } from "cn";
import type { ComponentProps } from "react";
import styles from "./card.module.css";

/** A box padded as its content needs; its `Section`s stack with a line between each. */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="card" className={cn(styles.card, className)} {...props} />
  );
}
