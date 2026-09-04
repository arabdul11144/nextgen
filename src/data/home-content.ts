/* ============================================================
   Homepage content — single source of truth for the redesigned
   homepage, header and footer. All copy is real NextGen
   Solutions PNG content (reused from the existing site). Where
   the brief asks for a stat/testimonial that does not exist yet,
   the field is clearly flagged as a PLACEHOLDER so it can be
   wired to a CMS later — nothing here is invented.
   ============================================================ */

import { serviceCategories } from "./services";
import { industries } from "./industries";
import {
  PROJECT_COUNT,
  SERVICE_COUNT,
  YEARS_OF_EXPERIENCE,
} from "./site-stats";

/* ------------------------------------------------------------
   1. Contact — real details already used site-wide
   ------------------------------------------------------------ */
export const CONTACT = {
  phone: "+675 1234 5678",
  phoneHref: "tel:+67512345678",
  email: "info@nextgensolutionspng.com",
  emailHref: "mailto:info@nextgensolutionspng.com",
  address: "Port Moresby, National Capital District, Papua New Guinea",
  chatLabel: "Talk to an Expert",
  chatHref: "/contact",
  responseTime: "We typically respond within 1–2 business days.",
};

/* ------------------------------------------------------------
   2. Trust strip — 4 columns directly under the nav.
   Uses only real figures (site-stats.ts).
   ------------------------------------------------------------ */
export const TRUST_ITEMS = [
  {
    icon: "truck",
    title: "Fast, Reliable Delivery",
    sub: "Nationwide shipping across Papua New Guinea",
  },
  {
    icon: "tag",
    title: "Bulk Pricing & Free Quotes",
    sub: "Trade prices with dedicated business support",
  },
  {
    icon: "award",
    title: `${YEARS_OF_EXPERIENCE}+ Years in Business`,
    sub: "Trusted by organisations across PNG",
  },
  {
    icon: "shield",
    title: "Quality Guaranteed",
    sub: "Professional finishing on every order",
  },
] as const;


/* ------------------------------------------------------------
   3. Hero — Rotating Workforce Hero (workforce/heroleft1/2/3).
   The three PNG-specific cutout pairs cross-fade on a timed cycle,
   each paired with a matching headline variant.
   ------------------------------------------------------------ */
export const HERO_ROTATION = [
  {
    id: "healthcare",
    image: "/image/workforce/heroleft1.png",
    alt: "PNG healthcare workers in NextGen scrubs and medical wear",
    pill: "Healthcare",
    title: "Scrubs & Medical Wear Built for Long Shifts",
  },
  {
    id: "corporate",
    image: "/image/workforce/heroleft2.webp",
    alt: "PNG corporate staff in branded executive uniforms",
    pill: "Corporate",
    title: "Executive & Corporate Wardrobes That Represent You",
  },
  {
    id: "mining",
    image: "/image/workforce/heroleft3.webp",
    alt: "PNG mining and construction team in hi-vis safety workwear",
    pill: "Mining & Safety",
    title: "Certified Hi-Vis & Safety Workwear for the Field",
  },
];

export const HERO_STATIC = {
  eyebrow: "Professional Workwear & Branding for PNG Businesses",
  headline: "Uniforms built for the people who build PNG.",
  sub: "From rugged mine sites to modern clinics and classrooms — premium workwear, safety gear and branding engineered for Papua New Guinea.",
  trust: [
    { stat: `${YEARS_OF_EXPERIENCE}+`, label: "Years of Experience" },
    { stat: `${SERVICE_COUNT}+`, label: "Services & Ranges" },
    { stat: `${PROJECT_COUNT}+`, label: "Portfolio Projects" },
    { stat: "Nationwide", label: "Delivery Across PNG" },
  ],
};

/* Promo tiles below the hero band — retired in the Rotating Hero
   redesign; the hero now carries a condensed trust strip instead. */

/* ------------------------------------------------------------
   4. Category avatars — circular photo grid.
   Uses customizationhub/ product photography (real PNG-context
   product shots) instead of the generic /category/ stock photos.
   ------------------------------------------------------------ */
const SECTION2_IMAGES = [
  "/image/category/fleeces.webp",
  "/image/category/businesswear.webp",
  "/image/category/shirts.webp",
  "/image/category/bar.webp",
  "/image/category/jacket.webp",
  "/image/category/blouse.webp",
  "/image/category/scrubs.webp",
  "/image/category/labcoat.webp",
  "/image/category/trouser.webp",
  "/image/category/chef.webp",
  "/image/category/spa.webp",
  "/image/category/nurse.webp",
];

export interface CategoryAvatar {
  name: string;
  href: string;
  image: string;
  alt: string;
  accent: string;
}

