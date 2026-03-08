import { Constraints, ArchitectureDecision, Scale, Budget, TeamSize } from "../types";

export const architectureService = {
  getDecisions(constraints: Constraints): ArchitectureDecision[] {
    const decisions: ArchitectureDecision[] = [];

    // Database
    if (constraints.budget === Budget.BOOTSTRAPPED || constraints.teamSize === TeamSize.SOLO) {
      decisions.push({
        category: "Database",
        category_es: "Base de Datos",
        choice: "Supabase (PostgreSQL)",
        rationale: "Managed BaaS that bundles database, auth, and real-time. The go-to for lean teams that want to ship fast without managing infrastructure. Used directly in SENDA and STAMP.",
        rationale_es: "BaaS gestionado que incluye base de datos, autenticación y tiempo real. La opción ideal para equipos pequeños que quieren lanzar rápido sin gestionar infraestructura. Usado directamente en SENDA y STAMP.",
        tradeOffs: ["Vendor lock-in", "Connection pool limits on free tier", "Requires careful RLS policy design"],
        tradeOffs_es: ["Dependencia del proveedor", "Límites de pool de conexiones en plan gratuito", "Requiere un diseño cuidadoso de políticas RLS"],
        riskLevel: "low",
      });
    } else if (constraints.scale === Scale.GLOBAL) {
      decisions.push({
        category: "Database",
        category_es: "Base de Datos",
        choice: "Neon (Serverless PostgreSQL)",
        rationale: "Serverless PostgreSQL with auto-scaling and branching. A practical step up from Supabase when scale demands it, without jumping into distributed systems complexity.",
        rationale_es: "PostgreSQL serverless con auto-escalado y branching. Un paso práctico desde Supabase cuando la escala lo exige, sin saltar a la complejidad de sistemas distribuidos.",
        tradeOffs: ["Cold start latency on low traffic", "Less integrated auth story", "Newer ecosystem — fewer tutorials"],
        tradeOffs_es: ["Latencia en arranque en frío con poco tráfico", "Autenticación menos integrada", "Ecosistema más nuevo — menos tutoriales"],
        riskLevel: "medium",
      });
    } else {
      decisions.push({
        category: "Database",
        category_es: "Base de Datos",
        choice: "PostgreSQL on Azure",
        rationale: "Reliable managed PostgreSQL within the Azure ecosystem. A proven choice — used in production for data normalization pipelines and academic systems in Student Path.",
        rationale_es: "PostgreSQL gestionado y confiable dentro del ecosistema Azure. Una opción probada — usada en producción para pipelines de normalización de datos y sistemas académicos en Student Path.",
        tradeOffs: ["Azure vendor dependency", "Higher cost than self-hosted", "Scaling requires manual configuration"],
        tradeOffs_es: ["Dependencia del ecosistema Azure", "Mayor costo que auto-hospedado", "El escalado requiere configuración manual"],
        riskLevel: "low",
      });
    }

    // Frontend
    if (!constraints.realtime && constraints.scale === Scale.MVP) {
      decisions.push({
        category: "Frontend",
        category_es: "Frontend",
        choice: "Astro + Tailwind",
        rationale: "Zero-JS by default. Perfect for content-heavy or static sites where SEO and load time matter most. Used in production for ACNR and POASSTEREO.",
        rationale_es: "Cero JS por defecto. Perfecto para sitios de contenido o estáticos donde el SEO y el tiempo de carga son prioritarios. Usado en producción para ACNR y POASSTEREO.",
        tradeOffs: ["Not ideal for highly interactive UIs", "Build time grows with content volume", "Smaller component ecosystem than React"],
        tradeOffs_es: ["No ideal para interfaces muy interactivas", "El tiempo de build crece con el volumen de contenido", "Ecosistema de componentes más pequeño que React"],
        riskLevel: "low",
      });
    } else if (constraints.deadline < 3) {
      decisions.push({
        category: "Frontend",
        category_es: "Frontend",
        choice: "React + Vite + Shadcn/ui",
        rationale: "Short deadline means needing a component library ready from day one. Shadcn/ui provides accessible, Tailwind-compatible components without locking into a rigid design system.",
        rationale_es: "Un plazo corto implica necesitar una librería de componentes lista desde el inicio. Shadcn/ui provee componentes accesibles y compatibles con Tailwind sin atarte a un sistema de diseño rígido.",
        tradeOffs: ["Component customization has limits", "Opinionated file structure", "Team must learn Shadcn conventions"],
        tradeOffs_es: ["La personalización de componentes tiene límites", "Estructura de archivos opinionada", "El equipo debe aprender las convenciones de Shadcn"],
        riskLevel: "low",
      });
    } else {
      decisions.push({
        category: "Frontend",
        category_es: "Frontend",
        choice: "React SPA + Vite",
        rationale: "Primary stack. Full control over architecture, routing, and state. Used across SENDA, STAMP, and this portfolio. TypeScript enforces contracts; Tailwind keeps styles consistent.",
        rationale_es: "Stack principal. Control total sobre arquitectura, enrutamiento y estado. Usado en SENDA, STAMP y este portafolio. TypeScript refuerza los contratos; Tailwind mantiene los estilos consistentes.",
        tradeOffs: ["Initial project setup takes time", "SEO requires additional tooling", "State complexity grows with app size"],
        tradeOffs_es: ["La configuración inicial del proyecto toma tiempo", "El SEO requiere herramientas adicionales", "La complejidad de estado crece con el tamaño de la app"],
        riskLevel: "low",
      });
    }

    // Backend / API
    if (constraints.teamSize === TeamSize.SOLO && constraints.budget === Budget.BOOTSTRAPPED) {
      decisions.push({
        category: "Backend / API",
        category_es: "Backend / API",
        choice: "Supabase Edge Functions",
        rationale: "Serverless functions co-located with the database. Avoids managing a separate server for simple API needs on lean budgets.",
        rationale_es: "Funciones serverless co-ubicadas con la base de datos. Evita gestionar un servidor separado para necesidades de API simples con presupuesto ajustado.",
        tradeOffs: ["Deno runtime — not Node.js", "Cold starts on low traffic", "Harder to debug than a local Express server"],
        tradeOffs_es: ["Runtime Deno — no es Node.js", "Arranques en frío con poco tráfico", "Más difícil de depurar que un servidor Express local"],
        riskLevel: "low",
      });
    } else {
      decisions.push({
        category: "Backend / API",
        category_es: "Backend / API",
        choice: "Express (Node.js) + Docker",
        rationale: "Lightweight and familiar. Containerized with Docker for consistent dev/prod environments. The backend pattern used in STAMP, connecting to Supabase and handling business logic.",
        rationale_es: "Ligero y familiar. Contenedorizado con Docker para entornos consistentes entre dev y producción. El patrón de backend usado en STAMP, conectado a Supabase y gestionando lógica de negocio.",
        tradeOffs: ["Manual middleware and routing setup", "No built-in conventions", "Orchestration needed at larger scale"],
        tradeOffs_es: ["Configuración manual de middlewares y rutas", "Sin convenciones integradas", "Se necesita orquestación a mayor escala"],
        riskLevel: "low",
      });
    }

    // Real-time
    if (constraints.realtime) {
      decisions.push({
        category: "Real-time",
        category_es: "Tiempo Real",
        choice: "Supabase Realtime",
        rationale: "Postgres-backed real-time subscriptions over WebSockets. Used in SENDA for live clock state across multiple user roles without a separate message broker.",
        rationale_es: "Suscripciones en tiempo real sobre WebSockets respaldadas por Postgres. Usado en SENDA para el estado del marcador de horas en vivo entre múltiples roles, sin un broker de mensajes separado.",
        tradeOffs: ["Tied to Supabase ecosystem", "Subscription complexity grows with channel count", "Not designed for millions of concurrent connections"],
        tradeOffs_es: ["Atado al ecosistema de Supabase", "La complejidad crece con la cantidad de canales", "No diseñado para millones de conexiones concurrentes"],
        riskLevel: "medium",
      });
    }

    // Authentication
    if (!(constraints.budget === Budget.ENTERPRISE && constraints.teamSize === TeamSize.LARGE)) {
      decisions.push({
        category: "Authentication",
        category_es: "Autenticación",
        choice: "Supabase Auth",
        rationale: "JWT-based auth with built-in row-level security. Handles login, sessions, and role-based claims out of the box. Direct production experience from SENDA and STAMP.",
        rationale_es: "Autenticación basada en JWT con seguridad a nivel de fila integrada. Gestiona login, sesiones y claims por rol desde el inicio. Experiencia directa en producción desde SENDA y STAMP.",
        tradeOffs: ["RLS policies require careful design and testing", "All auth flows depend on Supabase availability", "Custom OAuth providers need extra config"],
        tradeOffs_es: ["Las políticas RLS requieren diseño y pruebas cuidadosas", "Todos los flujos de auth dependen de Supabase", "Los proveedores OAuth personalizados requieren configuración extra"],
        riskLevel: "low",
      });
    } else {
      decisions.push({
        category: "Authentication",
        category_es: "Autenticación",
        choice: "Azure Active Directory (Entra ID)",
        rationale: "For enterprise teams in the Azure ecosystem, Entra ID integrates with existing organizational accounts, SSO, and role policies without a separate identity service.",
        rationale_es: "Para equipos empresariales dentro del ecosistema Azure, Entra ID se integra con cuentas organizacionales, SSO y políticas de roles existentes sin un servicio de identidad separado.",
        tradeOffs: ["Enterprise licensing costs", "Complex config for non-Microsoft apps", "Overkill for small-to-medium projects"],
        tradeOffs_es: ["Costos de licencia empresarial", "Configuración compleja para apps no Microsoft", "Excesivo para proyectos pequeños y medianos"],
        riskLevel: "medium",
      });
    }

    // Hosting
    if (constraints.teamSize === TeamSize.SOLO) {
      decisions.push({
        category: "Hosting",
        category_es: "Hosting",
        choice: "Railway / Render",
        rationale: "Zero-config PaaS — push code, get a URL. Manages SSL, domains, and automatic deploys. The right call for solo developers who need to ship, not configure servers.",
        rationale_es: "PaaS sin configuración — push de código, URL lista. Gestiona SSL, dominios y despliegues automáticos. La opción correcta para desarrolladores solo que necesitan lanzar, no configurar servidores.",
        tradeOffs: ["Higher cost per compute unit vs. VPS", "Limited hardware customization", "Platform roadmap dependence"],
        tradeOffs_es: ["Mayor costo por unidad de cómputo vs. VPS", "Personalización de hardware limitada", "Dependencia del roadmap de la plataforma"],
        riskLevel: "low",
      });
    } else {
      decisions.push({
        category: "Hosting",
        category_es: "Hosting",
        choice: "Docker + Azure App Service",
        rationale: "Containerized applications deployed to Azure App Service. A familiar environment — Docker used in STAMP and Student Path, Azure used in Student Path's database backend.",
        rationale_es: "Aplicaciones contenedorizadas desplegadas en Azure App Service. Un entorno familiar — Docker usado en STAMP y Student Path, Azure usado en el backend de base de datos de Student Path.",
        tradeOffs: ["Azure pricing can be unpredictable", "Container builds add to deploy pipeline time", "Team needs Docker knowledge"],
        tradeOffs_es: ["Los precios de Azure pueden ser impredecibles", "Los builds de contenedores alargan el pipeline", "El equipo necesita conocimiento de Docker"],
        riskLevel: "low",
      });
    }

    // CI/CD — show for anything past MVP stage
    if (constraints.scale !== Scale.MVP) {
      decisions.push({
        category: "CI/CD",
        category_es: "CI/CD",
        choice: "GitHub Actions",
        rationale: "Used for basic linting and deploy triggers in version-controlled projects. The natural next step for regional+ builds — automate lint, test, Docker build, and push on every PR. Familiar pattern; deeper pipeline complexity (matrix builds, artifact caching) studied but not yet production-critical.",
        rationale_es: "Usado para linting básico y triggers de despliegue en proyectos bajo control de versiones. El siguiente paso natural para builds regional+ — automatizar lint, test, build de Docker y push en cada PR. Patrón familiar; la complejidad avanzada (matrix builds, artifact caching) estudiada pero aún no crítica en producción.",
        tradeOffs: ["YAML complexity scales fast with pipeline steps", "Free plan minute limits on private repos", "Secrets and environment management requires discipline"],
        tradeOffs_es: ["La complejidad del YAML escala rápido con los pasos", "Límites de minutos en repos privados en plan gratuito", "La gestión de secretos y entornos requiere disciplina"],
        riskLevel: "low",
      });
    }

    // Cache — show for global scale or enterprise with a large team
    if (constraints.scale === Scale.GLOBAL || (constraints.budget === Budget.ENTERPRISE && constraints.teamSize === TeamSize.LARGE)) {
      decisions.push({
        category: "Cache Layer",
        category_es: "Capa de Caché",
        choice: "Redis (via Upstash)",
        rationale: "Studied as part of scaling architecture research — not yet in direct production use. Redis is the industry standard for session caching, rate-limiting, and lightweight pub/sub. Upstash's serverless Redis API fits the same zero-infrastructure philosophy as Railway and Supabase. Understand the patterns well enough to implement.",
        rationale_es: "Estudiado como parte de investigación en arquitecturas de escala — sin uso directo en producción aún. Redis es el estándar de la industria para caché de sesiones, rate-limiting y pub/sub ligero. La API Redis serverless de Upstash encaja con la misma filosofía sin infraestructura de Railway y Supabase. Comprendo los patrones lo suficiente para implementarlo.",
        tradeOffs: ["Cache invalidation strategy must be explicit and tested", "Adds operational layer to debug and monitor", "Memory cost scales with dataset size"],
        tradeOffs_es: ["La estrategia de invalidación de caché debe ser explícita y probada", "Añade una capa operativa para depurar y monitorear", "El costo de memoria escala con el tamaño del dataset"],
        riskLevel: "medium",
      });
    }

    return decisions;
  }
};
