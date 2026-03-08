import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Terminal, Github, Linkedin, Mail, Menu, X, ScanLine } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";
import { cn } from "../lib/utils";

interface Props {
  children: React.ReactNode;
  blueprintMode: boolean;
  toggleBlueprintMode: () => void;
}

export const MainLayout: React.FC<Props> = ({
  children,
  blueprintMode,
  toggleBlueprintMode,
}) => {
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang];
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NAV_LINKS: { path: string; label: string; delay: number }[] = [
    { path: "/", label: lang === "en" ? "Home" : "Inicio", delay: 0 },
    { path: "/projects", label: t.navProjects, delay: 0.4 },
    { path: "/cv", label: t.navCV, delay: 0.8 },
    { path: "/duc", label: "D.U.C.", delay: 1.2 },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className="border-b-4 border-ink bg-white sticky top-0 z-50"
        {...(isTouchDevice
          ? { "data-blueprint-skip": "" }
          : { "data-blueprint": "organism:header", "data-blueprint-id": "main-header" }
        )}
      >
        <div className="w-full px-4 md:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* Logo mark only — no text */}
          <Link
            to="/"
            aria-label="Home"
            className="group flex items-center gap-0 focus:outline-none"
          >
            <div className="w-9 h-9 bg-ink flex items-center justify-center border-2 border-ink transition-all group-hover:shadow-[3px_3px_0px_0px_#007AFF]">
              <Terminal size={16} className="text-white" />
            </div>
            <div className="w-2.5 h-9 bg-accent border-y-2 border-r-2 border-ink" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ path, label, delay }) => (
              <motion.div key={path}>
                <Link
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "relative text-[10px] font-mono uppercase tracking-widest border-2 border-ink px-4 h-8 transition-all whitespace-nowrap inline-flex items-center justify-center min-w-[5.5rem]",
                    isActive(path)
                      ? "bg-ink text-white shadow-[3px_3px_0px_0px_#007AFF]"
                      : "bg-white text-ink hover:bg-ink hover:text-white hover:shadow-[3px_3px_0px_0px_#1D1D1F]"
                  )}
                >
                  {!isActive(path) && (
                    <motion.span
                      className="absolute inset-0 pointer-events-none"
                      animate={{
                        boxShadow: [
                          "0 0 0 0px rgba(0,122,255,0.55)",
                          "0 0 0 7px rgba(0,122,255,0)",
                        ],
                      }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut", delay }}
                    />
                  )}
                  {label}
                </Link>
              </motion.div>
            ))}

            <div className="h-4 w-px bg-ink/20 mx-1" />

            {/* Blueprint toggle */}
            <button
              onClick={toggleBlueprintMode}
              title="Blueprint X-Ray (B)"
              className={cn(
                "h-8 px-3 border-2 flex items-center justify-center transition-all",
                blueprintMode
                  ? "border-fuchsia-500 bg-fuchsia-500 text-white shadow-[2px_2px_0px_0px_#A21CAF]"
                  : "border-ink bg-white hover:bg-ink hover:text-white"
              )}
            >
              <ScanLine size={13} />
            </button>

            <button
              onClick={toggleLang}
              className="h-8 px-3 border-2 border-ink font-mono text-[10px] uppercase tracking-widest bg-white hover:bg-ink hover:text-white transition-all"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>

            <div className="w-px h-5 bg-ink/20" />

            <div className="flex items-center gap-3">
              <a href="https://github.com/Marvs04" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={18} className="cursor-pointer hover:text-accent" />
              </a>
              <a href="https://linkedin.com/in/marvin-moncada-208033276" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} className="cursor-pointer hover:text-accent" />
              </a>
              <a href="mailto:marvinfrancisco97@gmail.com" aria-label="Email">
                <Mail size={18} className="cursor-pointer hover:text-accent" />
              </a>
            </div>
          </nav>

          {/* Mobile: blueprint + lang + hamburger */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={toggleBlueprintMode}
              data-blueprint-skip
              className={cn(
                "h-8 px-3 border-2 flex items-center justify-center transition-all",
                blueprintMode
                  ? "border-fuchsia-500 bg-fuchsia-500 text-white"
                  : "border-ink bg-white hover:bg-ink hover:text-white"
              )}
            >
              <ScanLine size={14} />
            </button>
            <button
              onClick={toggleLang}
              data-blueprint-skip
              className="h-8 px-3 border-2 border-ink font-mono text-[10px] uppercase bg-white hover:bg-ink hover:text-white transition-all"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-blueprint-skip
              className="w-8 h-8 border-2 border-ink flex items-center justify-center bg-white hover:bg-ink hover:text-white transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t-2 border-ink bg-white">
            <div className="grid grid-cols-4 divide-x divide-ink/20">
              {NAV_LINKS.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "py-4 font-mono text-[10px] uppercase tracking-wider transition-colors text-center block",
                    isActive(path) ? "bg-ink text-paper" : "hover:bg-ink/5"
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="px-6 py-3 border-t border-ink/10 flex items-center gap-5">
              <a href="https://github.com/Marvs04" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={16} className="opacity-50 hover:opacity-100 hover:text-accent transition-all" />
              </a>
              <a href="https://linkedin.com/in/marvin-moncada-208033276" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={16} className="opacity-50 hover:opacity-100 hover:text-accent transition-all" />
              </a>
              <a href="mailto:marvinfrancisco97@gmail.com" aria-label="Email">
                <Mail size={16} className="opacity-50 hover:opacity-100 hover:text-accent transition-all" />
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* Content + Sidebar injected by child pages */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-ink bg-white">
        {/* Accent stripe */}
        <div className="h-1 bg-accent" />
        <div className="px-6 md:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-[10px] font-mono text-ink/40 text-center md:text-left tracking-wider">{t.footer}</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-signal" />
              <span className="text-[10px] font-mono uppercase tracking-widest">System Operational</span>
            </div>
            <span className="text-[10px] font-mono text-ink/30 tracking-wider">14ms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};