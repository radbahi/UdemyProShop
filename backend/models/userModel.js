import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
)
// we can use a second argument with mongoose and use timestamps which will update automatically

const User = mongoose.model('User', userSchema)
// we then give mongoose a new model with the schema and then export it

export default User
