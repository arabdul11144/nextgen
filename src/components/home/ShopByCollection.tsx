"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal/Reveal";
import { UniformPhotoGrid } from "./UniformPhotoGrid";
import styles from "./ShopByCollection.module.css";

/**
 * ShopByCollection — Complete Uniform Range showcase.
 * Two-column dark-navy section: a 2×2 grid of rotating category
 * images on the left, condensed text copy on the right. Each of
 * the 4 tiles cycles independently through a pool of 8 images via
 * a gentle crossfade. Respects prefers-reduced-motion.
 */

const EYEBROW = "Complete Uniform Range";
const SHORT_HEADING = "Every Uniform. One Trusted Supplier.";
const SHORT_INTRO =
  "High-visibility workwear, corporate suiting, school uniforms and clinical scrubs — engineered for every workplace across Papua New Guinea.";
const SHORT_BODY =
  "Custom quotes, bulk discounts and dedicated account support. Tell us what your people do and we'll build the program.";
const VIEW_ALL = "View Our Full Range";

export function ShopByCollection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          {/* ── Left column — rotating photo grid ── */}
          <Reveal delay={80} className={styles.gridCol}>
            <UniformPhotoGrid />
          </Reveal>

          {/* ── Right column — text ── */}
          <Reveal className={styles.textCol}>
            <p className={styles.eyebrow}>{EYEBROW}</p>
            <h2 className={styles.heading}>{SHORT_HEADING}</h2>
            <p className={styles.intro}>{SHORT_INTRO}</p>
            <p className={styles.body}>{SHORT_BODY}</p>
            <Link href="/services" className={styles.viewAll}>
              {VIEW_ALL} <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
