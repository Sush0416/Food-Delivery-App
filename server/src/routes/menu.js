import express from 'express'
import MenuItem from '../models/MenuItem.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// Get menu items for a restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ 
      restaurantId: req.params.restaurantId,
      isAvailable: true 
    }).sort({ category: 1, name: 1 })

    res.json({
      success: true,
      menuItems
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching menu items',
      error: error.message
    })
  }
})

// Get single menu item
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id)

    if (!menuItem) {
      return res.status(404).json({
        message: 'Menu item not found'
      })
    }

    res.json({
      success: true,
      menuItem
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching menu item',
      error: error.message
    })
  }
})

// Create menu item (restaurant owners and admin only)
router.post('/', protect, authorize('restaurant', 'admin'), async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body)

    res.status(201).json({
      success: true,
      menuItem
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error creating menu item',
      error: error.message
    })
  }
})

// Update menu item
router.put('/:id', protect, authorize('restaurant', 'admin'), async (req, res) => {
  try {
    let menuItem = await MenuItem.findById(req.params.id)

    if (!menuItem) {
      return res.status(404).json({
        message: 'Menu item not found'
      })
    }

    // Verify the user owns the restaurant or is admin
    const restaurant = await Restaurant.findById(menuItem.restaurantId)
    if (restaurant.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to update this menu item'
      })
    }

    menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    res.json({
      success: true,
      menuItem
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error updating menu item',
      error: error.message
    })
  }
})

// Delete menu item
router.delete('/:id', protect, authorize('restaurant', 'admin'), async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id)

    if (!menuItem) {
      return res.status(404).json({
        message: 'Menu item not found'
      })
    }

    // Verify the user owns the restaurant or is admin
    const restaurant = await Restaurant.findById(menuItem.restaurantId)
    if (restaurant.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to delete this menu item'
      })
    }

    await MenuItem.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: 'Menu item deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting menu item',
      error: error.message
    })
  }
})

export default router