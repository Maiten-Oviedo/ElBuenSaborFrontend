'use client'
import httpClient from '@/common/lib/httpClient'
import { ICategoria } from '@/common/types/entities/ICategoria'
import { useEffect, useState } from 'react'

type PasoCategoria = {
  categoriaActual: ICategoria
  subcategorias: ICategoria[]
}

interface Props {
  prevCategory?: { id: number | undefined; denominacion: string | undefined }
  onCategoriaSeleccionada?: (id: number) => void
}

export default function CategoriaSelector({
  onCategoriaSeleccionada,
  prevCategory,
}: Props) {
  const [categorias, setCategorias] = useState<ICategoria[]>([])
  const [categoriaActual, setCategoriaActual] = useState<ICategoria>({
    denominacion: 'Manufacturado',
    id: 1,
  })
  const [historial, setHistorial] = useState<PasoCategoria[]>([])

  useEffect(() => {
    const fetchSubsCat = async () => {
      try {
        const response = await httpClient().get(
          `http://localhost:8080/categoria/getComplete/${categoriaActual.id}`
        )
        const data = response as ICategoria

        const subcategorias =
          data.subcategorias?.filter(item => item.denominacion !== 'Combos') ??
          []

        setCategorias(subcategorias)

        setCategoriaActual({
          id: data.id,
          denominacion: data.denominacion,
          categoriaPadre: data.categoriaPadre,
        })
      } catch (error) {
        console.error('Error cargando subcategorías', error)
      }
    }
    fetchSubsCat()
  }, [])

  const handleSeleccion = async (categoriaId: number) => {
    if (!categoriaId) return

    setHistorial(prev => [
      ...prev,
      { categoriaActual, subcategorias: categorias },
    ])

    try {
      const response = await httpClient().get(
        `http://localhost:8080/categoria/getComplete/${categoriaId}`
      )
      const data = response as ICategoria

      const subcategorias = data.subcategorias ?? []

      setCategorias(subcategorias)
      setCategoriaActual({
        id: data.id,
        denominacion: data.denominacion,
        categoriaPadre: data.categoriaPadre,
      })

      // 🔥 Acá actualizás el formOneValues
      console.log('NUEVO ID: ', data.id)
      onCategoriaSeleccionada?.(data.id!)
    } catch (error) {
      console.error('Error cargando subcategorías', error)
    }
  }

  const volver = () => {
    if (historial.length === 0) return
    const anterior = historial[historial.length - 1]
    setCategoriaActual(anterior.categoriaActual)
    setCategorias(anterior.subcategorias)
    setHistorial(prev => prev.slice(0, -1))
  }

  return (
    <>
      <div className={`max-w-md mx-auto mt-10 space-y-4`}>
        <h2 className="text-xl font-semibold text-center">Editar Categoría</h2>

        {categoriaActual && (
          <>
            {prevCategory &&
              prevCategory?.denominacion !== categoriaActual.denominacion && (
                <div className="text-gray-700 flex gap-1 items-center">
                  <span className=" text-white text-lg">Categoría actual:</span>
                  <span className="font-bold text-white text-lg">
                    {prevCategory.denominacion}
                  </span>
                </div>
              )}
            <div className="text-gray-700 flex gap-1 items-center">
              <span className="text-white text-lg">Nueva categoria: </span>
              <span className="font-bold text-orange text-lg">
                {categoriaActual.denominacion}
              </span>
            </div>
          </>
        )}

        {categorias.length > 0 && (
          <select
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value=""
            onChange={e => handleSeleccion(Number(e.target.value))}
          >
            <option value="" disabled>
              Selecciona una subcategoría
            </option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id} className="text-black">
                {cat.denominacion}
              </option>
            ))}
          </select>
        )}

        {/* Este bloque queda fuera del condicional de categorias */}
        {historial.length > 0 && (
          <div className="flex gap-4">
            <button
              onClick={volver}
              className="text-white hover:underline cursor-pointer"
            >
              ← Categoría Anterior
            </button>
          </div>
        )}
      </div>
    </>
  )
}
