import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/home-content";
import { Reveal } from "@/components/reveal/Reveal";
import styles from "./AdviceSection.module.css";

/**
 * "Advice / Resources from the Experts" — rebuilds the existing
 * 3-post blog teaser into rich cards with a layered image
 * composition, "X min read" tag, title, 2-line excerpt and a
 * "Read the guide" link. Uses the real blog post titles/content.
 */
export function AdviceSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <p className="ng-eyebrow" style={{ color: "var(--ng-accent-emerald)" }}>
            Advice from the Experts
          </p>
          <h2 className={styles.title}>Resources that help you decide</h2>
          <p className={styles.sub}>
            Practical guidance on workwear, uniforms and branding for
            organisations across Papua New Guinea.
          </p>
        </Reveal>

        <div className={styles.grid}>
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.title} delay={(i % 3) * 90}>
              <article className={styles.card}>
                <div className={styles.media}>
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                    className={styles.photo}
                  />
                  <span className={styles.scrim} aria-hidden="true" />
                  <span className={styles.date}>
                    <strong>{post.day}</strong>
                    <span>{post.month}</span>
                  </span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>

                {/* Mini-infographic icon row */}
                <div className={styles.iconRow}>
                  <span className={styles.iconChip}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20.59 13.41 12 22 2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                      <circle cx="7" cy="7" r="1.5" />
                    </svg>
                    {post.category}
                  </span>
                  <span className={styles.iconChip}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                    </svg>
                    {post.author}
                  </span>
                </div>

                <div className={styles.body}>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <Link href="/contact" className={styles.readLink}>
                    Read the guide <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.foot}>
          <Link href="/contact" className={styles.allBtn}>
            Explore All Advice <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}