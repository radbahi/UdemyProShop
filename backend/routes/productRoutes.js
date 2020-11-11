import express from 'express'
import asyncHandler from 'express-async-handler' // library for error handling for express async methods

const router = express.Router()

import Product from '../models/productModel.js'

//@desc fetch all products
//@route GET /api/products
//@access public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({}) // remember that all mongoose methods return a promise so use async/await
    res.json(products)
    // products isn't actually a json file but res.json converts it to be json
  })
)

//@desc fetch single product
//@route GET /api/products/:id
//@access public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    // req.params.id gets its value from the url

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  })
)

export default router
