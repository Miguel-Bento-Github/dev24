# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dev24 is a Vue 3 portfolio/landing page for a web development company. It showcases project work via embedded iframes and images with scroll-triggered GSAP animations. Built as a PWA with Firebase auth and analytics (gated behind CookieFirst consent).

## Commands

- **Dev server:** `pnpm dev` (serves with `--host`)
- **Build:** `pnpm build` (client build into `dist`, server build into `dist-ssr`, then `scripts/prerender.mjs` writes each route's HTML and `sitemap.xml` into `dist`)
- **Type check:** `pnpm typecheck`
- **Lint:** `pnpm lint` (ESLint with auto-fix for `.vue,.js,.jsx,.ts,.tsx` etc.)
- **Preview:** `pnpm preview` (port 5050)
- **Package manager:** pnpm (specified in `packageManager` field)

## Architecture

- **Framework:** Vue 3 with Composition API (`<script setup lang="ts">`), Vue Router, Pinia
- **Build tool:** Vite with `@vitejs/plugin-vue` and `vite-plugin-pwa`
- **Styling:** SCSS scoped styles, CSS custom properties for theming (defined in `src/assets/`)
- **Path alias:** `@` maps to `src/`

### Key Patterns

- **Content-driven sections:** Portfolio sections are defined in `src/locales/en.json` and rendered by `WorkView.vue` → `MonkeySection.vue`. Each section has a header, link (iframe src), caption, meta, and optional image.
- **Animation:** GSAP with ScrollTrigger for scroll-based animations (`src/animation/`). The `useMonkeyAnimation` composable applies parallax/fade effects to portfolio sections. Respects `prefers-reduced-motion`.
- **Lazy loading:** Iframes load their `src` only when the section enters the viewport (via `useElementObserver` with IntersectionObserver). On desktop, only the first section loads eagerly.
- **Firebase:** Config in `src/firebase/`, only initialized when CookieFirst functional consent is granted. Used for Google auth and analytics.
- **Custom elements:** `css-doodle` is registered as a custom element in `vite.config.ts` compiler options.
- **Prerendering:** Every route is rendered to static HTML at build time (`src/entry-server.ts` + `scripts/prerender.mjs`) and hydrated in the browser (`src/main.ts`), so the content is readable without JavaScript. Anything that runs during setup or render must work in Node: keep `window`, `document`, `sessionStorage` and observers inside `onMounted`, or behind `import.meta.env.SSR`. The first client render has to match the prerendered markup, so screen-size differences belong in CSS, not in `v-if`.
- **SEO:** Each route's `meta` in `src/router/routes/index.ts` holds its title and description. `src/seo.ts` turns them into head tags for the prerender and keeps them in step on client-side navigation. Netlify has no catch-all rewrite: unknown URLs get the prerendered `404.html` with a 404 status.
