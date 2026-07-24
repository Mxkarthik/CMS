/**
 * HeroButtons
 *
 * Primary (gold) + Secondary (glass) CTAs.
 * Stacks vertically on mobile, inline on sm+.
 * Links come directly from the CMS — no hardcoded values.
 */
function HeroButtons({ primaryText, primaryLink, secondaryText, secondaryLink }) {
    const hasPrimary   = primaryText   && primaryLink;
    const hasSecondary = secondaryText && secondaryLink;

    if (!hasPrimary && !hasSecondary) return null;

    return (
        <div
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            role="group"
            aria-label="Call to action buttons"
        >
            {hasPrimary && (
                <a
                    href={primaryLink}
                    id="hero-btn-primary"
                    className="group inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-md px-7 py-3 text-sm font-medium tracking-wide whitespace-nowrap no-underline transition-all duration-200"
                    style={{
                        background: "linear-gradient(135deg, #e8c98a 0%, #c9a96e 55%, #a07840 100%)",
                        color: "#0a0a0e",
                        boxShadow: "0 4px 22px rgba(201,169,110,0.32), 0 1px 4px rgba(0,0,0,0.22)",
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 34px rgba(201,169,110,0.42), 0 2px 8px rgba(0,0,0,0.26)";
                        e.currentTarget.style.filter = "brightness(1.06)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = "";
                        e.currentTarget.style.boxShadow = "0 4px 22px rgba(201,169,110,0.32), 0 1px 4px rgba(0,0,0,0.22)";
                        e.currentTarget.style.filter = "";
                    }}
                >
                    <span>{primaryText}</span>
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                        style={{ transition: "transform 0.2s" }}
                    >
                        <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </a>
            )}

            {hasSecondary && (
                <a
                    href={secondaryLink}
                    id="hero-btn-secondary"
                    className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-md border px-7 py-3 text-sm font-normal tracking-wide whitespace-nowrap no-underline transition-all duration-200"
                    style={{
                        borderColor: "rgba(255,255,255,0.28)",
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.80)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)";
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.80)";
                        e.currentTarget.style.transform = "";
                    }}
                >
                    {secondaryText}
                </a>
            )}
        </div>
    );
}

export default HeroButtons;
