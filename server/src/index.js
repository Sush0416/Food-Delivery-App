import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

// Routes
import authRoutes from './routes/auth.js'
import restaurantRoutes from './routes/restaurants.js'
import menuRoutes from './routes/menu.js'
import orderRoutes from './routes/orders.js'
import userRoutes from './routes/users.js'
import paymentRoutes from './routes/payment.js'
import adminRoutes from './routes/admin.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/admin', adminRoutes)

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  })
})

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/delish'

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})