"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal/Reveal";
import { CUSTOMIZATION_HUB } from "@/data/home-content";
import styles from "./CustomizationHub.module.css";

/**
 * "Branding & Customization Hub" — redesigned split section.
 *   - Cloud-tinted full-band framing + a header (eyebrow + intro).
 *   - Two elevated cards (soft shadow, 6px radius, accent top bar —
 *     Signal Blue left, Deep Teal right) with left-aligned content.
 *   - A centre "product stage": smooth radial backdrop, clipped
 *     horizontal slide, arrows overlaid at the stage's inner edges,
 *     dots centred beneath the stage.
 *   - Auto-advance pauses on interaction and resumes after ~6s idle.
 */

const IMAGES = CUSTOMIZATION_HUB.images;
const N = IMAGES.length;

/* Signed shortest ring distance from index i to the current index,
   used to pan each image to its translateX position during a slide. */
function distanceTo(i: number, index: number) {
  let d = (i - index + N) % N;
  if (d > N / 2) d -= N;
  return d;
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Variant = "blue" | "teal";

function TextCard({
  variant,
  title,
  body,
  href,
  linkLabel,
  delay,
}: {
  variant: Variant;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  delay?: number;
}) {
  return (
    <Reveal className={styles.cardCol} delay={delay}>
      <div className={`${styles.card} ${variant === "teal" ? styles.cardTeal : styles.cardBlue}`}>
        <span className={styles.accent} aria-hidden="true" />
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardBody}>{body}</p>
        <Link href={href} className={styles.cardLink}>
          {linkLabel} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Reveal>
  );
}

export function CustomizationHub() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [interaction, setInteraction] = useState(0);
  const lastInteractRef = useRef(0);

  /* Stamp the idle-tracking time whenever the user navigates. */
  useEffect(() => {
    if (interaction > 0) lastInteractRef.current = Date.now();
  }, [interaction]);

  const goTo = (target: number) => {
    setInteraction((c) => c + 1);
    setIndex(((target % N) + N) % N);
  };

  const step = (dir: 1 | -1) => {
    setInteraction((c) => c + 1);
    setIndex((i) => (i + dir + N) % N);
  };

  /* Auto-advance every 3.5s, only when idle for >6s. */
  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() - lastInteractRef.current > 6000) {
        setIndex((i) => (i + 1) % N);
      }
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  const currentSrc = IMAGES[index];
  const showSkeleton = !loaded[currentSrc];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* ── Section header ── */}
        <Reveal className={styles.header}>
          <p className={styles.eyebrow}>{CUSTOMIZATION_HUB.eyebrow}</p>
        </Reveal>

        {/* ── Three-column layout ── */}
        <div className={styles.columns}>
          {/* Left panel */}
          <TextCard
            variant="blue"
            title="Branding & Customization Hub"
            body="We are your complete hub for custom apparel. From high-quality embroidery for professional uniforms to vibrant, fade-resistant sublimation for polos and shirts, we deliver intricate patterns and lasting digital prints for all your corporate and team branding needs."
            href="/contact"
            linkLabel="Start Your Custom Design"
          />

          {/* Centre image stage */}
          <Reveal className={styles.stageCol} delay={240}>
            <div className={styles.stage}>
              {/* overlaid prev/next arrows at the inner edges */}
              <button
                type="button"
                className={`${styles.arrow} ${styles.arrowLeft}`}
                aria-label="Previous image"
                onClick={() => step(-1)}
              >
                <Chevron dir="left" />
              </button>

              {showSkeleton && <div className={`${styles.skeleton} ng-skeleton`} aria-hidden="true" />}
              <div className={styles.rail}>
                {IMAGES.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt="NextGen custom branding and merchandise"
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                    className={styles.slide}
                    style={{ transform: `translateX(${distanceTo(i, index) * 100}%)` }}
                    onLoad={() => setLoaded((p) => ({ ...p, [src]: true }))}
                    draggable={false}
                  />
                ))}
              </div>

              <button
                type="button"
                className={`${styles.arrow} ${styles.arrowRight}`}
                aria-label="Next image"
                onClick={() => step(1)}
              >
                <Chevron dir="right" />
              </button>
            </div>

            {/* dot indicators centred beneath the stage */}
            <div className={styles.dots}>
              {IMAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                  aria-label={`Go to image ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </Reveal>

          {/* Right panel */}
          <TextCard
            variant="teal"
            title="Brand Visibility & Merchandise"
            body="Maximize your brand's reach with our full suite of visibility tools. We provide high-quality, durable signage and banner printing for events and retail, paired with premium promotional products and custom merchandise to create high-impact, memorable brand experiences."
            href="/services"
            linkLabel="View Visibility Solutions"
            delay={120}
          />
        </div>
      </div>
    </section>
  );
}
