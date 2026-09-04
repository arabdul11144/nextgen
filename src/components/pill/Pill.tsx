import styles from "./Pill.module.css";

interface PillProps {
  children: React.ReactNode;
  variant?: "default" | "orange" | "yellow" | "blue" | "graphite" | "outline" | "outlineOnDark";
  className?: string;
}

export function Pill({
  children,
  variant = "default",
  className = "",
}: PillProps) {
  return (
    <span className={`${styles.pill} ${styles[variant]} ${className}`.trim()}>
      {children}
    </span>
  );
}
