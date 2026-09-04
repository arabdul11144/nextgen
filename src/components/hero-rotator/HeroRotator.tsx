"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./HeroRotator.module.css";

interface HeroRotatorProps {
  /** Ordered list of public image URLs to cycle through */
  images: string[];
  /** Pause (ms) each image is held before advancing */
  pauseMs: number;
  /** Anchor/direction of the slide (entry feels natural from this side) */
  side?: "left" | "right";
  /** Descriptive alt base for each image */
  altBase?: string;
  /** Delay (ms) before the first advance, used to stagger left/right */
  initialDelayMs?: number;
}

interface Frame {
  current: number;
  prev: number | null;
}

export function HeroRotator({
  images,
  pauseMs,
  side = "left",
  altBase = "NextGen team member",
  initialDelayMs = 0,
}: HeroRotatorProps) {
  const [frame, setFrame] = useState<Frame>({ current: 0, prev: null });
  const intervalRef = useRef<number | null>(null);

  const count = images.length;

  useEffect(() => {
    if (count < 2) return;
    const delay = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        setFrame((f) => {
          const next = (f.current + 1) % count;
          return { current: next, prev: f.current };
        });
      }, pauseMs);
    }, initialDelayMs);

    return () => {
      window.clearTimeout(delay);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [count, pauseMs, initialDelayMs]);

  const sideClass = styles[side] ? styles[side] : "";
  if (count === 0) return null;
  if (count === 1) {
    return (
      <div className={`${styles.slot} ${sideClass}`}>
        <Image
          src={images[0]}
          alt={`${altBase} ${1}`}
          fill
          sizes="(max-width: 1024px) 0px, 24vw"
          className={styles.staticImage}
          priority
        />
      </div>
    );
  }

  return (
    <div className={`${styles.slot} ${sideClass}`}>
      {images.map((src, i) => {
        const entering = i === frame.current;
        const leaving = i === frame.prev;
        const isFirst = i === 0;
        const stateClass = entering
          ? styles.enter
          : leaving
            ? styles.leave
            : "";
        return (
          <div key={src} className={`${styles.stage} ${stateClass}`}>
            <Image
              src={src}
              alt={`${altBase} ${i + 1}`}
              fill
              sizes="(max-width: 1024px) 0px, 24vw"
              className={styles.image}
              priority={isFirst}
              loading={isFirst ? "eager" : "lazy"}
            />
          </div>
        );
      })}
    </div>
  );
}
