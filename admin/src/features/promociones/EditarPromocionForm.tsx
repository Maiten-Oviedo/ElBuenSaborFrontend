'use client'

import { Field, ErrorMessage } from 'formik'
import Button from '@/common/components/button/Button'
import { useCategorias } from '@/common/hooks/useCategorias'
import { useEffect, useMemo } from 'react'
import ImagenesInputFormik from '../modalInsumo/ImagenesInputFormik'
import PrecioOMargenGroup from '../modalInsumo/PrecioOMargenField'
import type { FormValues } from '@/common/lib/constants/promocionForm'

interface Props {
  formValues: FormValues
  esEdicion: boolean
  loading: boolean
  error: string | null
  buttonText: string
  onFormChange: (name: string, value: any) => void
  onCancel: () => void
  errors: { [key: string]: any }
  touched: { [key: string]: any }
}

export default function EditarPromocionForm({
  formValues,
  esEdicion,
  loading,
  error,
  errors,
  touched,
  buttonText,
  onFormChange,
  onCancel,
}: Props) {
  const { categorias, getCategorias } = useCategorias()

  useEffect(() => {
    getCategorias()
  }, [])

  const categoriasCombos = useMemo(() => {
    const categoriaPadre = categorias.find(
      cat => cat.denominacion.toLowerCase() === 'combos'
    )

    if (!categoriaPadre) return []

    const hijas = categorias.filter(
      cat => cat.categoriaPadre === categoriaPadre.id
    )

    return hijas
  }, [categorias])

  const opcionesCategorias = categoriasCombos.map(cat => ({
    label: cat.denominacion,
    value: cat.id,
  }))

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      {/* Imágenes */}
      <div>
        <ImagenesInputFormik name="imagenesUrls" esEdicion={esEdicion} />
        <ErrorMessage
          name="imagenesUrls"
          component="div"
          className="text-red-500 font-semibold"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="denominacion" className="text-white">
            Denominación
          </label>
          <Field
            name="denominacion"
            placeholder="Nombre de la promoción..."
            className={`mb-4 rounded-full w-full px-4 py-2 bg-white text-black`}
            value={formValues.denominacion}
            onChange={(e: { target: { value: any } }) =>
              onFormChange('denominacion', e.target.value)
            }
          />
          <ErrorMessage
            name="denominacion"
            component="div"
            className="text-red-500 font-semibold"
          />
        </div>

        <div>
          <label htmlFor="categoriaId" className="text-white">
            Categoría
          </label>
          <select
            name="categoriaId"
            value={formValues.categoriaId}
            onChange={e => onFormChange('categoriaId', e.target.value)}
            className={`mb-4 rounded-full w-full px-4 py-2 bg-white text-black`}
          >
            <option value="">Seleccionar categoría...</option>
            {opcionesCategorias.map(cat => (
              <option key={`cateogria-${cat.value}`} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <ErrorMessage
            name="categoriaId"
            component="div"
            className="text-red-500 font-semibold"
          />
        </div>
      </div>

      <PrecioOMargenGroup esPromocion={true} />

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label htmlFor="descripcion" className="text-white">
            Descripción
          </label>
          <textarea
            name="descripcion"
            placeholder="Descripción de la promoción..."
            value={formValues.descripcion}
            onChange={e => onFormChange('descripcion', e.target.value)}
            className={`mb-4 rounded-lg w-full px-4 py-2 bg-white text-black`}
            rows={3}
          />
          <ErrorMessage
            name="descripcion"
            component="div"
            className="text-red-500 font-semibold"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <label htmlFor="fechaDesde" className="text-white">
            Fecha Desde
          </label>
          <input
            type="date"
            name="fechaDesde"
            value={formValues.fechaDesde}
            onChange={e => onFormChange('fechaDesde', e.target.value)}
            className={`rounded-full w-full px-4 py-2 bg-white text-black`}
          />
          <ErrorMessage
            name="fechaDesde"
            component="div"
            className="text-red-500 font-semibold"
          />
        </div>

        <div>
          <label htmlFor="fechaHasta" className="text-white">
            Fecha Hasta
          </label>
          <input
            type="date"
            name="fechaHasta"
            value={formValues.fechaHasta}
            onChange={e => onFormChange('fechaHasta', e.target.value)}
            className={`rounded-full w-full px-4 py-2 bg-white text-black`}
          />
          <ErrorMessage
            name="fechaHasta"
            component="div"
            className="text-red-500 font-semibold"
          />
        </div>

        <div>
          <label htmlFor="horaDesde" className="text-white">
            Hora Desde
          </label>
          <input
            type="time"
            name="horaDesde"
            value={formValues.horaDesde}
            onChange={e => onFormChange('horaDesde', e.target.value)}
            className={`rounded-full w-full px-4 py-2 bg-white text-black`}
          />
          <ErrorMessage
            name="horaDesde"
            component="div"
            className="text-red-500 font-semibold"
          />
        </div>

        <div>
          <label htmlFor="horaHasta" className="text-white">
            Hora Hasta
          </label>
          <input
            type="time"
            name="horaHasta"
            value={formValues.horaHasta}
            onChange={e => onFormChange('horaHasta', e.target.value)}
            className={`rounded-full w-full px-4 py-2 bg-white text-black`}
          />
          <ErrorMessage
            name="horaHasta"
            component="div"
            className="text-red-500 font-semibold"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 justify-between">
        <label className="flex items-center gap-1 text-white">
          <input
            type="checkbox"
            name="productoActivo"
            checked={formValues.productoActivo}
            onChange={e => onFormChange('productoActivo', e.target.checked)}
            className="size-5"
          />
          Producto Activo
        </label>

        <label className="flex items-center gap-1 text-white">
          <input
            type="checkbox"
            name="esVendible"
            checked={formValues.esVendible}
            onChange={e => onFormChange('esVendible', e.target.checked)}
            className="size-5"
          />
          ¿Es vendible?
        </label>
      </div>

      {error && <p className="text-red-500 font-semibold">{error}</p>}
    </div>
  )
}
