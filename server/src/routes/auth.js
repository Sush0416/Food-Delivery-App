import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists with this email'
      })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'customer'
    })

    const token = signToken(user._id)

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error creating user',
      error: error.message
    })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password'
      })
    }

    // Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        message: 'Incorrect email or password'
      })
    }

    const token = signToken(user._id)

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error logging in',
      error: error.message
    })
  }
})

// Get current user
router.get('/me', protect, async (req, res) => {
  res.json({
    success: true,
    user: req.user
  })
})

export default router