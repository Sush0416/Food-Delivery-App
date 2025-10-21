import express from 'express'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.json({
      success: true,
      user
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching user profile',
      error: error.message
    })
  }
})

// Update user profile
router.put('/profile', protect, async (req, res) => {
  try {
    const allowedUpdates = ['name', 'phone', 'address', 'avatar']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
      return res.status(400).json({
        message: 'Invalid updates'
      })
    }

    updates.forEach(update => {
      req.user[update] = req.body[update]
    })

    await req.user.save()

    res.json({
      success: true,
      user: req.user
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error updating profile',
      error: error.message
    })
  }
})

// Get all users (admin only)
router.get('/', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized'
      })
    }

    const users = await User.find().select('-password').sort({ createdAt: -1 })
    
    res.json({
      success: true,
      users
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching users',
      error: error.message
    })
  }
})

export default router