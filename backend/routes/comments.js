import express from 'express';
import {
  getAllComments,
  getCommentById,
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';

const router = express.Router();

router.get('/', getAllComments);
router.get('/:id', getCommentById);
router.get('/post/:postId', getCommentsByPost); // ex: /api/comments/post/3
router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;