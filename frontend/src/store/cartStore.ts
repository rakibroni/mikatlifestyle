import { create } from 'zustand'
import { CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const existingItem = get().items.find(
      (i) => i.product.id === item.product.id && i.size === item.size && i.color === item.color
    )
    if (existingItem) {
      set({
        items: get().items.map((i) =>
          i.product.id === item.product.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      })
    } else {
      set({ items: [...get().items, item] })
    }
  },
  removeItem: (productId, size, color) => {
    set({
      items: get().items.filter(
        (i) => !(i.product.id === productId && i.size === size && i.color === color)
      ),
    })
  },
  updateQuantity: (productId, size, color, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, size, color)
      return
    }
    set({
      items: get().items.map((i) =>
        i.product.id === productId && i.size === size && i.color === color ? { ...i, quantity } : i
      ),
    })
  },
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  },
  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0)
  },
}))
