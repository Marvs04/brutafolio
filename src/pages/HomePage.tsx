import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ScanLine } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useBlueprint } from "../context/BlueprintContext";

const APPLE_BLUE = "#007AFF";
const INK        = "#1D1D1F";
const PAPER      = "#F5F5F7";

const TICKER = [
  "React 19", "TypeScript", "Next.js", "JavaScript", "Supabase", "Python", "Astro",
  "Tailwind CSS", "PostgreSQL", "Docker", "Azure", "Vitest", "Vite", "Express",
  "HTML5", "CSS3",
];

export const HomePage: React.FC = () => {
  const { lang } = useLanguage();
  const isES = lang === "es";
  const { blueprintMode, toggleBlueprintMode } = useBlueprint();

  return (
    <div
      className="w-full"
      data-blueprint="organism:home-page"
      data-blueprint-id="home-page"
      data-blueprint-logic="HomePage  neobrutalist v5"
    >

      {/*  HERO  */}
      <section
        className="flex flex-col border-b-4 border-ink"
        style={{ minHeight: "calc(100vh - 56px)", backgroundColor: "#060606" }}
        data-blueprint="organism:hero"
        data-blueprint-id="hero"
        data-blueprint-logic="Full-viewport hero: portrait left, nav cards right, marquee ticker bottom"
      >
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 min-h-0">

          {/* LEFT  name + portrait */}
          <div
            className="lg:col-span-6 flex flex-col overflow-hidden"
            data-blueprint="molecule:hero-portrait"
            data-blueprint-id="hero-portrait"
            data-blueprint-logic="Static: name label + portrait image, stacked vertically"
          >
            <div
              className="flex-1 flex flex-col justify-end px-8 py-8"
              style={{ backgroundColor: "#060606" }}
              data-blueprint="atom:hero-name"
              data-blueprint-id="hero-name"
              data-blueprint-logic="Static identity block — MARVIN / MONCADA in font-mono bold"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20 mb-3">
                {isES ? "Desarrollador" : "Developer"}
              </p>
              <p
                className="font-mono font-bold uppercase tracking-tighter leading-[0.88] text-white w-full"
                style={{ fontSize: "clamp(3.5rem, 7.5vw, 7.5rem)" }}
              >
                MARVIN<br />
                <span style={{ color: APPLE_BLUE }}>MONCADA</span>
              </p>
            </div>
            <img
              src="/portfolio-portrait.png"
              alt="Marvin Moncada"
              className="w-full h-auto block"
              loading="eager"
              data-blueprint="atom:portrait"
              data-blueprint-id="portrait"
              data-blueprint-logic="Static asset — /portfolio-portrait.png, w-full h-auto (no crop)"
            />
          </div>

          {/* RIGHT  navigation cards */}
          <div
            className="lg:col-span-6 flex flex-col border-t-2 lg:border-t-0"
            style={{ backgroundColor: "#060606" }}
            data-blueprint="molecule:hero-nav"
            data-blueprint-id="hero-nav"
            data-blueprint-logic="Static nav: 3 route cards → /projects, /cv, /duc"
          >
            {/* Available badge */}
            <div
              className="px-8 py-5 border-b border-white/8 flex items-center gap-2 shrink-0"
              data-blueprint="atom:badge"
              data-blueprint-id="available-badge"
              data-blueprint-logic="Hardcoded availability status — green pulse + label"
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "#30D158" }}
              />
              <span
                className="font-mono text-[9px] uppercase tracking-[0.25em]"
                style={{ color: "#30D158" }}
              >
                {isES ? "Disponible" : "Available"}
              </span>
            </div>

            {/* Nav cards  fill remaining height equally */}
            <div
              className="flex flex-col flex-1"
              data-blueprint="molecule:nav-cards"
              data-blueprint-id="nav-cards"
              data-blueprint-logic="Static array map → 3 Link cards, flex-1 equal height"
            >
              {(
                [
                  {
                    to: "/projects",
                    num: "01",
                    label: isES ? "Proyectos" : "Projects",
                    sub: isES ? "Trabajo enviado" : "Shipped work",
                  },
                  {
                    to: "/cv",
                    num: "02",
                    label: "CV",
                    sub: isES ? "Currículum completo" : "Full résumé",
                  },
                  {
                    to: "/duc",
                    num: "03",
                    label: "D.U.C.",
                    sub: isES ? "Motor de arquitectura" : "Architecture engine",
                  },
                ] as { to: string; num: string; label: string; sub: string }[]
              ).map(({ to, num, label, sub }) => (
                <Link
                  key={to}
                  to={to}
                  className="group flex-1 flex items-center justify-between px-8 py-8 border-b border-white/8 hover:bg-white/[0.04] transition-colors"
                  data-blueprint={`atom:nav-card`}
                  data-blueprint-id={`nav-card-${to.replace('/', '') || 'home'}`}
                  data-blueprint-logic={`Link → ${to}`}
                >
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20 mb-2 group-hover:text-white/35 transition-colors">
                      {num}
                    </p>
                    <p
                      className="font-mono font-bold uppercase tracking-tighter text-white/70 group-hover:text-white transition-colors"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}
                    >
                      {label}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20 mt-1.5 group-hover:text-white/40 transition-colors">
                      {sub}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all shrink-0"
                  />
                </Link>
              ))}
            </div>

            {/* Footer  identity label */}
            <div
              className="px-8 py-5 shrink-0"
              data-blueprint="atom:identity-label"
              data-blueprint-id="hero-identity-label"
              data-blueprint-logic="Static footer label — role · location · year"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/12">
                {isES ? "Desarrollador Junior · Costa Rica · 2026" : "Junior Developer · Costa Rica · 2026"}
              </p>
            </div>
          </div>

        </div>

        {/* Marquee ticker */}
        <div
          className="border-t-2 border-white/8 overflow-hidden py-3 shrink-0"
          data-blueprint="atom:marquee"
          data-blueprint-id="tech-marquee"
          data-blueprint-logic="TICKER × 3, CSS animation: marquee 30s linear infinite"
        >
          <div
            className="flex whitespace-nowrap w-max"
            style={{ animation: "marquee 30s linear infinite" }}
          >
            {[...TICKER, ...TICKER, ...TICKER].map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center font-mono text-[9px] uppercase tracking-[0.25em] text-white/15 px-8"
              >
                {tech}
                <span className="ml-8 text-white/8">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/*  STATS STRIP  */}
      <section
        className="bg-white border-b-4 border-ink"
        data-blueprint="organism:stats"
        data-blueprint-id="stats"
        data-blueprint-logic="Static metrics — 4 cells, hardcoded values"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-ink">
          {[
            { n: "05", l: isES ? "Proyectos" : "Projects" },
            { n: "2+", l: isES ? "Años" : "Years" },
            { n: "04", l: isES ? "Lenguajes" : "Languages" },
            { n: "3",  l: isES ? "En producción" : "In production" },
          ].map(({ n, l }) => (
            <div
              key={l}
              className="px-8 py-10"
              data-blueprint="atom:stat-cell"
              data-blueprint-id={`stat-${n}`}
              data-blueprint-logic={`Static: ${n} / ${l}`}
            >
              <div
                className="font-mono font-bold tracking-tighter leading-none mb-2"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", color: INK }}
              >
                {n}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-ink/35">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/*  ABOUT  */}
      <section
        className="border-b-4 border-ink"
        style={{ backgroundColor: PAPER }}
        data-blueprint="organism:about"
        data-blueprint-id="about"
        data-blueprint-logic="Static: bio copy (bilingual) + stack chip list"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Bio */}
          <div
            className="border-b-2 lg:border-b-0 lg:border-r-2 border-ink px-8 md:px-12 py-14 space-y-5"
            data-blueprint="molecule:about-bio"
            data-blueprint-id="about-bio"
            data-blueprint-logic="Bilingual bio paragraphs — isES conditional"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/30">
              {isES ? "Sobre mí" : "About"}
            </p>
            <p className="font-mono text-sm leading-relaxed text-ink/60 max-w-md tracking-tight">
              {isES
                ? "Desarrollador basado en Costa Rica. Construyo plataformas multi-rol, pipelines de datos y sitios de alto rendimiento  dentro de presupuestos y plazos reales."
                : "Developer based in Costa Rica. Multi-role platforms, data pipelines, and high-performance sites  within real budgets and timelines."}
            </p>
            <p className="font-mono text-xs leading-relaxed text-ink/30 max-w-md tracking-tight">
              {isES
                ? "TypeScript estricto, pruebas unitarias, arquitectura que escala sin acumular deuda técnica."
                : "TypeScript strict mode, unit testing, architecture that scales without accumulating technical debt."}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-ink/20 border-t border-ink/10 pt-5">
              Junior Developer · Costa Rica
            </p>
          </div>
          {/* Stack chips */}
          <div
            className="bg-white px-8 md:px-12 py-14"
            data-blueprint="molecule:about-stack"
            data-blueprint-id="about-stack"
            data-blueprint-logic="Static STACK[] → chip list, 16 techs"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/30 mb-6">
              {isES ? "Tecnologías" : "Stack"}
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "React 19", "TypeScript", "Next.js", "JavaScript", "HTML5", "CSS3",
                "Python", "Astro", "Supabase",
                "Express", "PostgreSQL", "Docker", "Tailwind CSS", "Azure", "Vitest", "Vite",
              ].map(t => (
                <span
                  key={t}
                  className="font-mono text-[10px] border-2 border-ink/15 px-3 py-1.5 uppercase tracking-wider text-ink/45 hover:border-ink hover:text-ink transition-all cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*  STATEMENT  */}
      <section
        className="border-b-4 border-ink px-8 md:px-12 py-16 md:py-24"
        style={{ backgroundColor: APPLE_BLUE }}
        data-blueprint="organism:statement"
        data-blueprint-id="statement"
        data-blueprint-logic="Brand statement — DUC philosophy hook, Apple Blue bg"
      >
        <p
          className="font-mono font-bold uppercase tracking-tighter text-white leading-[0.88]"
          style={{ fontSize: "clamp(2.4rem, 8vw, 7.5rem)" }}
          data-blueprint="atom:statement-text"
          data-blueprint-id="statement-text"
          data-blueprint-logic="Static: CONSTRAINTS ARE THE BRIEF. — bilingual"
        >
          {isES ? "LAS RESTRICCIONES\nSON EL BRIEF." : "CONSTRAINTS\nARE THE BRIEF."}
        </p>
        <div className="mt-8 flex items-center gap-6">
          <div className="w-10 h-0.5 bg-white/40" />
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
            {isES ? "Filosofía  Developer Under Constraints" : "Philosophy  Developer Under Constraints"}
          </p>
        </div>
      </section>

      {/*  BLUEPRINT CTA  */}
      <section
        className="border-b-4 border-ink"
        style={{ backgroundColor: "#060606" }}
        data-blueprint="organism:blueprint-cta"
        data-blueprint-id="blueprint-cta"
        data-blueprint-logic="onClick: toggleBlueprintMode() — activates BlueprintOverlay globally via context"
      >
        <div className="px-8 md:px-16 py-16 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-4">
              Blueprint Mode
            </p>
            <h2 className="font-mono font-bold text-3xl md:text-4xl uppercase tracking-tighter text-white leading-tight">
              {isES
                ? "X-Ray del UI. Cada decisión de diseño, hecha visible."
                : "X-Ray your UI. Every design decision, made visible."}
            </h2>
          </div>
          <button
            onClick={toggleBlueprintMode}
            className="shrink-0 inline-flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-wider border-2 px-8 py-4 min-w-[260px] transition-all hover:translate-x-[3px] hover:translate-y-[3px] group"
            style={{
              borderColor: "#E879F9",
              color: blueprintMode ? "#060606" : "#E879F9",
              backgroundColor: blueprintMode ? "#E879F9" : "transparent",
              boxShadow: "4px 4px 0px 0px #E879F9",
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "none")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "4px 4px 0px 0px #E879F9")}
            data-blueprint="atom:blueprint-cta-btn"
            data-blueprint-id="blueprint-cta-btn"
            data-blueprint-logic="onClick: toggleBlueprintMode() — or press B anywhere"
          >
            <ScanLine size={13} className="group-hover:rotate-12 transition-transform" />
            {blueprintMode
              ? (isES ? "Desactivar Blueprint" : "Deactivate Blueprint")
              : (isES ? "Activar Blueprint" : "Activate Blueprint")}
          </button>
        </div>
      </section>

      {/*  D.U.C. CTA  */}
      <section
        style={{ backgroundColor: INK }}
        data-blueprint="organism:duc-cta"
        data-blueprint-id="duc-cta"
        data-blueprint-logic="Full-width CTA → /duc, INK bg, white button + Apple Blue shadow"
      >
        <div className="px-8 md:px-16 py-16 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-4">
              Developer Under Constraints
            </p>
            <h2 className="font-mono font-bold text-3xl md:text-4xl uppercase tracking-tighter text-white leading-tight">
              {isES
                ? "Arquitectura que se adapta a tus restricciones."
                : "Architecture that adapts to your constraints."}
            </h2>
          </div>
          <Link
            to="/duc"
            className="shrink-0 inline-flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-wider border-2 px-8 py-4 min-w-[260px] transition-all hover:translate-x-[3px] hover:translate-y-[3px] group"
            style={{ color: "#1D1D1F", backgroundColor: "#FFF", borderColor: "#FFF", boxShadow: `4px 4px 0px 0px ${APPLE_BLUE}` }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "none")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${APPLE_BLUE}`)}
            data-blueprint="atom:duc-cta-btn"
            data-blueprint-id="duc-cta-btn"
            data-blueprint-logic="Link → /duc, white bg, boxShadow: 4px 4px APPLE_BLUE"
          >
            {isES ? "Abrir Herramienta" : "Open Tool"}
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
};
