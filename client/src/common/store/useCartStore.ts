import { create } from 'zustand'
import { CartItem } from '../types/CartItem'

interface CartState {
  items: CartItem[]
  total: number
  addItem: (item: Omit<CartItem, 'cantidad'>) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  removeItem: (id: number) => void
  clearCart: () => void
  calculateTotal: () => void
}

export const useCartStore = create<CartState>()((set, get) => {
  const initialItems =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('cart') || '[]')
      : []

  const initialTotal = initialItems.reduce(
    (acc: number, item: CartItem) => acc + item.precioVenta * item.cantidad,
    0
  )

  return {
    items: initialItems,
    total: initialTotal,

    addItem: newItem => {
      const items = get().items
      const existingItem = items.find(item => item.id === newItem.id)

      let updatedItems

      if (existingItem) {
        updatedItems = items.map(item =>
          item.id === newItem.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      } else {
        updatedItems = [...items, { ...newItem, cantidad: 1 }]
      }

      set({ items: updatedItems })
      localStorage.setItem('cart', JSON.stringify(updatedItems))
      get().calculateTotal()
    },

    increaseQuantity: id => {
      const updatedItems = get().items.map(item =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
      set({ items: updatedItems })
      localStorage.setItem('cart', JSON.stringify(updatedItems))
      get().calculateTotal()
    },

    decreaseQuantity: id => {
      const updatedItems = get().items
        .map(item => {
          if (item.id === id) {
            const newCantidad = item.cantidad - 1
            return newCantidad > 0 ? { ...item, cantidad: newCantidad } : null
          }
          return item
        })
        .filter(item => item !== null) as CartItem[]

      set({ items: updatedItems })
      localStorage.setItem('cart', JSON.stringify(updatedItems))
      get().calculateTotal()
    },

    removeItem: id => {
      const updatedItems = get().items.filter(item => item.id !== id)
      set({ items: updatedItems })
      localStorage.setItem('cart', JSON.stringify(updatedItems))
      get().calculateTotal()
    },

    clearCart: () => {
      set({ items: [], total: 0 })
      localStorage.removeItem('cart')
    },

    calculateTotal: () => {
      const total = get().items.reduce(
        (acc, item) => acc + item.precioVenta * item.cantidad,
        0
      )
      set({ total })
    },
  }
})
