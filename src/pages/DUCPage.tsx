import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Settings2, Cpu, ShieldAlert, Terminal, ChevronDown } from "lucide-react";

import { TabType } from "../types";
import { useConstraints } from "../hooks/useConstraints";
import { cn } from "../lib/utils";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

import { ConstraintPanel } from "../components/ConstraintPanel";
import { ArchitectureVisualizer } from "../components/ArchitectureVisualizer";
import { AppLab } from "../components/AppLab";
import { PhilosophyOverlay } from "../components/PhilosophyOverlay";
import { MethodologyOverlay } from "../components/MethodologyOverlay";

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-3 font-mono text-xs uppercase tracking-tighter transition-all",
        active ? "bg-ink text-paper brutalist-border" : "hover:bg-ink/5"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

export const DUCPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("architecture");
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { lang } = useLanguage();
  const t = translations[lang];
  const isES = lang === "es";

  const { constraints, updateConstraint, riskMode, toggleRiskMode, decisions, projects } =
    useConstraints();

  return (
    <div
      className="flex flex-col flex-grow min-h-0"
      data-blueprint="organism:duc-page"
      data-blueprint-id="duc-page"
      data-blueprint-logic="DUC tool — ConstraintPanel sidebar drives architectureService + projectService; 3 tabs: architecture / lab / philosophy"
    >
      {/* ── Dark identity strip ── */}
      <div
        className="border-b-4 border-ink px-8 md:px-14 py-12 md:py-16 shrink-0"
        style={{ backgroundColor: "#060606" }}
        data-blueprint="organism:page-header"
        data-blueprint-id="duc-page-header"
        data-blueprint-logic="Static page identity — dark header strip"
      >
        <p
          className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/70 mb-4"
          data-blueprint="atom:page-label"
          data-blueprint-id="duc-label"
          data-blueprint-logic="Static breadcrumb"
        >
          03 / D.U.C.
        </p>
        <h1
          className="font-mono font-bold uppercase tracking-tighter leading-[0.9] text-white text-5xl md:text-6xl lg:text-7xl"
          data-blueprint="atom:page-title"
          data-blueprint-id="duc-title"
          data-blueprint-logic="Static heading – bilingual, font-mono bold clamp"
        >
          {isES ? <>DESARROLLADOR<br />BAJO <span style={{ color: "#007AFF" }}>RESTRICCIONES_</span></> : <>DEVELOPER<br />UNDER <span style={{ color: "#007AFF" }}>CONSTRAINTS_</span></>}
        </h1>
        <p
          className="font-mono text-[10px] text-white/70 uppercase tracking-[0.2em] mt-6"
          data-blueprint="atom:page-subtitle"
          data-blueprint-id="duc-subtitle"
          data-blueprint-logic="Static instruction copy — bilingual"
        >
          {isES ? "Ajusta los parámetros para ver arquitectura recomendada" : "Adjust parameters to see recommended architecture"}
        </p>
      </div>

      {/* ── Sidebar + content row ── */}
      <div className="flex flex-col lg:flex-row flex-grow min-h-0">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden w-full flex items-center justify-between px-4 py-3 border-b-2 border-ink bg-white font-mono text-xs uppercase tracking-widest"
        data-blueprint="atom:mobile-sidebar-toggle"
        data-blueprint-id="duc-mobile-toggle"
        data-blueprint-logic="onClick: setSidebarOpen(!sidebarOpen) — mobile only (lg:hidden)"
      >
        <div className="flex items-center gap-2">
          <Settings2 size={14} />
          {t.systemConstraints}
        </div>
        <ChevronDown
          size={14}
          className={cn("transition-transform duration-200", sidebarOpen && "rotate-180")}
        />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "w-full lg:w-72 xl:w-80 shrink-0 bg-white border-ink border-r-2",
          sidebarOpen ? "block border-b-4 p-6" : "hidden lg:block lg:p-8"
        )}
        data-blueprint="organism:sidebar"
        data-blueprint-id="main-sidebar"
        data-blueprint-logic="useConstraints"
      >
        <div className="sticky top-24">
          <div
            className="flex items-center gap-2 mb-8"
            data-blueprint="molecule:sidebar-header"
            data-blueprint-id="duc-sidebar-header"
            data-blueprint-logic="Static label — Settings2 icon + systemConstraints i18n string"
          >
            <Settings2 size={18} />
            <h2 className="font-mono text-xs uppercase tracking-widest font-bold">
              {t.systemConstraints}
            </h2>
          </div>

          <ConstraintPanel constraints={constraints} onUpdate={updateConstraint} />

          <div
            className="mt-12 pt-8 border-t border-ink/10"
            data-blueprint="molecule:risk-mode-section"
            data-blueprint-id="duc-risk-section"
            data-blueprint-logic="riskMode toggle — useConstraints().toggleRiskMode"
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-[10px] font-mono uppercase opacity-50"
                data-blueprint="atom:section-label"
                data-blueprint-id="duc-senior-label"
              >
                {t.seniorTools}
              </span>
            </div>
            <button
              onClick={toggleRiskMode}
              className={cn(
                "brutalist-button w-full flex items-center justify-center gap-2 text-xs",
                riskMode && "bg-danger text-white border-danger"
              )}
              data-blueprint="atom:risk-mode-btn"
              data-blueprint-id="duc-risk-btn"
              data-blueprint-logic="onClick: toggleRiskMode() — bg-danger when riskMode=true"
            >
              <ShieldAlert size={16} />
              {riskMode ? t.disableRiskMode : t.enableRiskMode}
            </button>
            <p
              className="text-[10px] mt-3 opacity-50 italic leading-relaxed"
              data-blueprint="atom:risk-desc"
              data-blueprint-id="duc-risk-desc"
              data-blueprint-logic="Static disclaimer copy — bilingual"
            >
              {t.riskModeDesc}
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <section
        className="flex-grow min-w-0 p-4 md:p-8 lg:p-12 bg-paper"
        data-blueprint="organism:content-area"
        data-blueprint-id="duc-content"
        data-blueprint-logic="Tab panel: architecture | lab; accordions: philosophy, methodology"
      >
        <div className="max-w-5xl mx-auto">
          {/* Tabs */}
          <div
            className="flex flex-wrap gap-4 mb-12"
            data-blueprint="molecule:tab-bar"
            data-blueprint-id="duc-tab-bar"
            data-blueprint-logic="activeTab state: 'architecture' | 'lab' — controls AnimatePresence panel"
          >
            <span data-blueprint="atom:tab-btn" data-blueprint-id="tab-architecture" data-blueprint-logic="onClick: setActiveTab('architecture')">
              <TabButton active={activeTab === "architecture"} onClick={() => setActiveTab("architecture")} icon={<Cpu size={16} />} label={t.tab01} />
            </span>
            <span data-blueprint="atom:tab-btn" data-blueprint-id="tab-lab" data-blueprint-logic="onClick: setActiveTab('lab')">
              <TabButton active={activeTab === "lab"} onClick={() => setActiveTab("lab")} icon={<Terminal size={16} />} label={t.tab02} />
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {activeTab === "architecture" && (
                <ArchitectureVisualizer decisions={decisions} riskMode={riskMode} />
              )}
              {activeTab === "lab" && <AppLab projects={projects} />}
            </motion.div>
          </AnimatePresence>

          {/* Philosophy accordion */}
          <div
            className="mt-16 border-t-2 border-ink"
            data-blueprint="molecule:accordion"
            data-blueprint-id="duc-philosophy-accordion"
            data-blueprint-logic="showPhilosophy state — AnimatePresence reveal of PhilosophyOverlay"
          >
            <button
              onClick={() => setShowPhilosophy(!showPhilosophy)}
              className="w-full flex items-center justify-between py-5 font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors"
              data-blueprint="atom:accordion-trigger"
              data-blueprint-id="philosophy-trigger"
              data-blueprint-logic="onClick: setShowPhilosophy(!showPhilosophy)"
            >
              <span>{t.navPhilosophy}</span>
              <ChevronDown
                size={14}
                className={cn("transition-transform duration-200", showPhilosophy && "rotate-180")}
              />
            </button>
            {showPhilosophy && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="pb-12"
              >
                <PhilosophyOverlay />
              </motion.div>
            )}
          </div>

          {/* Methodology accordion */}
          <div
            className="border-t-2 border-ink"
            data-blueprint="molecule:accordion"
            data-blueprint-id="duc-methodology-accordion"
            data-blueprint-logic="showMethodology state — AnimatePresence reveal of MethodologyOverlay"
          >
            <button
              onClick={() => setShowMethodology(!showMethodology)}
              className="w-full flex items-center justify-between py-5 font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors"
              data-blueprint="atom:accordion-trigger"
              data-blueprint-id="methodology-trigger"
              data-blueprint-logic="onClick: setShowMethodology(!showMethodology)"
            >
              <span>{t.navMethodology}</span>
              <ChevronDown
                size={14}
                className={cn("transition-transform duration-200", showMethodology && "rotate-180")}
              />
            </button>
            {showMethodology && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="pb-12"
              >
                <MethodologyOverlay />
              </motion.div>
            )}
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};
