import React from "react";
import { ArchitectureDecision } from "../types";
import { motion } from "motion/react";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { cn } from "../lib/utils";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

interface Props {
  decisions: ArchitectureDecision[];
  riskMode: boolean;
}

export const ArchitectureVisualizer: React.FC<Props> = ({ decisions, riskMode }) => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <div
      className="space-y-6"
      data-blueprint="organism:arch-visualizer"
      data-blueprint-id="arch-visualizer"
      data-blueprint-logic="architectureService.getDecisions"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-mono font-bold uppercase tracking-tighter" style={{ fontSize: "clamp(1.2rem,2.5vw,1.8rem)" }}>{t.systemBlueprint}</h2>
        {riskMode && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-danger font-mono text-[10px] uppercase tracking-tighter"
          >
            <AlertTriangle size={14} />
            {t.riskExposureActive}
          </motion.div>
        )}
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        data-blueprint="molecule:decision-grid"
        data-blueprint-id="decision-grid"
        data-blueprint-logic="2-col grid — architectureService.getDecisions(constraints) output"
      >
        {decisions.map((decision, idx) => {
          const category = lang === "es" ? (decision.category_es || decision.category) : decision.category;
          const rationale = lang === "es" ? (decision.rationale_es || decision.rationale) : decision.rationale;
          const tradeoffs = lang === "es" ? (decision.tradeOffs_es || decision.tradeOffs) : decision.tradeOffs;

          return (
            <motion.div
              key={decision.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              data-blueprint="molecule:decision-card"
              data-blueprint-id={`card-${decision.category.toLowerCase().replace(/[\s/]+/g, "-")}`}
              data-blueprint-logic="riskMode && riskLevel==='high' → danger border+shadow; else default brutalist-card"
              className={cn(
                "brutalist-card relative overflow-hidden",
                riskMode && decision.riskLevel === "high" && "border-danger shadow-[4px_4px_0px_0px_rgba(255,68,68,1)]"
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono uppercase opacity-50">{category}</span>
                {decision.riskLevel === "low" ? (
                  <CheckCircle2 size={16} className="text-emerald-500" />
                ) : (
                  <Info size={16} className="text-blue-500" />
                )}
              </div>
              
              <h3 className="font-mono font-bold uppercase tracking-tighter mb-2" style={{ fontSize: "clamp(1rem,2vw,1.25rem)" }}>{decision.choice}</h3>
              <p className="text-sm opacity-70 mb-4 leading-relaxed">{rationale}</p>
              
              <div className="space-y-2">
                <span className="text-[9px] font-mono uppercase tracking-widest block opacity-40">{t.tradeOffs}</span>
                <ul className="text-[11px] space-y-1">
                  {tradeoffs.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-ink rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {riskMode && decision.riskLevel !== "low" && (
                <div className="mt-4 pt-4 border-t border-dashed border-ink/20">
                  <span className="text-[9px] font-mono uppercase tracking-widest block text-danger mb-1">{t.riskAssessment}</span>
                  <p className="text-[10px] italic">
                    {decision.riskLevel === "high" ? t.riskHigh : t.riskMedium}
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
