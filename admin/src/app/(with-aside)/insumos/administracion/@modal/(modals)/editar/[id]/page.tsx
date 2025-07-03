'use client'

import { useParams } from 'next/navigation'
import Modal from '@/common/components/modal/Modal'
import { useEffect, useState } from 'react'
import { useInsumos } from '@/common/hooks/useInsumos'
import CrearArticuloInsumoForm from '@/features/modalInsumo/CrearArticuloInsumoForm'
import { IArticuloInsumo } from '@/common/types/entities/IArticuloInsumo'
import { useRouter } from 'next/navigation'
import { useStoreInsumos } from '@/store/storeInsumos'
import { useStoreManufacturados } from '@/store/storeManufacturados'

export default function EditarInsumoModal() {
  const params = useParams()
  const id = params?.id
  const { data } = useStoreInsumos()
  const [transformedInsumo, setTransformedInsumo] = useState<IArticuloInsumo>()

  useEffect(() => {
    const insumo = data.find(insumo => insumo.id === Number(id))
    console.log('Insumo a editar: ', insumo)

    if (insumo) {
      setTransformedInsumo({
        ...insumo,
        //Si el margen es null se lo setea como 0 para que next no falle
        margen: insumo?.margen === null ? 0 : Number(insumo?.margen),
      })
    }
  }, [id])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { putInsumo } = useInsumos()
  const router = useRouter()
  const { getAll } = useStoreManufacturados()

  const handleSubmit = async (values: IArticuloInsumo) => {
    setError(null)
    setLoading(true)

    const parsedValues = {
      ...values,
      margen:
        (values.margen as unknown as string) === '' || values.margen == null
          ? null
          : Number(values.margen),
      precioVenta:
        (values.precioVenta as unknown as string) === '' ||
        values.precioVenta == null
          ? 0
          : Number(values.precioVenta),
    }

    try {
      await putInsumo(parsedValues)
      await getAll()
      router.back()
    } catch (error) {
      setError(
        `Error al editar el item. ${JSON.stringify(
          (error as Error).message
        )}:${JSON.stringify((error as Error).cause)}`
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal>
      <h3 className="text-white text-xl text-center">
        Editar {transformedInsumo?.denominacion}
      </h3>
      <CrearArticuloInsumoForm
        onSubmit={handleSubmit}
        initialValues={transformedInsumo}
        loading={loading}
        error={error}
      />
    </Modal>
  )
}
