import { cn } from "cn";
import type { ReactNode } from "react";
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
    // On black rather than the page, so the page's own level shows too.
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

/** A color's sample, faintly ringed so one that matches its ground still shows. */
function Chip({
  className,
  children,
}: {
  className: string;
  children?: ReactNode;
}) {
  return (
    <span
      className={cn(
        "relative grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-md font-medium ring-1 ring-foreground/10 ring-inset",
        className,
      )}
    >
      {children}
    </span>
  );
}

function Name({ name, use }: { name: string; use: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <code className="truncate font-mono text-xs text-foreground">{name}</code>
      <span className="text-secondary">{use}</span>
    </div>
  );
}

type Token = { name: string; use: string; chip: ReactNode };

/** Tokens side by side, each with its sample, name, and use. */
function Tokens({ tokens }: { tokens: Token[] }) {
  return (
    <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
      {tokens.map((token) => (
        <div key={token.name} className="flex items-center gap-3">
          {token.chip}
          <Name name={token.name} use={token.use} />
        </div>
      ))}
    </div>
  );
}

const where = [
  {
    name: "background",
    use: "The fill of where you are.",
    fill: "bg-background",
  },
  {
    name: "hover",
    use: "A quiet fill on it: a ghost's hover.",
    fill: "bg-hover",
  },
  {
    name: "control",
    use: "What you press, and a selected row.",
    fill: "bg-control",
  },
  {
    name: "control-hover",
    use: "A control under the pointer.",
    fill: "bg-control-hover",
  },
  { name: "field", use: "Where you set a value.", fill: "bg-field" },
  { name: "foreground", use: "Text and icons.", text: "text-foreground" },
  { name: "secondary", use: "Supporting text.", text: "text-secondary" },
  { name: "muted", use: "Hints.", text: "text-muted" },
  { name: "disabled", use: "What is disabled.", text: "text-disabled" },
];

const grounds = [
  { name: "Page", className: undefined, raised: false },
  { name: "Card", className: "material-card", raised: false },
  { name: "Raised", className: "material-float", raised: true },
];

/** Each color of where you are, read in a real page, card, and raised popup, so each shows as its container sets it. */
export function Grounds() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_repeat(3,4rem)] grid-rows-[repeat(10,auto)] gap-x-1.5 sm:grid-cols-[minmax(0,1fr)_repeat(3,6rem)]">
      <div className="row-span-full grid grid-rows-subgrid">
        <span />
        {where.map((color) => (
          <div key={color.name} className="flex min-h-12 items-center py-1.5">
            <Name name={color.name} use={color.use} />
          </div>
        ))}
      </div>
      {grounds.map((ground) => (
        <div
          key={ground.name}
          data-raised={ground.raised || undefined}
          className={cn(
            "row-span-full grid grid-rows-subgrid justify-items-center rounded-xl pb-1.5",
            ground.className,
          )}
        >
          <span className="pt-2.5 pb-1 text-xs text-muted">{ground.name}</span>
          {where.map((color) => (
            <div key={color.name} className="grid place-items-center">
              {color.fill ? (
                <Chip className={color.fill} />
              ) : (
                <span className={cn("text-base font-medium", color.text)}>
                  Aa
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function AccentTokens() {
  return (
    <Tokens
      tokens={[
        {
          name: "accent",
          use: "What is on: a checked box, a selected tab's mark.",
          chip: <Chip className="bg-accent" />,
        },
        {
          name: "on-accent",
          use: "Text and icons on the accent.",
          chip: <Chip className="bg-accent text-on-accent">Aa</Chip>,
        },
        {
          name: "accent-text",
          use: "The accent as text, such as a link.",
          chip: <Chip className="text-accent-text">Aa</Chip>,
        },
        {
          name: "primary",
          use: "The main action: a primary button.",
          chip: <Chip className="bg-primary" />,
        },
        {
          name: "primary-hover",
          use: "A primary button under the pointer.",
          chip: <Chip className="bg-primary-hover" />,
        },
        {
          name: "on-primary",
          use: "Text and icons on the primary.",
          chip: <Chip className="bg-primary text-on-primary">Aa</Chip>,
        },
      ]}
    />
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

export function StateTokens() {
  return (
    <Tokens
      tokens={[
        {
          name: "success",
          use: "Completed and healthy, with a label.",
          chip: <Chip className="bg-success" />,
        },
        {
          name: "warning",
          use: "Needs attention soon, with a label.",
          chip: <Chip className="bg-warning" />,
        },
        {
          name: "danger",
          use: "Destructive actions and errors, with a label.",
          chip: <Chip className="bg-danger" />,
        },
      ]}
    />
  );
}

/** A translucent color over the palette, its left half bare to compare. */
function Over({ className }: { className: string }) {
  return (
    <Chip className="w-16 bg-[linear-gradient(to_right,var(--color-level-0),var(--color-level-12))]">
      <span className={cn("absolute inset-y-0 right-0 w-1/2", className)} />
    </Chip>
  );
}

export function TranslucentTokens() {
  return (
    <Tokens
      tokens={[
        {
          name: "border",
          use: "Separators.",
          chip: <Over className="bg-border" />,
        },
        {
          name: "border-subtle",
          use: "Dividers inside a material, such as a card's sections.",
          chip: <Over className="bg-border-subtle" />,
        },
        {
          name: "pressed",
          use: "A ghost button or chip held down, or on.",
          chip: <Over className="bg-pressed" />,
        },
        {
          name: "focus",
          use: "The focus ring.",
          chip: <Over className="bg-focus" />,
        },
        {
          name: "backdrop",
          use: "The shade behind a dialog.",
          chip: <Over className="bg-backdrop" />,
        },
      ]}
    />
  );
}

export function OtherTokens() {
  return (
    <Tokens
      tokens={[
        {
          name: "tooltip",
          use: "A tooltip's fill.",
          chip: <Chip className="bg-tooltip" />,
        },
        {
          name: "code-*",
          use: "Code, as a highlighter marks it: keyword, string, type, and property.",
          chip: (
            <Chip className="w-16 grid-cols-4">
              <span className="h-full w-full bg-code-keyword" />
              <span className="h-full w-full bg-code-string" />
              <span className="h-full w-full bg-code-type" />
              <span className="h-full w-full bg-code-property" />
            </Chip>
          ),
        },
      ]}
    />
  );
}
