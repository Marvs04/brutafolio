import React from "react";
import { Target, Zap, ShieldCheck } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

export const PhilosophyOverlay: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <div className="space-y-12" data-blueprint="organism:philosophy-panel" data-blueprint-id="philosophy-panel" data-blueprint-logic="Rendered inside DUCPage accordion — showPhilosophy state">
      <header>
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent mb-4 block">{t.philosophyTag}</span>
        <h2 className="font-mono font-bold tracking-tighter uppercase leading-[0.85] text-2xl md:text-3xl lg:text-5xl">
          {t.philosophyTitle.split("\n").map((line, i) => (
            <React.Fragment key={i}>{line}{i < 2 && <br />}</React.Fragment>
          ))}
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12" data-blueprint="molecule:philosophy-grid" data-blueprint-id="philosophy-grid" data-blueprint-logic="2-col: bio copy left, 3 philosophy pillars right — static from translations">
        <div className="space-y-6">
          <p className="font-mono text-sm leading-relaxed text-ink/60">{t.philosophyQuote}</p>
          <p className="opacity-70 leading-relaxed">{t.philosophyBody}</p>
        </div>
        <div className="space-y-8">
          <div className="flex gap-4">
            <Target className="flex-shrink-0 text-accent w-5 h-5 md:w-6 md:h-6" />
            <div>
              <h4 className="font-mono font-bold uppercase text-[11px] tracking-[0.15em] mb-1">{t.philosophyP1Title}</h4>
              <p className="font-mono text-[10px] opacity-50 leading-relaxed">{t.philosophyP1Desc}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Zap className="flex-shrink-0 text-accent w-5 h-5 md:w-6 md:h-6" />
            <div>
              <h4 className="font-mono font-bold uppercase text-[11px] tracking-[0.15em] mb-1">{t.philosophyP2Title}</h4>
              <p className="font-mono text-[10px] opacity-50 leading-relaxed">{t.philosophyP2Desc}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <ShieldCheck className="flex-shrink-0 text-accent w-5 h-5 md:w-6 md:h-6" />
            <div>
              <h4 className="font-mono font-bold uppercase text-[11px] tracking-[0.15em] mb-1">{t.philosophyP3Title}</h4>
              <p className="font-mono text-[10px] opacity-50 leading-relaxed">{t.philosophyP3Desc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-ink/10">
        <div className="font-mono text-[10px] uppercase tracking-widest opacity-40">{t.philosophyVersion}</div>
      </div>
    </div>
  );
};
