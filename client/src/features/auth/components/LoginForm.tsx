'use client'

import Button from '@/common/components/ui/Button'
import Input from '@/common/components/ui/forms/Input'
import { useAuthStore } from '@/common/store/useAuthStore'
import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const { login, loginWithGoogle } = useAuthStore()
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(formData)
      router.push('/')
    } catch (error) {
      console.error('Error al registrar:', error)
    }
  }

  // 1. Función para iniciar sesión con Google
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
          className=" h-full object-cover"
          src="/images\landing\video-hamburguesería.mp4"
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

        <form
          onSubmit={handleSubmit}
          className="w-[55%] h-[80%] flex flex-col justify-center items-center bg-white rounded-4xl shadow-lg p-8 gap-4"
        >
          <h1 className="oi text-4xl">iniciar sesión</h1>
          <div className="flex flex-col gap-7 w-[90%] pt-5">
            <Input
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              name="password"
              placeholder="Contraseña"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit">INGRESAR</Button>
          <a href="/" className="text-blue-800 text-sm">
            ¿Has olvidado tu contraseña?
          </a>
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="flex cursor-pointer items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out hover:bg-gray-100 active:scale-95"
          >
            <FcGoogle className="text-2xl" />
            <span className="text-black text-sm">Ingresar con Google</span>
          </button>
        </form>
        <a href="/auth/register" className="text-white text-s flex gap-3">
          ¿Aún no tienes una cuenta? <p className="underline">Registrate</p>
        </a>
      </section>
    </div>
  )
}

export default LoginForm
