'use client'
import * as Yup from 'yup'

// import { useAuthStore } from "@/common/store/useAuthStore";
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MyForm from '@/common/components/form/MyForm'
import { FormField } from '@/common/types/form.types'
import { useAuthStore } from '@/store/useAuthStore'
import httpClient from '@/common/lib/httpClient'

export const loginFields: FormField[] = [
  { name: 'email', label: 'Email', type: 'text' },
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
  },
]

export const initialValuesLogin = {
  email: '',
  password: '',
}

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Ingresa un email válido')
    .required('El email es obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 carácteres')
    .required('La contrseña es obligatoria'),
})

const LoginForm = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError(null)
    setLoading(true)

    try {
      const res = await httpClient().post('http://localhost:8080/auth/login', {
        body: JSON.stringify({
          ...formData,
          tipoLogin: 'ADMIN',
        }),
      })

      if (!res.user) throw new Error('No se recibió información del usuario')

      console.log('Login successful ', res.user)
      useAuthStore.getState().setEmpleado(res.user)

      router.push('/ordenes-diarias')
    } catch (error) {
      setError((error as Error).message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="flex justify-center w-full h-[100vh] items-center gap-10 bg-black"
      style={{
        backgroundImage: 'url("/assets/images/loginFondo.webp")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
      }}
    >
      <div className="w-[70%] h-[100vh]"></div>
      <section className="w-[60%] flex flex-col items-center justify-center gap-10 p-6">
        <MyForm
          initialValues={initialValuesLogin}
          fields={loginFields}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
          error={error}
          loading={loading}
          onFormChange={setValues => {
            setFormData(setValues)
          }}
          leftButton={false}
          typeButton="submit"
          className="bg-white"
          textButton="Iniciar Sesión"
          designInOneColumn={true}
        />
      </section>
    </div>
  )
}

export default LoginForm
