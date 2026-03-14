import React, { useMemo, useRef, useCallback, createContext, useContext } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import type { Project } from "../types";

// ─── Inline-vs-block code detection via context ──────────────────────────────
const InCodeBlock = createContext(false);

function InlineOrBlockCode({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"code">) {
  const isBlock = useContext(InCodeBlock);
  if (isBlock) {
    return (
      <code className="font-mono" {...props}>
        {children}
      </code>
    );
  }
  return (
    <code
      className="bg-ink/10 font-mono text-[11px] px-1.5 py-0.5 rounded-sm"
      {...props}
    >
      {children}
    </code>
  );
}

// ─── Slug utility ─────────────────────────────────────────────────────────────
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// ─── TOC extraction from raw markdown ────────────────────────────────────────
export function extractTOC(markdown: string): { id: string; text: string }[] {
  return markdown
    .split("\n")
    .filter(line => /^## /.test(line))
    .map(line => {
      const text = line.replace(/^## /, "").trim();
      return { id: slugify(text), text };
    });
}

// ─── Markdown component map — brutalist-styled ────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildComponents(): Record<string, React.ComponentType<any>> {
  return {
    // h1: treated as a document-level label — title is already in the page header
    h1: ({ children }) => (
      <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-ink/70 mb-12 pb-8 border-b-2 border-ink/10">
        {children}
      </p>
    ),
    h2: ({ children }) => {
      const text = React.Children.toArray(children)
        .map(c => (typeof c === "string" ? c : ""))
        .join("");
      const id = slugify(text);
      return (
        <h2
          data-section={id}
          className="font-mono font-bold uppercase tracking-tighter text-base md:text-lg lg:text-xl mt-12 md:mt-16 lg:mt-20 mb-4 md:mb-5 lg:mb-6 pl-4 md:pl-5 lg:pl-6 border-l-3 md:border-l-4 border-accent leading-tight"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => (
      <h3 className="font-mono text-[9px] uppercase tracking-[0.3em] font-bold text-accent mt-8 mb-4">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="font-mono text-xs md:text-sm lg:text-base leading-relaxed md:leading-[1.8] lg:leading-[1.9] text-ink/75 mb-6 md:mb-7">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent bg-accent/[0.08] pl-6 py-5 my-10 space-y-3 italic text-ink/80">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => <ul className="my-6 md:my-7 space-y-2.5 md:space-y-3">{children}</ul>,
    ol: ({ children }) => (
      <ol className="my-6 md:my-7 space-y-2.5 md:space-y-3 list-decimal list-inside font-mono text-xs md:text-sm lg:text-base text-ink/75">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="flex gap-3 md:gap-4 font-mono text-xs md:text-sm lg:text-base text-ink/75 leading-relaxed md:leading-[1.8]">
        <span className="text-accent shrink-0 select-none font-bold text-[10px] md:text-xs mt-0.5">
          →
        </span>
        <span>{children}</span>
      </li>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-accent">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-ink/70 font-semibold">{children}</em>,
    hr: () => <hr className="border-t-2 border-ink/15 my-16" />,
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-2 hover:no-underline break-all"
      >
        {children}
      </a>
    ),
    pre: ({ children }) => (
      <InCodeBlock.Provider value={true}>
        <pre className="bg-ink text-paper font-mono text-[9px] md:text-[10px] lg:text-[11px] p-3 md:p-4 lg:p-5 overflow-x-auto my-6 md:my-8 leading-relaxed border-l-2 md:border-l-4 border-accent">
          {children}
        </pre>
      </InCodeBlock.Provider>
    ),
    code: InlineOrBlockCode,
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b-2 border-ink">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b border-ink/10">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="text-left font-mono text-[8px] md:text-[9px] lg:text-[10px] uppercase tracking-[0.12em] p-2 md:p-3 border border-ink/20 bg-ink/5">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="p-2 md:p-3 border border-ink/10 font-mono text-[9px] md:text-[10px] lg:text-[12px] text-ink/65">{children}</td>
    ),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
interface Props {
  project: Project;
  onBack: () => void;
}

export const ReadmeViewer: React.FC<Props> = ({ project, onBack }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const toc = useMemo(() => extractTOC(project.readme ?? ""), [project.readme]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const components = useMemo(() => buildComponents() as any, []);

  const scrollTo = useCallback((id: string) => {
    const el = contentRef.current?.querySelector(`[data-section="${id}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header nav */}
      <div className="flex items-center gap-4 pb-5 mb-0 border-b-2 border-ink shrink-0 flex-wrap gap-y-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-50 hover:opacity-100 hover:text-accent transition-all shrink-0"
        >
          <ArrowLeft size={14} />
          Projects
        </button>

        <span className="text-ink/70 shrink-0 select-none">|</span>

        <span className="font-bold uppercase tracking-tighter text-xs md:text-sm truncate">
          {project.title}
        </span>

        <div className="ml-auto flex gap-3 items-center shrink-0">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[8px] md:text-[9px] lg:text-[10px] uppercase tracking-[0.15em] border border-ink/30 px-3 py-2 hover:bg-ink hover:text-paper hover:border-ink transition-colors"
            >
              <Github size={14} />
              Source
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[8px] md:text-[9px] lg:text-[10px] uppercase tracking-[0.15em] border border-accent px-3 py-2 text-accent hover:bg-accent hover:text-paper transition-colors"
            >
              <ExternalLink size={14} />
              Live Site
            </a>
          )}
        </div>
      </div>

      {/* Body: TOC sidebar + scrollable content */}
      <div className="flex flex-1 min-h-0 pt-6">

        {/* TOC sidebar — only when there are enough sections */}
        {toc.length > 1 && (
          <nav
            className="hidden lg:flex flex-col w-48 shrink-0 border-r-2 border-ink/10 pr-6 overflow-y-auto"
            aria-label="Table of contents"
          >
            <p className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-ink/70 mb-3 md:mb-4">
              Sections
            </p>
            <ul className="space-y-1">
              {toc.map(({ id, text }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="w-full text-left font-mono text-[8px] md:text-[9px] uppercase tracking-[0.1em] opacity-45 hover:opacity-100 hover:text-accent transition-all py-1 md:py-2 leading-snug"
                  >
                    {text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Markdown content */}
        <div
          ref={contentRef}
          className={`flex-1 overflow-y-auto min-h-0 ${toc.length > 1 ? "lg:pl-8" : ""}`}
        >
          <div className="max-w-2xl pb-12">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={components}
            >
              {project.readme ?? ""}
            </ReactMarkdown>
          </div>
        </div>

      </div>
    </div>
  );
};
