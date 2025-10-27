import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

// Layout
import Navbar from './components/Navbar'

// Core Pages
import Home from './pages/Home'
import Auth from './pages/Auth'
import Restaurants from './pages/Restaurants'
import RestaurantMenu from './pages/RestaurantMenu'
import MenuScreen from './pages/MenuScreen'
import AddRestaurant from './pages/AddRestaurant'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Admin from './pages/Admin'

// Tiffin Services
import TiffinServices from './components/TiffinServices/TiffinServices'
import TiffinServiceDetail from './components/TiffinServices/TiffinServiceDetail'

// Subscription Pages
import SubscriptionCheckout from './components/subscription/SubscriptionCheckout'
import SubscriptionSuccess from './components/subscription/SubscriptionSuccess'
import DailyPlanSubscription from './components/subscription/DailyPlanSubscription'
import WeeklyPlanSubscription from './components/subscription/WeeklyPlanSubscription'
import MonthlyPlanSubscription from './components/subscription/MonthlyPlanSubscription'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* ✅ Navbar always visible */}
          <Navbar />

          {/* ✅ All Routes */}
          <Routes>
            {/* Home & Auth */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />

            {/* Restaurants */}
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurant/:id" element={<RestaurantMenu />} />
            <Route path="/restaurant/:id/menu" element={<MenuScreen />} />
            <Route path="/add-restaurant" element={<AddRestaurant />} />

            {/* Cart & Orders */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/orders" element={<Orders />} />

            {/* Profile & Admin */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />

            {/* Tiffin Services */}
            <Route path="/tiffin" element={<TiffinServices />} />
            <Route path="/tiffin/:id" element={<TiffinServiceDetail />} />

            {/* Subscription Flow */}
            <Route path="/subscription-checkout" element={<SubscriptionCheckout />} />
            <Route path="/subscription-success" element={<SubscriptionSuccess />} />

            {/* Subscription Plans */}
            <Route path="/subscription/daily" element={<DailyPlanSubscription />} />
            <Route path="/subscription/weekly" element={<WeeklyPlanSubscription />} />
            <Route path="/subscription/monthly" element={<MonthlyPlanSubscription />} />

            {/* Optional fallback */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
                  <h2 className="text-2xl font-semibold mb-2">404 - Page Not Found</h2>
                  <p>Sorry, the page you’re looking for doesn’t exist.</p>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
