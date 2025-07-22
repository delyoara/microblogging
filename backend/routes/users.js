import express from 'express';
import prisma from '../lib/prisma.js';
const router = express.Router();

// Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { posts: true, comments: true }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

// Récupérer un utilisateur par ID
router.get('/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { posts: true, comments: true }
    });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Créer un utilisateur
router.post('/', async (req, res) => {
  const { username, email, passwordHash, role } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        role: role || 'USER' // valeur par défaut
      }
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la création de l’utilisateur' });
  }
});

// Modifier un utilisateur
router.put('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  const { username, email, role } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        email,
        role,
      }
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la modification' });
  }
});

// Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la suppression' });
  }
});

export default router;
