'use client'

import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import Button from '../../common/components/button/Button'
import { FormRecetaManufacturadoProps } from '@/common/types/form.types'
import { IArticuloManufacturadoDetalle } from '@/common/types/entities/IManufacturadoDetalle'
import { FaTrash } from 'react-icons/fa'
import { useEffect } from 'react'

export type FormThreeValues = {
  articuloManufacturadoDetalle: IArticuloManufacturadoDetalle[]
}

export default function FormRecetaManufacturado({
  initialValues,
  validationSchema,
  onSubmit,
  loading = false,
  error,
  insumosOptions,
  textButton = 'Guardar',
  textLeftButton = 'Cancelar',
  onLeftButtonClick,
  onFormChange,
}: FormRecetaManufacturadoProps<FormThreeValues>) {
  return (
    <Formik<FormThreeValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => {
        // Mover el useEffect FUERA del render directamente:
        useEffect(() => {
          if (onFormChange) {
            const parsedValues = {
              articuloManufacturadoDetalle:
                values.articuloManufacturadoDetalle.map(detalle => ({
                  ...detalle,
                  articuloInsumoId: Number(detalle.articuloInsumoId),
                })),
            }
            onFormChange(parsedValues)
          }
        }, [values])

        return (
          <Form className="w-full flex flex-col gap-6 text-white">
            <FieldArray name="articuloManufacturadoDetalle">
              {({ push, remove }) => (
                <>
                  {values.articuloManufacturadoDetalle.map((detalle, index) => {
                    const selectedIds = values.articuloManufacturadoDetalle
                      .map((d, i) =>
                        i !== index ? String(d.articuloInsumoId) : null
                      )
                      .filter((id): id is string => id !== null && id !== '')

                    return (
                      <div
                        key={index}
                        className="grid grid-cols-[1.5fr_1.5fr_auto] px-6 py-1 gap-4 items-center justify-center border-1 border-white rounded-2xl"
                      >
                        {/* Ingrediente */}
                        <div className="flex flex-col">
                          <label className="font-medium">Ingrediente</label>
                          <Field
                            name={`articuloManufacturadoDetalle[${index}].articuloInsumoId`}
                          >
                            {({ field, form }: any) => (
                              <select
                                {...field}
                                className="mb-4 rounded-full p-2 bg-white text-black"
                                onChange={e => {
                                  const value =
                                    e.target.value === ''
                                      ? ''
                                      : Number(e.target.value)
                                  form.setFieldValue(field.name, value)
                                }}
                              >
                                <option value="">Seleccionar</option>
                                {insumosOptions.map(opt => (
                                  <option
                                    key={opt.value}
                                    value={opt.value}
                                    disabled={selectedIds.includes(
                                      String(opt.value)
                                    )}
                                  >
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            )}
                          </Field>

                          <ErrorMessage
                            name={`articuloManufacturadoDetalle[${index}].articuloInsumoId`}
                            component="div"
                            className="text-red-400 text-sm"
                          />
                        </div>

                        {/* Cantidad */}
                        <div className="flex flex-col">
                          <label className="font-medium">
                            Cantidad en gramos
                          </label>
                          <Field
                            type="number"
                            name={`articuloManufacturadoDetalle[${index}].cantidad`}
                            className="mb-4 rounded-full p-2 bg-white text-black"
                            min={1}
                          />
                          <ErrorMessage
                            name={`articuloManufacturadoDetalle[${index}].cantidad`}
                            component="div"
                            className="text-red-400 text-sm"
                          />
                        </div>

                        {/* Botón eliminar */}
                        <Button
                          type="button"
                          className="bg-transparent hover:bg-transparent hover:scale-125 transition-all duration-100"
                          icon={<FaTrash />}
                          onClick={() => remove(index)}
                        />
                      </div>
                    )
                  })}

                  {/* Botón agregar ingrediente */}
                  <div className="flex justify-center items-center">
                    <Button
                      type="button"
                      className="w-fit mt-4 bg-orange text-white"
                      onClick={() =>
                        push({
                          cantidad: 1,
                          articuloInsumoId: '',
                        })
                      }
                    >
                      + Agregar ingrediente
                    </Button>
                  </div>
                </>
              )}
            </FieldArray>

            {/* Errores generales */}
            {error && (
              <div className="max-w-full">
                <p className="text-red-400 w-full break-words">{error}</p>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex justify-between mt-8">
              <Button
                type="submit"
                onClick={onLeftButtonClick}
                variant="secondary"
              >
                {textLeftButton}
              </Button>
              <Button type="submit" className="bg-red text-white">
                {loading ? 'Cargando...' : textButton}
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}
