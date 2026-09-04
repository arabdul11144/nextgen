"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GENERIC_IMAGE } from "@/data/images";
import styles from "./BlogPreview.module.css";

export interface BlogPost {
  day: string;
  month: string;
  author: string;
  category: string;
  title: string;
  /** Describes what the article's photo will show */
  alt: string;
}

interface BlogPreviewProps {
  posts: BlogPost[];
}

/**
 * Blog/insights preview — cards first render as shimmering
 * skeleton placeholders, then swap smoothly to the real content.
 */
export function BlogPreview({ posts }: BlogPreviewProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 1400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className={styles.grid}>
      {posts.map((post, i) => (
        <article
          key={post.title}
          className={`${styles.card} ${loaded ? styles.ready : ""}`}
          style={{ transitionDelay: `${i * 90}ms` }}
        >
          <div className={styles.imageWrap}>
            {/* Skeleton shimmer block while "loading" */}
            <span className={`${styles.skeleton} ${styles.shimmer}`} aria-hidden="true" />
            <Image
              src={GENERIC_IMAGE}
              alt={post.alt}
              width={480}
              height={300}
              className={`${styles.image} ${loaded ? styles.imageReady : ""}`}
            />
            {loaded && (
              <span className={styles.date}>
                <span className={styles.day}>{post.day}</span>
                <span className={styles.month}>{post.month}</span>
              </span>
            )}
          </div>

          <div className={styles.body}>
            {/* Skeleton text lines swap to real meta/title */}
            {!loaded ? (
              <>
                <span className={`${styles.skeleton} ${styles.shimmer} ${styles.lineW40}`} />
                <span className={`${styles.skeleton} ${styles.shimmer} ${styles.lineW90}`} />
                <span className={`${styles.skeleton} ${styles.shimmer} ${styles.lineW65}`} />
              </>
            ) : (
              <>
                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                    </svg>
                    {post.author}
                  </span>
                  <span className={styles.metaItem}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 7h18M6 7V4m12 3V4M4 11h16v9H4z" />
                    </svg>
                    {post.category}
                  </span>
                </div>
                <h3 className={styles.title}>{post.title}</h3>
              </>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}