import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();
import { upload, uploadToCloudinary } from '../middleware/upload.js';


const formatPostForFrontend = (post) => {
  if (!post) return null;
  const authorName = post.user
    ? `${post.user.prenom} ${post.user.nom}`
    : "Anonymous";
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
router.get("/top-posts", async (req, res) => {
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
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    const formattedTopPosts = topPosts.map((post) => ({
      slug: post.slug,
      imageUrl: post.imageUrl,
      altText: post.altText,
      title: post.title,
      description: post.description,
      categoryName: post.category?.name || "Unknown",
      authorName: post.user
        ? `${post.user.prenom} ${post.user.nom}`
        : "Anonymous",
      theme: post.theme?.name || "Unknown",
    }));

    res.json(formattedTopPosts);
  } catch (error) {
    console.error("Erreur lors de la récupération des top posts:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des top posts." });
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
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des posts." });
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
    console.error(
      `Erreur lors de la récupération du post avec slug ${slug}:`,
      error
    );
    res.status(500).json({ error: "Erreur lors de la récupération du post." });
  }
});

// POST /api/posts - VERSIÓN CON UPLOAD DE IMÁGENES
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

    // Validation des champs obligatoires
    if (!themeId || !categoryName || !title || !content) {
      return res.status(400).json({ error: "Champs obligatoires manquants." });
    }

    // Convertir themeId en entier si nécessaire
    const themeIdInt = parseInt(themeId);
    if (isNaN(themeIdInt)) {
      return res.status(400).json({ error: "themeId doit être un nombre valide." });
    }

    // Generar slug si no se proporciona
    const postSlug = slug || title.toLowerCase().replace(/\s+/g, '-');

    // Manejo de imagen - Upload a Cloudinary si existe
    let imageUrl = "";
    if (req.file) {
      const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = cloudinaryResult.secure_url;
    }

    // 1. Vérifier que le thème existe
    const themeExists = await prisma.theme.findUnique({
      where: { id: themeIdInt }
    });

    if (!themeExists) {
      return res.status(400).json({ error: "Le thème sélectionné n'existe pas." });
    }

    // 2. Chercher ou créer la catégorie
    let category = await prisma.category.findUnique({
      where: {
        name_themeId: {
          name: categoryName,
          themeId: themeIdInt,
        },
      },
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: categoryName,
          themeId: themeIdInt,
        },
      });
    }

    // 3. Créer le post avec la relation correcte vers la catégorie
    const newPost = await prisma.post.create({
      data: {
        userId: userId || null,
        themeId: themeIdInt,
        categoryId: category.id,
        title,
        description: description || title.slice(0, 150),
        imageUrl, // URL de Cloudinary o vacía
        altText: altText || "",
        slug: postSlug,
        content,
      },
      // Inclure les relations pour la réponse
      include: {
        user: { select: { prenom: true, nom: true } },
        theme: { select: { name: true } },
        category: { select: { name: true } },
      }
    });

    res.status(201).json(formatPostForFrontend(newPost));
  } catch (error) {
    console.error("Erreur détaillée lors de la création du post:", error);
    
    if (error.code === "P2002") {
      // Unique constraint violation (slug déjà existant)
      return res.status(409).json({ 
        error: "Un article avec ce slug existe déjà. Veuillez modifier le titre." 
      });
    }
    
    if (error.code === "P2003") {
      // Foreign key constraint failed
      return res.status(400).json({
        error: "Le thème ou la catégorie sélectionné(e) n'existe pas.",
      });
    }

    // Erreur générique
    res.status(500).json({
      error: "Erreur interne du serveur lors de la création du post.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// PUT /api/posts/:id - VERSIÓN CON UPLOAD DE IMÁGENES
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
    
    // Manejo de imagen - Upload a Cloudinary si existe nueva imagen
    let imageUrl = req.body.imageUrl || ""; // Mantener URL existente por defecto
    if (req.file) {
      const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = cloudinaryResult.secure_url;
    }
    
    // Chercher ou créer la catégorie
    let category = await prisma.category.findUnique({
      where: {
        name_themeId: {
          name: categoryName,
          themeId: themeIdInt,
        },
      },
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: categoryName,
          themeId: themeIdInt,
        },
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
      }
    });
    
    res.json(formatPostForFrontend(updatedPost));
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