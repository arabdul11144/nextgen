import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./HeroOverlay.module.css";

/* ============================================================
   HeroOverlay — per-slide promotional content layered over the
   rotating hero carousel. Three slide overlays (SlideOne/Two/Three)
   share the same building blocks (FeatureItem, CtaButton, InfoStrip,
   LogoBlock, LabelRow) so behaviour stays DRY while each slide keeps
   its own copy. OverlayLayer toggles visibility with the active slide
   and hides inactive layers from the a11y tree.
   ============================================================ */

const QUOTE_HREF = "/contact";
const SERVICES_HREF = "/services";
const LOGO_SRC = "/image/logo1.webp";

/* ── Shared SVG base ── */
type IconProps = { size?: number; className?: string };

function StrokeIcon({
  size = 22,
  className,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ── Icons (inline SVG, no icon lib installed) ── */
const ShieldCheckIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </StrokeIcon>
);

const RulerIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z" />
    <path d="m14.5 12.5 2-2" />
    <path d="m11.5 9.5 2-2" />
    <path d="m8.5 6.5 2-2" />
    <path d="m17.5 15.5 2-2" />
  </StrokeIcon>
);

const ScissorsIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M20 4 8.12 15.88" />
    <path d="M14.47 14.48 20 20" />
    <path d="M8.12 8.12 12 12" />
  </StrokeIcon>
);

const ShirtIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23Z" />
  </StrokeIcon>
);

const HeadsetIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
  </StrokeIcon>
);

const MapPinIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </StrokeIcon>
);

const TruckIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M14 17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h9v12Z" />
    <path d="M14 8h4l3 3v4a2 2 0 0 1-2 2h-5" />
    <circle cx="7.5" cy="17.5" r="1.6" />
    <circle cx="17.5" cy="17.5" r="1.6" />
  </StrokeIcon>
);

const UsersIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </StrokeIcon>
);

const AwardIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.5 13.9 17 22l-5-3-5 3 1.5-8.1" />
  </StrokeIcon>
);

const CheckBadgeIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" />
  </StrokeIcon>
);

const HandshakeIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </StrokeIcon>
);

const TagIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.42 0l9-9a1 1 0 0 0 0-1.42Z" />
    <path d="M7 7h.01" />
  </StrokeIcon>
);

const PackageIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </StrokeIcon>
);

const NeedleIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M20.2 3.8 8 16l2.5 2.5L22.7 6.3Z" />
    <path d="M10.5 18.5 3.5 21l2.5-7" />
  </StrokeIcon>
);

const MonitorIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </StrokeIcon>
);

const CalendarIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </StrokeIcon>
);

const GlobeIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20Z" />
    <path d="M2 12h20" />
  </StrokeIcon>
);

const RibbonIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M12 11.22C11 10.6 9.6 10 8 10s-3 .6-4 1.22V3l2.5 1.5L9 3l3 1.5L15 3l2.5 1.5L20 3v8.22C19 10.6 17.6 10 16 10s-3 .6-4 1.22Z" />
    <circle cx="12" cy="13.6" r="3.6" />
  </StrokeIcon>
);

const PngPinIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z" />
    <path d="M9.5 6.5h5M9.5 6.5v6a2 2 0 0 0 2 2V6.5" />
  </StrokeIcon>
);

const BirdIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M2 15c4.5-3.5 9.5-4.5 14.5-3.5-2.5-3.5-6.5-5-10.5-4.5L8 12.5c-2.2.6-4.2 1.4-6 2.5Z" />
    <path d="M17 11.5c1.4-.3 2.8-1.2 3.8-2.4-.6 2-.7 3.8-.3 5.4" />
  </StrokeIcon>
);

