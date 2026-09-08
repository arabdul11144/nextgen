import Link from "next/link";
import { BULK_BAND, SHOP_BY_COLLECTION } from "@/data/home-content";
import { Reveal } from "@/components/reveal/Reveal";
import { UniformCollage } from "./UniformCollage";
import styles from "./BulkCta.module.css";

/* Split the headline into "Every Uniform." + gold "One Trusted Supplier." */
const splitTitle = (title: string): [string, string] => {
  const idx = title.indexOf(". ");
  if (idx === -1) return [title, ""];
  return [title.slice(0, idx + 1), title.slice(idx + 2)];
};

/**
 * Bulk & corporate accounts CTA band — full-width two-column band
 * with a staggered diagonal-cut collage on the left and a bold
 * heading + copy + fill-sweep gold CTA on the right. The collage
 * shows 4 images randomly chosen from the 8-item uniform pool on
 * each page load, reshuffled client-side after mount.
 */
export function BulkCta() {
  const pool = SHOP_BY_COLLECTION.items;
  const [lineOne, lineTwo] = splitTitle(BULK_BAND.title);

  return (
    <section className={styles.section}>
      <span className={styles.glowTop} aria-hidden="true" />
      <span className={styles.glowSide} aria-hidden="true" />
      <span className={styles.watermark} aria-hidden="true">
        BULK
      </span>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* ── Single-frame rotating uniform panel ── */}
          <Reveal className={styles.frameWrap}>
            <UniformCollage pool={pool} />
          </Reveal>

          {/* ── Copy ── */}
          <Reveal delay={120} className={styles.copy}>
            <p className="im-eyebrow im-eyebrow-dark">{BULK_BAND.eyebrow}</p>
            <span className={`im-accent-rule im-reveal-rule ${styles.headRule}`} aria-hidden="true" />
            <h2 className={styles.title}>
              {lineOne}
              {lineTwo && <span className={styles.titleGold}>{lineTwo}</span>}
            </h2>
            {BULK_BAND.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className={styles.paragraph}>
                {p}
              </p>
            ))}
            <Link href={BULK_BAND.ctaHref} className={styles.cta}>
              <span className={styles.ctaFill} aria-hidden="true" />
              <span className={styles.ctaLabel}>
                {BULK_BAND.cta}
                <span className={styles.ctaArrow} aria-hidden="true">→</span>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}