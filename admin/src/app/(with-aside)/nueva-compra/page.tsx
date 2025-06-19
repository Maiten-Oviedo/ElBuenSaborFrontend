'use client'

import React, { useEffect, useState } from 'react'
import { IArticuloInsumo } from '@/common/types/entities/IArticuloInsumo'
import Link from 'next/link'
import MyForm from '@/common/components/form/MyForm'
import { useInsumos } from '@/common/hooks/useInsumos'
import { FormField } from '@/common/types/form.types'
import { comprarInsumoSchema } from '@/schemas/InsumosSchemas'

const initialValues = {
  precioCompra: 0,
  nuevoStock: 0,
}

const fields: FormField[] = [
  { name: 'precioCompra', label: '$ Precio Costo', type: 'number' },
  { name: 'nuevoStock', label: '# Cantidad comprada', type: 'number' },
]

const GestionCompra = () => {
  const [formValues, setFormValues] = useState(initialValues)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [insumos, setInsumos] = useState<IArticuloInsumo[]>([])
  const [insumoSelected, setInsumoSelected] = useState<IArticuloInsumo>()
  const { patchInsumo } = useInsumos()
 const [busqueda, setBusqueda] = useState("");

  const insumosFiltrados = [...insumos]
    .filter(el => el.denominacion.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) => a.denominacion.localeCompare(b.denominacion));

  useEffect(() => {
    fetch('http://localhost:8080/articulo-insumo/getAll')
      .then(res => res.json())
      .then(data => setInsumos(data))
  }, [])

  const handleSubmit = async (values: {
    nuevoStock: number
    precioCompra: number
  }) => {
    if (!insumoSelected) return

    const { id, stockActual } = insumoSelected
    const { nuevoStock, precioCompra } = values

    if (id) {
      try {
        await patchInsumo(id, stockActual, nuevoStock, precioCompra)

        // Resetear estados solo después de éxito
        setInsumoSelected(undefined)
        setFormValues(initialValues)

        // Volver a pedir los insumos actualizados para el inventario actual
        const response = await fetch(
          'http://localhost:8080/articulo-insumo/getAll'
        )
        const data = await response.json()
        setInsumos(data)
      } catch (error) {
        console.error('Error al actualizar el insumo:', error)
      }
    }
  }

  return (
    <div className="flex items-start w-full  justify-around">
      <div className="flex-col flex items-center gap-5 w-[50%]">
        <h1 className="text-2xl font-bold">Gestion de Compras</h1>
        <div className="w-[100%] flex gap-5 mt-2 items-center justify-center">
          <select
            defaultValue=""
            name="insumo"
            className="bg-white rounded-lg text-gray-500 w-[60%] p-3 text-lg"
            onChange={e => {
              const selected = insumos.find(
                el => el.denominacion === e.target.value
              )
              if (selected) setInsumoSelected(selected)
            }}
          >
            <option value="" disabled>
              Seleccione un insumo
            </option>
            {[...insumos]
              .sort((a, b) => a.denominacion.localeCompare(b.denominacion))
              .map((el, i) => (
                <option key={i} value={el.denominacion}>
                  {el.denominacion}
                </option>
              ))}
          </select>
          <Link href="insumos/administracion">
            <button className="text-4xl font-bold bg-[#B85607] hover:bg-[#773601] cursor-pointer px-2.5 rounded-full">
              +
            </button>
          </Link>
        </div>
        {insumoSelected && (
          <>
            <div className="bg-white text-black flex justify-around w-[80%] py-5 rounded-sm">
              <div className="flex-col">
                <h3>Unidad de medida</h3>
                <h4 className="font-bold text-sm">
                  {insumoSelected.unidadMedidaEnum}
                </h4>
              </div>
              <div>
                <h3>Stock actual</h3>
                <h4 className="font-bold text-sm">
                  {insumoSelected.stockActual}
                </h4>
              </div>
              <div>
                <h3>Stock Maximo</h3>
                <h4 className="font-bold text-sm">
                  {insumoSelected.stockMaximo}
                </h4>
              </div>
              <div>
                <h3>Ultimo precio</h3>
                <h4 className='font-bold text-sm'>${insumoSelected.precioCosto} x 1000{insumoSelected.unidadMedidaEnum}</h4>
              </div>
            </div>

            <MyForm
              initialValues={formValues}
              validationSchema={comprarInsumoSchema}
              loading={loading}
              error={error}
              onSubmit={handleSubmit}
              fields={fields}
              textLeftButton="Cancelar"
              textButton="Registrar"
            />
          </>
        )}
      </div>
      <div className="w-[30%] h-[90vh] overflow-y-scroll bg-brown rounded-lg p-5">
        <h2 className="font-bold text-xl mb-8">Inventario Actual</h2>
        {[...insumos]
          .sort((a, b) => a.denominacion.localeCompare(b.denominacion))
          .map((el, i) => (
            <div
              key={i}
              className="flex text-black my-3 rounded-lg p-5 w-[100%] items-beetwen justify-between bg-white hover:bg-gray-200"
            >
              <div>
                <h3>{el.denominacion}</h3>
                <h2>
                  ${el.precioCosto} por {el.unidadMedidaEnum}
                </h2>
              </div>
              <h2>
                {el.stockActual} {el.unidadMedidaEnum}
              </h2>
            </div>
          ))}
      </div>

      {insumosFiltrados.map((el, i) => (
        <div
          key={i}
          className='flex text-black my-3 rounded-lg p-5 w-full items-between justify-between bg-white hover:bg-gray-200'
        >
          <div>
            <h3>{el.denominacion}</h3>
            <h2>${el.precioCosto} por {el.unidadMedidaEnum}</h2>
          </div>
          <h2>{el.stockActual} {el.unidadMedidaEnum}</h2>
        </div>
      ))}
    </div>
  )
}

export default GestionCompra
