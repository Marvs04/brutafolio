import React, { useMemo, useRef, useCallback, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { PROJECTS } from "../constants";
import { buildComponents, extractTOC } from "../components/ReadmeViewer";
import { useLanguage } from "../context/LanguageContext";

const APPLE_BLUE = "#007AFF";
const INK = "#1D1D1F";

export const ReadmePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLanguage();
  const isES = lang === "es";

  const project = PROJECTS.find((p) => p.id === id);
  const contentRef = useRef<HTMLDivElement>(null);
  const toc = useMemo(() => extractTOC(project?.readme ?? ""), [project?.readme]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const components = useMemo(() => buildComponents() as any, []);
  const wordCount = useMemo(() => project?.readme?.split(/\s+/).length ?? 0, [project?.readme]);
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  const [activeSection, setActiveSection] = useState<string>("");

  const scrollTo = useCallback((sectionId: string) => {
    const el = contentRef.current?.querySelector(`[data-section="${sectionId}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // ── Track scroll position for active section highlighting ──
  useEffect(() => {
    if (!contentRef.current) return;

    const handleScroll = () => {
      const sections = contentRef.current?.querySelectorAll("[data-section]");
      if (!sections) return;

      // Find which section is currently in view
      let currentSection = "";
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          currentSection = section.getAttribute("data-section") || "";
        }
      });

      setActiveSection(currentSection);
    };

    contentRef.current?.addEventListener("scroll", handleScroll);
    contentRef.current?.parentElement?.addEventListener("scroll", handleScroll);

    return () => {
      contentRef.current?.removeEventListener("scroll", handleScroll);
      contentRef.current?.parentElement?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!project || !project.readme) {
    return (
      <div className="p-12 font-mono text-sm text-ink/70">
        {isES ? "Proyecto no encontrado." : "Project not found."}{" "}
        <Link to="/projects" className="text-accent underline underline-offset-2">
          ← {isES ? "Proyectos" : "Projects"}
        </Link>
      </div>
    );
  }

  return (
    <div
      className="w-full"
      data-blueprint="organism:readme-page"
      data-blueprint-id="readme-page"
      data-blueprint-logic="ReadmePage — project from useParams(:id), dark header + sidebar meta/TOC + ReactMarkdown"
    >
      {/* ── Dark page header ── */}
      <section
        className="border-b-4 border-ink px-8 md:px-14 py-12 md:py-16"
        style={{ backgroundColor: "#060606" }}
        data-blueprint="organism:page-header"
        data-blueprint-id="readme-page-header"
        data-blueprint-logic="Dark header strip — project title, reading time, GitHub/Live links"
      >
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors mb-8"
          data-blueprint="atom:back-link"
          data-blueprint-id="readme-back-link"
          data-blueprint-logic="Link → /projects"
        >
          <ArrowLeft size={16} />
          {isES ? "Proyectos" : "Projects"}
        </Link>

        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/70 mb-3">
              {isES ? "01 / Proyectos / Readme" : "01 / Projects / Readme"}
            </p>
            <h1
              className="font-mono font-bold uppercase tracking-tighter leading-[0.9] text-white text-4xl md:text-5xl lg:text-6xl\"
              data-blueprint="atom:page-title"
              data-blueprint-id="readme-page-title"
              data-blueprint-logic="Dynamic — project.title from useParams(:id)"
            >
              {project.title}_
            </h1>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/70 mt-5">
              ~{readingTime} {isES ? "min de lectura" : "min read"} · {wordCount.toLocaleString()} {isES ? "palabras" : "words"}
            </p>
          </div>

          <div className="flex gap-3 shrink-0 pb-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] border border-white/70 px-4 py-2 text-white/70 hover:text-white hover:border-white transition-colors"
                data-blueprint="atom:github-link"
                data-blueprint-id="readme-github-link"
                data-blueprint-logic="Conditional — renders only if project.githubUrl exists"
              >
                <Github size={16} />
                {isES ? "Código" : "Source"}
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] border px-4 py-2 transition-colors"
                style={{ borderColor: APPLE_BLUE, color: APPLE_BLUE }}
                data-blueprint="atom:live-link"
              >
                <ExternalLink size={16} />
                Live
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Body: sidebar + content ── */}
      <div className="flex bg-white">

        {/* Sticky sidebar */}
        <aside
          className="hidden lg:flex flex-col w-48 xl:w-64 shrink-0 border-r-4 border-ink bg-paper sticky top-14 h-[calc(100vh-56px)] overflow-y-auto"
          data-blueprint="molecule:readme-sidebar"
          data-blueprint-id="readme-sidebar"
        >
          <div className="p-8 space-y-8">

            {/* Back button */}
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-ink/70 hover:text-accent transition-colors"
            >
              <ArrowLeft size={16} />
              {isES ? "Proyectos" : "Projects"}
            </Link>

            <hr className="border-ink/10" />

            {/* Project meta */}
            <div
              className="space-y-3"
              data-blueprint="molecule:project-meta"
              data-blueprint-id="readme-meta"
            >
              <button
                onClick={() => {
                  const firstSection = contentRef.current?.querySelector("[data-section]");
                  if (firstSection) firstSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink/70 hover:text-accent transition-colors cursor-pointer font-semibold"
              >
                Info
              </button>
              <div className="space-y-3">
                {([
                  { label: isES ? "Año" : "Year", value: project.year },
                  { label: isES ? "Rol" : "Role", value: project.teamRole.toUpperCase() },
                ] as { label: string; value: string }[]).map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-ink/70">
                      {label}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-ink">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-ink/70">
                    Status
                  </span>
                  <span
                    className="font-mono text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 border"
                    style={{
                      backgroundColor: project.status === "SHIPPED" ? INK : "transparent",
                      color: project.status === "SHIPPED" ? "#fff" : INK,
                      borderColor: project.status === "SHIPPED" ? INK : `${INK}44`,
                    }}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            </div>

            <hr className="border-ink/10" />

            {/* Tech stack */}
            <div
              className="space-y-3"
              data-blueprint="molecule:tech-stack"
              data-blueprint-id="readme-stack"
            >
              <button
                onClick={() => {
                  // Try to find a Stack section in the content
                  const stackSection = contentRef.current?.querySelector('[data-section="stack"], [data-section="Stack"], [data-section="STACK"], [data-section="tech"], [data-section="Tech"]');
                  if (stackSection) {
                    stackSection.scrollIntoView({ behavior: "smooth", block: "start" });
                  } else {
                    // Fallback: scroll to first h2 that might contain "Stack"
                    const allSections = contentRef.current?.querySelectorAll("[data-section]");
                    if (allSections && allSections.length > 0) {
                      const stackMatch = Array.from(allSections).find(el => 
                        el.textContent?.toLowerCase().includes("stack") || 
                        el.getAttribute("data-section")?.toLowerCase().includes("stack")
                      );
                      if (stackMatch) stackMatch.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }
                }}
                className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink/70 hover:text-accent transition-colors cursor-pointer font-semibold"
              >
                Stack
              </button>
              <div className="flex flex-col gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[9px] uppercase tracking-wider text-ink/70"
                  >
                    · {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* TOC */}
            {toc.length > 1 && (
              <>
                <hr className="border-ink/10" />
                <div
                  className="space-y-3"
                  data-blueprint="molecule:toc"
                  data-blueprint-id="readme-toc"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink/70">
                    {isES ? "Secciones" : "Sections"}
                  </p>
                  <ul className="space-y-1">
                    {toc.map(({ id: sectionId, text }) => {
                      const isActive = activeSection === sectionId;
                      return (
                        <li key={sectionId}>
                          <button
                            onClick={() => scrollTo(sectionId)}
                            className={`w-full text-left font-mono text-[9px] uppercase tracking-[0.1em] py-2 leading-snug transition-all pl-2 border-l-2 ${ 
                              isActive 
                                ? "border-accent text-accent font-bold" 
                                : "border-transparent text-ink/70 hover:text-accent"
                            }`}
                            data-blueprint="atom:toc-link"
                            data-blueprint-logic={`onClick: scrollTo('${sectionId}') — active: ${isActive}`}
                          >
                            {text}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}

          </div>
        </aside>

        {/* Markdown content */}
        <div
          className="flex-1 px-8 md:px-16 lg:px-20 py-16 md:py-20 lg:py-24"
          data-blueprint="molecule:readme-content"
          data-blueprint-id="readme-body"
          data-blueprint-logic="ReactMarkdown with buildComponents() — GFM enabled"
        >
          <div ref={contentRef} className="max-w-3xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {project.readme}
            </ReactMarkdown>
          </div>
        </div>

      </div>
    </div>
  );
};
