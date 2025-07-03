import React from 'react'
import CardProducto from '../../common/components/ui/CardProducto'
import Image from 'next/image'
import { Producto } from '@/common/types/Producto'
import { FiltroMenu } from '@/common/types/FiltroMenu'

type Props = {
  productos: Producto[]
  filtroActivo: FiltroMenu
}

const ListProducto = ({ productos, filtroActivo }: Props) => {
  const seccionesTodo: {
    titulo: string
    filtro: (prod: Producto) => boolean
  }[] = [
    {
      titulo: 'HAMBURGUESAS',
      filtro: prod =>
        prod.categoriaPadre?.toUpperCase() === 'MANUFACTURADO' &&
        prod.categoriaDenominacion?.toUpperCase() === 'HAMBURGUESAS',
    },
    {
      titulo: 'SIDES',
      filtro: prod =>
        prod.categoriaPadre?.toUpperCase() === 'MANUFACTURADO' &&
        prod.categoriaDenominacion?.toUpperCase() === 'SIDES',
    },
    {
      titulo: 'BEBIDAS',
      filtro: prod => prod.categoriaPadre?.toUpperCase() === 'BEBIDAS',
    },
    {
      titulo: 'PROMOS',
      filtro: prod => prod.categoriaPadre?.toUpperCase() === 'COMBOS',
    },
    {
      titulo: 'OTROS',
      filtro: prod =>
        prod.categoriaPadre?.toUpperCase() !== 'MANUFACTURADO' &&
        prod.categoriaPadre?.toUpperCase() !== 'BEBIDAS' &&
        prod.categoriaPadre?.toUpperCase() !== 'COMBOS',
    },
  ]

  return (
    <div className="pt-[50px]">
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
      ) : filtroActivo === 'TODO' ? (
        seccionesTodo.map(({ titulo, filtro }) => {
          const productosFiltrados = productos.filter(filtro)
          if (productosFiltrados.length === 0) return null

          return (
            <div
              key={titulo}
              className="mb-10 flex flex-col items-center w-[100%]"
            >
              <h2 className="text-4xl oi text-left w-[80%] text-white mb-7 border-b border-white px-2">
                {titulo.toLowerCase()}
              </h2>
              <div className="flex flex-wrap justify-center gap-20 w-[70%]">
                {productosFiltrados.map(producto => (
                  <CardProducto key={producto.id} producto={producto} />
                ))}
              </div>
            </div>
          )
        })
      ) : (
        <div className="mb-10 flex flex-col items-center w-[100%]">
          <h2 className="text-4xl oi text-left w-[80%] text-white mb-7 border-b border-white px-2">
            {filtroActivo.toLowerCase()}
          </h2>
          <div className="flex flex-wrap justify-center gap-20 w-[70%]">
            {productos.map(producto => (
              <CardProducto key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ListProducto
