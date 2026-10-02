# @roprgm/ui

A minimal, dark component library for React and Tailwind CSS v4, on Base UI. It sets the design rules for OpenLight and tripscalendar and gives primitives for what it doesn't have. Every file in `src/` ships to npm and the shadcn registry, so keep each self-contained.

## A new component

1. **Height**: the Button's it goes with, `h-(--spacing-control)` (28px), `h-(--spacing-control-sm)` small, `h-(--spacing-control-lg)` large, and its sizes named after the Button's. Icon buttons are square (`size-(--spacing-control)`); labels at least as wide as tall (`min-w-(--spacing-control)`). Only controls take these, so a theme scales them alone. A size token goes in as a variable, not `h-control`, so `cn` knows it's a height and a `className` such as `h-8` replaces it.
2. **Surfaces**: a control you press is `surface-control`, a field you set is `surface-field`, what is on is `surface-accent`, and the main action is `surface-primary`; content sits in a `Card`. Never draw depth with a `shadow-*` or a border.
3. **Colors**: tokens only. Fill from the colors of the region it's in (`bg-background`, `bg-control`, `bg-control-hover`, `bg-field`, `bg-hover`, `bg-selected`) and text in `foreground`, `secondary`, `muted`, or `disabled`. Never Tailwind's palette, and no `level-*` inside a component: it doesn't follow the region.
4. **Spacing**: Tailwind's scale as written (`px-3.5`), in the patterns below.
5. **Parts, not props**: parts come as children, never as `title`, `actions`, or `trigger` props; props carry data, such as `items` and `label`. An overlay is its root, a `…Trigger` that renders your element with `render`, and a `…Content`.
6. **Nothing forced**: never `!`. A fill that needs forcing wants a primitive or a variant.
7. **Wiring**: an entry in `registry.json` with its `title`, `description`, and category, that lists the theme in `registryDependencies`; its examples in `site/examples/<name>/`, one file each; its page in `site/docs/components/<name>.mdx`, shaped as `button.mdx` is; and a line in `README.md`.

## Files and code

- `src/components/` has one flat file per component, so `./` imports resolve after shadcn copies them. Import only `react`, `cn`, `class-variance-authority`, `@base-ui/react`, and sibling files; anything else comes in as a prop, as `CodeBlock` takes a highlighter's `html`.
- `src/base.css` holds the tokens with their defaults, the surfaces as plain as they can be, and the shared utilities, the complex ones in `src/utils/`. A theme imports it and sets again only what it changes; themes share no helpers. `src/themes/default.css` ships; other themes are unexported experiments.
- Every element a component renders carries a `data-slot` (`menu-content`, `select-item`), set before `{...props}` so a composing component's wins, and its variants a `data-variant` and `data-size`.
- The site is a static Next.js export in `site/`: `site/tree.ts` orders its pages, and takes each component's title, description, and group from the registry, whose `categories` (actions, inputs, containers, navigation, overlays, effects) are the groups under Components. Fundamentals is the site's only, and the reference for every token, surface, and utility: keep it current. Links are `next/link`, including those in MDX. `check`, `chevron`, `popup`, and `text-runs` are internal. `bun run build` writes the `theme` item; don't edit it.
- CSS before JavaScript: Tailwind variants (`checked:`, `has-checked:`) on native elements, and Base UI for positioning, focus, and typeahead. `"use client";` only with Base UI, hooks, or handlers.
- Styles in each component's class strings, `cva` only for variants, named exports, ternaries only when short, comments only for what code can't say.

## Look

