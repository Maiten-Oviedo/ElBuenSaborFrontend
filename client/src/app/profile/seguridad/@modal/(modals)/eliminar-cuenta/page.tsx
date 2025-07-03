'use client'

import Button from '@/common/components/ui/Button'
import ParallelModal from '@/common/components/ui/parallel-modal/ParallelModal'
import httpClient from '@/common/lib/httpClient'
import { useAuthStore } from '@/common/store/useAuthStore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const EliminarCuenta = () => {
  const router = useRouter()
  const clienteId = useAuthStore(state => state.cliente?.id)
  const { logout } = useAuthStore()
  const [error, setError] = useState<Error | string | null>(null)

  const handleDeleteAccount = async () => {
    try {
      await httpClient().del(`http://localhost:8080/cliente/${clienteId}`)
      logout()
      router.push('/')
    } catch (error: unknown) {
      let errorMessage = 'Error desconocido'

      if (error instanceof Error) {
        errorMessage = error.message
      }

      setError(errorMessage)
    }
  }

  return (
    <ParallelModal>
      <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
        <Image
          alt="Icono de error"
          src="/svg/error.svg"
          width={150}
          height={150}
        />
        <div className="w-full flex flex-col gap-2 text-xl text-center">
          <h1 className="text-white font-extrabold">
            ¿Estás seguro que quieres eliminar tu cuenta?
          </h1>
          <h3 className="text-white font-light">
            Esta acción no se podrá deshacer
          </h3>
        </div>

        {error && (
          <p className="text-red">
            Hubo un error al eliminar tu cuenta. Inténtalo más tarde.
          </p>
        )}

        <div className="gap-5 flex">
          <Button variant="primary" onClick={router.back}>
            Cancelar
          </Button>
          <Button variant="secondary" onClick={handleDeleteAccount}>
            Si, eliminar
          </Button>
        </div>
      </div>
    </ParallelModal>
  )
}

export default EliminarCuenta
