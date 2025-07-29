import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import postsRoutes from './routes/posts.js';
import usersRoutes from './routes/users.js';
import commentRoutes from './routes/comments.js';
import themeRoutes from './routes/themes.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';



const app = express();
const port = 3001;

// Middleware : JSON + Cookie parsing
app.use(express.json());
app.use(cookieParser());

// CORS : autoriser frontend + cookies
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
}));

// Routes API
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);



// Route racine
app.get('/', (req, res) => {
  res.send('🌈 La vie est belle!');
});

// Démarrage serveur
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur : http://localhost:${port}`);
});
