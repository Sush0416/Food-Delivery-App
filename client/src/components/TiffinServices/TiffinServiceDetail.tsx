import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Star, 
  Utensils, 
  Award, 
  Zap, 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin 
} from 'lucide-react';
import { Restaurant, MenuItem } from '../../types';

// Create a simplified menu item type for the sample data
interface SampleMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  dietary: string[];
}

const TiffinServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  useEffect(() => {
    loadTiffinService();
  }, [id]);

  const loadTiffinService = () => {
    // Mock data for individual tiffin service
    const mockServices: Restaurant[] = [
      {
        _id: '1',
        name: 'Auntie\'s Kitchen',
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
        contact: {
          phone: '+91-9876543210',
          email: 'auntie@example.com'
        },
        isActive: true,
        createdBy: 'admin',
        createdAt: new Date().toISOString(),
        image: "/Auntie Kitchen.jpg",
        features: ['Fresh ingredients', 'Traditional recipes', 'Customizable portions']
      },
      {
        _id: '2',
        name: 'Grandma\'s Tiffin',
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
        contact: {
          phone: '+91-9876543211',
          email: 'grandma@example.com'
        },
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
        contact: {
          phone: '+91-9876543212',
          email: 'spice@example.com'
        },
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
        contact: {
          phone: '+91-9876543213',
          email: 'healthy@example.com'
        },
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
        contact: {
          phone: '+91-9876543214',
          email: 'royal@example.com'
        },
        isActive: true,
        createdBy: 'admin',
        createdAt: new Date().toISOString(),
        image: '/Royal Feast Tiffin.jpg',
        features: ['Royal recipes', 'Festive meals', 'Premium ingredients']
      },
      {
        _id: '6',
        name: 'Quick & Tasty Tiffin',
        description: 'Fast, delicious meals for busy professionals who don\'t compromise on taste.',
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
        contact: {
          phone: '+91-9876543215',
          email: 'quick@example.com'
        },
        isActive: true,
        createdBy: 'admin',
        createdAt: new Date().toISOString(),
        image: '/Quick & Tasty Tiffin.jpg',
        features: ['Quick preparation', 'Busy professional friendly', 'Variety of options']
      }
    ];

    const foundService = mockServices.find(s => s._id === id);
    setService(foundService || null);
    setLoading(false);
  };

  const plans = {
    daily: { price: 99, description: 'Perfect for trying out our service' },
    weekly: { price: 89, description: 'Best value with 1 day free' },
    monthly: { price: 79, description: 'Most popular with 4 days free' }
  };

  const sampleMenu: SampleMenuItem[] = [
    {
      id: '1',
      name: 'Paneer Butter Masala',
      description: 'Creamy paneer curry with rich tomato gravy',
      price: 120,
      image: '/Paneer Butter Masala.jpg',
      category: 'Main Course',
      dietary: ['vegetarian']
    },
    {
      id: '2',
      name: 'Chicken Biryani',
      description: 'Aromatic basmati rice with tender chicken and spices',
      price: 150,
      image: '/Chicken Biryani.jpg',
      category: 'Main Course',
      dietary: ['non-vegetarian']
    },
    {
      id: '3',
      name: 'Dal Tadka',
      description: 'Yellow lentils tempered with ghee and spices',
      price: 80,
      image: '/Dal Tadka.jpg',
      category: 'Main Course',
      dietary: ['vegetarian', 'vegan']
    },
    {
      id: '4',
      name: 'Mixed Vegetable Curry',
      description: 'Seasonal vegetables in a flavorful curry',
      price: 90,
      image: '/Mixed Vegetable Curry.jpg',
      category: 'Main Course',
      dietary: ['vegetarian', 'vegan']
    },
    {
      id: '5',
      name: 'Jeera Rice',
      description: 'Basmati rice tempered with cumin seeds',
      price: 60,
      image: '/Jeera Rice.jpg',
      category: 'Rice',
      dietary: ['vegetarian', 'vegan']
    },
    {
      id: '6',
      name: 'Raita',
      description: 'Yogurt with cucumber and spices',
      price: 40,
      image: '/Raita.jpg',
      category: 'Side Dish',
      dietary: ['vegetarian']
    }
  ];

  const handleSubscribe = () => {
    try {
      console.log('handleSubscribe called');
      console.log('Subscribe button clicked');
      console.log('Selected plan:', selectedPlan);
      console.log('Service data:', service);

      const planRoutes = {
        daily: '/daily-plan',
        weekly: '/weekly-plan',
        monthly: '/monthly-plan'
      };

      const route = planRoutes[selectedPlan];
      console.log('Navigating to route:', route);

      navigate(route, {
        state: {
          service,
          selectedPlan,
          planDetails: plans[selectedPlan]
        }
      });
    } catch (error) {
      console.error('Error in handleSubscribe:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
          <button
            onClick={() => navigate('/tiffin')}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Back to Tiffin Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/tiffin')}
          className="flex items-center text-orange-600 hover:text-orange-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tiffin Services
        </button>

        {/* Service Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={service.image || '/placeholder-food.jpg'}
                alt={service.name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Tiffin Service
                </div>
              </div>

              <p className="text-gray-600 mb-6">{service.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="text-gray-700">{service.rating} rating</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">{service.deliveryTime} min delivery</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">{service.address.city}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">{service.contact.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {service.cuisines.map((cuisine: string) => (
                  <span
                    key={cuisine}
                    className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Features:</h3>
                <ul className="space-y-1">
                  {service.features?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <Zap className="h-4 w-4 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Choose Your Subscription Plan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.entries(plans).map(([plan, details]) => (
              <div
                key={plan}
                className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                  selectedPlan === plan
                    ? 'border-orange-500 bg-orange-50 shadow-lg'
                    : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedPlan(plan as 'daily' | 'weekly' | 'monthly')}
              >
                {plan === 'weekly' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-4">
                  <div className="text-orange-500 mb-2">
                    {plan === 'daily' ? <Utensils className="h-6 w-6" /> :
                     plan === 'weekly' ? <Calendar className="h-6 w-6" /> :
                     <Award className="h-6 w-6" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">
                    {plan} Plan
                  </h3>
                </div>
                <p className="text-3xl font-bold text-orange-500 mb-2 text-center">
                  ₹{details.price}
                  <span className="text-sm text-gray-600 font-normal">/meal</span>
                </p>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {details.description}
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Zap className="h-3 w-3 mr-2 text-green-500" />
                    <span>2 meals per day (Lunch + Dinner)</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-3 w-3 mr-2 text-green-500" />
                    <span>{plan === 'daily' ? 'Flexible timing' : plan === 'weekly' ? 'Build Your Own Tiffin' : 'Advanced customization'}</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-3 w-3 mr-2 text-green-500" />
                    <span>{plan === 'daily' ? 'Cancel anytime' : plan === 'weekly' ? 'Priority delivery' : 'Dedicated support'}</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleSubscribe}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 transform hover:scale-105"
            >
              Subscribe to {selectedPlan} Plan
            </button>
          </div>
        </div>

        {/* Menu Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Menu</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleMenu.map((item: SampleMenuItem) => (
              <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <span className="text-orange-500 font-bold">₹{item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{item.category}</span>
                    <div className="flex gap-1">
                      {item.dietary.map((diet: string) => (
                        <span
                          key={diet}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full capitalize"
                        >
                          {diet}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">{service.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">{service.contact.email}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">
                    {service.address.street}<br />
                    {service.address.city}, {service.address.state}<br />
                    {service.address.country} - {service.address.zipCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiffinServiceDetail;