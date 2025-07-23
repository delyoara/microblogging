import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

// Fonction utilitaire pour formater un post pour le frontend (cartes et détails)
const formatPostForFrontend = (post) => {
    if (!post) return null;
    const authorName = post.user ? `${post.user.prenom} ${post.user.nom}` : "Anonymous";
    const categoryName = post.category ? post.category.name : "Unknown";
    const themeName = post.theme ? post.theme.name : "Unknown";

    return {
        slug: post.slug,
        imageUrl: post.imageUrl,
        altText: post.altText,
        categoryName: categoryName, // Changed to categoryName for frontend consistency
        title: post.title,
        description: post.description,
        authorName: authorName,
        content: post.content,
        id: post.id,
        theme: themeName,
    };
};

// ===============================================
// ROUTES POUR LES ARTICLES (POSTS)
// ===============================================

// 1. Récupérer les "Top News" (MOST SPECIFIC PATH - no path parameter)
router.get('/top-posts', async (req, res) => {
    const { theme } = req.query;
    console.log("Backend: GET /api/posts/top-posts - Received theme query:", theme); // Debug log

    try {
        const whereClause = theme ? { theme: { name: theme } } : {};

        const topPosts = await prisma.post.findMany({
            where: whereClause,
            select: {
                slug: true,
                imageUrl: true,
                altText: true,
                title: true,
                description: true,
                createdAt: true,
                user: { select: { prenom: true, nom: true } },
                theme: { select: { name: true } },
                category: { select: { name: true } },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 3,
        });

        const formattedTopPosts = topPosts.map(post => ({
            slug: post.slug,
            imageUrl: post.imageUrl,
            altText: post.altText,
            title: post.title,
            description: post.description,
            categoryName: post.category?.name || 'Unknown', // Use categoryName here
            authorName: post.user ? `${post.user.prenom} ${post.user.nom}` : 'Anonymous',
            theme: post.theme?.name || 'Unknown',
        }));

        res.json(formattedTopPosts);
    } catch (error) {
        console.error("Erreur lors de la récupération des top posts:", error);
        res.status(500).json({ error: 'Erreur lors de la récupération des top posts.' });
    }
});

// 2. Récupérer TOUS les posts (OR filtered by query parameters like 'theme')
// This route will handle /api/posts AND /api/posts?theme=Culture
// IT MUST COME *BEFORE* /:SLUG because it's a more specific *path match* (exact root)
router.get("/", async (req, res) => {
    const { theme } = req.query;
    console.log("Backend: GET /api/posts - Received theme query:", theme); // Debug log
    try {
        const whereClause = theme ? { theme: { name: theme } } : {};
        console.log("Backend: GET /api/posts - Applying whereClause:", whereClause); // Debug log

        const posts = await prisma.post.findMany({
            where: whereClause,
            select: {
                id: true,
                slug: true,
                imageUrl: true,
                altText: true,
                title: true,
                description: true,
                createdAt: true,
                user: { select: { prenom: true, nom: true } },
                theme: { select: { name: true } },
                category: { select: { name: true } },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const formattedPosts = posts.map((post) => formatPostForFrontend(post));
        res.json(formattedPosts);
    } catch (error) {
        console.error("Erreur lors de la récupération des posts:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des posts." });
    }
});

// 3. Récupérer un post par son SLUG (PATH PARAMETER - most general in path structure)
// This route will handle /api/posts/:slug (e.g., /api/posts/mon-super-article)
// IT MUST COME *AFTER* THE GENERAL "/" ROUTE
router.get("/:slug", async (req, res) => {
    const { slug } = req.params;
    console.log("Backend: GET /api/posts/:slug - Received slug:", slug); // Debug log
    try {
        const post = await prisma.post.findUnique({
            where: { slug: slug },
            include: {
                user: { select: { prenom: true, nom: true } },
                theme: { select: { name: true } },
                category: { select: { name: true } },
                comments: {
                    include: { user: { select: { username: true } } },
                    orderBy: { createdAt: "asc" },
                },
                likes: {
                    select: { userId: true },
                },
            },
        });

        if (!post) {
            return res.status(404).json({ error: "Post non trouvé." });
        }

        const formattedPost = formatPostForFrontend(post);
        res.json(formattedPost);
    } catch (error) {
        console.error(
            `Erreur lors de la récupération du post avec slug ${req.params.slug}:`,
            error
        );
        res.status(500).json({ error: "Erreur lors de la récupération du post." });
    }
});

// Routes POST, PUT, DELETE (these are fine as they are different HTTP methods)
router.post("/", (req, res) => res.status(501).json({ message: "Post creation not implemented." }));
router.put("/:id", (req, res) => res.status(501).json({ message: "Post update not implemented." }));
router.delete("/:id", (req, res) => res.status(501).json({ message: "Post deletion not implemented." }));

export default router;