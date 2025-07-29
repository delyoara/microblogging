import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();
import { upload, uploadToCloudinary } from '../middleware/upload.js';
import { PostStatus } from "@prisma/client"; 
import { toggleLike } from '../controllers/likeController.js'; 



const router = express.Router();

const formatPostForFrontend = (post) => {
  if (!post) return null;
  return {
    slug: post.slug,
    imageUrl: post.imageUrl,
    altText: post.altText,
    categoryName: post.category?.name || "Unknown",
    title: post.title,
    description: post.description,
    authorName: post.user
      ? `${post.user.prenom} ${post.user.nom}`
      : "Anonymous",
    content: post.content,
    id: post.id,
    theme: post.theme?.name || "Unknown",
  };
};

// GET /api/posts/top-posts
router.get("/top-posts", async (req, res) => {
  const { theme } = req.query;

  try {
    const whereClause = {
status: PostStatus.approved,      ...(theme ? { theme: { name: { equals: theme } } } : {})
    };

    const topPosts = await prisma.post.findMany({
      where: whereClause,
      select: {
        slug: true,
        imageUrl: true,
        altText: true,
        title: true,
        description: true,
        user: { select: { prenom: true, nom: true } },
        theme: { select: { name: true } },
        category: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    const formattedTopPosts = topPosts.map(formatPostForFrontend);
    res.json(formattedTopPosts);
  } catch (error) {
    console.error("Erreur top-posts:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des top posts." });
  }
});

// GET /api/posts?theme=...
router.get("/", async (req, res) => {
  const { theme } = req.query;
  console.log("ON REGARDE", theme);

  try {
    const whereClause = {
status: PostStatus.approved,
      ...(theme ? { theme: { name: { equals: theme } } } : {})
    };

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
    console.error("Erreur récupération posts:", error);
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

    if (!post || post.status !== 'approved') {
      return res.status(404).json({ error: "Post non trouvé ou non approuvé." });
    }

    res.json(formatPostForFrontend(post));
  } catch (error) {
    console.error(`Erreur récupération post ${slug}:`, error);
    res.status(500).json({ error: "Erreur lors de la récupération du post." });
  }
});

// POST /api/posts
router.post("/", upload.single('image'), async (req, res) => {
  try {
    const {
      userId,
      themeId,
      categoryName,
      title,
      description,
      altText,
      slug,
      content,
    } = req.body;

    if (!themeId || !categoryName || !title || !content) {
      return res.status(400).json({ error: "Champs obligatoires manquants." });
    }

    const themeIdInt = parseInt(themeId);
    if (isNaN(themeIdInt)) {
      return res.status(400).json({ error: "themeId doit être un nombre valide." });
    }

    const postSlug = slug || title.toLowerCase().replace(/\s+/g, '-');

    let imageUrl = req.body.imageUrl || "";
    if (req.file) {
      const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = cloudinaryResult.secure_url;
    }

    const themeExists = await prisma.theme.findUnique({ where: { id: themeIdInt } });
    if (!themeExists) {
      return res.status(400).json({ error: "Thème inexistant." });
    }

    let category = await prisma.category.findUnique({
      where: { name_themeId: { name: categoryName, themeId: themeIdInt } },
    });

    if (!category) {
      category = await prisma.category.create({
        data: { name: categoryName, themeId: themeIdInt },
      });
    }

    const newPost = await prisma.post.create({
      data: {
        userId: userId || null,
        themeId: themeIdInt,
        categoryId: category.id,
        title,
        description: description || title.slice(0, 150),
        imageUrl,
        altText: altText || "",
        slug: postSlug,
        content,
        status: 'pending',
      },
      include: {
        user: { select: { prenom: true, nom: true } },
        theme: { select: { name: true } },
        category: { select: { name: true } },
      },
    });

    res.status(201).json(formatPostForFrontend(newPost));
  } catch (error) {
    console.error("Erreur création post:", error);

    if (error.code === "P2002") {
      return res.status(409).json({ error: "Slug déjà utilisé." });
    }

    if (error.code === "P2003") {
      return res.status(400).json({ error: "Thème ou catégorie invalide." });
    }

    res.status(500).json({ error: "Erreur serveur lors de la création." });
  }
});

// PUT /api/posts/:id
router.put("/:id", upload.single('image'), async (req, res) => {
  const postId = parseInt(req.params.id);
  const {
    themeId,
    categoryName,
    title,
    description,
    altText,
    slug,
    content,
  } = req.body;

  if (!themeId || !categoryName || !title || !description || !slug || !content) {
    return res.status(400).json({ error: "Champs obligatoires manquants." });
  }

  try {
    const themeIdInt = parseInt(themeId);

    let imageUrl = req.body.imageUrl || "";
    if (req.file) {
      const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = cloudinaryResult.secure_url;
    }

    let category = await prisma.category.findUnique({
      where: { name_themeId: { name: categoryName, themeId: themeIdInt } },
    });

    if (!category) {
      category = await prisma.category.create({
        data: { name: categoryName, themeId: themeIdInt },
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        themeId: themeIdInt,
        categoryId: category.id,
        title,
        description,
        imageUrl,
        altText: altText || "",
        slug,
        content,
      },
      include: {
        user: { select: { prenom: true, nom: true } },
        theme: { select: { name: true } },
        category: { select: { name: true } },
      },
    });

    res.json(formatPostForFrontend(updatedPost));
  } catch (error) {
    console.error("Erreur modification post:", error);
    res.status(400).json({ error: "Erreur lors de la modification." });
  }
});

// DELETE /api/posts/:id
router.delete("/:id", async (req, res) => {
  const postId = parseInt(req.params.id);

  try {
    await prisma.post.delete({ where: { id: postId } });
    res.status(204).send();
  } catch (error) {
    console.error("Erreur suppression post:", error);
    res.status(400).json({ error: "Erreur lors de la suppression." });
  }
});

// Add the route for liking/unliking a post
router.post("/:postId/like", toggleLike); 

export default router;
