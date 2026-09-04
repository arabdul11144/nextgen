"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { DISTRIBUTOR_BAND } from "@/data/home-content";
import styles from "./DistributorBand.module.css";

/**
 * Section B — full-bleed "Find a Distributor" banner.
 * Background photo with a translucent scrim, centred brand-blue pin icon +
 * heading + paragraph (on a low-opacity blue colour band) + pill CTA.
 * Subtle parallax on desktop only (skipped for reduced motion / touch).
 */
export function DistributorBand() {
  const c = DISTRIBUTOR_BAND;
  const imgRef = useRef<HTMLImageElement>(null);

  /* Light parallax — mutate transform directly (no re-render), so it
     stays lint-clean and is skipped for reduced-motion / narrow widths. */
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 900px)").matches;
    if (reduce || narrow) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const vh = window.innerHeight;
      const off = (rect.top + rect.height / 2 - vh / 2) / vh;
      const shift = off * -36;
      el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0) scale(1.12)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.media} aria-hidden="true">
        <Image
          ref={imgRef}
          src={c.image}
          alt=""
          fill
          sizes="100vw"
          className={styles.photo}
        />
        <span className={styles.scrim} />
      </div>

      <div className={styles.content}>
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.6" />
          </svg>
        </span>

        <h2 className={styles.heading}>{c.heading}</h2>

        <p className={styles.band}>{c.paragraph}</p>

        <Link href={c.href} className={styles.cta}>
          {c.cta} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
