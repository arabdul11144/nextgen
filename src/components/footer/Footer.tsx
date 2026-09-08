import Link from "next/link";
import { CONTACT } from "@/data/home-content";
import { NewsletterForm } from "@/components/newsletter-form/NewsletterForm";
import styles from "./Footer.module.css";

/* Service-highlights bar — claims the business can stand behind */
const SERVICE_HIGHLIGHTS = [
  {
    icon: "help",
    title: "Help Center",
    sub: "Answers and support when you need it",
  },
  {
    icon: "lock",
    title: "Secure Quote Process",
    sub: "Your details stay private and protected",
  },
  {
    icon: "return",
    title: "Returns & Support",
    sub: "Hassle-free order support, every time",
  },
  {
    icon: "leaf",
    title: "Local & Community",
    sub: "Manufacturing and finishing in PNG",
  },
];

const HELP_LINKS = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/contact" },
  { label: "Delivery Info", href: "/contact" },
  { label: "Returns & Support", href: "/contact" },
  { label: "Business & Trade Accounts", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

const SOCIALS = [
  { label: "Facebook", title: "Follow NextGen on Facebook" },
  { label: "Instagram", title: "Follow NextGen on Instagram" },
  { label: "X", title: "Follow NextGen on X" },
  { label: "LinkedIn", title: "Follow NextGen on LinkedIn" },
];

function ServiceHighlightIcon({ icon }: { icon: string }) {
  if (icon === "help") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    );
  }
  if (icon === "lock") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  }
  if (icon === "return") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z" />
      <path d="M2 21c0-3 1.9-5 5-5" />
    </svg>
  );
}
function SocialIcon({ label }: { label: string }) {
  if (label === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.8H7.8V14h2.4v7h3.3z" />
      </svg>
    );
  }
  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M6.94 8.5V21H3.56V8.5h3.38zM5.25 3a1.96 1.96 0 1 1 0 3.92 1.96 1.96 0 0 1 0-3.92zM21 13.8c0-3.03-1.72-4.9-4.25-4.9-1.5 0-2.62.74-3.05 1.81h-.06V8.5H10.3V21h3.38v-5.54c0-1.51.85-2.34 1.98-2.34 1.16 0 1.84.82 1.84 2.4V21H21v-7.2z" />
      </svg>
    );
  }
  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M17.7 3H21l-7.2 8.2L22 21h-6.6l-5-6.1L4.6 21H1.3l7.7-8.8L2 3h6.8l4.5 5.6L17.7 3zm-1.2 16h1.8L7.7 4.9H5.8L16.5 19z" />
    </svg>
  );
}
export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top gradient fade + faint watermark */}
      <span className={styles.fadeTop} aria-hidden="true" />
      <span className={styles.watermark} aria-hidden="true">
        NextGen<span className={styles.watermarkAccent}>X</span>
      </span>

      {/* ── Service highlights bar ── */}
      <div className={styles.highlights}>
        <div className={styles.highlightsInner}>
          {SERVICE_HIGHLIGHTS.map((item) => (
            <div key={item.title} className={styles.highlight}>
              <span className={styles.highlightIcon} aria-hidden="true">
                <ServiceHighlightIcon icon={item.icon} />
              </span>
              <span className={styles.highlightText}>
                <strong className={styles.highlightTitle}>{item.title}</strong>
                <span className={styles.highlightSub}>{item.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className={styles.main}>
        <div className={styles.mainInner}>
          {/* Brand column */}
          <div className={styles.colBrand}>
            <Link href="/" className={styles.brand} aria-label="NextGen Solutions PNG">
              <span className={styles.wordmark}>
                <span className={styles.wordLight}>Ne</span>
                <span className={styles.wordAccent}>x</span>
                <span className={styles.wordLight}>tGen</span>
              </span>
              <span className={styles.wordTagline}>Solutions PNG</span>
            </Link>
            <p className={styles.blurb}>
              Workwear, uniforms and branded solutions built for your
              organisation — Papua New Guinea.
            </p>
            <div className={styles.contactBlock}>
              <span className={styles.contactRow}>
                <svg className={styles.contactIcon} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {CONTACT.address}
              </span>
              <a className={styles.contactRow} href={CONTACT.emailHref}>
                <svg className={styles.contactIcon} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
                {CONTACT.email}
              </a>
              <a className={styles.contactRow} href={CONTACT.phoneHref}>
                <svg className={styles.contactIcon} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {CONTACT.phone}
              </a>
            </div>
            <div className={styles.socials}>
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className={styles.social}
                  title={social.title}
                  aria-label={social.title}
                >
                  <SocialIcon label={social.label} />
                </a>
              ))}
            </div>
          </div>

          {/* Help & Advice */}
          <div className={styles.col}>
            <span className={styles.colTitle}>
              <span className={styles.colTick} aria-hidden="true" />
              Help &amp; Advice
            </span>
            <ul className={styles.links}>
              {HELP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    <span className={styles.linkText}>{link.label}</span>
                    <span className={styles.linkArrow} aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className={styles.col}>
            <span className={styles.colTitle}>
              <span className={styles.colTick} aria-hidden="true" />
              Legal
            </span>
            <ul className={styles.links}>
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    <span className={styles.linkText}>{link.label}</span>
                    <span className={styles.linkArrow} aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter mini-form */}
          <div className={styles.colNews}>
            <span className={styles.colTitle}>
              <span className={styles.colTick} aria-hidden="true" />
              Stay in the loop
            </span>
            <p className={styles.newsSub}>
              Workwear, uniform and branding know-how for PNG organisations.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span className={styles.copy}>
            © {new Date().getFullYear()} NextGen Solutions PNG (by Consultrans).
            All rights reserved.
          </span>
          <span className={styles.policy}>
            <a href="#" className={styles.policyLink}>Terms of use</a>
            <span className={styles.policyDivider} aria-hidden="true">|</span>
            <a href="#" className={styles.policyLink}>Privacy Policy</a>
            <span className={styles.policyDivider} aria-hidden="true">|</span>
            <a href="#" className={styles.policyLink}>Cookie Policy</a>
          </span>
        </div>
      </div>
    </footer>
  );
}