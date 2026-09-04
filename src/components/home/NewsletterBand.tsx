"use client";

import { useRef } from "react";
import Image from "next/image";
import { NEWSLETTER } from "@/data/home-content";
import { fireBurst } from "@/lib/burst";
import { showToast } from "@/lib/toast";
import { Reveal } from "@/components/reveal/Reveal";
import styles from "./NewsletterBand.module.css";

/**
 * Newsletter signup band — a calm two-column breather before the
 * footer. Left on white with an inline arrow-submit input; right a
 * large lifestyle photo bleeding to the section edge.
 */
export function NewsletterBand() {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const subscribe = () => {
    const email = inputRef.current?.value.trim() ?? "";
    if (!email || !email.includes("@")) {
      showToast({
        title: "Check your email",
        message: "Please enter a valid email address to subscribe.",
      });
      return;
    }
    if (buttonRef.current) {
      fireBurst(buttonRef.current, { count: 22, radius: 80 });
    }
    showToast({
      title: "You're subscribed",
      message: "Insights on workwear, uniforms and branding are on their way.",
    });
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.copy}>
          <p className="ng-eyebrow" style={{ color: "var(--ng-accent-blue)" }}>
            {NEWSLETTER.eyebrow}
          </p>
          <h2 className={styles.title}>{NEWSLETTER.title}</h2>
          <p className={styles.sub}>{NEWSLETTER.sub}</p>

          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              subscribe();
            }}
          >
            <label className={styles.label} htmlFor="home-newsletter-email">
              Email address
            </label>
            <div className={styles.row}>
              <input
                ref={inputRef}
                id="home-newsletter-email"
                type="email"
                className={styles.input}
                placeholder={NEWSLETTER.placeholder}
                autoComplete="email"
              />
              <button ref={buttonRef} type="submit" className={styles.button}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <span className={styles.buttonText}>Subscribe</span>
              </button>
            </div>
          </form>
        </Reveal>

        <Reveal delay={120} className={styles.media}>
          <Image
            src={NEWSLETTER.image}
            alt={NEWSLETTER.imageAlt}
            fill
            sizes="(max-width: 900px) 92vw, 44vw"
            className={styles.photo}
          />
          <span className={styles.scrim} aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}