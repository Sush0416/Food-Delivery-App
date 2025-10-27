import { Restaurant, MenuItem } from '../types';

export const sampleRestaurants: Restaurant[] = [
  {
    _id: '1',
    name: 'Spice Garden',
    description: 'Authentic North Indian cuisine with traditional recipes passed down through generations',
    address: {
      street: 'MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      zipCode: '400001'
    },
    cuisines: ['North Indian', 'Mughlai', 'Tandoori'],
    rating: 4.5,
    deliveryTime: 30,
    minOrder: 200,
    contact: {
      phone: '+91-9876543210',
      email: 'info@spicegarden.com'
    },
    isActive: true,
    createdBy: '1',
    createdAt: new Date().toISOString(),
    features: ['pure-veg', 'family', 'premium'],
    image: '/Spice Garden.jpg'
  },
  {
    _id: '2',
    name: 'Dakshin Delights',
    description: 'Traditional South Indian meals served on banana leaves with authentic flavors',
    address: {
      street: 'Brigade Road',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      zipCode: '560001'
    },
    cuisines: ['South Indian', 'Andhra', 'Vegetarian'],
    rating: 4.7,
    deliveryTime: 25,
    minOrder: 150,
    contact: {
      phone: '+91-9876543211',
      email: 'hello@dakshindelights.com'
    },
    isActive: true,
    createdBy: '1',
    createdAt: new Date().toISOString(),
    features: ['pure-veg', 'healthy', 'budget'],
    image: '/Dakshin Delights.jpg'
  },
  {
    _id: '3',
    name: 'Royal Biryani House',
    description: 'Famous for Hyderabad-style biryanis and authentic Mughlai cuisine',
    address: {
      street: 'Hitech City',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India',
      zipCode: '500081'
    },
    cuisines: ['Biryani', 'Mughlai', 'Non-Veg'],
    rating: 4.8,
    deliveryTime: 35,
    minOrder: 250,
    contact: {
      phone: '+91-9876543212',
      email: 'orders@royalbiryani.com'
    },
    isActive: true,
    createdBy: '1',
    createdAt: new Date().toISOString(),
    features: ['non-veg', 'premium', 'family'],
    image: '/Royal Biryani House.jpg'
  },
  {
    _id: '4',
    name: 'Gujarati Thali',
    description: 'Unlimited Gujarati thali with homemade taste and traditional flavors',
    address: {
      street: 'CG Road',
      city: 'Ahmedabad',
      state: 'Gujarat',
      country: 'India',
      zipCode: '380009'
    },
    cuisines: ['Gujarati', 'Vegetarian', 'Street Food'],
    rating: 4.6,
    deliveryTime: 20,
    minOrder: 180,
    contact: {
      phone: '+91-9876543213',
      email: 'thali@gujaratithali.com'
    },
    isActive: true,
    createdBy: '1',
    createdAt: new Date().toISOString(),
    features: ['pure-veg', 'budget', 'family'],
    image: '/Gujarati Thali.jpg'
  },
  {
    _id: '5',
    name: 'Kerala Spice Route',
    description: 'Authentic Kerala cuisine with coastal flavors and seafood specialties',
    address: {
      street: 'Marine Drive',
      city: 'Kochi',
      state: 'Kerala',
      country: 'India',
      zipCode: '682001'
    },
    cuisines: ['Kerala', 'Seafood', 'Non-Veg'],
    rating: 4.4,
    deliveryTime: 40,
    minOrder: 300,
    contact: {
      phone: '+91-9876543214',
      email: 'kerala@spiceroute.com'
    },
    isActive: true,
    createdBy: '1',
    createdAt: new Date().toISOString(),
    features: ['non-veg', 'seafood', 'premium'],
    image: '/Kerala Spice Route.jpg'
  },
  {
    _id: '6',
    name: 'Rajasthan Royal Kitchen',
    description: 'Royal Rajasthani thali with authentic desert flavors and traditional recipes',
    address: {
      street: 'MI Road',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      zipCode: '302001'
    },
    cuisines: ['Rajasthani', 'Vegetarian', 'North Indian'],
    rating: 4.9,
    deliveryTime: 30,
    minOrder: 220,
    contact: {
      phone: '+91-9876543215',
      email: 'royal@rajasthankitchen.com'
    },
    isActive: true,
    createdBy: '1',
    createdAt: new Date().toISOString(),
    features: ['pure-veg', 'premium', 'family'],
    image: '/Rajasthan Royal Kitchen.jpg'
  }
];

