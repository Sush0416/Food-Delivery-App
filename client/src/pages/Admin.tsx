import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Users, Utensils, Package, DollarSign, TrendingUp, AlertCircle } from 'lucide-react'

interface AdminStats {
  totalUsers: number
  totalRestaurants: number
  totalOrders: number
  totalRevenue: number
  pendingRestaurants: number
}

const Admin: React.FC = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [pendingRestaurants, setPendingRestaurants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAdminData()
    }
  }, [user])

  const fetchAdminData = async () => {
    try {
      const [statsRes, ordersRes, restaurantsRes] = await Promise.all([
        fetch('/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }),
        fetch('/api/admin/orders?limit=10', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }),
        fetch('/api/admin/restaurants/pending', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
      ])

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData.stats)
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json()
        setRecentOrders(ordersData.orders)
      }

      if (restaurantsRes.ok) {
        const restaurantsData = await restaurantsRes.json()
        setPendingRestaurants(restaurantsData.restaurants)
      }
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApproveRestaurant = async (restaurantId: string) => {
    try {
      const response = await fetch(`/api/admin/restaurants/${restaurantId}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.ok) {
        setPendingRestaurants(prev => 
          prev.filter(restaurant => restaurant._id !== restaurantId)
        )
        if (stats) {
          setStats({
            ...stats,
            pendingRestaurants: stats.pendingRestaurants - 1
          })
        }
      }
    } catch (error) {
      console.error('Error approving restaurant:', error)
    }
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You must be an admin to view this page.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`${
                  activeTab === 'dashboard'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('restaurants')}
                className={`${
                  activeTab === 'restaurants'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
              >
                Restaurant Approvals
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`${
                  activeTab === 'orders'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
              >
                Recent Orders
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'dashboard' && stats && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Utensils className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Restaurants</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalRestaurants}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-semibold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Actions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-yellow-800 font-medium">
                      Restaurants Pending Approval
                    </span>
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                      {stats.pendingRestaurants}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('restaurants')}
                    className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    Manage Restaurant Approvals
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    View Recent Orders
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'restaurants' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Pending Restaurant Approvals ({pendingRestaurants.length})
              </h2>
            </div>
            <div className="p-6">
              {pendingRestaurants.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No pending restaurants for approval.</p>
              ) : (
                <div className="space-y-4">
                  {pendingRestaurants.map(restaurant => (
                    <div key={restaurant._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
                        <p className="text-sm text-gray-600">{restaurant.description}</p>
                        <p className="text-sm text-gray-600">
                          {restaurant.address.city}, {restaurant.address.country}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {restaurant.cuisines.map((cuisine: string) => (
                            <span
                              key={cuisine}
                              className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                            >
                              {cuisine}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleApproveRestaurant(restaurant._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                      >
                        Approve
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            </div>
            <div className="p-6">
              {recentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No recent orders.</p>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map(order => (
                    <div key={order._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">
                            Order #{order._id.slice(-8)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()} at{' '}
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered' 
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900">
                        Total: ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin