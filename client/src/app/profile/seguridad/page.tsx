'use client'

import Button from '@/common/components/ui/Button'
import { useAuthStore } from '@/common/store/useAuthStore'
import { useState } from 'react'

type Props = {}

const Seguridad = (props: Props) => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const cliente = useAuthStore(state => state.cliente)

  return (
    <div className="bg-black max-h-[74vh] rounded-3xl flex flex-col items-center justify-start gap-8 p-12">
      <h1 className="text-white text-5xl montserrat font-black">SEGURIDAD</h1>

      {loading && <p>Cargando tus datos...</p>}
      {!loading && error && (
        <p className="text-red">Error al cargar tus datos. {error}</p>
      )}

      {!loading && cliente && (
        <div className="flex flex-col justify-center items-center gap-2">
          <Button
            variant="primary"
            href="/profile/seguridad/cambiar-contrasena"
          >
            Cambiar contraseña
          </Button>
          <Button variant="primary" href="/profile/seguridad/eliminar-cuenta">
            Eliminar mi cuenta
          </Button>
        </div>
      )}
    </div>
  )
}

export default Seguridad
