"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CATEGORY_AVATARS } from "@/data/home-content";
import styles from "./CategoryAvatars.module.css";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

/**
 * "Explore by Category" — clean card grid on a warm surface.
 * Each card has a circular avatar cut-out, accent-colored name,
 * and a "View collection" link with arrow hover animation.
 */
export function CategoryAvatars() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="ng-eyebrow" style={{ color: "var(--ng-accent-coral)" }}>
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
          transition={{ staggerChildren: 0.06 }}
        >
          {CATEGORY_AVATARS.map((cat) => (
            <motion.div
              key={cat.name}
              className={styles.item}
              variants={itemVariants}
              transition={{ duration: 0.4, ease: "easeOut" }}
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

                <span className={styles.meta}>
                  <span className={styles.catName}>{cat.name}</span>
                  <span className={styles.viewLink}>
                    View collection
                    <svg
                      className={styles.arrow}
                      viewBox="0 0 24 24"
                      width="13"
                      height="13"
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
    </section>
  );
}
