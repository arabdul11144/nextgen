"use client";

import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  /** Use when button sits on a dark background */
  onDark?: boolean;
  disabled?: boolean;
  /** Render as a link */
  href?: string;
  className?: string;
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  onDark = false,
  disabled = false,
  href,
  className = "",
  onClick,
}: ButtonProps) {
  const classes = [
    styles.button,
    variant === "primary" ? styles.primary : styles.secondary,
    onDark && variant === "secondary" ? styles.onDark : "",
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const arrow = (
    <span className={styles.arrow} aria-hidden="true">
      →
    </span>
  );

  if (href) {
    return (
      <a href={href} className={classes} aria-disabled={disabled || undefined}>
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      {arrow}
    </button>
  );
}
