import type { ReactNode } from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
  /** Optional additional class names */
  className?: string;
  /** Render as a different element */
  as?: "div" | "section" | "article" | "main";
}

export function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={`${styles.container} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
