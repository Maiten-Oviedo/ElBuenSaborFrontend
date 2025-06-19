'use client'

import React from 'react'
import { useCartStore } from '@/common/store/useCartStore'
import { FaTrash } from 'react-icons/fa'
import { CartItem } from '@/common/types/CartItem'

interface CartCardProps {
  item: CartItem
  increaseQuantity: (id: number) => void
  removeItem?: (id: number) => void
}

const CartCard: React.FC<CartCardProps> = ({ item }) => {
  const increaseQuantity = useCartStore(state => state.increaseQuantity)
  const decreaseQuantity = useCartStore(state => state.decreaseQuantity)
  const removeItem = useCartStore(state => state.removeItem)

  return (
    <div className="w-[45em] min-h-[14em] bg-black rounded-xl pl-4 pr-8 py-5 flex justify-between items-center shadow-xl/30 shadow-[#92140C] gap-8">
      <div className="h-full w-[30%] flex items-center justify-center aspect-square overflow-hidden">
        <img
          src={item.imagen}
          alt={`Imagen de ${item.denominacion}`}
          className="scale-110"
        />
      </div>

      <div className="h-full w-[55%] flex flex-col justify-around items-left">
        <div className="text-left flex flex-col gap-1 ">
          <p className="oi text-[#E34234] text-4xl">{item.denominacion}</p>
          <p className="text-sm">{item.descripcion}</p>
        </div>

        <div className="flex gap-6 items-center font-extrabold text-xl">
          <button
            onClick={() => decreaseQuantity(item.id!)}
            className="w-[40px] h-[40px] rounded-3xl px-2 py-1 bg-[#6C6C6C] text-white hover:bg-[#3e3e3e] cursor-pointer"
          >
            -
          </button>
          <p className="text-2xl">{item.cantidad}</p>
          <button
            onClick={() => increaseQuantity(item.id!)}
            className="w-[40px] h-[40px] rounded-3xl px-2 py-1 bg-[#B85607] text-white hover:bg-[#823200] cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      <div className="h-full w-[15%] flex flex-col justify-between items-end text-right">
        <button
          onClick={() => removeItem(item.id!)}
          className="w-[36px] h-[36px] flex items-center justify-center px-2 py-1 bg-red-800 text-white rounded-full hover:bg-red-600 cursor-pointer"
        >
          <FaTrash />
        </button>

        <div>
          <p className="text-nowrap text-xs italic text-gray-500">
            Precio unitario: ${item.precioVenta.toFixed(2)}
          </p>
          <p className="text-3xl font-extrabold">
            ${(item.precioVenta * item.cantidad).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartCard
