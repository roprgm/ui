# @roprgm/ui

A minimal, dark UI library for React.

## Install

Copy the source into your app with the shadcn CLI:

```bash
npx shadcn@latest add https://ui.roprgm.com/r/button.json
```

Or use the package:

```bash
bun add @roprgm/ui
```

```css
@import "tailwindcss";
@import "@roprgm/ui/theme.css";
/* Optional page defaults: 13px text, the page background, dark form controls, Geist first. */
@import "@roprgm/ui/base.css";
```

`base.css` uses Geist when the app loads it, with `next/font` or `@fontsource-variable/geist`, and the system font otherwise.

```tsx
import { Button } from "@roprgm/ui/button";

<Button render={<Link href="/trips" />}>Trips</Button>;
```

Components with Base UI, hooks, or their own handlers are marked `"use client"`; the rest, such as `Button`, `Input`, and `Textarea`, render in React Server Components.

## Components

| Section | Component | JavaScript |
| --- | --- | --- |
| Actions | `Button` (`render` draws it as another element) | none |
|  | `IconButton` | Tooltip |
|  | `Chip` | none |
| Inputs | `Input` (`aria-invalid` and file pickers styled) | none |
|  | `Textarea` | none |
|  | `Field` (label, control, description or error) | ids only |
|  | `Checkbox` | none |
|  | `Switch` | none |
|  | `ToggleGroup`, `Toggle` | none |
|  | `Select` | Base UI |
|  | `Slider` (`variant`: `panel`, `toolbar`, or `compact` without the bar; the fill runs from `origin`, the default value, to the value) | none for the bar |
|  | `ScrubInput` (`chevrons` adds hover arrows; off by default) | drag, typing, and arrow keys |
|  | `VerticalSlider` | none |
| Containers | `Panel`, `PanelHeader`, `PanelSection`, `PanelBody` | resizing only |
|  | `layer-card`, `layer-elevated` (theme utilities for cards) | none |
|  | `ScrollArea` | Base UI |
| Navigation | `TabList`, `Tab` | arrow keys |
|  | `ListItem` | none |
|  | `TreeList` (drag to reorder or nest; `canDrop` and `onDrop` keep the data with the caller) | pointer drag and arrow keys |
| Overlays | `Tooltip`, `TooltipProvider` | Base UI |
|  | `Menu`, `MenuItem`, `MenuSeparator`, `Submenu` | Base UI |
|  | `Popover` | Base UI |
|  | `Notice` | none |
| Effects | `Spinner` | none |
|  | `shimmer` (a theme utility) | none |

## Colors

Components use only these tokens, defined in `theme.css` as `--color-*`, so they work with any color utility (`bg-field`, `text-muted`, `border-line`, `ring-focus`). Redefine one to restyle every component that uses it:

```css
@theme {
  --color-accent: hsl(210 90% 60%);
}
```

| Group | Token | Used for |
| --- | --- | --- |
| Scale | `surface-1` to `surface-10` | the grays layers and fills pick from, darkest first; use one to match a layer's color |
| Fills | `field` | a step below the layer: inputs, checkboxes, switch and slider tracks, toggle groups |
| | `raised`, `raised-hover` | two and three steps above the layer: buttons, selects, selected tabs, toggles, and rows |
| | `tooltip` | tooltips, darker than any layer |
| States | `hover`, `pressed` | translucent fills for ghost buttons, chips, and highlighted items |
| Text | `foreground`, `muted`, `faint`, `disabled` | body text; idle controls and labels; placeholders, units, and hints; disabled items |
| Accent | `accent`, `accent-hover`, `on-accent` | primary buttons, checked controls, slider thumbs, drop markers, and what sits on them |
| Other | `line`, `focus`, `danger` | dividers, the focus ring, errors |

### Layers

A control's fill depends on the layer it sits on, so an input or a button keeps the same contrast everywhere. There are three layers:

| Layer | Background | `field` | `raised` | `raised-hover` |
| --- | --- | --- | --- | --- |
| The page | `surface-2` | `surface-1` | `surface-4` | `surface-5` |
| `layer-card`: panels, notices, cards | `surface-3` | `surface-2` | `surface-5` | `surface-6` |
| `layer-elevated`: menus, popovers, a card inside a card | `surface-4` | `surface-3` | `surface-6` | `surface-7` |

Give a card or any other container of controls one of these utilities instead of a `bg-*`:

```tsx
<div className="layer-card rounded-xl p-3 shadow-raised">…</div>
```

## Utilities

`theme.css` also provides utilities: `layer-card`, `layer-elevated`, `shadow-raised`, `shadow-sunken`, `shadow-float`, `drop-shadow-float`, `focus-ring`, `shimmer`, and the `thumb:` variant for range thumbs.

The site at `site/` documents each component and shows a photo editor built from them.

## Development

```bash
bun install
bun run dev
```

`bun run check` formats, lints, and type-checks. `bun run build` compiles `dist/`, writes the registry to `site/public/r/`, and builds the site.
