import { Container } from "@/components";
import { Heading } from "@/components/heading/Heading";
import { Pill } from "@/components/pill/Pill";
import styles from "./page.module.css";

export const metadata = {
  title: "Industries | NextGen Solutions PNG",
  description:
    "Workforce solutions tailored for mining, construction, logistics, and other key industries across Papua New Guinea.",
};

export default function IndustryPage() {
  return (
    <section className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroContent}>
            <Pill>Industries</Pill>
            <Heading level="display">
              Solutions Built for Your Industry.
            </Heading>
            <p className={styles.heroSubhead}>
              From mining and construction to logistics and hospitality, we
              understand the unique demands of every sector operating in Papua
              New Guinea.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Industries Grid ── */}
      <section className={styles.industries}>
        <Container>
          <div className={styles.grid}>
            {(
              [
                {
                  name: "Mining & Resources",
                  desc: "Heavy-duty workwear, PPE, and safety systems for underground and open-cut operations.",
                  tags: ["PPE", "Safety Systems"],
                },
                {
                  name: "Construction",
                  desc: "High-visibility apparel, branded team uniforms, and site-ready workwear for crews of all sizes.",
                  tags: ["Branding", "Workwear"],
                },
                {
                  name: "Logistics & Transport",
                  desc: "Durable uniforms, fleet branding, and operational supplies for warehouses and transport fleets.",
                  tags: ["Fleet", "Uniforms"],
                },
                {
                  name: "Energy & Utilities",
                  desc: "Specialised safety gear and branded apparel for field and control room teams.",
                  tags: ["Safety", "Field Gear"],
                },
                {
                  name: "Hospitality & Tourism",
                  desc: "Professional staff uniforms, guest-facing apparel, and branded merchandise.",
                  tags: ["Uniforms", "Branding"],
                },
                {
                  name: "Agriculture & Fisheries",
                  desc: "Practical workwear and protective equipment for outdoor operations across PNG.",
                  tags: ["PPE", "Workwear"],
                },
              ] as const
            ).map((industry) => (
              <article key={industry.name} className={styles.card}>
                <Heading level="h3">{industry.name}</Heading>
                <p className={styles.cardDesc}>{industry.desc}</p>
                <div className={styles.cardTags}>
                  {industry.tags.map((tag) => (
                    <Pill key={tag}>{tag}</Pill>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </section>
  );
}
