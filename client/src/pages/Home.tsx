import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import {
  Utensils,
  Truck,
  Star,
  Shield,
  Heart,
  Gift,
  Sparkles,
  Smartphone,
  Smile
} from 'lucide-react'

const Home: React.FC = () => {
  const { user } = useAuth()

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white overflow-hidden">
      {/* 🍱 Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
        className="relative text-center py-28 px-6 overflow-hidden"
      >
        {/* ✅ FIXED background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 animate-slow-pan"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80')"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>

        {/* Floating icons */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-20 text-yellow-400 opacity-60"
        >
          <Sparkles className="w-10 h-10" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 right-20 text-pink-300 opacity-60"
        >
          <Heart className="w-10 h-10" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-orange-300 to-yellow-200 text-transparent bg-clip-text drop-shadow-lg"
          >
            Fresh. Homemade. Delivered Daily. 🍛
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto text-orange-100"
          >
            Experience healthy, tasty, and affordable tiffins — cooked with care and delivered with love.
          </motion.p>

          <div className="flex justify-center gap-4 flex-wrap">
            {!user ? (
              <Link
                to="/auth"
                className="bg-white text-orange-600 px-8 py-3 rounded-xl font-semibold hover:bg-orange-100 shadow-lg transition-transform transform hover:scale-105"
              >
                Get Started
              </Link>
            ) : (
              <Link
                to="/restaurants"
                className="bg-white text-orange-600 px-8 py-3 rounded-xl font-semibold hover:bg-orange-100 shadow-lg transition-transform transform hover:scale-105"
              >
                Order Now
              </Link>
            )}
            <Link
              to="/tiffin"
              className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-orange-600 shadow-lg transition-transform transform hover:scale-105"
            >
              Explore Tiffin Plans
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 🌟 Quick Stats */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mt-16 px-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-12">
          {[
            { icon: <Star className="h-6 w-6 text-orange-500" />, text1: 'Top Rated', text2: '4.9★ Quality' },
            { icon: <Truck className="h-6 w-6 text-yellow-600" />, text1: 'Fast Delivery', text2: 'Under 30 min' },
            { icon: <Shield className="h-6 w-6 text-cyan-600" />, text1: 'Secure Payment', text2: '100% Safe' },
            { icon: <Gift className="h-6 w-6 text-green-600" />, text1: 'Special Offer', text2: '1st Day Free 🎁' }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center bg-white border border-orange-100 rounded-2xl py-5 shadow-md hover:shadow-xl transition"
            >
              {item.icon}
              <div className="text-center ml-3">
                <p className="text-sm text-gray-600">{item.text1}</p>
                <p className="text-lg font-semibold text-orange-600">{item.text2}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 💡 Why Choose Us */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-br from-orange-50 to-white relative"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')"
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
            Why <span className="text-orange-500">Delish</span> is Your Perfect Meal Partner?
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Every bite is a blend of taste, care, and nutrition — crafted just for you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: <Utensils className="h-8 w-8 text-orange-500" />,
                title: 'Homemade Taste',
                desc: 'Prepared fresh daily by local chefs ensuring authentic homemade flavor.'
              },
              {
                icon: <Heart className="h-8 w-8 text-orange-500" />,
                title: 'Health & Hygiene',
                desc: 'We maintain top hygiene standards and serve balanced, healthy meals.'
              },
              {
                icon: <Sparkles className="h-8 w-8 text-orange-500" />,
                title: 'Flexible Plans',
                desc: 'Choose from daily, weekly, or monthly plans to match your routine.'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 🚀 CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 text-white text-center py-24 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1604147706283-d8b7c3b5c1d6?auto=format&fit=crop&w=1600&q=80')"
          }}
        ></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
            Make Every Meal a <span className="text-yellow-300">Delish</span> Moment ✨
          </h2>
          <p className="text-orange-100 mb-10 max-w-2xl mx-auto">
            Join thousands who enjoy fresh, home-like meals every day — fast, safe, and tasty.
          </p>
          <Link
            to={user ? '/restaurants' : '/auth'}
            className="bg-white text-orange-600 px-10 py-4 rounded-xl font-semibold hover:bg-orange-100 shadow-lg transition-transform transform hover:scale-105"
          >
            Start Ordering
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

export default Home
