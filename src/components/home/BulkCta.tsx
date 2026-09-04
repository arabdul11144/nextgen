import Link from "next/link";
import { BULK_BAND, SHOP_BY_COLLECTION } from "@/data/home-content";
import { Reveal } from "@/components/reveal/Reveal";
import { UniformCollage } from "./UniformCollage";
import styles from "./BulkCta.module.css";

/**
 * Bulk & corporate accounts CTA band — full-width two-column band
 * with a randomized diagonal-cut collage on the left and a bold
 * heading + copy + dark pill CTA on the right. The collage shows 4
 * images randomly chosen from the 8-item uniform pool on each page
 * load, reshuffled client-side after mount.
 */
export function BulkCta() {
  const pool = SHOP_BY_COLLECTION.items;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* ── Collage — 4 random images from the 8-item pool ── */}
          <Reveal>
            <UniformCollage pool={pool} />
          </Reveal>

          {/* ── Copy ── */}
          <Reveal delay={120} className={styles.copy}>
            <p className="ng-eyebrow" style={{ color: "var(--ng-accent-blue)" }}>
              {BULK_BAND.eyebrow}
            </p>
            <h2 className={styles.title}>{BULK_BAND.title}</h2>
            {BULK_BAND.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className={styles.paragraph}>
                {p}
              </p>
            ))}
            <Link href={BULK_BAND.ctaHref} className={styles.cta}>
              {BULK_BAND.cta}
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}