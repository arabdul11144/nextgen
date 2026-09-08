import type { Metadata } from "next";
import { HeroBannerGrid } from "@/components/home/HeroBannerGrid";
import { CategoryAvatars } from "@/components/home/CategoryAvatars";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { ProductRails } from "@/components/home/ProductRails";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { BulkCta } from "@/components/home/BulkCta";

export const metadata: Metadata = {
  title: "NextGen Solutions PNG — Workwear, Uniforms & Branding",
  description:
    "Professional workwear, uniforms, custom apparel and branding for PNG businesses. 30+ years of experience, nationwide delivery from Port Moresby.",
};

export default function Home() {
  return (
    <>
      {/* ── 1. Hero — rotating banner grid (2×2) ── */}
      <HeroBannerGrid />

      {/* ── 2. Explore by category — circular avatars ── */}
      <CategoryAvatars />

      {/* ── 3. Brand lines marquee — below Explore by Category ── */}
      <BrandMarquee />

      {/* ── 4. Product/service carousels — one per category ── */}
      <ProductRails />

      {/* ── 5. Client trust & reviews carousel ── */}
      <ReviewsCarousel />

      {/* ── 6. Bulk & corporate CTA band + logo marquee ── */}
      <BulkCta />
    </>
  );
}