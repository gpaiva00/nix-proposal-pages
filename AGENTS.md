# AGENTS.md

## Project overview

Single-page branded proposal site for NIX Contábil & RH. React 19 + TypeScript + Vite, no router, no state management, no CSS framework.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — **runs `tsc -b` then `vite build`** (typecheck is baked into build; no separate typecheck script)
- `npm run lint` — ESLint across the project
- `npm run preview` — preview production build locally

No test runner is configured.

## Architecture

- **`src/content.ts`** — single source of truth for all page content and types. When changing proposal text, data, or adding/removing sections, edit this file. Components consume it; they do not hardcode content.
- **`src/App.tsx`** — renders the page from `content.ts`; also holds presentational sub-components (`SectionHeader`, `MetricCard`, `TextCard`, `ServiceCard`, `TimelineCard`).
- **`src/App.css`** — all styling in one file using BEM-ish class names and CSS custom properties.
- **`src/index.css`** — `@font-face` for the brand font (Laqonic 4F Unicase) and CSS reset/variables.

## TypeScript constraints

- `verbatimModuleSyntax` — use `import type` for type-only imports; bare `import` of a type will fail.
- `erasableSyntaxOnly` — no `enum` declarations, no `namespace` declarations.
- `noUnusedLocals` / `noUnusedParameters` — dead code will break the build.

## Style conventions

- Pure CSS (no Tailwind, no CSS Modules, no CSS-in-JS).
- Color palette and spacing tokens live in `.proposal-page` custom properties inside `App.css`.
- Brand font (`var(--font-display)`) and body font (`var(--font-body)`) are set in `index.css`.

## Content language

All proposal content is Brazilian Portuguese. Keep UI text in Portuguese when editing.