export const sampleMenuItems: Record<string, MenuItem[]> = {
  '1': [ // Spice Garden - North Indian
    {
      _id: '1-1',
      restaurantId: '1',
      name: 'Butter Chicken',
      description: 'Creamy tomato-based curry with tender chicken pieces',
      price: 280,
      category: 'Main Course',
      image: '/Butter Chicken.jpg',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '1-2',
      restaurantId: '1',
      name: 'Paneer Tikka Masala',
      description: 'Grilled paneer cubes in rich spicy tomato gravy',
      price: 240,
      category: 'Main Course',
      image: '/Paneer Butter Masala.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '1-3',
      restaurantId: '1',
      name: 'Dal Makhani',
      description: 'Slow-cooked black lentils with cream and butter',
      price: 180,
      category: 'Main Course',
      image: '/Dal Tadka.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '1-4',
      restaurantId: '1',
      name: 'Garlic Naan',
      description: 'Freshly baked bread with garlic and butter',
      price: 40,
      category: 'Breads',
      image: '/Garlic Naan.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '1-5',
      restaurantId: '1',
      name: 'Mango Lassi',
      description: 'Sweet yogurt drink with mango pulp',
      price: 80,
      category: 'Beverages',
      image: '/Mango Lassi.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      createdAt: new Date().toISOString()
    }
  ],
  '2': [ // Dakshin Delights - South Indian
    {
      _id: '2-1',
      restaurantId: '2',
      name: 'Masala Dosa',
      description: 'Crispy crepe filled with potato masala and served with chutneys',
      price: 120,
      category: 'Breakfast',
      image: '/Masala Dosa.jpg',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '2-2',
      restaurantId: '2',
      name: 'Idli Sambar',
      description: 'Steamed rice cakes served with lentil soup and chutneys',
      price: 80,
      category: 'Breakfast',
      image: '/Idli.jpg',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '2-3',
      restaurantId: '2',
      name: 'Chicken Biryani',
      description: 'Fragrant basmati rice cooked with tender chicken and spices',
      price: 220,
      category: 'Rice Dishes',
      image: '/Chicken Biryani.jpg',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '2-4',
      restaurantId: '2',
      name: 'Filter Coffee',
      description: 'Traditional South Indian coffee made with decoction and milk',
      price: 50,
      category: 'Beverages',
      image: '/Filter Coffee.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '2-5',
      restaurantId: '2',
      name: 'Rasam',
      description: 'Tangy tamarind soup with tomatoes and spices',
      price: 60,
      category: 'Soups',
      image: '/Rasam.jpg',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      createdAt: new Date().toISOString()
    }
  ],
  '3': [ // Royal Biryani House - Biryani
    {
      _id: '3-1',
      restaurantId: '3',
      name: 'Hyderabadi Biryani',
      description: 'Aromatic basmati rice layered with marinated meat and boiled eggs',
      price: 280,
      category: 'Biryani',
      image: '/Hyderabadi Biryani.jpg',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '3-2',
      restaurantId: '3',
      name: 'Paneer Biryani',
      description: 'Fragrant rice cooked with marinated paneer and spices',
      price: 220,
      category: 'Biryani',
      image: '/Paneer Biryani.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '3-3',
      restaurantId: '3',
      name: 'Mirchi Ka Salan',
      description: 'Spicy curry made with green chilies and peanuts',
      price: 120,
      category: 'Side Dishes',
      image: '/Mirchi Ka Salan.jpg',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '3-4',
      restaurantId: '3',
      name: 'Double Ka Meetha',
      description: 'Sweet bread pudding made with bread, sugar and ghee',
      price: 100,
      category: 'Desserts',
      image: '/Double Ka Meetha.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '3-5',
      restaurantId: '3',
      name: 'Lassi',
      description: 'Refreshing yogurt drink with cardamom',
      price: 60,
      category: 'Beverages',
      image: '/Lassi.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      createdAt: new Date().toISOString()
    }
  ],
  '4': [ // Gujarati Thali - Gujarati
    {
      _id: '4-1',
      restaurantId: '4',
      name: 'Gujarati Thali',
      description: 'Complete traditional Gujarati meal with multiple dishes',
      price: 180,
      category: 'Thali',
      image: '/Gujarati Thali.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '4-2',
      restaurantId: '4',
      name: 'Dhokla',
      description: 'Steamed fermented rice and chickpea flour cake',
      price: 80,
      category: 'Snacks',
      image: '/Dhokla.jpg',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '4-3',
      restaurantId: '4',
      name: 'Khichdi',
      description: 'Rice and lentil porridge with ghee and spices',
      price: 100,
      category: 'Main Course',
      image: '/Khichdi.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '4-4',
      restaurantId: '4',
      name: 'Jalebi',
      description: 'Crispy deep-fried spirals soaked in sugar syrup',
      price: 60,
      category: 'Sweets',
      image: '/Jalebi.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '4-5',
      restaurantId: '4',
      name: 'Masala Chaas',
      description: 'Spiced buttermilk with herbs and spices',
      price: 40,
      category: 'Beverages',
      image: '/Chaas.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      createdAt: new Date().toISOString()
    }
  ],
  '5': [ // Kerala Spice Route - Kerala
    {
      _id: '5-1',
      restaurantId: '5',
      name: 'Appam with Stew',
      description: 'Fermented rice pancakes served with vegetable stew',
      price: 140,
      category: 'Breakfast',
      image: '/Appam.jpg',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '5-2',
      restaurantId: '5',
      name: 'Fish Curry',
      description: 'Coconut-based fish curry with traditional Kerala spices',
      price: 260,
      category: 'Main Course',
      image: '/Fish Curry.jpg',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '5-3',
      restaurantId: '5',
      name: 'Avial',
      description: 'Mixed vegetable curry with coconut and yogurt',
      price: 120,
      category: 'Main Course',
      image: '/Avial.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '5-4',
      restaurantId: '5',
      name: 'Payasam',
      description: 'Sweet rice pudding with coconut milk and nuts',
      price: 90,
      category: 'Desserts',
      image: '/Payasam.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '5-5',
      restaurantId: '5',
      name: 'Coconut Water',
      description: 'Fresh tender coconut water',
      price: 50,
      category: 'Beverages',
      image: '/Coconut Water.jpg',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      createdAt: new Date().toISOString()
    }
  ],
  '6': [ // Rajasthan Royal Kitchen - Rajasthani
    {
      _id: '6-1',
      restaurantId: '6',
      name: 'Dal Baati Churma',
      description: 'Traditional Rajasthani dish with lentil curry, baked dumplings and sweet crumble',
      price: 220,
      category: 'Thali',
      image: '/Dal Baati Churma.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '6-2',
      restaurantId: '6',
      name: 'Gatte Ki Sabzi',
      description: 'Gram flour dumplings cooked in yogurt-based curry',
      price: 160,
      category: 'Main Course',
      image: '/Gatte Ki Sabzi.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '6-3',
      restaurantId: '6',
      name: 'Malpua',
      description: 'Sweet pancakes soaked in sugar syrup',
      price: 80,
      category: 'Sweets',
      image: '/Malpua.jpg',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '6-4',
      restaurantId: '6',
      name: 'Bael Sharbat',
      description: 'Refreshing drink made from bael fruit',
      price: 70,
      category: 'Beverages',
      image: '/Bael Sharbat.jpg',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      createdAt: new Date().toISOString()
    }
  ]
};
