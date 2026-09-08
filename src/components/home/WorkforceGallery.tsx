"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WORKFORCE_GALLERY } from "@/data/home-content";
import styles from "./WorkforceGallery.module.css";

const FEATURED = 2; // default-wide panel index (Healthcare & Medical)

/**
 * "Empowering PNG's Workforce" — hover-expand industry photo panels.
 * Panel 3 is wide by default; hovering any panel grows it to that
 * featured width while the rest shrink. Pure pointer (hover) control —
 * clicking a panel only navigates. On mobile the panels stack as
 * full-width cards with captions always visible.
 */
export function WorkforceGallery() {
  const [hovered, setHovered] = useState<number | null>(null);
  const c = WORKFORCE_GALLERY;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className="ng-eyebrow" style={{ color: "var(--ng-accent-blue)" }}>
          {c.eyebrow}
        </p>
        <h2 className={styles.heading}>{c.heading}</h2>
        <p className={styles.paragraph}>
          {renderParagraph()}
        </p>
      </div>

      <div
        className={styles.gallery}
        onMouseLeave={() => setHovered(null)}
        aria-roledescription="gallery"
        aria-label="Workforce industries"
      >
        {c.items.map((item, i) => {
          const isFeatured =
            hovered === null ? i === FEATURED : i === hovered;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`${styles.panel}${isFeatured ? ` ${styles.featured}` : ""}`}
              onMouseEnter={() => setHovered(i)}
              style={
                {
                  "--panel-accent": item.accent,
                } as React.CSSProperties
              }
              aria-label={`Explore ${item.name} solutions`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.photo}
              />
              <span className={styles.scrim} aria-hidden="true" />
              <span className={styles.overlay}>
                <span className={styles.catName}>{item.name}</span>
                <span className={styles.explore}>
                  {c.exploreLabel}
                  <span className={styles.exploreArrow} aria-hidden="true">
                    &rarr;
                  </span>
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function renderParagraph() {
  const c = WORKFORCE_GALLERY;
  const key = c.boldKey;
  const idx = c.paragraph.indexOf(key);
  if (idx === -1) return c.paragraph;
  return (
    <>
      {c.paragraph.slice(0, idx)}
      <strong>{key}</strong>
      {c.paragraph.slice(idx + key.length)}
    </>
  );
}