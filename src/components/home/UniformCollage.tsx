"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./BulkCta.module.css";

/* ── Types ── */

type PoolItem = {
  image: string;
  alt: string;
  label: string;
  href: string;
};

interface UniformCollageProps {
  pool: readonly PoolItem[];
}

/* ── Constants ── */

const SLOT_COUNT = 4;
const STAGGER_MS = 900;
const BASE_INTERVAL_MS = 5000;
const INTERVAL_JITTER_MS = 800;
const CROSSFADE_MS = 700;
const MOBILE_EXTRA_DELAY_MS = 1000;
const MOBILE_BREAKPOINT = 768;
const HISTORY_SIZE = 4;

/* ── Helpers ── */

function shortLabel(label: string): string {
  const map: Record<string, string> = {
    "Safety & Hi-Vis": "Safety",
    "Corporate Wear": "Corporate",
    "School Uniforms": "School",
    "Medical Scrubs": "Medical",
    "Hospitality & Chef Wear": "Chef",
    "Security Uniforms": "Security",
    "Mining & Industrial Wear": "Industrial",
    "Sports Uniforms": "Sports",
  };
  return map[label] ?? label;
}

function pickNext(
  pool: readonly PoolItem[],
  excludeImages: string[],
  recentHistory: string[],
): PoolItem | null {
  let candidates = pool.filter((p) => !excludeImages.includes(p.image));
  if (candidates.length === 0) {
    candidates = pool.filter((p) => p.image !== excludeImages[0]);
  }
  if (candidates.length === 0) return pool[0] ?? null;

  const scored = candidates
    .map((item) => {
      const idx = recentHistory.indexOf(item.image);
      return { item, score: idx === -1 ? -1 : idx };
    })
    .sort((a, b) => a.score - b.score);

  const bestScore = scored[0].score;
  const topCandidates = scored.filter((s) => s.score === bestScore);
  const chosen =
    topCandidates[Math.floor(Math.random() * topCandidates.length)];

  return chosen.item;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

/* ── Slot component ── */

interface SlotProps {
  slotIndex: number;
  item: PoolItem;
  outgoing: PoolItem | null;
  isTransitioning: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function Slot({
  slotIndex,
  item,
  outgoing,
  isTransitioning,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: SlotProps) {
  const cellClass = [
    styles.cell,
    styles[`cell${slotIndex + 1}`],
    isHovered ? styles.cellHover : "",
  ]
    .filter(Boolean)
    .join(" ");

  /* Chip sits in the intact outer corner of each angled tile so the
     slanted cut never clips it. */
  const chipPositions = [
    styles.chipTl,
    styles.chipTr,
    styles.chipBl,
    styles.chipBr,
  ];
  const chipPos = chipPositions[slotIndex] ?? styles.chipTl;

  return (
    <span
      className={cellClass}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {/* Outgoing image (fading out) */}
      {outgoing && isTransitioning && (
        <Image
          key={`out-${outgoing.image}`}
          src={outgoing.image}
          alt={outgoing.alt}
          fill
          sizes="(max-width: 900px) 92vw, 44vw"
          className={`${styles.photo} ${styles.fadeOut}`}
        />
      )}

      {/* Incoming image (fading in or fully visible) */}
      <Image
        key={`in-${item.image}`}
        src={item.image}
        alt={item.alt}
        fill
        sizes="(max-width: 900px) 92vw, 44vw"
        className={`${styles.photo} ${isTransitioning ? styles.fadeIn : styles.visible}`}
        loading={slotIndex < 2 ? "eager" : "lazy"}
        priority={slotIndex < 2}
      />

      {/* Vignette overlay */}
      <span className={styles.vignette} aria-hidden="true" />

      {/* Category chip */}
      <span className={styles.chip}>{shortLabel(item.label)}</span>
    </span>
  );
}

/* ── Main component ── */

/**
 * A 2×2 rotating image grid. Each of the 4 slots independently cycles
 * through the 8-item uniform pool on a staggered, randomized timer.
 */
export function UniformCollage({ pool }: UniformCollageProps) {
  const reducedMotion = usePrefersReducedMotion();

  /* Deterministic default for SSR: first 4 in array order.
   * For reduced motion, pick a representative spread. */
  const defaultItems = useRef<PoolItem[]>(
    reducedMotion
      ? [pool[0], pool[2], pool[4], pool[6]].filter(Boolean)
      : pool.slice(0, 4),
  ).current;

  const [items, setItems] = useState<PoolItem[]>(defaultItems);
  const [outgoing, setOutgoing] = useState<(PoolItem | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [transitioning, setTransitioning] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [hovered, setHovered] = useState<boolean[]>([false, false, false, false]);

  /* Refs for timer coordination (avoid stale closures) */
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const hoveredRef = useRef(hovered);
  hoveredRef.current = hovered;
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRefs = useRef<ReturnType<typeof setInterval>[]>([]);
  const historyRef = useRef<string[][]>([[], [], [], []]);

  /* Preload all pool images on mount */
  useEffect(() => {
    pool.forEach((item) => {
      const img = new window.Image();
      img.src = item.image;
    });
  }, [pool]);

  /* Pick a new image for a given slot, respecting all constraints */
  const swapSlot = useCallback(
    (slotIndex: number) => {
      const currentItems = itemsRef.current;
      const currentImage = currentItems[slotIndex]?.image;

      /* Exclude all OTHER slots' images + this slot's current */
      const otherImages = currentItems
        .map((item, i) => (i === slotIndex ? null : item?.image))
        .filter((img): img is string => img !== null);
      const excludeImages = [
        ...otherImages,
        ...(currentImage ? [currentImage] : []),
      ];

      const recentHistory = historyRef.current[slotIndex];
      const next = pickNext(pool, excludeImages, recentHistory);
      if (!next) return;

      /* Set outgoing image for crossfade */
      setOutgoing((prev) => {
        const updated = [...prev];
        updated[slotIndex] = currentItems[slotIndex] ?? null;
        return updated;
      });

      /* Start crossfade */
      setTransitioning((prev) => {
        const updated = [...prev];
        updated[slotIndex] = true;
        return updated;
      });

      /* Mid-crossfade: swap the image */
      const swapTimer = setTimeout(() => {
        setItems((prev) => {
          const updated = [...prev];
          updated[slotIndex] = next;
          return updated;
        });
        historyRef.current[slotIndex] = [
          next.image,
          ...recentHistory
            .filter((img) => img !== next.image)
            .slice(0, HISTORY_SIZE - 1),
        ];
      }, CROSSFADE_MS / 2);

      /* End crossfade: clear outgoing */
      const endTimer = setTimeout(() => {
        setTransitioning((prev) => {
          const updated = [...prev];
          updated[slotIndex] = false;
          return updated;
        });
        setOutgoing((prev) => {
          const updated = [...prev];
          updated[slotIndex] = null;
          return updated;
        });
      }, CROSSFADE_MS);

      timersRef.current.push(swapTimer, endTimer);
    },
    [pool],
  );

  /* Set up per-slot timers */
  useEffect(() => {
    if (reducedMotion) return;

    const isMobileNow =
      typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;
    const extraDelay = isMobileNow ? MOBILE_EXTRA_DELAY_MS : 0;

    for (let slotIndex = 0; slotIndex < SLOT_COUNT; slotIndex++) {
      const staggerDelay = slotIndex * STAGGER_MS;

      const staggerTimer = setTimeout(() => {
        /* First swap when this slot's timer fires */
        swapSlot(slotIndex);

        /* Recurring interval with random jitter */
        const interval = setInterval(() => {
          if (!hoveredRef.current[slotIndex]) {
            swapSlot(slotIndex);
          }
        }, BASE_INTERVAL_MS + extraDelay + (Math.random() * 2 - 1) * INTERVAL_JITTER_MS);

        intervalRefs.current[slotIndex] = interval;
      }, staggerDelay);

      timersRef.current.push(staggerTimer);
    }

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
      intervalRefs.current.forEach((i) => clearInterval(i));
      intervalRefs.current = [];
    };
  }, [reducedMotion, swapSlot]);

  /* Hover handlers */
  const handleHoverStart = useCallback((slotIndex: number) => {
    if (typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT) {
      return;
    }
    setHovered((prev) => {
      const updated = [...prev];
      updated[slotIndex] = true;
      return updated;
    });
  }, []);

  const handleHoverEnd = useCallback((slotIndex: number) => {
    setHovered((prev) => {
      const updated = [...prev];
      updated[slotIndex] = false;
      return updated;
    });
  }, []);

  return (
    <div className={styles.collage}>
      {items.map((item, i) => (
        <Slot
          key={`slot-${i}`}
          slotIndex={i}
          item={item}
          outgoing={outgoing[i] ?? null}
          isTransitioning={transitioning[i]}
          isHovered={hovered[i]}
          onHoverStart={() => handleHoverStart(i)}
          onHoverEnd={() => handleHoverEnd(i)}
        />
      ))}
    </div>
  );
}
