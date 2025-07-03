'use client'

import Image from 'next/image'
import Button from './Button'
import { FaShoppingCart } from 'react-icons/fa'
import { useCartStore } from '@/common/store/useCartStore'
import { Producto } from '@/common/types/Producto'

type Props = {
  producto: Producto
}

const CardProducto = ({ producto }: Props) => {
  //Obtenemos la primer imagen del producto
  const imagenUrl =
    producto.imagenesUrls && producto.imagenesUrls.length > 0
      ? producto.imagenesUrls[0]
      : producto.categoriaDenominacion === 'Manufacturados'
      ? '/images/menu/noimage-burger.webp'
      : '/images/menu/noimage-drink.webp' // Imagen por defecto si no tiene

  const addItem = useCartStore(state => state.addItem)

  const handleAgregarAlCarrito = () => {
    addItem({
      id: producto.id!,
      denominacion: producto.denominacion,
      categoriaId: producto.categoriaId,
      precioVenta: producto.precioVenta,
      descripcion: producto.descripcion,
      imagen: imagenUrl,
    })
  }

  //Se definen los distintos tipos de colores de fondo según el tipo de producto o su estado
  let bg
  if (!producto.productoActivo) {
    bg = 'bg-[#4D4D4D] text-white' // Inactivo
  } else if (
    producto.categoriaPadre?.toUpperCase() === 'MANUFACTURADO' &&
    producto.categoriaDenominacion?.toUpperCase() === 'HAMBURGUESAS'
  ) {
    bg = 'bg-black text-[#E34234]' // Hamburguesas
  } else if (
    producto.categoriaPadre?.toUpperCase() === 'MANUFACTURADO' &&
    producto.categoriaDenominacion?.toUpperCase() === 'SIDES'
  ) {
    bg = 'bg-[#5A0F0F] text-white' // Sides
  } else if (producto.categoriaPadre?.toUpperCase() === 'BEBIDAS') {
    bg = 'bg-[#331818] text-white' // Bebidas
  } else if (producto.categoriaPadre?.toUpperCase() === 'COMBOS') {
    bg = 'bg-[#331818] text-white' // Promos
  } else {
    bg = 'bg-[#331818] text-white' // Default
  }

  return (
    <div
      className={`${bg} w-[380px] min-h-[380px] flex flex-col items-center justify-center rounded-xl`}
    >
      <img
        src={imagenUrl}
        alt={`Imagen de producto ${producto.denominacion}`}
        width={
          producto.imagenesUrls && producto.imagenesUrls.length > 0 ? 230 : 180
        }
        height={
          producto.imagenesUrls && producto.imagenesUrls.length > 0 ? 230 : 180
        }
      />
      <div
        className={`w-[80%] flex flex-col justify-center items-center text-center ${
          !producto.descripcion && 'mt-4'
        }`}
      >
        <h1 className="oi text-2xl">{producto.denominacion}</h1>
        {!producto.productoActivo && (
          <h3 className="text-white montserrat font-semibold text-center w-[90%] text-sm">
            No disponible en este momento.
          </h3>
        )}

        {producto.descripcion && (
          <h3 className="text-white montserrat font-semibold text-center w-[90%] text-sm">
            {producto.descripcion}
          </h3>
        )}
      </div>

      <div className="flex gap-5 items-center justify-center">
        <h3 className="text-white font-semibold text-center text-lg">
          ${producto.precioVenta}
        </h3>
        {producto.productoActivo && (
          <Button
            icon={<FaShoppingCart size={18} />}
            onClick={handleAgregarAlCarrito}
          />
        )}
      </div>
    </div>
  )
}

export default CardProducto