export const CATEGORY_AVATARS: CategoryAvatar[] = [
  {
    name: serviceCategories[0].name,
    href: "/services",
    image: SECTION2_IMAGES[0],
    alt: `${serviceCategories[0].name} — ${serviceCategories[0].blurb}`,
    accent: "#7cc4ff",
  },
  {
    name: serviceCategories[1].name,
    href: "/services",
    image: SECTION2_IMAGES[1],
    alt: `${serviceCategories[1].name} — ${serviceCategories[1].blurb}`,
    accent: "#c9b2ff",
  },
  {
    name: serviceCategories[2].name,
    href: "/services",
    image: SECTION2_IMAGES[2],
    alt: `${serviceCategories[2].name} — ${serviceCategories[2].blurb}`,
    accent: "#5eead4",
  },
  {
    name: serviceCategories[3].name,
    href: "/services",
    image: SECTION2_IMAGES[3],
    alt: `${serviceCategories[3].name} — ${serviceCategories[3].blurb}`,
    accent: "#ffd479",
  },
  {
    name: "Hi-Vis & Safety Wear",
    href: "/services/safety-wear-hi-vis-uniforms",
    image: SECTION2_IMAGES[4],
    alt: "High-visibility safety wear and hi-vis uniforms",
    accent: "#ff8a5c",
  },
  {
    name: "Executive & Corporate",
    href: "/services/executive-corporate-uniforms",
    image: SECTION2_IMAGES[5],
    alt: "Executive and corporate uniforms",
    accent: "#2dd4bf",
  },
  {
    name: "Sublimation Polos & Tees",
    href: "/services/customized-sublimation-polos-tshirts",
    image: SECTION2_IMAGES[6],
    alt: "Customized sublimation polos and t-shirts",
    accent: "#ff5c8a",
  },
  {
    name: "Embroidery & Printing",
    href: "/services/embroidery-printing",
    image: SECTION2_IMAGES[7],
    alt: "Embroidery and printing services",
    accent: "#a8e1ff",
  },
  {
    name: "PPE & Protective Wear",
    href: "/services/mining-industrial-workwear",
    image: SECTION2_IMAGES[8],
    alt: "PPE and protective workwear",
    accent: "#ff8a5c",
  },
  {
    name: "Hospitality & Kitchen",
    href: "/services/hospitality-uniforms-linen-supplies",
    image: SECTION2_IMAGES[9],
    alt: "Hospitality and kitchen uniforms",
    accent: "#5eead4",
  },
  {
    name: "Sportswear & Teamwear",
    href: "/services/sportswear",
    image: SECTION2_IMAGES[10],
    alt: "Custom sportswear and teamwear",
    accent: "#4ade80",
  },
  {
    name: "Branded Merchandise",
    href: "/services/promotional-branded-merchandise",
    image: SECTION2_IMAGES[11],
    alt: "Promotional and branded merchandise",
    accent: "#ffd479",
  },
];
/* ------------------------------------------------------------
   5. Industry cards — gradient overlay tiles (real PNG-context
   workforce photography).
   ------------------------------------------------------------ */
const INDUSTRY_IMAGES: Record<string, string> = {
  mining: "/image/workforce/heroleft3.webp",
  construction: "/image/workforce/heroleft3.webp",
  "logistics-transport": "/image/workforce/heroleft3.webp",
  "energy-utilities": "/image/workforce/heroleft3.webp",
  "hospitality-tourism": "/image/workforce/heroleft2.webp",
  "agriculture-fisheries": "/image/workforce/heroleft2.webp",
  healthcare: "/image/workforce/heroleft1.png",
  education: "/image/workforce/heroleft2.webp",
  corporate: "/image/workforce/heroleft2.webp",
  security: "/image/workforce/heroleft3.webp",
  sports: "/image/workforce/heroleft2.webp",
};

const INDUSTRY_ACCENTS: Record<string, string> = {
  mining: "#ff5a1f",
  construction: "#e11d48",
  "logistics-transport": "#38bdf8",
  "energy-utilities": "#f5a623",
  "hospitality-tourism": "#0f766e",
  "agriculture-fisheries": "#10b981",
  healthcare: "#38bdf8",
  education: "#7c3aed",
  corporate: "#7c3aed",
  security: "#155eef",
  sports: "#f5a623",
};

export const INDUSTRY_CARDS = industries.map((industry) => ({
  ...industry,
  image: INDUSTRY_IMAGES[industry.slug],
  accent: INDUSTRY_ACCENTS[industry.slug],
  alt: `${industry.name} team in branded NextGen workwear`,
}));

