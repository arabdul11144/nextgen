import type { ReactNode } from "react";
import styles from "./Section.module.css";

interface SectionProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
  /** Background variant — defaults to transparent (inherits parent) */
  theme?: "default" | "dark" | "graphite" | "warmWhite";
}

export function Section({
  children,
  className = "",
  as: Tag = "section",
  theme = "default",
}: SectionProps) {
  const themeClass =
    theme === "dark"
      ? styles.dark
      : theme === "graphite"
        ? styles.graphite
        : theme === "warmWhite"
          ? styles.warmWhite
          : "";

  return (
    <Tag className={`${styles.section} ${themeClass} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
