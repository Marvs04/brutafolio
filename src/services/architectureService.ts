import { Constraints, ArchitectureDecision, Scale, Budget, TeamSize } from "../types";

export const architectureService = {
  getDecisions(constraints: Constraints): ArchitectureDecision[] {
    const decisions: ArchitectureDecision[] = [];
    const isLeanTeam = constraints.teamSize === TeamSize.SOLO || constraints.budget === Budget.BOOTSTRAPPED;

    // ── Database ──────────────────────────────────────────────────────────────
    if (isLeanTeam) {
      decisions.push({
        category: "Database",
        category_es: "Base de Datos",
        choice: "Supabase (PostgreSQL)",
        rationale: "My most-used database layer — real production use in SENDA and STAMP. I can write SQL, design schemas, configure RLS policies, and wire up auth flows without needing a DBA. Supabase bundles database, auth, and storage in one platform, which is the right call when moving fast without a dedicated backend team.",
        rationale_es: "Mi capa de base de datos más usada — uso real en producción en SENDA y STAMP. Puedo escribir SQL, diseñar esquemas, configurar políticas RLS y conectar flujos de auth sin necesitar un DBA. Supabase agrupa base de datos, auth y storage en una plataforma: la opción correcta cuando se avanza rápido sin equipo de backend dedicado.",
        tradeOffs: ["Vendor lock-in is real — migrating away later is painful, plan schema portability early", "RLS bugs are silent — wrong policies block writes with zero feedback, needs explicit integration tests", "Free tier connection pool limits hit faster than expected in multi-role apps"],
        tradeOffs_es: ["El vendor lock-in es real — migrar después es costoso, planifica la portabilidad del esquema desde el inicio", "Los bugs de RLS son silenciosos — políticas incorrectas bloquean escrituras sin feedback, necesita pruebas de integración explícitas", "Los límites del pool de conexiones del plan gratuito llegan más rápido de lo esperado en apps multi-rol"],
        riskLevel: "low",
      });
    } else if (constraints.scale === Scale.GLOBAL) {
      decisions.push({
        category: "Database",
        category_es: "Base de Datos",
        choice: "Managed PostgreSQL — AWS RDS or Azure Database",
        rationale: "At global scale, the database choice follows the team's existing cloud footprint. AWS RDS and Azure Database for PostgreSQL are both solid managed options — I wouldn't make that infrastructure call alone. I'd handle schema design, query optimization, and migration strategy. Region replication and failover configuration would need a senior engineer or cloud architect's sign-off.",
        rationale_es: "A escala global, la elección de base de datos sigue el ecosistema cloud del equipo. AWS RDS y Azure Database for PostgreSQL son opciones gestionadas sólidas — no tomaría esa decisión de infraestructura solo. Aportaría diseño del esquema, optimización de consultas y estrategia de migraciones. La replicación regional y failover necesitarían aprobación de un ingeniero senior o arquitecto cloud.",
        tradeOffs: ["Cloud provider decision should be made at org level, not per-project", "Read replica setup and connection pooling at this scale requires more operational depth than I currently have", "Schema migrations at global scale need zero-downtime strategies — that's a senior-level concern"],
        tradeOffs_es: ["La elección del proveedor cloud debe hacerse a nivel organizacional, no por proyecto", "La configuración de read replicas y connection pooling a esta escala requiere más profundidad operativa de la que tengo actualmente", "Las migraciones de esquema a escala global necesitan estrategias sin downtime — eso es una preocupación de nivel senior"],
        riskLevel: "medium",
      });
    } else {
      decisions.push({
        category: "Database",
        category_es: "Base de Datos",
        choice: "Supabase or Managed PostgreSQL (Azure / AWS)",
        rationale: "If the team already has a cloud footprint (Azure Database for PostgreSQL, AWS RDS), I'd follow that decision — SQL fundamentals and schema design carry over regardless of provider. Starting fresh with no strong preference? I'd push for Supabase. I can configure it end-to-end without DevOps support, and the team gets auth and storage bundled in.",
        rationale_es: "Si el equipo ya tiene presencia en cloud (Azure Database for PostgreSQL, AWS RDS), seguiría esa decisión — los fundamentos de SQL y diseño de esquemas se transfieren sin importar el proveedor. ¿Empezando desde cero sin preferencia fuerte? Apostaría por Supabase. Puedo configurarlo de extremo a extremo sin soporte DevOps, y el equipo obtiene auth y storage incluidos.",
        tradeOffs: ["Supabase is the easier path but adds vendor dependency — weigh that against infra management cost", "Azure/AWS requires someone comfortable with cloud consoles and billing management", "Mixing providers across services (e.g., AWS compute + Azure DB) creates unnecessary cross-cloud latency"],
        tradeOffs_es: ["Supabase es el camino más sencillo pero añade dependencia del proveedor — evalúalo frente al costo de gestión de infraestructura", "Azure/AWS requiere a alguien cómodo con consolas cloud y gestión de facturación", "Mezclar proveedores entre servicios (ej. cómputo AWS + DB Azure) crea latencia innecesaria entre nubes"],
        riskLevel: "low",
      });
    }

    // ── Frontend ──────────────────────────────────────────────────────────────
    if (!constraints.realtime && constraints.scale === Scale.MVP) {
      decisions.push({
        category: "Frontend",
        category_es: "Frontend",
        choice: "Astro + Tailwind",
        rationale: "Zero-JS by default — the right call for content-first sites. Used in production for POASSTEREO and ACNR. Astro's island architecture taught me to think about hydration cost before reaching for client-side interactivity, and Tailwind keeps styles consistent without design system overhead. This isn't a fallback — it's genuinely the better tool for static or content-heavy sites over React.",
        rationale_es: "Cero JS por defecto — la opción correcta para sitios orientados al contenido. Usado en producción para POASSTEREO y ACNR. La arquitectura de islas de Astro me enseñó a pensar en el costo de hidratación antes de agregar interactividad del cliente, y Tailwind mantiene los estilos consistentes sin overhead de sistema de diseño. No es una opción de segunda — es genuinamente la mejor herramienta para sitios estáticos sobre React.",
        tradeOffs: ["Not the right tool for complex interactive UIs — React or Next.js handles that better", "Hybrid SSR/static routing (output: 'hybrid') requires trial and error to get right the first time", "Component ecosystem is smaller than React — less community tooling available"],
        tradeOffs_es: ["No es la herramienta correcta para UIs interactivas complejas — React o Next.js lo maneja mejor", "El enrutamiento híbrido SSR/estático (output: 'hybrid') requiere ensayo y error para configurarlo bien la primera vez", "El ecosistema de componentes es más pequeño que React — menos herramientas de comunidad disponibles"],
        riskLevel: "low",
      });
    } else if (constraints.deadline < 3) {
      decisions.push({
        category: "Frontend",
        category_es: "Frontend",
        choice: "Next.js + Tailwind + Shadcn/ui",
        rationale: "Short deadline + SEO requirements = Next.js. Built-in routing, SSR/SSG, and API routes mean I don't have to wire those up from scratch. Shadcn/ui gives accessible, Tailwind-compatible components ready from day one. If SEO isn't a concern and it's a pure SPA, React + Vite is faster to scaffold — but most real products care about SEO eventually.",
        rationale_es: "Plazo corto + requisitos de SEO = Next.js. El enrutamiento integrado, SSR/SSG y API routes significan que no tengo que montarlos desde cero. Shadcn/ui provee componentes accesibles y compatibles con Tailwind listos desde el inicio. Si el SEO no es una preocupación y es una SPA pura, React + Vite es más rápido de montar — pero la mayoría de productos reales se preocupan por el SEO eventualmente.",
        tradeOffs: ["Next.js App Router (React Server Components) has a real learning curve — mental model shift from SPAs", "Vercel is the natural host, but Next.js on other platforms needs more config work", "Shadcn/ui deep restyling fights defaults — budget time upfront for component customization"],
        tradeOffs_es: ["El App Router de Next.js (React Server Components) tiene una curva de aprendizaje real — cambio de modelo mental desde las SPAs", "Vercel es el host natural, pero Next.js en otras plataformas necesita más configuración", "El restyling profundo de Shadcn/ui choca con los defaults — presupuesta tiempo para la personalización de componentes"],
        riskLevel: "low",
      });
    } else {
      decisions.push({
        category: "Frontend",
        category_es: "Frontend",
        choice: "React + Vite or Next.js — depends on SSR needs",
        rationale: "React is my primary stack — SENDA, STAMP, and this portfolio are all built with it. For SPAs where SEO isn't critical, React + Vite gives full architectural control with no extra abstractions. If the project needs real SSR, server-side data fetching, or SEO-weighted routes, Next.js is the move — same React fundamentals with routing, server components, and API routes built in. The choice comes from the project's requirements, not habit.",
        rationale_es: "React es mi stack principal — SENDA, STAMP y este portafolio están construidos con él. Para SPAs donde el SEO no es crítico, React + Vite da control arquitectónico total sin abstracciones extra. Si el proyecto necesita SSR real, obtención de datos del lado del servidor o rutas con peso SEO, Next.js es la opción — mismos fundamentos de React con enrutamiento, componentes server y API routes integrados. La elección viene de los requisitos del proyecto, no del hábito.",
        tradeOffs: ["React SPA: no SSR by default — SEO-sensitive routes need a meta-framework or workaround", "Next.js App Router: React Server Components change how you think about data fetching — real ramp-up needed", "Both: TypeScript strict mode is non-negotiable — it catches issues before they reach production"],
        tradeOffs_es: ["React SPA: sin SSR por defecto — las rutas sensibles al SEO necesitan un meta-framework o alternativa", "Next.js App Router: los React Server Components cambian cómo se piensa en la obtención de datos — curva real de aprendizaje", "Ambos: TypeScript strict mode es no negociable — atrapa problemas antes de que lleguen a producción"],
        riskLevel: "low",
      });
    }

    // ── Backend / API ─────────────────────────────────────────────────────────
    if (constraints.teamSize === TeamSize.SOLO && constraints.budget === Budget.BOOTSTRAPPED) {
      decisions.push({
        category: "Backend / API",
        category_es: "Backend / API",
        choice: "Supabase — no separate backend",
        rationale: "Solo + lean budget means Supabase handles the backend entirely: database, auth, storage, and edge functions if needed. Avoids running and paying for a separate server. My practice pattern: all business logic lives in pure TypeScript functions with no framework dependencies — testable with Vitest and portable to any backend later without touching components.",
        rationale_es: "Solo + presupuesto ajustado significa que Supabase maneja todo el backend: base de datos, auth, storage y edge functions si es necesario. Evita ejecutar y pagar por un servidor separado. Mi patrón de trabajo: toda la lógica de negocio vive en funciones TypeScript puras sin dependencias del framework, así que es testeable con Vitest y portable a cualquier backend después sin tocar componentes.",
        tradeOffs: ["Edge Functions use the Deno runtime — npm packages need compatibility checks, not everything works", "All backend availability depends on Supabase uptime — no graceful degradation plan", "Good only up to a point: complex multi-service logic wants a real Express server"],
        tradeOffs_es: ["Las Edge Functions usan el runtime Deno — los paquetes npm necesitan verificación de compatibilidad, no todo funciona", "Toda la disponibilidad del backend depende del uptime de Supabase — sin plan de degradación elegante", "Funciona solo hasta cierto punto: la lógica multi-servicio compleja prefiere un servidor Express real"],
        riskLevel: "low",
      });
    } else {
      decisions.push({
        category: "Backend / API",
        category_es: "Backend / API",
        choice: "Express (Node.js) + Docker or Next.js API Routes",
        rationale: "Express is the backend I've actually shipped — STAMP used it to connect two separate frontends to a shared Supabase instance. For Next.js projects, API routes handle simple endpoints without a separate server. For heavier business logic or a standalone service, Express + Docker is my pattern. I'm not a backend specialist, but I can build functional, clean APIs and hand them off for senior review.",
        rationale_es: "Express es el backend con el que realmente he entregado — STAMP lo usó para conectar dos frontends separados a una instancia compartida de Supabase. Para proyectos Next.js, las API routes manejan endpoints simples sin servidor separado. Para lógica de negocio más pesada o un servicio standalone, Express + Docker es mi patrón. No soy especialista en backend, pero puedo construir APIs funcionales y limpias para revisión senior.",
        tradeOffs: ["No built-in conventions in Express — structure, error handling, and validation are entirely your own responsibility", "Next.js API routes are tightly coupled to the deployment — not great for APIs shared across multiple clients", "Multi-service Docker orchestration beyond Compose is outside what I've done solo — Kubernetes is a different world"],
        tradeOffs_es: ["Sin convenciones integradas en Express — la estructura, el manejo de errores y la validación son responsabilidad propia", "Las API routes de Next.js están muy acopladas al despliegue — no ideal para APIs compartidas entre múltiples clientes", "La orquestación Docker multi-servicio más allá de Compose está fuera de lo que he hecho en solitario — Kubernetes es otro mundo"],
        riskLevel: "low",
      });
    }

    // ── Real-time ─────────────────────────────────────────────────────────────
    if (constraints.realtime) {
      decisions.push({
        category: "Real-time",
        category_es: "Tiempo Real",
        choice: "Supabase Realtime",
        rationale: "Postgres-backed WebSocket subscriptions — used in SENDA to sync billing state across multiple user roles without a separate message broker. Straightforward within the Supabase ecosystem, but the subscription model needs careful design when multiple clients write to the same rows simultaneously.",
        rationale_es: "Suscripciones WebSocket respaldadas por Postgres — usadas en SENDA para sincronizar el estado de facturación entre múltiples roles sin un broker de mensajes separado. Sencillo dentro del ecosistema Supabase, pero el modelo de suscripciones necesita diseño cuidadoso cuando múltiples clientes escriben en las mismas filas.",
        tradeOffs: ["Tied entirely to the Supabase ecosystem — not portable", "Not designed for high-frequency updates (game state, live cursors) — wrong tool for that", "Debugging missed subscription events in the lifecycle is non-trivial"],
        tradeOffs_es: ["Completamente atado al ecosistema Supabase — no es portable", "No diseñado para actualizaciones de alta frecuencia (estado de juego, cursores en vivo) — herramienta incorrecta para eso", "Debuggear eventos de suscripción perdidos en el ciclo de vida no es trivial"],
        riskLevel: "medium",
      });
    }

    // ── Authentication ────────────────────────────────────────────────────────
    if (!(constraints.budget === Budget.ENTERPRISE && constraints.teamSize === TeamSize.LARGE)) {
      decisions.push({
        category: "Authentication",
        category_es: "Autenticación",
        choice: "Supabase Auth",
        rationale: "JWT-based auth with row-level security baked in. Used in both SENDA (5 roles) and STAMP (4 roles) — comfortable with session handling, role-based route protection, and RLS policy design. I understand how JWTs work, why RLS needs thorough testing, and where auth flows break on edge cases.",
        rationale_es: "Autenticación basada en JWT con seguridad a nivel de fila integrada. Usada en SENDA (5 roles) y STAMP (4 roles) — cómodo con manejo de sesiones, protección de rutas por rol y diseño de políticas RLS. Entiendo cómo funcionan los JWT, por qué RLS necesita pruebas exhaustivas y dónde los flujos de auth fallan en casos borde.",
        tradeOffs: ["A wrong RLS policy silently allows or blocks data — needs explicit integration tests", "All auth flows depend on Supabase uptime — no graceful degradation if the service goes down", "Custom OAuth providers (Google, GitHub) require extra config that takes longer than expected first time"],
        tradeOffs_es: ["Una política RLS incorrecta permite o bloquea datos silenciosamente — necesita pruebas de integración explícitas", "Todos los flujos de auth dependen del uptime de Supabase — sin degradación elegante si el servicio cae", "Los proveedores OAuth personalizados (Google, GitHub) requieren configuración extra que toma más tiempo del esperado por primera vez"],
        riskLevel: "low",
      });
    } else {
      decisions.push({
        category: "Authentication",
        category_es: "Autenticación",
        choice: "Third-party IdP (Auth0 / Azure Entra ID)",
        rationale: "Enterprise environments usually have an existing identity provider — Azure Entra ID if the org is Microsoft-stack, Auth0 if they're provider-agnostic. I wouldn't make this choice alone; I'd integrate with whatever the team already has. Auth0 in particular has clear documentation and a generous free tier that makes local dev and testing practical.",
        rationale_es: "Los entornos empresariales generalmente ya tienen un proveedor de identidad — Azure Entra ID si la organización es stack Microsoft, Auth0 si son agnósticos al proveedor. No tomaría esta decisión solo; me integraría con lo que el equipo ya tiene. Auth0 en particular tiene documentación clara y un plan gratuito generoso que hace el desarrollo local y las pruebas prácticas.",
        tradeOffs: ["Enterprise IdP config is complex — significant ramp-up time, not a solo dev weekend task", "Auth0 free tier has user limits that can surprise you in fast-growing apps", "Changing IdP mid-project is extremely disruptive — this decision needs to be made early and deliberately"],
        tradeOffs_es: ["La configuración de IdP empresarial es compleja — tiempo de adaptación significativo, no es tarea de fin de semana para un dev solo", "El plan gratuito de Auth0 tiene límites de usuarios que pueden sorprender en apps de crecimiento rápido", "Cambiar de IdP a mitad de proyecto es extremadamente disruptivo — esta decisión necesita tomarse temprano y deliberadamente"],
        riskLevel: "medium",
      });
    }

    // ── Testing & Quality ─────────────────────────────────────────────────────
    if (constraints.scale !== Scale.MVP) {
      decisions.push({
        category: "Testing & Quality",
        category_es: "Testing y Calidad",
        choice: "Vitest + ESLint + Husky + GitHub Actions",
        rationale: "The quality setup I've actually shipped with. SENDA has 32 Vitest unit tests covering all billing and payroll logic — zero DOM mocking because business logic lives in pure TypeScript functions isolated from React. ESLint 0-warning policy enforced by Husky pre-commit hooks: bad code never reaches the repo. GitHub Actions validates on every push and PR. The next step I haven't done in production yet: E2E tests with Playwright.",
        rationale_es: "El setup de calidad con el que realmente he entregado. SENDA tiene 32 pruebas unitarias en Vitest cubriendo toda la lógica de facturación y planilla — cero mocking del DOM porque la lógica de negocio vive en funciones TypeScript puras aisladas de React. Política ESLint 0 warnings aplicada por Husky pre-commit: el código malo nunca llega al repo. GitHub Actions valida en cada push y PR. El siguiente paso que no he hecho en producción aún: pruebas E2E con Playwright.",
        tradeOffs: ["Unit tests are only valuable when logic is properly isolated — tightly coupled components resist testing entirely", "Husky hooks slow commits slightly — teams sometimes disable them under deadline pressure and forget to re-enable", "No E2E coverage yet — critical user flows (auth, checkout, multi-step forms) can break silently between unit test runs"],
        tradeOffs_es: ["Las pruebas unitarias solo son valiosas cuando la lógica está correctamente aislada — los componentes muy acoplados se resisten al testing por completo", "Los hooks de Husky ralentizan los commits ligeramente — los equipos a veces los deshabilitan bajo presión y olvidan reactivarlos", "Sin cobertura E2E aún — los flujos críticos de usuario (auth, checkout, formularios multi-paso) pueden romperse silenciosamente entre ejecuciones de pruebas"],
        riskLevel: "low",
      });
    }

    // ── Hosting ───────────────────────────────────────────────────────────────
    if (constraints.teamSize === TeamSize.SOLO) {
      decisions.push({
        category: "Hosting",
        category_es: "Hosting",
        choice: "Vercel (frontend) + Railway (backend)",
        rationale: "Vercel for frontend — especially natural for Next.js, which is Vercel's own framework. Push-to-deploy, preview URLs on every PR, and automatic SSL. Railway for backend services if needed. Working solo, I'd rather ship features than configure Nginx, manage SSL certificates, or debug deployment pipelines from scratch.",
        rationale_es: "Vercel para frontend — especialmente natural para Next.js, que es el propio framework de Vercel. Push-to-deploy, URLs de preview en cada PR y SSL automático. Railway para servicios backend si es necesario. Trabajando en solitario, prefiero lanzar funcionalidades que configurar Nginx, gestionar certificados SSL o depurar pipelines de despliegue desde cero.",
        tradeOffs: ["Higher cost per compute unit than a raw VPS (DigitalOcean, Fly.io) — fine at small scale, hurts at growth", "Platform pricing changes create migration risk — Heroku's free tier removal was a real lesson for the ecosystem", "Limited runtime control — debugging build or deployment failures on the platform is much harder than local"],
        tradeOffs_es: ["Mayor costo por unidad de cómputo que un VPS crudo (DigitalOcean, Fly.io) — bien a pequeña escala, duele al crecer", "Los cambios de precios de la plataforma crean riesgo de migración — la eliminación del plan gratuito de Heroku fue una lección real", "Control de runtime limitado — depurar fallos de build o despliegue en la plataforma es mucho más difícil que en local"],
        riskLevel: "low",
      });
    } else {
      decisions.push({
        category: "Hosting",
        category_es: "Hosting",
        choice: "Docker + AWS / Azure (team's cloud)",
        rationale: "Containerized deployments on the team's existing cloud provider. Real Docker experience from STAMP (two-frontend setup) and Student Path (data pipeline on Azure). Comfortable writing Dockerfiles and docker-compose configs. The cloud console and billing management side was handled jointly with the team in Student Path, not solo. I'd follow the team's cloud decision, not impose one.",
        rationale_es: "Despliegues contenedorizados en el proveedor cloud existente del equipo. Experiencia real con Docker de STAMP (configuración de dos frontends) y Student Path (pipeline de datos en Azure). Cómodo escribiendo Dockerfiles y configs de docker-compose. El lado de consola cloud y gestión de facturación fue manejado en equipo en Student Path, no en solitario. Seguiría la decisión cloud del equipo, no impondría una.",
        tradeOffs: ["Container builds add time to the deploy pipeline — relevant when iterating fast in early stages", "AWS and Azure both have steep billing curves without cost alerts configured from day one", "Multi-service orchestration beyond Docker Compose (Kubernetes) is outside what I've done — that needs a DevOps engineer"],
        tradeOffs_es: ["Los builds de contenedores añaden tiempo al pipeline de despliegue — relevante cuando se itera rápido en las primeras etapas", "AWS y Azure tienen curvas de facturación pronunciadas sin alertas de costo configuradas desde el inicio", "La orquestación multi-servicio más allá de Docker Compose (Kubernetes) está fuera de lo que he hecho — eso necesita un ingeniero DevOps"],
        riskLevel: "low",
      });
    }

    // ── CI/CD ─────────────────────────────────────────────────────────────────
    if (constraints.scale !== Scale.MVP) {
      decisions.push({
        category: "CI/CD",
        category_es: "CI/CD",
        choice: "GitHub Actions",
        rationale: "Real production use from SENDA — lint, Vitest, and build validation on every push and PR. Comfortable writing YAML workflows from scratch: lint checks, test runs, Docker builds, and deploy triggers. I understand matrix builds and artifact caching conceptually and have read through real pipelines; I haven't needed that complexity at this project scale yet.",
        rationale_es: "Uso real en producción desde SENDA — lint, Vitest y validación de build en cada push y PR. Cómodo escribiendo workflows YAML desde cero: verificaciones de lint, ejecución de pruebas, builds de Docker y triggers de despliegue. Entiendo los matrix builds y el artifact caching conceptualmente y he revisado pipelines reales; aún no he necesitado esa complejidad a esta escala.",
        tradeOffs: ["YAML pipeline complexity scales fast — adding steps without discipline turns into unmaintainable spaghetti", "Free tier minute limits on private repos will bite if CI runs are long and frequent", "Secrets and environment variable management across dev/staging/prod adds real operational overhead that's easy to get wrong"],
        tradeOffs_es: ["La complejidad del pipeline YAML escala rápido — agregar pasos sin disciplina lo convierte en espagueti imposible de mantener", "Los límites de minutos del plan gratuito en repos privados duelen si los CI son largos y frecuentes", "La gestión de secretos y variables de entorno entre dev/staging/prod añade sobrecarga operativa real que es fácil de hacer mal"],
        riskLevel: "low",
      });
    }

    // ── Cache Layer ───────────────────────────────────────────────────────────
    if (constraints.scale === Scale.GLOBAL || (constraints.budget === Budget.ENTERPRISE && constraints.teamSize === TeamSize.LARGE)) {
      decisions.push({
        category: "Cache Layer",
        category_es: "Capa de Caché",
        choice: "Redis (via Upstash)",
        rationale: "Studied but not yet used in production. Redis is the industry standard for session caching, rate-limiting, and pub/sub. Upstash's serverless Redis API avoids managing a Redis instance — fits naturally alongside Vercel and Supabase. I understand cache invalidation patterns, TTL strategies, and why stale data bugs are harmful. I'd implement it, but I'd want a senior engineer reviewing the invalidation strategy before it goes live.",
        rationale_es: "Estudiado pero no usado en producción aún. Redis es el estándar de la industria para caché de sesiones, rate-limiting y pub/sub. La API Redis serverless de Upstash evita gestionar una instancia de Redis — encaja naturalmente junto a Vercel y Supabase. Entiendo los patrones de invalidación de caché, las estrategias de TTL y por qué los bugs de datos obsoletos son dañinos. Lo implementaría, pero querría un ingeniero senior revisando la estrategia de invalidación antes de que salga en vivo.",
        tradeOffs: ["Cache invalidation is deceptively hard — stale data bugs are subtle, often harmful, and hard to reproduce", "Adds an operational layer to monitor and debug, more moving parts in the system", "My Redis knowledge is solid in theory; real production edge cases will likely expose gaps"],
        tradeOffs_es: ["La invalidación de caché es engañosamente difícil — los bugs de datos obsoletos son sutiles, frecuentemente dañinos y difíciles de reproducir", "Añade una capa operativa que monitorear y depurar, más piezas en movimiento en el sistema", "Mi conocimiento de Redis es sólido en teoría; los casos borde de producción real probablemente expondrán lagunas"],
        riskLevel: "medium",
      });
    }

    return decisions;
  }
};
