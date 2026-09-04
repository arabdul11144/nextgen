/* ============================================================
   Services — single source of truth for all service data.
   The Services hub and every service detail page consume this.
   Add a new service here and the ecosystem updates automatically.
   ============================================================ */

export type CategorySlug =
  | "workwear-safety"
  | "corporate-professional"
  | "custom-apparel"
  | "branding-merchandise";

export interface ServiceCategory {
  slug: CategorySlug;
  name: string;
  blurb: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "workwear-safety",
    name: "Workwear & Safety",
    blurb:
      "Durable, high-visibility and protective apparel built for demanding work environments.",
  },
  {
    slug: "corporate-professional",
    name: "Corporate & Professional",
    blurb:
      "Polished uniforms and professional apparel that represent your organisation.",
  },
  {
    slug: "custom-apparel",
    name: "Custom Apparel",
    blurb:
      "Fully customisable, full-colour apparel for teams, events and everyday wear.",
  },
  {
    slug: "branding-merchandise",
    name: "Branding & Merchandise",
    blurb:
      "Gemstone finishing, embroidery, printing and branded merchandise to extend your identity.",
  },
];

export interface Service {
  slug: string;
  title: string;
  category: CategorySlug;
  /** Short description used on cards and listings */
  shortDescription: string;
  /** One-line hero tagline */
  tagline: string;
  /** Meta/SEO description */
  metaDescription: string;
  /** Hero introduction copy */
  introduction: string[];
  /** "What we provide" grid items */
  solutions: string[];
  /** Who this is for */
  whoFor: string;
  /** Key benefits / why choose us */
  benefits: string[];
  /** Customisation options */
  customisation: string[];
  /** Industry slugs this service is relevant to */
  industrySlugs: string[];
  /** Related service slugs for cross-linking */
  relatedServiceSlugs: string[];
  /** Visual accent — used for layered/editorial presentation */
  accent: "orange" | "yellow" | "blue";
}

