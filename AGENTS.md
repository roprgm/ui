# @roprgm/ui

A minimal, dark, neutral component library. Every file in `src/` ships to npm and to the shadcn registry, so keep each one self-contained and copy-pasteable. The goal is for OpenLight to adopt this library; port its patterns and keep APIs close to its usage.

## Files

- One component file per entry in `registry.json`. Import only `react`, `cn`, `class-variance-authority`, and `@base-ui/react`, plus sibling files with `./`.
- `src/components/` holds one file per component, flat among themselves, so a component's `./` imports still resolve when shadcn copies it beside its dependencies. `src/themes/` holds the themes, and `src/base.css` the utilities every theme shares. Sections (actions, inputs, containers, navigation, overlays, effects) are `categories` in `registry.json` and groups in `site/main.tsx`. Internal pieces (`chevron`, `popup`) have registry items without a category.
- Start a file with `"use client";` when it uses Base UI, hooks, or its own event handlers, so it works in React Server Components. Markup-only components stay without it and render on the server.
- A new component needs its entry in `registry.json`, a demo in `site/demos.tsx`, its entry in `site/main.tsx`, and a line in `README.md`.

## Code

- Prefer CSS over JavaScript: style native elements with Tailwind variants (`checked:`, `has-checked:`, `peer-*`). Use Base UI only for behavior CSS can't provide, such as positioning, focus management, and typeahead.
- Keep Tailwind classes inline; use `cva` only for variants. Named exports only.
- Avoid ternaries. Use one only when it is trivially short and both branches fit on one line; otherwise use a named function with early returns, a lookup object, or `&&` conditions in `cn`.

## Theme

- `themes/default.css` holds the tokens and imports `base.css`, the utilities, variants, and rules that read them. Another theme, such as `themes/flat.css`, sets tokens after it. `bun run build` writes both into the `theme` item of `registry.json` with `scripts/registry.ts`; don't edit that item by hand.
- Colors and edges are always tokens, since they are the look a theme changes. Any other value becomes a token only when more than one utility or component uses it; otherwise it stays in its utility or rule, and a theme that wants it different redefines that utility.
- Colors come only from the semantic tokens in the theme (`bg-field`, `text-muted`, `border-line`, …), written as `hsl()`. Never use Tailwind palette colors such as `neutral-*` or `white/*` in components; add or reuse a token instead.
- A background that holds controls takes `layer-card` or `layer-elevated`. A layer sets only `--layer`; the theme mixes the fills of the controls on it from that color. Popups are `layer-elevated` wherever they open; dialogs and notices are `layer-card`.
- Give anything that stands off its layer a surface from `base.css`: `surface-raised`, `surface-sunken`, `surface-float`, or `surface-thumb`, and `separator` for a line between groups. A surface draws only its edge, from the theme's `--edge-*`; pair it with a fill such as `bg-raised`, `bg-field`, or `bg-primary`. Never draw depth with a `shadow-*` or a border of your own. Lines along a row or section are borders in `border-line`.
- Controls take the `focus-ring` and `dim-disabled` utilities. Rows in a popup's list take `menu-item`. Range inputs draw their thumb with `range-thumb`, and stay at least 32px across.
- Components inherit font size.

## Sizes

- Button sets the scale, with a text and an icon size for each of three heights: `sm` (24px, `--size-control-sm`), `default` (28px, `--size-control`), and `lg` (32px, `--size-control-lg`).
- Every other control's sizes are named after the Button they go with, and measure whatever looks as tall beside it. Input and Select match its height; ToggleGroup and a segmented TabList stand 4px taller, since the eye sizes them by the raised control inside.
- Panel headers and list rows are `h-(--size-row)`, 40px, and hold a control `--padding-row` (6px) in.
- `--padding` and `--size-control` set the density and change together; `base.css` derives the other sizes from them, so a theme holds only what it decides.
- The density sets heights and container padding. Each control sets its own side padding in fixed values chosen by eye, such as Button's `px-3`; don't derive it from a height.
- Use the `(--var)` form, such as `h-(--size-control)`, rather than naming a spacing value, so `cn` still merges a caller's `h-*` or `p-*`.

## Spacing

- Four paddings space the library:
  - `--padding` (14px) for the sections of a dialog, notice, popover, or panel, and list rows.
  - `--padding-sm` (5px) around a list of items, as in a menu or a select, whose popup takes `rounded-lg`. Items take the `menu-item` utility: 2px shorter than a control, `rounded-sm`, and padded so their text lands `--padding` in too.
  - `--padding-xs` (3px) around a raised control set into a sunken one, as in a toggle group or segmented tabs, whose controls fill the rest.
  - `--padding-row` (6px) around a control in a panel header or list row, so a ghost icon button's icon lands 12px in.
- Everything floating is a `Popup`, which has no padding of its own: lists put theirs on it, and other content sits in sections. Anything edge to edge simply sits outside them, with no negative margins.
- Three optical exceptions:
  - A section that opens with a line of text takes `pt-(--padding-optical)`, since the line adds air above the capitals.
  - Buttons against an edge, as in a footer, sit `--padding-optical` in, since their box shows its edge where text doesn't.
  - A ghost icon button sits so its icon lands 12px in: `icon` 6px in, `icon-sm` 8px in.
- Nested corners are concentric: outer radius minus the inset equals the inner radius, with equal insets on both sides of the corner (a 12px card holds a 6px button 6px in; an 8px surface holds 4px items 4px in). Below about 5px, round the inner corner up a little: the eye reads a small radius as smaller than it is. Prefer the radii other components already use over exact math.

## Checks

- Run `bun run check` and `bun run build`.
