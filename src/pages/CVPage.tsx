import React from "react";
import { Download } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

const INK        = "#1D1D1F";
const APPLE_BLUE = "#007AFF";
const PAPER      = "#F5F5F7";

const STACK = [
  "React", "TypeScript", "JavaScript", "Next.js", "HTML5", "CSS3",
  "Supabase", "Express",
  "Python", "Pandas", "Streamlit", "Astro", "Tailwind",
  "Strapi", "PostgreSQL", "Azure", "Docker", "GitHub",
  "MUI", "Google Maps", "Figma",
];

export const CVPage: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const isES = lang === "es";

  const experiences = [
    { role: t.cvRole1, company: t.cvCompany1, period: t.cvPeriod1, desc: t.cvDesc1 },
    { role: t.cvRole2, company: t.cvCompany2, period: t.cvPeriod2, desc: t.cvDesc2 },
    { role: t.cvRole5, company: t.cvCompany5, period: t.cvPeriod5, desc: t.cvDesc5 },
    { role: t.cvRole3, company: t.cvCompany3, period: t.cvPeriod3, desc: t.cvDesc3 },
    { role: t.cvRole4, company: t.cvCompany4, period: t.cvPeriod4, desc: t.cvDesc4 },
  ];

  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsDownloading(true);
    try {
      const url = isES ? "/cv-es.pdf" : "/cv-en.pdf";
      const res = await fetch(url, { method: "HEAD" });
      if (res.ok && res.headers.get("content-type")?.includes("pdf")) {
        const a = document.createElement("a");
        a.href = url;
        a.download = isES ? "Marvin-Moncada-CV-ES.pdf" : "Marvin-Moncada-CV-EN.pdf";
        a.click();
      } else {
        alert(
          isES
            ? "El PDF aún no está disponible. Por favor vuelve más tarde."
            : "PDF not available yet. Please check back soon."
        );
      }
    } catch (error) {
      console.error("Download failed:", error);
      alert(
        isES
          ? "Error al descargar. Intenta de nuevo."
          : "Download error. Please try again."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="w-full"
      data-blueprint="organism:cv-page"
      data-blueprint-id="cv-page"
      data-blueprint-logic="CVPage — bilingual résumé, static data from translations"
    >

      {/* ── Page header ── */}
      <section
        className="border-b-4 border-ink px-8 md:px-14 py-12 md:py-16"
        style={{ backgroundColor: "#060606" }}
        data-blueprint="organism:page-header"
        data-blueprint-id="cv-page-header"
        data-blueprint-logic="Static page identity — dark header strip"
      >
        <p
          className="font-mono text-xs uppercase tracking-[0.2em] text-white mb-4"
          data-blueprint="atom:page-label"
          data-blueprint-id="cv-label"
          data-blueprint-logic="Static breadcrumb — 02 / CV"
          aria-hidden="true"
        >
          02 / CV
        </p>
        <h1
          className="font-mono font-bold uppercase tracking-tighter leading-[0.9] text-white text-5xl md:text-6xl lg:text-7xl"
          data-blueprint="atom:page-title"
          data-blueprint-id="cv-title"
          data-blueprint-logic="Static heading — MARVIN MONCADA in Apple Blue"
        >
          MARVIN<br />
          <span style={{ color: APPLE_BLUE }}>MONCADA</span>
        </h1>
        <div className="flex flex-wrap items-center gap-6 mt-6">
          <p className="font-mono text-xs text-white uppercase tracking-[0.2em]" aria-hidden="true">
            {isES ? "Desarrollador Junior · Costa Rica · 2026" : "Junior Developer · Costa Rica · 2026"}
          </p>
          <a
            href={isES ? "/cv-es.pdf" : "/cv-en.pdf"}
            download
            onClick={handleDownload}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] border border-white px-4 py-2 text-white hover:text-accent hover:border-accent transition-all"
            data-blueprint="atom:download-btn"
            data-blueprint-id="cv-download-btn"
            data-blueprint-logic="Download PDF — HEAD check before link click"
          >
            <Download size={16} />
            PDF
          </a>
        </div>
      </section>

      {/* ── Content grid ── */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 border-b-4 border-ink"
        data-blueprint="molecule:cv-layout"
        data-blueprint-id="cv-layout"
        data-blueprint-logic="12-col grid: 4 sidebar + 8 timeline"
      >

        {/* ── Sidebar ── */}
        <aside
          className="lg:col-span-4 border-b-2 lg:border-b-0 lg:border-r-2 border-ink"
          style={{ backgroundColor: PAPER }}
          data-blueprint="molecule:cv-sidebar"
          data-blueprint-id="cv-sidebar"
          data-blueprint-logic="Static: stack chips + education + domains"
        >

          {/* Tech Stack */}
          <div
            className="px-8 md:px-10 py-10 border-b-2 border-ink"
            data-blueprint="atom:cv-stack"
            data-blueprint-id="cv-stack"
            data-blueprint-logic="Static STACK[] → chip list — 22 technologies"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink mb-5" aria-hidden="true">
              {t.cvTechStack}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {STACK.map(s => (
                <span
                  key={s}
                  className="font-mono text-xs border border-ink/20 px-2 py-1 uppercase tracking-wider text-ink hover:border-ink hover:text-accent transition-all cursor-default"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div
            className="px-8 md:px-10 py-10 border-b-2 border-ink"
            data-blueprint="atom:cv-education"
            data-blueprint-id="cv-education"
            data-blueprint-logic="Static — degree + university from translations"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink mb-5" aria-hidden="true">
              {t.cvEducation}
            </p>
            <p className="font-mono text-sm font-bold uppercase tracking-tighter text-ink leading-snug">
              {t.cvDegree}
            </p>
            <p className="font-mono text-xs uppercase tracking-wider text-ink mt-1">
              {t.cvUniversity}
            </p>
          </div>

          {/* Domains */}
          <div
            className="px-8 md:px-10 py-10"
            data-blueprint="atom:cv-domains"
            data-blueprint-id="cv-domains"
            data-blueprint-logic="Static [cvDomain1–4] from translations — 4 expertise areas"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink mb-5" aria-hidden="true">
              {t.cvDomains}
            </p>
            <ul className="space-y-3">
              {[t.cvDomain1, t.cvDomain2, t.cvDomain3, t.cvDomain4].map((d, i) => (
                <li
                  key={i}
                  className="font-mono text-xs uppercase tracking-wider text-ink leading-relaxed"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>

        </aside>

        {/* ── Experience timeline ── */}
        <main
          className="lg:col-span-8 bg-white px-8 md:px-12 py-10"
          data-blueprint="molecule:cv-timeline"
          data-blueprint-id="cv-timeline"
          data-blueprint-logic="experiences[] → timeline entries, newest first"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink mb-8" aria-hidden="true">
            {t.cvTrajectory}
          </p>

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="border-b border-ink/10 py-8 last:border-b-0"
                data-blueprint="atom:timeline-entry"
                data-blueprint-id={`timeline-${i}`}
                data-blueprint-logic={`experiences[${i}] — ${exp.company}`}
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-3 mb-3">
                  <h3
                    className="font-mono font-bold uppercase tracking-tighter text-ink leading-none text-lg md:text-xl"
                  >
                    {exp.role}
                  </h3>
                  <span
                    className="font-mono text-xs uppercase tracking-[0.2em] shrink-0 text-accent"
                  >
                    {exp.period}
                  </span>
                </div>
                <p className="font-mono text-xs uppercase tracking-wider text-ink mb-3">
                  {exp.company}
                </p>
                <p className="font-mono text-sm text-ink leading-relaxed max-w-2xl">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Download CTA strip */}
          <div className="mt-8 pt-8 border-t-2 border-ink/10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href={isES ? "/cv-es.pdf" : "/cv-en.pdf"}
              download
              onClick={handleDownload}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] border-2 border-ink px-4 py-2 text-ink hover:bg-ink hover:text-white transition-all"
              style={{ boxShadow: `3px 3px 0px 0px ${APPLE_BLUE}` }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "none")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = `3px 3px 0px 0px ${APPLE_BLUE}`)}
              data-blueprint="atom:download-btn-main"
              data-blueprint-id="cv-download-main"
              data-blueprint-logic="Download PDF — HEAD check before link click"
            >
              <Download size={16} />
              {t.cvDownload}
            </a>
            <p className="font-mono text-xs uppercase tracking-widest text-ink" aria-hidden="true">
              {isES ? "CV completo · 1 página · PDF" : "Full CV · 1 page · PDF"}
            </p>
          </div>
        </main>

      </div>
    </div>
  );
};
