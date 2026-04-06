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

  return (
    <div className="flex flex-col">

      {/* ──────────────────────────────────────
          HERO
      ────────────────────────────────────── */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative bg-[#060606] min-h-screen flex flex-col justify-center overflow-hidden select-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(700px circle at ${orb.x}% ${orb.y}%, rgba(0,122,255,0.07), transparent 65%)`,
            transition: "background 0.1s ease-out",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(600px circle at 85% 80%, rgba(48,209,88,0.04), transparent 60%)" }}
        />

        <div className="relative z-10 px-8 md:px-14 lg:px-16 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-white/40">
              Beta abierta · SaaS · Centroamérica
            </span>
          </motion.div>

          <div className="mb-8">
            {/* Brand name — largest, clip-path reveal */}
            <div className="overflow-hidden leading-none">
              <motion.h1
                className="font-mono font-black uppercase tracking-tighter text-white leading-[0.9]"
                style={{ fontSize: "clamp(3.8rem, 13vw, 12rem)" }}
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                MoncaDev
              </motion.h1>
            </div>
            {/* Tagline — smaller, follows after */}
            <div className="overflow-hidden leading-none">
              <motion.p
                className="font-mono font-bold uppercase tracking-[0.18em] text-white/30"
                style={{ fontSize: "clamp(0.75rem, 2vw, 1.1rem)" }}
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
              >
                Tu Núcleo Operativo
              </motion.p>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62, ease: "easeOut" }}
            className="font-mono text-sm md:text-base text-white/45 max-w-sm mb-12 leading-[1.7]"
          >
            Software de gestión modular para pequeñas y medianas empresas.
            Inventario, ventas y reportes — en un solo lugar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.82, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-5"
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="mt-20 font-mono text-xs uppercase tracking-[0.22em] text-white/20"
          >
            MoncaDev · Costa Rica · Est. 2026
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060606] to-transparent pointer-events-none" />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          <div className="hidden md:block absolute top-[2.6rem] left-[33.3%] right-[33.3%] h-px bg-white/10">
            <motion.div
              className="h-full bg-accent origin-left"
              initial={{ scaleX: 0 }}
              animate={stepsInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, ease: "easeInOut", delay: 0.4 }}
            />
          </div>

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
