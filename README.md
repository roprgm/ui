# @roprgm/ui

Minimal dark UI components for React and Tailwind CSS v4, meant for professional tools such as photo and video editors. Most are plain styled HTML; Base UI supplies behavior only where CSS can't (Select, Tooltip).

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
| Primitives | `Button` (`render` draws it as another element) | none |
| | `IconButton` | Tooltip |
| | `Input` (`aria-invalid` and file pickers styled) | none |
| | `Textarea` | none |
| | `Field` (label, control, description or error) | ids only |
| | `Checkbox` | none |
| | `Switch` | none |
| | `ToggleGroup`, `Toggle` | none |
| | `Select` | Base UI |
| | `Chip` | none |
| | `Spinner` | none |
| Overlays | `Tooltip`, `TooltipProvider` | Base UI |
| | `Menu`, `MenuItem`, `MenuSeparator`, `Submenu` | Base UI |
| | `Popover` | Base UI |
| | `Notice` | none |
| Panels | `Panel`, `PanelHeader`, `PanelSection`, `PanelBody` | resizing only |
| | `TabList`, `Tab` | arrow keys |
| | `ListItem` | none |
| | `TreeList` (drag to reorder or nest; `canDrop` and `onDrop` keep the data with the caller) | pointer drag and arrow keys |
| | `ScrollArea` | Base UI |
| Controls | `Slider` (`variant`: `panel`, `toolbar`, or `compact` without the bar; the fill runs from `origin`, the default value, to the value) | none for the bar |
| | `ScrubInput` | drag, typing, and arrow keys |
| | `VerticalSlider` | none |

## Colors

Components use only these tokens, defined in `theme.css` as `--color-*`, so they work with any color utility (`bg-surface`, `text-muted`, `border-line`, `ring-focus`). Redefine one to restyle every component that uses it:

```css
@theme {
  --color-accent: hsl(210 90% 60%);
}
```

| Group | Token | Used for |
| --- | --- | --- |
| Backgrounds | `page` | the app behind everything |
| | `field` | inputs, checkboxes, switch and slider tracks, toggle groups |
| | `surface` | panels, menus, selects, popovers, notices |
| | `raised`, `raised-hover` | buttons, selected tabs, toggles, and rows |
| | `tooltip` | tooltips |
| States | `hover`, `pressed` | translucent fills for ghost buttons, chips, and highlighted items |
| Text | `foreground`, `muted`, `faint`, `disabled` | body text; idle controls and labels; placeholders, units, and hints; disabled items |
| Accent | `accent`, `accent-hover`, `on-accent` | primary buttons, checked controls, slider thumbs, drop markers, and what sits on them |
| Other | `line`, `focus`, `danger` | dividers, the focus ring, errors |

## Utilities

`theme.css` also provides utilities: `shadow-raised`, `shadow-sunken`, `shadow-float`, `drop-shadow-float`, `focus-ring`, `shimmer`, and the `thumb:` variant for range thumbs.

The site at `site/` documents each component and shows a photo editor built from them.

## Development

```bash
bun install
bun run dev
```

`bun run check` formats, lints, and type-checks. `bun run build` compiles `dist/`, writes the registry to `site/public/r/`, and builds the site.
