import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components";
import { Button } from "@/components/button/Button";
import { Reveal } from "@/components/reveal/Reveal";
import { AboutUsStat } from "@/components/home/AboutUsStat";
import { AboutProof } from "@/components/home/AboutProof";
import { CommunityNews } from "@/components/home/CommunityNews";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Us | NextGen Solutions PNG — 30+ Years Outfitting PNG",
  description:
    "NextGen Solutions PNG equips organisations across Papua New Guinea with high-performance workwear, corporate uniforms, safety apparel and custom branding.",
};

const values = [
  {
    index: "01",
    title: "Built for Real Work",
    text: "Engineered specifically for PNG's extreme terrain, high UV, wet climates, and tough industrial sites. No compromises on durability.",
    accent: "var(--ng-accent-orange, #ff5a1f)",
    image: "/image/workforce/miningandenergy.webp",
  },
  {
    index: "02",
    title: "Professional Finishing",
    text: "From tailored corporate suiting to crisp embroidery and high-res screen printing, our finishing represents your brand with pride.",
    accent: "var(--ng-accent-violet, #7c3aed)",
    image: "/image/qualitycraftmanship.webp",
  },
  {
    index: "03",
    title: "Reliable PNG Partner",
    text: "30+ years supporting PNG business. Dedicated account managers, transparent quotes, and dependable delivery to all 22 provinces.",
    accent: "var(--ng-accent-emerald, #10b981)",
    image: "/image/tailoredservice.webp",
  },
  {
    index: "04",
    title: "Your Brand Everywhere",
    text: "Consistent identity across workwear, clinical scrubs, school wear, promotional merchandise, and sports strips.",
    accent: "var(--ng-accent-gold, #f5a623)",
    image: "/image/creativecustomization.webp",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Tell Us What You Need",
    desc: "Share your team size, roles, industry environment, and branding requirements with our specialist team.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Scope & Consultation",
    desc: "We recommend compliant fabric weights, safety certifications (AS/NZS), and optimal garment cuts.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Select & Customise",
    desc: "Choose apparel colours, reflector positions, and brand placements: embroidery, sublimation, or printing.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Proofing & Approval",
    desc: "Review detailed digital proofs or physical fabric samples to guarantee exact corporate colour and logo matching.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    n: "05",
    title: "In-House Production",
    desc: "Precision manufacturing and logo finishing handled by skilled local specialists in Port Moresby.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    n: "06",
    title: "Nationwide Dispatch",
    desc: "Rigorous quality inspection, team-packed sorting, and rapid delivery across Papua New Guinea.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className={styles.hero}>
        <span className={styles.heroMesh} aria-hidden="true" />
        <Container>
          <Reveal className={styles.heroContent}>
            <span className={`${styles.heroEyebrow} ng-eyebrow`}>
              <span className={styles.heroEyebrowDash} aria-hidden="true" />
              ABOUT NEXTGEN SOLUTIONS PNG
            </span>
            <h1 className={styles.heroHeadline}>
              Equipping PNG&apos;s Workforce. Representing PNG Brands.
            </h1>
            <p className={styles.heroSubhead}>
              For over three decades, NextGen Solutions (by Consultrans) has powered organisations
              across Papua New Guinea — from heavy industrial sites and mine operations to corporate
              headquarters, healthcare clinics, and classrooms.
            </p>
            <div className={styles.heroBadges}>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> 30+ Years in Business
              </span>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> 100% Nationwide Delivery
              </span>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> Port Moresby Finishing
              </span>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> Certified Safety Standards
              </span>
            </div>
            <div className={styles.heroActions}>
              <Button href="/contact">Work With Us</Button>
              <Button href="/services" variant="secondary" onDark>
                Explore Our Services
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 2. Merged About Us + Trusted Partner stats (Moved completely from Homepage) ── */}
      <AboutUsStat />

      {/* ── 3. Confident Brand Statement & Autoplaying Media Band ── */}
      <AboutProof />

      {/* ── 4. Core Values & Approach ── */}
      <section className={styles.values}>
        <Container>
          <div className={`${styles.sectionHeader} ${styles.sectionHeaderCenter}`}>
            <span className={`${styles.sectionEyebrow} ng-eyebrow`}>WHAT WE STAND FOR</span>
            <h2 className={styles.sectionTitle}>Our Approach to Workwear &amp; Identity</h2>
            <p className={styles.sectionDesc}>
              We believe a uniform does two vital jobs: protecting your team on the job, and
              projecting your organisation&apos;s professionalism to the world.
            </p>
          </div>

          <div className={styles.valuesGrid}>
            {values.map((v) => (
              <Reveal key={v.index} className={styles.valueCard}>
                <span
                  className={styles.valueCardAccent}
                  style={{ background: v.accent }}
                  aria-hidden="true"
                />
                <div className={styles.valueMedia}>
                  <Image
                    src={v.image}
                    alt={v.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={styles.valueImg}
                  />
                </div>
                <div className={styles.valueBody}>
                  <span className={styles.valueIndex} style={{ color: v.accent }}>
                    {v.index}
                  </span>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueText}>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 5. End-to-End Procurement Process ── */}
      <section className={styles.process}>
        <Container>
          <div className={styles.sectionHeader}>
            <span className={`${styles.sectionEyebrow} ng-eyebrow`}>HOW WE WORK</span>
            <h2 className={styles.sectionTitle}>From First Enquiry to Nationwide Delivery</h2>
            <p className={styles.sectionDesc}>
              A seamless six-step program designed for corporate, procurement, and operations managers.
            </p>
          </div>

          <div className={styles.processGrid}>
            {processSteps.map((step) => (
              <Reveal key={step.n} className={styles.processCard}>
                <div className={styles.processTop}>
                  <span className={styles.processStepNum}>{step.n}</span>
                  <span className={styles.processIcon}>{step.icon}</span>
                </div>
                <h3 className={styles.processStepTitle}>{step.title}</h3>
                <p className={styles.processStepDesc}>{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 6. In the Community / Sports Sponsorships (Moved completely from Homepage) ── */}
      <CommunityNews />

      {/* ── 7. Closing CTA ── */}
      <section className={styles.cta}>
        <span className={styles.ctaGlow} aria-hidden="true" />
        <Container>
          <div className={styles.ctaContent}>
            <span className={`${styles.ctaEyebrow} ng-eyebrow`}>READY TO PARTNER?</span>
            <h2 className={styles.ctaTitle}>
              Equip Your Team with NextGen Solutions PNG
            </h2>
            <p className={styles.ctaSub}>
              Whether you need hi-vis compliance for 500 site workers or executive uniforms for your
              corporate headquarters, our team delivers quality you can trust.
            </p>
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
