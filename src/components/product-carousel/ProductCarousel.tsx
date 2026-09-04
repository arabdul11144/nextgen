"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GENERIC_IMAGE } from "@/data/images";
import styles from "./ProductCarousel.module.css";

interface ProductCarouselProps {
  count?: number;
  altBase?: string;
}

export function ProductCarousel({ count = 3, altBase = "Product showcase" }: ProductCarouselProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, 3200);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className={styles.carousel} role="img" aria-label={altBase}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${styles.slide} ${i === active ? styles.active : ""}`}
          aria-hidden={i !== active}
        >
          <Image
            src={GENERIC_IMAGE}
            alt={`${altBase} ${i + 1}`}
            width={640}
            height={640}
            className={styles.image}
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
}
