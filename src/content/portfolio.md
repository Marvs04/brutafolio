# This Portfolio

## The Constraint

A portfolio needs to communicate how you think — not just what you've shipped. Most developer portfolios are static lists of tech credits. That fails completely at showing judgement, trade-offs, or reasoning under real-world pressure.

The constraint: build something that a hiring manager or technical lead can interact with and walk away understanding *how* you make architectural decisions — not just *what* decisions you've made.

## The Stack

React 19 · TypeScript strict · Vite 6 · Tailwind v4 · Motion 12 · React Router v7

## Architecture Decisions

**No backend.** Everything is static — the constraint engine runs entirely in the browser. The trade-off: no persistence across sessions, but zero infrastructure cost and instant load.

**Constraint engine in pure TypeScript.** `architectureService.ts` maps constraint tuples `(teamSize, budget, scale, realtime, deadline)` to architecture decisions with no React, no DOM, no side effects. This makes the logic trivially testable and movable — if the project ever needs a server-side API, the business logic doesn't change.

**Tailwind v4 `@theme` tokens.** Color, typography, and spacing tokens are defined once in `index.css` and consumed everywhere. No design inconsistency possible at compile time.

**JetBrains Mono everywhere.** One font. Zero visual noise from mixed typefaces. The constraint-first aesthetic is reinforced at the typography level.

**Blueprint Mode.** A zero-dependency overlay that reads `data-blueprint` attributes from the DOM and renders component hierarchy, padding values, gap measurements, and computed styles — a live Figma-style inspection panel built entirely in React. No third-party devtools dependency.

## What I Learned

Building a tool that forces you to make your decision-making legible is harder than it sounds. Every architecture choice in the portfolio had to be defensible to the engine — otherwise the tool would recommend something different from what was actually built.

The constraint engine saw through every inconsistency immediately. That kept me honest.

## Status

Shipped · Solo · 2026
