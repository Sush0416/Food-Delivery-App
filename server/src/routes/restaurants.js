import express from 'express'
import Restaurant from '../models/Restaurant.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const { type, cuisine, city } = req.query
    let filter = { isActive: true }

    if (type === 'tiffin') {
      filter.cuisines = { $in: ['Home-style', 'Indian', 'Vegetarian'] }
    }

    if (cuisine) {
      filter.cuisines = { $in: [cuisine] }
    }

    if (city) {
      filter['address.city'] = city
    }

    const restaurants = await Restaurant.find(filter)
      .populate('createdBy', 'name email')
      .sort({ rating: -1 })

    res.json({
      success: true,
      count: restaurants.length,
      restaurants
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching restaurants',
      error: error.message
    })
  }
})

// Get single restaurant
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate('createdBy', 'name email')

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
      message: 'Error fetching restaurant',
      error: error.message
    })
  }
})

// Create restaurant (restaurant owners and admin only)
router.post('/', protect, authorize('restaurant', 'admin'), async (req, res) => {
  try {
    const restaurant = await Restaurant.create({
      ...req.body,
      createdBy: req.user._id
    })

    res.status(201).json({
      success: true,
      restaurant
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error creating restaurant',
      error: error.message
    })
  }
})

// Update restaurant
router.put('/:id', protect, authorize('restaurant', 'admin'), async (req, res) => {
  try {
    let restaurant = await Restaurant.findById(req.params.id)

    if (!restaurant) {
      return res.status(404).json({
        message: 'Restaurant not found'
      })
    }

    // Check if user owns the restaurant or is admin
    if (restaurant.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to update this restaurant'
      })
    }

    restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    res.json({
      success: true,
      restaurant
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error updating restaurant',
      error: error.message
    })
  }
})

export default router