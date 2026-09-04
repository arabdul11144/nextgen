"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { showToast } from "@/lib/toast";

export interface BasketItem {
  /** Unique key — usually the product title + href */
  key: string;
  title: string;
  href: string;
  image?: string;
  alt?: string;
  qty: number;
}

interface QuoteBasketValue {
  items: BasketItem[];
  itemCount: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (item: Omit<BasketItem, "key" | "qty">) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clear: () => void;
}

const QuoteBasketContext = createContext<QuoteBasketValue | null>(null);

/**
 * Quote-request basket — a lightweight "basket" that collects
 * products/services a visitor is interested in and submits them
 * as ONE combined quote request (consistent with the existing
 * /contact quote flow). State is client-side only.
 */
export function QuoteBasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (item: Omit<BasketItem, "key" | "qty">) => {
      const key = `${item.href}|${item.title}`;
      setItems((prev) => {
        const existing = prev.find((i) => i.key === key);
        if (existing) {
          return prev.map((i) =>
            i.key === key ? { ...i, qty: i.qty + 1 } : i,
          );
        }
        return [...prev, { ...item, key, qty: 1 }];
      });
      showToast({
        title: "Added to your quote request",
        message: `${item.title} is in your basket. Submit one combined quote when you're ready.`,
      });
    },
    [],
  );

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<QuoteBasketValue>(
    () => ({
      items,
      itemCount: items.reduce((sum, i) => sum + i.qty, 0),
      isOpen,
      open,
      close,
      addItem,
      removeItem,
      updateQty,
      clear,
    }),
    [items, isOpen, open, close, addItem, removeItem, updateQty, clear],
  );

  return (
    <QuoteBasketContext.Provider value={value}>
      {children}
    </QuoteBasketContext.Provider>
  );
}

export function useQuoteBasket(): QuoteBasketValue {
  const ctx = useContext(QuoteBasketContext);
  if (!ctx) {
    throw new Error("useQuoteBasket must be used within QuoteBasketProvider");
  }
  return ctx;
}