import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components";
import { Button } from "@/components/button/Button";
import { Heading } from "@/components/heading/Heading";
import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import { ServiceCard } from "@/components/service-card/ServiceCard";
import {
  allServiceSlugs,
  getService,
  getRelatedServices,
} from "@/data/services";
import { getIndustriesForService } from "@/data/industries";
import { getProjectsForService } from "@/data/portfolio";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return allServiceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} | NextGen Solutions PNG`,
    description: service.metaDescription,
  };
}

const processSteps = [
  "Tell us what you need",
  "Discuss your requirements",
  "Select & customise",
  "Approval",
  "Production",
  "Delivery",
];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedServices = getRelatedServices(slug);
  const serviceIndustries = getIndustriesForService(slug);
  const projects = getProjectsForService(slug);
  const accentClass = styles[service.accent] ?? "";

  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.breadcrumbWrap}>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: service.title },
              ]}
            />
          </div>
          <div className={styles.heroContent}>
            <span className="label-technical">{service.title}</span>
            <Heading level="display">{service.tagline}</Heading>
            <p className={styles.heroSubhead}>{service.shortDescription}</p>
            <div className={styles.heroActions}>
              <Button href="/contact">Request a Quote</Button>
              <Button href="#process" variant="secondary" onDark>
                How It Works
              </Button>
            </div>
          </div>
          <div className={`${styles.heroVisual} ${accentClass}`} aria-hidden="true">
            <span className={styles.heroGlyph}>
              {service.title.replace(/[^a-zA-Z0-9]/g, "").slice(0, 2).toUpperCase()}
            </span>
            <span className={styles.heroTagline}>
              {service.title.split(/\s+/).slice(0, 2).join(" ").toUpperCase()}
            </span>
          </div>
        </Container>
      </section>

      {/* ── Introduction ── */}
      <section className={styles.intro}>
        <Container>
          <div className={styles.introGrid}>
            <div className={styles.introLead}>
              <span className="label-technical">About this service</span>
              <Heading level="h2">{service.title}</Heading>
            </div>
            <div className={styles.introBody}>
              {service.introduction.slice(0, -1).map((para, i) => (
                <p
                  key={i}
                  className={i === 0 ? styles.introFirst : styles.introPara}
                >
                  {para}
                </p>
              ))}
              <p className={styles.introHighlight}>
                {service.introduction[service.introduction.length - 1]}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── What we provide ── */}
      <section className={styles.provide}>
        <Container>
          <div className={styles.provideHeader}>
            <span className="label-technical">What we provide</span>
            <Heading level="h2">Solutions for your team.</Heading>
          </div>
          <div className={styles.provideGrid}>
            {service.solutions.map((solution) => (
              <div key={solution} className={styles.provideItem}>
                <span className={styles.provideMarker} aria-hidden="true" />
                <span className={styles.provideName}>{solution}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Who it's for ── */}
      <section className={styles.whoFor}>
        <Container>
          <div className={styles.whoForContent}>
            <span className="label-technical">Who it&apos;s for</span>
            <Heading level="h2">Who is this for?</Heading>
            <p className={styles.whoForText}>{service.whoFor}</p>
          </div>
        </Container>
      </section>

      {/* ── Benefits ── */}
      <section className={styles.benefits}>
        <Container>
          <div className={styles.benefitsHeader}>
            <span className="label-technical">Why choose us</span>
            <Heading level="h2">The value we bring.</Heading>
          </div>
          <ul className={styles.benefitsGrid}>
            {service.benefits.map((benefit) => (
              <li key={benefit} className={styles.benefitItem}>
                <span className={styles.benefitMark} aria-hidden="true">
                  ✓
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Customisation ── */}
      <section className={styles.customisation}>
        <Container>
          <div className={styles.customisationGrid}>
            <div className={styles.customisationIntro}>
              <span className="label-technical">Customisation</span>
              <Heading level="h2">Make it yours.</Heading>
              <p className={styles.customisationText}>
                Every uniform can be personalised to represent your
                organisation. Choose from a range of customisation options and
                we&apos;ll handle the finishing.
              </p>
              <Button href="/services/embroidery-printing" variant="secondary">
                Embroidery &amp; Printing Services
              </Button>
            </div>
            <div className={styles.customisationOptions}>
              {service.customisation.map((option) => (
                <div key={option} className={styles.customOption}>
                  <span className={styles.customOptionName}>{option}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Related industries ── */}
      <section className={styles.industries} id="industries">
        <Container>
          <div className={styles.industriesIntro}>
            <span className="label-technical">Ideal for</span>
            <Heading level="h2">Industries we serve with this service.</Heading>
          </div>
          <div className={styles.industryChips}>
            {serviceIndustries.map((industry) => (
              <Link
                key={industry.slug}
                href="/industry"
                className={styles.industryChip}
              >
                {industry.shortName}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Related portfolio ── */}
      <section className={styles.portfolio} id="portfolio">
        <Container>
          <div className={styles.portfolioHeader}>
            <div>
              <span className="label-technical">From our portfolio</span>
              <Heading level="h2">Related projects.</Heading>
            </div>
            <Link href="/portfolio" className={styles.viewAll}>
              View all projects <span aria-hidden="true">→</span>
            </Link>
          </div>
          {projects.length > 0 ? (
            <div className={styles.portfolioGrid}>
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href="/portfolio"
                  className={styles.portfolioCard}
                >
                  <span className={styles.portfolioTitle}>{project.title}</span>
                  <span className={styles.portfolioClient}>
                    {project.client}
                  </span>
                  <p className={styles.portfolioSummary}>{project.summary}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className={styles.portfolioEmpty}>
              Explore our portfolio for examples of recent uniform and
              branding projects.
            </p>
          )}
        </Container>
      </section>

      {/* ── Process ── */}
      <section className={styles.process} id="process">
        <Container>
          <div className={styles.processHeader}>
            <span className="label-technical">Our process</span>
            <Heading level="h2">From enquiry to delivery.</Heading>
          </div>
          <ol className={styles.timeline}>
            {processSteps.map((step, i) => (
              <li key={step} className={styles.timelineStep}>
                <span className={styles.stepNumber}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.stepName}>{step}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <Container>
          <div className={styles.ctaContent}>
            <span className="label-technical">Ready to outfit your team?</span>
            <Heading level="h2">
              Let&apos;s create a uniform solution that works for your people
              and represents your organisation.
            </Heading>
            <div className={styles.ctaActions}>
              <Button href="/contact">Request a Quote</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Related services ── */}
      <section className={styles.related}>
        <Container>
          <div className={styles.relatedHeader}>
            <span className="label-technical">You may also need</span>
            <Heading level="h2">Keep exploring.</Heading>
          </div>
          <div className={styles.relatedGrid}>
            {relatedServices.slice(0, 4).map((related) => (
              <ServiceCard key={related.slug} service={related} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
