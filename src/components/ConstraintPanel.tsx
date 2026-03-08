import React from "react";
import { Constraints, TeamSize, Budget, Scale } from "../types";
import { cn } from "../lib/utils";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

interface Props {
  constraints: Constraints;
  onUpdate: (key: keyof Constraints, value: any) => void;
}

export const ConstraintPanel: React.FC<Props> = ({ constraints, onUpdate }) => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const teamSizeLabel: Record<TeamSize, string> = {
    [TeamSize.SOLO]: t.enumSolo,
    [TeamSize.SMALL]: t.enumSmall,
    [TeamSize.LARGE]: t.enumLarge,
  };
  const budgetLabel: Record<Budget, string> = {
    [Budget.BOOTSTRAPPED]: t.enumBootstrapped,
    [Budget.VENTURE]: t.enumVenture,
    [Budget.ENTERPRISE]: t.enumEnterprise,
  };
  const scaleLabel: Record<Scale, string> = {
    [Scale.MVP]: t.enumMvp,
    [Scale.REGIONAL]: t.enumRegional,
    [Scale.GLOBAL]: t.enumGlobal,
  };

  return (
    <div
      className="space-y-8"
      data-blueprint="organism:constraint-panel"
      data-blueprint-id="constraint-panel"
      data-blueprint-logic="useConstraints"
    >
      <section
        data-blueprint="molecule:form-section"
        data-blueprint-id="section-team-size"
      >
        <label className="text-[10px] uppercase tracking-widest opacity-50 font-mono mb-4 block">{t.c01TeamSize}</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.values(TeamSize).map((size) => (
            <button
              key={size}
              onClick={() => onUpdate("teamSize", size)}
              className={cn(
                "brutalist-button text-xs",
                constraints.teamSize === size && "bg-ink text-paper"
              )}
            >
              {teamSizeLabel[size]}
            </button>
          ))}
        </div>
      </section>

      <section
        data-blueprint="molecule:form-section"
        data-blueprint-id="section-budget"
      >
        <label className="text-[10px] uppercase tracking-widest opacity-50 font-mono mb-4 block">{t.c02Budget}</label>
        <div className="flex flex-col gap-2">
          {Object.values(Budget).map((budget) => (
            <button
              key={budget}
              onClick={() => onUpdate("budget", budget)}
              className={cn(
                "brutalist-button text-xs w-full",
                constraints.budget === budget && "bg-ink text-paper"
              )}
            >
              {budgetLabel[budget]}
            </button>
          ))}
        </div>
      </section>

      <section
        data-blueprint="molecule:form-section"
        data-blueprint-id="section-scale"
      >
        <label className="text-[10px] uppercase tracking-widest opacity-50 font-mono mb-4 block">{t.c03Scale}</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.values(Scale).map((scale) => (
            <button
              key={scale}
              onClick={() => onUpdate("scale", scale)}
              className={cn(
                "brutalist-button text-xs",
                constraints.scale === scale && "bg-ink text-paper"
              )}
            >
              {scaleLabel[scale]}
            </button>
          ))}
        </div>
      </section>

      <section
        data-blueprint="molecule:form-section"
        data-blueprint-id="section-realtime"
      >
        <label className="text-[10px] uppercase tracking-widest opacity-50 font-mono mb-4 block">{t.c04Realtime}</label>
        <button
          onClick={() => onUpdate("realtime", !constraints.realtime)}
          className={cn(
            "brutalist-button w-full text-xs",
            constraints.realtime && "bg-accent text-white border-accent"
          )}
        >
          {constraints.realtime ? t.enabled : t.disabled}
        </button>
      </section>

      <section
        data-blueprint="molecule:form-section"
        data-blueprint-id="section-deadline"
      >
        <label className="text-[10px] uppercase tracking-widest opacity-50 font-mono mb-4 block">{t.c05Deadline}</label>
        <input
          type="range"
          min="1"
          max="12"
          value={constraints.deadline}
          onChange={(e) => onUpdate("deadline", parseInt(e.target.value))}
          className="w-full accent-ink"
        />
        <div className="flex justify-between font-mono text-[10px] mt-2">
          <span>1mo</span>
          <span className="text-accent font-bold">{constraints.deadline}mo</span>
          <span>12mo</span>
        </div>
      </section>
    </div>
  );
};
