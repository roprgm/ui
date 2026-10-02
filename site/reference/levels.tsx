"use client";

import { cn } from "cn";
import { useState } from "react";

const levels = [
  "bg-level-0",
  "bg-level-1",
  "bg-level-2",
  "bg-level-3",
  "bg-level-4",
  "bg-level-5",
  "bg-level-6",
  "bg-level-7",
  "bg-level-8",
  "bg-level-9",
  "bg-level-10",
  "bg-level-11",
  "bg-level-12",
] as const;

/**
 * The palette, darkest first, on black so the page's own level shows too, with its token's name
 * under it: the level under the pointer fills in its number, and keeps it.
 */
export function Levels() {
  const [level, setLevel] = useState<number>();
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="grid w-full grid-cols-13 gap-0.5 rounded-xl bg-level-0 p-1">
        {levels.map((className, index) => (
          <div
            key={className}
            onPointerEnter={() => setLevel(index)}
            className={cn(
              "flex h-10 items-end justify-center pb-1 text-xs text-secondary tabular-nums first:rounded-l-lg last:rounded-r-lg",
              className,
            )}
          >
            {index}
          </div>
        ))}
      </div>
      <code className="rounded-sm bg-level-4 px-1.25 py-px font-mono text-xs text-foreground">
        --color-level-{level ?? "x"}
      </code>
    </div>
  );
}
