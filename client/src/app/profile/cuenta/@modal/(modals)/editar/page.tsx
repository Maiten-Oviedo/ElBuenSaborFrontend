'use client'
import MyForm from '@/common/components/ui/forms/MyForm'
import ParallelModal from '@/common/components/ui/parallel-modal/ParallelModal'
import { useAuthStore } from '@/common/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormField } from '@/common/types/MyFormProps'
import { editarCuentaValidationSchema } from '@/common/schemas/editarCuentaSchema'
import httpClient from '@/common/lib/httpClient'
import { useReloadStore } from '@/common/store/useReloadStore'

type ClientEditableFieldsType = {
  nombre: string
  apellido: string
  telefono: string
}

const editableFormFields: FormField[] = [
  {
    label: 'NOMBRE/S',
    name: 'nombre',
    type: 'text',
  },
  {
    label: 'APELLIDO/S',
    name: 'apellido',
    type: 'text',
  },
  {
    label: 'TELÉFONO',
    name: 'telefono',
    type: 'text',
  },
]

const EditarCliente = () => {
  const router = useRouter()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const setCliente = useAuthStore(state => state.setCliente)
  const cliente = useAuthStore(state => state.cliente)

  const [initialValues, setInitialValues] = useState<ClientEditableFieldsType>({
    nombre: '',
    apellido: '',
    telefono: '',
  })

  const toggleReload = useReloadStore(state => state.toggleReload)
  const reloadFlag = useReloadStore(state => state.reloadFlag)

  useEffect(() => {
    if (cliente) {
      setInitialValues({
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        telefono: cliente.telefono || '-',
      })
    }
  }, [cliente, reloadFlag])

  const handleSubmit = async (values: ClientEditableFieldsType) => {
    try {
      setLoading(true)

      await httpClient().put(
        `http://localhost:8080/cliente/basic/${cliente?.id}`,
        {
          body: JSON.stringify(values),
        }
      )

      //Traemos el nuevo cliente del backend para más robustez
      const updatedCliente = await httpClient().get(
        `http://localhost:8080/cliente/${cliente?.id}`
      )
      // Y lo actualizamos en el store
      setCliente(updatedCliente)

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
          EDITAR MI CUENTA
        </h2>
        {initialValues ? (
          <MyForm
            loading={loading}
            error={error}
            initialValues={initialValues}
            fields={editableFormFields}
            validationSchema={editarCuentaValidationSchema}
            onSubmit={handleSubmit}
            textButton="Guardar"
          />
        ) : (
          <p className="text-white">Cargando datos...</p>
        )}
      </div>
    </ParallelModal>
  )
}

export default EditarCliente
