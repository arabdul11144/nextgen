import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components";
import { Button } from "@/components/button/Button";
import { Reveal } from "@/components/reveal/Reveal";
import { ServiceCard } from "@/components/service-card/ServiceCard";
import { ShopByCollection } from "@/components/home/ShopByCollection";
import { CustomizationHub } from "@/components/home/CustomizationHub";
import { CorporateAccounts } from "@/components/home/CorporateAccounts";
import {
  serviceCategories,
  getServicesByCategory,
  type CategorySlug,
} from "@/data/services";
import { industries } from "@/data/industries";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services & Product Catalogue | NextGen Solutions PNG",
  description:
    "Explore our complete range of certified safety workwear, corporate suiting, clinical scrubs, custom sublimation teamwear, embroidery and merchandise across PNG.",
};

const CATEGORY_ACCENTS: Record<CategorySlug, string> = {
  "workwear-safety": "#ff5a1f",
  "corporate-professional": "#7c3aed",
  "custom-apparel": "#f5a623",
  "branding-merchandise": "#10b981",
};

export default function ServicesPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className={styles.hero}>
        <span className={styles.heroMesh} aria-hidden="true" />
        <Container>
          <Reveal className={styles.heroContent}>
            <span className={`${styles.heroEyebrow} ng-eyebrow`}>
              <span className={styles.heroEyebrowDash} aria-hidden="true" />
              COMPREHENSIVE WORKFORCE SOLUTIONS
            </span>
            <h1 className={styles.heroHeadline}>
              Workwear, Uniforms &amp; Branded Solutions Built for Real Teams.
            </h1>
            <p className={styles.heroSubhead}>
              From high-visibility AS/NZS safety wear and heavy-duty industrial workwear to tailored
              corporate suiting, custom sublimation sports apparel and promotional merchandise — we
              equip your people and protect your brand across Papua New Guinea.
            </p>
            <div className={styles.heroBadges}>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> 4 Core Divisions
              </span>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> 14+ Specialized Ranges
              </span>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> In-House Branding Studio
              </span>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> Trade &amp; Bulk Pricing
              </span>
            </div>
            <div className={styles.heroActions}>
              <Button href="/contact">Request a Quote</Button>
              <Button href="#catalogue" variant="secondary" onDark>
                Browse Catalogue
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 2. Complete Uniform Range Showcase ── */}
      <ShopByCollection />

      {/* ── 3. Customization Hub (In-House Branding Studio) ── */}
      <CustomizationHub />

      {/* ── 4. Category Jump Navigation ── */}
      <section className={styles.jumpRail} id="catalogue">
        <Container>
          <div className={styles.jumpGrid}>
            {serviceCategories.map((cat) => {
              const catServices = getServicesByCategory(cat.slug);
              const accent = CATEGORY_ACCENTS[cat.slug as CategorySlug] || "#155eef";
              return (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className={styles.jumpCard}
                >
                  <div className={styles.jumpHeader}>
                    <span
                      className={styles.jumpDot}
                      style={{ background: accent }}
                      aria-hidden="true"
                    />
                    <span className={styles.jumpCount}>
                      {String(catServices.length).padStart(2, "0")} RANGES
                    </span>
                  </div>
                  <h3 className={styles.jumpTitle}>{cat.name}</h3>
                  <p className={styles.jumpBlurb}>{cat.blurb}</p>
                </a>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── 5. Full Service Directory ── */}
      <section className={styles.directory}>
        <Container>
          {serviceCategories.map((cat) => {
            const catServices = getServicesByCategory(cat.slug);
            const accent = CATEGORY_ACCENTS[cat.slug as CategorySlug] || "#155eef";
            return (
              <div
                key={cat.slug}
                id={cat.slug}
                className={styles.categorySection}
              >
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryHeading}>
                    <div className={styles.categoryEyebrowWrap}>
                      <span
                        className={styles.categoryDot}
                        style={{ background: accent }}
                        aria-hidden="true"
                      />
                      <span className="ng-eyebrow" style={{ color: accent }}>
                        {cat.name}
                      </span>
                    </div>
                    <h2 className={styles.categoryTitle}>{cat.blurb}</h2>
                  </div>
                  <span className={styles.categoryIndex}>
                    {String(catServices.length).padStart(2, "0")} specialized ranges
                  </span>
                </div>
                <div className={styles.cardGrid}>
                  {catServices.map((service) => (
                    <ServiceCard key={service.slug} service={service} />
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      {/* ── 6. Bulk & Corporate Accounts (Moved completely from Homepage) ── */}
      <CorporateAccounts />

      {/* ── 7. Industries Connection ── */}
      <section className={styles.industries}>
        <Container>
          <div className={styles.industriesInner}>
            <div className={styles.industriesIntro}>
              <span className="ng-eyebrow" style={{ color: "var(--ng-accent-blue)" }}>
                INDUSTRY SPECIFIC REQUIREMENTS
              </span>
              <h2 className={styles.industriesTitle}>
                Tailored Uniform Solutions for Every PNG Sector
              </h2>
            </div>
            <div className={styles.industryChips}>
              {industries.map((industry) => (
                <Link
                  key={industry.slug}
                  href="/industry"
                  className={styles.industryChip}
                >
                  {industry.shortName} <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 8. Closing CTA ── */}
      <section className={styles.cta}>
        <span className={styles.ctaGlow} aria-hidden="true" />
        <Container>
          <div className={styles.ctaContent}>
            <span className={`${styles.ctaEyebrow} ng-eyebrow`}>READY WHEN YOU ARE</span>
            <h2 className={styles.ctaTitle}>
              Let&apos;s Build a Uniform Solution for Your Organisation.
            </h2>
            <p className={styles.ctaSub}>
              Tell us what your people do and we&apos;ll manage everything — from compliant design
              and custom artwork proofing through to precision production and nationwide delivery.
            </p>
            <div className={styles.ctaActions}>
              <Button href="/contact">Request a Quote</Button>
              <Button href="/portfolio" variant="secondary" onDark>
                View Portfolio
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
