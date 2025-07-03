'use client'

import ListProducto from '@/features/menu/ListProducto'
import { useSearchStore } from '@/common/store/useSearchStore'
import React, { useEffect, useState } from 'react'
import FiltroProducto from '@/features/menu/FiltroProducto'
import CartPreviewModal from '@/features/cart/CartPreviewModal'
import { useCartStore } from '@/common/store/useCartStore'
import httpClient from '@/common/lib/httpClient'
import { filtrarPorMenu, FiltroMenu } from '@/common/types/FiltroMenu'
import { Producto } from '@/common/types/Producto'
import { useAuthStore } from '@/common/store/useAuthStore'
import { useRouter } from 'next/navigation'

const Menu = () => {
  const [filtroCategoria, setFiltroCategoria] = useState<FiltroMenu>('TODO')
  const [productos, setProductos] = useState<Producto[]>([])
  const logout = useAuthStore(state => state.logout)
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchTerm = useSearchStore(state => state.searchTerm)
  const cartItems = useCartStore(state => state.items)

  const productosFiltrados = productos.filter(
    prod =>
      filtrarPorMenu(filtroCategoria, prod) &&
      prod.denominacion.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])
  useEffect(() => {
    const obtenerDatos = async () => {
      setLoading(true)
      setError(null)
      try {
        //Promesa en paralelo
        const [productosResponse, bebidasResponse, promocionesResponse] =
          await Promise.all([
            httpClient().get(
              'http://localhost:8080/articulo-manufacturado/basic/getAll'
            ),
            httpClient().get(
              'http://localhost:8080/articulo-insumo/vendibles/basic/getAll'
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
      } catch (error: unknown) {
        if ((error as Error).cause === 401) {
          logout()
          router.push('/auth/login')
        }
        setError((error as Error).message || 'Error al cargar los productos')
      } finally {
        setLoading(false)
      }
    }

    obtenerDatos()
  }, [])

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
      {loading && <p className="text-white text-2xl">Cargando Productos...</p>}
      {!loading && !error && productosFiltrados.length && (
        <>
          <FiltroProducto onFiltroChange={setFiltroCategoria} />
          <ListProducto
            productos={productosFiltrados}
            filtroActivo={filtroCategoria}
          />
        </>
      )}
      {!loading && !error && productosFiltrados.length === 0 && (
        <p className="text-white text-2xl">No hay productos disponibles</p>
      )}
      {!loading && error && <p className="text-red-500 text-2xl">{error}</p>}

      {/* MODAL DEL CARRITO */}
      {hasMounted && cartItems.length > 0 && (
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
