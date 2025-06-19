'use client'

import { useParams } from 'next/navigation'
import Modal from '@/common/components/modal/Modal'
import { useState } from 'react'
import { useInsumos } from '@/common/hooks/useInsumos'
import CrearArticuloInsumoForm from '@/features/modalInsumo/CrearArticuloInsumoForm'
import { IArticuloInsumo } from '@/common/types/entities/IArticuloInsumo'
import { useRouter } from 'next/navigation'
import { useStoreInsumos } from '@/store/storeInsumos'

export default function EditarInsumoModal() {
  const params = useParams()
  const id = params?.id

  const { data } = useStoreInsumos()

  const insumo = data.find(insumo => insumo.id === Number(id))

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { putInsumo } = useInsumos()
  const router = useRouter()

  const handleSubmit = async (values: IArticuloInsumo) => {
    // => Este any esta mal hay que cambiarlo al tipo Insumo cuando este
    setError(null)
    setLoading(true)

    try {
      await putInsumo(values)
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
        Editar {insumo?.denominacion}
      </h3>
      <CrearArticuloInsumoForm
        onSubmit={handleSubmit}
        initialValues={insumo}
        loading={loading}
        error={error}
      />
    </Modal>
  )
}
