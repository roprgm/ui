# @roprgm/ui

A minimal, dark, neutral component library. Every file in `src/` ships to npm and to the shadcn registry, so keep each one self-contained and copy-pasteable. The goal is for OpenLight to adopt this library; port its patterns and keep APIs close to its usage.

## Files

- `src/components/` holds one file per component, flat among themselves, so a component's `./` imports still resolve when shadcn copies it beside its dependencies. Import only `react`, `cn`, `class-variance-authority`, and `@base-ui/react`, plus sibling files with `./`.
- `src/base.css` holds the tokens, the primitives, and the utilities every theme shares. `src/themes/default.css` imports it and draws the primitives. The other themes in `src/themes/` are experiments: the package doesn't export them and the docs don't show them.
- Sections (actions, inputs, containers, navigation, overlays, effects) are `categories` in `registry.json` and groups in `site/main.tsx`. Internal pieces (`check`, `chevron`, `popup`) have registry items without a category.
- A new component needs its entry in `registry.json`, a demo in `site/demos.tsx`, its entry in `site/main.tsx`, and a line in `README.md`. Its registry entry lists the theme in `registryDependencies`, even when a dependency brings it, so it installs alone with its CSS; `bun run build` fails otherwise.
- `bun run build` writes `default.css` and `base.css` into the `theme` item of `registry.json` with `scripts/registry.ts`; don't edit that item by hand.

## Code

- Prefer CSS over JavaScript: style native elements with Tailwind variants (`checked:`, `has-checked:`, `peer-*`). Use Base UI only for behavior CSS can't provide, such as positioning, focus management, and typeahead.
- Start a file with `"use client";` when it uses Base UI, hooks, or its own event handlers. Markup-only components stay without it and render on the server.
- Keep each component's styles in its own Tailwind class strings; use `cva` only for variants. Named exports only.
- Avoid ternaries. Use one only when it is trivially short and both branches fit on one line; otherwise use a named function with early returns, a lookup object, or `&&` conditions in `cn`.

## Look

The look is built in layers, each using only the one below: tokens, then primitives, then parts, then components.

- Tokens, in `base.css`, are colors, radii, and sizes. Colors come only from them (`text-muted`, `bg-field`, `bg-level-3`, `border-line`, …), written as `hsl()`; never use Tailwind's palette, such as `neutral-*` or `white/*`, and add or reuse a token instead.
- Primitives, in `base.css`, are layers and surfaces. A layer is what a container is filled with: `layer-card` or `layer-elevated` sets `--layer` and paints it, and the fills of the controls on it mix from it. A `layer-card` inside another card or a popup rises to the elevated level on its own. A surface is how a box stands against what's under it, drawn by the theme: `surface-card` and `surface-float` are only a container's edge, so a container is a layer and a surface, as a `Card` is `layer-card surface-card` and a `Popup` `layer-elevated surface-float`; `surface-raised`, `surface-sunken`, `surface-thumb`, and `surface-callout` also fill the control they draw. `separator` draws a line between groups. Never draw depth with a `shadow-*` or a border of your own. Lines between a card's parts and along a list row are inset shadows in `--color-line`, as `cardParts` and `ListItem` draw them, so they take no room.
- For another fill on a control's surface, add it with `!`, as `bg-primary!`, since a plain `bg-*` sorts before a primitive; a variant such as `hover:` or `checked:` needs none.
- The other utilities in `base.css` are behaviors no one component owns: `focus-ring`, `dim-disabled`, `popup-motion`, `range-thumb`, `overflow-fade-x`, `overflow-fade-y`, and `shimmer`.
- Parts, in `card.tsx` and `popup.tsx`, are what containers hold: card sections and popup lists, under Spacing.
- Controls take `focus-ring` and `dim-disabled`. Range inputs stay at least 32px across. For one line of text that may not fit, use `ScrollText` rather than `truncate`, except inside something you click, such as a Select's trigger, where a scroller would fight the click. Content that may not fit a row, such as tabs, chips, or a line of text with `whitespace-nowrap`, scrolls in `overflow-fade-x`, and a column in `overflow-fade-y`, rather than being cut off. Where a component puts `overflow-fade-x` on an element that holds only text, it adds `tabIndex={-1}`, since a box that scrolls is a tab stop when nothing in it is one. Components inherit font size.

