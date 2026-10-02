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
      <code className="truncate font-mono text-xs text-foreground">
        --color-{name}
      </code>
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

export function WhereTokens() {
  return (
    <Tokens
      tokens={[
        {
          name: "background",
          use: "Where you are.",
          chip: <Chip className="bg-background" />,
        },
        {
          name: "hover",
          use: "A ghost's hover.",
          chip: <Chip className="bg-hover" />,
        },
        {
          name: "foreground",
          use: "Text and icons.",
          chip: <Chip className="text-foreground">Aa</Chip>,
        },
        {
          name: "secondary",
          use: "Supporting text.",
          chip: <Chip className="text-secondary">Aa</Chip>,
        },
        {
          name: "muted",
          use: "Hints.",
          chip: <Chip className="text-muted">Aa</Chip>,
        },
        {
          name: "disabled",
          use: "What is disabled.",
          chip: <Chip className="text-disabled">Aa</Chip>,
        },
      ]}
    />
  );
}

export function AccentTokens() {
  return (
    <Tokens
      tokens={[
        {
          name: "accent",
          use: "What is on.",
          chip: <Chip className="bg-accent" />,
        },
        {
          name: "on-accent",
          use: "Text on the accent.",
          chip: <Chip className="bg-accent text-on-accent">Aa</Chip>,
        },
        {
          name: "accent-text",
          use: "The accent as text.",
          chip: <Chip className="text-accent-text">Aa</Chip>,
        },
        {
          name: "primary",
          use: "The main action.",
          chip: <Chip className="bg-primary" />,
        },
        {
          name: "primary-hover",
          use: "Under the pointer.",
          chip: <Chip className="bg-primary-hover" />,
        },
        {
          name: "on-primary",
          use: "Text on the primary.",
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
          use: "Done, with a label.",
          chip: <Chip className="bg-success" />,
        },
        {
          name: "warning",
          use: "Needs attention, with a label.",
          chip: <Chip className="bg-warning" />,
        },
        {
          name: "danger",
          use: "Errors, with a label.",
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
          use: "Dividers inside a material.",
          chip: <Over className="bg-border-subtle" />,
        },
        {
          name: "pressed",
          use: "Held down, or on.",
          chip: <Over className="bg-pressed" />,
        },
        {
          name: "focus",
          use: "The focus ring.",
          chip: <Over className="bg-focus" />,
        },
        {
          name: "backdrop",
          use: "Behind a dialog.",
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
          use: "Keyword, string, type, property.",
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
