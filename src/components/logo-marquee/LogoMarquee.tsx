"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./LogoMarquee.module.css";

interface LogoMarqueeProps {
  logos: string[];
  altBase?: string;
}

function brandName(src: string): string {
  const file = src.split("/").pop() ?? "";
  return file
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function LogoMarquee({
  logos,
  altBase = "Partner brand",
}: LogoMarqueeProps) {
  const [paused, setPaused] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setEnabled(!mq.matches);
    const t = window.setTimeout(apply, 0);
    mq.addEventListener("change", apply);
    return () => {
      window.clearTimeout(t);
      mq.removeEventListener("change", apply);
    };
  }, []);

  if (!logos.length) return null;

  if (!enabled) {
    return (
      <div className={styles.marqueeStatic}>
        {logos.map((src) => (
          <span key={src} className={styles.chip}>
            <Image
              src={src}
              alt={`${altBase} ${brandName(src)}`}
              width={260}
              height={56}
              className={styles.logo}
              loading="eager"
            />
          </span>
        ))}
      </div>
    );
  }

  /* Double the set — translateX(-50%) lands exactly on a set boundary,
     producing a seamless no-jump loop */
  const doubled = [...logos, ...logos];

  return (
    <div
      className={styles.viewport}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className={`${styles.track} ${paused ? styles.paused : ""}`}
        role="group"
        aria-label="Trusted partner brand logos"
      >
        {doubled.map((src, i) => (
          <span
            key={`${src}-${i}`}
            className={styles.chip}
            style={{ animationDelay: `${(i % logos.length) * 0.15}s` }}
          >
            <Image
              src={src}
              alt={`${altBase} ${brandName(src)}`}
              width={260}
              height={56}
              className={styles.logo}
              loading={i < logos.length ? "eager" : "lazy"}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
