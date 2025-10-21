import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, Filter, Star, MapPin, Heart, Zap, Award, ChevronDown, X, 
  Clock, IndianRupee, Users, Sparkles, Crown, Truck, Shield, Leaf
} from 'lucide-react'
import { Restaurant } from '../types'

// Indian cities for filtering
const INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Goa'
]

// Popular Indian cuisines
const INDIAN_CUISINES = [
  'North Indian', 'South Indian', 'Mughlai', 'Punjabi', 'Gujarati',
  'Bengali', 'Rajasthani', 'Maharashtrian', 'Kerala', 'Andhra',
  'Kashmiri', 'Street Food', 'Biryani', 'Tandoori', 'Vegetarian',
  'Non-Veg', 'Seafood', 'Desserts'
]

const Restaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [maxDeliveryTime, setMaxDeliveryTime] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'rating' | 'deliveryTime' | 'name'>('rating')
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'medium' | 'high'>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const navigate = useNavigate()

  // Restaurant features for filtering
  const restaurantFeatures = [
    { id: 'pure-veg', label: 'Pure Veg', icon: '🥬' },
    { id: 'non-veg', label: 'Non-Veg', icon: '🍗' },
    { id: 'family', label: 'Family Friendly', icon: '👨‍👩‍👧‍👦' },
    { id: 'healthy', label: 'Healthy', icon: '🥗' },
    { id: 'quick', label: 'Quick Bite', icon: '⚡' },
    { id: 'premium', label: 'Premium Dining', icon: '⭐' },
    { id: 'budget', label: 'Budget Friendly', icon: '💰' },
    { id: 'organic', label: 'Organic', icon: '🌱' }
  ]

  // Sample Indian restaurant images (in real app, these would come from your database)
  const indianRestaurantImages = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=300&fit=crop'
  ]

  useEffect(() => {
    fetchIndianRestaurants()
  }, [])

  useEffect(() => {
    filterAndSortRestaurants()
  }, [restaurants, searchTerm, selectedCuisine, selectedCity, minRating, maxDeliveryTime, sortBy, priceRange, selectedFeatures])

  const fetchIndianRestaurants = async () => {
    try {
      setLoading(true)
      // In production, this would be an API call
      // For now, we'll use sample Indian restaurant data
      const sampleRestaurants: Restaurant[] = [
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
          image: indianRestaurantImages[0]
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
          image: indianRestaurantImages[1]
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
          image: indianRestaurantImages[2]
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
          image: indianRestaurantImages[3]
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
          image: indianRestaurantImages[4]
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
          image: indianRestaurantImages[5]
        }
      ]

      setRestaurants(sampleRestaurants)
    } catch (error) {
      setError('Failed to load restaurants. Please try again.')
      console.error('Error fetching restaurants:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortRestaurants = () => {
    let filtered = [...restaurants]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisines.some(cuisine => 
          cuisine.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        restaurant.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Cuisine filter
    if (selectedCuisine) {
      filtered = filtered.filter(restaurant =>
        restaurant.cuisines.includes(selectedCuisine)
      )
    }

    // City filter
    if (selectedCity) {
      filtered = filtered.filter(restaurant =>
        restaurant.address.city === selectedCity
      )
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(restaurant => restaurant.rating >= minRating)
    }

    // Delivery time filter
    if (maxDeliveryTime) {
      filtered = filtered.filter(restaurant => restaurant.deliveryTime <= maxDeliveryTime)
    }

    // Price range filter
    if (priceRange !== 'all') {
      filtered = filtered.filter(restaurant => {
        switch (priceRange) {
          case 'low': return restaurant.minOrder < 200
          case 'medium': return restaurant.minOrder >= 200 && restaurant.minOrder <= 400
          case 'high': return restaurant.minOrder > 400
          default: return true
        }
      })
    }

    // Features filter
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(restaurant =>
        selectedFeatures.every(feature => restaurant.features?.includes(feature))
      )
    }

    // Sort restaurants
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'deliveryTime':
          return a.deliveryTime - b.deliveryTime
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredRestaurants(filtered)
  }

  const toggleFavorite = (restaurantId: string) => {
    setFavorites(prev => 
      prev.includes(restaurantId) 
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    )
  }

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    )
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedCuisine('')
    setSelectedCity('')
    setMinRating(0)
    setMaxDeliveryTime(null)
    setPriceRange('all')
    setSortBy('rating')
    setSelectedFeatures([])
  }

  const activeFilterCount = [
    searchTerm,
    selectedCuisine,
    selectedCity,
    minRating > 0,
    maxDeliveryTime,
    priceRange !== 'all',
    selectedFeatures.length > 0
  ].filter(Boolean).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Restaurants</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchIndianRestaurants}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Indian Theme */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full">
              <Sparkles className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Indian Flavors
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore authentic Indian cuisine from the finest restaurants across India. 
            From street food to royal thalis, taste the diversity of Indian culinary traditions.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-orange-500">{restaurants.length}+</div>
            <div className="text-gray-600 text-sm">Restaurants</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-orange-500">{INDIAN_CUISINES.length}+</div>
            <div className="text-gray-600 text-sm">Cuisines</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-orange-500">{INDIAN_CITIES.length}+</div>
            <div className="text-gray-600 text-sm">Cities</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-orange-500">24/7</div>
            <div className="text-gray-600 text-sm">Delivery</div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          {/* Main Search Row */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search restaurants, dishes, or cuisines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                List
              </button>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-3 rounded-xl hover:bg-orange-600 transition-colors duration-200"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-white text-orange-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Quick Cuisine Filters */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Cuisines:</h3>
            <div className="flex flex-wrap gap-2">
              {INDIAN_CUISINES.slice(0, 8).map(cuisine => (
                <button
                  key={cuisine}
                  onClick={() => setSelectedCuisine(cuisine === selectedCuisine ? '' : cuisine)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                    selectedCuisine === cuisine
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="border-t pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Cuisine Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cuisine Type
                  </label>
                  <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">All Cuisines</option>
                    {INDIAN_CUISINES.map(cuisine => (
                      <option key={cuisine} value={cuisine}>{cuisine}</option>
                    ))}
                  </select>
                </div>

                {/* City Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">All Cities</option>
                    {INDIAN_CITIES.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={4.5}>4.5★ & above</option>
                    <option value={4}>4★ & above</option>
                    <option value={3.5}>3.5★ & above</option>
                  </select>
                </div>

                {/* Delivery Time Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Delivery Time
                  </label>
                  <select
                    value={maxDeliveryTime || ''}
                    onChange={(e) => setMaxDeliveryTime(e.target.value ? Number(e.target.value) : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Any Time</option>
                    <option value={20}>Under 20 min</option>
                    <option value={30}>Under 30 min</option>
                    <option value={45}>Under 45 min</option>
                  </select>
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex space-x-2">
                  {[
                    { value: 'all', label: 'All Prices', icon: '💰' },
                    { value: 'low', label: 'Budget (Under ₹200)', icon: '💸' },
                    { value: 'medium', label: 'Moderate (₹200-400)', icon: '💵' },
                    { value: 'high', label: 'Premium (Over ₹400)', icon: '💎' }
                  ].map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setPriceRange(range.value as any)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all duration-200 ${
                        priceRange === range.value
                          ? 'bg-orange-500 text-white border-orange-500 transform scale-105'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <span>{range.icon}</span>
                      <span>{range.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Features Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant Features
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {restaurantFeatures.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                        selectedFeatures.includes(feature.id)
                          ? 'bg-orange-100 border-orange-500 text-orange-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{feature.icon}</span>
                      <span className="text-sm">{feature.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex justify-between items-center">
                <button
                  onClick={clearAllFilters}
                  className="text-orange-500 hover:text-orange-600 font-medium flex items-center space-x-1"
                >
                  <X className="h-4 w-4" />
                  <span>Clear all filters</span>
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="btn-primary"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Found {filteredRestaurants.length} restaurants matching your taste
          </p>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-orange-500 hover:text-orange-600"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Featured Indian Restaurants */}
        {filteredRestaurants.length > 0 && searchTerm === '' && selectedCuisine === '' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Crown className="h-6 w-6 text-yellow-500 mr-2" />
              Premium Indian Restaurants
            </h2>
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredRestaurants
                .filter(restaurant => restaurant.rating >= 4.5)
                .slice(0, viewMode === 'grid' ? 3 : 6)
                .map(restaurant => (
                  <IndianRestaurantCard 
                    key={restaurant._id} 
                    restaurant={restaurant} 
                    viewMode={viewMode}
                    isFavorite={favorites.includes(restaurant._id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Fast Delivery Section */}
        {filteredRestaurants.length > 0 && searchTerm === '' && selectedCuisine === '' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="h-6 w-6 text-green-500 mr-2" />
              Quick Delivery
            </h2>
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredRestaurants
                .filter(restaurant => restaurant.deliveryTime <= 25)
                .slice(0, viewMode === 'grid' ? 3 : 6)
                .map(restaurant => (
                  <IndianRestaurantCard 
                    key={restaurant._id} 
                    restaurant={restaurant} 
                    viewMode={viewMode}
                    isFavorite={favorites.includes(restaurant._id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
            </div>
          </div>
        )}

        {/* All Restaurants */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {searchTerm || selectedCuisine ? 'Search Results' : 'All Indian Restaurants'}
          </h2>
          
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="text-8xl mb-4">🍛</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No restaurants found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any restaurants matching your criteria. Try adjusting your filters or explore different cuisines.
              </p>
              <button
                onClick={clearAllFilters}
                className="btn-primary"
              >
                Explore All Restaurants
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredRestaurants.map(restaurant => (
                <IndianRestaurantCard 
                  key={restaurant._id} 
                  restaurant={restaurant}
                  viewMode={viewMode}
                  isFavorite={favorites.includes(restaurant._id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Enhanced Indian Restaurant Card Component
interface IndianRestaurantCardProps {
  restaurant: Restaurant & { features?: string[]; image?: string }
  viewMode: 'grid' | 'list'
  isFavorite: boolean
  onToggleFavorite: (restaurantId: string) => void
}

const IndianRestaurantCard: React.FC<IndianRestaurantCardProps> = ({ 
  restaurant, 
  viewMode,
  isFavorite,
  onToggleFavorite 
}) => {
  const navigate = useNavigate()

  const handleViewMenu = () => {
    navigate(`/restaurant/${restaurant._id}`)
  }

  const getPriceLevel = (minOrder: number) => {
    if (minOrder < 200) return { level: '💰', label: 'Budget' }
    if (minOrder <= 400) return { level: '💵', label: 'Moderate' }
    return { level: '💎', label: 'Premium' }
  }

  const priceInfo = getPriceLevel(restaurant.minOrder)

  const getFeatureIcon = (feature: string) => {
    const icons: { [key: string]: string } = {
      'pure-veg': '🥬',
      'non-veg': '🍗',
      'family': '👨‍👩‍👧‍👦',
      'healthy': '🥗',
      'quick': '⚡',
      'premium': '⭐',
      'budget': '💰',
      'organic': '🌱',
      'seafood': '🐟'
    }
    return icons[feature] || '⭐'
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
        <div className="flex items-start space-x-4">
          {/* Restaurant Image */}
          <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden">
            <img 
              src={restaurant.image} 
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Restaurant Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {restaurant.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                  {restaurant.description}
                </p>
              </div>
              <button
                onClick={() => onToggleFavorite(restaurant._id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <Heart 
                  className={`h-5 w-5 ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`} 
                />
              </button>
            </div>

            {/* Ratings and Info */}
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>{restaurant.rating}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{restaurant.deliveryTime} min</span>
              </div>
              <div className="flex items-center">
                <IndianRupee className="h-4 w-4 mr-1" />
                <span>{priceInfo.label}</span>
              </div>
            </div>

            {/* Cuisine and Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {restaurant.cuisines.slice(0, 3).map(cuisine => (
                <span
                  key={cuisine}
                  className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                >
                  {cuisine}
                </span>
              ))}
              {restaurant.features?.slice(0, 3).map(feature => (
                <span
                  key={feature}
                  className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                >
                  {getFeatureIcon(feature)}
                </span>
              ))}
            </div>

            <button 
              onClick={handleViewMenu}
              className="btn-primary"
            >
              View Menu & Order
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Grid View
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Restaurant Image */}
      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        
        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(restaurant._id)}
          className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <Heart 
            className={`h-5 w-5 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`} 
          />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
          {restaurant.rating >= 4.5 && (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </span>
          )}
          {restaurant.deliveryTime <= 25 && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
              <Zap className="h-3 w-3 mr-1" />
              Fast
            </span>
          )}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-xl font-semibold mb-1">{restaurant.name}</h3>
          <div className="flex items-center space-x-2 text-sm">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span>{restaurant.rating}</span>
            <span>•</span>
            <span>{restaurant.deliveryTime} min</span>
            <span>•</span>
            <span>{priceInfo.level}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Location */}
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{restaurant.address.city}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {restaurant.description}
        </p>

        {/* Cuisine Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {restaurant.cuisines.slice(0, 3).map(cuisine => (
            <span
              key={cuisine}
              className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
            >
              {cuisine}
            </span>
          ))}
        </div>

        {/* Features */}
        {restaurant.features && restaurant.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {restaurant.features.slice(0, 3).map(feature => (
              <span
                key={feature}
                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
              >
                {getFeatureIcon(feature)}
              </span>
            ))}
          </div>
        )}

        {/* Price and Min Order */}
        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <span className="flex items-center">
            <IndianRupee className="h-4 w-4 mr-1" />
            Min. order: ₹{restaurant.minOrder}
          </span>
          <span>{priceInfo.label}</span>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleViewMenu}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
        >
          View Menu & Order
        </button>
      </div>
    </div>
  )
}

export default Restaurants