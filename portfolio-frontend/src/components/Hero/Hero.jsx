import HeroBackground from "./HeroBackground.jsx";
import HeroContent    from "./HeroContent.jsx";
import HeroStats      from "./HeroStats.jsx";

/**
 * Hero — root component.
 *
 * Composes HeroBackground + HeroContent + scroll indicator.
 * Receives the live hero object from the CMS via props.
 *
 * @param {object} hero  — the hero object returned by the Public API.
 */
function Hero({ hero }) {
    if (!hero) return null;

    /* ── Build stats array, filtering out null/empty values ── */
    const stats = [
        hero.projectsCompleted   && { value: hero.projectsCompleted.value   ?? hero.projectsCompleted,   suffix: hero.projectsCompleted.suffix   ?? "+",  label: "Projects Completed" },
        hero.happyClients        && { value: hero.happyClients.value        ?? hero.happyClients,        suffix: hero.happyClients.suffix        ?? "+",  label: "Happy Clients" },
        hero.yearsExperience     && { value: hero.yearsExperience.value     ?? hero.yearsExperience,     suffix: hero.yearsExperience.suffix     ?? "",   label: "Years Experience" },
        hero.clientSatisfaction  && { value: hero.clientSatisfaction.value  ?? hero.clientSatisfaction,  suffix: hero.clientSatisfaction.suffix  ?? "%",  label: "Client Satisfaction" },
    ].filter(Boolean);

    return (
        <section
            className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden"
            id="hero"
            aria-label="Hero section"
        >
            {/* Full-bleed CMS background image */}
            <HeroBackground
                src={hero.backgroundImage}
                alt="Construction project background"
            />

            {/* Badge · eyebrow · title · description · CTAs */}
            <HeroContent hero={hero} />

            {/* Statistics — only if data exists */}
            {stats.length > 0 && (
                <div className="animate-fade-up w-full max-w-[1200px] px-5 pb-12 opacity-0 animation-delay-750 sm:px-8 md:px-12 lg:px-16 xl:px-20">
                    <div className="border-t border-white-10 pt-8 sm:pt-10">
                        <HeroStats stats={stats} />
                    </div>
                </div>
            )}

            {/* Subtle scroll indicator */}
            <div
                className="animate-fade-up absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 opacity-0 animation-delay-1000 sm:bottom-8"
                aria-hidden="true"
            >
                <span className="font-body text-[0.625rem] uppercase tracking-[0.18em] text-white-60">
                    Scroll
                </span>
                <div className="relative h-7 w-px overflow-hidden rounded-sm bg-white-30 sm:h-9">
                    <div className="animate-scroll-thumb absolute top-0 left-0 h-[40%] w-full rounded-sm bg-brand-gold" />
                </div>
            </div>
        </section>
    );
}

export default Hero;
