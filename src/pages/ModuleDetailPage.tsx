import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

/* ─────────────────────────────────────────────
   HOOK
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

/* ─────────────────────────────────────────────
   PREVIEW COMPONENTS
───────────────────────────────────────────── */

function PreviewChrome({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-2 border-white/20 overflow-hidden max-w-xl w-full">
      {/* Window chrome */}
      <div className="bg-white/[0.05] border-b border-white/10 px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-danger/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-volt/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-signal/50" />
        </div>
        <span className="font-mono text-[0.65rem] text-white/25 tracking-wider">{title}</span>
      </div>
      <div className="p-5 bg-[#0A0A0A]">{children}</div>
    </div>
  );
}

function InventarioPreview({ inView }: { inView: boolean }) {
  const items = [
    { name: "Tornillos 3/4\"", pct: 82, stock: "82 u", ok: true },
    { name: "Cemento gris", pct: 18, stock: "18 u", ok: false },
    { name: "Pintura blanca", pct: 54, stock: "54 u", ok: true },
    { name: "Arena fina", pct: 91, stock: "91 u", ok: true },
    { name: "Madera pino", pct: 7, stock: "7 u", ok: false },
  ];
  return (
    <PreviewChrome title="app.moncadev.com / inventario">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">Inventario</span>
        <span className="font-mono text-[0.6rem] text-white/30 uppercase tracking-widest">248 productos</span>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: "easeOut" }}
          >
            <span className="font-mono text-[0.65rem] text-white/50 w-28 truncate shrink-0">{item.name}</span>
            <div className="flex-1 h-1.5 bg-white/10 overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 h-full"
                style={{
                  backgroundColor: item.ok ? "#007AFF" : "#FF375F",
                  width: `${item.pct}%`,
                  transformOrigin: "left center",
                }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: "easeOut" }}
              />
            </div>
            <span className={`font-mono text-[0.6rem] w-12 text-right ${item.ok ? "text-white/40" : "text-danger"}`}>
              {item.stock}
            </span>
            {!item.ok && <span className="text-[0.6rem] text-danger">⚠</span>}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-white/[0.07] flex justify-between items-center">
        <span className="font-mono text-[0.6rem] text-danger uppercase tracking-widest">2 productos bajos</span>
        <span className="font-mono text-[0.6rem] text-accent uppercase tracking-widest cursor-pointer">+ Agregar →</span>
      </div>
    </PreviewChrome>
  );
}

function VentasPreview({ inView }: { inView: boolean }) {
  const items = [
    { name: "Café con leche", qty: 2, price: "$4.00" },
    { name: "Pan dulce surtido", qty: 3, price: "$3.00" },
    { name: "Jugo natural", qty: 1, price: "$2.50" },
  ];
  return (
    <PreviewChrome title="app.moncadev.com / punto-de-venta">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">Nueva Venta</span>
        <span className="font-mono text-[0.6rem] text-signal uppercase tracking-widest">● En curso</span>
      </div>
      <div className="space-y-2 mb-4">
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            className="flex items-center justify-between py-1.5 border-b border-white/[0.06]"
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.38, delay: 0.3 + i * 0.09, ease: "easeOut" }}
          >
            <span className="font-mono text-[0.65rem] text-white/60">{item.name}</span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.6rem] text-white/30">×{item.qty}</span>
              <span className="font-mono text-[0.65rem] text-white">{item.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.65 }}
        className="flex justify-between items-center mb-4"
      >
        <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Total</span>
        <span className="font-mono font-black text-lg text-signal">$9.50</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.75 }}
        className="grid grid-cols-3 gap-2"
      >
        {["Efectivo", "SINPE", "Tarjeta"].map((method) => (
          <div key={method} className="border border-white/15 py-1.5 text-center font-mono text-[0.6rem] uppercase tracking-wider text-white/50 cursor-pointer hover:border-signal/40 hover:text-signal transition-all">
            {method}
          </div>
        ))}
      </motion.div>
    </PreviewChrome>
  );
}