export const services: Service[] = [
  {
    slug: "safety-wear-hi-vis-uniforms",
    title: "Safety Wear & Hi-Vis Uniforms",
    category: "workwear-safety",
    tagline: "Visibility when it matters most.",
    shortDescription:
      "High-visibility workwear designed for demanding work environments.",
    metaDescription:
      "High-visibility safety wear and hi-vis uniforms for PNG work environments, with custom branding and durable materials.",
    introduction: [
      "People working in high-traffic, high-risk environments need to be seen — clearly and consistently.",
      "Our safety wear and hi-vis uniforms combine high-visibility materials with practical, durable construction so your team stays protected and your organisation stays recognisable on site.",
      "From roadside crews to industrial operations, we provide dependable hi-vis apparel finished professionally and customised with your branding.",
    ],
    solutions: [
      "Hi-Vis Shirts",
      "Safety Vests",
      "Hi-Vis Jackets",
      "Work Trousers",
      "Coveralls",
      "Branded Safety Wear",
    ],
    whoFor:
      "Roads, construction, mining, logistics and any team working where visibility and protection matter most.",
    benefits: [
      "High-visibility materials suited to demanding environments",
      "Durable, practical construction built for daily wear",
      "Clear, consistent team appearance on site",
      "Custom branding to carry your organisation's identity",
      "Bulk ordering for whole crews and operations",
    ],
    customisation: [
      "Custom Fit",
      "Colour Options",
      "Logo Application",
      "Embroidery",
      "Screen Printing",
      "Branding",
    ],
    industrySlugs: [
      "mining",
      "construction",
      "logistics-transport",
      "energy-utilities",
      "agriculture-fisheries",
    ],
    relatedServiceSlugs: [
      "mining-industrial-workwear",
      "security-uniforms",
      "embroidery-printing",
      "promotional-branded-merchandise",
    ],
    accent: "yellow",
  },
  {
    slug: "mining-industrial-workwear",
    title: "Mining & Industrial Workwear",
    category: "workwear-safety",
    tagline: "Built for the hardest working conditions.",
    shortDescription:
      "Heavy-duty workwear engineered for demanding industrial and mining environments.",
    metaDescription:
      "Mining and industrial workwear engineered for PNG's toughest conditions, including custom-branded heavy-duty apparel.",
    introduction: [
      "Mining and industrial operations place exceptional demands on the people who work in them — and on the clothing they wear.",
      "We supply heavy-duty workwear built to handle rough conditions while keeping crews consistent, professional and easily identifiable.",
      "With custom branding and durable, practical materials, our industrial workwear is designed to support your team through long, demanding days.",
    ],
    solutions: [
      "Mining Shirts",
      "Heavy-Duty Workwear",
      "Industrial Trousers",
      "Coveralls",
      "Protective Workwear",
      "Custom-Branded Workwear",
    ],
    whoFor:
      "Mining, construction, energy, manufacturing, logistics and other industrial teams operating in demanding conditions.",
    benefits: [
      "Heavy-duty materials built for durability",
      "Practical designs for demanding work",
      "Consistent team appearance across operations",
      "Custom branding for site identification",
      "Bulk production for large workforces",
    ],
    customisation: [
      "Custom Fit",
      "Colour Options",
      "Embroidered Logos",
      "Screen Printing",
      "Branding",
    ],
    industrySlugs: [
      "mining",
      "construction",
      "logistics-transport",
      "energy-utilities",
      "agriculture-fisheries",
    ],
    relatedServiceSlugs: [
      "safety-wear-hi-vis-uniforms",
      "security-uniforms",
      "embroidery-printing",
      "promotional-branded-merchandise",
    ],
    accent: "orange",
  },
  {
    slug: "customized-sublimation-polos-tshirts",
    title: "Customized Sublimation Polos & T-Shirts",
    category: "custom-apparel",
    tagline: "Full-colour apparel, your design, your colours.",
    shortDescription:
      "Custom-designed sublimation polos and t-shirts in full, vibrant colour.",
    metaDescription:
      "Customized sublimation polos and t-shirts with full-colour designs for teams, companies and events in Papua New Guinea.",
    introduction: [
      "Sublimation printing lets us place your design across an entire garment — edge to edge, in full, vibrant colour.",
      "From company polos to event apparel and teamwear, our customized sublimation polos and t-shirts make it easy to create apparel that truly represents your organisation.",
      "Whether you're outfitting a team, kitting out a promotion, or building your company wardrobe, we turn your design into wearable, professional-looking apparel.",
    ],
    solutions: [
      "Custom Polos",
      "Custom T-Shirts",
      "Teamwear",
      "Event Apparel",
      "Company Apparel",
      "Full Sublimation Designs",
    ],
    whoFor:
      "Teams, clubs, events, companies and organisations looking for full-colour, custom-designed apparel.",
    benefits: [
      "Full-colour, edge-to-edge designs",
      "Comfortable, everyday-wear fabrics",
      "Unlimited design possibilities",
      "Consistent team and event identity",
      "Great for promotions, sports and events",
    ],
    customisation: [
      "Full-Colour Sublimation",
      "Custom Designs",
      "Custom Colours",
      "Logo Application",
      "Team & Event Branding",
    ],
    industrySlugs: ["sports", "corporate", "education"],
    relatedServiceSlugs: [
      "sportswear",
      "promotional-branded-merchandise",
      "embroidery-printing",
      "executive-corporate-uniforms",
    ],
    accent: "blue",
  },
  {
    slug: "hospitality-uniforms-linen-supplies",
    title: "Hospitality Uniforms & Linen Supplies",
    category: "corporate-professional",
    tagline: "Professional presentation, front and back of house.",
    shortDescription:
      "Refined uniforms and linen for hotels, restaurants, kitchens and housekeeping.",
    metaDescription:
      "Hospitality uniforms and linen supplies for hotels, restaurants, kitchens and housekeeping in Papua New Guinea.",
    introduction: [
      "First impressions matter in hospitality. Your team's presentation shapes how guests experience your venue.",
      "We supply professional hospitality uniforms and linen for front-of-house, back-of-house, kitchen and housekeeping teams — designed to look sharp and perform through busy service.",
      "From polished guest-facing attire to practical kitchen and housekeeping wear, we help your venue present a consistent, professional standard.",
    ],
    solutions: [
      "Front-of-House Uniforms",
      "Kitchen Apparel",
      "Housekeeping Uniforms",
      "Guest-Facing Attire",
      "Linen Supplies",
      "Branded Hospitality Wear",
    ],
    whoFor:
      "Hotels, restaurants, resorts, cafes, event venues and hospitality operations of every size.",
    benefits: [
      "Professional, guest-ready presentation",
      "Practical, comfortable designs for service",
      "Consistent team appearance across departments",
      "Custom branding for your venue",
      "Bulk ordering for busy operations",
    ],
    customisation: [
      "Custom Colourways",
      "Embroidered Logos",
      "Branding",
      "Coordinated Department Looks",
    ],
    industrySlugs: ["hospitality-tourism", "corporate"],
    relatedServiceSlugs: [
      "executive-corporate-uniforms",
      "embroidery-printing",
      "promotional-branded-merchandise",
    ],
    accent: "orange",
  },
  {
    slug: "executive-corporate-uniforms",
    title: "Executive & Corporate Uniforms",
    category: "corporate-professional",
    tagline: "A professional standard, from desk to boardroom.",
    shortDescription:
      "Premium executive and corporate attire that represents your brand.",
    metaDescription:
      "Executive and corporate uniforms for office teams and businesses in Papua New Guinea, finished with premium branding.",
    introduction: [
      "Your people are the face of your business. Executive and corporate uniforms help them present a polished, consistent and professional image.",
      "We design and supply corporate attire for office teams, client-facing staff and executive roles — combining premium presentation with practical comfort.",
      "With refined tailoring and discreet, high-quality branding, we help your organisation look as professional as it works.",
    ],
    solutions: [
      "Executive Shirts",
      "Corporate Polos",
      "Office Wear",
      "Client-Facing Attire",
      "Formal Uniforms",
      "Branded Corporate Apparel",
    ],
    whoFor:
      "Corporate offices, professional services, client-facing teams and organisations that value a premium presentation.",
    benefits: [
      "Polished, professional appearance",
      "Premium materials and finishing",
      "Consistent corporate identity",
      "Subtle, high-quality branding",
      "Comfortable for full working days",
    ],
    customisation: [
      "Custom Fit",
      "Colour Options",
      "Embroidered Logos",
      "Screen Printing",
      "Discreet Branding",
    ],
    industrySlugs: ["corporate", "hospitality-tourism", "security"],
    relatedServiceSlugs: [
      "hospitality-uniforms-linen-supplies",
      "embroidery-printing",
      "promotional-branded-merchandise",
      "security-uniforms",
    ],
    accent: "blue",
  },
  {
    slug: "security-uniforms",
    title: "Security Uniforms",
    category: "workwear-safety",
    tagline: "Clear, professional and instantly recognisable.",
    shortDescription:
      "Professional security apparel with clear identification and branding.",
    metaDescription:
      "Professional security uniforms with clear identification and custom branding for security teams in Papua New Guinea.",
    introduction: [
      "Security teams need to be professional, authoritative and instantly identifiable.",
      "Our security uniforms combine a sharp, professional appearance with clear identification so your team is recognised and trusted wherever they operate.",
      "We tailor uniforms to site-specific requirements and complete them with custom branding that reflects your company.",
    ],
    solutions: [
      "Security Shirts",
      "Security Polos",
      "Operational Wear",
      "Jackets & Outerwear",
      "Identification Options",
      "Custom-Branded Security Wear",
    ],
    whoFor:
      "Security companies, site security teams, and organisations maintaining security presence on their premises.",
    benefits: [
      "Professional, authoritative appearance",
      "Clear identification and recognition",
      "Site-specific customisation",
      "Consistent team look",
      "Durable, practical construction",
    ],
    customisation: [
      "Custom Branding",
      "Identification Details",
      "Colour Schemes",
      "Embroidered Logos",
      "Site-Specific Options",
    ],
    industrySlugs: ["security", "mining", "corporate", "hospitality-tourism"],
    relatedServiceSlugs: [
      "safety-wear-hi-vis-uniforms",
      "executive-corporate-uniforms",
      "embroidery-printing",
      "mining-industrial-workwear",
    ],
    accent: "orange",
  },
  {
    slug: "hospital-wear-scrubs",
    title: "Hospital Wear & Scrubs",
    category: "corporate-professional",
    tagline: "Comfort and confidence for healthcare teams.",
    shortDescription:
      "Clinical apparel and scrubs designed for comfort and professional presentation.",
    metaDescription:
      "Hospital wear and scrubs for healthcare teams in Papua New Guinea, with comfortable clinical apparel and identification options.",
    introduction: [
      "Healthcare is demanding work, and the people who do it deserve clothing that's as hardworking as they are.",
      "Our hospital wear and scrubs are designed for comfort, movement and professional presentation, so clinical teams can focus on what matters — patient care.",
      "With practical, durable designs and clear identification options, we help healthcare organisations keep their teams comfortable, consistent and professional.",
    ],
    solutions: [
      "Medical Scrubs",
      "Clinical Apparel",
      "Lab Coats",
      "Hospital Uniforms",
      "Healthcare Teamwear",
      "Identification & Branding",
    ],
    whoFor:
      "Hospitals, clinics, and healthcare teams looking for comfortable, professional clinical apparel.",
    benefits: [
      "Comfort-focused, practical designs",
      "Designed for the demands of clinical work",
      "Professional, confident presentation",
      "Clear identification and branding",
      "Consistent team appearance",
    ],
    customisation: [
      "Colour Coding",
      "Identification Options",
      "Embroidered Logos",
      "Department Colourways",
    ],
    industrySlugs: ["healthcare"],
    relatedServiceSlugs: [
      "executive-corporate-uniforms",
      "embroidery-printing",
      "promotional-branded-merchandise",
    ],
    accent: "blue",
  },
  {
    slug: "school-uniforms-accessories",
    title: "School Uniforms & Accessories",
    category: "corporate-professional",
    tagline: "School identity, everyday wear.",
    shortDescription:
      "School uniforms and accessories that build consistent school identity.",
    metaDescription:
      "School uniforms and accessories for schools in Papua New Guinea, including custom school-branded apparel and sports uniforms.",
    introduction: [
      "A school uniform is more than clothing — it's part of a school's identity and pride.",
      "We supply school uniforms and accessories that help build consistent, recognisable school identity, from everyday wear to sports uniforms.",
      "With custom school branding and durable, comfortable fabrics made for students, we help schools present a unified, professional appearance.",
    ],
    solutions: [
      "School Shirts",
      "School Polos",
      "Trousers & Skirts",
      "Sports Uniforms",
      "School Accessories",
      "Custom School Branding",
    ],
    whoFor:
      "Primary and secondary schools, and any educational institution wanting a consistent, branded uniform standard.",
    benefits: [
      "Consistent school identity",
      "Durable, comfortable fabrics for students",
      "Custom school branding",
      "Full range covers daily and sports wear",
      "Bulk ordering for whole schools",
    ],
    customisation: [
      "School Colours",
      "Embroidered Crests",
      "Screen Printing",
      "Sports & Daily Uniforms",
    ],
    industrySlugs: ["education", "sports"],
    relatedServiceSlugs: [
      "sportswear",
      "embroidery-printing",
      "customized-sublimation-polos-tshirts",
    ],
    accent: "orange",
  },
  {
    slug: "sportswear",
    title: "Sportswear",
    category: "custom-apparel",
    tagline: "Wear your team with pride.",
    shortDescription:
      "Custom sportswear and performance apparel built for teams and clubs.",
    metaDescription:
      "Custom sportswear and performance apparel for teams, clubs and schools in Papua New Guinea, with full team branding.",
    introduction: [
      "Teams wear their identity on their backs. Great sportswear brings a team together and looks the part on and off the field.",
      "We supply custom sportswear and performance apparel designed for clubs, schools and sporting teams — from training to match day.",
      "With custom designs, colours and branding, we help your team look unified, professional and proud.",
    ],
    solutions: [
      "Team Jerseys",
      "Training Wear",
      "Track Suits",
      "Team Polos",
      "Performance Apparel",
      "Custom Team Branding",
    ],
    whoFor:
      "Sports teams, clubs, schools and organisations that want custom, branded team apparel.",
    benefits: [
      "Custom designs and team colours",
      "Comfortable, performance-focused apparel",
      "Unified team identity",
      "Suitable for training and match day",
      "Full team branding",
    ],
    customisation: [
      "Custom Colours",
      "Team Crests",
      "Sublimation Designs",
      "Player Numbering",
      "Sponsor Branding",
    ],
    industrySlugs: ["sports", "education"],
    relatedServiceSlugs: [
      "customized-sublimation-polos-tshirts",
      "school-uniforms-accessories",
      "embroidery-printing",
      "promotional-branded-merchandise",
    ],
    accent: "yellow",
  },
  {
    slug: "promotional-branded-merchandise",
    title: "Promotional & Branded Merchandise",
    category: "branding-merchandise",
    tagline: "Make your brand part of everyday life.",
    shortDescription:
      "Branded merchandise and promotional apparel for campaigns and giveaways.",
    metaDescription:
      "Promotional and branded merchandise in Papua New Guinea, including promotional apparel, giveaways and corporate campaign items.",
    introduction: [
      "Branded merchandise keeps your organisation front of mind — long after a campaign ends.",
      "We supply promotional apparel and branded merchandise for events, corporate campaigns and giveaways, helping your company stay visible and memorable.",
      "From practical everyday items to clothing that people actually want to wear, we make your brand part of everyday life.",
    ],
    solutions: [
      "Promotional Apparel",
      "Branded Merchandise",
      "Event Giveaways",
      "Corporate Campaign Items",
      "Company Visibility Gear",
      "Custom Branded Items",
    ],
    whoFor:
      "Businesses, events and organisations running promotions, campaigns or wanting ongoing brand visibility.",
    benefits: [
      "Keeps your brand visible and memorable",
      "Wide range of apparel and merchandise",
      "Ideal for events and giveaways",
      "Custom branding throughout",
      "Built for corporate campaigns",
    ],
    customisation: [
      "Logo Application",
      "Embroidery",
      "Screen Printing",
      "Sublimation",
      "Custom Branding",
    ],
    industrySlugs: ["corporate", "hospitality-tourism", "mining", "security"],
    relatedServiceSlugs: [
      "embroidery-printing",
      "executive-corporate-uniforms",
      "customized-sublimation-polos-tshirts",
      "sportswear",
    ],
    accent: "orange",
  },
  {
    slug: "embroidery-printing",
    title: "Embroidery & Printing Services",
    category: "branding-merchandise",
    tagline: "Finish every garment with your mark.",
    shortDescription:
      "Professional embroidery, logo application and garment printing.",
    metaDescription:
      "Embroidery and printing services in Papua New Guinea, including logo application, garment branding and screen printing.",
    introduction: [
      "Branding is the finishing touch that makes apparel yours — and the quality of that finish reflects on your organisation.",
      "We provide professional embroidery, screen printing and logo application services, adding your brand to workwear, uniforms, teamwear and merchandise.",
      "Whether it's a single refined embroidered logo or full-colour printing across an entire garment, we help you carry your identity on everything you wear.",
    ],
    solutions: [
      "Embroidery",
      "Logo Application",
      "Screen Printing",
      "Sublimation Printing",
      "Garment Branding",
      "Corporate Identity Finishing",
    ],
    whoFor:
      "Any organisation or team with workwear, uniforms, or apparel that carries branding or a logo.",
    benefits: [
      "Professional, long-lasting finishes",
      "Options for every garment type",
      "Consistent, crisp branding",
      "Works across workwear, uniforms and merchandise",
      "Elevates your corporate identity",
    ],
    customisation: [
      "Embroidery",
      "Screen Printing",
      "Sublimation",
      "Logo Application",
      "Colour Matching",
    ],
    industrySlugs: [
      "mining",
      "construction",
      "logistics-transport",
      "energy-utilities",
      "hospitality-tourism",
      "agriculture-fisheries",
      "healthcare",
      "education",
      "corporate",
      "security",
      "sports",
    ],
    relatedServiceSlugs: [
      "promotional-branded-merchandise",
      "executive-corporate-uniforms",
      "customized-sublimation-polos-tshirts",
      "security-uniforms",
    ],
    accent: "yellow",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(
  category: CategorySlug | CategorySlug[],
): Service[] {
  const cats = Array.isArray(category) ? category : [category];
  return services.filter((s) => cats.includes(s.category));
}

export function getCategory(category: CategorySlug): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.slug === category);
}

export function getServicesBySlugs(slugs: string[]): Service[] {
  return slugs
    .map((slug) => getService(slug))
    .filter((s): s is Service => Boolean(s));
}

export function getRelatedServices(slug: string): Service[] {
  const service = getService(slug);
  if (!service) return [];
  return getServicesBySlugs(service.relatedServiceSlugs);
}

export const allServiceSlugs = services.map((s) => s.slug);
