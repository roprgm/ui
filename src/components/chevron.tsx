import { cn } from "cn";
import styles from "./chevron.module.css";

/** One right-pointing stroke turned to `direction`, so changing it animates the turn. */
export function Chevron({
  direction = "down",
  size = "md",
  className,
}: {
  direction?: "right" | "down" | "left" | "up";
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <svg
      data-slot="chevron"
      data-direction={direction}
      data-size={size}
      viewBox="5 5 14 14"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(styles.chevron, className)}
      aria-hidden
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
