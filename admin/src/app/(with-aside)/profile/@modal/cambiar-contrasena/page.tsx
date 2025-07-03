'use client'
import MyForm from '@/common/components/form/MyForm'
import Modal from '@/common/components/modal/Modal'
import httpClient from '@/common/lib/httpClient'
import { FormField } from '@/common/types/form.types'
import { cambiarContrasenaValidationSchema } from '@/schemas/profileSchema'
import { useAuthStore } from '@/store/useAuthStore'
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

  const empleadoId = useAuthStore(state => state.empleado?.id)
  const initialValues = {
    email: '',
    currentPassword: '',
    newPassword: '',
  }

  const handleSubmit = async (values: FieldsType) => {
    try {
      setLoading(true)

      await httpClient().patch(
        `http://localhost:8080/auth/${empleadoId}/change-password`,
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
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal>
      <div className="w-full h-full flex flex-col gap-10 items-center justify-center p-6">
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
    </Modal>
  )
}

export default CambiarContrasena