function ClientesPreview({ inView }: { inView: boolean }) {
  const customers = [
    { initial: "JM", name: "Juan Mora", visits: 24, tag: "Frecuente", tagColor: "#30D158" },
    { initial: "AL", name: "Ana López", visits: 3, tag: "Nuevo", tagColor: "#007AFF" },
    { initial: "CR", name: "Carlos Ramos", visits: 1, tag: "En riesgo", tagColor: "#FF375F" },
    { initial: "MS", name: "María Solís", visits: 18, tag: "Frecuente", tagColor: "#30D158" },
  ];
  return (
    <PreviewChrome title="app.moncadev.com / clientes">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">Clientes</span>
        <span className="font-mono text-[0.6rem] text-white/30 uppercase tracking-widest">142 registrados</span>
      </div>
      <div className="space-y-2.5">
        {customers.map((c, i) => (
          <motion.div
            key={c.name}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.09, ease: "easeOut" }}
          >
            <div className="w-7 h-7 border border-white/20 flex items-center justify-center font-mono text-[0.6rem] font-bold text-white/60 shrink-0">
              {c.initial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[0.65rem] text-white truncate">{c.name}</div>
              <div className="font-mono text-[0.55rem] text-white/30">{c.visits} visitas</div>
            </div>
            <span className="font-mono text-[0.55rem] uppercase tracking-wider px-1.5 py-0.5 shrink-0" style={{ color: c.tagColor, border: `1px solid ${c.tagColor}40` }}>
              {c.tag}
            </span>
          </motion.div>
        ))}
      </div>
    </PreviewChrome>
  );
}

