import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'viedevie';

export const signup = async (req, res) => {
  const { username, email, password, prenom, nom } = req.body;

  if (!username || !email || !password  || !prenom || !nom)
    return res.status(400).json({ error: "Champs requis manquants." });

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(409).json({ error: "Email déjà utilisé." });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        prenom,
        nom,
      },
    });

    res.status(201).json({ message: "Inscription réussie !" });
  } catch (error) {
  console.error('Signup error:', error);
  res.status(500).json({ error: "Erreur serveur" });
}
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "Utilisateur introuvable" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
