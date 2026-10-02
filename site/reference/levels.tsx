import { cn } from "cn";

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

/** The palette, darkest first, on black so the page's own level shows too. */
export function Levels() {
  return (
    <div className="grid grid-cols-13 gap-0.5 rounded-xl bg-level-0 p-1">
      {levels.map((level, index) => (
        <div
          key={level}
          className={cn(
            "flex h-10 items-end justify-center pb-1 text-xs text-secondary tabular-nums first:rounded-l-lg last:rounded-r-lg",
            level,
          )}
        >
          {index}
        </div>
      ))}
    </div>
  );
}
