# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server with Turbopack
npm run build    # Production build — also the main validation step (no test suite exists)
npm run lint     # ESLint (next/core-web-vitals + next/typescript)
```

There are no tests. `npm run build` is the way to verify changes compile cleanly; ESLint and TypeScript errors fail the Vercel build, and past build breakages have come from the map components.

The map requires `NEXT_PUBLIC_MAPBOX_TOKEN` in `.env.local`; the map page degrades gracefully without it.

## Architecture

Personal portfolio site (Cherry Lian) — Next.js 15 App Router, TypeScript, Tailwind CSS 3, deployed on Vercel.

### Data-driven content

All site content lives in JSON files under `src/data/` — edit these, not the page components, to change content:

- `resume.json` — single source of truth for home, about, projects overview, AND project detail pages. `/projects/[slug]` pages are generated from its `projects` array; slugs derive from project names.
- `publications.json` — publications page, also lazily imported on the home page.
- `map.json` — map page locations, city-grouped with GeoJSON `[lng, lat]` coordinates. Validated at runtime with Zod (`MapDataSchema` in `src/types/map.ts`, parsed in `src/hooks/useMapData.ts`) — schema changes must be made in both the JSON and the Zod schema.
- `affiliations.json` — home page affiliation cards.

Project hero images follow a naming convention: `src/app/projects/[slug]/page.tsx` maps project names to image filenames (e.g. "HINTeract..." → `hinteract-framework`); unknown projects fall back to their first word.

### Client components + layout metadata pattern

Every page under `src/app/` is a `'use client'` component (Framer Motion, hooks). Because client components can't export `metadata`, SEO metadata lives in per-route `layout.tsx` files (`projects/layout.tsx`, `publications/layout.tsx`, `map/layout.tsx`). Keep this split when adding routes.

### Map subsystem (`/map`)

The most complex feature — Mapbox GL JS via react-map-gl:

- `src/contexts/MapContext.tsx` — useReducer-based state (selected location/entry, filter, hover) shared between the map and timeline for bidirectional sync.
- `src/components/map/` — `MapboxMap` (core integration + token validation), `MarkerLayer` (memoized markers), `TimelinePanel` (chronological list, syncs with markers), `LocationModal` (entry details).
- `src/hooks/useMapData.ts` — loads/validates `map.json`, computes global stats (continent mapping lives here).
- Heavy components are dynamically imported to keep the map page bundle small.

### Theming

`src/contexts/ThemeContext.tsx` provides dark/light mode with localStorage persistence and system-preference fallback. Colors are CSS custom properties defined in `src/app/globals.css` and referenced in `tailwind.config.ts` — new components should use these theme variables (and existing utility classes like `.card`, `.btn-primary`) rather than hardcoded colors so both themes work.

### Path alias

`@/*` maps to `src/*`.
