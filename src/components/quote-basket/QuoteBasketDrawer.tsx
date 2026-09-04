"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuoteBasket } from "./QuoteBasketContext";
import { fireBurst } from "@/lib/burst";
import { showToast } from "@/lib/toast";
import styles from "./QuoteBasketDrawer.module.css";

/**
 * Slide-over drawer for the quote-request basket. Mounted once in
 * the root layout (inside the provider). Collects items and
 * submits ONE combined quote request via the existing /contact
 * quote flow. Closes on Escape / backdrop click / close button.
 */
export function QuoteBasketDrawer() {
  const { items, isOpen, close, removeItem, updateQty, clear, itemCount } =
    useQuoteBasket();
  const panelRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<HTMLAnchorElement>(null);

  /* Lock body scroll + Escape to close while open */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  /* Focus the panel when it opens */
  useEffect(() => {
    if (isOpen) {
      const t = window.setTimeout(() => panelRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  const submitQuote = () => {
    if (requestRef.current) {
      fireBurst(requestRef.current, { count: 26, radius: 96 });
    }
    showToast({
      title: "Quote request ready",
      message:
        "Taking you to the quote form — your basket items are listed there for reference.",
    });
  };

  return (
    <div
      className={`${styles.root} ${isOpen ? styles.open : ""}`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <button
        type="button"
        className={styles.backdrop}
        onClick={close}
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close quote basket"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Quote request basket"
        tabIndex={-1}
        className={styles.panel}
      >
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Quote request</p>
            <h2 className={styles.title}>
              Your basket{" "}
              <span className={styles.count}>({itemCount})</span>
            </h2>
          </div>
          <button
            type="button"
            className={styles.close}
            onClick={close}
            aria-label="Close basket"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className={styles.hint}>
          Add products and services, then submit one combined quote request —
          our team prices the whole program.
        </p>
{items.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 7h12l1.5 13h-15L6 7z" />
                <path d="M9 10V6a3 3 0 0 1 6 0v4" />
              </svg>
            </span>
            <p className={styles.emptyTitle}>Your basket is empty</p>
            <p className={styles.emptySub}>
              Browse the collections below and add what your team needs.
            </p>
            <Link href="/services" className={styles.browseLink} onClick={close}>
              Explore services <span aria-hidden="true">→</span>
            </Link>
          </div>
        ) : (
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.key} className={styles.item}>
                {item.image ? (
                  <span className={styles.thumb}>
                    <Image
                      src={item.image}
                      alt={item.alt ?? item.title}
                      width={64}
                      height={64}
                      className={styles.thumbImg}
                    />
                  </span>
                ) : (
                  <span className={`${styles.thumb} ${styles.thumbFallback}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <path d="M6 7h12l1.5 13h-15L6 7z" />
                    </svg>
                  </span>
                )}
                <div className={styles.itemBody}>
                  <Link
                    href={item.href}
                    className={styles.itemTitle}
                    onClick={close}
                  >
                    {item.title}
                  </Link>
                  <div className={styles.qtyRow}>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => updateQty(item.key, item.qty - 1)}
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      −
                    </button>
                    <span className={styles.qty} aria-live="polite">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => updateQty(item.key, item.qty + 1)}
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => removeItem(item.key)}
                  aria-label={`Remove ${item.title}`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.foot}>
          {items.length > 0 && (
            <button type="button" className={styles.clear} onClick={clear}>
              Clear basket
            </button>
          )}
          <Link
            ref={requestRef}
            href="/contact"
            className={styles.request}
            onClick={submitQuote}
          >
            Request Combined Quote
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}