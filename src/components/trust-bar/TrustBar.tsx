"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  PROJECT_COUNT,
  SERVICE_COUNT,
  YEARS_OF_EXPERIENCE,
} from "@/data/site-stats";
import styles from "./TrustBar.module.css";

const PHONE = "+675 1234 5678";
const EMAIL = "info@nextgensolutionspng.com";

/* Rotating trust messages — real figures only (see site-stats.ts) */
const messages: { text: string; href?: string }[] = [
  { text: `${YEARS_OF_EXPERIENCE}+ years supplying PNG businesses` },
  {
    text: `${SERVICE_COUNT}+ services across workwear, apparel & branding`,
    href: "/services",
  },
  {
    text: "Bulk & corporate uniform programs — request a quote",
    href: "/contact",
  },
  {
    text: `${PROJECT_COUNT}+ projects delivered across PNG`,
    href: "/portfolio",
  },
];

/**
 * Harveys-style rotating trust/announcement bar — slim strip with
 * prev/next arrows, auto-advancing every few seconds, pausing on
 * hover. Phone/email stay reachable on wide screens.
 */
export function TrustBar() {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  const goTo = useCallback((next: number) => {
    setIndex((next + messages.length) % messages.length);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!pausedRef.current) {
        setIndex((i) => (i + 1) % messages.length);
      }
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  const message = messages[index];

  return (
    <div
      className={styles.bar}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className={styles.rotator}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(index - 1)}
          aria-label="Previous announcement"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <p key={index} className={styles.message}>
          {message.href ? (
            <Link href={message.href} className={styles.messageLink}>
              {message.text}
              <span aria-hidden="true"> →</span>
            </Link>
          ) : (
            message.text
          )}
        </p>

        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(index + 1)}
          aria-label="Next announcement"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className={styles.contact}>
        <a href={`tel:${PHONE.replace(/\s/g, "")}`} className={styles.contactItem}>
          <svg className={styles.contactIcon} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {PHONE}
        </a>
        <a href={`mailto:${EMAIL}`} className={styles.contactItem}>
          <svg className={styles.contactIcon} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-10 6L2 7" />
          </svg>
          {EMAIL}
        </a>
      </div>
    </div>
  );
}