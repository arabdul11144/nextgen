/* ============================================================
   Hero media — reads the image folders and produces an ordered
   file list for the auto-cycling slots and logo strip.
   Folders are read at build/render time on the server, so adding
   or removing a file in a folder changes the page with no other
   code changes. Order is alphabetical for a deterministic cycle.

   Current folder layout:
   - /image/hero/           — hero cutout photography
     (hero1/2/3 + hero111/222/333 + hero_corporate)
   - /image/biz/            — supplier / partner logos (white BG)
     (bizcare/bizcolab/bizcorporates/bizzcollection/syzmik/yeschef)
   - /image/banners/        — promotional banners (bulkbanner,
     hero44)
   - /image/custumized/     — neutral product photography
   ============================================================ */

import { readdirSync } from "node:fs";
import { join } from "node:path";

const IMAGE_ROOT = join(process.cwd(), "public", "image");

const IMAGE_EXT = /\.(webp|png|jpg|jpeg|avif|gif|svg)$/i;

function listImages(subdir: string): string[] {
  try {
    const dir = join(IMAGE_ROOT, subdir);
    return readdirSync(dir)
      .filter((name) => IMAGE_EXT.test(name))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((name) => `/image/${subdir}/${name}`);
  } catch {
    return [];
  }
}

/** Rotating hero model cutouts (hero/hero1-3 + variants) */
export const heroLeftImages = listImages("hero").filter(
  (f) => /\/(hero[123]|hero_corporate)\./i.test(f),
);

/** Process / manufacturing collage images (custumized + banners) */
export const heroRightImages = [
  ...listImages("custumized"),
  ...listImages("banners").filter(
    (f) => /Desktop_Boxes|ChefUniforms|BeatTheHeat|Healthcare_Desktop_Banner_3|bulkbanner/i.test(f),
  ),
];

/** Supplier / brand-line logos for the marquee strip */
export const heroCenterLogos = listImages("biz");
