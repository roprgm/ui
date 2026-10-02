import type { Swatch } from "./swatch-list";

export const containers: Swatch[] = [
  { name: "material-card", use: "Cards.", className: "material-card" },
  {
    name: "material-panel",
    use: "Docked panels.",
    className: "material-panel",
  },
  {
    name: "material-float",
    use: "Popups and dialogs.",
    className: "material-float",
  },
];

export const inside: Swatch[] = [
  {
    name: "material-control",
    use: "What you press.",
    className: "material-control",
  },
  {
    name: "material-field",
    use: "Where you type.",
    className: "material-field",
  },
];

/** An edge, drawn on a card's fill. */
const edge = (name: string, use: string): Swatch => ({
  name: `--${name}`,
  use,
  className: "bg-card",
  style: { boxShadow: `var(--${name})` },
});

export const edges = [
  edge("shadow-card", "A card's outer edge."),
  edge("inset-shadow-card", "A card's inner edge."),
  edge("shadow-float", "What floats."),
  edge("shadow-control", "Controls."),
  edge("shadow-field", "Fields."),
];
