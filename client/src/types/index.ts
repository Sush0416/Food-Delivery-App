export interface User {
  _id: string
  name: string
  email: string
  role: 'customer' | 'restaurant' | 'admin'
  avatar?: string
  createdAt: string
}

export interface Restaurant {
  _id: string
  name: string
  description: string
  address: {
    street: string
    city: string
    state: string
    country: string
    zipCode: string
  }
  cuisines: string[]
  rating: number
  deliveryTime: number
  minOrder: number
  contact: {
    phone: string
    email: string
  }
  isActive: boolean
  createdBy: string
  createdAt: string
}

export interface MenuItem {
  _id: string
  restaurantId: string
  name: string
  description: string
  price: number
  category: string
  image: string
  isVegetarian: boolean
  isVegan: boolean
  isGlutenFree: boolean
  isAvailable: boolean
  createdAt: string
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
}

export interface Order {
  _id: string
  userId: string
  restaurantId: string
  items: {
    menuItemId: string
    name: string
    price: number
    quantity: number
  }[]
  totalAmount: number
  deliveryAddress: {
    street: string
    city: string
    state: string
    country: string
    zipCode: string
  }
  status: 'pending' | 'confirmed' | 'preparing' | 'out for delivery' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed'
  paymentMethod: 'card' | 'cash'
  stripePaymentIntentId?: string
  createdAt: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: any) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  loading: boolean
}