# @roprgm/ui

A minimal, dark, neutral component library. Every file in `src/` ships to npm and to the shadcn registry, so keep each one self-contained and copy-pasteable.

- One component file per entry in `registry.json`. Import only `react`, `cn`, `class-variance-authority`, and `@base-ui/react`, plus sibling files with `./`.
- Prefer CSS over JavaScript: style native elements with Tailwind variants (`checked:`, `has-checked:`, `peer-*`). Use Base UI only for behavior CSS can't provide, such as positioning, focus management, and typeahead.
- `theme.css` holds what components need (tokens, utilities, base rules for controls); `base.css` holds optional page defaults. Keep each in sync with its `registry.json` item (`theme`, `base`).
- Use shadows, not borders: `shadow-raised`, `shadow-sunken`, `shadow-float` from `src/theme.css`. Keep `registry.json`'s `theme` item in sync with that file.
- Colors come only from the semantic tokens in `theme.css` (`bg-field`, `text-muted`, `border-line`, …), whose values are plain `hsl()`. A background that holds controls takes `layer-card` or `layer-elevated`, which set its color and the fills of the controls on it. Never use Tailwind palette colors such as `neutral-*` or `white/*` in components; add or reuse a token instead. Components inherit font size. Controls are `h-8` and take the `focus-ring` utility; icon buttons in 40px panel headers and rows are `icon-sm` (28px).
- Nested corners are concentric: outer radius minus the inset equals the inner radius, with equal insets on both sides of the corner (a 12px card holds a 6px button 6px in; an 8px surface holds 4px items 4px in).
- Keep Tailwind classes inline; use `cva` only for variants. Named exports only.
- Avoid ternaries. Use one only when it is trivially short and both branches fit on one line; otherwise use a named function with early returns, a lookup object, or `&&` conditions in `cn`.
- Start a file with `"use client";` when it uses Base UI, hooks, or its own event handlers, so it works in React Server Components. Markup-only components stay without it and render on the server.
- `src/` stays flat. Sections (actions, inputs, containers, navigation, overlays, effects) are `categories` in `registry.json` and groups in `site/main.tsx`. Internal pieces (`chevron`, `surface`) have registry items without a category.
- The goal is for OpenLight to adopt this library; port its patterns and keep APIs close to its usage.
- Add the component to `registry.json`, a demo in `site/demos.tsx`, its entry in `site/main.tsx`, and `README.md`. Run `bun run check` and `bun run build`.
