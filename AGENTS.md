# @roprgm/ui

A minimal, dark, neutral component library. Every file in `src/` ships to npm and to the shadcn registry, so keep each one self-contained and copy-pasteable. The goal is for OpenLight to adopt this library; port its patterns and keep APIs close to its usage.

## Files

- `src/components/` holds one file per component, flat among themselves, so a component's `./` imports still resolve when shadcn copies it beside its dependencies. Import only `react`, `cn`, `class-variance-authority`, and `@base-ui/react`, plus sibling files with `./`.
- `src/base.css` holds the tokens, the primitives, and the utilities every theme shares. `src/themes/default.css` imports it and draws the primitives. The other themes in `src/themes/` are experiments: the package doesn't export them and the docs don't show them.
- Sections (actions, inputs, containers, navigation, overlays, effects) are `categories` in `registry.json` and groups in `site/main.tsx`. Internal pieces (`chevron`, `popup`) have registry items without a category.
- A new component needs its entry in `registry.json`, a demo in `site/demos.tsx`, its entry in `site/main.tsx`, and a line in `README.md`. Its registry entry lists the theme in `registryDependencies`, even when a dependency brings it, so it installs alone with its CSS; `bun run build` fails otherwise.
- `bun run build` writes `default.css` and `base.css` into the `theme` item of `registry.json` with `scripts/registry.ts`; don't edit that item by hand.

## Code

- Prefer CSS over JavaScript: style native elements with Tailwind variants (`checked:`, `has-checked:`, `peer-*`). Use Base UI only for behavior CSS can't provide, such as positioning, focus management, and typeahead.
- Start a file with `"use client";` when it uses Base UI, hooks, or its own event handlers. Markup-only components stay without it and render on the server.
- Keep each component's styles in its own Tailwind class strings; use `cva` only for variants. Named exports only.
- Avoid ternaries. Use one only when it is trivially short and both branches fit on one line; otherwise use a named function with early returns, a lookup object, or `&&` conditions in `cn`.

## Look

- Colors come only from the tokens in `base.css` (`text-muted`, `bg-field`, `bg-level-3`, `border-line`, …), written as `hsl()`. Never use Tailwind's palette, such as `neutral-*` or `white/*`; add or reuse a token.
- A background that holds controls takes `layer-card` or `layer-elevated`. A layer sets only `--layer`, and the fills of the controls on it mix from it. Popups are `layer-elevated`; dialogs and notices are `layer-card`.
- Build components from the primitives: `surface-raised`, `surface-sunken`, `surface-card`, `surface-float`, `surface-callout`, `surface-thumb`, and `separator`. Each sets its fill from a token and the theme draws its edge. Never draw depth with a `shadow-*` or a border of your own. Lines along a row or section are borders in `border-line`.
- For another fill on a primitive, add it with `!`, as `bg-primary!`, since a plain `bg-*` sorts before a primitive; a variant such as `hover:` or `checked:` needs none.
- `base.css` holds only primitives and utilities that aren't one component: `focus-ring`, `dim-disabled`, `range-thumb`, `scroll-fade`, `scroll-fade-x`, `scroll-text`, and `shimmer`. Rows in a popup's list take `popupItem` from `popup.tsx`.
- Controls take `focus-ring` and `dim-disabled`. Range inputs stay at least 32px across. For one line of text that may not fit, use `ScrollText` rather than `truncate`, except inside something you click, such as a Select's trigger, where a scroller would fight the click. Where a component puts the `scroll-text` utility on an element of its own, it adds `tabIndex={-1}`, since a box that scrolls is a tab stop when nothing in it is one. Components inherit font size.

## Themes

- A theme imports `base.css`, sets again any token it changes, and draws the primitives' edges by adding what `base.css` leaves out, such as a `box-shadow` or a `filter`. It changes a fill through its token, never by redeclaring `background-color`: Tailwind orders the merged definitions of a utility by how many properties each has, so the base's could win.
- An edge takes no room: a real `border` grows a control whose height comes from its content, so draw lines as `inset 0 0 0 1px` box-shadows.
- For a part of one component, a theme targets its `data-slot` in a rule outside any layer, which wins over the component's utilities, as `[data-slot="slider-track"]`. Add a `data-slot` only when a theme needs it, and treat its name as public. A theme never changes markup.

## Sizes

- Button sets the scale, with a text and an icon size for each of three heights: `sm` (24px, `--size-control-sm`), `default` (28px, `--size-control`), and `lg` (32px, `--size-control-lg`).
- Other controls name their sizes after the Button they go with and measure whatever looks as tall beside it. Input and Select match its height; ToggleGroup and a segmented TabList stand 4px taller, since the eye sizes them by the raised control inside.
- Panel headers and list rows are `h-(--size-row)`, 40px, and hold a control `--padding-row` (6px) in.
- `--padding` and `--size-control` set the density, and the other sizes follow from them. They set heights and container padding; each control sets its own side padding by eye, such as Button's `px-3`.
- The density is global: change it in `@theme`. The derived sizes resolve once at the root, so a local `--size-control` changes only what reads it directly. The segmented TabList uses one on purpose, for its default and `icon` tabs.
- Use the `(--var)` form, such as `h-(--size-control)`, rather than naming a spacing value, so `cn` still merges a caller's `h-*` or `p-*`.

## Spacing

- `--padding` (14px) spaces the sections of a dialog, notice, popover, or panel, and list rows.
- `--padding-sm` (5px) goes around a list of items, as in a menu or select, whose popup takes `rounded-lg`. Items, from `popupItem`, are 2px shorter than a control and padded so their text lands `--padding` in too.
- `--padding-xs` (3px) goes around a raised control set into a sunken one, as in a toggle group or segmented tabs.
- `--padding-row` (6px) goes around a control in a panel header or list row, so a ghost icon button's icon lands 12px in.
- Everything floating is a `Popup`, which has no padding of its own: lists put theirs on it, and other content sits in sections.
- Three optical exceptions: a section that opens with a line of text takes `pt-(--padding-optical)`; buttons against an edge sit `--padding-optical` in; a ghost icon button sits so its icon lands 12px in (`icon` 6px in, `icon-sm` 8px in).
- Nested corners are concentric: the outer radius less the inset is the inner radius (a 12px card holds a 6px button 6px in). Below about 5px, round the inner corner up a little, and prefer radii other components already use over exact math.

## Checks

- Run `bun run check` and `bun run build`.
