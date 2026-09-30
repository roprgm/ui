# @roprgm/ui

A minimal, dark component library for React and Tailwind CSS v4, on Base UI. It sets the design rules for OpenLight and tripscalendar and gives primitives for what it doesn't have. Every file in `src/` ships to npm and the shadcn registry, so keep each self-contained.

## A new component

1. **Height**: the Button's it goes with, `h-7` (28px), `h-6` small, `h-8` large, and its sizes named after the Button's. Icon buttons are square (`size-7`); labels at least as wide as tall (`min-w-7`).
2. **Surfaces**: a control stands up with `surface-raised`, sets in with `surface-sunken`, or is on with `surface-primary`; content sits in a `Card`. Never draw depth with a `shadow-*` or a border.
3. **Colors**: tokens only. Use the fills the surface under it sets (`bg-surface`, `bg-field`, `bg-raised`, `bg-raised-hover`, `bg-hover`) and text in `foreground`, `muted`, `faint`, or `disabled`. Never Tailwind's palette, and no `level-*` inside a component: it doesn't follow the surface.
4. **Spacing**: Tailwind's scale as written (`px-3.5`), in the patterns below.
5. **Build from what exists**: compose other components (a control is a `Button`, as a `Tab` is), the theme's parts, and the recipes (`popup`, `popupList`, `popupItem`, `field`) before writing classes of your own. When a second component repeats a pattern, it becomes a part: a CSS part in `src/base.css` when it needs selectors beyond its element or a token, as `sections` and the surfaces do, and otherwise a recipe exported from the file that owns it.
6. **Parts, not props**: parts come as children, never as `title`, `actions`, or `trigger` props; props carry data, such as `items` and `label`. An overlay is its root, a `…Trigger` that renders your element with `render`, and a `…Content`.
7. **Nothing forced**: never `!`. A fill that needs forcing wants a primitive or a variant.
8. **Wiring**: an entry in `registry.json` that lists the theme in `registryDependencies`, a demo in `site/demos.tsx`, an entry in `site/main.tsx`, and a line in `README.md`.

## Files and code

- `src/components/` has one flat file per component, so `./` imports resolve after shadcn copies them. Import only `react`, `cn`, `class-variance-authority`, `@base-ui/react`, and sibling files; anything else comes in as a prop, as `CodeBlock` takes a highlighter's `html`.
- `src/base.css` holds the tokens and the parts; `src/themes/default.css` sets the edge tokens. A theme sets tokens only, never a part. Other themes are unexported experiments.
- Registry `categories` (actions, inputs, containers, navigation, overlays, effects) are the site's groups; Foundations is the site's only. `check`, `chevron`, and `popup` are internal. `bun run build` writes the `theme` item; don't edit it.
- CSS before JavaScript: Tailwind variants (`checked:`, `has-checked:`) on native elements, and Base UI for positioning, focus, and typeahead. `"use client";` only with Base UI, hooks, or handlers.
- Styles in each component's class strings, split in `cn` by what they style when long, one line each; `cva` only for variants, named exports, ternaries only when short, comments only for what code can't say.
- Every element a component renders gets a `data-slot` named after it, and its variants a `data-variant` or `data-size`, so a theme or an app can select them.

## Look

- **Tokens**, in `oklch()`: `level-0` to `level-12`, black then 15% up in steps of 3.7%, with the page at level 2; the fills a surface sets (`surface` its own, `field` −2, `raised` +3, `raised-hover` +4, `hover` +1), which `:root` sets for the page; opaque text; `primary`, `on-primary`; the translucent `pressed`, `focus`, `backdrop`, `line`, `separator`; `danger`; `code-*`; and the `--edge-*` box shadows a theme draws surfaces with.
- **Containers** are plain classes under the utilities, so a `bg-*` changes their fill. `surface-card` stands two levels over what it sits on, a card too, three deep at most; `surface-panel` is a card docked in a layout, with no edge; `surface-float` is a card drawn floating. A popup opens as a card on the page; `raised` on its `…Content`, `Select`, or `Combobox` lifts it a level for one that opens over a card.
- **Controls** are utilities, so variants apply: `surface-raised`, `surface-sunken`, `surface-primary`, `segmented` (with `surface-sunken`) for a strip of controls, and `separator`. Lines between parts are inset shadows in `--color-line`.
- **Behaviors**: `focus-ring` and `dim-disabled` on every control, plus `popup-motion`, `overflow-fade-x`, `overflow-fade-y`, `shimmer`, and `draw` with `drawn`.
- Text that may not fit is a `ScrollText`, except inside something clickable; a row that may not fit scrolls in `overflow-fade-x`, a column in `overflow-fade-y`, and a text-only scroller takes `tabIndex={-1}`. Components inherit font size.
- A theme sets tokens again, edges as `box-shadow` (never `border`, which takes room). For one component's part it sets tokens on its public `data-slot`, and never changes markup.

## Sizes and spacing

- Input and Select match a Button. A segmented group holds controls a size smaller, 3px in, and reaches a pixel past each edge, so in a row it takes a Button's height.
- Popup rows are `h-6.5`, list rows `h-10`. `--spacing-thumb` is the only size token.
- A card, popover, collapsible panel, dialog, or notice pads its content as one `Section` (`px-3.5 py-2.5`) until it holds `Section`s, which take over (`sections`, or `sections-stacked` without lines); content outside them gets no padding. A `Collapsible` counts as a section; a list edge to edge is a section without padding; a card that only frames takes `p-0`.
- Sections in a card, popover, or collapsible panel have a line between them, and the first and last of several read as header and footer. A dialog or notice stacks them without one; a dialog's last sits 16px below.
- A header is `flex-row items-center` with a title and a `SectionAction`; a row of buttons is `flex-row gap-1.5 px-2.5`.
- `SectionAction` and `ListItemAction` reach into the padding, so an icon sits 12px from the end and the top. The only corrections inside a control: a leading icon 4px closer to a button's edge, and a Slider's bar, last in its container, 4px of room under it.
- A list pads items 4px (`p-1`), `rounded-sm` in `rounded-lg`, and a `popupItem` is `px-2.5`, so text lands 14px in. Nested corners are concentric: the outer radius less the inset.
- A container sizes itself: a width goes on the `Card` or `…Content`, never on a section. A `Popup` never scrolls sideways; a `Card` clips.

Run `bun run check` and `bun run build`.
