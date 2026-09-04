const fs = require('fs');
const path = 'd:/Webxkey/nextgen/src/data/home-content.ts';

// Read current content
let content = fs.readFileSync(path, 'utf8');

// Remove trailing backslash garbage
content = content.replace(/\\\s*$/, '');

// Append the rest of the file
const rest = `

/* ------------------------------------------------------------
   3. Hero — split collaged band + 3 promo tiles (workforce/).
   Uses the three real PNG-specific cutout photos from the
   workforce/ folder (heroleft1/2/3) plus customizationhub +
   banners for the process collage and promo tiles.
   ------------------------------------------------------------ */
export const HERO_MEDIA = {
  leftMain: {
    src: "/image/workforce/heroleft1.png",
    alt: "PNG healthcare workers in NextGen scrubs and medical wear",
  },
  leftSecondary: {
    src: "/image/workforce/heroleft2.webp",
    alt: "PNG corporate staff in branded executive uniforms",
  },
  centerMain: {
    src: "/image/workforce/heroleft3.webp",
    alt: "PNG mining and construction team in hi-vis safety workwear",
  },
  centerSecondary: {
    src: "/image/customizationhub/shirt2.webp",
    alt: "Embroidery and branding process at the NextGen workshop",
  },
  centerTertiary: {
    src: "/image/customizationhub/umbrella.webp",
    alt: "Branded garments ready for delivery across PNG",
  },
};

export const HERO_BADGES = [
  { label: "Workwear & Safety", accent: "var(--ng-safety)" },
  { label: "Corporate Uniforms", accent: "var(--ng-burgundy)" },
  { label: "Custom Apparel", accent: "var(--ng-gold)" },
  { label: "Branding & Merch", accent: "var(--ng-forest)" },
];

export const HERO_OVERLAY = {
  badge: "Bulk Order Discounts",
  badgeSub: "Program pricing for teams of 5 to 500+",
  headline: "Professional Workwear & Branding for PNG Businesses",
  estPill: \`Serving PNG since \${new Date().getFullYear() - YEARS_OF_EXPERIENCE}\`,
};

/* Promo tiles below the hero band */
export const PROMO_TILES = [
  {
    image: "/image/banners/Desktop_Boxes_1.webp",
    alt: "Branded products packed and ready for delivery across PNG",
    eyebrow: "Local Manufacturing",
    title: "Proudly PNG-Made",
    sub: "Finished right here in PNG — embroidery, printing and garment branding.",
    cta: "Enquire Today",
    href: "/services/embroidery-printing",
    accent: "var(--ng-safety)",
  },
  {
    image: "/image/banners/BeatTheHeatDesktop.webp",
    alt: "Lightweight breathable workwear for PNG's climate",
    eyebrow: "Seasonal",
    title: "Beat the Heat",
    sub: "Lightweight, breathable workwear built for the PNG climate.",
    cta: "Shop Now",
    href: "/services/safety-wear-hi-vis-uniforms",
    accent: "var(--ng-accent)",
  },
  {
    image: "/image/banners/ChefUniformsDesktop.webp",
    alt: "Professional chef and hospitality uniforms",
    eyebrow: "Featured Category",
    title: "Hospitality & Kitchen",
    sub: "Coordinated front-of-house and kitchen uniforms that impress guests.",
    cta: "Shop Now",
    href: "/services/hospitality-uniforms-linen-supplies",
    accent: "var(--ng-burgundy)",
  },
];
`;

content += rest;
fs.writeFileSync(path, content, 'utf8');
console.log('Part 2 appended, total lines:', content.split('\n').length);
