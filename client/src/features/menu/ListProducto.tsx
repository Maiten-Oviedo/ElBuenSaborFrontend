import React from 'react'
import CardProducto from '../../common/components/ui/CardProducto'
import Image from 'next/image'
import { getRubroByCategoriaId } from '@/common/types/FiltroMenu'
import { Producto } from '@/common/types/Producto'

type Props = {
  productos: Producto[]
}

const ListProducto = ({ productos }: Props) => {
  // Agrupar productos por rubro
  const productosPorRubro = productos.reduce((acc, producto) => {
    const rubro = getRubroByCategoriaId(producto.categoriaId)

    if (!acc[rubro]) acc[rubro] = []
    acc[rubro].push(producto)

    return acc
  }, {} as Record<string, Producto[]>)

  return (
    <div className="pt-[50px] ">
      {productos.length === 0 ? (
        <div className="flex items-center justify-center flex-col gap-9">
          <Image
            alt="icono-triste"
            src="/svg/burger-guy-triste.svg"
            width={150}
            height={150}
          />
          <p className="text-center text-white text-2xl font-semibold">
            No encontramos productos que coincidan con tu búsqueda.
          </p>
        </div>
      ) : (
        Object.entries(productosPorRubro).map(([categoria, productos]) => {
          return (
            <div
              key={categoria}
              className="mb-10 flex flex-col items-center w-[100%]"
            >
              <h2 className="text-4xl oi text-left w-[80%] text-white mb-7 border-b border-white px-2">
                {categoria.toLowerCase()}
              </h2>
              <div className="flex flex-wrap justify-center gap-20 w-[70%] ">
                {productos.map(producto => (
                  <CardProducto key={producto.id} producto={producto} />
                ))}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default ListProducto
