'use client'

import Modal from '@/common/components/modal/Modal'
import { crearPromocionSchema } from '@/schemas/crearPromocionSchema'
import FormProductosPromocion from '@/features/promociones/FormPromocion'
import { initialValues, FormValues } from '@/common/lib/constants/promocionForm'
import { useEffect, useState } from 'react'
import {
  ProductoOption,
  createPromocion,
  getProductosOptions,
} from '@/common/hooks/usePromocion'
import { useRouter } from 'next/navigation'
import { Formik, Form } from 'formik'
import EditarPromocionForm from '@/features/promociones/EditarPromocionForm'
import Button from '@/common/components/button/Button'
import { calcularTiempoTotal } from '@/common/helpers/promocionHelpers'

export default function CrearPromocionModal() {
  const [productos, setProductos] = useState<ProductoOption[]>([])
  const [precioTotal, setPrecioTotal] = useState(0)
  const [totalTiempo, setTotalTiempo] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchListado = async () => {
      const productosObtenidos = await getProductosOptions()
      setProductos(productosObtenidos)
    }
    fetchListado()
  }, [])

  const calcularTotales = (
    productosSeleccionados: FormValues['productosSeleccionados']
  ) => {
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

  const handleSubmit = async (values: FormValues) => {
    const detalle = values.productosSeleccionados.map(p => ({
      articuloId: p.articuloId,
      cantidad: p.cantidad,
      id: null,
    }))

    const precioCostoTotal = values.productosSeleccionados.reduce(
      (acc, prod) => acc + prod.precioCosto * prod.cantidad,
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
    }

    console.log('body', body)

    try {
      const result = await createPromocion(body)
      console.log('✅ Promoción creada con éxito:', result)
      router.back()
    } catch (error) {
      setError((error as Error).message)
    }
  }

  if (!productos.length) {
    return <p className="text-white">Cargando productos...</p>
  }
  return (
    <Modal>
      <div className="flex flex-col items-center justify-center text-white text-3xl font-extrabold mb-3">
        <h3>CREAR PROMOCIÓN</h3>
      </div>

      <Formik
        initialValues={{ ...initialValues, productosSeleccionados: [] }}
        validationSchema={crearPromocionSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => {
          // Calculamos los totales cada vez que cambian los productos
          useEffect(() => {
            calcularTotales(values.productosSeleccionados)
          }, [values.productosSeleccionados])

          return (
            <Form className="flex flex-col gap-6 w-full">
              {/* Formulario de selección de productos */}
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
                    onFormChange={formProductos => {
                      setFieldValue(
                        'productosSeleccionados',
                        formProductos.productosSeleccionados
                      )
                    }}
                    textButton="Seleccionar"
                    hideSubmitButton={true}
                  />
                </div>

                {/* Formulario de detalle de promoción */}
                <div className="w-1/2 flex flex-col gap-4">
                  <EditarPromocionForm
                    errors={errors}
                    touched={touched}
                    formValues={values} // El único prop que debe pasar los valores
                    esEdicion={false}
                    loading={loading}
                    error={error}
                    buttonText="Crear"
                    onFormChange={(name, value) => {
                      setFieldValue(name, value) // Cambiar a una actualización por campo
                    }}
                    onCancel={() => router.back()}
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
                  {loading ? 'Creando...' : 'Crear Promoción'}
                </Button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}
