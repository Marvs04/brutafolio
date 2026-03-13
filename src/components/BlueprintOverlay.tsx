import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBlueprintNodes, type BlueprintNode } from "../hooks/useBlueprintNodes";

// ─── Design tokens ──────────────────────────────────────────────────────────
const C = {
  boundary:    "#E879F9",
  boundaryDim: "rgba(232, 121, 249, 0.38)",
  boundaryBg:  "rgba(232, 121, 249, 0.02)",
  padding:     "rgba(34, 211, 238, 0.07)",
  paddingLine: "rgba(34, 211, 238, 0.5)",
  gap:         "rgba(251, 146, 60, 0.07)",
  tooltipBg:   "#0e0e0e",
  tooltipText: "#E4E3E0",
  muted:       "rgba(228, 227, 224, 0.42)",
  logic:       "#F27D26",
  cyan:        "#22D3EE",
  orange:      "rgb(251, 146, 60)",
  // Interactive element tokens (buttons, links, inputs)
  interact:    "#34D399",
  interactDim: "rgba(52, 211, 153, 0.38)",
  interactBg:  "rgba(52, 211, 153, 0.03)",
  danger:      "#FF5555",
} as const;

const FONT = "JetBrains Mono, Consolas, ui-monospace, monospace";

// Short display names for auto-discovered interactive nodes
const INTERACT_LABEL: Record<string, string> = {
  button: "btn", a: "link", input: "input", select: "select", textarea: "area",
};

// ─── Helpers ────────────────────────────────────────────────────────────────
const px = (n: number) => `${Math.round(n)}px`;

function padSummary(p: BlueprintNode["padding"]): string {
  // Collapse uniform padding: "16px" vs "8px 16px ↑8↓4←16→16"
  if (p.top === p.right && p.right === p.bottom && p.bottom === p.left) {
    return px(p.top);
  }
  if (p.top === p.bottom && p.left === p.right) {
    return `${px(p.top)} ${px(p.left)}`;
  }
  return `↑${px(p.top)} →${px(p.right)} ↓${px(p.bottom)} ←${px(p.left)}`;
}

// ─── Tooltip ────────────────────────────────────────────────────────────────
const TOOLTIP_W = 340;
const TOOLTIP_H = 380; // conservative max height
const TIP_OFFSET = 16;

function Tooltip({ node, mouseX, mouseY }: { node: BlueprintNode; mouseX: number; mouseY: number }) {
  const {
    type, instanceId, logic, tagName, interactive,
    label, disabled, href, inputType,
    rect, padding, gap, font, bgColor, textColor,
  } = node;
  const totalPad = padding.top + padding.right + padding.bottom + padding.left;
  const tier = type.split(":")[0] ?? "";
  const tierColor =
    tier === "organism"    ? C.logic :
    tier === "molecule"    ? C.cyan  :
    tier === "interactive" ? C.interact : C.muted;
  const accentColor = interactive ? C.interact : C.boundary;

  // Anchor to cursor; flip left/up when near viewport edges
  const flipX = mouseX + TIP_OFFSET + TOOLTIP_W > window.innerWidth;
  const flipY = mouseY + TIP_OFFSET + TOOLTIP_H > window.innerHeight;
  const left = flipX
    ? Math.max(8, mouseX - TIP_OFFSET - TOOLTIP_W)
    : Math.min(mouseX + TIP_OFFSET, window.innerWidth - TOOLTIP_W - 8);
  const top = flipY
    ? Math.max(8, mouseY - TIP_OFFSET - TOOLTIP_H)
    : Math.min(mouseY + TIP_OFFSET, window.innerHeight - TOOLTIP_H - 8);

  return (
    <div
      style={{
        position: "fixed",
        top,
        left,
        zIndex: 10200,
        backgroundColor: C.tooltipBg,
        border: `2px solid ${accentColor}`,
        color: C.tooltipText,
        fontFamily: FONT,
        fontSize: "10px",
        padding: "12px 16px",
        width: `${TOOLTIP_W}px`,
        pointerEvents: "none",
        lineHeight: "1.75",
        boxShadow: `0 0 0 1px ${accentColor}, 4px 4px 12px rgba(0,0,0,0.6)`,
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Identity */}
      <TooltipRow label="component" value={type} valueColor={accentColor} bold />
      <TooltipRow label="element"   value={`<${tagName}>`} valueColor={C.muted} />
      <TooltipRow label="tier"      value={tier} valueColor={tierColor} />
      {instanceId && <TooltipRow label="id" value={instanceId} />}
      {logic && <TooltipRow label="logic" value={logic} valueColor={C.logic} />}

      <TooltipDivider />

      {/* Position & size */}
      <TooltipRow label="position" value={`x ${Math.round(rect.left)}  y ${Math.round(rect.top)}`} />
      <TooltipRow label="size"     value={`${px(rect.width)} × ${px(rect.height)}`} />
      {totalPad > 0 && <TooltipRow label="padding" value={padSummary(padding)} valueColor={C.cyan} />}
      {gap > 0     && <TooltipRow label="gap"     value={px(gap)}              valueColor={C.orange} />}

      <TooltipDivider />

      {/* Typography */}
      <TooltipRow label="font-size"   value={font.size} />
      <TooltipRow label="font-weight" value={font.weight} />
      <TooltipRow label="line-height" value={font.lineHeight} />
      <TooltipRow label="font-family" value={font.family} />

      <TooltipDivider />

      {/* Colour */}
      <TooltipRow label="color"      value={textColor} />
      <TooltipRow label="background" value={bgColor} />

      {/* Interactive element info */}
      {interactive && (
        <>
          <TooltipDivider />
          {label && <TooltipRow label="label"    value={label} valueColor={C.interact} />}
          {inputType && <TooltipRow label="input type" value={inputType} />}
          {href && (
            <TooltipRow
              label="href"
              value={href.length > 42 ? href.slice(0, 42) + "…" : href}
              valueColor={C.cyan}
            />
          )}
          <TooltipRow
            label="disabled"
            value={disabled ? "yes" : "no"}
            valueColor={disabled ? C.danger : C.muted}
          />
          <div style={{ marginTop: "6px", fontSize: "9px", color: C.interact, opacity: 0.7 }}>
            ↳ clicks pass through — fully interactive
          </div>
        </>
      )}
    </div>
  );
}

function TooltipRow({
  label, value, valueColor, bold,
}: {
  label: string;
  value: string;
  valueColor?: string;
  bold?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
      <span style={{ color: C.muted, minWidth: "84px", flexShrink: 0, fontSize: "9px" }}>
        {label}:
      </span>
      <span style={{
        color: valueColor ?? C.tooltipText,
        fontWeight: bold ? "bold" : "normal",
        wordBreak: "break-all",
      }}>
        {value}
      </span>
    </div>
  );
}

function TooltipDivider() {
  return (
    <div style={{ margin: "6px 0", borderTop: "1px solid rgba(255,255,255,0.07)" }} />
  );
}

// ─── Touch device detection ─────────────────────────────────────────────────
const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

// ─── Mobile inspect panel ─────────────────────────────────────────────────────────────────────────
function MobileInspectPanel({ node, onDismiss }: { node: BlueprintNode; onDismiss: () => void }) {
  const { type, instanceId, logic, tagName, interactive, rect, font } = node;
  const accentColor = interactive ? C.interact : C.boundary;
  const tier = type.split(":")[0] ?? "";
  return (
    <motion.div
      data-mobile-panel=""
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 36 }}
      style={{
        position: "fixed",
        bottom: 40,
        left: 8,
        right: 8,
        zIndex: 10150,
        backgroundColor: C.tooltipBg,
        border: `1px solid ${accentColor}`,
        color: C.tooltipText,
        fontFamily: FONT,
        fontSize: "11px",
        padding: "12px 16px",
        lineHeight: "1.75",
        boxShadow: `3px 3px 0 ${accentColor}`,
        pointerEvents: "auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ color: accentColor, fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.07em", fontSize: "10px" }}>
          {type}
        </span>
        <button
          onClick={onDismiss}
          style={{
            background: "none",
            border: "none",
            color: C.muted,
            cursor: "pointer",
            fontFamily: FONT,
            fontSize: "16px",
            padding: "0 4px",
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>
      <TooltipRow label="element" value={`<${tagName}>`} valueColor={C.muted} />
      <TooltipRow label="tier"    value={tier} />
      {instanceId && <TooltipRow label="id"    value={instanceId} />}
      {logic      && <TooltipRow label="logic" value={logic} valueColor={C.logic} />}
      <TooltipDivider />
      <TooltipRow label="size"      value={`${Math.round(rect.width)} × ${Math.round(rect.height)}px`} />
      <TooltipRow label="font-size" value={font.size} />
    </motion.div>
  );
}

// ─── Status bar ────────────────────────────────────────────────────────────────────────
function StatusBar() {
  return (
    <motion.div
      initial={{ y: 32 }}
      animate={{ y: 0 }}
      exit={{ y: 32 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10002,
        backgroundColor: C.boundary,
        color: "#fff",
        fontFamily: FONT,
        fontSize: "10px",
        padding: "5px 20px",
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
      }}
    >
      <span>⬡ Blueprint Mode</span>
      {isTouchDevice ? (
        <>
          <span style={{ opacity: 0.75 }}>Tap any component to inspect</span>
          <span style={{ opacity: 0.75 }}>Tap the blueprint button in the header to exit</span>
        </>
      ) : (
        <>
          <span style={{ opacity: 0.75 }}>Hover any component to inspect</span>
          <span style={{ opacity: 0.75 }}>
            Press{" "}
            <kbd style={{
              border: "1px solid rgba(255,255,255,0.5)",
              borderRadius: "2px",
              padding: "0 4px",
              fontFamily: "inherit",
            }}>
              B
            </kbd>
            {" "}to exit
          </span>
        </>
      )}
    </motion.div>
  );
}

// ─── Main overlay ────────────────────────────────────────────────────────────
interface Props {
  active: boolean;
  /** When a modal overlay is open, suspend node outlines so they don't render on top */
  suspended?: boolean;
}

export const BlueprintOverlay: React.FC<Props> = ({ active, suspended = false }) => {
  // Always scan while active; filter by visibility when a modal is open
  const allNodes = useBlueprintNodes(active);
  const nodes = suspended ? allNodes.filter(n => n.insideModal) : allNodes;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const hoveredNode = nodes.find(n => n.id === hoveredId);
  const nodesRef = useRef(nodes);
  nodesRef.current = nodes;

  // Hover detection via window mousemove — keeps node divs pointer-events:none
  // so scroll events pass through to the underlying modal content.
  // Pick the smallest-area (most specific) node under the cursor.
  useEffect(() => {
    if (!active || isTouchDevice) return;
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
      const hit = nodesRef.current
        .filter(n =>
          e.clientX >= n.rect.left && e.clientX <= n.rect.left + n.rect.width &&
          e.clientY >= n.rect.top  && e.clientY <= n.rect.top  + n.rect.height
        )
        .reduce<import("../hooks/useBlueprintNodes").BlueprintNode | null>((best, n) => {
          if (!best) return n;
          return n.rect.width * n.rect.height < best.rect.width * best.rect.height ? n : best;
        }, null);
      setHoveredId(hit ? hit.id : null);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [active]);

  // Tap detection — mobile only. Pick smallest node under the finger.
  useEffect(() => {
    if (!active || !isTouchDevice) return;
    const onTouch = (e: TouchEvent) => {
      // Ignore taps on the inspect panel so reading it doesn’t re-trigger selection
      if ((e.target as HTMLElement | null)?.closest("[data-mobile-panel]")) return;
      const touch = e.changedTouches[0];
      if (!touch) return;
      const hit = nodesRef.current
        .filter(n =>
          touch.clientX >= n.rect.left && touch.clientX <= n.rect.left + n.rect.width &&
          touch.clientY >= n.rect.top  && touch.clientY <= n.rect.top  + n.rect.height
        )
        .reduce<BlueprintNode | null>((best, n) => {
          if (!best) return n;
          return n.rect.width * n.rect.height < best.rect.width * best.rect.height ? n : best;
        }, null);
      setHoveredId(hit ? hit.id : null);
    };
    window.addEventListener("touchend", onTouch);
    return () => window.removeEventListener("touchend", onTouch);
  }, [active]);

  if (!active) return null;

  return (
    <>
      {/* Node outline layer */}
      {(
        <div style={{ position: "fixed", inset: 0, zIndex: suspended ? 10100 : 9999, pointerEvents: "none" }}>
        {nodes.map(node => {
          const hovered = hoveredId === node.id;
          const totalPad =
            node.padding.top + node.padding.right + node.padding.bottom + node.padding.left;

          // Label: flip inside the element when it's near the top of the viewport
          const labelInside = node.rect.top < 18;
          // Badge: only on hovered; flip inside when near viewport bottom
          const badgeNearBottom = node.rect.top + node.rect.height > window.innerHeight - 20;
          // Auto-discovered interactive nodes hide their chip until hovered (avoids header clutter)
          const isAutoInteractive = node.type.startsWith("interactive:");
          const chipLabel = isAutoInteractive
            ? (INTERACT_LABEL[node.tagName] ?? node.tagName)
            : node.type;

          return (
            <div
              key={node.id}
              style={{
                position: "fixed",
                top: node.rect.top,
                left: node.rect.left,
                width: node.rect.width,
                height: node.rect.height,
                pointerEvents: "none",
                outline: hovered
                  ? `2px solid ${node.interactive ? C.interact : C.boundary}`
                  : `1px solid ${node.interactive ? C.interactDim : C.boundaryDim}`,
                backgroundColor: node.gap > 0 ? C.gap : node.interactive ? C.interactBg : C.boundaryBg,
                transition: "outline 0.08s, background-color 0.08s",
                overflow: "visible",
              }}
            >
              {/* Component type label chip — hidden for auto-interactive unless hovered;
                  on touch: shown only when this node is the currently-tapped one */}
              {(isTouchDevice ? hovered : (!isAutoInteractive || hovered)) && (
                <span
                  style={{
                    position: "absolute",
                    top: labelInside ? 2 : -1,
                    left: labelInside ? 2 : -1,
                    backgroundColor: hovered
                      ? (node.interactive ? C.interact : C.boundary)
                      : (node.interactive ? "rgba(52,211,153,0.72)" : "rgba(232,121,249,0.72)"),
                    color: "#fff",
                    fontSize: "8.5px",
                    fontFamily: FONT,
                    padding: "1px 5px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    lineHeight: "14px",
                    pointerEvents: "none",
                    zIndex: 1,
                    transition: "background-color 0.08s",
                  }}
                >
                  {chipLabel}
                </span>
              )}

              {/* Padding inset marker */}
              {totalPad > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: node.padding.top,
                    right: node.padding.right,
                    bottom: node.padding.bottom,
                    left: node.padding.left,
                    backgroundColor: C.padding,
                    outline: `1px dashed ${C.paddingLine}`,
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Dimension badge — shown on hovered node (desktop hover or mobile tap) */}
              {hovered && (
                <div
                  style={{
                    position: "absolute",
                    bottom: badgeNearBottom ? 2 : -1,
                    left: "50%",
                    transform: badgeNearBottom
                      ? "translateX(-50%)"
                      : "translateX(-50%) translateY(100%)",
                    backgroundColor: node.interactive ? C.interact : C.boundary,
                    color: "#fff",
                    fontSize: "8.5px",
                    fontFamily: FONT,
                    padding: "0 6px",
                    whiteSpace: "nowrap",
                    lineHeight: "16px",
                    pointerEvents: "none",
                    zIndex: 2,
                    letterSpacing: "0.04em",
                  }}
                >
                  {Math.round(node.rect.width)} × {Math.round(node.rect.height)}
                </div>
              )}
            </div>
          );
        })}
        </div>
      )}

      {/* Tooltip — follows cursor, desktop only */}
      {!isTouchDevice && hoveredNode && <Tooltip node={hoveredNode} mouseX={mouse.x} mouseY={mouse.y} />}

      {/* Mobile inspect panel — slides up from bottom on tap */}
      <AnimatePresence>
        {isTouchDevice && hoveredNode && (
          <MobileInspectPanel node={hoveredNode} onDismiss={() => setHoveredId(null)} />
        )}
      </AnimatePresence>

      {/* Status bar — always visible while blueprint is active */}
      <StatusBar />
    </>
  );
};
