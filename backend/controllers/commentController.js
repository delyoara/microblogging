import prisma from '../lib/prisma.js';

// GET /api/comments
export const getAllComments = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            include: {
                user: true,
                post: true,
            },
            orderBy: {createdAt: 'desc'},
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des commentaires'});
    }
};

// GET /api/comments/:id 
export const getcommentById = async (req, res) => {
    try {
        const comment = await prisma.comment.findUnique({
            where: {id},
            include: {user: true, post: true},
        });
        if (!comment) return res.status(404).json({error: 'Commentaire non trouvé'});
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération des commentaires'});
    }
};

// GET /api/comments/:id
export const getCommentById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const comment = await prisma.comment.findUnique({
            where: {id},
            include: {user: true, post: true},
        });
        if (!comment) return res.status(404).json({error: 'Commentaire non trouvé'});
        res.json(comment);
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération'});
    }
};

// GET /api/posts/:postId/comments - Tous les commentaires d’un post
export const getCommentsByPost = async (req, res) => {
  const postId = parseInt(req.params.postId);
  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des commentaires du post' });
  }
};

// POST /api/comments - Créer un commentaire
export const createComment = async (req, res) => {
  const { userId, postId, content } = req.body;
  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        user: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création du commentaire' });
  }
};

// PUT /api/comments/:id - Modifier un commentaire
export const updateComment = async (req, res) => {
  const id = parseInt(req.params.id);
  const { content } = req.body;
  try {
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content },
    });
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour du commentaire' });
  }
};

// DELETE /api/comments/:id - Supprimer un commentaire
export const deleteComment = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.comment.delete({ where: { id } });
    res.json({ message: 'Commentaire supprimé' });
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la suppression du commentaire' });
  }
};