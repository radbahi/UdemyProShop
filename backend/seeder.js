// this file is custom made to seed data. kind of like faker.
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'
import e from 'express'

dotenv.config()

connectDB()

const importData = async () => {
  // remember that we use async/await when working with mongodb because it returns a promise
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id // we use the first index of the createdUsers array because the first element is an admin

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser } // this makes the sampleProducts array bring in all of the products and add the admin as their ref'd user
    })

    await Product.insertMany(sampleProducts)

    console.log('Data imported!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1) // the 1 parameter makes it exit with failure
  }
}

const destroyData = async () => {
  // remember that we use async/await when working with mongodb because it returns a promise
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data destroyed!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1) // the 1 parameter makes it exit with failure
  }
}

// data:import and data:destroy scripts in package.json. just run 'npm run data:whatever'
// process.argv[2] checks any additional paramets of a script called in the terminal
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
