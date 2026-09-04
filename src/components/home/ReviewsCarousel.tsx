"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { REVIEWS_PLACEHOLDER } from "@/data/home-content";
import { useCarousel } from "./useCarousel";
import { useCountUp } from "@/lib/useCountUp";
import { Reveal } from "@/components/reveal/Reveal";
import styles from "./ReviewsCarousel.module.css";

const CARD_ACCENTS = ["#155eef", "#10b981", "#f5a623"];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ReviewsCarousel() {
  const { viewportRef, active, maxIndex, canPrev, canNext, goTo } =
    useCarousel(REVIEWS_PLACEHOLDER.items.length);
  const pausedRef = useRef(false);
  const [auto, setAuto] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Aggregated score number — count toward 5, but display 4.x */
  const { value, rootRef: scoreRef } = useCountUp(
    REVIEWS_PLACEHOLDER.summary.score * 10,
  );

  /* Trigger count-up + star fill as the rating card scrolls in */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      goTo(active >= maxIndex ? 0 : active + 1);
    }, 4200);
    return () => window.clearInterval(id);
  }, [active, maxIndex, auto, goTo]);

  const score = (value / 10).toFixed(1);
  const fullStars = REVIEWS_PLACEHOLDER.summary.score; // 4.8 → stars animate in

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div ref={sectionRef} className={styles.head}>
          <div>
            <p className="ng-eyebrow" style={{ color: "var(--ng-accent-teal)" }}>
              The Record So Far
            </p>
            <h2 className={styles.title}>What teams say about working with us</h2>
            <p className={styles.sub}>
              Real feedback from the organisations we equip — sourced and verified.
            </p>
          </div>
          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => goTo(active - 1)}
              disabled={!canPrev}
              aria-label="Previous reviews"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => goTo(active + 1)}
              disabled={!canNext}
              aria-label="Next reviews"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={styles.rail}
          onMouseEnter={() => {
            pausedRef.current = true;
            setAuto(false);
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
            setAuto(true);
          }}
        >
          {/* Fixed rating summary card */}
          <Reveal className={styles.summaryWrap}>
            <div className={styles.summary}>
              <span className={styles.scoreRow}>
                <span ref={scoreRef} className={styles.score}>{score}</span>
                <span className={styles.scoreMeta}>
                  <span className={styles.stars} aria-label="Rating out of 5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg
                        key={i}
                        viewBox="0 0 24 24"
                        className={`${styles.star} ${revealed ? styles.starIn : ""} ${i <= Math.floor(fullStars) ? styles.starFull : styles.starPartial}`}
                        style={{ transitionDelay: revealed ? `${i * 90}ms` : undefined }}
                        aria-hidden="true"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </span>
                  <span className={styles.summaryText}>
                    {REVIEWS_PLACEHOLDER.summary.countText}
                  </span>
                </span>
              </span>

              {/* Source logo slot — wire to a real review platform badge later */}
              <span className={styles.sourceHints}>
                <span className={styles.sourceLabel}>Verified source</span>
                <span className={styles.sourceBadges}>
                  <span className={styles.sourceBadge}>Google</span>
                  <span className={styles.sourceBadge}>Trustpilot</span>
                </span>
              </span>

              <Link href="/portfolio" className={styles.seeAll}>
                See all reviews <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>

          {/* Review cards */}
          <div
            ref={viewportRef}
            className={styles.viewport}
            role="region"
            aria-label="Customer reviews"
          >
            {REVIEWS_PLACEHOLDER.items.map((review, i) => {
              const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
              return (
                <Reveal key={review.name} delay={i * 100} className={styles.cardSlot}>
                  <article
                    className={styles.card}
                    style={{ "--card-accent": accent } as React.CSSProperties}
                  >
                    <span
                      className={styles.accentBar}
                      style={{ background: accent }}
                      aria-hidden="true"
                    />
                    <span
                      className={styles.quoteMark}
                      style={{ color: accent }}
                      aria-hidden="true"
                    >
                      &ldquo;
                    </span>
                    <p className={styles.quote}>{review.quote}</p>
                    <footer className={styles.cardFoot}>
                      <span
                        className={styles.avatar}
                        style={{ background: accent }}
                        aria-hidden="true"
                      >
                        {initials(review.name)}
                      </span>
                      <span className={styles.cardMeta}>
                        <strong className={styles.name}>{review.name}</strong>
                        <span className={styles.company}>{review.company}</span>
                      </span>
                    </footer>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Thin progress-line indicator */}
        <div className={styles.progressTrack} role="tablist" aria-label="Review positions">
          {REVIEWS_PLACEHOLDER.items.map((review, i) => (
            <button
              key={review.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to review ${i + 1}`}
              className={`${styles.progress} ${i === active ? styles.progressActive : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
