"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCT_RAILS, type ProductRail, type RailItem } from "@/data/home-content";
import { useQuoteBasket } from "@/components/quote-basket/QuoteBasketContext";
import { fireBurst } from "@/lib/burst";
import { Reveal } from "@/components/reveal/Reveal";
import styles from "./ProductRails.module.css";

/**
 * Add-to-quote control — ghost/outline pill that flips to a solid
 * electric-blue pill on hover and, once added, does a quick "+ → ✓"
 * morph before turning into an inline (− qty +) stepper. Quantity
 * bounces on change, a particle burst fires on the first add and the
 * basket fires a toast confirmation.
 */
function AddToQuote({ item }: { item: RailItem }) {
  const { addItem, updateQty, removeItem } = useQuoteBasket();
  const [qty, setQty] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const key = `${item.href}|${item.title}`;

  const handleAdd = () => {
    addItem({ title: item.title, href: item.href, image: item.image, alt: item.alt });
    setQty(1);
    setJustAdded(true);
    if (btnRef.current) {
      fireBurst(btnRef.current, {
        count: 12,
        radius: 48,
        colors: ["#215cf6", "#ffffff", "#215cf6", "#ffc72c", "#ffffff"],
      });
    }
    window.setTimeout(() => setJustAdded(false), 700);
  };

  const dec = () => {
    const next = qty - 1;
    if (next <= 0) {
      removeItem(key);
      setQty(0);
    } else {
      updateQty(key, next);
      setQty(next);
    }
  };

  const inc = () => {
    const next = qty + 1;
    updateQty(key, next);
    setQty(next);
  };

  if (qty === 0) {
    return (
      <button
        ref={btnRef}
        type="button"
        className={`${styles.addBtn}${justAdded ? ` ${styles.addBtnDone}` : ""}`}
        onClick={handleAdd}
      >
        <span className={styles.addIcon} aria-hidden="true">
          <svg className={styles.addPlus} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <svg className={styles.addCheck} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5 9-10" />
          </svg>
        </span>
        <span className={styles.addLabel}>Add to quote</span>
      </button>
    );
  }

  return (
    <div className={styles.stepper} role="group" aria-label={`Quantity of ${item.title}`}>
      <button type="button" className={styles.stepperBtn} onClick={dec} aria-label="Decrease quantity">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M5 12h14" />
        </svg>
      </button>
      <span key={qty} className={styles.qty}>
        {qty}
      </span>
      <button type="button" className={styles.stepperBtn} onClick={inc} aria-label="Increase quantity">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}

function Card({ item }: { item: RailItem }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Link href={item.href} className={styles.mediaLink} aria-label={item.title}>
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 78vw, (max-width: 1023px) 32vw, 19vw"
            className={styles.photo}
          />
          {item.hoverImage && (
            <Image
              src={item.hoverImage}
              alt=""
              fill
              sizes="(max-width: 640px) 78vw, (max-width: 1023px) 32vw, 19vw"
              className={styles.photoCross}
              aria-hidden="true"
            />
          )}
        </Link>
        {/* Quick-view affordance */}
        <span className={styles.quickView} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <div className={styles.revealCta}>
          <Link href={item.href}>View <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>
          <Link href={item.href}>{item.title}</Link>
        </h3>
        {item.spec && <p className={styles.spec}>{item.spec}</p>}
        <p className={styles.bulkNote}>
          <span aria-hidden="true">•</span> Bulk pricing available
        </p>
        <div className={styles.actionRow}>
          <AddToQuote item={item} />
        </div>
      </div>
    </article>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

function Rail({ rail }: { rail: ProductRail }) {
  const c = { "--rail-accent": rail.accent, "--rail-tint": rail.tint } as React.CSSProperties;

  return (
    <div className={styles.rail} style={c}>
      <motion.header
        className={styles.railHead}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className={styles.railHeadingBlock}>
          <span className={styles.eyebrowTab}>{rail.eyebrow}</span>
          <h3 className={styles.railTitle}>{rail.title}</h3>
        </div>
        <Link href={rail.viewAllHref} className={styles.viewAll}>
          View all
          <svg className={styles.viewAllArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </motion.header>

      <ul className={styles.cards}>
        {rail.items.slice(0, 5).map((item, i) => (
          <motion.li
            key={item.title}
            className={styles.cardCell}
            variants={cardVariants}
            custom={i}
            initial="hidden"
            animate="show"
          >
            <Card item={item} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

const TAB_TONES: string[] = ["#f2f6fd", "#f7f3ef", "#fdf8e8"];

/* Auto-rotation constants */
const ROTATE_INTERVAL_MS = 4500;
const PAUSE_RESUME_MS = 6000;

export function ProductRails() {
  const [activeRail, setActiveRail] = useState(0);
  const [autoPaused, setAutoPaused] = useState(false);
  /* Pause rotation entirely for users who prefer reduced motion */
  const [respectReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const rail = PRODUCT_RAILS[activeRail];
  const tabsRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<number | null>(null);

  /* Pause auto-rotation for `ms`, resuming afterwards */
  const pauseFor = (ms: number) => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    setAutoPaused(true);
    resumeTimer.current = window.setTimeout(
      () => setAutoPaused(false),
      ms,
    );
  };

  /* Manual tab select → pause auto-rotation and resume after inactivity */
  const selectRail = (i: number) => {
    setActiveRail(i);
    pauseFor(PAUSE_RESUME_MS);
  };

  /* Clear any pending resume timer on unmount */
  useEffect(
    () => () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    },
    [],
  );

  /* Auto-cycle the tabs every few seconds unless paused (click / hover /
     focus / reduced motion) or the tab is hidden */
  useEffect(() => {
    if (autoPaused || respectReducedMotion) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setActiveRail((i) => (i + 1) % PRODUCT_RAILS.length);
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [autoPaused, respectReducedMotion]);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.sectionHead}>
          <Reveal>
            <p className="im-eyebrow">Who We Equip</p>
          </Reveal>
          <Reveal delay={80}>
            <span className={`im-accent-rule im-reveal-rule ${styles.headRule}`} aria-hidden="true" />
          </Reveal>
          <Reveal delay={140}>
            <h2 className={styles.sectionTitle}>Shop the collections</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className={styles.sectionSub}>
              Three ranges, one standard — professional workwear, uniforms and
              branding for every team in PNG.
            </p>
          </Reveal>

          {/* Segmented tab control with sliding thumb */}
          <div
            className={styles.tabs}
            ref={tabsRef}
            role="tablist"
            aria-label="Shop ranges"
            onMouseEnter={() => pauseFor(PAUSE_RESUME_MS)}
            onMouseLeave={() => pauseFor(PAUSE_RESUME_MS)}
            onFocus={() => pauseFor(PAUSE_RESUME_MS)}
            onBlur={() => pauseFor(PAUSE_RESUME_MS)}
          >
            {PRODUCT_RAILS.map((r, i) => {
              const isActive = activeRail === i;
              return (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.tab}${isActive ? ` ${styles.tabActive}` : ""}`}
                  onClick={() => selectRail(i)}
                >
                  {isActive && (
                    <motion.span
                      className={styles.tabThumb}
                      layoutId="rail-tab-thumb"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className={styles.tabLabel}>{r.eyebrow}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tinted zone belt behind the active rail.
            While hovering the belt (cards/grid) we pause auto-rotation,
            resuming after leaving. Background crossfades aren't needed here
            because the rail itself drives the belt tint below. */}
        <div
          className={styles.belt}
          style={{ background: TAB_TONES[activeRail % TAB_TONES.length] }}
          onMouseEnter={() => pauseFor(PAUSE_RESUME_MS)}
          onMouseLeave={() => pauseFor(PAUSE_RESUME_MS)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={rail.id}
              className={styles.beltInner}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Rail rail={rail} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
