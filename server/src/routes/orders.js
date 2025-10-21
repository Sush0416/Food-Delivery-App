import express from 'express'
import Order from '../models/Order.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Create new order
router.post('/', protect, async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      userId: req.user._id
    })

    res.status(201).json({
      success: true,
      order
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error creating order',
      error: error.message
    })
  }
})

// Get user's orders
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('restaurantId', 'name address')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: orders.length,
      orders
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching orders',
      error: error.message
    })
  }
})

// Get single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurantId', 'name address contact')
      .populate('userId', 'name email phone')

    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      })
    }

    // Check if user owns the order or is admin
    if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to view this order'
      })
    }

    res.json({
      success: true,
      order
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching order',
      error: error.message
    })
  }
})

export default router