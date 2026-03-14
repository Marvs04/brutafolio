import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Github, FileText, X } from "lucide-react";
import { PROJECTS } from "../constants";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

const INK        = "#1D1D1F";
const APPLE_BLUE = "#007AFF";

export const ProjectsPage: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const isES = lang === "es";
  const [selectedTechs, setSelectedTechs] = useState<Set<string>>(new Set());

  // ── Extract unique technologies ──
  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    PROJECTS.forEach(p => p.techStack.forEach(tech => techs.add(tech)));
    return Array.from(techs).sort();
  }, []);

  // ── Filter projects based on selected techs ──
  const filteredProjects = useMemo(() => {
    if (selectedTechs.size === 0) return PROJECTS;
    return PROJECTS.filter(p =>
      Array.from(selectedTechs).every(tech => p.techStack.includes(tech))
    );
  }, [selectedTechs]);

  const toggleTech = (tech: string) => {
    const newSet = new Set(selectedTechs);
    if (newSet.has(tech)) {
      newSet.delete(tech);
    } else {
      newSet.add(tech);
    }
    setSelectedTechs(newSet);
  };

  const clearFilters = () => {
    setSelectedTechs(new Set());
  };

  return (
    <div
      className="w-full"
      data-blueprint="organism:projects-page"
      data-blueprint-id="projects-page"
      data-blueprint-logic="ProjectsPage with tech filter"
    >
      {/* Page header */}
      <section
        className="border-b-4 border-ink px-8 md:px-14 py-12 md:py-16"
        style={{ backgroundColor: "#060606" }}
        data-blueprint="organism:page-header"
        data-blueprint-id="projects-page-header"
        data-blueprint-logic="Static page identity — dark header strip"
      >
        <p
          className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/70 mb-4"
          data-blueprint="atom:page-label"
          data-blueprint-id="projects-label"
          data-blueprint-logic="Static breadcrumb"
        >
          {isES ? "01 / Proyectos" : "01 / Projects"}
        </p>
        <h1
          className="font-mono font-bold uppercase tracking-tighter leading-[0.9] text-white text-5xl md:text-6xl lg:text-7xl"
          data-blueprint="atom:page-title"
          data-blueprint-id="projects-title"
          data-blueprint-logic="Static heading — bilingual, font-mono bold clamp"
        >
          {isES ? <>TRABAJO<br />ENVIADO_</> : <>SHIPPED<br />WORK_</>}
        </h1>
        <p className="font-mono text-[10px] text-white/70 uppercase tracking-[0.2em] mt-6">
          {filteredProjects.length} / {PROJECTS.length} {isES ? "proyectos · solo y en equipo" : "projects · solo & team"}
        </p>
        <p className="font-mono text-xs text-white/80 mt-8 max-w-2xl">
          {isES
            ? "Un portafolio enfocado en ingeniería práctica: proyectos reales, restricciones reales y resultados reales. Cada solución se adapta al contexto, los tradeoffs y el compromiso con código claro y mantenible."
            : "A portfolio focused on practical engineering—real projects, real constraints, and real results. Every solution is shaped by context, tradeoffs, and a commitment to clear, maintainable code."
          }
        </p>
      </section>

            {/* Tech Filter */}
            <div className="bg-white border-b-4 border-ink px-8 md:px-14 py-8">
              <div className="flex items-center justify-between gap-4 mb-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink/70">
                  {isES ? "Filtrar por tecnología:" : "Filter by technology:"}
                </p>
                {selectedTechs.size > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-[9px] font-mono uppercase tracking-wider text-accent hover:underline transition-colors inline-flex items-center gap-1"
                  >
                    <X size={12} />
                    {isES ? "Borrar" : "Clear"}
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {allTechs.map(tech => (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`font-mono text-[9px] uppercase tracking-wider px-3 py-1.5 border-2 transition-all ${
                      selectedTechs.has(tech)
                        ? "bg-accent text-white border-accent cursor-pointer"
                        : "border-ink/20 text-ink/70 hover:border-ink/40 cursor-pointer"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div
              className="bg-white"
              data-blueprint="molecule:projects-grid"
              data-blueprint-id="projects-grid"
              data-blueprint-logic="PROJECTS[] → project card grid, 2 cols md+"
            >
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 border-b-4 border-ink">
                  {filteredProjects.map((project, i) => {
                    const isLastRow = i >= filteredProjects.length - (filteredProjects.length % 2 === 0 ? 2 : 1);
                    const isRightCol = i % 2 !== 0;

                    return (
                      <div
                        key={project.id}
                        className={[
                          "flex flex-col p-8 md:p-10 border-ink min-h-[540px]",
                          !isLastRow ? "border-b-2" : "",
                          !isRightCol ? "md:border-r-2" : "",
                        ].join(" ")}
                        data-blueprint="molecule:project-card"
                        data-blueprint-id={`project-${project.id}`}
                        data-blueprint-logic="projectService.calculateRelevance → relevanceScore"
                      >
                        {/* Number + year */}
                        <div className="flex items-center justify-between mb-6">
                          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/70">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink/70">
                            {project.year}
                          </span>
                        </div>

                        {/* Title + links */}
                        <div className="flex justify-between items-start gap-3 mb-4">
                          <h2
                            className="font-mono font-bold uppercase tracking-tighter text-ink leading-[0.9] text-xl md:text-2xl lg:text-3xl"
                          >
                            {project.title}
                          </h2>
                          <div className="flex gap-3 items-center shrink-0 pt-1">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="text-ink/70 hover:text-ink transition-colors"
                              >
                                <Github size={18} />
                              </a>
                            )}
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Live"
                                className="text-ink/70 hover:text-ink transition-colors"
                              >
                                <ExternalLink size={16} />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Role badge */}
                        <div className="mb-5">
                          <span
                            className="font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 border"
                            style={
                              project.teamRole !== "solo"
                                ? { backgroundColor: APPLE_BLUE, borderColor: APPLE_BLUE, color: "#fff" }
                                : { borderColor: `${INK}33`, color: `${INK}66` }
                            }
                          >
                            {project.teamRole === "solo" ? t.tagSolo : t.tagTeam}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="font-mono text-xs text-ink/70 leading-relaxed flex-grow mb-6">
                          {isES ? (project.description_es || project.description) : project.description}
                        </p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.techStack.map(tech => (
                            <button
                              key={tech}
                              onClick={() => toggleTech(tech)}
                              className={`font-mono text-[9px] border px-2 py-1 uppercase tracking-wider transition-all cursor-pointer ${
                                selectedTechs.has(tech)
                                  ? "bg-accent text-white border-accent"
                                  : "border-ink/15 text-ink/70 hover:border-ink"
                              }`}
                            >
                              {tech}
                            </button>
                          ))}
                        </div>

                        {/* README button */}
                        {project.readme && (
                          <Link
                            to={`/projects/${project.id}`}
                            className="brutalist-button w-full flex items-center justify-center gap-2 text-xs"
                            data-blueprint="atom:readme-btn"
                            data-blueprint-id={`readme-btn-${project.id}`}
                            data-blueprint-logic="Link → /projects/:id"
                          >
                            <FileText size={10} />
                            {isES ? "Ver README" : "Read README"}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center py-20 px-8">
                  <p className="font-mono text-sm text-ink/50 text-center">
                    {isES ? "No hay proyectos con esas tecnologías." : "No projects with those technologies."}
                  </p>
                </div>
              )}
            </div>
    </div>
  );
};
