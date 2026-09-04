"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { fireBurst } from "@/lib/burst";
import { showToast } from "@/lib/toast";
import styles from "./TeamEstimator.module.css";

const MIN = 1;
const MAX = 500;

function tierFor(count: number): string {
  if (count >= 61) return "Full workforce program";
  if (count >= 16) return "Growing team";
  return "Starter crew";
}

/**
 * Hero "quick team estimate" widget — a staff-count stepper whose
 * number scale-bounces on every change and feeds a live estimate
 * label. Submitting fires a particle burst + confirmation toast.
 */
export function TeamEstimator() {
  const [count, setCount] = useState(12);
  const submitRef = useRef<HTMLButtonElement>(null);

  const change = (delta: number) =>
    setCount((c) => Math.min(MAX, Math.max(MIN, c + delta)));

  const submit = () => {
    if (submitRef.current) {
      fireBurst(submitRef.current, { count: 22, radius: 80 });
    }
    showToast({
      title: "Estimate started",
      message: `We'll shape a workwear & branding program for a team of ${count}. Request your quote to keep going.`,
    });
  };

  return (
    <div className={styles.widget}>
      <div className={styles.head}>
        <span className={styles.title}>Quick team estimate</span>
        <span className={styles.hint}>
          Size your team and we&apos;ll shape the right program.
        </span>
      </div>

      <div className={styles.stepperRow}>
        <button
          type="button"
          className={styles.stepBtn}
          onClick={() => change(-1)}
          aria-label="Decrease team size"
        >
          −
        </button>
        <span key={count} className={styles.count} aria-live="polite">
          {count}
        </span>
        <button
          type="button"
          className={styles.stepBtn}
          onClick={() => change(1)}
          aria-label="Increase team size"
        >
          +
        </button>
        <span className={styles.tier}>{tierFor(count)}</span>
      </div>

      <p className={styles.estimate}>
        Uniforms &amp; workwear for <strong>{count}</strong>{" "}
        {count === 1 ? "person" : "people"}
      </p>

      <button
        ref={submitRef}
        type="button"
        className={styles.submit}
        onClick={submit}
      >
        Get My Estimate
      </button>

      <Link href="/contact" className={styles.widgetLink}>
        Prefer to talk it through? Request a quote{" "}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}