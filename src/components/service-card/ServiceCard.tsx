import Link from "next/link";
import type { Service } from "@/data/services";
import { serviceCategories } from "@/data/services";
import styles from "./ServiceCard.module.css";

export function ServiceCard({ service }: { service: Service }) {
  const category = serviceCategories.find((c) => c.slug === service.category);
  const accentClass = styles[service.accent] ?? "";

  return (
    <Link href={`/services/${service.slug}`} className={styles.card}>
      <div className={`${styles.visual} ${accentClass}`} aria-hidden="true">
        <span className={styles.visualGlyph}>
          {service.title.replace(/[^a-zA-Z0-9]/g, "").slice(0, 2).toUpperCase()}
        </span>
      </div>
      <div className={styles.body}>
        {category && (
          <span className="label-technical">{category.name.toUpperCase()}</span>
        )}
        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.description}>{service.shortDescription}</p>
        <span className={styles.explore}>
          Explore Service
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
