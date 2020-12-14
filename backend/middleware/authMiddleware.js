import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token // we don't include a value here to make it default to false for the if statement on line 19
  //token gets defined if there's an auth header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer') // WHY DO WE WANT BEARER IN THE TOKEN?? https://www.udemy.com/course/mern-ecommerce/learn/lecture/22494388#questions
  ) {
    try {
      token = req.headers.authorization.split(' ')[1] // token comes through as "Bearer token" so split the space into array and get token element
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password') //we don't want the password to be sent to define req.user
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized. Token failed.')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized. No token.')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
//this gets imported to userRoutes
