/* ============================================================
   Particle burst — radiating celebration from a button/element.
   Respects prefers-reduced-motion (no-op when set).
   ============================================================ */

const DEFAULT_COLORS = ["#ff5a1f", "#f5b700", "#0e7c7b", "#a63d62", "#ffffff"];

interface BurstOptions {
  /** Number of particles */
  count?: number;
  /** Particle colors (cycled) */
  colors?: string[];
  /** Travel radius in px */
  radius?: number;
}

export function fireBurst(
  el: HTMLElement,
  opts: BurstOptions = {},
): void {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const count = opts.count ?? 18;
  const colors = opts.colors ?? DEFAULT_COLORS;
  const radius = opts.radius ?? 70;

  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  Object.assign(layer.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "9999",
  } as CSSStyleDeclaration);
  document.body.appendChild(layer);

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    const size = 4 + Math.random() * 5;
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = radius * (0.5 + Math.random() * 0.7);
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 12;

    Object.assign(p.style, {
      position: "fixed",
      left: `${cx}px`,
      top: `${cy}px`,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      background: colors[i % colors.length],
      willChange: "transform, opacity",
    } as CSSStyleDeclaration);
    layer.appendChild(p);

    p.animate(
      [
        { transform: "translate(-50%, -50%)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`,
          opacity: 0,
        },
      ],
      {
        duration: 620 + Math.random() * 320,
        easing: "cubic-bezier(.22,.61,.36,1)",
        fill: "forwards",
      },
    );
  }

  window.setTimeout(() => layer.remove(), 1050);
}