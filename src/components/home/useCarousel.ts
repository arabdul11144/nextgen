import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Native scroll-snap carousel controller — shared across carousels.
 * Gives free touch/swipe dragging; arrows/dots drive it on desktop.
 */
export function useCarousel(count: number) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [maxIndex, setMaxIndex] = useState(Math.max(0, count - 1));

  /* Width of a single slide (card + gap), read from the first child */
  const step = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;
    const first = viewport.querySelector<HTMLElement>(":scope > *");
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(viewport).columnGap) || 0;
    return first.offsetWidth + gap;
  }, []);

  /* Recompute the last reachable index whenever the viewport resizes */
  useEffect(() => {
    const compute = () => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const s = step();
      if (!s) return;
      const perView = Math.max(1, Math.round(viewport.clientWidth / s));
      setMaxIndex(Math.max(0, count - perView));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [count, step]);

  /* Track scroll position so the active index matches the visible card */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const onScroll = () => {
      const s = step();
      if (!s) return;
      setActive(Math.min(maxIndex, Math.round(viewport.scrollLeft / s)));
    };
    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", onScroll);
  }, [maxIndex, step]);

  const goTo = useCallback(
    (index: number) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const clamped = Math.min(maxIndex, Math.max(0, index));
      viewport.scrollTo({ left: clamped * step(), behavior: "smooth" });
    },
    [maxIndex, step],
  );

  return {
    viewportRef,
    active,
    maxIndex,
    canPrev: active > 0,
    canNext: active < maxIndex,
    goTo,
  };
}
