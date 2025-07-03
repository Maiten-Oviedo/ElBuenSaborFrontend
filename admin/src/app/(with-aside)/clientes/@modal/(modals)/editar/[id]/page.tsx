'use client'

import { useParams } from 'next/navigation'
import Modal from '@/common/components/modal/Modal'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStoreClientes } from '@/store/storeClientes'
import {
  ClientEditableFieldsType,
  useClientes,
} from '@/common/hooks/useClientes'
import MyForm from '@/common/components/form/MyForm'
import { FormField } from '@/common/types/form.types'
import { editarClienteValidationSchema } from '@/schemas/clienteSchemas'

const editarClienteFormFields: FormField[] = [
  { label: 'Nombre', name: 'nombre', type: 'text' },
  { label: 'Apellido', name: 'apellido', type: 'text' },
  { label: 'Teléfono', name: 'telefono', type: 'text' },
  {
    label: 'Estado',
    name: 'activo',
    type: 'checkbox',
  },
]

export default function EditarClienteModal() {
  const params = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const data = useStoreClientes(state => state.data)
  const { putCliente } = useClientes()

  const clienteId = params?.id
  const cliente = data.find(cl => cl.id === Number(clienteId))

  const initialValues = {
    nombre: cliente?.nombre || '',
    apellido: cliente?.apellido || '',
    telefono: cliente?.telefono || '',
    activo: cliente?.activo ?? true,
  }

  const handleSubmit = async (values: ClientEditableFieldsType) => {
    setError(null)
    setLoading(true)

    try {
      await putCliente(cliente!.id, values)
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

  if (!cliente)
    return (
      <Modal>
        <p>Error al cargar el cliente</p>
      </Modal>
    )
  return (
    <Modal>
      <div className="space-y-6 p-6">
        <h3 className="text-white text-3xl text-center text-wrap break-words font-extrabold">
          EDITAR: {cliente?.nombre} {cliente?.apellido}
        </h3>
        <MyForm<ClientEditableFieldsType>
          fields={editarClienteFormFields}
          validationSchema={editarClienteValidationSchema}
          initialValues={initialValues}
          loading={loading}
          error={error}
          onSubmit={handleSubmit}
        />
      </div>
    </Modal>
  )
}
