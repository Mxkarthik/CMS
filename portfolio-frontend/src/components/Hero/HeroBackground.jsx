/**
 * HeroBackground
 *
 * Full-bleed CMS background image.
 * Three overlay layers:
 *   1. Subtle full-screen dark scrim (keeps the building visible)
 *   2. Left-to-right gradient panel behind text content
 *   3. Bottom vignette for scroll indicator legibility
 *
 * aria-hidden — decorative; heading provides the accessible label.
 */
function HeroBackground({ src, alt = "" }) {
    return (
        <div className="absolute inset-0 -z-10" aria-hidden="true">

            {/* CMS image */}
            {src && (
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover object-center"
                    style={{ animation: "hero-ken-burns 22s cubic-bezier(0.22,1,0.36,1) infinite alternate" }}
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                />
            )}

            {/* Layer 1 — global dark scrim, very light */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "rgba(5, 5, 10, 0.45)" }}
            />

            {/* Layer 2 — left gradient panel: text stays readable, right side stays open */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "linear-gradient(100deg, rgba(5,5,10,0.82) 0%, rgba(5,5,10,0.68) 30%, rgba(5,5,10,0.35) 52%, transparent 68%)",
                }}
            />

            {/* Layer 3 — bottom fade */}
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
                style={{
                    background:
                        "linear-gradient(to top, rgba(5,5,10,0.75) 0%, transparent 100%)",
                }}
            />
        </div>
    );
}

export default HeroBackground;
