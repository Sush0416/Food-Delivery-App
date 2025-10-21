import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Restaurants from './pages/Restaurants'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import TiffinServices from './pages/TiffinServices'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import RestaurantMenu from './pages/RestaurantMenu'
import AddRestaurant from './pages/AddRestaurant'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurant/:id" element={<RestaurantMenu />} />
            <Route path="/add-restaurant" element={<AddRestaurant />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/tiffin" element={<TiffinServices />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App