import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'

const router = express.Router()

router.post('/login', authUser) // /login is hooked to /api/users

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile) //.route method used for doing more than one verb

router.route('/').post(registerUser).get(protect, admin, getUsers)

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
