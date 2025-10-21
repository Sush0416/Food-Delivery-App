import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, MenuItem } from '../types'

interface CartStore {
  items: CartItem[]
  addItem: (menuItem: MenuItem) => void
  removeItem: (menuItemId: string) => void
  updateQuantity: (menuItemId: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
  calculateTotals: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      addItem: (menuItem: MenuItem) => {
        const items = get().items
        const existingItem = items.find(item => item.menuItem._id === menuItem._id)

        if (existingItem) {
          existingItem.quantity += 1
          set({ items: [...items] })
        } else {
          set({ items: [...items, { menuItem, quantity: 1 }] })
        }
        get().calculateTotals()
      },
      removeItem: (menuItemId: string) => {
        const items = get().items.filter(item => item.menuItem._id !== menuItemId)
        set({ items })
        get().calculateTotals()
      },
      updateQuantity: (menuItemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId)
          return
        }

        const items = get().items
        const item = items.find(item => item.menuItem._id === menuItemId)
        if (item) {
          item.quantity = quantity
          set({ items: [...items] })
          get().calculateTotals()
        }
      },
      clearCart: () => {
        set({ items: [] })
        get().calculateTotals()
      },
      calculateTotals: () => {
        const items = get().items
        const total = items.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0)
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
        set({ total, itemCount })
      }
    }),
    {
      name: 'cart-storage'
    }
  )
)