"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Reveal.module.css";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay (ms) within a group */
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Scroll reveal — fades/slides content into place the first time
 * it enters the viewport. One-shot per element. The delay prop
 * staggers members of a card group.
 */
export function Reveal({ children, delay = 0, className = "", style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${shown ? styles.shown : ""} ${className}`.trim()}
      style={{
        ...(delay ? { transitionDelay: `${delay}ms` } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}