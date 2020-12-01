import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/login', authUser) // /login is hooked to /api/users
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile) //.route method used for doing more than one verb?
router.route('/').post(registerUser) // or maybe its to use imported functions?

export default router
