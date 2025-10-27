import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { ArrowLeft, Star, Clock, Plus, Minus } from 'lucide-react';
import { Restaurant, MenuItem } from '../types';
import { sampleRestaurants, sampleMenuItems } from '../data/sampleData';

// Constants for better maintainability
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=80&h=80&fit=crop';
const IMAGE_FALLBACKS = {
  pizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
  salad: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
  bread: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&h=300&fit=crop',
  beverage: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop',
};

const MenuScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem, removeItem, updateQuantity, items } = useCartStore();

  // Memoized data fetching function
  const fetchRestaurantAndMenu = useCallback(async () => {
    if (!id) {
      setError('Restaurant ID is missing');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Find the restaurant from sample data
      const restaurantData = sampleRestaurants.find(restaurant => restaurant._id === id);

      if (!restaurantData) {
        setError('Restaurant not found');
        setLoading(false);
        return;
      }

      // Get menu items for this restaurant
      const menuData = sampleMenuItems[id] || [];

      setRestaurant(restaurantData);
      setMenuItems(menuData);
    } catch (err) {
      console.error('Error fetching restaurant data:', err);
      setError('Failed to load restaurant menu. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRestaurantAndMenu();
  }, [fetchRestaurantAndMenu]);

  // Memoized cart calculations
  const getCartItemQuantity = useCallback((menuItemId: string) => {
    const cartItem = items.find(item => item.menuItem._id === menuItemId);
    return cartItem ? cartItem.quantity : 0;
  }, [items]);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);
  }, [items]);

  const getCartQuantity = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  // Cart action handlers
  const handleAddToCart = (item: MenuItem) => {
    if (!item.isAvailable) return;
    addItem(item);
  };

  const handleRemoveFromCart = (menuItemId: string) => {
    const currentQuantity = getCartItemQuantity(menuItemId);
    if (currentQuantity > 1) {
      updateQuantity(menuItemId, currentQuantity - 1);
    } else {
      removeItem(menuItemId);
    }
  };

  const handleIncrementQuantity = (item: MenuItem) => {
    handleAddToCart(item);
  };

  const handleDecrementQuantity = (menuItemId: string) => {
    handleRemoveFromCart(menuItemId);
  };

  // Image error handler
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = event.target as HTMLImageElement;
    target.src = IMAGE_FALLBACKS.pizza;
  };

  // Group menu items by category
  const menuItemsByCategory = menuItems.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error ? 'Error Loading Menu' : 'Restaurant Not Found'}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The restaurant you're looking for doesn't exist."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate('/restaurants')}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Browse Restaurants
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                {getCartQuantity() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getCartQuantity()}
                  </span>
                )}
                <button
                  onClick={() => navigate('/cart')}
                  className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  aria-label={`View cart with ${getCartQuantity()} items`}
                >
                  Cart
                </button>
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{restaurant.name} Menu</h1>
        </div>
      </header>

      {/* Restaurant Info */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start space-x-4">
            <img
              src={restaurant.image || FALLBACK_IMAGE}
              alt={restaurant.name}
              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              onError={handleImageError}
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-gray-900 truncate">{restaurant.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{restaurant.cuisines?.join(', ')}</p>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2">{restaurant.description}</p>
              
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-gray-700 font-medium">{restaurant.rating}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-gray-700">{restaurant.deliveryTime} min</span>
                </div>
                <div className="text-sm text-gray-700">
                  Min. order: ₹{restaurant.minOrder}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items by Category */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {Object.entries(menuItemsByCategory).map(([category, items]) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              {category}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => {
                const quantity = getCartItemQuantity(item._id);
                const isItemAvailable = item.isAvailable;

                return (
                  <article 
                    key={item._id} 
                    className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md ${
                      !isItemAvailable ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="h-48 bg-gray-100 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                      {!isItemAvailable && (
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-semibold bg-gray-800 px-3 py-1 rounded-lg">
                            Currently Unavailable
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 pr-2">{item.name}</h3>
                        <span className="text-lg font-bold text-orange-500 whitespace-nowrap">
                          ₹{item.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                      {/* Dietary badges */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.isVegetarian && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                            Vegetarian
                          </span>
                        )}
                        {item.isVegan && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                            Vegan
                          </span>
                        )}
                        {item.isGlutenFree && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                            Gluten Free
                          </span>
                        )}
                      </div>

                      {/* Add to Cart / Quantity Controls */}
                      {isItemAvailable ? (
                        quantity === 0 ? (
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => handleDecrementQuantity(item._id)}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg w-10 h-10 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                              aria-label={`Remove one ${item.name}`}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            
                            <span className="font-semibold text-lg text-gray-900 mx-4 min-w-8 text-center">
                              {quantity}
                            </span>
                            
                            <button
                              onClick={() => handleIncrementQuantity(item)}
                              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg w-10 h-10 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                              aria-label={`Add one more ${item.name}`}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        )
                      ) : (
                        <button
                          disabled
                          className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-medium cursor-not-allowed"
                        >
                          Unavailable
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {/* Cart Summary Footer */}
      {items.length > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-lg font-semibold text-gray-900">
                  Total: ₹{getTotalPrice().toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">
                  {getCartQuantity()} item{getCartQuantity() !== 1 ? 's' : ''} in cart
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => navigate('/cart')}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
                >
                  View Cart
                </button>
                <button
                  onClick={() => navigate('/checkout')}
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium shadow-sm"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default MenuScreen;