const ColorCmykIcon = ({ size = 22 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <circle cx="9" cy="12" r="6" fill="#00aeef" />
    <circle cx="15" cy="9" r="6" fill="#ec008c" fillOpacity="0.85" />
    <circle cx="15" cy="15" r="6" fill="#fdb900" fillOpacity="0.95" />
  </svg>
);

/* ── Shared building blocks ── */
type Feature = {
  icon: ReactNode;
  tone?: "red" | "orange" | "navy" | "yellow";
  title: string;
  sub: string;
};

const FEATURE_TONES: Record<NonNullable<Feature["tone"]>, string> = {
  red: "",
  orange: styles.featureIconOrange,
  navy: styles.featureIconNavy,
  yellow: styles.featureIconYellow,
};

function FeatureItem({ icon, tone = "red", title, sub }: Feature) {
  return (
    <div className={styles.feature}>
      <span className={`${styles.featureIcon} ${FEATURE_TONES[tone]}`}>{icon}</span>
      <span className={styles.featureTitle}>{title}</span>
      <span className={styles.featureSub}>{sub}</span>
    </div>
  );
}

type BtnVariant = "red" | "navy" | "orange" | "outline" | "globe";

const BTN_CLASSES: Record<BtnVariant, string> = {
  red: styles.btnRed,
  navy: styles.btnNavy,
  orange: styles.btnOrange,
  outline: styles.btnOutline,
  globe: styles.btnGlobe,
};

function CtaButton({
  variant,
  href,
  children,
}: {
  variant: BtnVariant;
  href: string;
  children: ReactNode;
}) {
  const className = `${styles.btn} ${BTN_CLASSES[variant]}`;
  if (href.startsWith("http")) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className={styles.textLink} href={href}>
      {children}
      <span className={styles.textLinkArrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}

function LogoBlock({ withDivider = false }: { withDivider?: boolean }) {
  return (
    <div>
      <div className={styles.logo}>
        <Image src={LOGO_SRC} alt="NextGen Solutions PNG" width={160} height={52} />
      </div>
      {withDivider ? <div className={styles.logoDivider} /> : null}
    </div>
  );
}

const LABEL_WORDS = ["PROTECT", "EQUIP", "BRAND", "SUPPLY"];

function LabelRow() {
  return (
    <div className={styles.labelRow}>
      {LABEL_WORDS.map((word, i) => (
        <span key={word} className={styles.labelWord}>
          {i > 0 ? <span className={styles.labelDot} aria-hidden="true" /> : null}
          {word}
        </span>
      ))}
    </div>
  );
}

type StripItem = { icon: ReactNode; title: string; sub: string };

/* ── Slide 1 ── */
const SLIDE1_FEATURES: Feature[] = [
  { icon: <ShieldCheckIcon size={24} />, tone: "red", title: "DURABLE & RELIABLE", sub: "Built for tough PNG conditions" },
  { icon: <RulerIcon size={24} />, tone: "yellow", title: "COMFORT & FIT", sub: "Designed for all-day performance" },
  { icon: <ScissorsIcon size={24} />, tone: "navy", title: "QUALITY CRAFTSMANSHIP", sub: "Precision stitching & finishing" },
  { icon: <ShirtIcon size={24} />, tone: "red", title: "CUSTOM BRANDING", sub: "Embroidery, printing & sublimation" },
  { icon: <HeadsetIcon size={24} />, tone: "orange", title: "LOCAL SUPPORT YOU CAN TRUST", sub: "Friendly service, nationwide" },
];

const SLIDE1_STRIP: StripItem[] = [
  { icon: <MapPinIcon size={20} />, title: "NATIONWIDE SERVICE", sub: "Across Papua New Guinea" },
  { icon: <TruckIcon size={20} />, title: "FAST & RELIABLE DELIVERY", sub: "On time, every time" },
  { icon: <UsersIcon size={20} />, title: "SUPPORTING PNG BUSINESS", sub: "Creating jobs & strengthening communities" },
  { icon: <AwardIcon size={20} />, title: "PREMIUM QUALITY ASSURED", sub: "Tested. Trusted. Built to last." },
  { icon: <HandshakeIcon size={20} />, title: "YOUR PARTNER IN PROGRESS", sub: "Equipping PNG for a stronger future" },
];

function SlideOne() {
  return (
    <>
      <div className={styles.badge}>
        <span className={styles.badgeIcon}>
          <BirdIcon size={26} />
        </span>
        <span className={styles.badgeText}>
          SUPPORTING <strong>PNG</strong> JOBS &amp; COMMUNITIES
        </span>
      </div>

      <div className={styles.main}>
        <LogoBlock />

        <h2 className={styles.headline}>
          <span className={styles.headlineLine}>BUILT FOR PNG.</span>
          <span className={`${styles.headlineLine} ${styles.headlineLineRed}`}>MADE FOR YOU.</span>
        </h2>

        <div className={styles.stripeRow} aria-hidden="true">
          <span className={`${styles.stripeSeg} ${styles.stripeBlack}`} />
          <span className={`${styles.stripeSeg} ${styles.stripeRed}`} />
          <span className={`${styles.stripeSeg} ${styles.stripeYellow}`} />
        </div>

        <p className={styles.subhead}>
          Premium Workwear &amp; Uniform Solutions Proudly Serving{" "}
          <strong>Papua New Guinea.</strong>
        </p>

        <p className={styles.body}>
          From rugged worksites to professional workplaces, we deliver high-quality workwear,
          uniforms and branded solutions that stand up to the toughest conditions and represent
          your brand with pride.
        </p>

        <div className={styles.featureRow}>
          {SLIDE1_FEATURES.map((f) => (
            <FeatureItem key={f.title} {...f} />
          ))}
        </div>

        <div className={styles.buttonRow}>
          <CtaButton variant="red" href={QUOTE_HREF}>
            REQUEST A QUOTE →
          </CtaButton>
          <CtaButton variant="globe" href="https://nextgenworkwear.com.pg">
            <GlobeIcon size={16} /> nextgenworkwear.com.pg
          </CtaButton>
        </div>
      </div>
    </>
  );
}

/* ── Slide 2 ── */
const SLIDE2_FEATURES: Feature[] = [
  { icon: <ShieldCheckIcon size={26} />, tone: "navy", title: "PROTECT", sub: "Safety & Hi-Vis" },
  { icon: <ShirtIcon size={26} />, tone: "navy", title: "EQUIP", sub: "Uniforms & Workwear" },
  { icon: <TagIcon size={26} />, tone: "orange", title: "BRAND", sub: "Embroidery & Printing" },
  { icon: <PackageIcon size={26} />, tone: "navy", title: "SUPPLY", sub: "Operational & Essential" },
];

const SLIDE2_STRIP: StripItem[] = [
  { icon: <CalendarIcon size={20} />, title: "30+", sub: "Years of Experience" },
  { icon: <MapPinIcon size={20} />, title: "PNG", sub: "Proudly Local, Nationwide" },
  { icon: <UsersIcon size={20} />, title: "Trusted by Businesses", sub: "Across Many Industries" },
  { icon: <CheckBadgeIcon size={20} />, title: "Quality You Can Rely On", sub: "Built for Safety, Made to Last" },
  { icon: <TruckIcon size={20} />, title: "Reliable Supply. On Time.", sub: "When You Need It, Where You Need It" },
  { icon: <HeadsetIcon size={20} />, title: "Local Support. Real People.", sub: "Here to Help You Every Step of the Way" },
];

function SlideTwo() {
  return (
    <>
      <div className={styles.main}>
        <LogoBlock withDivider />

        <LabelRow />

        <h2 className={styles.headline}>
          <span className={styles.headlineLine}>Built for the people who keep</span>
          <span className={`${styles.headlineLine} ${styles.headlineLineOrange}`}>PNG</span>
          <span className={styles.headlineLine}>moving.</span>
        </h2>

        <p className={styles.body}>
          Workwear, safety gear, uniforms and branded solutions for every industry across Papua
          New Guinea. One partner for the products people wear, the safety they require, and the
          brand they represent.
        </p>

        <div className={styles.featureRow}>
          {SLIDE2_FEATURES.map((f) => (
            <FeatureItem key={f.title} {...f} />
          ))}
        </div>

        <div className={styles.buttonRow}>
          <CtaButton variant="navy" href={QUOTE_HREF}>
            REQUEST A QUOTE →
          </CtaButton>
          <TextLink href={SERVICES_HREF}>EXPLORE OUR SERVICES</TextLink>
        </div>
      </div>
    </>
  );
}

/* ── Slide 3 ── */
const SLIDE3_LIST = [
  { icon: <NeedleIcon size={20} />, title: "EMBROIDERY", sub: "Precision stitching that lasts" },
  { icon: <ShirtIcon size={20} />, title: "PRINTING", sub: "High quality prints that stand out" },
  { icon: <ColorCmykIcon size={20} />, title: "SUBLIMATION", sub: "Vibrant. Durable. Unlimited possibilities." },
  { icon: <MonitorIcon size={20} />, title: "SIGNAGE", sub: "Professional branding that gets noticed" },
  { icon: <PackageIcon size={20} />, title: "PACKAGING", sub: "Custom packaging that represents you" },
];

const SLIDE3_STRIP: StripItem[] = [
  { icon: <ShieldCheckIcon size={20} />, title: "QUALITY YOU CAN TRUST", sub: "Premium products built for performance" },
  { icon: <UsersIcon size={20} />, title: "INDUSTRY EXPERIENCE", sub: "Serving businesses across PNG" },
  { icon: <HandshakeIcon size={20} />, title: "CUSTOM SOLUTIONS", sub: "Tailored to your brand and requirements" },
  { icon: <TruckIcon size={20} />, title: "RELIABLE DELIVERY", sub: "On time. Every time. Where you need it." },
  { icon: <RibbonIcon size={20} />, title: "BUILT FOR DURABILITY", sub: "Products that perform in demanding conditions" },
  { icon: <PngPinIcon size={20} />, title: "PROUDLY PNG", sub: "Local expertise. National reach." },
];

/* ── Per-slide arrangement for the info band rendered BELOW the hero ── */
const HERO_STRIPS: {
  items: StripItem[];
  columns: 5 | 6;
  tone: "red" | "orange";
}[] = [
  { items: SLIDE1_STRIP, columns: 5, tone: "red" },
  { items: SLIDE2_STRIP, columns: 6, tone: "orange" },
  { items: SLIDE3_STRIP, columns: 6, tone: "orange" },
];

export function HeroInfoStrip({ slideIndex }: { slideIndex: number }) {
  const strip = HERO_STRIPS[slideIndex % HERO_STRIPS.length];
  return (
    <div className={`${styles.strip}${strip.tone === "orange" ? ` ${styles.stripOrange}` : ""}`}>
      <div className={`${styles.stripGrid} ${strip.columns === 6 ? styles.stripCol6 : styles.stripCol5}`}>
        {strip.items.map((item, i) => (
          <div key={i} className={styles.stripItem}>
            <span className={styles.stripIcon}>{item.icon}</span>
            <span className={styles.stripText}>
              <span className={styles.stripTitle}>{item.title}</span>
              <span className={styles.stripSub}>{item.sub}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideThree() {
  return (
    <>
      <div className={styles.main}>
        <LogoBlock withDivider />

        <LabelRow />

        <h2 className={styles.headline}>
          <span className={styles.headlineLine}>Your brand.</span>
          <span className={`${styles.headlineLine} ${styles.headlineLineOrange}`}>Professionally</span>
          <span className={styles.headlineLine}>represented.</span>
        </h2>

        <div className={styles.accentBar} aria-hidden="true" />

        <p className={styles.body}>
          From embroidered uniforms to printed apparel and branded merchandise – we bring your
          brand to life with quality and precision.
        </p>

        <div className={styles.buttonRow}>
          <CtaButton variant="orange" href={SERVICES_HREF}>
            EXPLORE OUR SERVICES →
          </CtaButton>
          <CtaButton variant="outline" href={QUOTE_HREF}>
            REQUEST A QUOTE →
          </CtaButton>
        </div>
      </div>

      <div className={styles.rightList}>
        {SLIDE3_LIST.map((item) => (
          <div key={item.title} className={styles.vItem}>
            <span className={styles.vIcon}>{item.icon}</span>
            <span className={styles.vText}>
              <span className={styles.vTitle}>{item.title}</span>
              <span className={styles.vSub}>{item.sub}</span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Exports ── */
export const HERO_OVERLAYS = [SlideOne, SlideTwo, SlideThree];

export function OverlayLayer({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`${styles.overlay}${active ? ` ${styles.overlayActive}` : ""}`}
      aria-hidden={active ? undefined : true}
    >
      {children}
    </div>
  );
}