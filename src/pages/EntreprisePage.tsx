import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */

function useScrollInView(ref: React.RefObject<Element | null>, rootMargin = "-60px"): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

function useCounter(target: number, inView: boolean, duration = 1.6) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const pct = Math.min((ts - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setVal(Math.round(eased * target));
      if (pct < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return val;
}

/* Scroll-driven phase helper — opacity + y offset */
function mkPhase(sp: number, iS: number, hS: number, hE: number, oE: number) {
  return {
    o: sp < iS ? 0 : sp < hS ? (sp - iS) / (hS - iS) : sp < hE ? 1 : sp < oE ? 1 - (sp - hE) / (oE - hE) : 0,
    y: sp < iS ? 44 : sp < hS ? 44 * (1 - (sp - iS) / (hS - iS)) : sp < hE ? 0 : sp < oE ? -44 * ((sp - hE) / (oE - hE)) : -44,
  };
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const INDUSTRIES = [
  "Ferreterías", "Restaurantes", "Barberías", "Cafeterías",
  "Salones de Belleza", "Supermercados", "Tiendas de Barrio",
  "Farmacias", "Panaderías", "Pulperías",
];

const MODULES = [
  {
    id: "01",
    slug: "inventario",
    title: "Gestión de Inventario",
    desc: "Control de stock en tiempo real, alertas de reabastecimiento automáticas y categorías adaptadas a tu tipo de negocio.",
    symbol: "▦",
    accent: "#007AFF",
    wide: true,
  },
  {
    id: "02",
    slug: "ventas",
    title: "Ventas y POS",
    desc: "Punto de venta digital con facturación electrónica según normativa de Costa Rica.",
    symbol: "◈",
    accent: "#30D158",
    wide: false,
  },
  {
    id: "03",
    slug: "clientes",
    title: "Clientes y CRM",
    desc: "Historial de compras, segmentación y gestión de contactos por tipo de negocio.",
    symbol: "◎",
    accent: "#FFD60A",
    wide: false,
  },
  {
    id: "04",
    slug: "reportes",
    title: "Reportes y Análisis",
    desc: "Dashboards en tiempo real: ventas diarias, productos top y flujo de caja básico desde cualquier dispositivo.",
    symbol: "◳",
    accent: "#FF375F",
    wide: true,
  },
];

const STEPS = [
  {
    n: "01",
    title: "Regístrate",
    body: "Crea tu cuenta en minutos. Sin tarjeta de crédito. 14 días con todas las funcionalidades activas.",
  },
  {
    n: "02",
    title: "Configura",
    body: "Elige el tipo de negocio y el sistema adapta la interfaz, la terminología y los flujos a tu industria.",
  },
  {
    n: "03",
    title: "Crece",
    body: "Gestiona inventario, ventas y reportes desde cualquier dispositivo. Tu equipo, siempre en sintonía.",
  },
] as const;

const PLANS = [
  {
    name: "Básico",
    price: "$29",
    period: "/ mes",
    tag: "Para empezar",
    features: ["1 usuario", "Inventario básico", "POS simple", "Soporte por email", "14 días gratis"],
    featured: false,
  },
  {
    name: "Crecimiento",
    price: "$59",
    period: "/ mes",
    tag: "Más popular",
    features: ["5 usuarios", "Todos los módulos", "Reportes avanzados", "Soporte prioritario", "Onboarding incluido", "Reportes mensuales"],
    featured: true,
  },
  {
    name: "Escala",
    price: "$99",
    period: "/ mes",
    tag: "Para expandirse",
    features: ["Usuarios ilimitados", "Multi-sucursal", "Acceso a API", "SLA respuesta 4h", "Gerente de cuenta", "Capacitación incluida"],
    featured: false,
  },
] as const;

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export function EntreprisePage() {
  const navigate = useNavigate();

  /* Cursor orb */
  const heroRef = useRef<HTMLDivElement>(null);
  const [orb, setOrb] = useState({ x: 40, y: 35 });
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setOrb({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  /* Section in-view refs */
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useScrollInView(statsRef);
  const modulesRef = useRef<HTMLDivElement>(null);
  const modulesInView = useScrollInView(modulesRef);
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useScrollInView(stepsRef);

  /* Counters */
  const cDays = useCounter(14, statsInView);
  const cGuarantee = useCounter(30, statsInView);
  const cSupport = useCounter(4, statsInView);
  const cGoal = useCounter(50, statsInView);

  /* Scroll-driven hero */
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const [sp, setSp] = useState(0);
  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = heroSectionRef.current;
        if (!el) return;
        const total = el.offsetHeight - window.innerHeight;
        if (total <= 0) return;
        setSp(Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, []);

  // Phases — timed for 380vh section
  const q1     = mkPhase(sp, 0.00, 0.06, 0.16, 0.23);
  const q2     = mkPhase(sp, 0.21, 0.27, 0.39, 0.46);
  const q3     = mkPhase(sp, 0.44, 0.50, 0.62, 0.69);
  const bridge = mkPhase(sp, 0.67, 0.72, 0.77, 0.82);
  // "MONCADEV TIENE LA SOLUCIÓN." — new beat before the full reveal
  const solve  = mkPhase(sp, 0.80, 0.85, 0.91, 0.96);
  // Final hero — crossfades WITH solve so MONCADEV appears to stay
  const final  = { o: sp < 0.90 ? 0 : sp < 0.98 ? (sp - 0.90) / 0.08 : 1,
                   y: sp < 0.90 ? 44 : sp < 0.98 ? 44 * (1 - (sp - 0.90) / 0.08) : 0 };

  // Accent glow — shifts blue→green→yellow→blue across the story arc
  const glowBlue   = sp < 0.23 ? 1 : sp < 0.27 ? 1 - (sp - 0.23) / 0.04 : sp > 0.88 ? Math.min(1, (sp - 0.88) / 0.06) : 0;
  const glowGreen  = sp < 0.21 ? 0 : sp < 0.27 ? (sp - 0.21) / 0.06 : sp < 0.44 ? 1 : sp < 0.50 ? 1 - (sp - 0.44) / 0.06 : 0;
  const glowYellow = sp < 0.44 ? 0 : sp < 0.50 ? (sp - 0.44) / 0.06 : sp < 0.67 ? 1 : sp < 0.73 ? 1 - (sp - 0.67) / 0.06 : 0;

  return (
    <div className="flex flex-col">

      {/* ──────────────────────────────────────
          HERO — scroll-driven storytelling
      ────────────────────────────────────── */}
      <section
        ref={heroSectionRef}
        className="relative bg-[#060606]"
        style={{ minHeight: "380vh" }}
      >
        {/* Sticky frame */}
        <div
          ref={heroRef}
          onMouseMove={handleMouseMove}
          className="sticky top-0 h-screen overflow-hidden select-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        >
          {/* Cursor orb */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(700px circle at ${orb.x}% ${orb.y}%, rgba(0,122,255,0.06), transparent 65%)`,
              transition: "background 0.1s ease-out",
            }}
          />

          {/* Accent glows — shift color with each story beat */}
          <div className="pointer-events-none absolute inset-0" style={{
            opacity: glowBlue,
            background: "radial-gradient(600px circle at 12% 78%, rgba(0,122,255,0.12), transparent 60%)",
          }} />
          <div className="pointer-events-none absolute inset-0" style={{
            opacity: glowGreen,
            background: "radial-gradient(600px circle at 12% 78%, rgba(48,209,88,0.10), transparent 60%)",
          }} />
          <div className="pointer-events-none absolute inset-0" style={{
            opacity: glowYellow,
            background: "radial-gradient(600px circle at 12% 78%, rgba(255,214,10,0.08), transparent 60%)",
          }} />

          {/* Question counter — quiet top-right, visible during questions */}
          <div
            className="absolute top-8 right-8 md:right-14 lg:right-16 font-mono text-xs tracking-[0.22em] text-white/20 uppercase transition-opacity duration-300"
            style={{ opacity: sp > 0.04 && sp < 0.75 ? 1 : 0 }}
          >
            {sp < 0.23 ? "01 / 03" : sp < 0.47 ? "02 / 03" : "03 / 03"}
          </div>

          {/* ── Story beats ── */}

          {/* Q1 / Q2 / Q3 */}
          {([
            { ph: q1, label: "01_ Inventario", lines: ["¿CUÁNTO INVENTARIO", "TE QUEDA?"],          accent: "#007AFF" },
            { ph: q2, label: "02_ Ventas",     lines: ["¿CUÁNTO",            "VENDISTE HOY?"],      accent: "#30D158" },
            { ph: q3, label: "03_ Clientes",   lines: ["¿QUIÉNES SON TUS",   "MEJORES CLIENTES?"],  accent: "#FFD60A" },
          ] as const).map(({ ph, label, lines, accent }) => (
            <div
              key={label}
              className="absolute inset-0 flex flex-col justify-center px-8 md:px-14 lg:px-16 pointer-events-none"
              style={{ opacity: ph.o, transform: `translateY(${ph.y}px)` }}
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em] mb-5" style={{ color: `${accent}95` }}>
                {label}
              </div>
              {lines.map((line) => (
                <div
                  key={line}
                  className="font-mono font-black uppercase tracking-tighter text-white leading-[0.9]"
                  style={{ fontSize: "clamp(2.8rem, 8.5vw, 7.5rem)" }}
                >
                  {line}
                </div>
              ))}
              {/* Accent bar — grows with phase opacity */}
              <div
                className="mt-8 h-[3px]"
                style={{ width: `${ph.o * 80}px`, backgroundColor: accent, transition: "width 0.05s linear" }}
              />
            </div>
          ))}

          {/* Bridge */}
          <div
            className="absolute inset-0 flex flex-col justify-center px-8 md:px-14 lg:px-16 pointer-events-none"
            style={{ opacity: bridge.o, transform: `translateY(${bridge.y}px)` }}
          >
            <p className="font-mono text-white/45 leading-[1.45] max-w-2xl" style={{ fontSize: "clamp(1.6rem, 4.5vw, 4rem)" }}>
              Ningún negocio debería<br />
              responder con{" "}
              <span className="text-white font-bold">"no sé".</span>
            </p>
          </div>

          {/* "MONCADEV TIENE LA SOLUCIÓN." — new beat, MONCADEV at same position as final */}
          <div
            className="absolute inset-0 flex flex-col justify-center px-8 md:px-14 lg:px-16 pointer-events-none"
            style={{ opacity: solve.o, transform: `translateY(${solve.y}px)` }}
          >
            <h1
              className="font-mono font-black uppercase tracking-tighter text-white leading-[0.9]"
              style={{ fontSize: "clamp(3.8rem, 13vw, 12rem)" }}
            >
              MoncaDev
            </h1>
            {/* "TIENE LA SOLUCIÓN." — accent colored, slides in right after the name */}
            <p
              className="font-mono font-black uppercase tracking-tighter leading-none mt-1"
              style={{
                fontSize: "clamp(1.1rem, 3.2vw, 2.8rem)",
                color: "#007AFF",
                opacity: solve.o > 0.6 ? (solve.o - 0.6) / 0.4 : 0,
              }}
            >
              tiene la solución.
            </p>
            {/* Spacer — equalizes height with final phase so MONCADEV stays put */}
            <div className="mt-8 h-12" />
          </div>

          {/* Final — full hero, MONCADEV at same flex-center position as solve */}
          <div
            className="absolute inset-0 flex flex-col justify-center px-8 md:px-14 lg:px-16"
            style={{ opacity: final.o, transform: `translateY(${final.y}px)` }}
          >
            <h1
              className="font-mono font-black uppercase tracking-tighter text-white leading-[0.9]"
              style={{ fontSize: "clamp(3.8rem, 13vw, 12rem)" }}
            >
              MoncaDev
            </h1>
            <p
              className="font-mono font-bold uppercase tracking-[0.18em] text-white/30 mt-2"
              style={{ fontSize: "clamp(0.75rem, 2vw, 1.1rem)" }}
            >
              Tu Núcleo Operativo
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 border-2 border-white/20 bg-accent text-white font-mono text-sm uppercase tracking-tighter px-6 py-3 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.12)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.12)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                Prueba 14 días gratis
              </a>
              <a
                href="#modules"
                className="font-mono text-sm uppercase tracking-tighter text-white/45 hover:text-white/80 transition-colors flex items-center gap-2 group"
              >
                Ver módulos
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          {/* Status pill — absolutely positioned so it doesn't shift MONCADEV */}
          <div
            className="absolute top-8 left-8 md:left-14 lg:left-16 flex items-center gap-3"
            style={{ opacity: final.o > 0.5 ? (final.o - 0.5) / 0.5 : 0 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-white/40">
              Beta abierta · SaaS · Centroamérica
            </span>
          </div>

          {/* Origin stamp */}
          <div
            className="absolute bottom-16 left-8 md:left-14 lg:left-16 font-mono text-xs uppercase tracking-[0.22em] text-white/20"
            style={{ opacity: final.o }}
          >
            MoncaDev · Costa Rica · Est. 2026
          </div>

          {/* Scroll hint */}
          <div
            className="absolute bottom-8 left-8 md:left-14 lg:left-16 flex items-center gap-2 pointer-events-none"
            style={{ opacity: sp < 0.02 ? 1 : Math.max(0, 1 - (sp - 0.02) / 0.04) }}
          >
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/25">Scroll</span>
            <motion.span
              className="text-white/25 text-xs"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.05]">
            <div
              className="h-full bg-accent"
              style={{ width: `${sp * 100}%`, transition: "width 0.05s linear" }}
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────
          INDUSTRY TICKER
      ────────────────────────────────────── */}
      <div className="bg-[#060606] border-t border-b border-white/[0.07] py-4 overflow-hidden">
        <motion.div
          className="flex"
          style={{ width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        >
          {[...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES].map((industry, i) => (
            <span key={i} className="font-mono text-xs uppercase tracking-[0.28em] text-white/25 whitespace-nowrap px-5">
              {industry}
              <span className="text-accent/60 ml-5">·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ──────────────────────────────────────
          STATS STRIP
      ────────────────────────────────────── */}
      <div ref={statsRef} className="bg-[#080808] border-b border-white/[0.07]">
        <div className="px-8 md:px-14 lg:px-16 py-14 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.07]">
          {[
            { value: cDays, suffix: " días", label: "Prueba gratuita" },
            { value: cGuarantee, suffix: " días", label: "Garantía de reembolso" },
            { value: cSupport, suffix: "h hábiles", label: "SLA de soporte" },
            { value: cGoal, suffix: "+", label: "Negocios objetivo" },
          ].map(({ value, suffix, label }, i) => (
            <div key={i} className="px-6 first:pl-0 last:pr-0 py-2">
              <div className="font-mono font-black text-5xl md:text-6xl text-white leading-none">
                {value}
                <span className="text-accent text-2xl font-normal">{suffix}</span>
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.22em] text-white/35 mt-2">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ──────────────────────────────────────
          ABOUT — MISSION + VISION
      ────────────────────────────────────── */}
      <section className="bg-[#060606] px-8 md:px-14 lg:px-16 py-20">
        <div className="flex items-baseline gap-3 mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/25">00_</span>
          <h2 className="font-mono font-bold text-2xl md:text-3xl uppercase tracking-tighter text-white">
            Quiénes Somos
          </h2>
        </div>

        {/* Mission / Vision — sliding from opposite sides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.07] mb-px">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#060606] p-8 md:p-10"
          >
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-accent mb-5">
              — Misión
            </div>
            <p className="font-mono text-sm text-white/65 leading-[1.8]">
              Brindar a los pequeños y medianos empresarios de Centroamérica una herramienta
              tecnológica confiable, adaptable y fácil de usar que optimice sus operaciones diarias.
              Buscamos empoderar a estos negocios mediante la automatización de tareas administrativas,
              permitiéndoles enfocar sus recursos en el crecimiento y la atención al cliente.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="bg-[#060606] p-8 md:p-10"
          >
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-signal mb-5">
              — Visión 2030
            </div>
            <p className="font-mono text-sm text-white/65 leading-[1.8]">
              Ser reconocidos como la plataforma de gestión SaaS líder y de mayor confianza para
              pymes en la región centroamericana. Aspiramos a que MoncaDev sea sinónimo de eficiencia
              operativa y transformación digital para miles de negocios — donde la tecnología sea
              un aliado accesible y fundamental para el éxito empresarial local.
            </p>
          </motion.div>
        </div>

        {/* Four pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.07]">
          {[
            { label: "Confiable", desc: "SLA garantizado y datos siempre respaldados" },
            { label: "Adaptable", desc: "Interfaz personalizada por industria" },
            { label: "Accesible", desc: "Desde $29/mes, sin contratos largos" },
            { label: "Local", desc: "Soporte en español, normativa CR incluida" },
          ].map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
              className="bg-[#060606] p-6"
            >
              <div className="font-mono font-bold text-sm uppercase tracking-tight text-white mb-2">{v.label}</div>
              <div className="font-mono text-xs text-white/35 leading-relaxed">{v.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────
          MODULES BENTO
      ────────────────────────────────────── */}
      <section id="modules" ref={modulesRef} className="bg-paper px-8 md:px-14 lg:px-16 py-20">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-tertiary-light">01_</span>
          <h2 className="font-mono font-bold text-2xl md:text-3xl uppercase tracking-tighter text-ink">
            Módulos Core
          </h2>
        </div>
        <p className="font-mono text-sm text-text-secondary-light mb-10">
          Haz clic en cada módulo para ver más detalles.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 28, x: i === 0 ? -16 : i === 1 ? 0 : i === 2 ? 16 : 0 }}
              animate={modulesInView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 }}
              onClick={() => navigate(`/enterprise/modulo/${mod.slug}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/enterprise/modulo/${mod.slug}`)}
              className={`group relative brutalist-card overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                mod.wide ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              <div className="flex items-start justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-tertiary-light">{mod.id}_</span>
                <span className="font-mono text-3xl leading-none" style={{ color: mod.accent }}>{mod.symbol}</span>
              </div>

              <h3 className="font-mono font-bold text-base md:text-lg uppercase tracking-tighter text-ink mb-3">
                {mod.title}
              </h3>
              <p className="font-mono text-sm text-text-secondary-light leading-[1.65] mb-5">{mod.desc}</p>

              <span
                className="font-mono text-xs uppercase tracking-[0.18em] flex items-center gap-1 transition-all"
                style={{ color: mod.accent }}
              >
                Ver detalles
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </span>

              {/* Activation bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-[3px] w-full origin-left"
                style={{ backgroundColor: mod.accent }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────
          HOW IT WORKS
      ────────────────────────────────────── */}
      <section ref={stepsRef} className="bg-[#060606] px-8 md:px-14 lg:px-16 py-20">
        <div className="flex items-baseline gap-3 mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/30">02_</span>
          <h2 className="font-mono font-bold text-2xl md:text-3xl uppercase tracking-tighter text-white">
            Tres Pasos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              animate={stepsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.14 }}
              className="pr-0 md:pr-12 pb-14 md:pb-0"
            >
              <div className="font-mono font-black text-[5.5rem] md:text-[7rem] text-white/[0.06] leading-none mb-3 -ml-1">
                {step.n}
              </div>
              <h3 className="font-mono font-bold text-xl uppercase tracking-tighter text-white mb-3">{step.title}</h3>
              <p className="font-mono text-sm text-white/45 leading-[1.7] max-w-xs">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────
          GUARANTEE STRIP
      ────────────────────────────────────── */}
      <div className="bg-[#0D0D0D] border-t border-white/[0.07] border-b px-8 md:px-14 lg:px-16 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12">
          {[
            "Sin tarjeta de crédito para la prueba",
            "Reembolso proporcional en 30 días",
            "Soporte técnico incluido en todos los planes",
            "Datos respaldados antes de cada actualización",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-signal font-mono text-xs">✓</span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ──────────────────────────────────────
          PRICING
      ────────────────────────────────────── */}
      <section id="pricing" className="bg-paper px-8 md:px-14 lg:px-16 py-20">
        <div className="flex items-baseline gap-3 mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-tertiary-light">03_</span>
          <h2 className="font-mono font-bold text-2xl md:text-3xl uppercase tracking-tighter text-ink">Planes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className={`relative border-2 border-ink p-6 flex flex-col ${
                plan.featured ? "bg-ink text-white shadow-[6px_6px_0px_0px_#007AFF]" : "bg-white shadow-[4px_4px_0px_0px_#1D1D1F]"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-[1px] left-5">
                  <span className="bg-accent font-mono text-[0.65rem] text-white uppercase tracking-[0.18em] px-3 py-[3px] block">Popular</span>
                </div>
              )}
              <div className="mb-7 mt-3">
                <span className={`font-mono text-xs uppercase tracking-[0.2em] ${plan.featured ? "text-white/40" : "text-text-tertiary-light"}`}>
                  {plan.tag}
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-mono font-black text-4xl leading-none">{plan.price}</span>
                  <span className={`font-mono text-sm ${plan.featured ? "text-white/40" : "text-text-tertiary-light"}`}>{plan.period}</span>
                </div>
                <div className={`font-mono font-bold text-xl uppercase tracking-tighter mt-1 ${plan.featured ? "text-white" : "text-ink"}`}>
                  {plan.name}
                </div>
              </div>
              <ul className="flex-1 space-y-[0.6rem] mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-signal font-mono text-xs mt-[3px] shrink-0">✓</span>
                    <span className={`font-mono text-sm leading-snug ${plan.featured ? "text-white/75" : "text-text-secondary-light"}`}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full font-mono text-sm uppercase tracking-tighter border-2 px-4 py-3 transition-all cursor-pointer ${
                  plan.featured
                    ? "bg-accent text-white border-white/20 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:translate-x-[2px] hover:translate-y-[2px]"
                    : "bg-white text-ink border-ink shadow-[4px_4px_0px_0px_#007AFF] hover:shadow-[2px_2px_0px_0px_#007AFF] hover:translate-x-[2px] hover:translate-y-[2px]"
                }`}
              >
                {plan.featured ? "Empezar gratis" : "Seleccionar"}
              </button>
            </motion.div>
          ))}
        </div>

        <p className="font-mono text-xs text-text-tertiary-light text-center mt-8 uppercase tracking-[0.16em]">
          Todos los planes incluyen 14 días gratis · Sin tarjeta de crédito requerida
        </p>
      </section>

      {/* ──────────────────────────────────────
          CONTACT
      ────────────────────────────────────── */}
      <section id="contact" className="bg-[#060606] px-8 md:px-14 lg:px-16 py-20">
        <div className="flex items-baseline gap-3 mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/25">04_</span>
          <h2 className="font-mono font-bold text-2xl md:text-3xl uppercase tracking-tighter text-white">
            Contáctanos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="mailto:hola@moncadev.com"
              className="group border-2 border-white/15 p-7 flex flex-col gap-4 hover:border-accent/40 hover:bg-white/[0.03] transition-all h-full"
            >
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/30">01_ Email</div>
              <div>
                <div className="font-mono font-bold text-base text-white mb-1">hola@moncadev.com</div>
                <div className="font-mono text-sm text-white/40">Respuesta en 24h hábiles</div>
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-accent flex items-center gap-1 mt-auto">
                Enviar email
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </a>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            <a
              href="https://wa.me/50688888888"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-2 border-white/15 p-7 flex flex-col gap-4 hover:border-signal/40 hover:bg-white/[0.03] transition-all h-full"
            >
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/30">02_ WhatsApp</div>
              <div>
                <div className="font-mono font-bold text-base text-white mb-1">+506 8888-8888</div>
                <div className="font-mono text-sm text-white/40">Lun–Vie 8am–6pm (CR)</div>
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-signal flex items-center gap-1 mt-auto">
                Abrir WhatsApp
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </a>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
            className="border-2 border-white/15 p-7 flex flex-col gap-4"
          >
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/30">03_ Ubicación</div>
            <div>
              <div className="font-mono font-bold text-base text-white mb-1">Alajuela, Costa Rica</div>
              <div className="font-mono text-sm text-white/40">Presencia en toda Centroamérica</div>
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-white/25 mt-auto">
              Servicio 100% remoto disponible
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────
          FINAL CTA
      ────────────────────────────────────── */}
      <section className="bg-paper px-8 md:px-14 lg:px-16 py-28 text-center relative overflow-hidden border-t-2 border-ink">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <div className="font-mono text-xs uppercase tracking-[0.28em] text-text-tertiary-light mb-7">
            ¿Listo para digitalizar tu negocio?
          </div>

          <div className="overflow-hidden mb-10">
            {(["EMPIEZA HOY.", "SIN RIESGOS."] as const).map((line, i) => (
              <div key={line} className="overflow-hidden leading-none">
                <motion.h2
                  className="font-mono font-black uppercase tracking-tighter text-ink leading-[0.92]"
                  style={{ fontSize: "clamp(2.4rem, 8vw, 7.5rem)" }}
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.15 }}
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 border-2 border-ink bg-ink text-white font-mono text-sm uppercase tracking-tighter px-8 py-4 shadow-[4px_4px_0px_0px_#007AFF] hover:shadow-[2px_2px_0px_0px_#007AFF] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Prueba gratis 14 días →
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border-2 border-ink bg-white text-ink font-mono text-sm uppercase tracking-tighter px-8 py-4 shadow-[4px_4px_0px_0px_#1D1D1F] hover:shadow-[2px_2px_0px_0px_#1D1D1F] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Hablar con ventas
            </a>
          </div>
        </motion.div>
      </section>

      {/* ──────────────────────────────────────
          FOOTER MICRO
      ────────────────────────────────────── */}
      <footer className="bg-[#060606] border-t border-white/[0.07] px-8 md:px-14 lg:px-16 py-7">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="font-mono font-bold text-xs uppercase tracking-[0.22em] text-white/60">MoncaDev</span>
            <span className="text-white/15 font-mono">·</span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/25">Hecho en Costa Rica</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/20">Tu Núcleo Operativo</span>
            <span className="text-white/15 font-mono">·</span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/20">© 2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
