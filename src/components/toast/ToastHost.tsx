"use client";

import { useEffect, useRef, useState } from "react";
import { TOAST_EVENT, type ToastDetail } from "@/lib/toast";
import styles from "./ToastHost.module.css";

interface Toast extends ToastDetail {
  id: number;
}

/**
 * Global toast region — mounted once in the root layout.
 * Listens for showToast() events and slides confirmations in
 * from the bottom-right, auto-dismissing after a few seconds.
 */
export function ToastHost() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const onToast = (e: Event) => {
      const detail = (e as CustomEvent<ToastDetail>).detail;
      if (!detail) return;
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { ...detail, id }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4200);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, []);

  return (
    <div className={styles.region} aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div key={toast.id} className={styles.toast} role="status">
          <span className={styles.dot} aria-hidden="true" />
          <div className={styles.body}>
            <p className={styles.title}>{toast.title}</p>
            {toast.message && (
              <p className={styles.message}>{toast.message}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}