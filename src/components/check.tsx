import { cn } from "cn";

/** A check mark, as on the chosen rows of a select or combobox. */
export function Check({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-3.5 shrink-0", className)}
      aria-hidden
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}
