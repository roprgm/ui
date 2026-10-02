import { cn } from "cn";
import { Swatches } from "./swatches";

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

export function Levels() {
  return (
    // On black rather than a card, so nothing but the levels tints them.
    <div className="grid grid-cols-13 rounded-xl bg-level-0 p-1.5">
      {levels.map((level, index) => (
        <div
          key={level}
          className={cn(
            "flex h-28 items-end justify-center pb-2 text-secondary tabular-nums first:rounded-l-md last:rounded-r-md",
            level,
          )}
        >
          {index}
        </div>
      ))}
    </div>
  );
}

// Where each fill sits by default, to read text on it.
const grounds = [
  { name: "Background", className: "bg-background" },
  { name: "Card", className: "bg-card" },
  { name: "Raised popup", className: "bg-level-6" },
] as const;

export function TextColors() {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {grounds.map((ground) => (
        <div
          key={ground.name}
          className={cn("flex flex-col gap-1 rounded-xl p-4", ground.className)}
        >
          <span className="mb-2 text-muted">{ground.name}</span>
          <span className="text-foreground">Foreground</span>
          <span className="text-secondary">Secondary</span>
          <span className="text-muted">Muted</span>
          <span className="text-disabled">Disabled</span>
        </div>
      ))}
    </div>
  );
}

const accents = [
  "neutral",
  "violet",
  "blue",
  "green",
  "amber",
  "orange",
  "coral",
  "rose",
] as const;

export function Accents() {
  return (
    <Swatches
      swatches={accents.map((accent) => ({
        name: accent,
        code: `data-accent="${accent}"`,
        className: "bg-accent text-on-accent",
        attributes: { "data-accent": accent },
      }))}
    />
  );
}

export function States() {
  return (
    <Swatches
      swatches={[
        {
          name: "success",
          code: "text-success",
          className: "bg-success text-level-1",
        },
        {
          name: "warning",
          code: "text-warning",
          className: "bg-warning text-level-1",
        },
        {
          name: "danger",
          code: "text-danger",
          className: "bg-danger text-level-1",
        },
      ]}
    />
  );
}

export function Translucent() {
  return (
    <Swatches
      swatches={[
        { name: "border", code: "bg-border", className: "bg-border" },
        {
          name: "border-subtle",
          code: "bg-border-subtle",
          className: "bg-border-subtle",
        },
        { name: "pressed", code: "bg-pressed", className: "bg-pressed" },
        { name: "focus", code: "outline-focus", className: "bg-focus" },
      ]}
    />
  );
}
