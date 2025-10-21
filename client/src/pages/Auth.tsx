import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Login } from '../components/auth/Login'
import { Register } from '../components/auth/Register'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="mt-2 text-gray-600">
              {isLogin ? 'Sign in to your account' : 'Join Delish today'}
            </p>
          </div>

          <div className="mt-8">
            {isLogin ? <Login /> : <Register />}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth