import express from 'express';
import {
  getUserProfile,
  updateProfile,
  updatePassword,
  getAllUsers,
  deleteUser,
  updateUserRole
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Regular user routes
router.get('/profile', getUserProfile);
router.put('/profile', updateProfile);
router.put('/password', updatePassword);

// Admin routes
router.get('/admin', adminOnly, getAllUsers);
router.delete('/admin/:id', adminOnly, deleteUser);
router.put('/admin/:id/role', adminOnly, updateUserRole);

export default router;
