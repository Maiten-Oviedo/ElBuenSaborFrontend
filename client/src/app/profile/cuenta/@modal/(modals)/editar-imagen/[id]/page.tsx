'use client'
import MyForm from '@/common/components/ui/forms/MyForm'
import ParallelModal from '@/common/components/ui/parallel-modal/ParallelModal'
import { useAuthStore } from '@/common/store/useAuthStore'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormField } from '@/common/types/MyFormProps'
import { editarImagenCuentaValidationSchema } from '@/common/schemas/editarCuentaSchema'
import { useReloadStore } from '@/common/store/useReloadStore'

type ClientEditableFieldsType = {
  imagen: string
}

const editableFormFields: FormField[] = [
  {
    label: 'NUEVA IMAGEN DE PERFIL',
    name: 'imagenesUrls',
    type: 'text',
  },
]

const EditarCliente = () => {
  const router = useRouter()
  const params = useParams()
  const clienteId = params?.id

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const setCliente = useAuthStore(state => state.setCliente)
  const cliente = useAuthStore(state => state.cliente)
  const [initialValues, setInitialValues] = useState<ClientEditableFieldsType>({
    imagen: '',
  })

  const toggleReload = useReloadStore(state => state.toggleReload)
  const reloadFlag = useReloadStore(state => state.reloadFlag)

  useEffect(() => {
    if (cliente && cliente.imagenesUrls) {
      setInitialValues({
        imagen: cliente.imagenesUrls[0],
      })
    }
  }, [cliente, reloadFlag])

  const handleSubmit = async (values: ClientEditableFieldsType) => {
    // try {
    //   setLoading(true)

    //   await httpClient().put(`http://localhost:8080/cliente/${clienteId}`, {
    //     body: JSON.stringify(values),
    //   })

    //   //Traemos el nuevo cliente del backend para más robustez
    //   const updatedCliente = await httpClient().get(
    //     `http://localhost:8080/cliente/${clienteId}`
    //   )
    //   // Y lo actualizamos en el store
    //   setCliente(updatedCliente)

    //   toggleReload()
    //   router.back()
    // } catch (error: unknown) {
    //   let errorMessage = 'Error desconocido'

    //   if (error instanceof Error) {
    //     errorMessage = error.message
    //   }

    //   setError(errorMessage)
    //   throw new Error(errorMessage)
    // } finally {
    //   setLoading(false)
    // }
    console.log('Imagen cambiada!')
  }

  return (
    <ParallelModal>
      <div className="w-full h-full flex flex-col gap-10 items-center justify-center">
        <h2 className="text-white font-black text-4xl text-center">
          EDITAR IMAGEN DE PERFIL
        </h2>
        {initialValues ? (
          <MyForm
            loading={loading}
            error={error}
            initialValues={initialValues}
            fields={editableFormFields}
            validationSchema={editarImagenCuentaValidationSchema}
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
