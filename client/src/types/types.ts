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
  isApproved?: boolean
  createdBy: string
  createdAt: string
  features?: string[] // New field for restaurant features
  image?: string // New field for restaurant image
}

export interface MenuItem {
  _id: string
  restaurantId: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  isVegetarian?: boolean
  isVegan?: boolean
  isGlutenFree?: boolean
  isAvailable: boolean
  ingredients?: string[]
  allergens?: string[]
  preparationTime?: number
  spiceLevel?: string
  calories?: number
  tags?: string[]
}
