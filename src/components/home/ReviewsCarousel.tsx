"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { REVIEWS_PLACEHOLDER } from "@/data/home-content";
import { useCarousel } from "./useCarousel";
import { useCountUp } from "@/lib/useCountUp";
import { Reveal } from "@/components/reveal/Reveal";
import styles from "./ReviewsCarousel.module.css";

const CARD_ACCENTS = ["#215cf6", "#ff5a1f", "#ffc72c"];

/* Gradient stop pairs for avatar circles — one distinct pair per card */
const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #215cf6, #6ea8ff)",
  "linear-gradient(135deg, #ff5a1f, #ffb27a)",
  "linear-gradient(135deg, #ffc72c, #ff8a3d)",
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* Word-by-word "typewriter-lite" reveal for the first testimonial.
   Staggers each word in with a tiny fade/slide when revealed. */
function WordReveal({ quote }: { quote: string }) {
  const words = quote.split(" ");
  return (
    <p className={styles.quote}>
      {words.map((w, i) => (
        <span
          key={`${i}-${w}`}
          className={styles.quoteWord}
          style={{ animationDelay: `${i * 45}ms` }}
        >
          {w}
        </span>
      ))}
    </p>
  );
}

export function ReviewsCarousel() {
  const { viewportRef, active, maxIndex, canPrev, canNext, goTo } =
    useCarousel(REVIEWS_PLACEHOLDER.items.length);
  const pausedRef = useRef(false);
  const [auto, setAuto] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Aggregated score number — count toward 4.8 */
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
    }, 4800);
    return () => window.clearInterval(id);
  }, [active, maxIndex, auto, goTo]);

  const score = (value / 10).toFixed(1);
  const fullStars = REVIEWS_PLACEHOLDER.summary.score;

  return (
    <section className={styles.section}>
      {/* Faint decorative quotation watermark behind the rating panel */}
      <span className={styles.watermark} aria-hidden="true">
        &ldquo;
      </span>
      <div className={styles.inner}>
        <div ref={sectionRef} className={styles.head}>
          <div>
            <Reveal>
              <p className="im-eyebrow">The Record So Far</p>
            </Reveal>
            <Reveal delay={80}>
              <span className={`im-accent-rule im-reveal-rule ${styles.headRule}`} aria-hidden="true" />
            </Reveal>
            <Reveal delay={140}>
              <h2 className={styles.title}>What teams say about working with us</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className={styles.sub}>
                Real feedback from the organisations we equip — sourced and verified.
              </p>
            </Reveal>
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
          {/* Highlighted navy rating feature card */}
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
                        className={`${styles.star} ${revealed ? styles.starIn : ""} ${
                          i <= Math.floor(fullStars) ? styles.starFull : styles.starPartial
                        }`}
                        style={{ transitionDelay: revealed ? `${200 + i * 140}ms` : undefined }}
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
                  <span className={styles.sourceBadge}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width="12" height="12">
                      <path d="M21.35 11.1H12v5h5.35c-.45 2.16-2.05 3.72-4.85 3.72a5.87 5.87 0 0 1 0-11.74c1.4 0 2.55.5 3.4 1.32l3.5-3.5A9.7 9.7 0 0 0 12 2a10 10 0 1 0 0 20c5.4 0 9.35-3.7 9.35-10.2 0-.6-.05-1.15-.15-1.7Z" />
                    </svg>
                    Google
                  </span>
                  <span className={styles.sourceBadge}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width="12" height="12">
                      <path d="M22.5 12.6a10.5 10.5 0 1 1-21 0c0-2.1.6-4 1.7-5.6l1.5 1.3A8 8 0 1 0 12 4c-1.9 0-3.7.7-5.1 1.9l4.6 4.3H1.5a10.5 10.5 0 1 1 21 0Z" transform="rotate(120 12 12) scale(.9) translate(1.3 1.3)" />
                    </svg>
                    Trustpilot
                  </span>
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
              const grad = AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length];
              return (
                <Reveal
                  key={review.name}
                  delay={i * 90}
                  className={styles.cardSlot}
                >
                  <article
                    className={styles.card}
                    style={{ "--card-accent": accent } as React.CSSProperties}
                  >
                    <span className={styles.accentBar} aria-hidden="true" />
                    <span className={styles.quoteMark} aria-hidden="true">
                      &ldquo;
                    </span>
                    {i === 0 && revealed ? (
                      <WordReveal quote={review.quote} />
                    ) : (
                      <p className={styles.quote}>
                        {review.quote.split(" ").map((w, j) => (
                          <span
                            key={`${j}-${w}`}
                            className={styles.quoteWordStatic}
                          >
                            {w}{" "}
                          </span>
                        ))}
                      </p>
                    )}
                    <footer className={styles.cardFoot}>
                      <span
                        className={styles.avatar}
                        style={{ background: grad }}
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

        {/* Elongated pill progress dots — active stretches + fills */}
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
            >
              {i === active && <span className={styles.progressFill} />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}