'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/common/store/useAuthStore'

export default function AuthRedirect() {
  const router = useRouter()
  const { loginWithGoogle } = useAuthStore()

  useEffect(() => {
    const handleGoogleLogin = async () => {
      try {
        await loginWithGoogle()
        router.push('/') // Redirige al home después del login
      } catch (error) {
        console.error('Error en autenticación:', error)
        router.push('/login?error=auth_failed')
      }
    }

    handleGoogleLogin()
  }, [router, loginWithGoogle])

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Procesando autenticación...</p>
    </div>
  )
}
