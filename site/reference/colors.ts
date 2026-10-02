import type { Swatch } from "./swatch-list";

/** A color token, its sample faintly ringed so one that matches the page still shows. */
const color = (name: string, use: string): Swatch => ({
  name: `--color-${name}`,
  use,
  className: "ring-1 ring-foreground/10 ring-inset",
  style: { backgroundColor: `var(--color-${name})` },
  showsFill: true,
});

export const base = [
  color("background", "Where you are."),
  color("foreground", "Text and icons."),
  color("secondary", "Supporting text."),
  color("muted", "Hints and placeholders."),
  color("disabled", "Disabled text."),
  color("hover", "Hovers and wells."),
  color("tooltip", "Tooltips."),
];

export const accent = [
  color("accent", "Checked and selected."),
  color("on-accent", "Text on the accent."),
  color("accent-text", "Links."),
  color("primary", "Primary buttons."),
  color("primary-hover", "Hovered primary buttons."),
  color("on-primary", "Text on the primary."),
];

export const states = [
  color("success", "Done."),
  color("warning", "Needs attention."),
  color("danger", "Errors."),
];

export const overlays = [
  color("pressed", "Pressed ghosts."),
  color("focus", "Focus rings."),
];

export const lines = [
  color("border", "Separators."),
  color("border-subtle", "Dividers in a card."),
];