- **Tokens**, in `oklch()`, named as Arc names them. The palette, `level-0` to `level-12`, black then 15% up in steps of 3.7%, which only themes and regions use. The colors of where you are, which the page sets and each region sets again for what sits on it: `background`, its own fill; `surface`, the fill a card gets there; `control`, `control-hover`, `field`, `hover`, `selected`. Controls, fields, and selected rows take `surface` until a theme sets them apart. And colors that are the same everywhere: text, `foreground`, `secondary`, `muted`, `disabled`; `border`, `border-subtle`; `accent`, `on-accent`, `accent-text` for the accent as text, with presets by `data-accent`; `primary`, `primary-hover`, `on-primary`, the accent until a theme sets it apart; `success`, `warning`, `danger`; the translucent `pressed`, `focus`, `backdrop`; `tooltip`; `code-*`.
- **Surfaces** are classes for what a box is: a color is a token, never a class, and the theme gives a surface its effects. **Regions**, `surface-card`, `surface-panel` docked in a layout, and `surface-float`, are plain classes under the utilities, so a `bg-*` changes their fill. Each paints its `background`, and the theme sets the colors of what sits on it; a card and what floats take the `surface` of where they sit. In the default theme, a field sits two levels below what it's on, a card, a panel, or what floats lifts what sits on it two levels, with no deeper nesting; `raised` on a popup's `…Content`, `Select`, or `Combobox` lifts it a level more, for one that opens over a card. **Controls**, `surface-control`, `surface-field`, `surface-accent`, and `surface-primary`, are utilities, so variants apply; `segmented` (with `surface-field`) makes a strip of controls. Lines between parts are inset shadows in `--color-border-subtle`.
- A primitive is shared by several components or by apps; what only one component draws is that component, which others render, as Menu renders `Separator`.
- **Behaviors**: `focus-ring` and `dim-disabled` on every control, plus `popup-motion`, `overflow-fade-x`, `overflow-fade-y`, and `shimmer`.
- Text that may not fit is a `ScrollText`, except inside something clickable; a row that may not fit scrolls in `overflow-fade-x`, a column in `overflow-fade-y`, and a text-only scroller takes `tabIndex={-1}`. Components inherit font size.
- A theme is two blocks. **Colors**: the page's in its `@theme`, and each region's on its class, every color it changes, since a color a region leaves alone keeps the page's value. **Effects**, on what each thing is: a rule on a region's class, or a utility of the same name for a control, with edges as `box-shadow` (never `border`, which takes room), `filter`, or a pseudo-element; a card's edge goes on its `::after`, a frame `base.css` lays over its content, where a `border` takes no room and a filled row can't cover it. For one component's part it styles its public `data-slot`: colors through the tokens the part reads, and anything but size and spacing, such as a font weight or a pseudo-element; never markup.

## Sizes and spacing

- Input and Select match a Button. A segmented group holds controls a size smaller, 3px in, and reaches a pixel past each edge, so in a row it takes a Button's height.
- Popup rows are `h-6.5`, list rows `h-10`. The size tokens are the three control heights and `--spacing-thumb`; `--font-weight-selected` is a selected tab's weight, and a tab keeps its width either way.
- A card, popover, collapsible panel, dialog, or notice pads its content as one `Section` (`px-3.5 py-2.5`) until it holds `Section`s, which take over (`sections()`); content outside them gets no padding. A `Collapsible` counts as a section; a list edge to edge is a section without padding; a card that only frames takes `p-0`.
- Sections in a card, popover, or collapsible panel have a line between them, and the first and last of several read as header and footer. A dialog or notice stacks them without one; a dialog's last sits 16px below.
- A header is `flex-row items-center` with a title and a `SectionAction`; a row of buttons is `flex-row gap-1.5 px-2.5`.
- `SectionAction` and `ListItemAction` reach into the padding, so an icon sits 12px from the end and the top. The only corrections inside a control: a leading icon 4px closer to a button's edge, and a Slider's bar, last in its container, 4px of room under it.
- A list pads items 4px (`p-1`), `rounded-sm` in `rounded-lg`, and a `popupItem` is `px-2.5`, so text lands 14px in. Nested corners are concentric: the outer radius less the inset.
- A container sizes itself: a width goes on the `Card` or `…Content`, never on a section. A `Popup` never scrolls sideways; a `Card` clips.

Run `bun run check` and `bun run build`.
