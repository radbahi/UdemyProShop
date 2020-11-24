import express from 'express'
import { authUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/login', authUser) // /login is hooked to /api/users
router.route('/profile').get(protect, getUserProfile) //.route method used for doing more than one verb?

export default router
