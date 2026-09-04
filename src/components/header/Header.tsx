"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTypewriterPlaceholder } from "@/hooks/useTypewriterPlaceholder";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  serviceCategories,
  services,
  type CategorySlug,
} from "@/data/services";
import { industries } from "@/data/industries";
import { CONTACT, TRUST_ITEMS } from "@/data/home-content";
import { useQuoteBasket } from "@/components/quote-basket/QuoteBasketContext";
import styles from "./Header.module.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasMega: true },
  { label: "Industries", href: "/industry" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

/* Category accent — the same color-coding used across the whole site */
const ACCENTS: Record<CategorySlug, string> = {
  "workwear-safety": "var(--ng-safety)",
  "corporate-professional": "var(--ng-burgundy)",
  "custom-apparel": "var(--ng-gold)",
  "branding-merchandise": "var(--ng-forest)",
};

/* Mega-menu groups derived from the services data layer. Each
   service carries its real "solutions" list for the nested flyout. */
const megaGroups = serviceCategories.map((category) => ({
  ...category,
  accent: ACCENTS[category.slug],
  links: services
    .filter((s) => s.category === category.slug)
    .map((s) => ({
      slug: s.slug,
      title: s.title,
      href: `/services/${s.slug}`,
      solutions: s.solutions,
    })),
}));

/* Rotating utility-bar messages — real figures only */
const UTILITY_MESSAGES = [
  "Need help? Get a quote — we respond within 1–2 business days.",
  "Bulk & corporate uniform programs — nationwide delivery across PNG.",
  "30+ years supplying PNG businesses with workwear & branding.",
];

/* Typewriter placeholder — config-driven term list */
const SEARCH_TERMS = [
  "Fleeces",
  "Scrubs",
  "Polo Shirt",
  "Hi-Vis Jackets",
  "Corporate Uniforms",
  "Embroidered Caps",
];

export function Header() {
  const pathname = usePathname();
  const { itemCount, open: openBasket } = useQuoteBasket();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState<CategorySlug | null>(
    null,
  );
  const [scrolled, setScrolled] = useState(false);

  /* Search */
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  /* Typewriter placeholder */
  const {
    placeholder: twPlaceholder,
    active: twActive,
    stop: twStop,
    reset: twReset,
  } = useTypewriterPlaceholder({ prefix: "Search for ", terms: SEARCH_TERMS });

  /* Utility message rotator */
  const [msgIndex, setMsgIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!pausedRef.current) {
        setMsgIndex((i) => (i + 1) % UTILITY_MESSAGES.length);
      }
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menus on route change */
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setActiveService(null);
  }, [pathname]);

  /* Close search dropdown on outside click */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!searchRef.current?.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  /* Search index — real services + industries from the data layer */
  const searchIndex = useMemo(
    () => [
      ...services.map((s) => ({
        label: s.title,
        href: `/services/${s.slug}`,
        group: s.category,
        keywords: `${s.title} ${s.solutions.join(" ")} ${s.shortDescription}`,
      })),
      ...industries.map((i) => ({
        label: i.name,
        href: "/industry",
        group: "Industry",
        keywords: `${i.name} ${i.description}`,
      })),
    ],
    [],
  );

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex
      .filter((item) => item.keywords.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, searchIndex]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={styles.headerWrap}>
      {/* ── Tier 1: Utility bar — rotating message + contact ── */}
      <div
        className={`${styles.utility} ${scrolled ? styles.utilityHidden : ""}`}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        <div className={styles.utilityInner}>
          <p key={msgIndex} className={styles.utilityMsg}>
            {UTILITY_MESSAGES[msgIndex]}
          </p>
          <div className={styles.utilityContact}>
            <a href={CONTACT.emailHref} className={styles.utilityLink}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 6L2 7" />
              </svg>
              {CONTACT.email}
            </a>
            <a href={CONTACT.phoneHref} className={styles.utilityLink}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>
{/* ── Tier 2: Main bar — logo · search · icons ── */}
      <div className={`${styles.mainBar} ${scrolled ? styles.compact : ""}`}>
        <div className={styles.mainInner}>
          <Link
            href="/"
            className={styles.brand}
            aria-label="NextGen Solutions PNG — home"
          >
            <Image
              src="/image/logo2.png"
              alt="NextGen Solutions PNG"
              width={200}
              height={80}
              priority
              className={styles.brandLogo}
            />
          </Link>

          {/* Centered live search */}
          <div className={styles.searchWrap} ref={searchRef}>
            <div className={styles.searchBox}>
              <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              {twActive && (
                <span className={styles.typewriter} aria-hidden="true">
                  {twPlaceholder}
                  <span className={styles.typewriterCursor} />
                </span>
              )}
              <input
                type="search"
                className={styles.searchInput}
                placeholder={!twActive ? "Search products, services, industries…" : ""}
                aria-label="Search products, services, industries"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => {
                  setSearchFocused(true);
                  twStop();
                }}
                onBlur={() => {
                  setSearchFocused(false);
                  if (!query.trim()) twReset();
                }}
              />
            </div>
            {searchFocused && query.trim() && (
              <div className={styles.searchResults} role="listbox">
                {searchResults.length === 0 ? (
                  <p className={styles.searchEmpty}>
                    No matches — try &quot;hi-vis&quot;, &quot;scrubs&quot; or
                    &quot;mining&quot;.
                  </p>
                ) : (
                  searchResults.map((r) => (
                    <Link
                      key={`${r.group}-${r.label}`}
                      href={r.href}
                      className={styles.searchResult}
                      onClick={() => {
                        setQuery("");
                        setSearchFocused(false);
                      }}
                    >
                      <span className={styles.searchResultLabel}>{r.label}</span>
                      <span className={styles.searchResultGroup}>{r.group}</span>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Icon cluster */}
          <div className={styles.icons}>
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Account"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={openBasket}
              aria-label={`Quote basket, ${itemCount} items`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 7h12l1.5 13h-15L6 7z" />
                <path d="M9 10V6a3 3 0 0 1 6 0v4" />
              </svg>
              {itemCount > 0 && (
                <span className={styles.badge} key={itemCount}>
                  {itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className={`${styles.iconBtn} ${styles.mobileToggle}`}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span className={`${styles.burger} ${mobileOpen ? styles.burgerOpen : ""}`} />
            </button>
          </div>
        </div>
      </div>
{/* ── Tier 3: Nav row + mega menu ── */}
      <div className={styles.navBar}>
        <div className={styles.navInner}>
          <nav className={styles.nav} aria-label="Primary">
            {navItems.map((item) =>
              item.hasMega ? (
                <div
                  key={item.label}
                  className={styles.navMegaWrap}
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => {
                    setMegaOpen(false);
                    setActiveService(null);
                  }}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setMegaOpen(false);
                      setActiveService(null);
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${isActive(item.href) ? styles.navLinkActive : ""}`}
                    aria-expanded={megaOpen}
                  >
                    {item.label}
                    <svg className={`${styles.caret} ${megaOpen ? styles.caretUp : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </Link>

                  {megaOpen && (
                    <div className={styles.mega}>
                      <div className={styles.megaGrid}>
                        {megaGroups.map((group) => (
                          <div key={group.slug} className={styles.megaCol}>
                            <span className={styles.megaCat}>
                              <span
                                className={styles.megaDot}
                                style={{ background: group.accent }}
                                aria-hidden="true"
                              />
                              {group.name}
                            </span>
                            <ul className={styles.megaList}>
                              {group.links.map((link) => (
                                <li key={link.slug}>
                                  <Link
                                    href={link.href}
                                    className={`${styles.megaLink} ${activeService === link.slug ? styles.megaLinkActive : ""}`}
                                    onMouseEnter={() => setActiveService(link.slug)}
                                    onClick={() => setMegaOpen(false)}
                                  >
                                    {link.title}
                                    <span className={styles.megaLinkArrow} aria-hidden="true">
                                      →
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
{/* Nested flyout — the hovered service's solutions */}
                      {activeService && (
                        <div className={styles.nested}>
                          {(() => {
                            const svc = services.find(
                              (s) => s.slug === activeService,
                            );
                            if (!svc) return null;
                            return (
                              <>
                                <p className={styles.nestedTitle}>{svc.title}</p>
                                <p className={styles.nestedTag}>{svc.tagline}</p>
                                <ul className={styles.nestedList}>
                                  {svc.solutions.map((sol) => (
                                    <li key={sol}>
                                      <Link
                                        href={`/services/${svc.slug}`}
                                        className={styles.nestedLink}
                                        onClick={() => setMegaOpen(false)}
                                      >
                                        {sol}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                                <Link
                                  href={`/services/${svc.slug}`}
                                  className={styles.nestedCta}
                                  onClick={() => setMegaOpen(false)}
                                >
                                  View service <span aria-hidden="true">→</span>
                                </Link>
                              </>
                            );
                          })()}
                        </div>
                      )}

                      <Link
                        href="/services"
                        className={styles.megaAll}
                        onClick={() => setMegaOpen(false)}
                      >
                        All Services <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${styles.navLink} ${isActive(item.href) ? styles.navLinkActive : ""}`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className={styles.navRight}>
            <Link href="/services" className={styles.tradeLink}>
              Trade &amp; Wholesale
            </Link>
            <Link href="/contact" className={styles.expertPill}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
{/* ── Tier 4: Trust strip ── */}
      <div className={styles.trustStrip}>
        <div className={styles.trustInner}>
          {TRUST_ITEMS.map((item, i) => (
            <div key={item.title} className={styles.trustItem} style={{ animationDelay: `${i * 90}ms` }}>
              <span className={styles.trustIcon} aria-hidden="true">
                {item.icon === "truck" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 3h15v13H1z" />
                    <path d="M16 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                )}
                {item.icon === "tag" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.59 13.41 12 22 2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                    <circle cx="7" cy="7" r="1.5" />
                  </svg>
                )}
                {item.icon === "award" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.5 13 17 22l-5-3-5 3 1.5-9" />
                  </svg>
                )}
                {item.icon === "shield" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                )}
              </span>
              <span className={styles.trustText}>
                <strong className={styles.trustTitle}>{item.title}</strong>
                <span className={styles.trustSub}>{item.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
{/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav} aria-label="Mobile">
            {navItems.map((item) =>
              item.hasMega ? (
                <div key={item.label} className={styles.mobileGroup}>
                  <button
                    type="button"
                    className={styles.mobileParent}
                    aria-expanded={mobileCategoriesOpen}
                    onClick={() => setMobileCategoriesOpen((o) => !o)}
                  >
                    {item.label}
                    <span
                      className={`${styles.caret} ${mobileCategoriesOpen ? styles.rotate : ""}`}
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </button>

                  {mobileCategoriesOpen && (
                    <div className={styles.mobileSub}>
                      {megaGroups.map((group) => (
                        <div key={group.slug} className={styles.mobileCat}>
                          <button
                            type="button"
                            className={styles.mobileCatToggle}
                            aria-expanded={mobileCategory === group.slug}
                            onClick={() =>
                              setMobileCategory((c) =>
                                c === group.slug ? null : group.slug,
                              )
                            }
                          >
                            <span
                              className={styles.megaDot}
                              style={{ background: group.accent }}
                              aria-hidden="true"
                            />
                            {group.name}
                            <span
                              className={`${styles.caret} ${mobileCategory === group.slug ? styles.rotate : ""}`}
                              aria-hidden="true"
                            >
                              ▾
                            </span>
                          </button>
                          {mobileCategory === group.slug && (
                            <ul className={styles.mobileLinks}>
                              {group.links.map((link) => (
                                <li key={link.slug}>
                                  <Link
                                    href={link.href}
                                    className={styles.mobileLink}
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {link.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                      <Link
                        href="/services"
                        className={`${styles.mobileLink} ${styles.mobileAll}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        All Services <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={styles.mobileParent}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="/contact"
              className={styles.mobileCta}
              onClick={() => setMobileOpen(false)}
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}