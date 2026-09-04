"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./HeroBannerGrid.module.css";

/**
 * HeroBannerGrid — full-width hero band.
 * Top two tiles (hero1/hero2, 3:2) + bottom-left (hero3, 2:1) are
 * static; the bottom-right slot auto-rotates through
 * hero4 → hero44 → hero444. Tiles sit sharp-cornered (no radius)
 * and fill their grid cell edge to edge.
 */

const ROTATION = [
  { src: "/image/hero/hero4.png", alt: "NextGen branded workwear range" },
  { src: "/image/hero/hero44.png", alt: "Custom sublimation apparel collection" },
  { src: "/image/hero/hero444.jpeg", alt: "Professional uniform finishing" },
];

const ROTATE_MS = 3000;
const FADE_MS = 600;

/** Cross-fading rotator for the bottom-right slot. */
function SlottedRotator({
  className,
  intervalMs,
  fadeMs,
}: {
  className?: string;
  intervalMs: number;
  fadeMs: number;
}) {
  const [index, setIndex] = useState(0);
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

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ROTATION.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [enabled, intervalMs]);

  return (
    <div className={className}>
      {ROTATION.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          className={`${styles.frame} ${i === index ? styles.isActive : styles.isFaded}`}
          style={{ transitionDuration: `${fadeMs}ms` }}
        />
      ))}
    </div>
  );
}

/** Single static image tile. */
function Tile({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 900px) 100vw, 50vw"
        className={styles.frameStatic}
      />
    </div>
  );
}

export function HeroBannerGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <Tile src="/image/hero/hero1.png" alt="NextGen workforce in branded hi-vis workwear" className={styles.topLeft} priority />
        <Tile src="/image/hero/hero2.png" alt="Uniforms tailored for PNG industry teams" className={styles.topRight} />
        <Tile src="/image/hero/hero3.png" alt="Safety and protective workwear for the field" className={styles.bottomLeft} />
        <SlottedRotator className={styles.bottomRight} intervalMs={ROTATE_MS} fadeMs={FADE_MS} />
      </div>
    </section>
  );
}