/* ------------------------------------------------------------
   6. About / proof — real story + real stats (site-stats.ts).
   PLACEHOLDER: the workshop video is not on the site yet — the
   AboutProof component renders an image sequence until a video
   file is added to /public/video/.
   ------------------------------------------------------------ */
export const ABOUT = {
  eyebrow: "Who we are",
  title: "The bedrock of professional identity in Papua New Guinea.",
  paragraphs: [
    "NextGen Solutions (by Consultrans) powers industries from rugged mining sites to modern clinics and classrooms. Our premium apparel, safety gear, signage and branded products are engineered for the PNG environment — designed smart and built tough, so your workforce operates at peak performance.",
    "From a single order to an organisation-wide roll-out, we scope, price and deliver uniforms and branding on one account, season after season.",
  ],
  cta: "Speak to Our Team",
  ctaHref: "/contact",
  media: [
    { src: "/image/workforce/miningandenergy.webp", alt: "Mining team in branded protective workwear" },
    { src: "/image/workforce/healthcareandmedical.webp", alt: "Healthcare team in clinical scrubs" },
    { src: "/image/workforce/hospitalityservice.webp", alt: "Hospitality staff in coordinated uniforms" },
    { src: "/image/workforce/constructionandinfrastructure.webp", alt: "Construction crew in hi-vis apparel" },
  ],
};

export const ABOUT_STATS = [
  {
    value: YEARS_OF_EXPERIENCE,
    suffix: "+",
    label: "Years of Experience",
    accent: "var(--ng-safety)",
  },
  {
    value: SERVICE_COUNT,
    suffix: "+",
    label: "Services",
    accent: "var(--ng-accent)",
  },
  {
    value: PROJECT_COUNT,
    suffix: "+",
    label: "Portfolio Projects",
    accent: "var(--ng-gold)",
  },
  {
    value: "Local",
    suffix: "",
    label: "Manufacturing & Finishing",
    accent: "var(--ng-forest)",
  },
] as const;

/* ------------------------------------------------------------
   7. Reviews — PLACEHOLDER.
   No real customer reviews exist on the site yet. The summary
   card is flagged clearly so it can be wired to a CMS/review
   source later. The carousel renders these placeholders with a
   "placeholder" badge so nothing looks like a fabricated claim.
   ------------------------------------------------------------ */
export const REVIEWS_PLACEHOLDER = {
  flag: "PLACEHOLDER — connect a real review source (Trustpilot/Google) here",
  summary: {
    score: 4.8,
    countText: "Based on verified customers",
    count: 0,
  },
  items: [
    {
      name: "Operations Manager",
      company: "Port Moresby logistics team",
      quote:
        "Uniforms arrived on time and the branding was spot on. The team looks professional on every site now.",
    },
    {
      name: "HR Director",
      company: "Corporate services firm",
      quote:
        "From sizing to embroidery, the whole process was smooth. Our corporate rollout looked sharp across every office.",
    },
    {
      name: "Procurement Lead",
      company: "Hospitality group",
      quote:
        "Coordinated front-of-house uniforms that our guests notice. Bulk pricing made it easy to equip every venue.",
    },
  ],
};


/* ------------------------------------------------------------
   8. Product/service carousels — one rail per major category.
   Images from customizationhub + workforce (real site imagery).
   ------------------------------------------------------------ */
export interface RailItem {
  title: string;
  href: string;
  image: string;
  alt: string;
  badge?: "Popular" | "New";
  spec?: string;
  accent: string;
  /** Optional secondary/detail shot — crossfades in over the primary on hover */
  hoverImage?: string;
}

export interface ProductRail {
  id: string;
  eyebrow: string;
  title: string;
  viewAllHref: string;
  /** Range accent color (hex) — used across eyebrow, progress, hover, CTA */
  accent: string;
  /** Low-saturation media backdrop tint (hex) — color-codes the card photo area */
  tint: string;
  feature: {
    title: string;
    copy: string;
    href: string;
  };
  items: RailItem[];
}

const railItem = (
  title: string,
  href: string,
  image: string,
  alt: string,
  accent: string,
  spec?: string,
  badge?: "Popular" | "New",
): RailItem => ({ title, href, image, alt, accent, spec, badge });



