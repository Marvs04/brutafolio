import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ScanLine, Terminal, X, Mail, Linkedin, Github } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useBlueprint } from "../context/BlueprintContext";
import { TechMosaic } from "../components/TechMosaic";

const APPLE_BLUE = "#007AFF";
const INK        = "#1D1D1F";
const PAPER      = "#F5F5F7";

const CONTACT_INFO = {
  email: "marvinfrancisco97@gmail.com",
  linkedin: "https://linkedin.com/in/marvin-moncada-208033276",
  github: "https://github.com/Marvs04",
};

export const HomePage: React.FC = () => {
  const { lang } = useLanguage();
  const isES = lang === "es";
  const { blueprintMode, toggleBlueprintMode } = useBlueprint();
  const [imageError, setImageError] = React.useState(false);
  const [showContact, setShowContact] = React.useState(false);

  return (
    <div
      className="w-full"
      data-blueprint="organism:home-page"
      data-blueprint-id="home-page"
      data-blueprint-logic="HomePage neobrutalist v6"
    >

      {/* ── HERO ── */}
      <section
        aria-label="Hero"
        className="flex flex-col border-b-4 border-ink"
        style={{ minHeight: "calc(100vh - 56px)", backgroundColor: "#060606" }}
        data-blueprint="organism:hero"
        data-blueprint-id="hero"
      >
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 min-h-0">

          {/* LEFT — name + portrait */}
          <div
            className="lg:col-span-6 flex flex-col overflow-hidden"
            data-blueprint="molecule:hero-portrait"
            data-blueprint-id="hero-portrait"
          >
            <div
              className="flex-1 flex flex-col justify-end px-8 py-8"
              style={{ backgroundColor: "#060606" }}
              data-blueprint="atom:hero-name"
              data-blueprint-id="hero-name"
            >
              {/* Role label — AAA contrast on #060606 */}
              <p
                className="font-mono text-xs uppercase tracking-[0.3em] mb-3 text-white/70"
              >
                {isES ? "Desarrollador" : "Developer"}
              </p>
              <p
                className="font-mono font-bold uppercase tracking-tighter leading-[0.88] text-white w-full text-6xl md:text-7xl"
              >
                MARVIN<br />
                <span style={{ color: APPLE_BLUE }}>MONCADA</span>
              </p>
              {/* Junior tag — close to name, no "2026" */}
              <p
                className="font-mono text-sm uppercase tracking-[0.2em] mt-4 text-white/70"
              >
                {isES ? "Desarrollador Junior · Costa Rica" : "Junior Developer · Costa Rica"}
              </p>
            </div>
            <img
              src="/portfolio-portrait.png"
              alt="Marvin Moncada — Junior Developer"
              width={1376}
              height={752}
              className="w-full h-auto block bg-white/5"
              loading="eager"
              onError={() => setImageError(true)}
              style={{ display: imageError ? "none" : "block" }}
              data-blueprint="atom:portrait"
              data-blueprint-id="portrait"
            />
            {imageError && (
              <div className="w-full h-64 bg-white/5 flex items-center justify-center">
                <p className="font-mono text-xs text-white/60">Portrait unavailable</p>
              </div>
            )}
          </div>

          {/* RIGHT — navigation cards */}
          <div
            className="lg:col-span-6 flex flex-col border-t-2 lg:border-t-0"
            style={{ backgroundColor: "#060606" }}
            data-blueprint="molecule:hero-nav"
            data-blueprint-id="hero-nav"
          >
            {/* Available badge */}
            <button
              onClick={() => setShowContact(!showContact)}
              className="w-full text-left px-8 py-5 border-b border-white/10 flex items-center gap-3 shrink-0 hover:bg-white/5 transition-colors cursor-pointer group"
              data-blueprint="atom:badge"
              data-blueprint-id="available-badge"
              aria-label={isES ? "Ver contacto" : "Show contact"}
              aria-pressed={showContact}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse shrink-0"
                style={{ backgroundColor: "#30D158" }}
                aria-hidden="true"
              />
              <span
                className="font-mono text-[11px] uppercase tracking-[0.2em] leading-snug group-hover:text-white/90 transition-colors"
                style={{ color: "#30D158" }}
              >
                {isES
                  ? "Disponible para proyectos freelance y roles full-time"
                  : "Available for freelance & full-time roles"}
              </span>
            </button>

            {/* Nav cards */}
            <nav
              className="flex flex-col flex-1"
              aria-label={isES ? "Secciones" : "Page sections"}
              data-blueprint="molecule:nav-cards"
              data-blueprint-id="nav-cards"
            >
              {(
                [
                  {
                    to: "/projects",
                    num: "01",
                    label: isES ? "Proyectos" : "Projects",
                    sub: isES ? "Trabajo enviado a producción" : "Shipped work in production",
                  },
                  {
                    to: "/cv",
                    num: "02",
                    label: "CV",
                    sub: isES ? "Currículum completo" : "Full résumé",
                  },
                  {
                    to: "/fundamentals",
                    num: "03",
                    label: isES ? "Fundamentos" : "Fundamentals",
                    sub: isES ? "Decisiones de arquitectura" : "Architecture decisions",
                  },
                ] as { to: string; num: string; label: string; sub: string }[]
              ).map(({ to, num, label, sub }) => (
                <Link
                  key={to}
                  to={to}
                  aria-label={label}
                  className="group flex-1 flex items-center justify-between px-8 py-8 border-b border-white/10 hover:bg-white/[0.05] transition-colors"
                  data-blueprint="atom:nav-card"
                  data-blueprint-id={`nav-card-${to.replace("/", "") || "home"}`}
                >
                  <div>
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.3em] mb-2 text-white/70 group-hover:text-white transition-colors"
                    >
                      {num}
                    </p>
                    <p className="font-mono font-bold uppercase tracking-tighter text-white/90 group-hover:text-white transition-colors text-2xl md:text-3xl">
                      {label}
                    </p>
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.2em] mt-1.5 text-white/70 group-hover:text-white/90 transition-colors"
                    >
                      {sub}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </nav>
          </div>

        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section
        className="bg-white border-b-4 border-ink"
        aria-label={isES ? "Métricas" : "Metrics"}
        data-blueprint="organism:stats"
        data-blueprint-id="stats"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-ink">
          {[
            { n: "05", l: isES ? "Proyectos" : "Real World Projects", href: "/projects" },
            { n: "2+", l: isES ? "Años de Exp." : "Years of Exp.", href: "/cv" },
            { n: "04", l: isES ? "Tech Core" : "Core Technologies", href: "/projects" },
            { n: "3",  l: isES ? "En producción" : "In production", href: "/projects" },
          ].map(({ n, l, href }) => (
            <Link
              key={l}
              to={href}
              className="px-8 py-10 hover:bg-ink/5 transition-colors group cursor-pointer"
              data-blueprint="atom:stat-cell"
              data-blueprint-id={`stat-${n}`}
              aria-label={`${n} ${l} - Click to view`}
            >
              <div
                className="font-mono font-bold tracking-tighter leading-none mb-3 text-4xl md:text-5xl lg:text-6xl transition-colors"
                style={{ color: INK }}
                onMouseEnter={e => (e.currentTarget.style.color = APPLE_BLUE)}
                onMouseLeave={e => (e.currentTarget.style.color = INK)}
              >
                {n}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-ink/70">
                {l}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        className="border-b-4 border-ink"
        style={{ backgroundColor: PAPER }}
        aria-label={isES ? "Sobre mí" : "About me"}
        data-blueprint="organism:about"
        data-blueprint-id="about"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ width: 953 * 2 + 'px', height: '584px' }}>

          {/* Bio */}
          <div
            className="flex flex-col h-full border-b-2 lg:border-b-0 lg:border-r-2 border-ink px-8 md:px-14 lg:px-16 py-16 md:py-20 space-y-8"
            style={{ width: '953px', height: '584px' }}
            data-blueprint="molecule:about-bio"
            data-blueprint-id="about-bio"
          >
            <p
              className="font-mono text-[11px] uppercase tracking-[0.25em] mb-8 text-ink/70 font-semibold"
            >
              {isES ? "Sobre mí" : "About"}
            </p>
            <p className="font-mono text-base leading-[1.8] max-w-lg tracking-tight text-ink/85">
              {isES
                ? "Pienso en arquitectura antes que en tecnología. Flujo de datos, patrones request/response, patrones—los fundamentos que importan."
                : "I think architecture before technology. Data flows, request/response patterns, design patterns—the fundamentals that matter."}
            </p>
            <p className="font-mono text-sm leading-[1.7] max-w-lg tracking-tight text-ink/80">
              {isES
                ? "Pienso en sistemas, no en features. Problemas primero, soluciones segundo. —entender antes de construir."
                : "I think in systems, not features. Problems first, solutions second. —understanding before building."}
            </p>
          </div>

          {/* Tech Mosaic */}
          <div
            className="flex flex-col h-full px-8 md:px-14 lg:px-16 py-16 md:py-20"
            style={{ width: '953px', height: '584px' }}
            data-blueprint="molecule:about-stack"
            data-blueprint-id="about-stack"
          >
            <p
              className="font-mono text-[11px] uppercase tracking-[0.25em] mb-6 text-ink/70 font-semibold"
            >
              {isES ? "Stack" : "Stack"}
            </p>
            <TechMosaic clickable={true} />
          </div>

        </div>
      </section>

      {/* ── THINK + BLUEPRINT ── */}
      <section
        className="border-b-4 border-ink"
        style={{ backgroundColor: "#060606" }}
        aria-label={isES ? "Cómo pienso y herramientas" : "How I think and tools"}
        data-blueprint="organism:think-blueprint"
        data-blueprint-id="think-blueprint"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ width: 953 * 2 + 'px', height: '584px' }}>
          {/* LEFT — How I Think */}
          <div
            className="border-b-2 lg:border-b-0 lg:border-r-2 border-white/10 px-8 md:px-14 lg:px-16 py-16 md:py-20 space-y-8 h-full"
            style={{ width: '953px', height: '584px' }}
            data-blueprint="molecule:think-section"
            data-blueprint-id="think-section"
          >
            <p
              className="font-mono text-[11px] uppercase tracking-[0.25em] mb-8 text-white/60 font-semibold"
            >
              {isES ? "Cómo Pienso" : "How I Think"}
            </p>
            <div className="space-y-6">
              <div className="border-l-2 border-white/20 pl-6">
                <p className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: APPLE_BLUE }}>
                  {isES ? "Flujo de Datos" : "Data Flow"}
                </p>
                <p className="font-mono text-sm leading-relaxed text-white/70">
                  {isES
                    ? "Unidireccional. State predecible. Single source of truth."
                    : "Unidirectional. Predictable state. Single source of truth."}
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-6">
                <p className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: APPLE_BLUE }}>
                  {isES ? "APIs" : "API Design"}
                </p>
                <p className="font-mono text-sm leading-relaxed text-white/70">
                  {isES
                    ? "Comunicación de servicios. Caminos de error. Latencia. Resiliencia."
                    : "Service communication. Error paths. Latency. Resilience."}
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-6">
                <p className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: APPLE_BLUE }}>
                  {isES ? "Patrones" : "Patterns"}
                </p>
                <p className="font-mono text-sm leading-relaxed text-white/70">
                  {isES
                    ? "Cuándo sí. Cuándo no. Trade-offs conscientes."
                    : "When yes. When no. Conscious trade-offs."}
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-6">
                <p className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: APPLE_BLUE }}>
                  {isES ? "IA" : "AI"}
                </p>
                <p className="font-mono text-sm leading-relaxed text-white/70">
                  {isES
                    ? "La IA acelera, pero no reemplaza el criterio. Saber cuándo ayuda y cuándo no."
                    : "AI accelerates, but doesn't replace judgment. Knowing when it helps—and when it doesn't."}
                </p>
              </div>
            </div>

            <Link
              to="/fundamentals"
              className="inline-flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-wider border-2 px-8 py-4 w-[280px] transition-all hover:translate-x-[3px] hover:translate-y-[3px] group mt-8"
              style={{ color: INK, backgroundColor: "#FFF", borderColor: "#FFF", boxShadow: `4px 4px 0px 0px ${APPLE_BLUE}` }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "none")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${APPLE_BLUE}`)}
              aria-label={isES ? "Ir a decisiones de arquitectura" : "Go to architecture decisions"}
            >
              {isES ? "Ver Decisiones" : "View Decisions"}
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          {/* RIGHT — Blueprint Mode */}
          <div
            className="px-8 md:px-14 lg:px-16 py-16 md:py-20 flex flex-col justify-between h-full"
            style={{ width: '953px', height: '584px' }}
            data-blueprint="molecule:blueprint-card"
            data-blueprint-id="blueprint-card"
          >
            <div>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.25em] mb-6 text-white/60 font-semibold"
              >
                Blueprint Mode
              </p>
              <h3 className="font-mono font-bold text-2xl md:text-3xl uppercase tracking-tighter text-white leading-tight">
                {isES
                  ? "X-Ray del UI."
                  : "X-Ray your UI."}
              </h3>
              <p className="font-mono text-sm leading-relaxed text-white/70 mt-4">
                {isES
                  ? "Cada decisión de diseño, hecha visible. Component outlines, padding, spacing, font metrics."
                  : "Every design decision, made visible. Component outlines, padding, spacing, font metrics."}
              </p>
            </div>
            <button
              onClick={toggleBlueprintMode}
              aria-pressed={blueprintMode}
              aria-label={blueprintMode
                ? (isES ? "Desactivar modo Blueprint" : "Deactivate Blueprint mode")
                : (isES ? "Activar modo Blueprint" : "Activate Blueprint mode")}
              className="mt-8 inline-flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-wider border-2 px-8 py-4 w-[280px] transition-all hover:translate-x-[3px] hover:translate-y-[3px] group cursor-pointer"
              style={{
                color: INK,
                backgroundColor: "#FFF",
                borderColor: "#FFF",
                boxShadow: blueprintMode ? "none" : `4px 4px 0px 0px ${APPLE_BLUE}`,
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "none")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = blueprintMode ? "none" : `4px 4px 0px 0px ${APPLE_BLUE}`)}
            >
              <ScanLine size={13} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
              {blueprintMode
                ? (isES ? "Desactivar" : "Deactivate")
                : (isES ? "Activar" : "Activate")}
            </button>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContact && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setShowContact(false)}
            aria-hidden="true"
          />
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
            role="dialog"
            aria-modal="true"
            aria-label={isES ? "Información de contacto" : "Contact information"}
          >
            <div
              className="border-4 border-ink p-8 md:p-10"
              style={{ backgroundColor: PAPER }}
            >
              {/* Close button */}
              <button
                onClick={() => setShowContact(false)}
                className="absolute top-4 right-4 p-2 hover:bg-ink/10 transition-colors"
                aria-label="Close"
              >
                <X size={20} style={{ color: INK }} />
              </button>

              {/* Title */}
              <p
                className="font-mono text-[11px] uppercase tracking-[0.25em] mb-6 font-semibold"
                style={{ color: INK }}
              >
                {isES ? "Contacto" : "Contact"}
              </p>

              {/* Contact links */}
              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-4 p-4 border-l-4 hover:bg-ink/5 transition-colors group cursor-pointer"
                  style={{ borderColor: APPLE_BLUE }}
                >
                  <Mail size={20} style={{ color: APPLE_BLUE }} className="shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: INK }}>
                      Email
                    </p>
                    <p className="font-mono text-sm text-ink/70 group-hover:text-ink transition-colors truncate">
                      {CONTACT_INFO.email}
                    </p>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={CONTACT_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border-l-4 hover:bg-ink/5 transition-colors group cursor-pointer"
                  style={{ borderColor: APPLE_BLUE }}
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={20} style={{ color: APPLE_BLUE }} className="shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: INK }}>
                      LinkedIn
                    </p>
                    <p className="font-mono text-sm text-ink/70 group-hover:text-ink transition-colors">
                      {isES ? "Ver perfil" : "View profile"}
                    </p>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href={CONTACT_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border-l-4 hover:bg-ink/5 transition-colors group cursor-pointer"
                  style={{ borderColor: APPLE_BLUE }}
                  aria-label="GitHub profile"
                >
                  <Github size={20} style={{ color: APPLE_BLUE }} className="shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: INK }}>
                      GitHub
                    </p>
                    <p className="font-mono text-sm text-ink/70 group-hover:text-ink transition-colors">
                      {isES ? "Ver repositorios" : "View repositories"}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
};
