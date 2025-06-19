'use client'

import { useCartStore } from '@/common/store/useCartStore'
import CartCard from './CartCard'
import { FaTrash } from 'react-icons/fa'
import { useShallow } from 'zustand/shallow'
import { useCartStepsStore } from '@/common/store/useCartStepsStore'

const CartStepOne = () => {
  const { items, removeItem, clearCart, increaseQuantity, total } =
    useCartStore(
      useShallow(state => ({
        items: state.items,
        removeItem: state.removeItem,
        clearCart: state.clearCart,
        increaseQuantity: state.increaseQuantity,
        total: state.total,
      }))
    )

  const { indicaciones, setIndicaciones } = useCartStepsStore(
    useShallow(state => ({
      indicaciones: state.indicaciones,
      setIndicaciones: state.setIndicaciones,
    }))
  )

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center">
      <div className="w-full grid grid-cols-[17%_65%_17%] gap-6 items-start justify-center">
        <div className="w-full">{/*Simula una primera columna */}</div>
        <div className="w-full h-full flex flex-col gap-10 justify-between items-center">
          {items.map(item => (
            <CartCard
              key={`item-carrito-${item.id}`}
              item={item}
              increaseQuantity={increaseQuantity}
              removeItem={removeItem}
            />
          ))}
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            onClick={clearCart}
            className="w-[80% ] px-4 py-2 bg-red-800 text-white rounded flex items-center justify-center gap-2 hover:bg-red-600 cursor-pointer"
          >
            Vaciar carrito
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="w-[60%] h-12 my-6 flex items-center justify-center">
        <input
          type="text"
          placeholder="Agregar indicaciones para el pedido"
          value={indicaciones ? indicaciones : ''}
          onChange={e => setIndicaciones(e.target.value)}
          className="w-full h-full p-4 bg-neutral-950 border-1 border-neutral-800 rounded-full"
        />
      </div>
      <hr className="mt-12 my-4 border-1 w-[100%]" />
      <div className="w-[80%] flex items-center justify-between font-bold text-4xl">
        <p>TOTAL:</p>
        <p>${total.toFixed(2)}</p>
      </div>
      <hr className="my-4 border-1 w-[100%]" />
    </div>
  )
}

export default CartStepOne
