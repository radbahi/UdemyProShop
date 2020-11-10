import mongoose from 'mongoose'
// mongoose is used for mongodb object modeling for node.js

const connectDB = async () => {
  // we're using async here cuz dealing with mongoose methods always returns a promise
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    // this object with these parameters are passed in as a second argument otherwise we get errors
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
