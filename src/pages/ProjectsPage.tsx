import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Github, FileText } from "lucide-react";
import { PROJECTS } from "../constants";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";
import { TECHS } from "../components/TechMosaic";

const INK = "#1D1D1F";
const APPLE_BLUE = "#007AFF";

// --- TechStackLogos: Group tech stack by type and show logos ---
const TECH_GROUPS = [
  { label: "Frontend", techs: ["React", "Next.js", "TypeScript", "JavaScript", "Astro", "HTML5", "CSS3", "Tailwind CSS", "MUI"] },
  { label: "Backend", techs: ["Express", "Supabase", "PostgreSQL", "Strapi 5"] },
  { label: "Infra/DevOps", techs: ["Docker", "Azure", "GitHub Actions"] },
  { label: "Testing", techs: ["Vitest"] },
  { label: "Other", techs: ["Vite", "Motion 12", "jsPDF", "Recharts", "Pandas", "Streamlit", "Google Maps"] },
];

interface TechStackLogosProps {
  techStack: string[];
}

const TechStackLogos: React.FC<TechStackLogosProps> = ({ techStack }) => {
  const grouped = TECH_GROUPS.map(group => ({
    label: group.label,
    techs: techStack.filter(tech => group.techs.some(t => tech.startsWith(t))),
  })).filter(g => g.techs.length > 0);
  const matched = new Set(grouped.flatMap(g => g.techs));
  const unmatched = techStack.filter(t => !matched.has(t));
  if (unmatched.length > 0) {
    const otherIdx = grouped.findIndex(g => g.label === "Other");
    if (otherIdx >= 0) grouped[otherIdx].techs.push(...unmatched);
    else grouped.push({ label: "Other", techs: unmatched });
  }
  return (
    <div className="flex flex-col gap-2" role="list" aria-label="Technology stack by section">
      {grouped.map(group => (
        <div key={group.label} className="flex items-center gap-2 flex-wrap" role="group" aria-label={group.label}>
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink/70 min-w-[70px]" style={{letterSpacing: '0.12em'}}>{group.label}:</span>
          {group.techs.map(tech => (
            <span
              key={tech}
              role="listitem"
              className="px-2 py-1 rounded bg-white border border-ink/15 text-[11px] font-mono uppercase tracking-wider shadow-sm text-ink/90"
              style={{
                minWidth: 90,
                fontWeight: 500,
                letterSpacing: '0.12em',
                background: '#F8FAFC',
                borderColor: '#E5E7EB',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export const ProjectsPage: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const isES = lang === "es";

  // --- No filter state, just show all projects ---
  const filteredProjects = PROJECTS;

  return (
    <div className="w-full" data-blueprint="organism:projects-page" data-blueprint-id="projects-page" data-blueprint-logic="ProjectsPage with tech icons">
      {/* Page header */}
      <section className="border-b-4 border-ink px-8 md:px-14 py-12 md:py-16" style={{ backgroundColor: "#060606" }} data-blueprint="organism:page-header" data-blueprint-id="projects-page-header" data-blueprint-logic="Static page identity — dark header strip">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white mb-4">
          {isES ? "01 / Proyectos" : "01 / Projects"}
        </p>
        <h1 className="font-mono font-bold uppercase tracking-tighter leading-[0.9] text-white text-5xl md:text-6xl lg:text-7xl">
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

      {/* Tech Icon Group (like front page) */}
      <div className="flex flex-wrap gap-4 justify-center items-center py-8 border-b-4 border-ink bg-white">
        {TECHS.map(({ name, color, icon: Icon }) => (
          <div key={name} className="flex flex-col items-center gap-1" title={name} style={{ minWidth: 64 }}>
            <span className="rounded-full p-2 border border-ink/10" style={{ background: color + '22' }}>
              <Icon className="w-7 h-7" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-ink/80 text-center" style={{ maxWidth: 64, overflow: 'hidden', textOverflow: 'ellipsis' }}>{name.replace(" CSS", "")}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="bg-white" data-blueprint="molecule:projects-grid" data-blueprint-id="projects-grid" data-blueprint-logic="PROJECTS[] → project card grid, 2 cols md+">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 border-b-4 border-ink">
            {filteredProjects.map((project, i) => {
              const isLastRow = i >= filteredProjects.length - (filteredProjects.length % 2 === 0 ? 2 : 1);
              const isRightCol = i % 2 !== 0;
              return (
                <section
                  key={project.id}
                  className={["flex flex-col p-8 md:p-10 border-ink min-h-[540px]", !isLastRow ? "border-b-2" : "", !isRightCol ? "md:border-r-2" : ""].join(" ")}
                  data-blueprint="molecule:project-card"
                  data-blueprint-id={`project-${project.id}`}
                  data-blueprint-logic="projectService.calculateRelevance → relevanceScore"
                  aria-labelledby={`project-title-${project.id}`}
                >
                  <header className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink">
                      {project.year}
                    </span>
                  </header>
                  <div className="flex justify-between items-start gap-3 mb-4">
                    <h2
                      id={`project-title-${project.id}`}
                      className="font-mono font-bold uppercase tracking-tighter text-ink leading-[0.9] text-xl md:text-2xl lg:text-3xl"
                    >
                      {project.title}
                    </h2>
                    <div className="flex gap-3 items-center shrink-0 pt-1">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-ink/70 hover:text-ink transition-colors">
                          <Github size={18} />
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="Live" className="text-ink/70 hover:text-ink transition-colors">
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="mb-5">
                    <span className={`font-mono text-xs uppercase tracking-[0.2em] px-2 py-1 border ${project.teamRole !== "solo" ? "bg-accent border-accent text-white" : "border-ink text-ink"}`}>
                      {project.teamRole === "solo" ? t.tagSolo : t.tagTeam}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-ink/80 leading-relaxed flex-grow mb-6" style={{lineHeight:1.6}}>
                    {isES ? (project.description_es || project.description) : project.description}
                  </p>
                  <div className="mb-6">
                    <TechStackLogos techStack={project.techStack} />
                  </div>
                  {project.readme && (
                    <Link to={`/projects/${project.id}`} className="brutalist-button w-full flex items-center justify-center gap-2 text-xs">
                      <FileText size={10} />
                      {isES ? "Ver README" : "Read README"}
                    </Link>
                  )}
                </section>
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
