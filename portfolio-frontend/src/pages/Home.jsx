import { useState, useEffect } from "react";
import { fetchHero } from "../services/publicApi.js";

/**
 * Home — temporary diagnostic page.
 *
 * Purpose : verify that the portfolio frontend can consume all Hero data
 *           from the backend Public API.
 *
 * NOT a production UI — no styling, no animations, no design system.
 * Replace this component once Hero data is confirmed working.
 */
function Home() {
    const [hero, setHero]       = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    useEffect(() => {
        const loadHero = async () => {
            try {
                setLoading(true);
                setError(null);

                const heroData = await fetchHero();

                // ── Debug: log the complete response ──────────────────────────
                console.group("[Home] Hero API response");
                console.log("Hero object :", heroData);
                console.log("backgroundImage :", heroData?.backgroundImage);
                console.log("title           :", heroData?.title);
                console.log("subtitle        :", heroData?.subtitle);
                console.log("description     :", heroData?.description);
                console.log("primaryCTA      :", {
                    text: heroData?.ourServicesButtonText,
                    link: heroData?.ourServicesButtonLink,
                });
                console.log("secondaryCTA    :", {
                    text: heroData?.viewProjectsButtonText,
                    link: heroData?.viewProjectsButtonLink,
                });
                console.log("stats           :", {
                    projectsCompleted: heroData?.projectsCompleted,
                    happyClients:      heroData?.happyClients,
                    yearsExperience:   heroData?.yearsExperience,
                    clientSatisfaction: heroData?.clientSatisfaction,
                });
                console.groupEnd();

                setHero(heroData);
            } catch (err) {
                console.error("[Home] Failed to fetch Hero data:", err);
                setError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Unknown error — check that the backend is running."
                );
            } finally {
                setLoading(false);
            }
        };

        loadHero();
    }, []);

    // ── Loading state ──────────────────────────────────────────────────────
    if (loading) {
        return (
            <div id="home-loading">
                <p>Loading Hero data from backend…</p>
            </div>
        );
    }

    // ── Error state ────────────────────────────────────────────────────────
    if (error) {
        return (
            <div id="home-error">
                <h2>Could not load Hero data</h2>
                <p>{error}</p>
                <p>
                    Make sure the backend is running at{" "}
                    <code>{import.meta.env.VITE_API_URL}</code> and that the
                    database contains a Hero document.
                </p>
            </div>
        );
    }

    // ── No hero in DB yet ─────────────────────────────────────────────────
    if (!hero) {
        return (
            <div id="home-empty">
                <p>No Hero data found. Create one in the Admin CMS.</p>
            </div>
        );
    }

    // ── Success state — raw data dump ──────────────────────────────────────
    return (
        <div id="home-debug">
            <h1>Hero Data — Debug View</h1>
            <p>
                <strong>API:</strong>{" "}
                <code>{import.meta.env.VITE_API_URL}/api/public/home</code>
            </p>

            {/* Background image — rendered to verify Cloudinary URL loads */}
            <section id="hero-background-image">
                <h2>Background Image</h2>
                <p>
                    <strong>URL:</strong> <code>{hero.backgroundImage}</code>
                </p>
                <img
                    src={hero.backgroundImage}
                    alt="Hero background"
                    id="hero-bg-img"
                    onLoad={() =>
                        console.log("[Home] Background image loaded successfully ✓")
                    }
                    onError={() =>
                        console.error(
                            "[Home] Background image FAILED to load:",
                            hero.backgroundImage
                        )
                    }
                />
            </section>

            {/* Text fields */}
            <section id="hero-text-fields">
                <h2>Text Fields</h2>

                <p><strong>Title:</strong> {hero.title}</p>
                <p><strong>Subtitle:</strong> {hero.subtitle}</p>
                <p><strong>Description:</strong> {hero.description}</p>
            </section>

            {/* CTA buttons */}
            <section id="hero-cta-buttons">
                <h2>CTA Buttons</h2>

                <p>
                    <strong>Primary button text:</strong>{" "}
                    {hero.ourServicesButtonText}
                </p>
                <p>
                    <strong>Primary button link:</strong>{" "}
                    <code>{hero.ourServicesButtonLink}</code>
                </p>

                <p>
                    <strong>Secondary button text:</strong>{" "}
                    {hero.viewProjectsButtonText}
                </p>
                <p>
                    <strong>Secondary button link:</strong>{" "}
                    <code>{hero.viewProjectsButtonLink}</code>
                </p>
            </section>

            {/* Stats */}
            <section id="hero-stats">
                <h2>Stats</h2>

                <p>
                    <strong>Projects Completed:</strong>{" "}
                    {hero.projectsCompleted}
                </p>
                <p>
                    <strong>Happy Clients:</strong> {hero.happyClients}
                </p>
                <p>
                    <strong>Years Experience:</strong> {hero.yearsExperience}
                </p>
                <p>
                    <strong>Client Satisfaction:</strong>{" "}
                    {hero.clientSatisfaction}%
                </p>
            </section>

            {/* Raw JSON — full object */}
            <section id="hero-raw-json">
                <h2>Raw API Response</h2>
                <pre>{JSON.stringify(hero, null, 2)}</pre>
            </section>
        </div>
    );
}

export default Home;
