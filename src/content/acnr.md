# ANCR — Institutional Portal
### Asociación Norte de Costa Rica · Seventh-day Adventist Church

> **Note:** Source code is under a private client agreement and cannot be shared publicly.
> This document summarizes the project for portfolio purposes.

> **Work in progress.** Deployment is pending — the site is under active development.

---

## What Is This?

Full institutional web portal for the **Asociación Norte de Costa Rica (ANCR)**, the official administrative body of the Seventh-day Adventist Church for the northern region of Costa Rica. The organization manages 48+ churches, 12,000+ members, and multiple district departments across three provinces (Alajuela, Heredia, Guanacaste).

The site serves as the primary digital face of the institution: official news, a searchable church directory with map integration, downloadable resources by department, and multimedia content.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Astro 5** (static + server rendering) |
| Styling | **Tailwind CSS** + Tailwind Typography |
| Language | **TypeScript** throughout |
| CMS | **Strapi v5** (headless, REST API) |
| Server adapter | **@astrojs/node** (standalone mode) |
| Icons | Lucide Static |
| Maps | Google Maps Embed API |
| Build tool | Vite 6 |

---

## Architecture

### Hybrid Rendering (SSG + SSR)

The project uses Astro's hybrid output model:

- **Static pages** (`index`, `about`, `news`, `videos`) are pre-rendered at build time for maximum performance.
- **Server-rendered pages** (`churches`, `resources`, detail views) stay dynamic so URL query parameters (`?provincia=&canton=`) work correctly at runtime without JavaScript client-side routing.

This is a deliberate tradeoff: a publicly crawlable, fast static core, with surgical SSR only where real filtering logic requires server access.

### CMS-Agnostic Data Layer (`src/lib/api.ts`)

All pages import data exclusively through a unified API module that implements a **two-stage fallback**:

1. If `STRAPI_URL` + `STRAPI_TOKEN` are configured → fetch live data from Strapi v5.
2. On any failure (network error, 4xx, 5xx, or CMS not running) → transparently fall back to local mock data.

This means the site **always renders** — during development without a CMS, in CI/CD pipelines, and in production if the CMS goes offline. The client never sees a broken page.

```
src/
├── lib/
│   ├── api.ts        ← single import point for all pages
│   └── strapi.ts     ← Strapi v5 fetch logic + type definitions
└── services/
    └── mockData.ts   ← structured local data for fallback
```

### Strapi v5 Integration

Strapi v5 removed the `attributes` wrapper from API responses (a breaking change from v4). The integration handles:

- Direct field mapping on content entries (`titulo`, `extracto`, `fecha`, `slug`)
- Media URL resolution for local vs. hosted Strapi instances
- Coordinate extraction from either explicit `lat/lng` fields **or** parsed from a Google Maps URL (regex fallback)
- Pagination-aware list fetching

---

## Key Features

### Church Directory

- Full searchable directory of all churches in the association
- **Cascading province → canton filters** (server-side via query params)
- **Google Maps embed** that updates dynamically when a church is selected
- Coordinate extraction falls back to parsing `?q=` / `@lat,lng` from any Google Maps URL if explicit coordinates weren't entered in the CMS
- Data import script (`scripts/import-iglesias.mjs`) for bulk-loading churches from external sources

### News System

- Dynamic routing: `/news/[slug].astro` generates individual article pages
- Grid with **client-side pagination** (9 per page) without a full page reload
- Animated counter showing "Showing X–Y of N articles"
- Full article content rendered with Tailwind Typography prose styling

### Resources Section

- Institutional document library organized by department (Administration, Youth Ministry, Education, Treasury, etc.)
- **Department tab filter** (server-side)
- File type badges with distinct colors: PDF, PPTX, DOCX, XLSX
- Direct download links from CMS-hosted files

### Statistics Dashboard (Home)

- Animated odometer counters: Members, Churches, Groups, Filiales, Small Groups
- Numbers pulled live from Strapi (or mock data fallback)
- Overlay card that bridges the hero section and the content below

### Video Library

- YouTube embed gallery for institutional transmissions and messages

---

## Design System

The visual identity follows strict institutional brand guidelines:

- **Primary**: `#0f172a` — Deep Slate (backgrounds, headings)
- **Accent**: `#faa82d` — Institutional Gold (dividers, highlights, CTAs)
- **Secondary**: `#1e3a8a` — Institutional Blue (active states, filters)
- Custom responsive container using Tailwind's fluid breakpoint system (`px-4 → px-6 → px-10 → px-16 → px-24`)
- Consistent design language: `rounded-[2.5rem]` cards, uppercase tracking labels, thin accent rule motifs

All design tokens are centralized in `src/constants.ts` so no magic values appear in template files.

---

## Content Types (Strapi CMS)

| Collection | Key Fields |
|---|---|
| **Noticias** | `titulo`, `extracto`, `contenido`, `fecha`, `slug`, `imagen` |
| **Iglesias** | `nombre`, `provincia`, `canton`, `direccion`, `latitud`, `longitud`, `mapsUrl` |
| **Recursos** | `titulo`, `descripcion`, `departamento`, `archivo`, `tipoArchivo` |
| **Estadística** | `miembros`, `iglesias`, `grupos`, `filiales`, `grupospequeños` (Single Type) |

---

## What I Solved

**Real-world CMS schema mismatch**: Strapi v5's API format is a breaking change from v4. I built the integration layer from scratch against the v5 spec, handling both the response structure differences and the media URL resolution differences between dev and production environments.

**Resilient data fetch**: Instead of crashing when the CMS is unreachable, the API layer silently falls back to structured mock data. This kept the site deliverable and reviewable at every stage, even before the CMS was fully configured.

**Coordinate ambiguity**: Church addresses in Costa Rica are often entered as Google Maps links by non-technical staff. I wrote a coordinate extractor that parses lat/lng from multiple Google Maps URL formats (`?q=lat,lng`, `@lat,lng,zoom`) so editors never need to manually enter coordinates.

**Hybrid rendering decision**: Astro defaults to full static output. I identified which pages needed server-side logic (filter persistence via URL params without JS) and configured those selectively with `export const prerender = false`, keeping everything else statically generated.

---

## Scale & Context

- Real production client — not a personal project or tutorial clone
- Covers ~48 churches and multiple administrative departments
- Bilingual codebase: UI in Spanish (institutional content), code comments and architecture in English
- Includes a full Strapi setup guide (`STRAPI_SETUP.md`) written from scratch for a non-technical admin to onboard Strapi independently

---

## Skills Demonstrated

- Astro (framework, routing, hybrid SSR/SSG, layouts, slots)
- Headless CMS integration (Strapi v5 REST API, content modeling)
- TypeScript (strict interfaces for all data models, no `any`)
- Tailwind CSS (design tokens, responsive system, custom component patterns)
- API design (data access abstraction layer, graceful degradation)
- Client/server boundary decisions (what to render where and why)
- Real client constraints: brand guidelines, non-technical editors, institutional content structure
