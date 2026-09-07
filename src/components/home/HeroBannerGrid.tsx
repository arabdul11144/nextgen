"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./HeroBannerGrid.module.css";
import { HERO_OVERLAYS, HeroInfoStrip, OverlayLayer } from "./HeroOverlay";

/**
 * HeroBannerGrid — full-width rotating hero stage.
 *
 * Replaces the old 4-tile static grid (3 static tiles + 1 rotating slot)
 * with a SINGLE stage that cross-fades through all six banner images one
 * at a time (~4.5s loop, 700ms fade) with a subtle Ken Burns zoom on the
 * active slide only.
 *
 * Controls:
 *  - Hover/focus pauses autoplay; the prev/next arrows + caption fade in.
 *  - Clickable bottom thumbnail rail and dot pagination jump to a slide.
 *  - The active dot carries a "time remaining" progress fill.
 *  - Slide counter (top-left) and a manual play/pause toggle (top-right).
 *  - Keyboard (while the stage itself is focused): ArrowLeft/ArrowRight
 *    switch slides, Space toggles play/pause. Inner buttons keep their
 *    native Space/Enter activation.
 *  - Respects prefers-reduced-motion: autoplay AND the Ken Burns zoom are
 *    disabled entirely, but clicking/keyboard navigation stays fully live.
 */

const SLIDES = [
  { src: "/image/hero/hero111.jpeg" },
  { src: "/image/hero/hero222.jpeg" },
  { src: "/image/hero/hero333.jpeg" },
] as const;

const ROTATE_MS = 4500;
const FADE_MS = 700;

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5z" />
    </svg>
  );
}

function PauseGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <rect x="6" y="4.5" width="4" height="15" rx="1" />
      <rect x="14" y="4.5" width="4" height="15" rx="1" />
    </svg>
  );
}

function ChevronGlyph({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <path d="M15 5l-7 7 7 7" />
      ) : (
        <path d="M9 5l7 7-7 7" />
      )}
    </svg>
  );
}

export function HeroBannerGrid() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const count = SLIDES.length;

  /* Deferred write (setTimeout 0) mirrors the existing pattern in this
     repo to avoid a synchronous setState inside the effect body. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    const t = window.setTimeout(apply, 0);
    mq.addEventListener("change", apply);
    return () => {
      window.clearTimeout(t);
      mq.removeEventListener("change", apply);
    };
  }, []);

  const autoplayOn = !paused && !hovering && !reduced;

  useEffect(() => {
    if (!autoplayOn) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [autoplayOn, count, epoch]);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
      setEpoch((e) => e + 1);
    },
    [count],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === " ") {
      e.preventDefault();
      setPaused((p) => !p);
    }
  };

  return (
    <>
      <section className={styles.section}>
      <div
        className={styles.stage}
        style={{ "--rot": `${ROTATE_MS}ms`, "--fade": `${FADE_MS}ms` } as React.CSSProperties}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured banner carousel"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {SLIDES.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            aria-hidden={i !== index}
            className={i === index ? styles.slideActive : styles.slide}
          />
        ))}

        {/* Per-slide promotional overlays (text, icons, CTA, bottom strips) */}
        {HERO_OVERLAYS.map((Overlay, i) => (
          <OverlayLayer key={`overlay-${i}`} active={i === index}>
            <Overlay />
          </OverlayLayer>
        ))}

        {/* Visually-hidden live region announcing slide changes */}
        <p className={styles.srOnly} aria-live="polite">
          {`Showing banner ${index + 1} of ${count}`}
        </p>

        <span className={styles.counter} aria-hidden="true">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>

        <button
          type="button"
          className={styles.playToggle}
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play automatic rotation" : "Pause automatic rotation"}
          title={paused ? "Play" : "Pause"}
        >
          {paused ? <PlayGlyph /> : <PauseGlyph />}
        </button>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => goTo(index - 1)}
          aria-label="Previous banner"
        >
          <ChevronGlyph direction="left" />
        </button>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => goTo(index + 1)}
          aria-label="Next banner"
        >
          <ChevronGlyph direction="right" />
        </button>

        <div className={styles.dots} role="group" aria-label="Choose banner">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              className={`${styles.dot}${i === index ? ` ${styles.dotActive}` : ""}`}
              aria-label={`Go to banner ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
            >
              {i === index && (
                <span
                  key={`${index}-${autoplayOn}`}
                  className={autoplayOn ? styles.dotFill : styles.dotFillIdle}
                />
              )}
            </button>
          ))}
        </div>

        <div className={styles.thumbRail} role="group" aria-label="Choose banner thumbnail">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              className={`${styles.thumb}${i === index ? ` ${styles.thumbActive}` : ""}`}
              aria-label={`Go to banner ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
            >
              <Image src={slide.src} alt="" fill sizes="64px" />
            </button>
          ))}
        </div>
      </div>
    </section>

    {/* Info band for the active slide — rendered outside the hero so it never covers it */}
    <HeroInfoStrip slideIndex={index} />

    {/* PNG-flag tri-colour stripe running directly below the hero */}
    <div className={styles.flagStripe} aria-hidden="true">
      <span className={`${styles.flagStripeSeg} ${styles.flagStripeBlack}`} />
      <span className={`${styles.flagStripeSeg} ${styles.flagStripeRed}`} />
      <span className={`${styles.flagStripeSeg} ${styles.flagStripeYellow}`} />
    </div>
    </>
  );
}