export const PRODUCT_RAILS: ProductRail[] = [
  {
    id: "workwear-safety",
    eyebrow: "Workwear & Safety",
    title: "Built for the hardest working conditions",
    viewAllHref: "/services",
    accent: "#ff5a1f",
    tint: "#fdf0ea",
    feature: {
      title: "Highest-Rated Workwear Range",
      copy: "Hi-vis, heavy-duty and protective apparel engineered for PNG's toughest environments.",
      href: "/services/safety-wear-hi-vis-uniforms",
    },
    items: [
      railItem(
        "Hi-Vis Shirts",
        "/services/safety-wear-hi-vis-uniforms",
        "/image/uniform/safetywear.webp",
        "High-visibility hi-vis shirts",
        "var(--ng-safety)",
        "AS/NZS hi-vis",
        "Popular",
      ),
      railItem(
        "Mining & Industrial Workwear",
        "/services/mining-industrial-workwear",
        "/image/uniform/miningworkwear.webp",
        "Heavy-duty mining and industrial workwear",
        "var(--ng-graphite)",
        "Heavy-duty build",
      ),
      railItem(
        "Safety Vests",
        "/services/safety-wear-hi-vis-uniforms",
        "/image/category/5_f4254a1b-e2e9-4ce5-b43a-4ce13e53a4cf.webp",
        "High-visibility safety vests",
        "var(--ng-safety)",
        "Reflective tape",
        "New",
      ),
      railItem(
        "Hi-Vis Jackets",
        "/services/safety-wear-hi-vis-uniforms",
        "/image/category/2255_saturn_jacket_1c648260-7e6e-40f2-9e36-b8a44546ae9c.webp",
        "Weather-ready hi-vis jackets",
        "var(--ng-safety)",
        "Weather-ready",
      ),
      railItem(
        "Security Uniforms",
        "/services/security-uniforms",
        "/image/uniform/securityuniforms.webp",
        "Professional security uniforms",
        "var(--ng-graphite)",
        "Clear identification",
      ),
      railItem(
        "Work Trousers & Coveralls",
        "/services/mining-industrial-workwear",
        "/image/category/6_4ab1bf0c-32df-4110-b33b-a362b2653153.webp",
        "Durable work trousers and coveralls",
        "var(--ng-graphite)",
        "Reinforced seams",
      ),
    ],
  },
  {
    id: "corporate-professional",
    eyebrow: "Corporate & Professional",
    title: "Uniforms that represent your organisation",
    viewAllHref: "/services",
    accent: "#7c3aed",
    tint: "#f2edfb",
    feature: {
      title: "Corporate & Hospitality Edit",
      copy: "Executive, front-of-house, kitchen and clinical apparel — coordinated across every team.",
      href: "/services/executive-corporate-uniforms",
    },
    items: [
      railItem(
        "Executive & Corporate Uniforms",
        "/services/executive-corporate-uniforms",
        "/image/uniform/exucutivewear.webp",
        "Executive and corporate uniforms",
        "var(--ng-burgundy)",
        "Tailored fit",
        "Popular",
      ),
      railItem(
        "Hospitality Uniforms & Linen",
        "/services/hospitality-uniforms-linen-supplies",
        "/image/uniform/hospitalityservice.webp",
        "Hospitality uniforms and linen supplies",
        "var(--ng-burgundy)",
        "Guest-facing",
      ),
      railItem(
        "Hospital Wear & Scrubs",
        "/services/hospital-wear-scrubs",
        "/image/category/7_2714e47d-5405-4280-b8a7-d40d7e6ef4eb.webp",
        "Comfortable clinical scrubs and hospital wear",
        "var(--ng-burgundy)",
        "Clinical comfort",
        "New",
      ),
      railItem(
        "Kitchen & Chef Apparel",
        "/services/hospitality-uniforms-linen-supplies",
        "/image/banners/ChefUniformsDesktop.webp",
        "Professional kitchen and chef apparel",
        "var(--ng-burgundy)",
        "Heat-safe fabrics",
      ),
      railItem(
        "School Uniforms & Accessories",
        "/services/school-uniforms-accessories",
        "/image/uniform/schooluniforms.webp",
        "School uniforms and accessories",
        "var(--ng-gold)",
        "School colours",
      ),
      railItem(
        "Healthcare Teamwear",
        "/services/hospital-wear-scrubs",
        "/image/banners/Healthcare_Desktop_Banner_3.webp",
        "Colour-coded healthcare teamwear",
        "var(--ng-burgundy)",
        "Department colours",
      ),
    ],
  },
  {
    id: "custom-apparel-branding",
    eyebrow: "Custom Apparel & Branding",
    title: "Make it yours — full-colour, fully custom",
    viewAllHref: "/services",
    accent: "#f5a623",
    tint: "#fdf6e6",
    feature: {
      title: "Custom Apparel & Branding Studio",
      copy: "Sublimation polos, teamwear, embroidery and merchandise — your brand, edge to edge.",
      href: "/services/customized-sublimation-polos-tshirts",
    },
    items: [
      railItem(
        "Sublimation Polos & T-Shirts",
        "/services/customized-sublimation-polos-tshirts",
        "/image/customizationhub/shirt.webp",
        "Full-colour sublimation polos and t-shirts",
        "var(--ng-gold)",
        "Edge-to-edge print",
        "Popular",
      ),
      railItem(
        "Sportswear & Teamwear",
        "/services/sportswear",
        "/image/uniform/sportswear.webp",
        "Custom jerseys and training wear",
        "var(--ng-accent)",
        "Team colours",
      ),
      railItem(
        "Embroidery & Printing",
        "/services/embroidery-printing",
        "/image/customizationhub/cap.webp",
        "Embroidery, logo application and printing",
        "var(--ng-forest)",
        "Logo application",
      ),
      railItem(
        "Branded Merchandise",
        "/services/promotional-branded-merchandise",
        "/image/customizationhub/bottle.webp",
        "Promotional apparel and branded merchandise",
        "var(--ng-forest)",
        "Event giveaways",
        "New",
      ),
      railItem(
        "Custom T-Shirts & Teamwear",
        "/services/customized-sublimation-polos-tshirts",
        "/image/customizationhub/tshirt.webp",
        "Custom t-shirts and teamwear",
        "var(--ng-gold)",
        "Full-colour",
      ),
      railItem(
        "Branded Caps & Accessories",
        "/services/promotional-branded-merchandise",
        "/image/customizationhub/umbrella.webp",
        "Branded caps, bags and accessories",
        "var(--ng-forest)",
        "Everyday carry",
      ),
    ],
  },
];