## Themes

- A theme imports `base.css`, sets again any token it changes, and draws the primitives' edges by adding what `base.css` leaves out, such as a `box-shadow` or a `filter`. It changes a fill through its token, never by redeclaring `background-color`: Tailwind orders the merged definitions of a utility by how many properties each has, so the base's could win.
- An edge takes no room: a real `border` grows a control whose height comes from its content, so draw lines as `inset 0 0 0 1px` box-shadows.
- For a part of one component, a theme targets its `data-slot` in a rule outside any layer, which wins over the component's utilities, as `[data-slot="slider-track"]`. Add a `data-slot` only when a theme needs it, and treat its name as public. A theme never changes markup.

## Sizes

- Sizes are the only spacing kept as tokens, since they set the density. `--size-control` (28px) is Button's height, and the scale the other controls measure against: `h-control-sm` (24px), `h-control`, and `h-control-lg` (32px), with `h-item` (26px) for a popup's rows, `h-row` (40px) for a panel's list rows, and `size-thumb`. Heights are these utilities, never a number, so they follow the density and `cn` merges a caller's `h-*`.
- Controls name their sizes after the Button they go with and measure whatever looks as tall beside it. Input and Select match its height; ToggleGroup and a segmented TabList stand 4px taller, since the eye sizes them by the raised control inside.
- The derived sizes resolve once at the root, so a `--size-control` redefined on an element changes only what reads it directly, as a segmented group does for the controls set into it.

## Spacing

- Padding and gaps are Tailwind's scale, written as they are (`px-3.5`, `p-1`), never a token. Each control sets its own side padding by eye, such as Button's `px-3`.
- A container pads by what it holds, never by looking at its children. A card or popover is a stack of `CardSection`s with a line between each (`cardParts`): one section has no line, and the first and last of several read as a header and a footer, with no parts of their own. Content composes as components do rather than coming in props. A section pads `px-3.5 py-2.5`, so text sits 14px from the sides and a line makes a 40px section, and takes its height from what it holds; a header is `flex-row items-center` with a title and a `CardAction`, and a row of buttons is `flex-row gap-1 px-2.5`, so the buttons sit 10px from every edge, since a button's box shows where text doesn't. A `Dialog` or `Notice` stacks a section and its actions without a line, and the section drops its bottom padding when the actions follow it (`not-last:pb-0`).
- Controls stay plain: a Button is its variants and nothing else, wherever it sits, each size at least as wide as it is tall. An optical effect belongs to the container that wants it, written in its own file: a `CardAction`, and a list row's `ListItemAction`, hold ghost icon buttons and reach past the padding by the air around their icons, so each icon sits 12px from the end and the top, and the row stays 40px. Notice places its dismiss button the same way.
- A container of items pads them 4px (`p-1`), with `rounded-sm` items nested in its `rounded-lg`: a `Popup` with `list`, whose `popupItem` rows are `h-item` and `px-2.5`, so their text lands 14px in, and a segmented group, whose controls are a size smaller than the Buttons beside it.
- List rows, from `ListItem`, are `h-row`, since a list stays dense.
- A container sizes itself and its parts fill it: a width goes on the `Card` or `Popover`, never on a section, which would spill out of a container left narrower by a scrollbar or the screen's edge. A `Popup` never scrolls sideways, and a `Card` clips what doesn't fit.
- Nested corners are concentric: the outer radius less the inset is the inner radius, as a 9px list holds 5px items 4px in. Below about 5px, round the inner corner up a little, and prefer radii other components already use over exact math.

## Checks

- Run `bun run check` and `bun run build`.
