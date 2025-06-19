'use client'

import ListProducto from '@/features/menu/ListProducto'
import { useSearchStore } from '@/common/store/useSearchStore'
import React, { useEffect, useState } from 'react'
import FiltroProducto from '@/features/menu/FiltroProducto'
import CartPreviewModal from '@/features/cart/CartPreviewModal'
import { useCartStore } from '@/common/store/useCartStore'
import httpClient from '@/common/lib/httpClient'
import { categoriaMap, FiltroMenu } from '@/common/types/FiltroMenu'
import { Producto } from '@/common/types/Producto'

const Menu = () => {
  const [filtroCategoria, setFiltroCategoria] = useState<FiltroMenu>('TODO')
  const [productos, setProductos] = useState<Producto[]>([])

  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState(false)

  const searchTerm = useSearchStore(state => state.searchTerm)
  const cartItems = useCartStore(state => state.items)

  const productosFiltrados = productos.filter(prod => {
    const categoriaFiltro = categoriaMap[filtroCategoria]

    const matchCategoria =
      categoriaFiltro === null ||
      (Array.isArray(categoriaFiltro)
        ? categoriaFiltro.includes(prod.categoriaId)
        : prod.categoriaId === categoriaFiltro)

    return (
      matchCategoria &&
      prod.denominacion.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        //Promesa en paralelo
        const [productosResponse, bebidasResponse, promocionesResponse] =
          await Promise.all([
            httpClient().get(
              'http://localhost:8080/articulo-manufacturado/basic/getAll'
            ),
            httpClient().get(
              'http://localhost:8080/articulo-insumo/bebidas/basic/getAll'
            ),
            httpClient().get(
              'http://localhost:8080/articulo-promocion/basic/getAll'
            ),
          ])

        setProductos([
          ...productosResponse,
          ...bebidasResponse,
          ...promocionesResponse,
        ])
      } catch (error) {
        console.error('Error al obtener los productos y bebidas', error)
      } finally {
        setLoading(false)
      }
    }

    obtenerDatos()
  }, [])

  if (loading) return <p>Cargando Productos</p>

  return (
    <div
      className="bg-[#5A0F0F] flex flex-col items-center justify-start pt-[150px] min-h-screen"
      style={{
        backgroundImage: "url('/images/landing/fondoRojoConPapas.webp')",
        backgroundRepeat: 'repeat-y',
        backgroundSize: '100%',
        backgroundAttachment: 'scroll',
      }}
    >
      <FiltroProducto onFiltroChange={setFiltroCategoria} />
      <ListProducto productos={productosFiltrados} />

      {/* MODAL DEL CARRITO */}
      {cartItems.length > 0 && (
        <div
          className={`
                        fixed top-28 right-0 h-[80vh] w-[25%] bg-white shadow-lg z-50 rounded-l-2xl
                        transition-all duration-300
                        ${hovered ? 'translate-x-0' : 'translate-x-[90%]'}
                    `}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <CartPreviewModal />
        </div>
      )}
    </div>
  )
}
export default Menu
