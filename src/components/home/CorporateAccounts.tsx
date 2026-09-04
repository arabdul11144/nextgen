"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CORPORATE_ACCOUNTS } from "@/data/home-content";
import styles from "./CorporateAccounts.module.css";

/**
 * "Bulk & Corporate Accounts" — mid-page business/procurement CTA.
 * A large hero44 photo panel (with a diagonal seam where it meets the
 * text) + a light conversion panel with the enquiry button.
 */
export function CorporateAccounts() {
  const c = CORPORATE_ACCOUNTS;

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.split}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Image panel — slow Ken Burns drift, diagonal seam on the right */}
        <motion.div
          className={styles.media}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          aria-hidden="true"
        >
          <div className={styles.ken}>
            <Image
              src={c.image}
              alt={c.imageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 55vw"
              className={styles.photo}
            />
          </div>
        </motion.div>

        {/* Text panel */}
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <p className="ng-eyebrow" style={{ color: "var(--ng-accent-blue)" }}>
            {c.eyebrow}
          </p>
          <h2 className={styles.title}>{c.heading}</h2>
          <p className={styles.body}>{c.paragraph1}</p>
          <p className={styles.body}>{c.paragraph2}</p>
          <Link href={c.ctaHref} className={styles.cta}>
            <span>{c.cta}</span>
            <svg
              className={styles.ctaArrow}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M5 12h14m-6-6 6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}