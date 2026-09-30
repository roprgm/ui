import { cn } from "cn";
import type { ComponentProps } from "react";
import { sections } from "./section";
import "./tokens.css";
import "./card.css";
import "./surfaces.css";

/** A box padded as its content needs; its `Section`s stack with a line between each. */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(sections(), "card surface-card", className)}
      {...props}
    />
  );
}
