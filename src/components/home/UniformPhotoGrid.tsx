"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SHOP_BY_COLLECTION } from "@/data/home-content";
import styles from "./ShopByCollection.module.css";

type CardItem = (typeof SHOP_BY_COLLECTION.items)[number];

const SLOT_COUNT = 4;
const BASE_INTERVAL = 5200;
const JITTER = 800;
const SLOT_STAGGER = [0, 900, 1800, 2700];
const FADE_DURATION = 700;

/* Representative static set for prefers-reduced-motion: one per broad category */
const STATIC_SET = [
  SHOP_BY_COLLECTION.items[0], // Industrial / hi-vis
  SHOP_BY_COLLECTION.items[1], // Corporate
  SHOP_BY_COLLECTION.items[2], // School
  SHOP_BY_COLLECTION.items[3], // Medical
];

function randomInterval(): number {
  return BASE_INTERVAL + (Math.random() * 2 - 1) * JITTER;
}

function snapshotReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function UniformPhotoGrid() {
  /* Per-slot current image */
  const [slots, setSlots] = useState<CardItem[]>(() =>
    SHOP_BY_COLLECTION.items.slice(0, SLOT_COUNT) as unknown as CardItem[],
  );

  const [fadingSlots, setFadingSlots] = useState<boolean[]>(
    Array(SLOT_COUNT).fill(false),
  );
  const [pausedSlots, setPausedSlots] = useState<boolean[]>(
    Array(SLOT_COUNT).fill(false),
  );
  const [reducedMotion, setReducedMotion] = useState<boolean>(() =>
    snapshotReducedMotion(),
  );

  /* Ref mirrors of state for use inside timeouts (avoid stale closures).
     Updated in effects, not during render. */
  const slotsRef = useRef(slots);
  const pausedRef = useRef(pausedSlots);
  const reducedMotionRef = useRef(reducedMotion);
  const scheduleRef = useRef<(index: number, delay?: number) => void>(() => {});

  /* Per-slot "recently shown" queues to bias against repeats */
  const recentQueueRef = useRef<CardItem[][]>(
    Array.from({ length: SLOT_COUNT }, () => []),
  );

  const gridRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(true);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const pickForSlot = useCallback((slotIndex: number): CardItem => {
    const currentSlots = slotsRef.current;
    const current = currentSlots[slotIndex];
    const queue = recentQueueRef.current[slotIndex];

    /* Other slots' current images — must not be duplicated */
    const elsewhere = currentSlots
      .map((s, i) => (i === slotIndex ? null : s))
      .filter((s): s is CardItem => s != null)
      .map((s) => s.image);

    const candidates = SHOP_BY_COLLECTION.items.filter(
      (item) =>
        item.image !== (current?.image ?? "") &&
        !elsewhere.includes(item.image),
    );

    if (candidates.length === 0) return current;

    /* Rank: never-shown first, then least-recently-shown */
    const ranked = [...candidates].sort((a, b) => {
      const aIdx = queue.findIndex((q) => q.image === a.image);
      const bIdx = queue.findIndex((q) => q.image === b.image);
      return (
        (aIdx === -1 ? Number.MAX_SAFE_INTEGER : aIdx) -
        (bIdx === -1 ? Number.MAX_SAFE_INTEGER : bIdx)
      );
    });

    /* Prefer never-shown images; otherwise choose among the least-recent half */
    const neverShown = ranked.filter(
      (r) => !queue.some((q) => q.image === r.image),
    );
    const pool =
      neverShown.length > 0
        ? neverShown
        : ranked.slice(0, Math.max(1, Math.ceil(ranked.length / 2)));

    const pick = pool[Math.floor(Math.random() * pool.length)];

    queue.unshift(pick);
    if (queue.length > 3) queue.pop();

    return pick;
  }, []);

  const loadImage = useCallback((src: string) => {
    const preload = new window.Image();
    preload.src = src;
    return preload;
  }, []);

  /* Swap a single slot: fade out current, reveal new, fade back in */
  const cycleSlot = useCallback((index: number, next: CardItem) => {
    setFadingSlots((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });

    const swapTimer = setTimeout(() => {
      setSlots((prev) => {
        const copy = [...prev];
        copy[index] = next;
        return copy;
      });
      setFadingSlots((prev) => {
        const copy = [...prev];
        copy[index] = false;
        return copy;
      });
    }, FADE_DURATION / 2);

    timersRef.current.push(swapTimer);
  }, []);

  /* Looping per-slot scheduler; reads latest state via refs, self-schedules
     through scheduleRef to stay stable and avoid stale closures. */
  const tick = useCallback(
    (index: number) => {
      if (
        reducedMotionRef.current ||
        !inViewRef.current ||
        pausedRef.current[index]
      ) {
        /* Paused / off-screen / reduced motion: wait briefly and re-check */
        const t = setTimeout(() => scheduleRef.current(index, 500), 500);
        timersRef.current.push(t);
        return;
      }

      const next = pickForSlot(index);
      /* Preload before swapping so the crossfade never shows a blank */
      loadImage(next.image);
      cycleSlot(index, next);
      /* Prefetch one more ahead to keep the cache warm */
      loadImage(pickForSlot(index).image);

      const t = setTimeout(() => scheduleRef.current(index), randomInterval());
      timersRef.current.push(t);
    },
    [cycleSlot, loadImage, pickForSlot],
  );

  /* Sync ref mirrors from state */
  useEffect(() => {
    slotsRef.current = slots;
  }, [slots]);

  useEffect(() => {
    pausedRef.current = pausedSlots;
  }, [pausedSlots]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  /* ── Mount / setup ── */
  useEffect(() => {
    reducedMotionRef.current = snapshotReducedMotion();

    /* Stable scheduler stored in a ref so tick can self-refer/self-schedule */
    scheduleRef.current = (index: number, delay?: number) => {
      const t = setTimeout(() => tick(index), delay ?? randomInterval());
      timersRef.current.push(t);
    };

    const onMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      setReducedMotion(e.matches);
    };
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", onMotionChange);

    /* IntersectionObserver: pause work when grid scrolls out of view */
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    if (gridRef.current) io.observe(gridRef.current);

    /* If not reduced motion, start the staggered per-slot loops */
    if (!snapshotReducedMotion()) {
      for (let i = 0; i < SLOT_COUNT; i++) {
        scheduleRef.current(i, randomInterval() + SLOT_STAGGER[i]);
      }
    }

    return () => {
      mq.removeEventListener("change", onMotionChange);
      io.disconnect();
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, [tick]);

  const setSlotPaused = useCallback((index: number, paused: boolean) => {
    setPausedSlots((prev) => {
      const copy = [...prev];
      copy[index] = paused;
      return copy;
    });
  }, []);

  /* Reduced motion: render a static representative set, no rotation */
  const rendered = useMemo(() => {
    if (reducedMotion) return STATIC_SET;
    return slots;
  }, [reducedMotion, slots]);

  return (
    <div className={styles.cards} ref={gridRef}>
      {rendered.map((card, i) => (
        <Tile
          key={i}
          index={i}
          card={card}
          fading={!reducedMotion && fadingSlots[i]}
          onMouseEnter={() => setSlotPaused(i, true)}
          onMouseLeave={() => setSlotPaused(i, false)}
        />
      ))}
    </div>
  );
}

/* ── Single tile render ── */
function Tile({
  index,
  card,
  fading,
  onMouseEnter,
  onMouseLeave,
}: {
  index: number;
  card: CardItem;
  fading?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <Link
      href={card.href}
      className={`${styles.card} ${styles[`cardPos${index}`] ?? ""}`}
      aria-label={`Shop ${card.label}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={`${styles.media} ${fading ? styles.mediaFade : ""}`}>
        <Image
          src={card.image}
          alt={card.alt}
          fill
          sizes="(max-width: 640px) 46vw, (max-width: 1023px) 44vw, 24vw"
          className={styles.cardImg}
          loading={index < 2 ? "eager" : "lazy"}
          priority={index < 2}
        />
      </span>

      {/* Category chip — travels with the image */}
      {card.chip && <span className={styles.chip}>{card.chip}</span>}

      {/* Caption title — bottom-centre, travels with the image */}
      <span className={styles.caption}>
        <span className={styles.captionLabel}>{card.label}</span>
      </span>
    </Link>
  );
}