function ReportesPreview({ inView }: { inView: boolean }) {
  const bars = [42, 68, 55, 90, 73, 61, 85];
  const days = ["L", "M", "X", "J", "V", "S", "D"];
  return (
    <PreviewChrome title="app.moncadev.com / reportes">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">Reportes</span>
        <span className="font-mono text-[0.6rem] text-white/30 uppercase tracking-widest">Esta semana</span>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4"
      >
        <div className="font-mono font-black text-3xl text-signal leading-none">$847.50</div>
        <div className="font-mono text-[0.6rem] text-white/30 uppercase tracking-widest mt-1">Ventas hoy</div>
      </motion.div>

      {/* Bar chart */}
      <div className="flex items-end gap-1.5 h-14 mb-1">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full relative" style={{ height: "48px" }}>
              <motion.div
                className="absolute bottom-0 w-full"
                style={{ backgroundColor: i === 4 ? "#30D158" : "#007AFF", opacity: i === 4 ? 1 : 0.4 }}
                initial={{ height: 0 }}
                animate={inView ? { height: `${h}%` } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.06, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {days.map((d) => (
          <div key={d} className="flex-1 text-center font-mono text-[0.5rem] text-white/20">{d}</div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.07]">
        <div className="font-mono text-[0.6rem] text-white/30 uppercase tracking-widest mb-1">Producto estrella</div>
        <div className="font-mono text-[0.65rem] text-white">Café con leche — <span className="text-signal">43 ventas</span></div>
      </div>
    </PreviewChrome>
  );
}

/* ─────────────────────────────────────────────
   MODULE DATA
───────────────────────────────────────────── */

type ModuleData = {
  id: string;
  number: string;
  title: string;
  symbol: string;
  accent: string;
  tagline: string;
  description: string;
  features: { title: string; desc: string }[];
  industries: string[];
  Preview: React.ComponentType<{ inView: boolean }>;
};

const MODULES: Record<string, ModuleData> = {
  inventario: {
    id: "inventario",
    number: "01",
    title: "Gestión de Inventario",
    symbol: "▦",
    accent: "#007AFF",
    tagline: "Sabe exactamente cuánto tienes, dónde está y cuándo pedir más.",
    description:
      "El módulo de inventario es el corazón de MoncaDev. Un sistema centralizado que se adapta a la terminología de tu industria — desde una ferretería con miles de SKUs hasta una barbería con productos de cuidado personal.",
    features: [
      {
        title: "Registro de productos con SKU",
        desc: "Agrega productos con código, descripción, precio de costo y venta, y fotografía. Importación masiva desde Excel disponible.",
      },
      {
        title: "Control de niveles de stock en tiempo real",
        desc: "Cada venta o ajuste de inventario actualiza el stock al instante. Sin conciliaciones manuales al final del día.",
      },
      {
        title: "Alertas automáticas de reabastecimiento",
        desc: "Define un stock mínimo por producto y recibe notificaciones push o email cuando se alcanza el umbral.",
      },
      {
        title: "Categorías adaptadas por industria",
        desc: "El sistema sugiere categorías según tu tipo de negocio. Una ferretería ve 'Tornillería, Herramientas, Pinturas'. Un restaurante ve 'Carnes, Lácteos, Bebidas'.",
      },
      {
        title: "Historial de movimientos",
        desc: "Auditoría completa de cada entrada, salida o ajuste. Quién lo hizo, cuándo y por qué.",
      },
    ],
    industries: ["Ferreterías", "Supermercados", "Tiendas de barrio", "Farmacias", "Panaderías", "Distribuidoras"],
    Preview: InventarioPreview,
  },
  ventas: {
    id: "ventas",
    number: "02",
    title: "Ventas y POS",
    symbol: "◈",
    accent: "#30D158",
    tagline: "De la orden a la factura electrónica en segundos.",
    description:
      "Un punto de venta diseñado para la velocidad. Toca, cobra, factura. Compatible con impresoras fiscales y lectores de código de barras. La facturación electrónica va integrada, sin trámites adicionales.",
    features: [
      {
        title: "Punto de venta táctil",
        desc: "Interfaz optimizada para tablets y pantallas touch. Busca productos por nombre, código o categoría. Sin mouse requerido.",
      },
      {
        title: "Facturación electrónica automática",
        desc: "Genera facturas digitales según la normativa tributaria de Costa Rica (Ministerio de Hacienda) sin pasos adicionales.",
      },
      {
        title: "Múltiples métodos de pago",
        desc: "Acepta efectivo, tarjeta de crédito/débito, SINPE Móvil y crédito interno. Sin hardware adicional para SINPE.",
      },
      {
        title: "Historial completo de transacciones",
        desc: "Cada venta queda registrada con cliente, productos, método de pago y vendedor. Filtros por fecha, turno o cajero.",
      },
      {
        title: "Gestión de descuentos y promociones",
        desc: "Aplica descuentos por monto, porcentaje o categoría. Configura promociones por fecha o por volumen de compra.",
      },
    ],
    industries: ["Restaurantes", "Cafeterías", "Barberías", "Salones de belleza", "Tiendas de ropa", "Farmacias"],
    Preview: VentasPreview,
  },
  clientes: {
    id: "clientes",
    number: "03",
    title: "Clientes y CRM",
    symbol: "◎",
    accent: "#FFD60A",
    tagline: "Conoce a tus clientes mejor que ellos mismos.",
    description:
      "Convierte cada visita en datos accionables. El módulo CRM de MoncaDev está diseñado para negocios locales: sin complejidad empresarial, con el poder suficiente para crecer.",
    features: [
      {
        title: "Perfil completo del cliente",
        desc: "Nombre, teléfono, email, dirección y notas internas. Accede al historial completo desde el POS en el momento de la venta.",
      },
      {
        title: "Historial de compras detallado",
        desc: "Consulta qué compró, cuándo, cuánto gastó y con qué frecuencia. Identifica patrones de consumo por cliente.",
      },
      {
        title: "Segmentación inteligente",
        desc: "El sistema clasifica automáticamente en: Frecuentes (más de 5 visitas/mes), Nuevos (primera semana), y En riesgo (sin visita en 30 días).",
      },
      {
        title: "Programa de fidelización",
        desc: "Configura puntos por compra o descuentos automáticos para clientes recurrentes. El sistema los aplica sin intervención manual.",
      },
      {
        title: "Exportación para campañas",
        desc: "Exporta listas segmentadas para campañas de WhatsApp Business o email. Sin integración compleja.",
      },
    ],
    industries: ["Barberías", "Salones de belleza", "Restaurantes", "Cafeterías", "Ferreterías", "Pulperías"],
    Preview: ClientesPreview,
  },
  reportes: {
    id: "reportes",
    number: "04",
    title: "Reportes y Análisis",
    symbol: "◳",
    accent: "#FF375F",
    tagline: "Toma decisiones con datos, no con corazonadas.",
    description:
      "Un dashboard en tiempo real que le muestra a cualquier dueño de negocio — independiente de su nivel técnico — exactamente cómo está su operación. Sin hojas de cálculo, sin esperar al contador.",
    features: [
      {
        title: "Dashboard en tiempo real",
        desc: "Ventas del día, tickets abiertos, stock crítico y flujo de caja — todo visible desde el celular en cualquier momento.",
      },
      {
        title: "Reporte de ventas por período",
        desc: "Compara rendimiento por día, semana, mes o año. Identifica los mejores y peores días con gráficas interactivas.",
      },
      {
        title: "Análisis de productos estrella",
        desc: "Cuáles son tus 10 productos más vendidos, cuál genera más margen, y cuáles están acumulando polvo.",
      },
      {
        title: "Flujo de caja básico",
        desc: "Registra ingresos y egresos. Mantén control de tu liquidez sin necesidad de un contador full-time.",
      },
      {
        title: "Reporte mensual automático",
        desc: "El primer día de cada mes recibes un PDF con el resumen de tu negocio: ventas, gastos, clientes nuevos y productos top.",
      },
    ],
    industries: ["Todos los negocios", "Ferreterías", "Restaurantes", "Supermercados", "Cafeterías", "Tiendas"],
    Preview: ReportesPreview,
  },
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export function ModuleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mod = id ? MODULES[id] : null;

  // Always start at the top when navigating to a module
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresInView = useScrollInView(featuresRef);

  const previewRef = useRef<HTMLDivElement>(null);
  const previewInView = useScrollInView(previewRef, "-40px");

  const industriesRef = useRef<HTMLDivElement>(null);
  const industriesInView = useScrollInView(industriesRef);

  if (!mod) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center">
        <div className="text-center">
          <div className="font-mono font-black text-6xl text-white/10 mb-4">404</div>
          <div className="font-mono text-sm text-white/40 uppercase tracking-widest mb-8">Módulo no encontrado</div>
          <button
            onClick={() => navigate("/entreprise")}
            className="font-mono text-xs uppercase tracking-[0.22em] text-accent hover:text-white transition-colors"
          >
            ← Volver a MoncaDev
          </button>
        </div>
      </div>
    );
  }

  const { Preview } = mod;

  return (
    <div className="flex flex-col">

      {/* ──────────────────────────────────────
          HERO
      ────────────────────────────────────── */}
      <section
        className="relative bg-[#060606] min-h-[60vh] flex flex-col justify-end overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      >
        {/* Ambient glow using module accent */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(700px circle at 15% 85%, ${mod.accent}1A, transparent 65%)`,
          }}
        />

        {/* Ghosted symbol — decorative background */}
        <div
          className="pointer-events-none absolute right-8 md:right-16 top-1/2 -translate-y-1/2 font-mono font-black select-none leading-none"
          style={{
            fontSize: "clamp(8rem, 25vw, 22rem)",
            color: `${mod.accent}22`,
          }}
        >
          {mod.symbol}
        </div>

        <div className="relative z-10 px-8 md:px-14 lg:px-16 pt-12 pb-16">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate("/entreprise")}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-white/35 hover:text-white transition-colors mb-12 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
            Volver a MoncaDev
          </motion.button>

          {/* Module number */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-xs uppercase tracking-[0.28em] mb-4"
            style={{ color: `${mod.accent}80` }}
          >
            Módulo {mod.number}_ &nbsp;·&nbsp; MoncaDev
          </motion.div>

          {/* Title — scale+fade (different from clip-path on main page) */}
          <motion.h1
            className="font-mono font-black uppercase tracking-tighter text-white leading-[0.9] mb-6"
            style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            {mod.title}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32, ease: "easeOut" }}
            className="font-mono text-base text-white/50 max-w-lg leading-[1.7]"
          >
            {mod.tagline}
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#060606] to-transparent pointer-events-none" />
      </section>

      {/* ──────────────────────────────────────
          DESCRIPTION + FEATURES
      ────────────────────────────────────── */}
      <section ref={featuresRef} className="bg-paper px-8 md:px-14 lg:px-16 py-16">
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-mono text-sm md:text-base text-text-secondary-light leading-[1.8] max-w-2xl mb-14 border-l-2 pl-6"
          style={{ borderColor: mod.accent }}
        >
          {mod.description}
        </motion.p>

        {/* Features label */}
        <div className="flex items-baseline gap-3 mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-tertiary-light">CARACTERÍSTICAS_</span>
        </div>

        {/* Feature list — horizontal slide-in, staggered */}
        <div className="space-y-0 divide-y-2 divide-ink">
          {mod.features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, x: -28 }}
              animate={featuresInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.08 }}
              className="py-5 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-3 md:gap-8 group"
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-text-tertiary-light mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-mono font-bold text-sm uppercase tracking-tight text-ink">
                  {feat.title}
                </h3>
              </div>
              <p className="font-mono text-sm text-text-secondary-light leading-[1.7] pl-6 md:pl-0">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────
          PREVIEW
      ────────────────────────────────────── */}
      <section ref={previewRef} className="bg-[#060606] px-8 md:px-14 lg:px-16 py-16">
        <div className="flex items-baseline gap-3 mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/25">VISTA PREVIA_</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Preview component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={previewInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-24"
          >
            <Preview inView={previewInView} />
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-white/20 mt-3 text-center">
              Interfaz real del módulo — datos ilustrativos
            </p>
          </motion.div>

          {/* Side notes */}
          <div className="flex-1 space-y-6">
            {[
              { label: "Acceso", value: "Web y móvil (iOS & Android)" },
              { label: "Actualización", value: "En tiempo real — sin recargar" },
              { label: "Respaldo", value: "Automático cada 24 horas" },
              { label: "Soporte", value: "Chat, email y teléfono" },
              { label: "Datos", value: "Almacenados en Costa Rica (AWS SA)" },
            ].map((note, i) => (
              <motion.div
                key={note.label}
                initial={{ opacity: 0, x: 20 }}
                animate={previewInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease: "easeOut" }}
                className="flex items-start gap-4 pb-5 border-b border-white/[0.07]"
              >
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/25 w-24 shrink-0 pt-0.5">
                  {note.label}
                </span>
                <span className="font-mono text-sm text-white/65">{note.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────
          DESIGNED FOR — INDUSTRIES
      ────────────────────────────────────── */}
      <section ref={industriesRef} className="bg-paper px-8 md:px-14 lg:px-16 py-16">
        <div className="flex items-baseline gap-3 mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-tertiary-light">DISEÑADO PARA_</span>
        </div>

        <div className="flex flex-wrap gap-3">
          {mod.industries.map((industry, i) => (
            <motion.div
              key={industry}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={industriesInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 28,
                delay: i * 0.06,
              }}
              className="border-2 border-ink px-4 py-2 font-mono text-sm uppercase tracking-tight"
              style={{ boxShadow: `3px 3px 0px 0px ${mod.accent}` }}
            >
              {industry}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────
          CTA STRIP
      ────────────────────────────────────── */}
      <section className="bg-[#060606] border-t border-white/[0.07] px-8 md:px-14 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-white/30 mb-2">
              Incluido en todos los planes
            </div>
            <div className="font-mono font-bold text-lg uppercase tracking-tighter text-white">
              {mod.title}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/entreprise#pricing")}
              className="inline-flex items-center gap-2 border-2 border-white/20 font-mono text-sm uppercase tracking-tighter px-6 py-3 transition-all text-white hover:border-white/40"
              style={{
                backgroundColor: mod.accent,
                boxShadow: `4px 4px 0px 0px rgba(255,255,255,0.1)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0px 0px rgba(255,255,255,0.1)`;
                (e.currentTarget as HTMLElement).style.transform = "translate(2px, 2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px 0px rgba(255,255,255,0.1)`;
                (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              Ver planes →
            </button>
            <button
              onClick={() => navigate("/entreprise")}
              className="font-mono text-sm uppercase tracking-tighter text-white/40 hover:text-white transition-colors flex items-center gap-2 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
              Ver todos los módulos
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
