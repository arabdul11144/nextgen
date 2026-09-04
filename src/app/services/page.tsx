import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components";
import { Button } from "@/components/button/Button";
import { Heading } from "@/components/heading/Heading";
import { ServiceCard } from "@/components/service-card/ServiceCard";
import {
  serviceCategories,
  getServicesByCategory,
} from "@/data/services";
import { industries } from "@/data/industries";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services | NextGen Solutions PNG",
  description:
    "Workwear, uniforms and branded solutions built for your organisation. Explore safety wear, corporate uniforms, custom apparel and branding services.",
};

const featuredServices = getServicesByCategory([
  "workwear-safety",
  "custom-apparel",
]).slice(0, 2);

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroContent}>
            <span className="label-technical">Our Services</span>
            <Heading level="display">
              Workwear, uniforms and branded solutions built for your
              organisation.
            </Heading>
            <p className={styles.heroSubhead}>
              From high-visibility safety wear and heavy-duty industrial
              workwear to corporate uniforms, custom apparel and branded
              merchandise, we equip your people and represent your brand across
              every industry.
            </p>
            <div className={styles.heroActions}>
              <Button href="/contact">Request a Quote</Button>
              <Button href="#services" variant="secondary" onDark>
                Explore Our Services
              </Button>
            </div>
          </div>
        </Container>

        <div className={styles.heroMeta}>
          <span className="label-technical">
            Uniforms / Workwear / Apparel / Branding / Merchandise
          </span>
        </div>
      </section>

      {/* ── Category overview strip ── */}
      <section className={styles.categories}>
        <Container>
          <div className={styles.categoriesTop}>
            <div>
              <span className="label-technical">What we do</span>
              <Heading level="h2">Built around your team.</Heading>
            </div>
          </div>
          <div className={styles.categoryGrid}>
            {serviceCategories.map((cat) => {
              const catServices = getServicesByCategory(cat.slug);
              return (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className={styles.categoryCard}
                >
                  <span className={styles.categoryCount}>
                    {String(catServices.length).padStart(2, "0")}
                  </span>
                  <span className={styles.categoryName}>{cat.name}</span>
                  <span className={styles.categoryBlurb}>{cat.blurb}</span>
                </a>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Full service directory ── */}
      <section className={styles.directory} id="services">
        <Container>
          {serviceCategories.map((cat) => {
            const catServices = getServicesByCategory(cat.slug);
            return (
              <div
                key={cat.slug}
                id={cat.slug}
                className={styles.categorySection}
              >
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryHeading}>
                    <span className="label-technical">{cat.name}</span>
                    <Heading level="h2">{cat.blurb}</Heading>
                  </div>
                  <span className={styles.categoryIndex}>
                    {String(catServices.length).padStart(2, "0")} services
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

      {/* ── Featured services (asymmetric) ── */}
      <section className={styles.featured}>
        <Container>
          <div className={styles.featuredHeader}>
            <span className="label-technical">Featured Services</span>
            <Heading level="h2">Flagship solutions.</Heading>
          </div>
          <div className={styles.featuredLayout}>
            {featuredServices.map((service, i) => {
              const cat = serviceCategories.find(
                (c) => c.slug === service.category,
              );
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`${styles.feature} ${
                    i % 2 === 0 ? styles.featureLarge : styles.featureSmall
                  }`}
                >
                  <div
                    className={`${styles.featureVisual} ${
                      styles[service.accent] ?? ""
                    }`}
                    aria-hidden="true"
                  >
                    <span className={styles.featureGlyph}>
                      {service.title
                        .replace(/[^a-zA-Z0-9]/g, "")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  </div>
                  <div className={styles.featureOverlay}>
                    <span className="label-technical">
                      {cat?.name ?? "Service"}
                    </span>
                    <h3 className={styles.featureTitle}>{service.title}</h3>
                    <span className={styles.featureExplore}>
                      Explore <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Industries connection ── */}
      <section className={styles.industries}>
        <Container>
          <div className={styles.industriesGrid}>
            <div className={styles.industriesIntro}>
              <span className="label-technical">Solutions for your industry</span>
              <Heading level="h2">
                Different industries. Different requirements. One reliable
                uniform partner.
              </Heading>
            </div>
            <div className={styles.industryChips}>
              {industries.map((industry) => (
                <Link
                  key={industry.slug}
                  href="/industry"
                  className={styles.industryChip}
                >
                  {industry.shortName}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <Container>
          <div className={styles.ctaContent}>
            <span className="label-technical">Ready when you are</span>
            <Heading level="h2">
              Let&apos;s build a uniform solution for your team.
            </Heading>
            <p className={styles.ctaSub}>
              Tell us what you need and we&apos;ll take it from there — from
              design and customisation through to production and delivery.
            </p>
            <div className={styles.ctaActions}>
              <Button href="/contact">Request a Quote</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
