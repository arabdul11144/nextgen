"use client";

import { useRef, useState } from "react";
import { fireBurst } from "@/lib/burst";
import { showToast } from "@/lib/toast";
import styles from "./NewsletterForm.module.css";

/**
 * Footer newsletter capture — subscribing fires a particle burst
 * and a confirmation toast, then clears the field.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const subscribe = () => {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      showToast({
        title: "Check your email",
        message: "Please enter a valid email address to subscribe.",
      });
      return;
    }
    if (buttonRef.current) {
      fireBurst(buttonRef.current, { count: 20, radius: 74 });
    }
    showToast({
      title: "You're subscribed",
      message: "Insights on workwear, uniforms and branding are on their way.",
    });
    setEmail("");
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        subscribe();
      }}
    >
      <label className={styles.label} htmlFor="newsletter-email">
        Email address
      </label>
      <div className={styles.row}>
        <input
          id="newsletter-email"
          type="email"
          className={styles.input}
          placeholder="erick_omar@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <button
          ref={buttonRef}
          type="submit"
          className={styles.button}
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}