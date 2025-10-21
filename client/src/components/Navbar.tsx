import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ShoppingCart, User, LogOut, Utensils } from 'lucide-react'

const Navbar: React.FC = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Utensils className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-800">Delish</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/restaurants"
              className={`${
                location.pathname === '/restaurants'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-600 hover:text-orange-500'
              } transition-colors duration-200`}
            >
              Restaurants
            </Link>
            
            <Link
              to="/tiffin"
              className={`${
                location.pathname === '/tiffin'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-600 hover:text-orange-500'
              } transition-colors duration-200`}
            >
              Tiffin Services
            </Link>

            {user && (
              <>
                <Link
                  to="/cart"
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-200"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Link>
                
                <Link
                  to="/orders"
                  className={`${
                    location.pathname === '/orders'
                      ? 'text-orange-500 border-b-2 border-orange-500'
                      : 'text-gray-600 hover:text-orange-500'
                  } transition-colors duration-200`}
                >
                  Orders
                </Link>

                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`${
                      location.pathname === '/admin'
                        ? 'text-orange-500 border-b-2 border-orange-500'
                        : 'text-gray-600 hover:text-orange-500'
                    } transition-colors duration-200`}
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors duration-200"
                >
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar