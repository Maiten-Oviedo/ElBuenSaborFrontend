'use client'

import { useEffect } from 'react'
import { Form, Field, FieldArray, ErrorMessage, FormikErrors } from 'formik'
import Button from '../../common/components/button/Button'
import { FaTrash } from 'react-icons/fa'
import type { FormProductos } from './FormPromocion'

type ProductoOption = {
  label: string
  value: number
  precioCosto: number
  precioVenta: number
  tiempoEstimadoMinutos: number
}

type Props = {
  values: FormProductos
  productosOptions: ProductoOption[]
  error?: string
  loading?: boolean
  onFormChange?: (values: FormProductos) => void
  onProductoChange?: (
    productos: FormProductos['productosSeleccionados']
  ) => void
  onLeftButtonClick?: () => void
  textButton?: string
  textLeftButton?: string
  errors?: FormikErrors<FormProductos>
}

export default function InnerForm({
  values,
  productosOptions,
  errors,
  error,
  loading = false,
  onFormChange,
  onProductoChange,
  onLeftButtonClick,
  textButton = 'Guardar',
  textLeftButton = 'Cancelar',
}: Props) {
  useEffect(() => {
    onFormChange?.(values)
    onProductoChange?.(values.productosSeleccionados)
  }, [JSON.stringify(values.productosSeleccionados)])

  return (
    <div className="w-full flex flex-col gap-6 text-white">
      <FieldArray name="productosSeleccionados">
        {({ push, remove }) => (
          <>
            {values.productosSeleccionados.map((detalle, index: number) => {
              const selectedIds = values.productosSeleccionados
                .map((d, i) => (i !== index ? String(d.articuloId) : null))
                .filter((id): id is string => !!id)

              return (
                <div
                  key={index}
                  className="grid grid-cols-[1.5fr_1.5fr_auto] px-6 py-1 gap-4 items-center justify-center border-1 border-white rounded-2xl"
                >
                  {/* Producto */}
                  <div className="flex flex-col">
                    <label className="font-medium">Producto</label>
                    <Field name={`productosSeleccionados[${index}].articuloId`}>
                      {({ field, form }: any) => (
                        <select
                          {...field}
                          className="mb-4 rounded-full p-2 bg-white text-black"
                          onChange={e => {
                            const selectedValue = Number(e.target.value)
                            const selectedProducto = productosOptions.find(
                              p => p.value === selectedValue
                            )

                            if (selectedProducto) {
                              form.setFieldValue(
                                `productosSeleccionados[${index}].articuloId`,
                                selectedValue
                              )
                              form.setFieldValue(
                                `productosSeleccionados[${index}].nombre`,
                                selectedProducto.label
                              )
                              form.setFieldValue(
                                `productosSeleccionados[${index}].precioCosto`,
                                selectedProducto.precioCosto
                              )
                              form.setFieldValue(
                                `productosSeleccionados[${index}].precioVenta`,
                                selectedProducto.precioVenta
                              )
                              form.setFieldValue(
                                `productosSeleccionados[${index}].tiempoEstimadoMinutos`,
                                selectedProducto.tiempoEstimadoMinutos
                              )
                            }
                          }}
                        >
                          <option value="">Seleccionar</option>
                          {productosOptions.map(opt => (
                            <option
                              key={opt.value}
                              value={opt.value}
                              disabled={selectedIds.includes(String(opt.value))}
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                    <ErrorMessage
                      name={`productosSeleccionados[${index}].id`}
                      component="div"
                      className="text-red-400 text-sm"
                    />
                  </div>

                  {/* Cantidad */}
                  <div className="flex flex-col">
                    <label className="font-medium">Cantidad</label>
                    <Field
                      type="number"
                      name={`productosSeleccionados[${index}].cantidad`}
                      className="mb-4 rounded-full p-2 bg-white text-black"
                      min={0.01}
                      step="any"
                    />
                    <ErrorMessage
                      name={`productosSeleccionados[${index}].cantidad`}
                      component="div"
                      className="text-red-400 text-sm"
                    />
                  </div>

                  {/* Eliminar */}
                  <Button
                    type="button"
                    className="bg-transparent hover:bg-transparent hover:scale-125 transition-all duration-100"
                    icon={<FaTrash />}
                    onClick={() => remove(index)}
                  />
                </div>
              )
            })}

            {typeof errors?.productosSeleccionados === 'string' && (
              <div className="text-red-400 text-sm text-center mt-2">
                {errors.productosSeleccionados}
              </div>
            )}

            <div className="flex justify-center items-center">
              <Button
                type="button"
                className="w-fit mt-4 bg-orange text-white"
                onClick={() => {
                  push({
                    articuloId: 0,
                    nombre: '',
                    precioCosto: 0,
                    precioVenta: 0,
                    tiempoEstimadoMinutos: 0,
                    cantidad: 1,
                  })
                }}
              >
                + Agregar producto
              </Button>
            </div>
          </>
        )}
      </FieldArray>

      {error && (
        <div className="max-w-full">
          <p className="text-red-400 w-full break-words">{error}</p>
        </div>
      )}
    </div>
  )
}
