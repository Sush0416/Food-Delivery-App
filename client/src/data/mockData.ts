import { Restaurant } from '../types';

export const MOCK_SERVICES: Restaurant[] = [
  {
    _id: 'tiffin-1',
    name: 'Auntie Kitchen',
    description: 'Home-style meals prepared with love and traditional recipes',
    address: {
      street: 'Sector 15',
      city: 'Gurgaon',
      state: 'Haryana',
      country: 'India',
      zipCode: '122001'
    },
    cuisines: ['North Indian', 'Punjabi', 'Vegetarian'],
    rating: 4.8,
    deliveryTime: 30,
    minOrder: 150,
    contact: {
      phone: '+91-9876543210',
      email: 'auntie@auntiekitchen.com'
    },
    isActive: true,
    createdBy: '1',
    createdAt: new Date().toISOString(),
    features: ['pure-veg', 'home-cooked', 'family'],
    image: '/Auntie Kitchen.jpg'
  },
  {
    _id: 'tiffin-2',
    name: 'Grandma Tiffin',
    description: 'Authentic home-cooked meals just like grandma used to make',
    address: {
      street: 'Connaught Place',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      zipCode: '110001'
    },
    cuisines: ['North Indian', 'Punjabi', 'Vegetarian'],
    rating: 4.6,
    deliveryTime: 25,
    minOrder: 120,
    contact: {
      phone: '+91-9876543211',
      email: 'grandma@grandmatiffin.com'
    },
    isActive: true,
    createdBy: '1',
    createdAt: new Date().toISOString(),
    features: ['pure-veg', 'traditional', 'healthy'],
    image: '/Grandma Tiffin.jpg'
  },
  {
    _id: 'tiffin-3',
    name: 'Healthy Bites Tiffin',
    description: 'Nutritious and balanced meals for health-conscious individuals',
    address: {
      street: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      zipCode: '400050'
    },
    cuisines: ['Healthy', 'Continental', 'Vegetarian'],
    rating: 4.7,
    deliveryTime: 35,
    minOrder: 180,
    contact: {
      phone: '+91-9876543212',
      email: 'healthy@healthybites.com'
    },
    isActive: true,
    createdBy: '1',
    createdAt: new Date().toISOString(),
    features: ['healthy', 'organic', 'low-calorie'],
    image: '/Healthy Bites Tiffin.jpg'
  },
  {
    _id: 'tiffin-4',
    name: 'Quick & Tasty Tiffin',
    description: 'Fast and delicious meals for busy professionals',
    address: {
      street: 'Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      zipCode: '560034'
    },
    cuisines: ['North Indian', 'Chinese', 'Vegetarian'],
    rating: 4.4,
    deliveryTime: 20,
    minOrder: 100,
    contact: {
      phone: '+91-9876543213',
      email: 'quick@quickandtasty.com'
    },
    isActive: true,
    createdBy: '1',
    createdAt: new Date().toISOString(),
    features: ['quick-delivery', 'variety', 'budget'],
    image: '/Quick & Tasty Tiffin.jpg'
  },
  {
    _id: 'tiffin-5',
    name: 'Royal Feast Tiffin',
    description: 'Premium quality meals with exotic ingredients and presentation',
    address: {
      street: 'Park Street',
      city: 'Kolkata',
      state: 'West Bengal',
      country: 'India',
      zipCode: '700016'
    },
    cuisines: ['Bengali', 'North Indian', 'Continental'],
    rating: 4.9,
    deliveryTime: 40,
    minOrder: 250,
    contact: {
      phone: '+91-9876543214',
      email: 'royal@royalfeast.com'
    },
    isActive: true,
    createdBy: '1',
    createdAt: new Date().toISOString(),
    features: ['premium', 'exotic', 'presentation'],
    image: '/Royal Feast Tiffin.jpg'
  },
  {
    _id: 'tiffin-6',
    name: 'Spice Route Tiffin',
    description: 'Fusion of different regional cuisines with authentic spices',
    address: {
      street: 'MG Road',
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      zipCode: '411001'
    },
    cuisines: ['Fusion', 'Regional', 'Vegetarian'],
    rating: 4.5,
    deliveryTime: 30,
    minOrder: 160,
    contact: {
      phone: '+91-9876543215',
      email: 'spice@spiceroute.com'
    },
    isActive: true,
    createdBy: '1',
    createdAt: new Date().toISOString(),
    features: ['fusion', 'regional', 'authentic'],
    image: '/Spice Route Tiffin.jpg'
  }
];
