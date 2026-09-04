import type { Metadata } from "next";
import { HeroBannerGrid } from "@/components/home/HeroBannerGrid";
import { CategoryAvatars } from "@/components/home/CategoryAvatars";
import { AboutUsStat } from "@/components/home/AboutUsStat";
import { CorporateAccounts } from "@/components/home/CorporateAccounts";
import { ProductRails } from "@/components/home/ProductRails";
import { BulkCta } from "@/components/home/BulkCta";
import { DistributorBand } from "@/components/home/DistributorBand";
import { CommunityNews } from "@/components/home/CommunityNews";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { BrandMarquee } from "@/components/home/BrandMarquee";

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

      {/* ── 3. Explore by category — circular avatars ── */}
      <CategoryAvatars />

      {/* ── 11. Brand lines marquee — below Explore by Category ── */}
      <BrandMarquee />

      {/* ── 8a. Find a Distributor — full-bleed banner (Section B) ── */}
      <DistributorBand />

      {/* ── 6. Product/service carousels — one per category ── */}
      <ProductRails />

      {/* ── 8. Bulk & corporate CTA band + logo marquee ── */}
      <BulkCta />

      {/* ── 4b. Bulk & Corporate Accounts — business CTA panel ── */}
      <CorporateAccounts />

      {/* ── 9b. Community / sponsorships news cards ── */}
      <CommunityNews />

      {/* ── 4a. Merged About Us + Trusted Partner stats (Section A) ── */}
      <AboutUsStat />

      {/* ── 10. FAQ accordion ── */}
      <FaqAccordion />
    </>
  );
}