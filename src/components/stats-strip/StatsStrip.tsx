"use client";

import { useEffect, useRef, useState } from "react";
import { fireBurst } from "@/lib/burst";
import styles from "./StatsStrip.module.css";

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  /** Category accent color for this stat */
  accent: string;
}

interface StatsStripProps {
  items: StatItem[];
}

/**
 * Large count-up stats. When each counter finishes it fires a
 * small one-time particle burst from its number — a single
 * celebratory beat, not a repeating effect.
 */
export function StatsStrip({ items }: StatsStripProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [started, setStarted] = useState(false);
  const [display, setDisplay] = useState<number[]>(items.map(() => 0));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const duration = 1700;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(items.map((item) => Math.round(eased * item.value)));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        /* One-time celebratory beat as each counter lands */
        numberRefs.current.forEach((el) => {
          if (el) fireBurst(el, { count: 10, radius: 42 });
        });
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, items]);

  return (
    <div ref={sectionRef} className={styles.row}>
      {items.map((item, i) => (
        <div key={item.label} className={styles.item}>
          <span
            ref={(el) => {
              numberRefs.current[i] = el;
            }}
            className={styles.number}
            style={{ color: item.accent }}
          >
            {display[i]}
            <span className={styles.suffix}>{item.suffix}</span>
          </span>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}