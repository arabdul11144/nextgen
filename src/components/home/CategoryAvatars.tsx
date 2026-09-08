"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CATEGORY_AVATARS } from "@/data/home-content";
import styles from "./CategoryAvatars.module.css";

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

/* Colour-coded micro-tags — one accent chip per tile so categories are
   distinguishable at a glance (echoes the "Industrial Momentum" palette). */
const TAG_COLORS: Record<string, string> = {
  "Workwear & Safety": "#ff5a1f",
  "Corporate & Professional": "#215cf6",
  "Custom Apparel & Branding": "#ffc72c",
  "Branding & Merchandise": "#1aa260",
  "Hi-Vis & Safety Wear": "#ff5a1f",
  "Executive & Corporate": "#215cf6",
  "Sublimation Polos & Tees": "#ffc72c",
  "Embroidery & Printing": "#1aa260",
  "PPE & Protective Wear": "#ce1126",
  "Hospitality & Kitchen": "#f59e0b",
  "Sportswear & Teamwear": "#10b981",
  "Branded Merchandise": "#fbbf24",
};

function tagLabel(name: string): string {
  const map: Record<string, string> = {
    "Workwear & Safety": "Safety",
    "Corporate & Professional": "Corporate",
    "Custom Apparel & Branding": "Custom",
    "Branding & Merchandise": "Branding",
    "Hi-Vis & Safety Wear": "Hi-Vis",
    "Executive & Corporate": "Corporate",
    "Sublimation Polos & Tees": "Custom",
    "Embroidery & Printing": "Print",
    "PPE & Protective Wear": "PPE",
    "Hospitality & Kitchen": "Kitchen",
    "Sportswear & Teamwear": "Sport",
    "Branded Merchandise": "Merch",
  };
  return map[name] ?? name;
}

/**
 * "Explore by Category" — dense, scannable category chip grid.
 * Compact edge-to-edge photo cards: full-bleed thumbnail, slim tag
 * pill, one-line title and an inline "View collection" link. Tight
 * 12–16px gutters, no floating-card shadows at rest, subtle hover.
 */
export function CategoryAvatars() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className="im-eyebrow">Shop by Profession</p>
          <span className={`im-accent-rule im-reveal-rule ${styles.headRule}`} aria-hidden="true" />
          <h2 className={styles.title}>Explore by Category</h2>
          <p className={styles.sub}>
            Find the range that fits the way your team works.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          transition={{ staggerChildren: 0.04 }}
        >
          {CATEGORY_AVATARS.map((cat) => {
            const tagColor = TAG_COLORS[cat.name] ?? "#215cf6";
            return (
              <motion.div
                key={cat.name}
                className={styles.item}
                variants={itemVariants}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Link
                  href={cat.href}
                  className={styles.tile}
                  style={{ "--cat-accent": tagColor } as React.CSSProperties}
                  aria-label={`${cat.name} — view collection`}
                >
                  {/* Edge-to-edge thumbnail — full card width, no frame */}
                  <span className={styles.ph}>
                    <Image
                      src={cat.image}
                      alt={cat.alt}
                      fill
                      sizes="(max-width: 640px) 46vw, (max-width: 1080px) 30vw, 23vw"
                      className={styles.photo}
                    />
                  </span>

                  {/* Tight body: tag pill, one-line title, inline link */}
                  <span className={styles.body}>
                    <span className={styles.tag}>{tagLabel(cat.name)}</span>
                    <span className={styles.name}>{cat.name}</span>
                    <span className={styles.view}>
                      View collection
                      <svg
                        className={styles.arrow}
                        viewBox="0 0 24 24"
                        width="11"
                        height="11"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          d="M12 8l4 4-4 4M8 12h8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}