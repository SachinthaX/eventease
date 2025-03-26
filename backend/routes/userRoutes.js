import express from 'express';
import {
  getUserProfile,
  updateProfile,
  updatePassword,
  getAllUsers,
  deleteUser,
  updateUserRole,
  createUserByAdmin,
  updateUserByAdmin,
  deleteOwnAccount
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Regular user routes
router.get('/profile', getUserProfile);
router.put('/profile', updateProfile);
router.put('/password', updatePassword);
router.delete('/profile', protect, deleteOwnAccount);

// Admin routes
router.get('/admin', adminOnly, getAllUsers);
router.delete('/admin/:id', adminOnly, deleteUser);
router.post('/admin', protect, adminOnly, createUserByAdmin);
router.put('/admin/:id/role', adminOnly, updateUserRole);
router.put('/admin/:id', protect, adminOnly, updateUserByAdmin);


export default router;
