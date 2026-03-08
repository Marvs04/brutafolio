# Poás Stereo — Portfolio Case Study

> **Note:** The source code for this project is private out of respect for the client.
> This document exists as a reference for my portfolio.

---

## Quick Facts

| | |
|---|---|
| **Client** | Poás Stereo — online radio station, San Pedro de Poás, Costa Rica |
| **Type** | Freelance / Contract |
| **Stack** | Astro 5, TailwindCSS 3, TypeScript |
| **Deliverable** | Production static website — fully deployed |
| **Role** | Sole developer (design + implementation) |

---

## What I Built

A content-focused website for a local Costa Rican online radio station. The client needed an online presence that matched their personality — cinematic, musical, a little poetic. The site has three pages:

- **Home** — fullscreen parallax hero sections, a music archive preview, and info about the announcer
- **Acervos** — dedicated page for the client's Latin American music group, with a history section and upcoming EP announcement
- **Asesorías Académicas** — a separate service page for the client's academic consulting work

Key features:

- **Live radio player** — fixed bottom bar embedding an external stream (24/7 broadcast)
- **Real-time weather widget** — fetches current conditions from Open-Meteo at build time, using the station's geographic coordinates (San Pedro de Poás). No API key required
- **Live clock** — Costa Rica timezone, synced to the exact second boundary using `setTimeout` + `setInterval`
- **Parallax scroll** — custom implementation using `requestAnimationFrame` and passive scroll listeners for smooth, performant animation
- **Animated collage hero** — CSS keyframe animations (pan-left, pan-right, pan-up, pan-down) creating a slow-motion background effect

---

## My Honest Take on This Project

This was my **first real web project for a paying client**. I'm proud I shipped it — the client was happy and it's live. But looking back after some time away from the codebase, I can clearly see where I was thinking like a junior developer.

When I revisited the project later, I went through it with fresh eyes and a more critical mindset. Here's what I found and fixed — and what each one taught me.

---

### Things I Fixed and What I Learned From Each

**1. The parallax effect worked on one page and was silently broken on two others**

I had written the parallax scroll script directly inside `index.astro`. The other pages (`servicios.astro`) used the same CSS classes expecting the same behavior — but the script was never there. It looked fine during development because I was always testing the homepage.

The fix was straightforward: move the script into `MainLayout.astro` (the shared layout all pages use), with a guard to bail early when no parallax elements are present on the page. This taught me to think at the *system* level, not the *file* level. Shared behavior belongs in shared code.

---

**2. I had a dead script reference generating a 404 on every single page load**

There was a `<script defer src="/scripts/analytics.js">` in the layout. I had left it in as a placeholder for future analytics and completely forgot about it. Every visitor was silently hitting a 404 on every page.

Silent errors in production are worse than visible ones — they erode trust quietly. I removed it and made a note that analytics should only be added when there's actually something to load.

---

**3. The Tailwind config file had two exports — and only one of them worked**

The file had a proper ESM `export default { ... }` at the top, and then a `module.exports = { ... }` block at the bottom. In an ESM module (`"type": "module"` in `package.json`) — the `module.exports` block is completely ignored. The custom pan animations I had defined in that second block weren't loading at all. I was confused for an embarrassing amount of time about why my animations weren't applying globally.

This one taught me to actually understand the module system I'm working in, not assume both styles of export "will probably work."

---

**4. Contact info and URLs were hardcoded in four different places**

The client's phone number, WhatsApp link, and Facebook URL appeared scattered across components. If the client ever changed a contact detail, I would have needed to hunt through files to update them all — and likely miss one.

I consolidated everything into a single `src/config/site.ts` file. One source of truth. This is one of those things that feels like over-engineering when you're building it the first time, and feels obviously necessary the second time you've had to update something in three places.

---

**5. The footer said © 2025 — hardcoded**

Simple one. Replaced it with `new Date().getFullYear()` evaluated at build time. Now it will always be correct without anyone having to remember to update it.

---

**6. The weather API fetch had no timeout**

The `Clima.astro` component fetches from Open-Meteo at build time. If the API was slow or down, the build would hang indefinitely with no error message. I added an `AbortController` with a 5-second timeout and a proper `response.ok` check. If the fetch fails, the widget renders a graceful fallback state instead of crashing the build.

---

**7. No Open Graph meta tags**

Every time someone shared a page link on WhatsApp or Facebook, it rendered as a blank card with no title or description. I added `og:title`, `og:description`, `og:url`, and `twitter:card` tags to the shared layout as dynamic props — so each page can control its own metadata.

---

## What This Project Is, in Technical Terms

- **Static site generation** — fully pre-rendered, zero server needed, deploys anywhere (Netlify, GitHub Pages, Vercel)
- **Islands architecture** — minimal JavaScript. Only the components that genuinely need it (clock, carousel, mobile menu, parallax scroll) run client-side. Everything else is pure HTML/CSS
- **No CDN imports** — all dependencies are managed through `package.json` and bundled by Vite
- **TypeScript strict mode** — enforced across all `.astro` and `.ts` files via `astro/tsconfigs/strict`
- **Accessibility basics** — ARIA labels on icon buttons, `aria-expanded`/`aria-controls` on the mobile menu toggle, `aria-hidden` on decorative SVGs
- **Performance** — passive scroll listeners, `requestAnimationFrame` gating, `will-change: transform` on parallax layers, `loading="lazy"` on off-screen images

---

## If I Built This Today

I would write the parallax logic as a standalone utility from day one and import it into the layout — not tie it to a specific page. I would also set up the `src/config/site.ts` pattern before writing any component, not add it as a refactor afterward. Starting with a centralized config costs almost nothing upfront and saves a lot of hunting later.

The architecture of the project (Astro + TailwindCSS + TypeScript, static output, no unnecessary client JS) I still consider the right call for this type of site. I would make the same technology decisions today.

---

## Stack at a Glance

```
astro 5          —  static site framework
tailwindcss 3    —  styling
typescript 5     —  strict mode
eslint 9         —  linting (flat config)
prettier 3       —  formatting (with prettier-plugin-astro)
open-meteo       —  weather data (free, no API key)
vite             —  bundler (via Astro)
```

---

*Marvin Moncada — 2025/2026*
