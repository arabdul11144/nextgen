import type { Metadata } from "next";
import { Container } from "@/components";
import { Button } from "@/components/button/Button";
import { Heading } from "@/components/heading/Heading";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About | NextGen Solutions PNG",
  description:
    "NextGen Solutions PNG provides workwear, uniforms, custom apparel, branding and merchandise solutions for organisations across Papua New Guinea.",
};

const values = [
  {
    title: "Built for real work",
    text: "Every product is selected and finished with the demands of real working environments in mind.",
  },
  {
    title: "Professional finishing",
    text: "From production through branding, we focus on quality and consistent, polished results.",
  },
  {
    title: "A reliable partner",
    text: "We work closely with your team from enquiry to delivery, so your people stay fully outfitted.",
  },
  {
    title: "Your identity, everywhere",
    text: "We help your branding carry across workwear, uniforms and merchandise consistently.",
  },
];

const process = [
  { n: "01", label: "Tell us what you need" },
  { n: "02", label: "Discuss your requirements" },
  { n: "03", label: "Select & customise" },
  { n: "04", label: "Approval" },
  { n: "05", label: "Production" },
  { n: "06", label: "Delivery" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroContent}>
            <span className="label-technical">About us</span>
            <Heading level="display">
              Equipping people. Representing brands.
            </Heading>
            <p className={styles.heroSubhead}>
              NextGen Solutions PNG supplies workwear, uniforms, custom apparel,
              branding and merchandise for organisations operating across Papua
              New Guinea.
            </p>
            <div className={styles.heroActions}>
              <Button href="/contact">Work With Us</Button>
              <Button href="/services" variant="secondary" onDark>
                Our Services
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Introduction ── */}
      <section className={styles.intro}>
        <Container>
          <div className={styles.introGrid}>
            <div className={styles.introLead}>
              <span className="label-technical">Who we are</span>
              <Heading level="h2">
                Your uniform and branding partner in PNG.
              </Heading>
            </div>
            <div className={styles.introBody}>
              <p className={styles.introPara}>
                Our team helps organisations of every size keep their people
                equipped, protected and professional — while making sure the
                clothes they wear represent their brand.
              </p>
              <p className={styles.introPara}>
                From high-visibility safety wear and heavy-duty industrial
                workwear, to polished corporate uniforms, custom apparel and
                branded merchandise, we bring together the right products,
                customisation and finishing for each customer.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Values ── */}
      <section className={styles.values}>
        <Container>
          <div className={styles.valuesHeader}>
            <span className="label-technical">What we stand for</span>
            <Heading level="h2">Our approach.</Heading>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((value) => (
              <div key={value.title} className={styles.valueCard}>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueText}>{value.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What we do ── */}
      <section className={styles.expertise}>
        <Container>
          <div className={styles.expertiseGrid}>
            <div className={styles.expertiseIntro}>
              <span className="label-technical">What we do</span>
              <Heading level="h2">Solutions across every team.</Heading>
              <p className={styles.expertiseText}>
                Whatever the environment, we provide apparel and branding that
                supports your people and represents your organisation.
              </p>
              <Button href="/services" variant="secondary">
                Explore All Services
              </Button>
            </div>
            <ul className={styles.expertiseList}>
              <li className={styles.expertiseItem}>
                <span className={styles.expertiseIndex}>01</span>
                <span>Workwear &amp; Safety</span>
              </li>
              <li className={styles.expertiseItem}>
                <span className={styles.expertiseIndex}>02</span>
                <span>Corporate &amp; Professional Uniforms</span>
              </li>
              <li className={styles.expertiseItem}>
                <span className={styles.expertiseIndex}>03</span>
                <span>Custom Apparel &amp; Sportswear</span>
              </li>
              <li className={styles.expertiseItem}>
                <span className={styles.expertiseIndex}>04</span>
                <span>Embroidery, Printing &amp; Merchandise</span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* ── Process ── */}
      <section className={styles.process}>
        <Container>
          <div className={styles.processHeader}>
            <span className="label-technical">How we work</span>
            <Heading level="h2">From enquiry to delivery.</Heading>
          </div>
          <ol className={styles.timeline}>
            {process.map((step) => (
              <li key={step.n} className={styles.timelineStep}>
                <span className={`label-technical ${styles.stepNumber}`}>
                  {step.n}
                </span>
                <span className={styles.stepLabel}>{step.label}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <Container>
          <div className={styles.ctaContent}>
            <span className="label-technical">Let&apos;s talk</span>
            <Heading level="h2">
              Ready to outfit your team and represent your brand?
            </Heading>
            <div className={styles.ctaActions}>
              <Button href="/contact">Request a Quote</Button>
              <Button href="/portfolio" variant="secondary" onDark>
                See Our Work
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
