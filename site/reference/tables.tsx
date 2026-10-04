import { cn } from "cn";

type Entry = { name: string; swatch?: string; use: string };

/** Names and what each is for, as rows of text. */
export function Reference({ entries }: { entries: Entry[] }) {
  return (
    <dl className="flex flex-col">
      {entries.map((entry) => (
        <div
          key={entry.name}
          className="grid gap-x-6 gap-y-1 py-2.5 sm:grid-cols-[16rem_minmax(0,1fr)]"
        >
          <dt className="flex min-w-0 items-center gap-2.5">
            {entry.swatch && (
              <span
                className={cn("size-3.5 shrink-0 rounded-sm", entry.swatch)}
              />
            )}
            <code className="truncate font-mono text-xs">{entry.name}</code>
          </dt>
          <dd className="text-secondary">{entry.use}</dd>
        </div>
      ))}
    </dl>
  );
}

export const sizes: Entry[] = [
  {
    name: "--spacing-control",
    use: "The height of controls, 28px, with --spacing-control-sm at 24px and --spacing-control-lg at 32px. Only controls take them, so a theme scales them alone.",
  },
  {
    name: "--spacing-thumb",
    use: "A slider's thumb, which its fill is placed by too.",
  },
  {
    name: "--font-weight-selected",
    use: "The weight of a selected tab. A tab is as wide either way.",
  },
];

export const utilities: Entry[] = [
  {
    name: "focus-ring",
    use: "On every control: an outline with a gap, on keyboard focus.",
  },
  {
    name: "dim-disabled",
    use: "On every control: fades it while disabled.",
  },
  {
    name: "popup-motion",
    use: "On every popup: grows from its trigger as it fades in.",
  },
  {
    name: "segmented",
    use: "A strip of controls a size smaller than a Button; pair it with material-field.",
  },
  {
    name: "overflow-fade-x",
    use: "A row that may not fit: scrolls, and fades where more lies that way.",
  },
  {
    name: "overflow-fade-y",
    use: "A column that may not fit, the same way.",
  },
  {
    name: "overflow-fade-x-bottom",
    use: "Both, fading only the bottom, for content whose top stays put, such as a table's head.",
  },
  { name: "shimmer", use: "Text, icons, or blocks while work is pending." },
  {
    name: "backdrop",
    use: "The shade behind a dialog, which a theme can draw otherwise, such as with a blur.",
  },
];
