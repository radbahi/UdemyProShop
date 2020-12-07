// we previously had everything in the routes files but routes should only handle methods. controllers should handle functionality. \
import asyncHandler from 'express-async-handler' // library for error handling for express async methods
import Order from '../models/orderModel.js'

//@desc create new order
//@route POST /api/orders
//@access private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No Order items')
    return
  } else {
    const order = new Order({
      user: req.user._id,
      shippingAddress,
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

//@desc get order by id
//@route GET /api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export { addOrderItems, getOrderById }
