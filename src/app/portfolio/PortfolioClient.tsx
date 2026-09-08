"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components";
import { Reveal } from "@/components/reveal/Reveal";
import { portfolioProjects, type PortfolioProject } from "@/data/portfolio";
import { services } from "@/data/services";
import styles from "./page.module.css";

const PROJECT_MEDIA: Record<string, { image: string; accent: string }> = {
  "mining-workwear-program": {
    image: "/image/proven_tasks/mining_workwear_program.jpeg",
    accent: "#ff5a1f",
  },
  "corporate-uniform-rollout": {
    image: "/image/proven_tasks/corporate_uniform_rollout.jpeg",
    accent: "#155eef",
  },
  "hospitality-front-of-house": {
    image: "/image/proven_tasks/hospitality_front_of_house.jpeg",
    accent: "#0f766e",
  },
  "construction-hi-vis-crew": {
    image: "/image/proven_tasks/construction_hivis_crew.jpeg",
    accent: "#e11d48",
  },
  "school-sports-collection": {
    image: "/image/proven_tasks/school_sports_collection.jpeg",
    accent: "#7c3aed",
  },
  "healthcare-team-scrubs": {
    image: "/image/proven_tasks/healthcare_team_scrubs.jpeg",
    accent: "#10b981",
  },
  "security-team-uniforms": {
    image: "/image/proven_tasks/security_team_uniforms.jpeg",
    accent: "#1e3a8a",
  },
  "event-merchandise-campaign": {
    image: "/image/proven_tasks/event_merchandise_campaign.jpeg",
    accent: "#f5a623",
  },
  "sublimation-teamwear": {
    image: "/image/proven_tasks/sublimation_teamwear.jpeg",
    accent: "#ff5a1f",
  },
};

const FILTERS = [
  { id: "all", label: "All Projects" },
  { id: "mining", label: "Mining & Construction" },
  { id: "corporate", label: "Corporate & Hospitality" },
  { id: "healthcare", label: "Healthcare & Education" },
  { id: "sports", label: "Sports & Merchandise" },
];

export function PortfolioClient() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = portfolioProjects.filter((project) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "mining") {
      return (
        project.industrySlugs.includes("mining") ||
        project.industrySlugs.includes("construction") ||
        project.industrySlugs.includes("security")
      );
    }
    if (activeFilter === "corporate") {
      return (
        project.industrySlugs.includes("corporate") ||
        project.industrySlugs.includes("hospitality-tourism")
      );
    }
    if (activeFilter === "healthcare") {
      return (
        project.industrySlugs.includes("healthcare") ||
        project.industrySlugs.includes("education")
      );
    }
    if (activeFilter === "sports") {
      return (
        project.industrySlugs.includes("sports") ||
        project.serviceSlugs.includes("promotional-branded-merchandise") ||
        project.serviceSlugs.includes("customized-sublimation-polos-tshirts")
      );
    }
    return true;
  });

  return (
    <>
      {/* ── Filter Tabs ── */}
      <section className={styles.filterSection}>
        <Container>
          <div className={styles.filterTabs}>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`${styles.filterTab} ${
                  activeFilter === f.id ? styles.filterTabActive : ""
                }`}
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Project Grid ── */}
      <section className={styles.gridSection}>
        <Container>
          <div className={styles.grid}>
            {filteredProjects.map((project, i) => {
              const meta = PROJECT_MEDIA[project.slug] || {
                image: "/image/proven_tasks/mining_workwear_program.jpeg",
                accent: "var(--ng-accent-blue)",
              };

              const projectServices = services.filter((s) =>
                project.serviceSlugs.includes(s.slug),
              );

              return (
                <Reveal
                  key={project.slug}
                  className={styles.card}
                  style={{ "--card-accent": meta.accent } as React.CSSProperties}
                >
                  <div className={styles.cardMedia}>
                    <Image
                      src={meta.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.cardImg}
                    />
                    <span className={styles.cardScrim} aria-hidden="true" />
                    <span
                      className={styles.cardClientBadge}
                      style={{ background: meta.accent }}
                    >
                      {project.client}
                    </span>
                    <span className={styles.cardIndex}>
                      #{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className={styles.cardBody}>
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
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
