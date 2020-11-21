// we previously had everything in the routes files but routes should only handle methods. controllers should handle functionality. \
import asyncHandler from 'express-async-handler' // library for error handling for express async methods
import Product from '../models/productModel.js'

//@desc fetch all products
//@route GET /api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}) // remember that all mongoose methods return a promise so use async/await
  res.json(products)
})

//@desc fetch single product
//@route GET /api/products/:id
//@access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  // req.params.id gets its value from the url

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById }
