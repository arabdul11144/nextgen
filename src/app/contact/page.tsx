import type { Metadata } from "next";
import { Container } from "@/components";
import { Button } from "@/components/button/Button";
import { Reveal } from "@/components/reveal/Reveal";
import { ContactForm } from "@/components/contact-form/ContactForm";
import { DistributorBand } from "@/components/home/DistributorBand";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { CONTACT } from "@/data/home-content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact & Request a Quote | NextGen Solutions PNG",
  description:
    "Get in touch with NextGen Solutions PNG for custom uniform quotations, bulk corporate pricing, distributor fitting advice, and nationwide delivery schedules.",
};

const regionalHubs = [
  {
    badge: "HEADQUARTERS & SHOWROOM",
    city: "Port Moresby",
    desc: "Main manufacturing facility, digital embroidery studio, full garment showroom, and administrative hub.",
    address: "National Capital District, Port Moresby, PNG",
  },
  {
    badge: "MOROBE REGIONAL DEPOT",
    city: "Lae",
    desc: "Industrial & mining bulk distribution depot, emergency safety stock, and on-site team sizing service.",
    address: "Morobe Province, Lae Industrial Corridor",
  },
  {
    badge: "HIGHLANDS HUB",
    city: "Mt Hagen",
    desc: "Direct supply center supporting resource, agricultural, and logistics operations across the Highlands.",
    address: "Western Highlands Province, Mt Hagen",
  },
  {
    badge: "ISLANDS REGIONAL OFFICE",
    city: "Kokopo",
    desc: "Maritime, hospitality, and corporate uniform supply coordinator for the New Guinea Islands region.",
    address: "East New Britain Province, Kokopo",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className={styles.hero}>
        <span className={styles.heroMesh} aria-hidden="true" />
        <Container>
          <Reveal className={styles.heroContent}>
            <span className={`${styles.heroEyebrow} ng-eyebrow`}>
              <span className={styles.heroEyebrowDash} aria-hidden="true" />
              DIRECT FROM PORT MORESBY · NATIONWIDE SERVICE
            </span>
            <h1 className={styles.heroHeadline}>
              Let&apos;s Equip Your Workforce. Request a Quote Today.
            </h1>
            <p className={styles.heroSubhead}>
              Whether you need compliant hi-vis safety workwear for 500 site personnel or executive
              uniforms for your corporate headquarters, our team provides fast quotations and
              dedicated account management.
            </p>
            <div className={styles.heroBadges}>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> 24–48hr Quote Turnaround
              </span>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> Dedicated Account Managers
              </span>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> Nationwide Shipping from POM
              </span>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> Free Sample Scoping
              </span>
            </div>
            <div className={styles.heroActions}>
              <Button href="#quote-form">Start Quote Form</Button>
              <Button href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, "")}`} variant="secondary" onDark>
                Call Us Directly
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 2. Quotation Form & Contact Details Hub ── */}
      <section className={styles.hubSection} id="quote-form">
        <Container>
          <div className={styles.hubGrid}>
            {/* Form Column */}
            <Reveal className={styles.formCard}>
              <div className={styles.formHeader}>
                <span className={`${styles.formEyebrow} ng-eyebrow`}>ONLINE QUOTATION</span>
                <h2 className={styles.formTitle}>Tell Us About Your Uniform Requirements</h2>
                <p className={styles.formIntro}>
                  Complete the details below. Our team will prepare a structured specification
                  and competitive quote within 1–2 business days.
                </p>
              </div>
              <ContactForm />
            </Reveal>

            {/* Direct Contact Details Column */}
            <div className={styles.detailsCol}>
              <Reveal className={styles.contactCard}>
                <div className={styles.contactCardHeader}>
                  <span className={styles.contactIconWrap}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <div>
                    <span className="ng-eyebrow" style={{ color: "var(--ng-accent-blue)" }}>
                      DIRECT CHANNELS
                    </span>
                    <h3 className={styles.contactCardTitle}>Speak to Our Specialists</h3>
                  </div>
                </div>

                <div className={styles.channelList}>
                  <div className={styles.channelItem}>
                    <span className={styles.channelIcon}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    <div className={styles.channelBody}>
                      <span className={styles.channelLabel}>Phone Enquiry</span>
                      <a href={CONTACT.phoneHref} className={styles.channelVal}>
                        {CONTACT.phone}
                      </a>
                      <span className={styles.channelSub}>Toll-free within PNG</span>
                    </div>
                  </div>

                  <div className={styles.channelItem}>
                    <span className={styles.channelIcon}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <div className={styles.channelBody}>
                      <span className={styles.channelLabel}>Email Department</span>
                      <a href={CONTACT.emailHref} className={styles.channelVal}>
                        {CONTACT.email}
                      </a>
                      <span className={styles.channelSub}>Quotes &amp; corporate tenders</span>
                    </div>
                  </div>

                  <div className={styles.channelItem}>
                    <span className={styles.channelIcon}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    <div className={styles.channelBody}>
                      <span className={styles.channelLabel}>Head Office Location</span>
                      <span className={styles.channelVal}>{CONTACT.address}</span>
                      <span className={styles.channelSub}>Showroom &amp; sizing sets available</span>
                    </div>
                  </div>
                </div>

                <div className={styles.hoursCard}>
                  <h4 className={styles.hoursTitle}>Operating Hours (PNG Time)</h4>
                  <div className={styles.hoursRow}>
                    <span>Monday – Friday:</span>
                    <strong>8:00 AM – 5:00 PM</strong>
                  </div>
                  <div className={styles.hoursRow}>
                    <span>Saturday:</span>
                    <strong>9:00 AM – 1:00 PM</strong>
                  </div>
                  <div className={styles.hoursRow}>
                    <span>Sunday &amp; Public Holidays:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3. Find a Distributor Banner (Moved completely from Homepage) ── */}
      <DistributorBand />

      {/* ── 4. Regional Distributor & Fitting Hubs ── */}
      <section className={styles.distributorSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <span className={`${styles.sectionEyebrow} ng-eyebrow`}>NATIONWIDE NETWORK</span>
            <h2 className={styles.sectionTitle}>Regional Distribution &amp; Fitting Centers</h2>
            <p className={styles.sectionDesc}>
              Visit an authorized NextGen showroom or schedule our mobile sizing team to visit
              your job site anywhere in Papua New Guinea.
            </p>
          </div>

          <div className={styles.hubsGrid}>
            {regionalHubs.map((hub) => (
              <Reveal key={hub.city} className={styles.hubCard}>
                <span className={styles.hubBadge}>{hub.badge}</span>
                <h3 className={styles.hubCity}>{hub.city}</h3>
                <p className={styles.hubDesc}>{hub.desc}</p>
                <span className={styles.hubAddress}>{hub.address}</span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 5. Frequently Asked Questions (Moved completely from Homepage) ── */}
      <FaqAccordion />

      {/* ── 6. Closing CTA ── */}
      <section className={styles.cta}>
        <span className={styles.ctaGlow} aria-hidden="true" />
        <Container>
          <div className={styles.ctaContent}>
            <span className={`${styles.ctaEyebrow} ng-eyebrow`}>LET&apos;S GET STARTED</span>
            <h2 className={styles.ctaTitle}>
              Equip Your Team with Papua New Guinea&apos;s Uniform Partner
            </h2>
            <p className={styles.ctaSub}>
              We are ready to assist with sizing sets, artwork proofing, compliant workwear
              specifications, and transparent bulk quotations.
            </p>
            <div className={styles.ctaActions}>
              <Button href="#quote-form">Submit Your Request</Button>
              <Button href="/services" variant="secondary" onDark>
                Explore Catalogue
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
