import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

const APPLE_BLUE = "#007AFF";
const INK        = "#1D1D1F";
const PAPER      = "#F5F5F7";

interface ArchitectureDecision {
  id: string;
  projectSlug: string;
  projectName: string;
  problem: string;
  problemES: string;
  decision: string;
  decisionES: string;
  tradeoff: string;
  tradeoffES: string;
}

const DECISIONS: ArchitectureDecision[] = [
  {
    id: "acnr-state",
    projectSlug: "acnr",
    projectName: "ACNR",
    problem:
      "Multiple data sources (API, cache, real-time) updating independently. State became unpredictable when scaling from 1 user to 1000 concurrent.",
    problemES:
      "Múltiples fuentes de datos (API, caché, tiempo real) actualizándose independientemente. El estado se volvió impredecible al escalar de 1 a 1000 usuarios concurrentes.",
    decision:
      "Implemented unidirectional data flow with centralized state. Single source of truth for all domain data.",
    decisionES:
      "Implementé flujo de datos unidireccional con estado centralizado. Una única fuente de verdad para todos los datos.",
    tradeoff:
      "Slightly more boilerplate upfront, but debugging became trivial. No need to refactor when scaling.",
    tradeoffES:
      "Algo más de boilerplate al principio, pero la depuración se volvió trivial. Sin necesidad de refactor al escalar.",
  },
  {
    id: "senda-api",
    projectSlug: "senda",
    projectName: "SENDA",
    problem:
      "Backend API vulnerable to timeouts, partial failures, and race conditions in high-latency environments.",
    problemES:
      "API del backend vulnerable a timeouts, fallos parciales, y condiciones de carrera en entornos de alta latencia.",
    decision:
      "Built request retry logic with exponential backoff, circuit breaker pattern, and explicit timeout strategies.",
    decisionES:
      "Construí lógica de reintentos con backoff exponencial, patrón circuit breaker, y estrategias de timeout explícitas.",
    tradeoff:
      "More complex code, but production reliability improved drastically. Fewer P1 incidents.",
    tradeoffES:
      "Código más complejo, pero la confiabilidad en producción mejoró drásticamente. Menos incidentes P1.",
  },
  {
    id: "poass-ai",
    projectSlug: "poasstereo",
    projectName: "POASS Stereo",
    problem:
      "Building with LLM APIs without understanding cost models, token limits, and latency trade-offs. Budgets blow up fast.",
    problemES:
      "Construir con APIs de LLM sin entender modelos de costos, límites de tokens, y trade-offs de latencia. Los presupuestos se agotan rápido.",
    decision:
      "Engineered prompts for consistency, batched requests, used cheaper models for non-critical tasks, monitored token usage continuously.",
    decisionES:
      "Diseñé prompts para consistencia, solicitudes por lotes, usé modelos más baratos para tareas no críticas, monitorié uso de tokens continuamente.",
    tradeoff:
      "Takes time to optimize, but you understand the actual cost/benefit. AI becomes predictable, not magic.",
    tradeoffES:
      "Toma tiempo optimizar, pero entiendes el costo/beneficio real. La IA se vuelve predecible, no mágica.",
  },
];

interface AIProject {
  id: string;
  title: string;
  titleES: string;
  description: string;
  descriptionES: string;
  focus: string;
  focusES: string;
}

const AI_WORK: AIProject[] = [
  {
    id: "prompt-eng",
    title: "Prompt Engineering & Output Consistency",
    titleES: "Ingeniería de Prompts y Consistencia de Salida",
    description:
      "Not just asking the API to do something. Structuring prompts to get repeatable, parseable output. Understanding how temperature, max_tokens, and system prompts affect behavior.",
    descriptionES:
      "No solo pedirle a la API que haga algo. Estructurar prompts para obtener salida repetible y procesable. Entender cómo temperature, max_tokens y system prompts afectan el comportamiento.",
    focus: "Built POASS Stereo with consistent JSON output from Claude API",
    focusES: "Construí POASS Stereo con salida JSON consistente de la API de Claude",
  },
  {
    id: "cost-optimization",
    title: "Cost Optimization & Token Management",
    titleES: "Optimización de Costos y Gestión de Tokens",
    description:
      "LLMs cost money. Real understanding means knowing which models to use for which tasks. Tier your API calls: expensive models for complex reasoning, cheap models for classification.",
    descriptionES:
      "Los LLMs cuestan dinero. Entendimiento real significa saber qué modelos usar para qué tareas. Clasifica tus llamadas API: modelos caros para razonamiento complejo, modelos baratos para clasificación.",
    focus: "Implemented tiered LLM strategy to stay within budget while maintaining quality",
    focusES: "Implementé estrategia de LLM clasificada para mantenerse dentro del presupuesto sin perder calidad",
  },
  {
    id: "latency-tradeoff",
    title: "Latency & Real-time vs. Batch Processing",
    titleES: "Latencia y Procesamiento en Tiempo Real vs. Por Lotes",
    description:
      "When does the user need the answer immediately vs. can we batch process in the background? Understanding this trade-off shapes your entire architecture.",
    descriptionES:
      "¿Cuándo el usuario necesita la respuesta inmediatamente vs. podemos procesar por lotes en el fondo? Entender este trade-off forma toda tu arquitectura.",
    focus: "Chose async processing for non-blocking operations in real-time applications",
    focusES: "Elegí procesamiento asincrónico para operaciones sin bloqueo en aplicaciones en tiempo real",
  },
];

