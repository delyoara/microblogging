import express from 'express';
import prisma from '../lib/prisma.js'

const router = express.Router();

// Récupérer tous les posts
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        theme: true,
        comments: true,
        likes: true,
      }
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des posts' });
  }
});

// Récupérer un post par son ID
router.get('/:id', async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
        theme: true,
        comments: true,
        likes: true,
      }
    });

    if (!post) return res.status(404).json({ error: 'Post non trouvé' });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du post' });
  }
});

// Créer un nouveau post
router.post('/', async (req, res) => {
  const { userId, content, themeId } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: {
        userId,
        content,
        themeId,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création du post' });
  }
});

// Modifier un post existant
router.put('/:id', async (req, res) => {
  const postId = parseInt(req.params.id);
  const { content, themeId } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        content,
        themeId,
      },
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la modification du post' });
  }
});

// Supprimer un post
router.delete('/:id', async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    await prisma.post.delete({ where: { id: postId } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la suppression du post' });
  }
});

export default router;