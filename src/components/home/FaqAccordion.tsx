"use client";

import { useCallback, useState } from "react";
import { FAQ_TABS, FAQ_ITEMS } from "@/data/home-content";
import { Reveal } from "@/components/reveal/Reveal";
import styles from "./FaqAccordion.module.css";

/**
 * FAQ — simple single-column accordion.
 * Eyebrow + heading at the top, then 5 topic groups listed top to
 * bottom: a plain bold topic label followed by its question rows.
 * One question open at a time per topic.
 */

type Category = (typeof FAQ_ITEMS)[number]["cat"];

/* ── Derived data ── */
const CATEGORIES = FAQ_TABS.filter((t) => t.key !== "all") as Array<{
  key: Category;
  label: string;
}>;

const grouped = Object.freeze(
  CATEGORIES.map((c) => ({
    ...c,
    items: FAQ_ITEMS.filter((it) => it.cat === c.key),
  })).filter((g) => g.items.length > 0),
);

/* Unique string ID for each question (stable across renders) */
const qid = (q: string) => q.replace(/\s+/g, "-");

export function FaqAccordion() {
  /* Accordion: one open per topic */
  const [openMap, setOpenMap] = useState<Record<string, string | null>>(() => {
    const m: Record<string, string | null> = {};
    for (const g of grouped) m[g.key] = null;
    return m;
  });

  const toggle = useCallback(
    (cat: string, q: string) =>
      setOpenMap((m) => ({ ...m, [cat]: m[cat] === q ? null : q })),
    [],
  );

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <h2 className={styles.title}>Frequently asked questions</h2>
        </Reveal>

        <div className={styles.list}>
          {grouped.map((group, gi) => {
            const isFirstGroup = gi === 0;
            return group.items.map((item, qi) => {
              const isOpen = openMap[group.key] === item.q;
              return (
                <Reveal key={item.q} delay={(gi * 2 + qi) * 40}>
                  <div
                    className={`${styles.item} ${
                      isOpen ? styles.itemOpen : ""
                    } ${isFirstGroup && qi === 0 ? "" : styles.itemDivider}`}
                  >
                    <button
                      type="button"
                      className={styles.question}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${qid(item.q)}`}
                      id={`faq-button-${qid(item.q)}`}
                      onClick={() => toggle(group.key, item.q)}
                    >
                      <span className={styles.qText}>{item.q}</span>
                      <span className={styles.chevron} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </button>
                    <div
                      id={`faq-panel-${qid(item.q)}`}
                      role="region"
                      aria-labelledby={`faq-button-${qid(item.q)}`}
                      className={`${styles.panel} ${
                        isOpen ? styles.panelOpen : ""
                      }`}
                    >
                      <p className={styles.answer}>{item.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            });
          })}
        </div>
      </div>
    </section>
  );
}
