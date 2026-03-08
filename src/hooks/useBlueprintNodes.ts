import { useState, useEffect, useRef, useCallback } from "react";

export interface BlueprintNode {
  /** Unique per scan — auto-incremented so duplicate data-blueprint types don't collide */
  id: string;
  type: string;
  instanceId: string;
  logic?: string;
  tagName: string;
  rect: { top: number; left: number; width: number; height: number };
  padding: { top: number; right: number; bottom: number; left: number };
  gap: number;
  font: { size: string; weight: string; family: string; lineHeight: string };
  bgColor: string;
  textColor: string;
  /** True when this element is a native interactive element (button, a, input, select, textarea) */
  interactive: boolean;
  /** Accessible label: aria-label, title, or trimmed text content */
  label?: string;
  disabled?: boolean;
  /** href attribute value for anchor elements */
  href?: string;
  /** type attribute for input elements */
  inputType?: string;
  /** True when this node is inside a modal overlay (organism:*-overlay) */
  insideModal: boolean;
}

function toPixels(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
}

function collectNodes(): BlueprintNode[] {
  const nodes: BlueprintNode[] = [];
  let idx = 0;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const seen = new Set<Element>();
  const INTERACTIVE = new Set(["button", "a", "input", "select", "textarea"]);

  const push = (el: HTMLElement) => {
    if (seen.has(el)) return;
    seen.add(el);
    if (el.hasAttribute("data-blueprint-skip")) return;

    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return;
    if (rect.bottom < 0 || rect.top > vh || rect.right < 0 || rect.left > vw) return;

    const s = window.getComputedStyle(el);
    const rawGap = s.gap === "normal" ? "0" : s.gap;
    const insideModal = !!el.closest('[data-blueprint$="-overlay"]');
    const tag = el.tagName.toLowerCase();
    const interactive = INTERACTIVE.has(tag);

    const rawLabel =
      el.getAttribute("aria-label") ||
      el.getAttribute("title") ||
      el.textContent?.trim().replace(/\s+/g, " ").slice(0, 60) ||
      undefined;

    nodes.push({
      id: `bp-${idx++}`,
      type: el.getAttribute("data-blueprint") ?? (interactive ? `interactive:${tag}` : `element:${tag}`),
      instanceId: el.getAttribute("data-blueprint-id") ?? "",
      logic: el.getAttribute("data-blueprint-logic") ?? undefined,
      tagName: tag,
      interactive,
      label: rawLabel,
      disabled: (el as HTMLButtonElement).disabled || el.getAttribute("aria-disabled") === "true",
      href: tag === "a" ? (el as HTMLAnchorElement).getAttribute("href") ?? undefined : undefined,
      inputType: tag === "input" ? ((el as HTMLInputElement).type || undefined) : undefined,
      rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      padding: {
        top: toPixels(s.paddingTop),
        right: toPixels(s.paddingRight),
        bottom: toPixels(s.paddingBottom),
        left: toPixels(s.paddingLeft),
      },
      gap: toPixels(rawGap),
      font: {
        size: s.fontSize,
        weight: s.fontWeight,
        family: s.fontFamily.split(",")[0].trim().replace(/["']/g, ""),
        lineHeight: s.lineHeight,
      },
      bgColor: s.backgroundColor,
      textColor: s.color,
      insideModal,
    });
  };

  // Pass 1: all explicitly annotated [data-blueprint] elements
  document.querySelectorAll<HTMLElement>("[data-blueprint]").forEach(push);

  // Pass 2: interactive elements nested inside blueprint containers (deduped via seen Set)
  document.querySelectorAll<HTMLElement>("[data-blueprint]").forEach(container => {
    container
      .querySelectorAll<HTMLElement>("button, a[href], input, select, textarea")
      .forEach(push);
  });

  return nodes;
}

export function useBlueprintNodes(active: boolean): BlueprintNode[] {
  const [nodes, setNodes] = useState<BlueprintNode[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refresh = useCallback(() => setNodes(collectNodes()), []);

  const debouncedRefresh = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(refresh, 40);
  }, [refresh]);

  useEffect(() => {
    if (!active) {
      setNodes([]);
      return;
    }

    refresh();

    // MutationObserver: picks up tab switches, AnimatePresence mounts
    const mutationObserver = new MutationObserver(debouncedRefresh);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // ResizeObserver: picks up element size changes
    const resizeObserver = new ResizeObserver(debouncedRefresh);
    document.querySelectorAll<HTMLElement>("[data-blueprint]").forEach(el =>
      resizeObserver.observe(el)
    );

    // capture:true catches scroll on ANY element (incl. modal inner containers)
    window.addEventListener("scroll", refresh, { passive: true, capture: true });
    window.addEventListener("resize", debouncedRefresh, { passive: true });

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", refresh, { capture: true });
      window.removeEventListener("resize", debouncedRefresh);
    };
  }, [active, refresh, debouncedRefresh]);

  return nodes;
}
