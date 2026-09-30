# @roprgm/ui

A minimal, dark component library for React on Base UI, styled with CSS modules, that works with Tailwind CSS v4 or without it. It sets the design rules for OpenLight and tripscalendar and gives primitives for what it doesn't have. Every file in `src/` ships to npm and the shadcn registry, so keep each self-contained.

## A new component

1. **Height**: the Button's it goes with, 28px, 24px small, 32px large, and its sizes named after the Button's. Icon buttons are square; labels at least as wide as tall (`min-width`).
2. **Surfaces**: a control stands up with `surface-raised`, sets in with `surface-sunken`, or is on with `surface-primary`, composed or as the fill and edge tokens they stand for; content sits in a `Card`. Never draw depth with a shadow or a border of its own.
3. **Colors**: tokens only. Use the fills the surface under it sets (`--color-surface`, `--color-field`, `--color-raised`, `--color-raised-hover`, `--color-hover`) and text in `--color-foreground`, `--color-muted`, `--color-faint`, or `--color-disabled`. No `--color-level-*` inside a component: it doesn't follow the surface.
4. **Spacing**: pixels, even or half of a 4px step (14px, 10px, 6px), in the patterns below.
5. **Parts, not props**: parts come as children, never as `title`, `actions`, or `trigger` props; props carry data, such as `items` and `label`. An overlay is its root, a `…Trigger` that renders your element with `render`, and a `…Content`.
6. **Nothing forced**: never `!important`. A fill that needs forcing wants a part, a token, or a variant.
7. **Wiring**: an entry in `registry.json` that lists both files and the theme in `registryDependencies`, a demo in `site/demos.tsx`, an entry in `site/main.tsx`, and a line in `README.md`.

## Files and code

- `src/components/` has one flat pair per component, `name.tsx` and `name.module.css`, so `./` imports resolve after shadcn copies them. Import only `react`, `cn`, `@base-ui/react`, sibling files, and its module; anything else comes in as a prop, as `CodeBlock` takes a highlighter's `html`.
- `src/base.css` holds the tokens and the page's rules, and imports the parts from `src/styles/`. `src/themes/default.css` draws the edges; other themes are unexported experiments. `src/tailwind.css` maps each token to Tailwind's utilities, so a new token goes there too.
- Registry `categories` (actions, inputs, containers, navigation, overlays, effects) are the site's groups; Foundations is the site's only. `check`, `chevron`, and `popup` are internal. `bun run build` writes the `theme` item; don't edit it.
- CSS before JavaScript: selectors on native state (`:checked`, `:has(:checked)`) and Base UI's attributes, and Base UI for positioning, focus, and typeahead. `"use client";` only with Base UI, hooks, or handlers.
- Named exports, ternaries only when short, comments only for what code can't say.

## CSS modules

- A class per element, named for what it is (`.button`, `.item`, `.thumb`). A variant or boolean prop is a `data-*` attribute (`data-variant`, `data-size`, `data-raised`), set only when true for a boolean; every element a component renders for you to target has a `data-slot` named after it.
- Rules sit in `@layer components`, nested with `&`. A component that others render and restyle, such as a Button a Tab renders, sits in `components.inner`, which rules in `components` override, so the one that renders it wins without a fight over specificity or order.
- A module composes the parts it's built from in a rule of its own before the layer, since Lightning CSS allows `composes` only there, one `composes` per source: `composes: focus-ring dim-disabled from global;`. A part a prop decides comes from a local class that composes it, picked in the TSX; never a global class name in the TSX.
- Hover sits in `@media (hover: hover)`. A transition lists what changes, with `outline-color` beside `focus-ring` and `opacity` beside `dim-disabled`.

## Look

- **Tokens**, in `oklch()`: `--color-level-0` to `--color-level-12`, black then 15% up in steps of 3.7%, with the page at level 2; the fills a surface sets (`surface` its own, `field` −2, `raised` +3, `raised-hover` +4, `hover` +1), which `:root` sets for the page; opaque text; `primary`, `on-primary`; the translucent `pressed`, `focus`, `backdrop`, `line`, `separator`; `danger`; `code-*`; the `--edge-*` a theme draws; radii; easings.
- **Parts** are global classes in `src/styles/`, in the `base` layer under the components: containers set the fills of what sits on them. `surface-card` stands two levels over what it sits on, a card too, three deep at most; `surface-panel` is a card docked in a layout, with no edge; `surface-float` is a card drawn floating. A popup opens as a card on the page; `raised` on its `…Content`, `Select`, or `Combobox` lifts it a level for one that opens over a card.
- **Controls**: `surface-raised`, `surface-sunken`, `surface-primary`, `segmented` (with `surface-sunken`) for a strip of controls, and `separator`. Lines between parts are inset shadows in `--color-line`.
- **Behaviors**: `focus-ring` and `dim-disabled` on every control, plus `popup-motion`, `overflow-fade-x`, `overflow-fade-y`, and `shimmer`. A part's rules that reach into children or outrank a control's own sit in `components`.
- Text that may not fit is a `ScrollText`, except inside something clickable; a row that may not fit scrolls in `overflow-fade-x`, a column in `overflow-fade-y`, and a text-only scroller takes `tabIndex={-1}`. Components inherit font size.
- A theme sets tokens again in the `theme` layer and draws edges as `--edge-*` box shadows (never a border, which takes room). For one component's part it sets tokens on its public `data-slot`, and never changes markup.

## Sizes and spacing

- Input and Select match a Button. A segmented group holds controls a size smaller, 3px in, and reaches a pixel past each edge, so in a row it takes a Button's height.
- Popup rows are 26px, list rows 40px. `--spacing-thumb` is the only size token.
- A card, popover, collapsible panel, dialog, or notice pads its content as one `Section` (10px 14px) until it holds `Section`s, which take over (`sections`). A `Collapsible` counts as a section; a list edge to edge is a section without padding; a card that only frames takes no padding.
- Sections in a card, popover, or collapsible panel have a line between them, and the first and last of several read as header and footer. A dialog or notice stacks them without one (`sections-stacked`); a dialog's last sits 16px below.
- A header is a row, centered, with a title and a `SectionAction`; a row of buttons is a row with 6px between and 10px in.
- `SectionAction` and `ListItemAction` reach into the padding, so an icon sits 12px from the end and the top. The only corrections inside a control: a leading icon 4px closer to a button's edge, and a Slider's bar, last in its container, 4px of room under it.
- A list pads items 4px, `--radius-sm` in `--radius-lg`, and a popup item pads 10px, so text lands 14px in. Nested corners are concentric: the outer radius less the inset.
- A container sizes itself: a width goes on the `Card` or `…Content`, never on a section. A popup never scrolls sideways; a `Card` clips.

Run `bun run check` and `bun run build`.
