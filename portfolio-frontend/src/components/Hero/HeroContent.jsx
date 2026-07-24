import HeroButtons from "./HeroButtons.jsx";

/**
 * HeroContent
 *
 * Badge → eyebrow → title → description → CTAs.
 * Stats are rendered separately in Hero.jsx.
 * Every CMS field is guarded — nothing renders if null/empty.
 * Animations are staggered via animation-delay utility classes.
 */
function HeroContent({ hero }) {
    const {
        subtitle,
        title,
        description,
        ourServicesButtonText,
        ourServicesButtonLink,
        viewProjectsButtonText,
        viewProjectsButtonLink,
    } = hero;

    return (
        <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-start gap-0 px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-16 lg:py-32 xl:px-20">

            {/* ── Premium badge ── */}
            <div
                className="animate-fade-up opacity-0 animation-delay-100"
                aria-label="Company badge"
            >
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold bg-white-8 px-4 py-1.5 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand-gold" aria-hidden="true" />
                    <span className="font-body text-[clamp(0.625rem,1.5vw,0.75rem)] font-medium uppercase tracking-[0.12em] text-brand-gold-light">
                        Premium Construction
                    </span>
                </div>
            </div>

            {/* ── Eyebrow / subtitle ── */}
            {subtitle && (
                <p
                    className="animate-fade-up mt-5 opacity-0 animation-delay-200 font-body text-[clamp(0.65rem,1.8vw,0.875rem)] font-normal uppercase tracking-[0.18em] text-brand-gold sm:mt-6"
                    aria-label={subtitle}
                >
                    {subtitle}
                </p>
            )}

            {/* ── Main heading ── */}
            {title && (
                <h1
                    className="animate-fade-up mt-3 opacity-0 animation-delay-300 font-display text-[clamp(2.2rem,7.5vw,5.5rem)] font-semibold leading-[1.08] tracking-tight text-white sm:mt-4"
                    id="hero-heading"
                >
                    <TitleWithAccent title={title} />
                </h1>
            )}

            {/* ── Supporting description ── */}
            {description && (
                <p
                    className="animate-fade-up mt-4 max-w-[52ch] opacity-0 animation-delay-450 font-body text-[clamp(0.875rem,2.2vw,1.125rem)] font-light leading-relaxed text-white-80 sm:mt-5"
                >
                    {description}
                </p>
            )}

            {/* ── CTAs ── */}
            <div className="animate-fade-up mt-8 opacity-0 animation-delay-600 sm:mt-10 lg:mt-12">
                <HeroButtons
                    primaryText={ourServicesButtonText}
                    primaryLink={ourServicesButtonLink}
                    secondaryText={viewProjectsButtonText}
                    secondaryLink={viewProjectsButtonLink}
                />
            </div>
        </div>
    );
}

/**
 * Italicises the last word of the title for visual elegance.
 * Falls back cleanly for single-word titles.
 * Adds a gold underline accent beneath the emphasised word.
 */
function TitleWithAccent({ title }) {
    if (!title) return null;

    const words = title.trim().split(/\s+/);
    if (words.length < 2) return <>{title}</>;

    const last   = words.pop();
    const before = words.join(" ");

    return (
        <>
            {before}{" "}
            <em className="relative inline-block not-italic text-brand-gold">
                {last}
                <span
                    className="absolute bottom-0 left-0 h-0.5 w-full rounded-sm opacity-60"
                    style={{
                        background: "linear-gradient(90deg, #c9a96e 0%, transparent 100%)",
                    }}
                    aria-hidden="true"
                />
            </em>
        </>
    );
}

export default HeroContent;
