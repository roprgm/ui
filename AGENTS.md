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
- Content composes: a component takes its parts as children, never as props such as `title`, `actions`, or `trigger`. Props carry data and strings, such as `items`, `label`, and `shortcut`. An overlay is its root, a `…Trigger` that renders your element with `render`, and a `…Content` that takes where it opens (`side`, `align`), as `<Menu>`, `<MenuTrigger render={<IconButton label="More" />}>`, and `<MenuContent>`.
- Comment only what the code can't say, in a line or two.

## Look

The look is built in layers, each using only the one below: tokens, then primitives, then parts, then components.

- Tokens, in `base.css`, are colors and radii. Colors come only from them (`text-muted`, `bg-field`, `bg-level-3`, `border-line`, …), written as `hsl()`; never use Tailwind's palette, such as `neutral-*` or `white/*`, and add or reuse a token instead.
- Primitives, in `base.css`, are surfaces: a fill, and an edge the theme draws, in one class. `surface-card` is a card, a level up from what's under it, so one inside another rises on its own; `surface-panel` is a card docked in a layout, with no edge; `surface-float` is what floats. There are three levels, the page, what's on it, and what's on that, and floating is a level up. A container's surface also sets the fills of the controls on it from the palette: a field a level below, a raised control two above, three on hover. `surface-callout` fills a tooltip's shape, and `separator` draws a line between groups. Never draw depth with a `shadow-*` or a border of your own; lines between a card's parts and along a list row are inset shadows in `--color-line`, as `sections()` and `ListItem` draw them.
- For another fill on a control's surface, add it with `!`, as `bg-primary!`, since a plain `bg-*` sorts before a primitive; a variant such as `hover:` or `checked:` needs none.
- The other utilities in `base.css` are behaviors no one component owns: `focus-ring`, `dim-disabled`, `popup-motion`, `overflow-fade-x`, `overflow-fade-y`, and `shimmer`.
- Parts, in `card.tsx` and `popup.tsx`, are what containers hold: card sections and popup lists, under Spacing.
- Controls take `focus-ring` and `dim-disabled`. Range inputs stay at least 32px across. For one line of text that may not fit, use `ScrollText` rather than `truncate`, except inside something you click, such as a Select's trigger, where a scroller would fight the click. Content that may not fit a row, such as tabs, chips, or a line of text with `whitespace-nowrap`, scrolls in `overflow-fade-x`, and a column in `overflow-fade-y`, rather than being cut off. Where a component puts `overflow-fade-x` on an element that holds only text, it adds `tabIndex={-1}`, since a box that scrolls is a tab stop when nothing in it is one. Components inherit font size.

## Themes

- A theme imports `base.css`, sets again any token it changes, and draws the primitives' edges by adding what `base.css` leaves out, such as a `box-shadow` or a `filter`. It changes a fill through its token, never by redeclaring `background-color`: Tailwind orders the merged definitions of a utility by how many properties each has, so the base's could win.
- An edge takes no room: a real `border` grows a control whose height comes from its content, so draw lines as `inset 0 0 0 1px` box-shadows.
- For a part of one component, a theme targets its `data-slot` in a rule outside any layer, which wins over the component's utilities, as `[data-slot="slider-track"]`. Add a `data-slot` only when a theme needs it, and treat its name as public. A theme never changes markup.

## Sizes

- Heights are Tailwind's scale, not tokens. Controls are `h-7` (28px), `h-6` small and `h-8` large; a label is at least as wide as it is tall (`min-w-7`), and an icon button square (`size-7`). A new control takes the height of the Button it goes with, and names its sizes after it.
- Input and Select match a Button's height. ToggleGroup and a segmented `TabList` stand 4px taller, with their controls a size smaller, 4px in, since the eye sizes them by the raised control inside.
- A popup's rows are `h-6.5`, and a list's rows `h-10`.
- `--spacing-thumb`, a slider's thumb, is the only size token, since the slider places its fill by it.

## Spacing

- Padding and gaps are Tailwind's scale, written as they are (`px-3.5`, `p-1`), never a token. Each control sets its own side padding by eye, such as Button's `px-3`.
- A card, popover, collapsible panel, dialog, or notice pads its content as one `Section`, `px-3.5 py-2.5`, until it holds `Section`s, which take the padding over: `sections()` in `section.tsx` does both, so one section reads the same as none. It's the one place a container looks at its children, so content that runs edge to edge, such as a list, is a section with its padding removed. In a card, popover, or collapsible panel a line runs between sections, and the first and last of several read as a header and a footer; a collapsible panel draws one above itself too, which folds away with it; a dialog or notice stacks them without a line, each but the last without its bottom padding, and a dialog's last of several sits 16px below the one before. Put a container's content either all in sections or in none. A header is `flex-row items-center` with a title and a `SectionAction`; a row of buttons is `flex-row gap-1 px-2.5`, so the buttons sit 10px from every edge.
- Controls stay plain: a Button is its variants and nothing else, wherever it sits. An optical effect belongs to the container that wants it: `SectionAction` and `ListItemAction` hold ghost icon buttons and reach into the padding, so each icon sits 12px from the end and the top.
- A container of items pads them 4px (`p-1`), with `rounded-sm` items in its `rounded-lg`: a `Popup` with `list`, whose `popupItem` rows are `px-2.5` so their text lands 14px in, and a segmented group.
- A container sizes itself and its parts fill it: a width goes on the `Card` or `PopoverContent`, never on a section, which would spill out of a container left narrower by a scrollbar or the screen's edge. A `Popup` never scrolls sideways, and a `Card` clips what doesn't fit.
- Nested corners are concentric: the outer radius less the inset is the inner radius, as a 9px list holds 5px items 4px in. Below about 5px, round the inner corner up a little, and prefer radii other components already use over exact math.

## Checks

- Run `bun run check` and `bun run build`.
