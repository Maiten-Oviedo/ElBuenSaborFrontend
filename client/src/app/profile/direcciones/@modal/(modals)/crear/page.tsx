'use client'

import MyForm from '@/common/components/ui/forms/MyForm'
import ParallelModal from '@/common/components/ui/parallel-modal/ParallelModal'
import httpClient from '@/common/lib/httpClient'
import { crearDomicilioSchema } from '@/common/schemas/crearDomicilioSchema'
import { useAuthStore } from '@/common/store/useAuthStore'
import { useReloadStore } from '@/common/store/useReloadStore'
import {
  getDomicilioFormFields,
  domicilioInitialValues,
  DomicilioValues,
} from '@/common/types/forms/crudDomicilioForms'
import { useDomicilioSelects } from '@/features/profile/useDomicilioSelects'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CrearDomicilioModal = () => {
  const router = useRouter()
  const toggleReload = useReloadStore(state => state.toggleReload)

  const clienteId = useAuthStore(state => state.cliente?.id)

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { paises, provincias, localidades, onPaisChange, onProvinciaChange } =
    useDomicilioSelects()

  const handleSubmit = async (values: DomicilioValues) => {
    const transformedValues = {
      calle: values.calle,
      numero: values.numero,
      codigoPostal: values.codigoPostal,
      localidadId: Number(values.localidad),
      descripcion: values.descripcion,
    }

    try {
      setLoading(true)

      await httpClient().post(
        `http://localhost:8080/cliente/${clienteId}/domicilios`,
        {
          body: JSON.stringify(transformedValues),
        }
      )

      toggleReload()
      router.back()
    } catch (error: unknown) {
      let errorMessage = 'Error desconocido'

      if (error instanceof Error) {
        errorMessage = error.message
      }

      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ParallelModal>
      <div className="w-full h-full flex flex-col gap-10 items-center justify-center">
        <h2 className="text-white font-black text-4xl text-center">
          CREAR DOMICILIO
        </h2>
        <MyForm
          loading={loading}
          error={error}
          initialValues={domicilioInitialValues}
          fields={getDomicilioFormFields(
            paises,
            provincias,
            localidades,
            onPaisChange,
            onProvinciaChange
          )}
          validationSchema={crearDomicilioSchema}
          onSubmit={handleSubmit}
          textButton="Crear"
        />
      </div>
    </ParallelModal>
  )
}

export default CrearDomicilioModal
