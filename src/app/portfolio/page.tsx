import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components";
import { Button } from "@/components/button/Button";
import { Heading } from "@/components/heading/Heading";
import { portfolioProjects } from "@/data/portfolio";
import { getServicesBySlugs } from "@/data/services";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Portfolio | NextGen Solutions PNG",
  description:
    "Explore a selection of uniform, workwear, branding and merchandise projects delivered by NextGen Solutions PNG.",
};

export default function PortfolioPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroContent}>
            <span className="label-technical">Our Work</span>
            <Heading level="display">Work that represents real teams.</Heading>
            <p className={styles.heroSubhead}>
              A selection of uniform, workwear, branding and merchandise
              projects we&apos;ve delivered for teams and organisations across
              Papua New Guinea.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Project grid ── */}
      <section className={styles.gridSection}>
        <Container>
          <div className={styles.grid}>
            {portfolioProjects.map((project, i) => {
              const projectServices = getServicesBySlugs(
                project.serviceSlugs,
              );
              return (
                <article key={project.slug} className={styles.card}>
                  <div
                    className={`${styles.cardMeta} ${
                      i % 3 === 0 ? styles.orange : i % 3 === 1 ? styles.yellow : styles.blue
                    }`}
                    aria-hidden="true"
                  >
                    <span className={styles.cardGlyph}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.cardClient}>{project.client}</span>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardSummary}>{project.summary}</p>
                    <div className={styles.cardServices}>
                      {projectServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className={styles.serviceTag}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <Container>
          <div className={styles.ctaContent}>
            <span className="label-technical">Your project next</span>
            <Heading level="h2">
              Ready to start your own uniform or branding project?
            </Heading>
            <p className={styles.ctaSub}>
              Tell us what you need and we&apos;ll build a solution around your
              team and your brand.
            </p>
            <div className={styles.ctaActions}>
              <Button href="/contact">Request a Quote</Button>
              <Button href="/services" variant="secondary" onDark>
                Explore Services
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
