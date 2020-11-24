import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

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

userSchema.methods.matchPassword = async function (enteredPassword) {
  //await cuz it returns a promise
  return await bcrypt.compare(enteredPassword, this.password)
}

// .pre('save') means this is an action to do before any sort of save method
userSchema.pre('save', async function (next) {
  //incase the password doesn't get modified when updating a user, we do the if statement below so the password doesn't get hashed again. otherwise we cant login again
  if (!this.isModified('password')) {
    next()
  }
  // bcrypt.genSalt returns a promise which is why we use await
  const salt = await bcrypt.genSalt(10) // we salt the password for 10 rounds
  this.password = await bcrypt.hash(this.password, salt) //this.password is initially plaintext but we redefine it here to be hashed
})

const User = mongoose.model('User', userSchema)
// we then give mongoose a new model with the schema and then export it

export default User
