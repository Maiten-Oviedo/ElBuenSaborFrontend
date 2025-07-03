'use client'
import MyForm from '@/common/components/ui/forms/MyForm'
import ParallelModal from '@/common/components/ui/parallel-modal/ParallelModal'
import httpClient from '@/common/lib/httpClient'
import { cambiarContrasenaValidationSchema } from '@/common/schemas/cambiarContrasenaSchema'
import { useAuthStore } from '@/common/store/useAuthStore'
import { FormField } from '@/common/types/MyFormProps'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type FieldsType = {
  email: string
  currentPassword: string
  newPassword: string
}

const cambiarContrasenaFormFields: FormField[] = [
  {
    label: 'EMAIL',
    name: 'email',
    type: 'email',
  },
  {
    label: 'CONTRASEÑA ACTUAL',
    name: 'currentPassword',
    type: 'password',
  },
  {
    label: 'NUEVA CONTRASEÑA',
    name: 'newPassword',
    type: 'password',
  },
]

const CambiarContrasena = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const clienteId = useAuthStore(state => state.cliente?.id)
  const initialValues = {
    email: '',
    currentPassword: '',
    newPassword: '',
  }

  const handleSubmit = async (values: FieldsType) => {
    try {
      setLoading(true)

      await httpClient().patch(
        `http://localhost:8080/auth/${clienteId}/change-password`,
        {
          body: JSON.stringify(values),
        }
      )

      setSuccess(true)
      setTimeout(() => {
        router.back()
      }, 1500)
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
          CAMBIAR CONTRASEÑA
        </h2>
        {success ? (
          <p className="text-white">¡Contraseña cambiada correctamente!</p>
        ) : (
          <MyForm
            loading={loading}
            error={error}
            initialValues={initialValues}
            fields={cambiarContrasenaFormFields}
            validationSchema={cambiarContrasenaValidationSchema}
            onSubmit={handleSubmit}
            textButton="Guardar"
            designInOneColumn={true}
          />
        )}
      </div>
    </ParallelModal>
  )
}

export default CambiarContrasena
