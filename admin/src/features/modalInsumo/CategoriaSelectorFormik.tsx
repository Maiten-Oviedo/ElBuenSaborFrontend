// components/CategoriaSelectorFormik.tsx
'use client'
import { useField, useFormikContext } from 'formik'
import { useEffect, useState } from 'react'
import { ICategoria } from '@/common/types/entities/ICategoria'
import httpClient from '@/common/lib/httpClient'
import { IArticuloInsumo } from '@/common/types/entities/IArticuloInsumo'

interface Props {
  name: string
}

interface PasoCategoria {
  categoriaActual: ICategoria
  subcategorias: ICategoria[]
}

export default function CategoriaSelectorFormik({ name }: Props) {
  const [field, , helpers] = useField<number>(name)
  const { setFieldValue } = useFormikContext<IArticuloInsumo>() // o <IArticuloInsumo> si querés más tipado

  const [categorias, setCategorias] = useState<ICategoria[]>([])
  const [categoriaActual, setCategoriaActual] = useState<ICategoria>({
    id: 2,
    denominacion: 'Insumos',
  })
  const [historial, setHistorial] = useState<PasoCategoria[]>([])

  useEffect(() => {
    const fetchSubcategorias = async () => {
      try {
        const res = await httpClient().get(
          `http://localhost:8080/categoria/getComplete/${categoriaActual.id}`
        )
        const data = res as ICategoria
        const subs = data.subcategorias ?? []

        const subsOrdenadas = subs.sort((a, b) =>
          a.denominacion.localeCompare(b.denominacion)
        )

        setCategorias(subsOrdenadas)
        setCategoriaActual({
          id: data.id,
          denominacion: data.denominacion,
          categoriaPadre: data.categoriaPadre,
        })
      } catch (e) {
        console.error('Error cargando subcategorías', e)
      }
    }

    fetchSubcategorias()
  }, [categoriaActual.id])

  const handleSeleccion = async (categoriaId: number) => {
    if (!categoriaId) return

    setHistorial(prev => [
      ...prev,
      { categoriaActual, subcategorias: categorias },
    ])

    try {
      const res = await httpClient().get(
        `http://localhost:8080/categoria/getComplete/${categoriaId}`
      )
      const data = res as ICategoria
      const subs = data.subcategorias ?? []

      setCategorias(subs)
      setCategoriaActual({
        id: data.id,
        denominacion: data.denominacion,
        categoriaPadre: data.categoriaPadre,
      })

      if (subs.length === 0) {
        helpers.setValue(data.id!) // setea categoriaId
        setFieldValue('categoriaDenominacion', data.denominacion) // ✅ setea categoriaDenominacion
      }
    } catch (e) {
      console.error('Error al seleccionar subcategoría', e)
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
    <div className="space-y-2">
      <p className="text-orange text-lg">
        <span className="text-white">Nuevo Rubro Padre:</span>{' '}
        <span className="font-bold">{categoriaActual.denominacion}</span>
      </p>
      {categorias.length > 0 && (
        <select
          className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {historial.length > 0 && (
        <button
          type="button"
          onClick={volver}
          className="text-white hover:underline cursor-pointer"
        >
          ← Volver
        </button>
      )}
    </div>
  )
}
