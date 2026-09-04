/* ============================================================
   Media — single source of truth for the site's image assets.
   Swap these two files and the whole page updates with no
   other code changes.
   ============================================================ */

export const IMAGES = {
  /** Hero people cut-out / hero background image */
  hero: "/image/hero.png",
  /** Generic placeholder used for every other image slot */
  generic: "/image/image.png",
} as const;

export const HERO_IMAGE = IMAGES.hero;
export const GENERIC_IMAGE = IMAGES.generic;
