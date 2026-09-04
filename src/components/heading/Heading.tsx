import type { ReactNode, ComponentPropsWithoutRef } from "react";
import styles from "./Heading.module.css";

interface HeadingProps {
  children: ReactNode;
  level: "display" | "h1" | "h2" | "h3" | "h4";
  className?: string;
}

/** Maps our level prop to the actual HTML element */
const tagMap = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
} as const;

type HeadingTag = (typeof tagMap)[keyof typeof tagMap];

export function Heading({
  children,
  level,
  className = "",
}: HeadingProps) {
  const Tag = tagMap[level] as HeadingTag;
  const props = {
    className: `${styles.heading} ${styles[level]} ${className}`.trim(),
  } satisfies ComponentPropsWithoutRef<HeadingTag>;

  return <Tag {...props}>{children}</Tag>;
}
