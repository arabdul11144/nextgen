"use client";

import { useRef } from "react";
import Link from "next/link";
import { fireBurst } from "@/lib/burst";
import { showToast } from "@/lib/toast";
import styles from "./QuoteCta.module.css";

interface QuoteCtaProps {
  children: React.ReactNode;
  href?: string;
  toastTitle: string;
  toastMessage: string;
  className?: string;
}

/**
 * Quote-request CTA — fires a particle burst and a confirmation
 * toast on click, then follows the link as normal.
 */
export function QuoteCta({
  children,
  href = "/contact",
  toastTitle,
  toastMessage,
  className = "",
}: QuoteCtaProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onClick = () => {
    if (ref.current) {
      fireBurst(ref.current, { count: 24, radius: 90 });
    }
    showToast({ title: toastTitle, message: toastMessage });
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={`${styles.cta} ${className}`.trim()}
      onClick={onClick}
    >
      {children}
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}