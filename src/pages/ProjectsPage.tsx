import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Github, FileText } from "lucide-react";
import { PROJECTS } from "../constants";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

const INK        = "#1D1D1F";
const APPLE_BLUE = "#007AFF";

export const ProjectsPage: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const isES = lang === "es";
  return (
    <div
      className="w-full"
      data-blueprint="organism:projects-page"
      data-blueprint-id="projects-page"
      data-blueprint-logic="ProjectsPage — PROJECTS[] grid, README buttons navigate to /projects/:id"
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
                className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25 mb-4"
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
              <p className="font-mono text-[10px] text-white/25 uppercase tracking-[0.2em] mt-6">
                {PROJECTS.length} {isES ? "proyectos · solo y en equipo" : "projects · solo & team"}
              </p>
            </section>

            {/* Grid */}
            <div
              className="bg-white"
              data-blueprint="molecule:projects-grid"
              data-blueprint-id="projects-grid"
              data-blueprint-logic="PROJECTS[] → project card grid, 2 cols md+"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 border-b-4 border-ink">
                {PROJECTS.map((project, i) => {
                  const isLastRow =
                    i >= PROJECTS.length - (PROJECTS.length % 2 === 0 ? 2 : 1);
                  const isRightCol = i % 2 !== 0;

                  return (
                    <div
                      key={project.id}
                      className={[
                        "flex flex-col p-8 md:p-10 border-ink",
                        !isLastRow ? "border-b-2" : "",
                        !isRightCol ? "md:border-r-2" : "",
                      ].join(" ")}
                      data-blueprint="molecule:project-card"
                      data-blueprint-id={`project-${project.id}`}
                      data-blueprint-logic="projectService.calculateRelevance → relevanceScore"
                    >
                      {/* Number + year */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/20">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink/20">
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
                              className="text-ink/25 hover:text-ink transition-colors"
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
                              className="text-ink/25 hover:text-ink transition-colors"
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
                      <p className="font-mono text-xs text-ink/50 leading-relaxed flex-grow mb-6">
                        {isES ? (project.description_es || project.description) : project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.techStack.map(tech => (
                          <span
                            key={tech}
                            className="font-mono text-[9px] border border-ink/15 px-2 py-1 uppercase tracking-wider text-ink/35"
                          >
                            {tech}
                          </span>
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
            </div>
    </div>
  );
};
