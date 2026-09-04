import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components";
import { Heading } from "@/components/heading/Heading";
import { ContactForm } from "@/components/contact-form/ContactForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact & Request a Quote | NextGen Solutions PNG",
  description:
    "Get in touch with NextGen Solutions PNG to request a quote for workwear, uniforms, custom apparel, branding and merchandise.",
};

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroContent}>
            <span className="label-technical">Contact &amp; Quote</span>
            <Heading level="display">
              Tell us what you need, and we&apos;ll take it from there.
            </Heading>
            <p className={styles.heroSubhead}>
              Whether you need uniforms for five people or five hundred, our
              team will help you plan, customise and deliver the right solution
              for your organisation.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Contact body ── */}
      <section className={styles.body}>
        <Container>
          <div className={styles.bodyGrid}>
            {/* Form */}
            <div className={styles.formColumn}>
              <span className="label-technical">Request a quote</span>
              <Heading level="h2">Start your project.</Heading>
              <p className={styles.formIntro}>
                Fill in the form below and our team will get back to you about
                your requirements.
              </p>
              <ContactForm />
            </div>

            {/* Details */}
            <aside className={styles.details}>
              <div className={styles.detailBlock}>
                <span className="label-technical">Get in touch</span>
                <h3 className={styles.detailTitle}>Talk to our team</h3>
                <p className={styles.detailText}>
                  For general enquiries or to discuss a project, you can reach
                  us directly.
                </p>
              </div>

              <div className={styles.detailBlock}>
                <span className="label-technical">Services</span>
                <h3 className={styles.detailTitle}>What we provide</h3>
                <p className={styles.detailText}>
                  Workwear, uniforms, custom apparel, branding and merchandise
                  across every industry.
                </p>
                <Link href="/services" className={styles.detailLink}>
                  Explore our services <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className={styles.detailBlock}>
                <span className="label-technical">See our work</span>
                <h3 className={styles.detailTitle}>Recent projects</h3>
                <p className={styles.detailText}>
                  Browse examples of uniform and branding projects we&apos;ve
                  delivered.
                </p>
                <Link href="/portfolio" className={styles.detailLink}>
                  View portfolio <span aria-hidden="true">→</span>
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
