/* ============================================================
   Hero media — reads the image folders and produces an ordered
   file list for the auto-cycling slots and logo strip.
   Folders are read at build/render time on the server, so adding
   or removing a file in a folder changes the page with no other
   code changes. Order is alphabetical for a deterministic cycle.

   Current folder layout (from the image.zip extraction):
   - /image/workforce/        — PNG-specific cutout photographs
     (heroleft1/2/3 + industry shots)
   - /image/biz/              — supplier / partner logos (white BG)
   - /image/banners/          — promotional banners (UK-branded
     "Since 1950" family + US/UK scrub-blog thumbnails retired;
     only PNG-branded banners remain)
   - /image/customizationhub/ — neutral product photography
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

/** Rotating hero model cutouts (workforce/heroleft1-3) */
export const heroLeftImages = listImages("workforce").filter((f) =>
  /heroleft/i.test(f),
);

/** Process / manufacturing collage images (customizationhub + banners) */
export const heroRightImages = [
  ...listImages("customizationhub"),
  ...listImages("banners").filter(
    (f) => /Desktop_Boxes|ChefUniforms|BeatTheHeat|Healthcare_Desktop_Banner_3|bulkbanner/i.test(f),
  ),
];

/** Supplier / brand-line logos for the marquee strip */
export const heroCenterLogos = listImages("biz");
