"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Industry } from "@/data/industries";
import { GENERIC_IMAGE } from "@/data/images";
import styles from "./IndustriesCarousel.module.css";

/** Descriptive alt text describing what each industry photo will show */
const ALT_BY_SLUG: Record<string, string> = {
  mining: "Miner in high-visibility protective workwear at a resource site",
  construction: "Construction crew in branded hi-vis apparel on site",
  "logistics-transport": "Warehouse worker in durable branded workwear",
  "energy-utilities": "Field technician in safety apparel at a utility site",
  "hospitality-tourism": "Hotel staff in coordinated front-of-house uniforms",
  "agriculture-fisheries": "Agricultural worker in practical outdoor workwear",
  healthcare: "Healthcare professional in clinical scrubs",
  education: "Students in school uniforms on campus",
  corporate: "Office team in tailored corporate uniforms",
  security: "Security officer in a clearly identified uniform",
  sports: "Athletes in custom sublimated teamwear",
};

interface IndustriesCarouselProps {
  industries: Industry[];
}

/**
 * Draggable/swipeable industries carousel — native scroll-snap
 * gives free touch dragging; arrows and dots control it on desktop.
 */
export function IndustriesCarousel({ industries }: IndustriesCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [maxIndex, setMaxIndex] = useState(industries.length - 1);

  const step = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;
    const first = viewport.querySelector<HTMLElement>(":scope > a");
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
      setMaxIndex(Math.max(0, industries.length - perView));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [industries.length, step]);

  /* Track scroll position for the active dot */
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

  const goTo = (index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const clamped = Math.min(maxIndex, Math.max(0, index));
    viewport.scrollTo({ left: clamped * step(), behavior: "smooth" });
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.controls}>
        <span className={styles.counter} aria-hidden="true">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(industries.length).padStart(2, "0")}
        </span>
        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(active - 1)}
            disabled={active <= 0}
            aria-label="Previous industries"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(active + 1)}
            disabled={active >= maxIndex}
            aria-label="Next industries"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div ref={viewportRef} className={styles.viewport}>
        {industries.map((industry, i) => (
          <Link
            key={industry.slug}
            href="/industry"
            className={styles.card}
            aria-label={`${industry.name} — explore how we equip this industry`}
          >
            <span className={styles.imageWrap}>
              <Image
                src={GENERIC_IMAGE}
                alt={ALT_BY_SLUG[industry.slug] ?? `${industry.name} team in branded workwear`}
                fill
                sizes="(max-width: 600px) 82vw, (max-width: 900px) 46vw, 24vw"
                className={styles.image}
              />
              <span className={styles.scrim} aria-hidden="true" />
              <span className={styles.index} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            </span>
            <span className={styles.cardBody}>
              <span className={styles.name}>{industry.name}</span>
              <span className={styles.desc}>{industry.description}</span>
              <span className={styles.cardLink}>
                Explore <span aria-hidden="true">→</span>
              </span>
            </span>
          </Link>
        ))}
      </div>

      <div className={styles.dots} role="tablist" aria-label="Industry positions">
        {industries.map((industry, i) => (
          <button
            key={industry.slug}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to ${industry.name}`}
            className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}