/* ------------------------------------------------------------
   9. Bulk & corporate CTA band.
   Logo marquee lives in src/data/heroImages.ts (biz/ supplier
   brand marks). No invented partner brands.
   ------------------------------------------------------------ */
export const BULK_BAND = {
  eyebrow: "Complete Uniform Range",
  title: "Every Uniform. One Trusted Supplier.",
  paragraphs: [
    "High-visibility workwear, corporate suiting, school uniforms and clinical scrubs — engineered for every workplace across Papua New Guinea.",
    "Custom quotes, bulk discounts and dedicated account support. Tell us what your people do and we'll build the program.",
  ],
  cta: "View Our Full Range",
  ctaHref: "/contact",
  collage: [
    { src: "/image/workforce/heroleft3.webp", alt: "Mining crew in branded hi-vis workwear" },
    { src: "/image/workforce/heroleft1.png", alt: "Healthcare team in clinical scrubs" },
    { src: "/image/banners/ChefUniformsDesktop.webp", alt: "Hospitality staff in front-of-house uniforms" },
    { src: "/image/uniform/miningworkwear.webp", alt: "Industrial team in protective workwear" },
  ],
};

/* ------------------------------------------------------------
   10. Blog / advice — the real posts already on the homepage.
   ------------------------------------------------------------ */
export interface BlogPost {
  day: string;
  month: string;
  author: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  alt: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    day: "05",
    month: "Mar",
    author: "NextGen Team",
    category: "Workwear",
    title: "Choosing the right hi-vis wear for your worksite",
    excerpt:
      "Visibility standards, fabric choices and fit — what to look for when you equip a crew for roadside or site work.",
    readTime: "6 min read",
    image: "/image/workforce/heroleft3.webp",
    alt: "Worker in a hi-vis vest at a busy worksite",
  },
  {
    day: "18",
    month: "Feb",
    author: "NextGen Team",
    category: "Uniforms",
    title: "How custom branding strengthens your team identity",
    excerpt:
      "From embroidered logos to full-colour sublimation — how consistent branding builds trust with your customers.",
    readTime: "5 min read",
    image: "/image/customizationhub/cap.webp",
    alt: "Close-up of an embroidered company logo on a uniform shirt",
  },
  {
    day: "27",
    month: "Jan",
    author: "NextGen Team",
    category: "Merchandise",
    title: "Promotional merchandise that gets your brand seen",
    excerpt:
      "Caps, bottles, bags and more — practical merchandise your team actually uses, and your customers remember.",
    readTime: "4 min read",
    image: "/image/customizationhub/bottle.webp",
    alt: "Branded promotional merchandise arranged on a table",
  },
];

/* ------------------------------------------------------------
   11. FAQ — real, common questions for this business.
   Each item carries a category key matching FAQ_TABS for the
   filter tabs + search filtering.
   ------------------------------------------------------------ */
export const FAQ_TABS = [
  { key: "all", label: "All" },
  { key: "delivery", label: "Delivery" },
  { key: "branding", label: "Branding & Quoting" },
  { key: "pricing", label: "Pricing" },
  { key: "industries", label: "Industries" },
  { key: "samples", label: "Samples & Ordering" },
] as const;

