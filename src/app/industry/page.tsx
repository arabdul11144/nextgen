import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components";
import { Button } from "@/components/button/Button";
import { Reveal } from "@/components/reveal/Reveal";
import { WorkforceGallery } from "@/components/home/WorkforceGallery";
import { industries } from "@/data/industries";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Industries & Sector Solutions | NextGen Solutions PNG",
  description:
    "Tailored workwear, certified safety apparel, and uniform programs for Mining, Construction, Healthcare, Hospitality, Corporate and key PNG industries.",
};

interface SectorData {
  image: string;
  accent: string;
  highlights: string[];
}

const SECTOR_META: Record<string, SectorData> = {
  mining: {
    image: "/image/sector/sec_mining.jpeg",
    accent: "#ff5a1f",
    highlights: ["AS/NZS 4602.1 Hi-Vis", "FR Flame Retardant", "Heavy-Duty Coveralls", "Reflective Tape"],
  },
  construction: {
    image: "/image/sector/sec_construction.jpeg",
    accent: "#e11d48",
    highlights: ["Day/Night Class D/N", "Weatherproof Jackets", "Site Safety Vests", "Crew Branding"],
  },
  "logistics-transport": {
    image: "/image/sector/sec_logistics.jpeg",
    accent: "#38bdf8",
    highlights: ["Reinforced Trousers", "Breathable Work Polos", "Fleet Outerwear", "ID Badging"],
  },
  "energy-utilities": {
    image: "/image/sector/sec_energy.jpeg",
    accent: "#f5a623",
    highlights: ["Arc-Flash Rated", "Anti-Static Fabrics", "Substation Hi-Vis", "Waterproof Shells"],
  },
  "hospitality-tourism": {
    image: "/image/sector/sec_hospitality.jpeg",
    accent: "#0f766e",
    highlights: ["Front-of-House Suiting", "Breathable Chef Jackets", "Coordinated Aprons", "Resort Polos"],
  },
  "agriculture-fisheries": {
    image: "/image/sector/sec_agriculture.jpeg",
    accent: "#10b981",
    highlights: ["UPF 50+ Sun Protection", "Heavy-Duty Canvas", "Water-Repellent Gear", "Field PPE"],
  },
  healthcare: {
    image: "/image/sector/sec_healthcare.jpeg",
    accent: "#38bdf8",
    highlights: ["Anti-Microbial Scrubs", "Sterile Lab Coats", "Theatre Uniforms", "Department Colours"],
  },
  education: {
    image: "/image/sector/sec_education.jpeg",
    accent: "#7c3aed",
    highlights: ["School Crest Embroidery", "Durable School Uniforms", "Sports Kits", "House Polos"],
  },
  corporate: {
    image: "/image/sector/sec_corporate_sector.jpeg",
    accent: "#155eef",
    highlights: ["Tailored Executive Suiting", "Wrinkle-Resistant Shirts", "Silk Scarves & Ties", "Embroidered Blazers"],
  },
  security: {
    image: "/image/sector/sec_security.jpeg",
    accent: "#1e3a8a",
    highlights: ["Tactical Patrol Gear", "Epaulettes & Badges", "Weatherproof Parkas", "Hi-Vis Enforcement"],
  },
  sports: {
    image: "/image/sector/sec_sports.jpeg",
    accent: "#f5a623",
    highlights: ["Full-Colour Sublimation", "Matchday Jerseys", "Training Warm-ups", "Custom Numbering"],
  },
};

const standards = [
  {
    badge: "AS/NZS 4602.1:2011",
    title: "High-Visibility Compliance",
    text: "Certified fluorescent daylight and retroreflective nighttime tape standards for high-risk mining and construction zones.",
  },
  {
    badge: "NFPA 2112 & ISO 11612",
    title: "Flame Retardant Protection",
    text: "Engineered flame-resistant apparel protecting against flash fires, electric arc events, and extreme heat environments.",
  },
  {
    badge: "AS 4399:2020",
    title: "UPF 50+ UV Defense",
    text: "Fabrics tested to block 98%+ of harmful ultraviolet radiation, vital for outdoor field operations across PNG.",
  },
  {
    badge: "HACCP & Clinical Standards",
    title: "Hygiene & Infection Control",
    text: "Bleach-tolerant, anti-microbial fabrics tailored for commercial kitchens, hospitals, and clinical laboratory environments.",
  },
];

export default function IndustryPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className={styles.hero}>
        <span className={styles.heroMesh} aria-hidden="true" />
        <Container>
          <Reveal className={styles.heroContent}>
            <span className={`${styles.heroEyebrow} ng-eyebrow`}>
              <span className={styles.heroEyebrowDash} aria-hidden="true" />
              PNG SECTOR-SPECIFIC WORKFORCE SOLUTIONS
            </span>
            <h1 className={styles.heroHeadline}>
              Uniforms &amp; Safety Solutions Engineered for PNG&apos;s Core Sectors.
            </h1>
            <p className={styles.heroSubhead}>
              Every industry in Papua New Guinea has unique operational demands — from underground
              mine safety regulations and extreme weather conditions to refined corporate presence.
              We design and deliver sector-certified uniform programs built to perform.
            </p>
            <div className={styles.heroBadges}>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> 11 Specialized Industries
              </span>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> AS/NZS Certified Safety
              </span>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> Custom Sector Badging
              </span>
              <span className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} /> Nationwide Program Pricing
              </span>
            </div>
            <div className={styles.heroActions}>
              <Button href="/contact">Request Sector Quote</Button>
              <Button href="#sectors" variant="secondary" onDark>
                Explore All Sectors
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 2. Interactive Workforce Gallery (Hover-expand PNG Photography) ── */}
      <WorkforceGallery />

      {/* ── 3. Complete 11 Industry Sectors Directory ── */}
      <section className={styles.directory} id="sectors">
        <Container>
          <div className={`${styles.sectionHeader} ${styles.sectionHeaderCenter}`}>
            <span className={`${styles.sectionEyebrow} ng-eyebrow`}>EXPLORE BY SECTOR</span>
            <h2 className={styles.sectionTitle}>Engineered for Your Team&apos;s Environment</h2>
            <p className={styles.sectionDesc}>
              Discover standard uniform packages, safety compliance ratings, and custom finishing
              tailored to your industry.
            </p>
          </div>

          <div className={styles.grid}>
            {industries.map((ind) => {
              const meta = SECTOR_META[ind.slug] || {
                image: "/image/sector/sec_mining.jpeg",
                accent: "var(--ng-accent-blue)",
                highlights: ["High-durability build", "Custom logo embroidery", "Trade bulk pricing"],
              };

              return (
                <Reveal
                  key={ind.slug}
                  className={styles.card}
                  style={{ "--card-accent": meta.accent } as React.CSSProperties}
                >
                  <div className={styles.cardMedia}>
                    <Image
                      src={meta.image}
                      alt={ind.name}
                      fill
                      quality={100}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.cardImg}
                    />
                    <span className={styles.cardScrim} aria-hidden="true" />
                    <span
                      className={styles.cardTag}
                      style={{ background: meta.accent }}
                    >
                      {ind.shortName}
                    </span>
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{ind.name}</h3>
                    <p className={styles.cardDesc}>{ind.description}</p>

                    <div className={styles.cardHighlights}>
                      <span className={styles.highlightLabel}>Sector Gear Checklist:</span>
                      <div className={styles.highlightList}>
                        {meta.highlights.map((h) => (
                          <span key={h} className={styles.highlightItem}>
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.cardFooter}>
                      <Link href="/contact" className={styles.cardLink}>
                        Equip This Sector <span aria-hidden="true">&rarr;</span>
                      </Link>
                      <Link href="/services" className={styles.cardLink} style={{ color: "var(--ng-slate)" }}>
                        View Products
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── 4. Safety & Compliance Standards ── */}
      <section className={styles.standards}>
        <Container>
          <div className={styles.sectionHeader}>
            <span className={`${styles.sectionEyebrow} ng-eyebrow`}>REGULATORY COMPLIANCE</span>
            <h2 className={styles.sectionTitle}>Built to International &amp; PNG Standards</h2>
            <p className={styles.sectionDesc}>
              We ensure every garment supplied adheres to rigorous health, safety, and operational
              guidelines so your team stays fully protected.
            </p>
          </div>

          <div className={styles.standardsGrid}>
            {standards.map((std) => (
              <Reveal key={std.badge} className={styles.standardCard}>
                <span className={styles.standardBadge}>{std.badge}</span>
                <h3 className={styles.standardTitle}>{std.title}</h3>
                <p className={styles.standardText}>{std.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 5. Closing CTA ── */}
      <section className={styles.cta}>
        <span className={styles.ctaGlow} aria-hidden="true" />
        <Container>
          <div className={styles.ctaContent}>
            <span className={`${styles.ctaEyebrow} ng-eyebrow`}>PARTNER WITH NEXTGEN</span>
            <h2 className={styles.ctaTitle}>
              Outfit Your Entire Workforce on One Account
            </h2>
            <p className={styles.ctaSub}>
              From scoping site safety kits to scheduling rolling departmental deliveries across
              Papua New Guinea, our specialist corporate team makes procurement effortless.
            </p>
            <div className={styles.ctaActions}>
              <Button href="/contact">Request an Industry Quote</Button>
              <Button href="/services" variant="secondary" onDark>
                Browse Our Services
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
