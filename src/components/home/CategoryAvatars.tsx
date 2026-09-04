"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CATEGORY_AVATARS } from "@/data/home-content";
import styles from "./CategoryAvatars.module.css";

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

/**
 * "Explore by Category" — circular avatar grid on a white mesh gradient.
 * Soft colour blobs drift behind the content; circular portrait tiles
 * with accent hover ring, zoom, and shadow lift.
 */
export function CategoryAvatars() {
  return (
    <section className={styles.section}>
      {/* White mesh gradient — soft colour blobs */}
      <div className={styles.mesh} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobBlue}`} />
        <span className={`${styles.blob} ${styles.blobOrange}`} />
        <span className={`${styles.blob} ${styles.blobViolet}`} />
        <span className={`${styles.blob} ${styles.blobEmerald}`} />
        <span className={`${styles.blob} ${styles.blobGold}`} />
      </div>

      {/* Gentle wave transition into the section */}
      <span className={styles.edgeTop} aria-hidden="true">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path
            d="M0 40 L0 26 C 240 6, 480 34, 720 22 C 960 10, 1200 30, 1440 18 L1440 40 Z"
            fill="var(--ng-cloud)"
          />
        </svg>
      </span>

      <div className={styles.inner}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="ng-eyebrow" style={{ color: "#155eef" }}>
            Shop by Profession
          </p>
          <h2 className={styles.title}>Explore by Category</h2>
          <p className={styles.sub}>
            From hi-vis safety wear to branded merchandise — find the range
            that fits the way your team works.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.07 }}
        >
          {CATEGORY_AVATARS.map((cat) => (
            <motion.div
              key={cat.name}
              className={styles.item}
              variants={itemVariants}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <Link
                href={cat.href}
                className={styles.tile}
                style={
                  {
                    "--cat-accent": "#2266f0",
                    "--cat-accent-pastel": cat.accent,
                  } as React.CSSProperties
                }
                aria-label={`${cat.name} — view collection`}
              >
                <span className={styles.stage}>
                  {/* Accent radial glow behind the circle on hover */}
                  <span className={styles.glow} aria-hidden="true" />
                  {/* Soft light halo just outside the circle */}
                  <span className={styles.halo} aria-hidden="true" />

                  {/* Animated accent ring — draws itself on hover/focus */}
                  <svg
                    className={styles.ring}
                    viewBox="0 0 200 200"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r="98"
                      className={styles.ringCircle}
                    />
                  </svg>

                  {/* Cut-out circular portrait */}
                  <span className={styles.avatarBox}>
                    <Image
                      src={cat.image}
                      alt={cat.alt}
                      fill
                      sizes="(max-width: 640px) 30vw, (max-width: 1024px) 26vw, 170px"
                      className={styles.avatar}
                    />
                  </span>
                </span>

                {/* Caption below the circle */}
                <span className={styles.meta}>
                  <span className={styles.catName}>{cat.name}</span>
                  <span className={styles.viewLink}>
                    View collection
                    <svg
                      className={styles.arrow}
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M12 8l4 4-4 4M8 12h8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gentle wave transition out of the section */}
      <span className={styles.edgeBottom} aria-hidden="true">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path
            d="M0 0 L0 12 C 240 32, 480 4, 720 16 C 960 28, 1200 8, 1440 20 L1440 0 Z"
            fill="var(--ng-ink)"
          />
        </svg>
      </span>
    </section>
  );
}
