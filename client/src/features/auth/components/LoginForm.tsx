'use client'

import React, { useState } from 'react'
import { useAuthStore } from '@/common/store/useAuthStore'
import { useRouter } from 'next/navigation'
import FormAuth from '@/common/components/ui/forms/FormAuth'
import { FcGoogle } from 'react-icons/fc'
import { FormField } from '@/common/types/MyFormProps'
import { loginValidationSchema } from '@/common/schemas/authSchema'
import Link from 'next/link'

const initialValues = {
  email: '',
  password: '',
}

const fields: FormField[] = [
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Email' },
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Contraseña',
  },
]

const LoginForm = () => {
  const { login } = useAuthStore()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: typeof initialValues) => {
    setError(null)
    setLoading(true)
    try {
      await login(values)
      router.push('/')
    } catch (error) {
      if (
        (error as Error).message ===
        'Error interno: 401 UNAUTHORIZED "No es un cliente"'
      ) {
        setError('Credenciales incorrectas.')
        return
      }
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google'
  }

  return (
    <div
      className="flex justify-center w-full h-[100vh] items-center gap-10 bg-black"
      style={{
        backgroundImage: 'url("/images/carrito-perfil/fondo-naranja.webp")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
      }}
    >
      <div className="w-[40%] h-full overflow-hidden">
        <video
          className="h-full object-cover"
          src="/images/landing/video-hamburguesería.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <section className="w-[60%] flex flex-col items-center justify-center gap-10">
        <header className="flex items-center justify-center">
          <img src="/logo.png" alt="Logo" className="h-[15vh]" />
        </header>

        <div className="w-[55%] h-[80%] flex flex-col justify-center items-center bg-white rounded-4xl shadow-lg p-8 gap-4">
          <h1 className="oi text-4xl">iniciar sesión</h1>

          <FormAuth
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
            fields={fields}
            textButton="INGRESAR"
            designInOneColumn={true}
            loading={loading}
            textColor="text-black"
          />
          {error && (
            <p className="text-red text-center font-bold py-2 text-lg">
              {error}
            </p>
          )}

          <Link href="/" className="text-blue-800 text-sm">
            ¿Has olvidado tu contraseña?
          </Link>

          <button
            type="button"
            onClick={handleGoogleAuth}
            className="flex cursor-pointer items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out hover:bg-gray-100 active:scale-95"
          >
            <FcGoogle className="text-2xl" />
            <span className="text-black text-sm">Ingresar con Google</span>
          </button>
        </div>

        <a href="/auth/register" className="text-white text-s flex gap-3">
          ¿Aún no tienes una cuenta? <p className="underline">Registrate</p>
        </a>
      </section>
    </div>
  )
}

export default LoginForm
