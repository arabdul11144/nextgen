import type { ReactNode } from "react";
import styles from "./TagChip.module.css";

interface TagChipProps {
  children: ReactNode;
  /** Color of the leading dot — used for category wayfinding */
  dotColor?: string;
  /** On dark backgrounds the chip surface lightens */
  tone?: "light" | "dark";
}

/**
 * Small tag-shaped section label with a clipped corner and a
 * colored dot — echoes a garment care label.
 */
export function TagChip({
  children,
  dotColor = "var(--ng-orange)",
  tone = "light",
}: TagChipProps) {
  return (
    <span className={`${styles.chip} ${tone === "dark" ? styles.dark : ""}`}>
      <span
        className={styles.dot}
        style={{ background: dotColor }}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}