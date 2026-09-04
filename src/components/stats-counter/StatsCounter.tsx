"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

interface StatsCounterProps {
  items: StatItem[];
}

export function StatsCounter({ items }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [display, setDisplay] = useState<number[]>(items.map(() => 0));

  useEffect(() => {
    const el = ref.current;
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
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(items.map((item) => Math.round(eased * item.value)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, items]);

  return (
    <div ref={ref} className="stats-row">
      {items.map((item, i) => (
        <div key={item.label} className="stat-item">
          <span className="stat-number">
            {display[i]}
            <span className="stat-suffix">{item.suffix}</span>
          </span>
          <span className="stat-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
