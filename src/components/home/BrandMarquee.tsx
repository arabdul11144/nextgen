import { biz } from "@/data/";
import { LogoMarquee } from "@/components/logo-marquee/LogoMarquee";
import styles from "./BrandMarquee.module.css";

/**
 * BrandMarquee — full-width dark-gradient band with gradient accent bar,
 * uppercase heading, and the logo marquee. Placed just above the footer
 * on the home page.
 */
export function BrandMarquee() {
  if (!biz.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.accentBar} />
      <div className={styles.inner}>
        <p className={styles.heading}>
          Brand Lines We Carry &amp; Finish for PNG Teams
        </p>
        <LogoMarquee logos={biz} altBase="Brand line" />
      </div>
    </section>
  );
}
