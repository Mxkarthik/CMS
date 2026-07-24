import { useState, useEffect } from "react";
import { fetchHero }           from "../services/publicApi.js";
import Hero                    from "../components/Hero/Hero.jsx";

/**
 * Home page
 *
 * Owns the data-fetching lifecycle for the Hero.
 * Passes the live CMS data down to the Hero component.
 * Does NOT fetch data in App.jsx.
 */
function Home() {
    const [hero,    setHero]    = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);

    useEffect(() => {
        let cancelled = false;

        const loadHero = async () => {
            try {
                setLoading(true);
                setError(null);

                const heroData = await fetchHero();

                // Keep full API response visible in DevTools for debugging
                console.group("[Home] Hero API response");
                console.log("Hero object       :", heroData);
                console.log("backgroundImage   :", heroData?.backgroundImage);
                console.log("title             :", heroData?.title);
                console.log("subtitle          :", heroData?.subtitle);
                console.log("description       :", heroData?.description);
                console.log("primaryCTA        :", {
                    text: heroData?.ourServicesButtonText,
                    link: heroData?.ourServicesButtonLink,
                });
                console.log("secondaryCTA      :", {
                    text: heroData?.viewProjectsButtonText,
                    link: heroData?.viewProjectsButtonLink,
                });
                console.log("stats             :", {
                    projectsCompleted:  heroData?.projectsCompleted,
                    happyClients:       heroData?.happyClients,
                    yearsExperience:    heroData?.yearsExperience,
                    clientSatisfaction: heroData?.clientSatisfaction,
                });
                console.groupEnd();

                if (!cancelled) setHero(heroData);
            } catch (err) {
                console.error("[Home] Failed to fetch Hero data:", err);
                if (!cancelled) {
                    setError(
                        err?.response?.data?.message ||
                        err?.message ||
                        "Unknown error — check that the backend is running."
                    );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        loadHero();
        return () => { cancelled = true; };
    }, []);

    /* ── Loading ──────────────────────────────────────────────── */
    if (loading) {
        return (
            <div
                id="home-loading"
                style={{
                    minHeight: "100svh",
                    display:   "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0a0a0e",
                    color:     "rgba(255,255,255,0.6)",
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize:  "0.875rem",
                    letterSpacing: "0.1em",
                }}
            >
                Loading…
            </div>
        );
    }

    /* ── Error ────────────────────────────────────────────────── */
    if (error) {
        return (
            <div
                id="home-error"
                style={{
                    minHeight:      "100svh",
                    display:        "flex",
                    flexDirection:  "column",
                    alignItems:     "center",
                    justifyContent: "center",
                    gap:            "0.75rem",
                    background:     "#0a0a0e",
                    color:          "rgba(255,255,255,0.7)",
                    fontFamily:     "'Inter', system-ui, sans-serif",
                    padding:        "2rem",
                    textAlign:      "center",
                }}
            >
                <p style={{ fontSize: "1.5rem", color: "#c9a96e" }}>⚠</p>
                <p style={{ fontWeight: 500, color: "#fff" }}>
                    Could not connect to the backend
                </p>
                <p style={{ fontSize: "0.875rem", maxWidth: "38ch" }}>{error}</p>
            </div>
        );
    }

    /* ── No data ──────────────────────────────────────────────── */
    if (!hero) {
        return (
            <div
                id="home-empty"
                style={{
                    minHeight:      "100svh",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    background:     "#0a0a0e",
                    color:          "rgba(255,255,255,0.5)",
                    fontFamily:     "'Inter', system-ui, sans-serif",
                    fontSize:       "0.875rem",
                }}
            >
                No Hero data found. Create one in the Admin CMS.
            </div>
        );
    }

    /* ── Success ──────────────────────────────────────────────── */
    return (
        <main id="home" aria-label="Portfolio home page">
            <Hero hero={hero} />
            {/* Future sections go here */}
        </main>
    );
}

export default Home;
