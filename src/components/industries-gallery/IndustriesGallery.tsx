"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Industry } from "@/data/industries";
import { GENERIC_IMAGE } from "@/data/images";
import styles from "./IndustriesGallery.module.css";

interface IndustriesGalleryProps {
  industries: Industry[];
  /** Optional per-industry image path keyed by industry slug */
  imagesBySlug?: Record<string, string>;
}

export function IndustriesGallery({
  industries,
  imagesBySlug,
}: IndustriesGalleryProps) {
  const [active, setActive] = useState<number>(1);

  return (
    <div className={styles.strip}>
      {industries.map((industry, i) => {
        const expanded = i === active;
        const src = imagesBySlug?.[industry.slug] ?? GENERIC_IMAGE;
        return (
          <div
            key={industry.slug}
            className={`${styles.panel} ${expanded ? styles.active : ""}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <Link
              href="/industry"
              className={styles.imageLink}
              aria-label={industry.name}
              tabIndex={0}
            >
              <Image
                src={src}
                alt={industry.name}
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                className={styles.image}
                style={{ objectFit: "cover" }}
              />
              <span className={styles.overlay} aria-hidden="true" />
              <span className={styles.label}>{industry.shortName}</span>
            </Link>
            <Link
              href="/industry"
              className={`${styles.explore} ${expanded ? styles.exploreVisible : ""}`}
              tabIndex={expanded ? 0 : -1}
            >
              <span className={styles.explorePill}>Explore More</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
