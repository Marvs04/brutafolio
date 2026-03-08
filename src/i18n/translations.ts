export const translations = {
  en: {
    // Site
    siteTitle: "Developer Under Constraints",
    footer: "© 2026 ARCHITECT UNDER CONSTRAINTS // BUILT WITH REACT + TYPESCRIPT + TAILWIND",

    // Nav
    navProjects: "Projects",
    navCV: "CV",
    navConstraints: "Developer Under Constraints",
    navPhilosophy: "Philosophy",
    navMethodology: "Methodology",

    // Sidebar
    systemConstraints: "System Constraints",
    seniorTools: "Senior Tools",
    enableRiskMode: "Enable Risk Mode",
    disableRiskMode: "Disable Risk Mode",
    riskModeDesc: "Risk Mode exposes architectural vulnerabilities and trade-off compromises based on your current constraints.",
    enableBlueprintMode: "Enable Blueprint",
    disableBlueprintMode: "Disable Blueprint",
    blueprintModeDesc: "X-Ray overlay: inspect component hierarchy, padding, and computed layout in real time. Press B to toggle.",

    // Tabs
    tab01: "01. Architecture",
    tab02: "02. App Lab",

    // Constraint Panel
    c01TeamSize: "01. Team Size",
    c02Budget: "02. Budget",
    c03Scale: "03. Target Scale",
    c04Realtime: "04. Real-time Needs",
    c05Deadline: "05. Deadline (Months)",
    enabled: "Enabled",
    disabled: "Disabled",

    // Architecture Visualizer
    systemBlueprint: "System Blueprint",
    riskExposureActive: "Risk Exposure Active",
    tradeOffs: "Trade-offs",
    riskAssessment: "Risk Assessment",
    riskHigh: "Critical failure point under extreme load. Requires immediate mitigation strategy.",
    riskMedium: "Moderate operational complexity. Monitor closely during scaling phases.",

    // Project Showcase
    relevantArtifacts: "Relevant Artifacts",
    sortedByFit: "Sorted by Constraint Fit",

    // App Lab
    appLabTitle: "The App Lab",
    appLabSubtitle: "Current builds & experiments",
    labelProblem: "The Problem",
    labelChallenge: "Current Challenge",
    labelInsight: "Junior to Senior Insight",

    // CV Overlay
    cvTechStack: "Technical Stack",
    cvEducation: "Education",
    cvDomains: "Domains",
    cvTrajectory: "Professional Trajectory",
    cvDownload: "Download PDF CV",
    cvDegree: "Ingeniero en Sistemas",
    cvUniversity: "UNADECA // Costa Rica",
    cvDomain1: "// Frontend Engineering — React · TypeScript · Tailwind",
    cvDomain2: "// Role-Based Platform Architecture",
    cvDomain3: "// Data Pipelines & Academic Systems",
    cvDomain4: "// Headless CMS & Static Site Delivery",
    cvRole1: "Junior Developer",
    cvCompany1: "SENDA // University Scholarship Platform",
    cvPeriod1: "2026 — PRESENT",
    cvDesc1: "Built a 5-role work-scholarship portal (React 19, TypeScript strict, Supabase-ready) with per-role code splitting via React.lazy, PDF/CSV payroll export (jsPDF), 32 Vitest unit tests for all billing-cycle and payroll logic, ESLint 0-warning policy enforced via Husky pre-commit hooks, and GitHub Actions CI on every push and PR.",
    cvRole2: "Web Developer",
    cvCompany2: "ACNR // Asociación Norte de Costa Rica",
    cvPeriod2: "2026 — PRESENT",
    cvDesc2: "Built the association's public site with Astro 5 + Tailwind. Used Strapi 5 as headless CMS — correctly handled its v5 flat response schema with typed generics. Hybrid SSR/static routing: church directory filter runs server-side, rest is prerendered. Graceful fallback to mock data when CMS is unreachable.",
    cvRole3: "Software Developer",
    cvCompany3: "STAMP // Boarding School Platform",
    cvPeriod3: "2024",
    cvDesc3: "Designed and shipped a multi-user system for a college internado. Covers QR-based church attendance (monitor kiosk with camera scanning), exit permit management (guards scan to verify), and student self-service. Built two distinct frontends — MUI for staff, Neobrutalism.dev for students — sharing one Express + Supabase backend.",
    cvRole4: "Developer",
    cvCompany4: "Student Path // UNADECA Registro System",
    cvPeriod4: "2024",
    cvDesc4: "Built an academic management tool for the Registro department to track student grades, evaluate graduation eligibility, and normalize a decade of inconsistent CSV records. Stack: Python, Pandas, Streamlit, PostgreSQL (Azure), Docker.",
    cvRole5: "Web Developer",
    cvCompany5: "POASSTEREO // Radio Station Website",
    cvPeriod5: "2025",
    cvDesc5: "Designed and shipped the public website for a radio station using Astro and Tailwind. Zero-JS static output with content-focused architecture for maximum performance.",

    // Philosophy Overlay
    philosophyTag: "Manifesto",
    philosophyTitle: "Pragmatism\nOver\nPerfection",
    philosophyQuote: "\"An architect's job is not to build the 'best' system, but the most appropriate one for the given constraints.\"",
    philosophyBody: "Speed is a competitive advantage — but speed without direction leads to technical bankruptcy. My philosophy centers on Just-In-Time Architecture: building systems that are robust enough for today but flexible enough for tomorrow's pivot.",
    philosophyP1Title: "Constraint-First Design",
    philosophyP1Desc: "Architecture is born from limitations. Budget, team size, and deadlines are not obstacles — they are the blueprint.",
    philosophyP2Title: "Velocity as a Metric",
    philosophyP2Desc: "If a complex architecture slows down the product team, it is a failed architecture, regardless of its technical elegance.",
    philosophyP3Title: "Strategic Debt",
    philosophyP3Desc: "Knowing when to take on technical debt is a senior skill. Knowing how to pay it back is an architectural one.",
    philosophyClose: "Understood",
    philosophyVersion: "Architect Under Constraints // v1.0",

    // Methodology Overlay
    methodologyTag: "The Framework",
    methodologyTitle: "The Constraint-First\nMethodology",
    methodologyStep1Title: "01. Constraint Mapping",
    methodologyStep1Desc: "Identify non-negotiables: hard deadlines, regulatory requirements, and team expertise gaps.",
    methodologyStep2Title: "02. Pattern Selection",
    methodologyStep2Desc: "Apply proven architectural patterns (Microservices, Monolith, Serverless) based on the mapped constraints.",
    methodologyStep3Title: "03. Risk Stress-Testing",
    methodologyStep3Desc: "Simulate failure modes. What happens if traffic 10x's? What if the budget is cut by 50%?",
    methodologyStep4Title: "04. Implementation & Feedback",
    methodologyStep4Desc: "Deploy MVP and monitor observability metrics to validate architectural assumptions.",
    methodologyMatrixTitle: "Decision Matrix Logic",

    // Projects Overlay
    projectsTag: "Selected Works",
    projectsTitle: "Engineering\nArtifacts",
    projectsViewArch: "View System Architecture",

    // Constraint Enum Labels
    enumSolo: "Solo",
    enumSmall: "Small",
    enumLarge: "Large",
    enumBootstrapped: "Bootstrapped",
    enumVenture: "Venture",
    enumEnterprise: "Enterprise",
    enumMvp: "MVP",
    enumRegional: "Regional",
    enumGlobal: "Global",
    tagSolo: "Solo",
    tagTeam: "Team",
    statusWip: "WIP",
    statusShipped: "Shipped",
  },

  es: {
    // Site
    siteTitle: "Desarrollador Bajo Restricciones",
    footer: "© 2026 ARQUITECTO BAJO RESTRICCIONES // CONSTRUIDO CON REACT + TYPESCRIPT + TAILWIND",

    // Nav
    navProjects: "Proyectos",
    navCV: "CV",
    navConstraints: "Desarrollador Bajo Restricciones",
    navPhilosophy: "Filosofía",
    navMethodology: "Metodología",

    // Sidebar
    systemConstraints: "Restricciones del Sistema",
    seniorTools: "Herramientas Senior",
    enableRiskMode: "Activar Modo Riesgo",
    disableRiskMode: "Desactivar Modo Riesgo",
    riskModeDesc: "El Modo Riesgo expone vulnerabilidades arquitectónicas y compromisos de diseño según las restricciones actuales.",
    enableBlueprintMode: "Activar Blueprint",
    disableBlueprintMode: "Desactivar Blueprint",
    blueprintModeDesc: "Superposición X-Ray: inspecciona jerarquía de componentes, padding y layout computado en tiempo real. Tecla B para activar.",

    // Tabs
    tab01: "01. Arquitectura",
    tab02: "02. App Lab",

    // Constraint Panel
    c01TeamSize: "01. Tamaño del Equipo",
    c02Budget: "02. Presupuesto",
    c03Scale: "03. Escala Objetivo",
    c04Realtime: "04. Necesidades en Tiempo Real",
    c05Deadline: "05. Plazo (Meses)",
    enabled: "Activado",
    disabled: "Desactivado",

    // Architecture Visualizer
    systemBlueprint: "Plano del Sistema",
    riskExposureActive: "Exposición de Riesgo Activa",
    tradeOffs: "Compromisos",
    riskAssessment: "Evaluación de Riesgo",
    riskHigh: "Punto de falla crítico bajo carga extrema. Requiere estrategia de mitigación inmediata.",
    riskMedium: "Complejidad operativa moderada. Monitorear de cerca durante las fases de escalado.",

    // Project Showcase
    relevantArtifacts: "Proyectos Relevantes",
    sortedByFit: "Ordenados por Compatibilidad",

    // App Lab
    appLabTitle: "El App Lab",
    appLabSubtitle: "Builds actuales y experimentos",
    labelProblem: "El Problema",
    labelChallenge: "Reto Actual",
    labelInsight: "De Junior a Senior",

    // CV Overlay
    cvTechStack: "Stack Técnico",
    cvEducation: "Educación",
    cvDomains: "Dominios",
    cvTrajectory: "Trayectoria Profesional",
    cvDownload: "Descargar CV en PDF",
    cvDegree: "Ingeniero en Sistemas",
    cvUniversity: "UNADECA // Costa Rica",
    cvDomain1: "// Ingeniería Frontend — React · TypeScript · Tailwind",
    cvDomain2: "// Arquitectura de Plataformas Multi-rol",
    cvDomain3: "// Pipelines de Datos y Sistemas Académicos",
    cvDomain4: "// CMS Headless y Entrega de Sitios Estáticos",
    cvRole1: "Junior Developer",
    cvCompany1: "SENDA // Plataforma de Becas Universitarias",
    cvPeriod1: "2026 — PRESENTE",
    cvDesc1: "Portal de becas laborales con 5 roles (React 19, TypeScript strict, listo para Supabase): code splitting por rol con React.lazy, exportación PDF/CSV de planilla (jsPDF), 32 pruebas unitarias en Vitest para la lógica de ciclos y nómina, política 0 warnings con ESLint + Husky pre-commit y CI en GitHub Actions en cada push y PR.",
    cvRole2: "Desarrollador Web",
    cvCompany2: "ACNR // Asociación Norte de Costa Rica",
    cvPeriod2: "2026 — PRESENTE",
    cvDesc2: "Sitio público de la asociación con Astro 5 + Tailwind. Strapi 5 como CMS headless — manejo correcto del nuevo schema plano de v5 con genéricos tipados. Enrutamiento híbrido SSR/estático: el filtro de iglesias corre en servidor, el resto es pregenerado. Degradación grácil a datos mock cuando el CMS no está disponible.",
    cvRole3: "Desarrollador de Software",
    cvCompany3: "STAMP // Plataforma de Internado",
    cvPeriod3: "2024",
    cvDesc3: "Diseño y lanzamiento de un sistema multi-usuario para el internado de un colegio. Incluye asistencia a culto mediante QR (quiosco con cámara para monitores), gestión de permisos de salida (verificación por guardias) y autogestión del estudiante. Dos frontends distintos — MUI para personal, Neobrutalism.dev para estudiantes — compartiendo un backend Express + Supabase.",
    cvRole4: "Desarrollador",
    cvCompany4: "Student Path // Sistema de Registro UNADECA",
    cvPeriod4: "2024",
    cvDesc4: "Herramienta de gestión académica para el Registro del colegio: seguimiento de notas, evaluación de elegibilidad para graduación y normalización de una década de archivos CSV inconsistentes. Stack: Python, Pandas, Streamlit, PostgreSQL (Azure), Docker.",
    cvRole5: "Desarrollador Web",
    cvCompany5: "POASSTEREO // Sitio Web de Radio",
    cvPeriod5: "2025",
    cvDesc5: "Diseño y lanzamiento del sitio web de una estación de radio con Astro y Tailwind. Salida estática sin JavaScript con arquitectura orientada al contenido para máximo rendimiento.",

    // Philosophy Overlay
    philosophyTag: "Manifiesto",
    philosophyTitle: "Pragmatismo\nSobre\nPerfección",
    philosophyQuote: "\"El trabajo de un arquitecto no es construir el sistema 'mejor', sino el más adecuado para las restricciones dadas.\"",
    philosophyBody: "La velocidad es una ventaja competitiva — pero la velocidad sin dirección lleva a la bancarrota técnica. Mi filosofía se centra en la Arquitectura Justo-a-Tiempo: construir sistemas lo suficientemente robustos para hoy pero flexibles para el pivote de mañana.",
    philosophyP1Title: "Diseño Orientado a Restricciones",
    philosophyP1Desc: "La arquitectura nace de las limitaciones. El presupuesto, el tamaño del equipo y los plazos no son obstáculos — son el plano.",
    philosophyP2Title: "Velocidad como Métrica",
    philosophyP2Desc: "Si una arquitectura compleja ralentiza al equipo de producto, es una arquitectura fallida, sin importar su elegancia técnica.",
    philosophyP3Title: "Deuda Estratégica",
    philosophyP3Desc: "Saber cuándo asumir deuda técnica es una habilidad senior. Saber cómo pagarla es una habilidad arquitectónica.",
    philosophyClose: "Entendido",
    philosophyVersion: "Arquitecto Bajo Restricciones // v1.0",

    // Methodology Overlay
    methodologyTag: "El Marco de Trabajo",
    methodologyTitle: "La Metodología\nOrientada a Restricciones",
    methodologyStep1Title: "01. Mapeo de Restricciones",
    methodologyStep1Desc: "Identificar los elementos no negociables: plazos duros, requisitos regulatorios y brechas de expertise del equipo.",
    methodologyStep2Title: "02. Selección de Patrones",
    methodologyStep2Desc: "Aplicar patrones arquitectónicos probados (Microservicios, Monolito, Serverless) según las restricciones mapeadas.",
    methodologyStep3Title: "03. Prueba de Estrés de Riesgo",
    methodologyStep3Desc: "Simular modos de falla. ¿Qué pasa si el tráfico se multiplica por 10? ¿Y si el presupuesto se recorta un 50%?",
    methodologyStep4Title: "04. Implementación y Retroalimentación",
    methodologyStep4Desc: "Desplegar MVP y monitorear métricas de observabilidad para validar los supuestos arquitectónicos.",
    methodologyMatrixTitle: "Lógica de Matriz de Decisión",

    // Projects Overlay
    projectsTag: "Trabajos Seleccionados",
    projectsTitle: "Artefactos de\nIngeniería",
    projectsViewArch: "Ver Arquitectura del Sistema",

    // Constraint Enum Labels
    enumSolo: "Solo",
    enumSmall: "Pequeño",
    enumLarge: "Grande",
    enumBootstrapped: "Propio",
    enumVenture: "Venture",
    enumEnterprise: "Empresarial",
    enumMvp: "MVP",
    enumRegional: "Regional",
    enumGlobal: "Global",
    tagSolo: "Solo",
    tagTeam: "Equipo",
    statusWip: "En Progreso",
    statusShipped: "Lanzado",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
