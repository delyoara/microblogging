import prisma from '../lib/prisma.js';


//  GET /api/posts
export const getAllPosts = async (req, res) => {
  try {
    const {theme} = req.query;
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        category: true,
        comments: true,
        likes: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Erreur getAllPosts :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des posts' });
  }
};

//  GET /api/posts/:id
export const getPostById = async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
        category: true,
        comments: true,
        likes: true,
      },
    });
    if (!post) return res.status(404).json({ error: 'Post non trouvé' });
    res.status(200).json(post);
  } catch (error) {
    console.error('Erreur getPostById :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du post' });
  }
};

//  POST /api/posts
export const createPost = async (req, res) => {
  const { userId, content, categoryId } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: {
        userId,
        content,
        categoryId,
        status: 'pending',
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Erreur createPost :', error);
    res.status(400).json({ error: 'Erreur lors de la création du post' });
  }
};


//  PUT /api/posts/:id

export const updatePost = async (req, res) => {
  const postId = parseInt(req.params.id);
  const { content, categoryId } = req.body;
  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { content, categoryId },
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Erreur updatePost :', error);
    res.status(400).json({ error: 'Erreur lors de la modification du post' });
  }
};

//  DELETE /api/posts/:id
export const deletePost = async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    await prisma.post.delete({ where: { id: postId } });
    res.status(204).send();
  } catch (error) {
    console.error('Erreur deletePost :', error);
    res.status(400).json({ error: 'Erreur lors de la suppression du post' });
  }
};
