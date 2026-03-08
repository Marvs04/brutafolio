import React from "react";
import { Project } from "../types";
import { motion } from "motion/react";
import { Beaker, Construction, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import { cn } from "../lib/utils";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

interface Props {
  projects: Project[];
}

export const AppLab: React.FC<Props> = ({ projects }) => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <div
      className="space-y-12"
      data-blueprint="organism:app-lab"
      data-blueprint-id="app-lab"
      data-blueprint-logic="Renders project cards from projectService.calculateRelevance — status: WIP | SHIPPED"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-mono font-bold uppercase tracking-tighter leading-none mb-2" style={{ fontSize: "clamp(1.5rem,3vw,2.4rem)" }}>{t.appLabTitle}</h2>
          <p className="text-[9px] font-mono opacity-40 uppercase tracking-[0.3em]">{t.appLabSubtitle}</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-[10px] font-mono opacity-50">
            <Construction size={12} className="text-accent" /> {t.statusWip}
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono opacity-50">
            <CheckCircle2 size={12} className="text-emerald-500" /> {t.statusShipped}
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        data-blueprint="molecule:project-grid"
        data-blueprint-id="project-grid"
        data-blueprint-logic="3-col grid — projects[] from props (sorted by relevance score)"
      >
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            data-blueprint="molecule:project-card"
            data-blueprint-id={`project-${project.id}`}
            data-blueprint-logic="projectService.calculateRelevance"
            className={cn(
              "brutalist-card group flex flex-col h-full",
              project.status === "WIP" ? "border-dashed" : "border-solid"
            )}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={cn(
                "w-10 h-10 brutalist-border flex items-center justify-center",
                project.status === "WIP" ? "bg-accent/10 text-accent" : "bg-emerald-500/10 text-emerald-500"
              )}>
                {project.status === "WIP" ? <Construction size={20} /> : <Beaker size={20} />}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono opacity-40 uppercase tracking-widest">
                  {project.year} · {project.teamRole === "solo" ? t.tagSolo : t.tagTeam}
                </span>
                <span className={cn(
                  "text-[9px] font-mono px-2 py-1 brutalist-border uppercase tracking-tighter",
                  project.status === "WIP" ? "bg-accent text-white" : "bg-emerald-500 text-white"
                )}>
                  {project.status === "WIP" ? t.statusWip : t.statusShipped}
                </span>
              </div>
            </div>

            <div className="flex-grow space-y-4">
              <h3 className="font-mono font-bold tracking-tighter uppercase" style={{ fontSize: "clamp(1.1rem,2vw,1.5rem)" }}>{project.title}</h3>
              
              <div className="space-y-2">
                <span className="text-[9px] font-mono uppercase opacity-40 block">{t.labelProblem}</span>
                <p className="text-sm leading-relaxed italic">
                  "{lang === "es" ? (project.problem_es || project.problem) : project.problem}"
                </p>
              </div>

              {project.currentChallenge && (
                <div className="space-y-2">
                  <span className="text-[9px] font-mono uppercase opacity-40 block">{t.labelChallenge}</span>
                  <div className="flex gap-2 items-start text-xs bg-ink/5 p-3 brutalist-border border-dashed">
                    <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-accent" />
                    <p>{lang === "es" ? (project.currentChallenge_es || project.currentChallenge) : project.currentChallenge}</p>
                  </div>
                </div>
              )}

              {project.lessonLearned && (
                <div className="space-y-2">
                  <span className="text-[9px] font-mono uppercase opacity-40 block">{t.labelInsight}</span>
                  <div className="flex gap-2 items-start text-xs bg-emerald-500/5 p-3 brutalist-border border-emerald-500/20">
                    <Lightbulb size={14} className="flex-shrink-0 mt-0.5 text-emerald-500" />
                    <p className="opacity-80">{lang === "es" ? (project.lessonLearned_es || project.lessonLearned) : project.lessonLearned}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-ink/10 flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span key={tech} className="text-[9px] font-mono bg-ink text-paper px-2 py-0.5 uppercase">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
