// we previously had everything in the routes files but routes should only handle methods. controllers should handle functionality. \
import asyncHandler from 'express-async-handler' // library for error handling for express async methods
import User from '../models/userModel.js'

//@desc auth user and get token
//@route POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }) // find the user trying to log in

  // if user is true and the password is matched using the method in userModel.js, send the json else throw error
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

export { authUser }
