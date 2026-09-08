import { MotionDiv } from "./BrandMarqueeMotion";
import { LogoMarquee } from "@/components/logo-marquee/LogoMarquee";
import { biz } from "@/data";
import styles from "./BrandMarquee.module.css";

export function BrandMarquee() {
  return (
    <section className={styles.section}>
      <div className={styles.sheen} aria-hidden="true" />
      <span className={styles.accentLine} aria-hidden="true" />
      <div className={styles.inner}>
        <MotionDiv className={styles.head}>
          <p className={styles.eyebrow}>Brand Lines We Carry</p>
          <span className={styles.headRule} aria-hidden="true" />
          <p className={styles.heading}>
            &amp; Finish for PNG Teams
          </p>
        </MotionDiv>
        <MotionDiv className={styles.marqueeWrap} delay={0.15}>
          <LogoMarquee logos={biz} altBase="Brand line" />
        </MotionDiv>
      </div>
    </section>
  );
}
