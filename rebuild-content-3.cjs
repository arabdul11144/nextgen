const fs = require('fs');
const path = 'd:/Webxkey/nextgen/src/data/home-content.ts';
let content = fs.readFileSync(path, 'utf8');

const rest = `/* ------------------------------------------------------------
   4. Category avatars — circular photo grid (customizationhub
   + workforce). 12 avatars, 6 per row desktop / 2–3 mobile.
   ------------------------------------------------------------ */
const CATEGORY_ACCENTS: Record<CategorySlug, string> = {
  "workwear-safety": "var(--ng-safety)",
  "corporate-professional": "var(--ng-burgundy)",
  "custom-apparel": "var(--ng-gold)",
  "branding-merchandise": "var(--ng-forest)",
};

const SECTION2_IMAGES = [
  "/image/customizationhub/shirt2.webp",
  "/image/customizationhub/shirt.webp",
  "/image/customizationhub/shirt4.webp",
  "/image/customizationhub/shirt3.webp",
  "/image/workforce/heroleft1.png",
  "/image/workforce/heroleft2.webp",
  "/image/workforce/heroleft3.webp",
  "/image/customizationhub/bag.webp",
  "/image/customizationhub/bottle.webp",
  "/image/customizationhub/cap.webp",
  "/image/customizationhub/mug.webp",
  "/image/customizationhub/tshirt.webp",
];

export interface CategoryAvatar {
  name: string;
  href: string;
  image: string;
  alt: string;
  accent: string;
}

export const CATEGORY_AVATARS: CategoryAvatar[] = [
  ...serviceCategories.map((category, i) => ({
    name: category.name,
    href: "/services",
    image: SECTION2_IMAGES[i % SECTION2_IMAGES.length],
    alt: \`\${category.name} — \${category.blurb}\`,
    accent: CATEGORY_ACCENTS[category.slug],
  })),
  {
    name: "Hi-Vis & Safety Wear",
    href: "/services/safety-wear-hi-vis-uniforms",
    image: SECTION2_IMAGES[0],
    alt: "High-visibility safety wear and hi-vis uniforms",
    accent: CATEGORY_ACCENTS["workwear-safety"],
  },
  {
    name: "Executive & Corporate",
    href: "/services/executive-corporate-uniforms",
    image: SECTION2_IMAGES[5],
    alt: "Executive and corporate uniforms",
    accent: CATEGORY_ACCENTS["corporate-professional"],
  },
  {
    name: "Sublimation Polos & Tees",
    href: "/services/customized-sublimation-polos-tshirts",
    image: SECTION2_IMAGES[10],
    alt: "Customized sublimation polos and t-shirts",
    accent: CATEGORY_ACCENTS["custom-apparel"],
  },
  {
    name: "Embroidery & Printing",
    href: "/services/embroidery-printing",
    image: SECTION2_IMAGES[8],
    alt: "Embroidery and printing services",
    accent: CATEGORY_ACCENTS["branding-merchandise"],
  },
  {
    name: "PPE & Protective Wear",
    href: "/services/mining-industrial-workwear",
    image: SECTION2_IMAGES[7],
    alt: "PPE and protective workwear",
    accent: CATEGORY_ACCENTS["workwear-safety"],
  },
  {
    name: "Hospitality & Kitchen",
    href: "/services/hospitality-uniforms-linen-supplies",
    image: SECTION2_IMAGES[6],
    alt: "Hospitality and kitchen uniforms",
    accent: CATEGORY_ACCENTS["corporate-professional"],
  },
  {
    name: "Sportswear & Teamwear",
    href: "/services/sportswear",
    image: SECTION2_IMAGES[11],
    alt: "Custom sportswear and teamwear",
    accent: CATEGORY_ACCENTS["custom-apparel"],
  },
  {
    name: "Branded Merchandise",
    href: "/services/promotional-branded-merchandise",
    image: SECTION2_IMAGES[9],
    alt: "Promotional and branded merchandise",
    accent: CATEGORY_ACCENTS["branding-merchandise"],
  },
];

/* ------------------------------------------------------------
   5. Industry cards — gradient overlay tiles (workforce/
   stands in for the missing section3 folder).
   ------------------------------------------------------------ */
const INDUSTRY_IMAGES: Record<string, string> = {
  mining: "/image/workforce/heroleft3.webp",
  construction: "/image/workforce/heroleft3.webp",
  "logistics-transport": "/image/workforce/heroleft3.webp",
  "energy-utilities": "/image/workforce/heroleft3.webp",
  "hospitality-tourism": "/image/workforce/heroleft2.webp",
  "agriculture-fisheries": "/image/workforce/heroleft1.png",
  healthcare: "/image/workforce/heroleft1.png",
  education: "/image/workforce/heroleft2.webp",
  corporate: "/image/workforce/heroleft2.webp",
  security: "/image/workforce/heroleft3.webp",
  sports: "/image/workforce/heroleft1.png",
};

const INDUSTRY_ACCENTS: Record<string, string> = {
  mining: "var(--ng-graphite)",
  construction: "var(--ng-safety)",
  "logistics-transport": "var(--ng-accent)",
  "energy-utilities": "var(--ng-graphite)",
  "hospitality-tourism": "var(--ng-burgundy)",
  "agriculture-fisheries": "var(--ng-forest)",
  healthcare: "var(--ng-burgundy)",
  education: "var(--ng-gold)",
  corporate: "var(--ng-burgundy)",
  security: "var(--ng-graphite)",
  sports: "var(--ng-accent)",
};

export const INDUSTRY_CARDS = industries.map((industry) => ({
  ...industry,
  image: INDUSTRY_IMAGES[industry.slug],
  accent: INDUSTRY_ACCENTS[industry.slug],
  alt: \`\${industry.name} team in branded NextGen workwear\`,
}));
`;

content += rest;
fs.writeFileSync(path, content, 'utf8');
console.log('Part 3 appended, total lines:', content.split('\n').length);
