'use client'

import { useParams, useRouter } from 'next/navigation'
import Modal from '@/common/components/modal/Modal'
import { useEffect, useState } from 'react'
import {
  getPromocionById,
  getProductosOptions,
  updatePromocion,
} from '@/common/hooks/usePromocion'
import { IArticuloPromocion } from '@/common/types/entities/IArticuloPromocion'
import FormProductosPromocion from '@/features/promociones/FormPromocion'
import EditarPromocionForm from '@/features/promociones/EditarPromocionForm'
import {
  adaptarProductosDesdeBackend,
  calcularTiempoTotal,
} from '@/common/helpers/promocionHelpers'
import { Formik, Form } from 'formik'
import { editarPromocionSchema } from '@/schemas/crearPromocionSchema'
import Button from '@/common/components/button/Button'
import { ProductoCombo } from '@/common/types/entities/IProductoCombo'
import { useStorePromociones } from '@/store/storePromocion'

export default function EditarPromocionModal() {
  const router = useRouter()
  const { id } = useParams()
  const { setShouldRefresh } = useStorePromociones()

  const [productos, setProductos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [precioTotal, setPrecioTotal] = useState(0)
  const [totalTiempo, setTotalTiempo] = useState(0)
  const [initialValues, setInitialValues] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [promocion, productosData] = await Promise.all([
          getPromocionById(id as string),
          getProductosOptions(),
        ])

        setProductos(productosData)

        const productosAdaptados = adaptarProductosDesdeBackend(
          promocion,
          productosData
        )

        setInitialValues({
          denominacion: promocion.denominacion,
          descripcion: promocion.descripcion,
          imagenesUrls: promocion.imagenesUrls || [],
          categoriaId: promocion.categoriaId,
          precioVenta: promocion.precioVenta,
          esVendible: promocion.esVendible,
          productoActivo: promocion.productoActivo,
          horaDesde: promocion.horaDesde,
          horaHasta: promocion.horaHasta,
          fechaDesde: promocion.fechaDesde,
          fechaHasta: promocion.fechaHasta,
          margen: promocion.margen,
          productosSeleccionados: productosAdaptados,
        })
      } catch (err: any) {
        setError(`Error al cargar los datos: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const calcularTotales = (productosSeleccionados: ProductoCombo[]) => {
    const totalPrecio = productosSeleccionados.reduce(
      (acc, p) => acc + (p.precioVenta ?? 0) * (p.cantidad ?? 1),
      0
    )
    const tiempoTotal = productosSeleccionados.reduce(
      (acc, p) => acc + (p.tiempoEstimadoMinutos ?? 0) * (p.cantidad ?? 1),
      0
    )
    setPrecioTotal(totalPrecio)
    setTotalTiempo(tiempoTotal)
  }

  const handleSubmit = async (values: any) => {
    const detalle = values.productosSeleccionados.map((p: any) => ({
      articuloId: p.articuloId,
      cantidad: p.cantidad,
      id: p.id || null,
    }))

    const precioCostoTotal = values.productosSeleccionados.reduce(
      (acc: number, p: any) => acc + p.precioCosto * p.cantidad,
      0
    )

    let precioVentaCalculado = values.precioVenta
    if (!values.precioVenta && values.margen) {
      const margenDecimal = 1 + values.margen / 100
      precioVentaCalculado = Number(
        (precioCostoTotal * margenDecimal).toFixed(2)
      )
    }

    const body = {
      ...values,
      tiempoEstimadoMinutos: calcularTiempoTotal(values.productosSeleccionados),
      categoriaId: Number(values.categoriaId),
      promocionDetalle: detalle,
      precioVenta: precioVentaCalculado,
      precioCosto: precioCostoTotal,
    }

    try {
      setLoading(true)
      await updatePromocion(id as string, body)
      setShouldRefresh(true)
      router.back()
    } catch (err: any) {
      setError(`Error al actualizar: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !initialValues) {
    return (
      <Modal>
        <p className="text-white text-center">Cargando promoción...</p>
      </Modal>
    )
  }

  return (
    <Modal>
      <div className="flex flex-col items-center justify-center text-white text-3xl font-extrabold mb-3">
        <h3>EDITAR PROMOCIÓN</h3>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={editarPromocionSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => {
          useEffect(() => {
            calcularTotales(values.productosSeleccionados)
          }, [values.productosSeleccionados])

          return (
            <Form className="flex flex-col gap-6 w-full">
              <div className="w-full bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <p>Tiempo estimado de preparación:</p>
                  <p className="font-bold">{totalTiempo} minutos</p>
                </div>
                <div className="flex items-center gap-3">
                  <p>Precio de venta normal:</p>
                  <p className="font-bold">${precioTotal}</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-1/2 mt-10">
                  <FormProductosPromocion
                    productosOptions={productos}
                    textButton="Actualizar"
                    hideSubmitButton
                    onFormChange={formProductos => {
                      setFieldValue(
                        'productosSeleccionados',
                        formProductos.productosSeleccionados
                      )
                    }}
                  />
                </div>

                <div className="w-1/2 flex flex-col gap-4">
                  <EditarPromocionForm
                    formValues={values}
                    errors={errors}
                    touched={touched}
                    onFormChange={(name, value) => setFieldValue(name, value)}
                    onCancel={() => router.back()}
                    loading={loading}
                    error={error}
                    buttonText="Editar"
                    esEdicion
                  />
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.back()}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}
