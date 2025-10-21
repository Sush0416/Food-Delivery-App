import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from '../models/User.js'
import Restaurant from '../models/Restaurant.js'
import MenuItem from '../models/MenuItem.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/delish'

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@delish.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Restaurant Owner',
    email: 'owner@delish.com',
    password: 'owner123',
    role: 'restaurant'
  },
  {
    name: 'John Customer',
    email: 'customer@delish.com',
    password: 'customer123',
    role: 'customer'
  }
]

const sampleRestaurants = [
  {
    name: 'Spice Garden',
    description: 'Authentic Indian cuisine with a modern twist',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001'
    },
    cuisines: ['Indian', 'Vegetarian', 'Halal'],
    deliveryTime: 30,
    minOrder: 15,
    contact: {
      phone: '+1-555-0123',
      email: 'info@spicegarden.com'
    },
    isApproved: true
  },
  {
    name: 'Pizza Palace',
    description: 'The best pizza in town with fresh ingredients',
    address: {
      street: '456 Oak Avenue',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10002'
    },
    cuisines: ['Italian', 'Pizza', 'Fast Food'],
    deliveryTime: 25,
    minOrder: 12,
    contact: {
      phone: '+1-555-0456',
      email: 'order@pizzapalace.com'
    },
    isApproved: true
  },
  {
    name: 'Green Leaf Tiffin',
    description: 'Healthy home-style meals delivered daily',
    address: {
      street: '789 Green Road',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10003'
    },
    cuisines: ['Home-style', 'Vegetarian', 'Healthy'],
    deliveryTime: 35,
    minOrder: 8,
    contact: {
      phone: '+1-555-0789',
      email: 'tiffin@greenleaf.com'
    },
    isApproved: true
  }
]

const sampleMenuItems = [
  // Spice Garden items
  {
    name: 'Butter Chicken',
    description: 'Tender chicken in a rich buttery tomato sauce',
    price: 16.99,
    category: 'Main Course',
    isVegetarian: false,
    spiceLevel: 'medium'
  },
  {
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese with spices and vegetables',
    price: 14.99,
    category: 'Appetizer',
    isVegetarian: true,
    spiceLevel: 'mild'
  },
  {
    name: 'Vegetable Biryani',
    description: 'Fragrant rice with mixed vegetables and spices',
    price: 12.99,
    category: 'Main Course',
    isVegetarian: true,
    spiceLevel: 'medium'
  },
  // Pizza Palace items
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    price: 14.99,
    category: 'Pizza',
    isVegetarian: true
  },
  {
    name: 'Pepperoni Pizza',
    description: 'Pizza with pepperoni and mozzarella cheese',
    price: 16.99,
    category: 'Pizza',
    isVegetarian: false
  },
  // Green Leaf Tiffin items
  {
    name: 'Daily Tiffin Special',
    description: 'Rotating menu of home-style dishes with rice and bread',
    price: 8.99,
    category: 'Tiffin',
    isVegetarian: true
  },
  {
    name: 'Healthy Bowl',
    description: 'Quinoa with roasted vegetables and protein of choice',
    price: 10.99,
    category: 'Healthy',
    isVegetarian: false
  }
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await User.deleteMany({})
    await Restaurant.deleteMany({})
    await MenuItem.deleteMany({})
    console.log('Cleared existing data')

    // Create users
    const createdUsers = []
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12)
      const user = await User.create({
        ...userData,
        password: hashedPassword
      })
      createdUsers.push(user)
      console.log(`Created user: ${user.name}`)
    }

    // Create restaurants
    const createdRestaurants = []
    for (const restaurantData of sampleRestaurants) {
      const restaurant = await Restaurant.create({
        ...restaurantData,
        createdBy: createdUsers[1]._id // Restaurant owner
      })
      createdRestaurants.push(restaurant)
      console.log(`Created restaurant: ${restaurant.name}`)
    }

    // Create menu items
    let menuItemIndex = 0
    for (let i = 0; i < createdRestaurants.length; i++) {
      const restaurant = createdRestaurants[i]
      const itemsCount = i === 0 ? 3 : i === 1 ? 2 : 2 // Different counts per restaurant
      
      for (let j = 0; j < itemsCount; j++) {
        if (menuItemIndex < sampleMenuItems.length) {
          await MenuItem.create({
            ...sampleMenuItems[menuItemIndex],
            restaurantId: restaurant._id
          })
          console.log(`Created menu item: ${sampleMenuItems[menuItemIndex].name} for ${restaurant.name}`)
          menuItemIndex++
        }
      }
    }

    console.log('Database seeded successfully!')
    console.log('Sample login credentials:')
    console.log('Admin: admin@delish.com / admin123')
    console.log('Restaurant Owner: owner@delish.com / owner123')
    console.log('Customer: customer@delish.com / customer123')
    
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()