'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/common/store/useAuthStore'

export default function AuthRedirect() {
  const router = useRouter()
  const { loginWithGoogle, setToken } = useAuthStore()

  useEffect(() => {
    const handleToken = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get('token')

      if (token) {
        try {
          setToken(token)
          await loginWithGoogle(token)
          router.push('/') // Redirige al home después del login
        } catch (error) {
          console.error('Error en autenticación:', error)
          router.push('/login?error=auth_failed')
        }
      } else {
        router.push('/login')
      }
    }

    handleToken()
  }, [router, loginWithGoogle])

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Procesando autenticación...</p>
    </div>
  )
}
