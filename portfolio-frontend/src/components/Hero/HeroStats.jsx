/**
 * HeroStats
 *
 * Dedicated stats grid — separated from HeroContent so the
 * headline section remains focused and uncluttered.
 * Displays metrics in clean modern cards with subtle separators.
 *
 * Props
 *   stats  — [{ value, suffix, label }]  filtered (no nulls)
 */
function HeroStats({ stats }) {
    if (!stats || stats.length === 0) return null;

    return (
        <div className="w-full" aria-label="Company statistics">
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-8 lg:gap-x-12">
                {stats.map((stat, i) => (
                    <div key={stat.label} className="relative">
                        {/* Vertical divider between columns */}
                        {i > 0 && (
                            <div
                                className="absolute -left-3 sm:-left-4 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-white-10 sm:block"
                                aria-hidden="true"
                            />
                        )}
                        <div className="flex flex-col items-start gap-0.5">
                            <span
                                className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-semibold leading-none tracking-tight text-white"
                                aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
                            >
                                {stat.value}
                                <em
                                    className="not-italic text-brand-gold"
                                    aria-hidden="true"
                                >
                                    {stat.suffix}
                                </em>
                            </span>
                            <span
                                className="text-[clamp(0.625rem,1.5vw,0.8125rem)] font-normal uppercase tracking-[0.08em] text-white-60"
                                aria-hidden="true"
                            >
                                {stat.label}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HeroStats;
