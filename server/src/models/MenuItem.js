import mongoose from 'mongoose'

const menuItemSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  isVegetarian: {
    type: Boolean,
    default: false
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  isGlutenFree: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  ingredients: [{
    type: String
  }],
  allergens: [{
    type: String
  }],
  preparationTime: {
    type: Number, // in minutes
    default: 15
  },
  spiceLevel: {
    type: String,
    enum: ['mild', 'medium', 'hot', 'very hot'],
    default: 'mild'
  },
  calories: {
    type: Number,
    min: 0
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
})

// Index for better query performance
menuItemSchema.index({ restaurantId: 1, category: 1 })
menuItemSchema.index({ isAvailable: 1 })

export default mongoose.model('MenuItem', menuItemSchema)