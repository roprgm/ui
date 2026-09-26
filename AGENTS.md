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

- Colors come only from the tokens in `base.css` (`text-muted`, `bg-field`, `bg-level-3`, `border-line`, …), written as `hsl()`. Never use Tailwind's palette, such as `neutral-*` or `white/*`; add or reuse a token.
- A background that holds controls takes `layer-card` or `layer-elevated`. A layer sets only `--layer`, and the fills of the controls on it mix from it. Popups are `layer-elevated`; dialogs and notices are `layer-card`. A box drawn as a card is a `Card`: `surface-card` without a layer paints the layer under it.
- Build components from the primitives: `surface-raised`, `surface-sunken`, `surface-card`, `surface-float`, `surface-callout`, `surface-thumb`, and `separator`. Each sets its fill from a token and the theme draws its edge. Never draw depth with a `shadow-*` or a border of your own. Lines along a row or section are borders in `border-line`.
- For another fill on a primitive, add it with `!`, as `bg-primary!`, since a plain `bg-*` sorts before a primitive; a variant such as `hover:` or `checked:` needs none.
- `base.css` holds only primitives and utilities that aren't one component: `focus-ring`, `dim-disabled`, `popup-motion`, `range-thumb`, `overflow-fade-x`, `overflow-fade-y`, and `shimmer`. A popup that holds a list takes `Popup`'s `list`; its rows take `popupItem` and stack in `popupRows`, both from `popup.tsx`.
- Controls take `focus-ring` and `dim-disabled`. Range inputs stay at least 32px across. For one line of text that may not fit, use `ScrollText` rather than `truncate`, except inside something you click, such as a Select's trigger, where a scroller would fight the click. Content that may not fit a row, such as tabs, chips, or a line of text with `whitespace-nowrap`, scrolls in `overflow-fade-x`, and a column in `overflow-fade-y`, rather than being cut off. Where a component puts `overflow-fade-x` on an element that holds only text, it adds `tabIndex={-1}`, since a box that scrolls is a tab stop when nothing in it is one. Components inherit font size.

## Themes

- A theme imports `base.css`, sets again any token it changes, and draws the primitives' edges by adding what `base.css` leaves out, such as a `box-shadow` or a `filter`. It changes a fill through its token, never by redeclaring `background-color`: Tailwind orders the merged definitions of a utility by how many properties each has, so the base's could win.
- An edge takes no room: a real `border` grows a control whose height comes from its content, so draw lines as `inset 0 0 0 1px` box-shadows.
- For a part of one component, a theme targets its `data-slot` in a rule outside any layer, which wins over the component's utilities, as `[data-slot="slider-track"]`. Add a `data-slot` only when a theme needs it, and treat its name as public. A theme never changes markup.

## Sizes

- `--size-control` (28px) sets the density: Button's heights are the scale, `sm` (24px, `h-control-sm`), `default` (28px, `h-control`), and `lg` (32px, `h-control-lg`), and every size in `base.css` follows from it. Change the density in `@theme`.
- Other controls name their sizes after the Button they go with and measure whatever looks as tall beside it. Input and Select match its height; ToggleGroup and a segmented TabList stand 4px taller (`h-segment`), since the eye sizes them by the raised control inside.
- Heights are these utilities, never a number, so they follow the density and `cn` merges a caller's `h-*`. The derived sizes resolve once at the root, so a local `--size-control` changes only what reads it directly, as the segmented TabList does for its tabs.

## Spacing

- Spacing is Tailwind's own scale, written as it is (`px-3.5`, `p-1`), not a token. Each control sets its own side padding by eye, such as Button's `px-3`.
- Text and fields sit 14px from a container's sides. Everything inside a surface is card parts from `card.tsx`: `CardHeader` and `CardFooter` rows pad `px-3.5 py-2.5`, so a line of text makes a 40px row, and `CardSection`s pad `px-3.5 py-3`. Both take their height from what they hold. `cardParts` stacks them with a line between, as in a `Card`, `Panel`, or `Popover`.
- A row's ends follow one rule, `row-ends`: a button with a box sits 12px from every edge, since its box shows where text doesn't, and a ghost icon button bleeds out so its icon sits 12px from the side and lines up with the text. `CardHeader`, `CardFooter`, and `ListItem` take it.
- A Dialog or Notice stacks a section and its actions without a line; the section drops its bottom padding when the actions follow it (`not-last:pb-0`), so they sit 12px under it.
- List rows, from `ListItem`, are `h-row`, 40px, since a list stays dense.
- Everything floating is a `Popup`, which has no padding of its own. A list of items takes `list`: 4px around the rows, which are `popupItem`s, `h-item` tall and `px-2.5`, so their text lands 14px in too. Other content sits in card parts.
- A raised control set into a sunken group, as in a toggle group or segmented tabs, sits 3px in (`p-0.75`), with `rounded-segment` corners.
- A container sizes itself and its parts fill it: a width goes on the `Card`, `Panel`, or `Popover`, never on a header or section, which would spill out of a container left narrower by a scrollbar or the screen's edge. A `Popup` never scrolls sideways, and a `Card` clips what doesn't fit.
- Nested corners are concentric: the outer radius less the inset is the inner radius (a 9px list popup holds 5px rows 4px in). Below about 5px, round the inner corner up a little, and prefer radii other components already use over exact math.

## Checks

- Run `bun run check` and `bun run build`.
