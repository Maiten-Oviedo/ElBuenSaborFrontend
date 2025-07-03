'use client'

import Button from '@/common/components/button/Button'
import Input from '@/common/components/input/Input'
import { useAuthStore } from '@/store/useAuthStore'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { RxReload } from 'react-icons/rx'

type EmpleadoInputsDataType = {
  nombre: string
  apellido: string
  email: string
  telefono: string
}

const Profile = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const empleado = useAuthStore(state => state.empleado)

  const [initialValues, setInitialValues] = useState<EmpleadoInputsDataType>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
  })

  useEffect(() => {
    if (empleado) {
      setInitialValues({
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        email: empleado.email,
        telefono: empleado.telefono || '-',
      })
    }
  }, [empleado])

  //Soluciona problemas de hidratación
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) return null

  return (
    <div className="w-full h-full flex justify-center">
      <div className="max-h-[50vh] w-170 bg-brown rounded-3xl flex flex-col items-center justify-start gap-8 p-12 mt-8">
        <nav className="flex flex-row gap-4 items-center justify-center">
          <h1 className="text-white text-5xl montserrat font-black">
            MI CUENTA
          </h1>
        </nav>
        {loading && <p>Cargando tus datos...</p>}
        {!loading && error && (
          <p className="text-red">Error al cargar tus datos. {error}</p>
        )}

        {!loading && empleado && (
          <div className="flex flex-col justify-center items-center gap-10">
            <div className="grid grid-cols-2 gap-10 gap-x-20">
              {Object.entries(initialValues).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-1">
                  <p className="text-white font-bold">
                    {key.toUpperCase() === 'NOMBRE'
                      ? 'NOMBRE/S'
                      : key.toUpperCase() === 'APELLIDO'
                      ? 'APELLIDO/S'
                      : key.toUpperCase() === 'EMAIL'
                      ? 'EMAIL'
                      : 'TELÉFONO'}
                  </p>
                  <Input
                    key={key}
                    value={value}
                    readOnly={true}
                    whiteText={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-full flex justify-center items-center">
          <Button variant="secondary" href={`/profile/editar`}>
            Editar datos
          </Button>
          <Button variant="secondary" href={`/profile/cambiar-contrasena`}>
            Cambiar contraseña
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