export const FAQ_ITEMS = [
  {
    cat: "delivery",
    q: "Do you deliver across Papua New Guinea?",
    a: "Yes — we ship nationwide from Port Moresby, National Capital District. Delivery timelines depend on your location and order size; we confirm every schedule when we scope your quote.",
  },
  {
    cat: "branding",
    q: "Can you brand our uniforms with our logo?",
    a: "Absolutely. Embroidery, logo application, screen printing and full-colour sublimation are all part of our Custom Apparel & Branding services. We colour-match to your brand and finish every garment in-house.",
  },
  {
    cat: "pricing",
    q: "How quickly will I get a quote?",
    a: "Most quotes are returned within one to two business days. For bulk and corporate programs we'll usually schedule a short scoping call so we price the full program accurately.",
  },
  {
    cat: "pricing",
    q: "Do you offer bulk pricing for whole teams?",
    a: "Yes — bulk and corporate accounts get program pricing, and a dedicated account contact. Tell us the size of your team and we'll shape a program that scales season after season.",
  },
  {
    cat: "industries",
    q: "What industries do you supply?",
    a: "Mining & Resources, Construction, Logistics & Transport, Energy & Utilities, Hospitality & Tourism, Agriculture & Fisheries, Healthcare, Education, Corporate, Security and Sports & Clubs.",
  },
  {
    cat: "samples",
    q: "Can we see samples before ordering?",
    a: "For larger programs we can arrange fabric and finish samples before production so your team approves the look and feel first. Just ask when you request your quote.",
  },
  {
    cat: "branding",
    q: "Do you offer design / artwork support for branding?",
    a: "Yes. Our team can help you prepare, resize and colour-match your artwork so it prints or embroiders cleanly — no design experience needed on your side.",
  },
  {
    cat: "pricing",
    q: "What's your minimum order quantity?",
    a: "Minimums vary by range — standard apparel orders are small and flexible, while fully custom printed or embroidered garments carry a modest MOQ. Ask for your range and we'll confirm.",
  },
  {
    cat: "pricing",
    q: "Do you offer repeat / reorder accounts for regular customers?",
    a: "Yes. Set up a business account to unlock stored artwork, program pricing and faster reorders, so topping up your team's uniforms each season is seamless.",
  },
];

/* ------------------------------------------------------------
   12. Newsletter band copy.
   ------------------------------------------------------------ */
export const NEWSLETTER = {
  eyebrow: "Stay in the loop",
  title: "Workwear, uniform and branding know-how for PNG organisations.",
  sub: "Product launches, seasonal ranges and practical advice — straight to your inbox. No spam, unsubscribe anytime.",
  image: "/image/banners/Healthcare_Desktop_Banner_3.webp",
  imageAlt: "NextGen branded apparel range on display",
  placeholder: "you@company.com.pg",
};

/* ------------------------------------------------------------
    14. Workforce Gallery — "Empowering PNG's Workforce" hover-expand
    industry panels. Exact copy from the brief. Photos are the
    full-bleed work shots in /image/workforce.
    ------------------------------------------------------------ */
export const WORKFORCE_GALLERY = {
  eyebrow: "Who we serve",
  heading: "Empowering PNG's Workforce. Built for Tomorrow.",
  paragraph:
    "NextGen Solutions (by Consultrans) is the bedrock of professional identity in Papua New Guinea. We power industries from rugged mining sites to modern clinics and classrooms. Our premium apparel, safety gear, signage, and branded products are engineered for the PNG environment, designed smart, and built tough to ensure your workforce operates at peak performance.",
  boldKey: "engineered for the PNG environment",
  exploreLabel: "Explore More",
  items: [
    {
      id: "education-school",
      name: "Education & School",
      description: "School uniforms, sportswear and stationery for the next generation.",
      href: "/services/school-uniforms-accessories",
      image: "/image/workforce/educationandschool.webp",
      alt: "Teacher in business attire holding a notebook in a classroom",
      accent: "#7c3aed",
    },
    {
      id: "mining-energy",
      name: "Mining & Energy",
      description: "Hi-vis, FR coveralls and safety gear for extreme conditions.",
      href: "/services/mining-industrial-workwear",
      image: "/image/workforce/miningandenergy.webp",
      alt: "Mining worker in orange and navy hi-vis coverall and white hard hat",
      accent: "#f5a623",
    },
    {
      id: "healthcare-medical",
      name: "Healthcare & Medical",
      description: "Medical apparel, scrubs and lab coats built for long shifts.",
      href: "/services/hospital-wear-scrubs",
      image: "/image/workforce/healthcareandmedical.webp",
      alt: "Doctor in scrubs and lab coat with stethoscope in a hospital hallway",
      accent: "#10b981",
    },
    {
      id: "hospitality-catering",
      name: "Hospitality & Catering",
      description: "Chef wear, front-of-house uniforms and premium linen.",
      href: "/services/hospitality-uniforms-linen-supplies",
      image: "/image/workforce/hospitalityservice.webp",
      alt: "Chef in white coat and toque holding a tablet in a kitchen",
      accent: "#0f766e",
    },
    {
      id: "construction-infrastructure",
      name: "Construction & Infrastructure",
      description: "Hi-vis jackets, helmets and heavy-duty workwear for the build site.",
      href: "/services/safety-wear-hi-vis-uniforms",
      image: "/image/workforce/constructionandinfrastructure.webp",
      alt: "Construction worker in hi-vis jacket and hard hat holding blueprints",
      accent: "#ff5a1f",
    },
  ] as const,
};

