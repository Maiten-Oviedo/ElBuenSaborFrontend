'use client'
import GenericTable from '@/common/components/generic table/GenericTable'
import { manufacturadosRubroTableColumns } from '@/common/lib/constants/manufacturado'
import { useStoreCategoriasInsumos } from '@/store/storeCategoriasInsumos'
import { useStoreCategoriasManufacturados } from '@/store/storeCategoriasManufacturados'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi'

export default function Page() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const setCategoriesInsumos = useStoreCategoriasInsumos(
    state => state.setCategoriesInsumos
  )
  const fetchAndSetCategorias = useStoreCategoriasManufacturados(
    state => state.fetchAndSetCategorias
  )
  const data = useStoreCategoriasManufacturados(state => state.data)

  const shouldRefresh = useStoreCategoriasManufacturados(
    state => state.shouldRefresh
  )
  const setShouldRefresh = useStoreCategoriasManufacturados(
    state => state.setShouldRefresh
  )

  useEffect(() => {
    const shouldFetch = shouldRefresh || data.length === 0
    if (!shouldFetch) return

    const fetch = async () => {
      setLoading(true)
      setError(null)
      const result = await fetchAndSetCategorias(setCategoriesInsumos)
      if (!result.success) setError(result.error || 'Error desconocido')
      setLoading(false)
      setShouldRefresh(false)
    }

    fetch()
  }, [shouldRefresh, data.length])

  return (
    <>
      <header className="flex justify-between items-center text-white mb-4">
        <h1 className="font-semibold">PRODUCTOS &gt; RUBROS</h1>
        <Link
          href="/productos/rubros/crear"
          className="flex items-center gap-1 rounded-2xl px-3 py-1 bg-orange font-semibold hover:bg-brown hover:scale-105 transition-all"
        >
          <BiPlus className="size-8" /> <span>Agregar Rubro</span>
        </Link>
      </header>
      <main>
        <GenericTable
          dataType="productos"
          columns={manufacturadosRubroTableColumns}
          data={data}
          isLoading={loading}
          error={error}
          section="rubros"
        />
      </main>
    </>
  )
}
