"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated count-up that triggers once when the returned ref's element
 * scrolls into view. Eases out so numbers "settle" rather than ticking
 * linearly. Respects prefers-reduced-motion (displays target).
 */
export function useCountUp(target: number, { duration = 1200 } = {}) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStarted(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = reduce ? 1 : Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return { value, started, rootRef };
}