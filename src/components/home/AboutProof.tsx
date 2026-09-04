"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ABOUT } from "@/data/home-content";
import { Reveal } from "@/components/reveal/Reveal";
import styles from "./AboutProof.module.css";

/**
 * About / proof — confident Ink "brand statement" band.
 *  media: autoplaying image-sequence player framed with a
 *         Signal-Blue→Sky gradient border + pill glass controls.
 *  copy:  eyebrow (Amber Gold), story, primary CTA + ghost link.
 */
export function AboutProof() {
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setInterval(() => {
      setFrame((f) => (f + 1) % ABOUT.media.length);
    }, 2800);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [paused]);

  return (
    <section className={styles.section}>
      {/* Subtle animated gradient mesh behind content */}
      <span className={styles.mesh} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* ── Media player (gradient frame + glass controls) ── */}
          <Reveal className={styles.mediaWrap}>
            <div className={styles.player}>
              {ABOUT.media.map((m, i) => (
                <span
                  key={m.src}
                  className={`${styles.frame} ${i === frame ? styles.frameActive : ""}`}
                  aria-hidden={i !== frame}
                >
                  <Image
                    src={m.src}
                    alt={m.alt}
                    fill
                    sizes="(max-width: 900px) 92vw, 55vw"
                    className={styles.frameImg}
                  />
                </span>
              ))}
              <span className={styles.playerScrim} aria-hidden="true" />

              {/* Pill glass control bar */}
              <div className={styles.controls}>
                <div className={styles.controlsBar}>
                  <button
                    type="button"
                    className={styles.control}
                    onClick={() => setPaused((p) => !p)}
                    aria-label={paused ? "Play" : "Pause"}
                  >
                    {paused ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                      </svg>
                    )}
                  </button>
                  <button
                    type="button"
                    className={styles.control}
                    onClick={() => setMuted((m) => !m)}
                    aria-label={muted ? "Unmute" : "Mute"}
                  >
                    {muted ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11 5 6 9H2v6h4l5 4V5z" />
                        <path d="m23 9-6 6M17 9l6 6" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11 5 6 9H2v6h4l5 4V5z" />
                        <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
                      </svg>
                    )}
                  </button>
                  <span className={styles.frameCount} aria-hidden="true">
                    {String(frame + 1).padStart(2, "0")} /{" "}
                    {String(ABOUT.media.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Story ── */}
          <Reveal delay={120} className={styles.copy}>
            <p className="ng-eyebrow" style={{ color: "var(--ng-accent-gold)" }}>
              {ABOUT.eyebrow}
            </p>
            <h2 className={styles.title}>{ABOUT.title}</h2>
            {ABOUT.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className={styles.paragraph}>
                {p}
              </p>
            ))}
            <div className={styles.actions}>
              <Link href={ABOUT.ctaHref} className={styles.cta}>
                {ABOUT.cta}
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/portfolio" className={styles.ghost}>
                View Our Portfolio <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}