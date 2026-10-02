import type { Swatch } from "./swatch-list";

/** A color token, its sample faintly ringed so one that matches the page still shows. */
const color = (name: string, use: string): Swatch => ({
  name: `--color-${name}`,
  use,
  className: "ring-1 ring-foreground/10 ring-inset",
  style: { backgroundColor: `var(--color-${name})` },
});

const lightness = [
  "0%",
  "15%",
  "18.7%",
  "22.4%",
  "26.1%",
  "29.8%",
  "33.5%",
  "37.2%",
  "40.9%",
  "44.6%",
  "48.3%",
  "52%",
  "55.7%",
];

export const palette = lightness.map((l, level) =>
  color(`level-${level}`, `Lightness ${l}.`),
);

export const text = [
  color("foreground", "Text and icons."),
  color("secondary", "Supporting text."),
  color("muted", "Hints and placeholders."),
  color("disabled", "Disabled text."),
];

export const fills = [
  color("background", "The page."),
  color("hover", "Hovers and wells."),
  color("card", "Cards."),
  color("panel", "Docked panels."),
  color("float", "Popups and dialogs."),
  color("tooltip", "Tooltips."),
  color("control", "Buttons and selected rows."),
  color("control-hover", "Hovered controls."),
  color("field", "Inputs and tracks."),
];

export const accent = [
  color("accent", "Checked and selected."),
  color("on-accent", "Text on the accent."),
  color("accent-text", "Links."),
  color("primary", "Primary buttons."),
  color("primary-hover", "Hovered primary buttons."),
  color("on-primary", "Text on the primary."),
];

export const accents: Swatch[] = [
  "neutral",
  "violet",
  "blue",
  "green",
  "amber",
  "orange",
  "coral",
  "rose",
].map((name) => ({
  name: `data-accent="${name}"`,
  use: name === "neutral" ? "The default, near white." : undefined,
  className: "bg-accent",
  attributes: { "data-accent": name },
}));

export const states = [
  color("success", "Done."),
  color("warning", "Needs attention."),
  color("danger", "Errors."),
];

export const overlays = [
  color("pressed", "Pressed ghosts."),
  color("focus", "Focus rings."),
  color("backdrop", "Behind dialogs."),
];

export const lines = [
  color("border", "Separators."),
  color("border-subtle", "Dividers in a card."),
];

export const code = [
  color("code-keyword", "Keywords."),
  color("code-string", "Strings."),
  color("code-type", "Types."),
  color("code-property", "Properties."),
];