export const FundamentalsPage: React.FC = () => {
  const { lang } = useLanguage();
  const isES = lang === "es";
  const t = translations[lang];

  return (
    <div
      className="flex flex-col flex-grow min-h-0"
      data-blueprint="organism:fundamentals-page"
      data-blueprint-id="fundamentals-page"
      data-blueprint-logic="Architecture decisions and AI work - showing understanding through evidence"
    >
      {/* ── Header ── */}
      <div
        className="border-b-4 border-ink px-8 md:px-14 py-12 md:py-16 shrink-0"
        style={{ backgroundColor: "#060606" }}
        data-blueprint="organism:page-header"
        data-blueprint-id="fundamentals-header"
      >
        <p
          className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/70 mb-4"
          data-blueprint="atom:page-label"
          data-blueprint-id="fundamentals-label"
        >
          02 / {isES ? "ARQUITECTURA" : "ARCHITECTURE"}
        </p>
        <h1
          className="font-mono font-bold uppercase tracking-tighter leading-[0.9] text-white text-5xl md:text-6xl lg:text-7xl"
          data-blueprint="atom:page-title"
          data-blueprint-id="fundamentals-title"
        >
          {isES ? (
            <>
              DECISIONES<br />DE <span style={{ color: APPLE_BLUE }}>SISTEMA_</span>
            </>
          ) : (
            <>
              SYSTEM<br /><span style={{ color: APPLE_BLUE }}>DECISIONS_</span>
            </>
          )}
        </h1>
        <p
          className="font-mono text-[10px] text-white/70 uppercase tracking-[0.2em] mt-6 max-w-2xl"
          data-blueprint="atom:page-subtitle"
          data-blueprint-id="fundamentals-subtitle"
        >
          {isES
            ? "Cómo pienso. Problemas, decisiones, trade-offs."
            : "How I think. Problems, decisions, trade-offs."}
        </p>
      </div>

      {/* ── Content ── */}
      <div className="flex-grow overflow-y-auto" style={{ backgroundColor: PAPER }}>
        {/* Architecture Decisions — Compact */}
        <section
          className="border-r-4 border-ink"
          data-blueprint="organism:decisions-section"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-0">
            {/* Left — Title + copy */}
            <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-ink px-8 md:px-14 lg:px-16 py-10 md:py-12 space-y-6"
              data-blueprint="molecule:decisions-intro"
            >
              <p
                className="font-mono text-[11px] uppercase tracking-[0.25em] mb-6 text-ink/70 font-semibold"
              >
                {isES ? "Decisiones" : "Decisions"}
              </p>
              <p className="font-mono text-base leading-[1.8] max-w-lg tracking-tight text-ink/85">
                {isES
                  ? "Arquitectura antes que features. Cuando entiendes las limitaciones, las soluciones se hacen claras."
                  : "Architecture before features. When you understand the limitations, the solutions become clearer."}
              </p>
            </div>

            {/* Right — Decision cards in grid */}
            <div
              className="bg-white px-8 md:px-14 lg:px-16 py-10 md:py-12"
              data-blueprint="molecule:decisions-grid"
            >
              <div className="grid grid-cols-1 gap-3">
                {DECISIONS.map((decision) => (
                  <Link
                    key={decision.id}
                    to={`/projects/${decision.projectSlug}`}
                    className="border-2 border-ink/20 p-3 hover:border-ink/40 transition-all hover:shadow-md"
                    data-blueprint="molecule:decision-card"
                  >
                    <h3
                      className="font-mono font-bold text-ink uppercase tracking-tighter text-sm mb-2"
                      style={{ color: APPLE_BLUE }}
                    >
                      {decision.projectName}
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-wider text-ink/50 mb-0.5">
                          Problem
                        </p>
                        <p className="font-mono text-ink/70 leading-snug">
                          {isES ? decision.problemES : decision.problem}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-ink/10">
                        <p className="font-mono text-[9px] uppercase tracking-wider text-ink/50 mb-0.5">
                          Decision
                        </p>
                        <p className="font-mono text-ink/70 leading-snug">
                          {isES ? decision.decisionES : decision.decision}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI Work — Compact */}
        <section
          className="border-r-4 border-ink"
          data-blueprint="organism:ai-section"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-0">
            <div
              className="bg-white px-8 md:px-14 lg:px-16 py-10 md:py-12 order-2 lg:order-1"
              data-blueprint="molecule:ai-grid"
            >
              <div className="grid grid-cols-1 gap-3">
                {AI_WORK.map((work) => (
                  <div
                    key={work.id}
                    className="border-2 border-ink/20 p-3"
                    data-blueprint="molecule:ai-work-card"
                  >
                    <h3
                      className="font-mono font-bold text-ink uppercase tracking-tighter text-sm mb-2"
                      style={{ color: APPLE_BLUE }}
                    >
                      {isES ? work.titleES : work.title}
                    </h3>
                    <p className="font-mono text-xs text-ink/70 leading-snug mb-3">
                      {isES ? work.descriptionES : work.description}
                    </p>
                    <div className="pt-2 border-t border-ink/10">
                      <p className="font-mono text-[9px] uppercase tracking-wider text-ink/50 mb-1">
                        Evidence
                      </p>
                      <p className="font-mono text-xs text-ink/60">
                        {isES ? work.focusES : work.focus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Title + copy */}
            <div
              className="border-b-2 lg:border-b-0 lg:border-r-2 border-ink px-8 md:px-14 lg:px-16 py-10 md:py-12 space-y-6 order-1 lg:order-2"
              data-blueprint="molecule:ai-intro"
            >
              <p
                className="font-mono text-[11px] uppercase tracking-[0.25em] mb-6 text-ink/70 font-semibold"
              >
                {isES ? "IA" : "AI"}
              </p>
              <p className="font-mono text-base leading-[1.8] max-w-lg tracking-tight text-ink/85">
                {isES
                  ? "La IA amplifica el mal pensamiento igual que el bueno. Por eso la intención importa más que la herramienta."
                  : "AI amplifies bad thinking just as much as good thinking. That's why intention matters more than the tool."}
              </p>
            </div>
          </div>
        </section>

        {/* Fundamentals — Clean */}
        <section
          className="px-8 md:px-14 lg:px-16 py-10 md:py-12 border-t-4 border-ink"
          style={{ backgroundColor: "#060606" }}
          data-blueprint="organism:fundamentals-list"
        >
          <p
            className="font-mono text-[11px] uppercase tracking-[0.25em] mb-6 text-white/70 font-semibold"
          >
            {isES ? "Aplicación" : "Application"}
          </p>
          <p className="font-mono text-base leading-[1.8] max-w-xl tracking-tight text-white/85 mb-8">
            {isES
              ? "Datos unidireccionales. APIs sólidas. Trade-offs conscientes. Herramientas apropiadas."
              : "Unidirectional data. Solid APIs. Conscious trade-offs. Right tools."}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="border-l-2 pl-3" style={{ borderColor: APPLE_BLUE }}>
              <p
                className="font-mono text-xs uppercase tracking-wider mb-2 font-bold"
                style={{ color: APPLE_BLUE }}
              >
                {isES ? "Flujo" : "Data Flow"}
              </p>
              <p className="font-mono text-xs text-white/70">
                {isES ? "Unidireccional, predecible, single source." : "Unidirectional, predictable, single source."}
              </p>
            </div>

            <div className="border-l-2 pl-3" style={{ borderColor: APPLE_BLUE }}>
              <p
                className="font-mono text-xs uppercase tracking-wider mb-2 font-bold"
                style={{ color: APPLE_BLUE }}
              >
                APIs
              </p>
              <p className="font-mono text-xs text-white/70">
                {isES ? "Cómo se comunican los sistemas. Caminos de error. Latencia real." : "How systems communicate, error paths, real latency."}
              </p>
            </div>

            <div className="border-l-2 pl-3" style={{ borderColor: APPLE_BLUE }}>
              <p
                className="font-mono text-xs uppercase tracking-wider mb-2 font-bold"
                style={{ color: APPLE_BLUE }}
              >
                Patterns
              </p>
              <p className="font-mono text-xs text-white/70">
                {isES ? "Cuándo sí, cuándo no, deuda consciente." : "When yes, when no, conscious debt."}
              </p>
            </div>

            <div className="border-l-2 pl-3" style={{ borderColor: APPLE_BLUE }}>
              <p
                className="font-mono text-xs uppercase tracking-wider mb-2 font-bold"
                style={{ color: APPLE_BLUE }}
              >
                IA
              </p>
              <p className="font-mono text-xs text-white/70">
                {isES ? "Costos, prompts, cuándo usarla." : "Cost models, prompts, when to use."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
