'use client'

import React from 'react'
import { useAuthStore } from '@/common/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { FormField } from '@/common/types/MyFormProps'
import FormAuth from '@/common/components/ui/forms/FormAuth'
import { registerValidationSchema } from '@/common/schemas/authSchema'

const fields: FormField[] = [
  { name: 'email', label: 'Email', type: 'text', placeholder: 'Email' },
  { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Nombre' },
  {
    name: 'apellido',
    label: 'Apellido',
    type: 'text',
    placeholder: 'Apellido',
  },
  {
    name: 'telefono',
    label: 'Teléfono',
    type: 'text',
    placeholder: 'Teléfono',
  },
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Contraseña',
  },
]

const initialValues = {
  email: '',
  nombre: '',
  apellido: '',
  telefono: '',
  password: '',
}

const Register = () => {
  const register = useAuthStore(state => state.register)
  const router = useRouter()

  // Función onSubmit
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await register(values)
      router.push('/')
    } catch (error) {
      console.error('Error al registrar:', error)
    }
  }

  const handleGoogleAuth = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google'
  }

  return (
    <div
      className="flex justify-between w-full h-[100vh] items-start gap-10 bg-black"
      style={{
        backgroundImage: 'url("/images/carrito-perfil/fondo-naranja.webp")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
      }}
    >
      <section className="w-[70%] pt-10 flex flex-col items-center justify-center gap-10">
        <header className="flex items-center justify-center ">
          <img src="/logo.png" alt="Logo" className="h-[10vh]" />
        </header>

        <div className="w-[55%] h-[80%] bg-[#740e07] rounded-4xl shadow-lg p-8 flex flex-col gap-4">
          <h1 className="oi text-4xl text-white text-center mb-6">
            Registrarse
          </h1>

          <FormAuth
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            onSubmit={handleSubmit}
            fields={fields}
            textButton="REGISTRARME"
            designInOneColumn={true}
            textColor="text-white"
          />

          <a
            href="/auth/login"
            className="text-white text-s flex gap-3 justify-center mt-4"
          >
            ¿Ya tienes una cuenta?{' '}
            <p className="underline cursor-pointer">Iniciar Sesión</p>
          </a>

          <button
            type="button"
            onClick={handleGoogleAuth}
            className="flex cursor-pointer items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out hover:bg-gray-100 active:scale-95 mt-4 mx-auto"
          >
            <FcGoogle className="text-2xl" />
            <span className="text-black text-sm">Ingresar con Google</span>
          </button>
        </div>
      </section>

      <video
        className="object-cover h-[100vh] relative w-[50%] overflow-hidden pl-6"
        src="/images/landing/video-hamburguesería.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  )
}

export default Register
