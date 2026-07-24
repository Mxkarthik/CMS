import api from "./api.js";

/**
 * Fetch the full home/landing-page dataset from the Public API.
 *
 * Endpoint : GET /api/public/home
 *
 * Response shape:
 * {
 *   success: true,
 *   data: {
 *     hero: {
 *       _id,
 *       subtitle,
 *       title,
 *       description,
 *       ourServicesButtonText,
 *       ourServicesButtonLink,
 *       viewProjectsButtonText,
 *       viewProjectsButtonLink,
 *       projectsCompleted,
 *       happyClients,
 *       yearsExperience,
 *       clientSatisfaction,
 *       backgroundImage,   // Cloudinary URL
 *       createdAt,
 *       updatedAt,
 *     },
 *     services:         [...],
 *     featuredProjects: [...],
 *   },
 * }
 */
export const fetchHomeData = async () => {
    const response = await api.get("/home");
    return response.data; // { success, data: { hero, services, featuredProjects } }
};

/**
 * Convenience helper — returns only the Hero object.
 */
export const fetchHero = async () => {
    const { data } = await fetchHomeData();
    return data.hero; // may be null if no hero has been saved yet
};
