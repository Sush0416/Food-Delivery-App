// src/types/restaurant.ts
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  menu: MenuItem[];
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}