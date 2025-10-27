import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Star, Clock, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Restaurant, MenuItem } from '../types';

const RestaurantMenu: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addItem } = useCartStore();

  useEffect(() => {
    if (id) {
      fetchRestaurantAndMenu();
    }
  }, [id]);

  const fetchRestaurantAndMenu = async () => {
    try {
      const [restaurantRes, menuRes] = await Promise.all([
        fetch(`/api/restaurants/${id}`),
        fetch(`/api/menu/restaurant/${id}`)
      ]);

      if (restaurantRes.ok) {
        const restaurantData = await restaurantRes.json();
        setRestaurant(restaurantData.restaurant || restaurantData);
      }

      if (menuRes.ok) {
        const menuData = await menuRes.json();
        setMenuItems(menuData.menuItems || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Restaurant not found</h2>
          <p className="text-gray-600">The restaurant you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/restaurants')}
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Back to Restaurants
          </button>
        </div>
      </div>
    );
  }

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/restaurants')}
            className="flex items-center text-orange-500 hover:text-orange-600 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Restaurants
          </button>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
              <p className="text-gray-600 mb-4">{restaurant.description}</p>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{restaurant.rating} • {restaurant.deliveryTime} min</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Min. order: ${restaurant.minOrder?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
            </div>

            <div className="text-right ml-6">
              <p className="text-sm text-gray-600">Contact</p>
              <p className="font-semibold">{restaurant.contact?.phone || 'N/A'}</p>
              <p className="text-sm text-gray-600">{restaurant.contact?.email || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors duration-200`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors duration-200`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {selectedCategory === 'All' ? (
          // Group by categories when "All" is selected
          categories.map(category => {
            const categoryItems = menuItems.filter(item => item.category === category);
            return (
              <div key={category} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryItems.map(item => (
                    <MenuItemCard key={item._id} item={item} onAddToCart={addItem} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          // Show filtered items when specific category is selected
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <MenuItemCard key={item._id} item={item} onAddToCart={addItem} />
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No menu items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Menu Item Card Component
interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    onAddToCart(item);
    setQuantity(prev => prev + 1);
  };

  const handleIncrement = () => {
    onAddToCart(item);
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200 relative">
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        )}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Unavailable</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          <p className="text-orange-500 font-semibold">${item.price.toFixed(2)}</p>
        </div>

        <p className="text-gray-600 text-sm mb-4">{item.description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {item.isVegetarian && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Vegetarian
            </span>
          )}
          {item.isVegan && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Vegan
            </span>
          )}
          {item.isGlutenFree && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Gluten Free
            </span>
          )}
        </div>

        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            disabled={!item.isAvailable}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {item.isAvailable ? 'Add to Cart' : 'Unavailable'}
          </button>
        ) : (
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handleDecrement}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-semibold">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
