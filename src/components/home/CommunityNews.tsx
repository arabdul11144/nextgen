"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { COMMUNITY_NEWS } from "@/data/home-content";
import styles from "./CommunityNews.module.css";

type NewsItem = (typeof COMMUNITY_NEWS.items)[number];

function AvatarIcon({ name }: { name: "person" | "folder" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden="true"
      focusable="false"
    >
      {name === "person" ? (
        <>
          <circle cx="12" cy="8" r="4" fill="currentColor" />
          <path
            d="M4 20c0-3.6 3.6-6 8-6s8 2.4 8 6"
            fill="currentColor"
          />
        </>
      ) : (
        <path
          d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}

function BadgeIcon({ name }: { name: "jersey" | "shake" | "pin" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "jersey" ? (
        <path d="M17 4 20 7l-2 3-1-1v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9l-1 1-2-3 3-3 3 2h4l3-2z" />
      ) : name === "shake" ? (
        <>
          <path d="M7 12 4 9l4-4 3 3-4 4z" />
          <path d="M17 12l3-3-4-4-3 3 4 4z" />
          <path d="M13 7l4 4-3 3-4-4 3-3z" />
          <path d="m12 13 5 5-2 3-4-4" />
        </>
      ) : (
        <>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
          <circle cx="12" cy="10" r="2.6" />
        </>
      )}
    </svg>
  );
}

function Card({ item }: { item: NewsItem }) {
  return (
    <motion.article
      className={styles.card}
      style={{ "--card-accent": item.accent } as React.CSSProperties}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className={styles.media}>
        {/* accent color swoosh in the corner */}
        <svg
          className={styles.swoosh}
          viewBox="0 0 120 120"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M0 0h120c0 66-54 120-120 120V0z" fill="var(--card-accent)" />
        </svg>

        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          className={styles.photo}
        />

        {/* circular dark date badge */}
        <motion.div
          className={styles.date}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.15,
          }}
        >
          <span className={styles.dateDay}>{item.date.day}</span>
          <span className={styles.dateMonth}>{item.date.month}</span>
        </motion.div>

        {/* circular mini-icon badges */}
        <div className={styles.badges}>
          <span className={styles.badge} style={{ background: item.accent }}>
            <BadgeIcon name="jersey" />
          </span>
          <span className={styles.badge} style={{ background: item.accent }}>
            <BadgeIcon name="shake" />
          </span>
          <span className={styles.badge} style={{ background: item.accent }}>
            <BadgeIcon name="pin" />
          </span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <AvatarIcon name="person" />
            {item.author}
          </span>
          <span className={styles.metaItem}>
            <AvatarIcon name="folder" />
            {item.category}
          </span>
        </div>

        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.sub}>{item.excerpt}</p>

        <a href="#" className={styles.readMore}>
          Read more
          <span className={styles.readMoreArrow} aria-hidden="true">
            &rarr;
          </span>
        </a>
      </div>
    </motion.article>
  );
}

export function CommunityNews() {
  const n = COMMUNITY_NEWS;

  return (
    <section className={styles.section}>
      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <p className="ng-eyebrow" style={{ color: "var(--ng-accent-crimson)" }}>
          {n.eyebrow}
        </p>
        <h2 className={styles.heading}>{n.heading}</h2>
        <p className={styles.sub}>{n.sub}</p>
      </motion.header>

      <div className={styles.grid}>
        {n.items.map((item) => (
          <Card key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}