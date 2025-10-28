import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  Star,
  Users,
  Utensils,
  ChefHat,
  Heart,
  Award,
  Sparkles,
  Leaf,
  Zap
} from 'lucide-react'
import { Restaurant } from '../types'

/**
 * TiffinServices.tsx
 *
 * - Hero section updated to a modern home-page style (gradient + soft image overlay + wave)
 * - Rest of the component uses mock tiffin services data and subscription plans
 *
 * Notes:
 * - Replace `user` constant with your auth context (e.g. useAuth()) where needed.
 * - Ensure referenced images exist in public folder or update src paths.
 */

// simple animation variants for fade in
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
}

const TiffinServices: React.FC = () => {
  const navigate = useNavigate()
  const [tiffinServices, setTiffinServices] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [dietaryPreference, setDietaryPreference] = useState<'vegetarian' | 'non-vegetarian' | 'vegan'>('vegetarian')

  // Replace with real auth context if available
  const user = false

  useEffect(() => {
    loadTiffinServices()
  }, [])

  const loadTiffinServices = () => {
    const mockServices: Restaurant[] = [
      {
        _id: '1',
        name: "Auntie's Kitchen",
        description: 'Authentic home-cooked meals with traditional recipes passed down through generations.',
        address: {
          street: '123 Main St',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          zipCode: '400001'
        },
        cuisines: ['Indian', 'Vegetarian', 'Home-style'],
        rating: 4.8,
        deliveryTime: 25,
        minOrder: 50,
        contact: { phone: '+91-9876543210', email: 'auntie@example.com' },
        isActive: true,
        createdBy: 'admin',
        createdAt: new Date().toISOString(),
        image: '/Auntie Kitchen.jpg',
        features: ['Fresh ingredients', 'Traditional recipes', 'Customizable portions']
      },
      {
        _id: '2',
        name: "Grandma's Tiffin",
        description: 'Comfort food that reminds you of home. Fresh, nutritious meals for the whole family.',
        address: {
          street: '456 Oak Ave',
          city: 'Delhi',
          state: 'Delhi',
          country: 'India',
          zipCode: '110001'
        },
        cuisines: ['North Indian', 'Vegetarian', 'Comfort Food'],
        rating: 4.9,
        deliveryTime: 30,
        minOrder: 45,
        contact: { phone: '+91-9876543211', email: 'grandma@example.com' },
        isActive: true,
        createdBy: 'admin',
        createdAt: new Date().toISOString(),
        image: '/Grandma Tiffin.jpg',
        features: ['Nutritious meals', 'Family portions', 'Dietary options']
      },
      {
        _id: '3',
        name: 'Spice Route Tiffin',
        description: 'A fusion of flavors from different regions, bringing excitement to your daily meals.',
        address: {
          street: '789 Spice Lane',
          city: 'Bangalore',
          state: 'Karnataka',
          country: 'India',
          zipCode: '560001'
        },
        cuisines: ['Fusion', 'Indian', 'Regional'],
        rating: 4.7,
        deliveryTime: 20,
        minOrder: 55,
        contact: { phone: '+91-9876543212', email: 'spice@example.com' },
        isActive: true,
        createdBy: 'admin',
        createdAt: new Date().toISOString(),
        image: '/Spice Route Tiffin.jpg',
        features: ['Fusion cuisine', 'Regional specialties', 'Spice level customization']
      },
      {
        _id: '4',
        name: 'Healthy Bites Tiffin',
        description: 'Nutritious, balanced meals designed by nutritionists for a healthier lifestyle.',
        address: {
          street: '321 Health St',
          city: 'Chennai',
          state: 'Tamil Nadu',
          country: 'India',
          zipCode: '600001'
        },
        cuisines: ['Healthy', 'Vegetarian', 'Low-calorie'],
        rating: 4.6,
        deliveryTime: 35,
        minOrder: 60,
        contact: { phone: '+91-9876543213', email: 'healthy@example.com' },
        isActive: true,
        createdBy: 'admin',
        createdAt: new Date().toISOString(),
        image: '/Healthy Bites Tiffin.jpg',
        features: ['Nutritionist approved', 'Calorie counting', 'Organic ingredients']
      },
      {
        _id: '5',
        name: 'Royal Feast Tiffin',
        description: 'Luxurious meals inspired by royal kitchens, perfect for special occasions.',
        address: {
          street: '654 Royal Rd',
          city: 'Jaipur',
          state: 'Rajasthan',
          country: 'India',
          zipCode: '302001'
        },
        cuisines: ['Royal', 'Indian', 'Festive'],
        rating: 4.9,
        deliveryTime: 40,
        minOrder: 80,
        contact: { phone: '+91-9876543214', email: 'royal@example.com' },
        isActive: true,
        createdBy: 'admin',
        createdAt: new Date().toISOString(),
        image: '/Royal Feast Tiffin.jpg',
        features: ['Royal recipes', 'Festive meals', 'Premium ingredients']
      },
      {
        _id: '6',
        name: 'Quick & Tasty Tiffin',
        description: "Fast, delicious meals for busy professionals who don't compromise on taste.",
        address: {
          street: '987 Speed Ave',
          city: 'Pune',
          state: 'Maharashtra',
          country: 'India',
          zipCode: '411001'
        },
        cuisines: ['Quick Meals', 'Indian', 'Fusion'],
        rating: 4.5,
        deliveryTime: 15,
        minOrder: 40,
        contact: { phone: '+91-9876543215', email: 'quick@example.com' },
        isActive: true,
        createdBy: 'admin',
        createdAt: new Date().toISOString(),
        image: '/Quick & Tasty Tiffin.jpg',
        features: ['Quick preparation', 'Busy professional friendly', 'Variety of options']
      }
    ]

    setTiffinServices(mockServices)
    setLoading(false)
  }

  const plans = {
    daily: { price: 99, description: 'Perfect for trying out our service' },
    weekly: { price: 89, description: 'Best value with 1 day free 🎁' },
    monthly: { price: 79, description: 'Most popular with 4 days free 🎉' }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* -----------------------
            NEW HERO SECTION (updated)
            ----------------------- */}
          <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gray-900">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center brightness-[0.7]"
    style={{
      backgroundImage:
        "url('https://wallpapers.com/images/hd/food-4k-spdnpz7bhmx4kv2r.jpg')",
    }}
  ></div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>

  {/* Hero Content */}
  <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
    <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-white">
      Delicious Tiffins, Delivered Daily 🍱
    </h1>
    <p className="text-lg sm:text-xl text-orange-100 mb-8">
      Enjoy fresh home-cooked meals delivered to your doorstep with ease and convenience.
    </p>
    
  </div>
</section>



   
        {/* Dietary Preferences */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Dietary Preferences
          </h3>
          <div className="flex justify-center space-x-4">
            {[
              { key: 'vegetarian', label: 'Vegetarian', icon: <Leaf className="h-4 w-4" /> },
              { key: 'non-vegetarian', label: 'Non-Vegetarian', icon: <ChefHat className="h-4 w-4" /> },
              { key: 'vegan', label: 'Vegan', icon: <Sparkles className="h-4 w-4" /> }
            ].map(pref => (
              <button
                key={pref.key}
                className={`flex items-center px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                  dietaryPreference === (pref.key as any)
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-300 text-gray-600'
                }`}
                onClick={() => setDietaryPreference(pref.key as any)}
              >
                {pref.icon}
                <span className="ml-2">{pref.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Plan</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.entries(plans).map(([plan, details]) => (
              <div
                key={plan}
                className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                  selectedPlan === (plan as any)
                    ? 'border-orange-500 bg-orange-50 shadow-lg'
                    : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedPlan(plan as any)}
              >
                {plan === 'weekly' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">Most Popular</span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className="text-orange-500 mb-2">
                    {plan === 'daily' ? <Utensils className="h-6 w-6" /> : plan === 'weekly' ? <Calendar className="h-6 w-6" /> : <Award className="h-6 w-6" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">{plan} Plan</h3>
                </div>

                <p className="text-3xl font-bold text-orange-500 mb-2 text-center">
                  ₹{details.price}
                  <span className="text-sm text-gray-600 font-normal">/meal</span>
                </p>

                <p className="text-gray-600 text-sm mb-4 text-center">{details.description}</p>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Zap className="h-3 w-3 mr-2 text-green-500" />
                    <span>2 meals per day (Lunch + Dinner)</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-3 w-3 mr-2 text-green-500" />
                    <span>
                      {plan === 'daily' ? 'Flexible timing' : plan === 'weekly' ? 'Build Your Own Tiffin' : 'Advanced customization'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-3 w-3 mr-2 text-green-500" />
                    <span>
                      {plan === 'daily' ? 'Cancel anytime' : plan === 'weekly' ? 'Priority delivery' : 'Dedicated support'}
                    </span>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() =>
                navigate(`/subscription/${selectedPlan}`, {
                  state: { plan: selectedPlan, price: plans[selectedPlan].price }
                })
              }
              className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 transform hover:scale-105"
            >
              Subscribe to {selectedPlan} Plan
            </button>
          </div>
        </div>

        {/* Meal of the Day */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-6 w-6 text-orange-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Meal of the Day</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="/Paneer Butter Masala.jpg"
                alt="Paneer Butter Masala with Jeera Rice"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>

            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Paneer Butter Masala with Jeera Rice</h3>
              <p className="text-gray-600 mb-4">
                Creamy paneer curry with aromatic basmati rice and fresh vegetables. A perfect blend of flavors that brings comfort to your table.
              </p>

              <div className="flex items-center mb-4">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm text-gray-600">4.8 rating</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {['vegetarian', 'gluten-free'].map(diet => (
                  <span key={diet} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full capitalize">
                    {diet}
                  </span>
                ))}
              </div>

              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200" onClick={() => navigate('/tiffin/1')}>
                Try Today's Special
              </button>
            </div>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="text-center mb-8">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-gray-900">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Priya Sharma',
                rating: 5,
                text: 'The weekly plan is amazing! I love being able to customize my meals. The food is always fresh and delicious.',
                avatar: 'PS'
              },
              {
                name: 'Rajesh Kumar',
                rating: 5,
                text: 'Monthly subscription saves me so much time. No more cooking after work, and the variety keeps it interesting.',
                avatar: 'RK'
              },
              {
                name: 'Meera Patel',
                rating: 5,
                text: 'Perfect for my vegan diet. The customization options are fantastic, and delivery is always on time.',
                avatar: 'MP'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tiffin Services List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Tiffin Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiffinServices.map(service => (
              <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200">
                <div className="h-48 bg-gray-200 relative">
                  {service.image ? (
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                      <Utensils className="h-16 w-16 text-orange-500" />
                    </div>
                  )}

                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">Tiffin Service</div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">{service.deliveryTime} min delivery</div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>

                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{service.rating} • {service.deliveryTime} min delivery</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Specializes in home-style meals</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.cuisines.slice(0, 3).map(cuisine => (
                      <span key={cuisine} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">{cuisine}</span>
                    ))}
                  </div>

                  <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200" onClick={() => navigate(`/tiffin/${service._id}`)}>
                    View Menu & Subscribe
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default TiffinServices
