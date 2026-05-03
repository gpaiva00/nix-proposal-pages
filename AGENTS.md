# AGENTS.md

## Project overview

Single-page branded proposal site for NIX Contábil & RH. React 19 + TypeScript + Vite + Tailwind CSS 4, no router, no state management.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — **runs `tsc -b` then `vite build`** (typecheck is baked into build; no separate typecheck script)
- `npm run lint` — ESLint across the project
- `npm run preview` — preview production build locally

No test runner is configured.

## Architecture

- **`src/content.ts`** — single source of truth for all page content and types. When changing proposal text, data, or adding/removing sections, edit this file. Components consume it; they do not hardcode content.
- **`src/App.tsx`** — renders the page from `content.ts`; also holds presentational sub-components (`SectionHeader`, `MetricCard`, `TextCard`, `ServiceCard`, `TimelineCard`). Uses Tailwind utility classes with `cn()` from `src/lib/cn.ts` for conditional composition.
- **`src/index.css`** — Tailwind v4 setup (`@import "tailwindcss"`), `@theme` with design tokens (colors, fonts, radius, container), `@font-face`, `@layer base` resets, and `@layer components` for complex CSS (pseudo-elements, gradients, reduced-motion).
- **`src/lib/cn.ts`** — thin wrapper around `clsx` for conditional class composition.

## TypeScript constraints

- `verbatimModuleSyntax` — use `import type` for type-only imports; bare `import` of a type will fail.
- `erasableSyntaxOnly` — no `enum` declarations, no `namespace` declarations.
- `noUnusedLocals` / `noUnusedParameters` — dead code will break the build.

## Style conventions

- Tailwind CSS v4 (via `@tailwindcss/vite` plugin). Utility-first with `cn()` for conditional classes.
- Design tokens (colors, fonts, radius, container) are defined in `@theme` inside `index.css`.
- Complex styles that don't map well to utilities (pseudo-elements, decorative gradients, `@media (prefers-reduced-motion)`) live in `@layer components` in `index.css`.
- Brand font (`font-display`) and body font (`font-body`) are set in `@theme`.

## Content language

All proposal content is Brazilian Portuguese. Keep UI text in Portuguese when editing.