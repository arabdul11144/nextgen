"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./BulkCta.module.css";

/* ── Types ── */

type PoolItem = {
  image: string;
  alt: string;
  label: string;
  href: string;
};

interface UniformCollageProps {
  pool: readonly PoolItem[];
}

/* ── Rotation schedule (from the brief) ──
   Security → School → Corporate → Safety → repeat. Accents tie the
   frame glow + label dot to whichever uniform is currently showing. */
const ROTATION = [
  { label: "Security Uniforms", short: "Security", accent: "#0f766e" },
  { label: "School Uniforms", short: "School", accent: "#ffc72c" },
  { label: "Corporate Wear", short: "Corporate", accent: "#215cf6" },
  { label: "Safety & Hi-Vis", short: "Safety", accent: "#ff5a1f" },
] as const;

const AUTO_INTERVAL_MS = 3800;
const SLIDE_PX = 40;

type Frame = PoolItem & { short: string; accent: string };

/* Resolve the four scheduled frames from the pool, falling back to the
   first four pool items if a scheduled label is missing. */
function buildFrames(pool: readonly PoolItem[]): Frame[] {
  return ROTATION.map((r) => {
    const item = pool.find((p) => p.label === r.label);
    const fallback = pool[ROTATION.findIndex((f) => f.label === r.label) % pool.length];
    const chosen = item ?? fallback;
    return { ...chosen, short: r.short, accent: r.accent };
  });
}

function usePrefersReducedMotion(): boolean {
  const mql = useMemo(
    () =>
      typeof window === "undefined"
        ? null
        : window.matchMedia("(prefers-reduced-motion: reduce)"),
    [],
  );

  return useSyncExternalStore(
    (onStoreChange) => {
      if (!mql) return () => undefined;
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    () => mql?.matches ?? false,
    () => false,
  );
}

/**
 * Single-frame uniform carousel — replaces the old 2×2 grid with one
 * compact framed photo that auto-rotates through the category lineup.
 * Cross-fade + small slide, accent-colored glow/border that follows the
 * active category, floating label pill, and pill-dot progress bar.
 */
export function UniformCollage({ pool }: UniformCollageProps) {
  const reducedMotion = usePrefersReducedMotion();
  const frames = useMemo(() => buildFrames(pool), [pool]);

  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [hovered, setHovered] = useState(false);
  const pausedRef = useRef(false);

  const frame = frames[index % frames.length];

  const goTo = useCallback(
    (target: number, direction: number) => {
      setDir(direction);
      setIndex((target + frames.length) % frames.length);
    },
    [frames.length],
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  /* Auto-advance on a fixed cadence; resets whenever the index changes
     (manual controls included) and pauses while hovered/touched. */
  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      goTo(index + 1, 1);
    }, AUTO_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [index, reducedMotion, goTo]);

  const dx = reducedMotion ? 0 : SLIDE_PX;

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? dx : -dx }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -dx : dx }),
  };

  const onEnter = () => {
    pausedRef.current = true;
    setHovered(true);
  };
  const onLeave = () => {
    pausedRef.current = false;
    setHovered(false);
  };

  return (
    <div className={styles.frameWrap}>
      <div
        className={`${styles.frameShell} ${hovered ? styles.hovered : ""}`}
        style={{ "--frame-accent": frame.accent } as React.CSSProperties}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onTouchStart={onEnter}
        onTouchEnd={onLeave}
        onTouchCancel={onLeave}
      >
        {/* Soft accent glow drifting behind the frame */}
        <span
          className={styles.frameGlow}
          style={{ background: `radial-gradient(circle, ${frame.accent}2e, transparent 70%)` }}
          aria-hidden="true"
        />

        {/* The framed photo — border + glow follow the active accent */}
        <div
          className={styles.frame}
          style={
            {
              boxShadow: `0 0 0 1px ${frame.accent}59, 0 0 26px ${frame.accent}33`,
            } as React.CSSProperties
          }
        >
          <div className={styles.stage}>
            {/* Clean, soft studio backdrop behind the garment */}
            <span className={styles.stageBackdrop} aria-hidden="true" />
            <AnimatePresence initial={false} custom={dir}>
              <motion.img
                key={`${index}-${frame.image}`}
                src={frame.image}
                alt={frame.alt}
                className={styles.framePhoto}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ opacity: { duration: 0.5 }, x: { duration: 0.5, ease: "easeInOut" } }}
              />
            </AnimatePresence>
          </div>

          {/* Floating category pill — label announces a beat faster */}
          <span className={styles.frameLabel}>
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={frame.short}
                className={styles.frameLabelRow}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <span className={styles.frameDot} style={{ background: frame.accent }} aria-hidden="true" />
                {frame.short}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        {/* Quiet ghost arrows, visible on hover only */}
        <button
          type="button"
          className={`${styles.frameArrow} ${styles.frameArrowLeft}`}
          onClick={prev}
          aria-label="Previous category"
          tabIndex={hovered ? 0 : -1}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          className={`${styles.frameArrow} ${styles.frameArrowRight}`}
          onClick={next}
          aria-label="Next category"
          tabIndex={hovered ? 0 : -1}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Pill-dot progress — active bar fills over the auto-advance duration */}
      <div className={styles.frameProgress} role="group" aria-label="Uniform categories">
        {frames.map((f, i) => {
          const active = i === index;
          return (
            <button
              key={f.short}
              type="button"
              className={`${styles.pill} ${active ? styles.pillActive : ""}`}
              aria-pressed={active}
              aria-label={`Show ${f.short}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
            >
              {active && <span key={`${index}-fill`} className={styles.pillFill} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}