import React from "react";
import { GitBranch, Layers, Activity, Database } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

export const MethodologyOverlay: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const steps = [
    { icon: <GitBranch size={24} />, title: t.methodologyStep1Title, desc: t.methodologyStep1Desc },
    { icon: <Layers size={24} />, title: t.methodologyStep2Title, desc: t.methodologyStep2Desc },
    { icon: <Activity size={24} />, title: t.methodologyStep3Title, desc: t.methodologyStep3Desc },
    { icon: <Database size={24} />, title: t.methodologyStep4Title, desc: t.methodologyStep4Desc },
  ];

  return (
    <div className="space-y-16" data-blueprint="organism:methodology-panel" data-blueprint-id="methodology-panel" data-blueprint-logic="Rendered inside DUCPage accordion — showMethodology state">
      <header>
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent mb-4 block">{t.methodologyTag}</span>
        <h2 className="font-mono font-bold tracking-tighter uppercase" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
          {t.methodologyTitle.split("\n").map((line, i) => (
            <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
          ))}
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-blueprint="molecule:methodology-steps" data-blueprint-id="methodology-steps" data-blueprint-logic="4 static steps — bilingual from translations">
        {steps.map((step, i) => (
          <div key={i} className="brutalist-card bg-white group hover:bg-ink hover:text-paper transition-colors">
            <div className="mb-6 text-accent group-hover:text-paper transition-colors">
              {step.icon}
            </div>
            <h3 className="font-mono font-bold uppercase text-[11px] tracking-[0.15em] mb-3">{step.title}</h3>
            <p className="font-mono text-[10px] opacity-50 group-hover:opacity-80 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-ink text-paper p-8 brutalist-border">
        <h4 className="font-mono text-xs uppercase tracking-widest mb-6 text-accent">{t.methodologyMatrixTitle}</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[11px] font-mono opacity-80 uppercase leading-loose">
          <div>
            // IF SCALE == MVP<br />
            // AND REALTIME == FALSE<br />
            // THEN USE ASTRO + TAILWIND<br />
            // ELSE USE REACT + VITE
          </div>
          <div>
            // IF TEAM == SOLO<br />
            // AND BUDGET == BOOTSTRAPPED<br />
            // THEN USE SUPABASE EDGE FN<br />
            // ELSE USE EXPRESS + DOCKER
          </div>
          <div>
            // IF REALTIME == TRUE<br />
            // AND STACK == SUPABASE<br />
            // THEN USE SUPABASE REALTIME<br />
            // ELSE EVALUATE ALTERNATIVES
          </div>
        </div>
      </div>
    </div>
  );
};