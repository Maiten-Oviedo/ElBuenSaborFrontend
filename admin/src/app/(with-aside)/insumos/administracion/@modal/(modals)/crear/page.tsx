'use client'

import Modal from '@/common/components/modal/Modal'
import { useInsumos } from '@/common/hooks/useInsumos'
import { useState } from 'react'
import CrearArticuloInsumoForm from '@/features/modalInsumo/CrearArticuloInsumoForm'
import { IArticuloInsumo } from '@/common/types/entities/IArticuloInsumo'
import { useRouter } from 'next/navigation'

export default function CrearInsumoModal() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { postInsumo } = useInsumos()
  const router = useRouter()

  const handleSubmit = async (values: IArticuloInsumo) => {
    setError(null)
    setLoading(true)

    const parsedPrecioVenta =
      (values.precioVenta as unknown as string) === '' ||
      values.precioVenta == null
        ? 0
        : Number(values.precioVenta)

    const parsedMargen =
      (values.margen as unknown as string) === '' || values.margen == null
        ? null
        : Number(values.margen)

    const transformedValues = {
      ...values,
      margen: parsedMargen,
      precioVenta: parsedPrecioVenta,
    }

    try {
      await postInsumo(transformedValues)

      router.back()
    } catch (error: unknown) {
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
      <h3 className="text-white text-xl text-center">Agregar Insumo</h3>
      <CrearArticuloInsumoForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </Modal>
  )
}
