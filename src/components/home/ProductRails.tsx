"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PRODUCT_RAILS, type ProductRail, type RailItem } from "@/data/home-content";
import { useQuoteBasket } from "@/components/quote-basket/QuoteBasketContext";
import { fireBurst } from "@/lib/burst";
import { Reveal } from "@/components/reveal/Reveal";
import styles from "./ProductRails.module.css";

/**
 * Add-to-quote control — a rectangular button in the range's accent
 * colour that transforms into an inline (− qty +) stepper once added.
 * Quantity bounces on change, a particle burst fires on the first add
 * and the basket fires a toast confirmation. Decrementing to zero
 * returns the control to its default "Add to quote" state.
 */
function AddToQuote({ item }: { item: RailItem }) {
  const { addItem, updateQty, removeItem } = useQuoteBasket();
  const [qty, setQty] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const key = `${item.href}|${item.title}`;

  const handleAdd = () => {
    addItem({ title: item.title, href: item.href, image: item.image, alt: item.alt });
    setQty(1);
    if (btnRef.current) {
      fireBurst(btnRef.current, {
        count: 12,
        radius: 48,
        colors: ["#155eef", "#ffffff", "#155eef", "#155eef", "#ffffff"],
      });
    }
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
        className={styles.addBtn}
        onClick={handleAdd}
      >
        <span className={styles.addPlus} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        Add to quote
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
      {/* key re-mounts on qty change to replay the bounce + accent flash */}
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
            sizes="(max-width: 640px) 74vw, (max-width: 1280px) 34vw, 22vw"
            className={styles.photo}
          />
          {item.hoverImage && (
            <Image
              src={item.hoverImage}
              alt=""
              fill
              sizes="(max-width: 640px) 74vw, (max-width: 1280px) 34vw, 22vw"
              className={styles.photoCross}
              aria-hidden="true"
            />
          )}
        </Link>
        {item.badge && (
          <span
            className={`${styles.badge} ${item.badge === "New" ? styles.badgeNew : ""}`}
          >
            {item.badge}
          </span>
        )}
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

function Rail({ rail }: { rail: ProductRail }) {
  const c = { "--rail-accent": rail.accent } as React.CSSProperties;

  return (
    <section id={rail.id} className={styles.rail} style={c}>
      {/* Category divider + row heading */}
      <header className={styles.railHead}>
        <div className={styles.railHeadingBlock}>
          <span className={styles.eyebrowTab}>{rail.eyebrow}</span>
          <h3 className={styles.railTitle}>{rail.title}</h3>
        </div>
        <Link href={rail.viewAllHref} className={styles.viewAll}>
          View all <span aria-hidden="true">→</span>
        </Link>
      </header>

      {/* Static 4-up grid of full cards — no partial cards, no arrows */}
      <div className={styles.cards}>
        {rail.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 50}>
            <Card item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const railContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function ProductRails() {
  const [activeRail, setActiveRail] = useState(PRODUCT_RAILS[0].id);
  const railRefs = useRef<Record<string, HTMLElement | null>>({});

  /* Scroll-spy: keep the quick-jump tab for the rail currently in view
     highlighted in its own accent colour. Async observer callback (so it
     doesn't violate the no-sync-setState-in-effect rule). */
  useEffect(() => {
    const els = PRODUCT_RAILS.map((r) => railRefs.current[r.id]).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inside = entries.filter((e) => e.isIntersecting);
        if (inside.length === 0) return;
        /* pick the rail closest to the top of the viewport centre band */
        const top = inside.reduce((best, e) =>
          e.boundingClientRect.top < best.boundingClientRect.top ? e : best,
        );
        const id = (top.target as HTMLElement).id;
        if (id) setActiveRail(id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (id: string) => {
    railRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.sectionHead}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="ng-eyebrow" style={{ color: "var(--ng-accent-blue)" }}>
            Who We Equip
          </p>
          <h2 className={styles.sectionTitle}>Shop the collections</h2>
          <p className={styles.sectionSub}>
            Three ranges, one standard — professional workwear, uniforms and
            branding for every team in PNG.
          </p>

          {/* Quick-jump tabs — smooth-scroll to each range */}
          <nav className={styles.tabs} aria-label="Shop ranges">
            {PRODUCT_RAILS.map((rail) => {
              const isActive = activeRail === rail.id;
              return (
                <button
                  key={rail.id}
                  type="button"
                  className={`${styles.tab}${isActive ? ` ${styles.tabActive}` : ""}`}
                  style={
                    { "--tab-accent": rail.accent } as React.CSSProperties
                  }
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => jumpTo(rail.id)}
                >
                  {rail.eyebrow}
                </button>
              );
            })}
          </nav>
        </motion.div>

        <motion.div
          variants={railContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {PRODUCT_RAILS.map((rail) => (
            <div key={rail.id} ref={(el) => { railRefs.current[rail.id] = el; }}>
              <Rail rail={rail} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
