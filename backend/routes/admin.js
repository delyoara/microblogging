
import express from 'express';
import { authenticateToken, verifyAdmin } from '../middleware/authMiddleware.js';
import { getAdminDashboard } from '../controllers/adminController.js'; // à créer si besoin

const router = express.Router();

//  route réservée à l’admin
router.get('/dashboard', authenticateToken, verifyAdmin, getAdminDashboard);

export default router;
