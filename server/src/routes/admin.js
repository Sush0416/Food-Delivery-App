import express from 'express'
import Restaurant from '../models/Restaurant.js'
import User from '../models/User.js'
import Order from '../models/Order.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// All routes are protected and only for admin
router.use(protect)
router.use(authorize('admin'))

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalRestaurants = await Restaurant.countDocuments()
    const totalOrders = await Order.countDocuments()
    
    const totalRevenueResult = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ])
    const totalRevenue = totalRevenueResult[0]?.total || 0

    const pendingRestaurants = await Restaurant.countDocuments({ isApproved: false })

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalRestaurants,
        totalOrders,
        totalRevenue,
        pendingRestaurants
      }
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching stats',
      error: error.message
    })
  }
})

// Get pending restaurants
router.get('/restaurants/pending', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ isApproved: false })
      .populate('createdBy', 'name email')

    res.json({
      success: true,
      restaurants
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching pending restaurants',
      error: error.message
    })
  }
})

// Approve a restaurant
router.put('/restaurants/:id/approve', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    )

    if (!restaurant) {
      return res.status(404).json({
        message: 'Restaurant not found'
      })
    }

    res.json({
      success: true,
      restaurant
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error approving restaurant',
      error: error.message
    })
  }
})

// Get all orders (for admin)
router.get('/orders', async (req, res) => {
  try {
    const { limit = 10 } = req.query
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('restaurantId', 'name')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))

    res.json({
      success: true,
      orders
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching orders',
      error: error.message
    })
  }
})

export default router