# @roprgm/ui

A minimal, dark, neutral component library. Every file in `src/` ships to npm and to the shadcn registry, so keep each one self-contained and copy-pasteable.

- One component file per entry in `registry.json`. Import only `react`, `cn`, `class-variance-authority`, and `@base-ui/react`, plus sibling files with `./`.
- Prefer CSS over JavaScript: style native elements with Tailwind variants (`checked:`, `has-checked:`, `peer-*`). Use Base UI only for behavior CSS can't provide, such as positioning, focus management, and typeahead.
- Use shadows, not borders: `shadow-raised`, `shadow-sunken`, `shadow-float` from `src/theme.css`. Keep `registry.json`'s `theme` item in sync with that file.
- Colors are Tailwind `neutral`. Components inherit font size. Controls are `h-8` and take the `focus-ring` utility; icon buttons in 40px panel headers and rows are `icon-sm` (28px).
- Nested corners are concentric: outer radius minus the inset equals the inner radius, with equal insets on both sides of the corner (a 12px card holds a 6px button 6px in; an 8px surface holds 4px items 4px in).
- Keep Tailwind classes inline; use `cva` only for variants. Named exports only.
- Start a file with `"use client";` when it uses Base UI, hooks, or its own event handlers, so it works in React Server Components. Markup-only components stay without it and render on the server.
- `src/` stays flat. Sections (primitives, overlays, panels, controls) are `categories` in `registry.json` and groups in `site/main.tsx`. Internal pieces (`chevron`, `surface`) have registry items without a category.
- The goal is for OpenLight to adopt this library; port its patterns and keep APIs close to its usage.
- Add the component to `registry.json`, a demo in `site/demos.tsx`, its entry in `site/main.tsx`, and `README.md`. Run `bun run check` and `bun run build`.
