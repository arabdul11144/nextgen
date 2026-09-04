/* ============================================================
   Industries — shared between the Industries section and the
   Services system so relationships are defined once and reused.
   ============================================================ */

export interface Industry {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  /** Slugs of services relevant to this industry */
  serviceSlugs: string[];
}

export const industries: Industry[] = [
  {
    slug: "mining",
    name: "Mining & Resources",
    shortName: "MINING",
    description:
      "Heavy-duty workwear, safety apparel, and branded team uniforms for mining and resource operations.",
    serviceSlugs: [
      "mining-industrial-workwear",
      "safety-wear-hi-vis-uniforms",
      "embroidery-printing",
      "promotional-branded-merchandise",
    ],
  },
  {
    slug: "construction",
    name: "Construction",
    shortName: "CONSTRUCTION",
    description:
      "High-visibility apparel, site-ready workwear, and branded uniforms for construction crews of all sizes.",
    serviceSlugs: [
      "safety-wear-hi-vis-uniforms",
      "mining-industrial-workwear",
      "embroidery-printing",
    ],
  },
  {
    slug: "logistics-transport",
    name: "Logistics & Transport",
    shortName: "LOGISTICS",
    description:
      "Durable uniforms and branded workwear for warehouses, depots, and transport fleets.",
    serviceSlugs: [
      "mining-industrial-workwear",
      "safety-wear-hi-vis-uniforms",
      "embroidery-printing",
      "promotional-branded-merchandise",
    ],
  },
  {
    slug: "energy-utilities",
    name: "Energy & Utilities",
    shortName: "UTILITIES",
    description:
      "Field-ready safety gear and branded apparel for energy and utility teams.",
    serviceSlugs: [
      "safety-wear-hi-vis-uniforms",
      "mining-industrial-workwear",
      "embroidery-printing",
    ],
  },
  {
    slug: "hospitality-tourism",
    name: "Hospitality & Tourism",
    shortName: "HOSPITALITY",
    description:
      "Professional staff uniforms, guest-facing apparel, and branded merchandise for hotels, restaurants, and resorts.",
    serviceSlugs: [
      "hospitality-uniforms-linen-supplies",
      "executive-corporate-uniforms",
      "embroidery-printing",
      "promotional-branded-merchandise",
    ],
  },
  {
    slug: "agriculture-fisheries",
    name: "Agriculture & Fisheries",
    shortName: "AGRICULTURE",
    description:
      "Practical workwear and protective apparel for outdoor and marine operations.",
    serviceSlugs: [
      "mining-industrial-workwear",
      "safety-wear-hi-vis-uniforms",
      "embroidery-printing",
    ],
  },
  /* Additional industries referenced by the services system */
  {
    slug: "healthcare",
    name: "Healthcare",
    shortName: "HEALTHCARE",
    description:
      "Hospital wear, scrubs, and clinical apparel for healthcare teams.",
    serviceSlugs: [
      "hospital-wear-scrubs",
      "embroidery-printing",
      "promotional-branded-merchandise",
    ],
  },
  {
    slug: "education",
    name: "Education",
    shortName: "EDUCATION",
    description:
      "School uniforms, accessories, and sports apparel for schools and students.",
    serviceSlugs: [
      "school-uniforms-accessories",
      "sportswear",
      "embroidery-printing",
    ],
  },
  {
    slug: "corporate",
    name: "Corporate",
    shortName: "CORPORATE",
    description:
      "Executive and corporate uniforms, branded apparel, and merchandise for office teams.",
    serviceSlugs: [
      "executive-corporate-uniforms",
      "embroidery-printing",
      "promotional-branded-merchandise",
    ],
  },
  {
    slug: "security",
    name: "Security",
    shortName: "SECURITY",
    description:
      "Professional security uniforms with clear identification and custom branding.",
    serviceSlugs: [
      "security-uniforms",
      "embroidery-printing",
      "promotional-branded-merchandise",
    ],
  },
  {
    slug: "sports",
    name: "Sports & Clubs",
    shortName: "SPORTS",
    description:
      "Custom teamwear, sportswear, and performance apparel for clubs and schools.",
    serviceSlugs: [
      "sportswear",
      "customized-sublimation-polos-tshirts",
      "embroidery-printing",
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getIndustriesForService(serviceSlug: string): Industry[] {
  return industries.filter((i) => i.serviceSlugs.includes(serviceSlug));
}

export function getServicesForIndustry(industrySlug: string): string[] {
  const industry = getIndustry(industrySlug);
  return industry ? industry.serviceSlugs : [];
}