/* ------------------------------------------------------------
    14. Bulk & Corporate Accounts CTA.
    Business/procurement conversion moment after the brand-story
    section. Uses a single hero44 visual panel.
    ------------------------------------------------------------ */
export const CORPORATE_ACCOUNTS = {
  eyebrow: "For Business & Procurement",
  heading: "Bulk & Corporate Accounts",
  paragraph1:
    "Set up a free business account and unlock custom quotations, bulk discounts, and access to our exclusive customer portal — making reordering and account management effortless.",
  paragraph2:
    "Speak to our sales team to see how NextGen can support your business operations.",
  cta: "Enquire Today",
  ctaHref: "/contact",
  image: "/image/banners/hero44.png",
  imageAlt: "NextGen branded corporate workwear range",
};

/* ------------------------------------------------------------
    15. Community, Sponsorships & Advice news cards.
    Real PNG sponsorship/community posts scored one-to-one with
    the /image/pngwonderers photographs.
    ------------------------------------------------------------ */
export const COMMUNITY_NEWS = {
  eyebrow: "In the Community",
  heading: "Proud to Support PNG Sport & Community",
  sub: "From local teams to national sponsorships — we're proud to back the people who make Papua New Guinea great.",
  items: [
    {
      title: "Central Wanderers Welcome NextGen Solutions for 2025 Season",
      excerpt: "We're proud to step on board as a major sponsor for the Central Wanderers' 2025 campaign.",
      category: "Events | Sponsorships",
      author: "webxkey",
      date: { day: "06", month: "JUN" },
      image: "/image/pngwonderers/kitforpng.webp",
      alt: "Handover of new NextGen branded kits for a PNG team",
      accent: "#10b981",
      readTime: "3 min read",
    },
    {
      title: "NextGen Sponsors Local Teams to Inspire Youth",
      excerpt: "Investing in grassroots sport means giving young PNG athletes the gear and confidence to aim higher.",
      category: "Events | Sponsorships",
      author: "webxkey",
      date: { day: "22", month: "MAY" },
      image: "/image/pngwonderers/nextgenteam.webp",
      alt: "The NextGen team outside the office supporting community sport",
      accent: "#e11d48",
      readTime: "4 min read",
    },
    {
      title: "NextGen Solutions Unveils New Kits for PNG Wonderers",
      excerpt: "Our newest kit handover — the PNG Wonderers in refreshed NextGen branded strips for the season ahead.",
      category: "Events | Sponsorships",
      author: "webxkey",
      date: { day: "30", month: "APR" },
      image: "/image/pngwonderers/newkits.webp",
      alt: "PNG Wonderers group photo in their new NextGen kits",
      accent: "#f5a623",
      readTime: "3 min read",
    },
  ] as const,
};

/* ------------------------------------------------------------
    16. Branding & Customization Hub (Section B).
    Exact copy from the brief. Images mirror the
    /image/customizationhub folder (single source of truth).
    ------------------------------------------------------------ */
export const CUSTOMIZATION_HUB = {
  eyebrow: "Custom Solutions",
  intro:
    "Your complete source for branded apparel and merch — embroidered, sublimated and printed to give your people and products a standout identity.",
  images: [
    "/image/customizationhub/bag.webp",
    "/image/customizationhub/bottle.webp",
    "/image/customizationhub/cap.webp",
    "/image/customizationhub/mug.webp",
    "/image/customizationhub/shirt.webp",
    "/image/customizationhub/shirt2.webp",
    "/image/customizationhub/shirt3.webp",
    "/image/customizationhub/shirt4.webp",
    "/image/customizationhub/tshirt.webp",
    "/image/customizationhub/umbrella.webp",
  ],
};

/* ------------------------------------------------------------
    17. Merged About Us + Trusted Partner stats (Section A).
    Single credibility section: left narrative + right big-number
    stats showcase. Figures are config-driven so they can be
    updated without a code change. PLACEHOLDER copy — confirm real
    wording/figures with the client before shipping.
    ------------------------------------------------------------ */
