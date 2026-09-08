import type { Metadata } from "next";
import { Container } from "@/components";
import { Button } from "@/components/button/Button";
import { Reveal } from "@/components/reveal/Reveal";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { PortfolioClient } from "./PortfolioClient";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Delivered Projects Portfolio | NextGen Solutions PNG",
  description:
    "Explore case studies of custom uniform rollouts, safety workwear programs, and branded merchandise delivered for teams across Papua New Guinea.",
};

export default function PortfolioPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className={styles.hero}>
        <span className={styles.heroMesh} aria-hidden="true" />
        <Container>
          <Reveal className={styles.heroContent}>
            <span className={`${styles.heroEyebrow} ng-eyebrow`}>
              <span className={styles.heroEyebrowDash} aria-hidden="true" />
              PROVEN TRACK RECORD ACROSS PNG
            </span>
            <h1 className={styles.heroHeadline}>
              Work That Outfits Real PNG Teams.
            </h1>
            <p className={styles.heroSubhead}>
              Explore our delivered projects — from comprehensive mining workwear rollouts and
              tailored executive uniforms to school sportswear collections, clinical scrubs, and
              custom merchandise campaigns.
            </p>
            <div className={styles.heroBadges}>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> 500+ Projects Completed
              </span>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> 30+ Years Track Record
              </span>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> 100% Nationwide Delivery
              </span>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> Multi-Sector Expertise
              </span>
            </div>
            <div className={styles.heroActions}>
              <Button href="/contact">Start Your Team&apos;s Project</Button>
              <Button href="/services" variant="secondary" onDark>
                Browse Our Services
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 2. Interactive Filter & Projects ── */}
      <PortfolioClient />

      {/* ── 3. Brand & Supplier Marquee ── */}
      <section className={styles.marqueeSection}>
        <Container>
          <div className={styles.marqueeHeader}>
            <span className={`${styles.marqueeEyebrow} ng-eyebrow`}>
              TRUSTED APPAREL &amp; WORKWEAR BRANDS
            </span>
          </div>
        </Container>
        <BrandMarquee />
      </section>

      {/* ── 4. Closing CTA ── */}
      <section className={styles.cta}>
        <span className={styles.ctaGlow} aria-hidden="true" />
        <Container>
          <div className={styles.ctaContent}>
            <span className={`${styles.ctaEyebrow} ng-eyebrow`}>YOUR PROJECT NEXT</span>
            <h2 className={styles.ctaTitle}>
              Ready to Equip Your Workforce with NextGen?
            </h2>
            <p className={styles.ctaSub}>
              Whether you need 20 embroidered polo shirts or 1,000 full-site safety uniforms,
              our team handles design, sizing sets, branding, and dispatch with precision.
            </p>
            <div className={styles.ctaActions}>
              <Button href="/contact">Request a Custom Quote</Button>
              <Button href="/about" variant="secondary" onDark>
                About NextGen
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
