import express from 'express'
import { authUser } from '../controllers/userController.js'
const router = express.Router()

router.post('/login', authUser) // /login is hooked to /api/users

export default router
