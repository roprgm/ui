import type { Swatch } from "./swatch-list";

export const containers: Swatch[] = [
  {
    name: "material-card",
    use: "Cards.",
    className: "material-card",
    showsFill: true,
  },
  {
    name: "material-panel",
    use: "Docked panels.",
    className: "material-panel",
    showsFill: true,
  },
  {
    name: "material-float",
    use: "Popups and dialogs.",
    className: "material-float",
    showsFill: true,
  },
];

export const inside: Swatch[] = [
  {
    name: "material-control",
    use: "What you press.",
    className: "material-control",
    showsFill: true,
  },
  {
    name: "material-field",
    use: "Where you type.",
    className: "material-field",
    showsFill: true,
  },
];

/** A fill, faintly ringed so one that matches the page still shows. */
const fill = (name: string, use: string): Swatch => ({
  name: `--color-${name}`,
  use,
  className: "ring-1 ring-foreground/10 ring-inset",
  style: { backgroundColor: `var(--color-${name})` },
  showsFill: true,
});

/** An edge, drawn on a card's fill. */
const edge = (name: string, use: string): Swatch => ({
  name: `--${name}`,
  use,
  className: "bg-level-4",
  style: { boxShadow: `var(--${name})` },
});

export const variables = [
  fill("control", "A control's fill, and a selected row's."),
  fill("control-hover", "A hovered control."),
  fill("field", "A field's fill."),
  edge("shadow-card", "A card's outer edge."),
  edge("inset-shadow-card", "A card's inner edge."),
  edge("shadow-float", "What floats."),
  edge("shadow-control", "Controls."),
  edge("shadow-field", "Fields."),
];
