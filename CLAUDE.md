# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**ALIAMNT** — institutional one-page-per-route marketing site (site vitrine) for an African association preventing non-communicable diseases (maladies non transmissibles). Content and code identifiers are in **French**. The design is "Apple-like": near-black background, electric-blue accent, heavy scroll-driven animation. Audience is dual: African youth (awareness) + NGOs/sponsors (credibility).

## Commands

```bash
npm run dev      # Vite dev server (http://localhost:5173)
npm run build    # vue-tsc type-check THEN vite build → dist/
npm run preview  # serve the production build
```

There is **no test runner, linter, or formatter**. `npm run build` is the only quality gate — it fails on type errors, including `noUnusedLocals` / `noUnusedParameters` (tsconfig.app.json is `strict`). Run it before considering work done.

## Stack

Vue 3 (`<script setup>`) · TypeScript · Vite · vue-router · Tailwind CSS · GSAP (+ ScrollTrigger) · Lenis (smooth scroll). No state-management library — the site is fully static/client-side and data lives in `src/data/`.

The `@` alias maps to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).

## Architecture

- **`src/data/`** is the content source of truth — `maladies.ts` (9 diseases), `campagnes.ts`, `stats.ts`, `quiz.ts`, `icones.ts` (shared inline SVG strings). Views/components import and render this data; to change site content, edit data files, not templates. All shapes are typed in **`src/types/index.ts`** (`Maladie`, `Campagne`, `StatCle`, etc.).
- **`src/router/index.ts`** owns SEO. Each route declares `meta.title` / `meta.description`; a single `afterEach` hook sets `document.title` and the description/OG meta tags. Disease detail pages (`/maladies/:slug`) derive their title from the matched `maladies` entry. `index.html` holds the static JSON-LD. When adding a route, add its meta here.
- **`src/main.ts`** is the animation backbone: registers GSAP ScrollTrigger, the global `v-reveal` directive, and Lenis smooth scroll. **Respects `prefers-reduced-motion`** — when set, Lenis is skipped and GSAP timelines are fast-forwarded (`timeScale(50)`). Preserve this branch when touching animation setup.
- **`src/directives/reveal.ts`** — global `v-reveal` directive (fade + rise + de-blur on scroll). Use `v-reveal` on an element, `v-reveal.children` for staggered children, or `v-reveal="{ delay, y, ... }"`. It cleans up its ScrollTrigger on `unmounted` to avoid orphans across route changes; follow that pattern for any new ScrollTrigger code.
- **`src/composables/`** — reusable behaviors (`useScrollAnimation`, `useCounter`, `useNavbar`, `useTilt`, `useMagnetic`, `useCursor`).
- **`src/components/`** — `layout/` (NavBar, Footer), `sections/` (homepage building blocks composed in HomeView), `ui/` (BaseButton/Card/Badge, ScrollProgress, BackToTop, AnimatedNumber).
- **`src/views/`** — one per route. Notable: `EvaluationView` (signature feature: an 11-question health quiz scoring 4 domains from `src/data/quiz.ts`, 100% client-side, SVG gauge + personalized advice), `MaladiesView` (search + category filter), `MediaView` (lightbox), `ContactView` (mailto-based, accepts `?sujet=` to preselect).

## Conventions & gotchas

- **Tailwind theme names are misleading** (`tailwind.config.js`): `green` is the electric **blue** `#4191FF`, `sand`/`cream` are light **blues**. Custom tokens include `display-xl/lg/md` font sizes, `section` spacing, `font-playfair` (Sora), `font-dm` (Inter), and `expo-out`/`expo-in` easings. Use these tokens rather than ad-hoc values.
- **Lenis controls scroll position**, so `router`'s `scrollBehavior` returns an instant `{ top: 0 }` rather than smooth-scrolling; don't fight it.
- Heavy views are lazy-loaded via dynamic `import()` in the router (only `HomeView` is eager).
- French throughout — keep new identifiers, copy, and data in French to match.
