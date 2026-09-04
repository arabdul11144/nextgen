# NextGen Solutions — Image Asset Regeneration Pack

This document is the **actionable prompt pack** for regenerating the off-brand images on the
NextGen home page. The code changes are already done (header logo, rotating hero, Swiper
carousels, scroll animations, UK-banner retirement). What remains is replacing 4 groups of
images so every photo matches one consistent, on-brand visual language:

> **Real Papua New Guinean / Melanesian people, warm on-location or branded-studio lighting,
> garment clearly visible.** This is the language of the `workforce/` cutouts and the
> "Find solutions for your industry" grid, and it's the language to extend site-wide.

---

## Current status summary

| Assets | Status |
|---|---|
| `public/image/workforce/heroleft1-3` | ✅ On-brand — now used full-size in the rotating hero |
| Industry grid imagery | ✅ On-brand — reuses `workforce` |
| `public/image/category/*` | ❌ Generic international stock — regenerate (below) |
| `public/image/uniform/*` | ⚠️ Flat faceless renders — decide: merge into photo set or redo as matched flat icons |
| `public/image/banners/*` | ✅ UK-branded files deleted; remaining banners are PNG-branded |
| `public/image/biz/*` | ⚠️ Supplier logos — fine for the "brands we stock" marquee; keep on a tinted chip so they're visible |

---

## 1. Master prompt template — category circles (12 images)

> Replace every image in `public/image/category/`. Target **square 1:1**, high resolution,
> consistent color grading across the whole series so the 12 circles look like one shoot.

**Master template** (reuse per category; swap the bracket):

> Professional catalogue photograph of a Papua New Guinean [man/woman], medium shot from
> chest up, wearing [GARMENT DESCRIPTION], warm and confident natural smile, soft directional
> studio lighting with a subtle navy-to-white gradient background, sharp focus on garment
> fabric and stitching detail, commercial e-commerce photography style, consistent color
> grading across a series, square 1:1 crop suitable for a circular thumbnail, high resolution,
> shot on an 85mm lens.

### Per-category garment swaps (match the 12 circles)

1. **Workwear & Safety** — (man) hi-vis orange/navy two-tone work jacket with reflective tape
2. **Corporate & Professional** — (man) charcoal grey tailored blazer over a light blue shirt
3. **Custom Apparel** — (man or woman) plain navy polo shirt with visible blank chest space (for branding mock-up)
4. **Branding & Merchandise** — close-up of an embroidered logo patch on a cap/polo chest (product focus)
5. **Hi-Vis Safety Wear** — (man) full hi-vis vest and hard hat, close crop at shoulders/head
6. **Executive & Corporate** — (man) dark suit and tie, PNG male executive, three-quarter angle
7. **Sublimation Polos & Tees** — (man or woman) brightly coloured sublimation-printed sports polo
8. **Embroidery & Printing** — flat-lay or worn close-up of a chest-logo embroidery in progress
9. **PPE & Protective Wear** — (man) coveralls, safety goggles and gloves visible
10. **Hospitality & Kitchen** — (man or woman) white chef jacket and apron
11. **Sportswear & Teamwear** — (man or woman) team jersey, athletic wear, slight motion
12. **Branded Merchandise** — mug/cap/tote bag styled flat-lay with embroidered logo (product, not a model)

**Output naming:** overwrite the existing files in `public/image/category/` 1:1 — the code
references specific filenames, so keep the current names (e.g. `5_f4254a1b….webp`,
`2255_saturn_jacket….webp`) or update `src/data/home-content.ts` accordingly.

---

## 2. Hero background / texture plate (optional)

Generate a background plate to sit behind the cutouts (replaces the CSS gradient + subtle
geometric pattern already in the new hero if you want a richer texture):

> A wide panoramic abstract background for a corporate workwear website hero section, deep
> navy blue (#0B1E3D) to cobalt blue (#1E56A0) diagonal gradient, subtle large-scale geometric
> pattern inspired by Papua New Guinea tapa cloth motifs at 8% opacity in the upper right
> corner, soft light rays entering from top left, faint blurred silhouette of an
> industrial/mining skyline at the very bottom edge, clean negative space on the left third
> for text overlay, professional, modern, no text, no logos, 21:9 aspect ratio, high
> resolution, subtle grain, corporate photography lighting style.

**Integrate:** export as `public/image/hero-background.webp`; or leave the CSS gradient in
`src/components/home/HeroSection.module.css` as the default.

---

## 3. Additional rotating hero slides (optional — extend rotation beyond 3)

To add a 4th/5th "mode", generate a cutout matching the exact style of `heroleft1/2/3`:

> Full-body studio photograph of two Papua New Guinean/Melanesian professionals standing side
> by side, [MAN: a male security guard in a navy security uniform with epaulettes and a peaked
> cap, arms relaxed] and [WOMAN: a female hospitality worker in a black-and-white chef/
> front-of-house uniform with an apron, holding a tablet], both smiling naturally at camera,
> three-quarter body shot, soft studio lighting, isolated on a pure transparent/white
> background, shot on a 50mm lens, commercial catalogue photography style, high detail on
> fabric texture and uniform branding patches, consistent lighting and shadow direction with a
> matching product-catalogue pair, PNG export with clean edges for cutout use.

*(Swap the bracketed uniform description per industry — kitchen/hospitality, security,
logistics/transport, education — to build out a full rotating set.)*

**Add a slide:** append an entry to `HERO_ROTATION` in `src/data/home-content.ts`, then add a
matching progress dot (the dots render automatically from the array length).

---

## 4. Resource / blog banner images (replace placeholder photos)

The three blog cards on the homepage currently reuse on-brand product/ies already on the site
as a safe placeholder. When you generate replacements, use this template (16:9, photojournalistic):

> Bright, clean editorial photograph for a workwear advice article, Papua New Guinean
> [healthcare worker / procurement manager / HR director] in a realistic office or clinical
> setting, candid mid-action pose (reviewing fabric samples / reading a tablet / discussing
> with a colleague), soft natural window light, shallow depth of field, warm approachable tone,
> negative space on one side for a text/title overlay, 16:9 crop, photojournalistic style, no
> text baked into image.

Wire each generated image into `BLOG_POSTS` in `src/data/home-content.ts` (the `image` field
per post).

---

## 5. Decide the fate of `public/image/uniform/*`

Two clean options — pick one, do not mix:

- **Recommended — merge into the photo set.** Drop the flat renders and point every rail item
  that uses `/image/uniform/*` at the regenerated `/image/category/*` photography (or
  `workforce/`). One photographic language site-wide. Update the `image` paths in
  `PRODUCT_RAILS` in `src/data/home-content.ts`.
- **Or — redo as a matched flat-icon set.** If a small filter row / icon strip needs flat
  marks, regenerate them as a **single line-weight, single accent colour on navy** (not
  photoreal mockups) and use them only for UI icons, never next to photography.

---

## 6. `public/image/biz/*` supplier logos

These are supplier/brand marks, not photography — that's fine for a "brands we stock" strip.
They currently sit on white and vanish against a white background. Put them on a tinted chip
(invert to a navy/light chip) in the `LogoMarquee` so they read. No regeneration required.