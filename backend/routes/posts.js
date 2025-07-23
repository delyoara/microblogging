import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

const formatPostForFrontend = (post) => {
  if (!post) return null;
  const authorName = post.user ? `${post.user.prenom} ${post.user.nom}` : "Anonymous";
  const categoryName = post.category ? post.category.name : "Unknown";
  const themeName = post.theme ? post.theme.name : "Unknown";

  return {
    slug: post.slug,
    imageUrl: post.imageUrl,
    altText: post.altText,
    categoryName,
    title: post.title,
    description: post.description,
    authorName,
    content: post.content,
    id: post.id,
    theme: themeName,
  };
};

// GET /api/posts/top-posts
router.get('/top-posts', async (req, res) => {
  const { theme } = req.query;

  try {
const whereClause = theme ? { theme: { name: { equals: theme } } } : {};

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
      orderBy: { createdAt: 'desc' },
      take: 3,
    });

    const formattedTopPosts = topPosts.map(post => ({
      slug: post.slug,
      imageUrl: post.imageUrl,
      altText: post.altText,
      title: post.title,
      description: post.description,
      categoryName: post.category?.name || 'Unknown',
      authorName: post.user ? `${post.user.prenom} ${post.user.nom}` : 'Anonymous',
      theme: post.theme?.name || 'Unknown',
    }));

    res.json(formattedTopPosts);
  } catch (error) {
    console.error("Erreur lors de la récupération des top posts:", error);
    res.status(500).json({ error: 'Erreur lors de la récupération des top posts.' });
  }
});

// GET /api/posts?theme=Culture
router.get("/", async (req, res) => {
  const { theme } = req.query;

  try {
    const whereClause = theme ? { theme: { name: { equals: theme } } } : {};

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
      orderBy: { createdAt: "desc" },
    });

    const formattedPosts = posts.map(formatPostForFrontend);
    res.json(formattedPosts);
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des posts." });
  }
});

// GET /api/posts/:slug
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        user: { select: { prenom: true, nom: true } },
        theme: { select: { name: true } },
        category: { select: { name: true } },
        comments: {
          include: { user: { select: { username: true } } },
          orderBy: { createdAt: "asc" },
        },
        likes: { select: { userId: true } },
      },
    });

    if (!post) return res.status(404).json({ error: "Post non trouvé." });

    res.json(formatPostForFrontend(post));
  } catch (error) {
    console.error(`Erreur lors de la récupération du post avec slug ${slug}:`, error);
    res.status(500).json({ error: "Erreur lors de la récupération du post." });
  }
});

// POST /api/posts
router.post("/", async (req, res) => {
  const { userId, themeId, categoryName, title, description, imageUrl, altText, slug, content } = req.body;

  // Validation simple (tu peux améliorer)
  // a changer quand Petronela mets l'user pour que cahque post soit propore a chaque user!!!! METRE !userId,
  if ( !themeId || !categoryName || !title || !description || !slug || !content) {
    return res.status(400).json({ error: "Champs obligatoires manquants." });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        userId: userId || null, // autoriser NULL
        themeId,
        categoryName,
        title,
        description,
        imageUrl: imageUrl || "", // facultatif
        altText: altText || "", // facultatif
        slug,
        content,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Erreur lors de la création du post:", error);
    res.status(400).json({ error: "Erreur lors de la création du post." });
  }
});

// PUT /api/posts/:id
router.put("/:id", async (req, res) => {
  const postId = parseInt(req.params.id);
  const { themeId, categoryId, title, description, imageUrl, altText, slug, content } = req.body;

  if (!themeId || !categoryId || !title || !description || !slug || !content) {
    return res.status(400).json({ error: "Champs obligatoires manquants." });
  }

  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        themeId,
        categoryId,
        title,
        description,
        imageUrl: imageUrl || "",
        altText: altText || "",
        slug,
        content,
      },
    });
    res.json(updatedPost);
  } catch (error) {
    console.error("Erreur lors de la modification du post:", error);
    res.status(400).json({ error: "Erreur lors de la modification du post." });
  }
});

// DELETE /api/posts/:id
router.delete("/:id", async (req, res) => {
  const postId = parseInt(req.params.id);

  try {
    await prisma.post.delete({ where: { id: postId } });
    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression du post:", error);
    res.status(400).json({ error: "Erreur lors de la suppression du post." });
  }
});

export default router;
