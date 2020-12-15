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

//@desc create a product
//@route DELETE /api/products/:id
//@access private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  // req.params.id gets its value from the url

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc create a product
//@route POST /api/products
//@access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample name',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//@desc update a product
//@route PUT /api/products/:id
//@access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
