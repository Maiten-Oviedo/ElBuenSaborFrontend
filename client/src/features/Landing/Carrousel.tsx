'use client'

import React, { useEffect, useState } from 'react'
import Button from '@/common/components/ui/Button'
import {
  FlechaDerecha,
  FlechaIzquierda,
} from '../../../public/svg/flechasCarrusel'
import Image from 'next/image'
import httpClient from '@/common/lib/httpClient'
import { IArticuloManufacturado } from '@/common/types/entitites/IArticuloManufacturado'

const Carousel: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [topProductos, setTopProductos] = useState<IArticuloManufacturado[]>([])

  //Traer productos y rankearlos por cantVendidos en un top 3
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await httpClient().get(
          'http://localhost:8080/articulo-manufacturado/basic/getAll'
        )

        // Ordenar por cantVendidos y tomar los top 3
        const top: IArticuloManufacturado[] = [...response]
          .sort((a, b) => (b.cantVendidos || 0) - (a.cantVendidos || 0))
          .slice(0, 3)

        setTopProductos(top)
      } catch (error) {
        console.error('Error al obtener los productos', error)
      } finally {
        setLoading(false)
      }
    }

    obtenerProductos()
  }, [])

  //Ir un item atras
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? topProductos.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  //Ir un item adelante
  const goToNext = () => {
    const isLastSlide = currentIndex === topProductos.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  if (loading) return <p>Cargando Productos</p>

  return (
    <div className="flex flex-col sm:gap-2 items-center">
      <div>
        <h2
          className="montserrat font-extrabold italic text-4xl text-center shadow-md text-white"
          style={{ filter: 'drop-shadow(11px 12px 14px rgba(0, 0, 0, 0.72))' }}
        >
          LOS <br />
          <span className="oi text-8xl leading-[1.4] shadow-text-xl not-italic font-light">
            favoritos
          </span>
          <br />
          DE LA CASA
        </h2>
      </div>
      {/* CARROUSEL */}
      <div className="flex justify-center flex-col items-center h-[700px]">
        {/* Imagen */}
        <picture className="transition-all h-[500px]">
          {topProductos.length > 0 && (
            <Image
              src={
                topProductos[currentIndex].imagenesUrls!.length > 0
                  ? topProductos[currentIndex].imagenesUrls![0]
                  : '/default-image.png'
              }
              alt={topProductos[currentIndex].denominacion}
              width={500}
              height={500}
            />
          )}
        </picture>

        {/* Navegación y texto del slide */}
        <nav className="flex justify-between items-center gap-4 w-[85vw] sm:w-[50vw]">
          <button
            className="group self-start sm:self-auto mt-4 sm:mt-0 hover:bg-transparent"
            onClick={goToPrevious}
          >
            <FlechaIzquierda className="hover:fill-white group-hover:scale-125 size-12 sm:size-16 transition-all duration-500 cursor-pointer" />
          </button>
          <div className="flex flex-col gap-8 items-center text-center shadow-text  leading-10 text-white">
            <h2
              className="oi text-6xl"
              style={{
                filter: 'drop-shadow(11px 12px 14px rgba(0, 0, 0, 0.72))',
              }}
            >
              {topProductos[currentIndex]?.denominacion}
            </h2>
            <Button>PEDIR AHORA</Button>
          </div>
          <button
            className="group self-start sm:self-auto mt-4 sm:mt-0 hover:bg-transparent"
            onClick={goToNext}
          >
            <FlechaDerecha className="hover:fill-white group-hover:scale-125 size-12 sm:size-16 transition-all duration-500 cursor-pointer" />
          </button>
        </nav>
      </div>
    </div>
  )
}

export default Carousel