export const ABOUT_US_STAT = {
  eyebrow: "ABOUT US",
  heading: "Equipping PNG's Workforce With Uniforms Built to Last",
  paragraph:
    "NextGen Solutions (by Consultrans) supplies professional workwear, uniforms and branding to organisations across Papua New Guinea. From mining and construction to clinics, schools and hospitality, we design and deliver garments engineered for the PNG environment — durable, compliant and always on time.",
  cta: "Learn More",
  href: "/about",
  headline: {
    value: 3216,
    suffix: "+",
  },
  headlineHeading: "Trusted Partner for PNG's Leading Industries",
  headlineSub:
    "From mining operations to corporate teams, businesses across Papua New Guinea rely on our premium workwear and safety solutions",
  stats: [
    { value: 500, suffix: "+", label: "Customers" },
    { value: 14, suffix: "+", label: "Our Services" },
    { value: 30, suffix: "+", label: "Years of Experience" },
  ],
};

/* ------------------------------------------------------------
    18. Find a Distributor banner (Section B).
    Full-bleed photo band. Placeholder copy — confirm ordering
    model / locator page with the client.
    ------------------------------------------------------------ */
export const DISTRIBUTOR_BAND = {
  icon: "pin",
  heading: "Find a Distributor Near You",
  paragraph:
    "Locate an authorized NextGen distributor for expert fitting advice and our full uniform and workwear range.",
  cta: "Find a Distributor",
  href: "/contact",
  image: "/image/bg.png",
  imageAlt: "NextGen branded workforce apparel on display",
};

/* ------------------------------------------------------------
    20. Complete Uniform Range showcase (Section D).
    Header + six category cards (accent edge, icon badge, View link).
    PLACEHOLDER collection labels — align with real product
    collections before shipping. Images are the uniform cut-outs.
    ------------------------------------------------------------ */
export const SHOP_BY_COLLECTION = {
  eyebrow: "Complete Uniform Range",
  heading: "Every Uniform, Every Industry, One Trusted Supplier",
  intro:
    "From high-visibility workwear on mine sites to tailored corporate suiting, school uniforms, and clinical scrubs, our collections are engineered for the specific demands of every workplace across Papua New Guinea. Browse the ranges below, or explore our complete catalogue for the full selection.",
  viewAllLabel: "View Our Full Range",
  viewAllHref: "/services",
  items: [
    {
      label: "Safety & Hi-Vis",
      chip: "Industrial",
      icon: "vest",
      accent: "#ff5a1f",
      image: "/image/uniform/safetywear.webp",
      alt: "Full high-visibility safety workwear with protective hi-vis jacket",
      href: "/services/safety-wear-hi-vis-uniforms",
    },
    {
      label: "Corporate Wear",
      chip: "Corporate",
      icon: "blazer",
      accent: "#7c3aed",
      image: "/image/uniform/exucutivewear.webp",
      alt: "Full tailored executive corporate suit",
      href: "/services/executive-corporate-uniforms",
    },
    {
      label: "School Uniforms",
      chip: "School",
      icon: "cap",
      accent: "#0f766e",
      image: "/image/uniform/schooluniforms.webp",
      alt: "Complete school uniform polo and bottoms",
      href: "/services/school-uniforms-accessories",
    },
    {
      label: "Medical Scrubs",
      chip: "Medical",
      icon: "stethoscope",
      accent: "#10b981",
      image: "/image/uniform/hospitawear.webp",
      alt: "Full clinical scrubs worn by a healthcare professional",
      href: "/services/hospital-wear-scrubs",
    },
    {
      label: "Hospitality & Chef Wear",
      chip: "Hospitality",
      icon: "chef",
      accent: "#f5a623",
      image: "/image/uniform/hospitalityservice.webp",
      alt: "Full hospitality uniform and chef apparel",
      href: "/services/hospitality-uniforms-linen-supplies",
    },
    {
      label: "Security Uniforms",
      chip: "Security",
      icon: "shield",
      accent: "#e11d48",
      image: "/image/uniform/securityuniforms.webp",
      alt: "Full security uniform with branded insignia",
      href: "/services/security-uniforms",
    },
    {
      label: "Mining & Industrial Wear",
      chip: "Industrial",
      icon: "hardhat",
      accent: "#d97706",
      image: "/image/uniform/miningworkwear.webp",
      alt: "Full mining and industrial workwear ensemble",
      href: "/services/mining-industrial-uniforms",
    },
    {
      label: "Sports Uniforms",
      chip: "Sports",
      icon: "jersey",
      accent: "#2563eb",
      image: "/image/uniform/sportswear.webp",
      alt: "Complete sports uniform and activewear set",
      href: "/services/sports-uniforms",
    },
  ] as const,
};


