"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ABOUT_US_STAT } from "@/data/home-content";
import { Reveal } from "@/components/reveal/Reveal";
import styles from "./AboutUsStat.module.css";

/**
 * Merged "About Us" + "Trusted Partner" section (Section A).
 * Single credibility section across a shared light contour-textured
 * background:
 *   - Left (~45%): narrative half — eyebrow with accent dash, H2
 *     headline, description, and a Signal-Blue "Learn More" pill CTA.
 *   - Right (~55%): stats showcase half — the headline 3216+ inside a
 *     corner-bracket frame that draws itself in before the number counts
 *     up, the "Trusted Partner" sub-heading + sentence, and three
 *     secondary stats that count up in a staggered row.
 * Numbers are config-driven (about-home-content). Reduced-motion shows
 * the targets without animation.
 */

interface CounterArgs {
  target: number;
  suffix?: string;
  duration: number;
  start: boolean;
  startDelay?: number;
  className?: string;
}

function Counter({ target, suffix, duration, start, startDelay = 0, className }: CounterArgs) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const delayT = window.setTimeout(() => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = reduce ? 1 : Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * target));
        if (p < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      window.clearTimeout(delayT);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, target, duration, startDelay]);

  return (
    <span className={className}>
      {value}
      {suffix}
    </span>
  );
}

export function AboutUsStat() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
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
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const c = ABOUT_US_STAT;

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        {/* ── Left: narrative half ── */}
        <Reveal className={styles.left}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDash} aria-hidden="true" />
            {c.eyebrow}
          </p>
          <h2 className={styles.heading}>{c.heading}</h2>
          <p className={styles.paragraph}>{c.paragraph}</p>
          <Link href={c.href} className={styles.cta}>
            {c.cta} <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        {/* ── Right: stats showcase half ── */}
        <Reveal delay={150} className={styles.right}>
          <div className={`${styles.frame} ${started ? styles.frameIn : ""}`}>
            <span className={`${styles.bracket} ${styles.bracketTL}`} aria-hidden="true" />
            <span className={`${styles.bracket} ${styles.bracketTR}`} aria-hidden="true" />
            <span className={`${styles.bracket} ${styles.bracketBL}`} aria-hidden="true" />
            <span className={`${styles.bracket} ${styles.bracketBR}`} aria-hidden="true" />

            <Counter
              target={c.headline.value}
              suffix={c.headline.suffix}
              duration={1800}
              start={started}
              startDelay={620}
              className={styles.headline}
            />
          </div>

          <h3 className={styles.headlineHeading}>{c.headlineHeading}</h3>
          <p className={styles.headlineSub}>{c.headlineSub}</p>

          <div className={styles.statRow}>
            {c.stats.map((stat, i) => (
              <div className={styles.stat} key={stat.label}>
                <Counter
                  target={stat.value}
                  suffix={stat.suffix}
                  duration={1200}
                  start={started}
                  startDelay={700 + i * 150}
                  className={styles.statNum}
                />
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
