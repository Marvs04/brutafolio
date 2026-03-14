# Marvin Moncada — Portfolio

> An interactive engineering portfolio focused on real-world constraints—team size, budget, scale—and the decisions that make systems last. Built to show *how* I think, not just *what* I've shipped.

**[Live →](#)** &nbsp;|&nbsp; **[CV →](#)** *(URL coming soon)*

---

## What it does

Set constraints on the left panel (Solo vs. Team, Bootstrapped vs. Venture-funded, MVP vs. Global scale) and the right panel updates with a real architecture recommendation—database, frontend, hosting, auth—each backed by rationale and trade-offs from shipped projects.

This is not a technology showcase. It's a decision-making showcase.

---

## Feature highlights

| Feature | Description |
|---|---|
| **Constraint-driven architecture** | Architecture panel reacts live to constraint inputs via a pure TypeScript decision engine (`architectureService.ts`) |
| **Project Lab** | Real shipped projects with status, tech stack, problem/solution/lesson structure |
| **Blueprint X-Ray** (`B`) | Press `B` to enter dev-inspector mode—magenta component outlines, cyan padding insets, dimension badges, and a tooltip with font/gap metadata for every annotated node |
| **EN / ES** | Full bilingual content—every string, every component, constraint labels, architecture rationale, CV |
| **Responsive** | Mobile hamburger menu, collapsible constraint panel, touch-safe Blueprint mode |
| **README pages** | Each project has a dedicated `/projects/:id` route with a reading sidebar, TOC, and styled markdown |

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| UI | React 19 + TypeScript strict | Type-safe component model |
| Build | Vite 6 | Fast HMR, clean ESM output |
| Routing | React Router v7 | File-based SPA routing |
| Styling | Tailwind CSS v4 | Utility-first, custom brutalist tokens |
| Animation | Motion 12 (Framer Motion) | Spring physics + AnimatePresence |
| Icons | Lucide React | Consistent, tree-shakeable |
| i18n | Custom React Context | Zero dependency, typed translation keys |

---

## Design tokens

```css
--color-ink:    #1D1D1F   /* near-black — text, borders, structure */
--color-paper:  #F5F5F7   /* off-white — surfaces, sidebar bg      */
--color-accent: #007AFF   /* Apple Blue — buttons, active states    */
--color-danger: #FF375F   /* risk indicators in D.U.C. mode        */
--color-signal: #30D158   /* green — available pulse                */
```

---

## Project structure

```
src/
 components/
    AppLab.tsx               # Project lab grid
    ArchitectureVisualizer.tsx
    BlueprintOverlay.tsx     # X-Ray dev inspector
    ConstraintPanel.tsx
    MethodologyOverlay.tsx
    PhilosophyOverlay.tsx
    ReadmeViewer.tsx         # Markdown renderer + TOC
 constants/
    index.ts                 # Project data (bilingual)
 context/
    BlueprintContext.tsx
    LanguageContext.tsx
 hooks/
    useBlueprintNodes.ts     # DOM scanner for Blueprint mode
    useConstraints.ts
 i18n/
    translations.ts          # ~150 keys × EN + ES
 layouts/
    MainLayout.tsx
 lib/
    utils.ts
 pages/
    HomePage.tsx
    ProjectsPage.tsx
    ReadmePage.tsx           # /projects/:id
    CVPage.tsx
    DUCPage.tsx              # Developer Under Constraints tool
 services/
    architectureService.ts   # Constraint → decision engine
    projectService.ts
 types/
    index.ts
 App.tsx
 main.tsx
```

---

## AI Philosophy

AI accelerates, but doesn't replace judgment. Knowing when it helps—and when it doesn't—is part of building systems that last.

---

## Contact

**Marvin Moncada** — Junior Developer · Costa Rica · 2026  
[marvinfrancisco97@gmail.com](mailto:marvinfrancisco97@gmail.com) · [LinkedIn](https://linkedin.com/in/marvin-moncada-208033276) · [GitHub](https://github.com/Marvs04)
