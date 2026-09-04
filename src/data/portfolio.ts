/* ============================================================
   Portfolio — shared project entries referenced by services.
   Reused (not duplicated) across the Services system.
   ============================================================ */

export interface PortfolioProject {
  slug: string;
  title: string;
  client: string;
  summary: string;
  /** Service slugs associated with this project */
  serviceSlugs: string[];
  /** Industry slugs associated with this project */
  industrySlugs: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "mining-workwear-program",
    title: "Mining Workwear Program",
    client: "Site Operations Team",
    summary:
      "A full branded workwear program for a mining site operations team, from heavy-duty shirts to custom coveralls.",
    serviceSlugs: ["mining-industrial-workwear", "embroidery-printing"],
    industrySlugs: ["mining"],
  },
  {
    slug: "corporate-uniform-rollout",
    title: "Corporate Uniform Rollout",
    client: "Professional Services Firm",
    summary:
      "A polished executive and corporate uniform rollout for a professional services firm across multiple teams.",
    serviceSlugs: ["executive-corporate-uniforms", "embroidery-printing"],
    industrySlugs: ["corporate"],
  },
  {
    slug: "hospitality-front-of-house",
    title: "Hospitality Front-of-House",
    client: "Hotel & Resort Group",
    summary:
      "Refined front-of-house and restaurant uniforms for a hospitality group, coordinated across departments.",
    serviceSlugs: ["hospitality-uniforms-linen-supplies", "embroidery-printing"],
    industrySlugs: ["hospitality-tourism"],
  },
  {
    slug: "construction-hi-vis-crew",
    title: "Construction Hi-Vis Crew",
    client: "Construction Contractor",
    summary:
      "High-visibility, branded apparel for a construction contractor's site crews, built for visibility and durability.",
    serviceSlugs: ["safety-wear-hi-vis-uniforms", "embroidery-printing"],
    industrySlugs: ["construction"],
  },
  {
    slug: "school-sports-collection",
    title: "School Sports Collection",
    client: "Secondary School",
    summary:
      "A school sports collection with custom colours, crests and player numbering across multiple teams.",
    serviceSlugs: ["sportswear", "school-uniforms-accessories"],
    industrySlugs: ["education"],
  },
  {
    slug: "healthcare-team-scrubs",
    title: "Healthcare Team Scrubs",
    client: "Clinic Network",
    summary:
      "Colour-coded, clearly identified scrubs and clinical wear for a clinic network's frontline teams.",
    serviceSlugs: ["hospital-wear-scrubs", "embroidery-printing"],
    industrySlugs: ["healthcare"],
  },
  {
    slug: "security-team-uniforms",
    title: "Security Team Uniforms",
    client: "Security Provider",
    summary:
      "Professional security uniforms with clear identification and branding for a nationwide security provider.",
    serviceSlugs: ["security-uniforms", "embroidery-printing"],
    industrySlugs: ["security"],
  },
  {
    slug: "event-merchandise-campaign",
    title: "Event Merchandise Campaign",
    client: "Corporate Event",
    summary:
      "A full event merchandise campaign with branded apparel and giveaways from design to delivery.",
    serviceSlugs: ["promotional-branded-merchandise", "embroidery-printing"],
    industrySlugs: ["corporate"],
  },
  {
    slug: "sublimation-teamwear",
    title: "Sublimation Teamwear",
    client: "Sports Club",
    summary:
      "Full-colour sublimation teamwear with edge-to-edge designs for a local sports club.",
    serviceSlugs: ["customized-sublimation-polos-tshirts", "sportswear"],
    industrySlugs: ["sports"],
  },
];

export function getProjectsForService(serviceSlug: string): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.serviceSlugs.includes(serviceSlug));
}

export function getProjectsForIndustry(industrySlug: string): PortfolioProject[] {
  return portfolioProjects.filter((p) =>
    p.industrySlugs.includes(industrySlug),
  );
}
