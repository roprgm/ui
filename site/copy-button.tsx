import { cn } from "cn";
import { type ComponentProps, useState } from "react";
import { IconButton } from "../src/icon-button";
import { CopyIcon } from "./icons";

/** Copies `value`. The copy icon shrinks away and a check draws itself in, then the reverse. */
export function CopyButton({
  value,
  className,
  ...props
}: Omit<ComponentProps<typeof IconButton>, "label" | "onClick"> & {
  value: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <IconButton
      label={copied ? "Copied" : "Copy"}
      onClick={copy}
      data-copied={copied}
      className={cn("group", className)}
      {...props}
    >
      <span className="grid *:[grid-area:1/1]">
        <span className="transition delay-150 duration-150 group-data-[copied=true]:scale-50 group-data-[copied=true]:opacity-0 group-data-[copied=true]:delay-0">
          <CopyIcon />
        </span>
        <DrawnCheck />
      </span>
    </IconButton>
  );
}

function DrawnCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      {/* pathLength 1 makes the dash the whole stroke; the gap of 2 keeps the round cap from showing while it's hidden. */}
      <path
        d="m5 13 4 4L19 7"
        pathLength={1}
        className="transition-[stroke-dashoffset] duration-150 ease-in [stroke-dasharray:1_2] [stroke-dashoffset:1] group-data-[copied=true]:delay-100 group-data-[copied=true]:duration-300 group-data-[copied=true]:ease-out group-data-[copied=true]:[stroke-dashoffset:0]"
      />
    </svg>
  );
}
